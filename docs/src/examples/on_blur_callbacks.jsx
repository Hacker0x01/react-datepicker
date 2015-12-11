var React = require('react');
var DatePicker = require('react-datepicker');
var moment = require('moment');

var Disabled = React.createClass({
  displayName: 'Disabled',

  getInitialState: function() {
    return {
      startDate: null,
    };
  },

  handleChange: function (date) {
    this.setState({
      startDate: date
    })
  },

  handleOnBlur: function (date) {
    if (date === null) {
      console.log('selected date: %s', date);
    }
    else {
      console.log('selected date: %s', date.format('DD/MM/YYYY'));
    }
  },

  render: function() {
    return <div className="row">
      <pre className="column example__code">
        <code className="js">
          {"handleOnBlur: function (date) {"}<br />
          &nbsp; &nbsp; {"if (date === null) {"}<br />
          &nbsp; &nbsp; &nbsp; &nbsp; {"console.log('selected date: %s', date);"}<br />
          &nbsp; &nbsp; {"}"}<br />
          &nbsp; &nbsp; {"else {"}<br />
          &nbsp; &nbsp; &nbsp; &nbsp; {"console.log('selected date: %s', date.format('DD/MM/YYYY'));"}<br />
          &nbsp; &nbsp; {"}"}<br />
          {"};"}
        </code>
        <br />
        <code className="jsx">
          {"<DatePicker"}<br />
          &nbsp; &nbsp; {"key='example9'"}<br />
          &nbsp; &nbsp; {"selected={this.state.startDate}"}<br />
          &nbsp; &nbsp; {"onChange={this.handleChange}"}<br />
          <strong>&nbsp; &nbsp; {"onBlur={this.handleOnBlur}"}</strong><br />
          &nbsp; &nbsp; {"placeholderText=\"View blur callbacks in console\" />"}
        </code>
      </pre>
      <div className="column">
        <DatePicker
          key="example9"
          selected={this.state.startDate}
          onChange={this.handleChange}
          onBlur={this.handleOnBlur}
          placeholderText="View blur callbacks in console" />
      </div>
    </div>
  }
});

module.exports = Disabled;
