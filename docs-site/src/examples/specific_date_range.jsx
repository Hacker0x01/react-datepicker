import React from "react";
import DatePicker from "react-datepicker";
import addDays from "date-fns/addDays";

export default class SpecificDateRange extends React.Component {
  state = {
    startDate: null
  };

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
            {"<DatePicker"}
            <br />
            {"  selected={this.state.startDate}"}
            <br />
            {"  onChange={this.handleChange}"}
            <br />
            <strong>{"  minDate={new Date()}"}</strong>
            <br />
            <strong>{"  maxDate={addDays(new Date(), 5)}"}</strong>
            <br />
            {
              '  placeholderText="Select a date between today and 5 days in the future"'
            }
            <br />
            {"/>"}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            minDate={new Date()}
            maxDate={addDays(new Date(), 5)}
            placeholderText="Select a date between today and 5 days in the future"
          />
        </div>
      </div>
    );
  }
}
