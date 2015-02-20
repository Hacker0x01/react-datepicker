/** @jsx React.DOM */

var React = require('react/addons');
var moment = require('moment');

var Day = React.createClass({
  handleClick: function(event) {
    if (this.props.disabled) return;

    this.props.onClick(event);
  },

  render: function() {
    classes = React.addons.classSet({
      'datepicker__day': true,
      'datepicker__day--disabled': this.props.disabled,
      'datepicker__day--selected': this.props.day.sameDay(this.props.selected),
      'datepicker__day--today': this.props.day.sameDay(moment())
    });

    return (
      <div className={classes} onClick={this.handleClick}>
        {this.props.day.day()}
      </div>
    );
  }
});

module.exports = Day;
