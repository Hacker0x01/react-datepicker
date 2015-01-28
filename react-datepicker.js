!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.DatePicker=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * A mixin for handling (effectively) onClickOutside for React components.
 * Note that we're not intercepting any events in this approach, and we're
 * not using double events for capturing and discarding in layers or wrappers.
 *
 * The idea is that components define function
 *
 *   onClickOutside: function() { ... }
 *
 * If no such function is defined, an error will be thrown, as this means
 * either it still needs to be written, or the component should not be using
 * this mixing since it will not exhibit onClickOutside behaviour.
 *
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Note that this does not work with strict
    // CommonJS, but only CommonJS-like environments
    // that support module.exports
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.OnClickOutside = factory();
  }
}(this, function () {
  "use strict";

  // Use a parallel array because we can't use
  // objects as keys, they get toString-coerced
  var registeredComponents = [];
  var handlers = [];

  return {
    componentDidMount: function() {
      if(!this.handleClickOutside)
        throw new Error("Component lacks a handleClickOutside(event) function for processing outside click events.");

      var fn = (function(localNode, eventHandler) {
        return function(evt) {
          var source = evt.target;
          var found = false;
          // If source=local then this event came from "somewhere"
          // inside and should be ignored. We could handle this with
          // a layered approach, too, but that requires going back to
          // thinking in terms of Dom node nesting, running counter
          // to React's "you shouldn't care about the DOM" philosophy.
          while(source.parentNode) {
            found = (source === localNode);
            if(found) return;
            source = source.parentNode;
          }
          eventHandler(evt);
        }
      }(this.getDOMNode(), this.handleClickOutside));

      document.addEventListener("mousedown", fn);
      document.addEventListener("touchstart", fn);

      var pos = registeredComponents.length;
      registeredComponents.push(this);
      handlers[pos] = fn;
    },

    componentWillUnmount: function() {
      var pos = registeredComponents.indexOf(this);
      if( pos>-1) {
        var fn = handlers[pos];
        if (fn) {
          document.removeEventListener("mousedown", fn);
          document.removeEventListener("touchstart", fn);
        }
      }
    }
  };

}));

},{}],2:[function(require,module,exports){
/** @jsx React.DOM */

var Day = require('./day');
var DateUtil = require('./util/date');

var Calendar = React.createClass({displayName: 'Calendar',
  mixins: [require('react-onclickoutside')],

  handleClickOutside: function() {
    this.props.hideCalendar();
  },

  getInitialState: function() {
    return {
      date: new DateUtil(this.props.selected).clone()
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
      React.DOM.div({key: key}, 
        this.days(weekStart)
      )
    );
  },

  renderDay: function(day, key) {
    return (
      Day({
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
      React.DOM.div({className: "datepicker"}, 
        React.DOM.div({className: "datepicker__triangle"}), 
        React.DOM.div({className: "datepicker__header"}, 
          React.DOM.a({className: "datepicker__navigation datepicker__navigation--previous", 
              onClick: this.decreaseMonth}
          ), 
          React.DOM.span({className: "datepicker__current-month"}, 
            this.state.date.format("MMMM YYYY")
          ), 
          React.DOM.a({className: "datepicker__navigation datepicker__navigation--next", 
              onClick: this.increaseMonth}
          ), 
          React.DOM.div(null, 
            React.DOM.div({className: "datepicker__day"}, "Mo"), 
            React.DOM.div({className: "datepicker__day"}, "Tu"), 
            React.DOM.div({className: "datepicker__day"}, "We"), 
            React.DOM.div({className: "datepicker__day"}, "Th"), 
            React.DOM.div({className: "datepicker__day"}, "Fr"), 
            React.DOM.div({className: "datepicker__day"}, "Sa"), 
            React.DOM.div({className: "datepicker__day"}, "Su")
          )
        ), 
        React.DOM.div({className: "datepicker__month"}, 
          this.weeks()
        )
      )
    );
  }
});

module.exports = Calendar;

},{"./day":5,"./util/date":7,"react-onclickoutside":1}],3:[function(require,module,exports){
/** @jsx React.DOM */

var DateUtil = require('./util/date');

var DateInput = React.createClass({displayName: 'DateInput',

  getDefaultProps: function() {
    return {
      dateFormat: 'YYYY-MM-DD'
    };
  },

  getInitialState: function() {
    return {
      value: this.props.date.format(this.props.dateFormat)
    };
  },

  componentDidMount: function() {
    this.toggleFocus(this.props.focus);
  },

  componentWillReceiveProps: function(newProps) {
    this.toggleFocus(newProps.focus);

    this.setState({
      value: newProps.date.format(this.props.dateFormat)
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
    return React.DOM.input({
      ref: "input", 
      type: "text", 
      value: this.state.value, 
      onClick: this.handleClick, 
      onKeyDown: this.handleKeyDown, 
      onFocus: this.props.onFocus, 
      onChange: this.handleChange, 
      className: "datepicker__input"});
  }
});

module.exports = DateInput;

},{"./util/date":7}],4:[function(require,module,exports){
/** @jsx React.DOM */

var Popover   = require('./popover');
var DateUtil  = require('./util/date');
var Calendar  = require('./calendar');
var DateInput = require('./date_input');

var DatePicker = React.createClass({displayName: 'DatePicker',
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
        Popover(null, 
          Calendar({
            selected: this.props.selected, 
            onSelect: this.handleSelect, 
            hideCalendar: this.hideCalendar})
        )
      );
    }
  },

  render: function() {
    return (
      React.DOM.div(null, 
        DateInput({
          date: this.props.selected, 
          dateFormat: this.props.dateFormat, 
          focus: this.state.focus, 
          onFocus: this.handleFocus, 
          handleClick: this.onInputClick, 
          handleEnter: this.hideCalendar, 
          setSelected: this.setSelected, 
          hideCalendar: this.hideCalendar}), 
        this.calendar()
      )
    );
  }
});

module.exports = DatePicker;

},{"./calendar":2,"./date_input":3,"./popover":6,"./util/date":7}],5:[function(require,module,exports){
/** @jsx React.DOM */

var Day = React.createClass({displayName: 'Day',
  render: function() {
    classes = React.addons.classSet({
      'datepicker__day': true,
      'datepicker__day--selected': this.props.day.sameDay(this.props.selected),
      'datepicker__day--this-month': this.props.day.sameMonth(this.props.date),
      'datepicker__day--today': this.props.day.sameDay(moment())
    });

    return (
      React.DOM.div({className: classes, onClick: this.props.onClick}, 
        this.props.day.day()
      )
    );
  }
});

module.exports = Day;

},{}],6:[function(require,module,exports){
/** @jsx React.DOM */

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
      React.DOM.div({className: className}, 
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

},{}],7:[function(require,module,exports){
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

DateUtil.prototype.moment = function() {
  return this._date;
};

module.exports = DateUtil;

},{}]},{},[4])(4)
});