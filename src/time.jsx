import React from "react";
import PropTypes from "prop-types";
import {
  getHours,
  getMinutes,
  newDate,
  getStartOfDay,
  addMinutes,
  formatDate,
  isTimeInDisabledRange,
  isTimeDisabled,
  timesToInjectAfter
} from "./date_utils";

export default class Time extends React.Component {
  static propTypes = {
    format: PropTypes.string,
    includeTimes: PropTypes.array,
    intervals: PropTypes.number,
    selected: PropTypes.instanceOf(Date),
    onChange: PropTypes.func,
    todayButton: PropTypes.node,
    minTime: PropTypes.instanceOf(Date),
    maxTime: PropTypes.instanceOf(Date),
    excludeTimes: PropTypes.array,
    monthRef: PropTypes.object,
    timeCaption: PropTypes.string,
    injectTimes: PropTypes.array
  };

  static get defaultProps() {
    return {
      intervals: 30,
      onTimeChange: () => {},
      todayButton: null,
      timeCaption: "Time"
    };
  }

  static calcCenterPosition = (listHeight, centerLiRef) => {
    return (
      centerLiRef.offsetTop - (listHeight / 2 - centerLiRef.clientHeight / 2)
    );
  };

  componentDidMount() {
    // code to ensure selected time will always be in focus within time window when it first appears
    this.list.scrollTop = Time.calcCenterPosition(
      this.props.monthRef
        ? this.props.monthRef.clientHeight - this.header.clientHeight
        : this.list.clientHeight,
      this.centerLi
    );
  }

  handleClick = time => {
    if (
      ((this.props.minTime || this.props.maxTime) &&
        isTimeInDisabledRange(time, this.props)) ||
      (this.props.excludeTimes &&
        isTimeDisabled(time, this.props.excludeTimes)) ||
      (this.props.includeTimes &&
        !isTimeDisabled(time, this.props.includeTimes))
    ) {
      return;
    }
    this.props.onChange(time);
  };

  liClasses = (time, currH, currM) => {
    let classes = ["react-datepicker__time-list-item"];

    if (currH === getHours(time) && currM === getMinutes(time)) {
      classes.push("react-datepicker__time-list-item--selected");
    }
    if (
      ((this.props.minTime || this.props.maxTime) &&
        isTimeInDisabledRange(time, this.props)) ||
      (this.props.excludeTimes &&
        isTimeDisabled(time, this.props.excludeTimes)) ||
      (this.props.includeTimes &&
        !isTimeDisabled(time, this.props.includeTimes))
    ) {
      classes.push("react-datepicker__time-list-item--disabled");
    }
    if (
      this.props.injectTimes &&
      (getHours(time) * 60 + getMinutes(time)) % this.props.intervals !== 0
    ) {
      classes.push("react-datepicker__time-list-item--injected");
    }

    return classes.join(" ");
  };

  renderTimes = () => {
    let times = [];
    const format = this.props.format ? this.props.format : "p";
    const intervals = this.props.intervals;
    const activeTime = this.props.selected ? this.props.selected : newDate();
    const currH = getHours(activeTime);
    const currM = getMinutes(activeTime);
    let base = getStartOfDay(newDate());
    const multiplier = 1440 / intervals;
    const sortedInjectTimes =
      this.props.injectTimes &&
      this.props.injectTimes.sort(function(a, b) {
        return a - b;
      });
    for (let i = 0; i < multiplier; i++) {
      const currentTime = addMinutes(base, i * intervals);
      times.push(currentTime);

      if (sortedInjectTimes) {
        const timesToInject = timesToInjectAfter(
          base,
          currentTime,
          i,
          intervals,
          sortedInjectTimes
        );
        times = times.concat(timesToInject);
      }
    }

    return times.map((time, i) => (
      <li
        key={i}
        onClick={this.handleClick.bind(this, time)}
        className={this.liClasses(time, currH, currM)}
        ref={li => {
          if (
            (currH === getHours(time) && currM === getMinutes(time)) ||
            (currH === getHours(time) && !this.centerLi)
          ) {
            this.centerLi = li;
          }
        }}
      >
        {formatDate(time, format)}
      </li>
    ));
  };

  render() {
    let height = null;
    if (this.props.monthRef && this.header) {
      height = this.props.monthRef.clientHeight - this.header.clientHeight;
    }

    return (
      <div
        className={`react-datepicker__time-container ${
          this.props.todayButton
            ? "react-datepicker__time-container--with-today-button"
            : ""
        }`}
      >
        <div
          className="react-datepicker__header react-datepicker__header--time"
          ref={header => {
            this.header = header;
          }}
        >
          <div className="react-datepicker-time__header">
            {this.props.timeCaption}
          </div>
        </div>
        <div className="react-datepicker__time">
          <div className="react-datepicker__time-box">
            <ul
              className="react-datepicker__time-list"
              ref={list => {
                this.list = list;
              }}
              style={height ? { height } : {}}
            >
              {this.renderTimes.bind(this)()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
