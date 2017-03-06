import React from 'react'
import classnames from 'classnames'
import Week from './week'

const FIXED_HEIGHT_STANDARD_WEEK_COUNT = 6

var Month = React.createClass({
  displayName: 'Month',

  propTypes: {
    day: React.PropTypes.object.isRequired,
    endDate: React.PropTypes.object,
    excludeDates: React.PropTypes.array,
    filterDate: React.PropTypes.func,
    fixedHeight: React.PropTypes.bool,
    highlightDates: React.PropTypes.array,
    includeDates: React.PropTypes.array,
    inline: React.PropTypes.bool,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onDayClick: React.PropTypes.func,
    onDayMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    peekNextMonth: React.PropTypes.bool,
    preSelection: React.PropTypes.object,
    selected: React.PropTypes.object,
    selectingDate: React.PropTypes.object,
    selectsEnd: React.PropTypes.bool,
    selectsStart: React.PropTypes.bool,
    showWeekNumbers: React.PropTypes.bool,
    startDate: React.PropTypes.object,
    utcOffset: React.PropTypes.number
  },

  handleDayClick (day, event) {
    if (this.props.onDayClick) {
      this.props.onDayClick(day, event)
    }
  },

  handleDayMouseEnter (day) {
    if (this.props.onDayMouseEnter) {
      this.props.onDayMouseEnter(day)
    }
  },

  handleMouseLeave () {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave()
    }
  },

  isWeekInMonth (startOfWeek) {
    const day = this.props.day
    const endOfWeek = startOfWeek.clone().add(6, 'days')
    return startOfWeek.isSame(day, 'month') || endOfWeek.isSame(day, 'month')
  },

  renderWeeks () {
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
  },

  getClassNames () {
    const { selectingDate, selectsStart, selectsEnd } = this.props
    return classnames('react-datepicker__month', {
      'react-datepicker__month--selecting-range': selectingDate && (selectsStart || selectsEnd)
    })
  },

  render () {
    return (
      <div className={this.getClassNames()} onMouseLeave={this.handleMouseLeave} role="listbox">
        {this.renderWeeks()}
      </div>
    )
  }

})

module.exports = Month
