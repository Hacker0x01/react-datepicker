!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.DatePicker=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/** @jsx React.DOM */

var Day = _dereq_('./day');

var Calendar = React.createClass({displayName: 'Calendar',
  getInitialState: function() {
    return {
      date: this.props.selected.clone()
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      date: nextProps.selected.clone()
    });
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

  renderWeek: function(weekStart, key) {
    if(! weekStart.weekInMonth(this.state.date)) {
      return;
    }

    return (
      React.DOM.div( {key:key, className:"week"}, 
        this.days(weekStart)
      )
    );
  },

  renderDay: function(day, key) {
    return (
      Day(
        {key:key,
        day:day,
        date:this.state.date,
        onSelect:this.props.onSelect,
        selected:this.props.selected} )
    );
  },

  days: function(weekStart) {
    return weekStart.mapDaysInWeek(this.renderDay);
  },

  render: function() {
    return (
      React.DOM.div( {className:"datepicker-calendar", onClick:this.props.onClick}, 
        React.DOM.div( {className:"datepicker-calendar-triangle"}),
        React.DOM.div( {className:"datepicker-calendar-header"}, 
          React.DOM.a( {className:"datepicker-calendar-header-navigation-left",
              onClick:this.decreaseMonth}
          ),
          React.DOM.span( {className:"datepicker-calendar-header-month"}, 
            this.state.date.format("MMMM YYYY")
          ),
          React.DOM.a( {className:"datepicker-calendar-header-navigation-right",
              onClick:this.increaseMonth}
          ),
          React.DOM.div(null, 
            React.DOM.div( {className:"datepicker-calendar-header-day"}, "Mo"),
            React.DOM.div( {className:"datepicker-calendar-header-day"}, "Tu"),
            React.DOM.div( {className:"datepicker-calendar-header-day"}, "We"),
            React.DOM.div( {className:"datepicker-calendar-header-day"}, "Th"),
            React.DOM.div( {className:"datepicker-calendar-header-day"}, "Fr"),
            React.DOM.div( {className:"datepicker-calendar-header-day"}, "Sa"),
            React.DOM.div( {className:"datepicker-calendar-header-day"}, "Su")
          )
        ),
        React.DOM.div( {className:"datepicker-calendar-month"}, 
          this.weeks()
        )
      )
    );
  }
});

module.exports = Calendar;

},{"./day":3}],2:[function(_dereq_,module,exports){
/** @jsx React.DOM */

var DateUtil = _dereq_('./util/date');
var Popover  = _dereq_('./popover');
var Calendar = _dereq_('./calendar');

var DatePicker = React.createClass({displayName: 'DatePicker',
  getInitialState: function() {
    var value = this.props.value;
    var selected = new DateUtil(moment(value)); // If value is undefined moment defaults to today

    return {
      focus: false,
      selected: selected,
      value: selected.format("YYYY-MM-DD")
    };
  },

  handleFocus: function() {
    this.setState({
      focus: true
    });
  },

  hideCalendar: function() {
    this.setState({
      focus: false
    });
  },

  handleBlur: function() {
    // Reset the value of this._shouldBeFocussed to it's default
    this._shouldBeFocussed = false;

    // If state.focus is still true, ignore the browser's blur
    if (this.state.focus) {
      this.refs.input.getDOMNode().focus();
    }

    // Give the browser some time to execute the possible click handlers
    //   (for when the user clicks inside of the calendar)
    setTimeout(function() {
      // Set the correct value for state.focus
      this.setState({
        focus: this._shouldBeFocussed
      });
    }.bind(this), 50);
  },

  handleCalendarClick: function() {
    this._shouldBeFocussed = true;

    this.setState({
      focus: true
    });
  },

  handleSelect: function(date) {
    this._shouldBeFocussed = true;

    this.setSelected(date);
    this.hideCalendar();
  },

  setSelected: function(date) {
    this.setState({
      selected: date,
      value: date.format("YYYY-MM-DD")
    });
  },

  inputValue: function() {
    return this.state.selected.format("YYYY-MM-DD");
  },

  calendar: function() {
    if (this.state.focus) {
      return (
        Popover(null, 
          Calendar(
            {selected:this.state.selected,
            onSelect:this.handleSelect,
            onClick:this.handleCalendarClick} )
        )
      );
    }
  },

  handleInputChange: function(event) {
    var date = moment(event.target.value, "YYYY-MM-DD");

    this.setState({
      value: event.target.value
    });

    if(date.isValid()) {
      this.setState({
        selected: new DateUtil(date)
      });
    }
  },

  componentDidUpdate: function() {
    if (this.state.focus) {
      this.refs.input.getDOMNode().focus();
    } else {
      this.refs.input.getDOMNode().blur();
    }
  },

  render: function() {
    return (
      React.DOM.div(null, 
        React.DOM.input(
          {ref:"input",
          type:"text",
          value:this.state.value,
          onBlur:this.handleBlur,
          onFocus:this.handleFocus,
          onChange:this.handleInputChange,
          className:"datepicker-input"} ),
        this.calendar()
      )
    );
  }
});

module.exports = DatePicker;

},{"./calendar":1,"./popover":4,"./util/date":5}],3:[function(_dereq_,module,exports){
/** @jsx React.DOM */

var Day = React.createClass({displayName: 'Day',
  handleClick: function(event) {
    this.props.onSelect(this.props.day);

    event.stopPropagation();
  },

  render: function() {
    classes = React.addons.classSet({
      'datepicker-calendar-day': true,
      'selected': this.props.day.sameDay(this.props.selected),
      'this-month': this.props.day.sameMonth(this.props.date),
      'today': this.props.day.sameDay(moment())
    });

    return (
      React.DOM.div( {className:classes, onClick:this.handleClick}, 
        this.props.day.day()
      )
    );
  }
});

module.exports = Day;

},{}],4:[function(_dereq_,module,exports){
/** @jsx React.DOM */

var Popover = React.createClass({
  displayName: 'Popover',

  componentWillMount: function() {
    popoverContainer = document.createElement('span');
    popoverContainer.className = 'datepicker-calendar-container';

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
      React.DOM.div( {className:className}, 
        React.DOM.div( {className:"datepicker-calendar-popover-content"}, 
          this.props.children
        )
      )
    );
  },

  _tetherOptions: function() {
    return {
      element: this._popoverElement,
      target: 'input',
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
    React.renderComponent(this._popoverComponent(), this._popoverElement);
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
    return React.DOM.span(null);
  }
});

module.exports = Popover;

},{}],5:[function(_dereq_,module,exports){
function DateUtil(date) {
  this._date = date;
}

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
    var day = new DateUtil(firstDay.clone().add('days', i));

    week[i] = callback(day, i);
  }

  return week;
};

DateUtil.prototype.mapWeeksInMonth = function(callback) {
  var month = [];
  var firstDay = this._date.clone().startOf('month').startOf('isoWeek');

  for(var i = 0; i < 6; i++) {
    var weekStart = new DateUtil(firstDay.clone().add('weeks', i));

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
  return new DateUtil(this._date.clone().add('month', 1));
};

DateUtil.prototype.subtractMonth = function() {
  return new DateUtil(this._date.clone().subtract('month', 1));
};

DateUtil.prototype.clone = function() {
  return new DateUtil(this._date.clone());
};

module.exports = DateUtil;

},{}]},{},[2])
(2)
});