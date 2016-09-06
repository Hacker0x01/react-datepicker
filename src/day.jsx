import moment from 'moment'
import React from 'react'
import classnames from 'classnames'
import { isSameDay, isDayDisabled } from './date_utils'

function isDayInRange (day, startDate, endDate) {
  const before = startDate.clone().startOf('day').subtract(1, 'seconds')
  const after = endDate.clone().startOf('day').add(1, 'seconds')
  return day.clone().startOf('day').isBetween(before, after)
}

var Day = React.createClass({
  displayName: 'Day',

  propTypes: {
    day: React.PropTypes.object.isRequired,
    endDate: React.PropTypes.object,
    excludeDates: React.PropTypes.array,
    filterDate: React.PropTypes.func,
    highlightDates: React.PropTypes.array,
    hoverDate: React.PropTypes.object,
    includeDates: React.PropTypes.array,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    month: React.PropTypes.number,
    onClick: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    selected: React.PropTypes.object,
    selectsEnd: React.PropTypes.bool,
    selectsStart: React.PropTypes.bool,
    startDate: React.PropTypes.object,
    utcOffset: React.PropTypes.number
  },
  getDefaultProps () {
    return {
      utcOffset: moment.utc().utcOffset()
    }
  },
  handleClick (event) {
    if (!this.isDisabled() && this.props.onClick) {
      this.props.onClick(event)
    }
  },

  handleMouseEnter (event) {
    if (!this.isDisabled() && this.props.onMouseEnter) {
      this.props.onMouseEnter(event)
    }
  },

  handleMouseLeave (event) {
    if (!this.isDisabled() && this.props.onMouseLeave) {
      this.props.onMouseLeave(event)
    }
  },

  isSameDay (other) {
    return isSameDay(this.props.day, other)
  },

  isDisabled () {
    return isDayDisabled(this.props.day, this.props)
  },

  isHighlighted () {
    const { day, highlightDates } = this.props
    if (!highlightDates) return false
    return highlightDates.some((testDay) => { return isSameDay(day, testDay) })
  },

  isInRange () {
    const { day, startDate, endDate } = this.props
    if (!startDate || !endDate) return false
    return isDayInRange(day, startDate, endDate)
  },

  isInSelectingRange () {
    const { day, selectsStart, selectsEnd, hoverDate, startDate, endDate } = this.props

    if (!(selectsStart || selectsEnd) || !hoverDate || this.isDisabled()) {
      return false
    }

    if (selectsStart && endDate && hoverDate.isBefore(endDate)) {
      return isDayInRange(day, hoverDate, endDate)
    }

    if (selectsEnd && startDate && hoverDate.isAfter(startDate)) {
      return isDayInRange(day, startDate, hoverDate)
    }

    return false
  },

  isSelectingRangeStart () {
    const { day, hoverDate, endDate } = this.props

    if (!hoverDate || !endDate || this.isDisabled()) return false
    return isSameDay(hoverDate, day)
  },

  isSelectingRangeEnd () {
    const { day, hoverDate, startDate } = this.props

    if (!hoverDate || !startDate || this.isDisabled()) return false
    return isSameDay(hoverDate, day)
  },

  isRangeStart () {
    const { day, hoverDate, startDate, endDate } = this.props
    if (!startDate && !(endDate || hoverDate)) return false
    return isSameDay(startDate, day)
  },

  isRangeEnd () {
    const { day, startDate, endDate } = this.props
    if (!startDate || !endDate) return false
    return isSameDay(endDate, day)
  },

  isWeekend () {
    const weekday = this.props.day.day()
    return weekday === 0 || weekday === 6
  },

  isOutsideMonth () {
    return this.props.month !== undefined &&
      this.props.month !== this.props.day.month()
  },

  getClassNames () {
    return classnames('react-datepicker__day', {
      'react-datepicker__day--disabled': this.isDisabled(),
      'react-datepicker__day--selected': this.isSameDay(this.props.selected),
      'react-datepicker__day--highlighted': this.isHighlighted(),
      'react-datepicker__day--range-start': this.isRangeStart(),
      'react-datepicker__day--range-end': this.isRangeEnd(),
      'react-datepicker__day--in-range': this.isInRange(),
      'react-datepicker__day--in-selecting-range': this.isInSelectingRange(),
      'react-datepicker__day--selecting-range-start': this.isSelectingRangeStart(),
      'react-datepicker__day--selecting-range-end': this.isSelectingRangeEnd(),
      'react-datepicker__day--today': this.isSameDay(moment.utc().utcOffset(this.props.utcOffset)),
      'react-datepicker__day--weekend': this.isWeekend(),
      'react-datepicker__day--outside-month': this.isOutsideMonth()
    })
  },

  render () {
    return (
      <div
          className={this.getClassNames()}
          onClick={this.handleClick}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          aria-label={`day-${this.props.day.date()}`}
          role="option">
          {this.props.day.date()}
      </div>
    )
  }
})

module.exports = Day
