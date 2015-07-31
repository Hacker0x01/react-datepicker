var React = require('react');
var DatePicker = require('react-datepicker');
var moment = require('moment');

var ExcludeDates = React.createClass({
  displayName: 'ExcludeDates',

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
          <strong>&nbsp; &nbsp; {"excludeDates={[moment(), moment().subtract(1, 'days')]}"}</strong><br />
          &nbsp; &nbsp; {"placeholderText=\"Select a date other than today or yesterday\" />"}
        </code>
      </pre>
      <div className="column">
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          excludeDates={[moment(), moment().subtract(1, 'days')]}
          placeholderText="Select a date other than today or yesterday" />
      </div>
    </div>
  }
});

module.exports = ExcludeDates;
