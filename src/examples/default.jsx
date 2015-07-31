var React = require('react');
var DatePicker = require('react-datepicker');
var moment = require('moment');

var Default = React.createClass({
  displayName: 'Default',

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
      <div className="column example__code">
        {"<DatePicker"}<br />
        &nbsp; &nbsp; {"selected={this.state.startDate}"}<br />
        &nbsp; &nbsp; {"onChange={this.handleChange} />"}
      </div>
      <div className="column">
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange} />
      </div>
    </div>
  }
});

module.exports = Default;
