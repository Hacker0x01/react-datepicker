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
      <pre className="column example__code">
        <code className="jsx">
          {"<DatePicker selected={this.state.startDate} />"}<br />
          {"<button onClick={this.handleClearButtonClick}>"}<br />
          &nbsp; &nbsp; {"Clear date input"}<br />
          {"</button>"}
        </code>
      </pre>
      <div className="column">
        <DatePicker selected={this.state.startDate} />
        <button onClick={this.handleClearButtonClick}>Clear</button>
      </div>
    </div>
  }
});

module.exports = Disabled;
