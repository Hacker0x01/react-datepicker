var React = require('react');
var DatePicker = require('react-datepicker');
var moment = require('moment');

var Weekdays = React.createClass({
  displayName: 'Weekdays',

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
          &nbsp; &nbsp; {"selected={this.state.startDate}"}<br />
          &nbsp; &nbsp; {"onChange={this.handleChange}"} <br />
          &nbsp; &nbsp; {"weekdays: ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So']"}
        </code>
      </pre>
      <div className="column">
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          weekdays={['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So']} />
      </div>
    </div>
  }
});

module.exports = Weekdays;
