import React from "react";
import PropTypes from "prop-types";

export default class inputTime extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    date: PropTypes.instanceOf(Date),
    timeString: PropTypes.string,
    timeInputLabel: PropTypes.string,
    customTimeInput: PropTypes.element,
    timeInputSeconds: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      time: this.props.timeString,
    };
  }

  /**
   * This routine will update local state from props whenever the component renders.
   * This can cause some issues where if local state changes, it will be overwritten with props.
   * See: https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#anti-pattern-unconditionally-copying-props-to-state
   */
  static getDerivedStateFromProps(props, state) {
    if (props.timeString !== state.time) {
      return {
        time: props.timeString,
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  onTimeChange = (time) => {
    this.setState({ time });
    const date = new Date();
    date.setHours(time.split(":")[0]);
    date.setMinutes(time.split(":")[1]);
    // If seconds were specified on the time string, set the seconds into the date object.
    // When seconds are not specified, "new Date()" is going to have seconds set to current time.
    if (time.split(":")[2]) {
      date.setSeconds(time.split(":")[2]);
    }
    this.props.onChange(date);
  };

  renderTimeInput = () => {
    const { time } = this.state;
    const { date, timeString, customTimeInput } = this.props;

    if (customTimeInput) {
      return React.cloneElement(customTimeInput, {
        date,
        value: time,
        onChange: this.onTimeChange,
      });
    }

    return (
      <input
        type="time"
        className="react-datepicker-time__input"
        placeholder="Time"
        name="time-input"
        required
        value={time}
        onChange={(ev) => {
          this.onTimeChange(ev.target.value || timeString);
        }}
      />
    );
  };

  render() {
    return (
      <div className="react-datepicker__input-time-container">
        <div className="react-datepicker-time__caption">
          {this.props.timeInputLabel}
        </div>
        <div className="react-datepicker-time__input-container">
          <div
            className={
              this.props.timeInputSeconds
                ? "react-datepicker-time__input react-datepicker-time__input-seconds"
                : "react-datepicker-time__input"
            }
          >
            {this.renderTimeInput()}
          </div>
        </div>
      </div>
    );
  }
}
