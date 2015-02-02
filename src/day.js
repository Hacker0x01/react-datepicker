'use strict';

var React = require('react');
var moment = require('moment');

var Day = React.createClass({displayName: "Day",
  render: function() {
    var classes = React.addons.classSet({
      'datepicker__day': true,
      'datepicker__day--selected': this.props.day.sameDay(this.props.selected),
      'datepicker__day--this-month': this.props.day.sameMonth(this.props.date),
      'datepicker__day--today': this.props.day.sameDay(moment())
    });

    return (
      React.createElement("div", {className: classes, onClick: this.props.onClick},
        this.props.day.day()
      )
    );
  }
});

module.exports = Day;
