import moment from 'moment'
import find from 'lodash/find'
import YearDropdown from './year_dropdown'
import MonthDropdown from './month_dropdown'
import Month from './month'
import React from 'react'
import { isSameDay, allDaysDisabledBefore, allDaysDisabledAfter, getEffectiveMinDate, getEffectiveMaxDate } from './date_utils'

const DROPDOWN_FOCUS_CLASSNAMES = [
  'react-datepicker__year-select',
  'react-datepicker__month-select'
]

const isDropdownSelect = (element = {}) => {
  const classNames = (element.className || '').split(/\s+/)
  return !!find(DROPDOWN_FOCUS_CLASSNAMES, (testClassname) => {
    return classNames.indexOf(testClassname) >= 0
  })
}

var Calendar = React.createClass({
  displayName: 'Calendar',

  propTypes: {
    dateFormat: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array
    ]).isRequired,
    dropdownMode: React.PropTypes.oneOf(['scroll', 'select']).isRequired,
    endDate: React.PropTypes.object,
    excludeDates: React.PropTypes.array,
    filterDate: React.PropTypes.func,
    fixedHeight: React.PropTypes.bool,
    highlightDates: React.PropTypes.array,
    includeDates: React.PropTypes.array,
    locale: React.PropTypes.string,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    monthsShown: React.PropTypes.number,
    onClickOutside: React.PropTypes.func.isRequired,
    onDropdownFocus: React.PropTypes.func,
    onSelect: React.PropTypes.func.isRequired,
    openToDate: React.PropTypes.object,
    peekNextMonth: React.PropTypes.bool,
    scrollableYearDropdown: React.PropTypes.bool,
    selected: React.PropTypes.object,
    selectsEnd: React.PropTypes.bool,
    selectsStart: React.PropTypes.bool,
    showMonthDropdown: React.PropTypes.bool,
    showWeekNumbers: React.PropTypes.bool,
    showYearDropdown: React.PropTypes.bool,
    startDate: React.PropTypes.object,
    todayButton: React.PropTypes.string,
    utcOffset: React.PropTypes.number
  },

  mixins: [require('react-onclickoutside')],

  defaultProps: {
    onDropdownFocus: () => {}
  },

  getDefaultProps () {
    return {
      utcOffset: moment.utc().utcOffset(),
      monthsShown: 1
    }
  },

  getInitialState () {
    return {
      date: this.localizeMoment(this.getDateInView()),
      selectingDate: null
    }
  },

  componentWillReceiveProps (nextProps) {
    if (nextProps.selected && !isSameDay(nextProps.selected, this.props.selected)) {
      this.setState({
        date: this.localizeMoment(nextProps.selected)
      })
    } else if (nextProps.openToDate && !isSameDay(nextProps.openToDate, this.props.openToDate)) {
      this.setState({
        date: this.localizeMoment(nextProps.openToDate)
      })
    }
  },

  handleClickOutside (event) {
    this.props.onClickOutside(event)
  },

  handleDropdownFocus (event) {
    if (isDropdownSelect(event.target)) {
      this.props.onDropdownFocus()
    }
  },

  getDateInView () {
    const { selected, openToDate, utcOffset } = this.props
    const minDate = getEffectiveMinDate(this.props)
    const maxDate = getEffectiveMaxDate(this.props)
    const current = moment.utc().utcOffset(utcOffset)
    if (selected) {
      return selected
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
  },

  localizeMoment (date) {
    return date.clone().locale(this.props.locale || moment.locale())
  },

  increaseMonth () {
    this.setState({
      date: this.state.date.clone().add(1, 'month')
    })
  },

  decreaseMonth () {
    this.setState({
      date: this.state.date.clone().subtract(1, 'month')
    })
  },

  handleDayClick (day, event) {
    this.props.onSelect(day, event)
  },

  handleDayMouseEnter (day) {
    this.setState({ selectingDate: day })
  },

  handleMonthMouseLeave () {
    this.setState({ selectingDate: null })
  },

  changeYear (year) {
    this.setState({
      date: this.state.date.clone().set('year', year)
    })
  },

  changeMonth (month) {
    this.setState({
      date: this.state.date.clone().set('month', month)
    })
  },

  header (date = this.state.date) {
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
        <div key={offset} className="react-datepicker__day-name">
          {day.localeData().weekdaysMin(day)}
        </div>
      )
    }))
  },

  renderPreviousMonthButton () {
    if (allDaysDisabledBefore(this.state.date, 'month', this.props)) {
      return
    }
    return <a
        className='react-datepicker__navigation react-datepicker__navigation--previous'
        onClick={this.decreaseMonth} />
  },

  renderNextMonthButton () {
    if (allDaysDisabledAfter(this.state.date, 'month', this.props)) {
      return
    }
    return <a
        className='react-datepicker__navigation react-datepicker__navigation--next'
        onClick={this.increaseMonth} />
  },

  renderCurrentMonth (date = this.state.date) {
    var classes = ['react-datepicker__current-month']
    if (this.props.showYearDropdown) {
      classes.push('react-datepicker__current-month--hasYearDropdown')
    }
    return (
      <div className={classes.join(' ')}>
        {date.format(this.props.dateFormat)}
      </div>
    )
  },

  renderYearDropdown (overrideHide = false) {
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
  },

  renderMonthDropdown (overrideHide = false) {
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
  },

  renderTodayButton () {
    if (!this.props.todayButton) {
      return
    }
    return (
      <div className="react-datepicker__today-button" onClick={(event) => this.props.onSelect(moment.utc().utcOffset(this.props.utcOffset).startOf('date'), event)}>
        {this.props.todayButton}
      </div>
    )
  },

  renderMonths () {
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
                onDayClick={this.handleDayClick}
                onDayMouseEnter={this.handleDayMouseEnter}
                onMouseLeave={this.handleMonthMouseLeave}
                minDate={this.props.minDate}
                maxDate={this.props.maxDate}
                excludeDates={this.props.excludeDates}
                highlightDates={this.props.highlightDates}
                selectingDate={this.state.selectingDate}
                includeDates={this.props.includeDates}
                fixedHeight={this.props.fixedHeight}
                filterDate={this.props.filterDate}
                selected={this.props.selected}
                selectsStart={this.props.selectsStart}
                selectsEnd={this.props.selectsEnd}
                showWeekNumbers={this.props.showWeekNumbers}
                startDate={this.props.startDate}
                endDate={this.props.endDate}
                peekNextMonth={this.props.peekNextMonth}
                utcOffset={this.props.utcOffset}/>
          </div>
      )
    }
    return monthList
  },

  render () {
    return (
      <div className="react-datepicker">
        <div className="react-datepicker__triangle"></div>
        {this.renderPreviousMonthButton()}
        {this.renderNextMonthButton()}
        {this.renderMonths()}
        {this.renderTodayButton()}
      </div>
    )
  }
})

module.exports = Calendar
