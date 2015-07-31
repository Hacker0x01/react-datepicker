var React = require('react');
var DatePicker = require('react-datepicker');
var moment = require('moment');

var Disabled = React.createClass({
  displayName: 'Disabled',

  getInitialState: function() {
    return {
      startDate: moment(),
    };
  },

  handleClearButtonClick: function() {
    this.setState({
      startDate: null
    });
  },

  render: function() {
    return <div className="row">
      <div className="column example__code">
        {"<DatePicker selected={this.state.startDate} />"}<br />
        {"<button onClick={this.handleClearButtonClick}>Clear date input</button>"}
      </div>
      <div className="column">
        <DatePicker selected={this.state.startDate} />
        <button onClick={this.handleClearButtonClick}>Clear</button>
      </div>
    </div>
  }
});

module.exports = Disabled;
