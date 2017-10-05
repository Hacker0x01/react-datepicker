import Calendar from './calendar'
import React from 'react'
import PropTypes from 'prop-types'
import PopperComponent, { popperPlacementPositions } from './popper_component'
import classnames from 'classnames'
import {
  newDate,
  newDateWithOffset,
  cloneDate,
  getUTCOffset,
  isMoment,
  isDate,
  isBefore,
  isAfter,
  setTime,
  getSecond,
  getMinute,
  getHour,
  getMonth,
  addDays,
  addMonths,
  addWeeks,
  addYears,
  subtractDays,
  subtractMonths,
  subtractWeeks,
  subtractYears,

  isSameDay,
  isDayDisabled,
  isDayInRange,
  getEffectiveMinDate,
  getEffectiveMaxDate,
  parseDate,
  safeDateFormat
} from './date_utils'
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
    onWeekSelect: PropTypes.func,
    onClickOutside: PropTypes.func,
    onChangeRaw: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
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
    startOpen: PropTypes.bool,
    tabIndex: PropTypes.number,
    title: PropTypes.string,
    todayButton: PropTypes.string,
    useWeekdaysShort: PropTypes.bool,
    utcOffset: PropTypes.number,
    value: PropTypes.string,
    weekLabel: PropTypes.string,
    withPortal: PropTypes.bool,
    yearDropdownItemNumber: PropTypes.number,
    shouldCloseOnSelect: PropTypes.bool,
    showTimeSelect: PropTypes.bool,
    timeFormat: PropTypes.string,
    timeIntervals: PropTypes.number,
    minTime: PropTypes.object,
    maxTime: PropTypes.object,
    excludeTimes: PropTypes.array
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
      onKeyDown () {},
      onSelect () {},
      onClickOutside () {},
      onMonthChange () {},
      utcOffset: getUTCOffset(),
      monthsShown: 1,
      withPortal: false,
      shouldCloseOnSelect: true,
      showTimeSelect: false,
      timeIntervals: 30
    }
  }

  constructor (props) {
    super(props)
    this.state = this.calcInitialState()
  }

  componentWillReceiveProps (nextProps) {
    const currentMonth = this.props.selected && getMonth(this.props.selected)
    const nextMonth = nextProps.selected && getMonth(nextProps.selected)
    if (this.props.inline && currentMonth !== nextMonth) {
      this.setPreSelection(nextProps.selected)
    }
  }

  componentWillUnmount () {
    this.clearPreventFocusTimeout()
  }

  getPreSelection = () => (
    this.props.openToDate ? newDate(this.props.openToDate)
    : this.props.selectsEnd && this.props.startDate ? newDate(this.props.startDate)
    : this.props.selectsStart && this.props.endDate ? newDate(this.props.endDate)
    : (typeof this.props.utcOffset !== 'undefined') ? newDateWithOffset(this.props.utcOffset)
    : newDate()
  )

  calcInitialState = () => {
    const defaultPreSelection = this.getPreSelection()
    const minDate = getEffectiveMinDate(this.props)
    const maxDate = getEffectiveMaxDate(this.props)
    const boundedPreSelection =
      minDate && isBefore(defaultPreSelection, minDate) ? minDate
      : maxDate && isAfter(defaultPreSelection, maxDate) ? maxDate
      : defaultPreSelection

    return {
      open: this.props.startOpen || false,
      preventFocus: false,
      preSelection: this.props.selected ? newDate(this.props.selected) : boundedPreSelection
    }
  }

  clearPreventFocusTimeout = () => {
    if (this.preventFocusTimeout) {
      clearTimeout(this.preventFocusTimeout)
    }
  }

  setFocus = () => {
    this.input.focus()
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
    if (!this.props.inline) {
      this.setOpen(false)
    }
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
    if (!this.props.shouldCloseOnSelect) {
      this.setPreSelection(date)
    } else if (!this.props.inline) {
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
          changedDate = setTime(newDate(changedDate), {
            hour: getHour(this.props.selected),
            minute: getMinute(this.props.selected),
            second: getSecond(this.props.selected)
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

  handleTimeChange = (time) => {
    const selected = (this.props.selected) ? this.props.selected : this.getPreSelection()
    let changedDate = setTime(cloneDate(selected), {
      hour: getHour(time),
      minute: getMinute(time)
    })

    this.setState({
      preSelection: changedDate
    })

    this.props.onChange(changedDate)
  }

  onInputClick = () => {
    if (!this.props.disabled) {
      this.setOpen(true)
    }
  }

  onInputKeyDown = (event) => {
    this.props.onKeyDown(event)
    const eventKey = event.key
    if (!this.state.open && !this.props.inline) {
      if (eventKey !== 'Enter' && eventKey !== 'Escape' && eventKey !== 'Tab') {
        this.onInputClick()
      }
      return
    }
    const copy = newDate(this.state.preSelection)
    if (eventKey === 'Enter') {
      event.preventDefault()
      if (isMoment(this.state.preSelection) || isDate(this.state.preSelection)) {
        this.handleSelect(copy, event)
        !this.props.shouldCloseOnSelect && this.setPreSelection(copy)
      } else {
        this.setOpen(false)
      }
    } else if (eventKey === 'Escape') {
      event.preventDefault()
      this.setOpen(false)
    } else if (eventKey === 'Tab') {
      this.setOpen(false)
    } else if (!this.props.disabledKeyboardNavigation) {
      let newSelection
      switch (eventKey) {
        case 'ArrowLeft':
          event.preventDefault()
          newSelection = subtractDays(copy, 1)
          break
        case 'ArrowRight':
          event.preventDefault()
          newSelection = addDays(copy, 1)
          break
        case 'ArrowUp':
          event.preventDefault()
          newSelection = subtractWeeks(copy, 1)
          break
        case 'ArrowDown':
          event.preventDefault()
          newSelection = addWeeks(copy, 1)
          break
        case 'PageUp':
          event.preventDefault()
          newSelection = subtractMonths(copy, 1)
          break
        case 'PageDown':
          event.preventDefault()
          newSelection = addMonths(copy, 1)
          break
        case 'Home':
          event.preventDefault()
          newSelection = subtractYears(copy, 1)
          break
        case 'End':
          event.preventDefault()
          newSelection = addYears(copy, 1)
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
        ref={(elem) => { this.calendar = elem }}
        locale={this.props.locale}
        dateFormat={this.props.dateFormatCalendar}
        useWeekdaysShort={this.props.useWeekdaysShort}
        dropdownMode={this.props.dropdownMode}
        selected={this.props.selected}
        preSelection={this.state.preSelection}
        onSelect={this.handleSelect}
        onWeekSelect={this.props.onWeekSelect}
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
        withPortal={this.props.withPortal}
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
        showTimeSelect={this.props.showTimeSelect}
        onTimeChange={this.handleTimeChange}
        timeFormat={this.props.timeFormat}
        timeIntervals={this.props.timeIntervals}
        minTime={this.props.minTime}
        maxTime={this.props.maxTime}
        excludeTimes={this.props.excludeTimes}
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
      ref: (input) => { this.input = input },
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
