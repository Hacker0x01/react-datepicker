import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { isTimeInDisabledRange, isTimeDisabled } from './date_utils'

export default class Time extends React.Component {
  static propTypes = {
    format: PropTypes.string,
    intervals: PropTypes.number,
    selected: PropTypes.object,
    onChange: PropTypes.func,
    todayButton: PropTypes.string,
    minTime: PropTypes.object,
    maxTime: PropTypes.object,
    excludeTimes: PropTypes.array,
    monthRef: PropTypes.object
  }

  static get defaultProps () {
    return {
      intervals: 30,
      onTimeChange: () => {},
      todayButton: null
    }
  }

  componentDidMount () {
    // code to ensure selected time will always be in focus within time window when it first appears
    const multiplier = 60 / this.props.intervals
    const currH = (this.props.selected) ? this.props.selected.get('hours') : moment().get('hours')
    this.list.scrollTop = 30 * (multiplier * currH)
  }

  handleClick = (time) => {
    if (((this.props.minTime || this.props.maxTime) && isTimeInDisabledRange(time, this.props)) || (this.props.excludeTimes && isTimeDisabled(time, this.props.excludeTimes))) {
      return
    }

    this.props.onChange(time)
  }

  liClasses = (time, currH, currM) => {
    let classes = ['react-datepicker__time-list-item']

    if ((currH === time.get('hours')) && (currM === time.get('minutes'))) {
      classes.push('react-datepicker__time-list-item--selected')
    }
    if (((this.props.minTime || this.props.maxTime) && isTimeInDisabledRange(time, this.props)) || (this.props.excludeTimes && isTimeDisabled(time, this.props.excludeTimes))) {
      classes.push('react-datepicker__time-list-item--disabled')
    }

    return classes.join(' ')
  }

  renderTimes = () => {
    let times = []
    const format = (this.props.format) ? this.props.format : 'hh:mm A'
    const intervals = this.props.intervals
    const activeTime = (this.props.selected) ? this.props.selected : moment()
    const currH = activeTime.get('hours')
    const currM = activeTime.get('minutes')
    let base = moment().startOf('day')
    const multiplier = 1440 / intervals
    for (let i = 0; i < multiplier; i++) {
      times.push(base.clone().add(i * intervals, 'minutes'))
    }

    return times.map((time, i) =>
      <li key={i} onClick={this.handleClick.bind(this, time)} className={this.liClasses(time, currH, currM)}>
        {time.format(format)}
      </li>
    )
  }

  render () {
    let height = null
    if (this.props.monthRef) {
      height = this.props.monthRef.clientHeight - 39
    }

    return (
      <div className={`react-datepicker__time-container ${(this.props.todayButton) ? 'react-datepicker__time-container--with-today-button' : ''}`}>
        <div className="react-datepicker__header react-datepicker__header--time">
          <div className="react-datepicker-time__header">Time</div>
        </div>
        <div className="react-datepicker__time">
          <div className="react-datepicker__time-box">
            <ul className="react-datepicker__time-list" ref={list => { this.list = list }} style={height ? {height} : {}}>
              {this.renderTimes.bind(this)()}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
