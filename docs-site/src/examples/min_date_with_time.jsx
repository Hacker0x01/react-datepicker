import React from "react";
import DatePicker from "react-datepicker";
import subDays from "date-fns/subDays";

export default class SpecificDateRange extends React.Component {
  state = {
    startDate: null,
  };

  handleChange = (date) => {
    this.setState({
      startDate: date,
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
            <strong>{"  excludeOutOfBoundsTimes"}</strong>
            <br />
            {"  onChange={this.handleChange}"}
            <br />
            <strong>{"  minDate={new Date()}"}</strong>
            <br />
            {'  placeholderText="Click to select a date"'}
            <br />
            {"  showTimeSelect"}
            <br />
            {"/>"}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            excludeOutOfBoundsTimes
            onChange={this.handleChange}
            minDate={new Date()}
            placeholderText="Click to select a date"
            showTimeSelect
          />
        </div>
      </div>
    );
  }
}
