import moment from 'moment'
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isSameDay, isDayDisabled, isDayInRange } from './date_utils'

export default class Day extends React.Component {
  static propTypes = {
    day: PropTypes.object.isRequired,
    endDate: PropTypes.object,
    highlightDates: PropTypes.array,
    inline: PropTypes.bool,
    month: PropTypes.number,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    preSelection: PropTypes.object,
    selected: PropTypes.object,
    selectingDate: PropTypes.object,
    selectsEnd: PropTypes.bool,
    selectsStart: PropTypes.bool,
    startDate: PropTypes.object,
    utcOffset: PropTypes.number
  }

  static defaultProps = {
    utcOffset: moment.utc().utcOffset()
  }

  handleClick = (event) => {
    if (!this.isDisabled() && this.props.onClick) {
      this.props.onClick(event)
    }
  }

  handleMouseEnter = (event) => {
    if (!this.isDisabled() && this.props.onMouseEnter) {
      this.props.onMouseEnter(event)
    }
  }

  isSameDay = (other) => isSameDay(this.props.day, other)

  isKeyboardSelected = () =>
    !this.props.inline && !this.isSameDay(this.props.selected) && this.isSameDay(this.props.preSelection)

  isDisabled = () => isDayDisabled(this.props.day, this.props)

  getHighLightedClass = (defaultClassName) => {
    const { day, highlightDates } = this.props
    if (!highlightDates) {
      return {[defaultClassName]: false}
    }
    for (let i = 0, len = highlightDates.length; i < len; i++) {
      const obj = highlightDates[i]
      if (obj instanceof moment) {
        if (isSameDay(day, obj)) {
          return {[defaultClassName]: true}
        }
      } else if (typeof obj === 'object') {
        const keys = Object.keys(obj)
        const arr = obj[keys[0]]
        if (typeof keys[0] === 'string' && arr.constructor === Array) {
          for (let k = 0, len = arr.length; k < len; k++) {
            if (isSameDay(day, arr[k])) {
              return {[keys[0]]: true}
            }
          }
        }
      }
    }
  }

  isInRange = () => {
    const { day, startDate, endDate } = this.props
    if (!startDate || !endDate) {
      return false
    }
    return isDayInRange(day, startDate, endDate)
  }

  isInSelectingRange = () => {
    const { day, selectsStart, selectsEnd, selectingDate, startDate, endDate } = this.props

    if (!(selectsStart || selectsEnd) || !selectingDate || this.isDisabled()) {
      return false
    }

    if (selectsStart && endDate && selectingDate.isSameOrBefore(endDate)) {
      return isDayInRange(day, selectingDate, endDate)
    }

    if (selectsEnd && startDate && selectingDate.isSameOrAfter(startDate)) {
      return isDayInRange(day, startDate, selectingDate)
    }

    return false
  }

  isSelectingRangeStart = () => {
    if (!this.isInSelectingRange()) {
      return false
    }

    const { day, selectingDate, startDate, selectsStart } = this.props

    if (selectsStart) {
      return isSameDay(day, selectingDate)
    } else {
      return isSameDay(day, startDate)
    }
  }

  isSelectingRangeEnd = () => {
    if (!this.isInSelectingRange()) {
      return false
    }

    const { day, selectingDate, endDate, selectsEnd } = this.props

    if (selectsEnd) {
      return isSameDay(day, selectingDate)
    } else {
      return isSameDay(day, endDate)
    }
  }

  isRangeStart = () => {
    const { day, startDate, endDate } = this.props
    if (!startDate || !endDate) {
      return false
    }
    return isSameDay(startDate, day)
  }

  isRangeEnd = () => {
    const { day, startDate, endDate } = this.props
    if (!startDate || !endDate) {
      return false
    }
    return isSameDay(endDate, day)
  }

  isWeekend = () => {
    const weekday = this.props.day.day()
    return weekday === 0 || weekday === 6
  }

  isOutsideMonth = () => {
    return this.props.month !== undefined &&
      this.props.month !== this.props.day.month()
  }

  getClassNames = () => {
    return classnames('react-datepicker__day', {
      'react-datepicker__day--disabled': this.isDisabled(),
      'react-datepicker__day--selected': this.isSameDay(this.props.selected),
      'react-datepicker__day--keyboard-selected': this.isKeyboardSelected(),
      'react-datepicker__day--range-start': this.isRangeStart(),
      'react-datepicker__day--range-end': this.isRangeEnd(),
      'react-datepicker__day--in-range': this.isInRange(),
      'react-datepicker__day--in-selecting-range': this.isInSelectingRange(),
      'react-datepicker__day--selecting-range-start': this.isSelectingRangeStart(),
      'react-datepicker__day--selecting-range-end': this.isSelectingRangeEnd(),
      'react-datepicker__day--today': this.isSameDay(moment.utc().utcOffset(this.props.utcOffset)),
      'react-datepicker__day--weekend': this.isWeekend(),
      'react-datepicker__day--outside-month': this.isOutsideMonth()
    }, this.getHighLightedClass('react-datepicker__day--highlighted'))
  }

  render () {
    return (
      <div
          className={this.getClassNames()}
          onClick={this.handleClick}
          onMouseEnter={this.handleMouseEnter}
          aria-label={`day-${this.props.day.date()}`}
          role="option">
          {this.props.day.date()}
      </div>
    )
  }
}
