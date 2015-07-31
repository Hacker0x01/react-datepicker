var React = require('react');
var DatePicker = require('react-datepicker');
var moment = require('moment');

var CustomStartDate = React.createClass({
  displayName: 'CustomStartDate',

  getInitialState: function() {
    return {
      startDate: null,
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
          &nbsp; &nbsp; {"selected={this.state.startDate}"}<br />
          &nbsp; &nbsp; {"onChange={this.handleChange}"}<br />
          <strong>&nbsp; &nbsp; {"weekStart='0'"}</strong><br />
          &nbsp; &nbsp; {"placeholderText='I start on Sunday!' />"}
        </code>
      </pre>
      <div className="column">
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          weekStart="0"
          placeholderText="I start on Sunday!" />
      </div>
    </div>
  }
});

module.exports = CustomStartDate;
