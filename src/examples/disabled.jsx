var React = require('react');
var DatePicker = require('react-datepicker');
var moment = require('moment');

var Disabled = React.createClass({
  displayName: 'Disabled',

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
          <strong>&nbsp; &nbsp; {"disabled={true}"}</strong><br />
          &nbsp; &nbsp; {"placeholderText='This is disabled'"} />
        </code>
      </pre>
      <div className="column">
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          disabled={true}
          placeholderText="This is disabled" />
      </div>
    </div>
  }
});

module.exports = Disabled;
