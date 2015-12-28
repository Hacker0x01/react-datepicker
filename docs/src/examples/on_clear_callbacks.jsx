import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

export default React.createClass({
  displayName: "Disabled",

  getInitialState() {
    return {
      startDate: null
    };
  },

  handleChange: function (date) {
    this.setState({
      startDate: date
    });
  },

  handleOnClear: function () {
    console.log("Date has been cleared");
  },

  render() {
    return <div className="row">
      <pre className="column example__code">
        <code className="js">
          {"handleOnClear: function (date) {"}<br />
              {"if (date === null) {"}<br />
                  {"console.log('selected date: %s', date);"}<br />
              {"}"}<br />
              {"else {"}<br />
                  {"console.log('selected date: %s', date.format('DD/MM/YYYY'));"}<br />
              {"}"}<br />
          {"};"}
        </code>
        <br />
        <code className="jsx">
          {"<DatePicker"}<br />
              {"key='example9'"}<br />
              {"selected={this.state.startDate}"}<br />
              {"onChange={this.handleChange}"}<br />
          <strong>    {"onClear={this.handleOnClear}"}</strong><br />
              {"placeholderText=\"View clear callbacks in console\" />"}
        </code>
      </pre>
      <div className="column">
        <DatePicker
          key="example9"
          selected={this.state.startDate}
          onChange={this.handleChange}
          onClear={this.handleOnClear}
          isClearable={true}
          placeholderText="View clear callbacks in console" />
      </div>
    </div>;
  }
});
