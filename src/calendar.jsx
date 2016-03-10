import moment from 'moment'
import YearDropdown from './year_dropdown'
import Month from './month'
import React from 'react'
import { isSameDay } from './date_utils'

var Calendar = React.createClass({
  displayName: 'Calendar',

  propTypes: {
    dateFormat: React.PropTypes.string.isRequired,
    endDate: React.PropTypes.object,
    excludeDates: React.PropTypes.array,
    filterDate: React.PropTypes.func,
    includeDates: React.PropTypes.array,
    locale: React.PropTypes.string,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onClickOutside: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    selected: React.PropTypes.object,
    showYearDropdown: React.PropTypes.bool,
    startDate: React.PropTypes.object,
    todayButton: React.PropTypes.string
  },

  mixins: [require('react-onclickoutside')],

  getInitialState () {
    return {
      date: this.localizeMoment(this.getDateInView())
    }
  },

  componentWillReceiveProps (nextProps) {
    if (nextProps.selected && !isSameDay(nextProps.selected, this.props.selected)) {
      this.setState({
        date: this.localizeMoment(nextProps.selected)
      })
    }
  },

  handleClickOutside (event) {
    this.props.onClickOutside(event)
  },

  getDateInView () {
    const { selected, minDate, maxDate } = this.props
    const current = moment()
    if (selected) {
      return selected
    } else if (minDate && minDate.isAfter(current)) {
      return minDate
    } else if (maxDate && maxDate.isBefore(current)) {
      return maxDate
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

  handleDayClick (day) {
    this.props.onSelect(day)
  },

  changeYear (year) {
    this.setState({
      date: this.state.date.clone().set('year', year)
    })
  },

  header () {
    const startOfWeek = this.state.date.clone().startOf('week')
    return [0, 1, 2, 3, 4, 5, 6].map(offset => {
      const day = startOfWeek.clone().add(offset, 'days')
      return (
        <div key={offset} className="datepicker__day">
          {day.localeData().weekdaysMin(day)}
        </div>
      )
    })
  },

  renderCurrentMonth () {
    var classes = ['datepicker__current-month']
    if (this.props.showYearDropdown) {
      classes.push('datepicker__current-month--hasYearDropdown')
    }
    return (
      <div className={classes.join(' ')}>
        {this.state.date.format(this.props.dateFormat)}
      </div>
    )
  },

  renderYearDropdown () {
    if (!this.props.showYearDropdown) {
      return
    }
    return (
      <YearDropdown
          onChange={this.changeYear}
          year={this.state.date.year()} />
    )
  },

  renderTodayButton () {
    if (!this.props.todayButton) {
      return
    }
    return (
      <div className="datepicker__today-button" onClick={() => this.props.onSelect(moment())}>
        {this.props.todayButton}
      </div>
    )
  },

  render () {
    return (
      <div className="datepicker__calendar">
        <div className="datepicker__triangle"></div>
        <div className="datepicker__header">
          <a className="datepicker__navigation datepicker__navigation--previous"
              onClick={this.decreaseMonth}>
          </a>
          {this.renderCurrentMonth()}
          {this.renderYearDropdown()}
          <a className="datepicker__navigation datepicker__navigation--next"
              onClick={this.increaseMonth}>
          </a>
          <div>
            {this.header()}
          </div>
        </div>
        <Month
            day={this.state.date}
            onDayClick={this.handleDayClick}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            excludeDates={this.props.excludeDates}
            includeDates={this.props.includeDates}
            filterDate={this.props.filterDate}
            selected={this.props.selected}
            startDate={this.props.startDate}
            endDate={this.props.endDate} />
        {this.renderTodayButton()}
      </div>
    )
  }
})

module.exports = Calendar
