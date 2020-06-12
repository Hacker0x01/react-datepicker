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

const KEY_CODE = {
  ENTER: 13,
  SPACE: 32,
  DOWN: 40,
  UP: 38,
  TAB: 9
};

export default class Time extends React.Component {
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
    monthRef: PropTypes.object,
    timeCaption: PropTypes.string,
    injectTimes: PropTypes.array,
    locale: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ locale: PropTypes.object })
    ])
  };

  state = {
    height: null
  };

  componentDidMount() {
    // code to ensure selected time will always be in focus within time window when it first appears
    this.list.scrollTop = Time.calcCenterPosition(
      this.props.monthRef
        ? this.props.monthRef.clientHeight - this.header.clientHeight
        : this.list.clientHeight,
      this.centerLi
    );
    if (this.props.monthRef && this.header) {
      this.setState({
        height: this.props.monthRef.clientHeight - this.header.clientHeight
      });
    }
  }

  onKeyDown = event => {
    if (event.keyCode !== KEY_CODE.TAB) {
      event.preventDefault();
      if (event.keyCode === KEY_CODE.DOWN) {
        const activeEle = document.activeElement;
        const nextEle = document.activeElement.nextElementSibling;
        if (nextEle) {
          nextEle.focus();
          nextEle.tabIndex = 0;
        } else {
          document.activeElement.parentElement.children[0].focus();
          document.activeElement.parentElement.children[0].tabIndex = 0;
        }
        activeEle.tabIndex = -1;
      } else if (event.keyCode === KEY_CODE.UP) {
        const activeEle = document.activeElement;
        const prevEle = document.activeElement.previousElementSibling;
        if (prevEle) {
          prevEle.focus();
          prevEle.tabIndex = 0;
        } else {
          const count = document.activeElement.parentElement.childElementCount;
          document.activeElement.parentElement.children[count - 1].focus();
          document.activeElement.parentElement.children[count - 1].tabIndex = 0;
        }
        activeEle.tabIndex = -1;
      }
    }
    if (event.keyCode === KEY_CODE.SPACE || event.keyCode === KEY_CODE.ENTER) {
      const ele = document.activeElement.innerText;
      const times = ele.split(":");
      const hours = times[0];
      const min = times[1];
      const date = new Date(this.props.selected).setHours(
        parseInt(hours),
        parseInt(min)
      );
      this.handleClick(date);
    }
  };

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
    let classes = [
      "react-datepicker__time-list-item",
      this.props.timeClassName
        ? this.props.timeClassName(time, currH, currM)
        : undefined
    ];

    if (
      this.props.selected &&
      currH === getHours(time) &&
      currM === getMinutes(time)
    ) {
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

  applyTabIndex = (currH, currM, time, index) => {
    const isTimeMatched =
      currH === getHours(time) && currM === getMinutes(time);
    if (isTimeMatched && index !== 0) {
      if (document.querySelector(".react-datepicker__time-list")) {
        document.querySelector(
          ".react-datepicker__time-list"
        ).children[0].tabIndex = -1;
      }
      return 0;
    }
    if (index === 0) {
      return 0;
    } else {
      return -1;
    }
  };

  renderTimes = () => {
    let times = [];
    const format = this.props.format ? this.props.format : "p";
    const intervals = this.props.intervals;
    const activeTime =
      this.props.selected || this.props.openToDate || newDate();

    const currH = getHours(activeTime);
    const currM = getMinutes(activeTime);
    let base = getStartOfDay(newDate());
    const multiplier = 1440 / intervals;
    const sortedInjectTimes =
      this.props.injectTimes &&
      this.props.injectTimes.sort(function(a, b) {
        return a - b;
      });
    const centerLiTargetList = [];
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

      if (currH === getHours(currentTime)) {
        centerLiTargetList.push(currentTime);
      }
    }

    return times.map((time, i) => (
      <li
        key={i}
        tabIndex={this.applyTabIndex(currH, currM, time, i)}
        onClick={this.handleClick.bind(this, time)}
        className={this.liClasses(time, currH, currM)}
        ref={li => {
          if (currH === getHours(time)) {
            if (currM >= getMinutes(time)) {
              this.centerLi = li;
            } else if (
              !this.centerLi &&
              centerLiTargetList.indexOf(time) === centerLiTargetList.length - 1
            ) {
              this.centerLi = li;
            }
          }
        }}
      >
        {formatDate(time, format, this.props.locale)}
      </li>
    ));
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
              onKeyDown={e => this.onKeyDown(e)}
              className="react-datepicker__time-list"
              ref={list => {
                this.list = list;
              }}
              style={height ? { height } : {}}
            >
              {this.renderTimes()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
