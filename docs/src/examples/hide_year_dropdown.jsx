import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

export default React.createClass({
  displayName: "Weekdays",

  getInitialState() {
    return {
      startDate: moment()
    };
  },

  handleChange(date) {
    this.setState({
      startDate: date
    });
  },

  render() {
    return <div className="row">
      <pre className="column example__code">
        <code className="jsx">
          {"<DatePicker"}<br />
              {"selected={this.state.startDate}"}<br />
              {"onChange={this.handleChange}"} <br />
              {"showYearDropdown={false}"} <br />
              {"dateFormatCalendar=\"MMMM YYYY\" />"}
        </code>
      </pre>
      <div className="column">
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          showYearDropdown={false}
          dateFormatCalendar="MMMM YYYY" />
      </div>
    </div>;
  }
});
