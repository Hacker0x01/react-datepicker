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

  render: function() {
    return <div className="row">
      <pre className="column example__code">
        <code className="jsx">
          {"<DatePicker"}<br />
          &nbsp; &nbsp; {"selected={this.state.startDate}"}<br />
          &nbsp; &nbsp; {"isClearable={true} />"}<br />
          &nbsp; &nbsp; {"placeholderText='I have been cleared!' />"}
        </code>
      </pre>
      <div className="column">
        <DatePicker
          selected={this.state.startDate}
          isClearable={true}
          placeholderText='I have been cleared!' />
      </div>
    </div>
  }
});

module.exports = Disabled;
