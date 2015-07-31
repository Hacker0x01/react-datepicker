var React = require('react');
var DatePicker = require('react-datepicker');
var moment = require('moment');

var SpecificDateRange = React.createClass({
  displayName: 'SpecificDateRange',

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
          <strong>&nbsp; &nbsp; {"minDate={moment()}"}</strong><br />
          <strong>&nbsp; &nbsp; {"maxDate={moment().add(5, 'days')}"}</strong><br />
          &nbsp; &nbsp; {"placeholderText=\"Select a date between today and 5 days in the future\" />"}
        </code>
      </pre>
      <div className="column">
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          minDate={moment()}
          maxDate={moment().add(5, 'days')}
          placeholderText="Select a date between today and 5 days in the future" />
      </div>
    </div>
  }
});

module.exports = SpecificDateRange;
