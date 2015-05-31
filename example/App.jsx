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
      bound_date: null,
      example5Selected: null
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

  handleExample5Change: function(date) {
    this.setState({
      example5Selected: date
    });
  },

  handleExample6Change: function (date) {
    console.log('change');
    console.log(date);
  },

  handleExample6Blur: function(date) {
    console.log('blur');
    console.log(date);
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
      <DatePicker
        key="example5"
        selected={this.state.example5Selected}
        onChange={this.handleExample5Change}
        weekStart="0"
        placeholderText="I start on Sunday!"
      />
      <DatePicker
        key="example6"
        onChange={this.handleExample6Change}
        onBlur={this.handleExample6Blur}
        placeholderText="Change and blur events - view in console"
        />
    </div>;
  }
});


module.exports = exampleComponent;
