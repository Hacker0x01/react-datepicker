'use strict';

var React = require('react');
var Day = require('./day');
var DateUtil = require('./util/date');
var moment = require('moment');

var Calendar = React.createClass({displayName: "Calendar",
  mixins: [require('react-onclickoutside')],

  handleClickOutside: function() {
    this.props.hideCalendar();
  },

  getInitialState: function() {
    var date = this.props.selected || moment();

    return {
      date: new DateUtil(date).clone()
    };
  },

  componentWillReceiveProps: function(nextProps) {
    // When the selected date changed
    if (nextProps.selected !== this.props.selected) {
      this.setState({
        date: new DateUtil(nextProps.selected).clone()
      });
    }
  },

  increaseMonth: function() {
    this.setState({
      date: this.state.date.addMonth()
    });
  },

  decreaseMonth: function() {
    this.setState({
      date: this.state.date.subtractMonth()
    });
  },

  weeks: function() {
    return this.state.date.mapWeeksInMonth(this.renderWeek);
  },

  handleDayClick: function(day) {
    this.props.onSelect(day);
  },

  renderWeek: function(weekStart, key) {
    if(! weekStart.weekInMonth(this.state.date)) {
      return;
    }

    return (
      React.createElement("div", {key: key},
        this.days(weekStart)
      )
    );
  },

  renderDay: function(day, key) {
    return (
      React.createElement(Day, {
        key: key,
        day: day,
        date: this.state.date,
        onClick: this.handleDayClick.bind(this, day),
        selected: new DateUtil(this.props.selected)})
    );
  },

  days: function(weekStart) {
    return weekStart.mapDaysInWeek(this.renderDay);
  },

  render: function() {
    return (
      React.createElement("div", {className: "datepicker"},
        React.createElement("div", {className: "datepicker__triangle"}),
        React.createElement("div", {className: "datepicker__header"},
          React.createElement("a", {className: "datepicker__navigation datepicker__navigation--previous",
              onClick: this.decreaseMonth}
          ),
          React.createElement("span", {className: "datepicker__current-month"},
            this.state.date.format("MMMM YYYY")
          ),
          React.createElement("a", {className: "datepicker__navigation datepicker__navigation--next",
              onClick: this.increaseMonth}
          ),
          React.createElement("div", null,
            React.createElement("div", {className: "datepicker__day"}, "Mo"),
            React.createElement("div", {className: "datepicker__day"}, "Tu"),
            React.createElement("div", {className: "datepicker__day"}, "We"),
            React.createElement("div", {className: "datepicker__day"}, "Th"),
            React.createElement("div", {className: "datepicker__day"}, "Fr"),
            React.createElement("div", {className: "datepicker__day"}, "Sa"),
            React.createElement("div", {className: "datepicker__day"}, "Su")
          )
        ),
        React.createElement("div", {className: "datepicker__month"},
          this.weeks()
        )
      )
    );
  }
});

module.exports = Calendar;
