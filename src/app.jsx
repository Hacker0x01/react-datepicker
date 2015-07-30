var React = require('react');
var DatePicker = require('react-datepicker');
var moment = require('moment');
require('react-datepicker/dist/react-datepicker.css');
require('./style.scss');

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
      example8Selected: moment(),
      example9Selected: null
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

  handleClearButtonClick: function() {
    this.setState({
      example8Selected: null
    });
  },

  handleExample9Change: function (date) {
    this.setState({
      example9Selected: date
    })
  },

  handleExample9Blur: function (date) {
    if (date === null) {
      console.log('selected date: %s', date);
    }
    else {
      console.log('selected date: %s', date.format('DD/MM/YYYY'));
    }
  },

  render: function() {
    return <div>
      <h2 className="heading">Default</h2>
      <div className="example">
        <div className="column">
          {"<DatePicker"} <br />
          &nbsp; &nbsp; {" key='example1'"} <br />
          &nbsp; &nbsp; {"selected={this.state.start_date}"} <br />
          &nbsp; &nbsp; {"onChange={this.handleStartDateChange} />"}
        </div>
        <div className="column">
          <DatePicker
            key="example1"
            selected={this.state.start_date}
            onChange={this.handleStartDateChange} />
        </div>
      </div>

      <h2 className="heading">Custom dateFormat</h2>
      <div className="example">
        <div className="column">
          {"<DatePicker"} <br />
          &nbsp; &nbsp; {"key='example2'"} <br />
          &nbsp; &nbsp; {"dateFormat='YYYY/MM/DD'"} <br />
          &nbsp; &nbsp; {"selected={this.state.end_date}"} <br />
          &nbsp; &nbsp; {"onChange={this.handleEndDateChange} />"}
        </div>
        <div className="column">
          <DatePicker
            key="example2"
            dateFormat="YYYY/MM/DD"
            selected={this.state.end_date}
            onChange={this.handleEndDateChange} />
        </div>
      </div>

      <h2 className="heading">Placeholder text</h2>
      <div className="example">
        <div className="column">
          {"<DatePicker"} <br />
          &nbsp; &nbsp; {"key='example3'"} <br />
          &nbsp; &nbsp; {"selected={this.state.new_date}"} <br />
          &nbsp; &nbsp; {"onChange={this.handleNewDateChange}"} <br />
          &nbsp; &nbsp; {"placeholderText='Click to select a date'"} />
        </div>
        <div className="column">
          <DatePicker
            key="example3"
            selected={this.state.new_date}
            onChange={this.handleNewDateChange}
            placeholderText="Click to select a date" />
        </div>
      </div>

      <h2 className="heading">Specific date range</h2>
      <div className="example">
        <div className="column">
          {"<DatePicker"} <br />
          &nbsp; &nbsp; {"key='example4'"} <br />
          &nbsp; &nbsp; {"selected={this.state.bound_date}"} <br />
          &nbsp; &nbsp; {"onChange={this.handleBoundDateChange}"} <br />
          &nbsp; &nbsp; {"minDate={moment()}"} <br />
          &nbsp; &nbsp; {"maxDate={moment().add(5, 'days')}"} <br />
          &nbsp; &nbsp; {"placeholderText='Select a date between today and 5 days in the future' />"}
        </div>
        <div className="column">
          <DatePicker
            key="example4"
            selected={this.state.bound_date}
            onChange={this.handleBoundDateChange}
            minDate={moment()}
            maxDate={moment().add(5, 'days')}
            placeholderText="Select a date between today and 5 days in the future" />
        </div>
      </div>

      <h2 className="heading">Custom start date</h2>
      <div className="example">
        <div className="column">
          {"<DatePicker"} <br />
          &nbsp; &nbsp; {"key='example5'"} <br />
          &nbsp; &nbsp; {"selected={this.state.example5Selected}"} <br />
          &nbsp; &nbsp; {"onChange={this.handleExample5Change}"} <br />
          &nbsp; &nbsp; {"weekStart='0'"} <br />
          &nbsp; &nbsp; {"placeholderText='I start on Sunday!' />"}
        </div>
        <div className="column">
          <DatePicker
            key="example5"
            selected={this.state.example5Selected}
            onChange={this.handleExample5Change}
            weekStart="0"
            placeholderText="I start on Sunday!" />
        </div>
      </div>

      <h2 className="heading">Exclude dates</h2>
      <div className="example">
        <div className="column">
          {"<DatePicker"} <br />
          &nbsp; &nbsp; {"key='example6'"} <br />
          &nbsp; &nbsp; {"selected={this.state.example6Selected}"} <br />
          &nbsp; &nbsp; {"onChange={this.handleExample6Change}"} <br />
          &nbsp; &nbsp; {"excludeDates={[moment(), moment().subtract(1, 'days')]}"} <br />
          &nbsp; &nbsp; {"placeholderText='Select a date other than today or yesterday' />"}
        </div>
        <div className="column">
          <DatePicker
            key="example6"
            selected={this.state.example6Selected}
            onChange={this.handleExample6Change}
            excludeDates={[moment(), moment().subtract(1, 'days')]}
            placeholderText="Select a date other than today or yesterday" />
        </div>
      </div>

      <h2 className="heading">Disable dates</h2>
      <div className="example">
        <div className="column">
          {"<DatePicker"} <br />
          &nbsp; &nbsp; {"key='example7'"} <br />
          &nbsp; &nbsp; {"selected={null}"} <br />
          &nbsp; &nbsp; {"onChange={this.handleStartDateChange}"} <br />
          &nbsp; &nbsp; {"disabled={true}"} <br />
          &nbsp; &nbsp; {"placeholderText='This is disabled'"}
          />
        </div>
        <div className="column">
          <DatePicker
            key="example7"
            selected={null}
            onChange={this.handleStartDateChange}
            disabled={true}
            placeholderText="This is disabled" />
        </div>
      </div>

      <h2 className="heading">Clear from external component</h2>
      <div className="example">
        <div className="column">
          {"<DatePicker"} <br />
          &nbsp; &nbsp; {"key='example8'"} <br />
          &nbsp; &nbsp; {"selected={this.state.example8Selected} />"}
          <br /><br />
          {"<button onClick={this.handleClearButtonClick}>Clear</button>"}
        </div>
        <div className="column">
          <DatePicker
            key="example8"
            selected={this.state.example8Selected} />

          <button onClick={this.handleClearButtonClick}>Clear</button>
        </div>
      </div>

      <h2 className="heading">onBlur callbacks in console</h2>
      <div className="example">
        <div className="column">
          {"<DatePicker"} <br />
          &nbsp; &nbsp; {"key='example9'"} <br />
          &nbsp; &nbsp; {"selected={this.state.example9Selected}"} <br />
          &nbsp; &nbsp; {"onChange={this.handleExample9Change}"} <br />
          &nbsp; &nbsp; {"onBlur={this.handleExample9Blur}"} <br />
          &nbsp; &nbsp; {"placeholderText='View blur callbacks in console' />"}
        </div>
        <div className="column">
          <DatePicker
            key="example9"
            selected={this.state.example9Selected}
            onChange={this.handleExample9Change}
            onBlur={this.handleExample9Blur}
            placeholderText="View blur callbacks in console" />
        </div>
      </div>
    </div>;
  }
});

module.exports = exampleComponent;
