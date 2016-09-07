import React from 'react'
import classnames from 'classnames'
import Week from './week'

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
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onDayClick: React.PropTypes.func,
    onDayMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    selected: React.PropTypes.object,
    selectingDate: React.PropTypes.object,
    selectsEnd: React.PropTypes.bool,
    selectsStart: React.PropTypes.bool,
    startDate: React.PropTypes.object,
    utcOffset: React.PropTypes.number
  },

  handleDayClick (day) {
    if (this.props.onDayClick) {
      this.props.onDayClick(day)
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
    const startOfMonth = this.props.day.clone().startOf('month').startOf('week')
    return [0, 1, 2, 3, 4, 5]
      .map(offset => startOfMonth.clone().add(offset, 'weeks'))
      .filter(startOfWeek => this.props.fixedHeight || this.isWeekInMonth(startOfWeek))
      .map((startOfWeek, offset) =>
        <Week
            key={offset}
            day={startOfWeek}
            month={this.props.day.month()}
            onDayClick={this.handleDayClick}
            onDayMouseEnter={this.handleDayMouseEnter}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            excludeDates={this.props.excludeDates}
            includeDates={this.props.includeDates}
            highlightDates={this.props.highlightDates}
            selectingDate={this.props.selectingDate}
            filterDate={this.props.filterDate}
            selected={this.props.selected}
            selectsStart={this.props.selectsStart}
            selectsEnd={this.props.selectsEnd}
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            utcOffset={this.props.utcOffset}/>
      )
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
