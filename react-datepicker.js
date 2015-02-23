(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.DatePicker = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/** @jsx React.DOM */

var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);
var Day = require('./day');
var DateUtil = require('./util/date');
var moment = (typeof window !== "undefined" ? window.moment : typeof global !== "undefined" ? global.moment : null);

var Calendar = React.createClass({displayName: "Calendar",
  mixins: [(typeof window !== "undefined" ? window.OnClickOutside : typeof global !== "undefined" ? global.OnClickOutside : null)],

  handleClickOutside: function() {
    this.props.hideCalendar();
  },

  getInitialState: function() {
    return {
      date: new DateUtil(this.props.selected).safeClone(moment())
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
    var minDate = new DateUtil(this.props.minDate).safeClone(),
        maxDate = new DateUtil(this.props.maxDate).safeClone(),
        disabled = day.isBefore(minDate) || day.isAfter(maxDate);

    return (
      React.createElement(Day, {
        key: key, 
        day: day, 
        date: this.state.date, 
        onClick: this.handleDayClick.bind(this, day), 
        selected: new DateUtil(this.props.selected), 
        disabled: disabled})
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



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./day":4,"./util/date":6}],2:[function(require,module,exports){
(function (global){
/** @jsx React.DOM */

var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);
var DateUtil = require('./util/date');
var moment = (typeof window !== "undefined" ? window.moment : typeof global !== "undefined" ? global.moment : null);

var DateInput = React.createClass({displayName: "DateInput",

  getDefaultProps: function() {
    return {
      dateFormat: 'YYYY-MM-DD'
    };
  },

  getInitialState: function() {
    return {
      value: this.safeDateFormat(this.props.date)
    };
  },

  componentDidMount: function() {
    this.toggleFocus(this.props.focus);
  },

  componentWillReceiveProps: function(newProps) {
    this.toggleFocus(newProps.focus);

    this.setState({
      value: this.safeDateFormat(newProps.date)
    });
  },

  toggleFocus: function(focus) {
    if (focus) {
      this.refs.input.getDOMNode().focus();
    } else {
      this.refs.input.getDOMNode().blur();
    }
  },

  handleChange: function(event) {
    var date = moment(event.target.value, this.props.dateFormat, true);

    this.setState({
      value: event.target.value
    });

    if (this.isValueAValidDate()) {
      this.props.setSelected(new DateUtil(date));
    }
  },

  safeDateFormat: function(date) {
    return !! date ? date.format(this.props.dateFormat) : null;
  },

  isValueAValidDate: function() {
    var date = moment(event.target.value, this.props.dateFormat, true);

    return date.isValid();
  },

  handleKeyDown: function(event) {
    switch(event.key) {
    case "Enter":
      event.preventDefault();
      this.props.handleEnter();
      break;
    }
  },

  handleClick: function(event) {
    this.props.handleClick(event);
  },

  render: function() {
    return React.createElement("input", {
      ref: "input", 
      type: "text", 
      value: this.state.value, 
      onClick: this.handleClick, 
      onKeyDown: this.handleKeyDown, 
      onFocus: this.props.onFocus, 
      onChange: this.handleChange, 
      className: "datepicker__input", 
      placeholder: this.props.placeholderText});
  }
});

module.exports = DateInput;



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./util/date":6}],3:[function(require,module,exports){
(function (global){
/** @jsx React.DOM */

var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);
var Popover = require('./popover');
var DateUtil = require('./util/date');
var Calendar = require('./calendar');
var DateInput = require('./date_input');

var DatePicker = React.createClass({displayName: "DatePicker",
  getInitialState: function() {
    return {
      focus: false
    };
  },

  handleFocus: function() {
    this.setState({
      focus: true
    });
  },

  hideCalendar: function() {
    setTimeout(function() {
      this.setState({
        focus: false
      });
    }.bind(this), 0);
  },

  handleSelect: function(date) {
    this.setSelected(date);

    setTimeout(function(){
      this.hideCalendar();
    }.bind(this), 200);
  },

  setSelected: function(date) {
    this.props.onChange(date.moment());
  },

  onInputClick: function() {
    this.setState({
      focus: true
    });
  },

  calendar: function() {
    if (this.state.focus) {
      return (
        React.createElement(Popover, null, 
          React.createElement(Calendar, {
            selected: this.props.selected, 
            onSelect: this.handleSelect, 
            hideCalendar: this.hideCalendar, 
            minDate: this.props.minDate, 
            maxDate: this.props.maxDate})
        )
      );
    }
  },

  render: function() {

    return (
      React.createElement("div", null, 
        React.createElement(DateInput, {
          date: this.props.selected, 
          dateFormat: this.props.dateFormat, 
          focus: this.state.focus, 
          onFocus: this.handleFocus, 
          handleClick: this.onInputClick, 
          handleEnter: this.hideCalendar, 
          setSelected: this.setSelected, 
          hideCalendar: this.hideCalendar, 
          placeholderText: this.props.placeholderText}), 
        this.calendar()
      )
    );
  }
});

module.exports = DatePicker;



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./calendar":1,"./date_input":2,"./popover":5,"./util/date":6}],4:[function(require,module,exports){
(function (global){
/** @jsx React.DOM */

var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);
var moment = (typeof window !== "undefined" ? window.moment : typeof global !== "undefined" ? global.moment : null);

var Day = React.createClass({displayName: "Day",
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
      React.createElement("div", {className: classes, onClick: this.handleClick}, 
        this.props.day.day()
      )
    );
  }
});

module.exports = Day;



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
(function (global){
/** @jsx React.DOM */

var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);

var Popover = React.createClass({
  displayName: 'Popover',

  componentWillMount: function() {
    popoverContainer = document.createElement('span');
    popoverContainer.className = 'datepicker__container';

    this._popoverElement = popoverContainer;

    document.querySelector('body').appendChild(this._popoverElement);
  },

  componentDidMount: function() {
    this._renderPopover();
  },

  componentDidUpdate: function() {
    this._renderPopover();
  },

  _popoverComponent: function() {
    var className = this.props.className;
    return (
      React.createElement("div", {className: className}, 
        this.props.children
      )
    );
  },

  _tetherOptions: function() {
    return {
      element: this._popoverElement,
      target: this.getDOMNode().parentElement,
      attachment: 'top left',
      targetAttachment: 'bottom left',
      targetOffset: '10px 0',
      optimizations: {
        moveElement: false // always moves to <body> anyway!
      },
      constraints: [
        {
          to: 'scrollParent',
          attachment: 'together',
          pin: true
        }
      ]
    };
  },

  _renderPopover: function() {
    React.render(this._popoverComponent(), this._popoverElement);

    if (this._tether != null) {
      this._tether.setOptions(this._tetherOptions());
    } else {
      this._tether = new Tether(this._tetherOptions());
    }
  },

  componentWillUnmount: function() {
    this._tether.destroy();
    React.unmountComponentAtNode(this._popoverElement);
    if (this._popoverElement.parentNode) {
      this._popoverElement.parentNode.removeChild(this._popoverElement);
    }
  },

  render: function() {
    return React.createElement("span", null);
  }
});

module.exports = Popover;



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
function DateUtil(date) {
  this._date = date;
}

DateUtil.prototype.isBefore = function(other) {
  return this._date.isBefore(other._date, 'day');
};

DateUtil.prototype.isAfter = function(other) {
  return this._date.isAfter(other._date, 'day');
};

DateUtil.prototype.sameDay = function(other) {
  return this._date.isSame(other._date, 'day');
};

DateUtil.prototype.sameMonth = function(other) {
  return this._date.isSame(other._date, 'month');
};

DateUtil.prototype.day = function() {
  return this._date.date();
};

DateUtil.prototype.mapDaysInWeek = function(callback) {
  var week = [];
  var firstDay = this._date.clone().startOf('isoWeek');

  for(var i = 0; i < 7; i++) {
    var day = new DateUtil(firstDay.clone().add(i, 'days'));

    week[i] = callback(day, i);
  }

  return week;
};

DateUtil.prototype.mapWeeksInMonth = function(callback) {
  var month = [];
  var firstDay = this._date.clone().startOf('month').startOf('isoWeek');

  for(var i = 0; i < 6; i++) {
    var weekStart = new DateUtil(firstDay.clone().add(i, 'weeks'));

    month[i] = callback(weekStart, i);
  }

  return month;
};

DateUtil.prototype.weekInMonth = function(other) {
  var firstDayInWeek = this._date.clone();
  var lastDayInWeek = this._date.clone().isoWeekday(7);

  return firstDayInWeek.isSame(other._date, 'month') ||
    lastDayInWeek.isSame(other._date, 'month');
};

DateUtil.prototype.format = function() {
  return this._date.format.apply(this._date, arguments);
};

DateUtil.prototype.addMonth = function() {
  return new DateUtil(this._date.clone().add(1, 'month'));
};

DateUtil.prototype.subtractMonth = function() {
  return new DateUtil(this._date.clone().subtract(1, 'month'));
};

DateUtil.prototype.clone = function() {
  return new DateUtil(this._date.clone());
};

DateUtil.prototype.safeClone = function(alternative) {
  if (!! this._date) return this.clone();

  if (alternative === undefined) alternative = null;
  return new DateUtil(alternative);
};

DateUtil.prototype.moment = function() {
  return this._date;
};

module.exports = DateUtil;



},{}]},{},[3])(3)
});