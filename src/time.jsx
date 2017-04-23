import React from "react"
import PropTypes from "prop-types"
import moment from "moment"
import { isTimeInDisabledRange, isTimeDisabled } from "./date_utils"

export default class Time extends React.Component {
  static propTypes = {
    intervals: PropTypes.number,
    selected: PropTypes.object,
    onTimeChange: PropTypes.func,
    todayButton: PropTypes.string,
    showMonthDropdown: PropTypes.bool,
    showYearDropdown: PropTypes.bool,
    withPortal: PropTypes.bool,
    minTime: PropTypes.object,
    maxTime: PropTypes.object,
    excludeTimes: PropTypes.array
  }

  static get defaultProps () {
    return {
      intervals: 30,
      onTimeChange: () => {},
      todayButton: null
    }
  }

  handleClick = (time) => {
    if (((this.props.minTime || this.props.maxTime) && isTimeInDisabledRange(time, this.props)) || (this.props.excludeTimes && isTimeDisabled(time, this.props.excludeTimes)))
      return

    this.props.onTimeChange(time)
  }

  componentDidMount() {
    //code to ensure selected time will always be in focus within time window when it first appears
    let node = this.refs.timeList
    const multiplier = 60 / this.props.intervals
    const currH = (this.props.selected) ? this.props.selected.get("hours") : moment().get("hours")
    node.scrollTop = 30 * (multiplier * currH)
  }

  ulClasses = () => {
    let classes = ["react-datepicker__time-list"]
    if (this.props.showYearDropdown || this.props.showMonthDropdown)
      classes.push("react-datepicker__time-list--with-dropdowns")
    if (this.props.todayButton)
      classes.push("react-datepicker__time-list--with-today-button")
    if (this.props.withPortal)
      classes.push("react-datepicker__time-list--with-portal")

    return classes.join(" ")
  }

  liClasses = (time, currH, currM) => {
    let classes = ["react-datepicker__time-list-item"]
    if ((currH == time.get("hours")) && (currM == time.get("minutes")))
      classes.push("react-datepicker__time-list-item--selected")
    if (((this.props.minTime || this.props.maxTime) && isTimeInDisabledRange(time, this.props)) || (this.props.excludeTimes && isTimeDisabled(time, this.props.excludeTimes)))
      classes.push("react-datepicker__time-list-item--disabled")

    return classes.join(" ")
  }

  renderTimes = () => {
    let times = []
    const intervals = this.props.intervals
    const activeTime = (this.props.selected) ? this.props.selected : moment()
    const currH = activeTime.get("hours")
    const currM = activeTime.get("minutes")
    let base = moment().startOf("day")
    const multiplier = 1440 / intervals
    for (let i = 0; i < multiplier; i++)
      times.push(base.clone().add(i * intervals, "minutes"))
    return times.map((time, i) => 
      <li key={i} onClick={this.handleClick.bind(this, time)} className={this.liClasses(time, currH, currM)}>
        {time.format("hh:mm A")}
      </li>
    );
  }

  render() {
    return (
      <div className={`react-datepicker__time-container ${(this.props.todayButton) ? "react-datepicker__time-container--with-today-button" : ""}`}>
        <div className="react-datepicker__header react-datepicker__header--time">
          <div className="react-datepicker-time__header">Time</div>
        </div>
        <div className="react-datepicker__time">
          <div className="react-datepicker__time-box">
            <ul className={this.ulClasses()} ref="timeList">
              {this.renderTimes.bind(this)()}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
