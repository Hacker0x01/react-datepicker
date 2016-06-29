import React from 'react'
import moment from 'moment'

var Time = React.createClass({
  displayName: 'Time',

  propTypes: {
    selected: React.PropTypes.string,
    onTimeClick: React.PropTypes.func
  },
  getDefaultProps () {
    return {
      selected: '12:00'
    }
  },

  handleTimeClick (time) {
    this.props.onTimeClick(time);
  },

  renderTimes () {
    let times = [];
    let startOfDay = moment().startOf('day');
    let endOfDay = moment().endOf('day');
    let time = startOfDay;

    while (time <= endOfDay) {
      times.push(time.toObject());
      time = time.clone().add(30, 'minutes');
    }
    return (
      <div className="react-datepicker__times">
        {times.map(time => (
          <div key={time.hours + time.minutes} className="react-datepicker__time" onClick={() => this.handleTimeClick(time)}>{moment().hours(time.hours).minutes(time.minutes).format('h:mm a').toString()}</div>
        ))}
      </div>
    )
  },

  render () {
    return (
      <div>
        {this.renderTimes()}
      </div>
    )
  }

})

module.exports = Time
