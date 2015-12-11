var React = require('react');
var DatePicker = require('react-datepicker');
var moment = require('moment');

var CustomClassName = React.createClass({
  displayName: 'CustomClassName',

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
      <pre className="column example__code">
        <code className="jsx">
          {"<DatePicker"}<br />
          &nbsp; &nbsp; {"selected={this.state.startDate}"}<br />
          &nbsp; &nbsp; {"onChange={this.handleChange}"} <br />
          &nbsp; &nbsp; {"className='datepicker__input red-border' />"}
        </code>
      </pre>
      <div className="column">
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          className="datepicker__input red-border" />
      </div>
    </div>
  }
});

module.exports = CustomClassName;
