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

export default class inputTime extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      minutes: 0,
      hour: 0
    };
  }

  static propTypes = {};

  static get defaultProps() {
    return {};
  }

  isNumber = input => {
    const re = /^[0-9\b]+$/;
    return input === "" || re.test(input);
  };

  onChangeHour = time => {};

  onChangeMinute = time => {};

  render() {
    return (
      <div className="react-datepicker__input-time-container">
        <div className="react-datepicker-time__caption">Starting time</div>
        <div className="react-datepicker-time__input-container">
          <div className="react-datepicker-time__input">
            <input
              onChange={this.onChangeHour}
              placeholder="h"
              type="text"
              name="hour"
              maxLength="2"
            />
          </div>
          <div className="react-datepicker-time__delimiter">:</div>
          <div className="react-datepicker-time__input">
            <input
              onChange={this.onChangeMinute}
              placeholder="m"
              type="text"
              name="minute"
              maxLength="2"
            />
          </div>
        </div>
      </div>
    );
  }
}
