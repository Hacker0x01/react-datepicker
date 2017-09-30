import YearDropdown from './year_dropdown'
import MonthDropdown from './month_dropdown'
import Month from './month'
import Time from './time'
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  getUTCOffset,
  newDateWithOffset,
  setMonth,
  getMonth,
  addMonths,
  subtractMonths,
  getStartOfWeek,
  getStartOfDate,
  addDays,
  cloneDate,
  formatDate,
  localizeDate,
  setYear,
  getYear,
  isBefore,
  isAfter,
  getLocaleData,
  getWeekdayShortInLocale,
  getWeekdayMinInLocale,

  isSameDay,
  allDaysDisabledBefore,
  allDaysDisabledAfter,
  getEffectiveMinDate,
  getEffectiveMaxDate
} from './date_utils'

const DROPDOWN_FOCUS_CLASSNAMES = [
  'react-datepicker__year-select',
  'react-datepicker__month-select'
]

const isDropdownSelect = (element = {}) => {
  const classNames = (element.className || '').split(/\s+/)
  return DROPDOWN_FOCUS_CLASSNAMES.some(testClassname => classNames.indexOf(testClassname) >= 0)
}

export default class Calendar extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    dateFormat: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]).isRequired,
    dayClassName: PropTypes.func,
    dropdownMode: PropTypes.oneOf(['scroll', 'select']).isRequired,
    endDate: PropTypes.object,
    excludeDates: PropTypes.array,
    filterDate: PropTypes.func,
    fixedHeight: PropTypes.bool,
    formatWeekNumber: PropTypes.func,
    highlightDates: PropTypes.array,
    includeDates: PropTypes.array,
    inline: PropTypes.bool,
    locale: PropTypes.string,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    monthsShown: PropTypes.number,
    onClickOutside: PropTypes.func.isRequired,
    onMonthChange: PropTypes.func,
    forceShowMonthNavigation: PropTypes.bool,
    onDropdownFocus: PropTypes.func,
    onSelect: PropTypes.func.isRequired,
    onWeekSelect: PropTypes.func,
    showTimeSelect: PropTypes.bool,
    timeFormat: PropTypes.string,
    timeIntervals: PropTypes.number,
    onTimeChange: PropTypes.func,
    minTime: PropTypes.object,
    maxTime: PropTypes.object,
    excludeTimes: PropTypes.array,
    openToDate: PropTypes.object,
    peekNextMonth: PropTypes.bool,
    scrollableYearDropdown: PropTypes.bool,
    preSelection: PropTypes.object,
    selected: PropTypes.object,
    selectsEnd: PropTypes.bool,
    selectsStart: PropTypes.bool,
    showMonthDropdown: PropTypes.bool,
    showWeekNumbers: PropTypes.bool,
    showYearDropdown: PropTypes.bool,
    startDate: PropTypes.object,
    todayButton: PropTypes.string,
    useWeekdaysShort: PropTypes.bool,
    withPortal: PropTypes.bool,
    utcOffset: PropTypes.number,
    weekLabel: PropTypes.string,
    yearDropdownItemNumber: PropTypes.number
  }

  static get defaultProps () {
    return {
      onDropdownFocus: () => {},
      utcOffset: getUTCOffset(),
      monthsShown: 1,
      forceShowMonthNavigation: false
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      date: this.localizeDate(this.getDateInView()),
      selectingDate: null,
      monthContainer: this.monthContainer
    }
  }

  componentDidMount () {
    /* monthContainer height is needed in time component to determine the height for the ul in the time component. setState here so height is given after final component layout is rendered */
    if (this.props.showTimeSelect) {
      this.assignMonthContainer = (() => {
        this.setState({monthContainer: this.monthContainer})
      })()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.preSelection && !isSameDay(nextProps.preSelection, this.props.preSelection)) {
      this.setState({
        date: this.localizeDate(nextProps.preSelection)
      })
    } else if (nextProps.openToDate && !isSameDay(nextProps.openToDate, this.props.openToDate)) {
      this.setState({
        date: this.localizeDate(nextProps.openToDate)
      })
    }
  }

  handleClickOutside = (event) => {
    this.props.onClickOutside(event)
  }

  handleDropdownFocus = (event) => {
    if (isDropdownSelect(event.target)) {
      this.props.onDropdownFocus()
    }
  }

  getDateInView = () => {
    const { preSelection, selected, openToDate, utcOffset } = this.props
    const minDate = getEffectiveMinDate(this.props)
    const maxDate = getEffectiveMaxDate(this.props)
    const current = newDateWithOffset(utcOffset)
    const initialDate = openToDate || selected || preSelection
    if (initialDate) {
      return initialDate
    } else {
      if (minDate && isBefore(current, minDate)) {
        return minDate
      } else if (maxDate && isAfter(current, maxDate)) {
        return maxDate
      }
    }
    return current
  }

  localizeDate = date => localizeDate(date, this.props.locale)

  increaseMonth = () => {
    this.setState({
      date: addMonths(cloneDate(this.state.date), 1)
    }, () => this.handleMonthChange(this.state.date))
  }

  decreaseMonth = () => {
    this.setState({
      date: subtractMonths(cloneDate(this.state.date), 1)
    }, () => this.handleMonthChange(this.state.date))
  }

  handleDayClick = (day, event) => this.props.onSelect(day, event)

  handleDayMouseEnter = day => this.setState({ selectingDate: day })

  handleMonthMouseLeave = () => this.setState({ selectingDate: null })

  handleMonthChange = (date) => {
    if (this.props.onMonthChange) {
      this.props.onMonthChange(date)
    }
  }

  changeYear = (year) => {
    this.setState({
      date: setYear(cloneDate(this.state.date), year)
    })
  }

  changeMonth = (month) => {
    this.setState({
      date: setMonth(cloneDate(this.state.date), month)
    }, () => this.handleMonthChange(this.state.date))
  }

  header = (date = this.state.date) => {
    const startOfWeek = getStartOfWeek(cloneDate(date))
    const dayNames = []
    if (this.props.showWeekNumbers) {
      dayNames.push(
        <div key="W" className="react-datepicker__day-name">
            {this.props.weekLabel || '#'}
        </div>
      )
    }
    return dayNames.concat([0, 1, 2, 3, 4, 5, 6].map(offset => {
      const day = addDays(cloneDate(startOfWeek), offset)
      const localeData = getLocaleData(day)
      const weekDayName = this.props.useWeekdaysShort
          ? getWeekdayShortInLocale(localeData, day)
          : getWeekdayMinInLocale(localeData, day)
      return (
        <div key={offset} className="react-datepicker__day-name">
          {weekDayName}
        </div>
      )
    }))
  }

  renderPreviousMonthButton = () => {
    if (!this.props.forceShowMonthNavigation && allDaysDisabledBefore(this.state.date, 'month', this.props)) {
      return
    }
    return <a
        className="react-datepicker__navigation react-datepicker__navigation--previous"
        onClick={this.decreaseMonth} />
  }

  renderNextMonthButton = () => {
    if (!this.props.forceShowMonthNavigation && allDaysDisabledAfter(this.state.date, 'month', this.props)) {
      return
    }

    let classes = ['react-datepicker__navigation', 'react-datepicker__navigation--next']
    if (this.props.showTimeSelect) {
      classes.push('react-datepicker__navigation--next--with-time')
    }
    if (this.props.todayButton) {
      classes.push('react-datepicker__navigation--next--with-today-button')
    }

    return <a
        className={classes.join(' ')}
        onClick={this.increaseMonth} />
  }

  renderCurrentMonth = (date = this.state.date) => {
    const classes = ['react-datepicker__current-month']

    if (this.props.showYearDropdown) {
      classes.push('react-datepicker__current-month--hasYearDropdown')
    }
    if (this.props.showMonthDropdown) {
      classes.push('react-datepicker__current-month--hasMonthDropdown')
    }
    return (
      <div className={classes.join(' ')}>
        {formatDate(date, this.props.dateFormat)}
      </div>
    )
  }

  renderYearDropdown = (overrideHide = false) => {
    if (!this.props.showYearDropdown || overrideHide) {
      return
    }
    return (
      <YearDropdown
          dropdownMode={this.props.dropdownMode}
          onChange={this.changeYear}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          year={getYear(this.state.date)}
          scrollableYearDropdown={this.props.scrollableYearDropdown}
          yearDropdownItemNumber={this.props.yearDropdownItemNumber} />
    )
  }

  renderMonthDropdown = (overrideHide = false) => {
    if (!this.props.showMonthDropdown) {
      return
    }
    return (
      <MonthDropdown
          dropdownMode={this.props.dropdownMode}
          locale={this.props.locale}
          dateFormat={this.props.dateFormat}
          onChange={this.changeMonth}
          month={getMonth(this.state.date)} />
    )
  }

  renderTodayButton = () => {
    if (!this.props.todayButton) {
      return
    }
    return (
      <div
          className="react-datepicker__today-button"
          onClick={e => this.props.onSelect(getStartOfDate(newDateWithOffset(this.props.utcOffset)), e)}>
        {this.props.todayButton}
      </div>
    )
  }

  renderMonths = () => {
    var monthList = []
    for (var i = 0; i < this.props.monthsShown; ++i) {
      var monthDate = addMonths(cloneDate(this.state.date), i)
      var monthKey = `month-${i}`
      monthList.push(
          <div key={monthKey} ref={div => { this.monthContainer = div }} className="react-datepicker__month-container">
            <div className="react-datepicker__header">
              {this.renderCurrentMonth(monthDate)}
              <div
                  className={`react-datepicker__header__dropdown react-datepicker__header__dropdown--${this.props.dropdownMode}`}
                  onFocus={this.handleDropdownFocus}>
                {this.renderMonthDropdown(i !== 0)}
                {this.renderYearDropdown(i !== 0)}
              </div>
              <div className="react-datepicker__day-names">
                {this.header(monthDate)}
              </div>
            </div>
            <Month
                day={monthDate}
                dayClassName={this.props.dayClassName}
                onDayClick={this.handleDayClick}
                onDayMouseEnter={this.handleDayMouseEnter}
                onMouseLeave={this.handleMonthMouseLeave}
                onWeekSelect={this.props.onWeekSelect}
                formatWeekNumber={this.props.formatWeekNumber}
                minDate={this.props.minDate}
                maxDate={this.props.maxDate}
                excludeDates={this.props.excludeDates}
                highlightDates={this.props.highlightDates}
                selectingDate={this.state.selectingDate}
                includeDates={this.props.includeDates}
                inline={this.props.inline}
                fixedHeight={this.props.fixedHeight}
                filterDate={this.props.filterDate}
                preSelection={this.props.preSelection}
                selected={this.props.selected}
                selectsStart={this.props.selectsStart}
                selectsEnd={this.props.selectsEnd}
                showWeekNumbers={this.props.showWeekNumbers}
                startDate={this.props.startDate}
                endDate={this.props.endDate}
                peekNextMonth={this.props.peekNextMonth}
                utcOffset={this.props.utcOffset} />
          </div>
      )
    }
    return monthList
  }

  renderTimeSection = () => {
    if (this.props.showTimeSelect) {
      return (
        <Time
            selected={this.props.selected}
            onChange={this.props.onTimeChange}
            format={this.props.timeFormat}
            intervals={this.props.timeIntervals}
            minTime={this.props.minTime}
            maxTime={this.props.maxTime}
            excludeTimes={this.props.excludeTimes}
            todayButton={this.props.todayButton}
            showMonthDropdown={this.props.showMonthDropdown}
            showYearDropdown={this.props.showYearDropdown}
            withPortal={this.props.withPortal}
            monthRef={this.state.monthContainer} />
      )
    } else {
      return
    }
  }

  render () {
    return (
      <div className={classnames('react-datepicker', this.props.className)}>
        <div className="react-datepicker__triangle" />
        {this.renderPreviousMonthButton()}
        {this.renderNextMonthButton()}
        {this.renderMonths()}
        {this.renderTodayButton()}
        {this.renderTimeSection()}
        {this.props.children}
      </div>
    )
  }
}
