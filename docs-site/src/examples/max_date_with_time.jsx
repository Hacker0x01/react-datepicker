import React from "react";
import DatePicker from "react-datepicker";
import addDays from "date-fns/addDays";

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
            <strong>{"  maxDate={new Date()}"}</strong>
            <br />
            {'  placeholderText="Click to select a date"'}
            <br />
            <strong>{"  showTimeSelect"}</strong>
            <br />
            {"/>"}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            excludeOutOfBoundsTimes
            onChange={this.handleChange}
            maxDate={new Date()}
            placeholderText="Click to select a date"
            showTimeSelect
          />
        </div>
      </div>
    );
  }
}
