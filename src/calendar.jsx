import moment from 'moment'
import YearDropdown from './year_dropdown'
import MonthDropdown from './month_dropdown'
import Month from './month'
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isSameDay, allDaysDisabledBefore, allDaysDisabledAfter, getEffectiveMinDate, getEffectiveMaxDate } from './date_utils'

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
    children: PropTypes.node,
    className: PropTypes.string,
    dateFormat: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]).isRequired,
    dropdownMode: PropTypes.oneOf(['scroll', 'select']).isRequired,
    endDate: PropTypes.object,
    excludeDates: PropTypes.array,
    filterDate: PropTypes.func,
    fixedHeight: PropTypes.bool,
    forceShowMonthNavigation: PropTypes.bool,
    highlightDates: PropTypes.array,
    includeDates: PropTypes.array,
    inline: PropTypes.bool,
    locale: PropTypes.string,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    monthsShown: PropTypes.number,
    onClickOutside: PropTypes.func.isRequired,
    onDropdownFocus: PropTypes.func,
    onMonthChange: PropTypes.func,
    onSelect: PropTypes.func.isRequired,
    openToDate: PropTypes.object,
    peekNextMonth: PropTypes.bool,
    preSelection: PropTypes.object,
    scrollableYearDropdown: PropTypes.bool,
    selected: PropTypes.object,
    selectsEnd: PropTypes.bool,
    selectsStart: PropTypes.bool,
    showMonthDropdown: PropTypes.bool,
    showWeekNumbers: PropTypes.bool,
    showYearDropdown: PropTypes.bool,
    startDate: PropTypes.object,
    todayButton: PropTypes.string,
    utcOffset: PropTypes.number,
    withPortal: PropTypes.bool
  }

  static get defaultProps () {
    return {
      forceShowMonthNavigation: false,
      monthsShown: 1,
      onDropdownFocus: () => {},
      utcOffset: moment.utc().utcOffset()
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      date: this.localizeMoment(this.getDateInView()),
      selectingDate: null
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.preSelection && !isSameDay(nextProps.preSelection, this.props.preSelection)) {
      this.setState({
        date: this.localizeMoment(nextProps.preSelection)
      })
    } else if (nextProps.openToDate && !isSameDay(nextProps.openToDate, this.props.openToDate)) {
      this.setState({
        date: this.localizeMoment(nextProps.openToDate)
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
    const current = moment.utc().utcOffset(utcOffset)
    const initialDate = preSelection || selected
    if (initialDate) {
      return initialDate
    } else if (minDate && maxDate && openToDate && openToDate.isBetween(minDate, maxDate)) {
      return openToDate
    } else if (minDate && openToDate && openToDate.isAfter(minDate)) {
      return openToDate
    } else if (minDate && minDate.isAfter(current)) {
      return minDate
    } else if (maxDate && openToDate && openToDate.isBefore(maxDate)) {
      return openToDate
    } else if (maxDate && maxDate.isBefore(current)) {
      return maxDate
    } else if (openToDate) {
      return openToDate
    } else {
      return current
    }
  }

  localizeMoment = date => date.clone().locale(this.props.locale || moment.locale())

  increaseMonth = () => {
    this.setState({
      date: this.state.date.clone().add(1, 'month')
    }, () => this.handleMonthChange(this.state.date))
  }

  decreaseMonth = () => {
    this.setState({
      date: this.state.date.clone().subtract(1, 'month')
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
      date: this.state.date.clone().set('year', year)
    })
  }

  changeMonth = (month) => {
    this.setState({
      date: this.state.date.clone().set('month', month)
    }, () => this.handleMonthChange(this.state.date))
  }

  header = (date = this.state.date) => {
    const startOfWeek = date.clone().startOf('week')
    const dayNames = []
    if (this.props.showWeekNumbers) {
      dayNames.push(
        <div key="W" className="react-datepicker__day-name">
          #
        </div>
      )
    }
    return dayNames.concat([0, 1, 2, 3, 4, 5, 6].map(offset => {
      const day = startOfWeek.clone().add(offset, 'days')
      return (
        <div
            aria-label={day.localeData().weekdays(day)}
            className="react-datepicker__day-name"
            key={offset}>
          <span aria-hidden>{day.localeData().weekdaysMin(day)}</span>
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
    return <a
        className="react-datepicker__navigation react-datepicker__navigation--next"
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
        {date.format(this.props.dateFormat)}
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
          year={this.state.date.year()}
          scrollableYearDropdown={this.props.scrollableYearDropdown} />
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
          onChange={this.changeMonth}
          month={this.state.date.month()} />
    )
  }

  renderTodayButton = () => {
    if (!this.props.todayButton) {
      return
    }
    return (
      <div
          className="react-datepicker__today-button"
          onClick={e => this.props.onSelect(moment.utc().utcOffset(this.props.utcOffset).startOf('date'), e)}>
        {this.props.todayButton}
      </div>
    )
  }

  renderMonths = () => {
    var monthList = []
    for (var i = 0; i < this.props.monthsShown; ++i) {
      var monthDate = this.state.date.clone().add(i, 'M')
      var monthKey = `month-${i}`
      monthList.push(
        <div key={monthKey} className="react-datepicker__month-container">
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
              endDate={this.props.endDate}
              excludeDates={this.props.excludeDates}
              filterDate={this.props.filterDate}
              fixedHeight={this.props.fixedHeight}
              highlightDates={this.props.highlightDates}
              includeDates={this.props.includeDates}
              inline={this.props.inline}
              maxDate={this.props.maxDate}
              minDate={this.props.minDate}
              onDayClick={this.handleDayClick}
              onDayMouseEnter={this.handleDayMouseEnter}
              onMouseLeave={this.handleMonthMouseLeave}
              peekNextMonth={this.props.peekNextMonth}
              preSelection={this.props.preSelection}
              selected={this.props.selected}
              selectingDate={this.state.selectingDate}
              selectsEnd={this.props.selectsEnd}
              selectsStart={this.props.selectsStart}
              showWeekNumbers={this.props.showWeekNumbers}
              startDate={this.props.startDate}
              utcOffset={this.props.utcOffset}/>
        </div>
      )
    }
    return monthList
  }

  render () {
    return (
      <div
          className={classnames('react-datepicker', this.props.className)}
          role={this.props.withPortal === true ? 'dialog' : 'tooltip'}>
        <div className="react-datepicker__triangle" />
        {this.renderPreviousMonthButton()}
        {this.renderNextMonthButton()}
        {this.renderMonths()}
        {this.renderTodayButton()}
        {this.props.children}
      </div>
    )
  }
}
