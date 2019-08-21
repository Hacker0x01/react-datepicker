import React from "react";
import DatePicker from "react-datepicker";
import subDays from "date-fns/subDays";

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
            <strong>{"  minDate={subDays(new Date(), 5)}"}</strong>
            <br />
            {'  placeholderText="Select a date after 5 days ago"'}
            <br />
            {"/>"}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            minDate={subDays(new Date(), 5)}
            placeholderText="Select a date after 5 days ago"
          />
        </div>
      </div>
    );
  }
}
