import React from "react";
import DatePicker from "react-datepicker";

export default class TimeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  render() {
    return (
      <div className="row">
        <pre className="column example__code">
          <code className="jsx">
            {`
<DatePicker
    selected={this.state.startDate}
    timeInputLabel="Time:"
    onChange={this.handleChange}
    dateFormat="MM/dd/yyyy h:mm aa"
    showTimeInput
/>
`}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            timeInputLabel="Time:"
            onChange={this.handleChange}
            dateFormat="MM/dd/yyyy h:mm aa"
            showTimeInput
          />
        </div>
      </div>
    );
  }
}
