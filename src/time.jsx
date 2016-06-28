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
    console.log(time);
    // let t = times[i];
    this.props.onTimeClick(time);
  },

  renderTimes () {
    let times = [];
    let startOfDay = moment().startOf('day');
    let endOfDay = moment().endOf('day');
    let time = startOfDay;

    while (time <= endOfDay) {
      times.push(time.format('h:mm a'));
      time = time.clone().add(30, 'minutes');
    }

    return (
      <div>
        {times.map(function(time, i){
          return(
            <div key={i} onClick={this.handleTimeClick.bind(this, time)}>{time}</div>
          )
        })}
      </div>
    )
  },

  render () {
    return (
      <div className="react-datepicker__times">
        {this.renderTimes()}
      </div>
    )
  }

})

module.exports = Time
