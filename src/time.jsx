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
  timesToInjectAfter,
  getHoursInDay,
  isSameMinute,
} from "./date_utils";

export default class Time extends React.Component {
  static get defaultProps() {
    return {
      intervals: 30,
      onTimeChange: () => {},
      todayButton: null,
      timeCaption: "Time",
    };
  }

  static calcCenterPosition = (listHeight, centerLiRef) => {
    return (
      centerLiRef.offsetTop - (listHeight / 2 - centerLiRef.clientHeight / 2)
    );
  };

  static propTypes = {
    format: PropTypes.string,
    includeTimes: PropTypes.array,
    intervals: PropTypes.number,
    selected: PropTypes.instanceOf(Date),
    openToDate: PropTypes.instanceOf(Date),
    onChange: PropTypes.func,
    timeClassName: PropTypes.func,
    todayButton: PropTypes.node,
    minTime: PropTypes.instanceOf(Date),
    maxTime: PropTypes.instanceOf(Date),
    excludeTimes: PropTypes.array,
    filterTime: PropTypes.func,
    monthRef: PropTypes.object,
    timeCaption: PropTypes.string,
    injectTimes: PropTypes.array,
    handleOnKeyDown: PropTypes.func,
    locale: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ locale: PropTypes.object }),
    ]),
    showTimeSelectOnly: PropTypes.bool,
  };

  state = {
    height: null,
  };

  componentDidMount() {
    // code to ensure selected time will always be in focus within time window when it first appears
    this.scrollToTheSelectedTime();
    if (this.props.monthRef && this.header) {
      this.setState({
        height: this.props.monthRef.clientHeight - this.header.clientHeight,
      });
    }
  }

  scrollToTheSelectedTime = () => {
    requestAnimationFrame(() => {
      if (!this.list) return;

      this.list.scrollTop =
        this.centerLi &&
        Time.calcCenterPosition(
          this.props.monthRef
            ? this.props.monthRef.clientHeight - this.header.clientHeight
            : this.list.clientHeight,
          this.centerLi,
        );
    });
  };

  handleClick = (time) => {
    if (
      ((this.props.minTime || this.props.maxTime) &&
        isTimeInDisabledRange(time, this.props)) ||
      ((this.props.excludeTimes ||
        this.props.includeTimes ||
        this.props.filterTime) &&
        isTimeDisabled(time, this.props))
    ) {
      return;
    }
    this.props.onChange(time);
  };

  isSelectedTime = (time) =>
    this.props.selected && isSameMinute(this.props.selected, time);

  isDisabledTime = (time) =>
    ((this.props.minTime || this.props.maxTime) &&
      isTimeInDisabledRange(time, this.props)) ||
    ((this.props.excludeTimes ||
      this.props.includeTimes ||
      this.props.filterTime) &&
      isTimeDisabled(time, this.props));

  liClasses = (time) => {
    let classes = [
      "react-datepicker__time-list-item",
      this.props.timeClassName ? this.props.timeClassName(time) : undefined,
    ];

    if (this.isSelectedTime(time)) {
      classes.push("react-datepicker__time-list-item--selected");
    }

    if (this.isDisabledTime(time)) {
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

  handleOnKeyDown = (event, time) => {
    if (event.key === " ") {
      event.preventDefault();
      event.key = "Enter";
    }

    if (
      (event.key === "ArrowUp" || event.key === "ArrowLeft") &&
      event.target.previousSibling
    ) {
      event.preventDefault();
      event.target.previousSibling.focus();
    }
    if (
      (event.key === "ArrowDown" || event.key === "ArrowRight") &&
      event.target.nextSibling
    ) {
      event.preventDefault();
      event.target.nextSibling.focus();
    }

    if (event.key === "Enter") {
      this.handleClick(time);
    }
    this.props.handleOnKeyDown(event);
  };

  renderTimes = () => {
    let times = [];
    const format = this.props.format ? this.props.format : "p";
    const intervals = this.props.intervals;

    const activeDate =
      this.props.selected || this.props.openToDate || newDate();

    const base = getStartOfDay(activeDate);
    const sortedInjectTimes =
      this.props.injectTimes &&
      this.props.injectTimes.sort(function (a, b) {
        return a - b;
      });

    const minutesInDay = 60 * getHoursInDay(activeDate);
    const multiplier = minutesInDay / intervals;

    for (let i = 0; i < multiplier; i++) {
      const currentTime = addMinutes(base, i * intervals);
      times.push(currentTime);

      if (sortedInjectTimes) {
        const timesToInject = timesToInjectAfter(
          base,
          currentTime,
          i,
          intervals,
          sortedInjectTimes,
        );
        times = times.concat(timesToInject);
      }
    }

    // Determine which time to focus and scroll into view when component mounts
    const timeToFocus = times.reduce((prev, time) => {
      if (time.getTime() <= activeDate.getTime()) {
        return time;
      }
      return prev;
    }, times[0]);

    return times.map((time, i) => {
      return (
        <li
          key={i}
          onClick={this.handleClick.bind(this, time)}
          className={this.liClasses(time)}
          ref={(li) => {
            if (time === timeToFocus) {
              this.centerLi = li;
            }
          }}
          onKeyDown={(ev) => {
            this.handleOnKeyDown(ev, time);
          }}
          tabIndex={time === timeToFocus ? 0 : -1}
          role="option"
          aria-selected={this.isSelectedTime(time) ? "true" : undefined}
          aria-disabled={this.isDisabledTime(time) ? "true" : undefined}
        >
          {formatDate(time, format, this.props.locale)}
        </li>
      );
    });
  };

  render() {
    const { height } = this.state;

    return (
      <div
        className={`react-datepicker__time-container ${
          this.props.todayButton
            ? "react-datepicker__time-container--with-today-button"
            : ""
        }`}
      >
        <div
          className={`react-datepicker__header react-datepicker__header--time ${
            this.props.showTimeSelectOnly
              ? "react-datepicker__header--time--only"
              : ""
          }`}
          ref={(header) => {
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
              ref={(list) => {
                this.list = list;
              }}
              style={height ? { height } : {}}
              role="listbox"
              aria-label={this.props.timeCaption}
            >
              {this.renderTimes()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
