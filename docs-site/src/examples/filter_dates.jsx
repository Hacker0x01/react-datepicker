import React from "react";
import DatePicker from "react-datepicker";
import getDay from "date-fns/getDay";

export default class FilterDates extends React.Component {
  state = {
    date: null
  };

  handleChange = date => {
    this.setState({
      date: date
    });
  };

  isWeekday = date => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };

  render() {
    return (
      <div className="row">
        <pre className="column example__code">
          <code className="jsx">
            {"<DatePicker"}
            <br />
            {"selected={this.state.date}"}
            <br />
            {"onChange={this.handleChange}"}
            <br />
            <strong>{"filterDate={this.isWeekday}"}</strong>
            <br />
            {'placeholderText="Select a weekday" />'}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.date}
            onChange={this.handleChange}
            filterDate={this.isWeekday}
            placeholderText="Select a weekday"
          />
        </div>
      </div>
    );
  }
}
