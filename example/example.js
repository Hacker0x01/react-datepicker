(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("moment"), require("react-onclickoutside"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "moment", "react-onclickoutside"], factory);
	else if(typeof exports === 'object')
		exports["ExampleApp"] = factory(require("react"), require("moment"), require("react-onclickoutside"));
	else
		root["ExampleApp"] = factory(root["React"], root["moment"], root["OnClickOutside"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_9__) {
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
	var App = __webpack_require__(2);

	React.render(React.createElement(App, null), document.getElementById("datepicker-region"));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);
	var DatePicker = __webpack_require__(4);
	var moment = __webpack_require__(3);

	var exampleComponent = React.createClass({
	  displayName: "exampleComponent",

	  getInitialState: function getInitialState() {
	    return {
	      start_date: moment(),
	      end_date: moment(),
	      new_date: null,
	      bound_date: null
	    };
	  },

	  handleStartDateChange: function handleStartDateChange(date) {
	    this.setState({
	      start_date: date
	    });
	  },

	  handleEndDateChange: function handleEndDateChange(date) {
	    this.setState({
	      end_date: date
	    });
	  },

	  handleNewDateChange: function handleNewDateChange(date) {
	    this.setState({
	      new_date: date
	    });
	  },

	  handleBoundDateChange: function handleBoundDateChange(date) {
	    this.setState({
	      bound_date: date
	    });
	  },

	  render: function render() {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(DatePicker, {
	        key: "example1",
	        selected: this.state.start_date,
	        onChange: this.handleStartDateChange
	      }),
	      React.createElement(DatePicker, {
	        key: "example2",
	        dateFormat: "YYYY/MM/DD",
	        selected: this.state.end_date,
	        onChange: this.handleEndDateChange
	      }),
	      React.createElement(DatePicker, {
	        key: "example3",
	        selected: this.state.new_date,
	        onChange: this.handleNewDateChange,
	        placeholderText: "Click to select a date"
	      }),
	      React.createElement(DatePicker, {
	        key: "example4",
	        selected: this.state.bound_date,
	        onChange: this.handleBoundDateChange,
	        minDate: moment(),
	        maxDate: moment().add(5, "days"),
	        placeholderText: "Select a date between today and 5 days in the future"
	      })
	    );
	  }
	});

	module.exports = exampleComponent;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);
	var Popover = __webpack_require__(5);
	var DateUtil = __webpack_require__(6);
	var Calendar = __webpack_require__(7);
	var DateInput = __webpack_require__(8);

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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);
	var Tether = __webpack_require__(11);

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
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);
	var Day = __webpack_require__(10);
	var DateUtil = __webpack_require__(6);
	var moment = __webpack_require__(3);

	var Calendar = React.createClass({
	  displayName: "Calendar",

	  mixins: [__webpack_require__(9)],

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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);
	var DateUtil = __webpack_require__(6);
	var moment = __webpack_require__(3);

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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);
	var moment = __webpack_require__(3);

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

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! tether 0.6.5 */


	(function(root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = factory(require,exports,module);
	  } else {
	    root.Tether = factory();
	  }
	}(this, function(require,exports,module) {

	(function() {
	  var Evented, addClass, defer, deferred, extend, flush, getBounds, getClassName, getOffsetParent, getOrigin, getScrollBarSize, getScrollParent, hasClass, node, removeClass, setClassName, uniqueId, updateClasses, zeroPosCache,
	    __hasProp = {}.hasOwnProperty,
	    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
	    __slice = [].slice;

	  if (this.Tether == null) {
	    this.Tether = {
	      modules: []
	    };
	  }

	  getScrollParent = function(el) {
	    var parent, position, scrollParent, style, _ref;
	    position = getComputedStyle(el).position;
	    if (position === 'fixed') {
	      return el;
	    }
	    scrollParent = void 0;
	    parent = el;
	    while (parent = parent.parentNode) {
	      try {
	        style = getComputedStyle(parent);
	      } catch (_error) {}
	      if (style == null) {
	        return parent;
	      }
	      if (/(auto|scroll)/.test(style['overflow'] + style['overflowY'] + style['overflowX'])) {
	        if (position !== 'absolute' || ((_ref = style['position']) === 'relative' || _ref === 'absolute' || _ref === 'fixed')) {
	          return parent;
	        }
	      }
	    }
	    return document.body;
	  };

	  uniqueId = (function() {
	    var id;
	    id = 0;
	    return function() {
	      return id++;
	    };
	  })();

	  zeroPosCache = {};

	  getOrigin = function(doc) {
	    var id, k, node, v, _ref;
	    node = doc._tetherZeroElement;
	    if (node == null) {
	      node = doc.createElement('div');
	      node.setAttribute('data-tether-id', uniqueId());
	      extend(node.style, {
	        top: 0,
	        left: 0,
	        position: 'absolute'
	      });
	      doc.body.appendChild(node);
	      doc._tetherZeroElement = node;
	    }
	    id = node.getAttribute('data-tether-id');
	    if (zeroPosCache[id] == null) {
	      zeroPosCache[id] = {};
	      _ref = node.getBoundingClientRect();
	      for (k in _ref) {
	        v = _ref[k];
	        zeroPosCache[id][k] = v;
	      }
	      defer(function() {
	        return zeroPosCache[id] = void 0;
	      });
	    }
	    return zeroPosCache[id];
	  };

	  node = null;

	  getBounds = function(el) {
	    var box, doc, docEl, k, origin, v, _ref;
	    if (el === document) {
	      doc = document;
	      el = document.documentElement;
	    } else {
	      doc = el.ownerDocument;
	    }
	    docEl = doc.documentElement;
	    box = {};
	    _ref = el.getBoundingClientRect();
	    for (k in _ref) {
	      v = _ref[k];
	      box[k] = v;
	    }
	    origin = getOrigin(doc);
	    box.top -= origin.top;
	    box.left -= origin.left;
	    if (box.width == null) {
	      box.width = document.body.scrollWidth - box.left - box.right;
	    }
	    if (box.height == null) {
	      box.height = document.body.scrollHeight - box.top - box.bottom;
	    }
	    box.top = box.top - docEl.clientTop;
	    box.left = box.left - docEl.clientLeft;
	    box.right = doc.body.clientWidth - box.width - box.left;
	    box.bottom = doc.body.clientHeight - box.height - box.top;
	    return box;
	  };

	  getOffsetParent = function(el) {
	    return el.offsetParent || document.documentElement;
	  };

	  getScrollBarSize = function() {
	    var inner, outer, width, widthContained, widthScroll;
	    inner = document.createElement('div');
	    inner.style.width = '100%';
	    inner.style.height = '200px';
	    outer = document.createElement('div');
	    extend(outer.style, {
	      position: 'absolute',
	      top: 0,
	      left: 0,
	      pointerEvents: 'none',
	      visibility: 'hidden',
	      width: '200px',
	      height: '150px',
	      overflow: 'hidden'
	    });
	    outer.appendChild(inner);
	    document.body.appendChild(outer);
	    widthContained = inner.offsetWidth;
	    outer.style.overflow = 'scroll';
	    widthScroll = inner.offsetWidth;
	    if (widthContained === widthScroll) {
	      widthScroll = outer.clientWidth;
	    }
	    document.body.removeChild(outer);
	    width = widthContained - widthScroll;
	    return {
	      width: width,
	      height: width
	    };
	  };

	  extend = function(out) {
	    var args, key, obj, val, _i, _len, _ref;
	    if (out == null) {
	      out = {};
	    }
	    args = [];
	    Array.prototype.push.apply(args, arguments);
	    _ref = args.slice(1);
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      obj = _ref[_i];
	      if (obj) {
	        for (key in obj) {
	          if (!__hasProp.call(obj, key)) continue;
	          val = obj[key];
	          out[key] = val;
	        }
	      }
	    }
	    return out;
	  };

	  removeClass = function(el, name) {
	    var className, cls, _i, _len, _ref, _results;
	    if (el.classList != null) {
	      _ref = name.split(' ');
	      _results = [];
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        cls = _ref[_i];
	        if (cls.trim()) {
	          _results.push(el.classList.remove(cls));
	        }
	      }
	      return _results;
	    } else {
	      className = getClassName(el).replace(new RegExp("(^| )" + (name.split(' ').join('|')) + "( |$)", 'gi'), ' ');
	      return setClassName(el, className);
	    }
	  };

	  addClass = function(el, name) {
	    var cls, _i, _len, _ref, _results;
	    if (el.classList != null) {
	      _ref = name.split(' ');
	      _results = [];
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        cls = _ref[_i];
	        if (cls.trim()) {
	          _results.push(el.classList.add(cls));
	        }
	      }
	      return _results;
	    } else {
	      removeClass(el, name);
	      cls = getClassName(el) + (" " + name);
	      return setClassName(el, cls);
	    }
	  };

	  hasClass = function(el, name) {
	    if (el.classList != null) {
	      return el.classList.contains(name);
	    } else {
	      return new RegExp("(^| )" + name + "( |$)", 'gi').test(getClassName(el));
	    }
	  };

	  getClassName = function(el) {
	    if (el.className instanceof SVGAnimatedString) {
	      return el.className.baseVal;
	    } else {
	      return el.className;
	    }
	  };

	  setClassName = function(el, className) {
	    return el.setAttribute('class', className);
	  };

	  updateClasses = function(el, add, all) {
	    var cls, _i, _j, _len, _len1, _results;
	    for (_i = 0, _len = all.length; _i < _len; _i++) {
	      cls = all[_i];
	      if (__indexOf.call(add, cls) < 0) {
	        if (hasClass(el, cls)) {
	          removeClass(el, cls);
	        }
	      }
	    }
	    _results = [];
	    for (_j = 0, _len1 = add.length; _j < _len1; _j++) {
	      cls = add[_j];
	      if (!hasClass(el, cls)) {
	        _results.push(addClass(el, cls));
	      } else {
	        _results.push(void 0);
	      }
	    }
	    return _results;
	  };

	  deferred = [];

	  defer = function(fn) {
	    return deferred.push(fn);
	  };

	  flush = function() {
	    var fn, _results;
	    _results = [];
	    while (fn = deferred.pop()) {
	      _results.push(fn());
	    }
	    return _results;
	  };

	  Evented = (function() {
	    function Evented() {}

	    Evented.prototype.on = function(event, handler, ctx, once) {
	      var _base;
	      if (once == null) {
	        once = false;
	      }
	      if (this.bindings == null) {
	        this.bindings = {};
	      }
	      if ((_base = this.bindings)[event] == null) {
	        _base[event] = [];
	      }
	      return this.bindings[event].push({
	        handler: handler,
	        ctx: ctx,
	        once: once
	      });
	    };

	    Evented.prototype.once = function(event, handler, ctx) {
	      return this.on(event, handler, ctx, true);
	    };

	    Evented.prototype.off = function(event, handler) {
	      var i, _ref, _results;
	      if (((_ref = this.bindings) != null ? _ref[event] : void 0) == null) {
	        return;
	      }
	      if (handler == null) {
	        return delete this.bindings[event];
	      } else {
	        i = 0;
	        _results = [];
	        while (i < this.bindings[event].length) {
	          if (this.bindings[event][i].handler === handler) {
	            _results.push(this.bindings[event].splice(i, 1));
	          } else {
	            _results.push(i++);
	          }
	        }
	        return _results;
	      }
	    };

	    Evented.prototype.trigger = function() {
	      var args, ctx, event, handler, i, once, _ref, _ref1, _results;
	      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	      if ((_ref = this.bindings) != null ? _ref[event] : void 0) {
	        i = 0;
	        _results = [];
	        while (i < this.bindings[event].length) {
	          _ref1 = this.bindings[event][i], handler = _ref1.handler, ctx = _ref1.ctx, once = _ref1.once;
	          handler.apply(ctx != null ? ctx : this, args);
	          if (once) {
	            _results.push(this.bindings[event].splice(i, 1));
	          } else {
	            _results.push(i++);
	          }
	        }
	        return _results;
	      }
	    };

	    return Evented;

	  })();

	  this.Tether.Utils = {
	    getScrollParent: getScrollParent,
	    getBounds: getBounds,
	    getOffsetParent: getOffsetParent,
	    extend: extend,
	    addClass: addClass,
	    removeClass: removeClass,
	    hasClass: hasClass,
	    updateClasses: updateClasses,
	    defer: defer,
	    flush: flush,
	    uniqueId: uniqueId,
	    Evented: Evented,
	    getScrollBarSize: getScrollBarSize
	  };

	}).call(this);

	(function() {
	  var MIRROR_LR, MIRROR_TB, OFFSET_MAP, Tether, addClass, addOffset, attachmentToOffset, autoToFixedAttachment, defer, extend, flush, getBounds, getOffsetParent, getOuterSize, getScrollBarSize, getScrollParent, getSize, now, offsetToPx, parseAttachment, parseOffset, position, removeClass, tethers, transformKey, updateClasses, within, _Tether, _ref,
	    __slice = [].slice,
	    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	  if (this.Tether == null) {
	    throw new Error("You must include the utils.js file before tether.js");
	  }

	  Tether = this.Tether;

	  _ref = Tether.Utils, getScrollParent = _ref.getScrollParent, getSize = _ref.getSize, getOuterSize = _ref.getOuterSize, getBounds = _ref.getBounds, getOffsetParent = _ref.getOffsetParent, extend = _ref.extend, addClass = _ref.addClass, removeClass = _ref.removeClass, updateClasses = _ref.updateClasses, defer = _ref.defer, flush = _ref.flush, getScrollBarSize = _ref.getScrollBarSize;

	  within = function(a, b, diff) {
	    if (diff == null) {
	      diff = 1;
	    }
	    return (a + diff >= b && b >= a - diff);
	  };

	  transformKey = (function() {
	    var el, key, _i, _len, _ref1;
	    el = document.createElement('div');
	    _ref1 = ['transform', 'webkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
	    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	      key = _ref1[_i];
	      if (el.style[key] !== void 0) {
	        return key;
	      }
	    }
	  })();

	  tethers = [];

	  position = function() {
	    var tether, _i, _len;
	    for (_i = 0, _len = tethers.length; _i < _len; _i++) {
	      tether = tethers[_i];
	      tether.position(false);
	    }
	    return flush();
	  };

	  now = function() {
	    var _ref1;
	    return (_ref1 = typeof performance !== "undefined" && performance !== null ? typeof performance.now === "function" ? performance.now() : void 0 : void 0) != null ? _ref1 : +(new Date);
	  };

	  (function() {
	    var event, lastCall, lastDuration, pendingTimeout, tick, _i, _len, _ref1, _results;
	    lastCall = null;
	    lastDuration = null;
	    pendingTimeout = null;
	    tick = function() {
	      if ((lastDuration != null) && lastDuration > 16) {
	        lastDuration = Math.min(lastDuration - 16, 250);
	        pendingTimeout = setTimeout(tick, 250);
	        return;
	      }
	      if ((lastCall != null) && (now() - lastCall) < 10) {
	        return;
	      }
	      if (pendingTimeout != null) {
	        clearTimeout(pendingTimeout);
	        pendingTimeout = null;
	      }
	      lastCall = now();
	      position();
	      return lastDuration = now() - lastCall;
	    };
	    _ref1 = ['resize', 'scroll', 'touchmove'];
	    _results = [];
	    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	      event = _ref1[_i];
	      _results.push(window.addEventListener(event, tick));
	    }
	    return _results;
	  })();

	  MIRROR_LR = {
	    center: 'center',
	    left: 'right',
	    right: 'left'
	  };

	  MIRROR_TB = {
	    middle: 'middle',
	    top: 'bottom',
	    bottom: 'top'
	  };

	  OFFSET_MAP = {
	    top: 0,
	    left: 0,
	    middle: '50%',
	    center: '50%',
	    bottom: '100%',
	    right: '100%'
	  };

	  autoToFixedAttachment = function(attachment, relativeToAttachment) {
	    var left, top;
	    left = attachment.left, top = attachment.top;
	    if (left === 'auto') {
	      left = MIRROR_LR[relativeToAttachment.left];
	    }
	    if (top === 'auto') {
	      top = MIRROR_TB[relativeToAttachment.top];
	    }
	    return {
	      left: left,
	      top: top
	    };
	  };

	  attachmentToOffset = function(attachment) {
	    var _ref1, _ref2;
	    return {
	      left: (_ref1 = OFFSET_MAP[attachment.left]) != null ? _ref1 : attachment.left,
	      top: (_ref2 = OFFSET_MAP[attachment.top]) != null ? _ref2 : attachment.top
	    };
	  };

	  addOffset = function() {
	    var left, offsets, out, top, _i, _len, _ref1;
	    offsets = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	    out = {
	      top: 0,
	      left: 0
	    };
	    for (_i = 0, _len = offsets.length; _i < _len; _i++) {
	      _ref1 = offsets[_i], top = _ref1.top, left = _ref1.left;
	      if (typeof top === 'string') {
	        top = parseFloat(top, 10);
	      }
	      if (typeof left === 'string') {
	        left = parseFloat(left, 10);
	      }
	      out.top += top;
	      out.left += left;
	    }
	    return out;
	  };

	  offsetToPx = function(offset, size) {
	    if (typeof offset.left === 'string' && offset.left.indexOf('%') !== -1) {
	      offset.left = parseFloat(offset.left, 10) / 100 * size.width;
	    }
	    if (typeof offset.top === 'string' && offset.top.indexOf('%') !== -1) {
	      offset.top = parseFloat(offset.top, 10) / 100 * size.height;
	    }
	    return offset;
	  };

	  parseAttachment = parseOffset = function(value) {
	    var left, top, _ref1;
	    _ref1 = value.split(' '), top = _ref1[0], left = _ref1[1];
	    return {
	      top: top,
	      left: left
	    };
	  };

	  _Tether = (function() {
	    _Tether.modules = [];

	    function _Tether(options) {
	      this.position = __bind(this.position, this);
	      var module, _i, _len, _ref1, _ref2;
	      tethers.push(this);
	      this.history = [];
	      this.setOptions(options, false);
	      _ref1 = Tether.modules;
	      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	        module = _ref1[_i];
	        if ((_ref2 = module.initialize) != null) {
	          _ref2.call(this);
	        }
	      }
	      this.position();
	    }

	    _Tether.prototype.getClass = function(key) {
	      var _ref1, _ref2;
	      if ((_ref1 = this.options.classes) != null ? _ref1[key] : void 0) {
	        return this.options.classes[key];
	      } else if (((_ref2 = this.options.classes) != null ? _ref2[key] : void 0) !== false) {
	        if (this.options.classPrefix) {
	          return "" + this.options.classPrefix + "-" + key;
	        } else {
	          return key;
	        }
	      } else {
	        return '';
	      }
	    };

	    _Tether.prototype.setOptions = function(options, position) {
	      var defaults, key, _i, _len, _ref1, _ref2;
	      this.options = options;
	      if (position == null) {
	        position = true;
	      }
	      defaults = {
	        offset: '0 0',
	        targetOffset: '0 0',
	        targetAttachment: 'auto auto',
	        classPrefix: 'tether'
	      };
	      this.options = extend(defaults, this.options);
	      _ref1 = this.options, this.element = _ref1.element, this.target = _ref1.target, this.targetModifier = _ref1.targetModifier;
	      if (this.target === 'viewport') {
	        this.target = document.body;
	        this.targetModifier = 'visible';
	      } else if (this.target === 'scroll-handle') {
	        this.target = document.body;
	        this.targetModifier = 'scroll-handle';
	      }
	      _ref2 = ['element', 'target'];
	      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
	        key = _ref2[_i];
	        if (this[key] == null) {
	          throw new Error("Tether Error: Both element and target must be defined");
	        }
	        if (this[key].jquery != null) {
	          this[key] = this[key][0];
	        } else if (typeof this[key] === 'string') {
	          this[key] = document.querySelector(this[key]);
	        }
	      }
	      addClass(this.element, this.getClass('element'));
	      addClass(this.target, this.getClass('target'));
	      if (!this.options.attachment) {
	        throw new Error("Tether Error: You must provide an attachment");
	      }
	      this.targetAttachment = parseAttachment(this.options.targetAttachment);
	      this.attachment = parseAttachment(this.options.attachment);
	      this.offset = parseOffset(this.options.offset);
	      this.targetOffset = parseOffset(this.options.targetOffset);
	      if (this.scrollParent != null) {
	        this.disable();
	      }
	      if (this.targetModifier === 'scroll-handle') {
	        this.scrollParent = this.target;
	      } else {
	        this.scrollParent = getScrollParent(this.target);
	      }
	      if (this.options.enabled !== false) {
	        return this.enable(position);
	      }
	    };

	    _Tether.prototype.getTargetBounds = function() {
	      var bounds, fitAdj, hasBottomScroll, height, out, scrollBottom, scrollPercentage, style, target;
	      if (this.targetModifier != null) {
	        switch (this.targetModifier) {
	          case 'visible':
	            if (this.target === document.body) {
	              return {
	                top: pageYOffset,
	                left: pageXOffset,
	                height: innerHeight,
	                width: innerWidth
	              };
	            } else {
	              bounds = getBounds(this.target);
	              out = {
	                height: bounds.height,
	                width: bounds.width,
	                top: bounds.top,
	                left: bounds.left
	              };
	              out.height = Math.min(out.height, bounds.height - (pageYOffset - bounds.top));
	              out.height = Math.min(out.height, bounds.height - ((bounds.top + bounds.height) - (pageYOffset + innerHeight)));
	              out.height = Math.min(innerHeight, out.height);
	              out.height -= 2;
	              out.width = Math.min(out.width, bounds.width - (pageXOffset - bounds.left));
	              out.width = Math.min(out.width, bounds.width - ((bounds.left + bounds.width) - (pageXOffset + innerWidth)));
	              out.width = Math.min(innerWidth, out.width);
	              out.width -= 2;
	              if (out.top < pageYOffset) {
	                out.top = pageYOffset;
	              }
	              if (out.left < pageXOffset) {
	                out.left = pageXOffset;
	              }
	              return out;
	            }
	            break;
	          case 'scroll-handle':
	            target = this.target;
	            if (target === document.body) {
	              target = document.documentElement;
	              bounds = {
	                left: pageXOffset,
	                top: pageYOffset,
	                height: innerHeight,
	                width: innerWidth
	              };
	            } else {
	              bounds = getBounds(target);
	            }
	            style = getComputedStyle(target);
	            hasBottomScroll = target.scrollWidth > target.clientWidth || 'scroll' === [style.overflow, style.overflowX] || this.target !== document.body;
	            scrollBottom = 0;
	            if (hasBottomScroll) {
	              scrollBottom = 15;
	            }
	            height = bounds.height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - scrollBottom;
	            out = {
	              width: 15,
	              height: height * 0.975 * (height / target.scrollHeight),
	              left: bounds.left + bounds.width - parseFloat(style.borderLeftWidth) - 15
	            };
	            fitAdj = 0;
	            if (height < 408 && this.target === document.body) {
	              fitAdj = -0.00011 * Math.pow(height, 2) - 0.00727 * height + 22.58;
	            }
	            if (this.target !== document.body) {
	              out.height = Math.max(out.height, 24);
	            }
	            scrollPercentage = this.target.scrollTop / (target.scrollHeight - height);
	            out.top = scrollPercentage * (height - out.height - fitAdj) + bounds.top + parseFloat(style.borderTopWidth);
	            if (this.target === document.body) {
	              out.height = Math.max(out.height, 24);
	            }
	            return out;
	        }
	      } else {
	        return getBounds(this.target);
	      }
	    };

	    _Tether.prototype.clearCache = function() {
	      return this._cache = {};
	    };

	    _Tether.prototype.cache = function(k, getter) {
	      if (this._cache == null) {
	        this._cache = {};
	      }
	      if (this._cache[k] == null) {
	        this._cache[k] = getter.call(this);
	      }
	      return this._cache[k];
	    };

	    _Tether.prototype.enable = function(position) {
	      if (position == null) {
	        position = true;
	      }
	      addClass(this.target, this.getClass('enabled'));
	      addClass(this.element, this.getClass('enabled'));
	      this.enabled = true;
	      if (this.scrollParent !== document) {
	        this.scrollParent.addEventListener('scroll', this.position);
	      }
	      if (position) {
	        return this.position();
	      }
	    };

	    _Tether.prototype.disable = function() {
	      removeClass(this.target, this.getClass('enabled'));
	      removeClass(this.element, this.getClass('enabled'));
	      this.enabled = false;
	      if (this.scrollParent != null) {
	        return this.scrollParent.removeEventListener('scroll', this.position);
	      }
	    };

	    _Tether.prototype.destroy = function() {
	      var i, tether, _i, _len, _results;
	      this.disable();
	      _results = [];
	      for (i = _i = 0, _len = tethers.length; _i < _len; i = ++_i) {
	        tether = tethers[i];
	        if (tether === this) {
	          tethers.splice(i, 1);
	          break;
	        } else {
	          _results.push(void 0);
	        }
	      }
	      return _results;
	    };

	    _Tether.prototype.updateAttachClasses = function(elementAttach, targetAttach) {
	      var add, all, side, sides, _i, _j, _len, _len1, _ref1,
	        _this = this;
	      if (elementAttach == null) {
	        elementAttach = this.attachment;
	      }
	      if (targetAttach == null) {
	        targetAttach = this.targetAttachment;
	      }
	      sides = ['left', 'top', 'bottom', 'right', 'middle', 'center'];
	      if ((_ref1 = this._addAttachClasses) != null ? _ref1.length : void 0) {
	        this._addAttachClasses.splice(0, this._addAttachClasses.length);
	      }
	      add = this._addAttachClasses != null ? this._addAttachClasses : this._addAttachClasses = [];
	      if (elementAttach.top) {
	        add.push("" + (this.getClass('element-attached')) + "-" + elementAttach.top);
	      }
	      if (elementAttach.left) {
	        add.push("" + (this.getClass('element-attached')) + "-" + elementAttach.left);
	      }
	      if (targetAttach.top) {
	        add.push("" + (this.getClass('target-attached')) + "-" + targetAttach.top);
	      }
	      if (targetAttach.left) {
	        add.push("" + (this.getClass('target-attached')) + "-" + targetAttach.left);
	      }
	      all = [];
	      for (_i = 0, _len = sides.length; _i < _len; _i++) {
	        side = sides[_i];
	        all.push("" + (this.getClass('element-attached')) + "-" + side);
	      }
	      for (_j = 0, _len1 = sides.length; _j < _len1; _j++) {
	        side = sides[_j];
	        all.push("" + (this.getClass('target-attached')) + "-" + side);
	      }
	      return defer(function() {
	        if (_this._addAttachClasses == null) {
	          return;
	        }
	        updateClasses(_this.element, _this._addAttachClasses, all);
	        updateClasses(_this.target, _this._addAttachClasses, all);
	        return _this._addAttachClasses = void 0;
	      });
	    };

	    _Tether.prototype.position = function(flushChanges) {
	      var elementPos, elementStyle, height, left, manualOffset, manualTargetOffset, module, next, offset, offsetBorder, offsetParent, offsetParentSize, offsetParentStyle, offsetPosition, ret, scrollLeft, scrollTop, scrollbarSize, side, targetAttachment, targetOffset, targetPos, targetSize, top, width, _i, _j, _len, _len1, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6,
	        _this = this;
	      if (flushChanges == null) {
	        flushChanges = true;
	      }
	      if (!this.enabled) {
	        return;
	      }
	      this.clearCache();
	      targetAttachment = autoToFixedAttachment(this.targetAttachment, this.attachment);
	      this.updateAttachClasses(this.attachment, targetAttachment);
	      elementPos = this.cache('element-bounds', function() {
	        return getBounds(_this.element);
	      });
	      width = elementPos.width, height = elementPos.height;
	      if (width === 0 && height === 0 && (this.lastSize != null)) {
	        _ref1 = this.lastSize, width = _ref1.width, height = _ref1.height;
	      } else {
	        this.lastSize = {
	          width: width,
	          height: height
	        };
	      }
	      targetSize = targetPos = this.cache('target-bounds', function() {
	        return _this.getTargetBounds();
	      });
	      offset = offsetToPx(attachmentToOffset(this.attachment), {
	        width: width,
	        height: height
	      });
	      targetOffset = offsetToPx(attachmentToOffset(targetAttachment), targetSize);
	      manualOffset = offsetToPx(this.offset, {
	        width: width,
	        height: height
	      });
	      manualTargetOffset = offsetToPx(this.targetOffset, targetSize);
	      offset = addOffset(offset, manualOffset);
	      targetOffset = addOffset(targetOffset, manualTargetOffset);
	      left = targetPos.left + targetOffset.left - offset.left;
	      top = targetPos.top + targetOffset.top - offset.top;
	      _ref2 = Tether.modules;
	      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
	        module = _ref2[_i];
	        ret = module.position.call(this, {
	          left: left,
	          top: top,
	          targetAttachment: targetAttachment,
	          targetPos: targetPos,
	          attachment: this.attachment,
	          elementPos: elementPos,
	          offset: offset,
	          targetOffset: targetOffset,
	          manualOffset: manualOffset,
	          manualTargetOffset: manualTargetOffset,
	          scrollbarSize: scrollbarSize
	        });
	        if ((ret == null) || typeof ret !== 'object') {
	          continue;
	        } else if (ret === false) {
	          return false;
	        } else {
	          top = ret.top, left = ret.left;
	        }
	      }
	      next = {
	        page: {
	          top: top,
	          left: left
	        },
	        viewport: {
	          top: top - pageYOffset,
	          bottom: pageYOffset - top - height + innerHeight,
	          left: left - pageXOffset,
	          right: pageXOffset - left - width + innerWidth
	        }
	      };
	      if (document.body.scrollWidth > window.innerWidth) {
	        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
	        next.viewport.bottom -= scrollbarSize.height;
	      }
	      if (document.body.scrollHeight > window.innerHeight) {
	        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
	        next.viewport.right -= scrollbarSize.width;
	      }
	      if (((_ref3 = document.body.style.position) !== '' && _ref3 !== 'static') || ((_ref4 = document.body.parentElement.style.position) !== '' && _ref4 !== 'static')) {
	        next.page.bottom = document.body.scrollHeight - top - height;
	        next.page.right = document.body.scrollWidth - left - width;
	      }
	      if (((_ref5 = this.options.optimizations) != null ? _ref5.moveElement : void 0) !== false && (this.targetModifier == null)) {
	        offsetParent = this.cache('target-offsetparent', function() {
	          return getOffsetParent(_this.target);
	        });
	        offsetPosition = this.cache('target-offsetparent-bounds', function() {
	          return getBounds(offsetParent);
	        });
	        offsetParentStyle = getComputedStyle(offsetParent);
	        elementStyle = getComputedStyle(this.element);
	        offsetParentSize = offsetPosition;
	        offsetBorder = {};
	        _ref6 = ['Top', 'Left', 'Bottom', 'Right'];
	        for (_j = 0, _len1 = _ref6.length; _j < _len1; _j++) {
	          side = _ref6[_j];
	          offsetBorder[side.toLowerCase()] = parseFloat(offsetParentStyle["border" + side + "Width"]);
	        }
	        offsetPosition.right = document.body.scrollWidth - offsetPosition.left - offsetParentSize.width + offsetBorder.right;
	        offsetPosition.bottom = document.body.scrollHeight - offsetPosition.top - offsetParentSize.height + offsetBorder.bottom;
	        if (next.page.top >= (offsetPosition.top + offsetBorder.top) && next.page.bottom >= offsetPosition.bottom) {
	          if (next.page.left >= (offsetPosition.left + offsetBorder.left) && next.page.right >= offsetPosition.right) {
	            scrollTop = offsetParent.scrollTop;
	            scrollLeft = offsetParent.scrollLeft;
	            next.offset = {
	              top: next.page.top - offsetPosition.top + scrollTop - offsetBorder.top,
	              left: next.page.left - offsetPosition.left + scrollLeft - offsetBorder.left
	            };
	          }
	        }
	      }
	      this.move(next);
	      this.history.unshift(next);
	      if (this.history.length > 3) {
	        this.history.pop();
	      }
	      if (flushChanges) {
	        flush();
	      }
	      return true;
	    };

	    _Tether.prototype.move = function(position) {
	      var css, elVal, found, key, moved, offsetParent, point, same, transcribe, type, val, write, writeCSS, _i, _len, _ref1, _ref2,
	        _this = this;
	      if (this.element.parentNode == null) {
	        return;
	      }
	      same = {};
	      for (type in position) {
	        same[type] = {};
	        for (key in position[type]) {
	          found = false;
	          _ref1 = this.history;
	          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	            point = _ref1[_i];
	            if (!within((_ref2 = point[type]) != null ? _ref2[key] : void 0, position[type][key])) {
	              found = true;
	              break;
	            }
	          }
	          if (!found) {
	            same[type][key] = true;
	          }
	        }
	      }
	      css = {
	        top: '',
	        left: '',
	        right: '',
	        bottom: ''
	      };
	      transcribe = function(same, pos) {
	        var xPos, yPos, _ref3;
	        if (((_ref3 = _this.options.optimizations) != null ? _ref3.gpu : void 0) !== false) {
	          if (same.top) {
	            css.top = 0;
	            yPos = pos.top;
	          } else {
	            css.bottom = 0;
	            yPos = -pos.bottom;
	          }
	          if (same.left) {
	            css.left = 0;
	            xPos = pos.left;
	          } else {
	            css.right = 0;
	            xPos = -pos.right;
	          }
	          css[transformKey] = "translateX(" + (Math.round(xPos)) + "px) translateY(" + (Math.round(yPos)) + "px)";
	          if (transformKey !== 'msTransform') {
	            return css[transformKey] += " translateZ(0)";
	          }
	        } else {
	          if (same.top) {
	            css.top = "" + pos.top + "px";
	          } else {
	            css.bottom = "" + pos.bottom + "px";
	          }
	          if (same.left) {
	            return css.left = "" + pos.left + "px";
	          } else {
	            return css.right = "" + pos.right + "px";
	          }
	        }
	      };
	      moved = false;
	      if ((same.page.top || same.page.bottom) && (same.page.left || same.page.right)) {
	        css.position = 'absolute';
	        transcribe(same.page, position.page);
	      } else if ((same.viewport.top || same.viewport.bottom) && (same.viewport.left || same.viewport.right)) {
	        css.position = 'fixed';
	        transcribe(same.viewport, position.viewport);
	      } else if ((same.offset != null) && same.offset.top && same.offset.left) {
	        css.position = 'absolute';
	        offsetParent = this.cache('target-offsetparent', function() {
	          return getOffsetParent(_this.target);
	        });
	        if (getOffsetParent(this.element) !== offsetParent) {
	          defer(function() {
	            _this.element.parentNode.removeChild(_this.element);
	            return offsetParent.appendChild(_this.element);
	          });
	        }
	        transcribe(same.offset, position.offset);
	        moved = true;
	      } else {
	        css.position = 'absolute';
	        transcribe({
	          top: true,
	          left: true
	        }, position.page);
	      }
	      if (!moved && this.element.parentNode.tagName !== 'BODY') {
	        this.element.parentNode.removeChild(this.element);
	        document.body.appendChild(this.element);
	      }
	      writeCSS = {};
	      write = false;
	      for (key in css) {
	        val = css[key];
	        elVal = this.element.style[key];
	        if (elVal !== '' && val !== '' && (key === 'top' || key === 'left' || key === 'bottom' || key === 'right')) {
	          elVal = parseFloat(elVal);
	          val = parseFloat(val);
	        }
	        if (elVal !== val) {
	          write = true;
	          writeCSS[key] = css[key];
	        }
	      }
	      if (write) {
	        return defer(function() {
	          return extend(_this.element.style, writeCSS);
	        });
	      }
	    };

	    return _Tether;

	  })();

	  Tether.position = position;

	  this.Tether = extend(_Tether, Tether);

	}).call(this);

	(function() {
	  var BOUNDS_FORMAT, MIRROR_ATTACH, defer, extend, getBoundingRect, getBounds, getOuterSize, getSize, updateClasses, _ref,
	    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	  _ref = this.Tether.Utils, getOuterSize = _ref.getOuterSize, getBounds = _ref.getBounds, getSize = _ref.getSize, extend = _ref.extend, updateClasses = _ref.updateClasses, defer = _ref.defer;

	  MIRROR_ATTACH = {
	    left: 'right',
	    right: 'left',
	    top: 'bottom',
	    bottom: 'top',
	    middle: 'middle'
	  };

	  BOUNDS_FORMAT = ['left', 'top', 'right', 'bottom'];

	  getBoundingRect = function(tether, to) {
	    var i, pos, side, size, style, _i, _len;
	    if (to === 'scrollParent') {
	      to = tether.scrollParent;
	    } else if (to === 'window') {
	      to = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset];
	    }
	    if (to === document) {
	      to = to.documentElement;
	    }
	    if (to.nodeType != null) {
	      pos = size = getBounds(to);
	      style = getComputedStyle(to);
	      to = [pos.left, pos.top, size.width + pos.left, size.height + pos.top];
	      for (i = _i = 0, _len = BOUNDS_FORMAT.length; _i < _len; i = ++_i) {
	        side = BOUNDS_FORMAT[i];
	        side = side[0].toUpperCase() + side.substr(1);
	        if (side === 'Top' || side === 'Left') {
	          to[i] += parseFloat(style["border" + side + "Width"]);
	        } else {
	          to[i] -= parseFloat(style["border" + side + "Width"]);
	        }
	      }
	    }
	    return to;
	  };

	  this.Tether.modules.push({
	    position: function(_arg) {
	      var addClasses, allClasses, attachment, bounds, changeAttachX, changeAttachY, cls, constraint, eAttachment, height, left, oob, oobClass, p, pin, pinned, pinnedClass, removeClass, side, tAttachment, targetAttachment, targetHeight, targetSize, targetWidth, to, top, width, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _m, _n, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8,
	        _this = this;
	      top = _arg.top, left = _arg.left, targetAttachment = _arg.targetAttachment;
	      if (!this.options.constraints) {
	        return true;
	      }
	      removeClass = function(prefix) {
	        var side, _i, _len, _results;
	        _this.removeClass(prefix);
	        _results = [];
	        for (_i = 0, _len = BOUNDS_FORMAT.length; _i < _len; _i++) {
	          side = BOUNDS_FORMAT[_i];
	          _results.push(_this.removeClass("" + prefix + "-" + side));
	        }
	        return _results;
	      };
	      _ref1 = this.cache('element-bounds', function() {
	        return getBounds(_this.element);
	      }), height = _ref1.height, width = _ref1.width;
	      if (width === 0 && height === 0 && (this.lastSize != null)) {
	        _ref2 = this.lastSize, width = _ref2.width, height = _ref2.height;
	      }
	      targetSize = this.cache('target-bounds', function() {
	        return _this.getTargetBounds();
	      });
	      targetHeight = targetSize.height;
	      targetWidth = targetSize.width;
	      tAttachment = {};
	      eAttachment = {};
	      allClasses = [this.getClass('pinned'), this.getClass('out-of-bounds')];
	      _ref3 = this.options.constraints;
	      for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
	        constraint = _ref3[_i];
	        if (constraint.outOfBoundsClass) {
	          allClasses.push(constraint.outOfBoundsClass);
	        }
	        if (constraint.pinnedClass) {
	          allClasses.push(constraint.pinnedClass);
	        }
	      }
	      for (_j = 0, _len1 = allClasses.length; _j < _len1; _j++) {
	        cls = allClasses[_j];
	        _ref4 = ['left', 'top', 'right', 'bottom'];
	        for (_k = 0, _len2 = _ref4.length; _k < _len2; _k++) {
	          side = _ref4[_k];
	          allClasses.push("" + cls + "-" + side);
	        }
	      }
	      addClasses = [];
	      tAttachment = extend({}, targetAttachment);
	      eAttachment = extend({}, this.attachment);
	      _ref5 = this.options.constraints;
	      for (_l = 0, _len3 = _ref5.length; _l < _len3; _l++) {
	        constraint = _ref5[_l];
	        to = constraint.to, attachment = constraint.attachment, pin = constraint.pin;
	        if (attachment == null) {
	          attachment = '';
	        }
	        if (__indexOf.call(attachment, ' ') >= 0) {
	          _ref6 = attachment.split(' '), changeAttachY = _ref6[0], changeAttachX = _ref6[1];
	        } else {
	          changeAttachX = changeAttachY = attachment;
	        }
	        bounds = getBoundingRect(this, to);
	        if (changeAttachY === 'target' || changeAttachY === 'both') {
	          if (top < bounds[1] && tAttachment.top === 'top') {
	            top += targetHeight;
	            tAttachment.top = 'bottom';
	          }
	          if (top + height > bounds[3] && tAttachment.top === 'bottom') {
	            top -= targetHeight;
	            tAttachment.top = 'top';
	          }
	        }
	        if (changeAttachY === 'together') {
	          if (top < bounds[1] && tAttachment.top === 'top') {
	            if (eAttachment.top === 'bottom') {
	              top += targetHeight;
	              tAttachment.top = 'bottom';
	              top += height;
	              eAttachment.top = 'top';
	            } else if (eAttachment.top === 'top') {
	              top += targetHeight;
	              tAttachment.top = 'bottom';
	              top -= height;
	              eAttachment.top = 'bottom';
	            }
	          }
	          if (top + height > bounds[3] && tAttachment.top === 'bottom') {
	            if (eAttachment.top === 'top') {
	              top -= targetHeight;
	              tAttachment.top = 'top';
	              top -= height;
	              eAttachment.top = 'bottom';
	            } else if (eAttachment.top === 'bottom') {
	              top -= targetHeight;
	              tAttachment.top = 'top';
	              top += height;
	              eAttachment.top = 'top';
	            }
	          }
	          if (tAttachment.top === 'middle') {
	            if (top + height > bounds[3] && eAttachment.top === 'top') {
	              top -= height;
	              eAttachment.top = 'bottom';
	            } else if (top < bounds[1] && eAttachment.top === 'bottom') {
	              top += height;
	              eAttachment.top = 'top';
	            }
	          }
	        }
	        if (changeAttachX === 'target' || changeAttachX === 'both') {
	          if (left < bounds[0] && tAttachment.left === 'left') {
	            left += targetWidth;
	            tAttachment.left = 'right';
	          }
	          if (left + width > bounds[2] && tAttachment.left === 'right') {
	            left -= targetWidth;
	            tAttachment.left = 'left';
	          }
	        }
	        if (changeAttachX === 'together') {
	          if (left < bounds[0] && tAttachment.left === 'left') {
	            if (eAttachment.left === 'right') {
	              left += targetWidth;
	              tAttachment.left = 'right';
	              left += width;
	              eAttachment.left = 'left';
	            } else if (eAttachment.left === 'left') {
	              left += targetWidth;
	              tAttachment.left = 'right';
	              left -= width;
	              eAttachment.left = 'right';
	            }
	          } else if (left + width > bounds[2] && tAttachment.left === 'right') {
	            if (eAttachment.left === 'left') {
	              left -= targetWidth;
	              tAttachment.left = 'left';
	              left -= width;
	              eAttachment.left = 'right';
	            } else if (eAttachment.left === 'right') {
	              left -= targetWidth;
	              tAttachment.left = 'left';
	              left += width;
	              eAttachment.left = 'left';
	            }
	          } else if (tAttachment.left === 'center') {
	            if (left + width > bounds[2] && eAttachment.left === 'left') {
	              left -= width;
	              eAttachment.left = 'right';
	            } else if (left < bounds[0] && eAttachment.left === 'right') {
	              left += width;
	              eAttachment.left = 'left';
	            }
	          }
	        }
	        if (changeAttachY === 'element' || changeAttachY === 'both') {
	          if (top < bounds[1] && eAttachment.top === 'bottom') {
	            top += height;
	            eAttachment.top = 'top';
	          }
	          if (top + height > bounds[3] && eAttachment.top === 'top') {
	            top -= height;
	            eAttachment.top = 'bottom';
	          }
	        }
	        if (changeAttachX === 'element' || changeAttachX === 'both') {
	          if (left < bounds[0] && eAttachment.left === 'right') {
	            left += width;
	            eAttachment.left = 'left';
	          }
	          if (left + width > bounds[2] && eAttachment.left === 'left') {
	            left -= width;
	            eAttachment.left = 'right';
	          }
	        }
	        if (typeof pin === 'string') {
	          pin = (function() {
	            var _len4, _m, _ref7, _results;
	            _ref7 = pin.split(',');
	            _results = [];
	            for (_m = 0, _len4 = _ref7.length; _m < _len4; _m++) {
	              p = _ref7[_m];
	              _results.push(p.trim());
	            }
	            return _results;
	          })();
	        } else if (pin === true) {
	          pin = ['top', 'left', 'right', 'bottom'];
	        }
	        pin || (pin = []);
	        pinned = [];
	        oob = [];
	        if (top < bounds[1]) {
	          if (__indexOf.call(pin, 'top') >= 0) {
	            top = bounds[1];
	            pinned.push('top');
	          } else {
	            oob.push('top');
	          }
	        }
	        if (top + height > bounds[3]) {
	          if (__indexOf.call(pin, 'bottom') >= 0) {
	            top = bounds[3] - height;
	            pinned.push('bottom');
	          } else {
	            oob.push('bottom');
	          }
	        }
	        if (left < bounds[0]) {
	          if (__indexOf.call(pin, 'left') >= 0) {
	            left = bounds[0];
	            pinned.push('left');
	          } else {
	            oob.push('left');
	          }
	        }
	        if (left + width > bounds[2]) {
	          if (__indexOf.call(pin, 'right') >= 0) {
	            left = bounds[2] - width;
	            pinned.push('right');
	          } else {
	            oob.push('right');
	          }
	        }
	        if (pinned.length) {
	          pinnedClass = (_ref7 = this.options.pinnedClass) != null ? _ref7 : this.getClass('pinned');
	          addClasses.push(pinnedClass);
	          for (_m = 0, _len4 = pinned.length; _m < _len4; _m++) {
	            side = pinned[_m];
	            addClasses.push("" + pinnedClass + "-" + side);
	          }
	        }
	        if (oob.length) {
	          oobClass = (_ref8 = this.options.outOfBoundsClass) != null ? _ref8 : this.getClass('out-of-bounds');
	          addClasses.push(oobClass);
	          for (_n = 0, _len5 = oob.length; _n < _len5; _n++) {
	            side = oob[_n];
	            addClasses.push("" + oobClass + "-" + side);
	          }
	        }
	        if (__indexOf.call(pinned, 'left') >= 0 || __indexOf.call(pinned, 'right') >= 0) {
	          eAttachment.left = tAttachment.left = false;
	        }
	        if (__indexOf.call(pinned, 'top') >= 0 || __indexOf.call(pinned, 'bottom') >= 0) {
	          eAttachment.top = tAttachment.top = false;
	        }
	        if (tAttachment.top !== targetAttachment.top || tAttachment.left !== targetAttachment.left || eAttachment.top !== this.attachment.top || eAttachment.left !== this.attachment.left) {
	          this.updateAttachClasses(eAttachment, tAttachment);
	        }
	      }
	      defer(function() {
	        updateClasses(_this.target, addClasses, allClasses);
	        return updateClasses(_this.element, addClasses, allClasses);
	      });
	      return {
	        top: top,
	        left: left
	      };
	    }
	  });

	}).call(this);

	(function() {
	  var defer, getBounds, updateClasses, _ref;

	  _ref = this.Tether.Utils, getBounds = _ref.getBounds, updateClasses = _ref.updateClasses, defer = _ref.defer;

	  this.Tether.modules.push({
	    position: function(_arg) {
	      var abutted, addClasses, allClasses, bottom, height, left, right, side, sides, targetPos, top, width, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref1, _ref2, _ref3, _ref4, _ref5,
	        _this = this;
	      top = _arg.top, left = _arg.left;
	      _ref1 = this.cache('element-bounds', function() {
	        return getBounds(_this.element);
	      }), height = _ref1.height, width = _ref1.width;
	      targetPos = this.getTargetBounds();
	      bottom = top + height;
	      right = left + width;
	      abutted = [];
	      if (top <= targetPos.bottom && bottom >= targetPos.top) {
	        _ref2 = ['left', 'right'];
	        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
	          side = _ref2[_i];
	          if ((_ref3 = targetPos[side]) === left || _ref3 === right) {
	            abutted.push(side);
	          }
	        }
	      }
	      if (left <= targetPos.right && right >= targetPos.left) {
	        _ref4 = ['top', 'bottom'];
	        for (_j = 0, _len1 = _ref4.length; _j < _len1; _j++) {
	          side = _ref4[_j];
	          if ((_ref5 = targetPos[side]) === top || _ref5 === bottom) {
	            abutted.push(side);
	          }
	        }
	      }
	      allClasses = [];
	      addClasses = [];
	      sides = ['left', 'top', 'right', 'bottom'];
	      allClasses.push(this.getClass('abutted'));
	      for (_k = 0, _len2 = sides.length; _k < _len2; _k++) {
	        side = sides[_k];
	        allClasses.push("" + (this.getClass('abutted')) + "-" + side);
	      }
	      if (abutted.length) {
	        addClasses.push(this.getClass('abutted'));
	      }
	      for (_l = 0, _len3 = abutted.length; _l < _len3; _l++) {
	        side = abutted[_l];
	        addClasses.push("" + (this.getClass('abutted')) + "-" + side);
	      }
	      defer(function() {
	        updateClasses(_this.target, addClasses, allClasses);
	        return updateClasses(_this.element, addClasses, allClasses);
	      });
	      return true;
	    }
	  });

	}).call(this);

	(function() {
	  this.Tether.modules.push({
	    position: function(_arg) {
	      var left, result, shift, shiftLeft, shiftTop, top, _ref;
	      top = _arg.top, left = _arg.left;
	      if (!this.options.shift) {
	        return;
	      }
	      result = function(val) {
	        if (typeof val === 'function') {
	          return val.call(this, {
	            top: top,
	            left: left
	          });
	        } else {
	          return val;
	        }
	      };
	      shift = result(this.options.shift);
	      if (typeof shift === 'string') {
	        shift = shift.split(' ');
	        shift[1] || (shift[1] = shift[0]);
	        shiftTop = shift[0], shiftLeft = shift[1];
	        shiftTop = parseFloat(shiftTop, 10);
	        shiftLeft = parseFloat(shiftLeft, 10);
	      } else {
	        _ref = [shift.top, shift.left], shiftTop = _ref[0], shiftLeft = _ref[1];
	      }
	      top += shiftTop;
	      left += shiftLeft;
	      return {
	        top: top,
	        left: left
	      };
	    }
	  });

	}).call(this);

	return this.Tether;

	}));


/***/ }
/******/ ])
});
;