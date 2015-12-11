var React = require("react");
var DatePicker = require("react-datepicker");
var moment = require("moment");

var DateRange = React.createClass({
  displayName: "DateRange",

  getInitialState: function() {
    return {
      startDate: moment("2014-02-08"),
      endDate: moment("2014-02-10")
    };
  },

  handleChange: function(date) {
    this.setState({
      startDate: date
    });
  },

  render: function() {
    return <div className="row">
      <pre className="column example__code">
        <code className="jsx">
          {"<DatePicker"}<br />
                {"selected={this.state.startDate}"}<br />
                {"startDate={this.state.startDate}"}<br />
                {"endDate={this.state.endDate} />"}
        </code>
      </pre>
      <div className="column">
        <DatePicker
          selected={this.state.startDate}
          startDate={this.state.startDate}
          endDate={this.state.endDate} />
      </div>
    </div>;
  }
});

module.exports = DateRange;
