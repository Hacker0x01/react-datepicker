var React = require('react');
var DatePicker = require('react-datepicker');
var moment = require('moment');

var PlaceholderText = React.createClass({
  displayName: 'PlaceholderText',

  render: function() {
    return <div className="row">
      <pre className="column example__code">
        <code className="jsx">
          {"<DatePicker placeholderText=\"Click to select a date\" />"}
        </code>
      </pre>
      <div className="column">
        <DatePicker placeholderText="Click to select a date" />
      </div>
    </div>
  }
});

module.exports = PlaceholderText;
