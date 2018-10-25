import React from "react";
import DatePicker from "react-datepicker";
import addDays from "date-fns/addDays";

export default class RawChanges extends React.Component {
  state = {
    startDate: null
  };

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  handleChangeRaw = value => {
    if (value === "tomorrow") {
      this.handleChange(addDays(new Date(), 1));
    }
  };

  render() {
    return (
      <div className="row">
        <pre className="column example__code">
          <code className="jsx">
            {`
handleChangeRaw(value) {
  if(value === "tomorrow") {
    const tomorrow = addDays(new Date(), 1)
    this.handleChange(tomorrow)
  }
}
<DatePicker
    selected={this.state.startDate}
    onChange={this.handleChange}
    placeholderText="Enter tomorrow"
    onChangeRaw={(event) =>
      this.handleChangeRaw(event.target.value)}
/>
`}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            placeholderText="Enter &quot;tomorrow&quot;"
            onChangeRaw={event => this.handleChangeRaw(event.target.value)}
          />
        </div>
      </div>
    );
  }
}
