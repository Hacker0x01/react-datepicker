import Calendar from './calendar'
import React from 'react'
import PropTypes from 'prop-types'
import PopperComponent, { popperPlacementPositions } from './popper_component'
import classnames from 'classnames'
import { isSameDay, isDayDisabled, isDayInRange, getEffectiveMinDate, getEffectiveMaxDate, parseDate, safeDateFormat } from './date_utils'
import moment from 'moment'
import onClickOutside from 'react-onclickoutside'

const outsideClickIgnoreClass = 'react-datepicker-ignore-onclickoutside'
const WrappedCalendar = onClickOutside(Calendar)

/**
 * General datepicker component.
 */

export default class DatePicker extends React.Component {
  static propTypes = {
    allowSameDay: PropTypes.bool,
    autoComplete: PropTypes.string,
    autoFocus: PropTypes.bool,
    calendarClassName: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    customInput: PropTypes.element,
    dateFormat: PropTypes.oneOfType([ // eslint-disable-line react/no-unused-prop-types
      PropTypes.string,
      PropTypes.array
    ]),
    dateFormatCalendar: PropTypes.string,
    dayClassName: PropTypes.func,
    disabled: PropTypes.bool,
    disabledKeyboardNavigation: PropTypes.bool,
    dropdownMode: PropTypes.oneOf(['scroll', 'select']).isRequired,
    endDate: PropTypes.object,
    excludeDates: PropTypes.array,
    filterDate: PropTypes.func,
    fixedHeight: PropTypes.bool,
    formatWeekNumber: PropTypes.func,
    highlightDates: PropTypes.array,
    id: PropTypes.string,
    includeDates: PropTypes.array,
    inline: PropTypes.bool,
    isClearable: PropTypes.bool,
    locale: PropTypes.string,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    monthsShown: PropTypes.number,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
    onClickOutside: PropTypes.func,
    onChangeRaw: PropTypes.func,
    onFocus: PropTypes.func,
    onMonthChange: PropTypes.func,
    openToDate: PropTypes.object,
    peekNextMonth: PropTypes.bool,
    placeholderText: PropTypes.string,
    popperClassName: PropTypes.string, // <PopperComponent/> props
    popperModifiers: PropTypes.object, // <PopperComponent/> props
    popperPlacement: PropTypes.oneOf(popperPlacementPositions), // <PopperComponent/> props
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    scrollableYearDropdown: PropTypes.bool,
    selected: PropTypes.object,
    selectsEnd: PropTypes.bool,
    selectsStart: PropTypes.bool,
    showMonthDropdown: PropTypes.bool,
    showWeekNumbers: PropTypes.bool,
    showYearDropdown: PropTypes.bool,
    forceShowMonthNavigation: PropTypes.bool,
    startDate: PropTypes.object,
    tabIndex: PropTypes.number,
    title: PropTypes.string,
    todayButton: PropTypes.string,
    useWeekdaysShort: PropTypes.bool,
    utcOffset: PropTypes.number,
    value: PropTypes.string,
    weekLabel: PropTypes.string,
    withPortal: PropTypes.bool,
    yearDropdownItemNumber: PropTypes.number
  }

  static get defaultProps () {
    return {
      allowSameDay: false,
      dateFormat: 'L',
      dateFormatCalendar: 'MMMM YYYY',
      onChange () {},
      disabled: false,
      disabledKeyboardNavigation: false,
      dropdownMode: 'scroll',
      onFocus () {},
      onBlur () {},
      onSelect () {},
      onClickOutside () {},
      onMonthChange () {},
      utcOffset: moment().utcOffset(),
      monthsShown: 1,
      withPortal: false
    }
  }

  constructor (props) {
    super(props)
    this.state = this.calcInitialState()
  }

  componentWillUnmount () {
    this.clearPreventFocusTimeout()
  }

  calcInitialState = () => {
    const defaultPreSelection =
      this.props.openToDate ? moment(this.props.openToDate)
      : this.props.selectsEnd && this.props.startDate ? moment(this.props.startDate)
      : this.props.selectsStart && this.props.endDate ? moment(this.props.endDate)
      : this.props.utcOffset ? moment.utc().utcOffset(this.props.utcOffset)
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
  }

  clearPreventFocusTimeout = () => {
    if (this.preventFocusTimeout) {
      clearTimeout(this.preventFocusTimeout)
    }
  }

  setFocus = () => {
    this.refs.input.focus()
  }

  setOpen = (open) => {
    this.setState({
      open: open,
      preSelection: open && this.state.open ? this.state.preSelection : this.calcInitialState().preSelection
    })
  }

  handleFocus = (event) => {
    if (!this.state.preventFocus) {
      this.props.onFocus(event)
      this.setOpen(true)
    }
  }

  cancelFocusInput = () => {
    clearTimeout(this.inputFocusTimeout)
    this.inputFocusTimeout = null
  }

  deferFocusInput = () => {
    this.cancelFocusInput()
    this.inputFocusTimeout = setTimeout(() => this.setFocus(), 1)
  }

  handleDropdownFocus = () => {
    this.cancelFocusInput()
  }

  handleBlur = (event) => {
    if (this.state.open) {
      this.deferFocusInput()
    } else {
      this.props.onBlur(event)
    }
  }

  handleCalendarClickOutside = (event) => {
    this.setOpen(false)
    this.props.onClickOutside(event)
    if (this.props.withPortal) { event.preventDefault() }
  }

  handleChange = (event) => {
    if (this.props.onChangeRaw) {
      this.props.onChangeRaw(event)
      if (event.isDefaultPrevented()) {
        return
      }
    }
    this.setState({ inputValue: event.target.value })
    const date = parseDate(event.target.value, this.props)
    if (date || !event.target.value) {
      this.setSelected(date, event, true)
    }
  }

  handleSelect = (date, event) => {
    // Preventing onFocus event to fix issue
    // https://github.com/Hacker0x01/react-datepicker/issues/628
    this.setState({ preventFocus: true },
      () => {
        this.preventFocusTimeout = setTimeout(() => this.setState({ preventFocus: false }), 50)
        return this.preventFocusTimeout
      }
    )
    this.setSelected(date, event)
    if (!this.props.inline) {
      this.setOpen(false)
    }
  }

  setSelected = (date, event, keepInput) => {
    let changedDate = date

    if (changedDate !== null && isDayDisabled(changedDate, this.props)) {
      return
    }

    if (!isSameDay(this.props.selected, changedDate) || this.props.allowSameDay) {
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

    if (!keepInput) {
      this.setState({ inputValue: null })
    }
  }

  setPreSelection = (date) => {
    const isDateRangePresent = ((typeof this.props.minDate !== 'undefined') && (typeof this.props.maxDate !== 'undefined'))
    const isValidDateSelection = isDateRangePresent && date ? isDayInRange(date, this.props.minDate, this.props.maxDate) : true
    if (isValidDateSelection) {
      this.setState({
        preSelection: date
      })
    }
  }

  onInputClick = () => {
    if (!this.props.disabled) {
      this.setOpen(true)
    }
  }

  onInputKeyDown = (event) => {
    const eventKey = event.key
    if (!this.state.open && !this.props.inline) {
      if (eventKey !== 'Enter' && eventKey !== 'Escape' && eventKey !== 'Tab') {
        this.onInputClick()
      }
      return
    }
    const copy = moment(this.state.preSelection)
    if (eventKey === 'Enter') {
      event.preventDefault()
      this.handleSelect(copy, event)
    } else if (eventKey === 'Escape') {
      event.preventDefault()
      this.setOpen(false)
    } else if (eventKey === 'Tab') {
      this.setOpen(false)
    }
    if (!this.props.disabledKeyboardNavigation) {
      let newSelection
      switch (eventKey) {
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
  }

  onClearClick = (event) => {
    event.preventDefault()
    this.props.onChange(null, event)
  }

  renderCalendar = () => {
    if (!this.props.inline && (!this.state.open || this.props.disabled)) {
      return null
    }
    return <WrappedCalendar
        ref="calendar"
        locale={this.props.locale}
        dateFormat={this.props.dateFormatCalendar}
        useWeekdaysShort={this.props.useWeekdaysShort}
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
        formatWeekNumber={this.props.formatWeekNumber}
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
        weekLabel={this.props.weekLabel}
        utcOffset={this.props.utcOffset}
        outsideClickIgnoreClass={outsideClickIgnoreClass}
        fixedHeight={this.props.fixedHeight}
        monthsShown={this.props.monthsShown}
        onDropdownFocus={this.handleDropdownFocus}
        onMonthChange={this.props.onMonthChange}
        dayClassName={this.props.dayClassName}
        className={this.props.calendarClassName}
        yearDropdownItemNumber={this.props.yearDropdownItemNumber}>
      {this.props.children}
    </WrappedCalendar>
  }

  renderDateInput = () => {
    var className = classnames(this.props.className, {
      [outsideClickIgnoreClass]: this.state.open
    })

    const customInput = this.props.customInput || <input type="text" />
    const inputValue =
      typeof this.props.value === 'string' ? this.props.value
        : typeof this.state.inputValue === 'string' ? this.state.inputValue
        : safeDateFormat(this.props.selected, this.props)

    return React.cloneElement(customInput, {
      ref: 'input',
      value: inputValue,
      onBlur: this.handleBlur,
      onChange: this.handleChange,
      onClick: this.onInputClick,
      onFocus: this.handleFocus,
      onKeyDown: this.onInputKeyDown,
      id: this.props.id,
      name: this.props.name,
      autoFocus: this.props.autoFocus,
      placeholder: this.props.placeholderText,
      disabled: this.props.disabled,
      autoComplete: this.props.autoComplete,
      className: className,
      title: this.props.title,
      readOnly: this.props.readOnly,
      required: this.props.required,
      tabIndex: this.props.tabIndex
    })
  }

  renderClearButton = () => {
    if (this.props.isClearable && this.props.selected != null) {
      return <a className="react-datepicker__close-icon" href="#" onClick={this.onClearClick} />
    } else {
      return null
    }
  }

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
      <PopperComponent
          className={this.props.popperClassName}
          hidePopper={(!this.state.open || this.props.disabled)}
          popperModifiers={this.props.popperModifiers}
          targetComponent={
            <div className="react-datepicker__input-container">
              {this.renderDateInput()}
              {this.renderClearButton()}
            </div>
          }
          popperComponent={calendar}
          popperPlacement={this.props.popperPlacement}/>
    )
  }
}
