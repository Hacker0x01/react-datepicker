import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import { isSameDay, isSameDayAndTime, allDaysDisabledBefore, allDaysDisabledAfter, getEffectiveMinDate, getEffectiveMaxDate } from './date_utils'

var Time = React.createClass({
  displayName: 'Time',

  propTypes: {
    selected: React.PropTypes.object,
    onTimeClick: React.PropTypes.func,
    dateOnly: React.PropTypes.bool,
  },

  getInitialState () {
    return {
      selectedTime: []
    }
  },

  componentDidMount: function() {
    if (!this.props.dateOnly && this.refs.activeTime) {
      this.scrollElementIntoViewIfNeeded(this.refs.activeTime);
    }
  },

  scrollElementIntoViewIfNeeded(domNode) {
    var containerDomNode = ReactDOM.findDOMNode(this.refs.timeContainer);
    let scrollPosition = domNode.id * domNode.offsetHeight;
    containerDomNode.scrollTop = scrollPosition;
  },

  handleTimeClick (time) {
    this.props.onTimeClick(time);
  },

  renderTimes () {
    let selectedHours = null;
    let selectedMinutes = null;

    if (!this.props.dateOnly) {
      selectedHours = moment(this.props.selected).get('hours');
      selectedMinutes = moment(this.props.selected).get('minutes');
    }

    let times = [];
    let startOfDay = moment().startOf('day');
    let endOfDay = moment().endOf('day');
    let time = startOfDay;

    while (time <= endOfDay) {
      times.push(time.toObject());
      time = time.clone().add(30, 'minutes');
    }
    return (
      <div ref="timeContainer" className="react-datepicker__times">
        {times.map((time, i) => (
          <div key={time.hours + time.minutes} id={i} ref={selectedHours === time.hours && selectedMinutes === time.minutes ? 'activeTime' : null} className={'react-datepicker__time' + (selectedHours === time.hours && selectedMinutes === time.minutes ? ' react-datepicker__time--selected' : '')} onClick={() => this.handleTimeClick(time)}>{moment().hours(time.hours).minutes(time.minutes).format('h:mm a').toString()}</div>
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
