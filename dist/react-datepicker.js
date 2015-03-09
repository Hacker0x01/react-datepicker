(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("moment"), require("react-onclickoutside"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "moment", "react-onclickoutside"], factory);
	else if(typeof exports === 'object')
		exports["DatePicker"] = factory(require("react"), require("moment"), require("react-onclickoutside"));
	else
		root["DatePicker"] = factory(root["React"], root["moment"], root["OnClickOutside"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);
	var Popover = __webpack_require__(2);
	var DateUtil = __webpack_require__(3);
	var Calendar = __webpack_require__(4);
	var DateInput = __webpack_require__(5);

	var DatePicker = React.createClass({
	  displayName: "DatePicker",

	  getInitialState: function getInitialState() {
	    return {
	      focus: false
	    };
	  },

	  handleFocus: function handleFocus() {
	    this.setState({
	      focus: true
	    });
	  },

	  hideCalendar: function hideCalendar() {
	    setTimeout((function () {
	      this.setState({
	        focus: false
	      });
	    }).bind(this), 0);
	  },

	  handleSelect: function handleSelect(date) {
	    this.setSelected(date);

	    setTimeout((function () {
	      this.hideCalendar();
	    }).bind(this), 200);
	  },

	  setSelected: function setSelected(date) {
	    this.props.onChange(date.moment());
	  },

	  onInputClick: function onInputClick() {
	    this.setState({
	      focus: true
	    });
	  },

	  calendar: function calendar() {
	    if (this.state.focus) {
	      return React.createElement(
	        Popover,
	        null,
	        React.createElement(Calendar, {
	          selected: this.props.selected,
	          onSelect: this.handleSelect,
	          hideCalendar: this.hideCalendar,
	          minDate: this.props.minDate,
	          maxDate: this.props.maxDate })
	      );
	    }
	  },

	  render: function render() {

	    return React.createElement(
	      "div",
	      null,
	      React.createElement(DateInput, {
	        date: this.props.selected,
	        dateFormat: this.props.dateFormat,
	        focus: this.state.focus,
	        onFocus: this.handleFocus,
	        handleClick: this.onInputClick,
	        handleEnter: this.hideCalendar,
	        setSelected: this.setSelected,
	        hideCalendar: this.hideCalendar,
	        placeholderText: this.props.placeholderText }),
	      this.calendar()
	    );
	  }
	});

	module.exports = DatePicker;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);

	var Popover = React.createClass({
	  displayName: "Popover",

	  componentWillMount: function componentWillMount() {
	    var popoverContainer = document.createElement("span");
	    popoverContainer.className = "datepicker__container";

	    this._popoverElement = popoverContainer;

	    document.querySelector("body").appendChild(this._popoverElement);
	  },

	  componentDidMount: function componentDidMount() {
	    this._renderPopover();
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    this._renderPopover();
	  },

	  _popoverComponent: function _popoverComponent() {
	    var className = this.props.className;
	    return React.createElement(
	      "div",
	      { className: className },
	      this.props.children
	    );
	  },

	  _tetherOptions: function _tetherOptions() {
	    return {
	      element: this._popoverElement,
	      target: this.getDOMNode().parentElement,
	      attachment: "top left",
	      targetAttachment: "bottom left",
	      targetOffset: "10px 0",
	      optimizations: {
	        moveElement: false // always moves to <body> anyway!
	      },
	      constraints: [{
	        to: "scrollParent",
	        attachment: "together",
	        pin: true
	      }]
	    };
	  },

	  _renderPopover: function _renderPopover() {
	    React.render(this._popoverComponent(), this._popoverElement);

	    if (this._tether != null) {
	      this._tether.setOptions(this._tetherOptions());
	    } else {
	      this._tether = new Tether(this._tetherOptions());
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this._tether.destroy();
	    React.unmountComponentAtNode(this._popoverElement);
	    if (this._popoverElement.parentNode) {
	      this._popoverElement.parentNode.removeChild(this._popoverElement);
	    }
	  },

	  render: function render() {
	    return React.createElement("span", null);
	  }
	});

	module.exports = Popover;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function DateUtil(date) {
	  this._date = date;
	}

	DateUtil.prototype.isBefore = function (other) {
	  return this._date.isBefore(other._date, "day");
	};

	DateUtil.prototype.isAfter = function (other) {
	  return this._date.isAfter(other._date, "day");
	};

	DateUtil.prototype.sameDay = function (other) {
	  return this._date.isSame(other._date, "day");
	};

	DateUtil.prototype.sameMonth = function (other) {
	  return this._date.isSame(other._date, "month");
	};

	DateUtil.prototype.day = function () {
	  return this._date.date();
	};

	DateUtil.prototype.mapDaysInWeek = function (callback) {
	  var week = [];
	  var firstDay = this._date.clone().startOf("isoWeek");

	  for (var i = 0; i < 7; i++) {
	    var day = new DateUtil(firstDay.clone().add(i, "days"));

	    week[i] = callback(day, i);
	  }

	  return week;
	};

	DateUtil.prototype.mapWeeksInMonth = function (callback) {
	  var month = [];
	  var firstDay = this._date.clone().startOf("month").startOf("isoWeek");

	  for (var i = 0; i < 6; i++) {
	    var weekStart = new DateUtil(firstDay.clone().add(i, "weeks"));

	    month[i] = callback(weekStart, i);
	  }

	  return month;
	};

	DateUtil.prototype.weekInMonth = function (other) {
	  var firstDayInWeek = this._date.clone();
	  var lastDayInWeek = this._date.clone().isoWeekday(7);

	  return firstDayInWeek.isSame(other._date, "month") || lastDayInWeek.isSame(other._date, "month");
	};

	DateUtil.prototype.format = function () {
	  return this._date.format.apply(this._date, arguments);
	};

	DateUtil.prototype.addMonth = function () {
	  return new DateUtil(this._date.clone().add(1, "month"));
	};

	DateUtil.prototype.subtractMonth = function () {
	  return new DateUtil(this._date.clone().subtract(1, "month"));
	};

	DateUtil.prototype.clone = function () {
	  return new DateUtil(this._date.clone());
	};

	DateUtil.prototype.safeClone = function (alternative) {
	  if (!!this._date) return this.clone();

	  if (alternative === undefined) alternative = null;
	  return new DateUtil(alternative);
	};

	DateUtil.prototype.moment = function () {
	  return this._date;
	};

	module.exports = DateUtil;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);
	var Day = __webpack_require__(8);
	var DateUtil = __webpack_require__(3);
	var moment = __webpack_require__(6);

	var Calendar = React.createClass({
	  displayName: "Calendar",

	  mixins: [__webpack_require__(7)],

	  handleClickOutside: function handleClickOutside() {
	    this.props.hideCalendar();
	  },

	  getInitialState: function getInitialState() {
	    return {
	      date: new DateUtil(this.props.selected).safeClone(moment())
	    };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    // When the selected date changed
	    if (nextProps.selected !== this.props.selected) {
	      this.setState({
	        date: new DateUtil(nextProps.selected).clone()
	      });
	    }
	  },

	  increaseMonth: function increaseMonth() {
	    this.setState({
	      date: this.state.date.addMonth()
	    });
	  },

	  decreaseMonth: function decreaseMonth() {
	    this.setState({
	      date: this.state.date.subtractMonth()
	    });
	  },

	  weeks: function weeks() {
	    return this.state.date.mapWeeksInMonth(this.renderWeek);
	  },

	  handleDayClick: function handleDayClick(day) {
	    this.props.onSelect(day);
	  },

	  renderWeek: function renderWeek(weekStart, key) {
	    if (!weekStart.weekInMonth(this.state.date)) {
	      return;
	    }

	    return React.createElement(
	      "div",
	      { key: key },
	      this.days(weekStart)
	    );
	  },

	  renderDay: function renderDay(day, key) {
	    var minDate = new DateUtil(this.props.minDate).safeClone(),
	        maxDate = new DateUtil(this.props.maxDate).safeClone(),
	        disabled = day.isBefore(minDate) || day.isAfter(maxDate);

	    return React.createElement(Day, {
	      key: key,
	      day: day,
	      date: this.state.date,
	      onClick: this.handleDayClick.bind(this, day),
	      selected: new DateUtil(this.props.selected),
	      disabled: disabled });
	  },

	  days: function days(weekStart) {
	    return weekStart.mapDaysInWeek(this.renderDay);
	  },

	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "datepicker" },
	      React.createElement("div", { className: "datepicker__triangle" }),
	      React.createElement(
	        "div",
	        { className: "datepicker__header" },
	        React.createElement("a", { className: "datepicker__navigation datepicker__navigation--previous",
	          onClick: this.decreaseMonth }),
	        React.createElement(
	          "span",
	          { className: "datepicker__current-month" },
	          this.state.date.format("MMMM YYYY")
	        ),
	        React.createElement("a", { className: "datepicker__navigation datepicker__navigation--next",
	          onClick: this.increaseMonth }),
	        React.createElement(
	          "div",
	          null,
	          React.createElement(
	            "div",
	            { className: "datepicker__day" },
	            "Mo"
	          ),
	          React.createElement(
	            "div",
	            { className: "datepicker__day" },
	            "Tu"
	          ),
	          React.createElement(
	            "div",
	            { className: "datepicker__day" },
	            "We"
	          ),
	          React.createElement(
	            "div",
	            { className: "datepicker__day" },
	            "Th"
	          ),
	          React.createElement(
	            "div",
	            { className: "datepicker__day" },
	            "Fr"
	          ),
	          React.createElement(
	            "div",
	            { className: "datepicker__day" },
	            "Sa"
	          ),
	          React.createElement(
	            "div",
	            { className: "datepicker__day" },
	            "Su"
	          )
	        )
	      ),
	      React.createElement(
	        "div",
	        { className: "datepicker__month" },
	        this.weeks()
	      )
	    );
	  }
	});

	module.exports = Calendar;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);
	var DateUtil = __webpack_require__(3);
	var moment = __webpack_require__(6);

	var DateInput = React.createClass({
	  displayName: "DateInput",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      dateFormat: "YYYY-MM-DD"
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      value: this.safeDateFormat(this.props.date)
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    this.toggleFocus(this.props.focus);
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
	    this.toggleFocus(newProps.focus);

	    this.setState({
	      value: this.safeDateFormat(newProps.date)
	    });
	  },

	  toggleFocus: function toggleFocus(focus) {
	    if (focus) {
	      this.refs.input.getDOMNode().focus();
	    } else {
	      this.refs.input.getDOMNode().blur();
	    }
	  },

	  handleChange: function handleChange(event) {
	    var date = moment(event.target.value, this.props.dateFormat, true);

	    this.setState({
	      value: event.target.value
	    });

	    if (this.isValueAValidDate()) {
	      this.props.setSelected(new DateUtil(date));
	    }
	  },

	  safeDateFormat: function safeDateFormat(date) {
	    return !!date ? date.format(this.props.dateFormat) : null;
	  },

	  isValueAValidDate: function isValueAValidDate() {
	    var date = moment(event.target.value, this.props.dateFormat, true);

	    return date.isValid();
	  },

	  handleKeyDown: function handleKeyDown(event) {
	    switch (event.key) {
	      case "Enter":
	        event.preventDefault();
	        this.props.handleEnter();
	        break;
	    }
	  },

	  handleClick: function handleClick(event) {
	    this.props.handleClick(event);
	  },

	  render: function render() {
	    return React.createElement("input", {
	      ref: "input",
	      type: "text",
	      value: this.state.value,
	      onClick: this.handleClick,
	      onKeyDown: this.handleKeyDown,
	      onFocus: this.props.onFocus,
	      onChange: this.handleChange,
	      className: "datepicker__input",
	      placeholder: this.props.placeholderText });
	  }
	});

	module.exports = DateInput;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);
	var moment = __webpack_require__(6);

	var Day = React.createClass({
	  displayName: "Day",

	  handleClick: function handleClick(event) {
	    if (this.props.disabled) {
	      return;
	    }this.props.onClick(event);
	  },

	  render: function render() {
	    var classes = React.addons.classSet({
	      datepicker__day: true,
	      "datepicker__day--disabled": this.props.disabled,
	      "datepicker__day--selected": this.props.day.sameDay(this.props.selected),
	      "datepicker__day--today": this.props.day.sameDay(moment())
	    });

	    return React.createElement(
	      "div",
	      { className: classes, onClick: this.handleClick },
	      this.props.day.day()
	    );
	  }
	});

	module.exports = Day;

/***/ }
/******/ ])
});
;