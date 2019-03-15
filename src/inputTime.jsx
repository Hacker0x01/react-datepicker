import React from "react";
import PropTypes from "prop-types";

export default class inputTime extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    timeString: PropTypes.string,
    timeInputLabel: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      time: this.props.timeString
    };
  }

  onTimeChange = time => {
    this.setState({ time });
    const date = new Date();
    date.setHours(time.split(":")[0]);
    date.setMinutes(time.split(":")[1]);
    this.props.onChange(date);
  };

  render() {
    const { time } = this.state;
    return (
      <div className="react-datepicker__input-time-container">
        <div className="react-datepicker-time__caption">
          {this.props.timeInputLabel}
        </div>
        <div className="react-datepicker-time__input-container">
          <div className="react-datepicker-time__input">
            <input
              type="time"
              className="react-datepicker-time__input"
              placeholder="Time"
              name="time-input"
              value={time}
              onChange={ev => {
                this.onTimeChange(ev.target.value);
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
