import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

export default React.createClass({
  displayName: "Disabled",

  getInitialState() {
    return {
      startDate: moment()
    };
  },

  render() {
    return <div className="row">
      <pre className="column example__code">
        <code className="jsx">
          {"<DatePicker"}<br />
              {"selected={this.state.startDate}"}<br />
              {"isClearable={true} />"}<br />
              {"placeholderText='I have been cleared!' />"}
        </code>
      </pre>
      <div className="column">
        <DatePicker
          selected={this.state.startDate}
          isClearable={true}
          placeholderText="I have been cleared!" />
      </div>
    </div>;
  }
});
