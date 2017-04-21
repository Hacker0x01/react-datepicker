import React from "react"
import PropTypes from "prop-types"
import moment from "moment"

export default class Time extends React.Component {
  static propTypes = {
    intervals: PropTypes.number,
    selected: PropTypes.object,
    onTimeChange: PropTypes.func,
    todayButton: PropTypes.string
  }

  static get defaultProps () {
    return {
      intervals: 30,
      onTimeChange: () => {},
      todayButton: null
    }
  }

  handleClick = (time) => {
    this.props.onTimeChange(time)
  }

  componentDidMount() {
    //code to ensure selected time will always be in focus within time window when it first appears
    let node = this.refs.timeList
    const multiplier = 60 / this.props.intervals
    const currH = (this.props.selected) ? this.props.selected.get("hours") : moment().get("hours")
    node.scrollTop = 30 * (multiplier * currH)
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
    return times.map((time, i) => {
      let active = (currH == time.get("hours")) && (currM == time.get("minutes"))
      return <li key={i} onClick={this.handleClick.bind(this, time)} className={`react-datepicker__time-list-item ${(active) ? "react-datepicker__time-list-item--selected" : ""}`}>
        {time.format("hh:mm A")}
      </li>
    });
  }

  render() {
    let containerStyles = (this.props.todayButton) ? {
      display: "inline",
      border: "1px solid #aeaeae",
      borderRadius: "0.3rem",
      position: "absolute",
      right: "-72px",
      top: 0
    } : {}

    return (
      <div className="react-datepicker__time-container" style={containerStyles}>
        <div className="react-datepicker__header">
          <div className="react-datepicker-time__header">Time</div>
        </div>
        <div className="react-datepicker__time">
          <div className="react-datepicker__time-box">
            <ul className="react-datepicker__time-list" ref="timeList">
              {this.renderTimes.bind(this)()}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
