import DateInput from './date_input'
import Calendar from './calendar'
import React from 'react'
import defer from 'lodash/defer'
import TetherComponent from './tether_component'
import classnames from 'classnames'
import { isSameDay } from './date_utils'
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
    className: React.PropTypes.string,
    customInput: React.PropTypes.element,
    dateFormat: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array
    ]),
    dateFormatCalendar: React.PropTypes.string,
    disabled: React.PropTypes.bool,
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
    utcOffset: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      dateFormatCalendar: 'MMMM YYYY',
      onChange () {},
      disabled: false,
      dropdownMode: 'scroll',
      onFocus () {},
      onBlur () {},
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
      utcOffset: moment.utc().utcOffset(),
      monthsShown: 1
    }
  },

  getInitialState () {
    return {
      open: false,
      preventFocus: false
    }
  },

  setFocus () {
    this.refs.input.focus()
  },

  setOpen (open) {
    this.setState({ open })
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
    this.inputFocusTimeout = defer(() => this.setFocus())
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
  },

  handleSelect (date, event) {
    // Preventing onFocus event to fix issue
    // https://github.com/Hacker0x01/react-datepicker/issues/628
    this.setState({ preventFocus: true },
      () => setTimeout(() => this.setState({ preventFocus: false }), 50)
    )
    this.setSelected(date, event)
    this.setOpen(false)
  },

  setSelected (date, event) {
    let changedDate = date

    if (!isSameDay(this.props.selected, changedDate)) {
      if (this.props.selected && changedDate != null) {
        changedDate = moment(changedDate).set({
          hour: this.props.selected.hour(),
          minute: this.props.selected.minute(),
          second: this.props.selected.second()
        })
      }

      this.props.onChange(changedDate, event)
    }
  },

  onInputClick () {
    if (!this.props.disabled) {
      this.setOpen(true)
    }
  },

  onInputKeyDown (event) {
    const copy = this.props.selected ? moment(this.props.selected) : moment()
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.preventDefault()
      this.setOpen(false)
    } else if (event.key === 'Tab') {
      this.setOpen(false)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      this.setSelected(copy.subtract(1, 'days'))
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      this.setSelected(copy.add(1, 'days'))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      this.setSelected(copy.subtract(1, 'weeks'))
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      this.setSelected(copy.add(1, 'weeks'))
    } else if (event.key === 'PageUp') {
      event.preventDefault()
      this.setSelected(copy.subtract(1, 'months'))
    } else if (event.key === 'PageDown') {
      event.preventDefault()
      this.setSelected(copy.add(1, 'months'))
    } else if (event.key === 'Home') {
      event.preventDefault()
      this.setSelected(copy.subtract(1, 'years'))
    } else if (event.key === 'End') {
      event.preventDefault()
      this.setSelected(copy.add(1, 'years'))
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
        onMonthChange={this.props.onMonthChange}/>
  },

  renderDateInput () {
    var className = classnames(this.props.className, {
      [outsideClickIgnoreClass]: this.state.open
    })
    return <DateInput
        ref="input"
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

    if (this.props.inline) {
      return calendar
    } else {
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
  }
})

module.exports = DatePicker
