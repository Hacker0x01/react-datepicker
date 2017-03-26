import DateInput from './date_input'
import Calendar from './calendar'
import React from 'react'
import TetherComponent from './tether_component'
import classnames from 'classnames'
import {isSameDay, isDayDisabled, isDayInRange, getEffectiveMinDate, getEffectiveMaxDate} from './date_utils'
import moment from 'moment'
import onClickOutside from 'react-onclickoutside'

var outsideClickIgnoreClass = 'react-datepicker-ignore-onclickoutside'
var WrappedCalendar = onClickOutside(Calendar)

/**
 * General datepicker component.
 */

var DatePicker = React.createClass({
  displayName: 'DatePicker',

  propTypes: {
    autoComplete: React.PropTypes.string,
    autoFocus: React.PropTypes.bool,
    calendarClassName: React.PropTypes.string,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    customInput: React.PropTypes.element,
    dateFormat: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array
    ]),
    dateFormatCalendar: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    disableDateAutoCorrection: React.PropTypes.bool,
    disabledKeyboardNavigation: React.PropTypes.bool,
    dropdownMode: React.PropTypes.oneOf(['scroll', 'select']).isRequired,
    endDate: React.PropTypes.object,
    excludeDates: React.PropTypes.array,
    filterDate: React.PropTypes.func,
    fixedHeight: React.PropTypes.bool,
    highlightDates: React.PropTypes.array,
    id: React.PropTypes.string,
    includeDates: React.PropTypes.array,
    inline: React.PropTypes.bool,
    isClearable: React.PropTypes.bool,
    locale: React.PropTypes.string,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    monthsShown: React.PropTypes.number,
    name: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func,
    onClickOutside: React.PropTypes.func,
    onChangeRaw: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onMonthChange: React.PropTypes.func,
    openToDate: React.PropTypes.object,
    peekNextMonth: React.PropTypes.bool,
    placeholderText: React.PropTypes.string,
    popoverAttachment: React.PropTypes.string,
    popoverTargetAttachment: React.PropTypes.string,
    popoverTargetOffset: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    renderCalendarTo: React.PropTypes.any,
    required: React.PropTypes.bool,
    scrollableYearDropdown: React.PropTypes.bool,
    selected: React.PropTypes.object,
    selectsEnd: React.PropTypes.bool,
    selectsStart: React.PropTypes.bool,
    showMonthDropdown: React.PropTypes.bool,
    showWeekNumbers: React.PropTypes.bool,
    showYearDropdown: React.PropTypes.bool,
    forceShowMonthNavigation: React.PropTypes.bool,
    startDate: React.PropTypes.object,
    tabIndex: React.PropTypes.number,
    tetherConstraints: React.PropTypes.array,
    title: React.PropTypes.string,
    todayButton: React.PropTypes.string,
    utcOffset: React.PropTypes.number,
    withPortal: React.PropTypes.bool
  },

  getDefaultProps () {
    return {
      dateFormatCalendar: 'MMMM YYYY',
      onChange () {},
      disabled: false,
      disableDateAutoCorrection: false,
      disabledKeyboardNavigation: false,
      dropdownMode: 'scroll',
      onFocus () {},
      onBlur () {},
      onSelect () {},
      onClickOutside () {},
      onMonthChange () {},
      popoverAttachment: 'top left',
      popoverTargetAttachment: 'bottom left',
      popoverTargetOffset: '10px 0',
      tetherConstraints: [
        {
          to: 'window',
          attachment: 'together'
        }
      ],
      utcOffset: moment().utcOffset(),
      monthsShown: 1,
      withPortal: false
    }
  },

  getInitialState () {
    const defaultPreSelection =
      this.props.openToDate ? moment(this.props.openToDate)
      : this.props.selectsEnd && this.props.startDate ? moment(this.props.startDate)
      : this.props.selectsStart && this.props.endDate ? moment(this.props.endDate)
      : moment()
    const minDate = getEffectiveMinDate(this.props)
    const maxDate = getEffectiveMaxDate(this.props)
    const boundedPreSelection =
      minDate && defaultPreSelection.isBefore(minDate) ? minDate
      : maxDate && defaultPreSelection.isAfter(maxDate) ? maxDate
      : defaultPreSelection

    return {
      open: false,
      preventFocus: false,
      preSelection: this.props.selected ? moment(this.props.selected) : boundedPreSelection
    }
  },

  componentWillUnmount () {
    this.clearPreventFocusTimeout()
  },

  clearPreventFocusTimeout () {
    if (this.preventFocusTimeout) {
      clearTimeout(this.preventFocusTimeout)
    }
  },

  setFocus () {
    this.refs.input.focus()
  },

  setOpen (open) {
    this.setState({
      open: open,
      preSelection: open && this.state.open ? this.state.preSelection : this.getInitialState().preSelection
    })
  },

  handleFocus (event) {
    if (!this.state.preventFocus) {
      this.props.onFocus(event)
      this.setOpen(true)
    }
  },

  cancelFocusInput () {
    clearTimeout(this.inputFocusTimeout)
    this.inputFocusTimeout = null
  },

  deferFocusInput () {
    this.cancelFocusInput()
    this.inputFocusTimeout = window.setTimeout(() => this.setFocus(), 1)
  },

  handleDropdownFocus () {
    this.cancelFocusInput()
  },

  handleBlur (event) {
    if (this.state.open) {
      this.deferFocusInput()
    } else {
      this.props.onBlur(event)
    }
  },

  handleCalendarClickOutside (event) {
    this.setOpen(false)
    this.props.onClickOutside(event)
    if (this.props.withPortal) { event.preventDefault() }
  },

  handleSelect (date, event) {
    // Preventing onFocus event to fix issue
    // https://github.com/Hacker0x01/react-datepicker/issues/628
    this.setState({ preventFocus: true },
      () => {
        this.preventFocusTimeout = setTimeout(() => this.setState({ preventFocus: false }), 50)
        return this.preventFocusTimeout
      }
    )
    this.setSelected(date, event)
    this.setOpen(false)
  },

  setSelected (date, event) {
    let changedDate = date

    if (changedDate !== null && isDayDisabled(changedDate, this.props)) {
      return
    }

    if (!isSameDay(this.props.selected, changedDate) || this.props.disableDateAutoCorrection) {
      if (changedDate !== null) {
        if (this.props.selected) {
          changedDate = moment(changedDate).set({
            hour: this.props.selected.hour(),
            minute: this.props.selected.minute(),
            second: this.props.selected.second()
          })
        }
        this.setState({
          preSelection: changedDate
        })
      }

      this.props.onChange(changedDate, event)
    }

    this.props.onSelect(changedDate, event)
  },

  setPreSelection (date) {
    const isDateRangePresent = ((typeof this.props.minDate !== 'undefined') && (typeof this.props.maxDate !== 'undefined'))
    const isValidDateSelection = isDateRangePresent && date ? isDayInRange(date, this.props.minDate, this.props.maxDate) : true
    if (isValidDateSelection) {
      this.setState({
        preSelection: date
      })
    }
  },

  onInputClick () {
    if (!this.props.disabled) {
      this.setOpen(true)
    }
  },

  onInputKeyDown (event) {
    if (!this.state.open && !this.props.inline) {
      if (/^Arrow/.test(event.key)) {
        this.onInputClick()
      }
      return
    }
    const copy = moment(this.state.preSelection)
    if (event.key === 'Enter') {
      event.preventDefault()
      this.handleSelect(copy, event)
    } else if (event.key === 'Escape') {
      event.preventDefault()
      this.setOpen(false)
    } else if (event.key === 'Tab') {
      this.setOpen(false)
    }
    if (!this.props.disabledKeyboardNavigation) {
      let newSelection
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          newSelection = copy.subtract(1, 'days')
          break
        case 'ArrowRight':
          event.preventDefault()
          newSelection = copy.add(1, 'days')
          break
        case 'ArrowUp':
          event.preventDefault()
          newSelection = copy.subtract(1, 'weeks')
          break
        case 'ArrowDown':
          event.preventDefault()
          newSelection = copy.add(1, 'weeks')
          break
        case 'PageUp':
          event.preventDefault()
          newSelection = copy.subtract(1, 'months')
          break
        case 'PageDown':
          event.preventDefault()
          newSelection = copy.add(1, 'months')
          break
        case 'Home':
          event.preventDefault()
          newSelection = copy.subtract(1, 'years')
          break
        case 'End':
          event.preventDefault()
          newSelection = copy.add(1, 'years')
          break
      }
      this.setPreSelection(newSelection)
    }
  },

  onClearClick (event) {
    event.preventDefault()
    this.props.onChange(null, event)
  },

  renderCalendar () {
    if (!this.props.inline && (!this.state.open || this.props.disabled)) {
      return null
    }
    return <WrappedCalendar
        ref="calendar"
        locale={this.props.locale}
        dateFormat={this.props.dateFormatCalendar}
        dropdownMode={this.props.dropdownMode}
        selected={this.props.selected}
        preSelection={this.state.preSelection}
        onSelect={this.handleSelect}
        openToDate={this.props.openToDate}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        selectsStart={this.props.selectsStart}
        selectsEnd={this.props.selectsEnd}
        startDate={this.props.startDate}
        endDate={this.props.endDate}
        excludeDates={this.props.excludeDates}
        filterDate={this.props.filterDate}
        onClickOutside={this.handleCalendarClickOutside}
        highlightDates={this.props.highlightDates}
        includeDates={this.props.includeDates}
        inline={this.props.inline}
        peekNextMonth={this.props.peekNextMonth}
        showMonthDropdown={this.props.showMonthDropdown}
        showWeekNumbers={this.props.showWeekNumbers}
        showYearDropdown={this.props.showYearDropdown}
        forceShowMonthNavigation={this.props.forceShowMonthNavigation}
        scrollableYearDropdown={this.props.scrollableYearDropdown}
        todayButton={this.props.todayButton}
        utcOffset={this.props.utcOffset}
        outsideClickIgnoreClass={outsideClickIgnoreClass}
        fixedHeight={this.props.fixedHeight}
        monthsShown={this.props.monthsShown}
        onDropdownFocus={this.handleDropdownFocus}
        onMonthChange={this.props.onMonthChange}
        className={this.props.calendarClassName}>
      {this.props.children}
    </WrappedCalendar>
  },

  renderDateInput () {
    var className = classnames(this.props.className, {
      [outsideClickIgnoreClass]: this.state.open
    })
    return <DateInput
        ref="input"
        disableDateAutoCorrection={this.props.disableDateAutoCorrection}
        id={this.props.id}
        name={this.props.name}
        autoFocus={this.props.autoFocus}
        date={this.props.selected}
        locale={this.props.locale}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        excludeDates={this.props.excludeDates}
        includeDates={this.props.includeDates}
        filterDate={this.props.filterDate}
        dateFormat={this.props.dateFormat}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onClick={this.onInputClick}
        onChangeRaw={this.props.onChangeRaw}
        onKeyDown={this.onInputKeyDown}
        onChangeDate={this.setSelected}
        placeholder={this.props.placeholderText}
        disabled={this.props.disabled}
        autoComplete={this.props.autoComplete}
        className={className}
        title={this.props.title}
        readOnly={this.props.readOnly}
        required={this.props.required}
        tabIndex={this.props.tabIndex}
        customInput={this.props.customInput} />
  },

  renderClearButton () {
    if (this.props.isClearable && this.props.selected != null) {
      return <a className="react-datepicker__close-icon" href="#" onClick={this.onClearClick} />
    } else {
      return null
    }
  },

  render () {
    const calendar = this.renderCalendar()

    if (this.props.inline && !this.props.withPortal) {
      return calendar
    }

    if (this.props.withPortal) {
      return (
        <div>
          {
          !this.props.inline
          ? <div className="react-datepicker__input-container">
              {this.renderDateInput()}
              {this.renderClearButton()}
            </div>
          : null
          }
          {
          this.state.open || this.props.inline
          ? <div className="react-datepicker__portal">
              {calendar}
            </div>
          : null
          }
        </div>
      )
    }

    return (
      <TetherComponent
          classPrefix={'react-datepicker__tether'}
          attachment={this.props.popoverAttachment}
          targetAttachment={this.props.popoverTargetAttachment}
          targetOffset={this.props.popoverTargetOffset}
          renderElementTo={this.props.renderCalendarTo}
          constraints={this.props.tetherConstraints}>
        <div className="react-datepicker__input-container">
          {this.renderDateInput()}
          {this.renderClearButton()}
        </div>
        {calendar}
      </TetherComponent>
    )
  }
})

module.exports = DatePicker
