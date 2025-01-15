import React, { Component, cloneElement } from "react";

interface InputTimeProps {
  onChange?: (date: Date) => void;
  date?: Date;
  timeString?: string;
  timeInputLabel?: string;
  customTimeInput?: React.ReactElement<{
    date?: Date;
    value: string;
    onChange: (time: string) => void;
  }>;
}

interface InputTimeState {
  time?: string;
}

/**
 * `InputTime` is a React component that manages time input.
 *
 * @component
 * @example
 * <InputTime timeString="12:00" />
 *
 * @param props - The properties that define the `InputTime` component.
 * @param props.onChange - Function that is called when the date changes.
 * @param props.date - The initial date value.
 * @param props.timeString - The initial time string value.
 * @param props.timeInputLabel - The label for the time input.
 * @param props.customTimeInput - An optional custom time input element.
 *
 * @returns The `InputTime` component.
 */
export default class InputTime extends Component<
  InputTimeProps,
  InputTimeState
> {
  inputRef: React.RefObject<HTMLInputElement | null> = React.createRef();

  constructor(props: InputTimeProps) {
    super(props);

    this.state = {
      time: this.props.timeString,
    };
  }

  static getDerivedStateFromProps(
    props: InputTimeProps,
    state: InputTimeState,
  ) {
    if (props.timeString !== state.time) {
      return {
        time: props.timeString,
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  onTimeChange = (time: InputTimeState["time"]) => {
    this.setState({ time });

    const { date: propDate } = this.props;
    const isPropDateValid = propDate instanceof Date && !isNaN(+propDate);
    const date = isPropDateValid ? propDate : new Date();

    if (time?.includes(":")) {
      const [hours, minutes] = time.split(":") as [string, string];
      date.setHours(Number(hours));
      date.setMinutes(Number(minutes));
    }

    this.props.onChange?.(date);
  };

  renderTimeInput = () => {
    const { time } = this.state;
    const { date, timeString, customTimeInput } = this.props;

    if (customTimeInput) {
      return cloneElement(customTimeInput, {
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
        ref={this.inputRef}
        onClick={() => {
          this.inputRef.current?.focus();
        }}
        required
        value={time}
        onChange={(event) => {
          this.onTimeChange(event.target.value || timeString);
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
          <div className="react-datepicker-time__input">
            {this.renderTimeInput()}
          </div>
        </div>
      </div>
    );
  }
}
