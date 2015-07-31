var React = require('react');
var DatePicker = require('react-datepicker');
var moment = require('moment');

var CustomDateFormat = React.createClass({
  displayName: 'CustomDateFormat',

  getInitialState: function() {
    return {
      startDate: moment(),
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
        <strong>&nbsp; &nbsp; {"dateFormat=\"YYYY/MM/DD\""}</strong><br />
          &nbsp; &nbsp; {"selected={this.state.startDate}"}<br />
          &nbsp; &nbsp; {"onChange={this.handleChange} />"}
        </code>
      </pre>
      <div className="column">
        <DatePicker
          dateFormat="YYYY/MM/DD"
          selected={this.state.startDate}
          onChange={this.handleChange} />
      </div>
    </div>
  }
});

module.exports = CustomDateFormat;
