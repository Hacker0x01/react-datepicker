import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Week from './week'

const FIXED_HEIGHT_STANDARD_WEEK_COUNT = 6

export default class Month extends React.Component {
  static propTypes = {
    day: PropTypes.object.isRequired,
    endDate: PropTypes.object,
    excludeDates: PropTypes.array,
    filterDate: PropTypes.func,
    fixedHeight: PropTypes.bool,
    highlightDates: PropTypes.array,
    includeDates: PropTypes.array,
    inline: PropTypes.bool,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    onDayClick: PropTypes.func,
    onDayMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    peekNextMonth: PropTypes.bool,
    preSelection: PropTypes.object,
    selected: PropTypes.object,
    selectingDate: PropTypes.object,
    selectsEnd: PropTypes.bool,
    selectsStart: PropTypes.bool,
    showWeekNumbers: PropTypes.bool,
    startDate: PropTypes.object,
    utcOffset: PropTypes.number
  }

  handleDayClick = (day, event) => {
    if (this.props.onDayClick) {
      this.props.onDayClick(day, event)
    }
  }

  handleDayMouseEnter = (day) => {
    if (this.props.onDayMouseEnter) {
      this.props.onDayMouseEnter(day)
    }
  }

  handleMouseLeave = () => {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave()
    }
  }

  isWeekInMonth = (startOfWeek) => {
    const day = this.props.day
    const endOfWeek = startOfWeek.clone().add(6, 'days')
    return startOfWeek.isSame(day, 'month') || endOfWeek.isSame(day, 'month')
  }

  renderWeeks = () => {
    const weeks = []
    var isFixedHeight = this.props.fixedHeight
    let currentWeekStart = this.props.day.clone().startOf('month').startOf('week')
    let i = 0
    let breakAfterNextPush = false

    while (true) {
      weeks.push(<Week
          key={i}
          day={currentWeekStart}
          month={this.props.day.month()}
          onDayClick={this.handleDayClick}
          onDayMouseEnter={this.handleDayMouseEnter}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          excludeDates={this.props.excludeDates}
          includeDates={this.props.includeDates}
          inline={this.props.inline}
          highlightDates={this.props.highlightDates}
          selectingDate={this.props.selectingDate}
          filterDate={this.props.filterDate}
          preSelection={this.props.preSelection}
          selected={this.props.selected}
          selectsStart={this.props.selectsStart}
          selectsEnd={this.props.selectsEnd}
          showWeekNumber={this.props.showWeekNumbers}
          startDate={this.props.startDate}
          endDate={this.props.endDate}
          utcOffset={this.props.utcOffset}/>)

      if (breakAfterNextPush) break

      i++
      currentWeekStart = currentWeekStart.clone().add(1, 'weeks')

      // If one of these conditions is true, we will either break on this week
      // or break on the next week
      const isFixedAndFinalWeek = isFixedHeight && i >= FIXED_HEIGHT_STANDARD_WEEK_COUNT
      const isNonFixedAndOutOfMonth = !isFixedHeight && !this.isWeekInMonth(currentWeekStart)

      if (isFixedAndFinalWeek || isNonFixedAndOutOfMonth) {
        if (this.props.peekNextMonth) {
          breakAfterNextPush = true
        } else {
          break
        }
      }
    }

    return weeks
  }

  getClassNames = () => {
    const { selectingDate, selectsStart, selectsEnd } = this.props
    return classnames('react-datepicker__month', {
      'react-datepicker__month--selecting-range': selectingDate && (selectsStart || selectsEnd)
    })
  }

  render () {
    return (
      <div className={this.getClassNames()} onMouseLeave={this.handleMouseLeave} role="listbox">
        {this.renderWeeks()}
      </div>
    )
  }
}
