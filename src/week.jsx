import React from 'react'
import Day from './day'
import WeekNumber from './week_number'

var Week = React.createClass({
  displayName: 'Week',

  propTypes: {
    day: React.PropTypes.object.isRequired,
    endDate: React.PropTypes.object,
    excludeDates: React.PropTypes.array,
    filterDate: React.PropTypes.func,
    highlightDates: React.PropTypes.array,
    includeDates: React.PropTypes.array,
    inline: React.PropTypes.bool,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    month: React.PropTypes.number,
    onDayClick: React.PropTypes.func,
    onDayMouseEnter: React.PropTypes.func,
    preSelection: React.PropTypes.object,
    selected: React.PropTypes.object,
    selectingDate: React.PropTypes.object,
    selectsEnd: React.PropTypes.bool,
    selectsStart: React.PropTypes.bool,
    showWeekNumber: React.PropTypes.bool,
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

  renderDays () {
    const startOfWeek = this.props.day.clone().startOf('week')
    const days = []
    if (this.props.showWeekNumber) {
      days.push(<WeekNumber key="W" weekNumber={parseInt(startOfWeek.format('w'), 10)} />)
    }
    return days.concat([0, 1, 2, 3, 4, 5, 6].map(offset => {
      const day = startOfWeek.clone().add(offset, 'days')
      return (
        <Day
            key={offset}
            day={day}
            month={this.props.month}
            onClick={this.handleDayClick.bind(this, day)}
            onMouseEnter={this.handleDayMouseEnter.bind(this, day)}
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
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            utcOffset={this.props.utcOffset}/>
      )
    }))
  },

  render () {
    return (
      <div className="react-datepicker__week">
        {this.renderDays()}
      </div>
    )
  }

})

module.exports = Week
