import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

export default React.createClass({
  displayName: "includeDates",

  getInitialState() {
    return {
      startDate: null
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
              {"onChange={this.handleChange}"}<br />
        <strong>    {"includeDates={[moment(), moment().add('days', 1)]}"}</strong><br />
              {"placeholderText=\"This only includes today and tomorrow\" />"}
        </code>
      </pre>
      <div className="column">
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          includeDates={[moment(), moment().add("days", 1)]}
          placeholderText="This only includes today and tomorrow" />
      </div>
    </div>;
  }
});
