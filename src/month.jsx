import React from 'react'
import Week from './week'

var Month = React.createClass({
  displayName: 'Month',

  propTypes: {
    day: React.PropTypes.object.isRequired,
    onDayClick: React.PropTypes.func,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    excludeDates: React.PropTypes.array,
    includeDates: React.PropTypes.array,
    filterDate: React.PropTypes.func,
    selected: React.PropTypes.object,
    startDate: React.PropTypes.object,
    endDate: React.PropTypes.object
  },

  handleDayClick (day) {
    if (this.props.onDayClick) {
      this.props.onDayClick(day)
    }
  },

  isWeekInMonth (startOfWeek) {
    const day = this.props.day
    const endOfWeek = startOfWeek.clone().add(6, 'days')
    return startOfWeek.isSame(day, 'month') || endOfWeek.isSame(day, 'month')
  },

  renderWeeks () {
    const startOfMonth = this.props.day.clone().startOf('month').startOf('week')
    return [0, 1, 2, 3, 4, 5]
      .map(offset => startOfMonth.clone().add(offset, 'weeks'))
      .filter(startOfWeek => this.isWeekInMonth(startOfWeek))
      .map((startOfWeek, offset) =>
        <Week
            key={offset}
            day={startOfWeek}
            month={this.props.day.month()}
            onDayClick={this.handleDayClick}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            excludeDates={this.props.excludeDates}
            includeDates={this.props.includeDates}
            filterDate={this.props.filterDate}
            selected={this.props.selected}
            startDate={this.props.startDate}
            endDate={this.props.endDate} />
      )
  },

  render () {
    return (
      <div className="datepicker__month">
        {this.renderWeeks()}
      </div>
    )
  }

})

module.exports = Month
