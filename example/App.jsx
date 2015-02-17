var React = require('react');
var DatePicker = require('../src/datepicker');
var moment = require('moment');

var exampleComponent = React.createClass({
  displayName: 'exampleComponent',

  getInitialState: function() {
    return {
      start_date: moment(),
      end_date: moment(),
      new_date: null,
      bound_date: null
    };
  },

  handleStartDateChange: function(date) {
    this.setState({
      start_date: date
    });
  },

  handleEndDateChange: function(date) {
    this.setState({
      end_date: date
    });
  },

  handleNewDateChange: function(date) {
    this.setState({
      new_date: date
    });
  },

  handleBoundDateChange: function(date) {
    this.setState({
      bound_date: date
    });
  },

  render: function() {
    return <div>
      <DatePicker
        key="example1"
        selected={this.state.start_date}
        onChange={this.handleStartDateChange}
      />
      <DatePicker
        key="example2"
        dateFormat="YYYY/MM/DD"
        selected={this.state.end_date}
        onChange={this.handleEndDateChange}
      />
      <DatePicker
        key="example3"
        selected={this.state.new_date}
        onChange={this.handleNewDateChange}
        placeholderText="Click to select a date"
      />
      <DatePicker
        key="example4"
        selected={this.state.bound_date}
        onChange={this.handleBoundDateChange}
        minDate={moment()}
        maxDate={moment().add(5, 'days')}
        placeholderText="Select a date between today and 5 days in the future"
      />
    </div>;



  }
});


module.exports = exampleComponent;