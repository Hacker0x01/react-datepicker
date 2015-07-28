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
      example5Selected: null,
      example6Selected: null,
      example7Selected: null,
      example8Selected: moment()
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

   handleExample6Change: function(date) {
    this.setState({
      example6Selected: date
    });
  },

  handleExample7Change: function (date) {
    this.setState({
      example7Selected: date
    })
  },

  handleExample7Blur: function (date) {
    if (date === null) {
      console.log('selected date: %s', date);
    }
    else {
      console.log('selected date: %s', date.format('DD/MM/YYYY'));
    }
  },

  handleClearButtonClick: function() {
    this.setState({
      example8Selected: null
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
      <DatePicker
        key="example5"
        selected={this.state.example5Selected}
        onChange={this.handleExample5Change}
        weekStart="0"
        placeholderText="I start on Sunday!"
      />
      <DatePicker
        key="example6"
        selected={this.state.example6Selected}
        onChange={this.handleExample6Change}
        excludeDates={[moment(), moment().subtract(1, 'days')]}
        placeholderText="Select a date other than today or yesterday"
      />
      <DatePicker
        key="example7"
        selected={this.state.example7Selected}
        onChange={this.handleExample7Change}
        onBlur={this.handleExample7Blur}
        placeholderText="View blur callbacks in console"
      />
      <DatePicker
        key="example8"
        selected={this.state.example8Selected}
      />
      <button onClick={this.handleClearButtonClick}>Clear</button>
    </div>;
  }
});

module.exports = exampleComponent;
