'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var PropTypes = _interopDefault(require('prop-types'));
var classnames = _interopDefault(require('classnames'));
var onClickOutside = _interopDefault(require('react-onclickoutside'));
var moment = _interopDefault(require('moment'));
var reactPopper = require('react-popper');

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};









var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

function generateYears(year, noOfYear, minDate, maxDate) {
  var list = [];
  for (var i = 0; i < 2 * noOfYear + 1; i++) {
    var newYear = year + noOfYear - i;
    var isInRange = true;

    if (minDate) {
      isInRange = minDate.year() <= newYear;
    }

    if (maxDate && isInRange) {
      isInRange = maxDate.year() >= newYear;
    }

    if (isInRange) {
      list.push(newYear);
    }
  }

  return list;
}

var YearDropdownOptions = function (_React$Component) {
  inherits(YearDropdownOptions, _React$Component);

  function YearDropdownOptions(props) {
    classCallCheck(this, YearDropdownOptions);

    var _this = possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.renderOptions = function () {
      var selectedYear = _this.props.year;
      var options = _this.state.yearsList.map(function (year) {
        return React.createElement(
          "div",
          {
            className: selectedYear === year ? "react-datepicker__year-option react-datepicker__year-option--selected_year" : "react-datepicker__year-option",
            key: year,
            ref: year,
            onClick: _this.onChange.bind(_this, year)
          },
          selectedYear === year ? React.createElement(
            "span",
            { className: "react-datepicker__year-option--selected" },
            "\u2713"
          ) : "",
          year
        );
      });

      var minYear = _this.props.minDate ? _this.props.minDate.year() : null;
      var maxYear = _this.props.maxDate ? _this.props.maxDate.year() : null;

      if (!maxYear || !_this.state.yearsList.find(function (year) {
        return year === maxYear;
      })) {
        options.unshift(React.createElement(
          "div",
          {
            className: "react-datepicker__year-option",
            ref: "upcoming",
            key: "upcoming",
            onClick: _this.incrementYears
          },
          React.createElement("a", { className: "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming" })
        ));
      }

      if (!minYear || !_this.state.yearsList.find(function (year) {
        return year === minYear;
      })) {
        options.push(React.createElement(
          "div",
          {
            className: "react-datepicker__year-option",
            ref: "previous",
            key: "previous",
            onClick: _this.decrementYears
          },
          React.createElement("a", { className: "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous" })
        ));
      }

      return options;
    };

    _this.onChange = function (year) {
      _this.props.onChange(year);
    };

    _this.handleClickOutside = function () {
      _this.props.onCancel();
    };

    _this.shiftYears = function (amount) {
      var years = _this.state.yearsList.map(function (year) {
        return year + amount;
      });

      _this.setState({
        yearsList: years
      });
    };

    _this.incrementYears = function () {
      return _this.shiftYears(1);
    };

    _this.decrementYears = function () {
      return _this.shiftYears(-1);
    };

    var yearDropdownItemNumber = props.yearDropdownItemNumber,
        scrollableYearDropdown = props.scrollableYearDropdown;

    var noOfYear = yearDropdownItemNumber || (scrollableYearDropdown ? 10 : 5);

    _this.state = {
      yearsList: generateYears(_this.props.year, noOfYear, _this.props.minDate, _this.props.maxDate)
    };
    return _this;
  }

  YearDropdownOptions.prototype.render = function render() {
    var dropdownClass = classnames({
      "react-datepicker__year-dropdown": true,
      "react-datepicker__year-dropdown--scrollable": this.props.scrollableYearDropdown
    });

    return React.createElement(
      "div",
      { className: dropdownClass },
      this.renderOptions()
    );
  };

  return YearDropdownOptions;
}(React.Component);

YearDropdownOptions.propTypes = {
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  scrollableYearDropdown: PropTypes.bool,
  year: PropTypes.number.isRequired,
  yearDropdownItemNumber: PropTypes.number
};

var dayOfWeekCodes = {
  1: "mon",
  2: "tue",
  3: "wed",
  4: "thu",
  5: "fri",
  6: "sat",
  7: "sun"
};

// These functions are not exported so
// that we avoid magic strings like 'days'
function set$1(date, unit, to) {
  return date.set(unit, to);
}

function add(date, amount, unit) {
  return date.add(amount, unit);
}

function subtract(date, amount, unit) {
  return date.subtract(amount, unit);
}

function get$1(date, unit) {
  return date.get(unit);
}

function getStartOf(date, unit) {
  return date.startOf(unit);
}

// ** Date Constructors **

function newDate(point) {
  return moment(point);
}

function newDateWithOffset(utcOffset) {
  return moment().utc().utcOffset(utcOffset);
}

function now(maybeFixedUtcOffset) {
  if (maybeFixedUtcOffset == null) {
    return newDate();
  }
  return newDateWithOffset(maybeFixedUtcOffset);
}

function cloneDate(date) {
  return date.clone();
}

function parseDate(value, _ref) {
  var dateFormat = _ref.dateFormat,
      locale = _ref.locale;

  var m = moment(value, dateFormat, locale || moment.locale(), true);
  return m.isValid() ? m : null;
}

// ** Date "Reflection" **

function isMoment(date) {
  return moment.isMoment(date);
}

function isDate(date) {
  return moment.isDate(date);
}

// ** Date Formatting **

function formatDate(date, format) {
  return date.format(format);
}

function safeDateFormat(date, _ref2) {
  var dateFormat = _ref2.dateFormat,
      locale = _ref2.locale;

  return date && date.clone().locale(locale || moment.locale()).format(Array.isArray(dateFormat) ? dateFormat[0] : dateFormat) || "";
}

// ** Date Setters **

function setTime(date, _ref3) {
  var hour = _ref3.hour,
      minute = _ref3.minute,
      second = _ref3.second;

  date.set({ hour: hour, minute: minute, second: second });
  return date;
}

function setMonth(date, month) {
  return set$1(date, "month", month);
}

function setYear(date, year) {
  return set$1(date, "year", year);
}



// ** Date Getters **

function getSecond(date) {
  return get$1(date, "second");
}

function getMinute(date) {
  return get$1(date, "minute");
}

function getHour(date) {
  return get$1(date, "hour");
}

// Returns day of week
function getDay(date) {
  return get$1(date, "day");
}

function getWeek(date) {
  return get$1(date, "week");
}

function getMonth(date) {
  return get$1(date, "month");
}

function getYear(date) {
  return get$1(date, "year");
}

// Returns day of month
function getDate(date) {
  return get$1(date, "date");
}



function getDayOfWeekCode(day) {
  return dayOfWeekCodes[day.isoWeekday()];
}

// *** Start of ***

function getStartOfDay(date) {
  return getStartOf(date, "day");
}

function getStartOfWeek(date) {
  return getStartOf(date, "week");
}
function getStartOfMonth(date) {
  return getStartOf(date, "month");
}

function getStartOfDate(date) {
  return getStartOf(date, "date");
}

// *** End of ***





// ** Date Math **

// *** Addition ***

function addMinutes(date, amount) {
  return add(date, amount, "minutes");
}

function addHours(date, amount) {
  return add(date, amount, "hours");
}

function addDays(date, amount) {
  return add(date, amount, "days");
}

function addWeeks(date, amount) {
  return add(date, amount, "weeks");
}

function addMonths(date, amount) {
  return add(date, amount, "months");
}

function addYears(date, amount) {
  return add(date, amount, "years");
}

// *** Subtraction ***
function subtractDays(date, amount) {
  return subtract(date, amount, "days");
}

function subtractWeeks(date, amount) {
  return subtract(date, amount, "weeks");
}

function subtractMonths(date, amount) {
  return subtract(date, amount, "months");
}

function subtractYears(date, amount) {
  return subtract(date, amount, "years");
}

// ** Date Comparison **

function isBefore(date1, date2) {
  return date1.isBefore(date2);
}

function isAfter(date1, date2) {
  return date1.isAfter(date2);
}

function equals(date1, date2) {
  return date1.isSame(date2);
}

function isSameYear(date1, date2) {
  if (date1 && date2) {
    return date1.isSame(date2, "year");
  } else {
    return !date1 && !date2;
  }
}

function isSameMonth(date1, date2) {
  if (date1 && date2) {
    return date1.isSame(date2, "month");
  } else {
    return !date1 && !date2;
  }
}

function isSameDay(moment1, moment2) {
  if (moment1 && moment2) {
    return moment1.isSame(moment2, "day");
  } else {
    return !moment1 && !moment2;
  }
}



function isDayInRange(day, startDate, endDate) {
  var before = startDate.clone().startOf("day").subtract(1, "seconds");
  var after = endDate.clone().startOf("day").add(1, "seconds");
  return day.clone().startOf("day").isBetween(before, after);
}

// *** Diffing ***



// ** Date Localization **

function localizeDate(date, locale) {
  return date.clone().locale(locale || moment.locale());
}







function getLocaleData(date) {
  return date.localeData();
}

function getLocaleDataForLocale(locale) {
  return moment.localeData(locale);
}

function getFormattedWeekdayInLocale(locale, date, formatFunc) {
  return formatFunc(locale.weekdays(date));
}

function getWeekdayMinInLocale(locale, date) {
  return locale.weekdaysMin(date);
}

function getWeekdayShortInLocale(locale, date) {
  return locale.weekdaysShort(date);
}

// TODO what is this format exactly?
function getMonthInLocale(locale, date, format) {
  return locale.months(date, format);
}

function getMonthShortInLocale(locale, date) {
  return locale.monthsShort(date);
}

// ** Utils for some components **

function isDayDisabled(day) {
  var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      minDate = _ref4.minDate,
      maxDate = _ref4.maxDate,
      excludeDates = _ref4.excludeDates,
      includeDates = _ref4.includeDates,
      filterDate = _ref4.filterDate;

  return minDate && day.isBefore(minDate, "day") || maxDate && day.isAfter(maxDate, "day") || excludeDates && excludeDates.some(function (excludeDate) {
    return isSameDay(day, excludeDate);
  }) || includeDates && !includeDates.some(function (includeDate) {
    return isSameDay(day, includeDate);
  }) || filterDate && !filterDate(day.clone()) || false;
}

function isTimeDisabled(time, disabledTimes) {
  var l = disabledTimes.length;
  for (var i = 0; i < l; i++) {
    if (disabledTimes[i].get("hours") === time.get("hours") && disabledTimes[i].get("minutes") === time.get("minutes")) {
      return true;
    }
  }

  return false;
}

function isTimeInDisabledRange(time, _ref5) {
  var minTime = _ref5.minTime,
      maxTime = _ref5.maxTime;

  if (!minTime || !maxTime) {
    throw new Error("Both minTime and maxTime props required");
  }

  var base = moment().hours(0).minutes(0).seconds(0);
  var baseTime = base.clone().hours(time.get("hours")).minutes(time.get("minutes"));
  var min = base.clone().hours(minTime.get("hours")).minutes(minTime.get("minutes"));
  var max = base.clone().hours(maxTime.get("hours")).minutes(maxTime.get("minutes"));

  return !(baseTime.isSameOrAfter(min) && baseTime.isSameOrBefore(max));
}

function allDaysDisabledBefore(day, unit) {
  var _ref6 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      minDate = _ref6.minDate,
      includeDates = _ref6.includeDates;

  var dateBefore = day.clone().subtract(1, unit);
  return minDate && dateBefore.isBefore(minDate, unit) || includeDates && includeDates.every(function (includeDate) {
    return dateBefore.isBefore(includeDate, unit);
  }) || false;
}

function allDaysDisabledAfter(day, unit) {
  var _ref7 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      maxDate = _ref7.maxDate,
      includeDates = _ref7.includeDates;

  var dateAfter = day.clone().add(1, unit);
  return maxDate && dateAfter.isAfter(maxDate, unit) || includeDates && includeDates.every(function (includeDate) {
    return dateAfter.isAfter(includeDate, unit);
  }) || false;
}

function getEffectiveMinDate(_ref8) {
  var minDate = _ref8.minDate,
      includeDates = _ref8.includeDates;

  if (includeDates && minDate) {
    return moment.min(includeDates.filter(function (includeDate) {
      return minDate.isSameOrBefore(includeDate, "day");
    }));
  } else if (includeDates) {
    return moment.min(includeDates);
  } else {
    return minDate;
  }
}

function getEffectiveMaxDate(_ref9) {
  var maxDate = _ref9.maxDate,
      includeDates = _ref9.includeDates;

  if (includeDates && maxDate) {
    return moment.max(includeDates.filter(function (includeDate) {
      return maxDate.isSameOrAfter(includeDate, "day");
    }));
  } else if (includeDates) {
    return moment.max(includeDates);
  } else {
    return maxDate;
  }
}

function getHightLightDaysMap() {
  var highlightDates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var defaultClassName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "react-datepicker__day--highlighted";

  var dateClasses = new Map();
  for (var i = 0, len = highlightDates.length; i < len; i++) {
    var obj = highlightDates[i];
    if (isMoment(obj)) {
      var key = obj.format("MM.DD.YYYY");
      var classNamesArr = dateClasses.get(key) || [];
      if (!classNamesArr.includes(defaultClassName)) {
        classNamesArr.push(defaultClassName);
        dateClasses.set(key, classNamesArr);
      }
    } else if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object") {
      var keys = Object.keys(obj);
      var className = keys[0];
      var arrOfMoments = obj[keys[0]];
      if (typeof className === "string" && arrOfMoments.constructor === Array) {
        for (var k = 0, _len = arrOfMoments.length; k < _len; k++) {
          var _key = arrOfMoments[k].format("MM.DD.YYYY");
          var _classNamesArr = dateClasses.get(_key) || [];
          if (!_classNamesArr.includes(className)) {
            _classNamesArr.push(className);
            dateClasses.set(_key, _classNamesArr);
          }
        }
      }
    }
  }

  return dateClasses;
}

function timesToInjectAfter(startOfDay, currentTime, currentMultiplier, intervals, injectedTimes) {
  var l = injectedTimes.length;
  var times = [];
  for (var i = 0; i < l; i++) {
    var injectedTime = addMinutes(addHours(cloneDate(startOfDay), getHour(injectedTimes[i])), getMinute(injectedTimes[i]));
    var nextTime = addMinutes(cloneDate(startOfDay), (currentMultiplier + 1) * intervals);

    if (injectedTime.isBetween(currentTime, nextTime)) {
      times.push(injectedTimes[i]);
    }
  }

  return times;
}

var WrappedYearDropdownOptions = onClickOutside(YearDropdownOptions);

var YearDropdown = function (_React$Component) {
  inherits(YearDropdown, _React$Component);

  function YearDropdown() {
    var _temp, _this, _ret;

    classCallCheck(this, YearDropdown);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      dropdownVisible: false
    }, _this.renderSelectOptions = function () {
      var minYear = _this.props.minDate ? getYear(_this.props.minDate) : 1900;
      var maxYear = _this.props.maxDate ? getYear(_this.props.maxDate) : 2100;

      var options = [];
      for (var i = minYear; i <= maxYear; i++) {
        options.push(React.createElement(
          "option",
          { key: i, value: i },
          i
        ));
      }
      return options;
    }, _this.onSelectChange = function (e) {
      _this.onChange(e.target.value);
    }, _this.renderSelectMode = function () {
      return React.createElement(
        "select",
        {
          value: _this.props.year,
          className: "react-datepicker__year-select",
          onChange: _this.onSelectChange
        },
        _this.renderSelectOptions()
      );
    }, _this.renderReadView = function (visible) {
      return React.createElement(
        "div",
        {
          key: "read",
          style: { visibility: visible ? "visible" : "hidden" },
          className: "react-datepicker__year-read-view",
          onClick: function onClick(event) {
            return _this.toggleDropdown(event);
          }
        },
        React.createElement("span", { className: "react-datepicker__year-read-view--down-arrow" }),
        React.createElement(
          "span",
          { className: "react-datepicker__year-read-view--selected-year" },
          _this.props.year
        )
      );
    }, _this.renderDropdown = function () {
      return React.createElement(WrappedYearDropdownOptions, {
        key: "dropdown",
        ref: "options",
        year: _this.props.year,
        onChange: _this.onChange,
        onCancel: _this.toggleDropdown,
        minDate: _this.props.minDate,
        maxDate: _this.props.maxDate,
        scrollableYearDropdown: _this.props.scrollableYearDropdown,
        yearDropdownItemNumber: _this.props.yearDropdownItemNumber
      });
    }, _this.renderScrollMode = function () {
      var dropdownVisible = _this.state.dropdownVisible;

      var result = [_this.renderReadView(!dropdownVisible)];
      if (dropdownVisible) {
        result.unshift(_this.renderDropdown());
      }
      return result;
    }, _this.onChange = function (year) {
      _this.toggleDropdown();
      if (year === _this.props.year) return;
      _this.props.onChange(year);
    }, _this.toggleDropdown = function (event) {
      _this.setState({
        dropdownVisible: !_this.state.dropdownVisible
      }, function () {
        if (_this.props.adjustDateOnChange) {
          _this.handleYearChange(_this.props.date, event);
        }
      });
    }, _this.handleYearChange = function (date, event) {
      _this.onSelect(date, event);
      _this.setOpen();
    }, _this.onSelect = function (date, event) {
      if (_this.props.onSelect) {
        _this.props.onSelect(date, event);
      }
    }, _this.setOpen = function () {
      if (_this.props.setOpen) {
        _this.props.setOpen(true);
      }
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  YearDropdown.prototype.render = function render() {
    var renderedDropdown = void 0;
    switch (this.props.dropdownMode) {
      case "scroll":
        renderedDropdown = this.renderScrollMode();
        break;
      case "select":
        renderedDropdown = this.renderSelectMode();
        break;
    }

    return React.createElement(
      "div",
      {
        className: "react-datepicker__year-dropdown-container react-datepicker__year-dropdown-container--" + this.props.dropdownMode
      },
      renderedDropdown
    );
  };

  return YearDropdown;
}(React.Component);

YearDropdown.propTypes = {
  adjustDateOnChange: PropTypes.bool,
  dropdownMode: PropTypes.oneOf(["scroll", "select"]).isRequired,
  maxDate: PropTypes.object,
  minDate: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  scrollableYearDropdown: PropTypes.bool,
  year: PropTypes.number.isRequired,
  yearDropdownItemNumber: PropTypes.number,
  date: PropTypes.object,
  onSelect: PropTypes.func,
  setOpen: PropTypes.func
};

var MonthDropdownOptions = function (_React$Component) {
  inherits(MonthDropdownOptions, _React$Component);

  function MonthDropdownOptions() {
    var _temp, _this, _ret;

    classCallCheck(this, MonthDropdownOptions);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.renderOptions = function () {
      return _this.props.monthNames.map(function (month, i) {
        return React.createElement(
          "div",
          {
            className: _this.props.month === i ? "react-datepicker__month-option --selected_month" : "react-datepicker__month-option",
            key: month,
            ref: month,
            onClick: _this.onChange.bind(_this, i)
          },
          _this.props.month === i ? React.createElement(
            "span",
            { className: "react-datepicker__month-option--selected" },
            "\u2713"
          ) : "",
          month
        );
      });
    }, _this.onChange = function (month) {
      return _this.props.onChange(month);
    }, _this.handleClickOutside = function () {
      return _this.props.onCancel();
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  MonthDropdownOptions.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "react-datepicker__month-dropdown" },
      this.renderOptions()
    );
  };

  return MonthDropdownOptions;
}(React.Component);

MonthDropdownOptions.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  month: PropTypes.number.isRequired,
  monthNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

var WrappedMonthDropdownOptions = onClickOutside(MonthDropdownOptions);

var MonthDropdown = function (_React$Component) {
  inherits(MonthDropdown, _React$Component);

  function MonthDropdown() {
    var _temp, _this, _ret;

    classCallCheck(this, MonthDropdown);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      dropdownVisible: false
    }, _this.renderSelectOptions = function (monthNames) {
      return monthNames.map(function (M, i) {
        return React.createElement(
          "option",
          { key: i, value: i },
          M
        );
      });
    }, _this.renderSelectMode = function (monthNames) {
      return React.createElement(
        "select",
        {
          value: _this.props.month,
          className: "react-datepicker__month-select",
          onChange: function onChange(e) {
            return _this.onChange(e.target.value);
          }
        },
        _this.renderSelectOptions(monthNames)
      );
    }, _this.renderReadView = function (visible, monthNames) {
      return React.createElement(
        "div",
        {
          key: "read",
          style: { visibility: visible ? "visible" : "hidden" },
          className: "react-datepicker__month-read-view",
          onClick: _this.toggleDropdown
        },
        React.createElement("span", { className: "react-datepicker__month-read-view--down-arrow" }),
        React.createElement(
          "span",
          { className: "react-datepicker__month-read-view--selected-month" },
          monthNames[_this.props.month]
        )
      );
    }, _this.renderDropdown = function (monthNames) {
      return React.createElement(WrappedMonthDropdownOptions, {
        key: "dropdown",
        ref: "options",
        month: _this.props.month,
        monthNames: monthNames,
        onChange: _this.onChange,
        onCancel: _this.toggleDropdown
      });
    }, _this.renderScrollMode = function (monthNames) {
      var dropdownVisible = _this.state.dropdownVisible;

      var result = [_this.renderReadView(!dropdownVisible, monthNames)];
      if (dropdownVisible) {
        result.unshift(_this.renderDropdown(monthNames));
      }
      return result;
    }, _this.onChange = function (month) {
      _this.toggleDropdown();
      if (month !== _this.props.month) {
        _this.props.onChange(month);
      }
    }, _this.toggleDropdown = function () {
      return _this.setState({
        dropdownVisible: !_this.state.dropdownVisible
      });
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  MonthDropdown.prototype.render = function render() {
    var _this2 = this;

    var localeData = getLocaleDataForLocale(this.props.locale);
    var monthNames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(this.props.useShortMonthInDropdown ? function (M) {
      return getMonthShortInLocale(localeData, newDate({ M: M }));
    } : function (M) {
      return getMonthInLocale(localeData, newDate({ M: M }), _this2.props.dateFormat);
    });

    var renderedDropdown = void 0;
    switch (this.props.dropdownMode) {
      case "scroll":
        renderedDropdown = this.renderScrollMode(monthNames);
        break;
      case "select":
        renderedDropdown = this.renderSelectMode(monthNames);
        break;
    }

    return React.createElement(
      "div",
      {
        className: "react-datepicker__month-dropdown-container react-datepicker__month-dropdown-container--" + this.props.dropdownMode
      },
      renderedDropdown
    );
  };

  return MonthDropdown;
}(React.Component);

MonthDropdown.propTypes = {
  dropdownMode: PropTypes.oneOf(["scroll", "select"]).isRequired,
  locale: PropTypes.string,
  dateFormat: PropTypes.string.isRequired,
  month: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  useShortMonthInDropdown: PropTypes.bool
};

function generateMonthYears(minDate, maxDate) {
  var list = [];

  var currDate = getStartOfMonth(cloneDate(minDate));
  var lastDate = getStartOfMonth(cloneDate(maxDate));

  while (!isAfter(currDate, lastDate)) {
    list.push(cloneDate(currDate));

    addMonths(currDate, 1);
  }

  return list;
}

var MonthYearDropdownOptions = function (_React$Component) {
  inherits(MonthYearDropdownOptions, _React$Component);

  function MonthYearDropdownOptions(props) {
    classCallCheck(this, MonthYearDropdownOptions);

    var _this = possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.renderOptions = function () {
      return _this.state.monthYearsList.map(function (monthYear) {
        var monthYearPoint = monthYear.valueOf();

        var isSameMonthYear = isSameYear(_this.props.date, monthYear) && isSameMonth(_this.props.date, monthYear);

        return React.createElement(
          "div",
          {
            className: isSameMonthYear ? "react-datepicker__month-year-option --selected_month-year" : "react-datepicker__month-year-option",
            key: monthYearPoint,
            ref: monthYearPoint,
            onClick: _this.onChange.bind(_this, monthYearPoint)
          },
          isSameMonthYear ? React.createElement(
            "span",
            { className: "react-datepicker__month-year-option--selected" },
            "\u2713"
          ) : "",
          formatDate(monthYear, _this.props.dateFormat)
        );
      });
    };

    _this.onChange = function (monthYear) {
      return _this.props.onChange(monthYear);
    };

    _this.handleClickOutside = function () {
      _this.props.onCancel();
    };

    _this.state = {
      monthYearsList: generateMonthYears(_this.props.minDate, _this.props.maxDate)
    };
    return _this;
  }

  MonthYearDropdownOptions.prototype.render = function render() {
    var dropdownClass = classnames({
      "react-datepicker__month-year-dropdown": true,
      "react-datepicker__month-year-dropdown--scrollable": this.props.scrollableMonthYearDropdown
    });

    return React.createElement(
      "div",
      { className: dropdownClass },
      this.renderOptions()
    );
  };

  return MonthYearDropdownOptions;
}(React.Component);

MonthYearDropdownOptions.propTypes = {
  minDate: PropTypes.object.isRequired,
  maxDate: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  scrollableMonthYearDropdown: PropTypes.bool,
  date: PropTypes.object.isRequired,
  dateFormat: PropTypes.string.isRequired
};

var WrappedMonthYearDropdownOptions = onClickOutside(MonthYearDropdownOptions);

var MonthYearDropdown = function (_React$Component) {
  inherits(MonthYearDropdown, _React$Component);

  function MonthYearDropdown() {
    var _temp, _this, _ret;

    classCallCheck(this, MonthYearDropdown);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      dropdownVisible: false
    }, _this.renderSelectOptions = function () {
      var currDate = getStartOfMonth(localizeDate(_this.props.minDate, _this.props.locale));
      var lastDate = getStartOfMonth(localizeDate(_this.props.maxDate, _this.props.locale));

      var options = [];

      while (!isAfter(currDate, lastDate)) {
        var timepoint = currDate.valueOf();
        options.push(React.createElement(
          "option",
          { key: timepoint, value: timepoint },
          formatDate(currDate, _this.props.dateFormat)
        ));

        addMonths(currDate, 1);
      }

      return options;
    }, _this.onSelectChange = function (e) {
      _this.onChange(e.target.value);
    }, _this.renderSelectMode = function () {
      return React.createElement(
        "select",
        {
          value: getStartOfMonth(_this.props.date).valueOf(),
          className: "react-datepicker__month-year-select",
          onChange: _this.onSelectChange
        },
        _this.renderSelectOptions()
      );
    }, _this.renderReadView = function (visible) {
      var yearMonth = formatDate(localizeDate(newDate(_this.props.date), _this.props.locale), _this.props.dateFormat);

      return React.createElement(
        "div",
        {
          key: "read",
          style: { visibility: visible ? "visible" : "hidden" },
          className: "react-datepicker__month-year-read-view",
          onClick: function onClick(event) {
            return _this.toggleDropdown(event);
          }
        },
        React.createElement("span", { className: "react-datepicker__month-year-read-view--down-arrow" }),
        React.createElement(
          "span",
          { className: "react-datepicker__month-year-read-view--selected-month-year" },
          yearMonth
        )
      );
    }, _this.renderDropdown = function () {
      return React.createElement(WrappedMonthYearDropdownOptions, {
        key: "dropdown",
        ref: "options",
        date: _this.props.date,
        dateFormat: _this.props.dateFormat,
        onChange: _this.onChange,
        onCancel: _this.toggleDropdown,
        minDate: localizeDate(_this.props.minDate, _this.props.locale),
        maxDate: localizeDate(_this.props.maxDate, _this.props.locale),
        scrollableMonthYearDropdown: _this.props.scrollableMonthYearDropdown
      });
    }, _this.renderScrollMode = function () {
      var dropdownVisible = _this.state.dropdownVisible;

      var result = [_this.renderReadView(!dropdownVisible)];
      if (dropdownVisible) {
        result.unshift(_this.renderDropdown());
      }
      return result;
    }, _this.onChange = function (monthYearPoint) {
      _this.toggleDropdown();

      var changedDate = newDate(parseInt(monthYearPoint));

      if (isSameYear(_this.props.date, changedDate) && isSameMonth(_this.props.date, changedDate)) {
        return;
      }

      _this.props.onChange(changedDate);
    }, _this.toggleDropdown = function () {
      return _this.setState({
        dropdownVisible: !_this.state.dropdownVisible
      });
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  MonthYearDropdown.prototype.render = function render() {
    var renderedDropdown = void 0;
    switch (this.props.dropdownMode) {
      case "scroll":
        renderedDropdown = this.renderScrollMode();
        break;
      case "select":
        renderedDropdown = this.renderSelectMode();
        break;
    }

    return React.createElement(
      "div",
      {
        className: "react-datepicker__month-year-dropdown-container react-datepicker__month-year-dropdown-container--" + this.props.dropdownMode
      },
      renderedDropdown
    );
  };

  return MonthYearDropdown;
}(React.Component);

MonthYearDropdown.propTypes = {
  dropdownMode: PropTypes.oneOf(["scroll", "select"]).isRequired,
  dateFormat: PropTypes.string.isRequired,
  locale: PropTypes.string,
  maxDate: PropTypes.object.isRequired,
  minDate: PropTypes.object.isRequired,
  date: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  scrollableMonthYearDropdown: PropTypes.bool
};

var Day = function (_React$Component) {
  inherits(Day, _React$Component);

  function Day() {
    var _temp, _this, _ret;

    classCallCheck(this, Day);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleClick = function (event) {
      if (!_this.isDisabled() && _this.props.onClick) {
        _this.props.onClick(event);
      }
    }, _this.handleMouseEnter = function (event) {
      if (!_this.isDisabled() && _this.props.onMouseEnter) {
        _this.props.onMouseEnter(event);
      }
    }, _this.isSameDay = function (other) {
      return isSameDay(_this.props.day, other);
    }, _this.isKeyboardSelected = function () {
      return !_this.props.inline && !_this.isSameDay(_this.props.selected) && _this.isSameDay(_this.props.preSelection);
    }, _this.isDisabled = function () {
      return isDayDisabled(_this.props.day, _this.props);
    }, _this.getHighLightedClass = function (defaultClassName) {
      var _this$props = _this.props,
          day = _this$props.day,
          highlightDates = _this$props.highlightDates;


      if (!highlightDates) {
        return false;
      }

      // Looking for className in the Map of {'day string, 'className'}
      var dayStr = day.format("MM.DD.YYYY");
      return highlightDates.get(dayStr);
    }, _this.isInRange = function () {
      var _this$props2 = _this.props,
          day = _this$props2.day,
          startDate = _this$props2.startDate,
          endDate = _this$props2.endDate;

      if (!startDate || !endDate) {
        return false;
      }
      return isDayInRange(day, startDate, endDate);
    }, _this.isInSelectingRange = function () {
      var _this$props3 = _this.props,
          day = _this$props3.day,
          selectsStart = _this$props3.selectsStart,
          selectsEnd = _this$props3.selectsEnd,
          selectingDate = _this$props3.selectingDate,
          startDate = _this$props3.startDate,
          endDate = _this$props3.endDate;


      if (!(selectsStart || selectsEnd) || !selectingDate || _this.isDisabled()) {
        return false;
      }

      if (selectsStart && endDate && selectingDate.isSameOrBefore(endDate)) {
        return isDayInRange(day, selectingDate, endDate);
      }

      if (selectsEnd && startDate && selectingDate.isSameOrAfter(startDate)) {
        return isDayInRange(day, startDate, selectingDate);
      }

      return false;
    }, _this.isSelectingRangeStart = function () {
      if (!_this.isInSelectingRange()) {
        return false;
      }

      var _this$props4 = _this.props,
          day = _this$props4.day,
          selectingDate = _this$props4.selectingDate,
          startDate = _this$props4.startDate,
          selectsStart = _this$props4.selectsStart;


      if (selectsStart) {
        return isSameDay(day, selectingDate);
      } else {
        return isSameDay(day, startDate);
      }
    }, _this.isSelectingRangeEnd = function () {
      if (!_this.isInSelectingRange()) {
        return false;
      }

      var _this$props5 = _this.props,
          day = _this$props5.day,
          selectingDate = _this$props5.selectingDate,
          endDate = _this$props5.endDate,
          selectsEnd = _this$props5.selectsEnd;


      if (selectsEnd) {
        return isSameDay(day, selectingDate);
      } else {
        return isSameDay(day, endDate);
      }
    }, _this.isRangeStart = function () {
      var _this$props6 = _this.props,
          day = _this$props6.day,
          startDate = _this$props6.startDate,
          endDate = _this$props6.endDate;

      if (!startDate || !endDate) {
        return false;
      }
      return isSameDay(startDate, day);
    }, _this.isRangeEnd = function () {
      var _this$props7 = _this.props,
          day = _this$props7.day,
          startDate = _this$props7.startDate,
          endDate = _this$props7.endDate;

      if (!startDate || !endDate) {
        return false;
      }
      return isSameDay(endDate, day);
    }, _this.isWeekend = function () {
      var weekday = getDay(_this.props.day);
      return weekday === 0 || weekday === 6;
    }, _this.isOutsideMonth = function () {
      return _this.props.month !== undefined && _this.props.month !== getMonth(_this.props.day);
    }, _this.getClassNames = function (date) {
      var dayClassName = _this.props.dayClassName ? _this.props.dayClassName(date) : undefined;
      return classnames("react-datepicker__day", dayClassName, "react-datepicker__day--" + getDayOfWeekCode(_this.props.day), {
        "react-datepicker__day--disabled": _this.isDisabled(),
        "react-datepicker__day--selected": _this.isSameDay(_this.props.selected),
        "react-datepicker__day--keyboard-selected": _this.isKeyboardSelected(),
        "react-datepicker__day--range-start": _this.isRangeStart(),
        "react-datepicker__day--range-end": _this.isRangeEnd(),
        "react-datepicker__day--in-range": _this.isInRange(),
        "react-datepicker__day--in-selecting-range": _this.isInSelectingRange(),
        "react-datepicker__day--selecting-range-start": _this.isSelectingRangeStart(),
        "react-datepicker__day--selecting-range-end": _this.isSelectingRangeEnd(),
        "react-datepicker__day--today": _this.isSameDay(now(_this.props.utcOffset)),
        "react-datepicker__day--weekend": _this.isWeekend(),
        "react-datepicker__day--outside-month": _this.isOutsideMonth()
      }, _this.getHighLightedClass("react-datepicker__day--highlighted"));
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  Day.prototype.render = function render() {
    return React.createElement(
      "div",
      {
        className: this.getClassNames(this.props.day),
        onClick: this.handleClick,
        onMouseEnter: this.handleMouseEnter,
        "aria-label": "day-" + getDate(this.props.day),
        role: "option"
      },
      getDate(this.props.day)
    );
  };

  return Day;
}(React.Component);

Day.propTypes = {
  day: PropTypes.object.isRequired,
  dayClassName: PropTypes.func,
  endDate: PropTypes.object,
  highlightDates: PropTypes.instanceOf(Map),
  inline: PropTypes.bool,
  month: PropTypes.number,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  preSelection: PropTypes.object,
  selected: PropTypes.object,
  selectingDate: PropTypes.object,
  selectsEnd: PropTypes.bool,
  selectsStart: PropTypes.bool,
  startDate: PropTypes.object,
  utcOffset: PropTypes.number
};

var WeekNumber = function (_React$Component) {
  inherits(WeekNumber, _React$Component);

  function WeekNumber() {
    var _temp, _this, _ret;

    classCallCheck(this, WeekNumber);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleClick = function (event) {
      if (_this.props.onClick) {
        _this.props.onClick(event);
      }
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  WeekNumber.prototype.render = function render() {
    var weekNumberClasses = {
      "react-datepicker__week-number": true,
      "react-datepicker__week-number--clickable": !!this.props.onClick
    };
    return React.createElement(
      "div",
      {
        className: classnames(weekNumberClasses),
        "aria-label": "week-" + this.props.weekNumber,
        onClick: this.handleClick
      },
      this.props.weekNumber
    );
  };

  return WeekNumber;
}(React.Component);

WeekNumber.propTypes = {
  weekNumber: PropTypes.number.isRequired,
  onClick: PropTypes.func
};

var Week = function (_React$Component) {
  inherits(Week, _React$Component);

  function Week() {
    var _temp, _this, _ret;

    classCallCheck(this, Week);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleDayClick = function (day, event) {
      if (_this.props.onDayClick) {
        _this.props.onDayClick(day, event);
      }
    }, _this.handleDayMouseEnter = function (day) {
      if (_this.props.onDayMouseEnter) {
        _this.props.onDayMouseEnter(day);
      }
    }, _this.handleWeekClick = function (day, weekNumber, event) {
      if (typeof _this.props.onWeekSelect === "function") {
        _this.props.onWeekSelect(day, weekNumber, event);
      }
    }, _this.formatWeekNumber = function (startOfWeek) {
      if (_this.props.formatWeekNumber) {
        return _this.props.formatWeekNumber(startOfWeek);
      }
      return getWeek(startOfWeek);
    }, _this.renderDays = function () {
      var startOfWeek = getStartOfWeek(cloneDate(_this.props.day));
      var days = [];
      var weekNumber = _this.formatWeekNumber(startOfWeek);
      if (_this.props.showWeekNumber) {
        var onClickAction = _this.props.onWeekSelect ? _this.handleWeekClick.bind(_this, startOfWeek, weekNumber) : undefined;
        days.push(React.createElement(WeekNumber, { key: "W", weekNumber: weekNumber, onClick: onClickAction }));
      }
      return days.concat([0, 1, 2, 3, 4, 5, 6].map(function (offset) {
        var day = addDays(cloneDate(startOfWeek), offset);
        return React.createElement(Day, {
          key: offset,
          day: day,
          month: _this.props.month,
          onClick: _this.handleDayClick.bind(_this, day),
          onMouseEnter: _this.handleDayMouseEnter.bind(_this, day),
          minDate: _this.props.minDate,
          maxDate: _this.props.maxDate,
          excludeDates: _this.props.excludeDates,
          includeDates: _this.props.includeDates,
          inline: _this.props.inline,
          highlightDates: _this.props.highlightDates,
          selectingDate: _this.props.selectingDate,
          filterDate: _this.props.filterDate,
          preSelection: _this.props.preSelection,
          selected: _this.props.selected,
          selectsStart: _this.props.selectsStart,
          selectsEnd: _this.props.selectsEnd,
          startDate: _this.props.startDate,
          endDate: _this.props.endDate,
          dayClassName: _this.props.dayClassName,
          utcOffset: _this.props.utcOffset
        });
      }));
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  Week.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "react-datepicker__week" },
      this.renderDays()
    );
  };

  return Week;
}(React.Component);

Week.propTypes = {
  day: PropTypes.object.isRequired,
  dayClassName: PropTypes.func,
  endDate: PropTypes.object,
  excludeDates: PropTypes.array,
  filterDate: PropTypes.func,
  formatWeekNumber: PropTypes.func,
  highlightDates: PropTypes.instanceOf(Map),
  includeDates: PropTypes.array,
  inline: PropTypes.bool,
  maxDate: PropTypes.object,
  minDate: PropTypes.object,
  month: PropTypes.number,
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onWeekSelect: PropTypes.func,
  preSelection: PropTypes.object,
  selected: PropTypes.object,
  selectingDate: PropTypes.object,
  selectsEnd: PropTypes.bool,
  selectsStart: PropTypes.bool,
  showWeekNumber: PropTypes.bool,
  startDate: PropTypes.object,
  utcOffset: PropTypes.number
};

var FIXED_HEIGHT_STANDARD_WEEK_COUNT = 6;

var Month = function (_React$Component) {
  inherits(Month, _React$Component);

  function Month() {
    var _temp, _this, _ret;

    classCallCheck(this, Month);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleDayClick = function (day, event) {
      if (_this.props.onDayClick) {
        _this.props.onDayClick(day, event);
      }
    }, _this.handleDayMouseEnter = function (day) {
      if (_this.props.onDayMouseEnter) {
        _this.props.onDayMouseEnter(day);
      }
    }, _this.handleMouseLeave = function () {
      if (_this.props.onMouseLeave) {
        _this.props.onMouseLeave();
      }
    }, _this.isWeekInMonth = function (startOfWeek) {
      var day = _this.props.day;
      var endOfWeek = addDays(cloneDate(startOfWeek), 6);
      return isSameMonth(startOfWeek, day) || isSameMonth(endOfWeek, day);
    }, _this.renderWeeks = function () {
      var weeks = [];
      var isFixedHeight = _this.props.fixedHeight;
      var currentWeekStart = getStartOfWeek(getStartOfMonth(cloneDate(_this.props.day)));
      var i = 0;
      var breakAfterNextPush = false;

      while (true) {
        weeks.push(React.createElement(Week, {
          key: i,
          day: currentWeekStart,
          month: getMonth(_this.props.day),
          onDayClick: _this.handleDayClick,
          onDayMouseEnter: _this.handleDayMouseEnter,
          onWeekSelect: _this.props.onWeekSelect,
          formatWeekNumber: _this.props.formatWeekNumber,
          minDate: _this.props.minDate,
          maxDate: _this.props.maxDate,
          excludeDates: _this.props.excludeDates,
          includeDates: _this.props.includeDates,
          inline: _this.props.inline,
          highlightDates: _this.props.highlightDates,
          selectingDate: _this.props.selectingDate,
          filterDate: _this.props.filterDate,
          preSelection: _this.props.preSelection,
          selected: _this.props.selected,
          selectsStart: _this.props.selectsStart,
          selectsEnd: _this.props.selectsEnd,
          showWeekNumber: _this.props.showWeekNumbers,
          startDate: _this.props.startDate,
          endDate: _this.props.endDate,
          dayClassName: _this.props.dayClassName,
          utcOffset: _this.props.utcOffset
        }));

        if (breakAfterNextPush) break;

        i++;
        currentWeekStart = addWeeks(cloneDate(currentWeekStart), 1);

        // If one of these conditions is true, we will either break on this week
        // or break on the next week
        var isFixedAndFinalWeek = isFixedHeight && i >= FIXED_HEIGHT_STANDARD_WEEK_COUNT;
        var isNonFixedAndOutOfMonth = !isFixedHeight && !_this.isWeekInMonth(currentWeekStart);

        if (isFixedAndFinalWeek || isNonFixedAndOutOfMonth) {
          if (_this.props.peekNextMonth) {
            breakAfterNextPush = true;
          } else {
            break;
          }
        }
      }

      return weeks;
    }, _this.getClassNames = function () {
      var _this$props = _this.props,
          selectingDate = _this$props.selectingDate,
          selectsStart = _this$props.selectsStart,
          selectsEnd = _this$props.selectsEnd;

      return classnames("react-datepicker__month", {
        "react-datepicker__month--selecting-range": selectingDate && (selectsStart || selectsEnd)
      });
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  Month.prototype.render = function render() {
    return React.createElement(
      "div",
      {
        className: this.getClassNames(),
        onMouseLeave: this.handleMouseLeave,
        role: "listbox"
      },
      this.renderWeeks()
    );
  };

  return Month;
}(React.Component);

Month.propTypes = {
  day: PropTypes.object.isRequired,
  dayClassName: PropTypes.func,
  endDate: PropTypes.object,
  excludeDates: PropTypes.array,
  filterDate: PropTypes.func,
  fixedHeight: PropTypes.bool,
  formatWeekNumber: PropTypes.func,
  highlightDates: PropTypes.instanceOf(Map),
  includeDates: PropTypes.array,
  inline: PropTypes.bool,
  maxDate: PropTypes.object,
  minDate: PropTypes.object,
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onWeekSelect: PropTypes.func,
  peekNextMonth: PropTypes.bool,
  preSelection: PropTypes.object,
  selected: PropTypes.object,
  selectingDate: PropTypes.object,
  selectsEnd: PropTypes.bool,
  selectsStart: PropTypes.bool,
  showWeekNumbers: PropTypes.bool,
  startDate: PropTypes.object,
  utcOffset: PropTypes.number
};

var Time = function (_React$Component) {
  inherits(Time, _React$Component);

  function Time() {
    var _temp, _this, _ret;

    classCallCheck(this, Time);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleClick = function (time) {
      if ((_this.props.minTime || _this.props.maxTime) && isTimeInDisabledRange(time, _this.props) || _this.props.excludeTimes && isTimeDisabled(time, _this.props.excludeTimes) || _this.props.includeTimes && !isTimeDisabled(time, _this.props.includeTimes)) {
        return;
      }

      _this.props.onChange(time);
    }, _this.liClasses = function (time, currH, currM) {
      var classes = ["react-datepicker__time-list-item"];

      if (currH === getHour(time) && currM === getMinute(time)) {
        classes.push("react-datepicker__time-list-item--selected");
      }
      if ((_this.props.minTime || _this.props.maxTime) && isTimeInDisabledRange(time, _this.props) || _this.props.excludeTimes && isTimeDisabled(time, _this.props.excludeTimes) || _this.props.includeTimes && !isTimeDisabled(time, _this.props.includeTimes)) {
        classes.push("react-datepicker__time-list-item--disabled");
      }
      if (_this.props.injectTimes && (getHour(time) * 60 + getMinute(time)) % _this.props.intervals !== 0) {
        classes.push("react-datepicker__time-list-item--injected");
      }

      return classes.join(" ");
    }, _this.renderTimes = function () {
      var times = [];
      var format = _this.props.format ? _this.props.format : "hh:mm A";
      var intervals = _this.props.intervals;
      var activeTime = _this.props.selected ? _this.props.selected : newDate();
      var currH = getHour(activeTime);
      var currM = getMinute(activeTime);
      var base = getStartOfDay(newDate());
      var multiplier = 1440 / intervals;
      var sortedInjectTimes = _this.props.injectTimes && _this.props.injectTimes.sort(function (a, b) {
        return a - b;
      });
      for (var i = 0; i < multiplier; i++) {
        var currentTime = addMinutes(cloneDate(base), i * intervals);
        times.push(currentTime);

        if (sortedInjectTimes) {
          var timesToInject = timesToInjectAfter(base, currentTime, i, intervals, sortedInjectTimes);
          times = times.concat(timesToInject);
        }
      }

      return times.map(function (time, i) {
        return React.createElement(
          "li",
          {
            key: i,
            onClick: _this.handleClick.bind(_this, time),
            className: _this.liClasses(time, currH, currM)
          },
          formatDate(time, format)
        );
      });
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  Time.prototype.componentDidMount = function componentDidMount() {
    // code to ensure selected time will always be in focus within time window when it first appears
    var multiplier = 60 / this.props.intervals;
    var currH = this.props.selected ? getHour(this.props.selected) : getHour(newDate());
    this.list.scrollTop = 30 * (multiplier * currH);
  };

  Time.prototype.render = function render() {
    var _this2 = this;

    var height = null;
    if (this.props.monthRef) {
      height = this.props.monthRef.clientHeight - 39;
    }

    return React.createElement(
      "div",
      {
        className: "react-datepicker__time-container " + (this.props.todayButton ? "react-datepicker__time-container--with-today-button" : "")
      },
      React.createElement(
        "div",
        { className: "react-datepicker__header react-datepicker__header--time" },
        React.createElement(
          "div",
          { className: "react-datepicker-time__header" },
          this.props.timeCaption
        )
      ),
      React.createElement(
        "div",
        { className: "react-datepicker__time" },
        React.createElement(
          "div",
          { className: "react-datepicker__time-box" },
          React.createElement(
            "ul",
            {
              className: "react-datepicker__time-list",
              ref: function ref(list) {
                _this2.list = list;
              },
              style: height ? { height: height } : {}
            },
            this.renderTimes.bind(this)()
          )
        )
      )
    );
  };

  createClass(Time, null, [{
    key: "defaultProps",
    get: function get$$1() {
      return {
        intervals: 30,
        onTimeChange: function onTimeChange() {},
        todayButton: null,
        timeCaption: "Time"
      };
    }
  }]);
  return Time;
}(React.Component);

Time.propTypes = {
  format: PropTypes.string,
  includeTimes: PropTypes.array,
  intervals: PropTypes.number,
  selected: PropTypes.object,
  onChange: PropTypes.func,
  todayButton: PropTypes.string,
  minTime: PropTypes.object,
  maxTime: PropTypes.object,
  excludeTimes: PropTypes.array,
  monthRef: PropTypes.object,
  timeCaption: PropTypes.string,
  injectTimes: PropTypes.array
};

function CalendarContainer(_ref) {
  var className = _ref.className,
      children = _ref.children;

  return React.createElement(
    "div",
    { className: className },
    React.createElement("div", { className: "react-datepicker__triangle" }),
    children
  );
}

CalendarContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

var DROPDOWN_FOCUS_CLASSNAMES = ["react-datepicker__year-select", "react-datepicker__month-select", "react-datepicker__month-year-select"];

var isDropdownSelect = function isDropdownSelect() {
  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var classNames = (element.className || "").split(/\s+/);
  return DROPDOWN_FOCUS_CLASSNAMES.some(function (testClassname) {
    return classNames.indexOf(testClassname) >= 0;
  });
};

var Calendar = function (_React$Component) {
  inherits(Calendar, _React$Component);
  createClass(Calendar, null, [{
    key: "defaultProps",
    get: function get$$1() {
      return {
        onDropdownFocus: function onDropdownFocus() {},
        monthsShown: 1,
        forceShowMonthNavigation: false,
        timeCaption: "Time",
        previousMonthButtonLabel: "Previous Month",
        nextMonthButtonLabel: "Next Month"
      };
    }
  }]);

  function Calendar(props) {
    classCallCheck(this, Calendar);

    var _this = possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.handleClickOutside = function (event) {
      _this.props.onClickOutside(event);
    };

    _this.handleDropdownFocus = function (event) {
      if (isDropdownSelect(event.target)) {
        _this.props.onDropdownFocus();
      }
    };

    _this.getDateInView = function () {
      var _this$props = _this.props,
          preSelection = _this$props.preSelection,
          selected = _this$props.selected,
          openToDate = _this$props.openToDate,
          utcOffset = _this$props.utcOffset;

      var minDate = getEffectiveMinDate(_this.props);
      var maxDate = getEffectiveMaxDate(_this.props);
      var current = now(utcOffset);
      var initialDate = openToDate || selected || preSelection;
      if (initialDate) {
        return initialDate;
      } else {
        if (minDate && isBefore(current, minDate)) {
          return minDate;
        } else if (maxDate && isAfter(current, maxDate)) {
          return maxDate;
        }
      }
      return current;
    };

    _this.localizeDate = function (date) {
      return localizeDate(date, _this.props.locale);
    };

    _this.increaseMonth = function () {
      _this.setState({
        date: addMonths(cloneDate(_this.state.date), 1)
      }, function () {
        return _this.handleMonthChange(_this.state.date);
      });
    };

    _this.decreaseMonth = function () {
      _this.setState({
        date: subtractMonths(cloneDate(_this.state.date), 1)
      }, function () {
        return _this.handleMonthChange(_this.state.date);
      });
    };

    _this.handleDayClick = function (day, event) {
      return _this.props.onSelect(day, event);
    };

    _this.handleDayMouseEnter = function (day) {
      return _this.setState({ selectingDate: day });
    };

    _this.handleMonthMouseLeave = function () {
      return _this.setState({ selectingDate: null });
    };

    _this.handleYearChange = function (date) {
      if (_this.props.onYearChange) {
        _this.props.onYearChange(date);
      }
    };

    _this.handleMonthChange = function (date) {
      if (_this.props.onMonthChange) {
        _this.props.onMonthChange(date);
      }
      if (_this.props.adjustDateOnChange) {
        if (_this.props.onSelect) {
          _this.props.onSelect(date);
        }
        if (_this.props.setOpen) {
          _this.props.setOpen(true);
        }
      }
    };

    _this.handleMonthYearChange = function (date) {
      _this.handleYearChange(date);
      _this.handleMonthChange(date);
    };

    _this.changeYear = function (year) {
      _this.setState({
        date: setYear(cloneDate(_this.state.date), year)
      }, function () {
        return _this.handleYearChange(_this.state.date);
      });
    };

    _this.changeMonth = function (month) {
      _this.setState({
        date: setMonth(cloneDate(_this.state.date), month)
      }, function () {
        return _this.handleMonthChange(_this.state.date);
      });
    };

    _this.changeMonthYear = function (monthYear) {
      _this.setState({
        date: setYear(setMonth(cloneDate(_this.state.date), getMonth(monthYear)), getYear(monthYear))
      }, function () {
        return _this.handleMonthYearChange(_this.state.date);
      });
    };

    _this.header = function () {
      var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.date;

      var startOfWeek = getStartOfWeek(cloneDate(date));
      var dayNames = [];
      if (_this.props.showWeekNumbers) {
        dayNames.push(React.createElement(
          "div",
          { key: "W", className: "react-datepicker__day-name" },
          _this.props.weekLabel || "#"
        ));
      }
      return dayNames.concat([0, 1, 2, 3, 4, 5, 6].map(function (offset) {
        var day = addDays(cloneDate(startOfWeek), offset);
        var localeData = getLocaleData(day);
        var weekDayName = _this.formatWeekday(localeData, day);

        return React.createElement(
          "div",
          { key: offset, className: "react-datepicker__day-name" },
          weekDayName
        );
      }));
    };

    _this.formatWeekday = function (localeData, day) {
      if (_this.props.formatWeekDay) {
        return getFormattedWeekdayInLocale(localeData, day, _this.props.formatWeekDay);
      }
      return _this.props.useWeekdaysShort ? getWeekdayShortInLocale(localeData, day) : getWeekdayMinInLocale(localeData, day);
    };

    _this.renderPreviousMonthButton = function () {
      var allPrevDaysDisabled = allDaysDisabledBefore(_this.state.date, "month", _this.props);

      if (!_this.props.forceShowMonthNavigation && !_this.props.showDisabledMonthNavigation && allPrevDaysDisabled || _this.props.showTimeSelectOnly) {
        return;
      }

      var classes = ["react-datepicker__navigation", "react-datepicker__navigation--previous"];

      var clickHandler = _this.decreaseMonth;

      if (allPrevDaysDisabled && _this.props.showDisabledMonthNavigation) {
        classes.push("react-datepicker__navigation--previous--disabled");
        clickHandler = null;
      }

      return React.createElement(
        "button",
        {
          type: "button",
          className: classes.join(" "),
          onClick: clickHandler
        },
        _this.props.previousMonthButtonLabel
      );
    };

    _this.renderNextMonthButton = function () {
      var allNextDaysDisabled = allDaysDisabledAfter(_this.state.date, "month", _this.props);

      if (!_this.props.forceShowMonthNavigation && !_this.props.showDisabledMonthNavigation && allNextDaysDisabled || _this.props.showTimeSelectOnly) {
        return;
      }

      var classes = ["react-datepicker__navigation", "react-datepicker__navigation--next"];
      if (_this.props.showTimeSelect) {
        classes.push("react-datepicker__navigation--next--with-time");
      }
      if (_this.props.todayButton) {
        classes.push("react-datepicker__navigation--next--with-today-button");
      }

      var clickHandler = _this.increaseMonth;

      if (allNextDaysDisabled && _this.props.showDisabledMonthNavigation) {
        classes.push("react-datepicker__navigation--next--disabled");
        clickHandler = null;
      }

      return React.createElement(
        "button",
        {
          type: "button",
          className: classes.join(" "),
          onClick: clickHandler
        },
        _this.props.nextMonthButtonLabel
      );
    };

    _this.renderCurrentMonth = function () {
      var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.date;

      var classes = ["react-datepicker__current-month"];

      if (_this.props.showYearDropdown) {
        classes.push("react-datepicker__current-month--hasYearDropdown");
      }
      if (_this.props.showMonthDropdown) {
        classes.push("react-datepicker__current-month--hasMonthDropdown");
      }
      if (_this.props.showMonthYearDropdown) {
        classes.push("react-datepicker__current-month--hasMonthYearDropdown");
      }
      return React.createElement(
        "div",
        { className: classes.join(" ") },
        formatDate(date, _this.props.dateFormat)
      );
    };

    _this.renderYearDropdown = function () {
      var overrideHide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!_this.props.showYearDropdown || overrideHide) {
        return;
      }
      return React.createElement(YearDropdown, {
        adjustDateOnChange: _this.props.adjustDateOnChange,
        date: _this.state.date,
        onSelect: _this.props.onSelect,
        setOpen: _this.props.setOpen,
        dropdownMode: _this.props.dropdownMode,
        onChange: _this.changeYear,
        minDate: _this.props.minDate,
        maxDate: _this.props.maxDate,
        year: getYear(_this.state.date),
        scrollableYearDropdown: _this.props.scrollableYearDropdown,
        yearDropdownItemNumber: _this.props.yearDropdownItemNumber
      });
    };

    _this.renderMonthDropdown = function () {
      var overrideHide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!_this.props.showMonthDropdown || overrideHide) {
        return;
      }
      return React.createElement(MonthDropdown, {
        dropdownMode: _this.props.dropdownMode,
        locale: _this.props.locale,
        dateFormat: _this.props.dateFormat,
        onChange: _this.changeMonth,
        month: getMonth(_this.state.date),
        useShortMonthInDropdown: _this.props.useShortMonthInDropdown
      });
    };

    _this.renderMonthYearDropdown = function () {
      var overrideHide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!_this.props.showMonthYearDropdown || overrideHide) {
        return;
      }
      return React.createElement(MonthYearDropdown, {
        dropdownMode: _this.props.dropdownMode,
        locale: _this.props.locale,
        dateFormat: _this.props.dateFormat,
        onChange: _this.changeMonthYear,
        minDate: _this.props.minDate,
        maxDate: _this.props.maxDate,
        date: _this.state.date,
        scrollableMonthYearDropdown: _this.props.scrollableMonthYearDropdown
      });
    };

    _this.renderTodayButton = function () {
      if (!_this.props.todayButton || _this.props.showTimeSelectOnly) {
        return;
      }
      return React.createElement(
        "div",
        {
          className: "react-datepicker__today-button",
          onClick: function onClick(e) {
            return _this.props.onSelect(getStartOfDate(now(_this.props.utcOffset)), e);
          }
        },
        _this.props.todayButton
      );
    };

    _this.renderMonths = function () {
      if (_this.props.showTimeSelectOnly) {
        return;
      }

      var monthList = [];
      for (var i = 0; i < _this.props.monthsShown; ++i) {
        var monthDate = addMonths(cloneDate(_this.state.date), i);
        var monthKey = "month-" + i;
        monthList.push(React.createElement(
          "div",
          {
            key: monthKey,
            ref: function ref(div) {
              _this.monthContainer = div;
            },
            className: "react-datepicker__month-container"
          },
          React.createElement(
            "div",
            { className: "react-datepicker__header" },
            _this.renderCurrentMonth(monthDate),
            React.createElement(
              "div",
              {
                className: "react-datepicker__header__dropdown react-datepicker__header__dropdown--" + _this.props.dropdownMode,
                onFocus: _this.handleDropdownFocus
              },
              _this.renderMonthDropdown(i !== 0),
              _this.renderMonthYearDropdown(i !== 0),
              _this.renderYearDropdown(i !== 0)
            ),
            React.createElement(
              "div",
              { className: "react-datepicker__day-names" },
              _this.header(monthDate)
            )
          ),
          React.createElement(Month, {
            day: monthDate,
            dayClassName: _this.props.dayClassName,
            onDayClick: _this.handleDayClick,
            onDayMouseEnter: _this.handleDayMouseEnter,
            onMouseLeave: _this.handleMonthMouseLeave,
            onWeekSelect: _this.props.onWeekSelect,
            formatWeekNumber: _this.props.formatWeekNumber,
            minDate: _this.props.minDate,
            maxDate: _this.props.maxDate,
            excludeDates: _this.props.excludeDates,
            highlightDates: _this.props.highlightDates,
            selectingDate: _this.state.selectingDate,
            includeDates: _this.props.includeDates,
            inline: _this.props.inline,
            fixedHeight: _this.props.fixedHeight,
            filterDate: _this.props.filterDate,
            preSelection: _this.props.preSelection,
            selected: _this.props.selected,
            selectsStart: _this.props.selectsStart,
            selectsEnd: _this.props.selectsEnd,
            showWeekNumbers: _this.props.showWeekNumbers,
            startDate: _this.props.startDate,
            endDate: _this.props.endDate,
            peekNextMonth: _this.props.peekNextMonth,
            utcOffset: _this.props.utcOffset
          })
        ));
      }
      return monthList;
    };

    _this.renderTimeSection = function () {
      if (_this.props.showTimeSelect) {
        return React.createElement(Time, {
          selected: _this.props.selected,
          onChange: _this.props.onTimeChange,
          format: _this.props.timeFormat,
          includeTimes: _this.props.includeTimes,
          intervals: _this.props.timeIntervals,
          minTime: _this.props.minTime,
          maxTime: _this.props.maxTime,
          excludeTimes: _this.props.excludeTimes,
          timeCaption: _this.props.timeCaption,
          todayButton: _this.props.todayButton,
          showMonthDropdown: _this.props.showMonthDropdown,
          showMonthYearDropdown: _this.props.showMonthYearDropdown,
          showYearDropdown: _this.props.showYearDropdown,
          withPortal: _this.props.withPortal,
          monthRef: _this.state.monthContainer,
          injectTimes: _this.props.injectTimes
        });
      }
    };

    _this.state = {
      date: _this.localizeDate(_this.getDateInView()),
      selectingDate: null,
      monthContainer: _this.monthContainer
    };
    return _this;
  }

  Calendar.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    // monthContainer height is needed in time component
    // to determine the height for the ul in the time component
    // setState here so height is given after final component
    // layout is rendered
    if (this.props.showTimeSelect) {
      this.assignMonthContainer = function () {
        _this2.setState({ monthContainer: _this2.monthContainer });
      }();
    }
  };

  Calendar.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.preSelection && !isSameDay(this.props.preSelection, prevProps.preSelection)) {
      this.setState({
        date: this.localizeDate(this.props.preSelection)
      });
    } else if (this.props.openToDate && !isSameDay(this.props.openToDate, prevProps.openToDate)) {
      this.setState({
        date: this.localizeDate(this.props.openToDate)
      });
    }
  };

  Calendar.prototype.render = function render() {
    var Container = this.props.container || CalendarContainer;

    return React.createElement(
      Container,
      {
        className: classnames("react-datepicker", this.props.className, {
          "react-datepicker--time-only": this.props.showTimeSelectOnly
        })
      },
      this.renderPreviousMonthButton(),
      this.renderNextMonthButton(),
      this.renderMonths(),
      this.renderTodayButton(),
      this.renderTimeSection(),
      this.props.children
    );
  };

  return Calendar;
}(React.Component);

Calendar.propTypes = {
  adjustDateOnChange: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  container: PropTypes.func,
  dateFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  dayClassName: PropTypes.func,
  dropdownMode: PropTypes.oneOf(["scroll", "select"]),
  endDate: PropTypes.object,
  excludeDates: PropTypes.array,
  filterDate: PropTypes.func,
  fixedHeight: PropTypes.bool,
  formatWeekNumber: PropTypes.func,
  highlightDates: PropTypes.instanceOf(Map),
  includeDates: PropTypes.array,
  includeTimes: PropTypes.array,
  injectTimes: PropTypes.array,
  inline: PropTypes.bool,
  locale: PropTypes.string,
  maxDate: PropTypes.object,
  minDate: PropTypes.object,
  monthsShown: PropTypes.number,
  onClickOutside: PropTypes.func.isRequired,
  onMonthChange: PropTypes.func,
  onYearChange: PropTypes.func,
  forceShowMonthNavigation: PropTypes.bool,
  onDropdownFocus: PropTypes.func,
  onSelect: PropTypes.func.isRequired,
  onWeekSelect: PropTypes.func,
  showTimeSelect: PropTypes.bool,
  showTimeSelectOnly: PropTypes.bool,
  timeFormat: PropTypes.string,
  timeIntervals: PropTypes.number,
  onTimeChange: PropTypes.func,
  minTime: PropTypes.object,
  maxTime: PropTypes.object,
  excludeTimes: PropTypes.array,
  timeCaption: PropTypes.string,
  openToDate: PropTypes.object,
  peekNextMonth: PropTypes.bool,
  scrollableYearDropdown: PropTypes.bool,
  scrollableMonthYearDropdown: PropTypes.bool,
  preSelection: PropTypes.object,
  selected: PropTypes.object,
  selectsEnd: PropTypes.bool,
  selectsStart: PropTypes.bool,
  showMonthDropdown: PropTypes.bool,
  showMonthYearDropdown: PropTypes.bool,
  showWeekNumbers: PropTypes.bool,
  showYearDropdown: PropTypes.bool,
  startDate: PropTypes.object,
  todayButton: PropTypes.string,
  useWeekdaysShort: PropTypes.bool,
  formatWeekDay: PropTypes.func,
  withPortal: PropTypes.bool,
  utcOffset: PropTypes.number,
  weekLabel: PropTypes.string,
  yearDropdownItemNumber: PropTypes.number,
  setOpen: PropTypes.func,
  useShortMonthInDropdown: PropTypes.bool,
  showDisabledMonthNavigation: PropTypes.bool,
  previousMonthButtonLabel: PropTypes.string,
  nextMonthButtonLabel: PropTypes.string
};

var popperPlacementPositions = ["auto", "auto-left", "auto-right", "bottom", "bottom-end", "bottom-start", "left", "left-end", "left-start", "right", "right-end", "right-start", "top", "top-end", "top-start"];

var PopperComponent = function (_React$Component) {
  inherits(PopperComponent, _React$Component);

  function PopperComponent() {
    classCallCheck(this, PopperComponent);
    return possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  PopperComponent.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        hidePopper = _props.hidePopper,
        popperComponent = _props.popperComponent,
        popperModifiers = _props.popperModifiers,
        popperPlacement = _props.popperPlacement,
        targetComponent = _props.targetComponent;


    var popper = void 0;

    if (!hidePopper) {
      var classes = classnames("react-datepicker-popper", className);
      popper = React.createElement(
        reactPopper.Popper,
        {
          className: classes,
          modifiers: popperModifiers,
          placement: popperPlacement
        },
        popperComponent
      );
    }

    if (this.props.popperContainer) {
      popper = React.createElement(this.props.popperContainer, {}, popper);
    }

    return React.createElement(
      reactPopper.Manager,
      null,
      React.createElement(
        reactPopper.Target,
        { className: "react-datepicker-wrapper" },
        targetComponent
      ),
      popper
    );
  };

  createClass(PopperComponent, null, [{
    key: "defaultProps",
    get: function get$$1() {
      return {
        hidePopper: true,
        popperModifiers: {
          preventOverflow: {
            enabled: true,
            escapeWithReference: true,
            boundariesElement: "viewport"
          }
        },
        popperPlacement: "bottom-start"
      };
    }
  }]);
  return PopperComponent;
}(React.Component);

PopperComponent.propTypes = {
  className: PropTypes.string,
  hidePopper: PropTypes.bool,
  popperComponent: PropTypes.element,
  popperModifiers: PropTypes.object, // <datepicker/> props
  popperPlacement: PropTypes.oneOf(popperPlacementPositions), // <datepicker/> props
  popperContainer: PropTypes.func,
  targetComponent: PropTypes.element
};

var outsideClickIgnoreClass = "react-datepicker-ignore-onclickoutside";
var WrappedCalendar = onClickOutside(Calendar);

// Compares dates year+month combinations
function hasPreSelectionChanged(date1, date2) {
  if (date1 && date2) {
    return getMonth(date1) !== getMonth(date2) || getYear(date1) !== getYear(date2);
  }

  return date1 !== date2;
}

function hasSelectionChanged(date1, date2) {
  if (date1 && date2) {
    return !equals(date1, date2);
  }

  return false;
}

/**
 * General datepicker component.
 */

var DatePicker = function (_React$Component) {
  inherits(DatePicker, _React$Component);
  createClass(DatePicker, null, [{
    key: "defaultProps",
    get: function get$$1() {
      return {
        allowSameDay: false,
        dateFormat: "L",
        dateFormatCalendar: "MMMM YYYY",
        onChange: function onChange() {},

        disabled: false,
        disabledKeyboardNavigation: false,
        dropdownMode: "scroll",
        customInputRef: React.createRef(),
        onFocus: function onFocus() {},
        onBlur: function onBlur() {},
        onKeyDown: function onKeyDown() {},
        onSelect: function onSelect() {},
        onClickOutside: function onClickOutside$$1() {},
        onMonthChange: function onMonthChange() {},

        preventOpenOnFocus: false,
        onYearChange: function onYearChange() {},

        monthsShown: 1,
        readOnly: false,
        withPortal: false,
        shouldCloseOnSelect: true,
        showTimeSelect: false,
        timeIntervals: 30,
        timeCaption: "Time",
        previousMonthButtonLabel: "Previous Month",
        nextMonthButtonLabel: "Next month"
      };
    }
  }]);

  function DatePicker(props) {
    classCallCheck(this, DatePicker);

    var _this = possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.getPreSelection = function () {
      return _this.props.openToDate ? newDate(_this.props.openToDate) : _this.props.selectsEnd && _this.props.startDate ? newDate(_this.props.startDate) : _this.props.selectsStart && _this.props.endDate ? newDate(_this.props.endDate) : now(_this.props.utcOffset);
    };

    _this.calcInitialState = function () {
      var defaultPreSelection = _this.getPreSelection();
      var minDate = getEffectiveMinDate(_this.props);
      var maxDate = getEffectiveMaxDate(_this.props);
      var boundedPreSelection = minDate && isBefore(defaultPreSelection, minDate) ? minDate : maxDate && isAfter(defaultPreSelection, maxDate) ? maxDate : defaultPreSelection;
      return {
        open: _this.props.startOpen || false,
        preventFocus: false,
        preSelection: _this.props.selected ? newDate(_this.props.selected) : boundedPreSelection,
        // transforming highlighted days (perhaps nested array)
        // to flat Map for faster access in day.jsx
        highlightDates: getHightLightDaysMap(_this.props.highlightDates),
        focused: false
      };
    };

    _this.clearPreventFocusTimeout = function () {
      if (_this.preventFocusTimeout) {
        clearTimeout(_this.preventFocusTimeout);
      }
    };

    _this.setFocus = function () {
      if (_this.props.customInputRef.current && _this.props.customInputRef.current.focus) {
        _this.props.customInputRef.current.focus();
      }
    };

    _this.setOpen = function (open) {
      _this.setState({
        open: open,
        preSelection: open && _this.state.open ? _this.state.preSelection : _this.calcInitialState().preSelection,
        lastPreSelectChange: PRESELECT_CHANGE_VIA_NAVIGATE
      });
    };

    _this.handleFocus = function (event) {
      if (!_this.state.preventFocus) {
        _this.props.onFocus(event);
        if (!_this.props.preventOpenOnFocus && !_this.props.readOnly) {
          _this.setOpen(true);
        }
      }
      _this.setState({ focused: true });
    };

    _this.cancelFocusInput = function () {
      clearTimeout(_this.inputFocusTimeout);
      _this.inputFocusTimeout = null;
    };

    _this.deferFocusInput = function () {
      _this.cancelFocusInput();
      _this.inputFocusTimeout = setTimeout(function () {
        return _this.setFocus();
      }, 1);
    };

    _this.handleDropdownFocus = function () {
      _this.cancelFocusInput();
    };

    _this.handleBlur = function (event) {
      if (_this.state.open && !_this.props.withPortal) {
        _this.deferFocusInput();
      } else {
        _this.props.onBlur(event);
      }
      _this.setState({ focused: false });
    };

    _this.handleCalendarClickOutside = function (event) {
      if (!_this.props.inline) {
        _this.setOpen(false);
      }
      _this.props.onClickOutside(event);
      if (_this.props.withPortal) {
        event.preventDefault();
      }
    };

    _this.handleChange = function () {
      for (var _len = arguments.length, allArgs = Array(_len), _key = 0; _key < _len; _key++) {
        allArgs[_key] = arguments[_key];
      }

      var event = allArgs[0];
      if (_this.props.onChangeRaw) {
        _this.props.onChangeRaw.apply(_this, allArgs);
        if (typeof event.isDefaultPrevented !== "function" || event.isDefaultPrevented()) {
          return;
        }
      }
      _this.setState({
        inputValue: event.target.value,
        lastPreSelectChange: PRESELECT_CHANGE_VIA_INPUT
      });
      var date = parseDate(event.target.value, _this.props);
      if (date || !event.target.value) {
        _this.setSelected(date, event, true);
      }
    };

    _this.handleSelect = function (date, event) {
      // Preventing onFocus event to fix issue
      // https://github.com/Hacker0x01/react-datepicker/issues/628
      _this.setState({ preventFocus: true }, function () {
        _this.preventFocusTimeout = setTimeout(function () {
          return _this.setState({ preventFocus: false });
        }, 50);
        return _this.preventFocusTimeout;
      });
      _this.setSelected(date, event);
      if (!_this.props.shouldCloseOnSelect || _this.props.showTimeSelect) {
        _this.setPreSelection(date);
      } else if (!_this.props.inline) {
        _this.setOpen(false);
      }
    };

    _this.setSelected = function (date, event, keepInput) {
      var changedDate = date;

      if (changedDate !== null && isDayDisabled(changedDate, _this.props)) {
        return;
      }

      if (!isSameDay(_this.props.selected, changedDate) || _this.props.allowSameDay) {
        if (changedDate !== null) {
          if (_this.props.selected) {
            var selected = _this.props.selected;
            if (keepInput) selected = newDate(changedDate);
            changedDate = setTime(newDate(changedDate), {
              hour: getHour(selected),
              minute: getMinute(selected),
              second: getSecond(selected)
            });
          }
          if (!_this.props.inline) {
            _this.setState({
              preSelection: changedDate
            });
          }
        }
        _this.props.onChange(changedDate, event);
      }

      _this.props.onSelect(changedDate, event);

      if (!keepInput) {
        _this.setState({ inputValue: null });
      }
    };

    _this.setPreSelection = function (date) {
      var isDateRangePresent = typeof _this.props.minDate !== "undefined" && typeof _this.props.maxDate !== "undefined";
      var isValidDateSelection = isDateRangePresent && date ? isDayInRange(date, _this.props.minDate, _this.props.maxDate) : true;
      if (isValidDateSelection) {
        _this.setState({
          preSelection: date
        });
      }
    };

    _this.handleTimeChange = function (time) {
      var selected = _this.props.selected ? _this.props.selected : _this.getPreSelection();
      var changedDate = setTime(cloneDate(selected), {
        hour: getHour(time),
        minute: getMinute(time)
      });

      _this.setState({
        preSelection: changedDate
      });

      _this.props.onChange(changedDate);
      _this.setOpen(false);
      _this.setState({ inputValue: null });
    };

    _this.onInputClick = function () {
      if (!_this.props.disabled && !_this.props.readOnly) {
        _this.setOpen(true);
      }
    };

    _this.onInputKeyDown = function (event) {
      _this.props.onKeyDown(event);
      var eventKey = event.key;
      if (!_this.state.open && !_this.props.inline && !_this.props.preventOpenOnFocus) {
        if (eventKey === "ArrowDown" || eventKey === "ArrowUp") {
          _this.onInputClick();
        }
        return;
      }
      var copy = newDate(_this.state.preSelection);
      if (eventKey === "Enter") {
        event.preventDefault();
        if ((isMoment(_this.state.preSelection) || isDate(_this.state.preSelection)) && _this.state.lastPreSelectChange === PRESELECT_CHANGE_VIA_NAVIGATE) {
          _this.handleSelect(copy, event);
          !_this.props.shouldCloseOnSelect && _this.setPreSelection(copy);
        } else {
          _this.setOpen(false);
        }
      } else if (eventKey === "Escape") {
        event.preventDefault();
        _this.setOpen(false);
      } else if (eventKey === "Tab") {
        _this.setOpen(false);
      } else if (!_this.props.disabledKeyboardNavigation) {
        var newSelection = void 0;
        switch (eventKey) {
          case "ArrowLeft":
            newSelection = subtractDays(copy, 1);
            break;
          case "ArrowRight":
            newSelection = addDays(copy, 1);
            break;
          case "ArrowUp":
            newSelection = subtractWeeks(copy, 1);
            break;
          case "ArrowDown":
            newSelection = addWeeks(copy, 1);
            break;
          case "PageUp":
            newSelection = subtractMonths(copy, 1);
            break;
          case "PageDown":
            newSelection = addMonths(copy, 1);
            break;
          case "Home":
            newSelection = subtractYears(copy, 1);
            break;
          case "End":
            newSelection = addYears(copy, 1);
            break;
        }
        if (!newSelection) return; // Let the input component handle this keydown
        event.preventDefault();
        _this.setState({ lastPreSelectChange: PRESELECT_CHANGE_VIA_NAVIGATE });
        if (_this.props.adjustDateOnChange) {
          _this.setSelected(newSelection);
        }
        _this.setPreSelection(newSelection);
      }
    };

    _this.onClearClick = function (event) {
      if (event) {
        if (event.preventDefault) {
          event.preventDefault();
        }
      }
      _this.props.onChange(null, event);
      _this.setState({ inputValue: null });
    };

    _this.clear = function () {
      _this.onClearClick();
    };

    _this.renderCalendar = function () {
      if (!_this.props.inline && (!_this.state.open || _this.props.disabled || _this.props.readOnly)) {
        return null;
      }
      return React.createElement(
        WrappedCalendar,
        {
          ref: function ref(elem) {
            _this.calendar = elem;
          },
          locale: _this.props.locale,
          adjustDateOnChange: _this.props.adjustDateOnChange,
          setOpen: _this.setOpen,
          dateFormat: _this.props.dateFormatCalendar,
          useWeekdaysShort: _this.props.useWeekdaysShort,
          formatWeekDay: _this.props.formatWeekDay,
          dropdownMode: _this.props.dropdownMode,
          selected: _this.props.selected,
          preSelection: _this.state.preSelection,
          onSelect: _this.handleSelect,
          onWeekSelect: _this.props.onWeekSelect,
          openToDate: _this.props.openToDate,
          minDate: _this.props.minDate,
          maxDate: _this.props.maxDate,
          selectsStart: _this.props.selectsStart,
          selectsEnd: _this.props.selectsEnd,
          startDate: _this.props.startDate,
          endDate: _this.props.endDate,
          excludeDates: _this.props.excludeDates,
          filterDate: _this.props.filterDate,
          onClickOutside: _this.handleCalendarClickOutside,
          formatWeekNumber: _this.props.formatWeekNumber,
          highlightDates: _this.state.highlightDates,
          includeDates: _this.props.includeDates,
          includeTimes: _this.props.includeTimes,
          injectTimes: _this.props.injectTimes,
          inline: _this.props.inline,
          peekNextMonth: _this.props.peekNextMonth,
          showMonthDropdown: _this.props.showMonthDropdown,
          useShortMonthInDropdown: _this.props.useShortMonthInDropdown,
          showMonthYearDropdown: _this.props.showMonthYearDropdown,
          showWeekNumbers: _this.props.showWeekNumbers,
          showYearDropdown: _this.props.showYearDropdown,
          withPortal: _this.props.withPortal,
          forceShowMonthNavigation: _this.props.forceShowMonthNavigation,
          showDisabledMonthNavigation: _this.props.showDisabledMonthNavigation,
          scrollableYearDropdown: _this.props.scrollableYearDropdown,
          scrollableMonthYearDropdown: _this.props.scrollableMonthYearDropdown,
          todayButton: _this.props.todayButton,
          weekLabel: _this.props.weekLabel,
          utcOffset: _this.props.utcOffset,
          outsideClickIgnoreClass: outsideClickIgnoreClass,
          fixedHeight: _this.props.fixedHeight,
          monthsShown: _this.props.monthsShown,
          onDropdownFocus: _this.handleDropdownFocus,
          onMonthChange: _this.props.onMonthChange,
          onYearChange: _this.props.onYearChange,
          dayClassName: _this.props.dayClassName,
          showTimeSelect: _this.props.showTimeSelect,
          showTimeSelectOnly: _this.props.showTimeSelectOnly,
          onTimeChange: _this.handleTimeChange,
          timeFormat: _this.props.timeFormat,
          timeIntervals: _this.props.timeIntervals,
          minTime: _this.props.minTime,
          maxTime: _this.props.maxTime,
          excludeTimes: _this.props.excludeTimes,
          timeCaption: _this.props.timeCaption,
          className: _this.props.calendarClassName,
          container: _this.props.calendarContainer,
          yearDropdownItemNumber: _this.props.yearDropdownItemNumber,
          previousMonthButtonLabel: _this.props.previousMonthButtonLabel,
          nextMonthButtonLabel: _this.props.nextMonthButtonLabel
        },
        _this.props.children
      );
    };

    _this.renderDateInput = function () {
      var _classnames;

      var className = classnames(_this.props.className, (_classnames = {}, _classnames[outsideClickIgnoreClass] = _this.state.open, _classnames));

      var customInput = _this.props.customInput || React.createElement("input", { type: "text" });
      var inputValue = typeof _this.props.value === "string" ? _this.props.value : typeof _this.state.inputValue === "string" ? _this.state.inputValue : safeDateFormat(_this.props.selected, _this.props);

      return React.cloneElement(customInput, {
        ref: _this.props.customInputRef,
        value: inputValue,
        onBlur: _this.handleBlur,
        onChange: _this.handleChange,
        onClick: _this.onInputClick,
        onFocus: _this.handleFocus,
        onKeyDown: _this.onInputKeyDown,
        id: _this.props.id,
        name: _this.props.name,
        autoFocus: _this.props.autoFocus,
        placeholder: _this.props.placeholderText,
        disabled: _this.props.disabled,
        autoComplete: _this.props.autoComplete,
        className: className,
        title: _this.props.title,
        readOnly: _this.props.readOnly,
        required: _this.props.required,
        tabIndex: _this.props.tabIndex
      });
    };

    _this.renderClearButton = function () {
      if (_this.props.isClearable && _this.props.selected != null) {
        return React.createElement("button", {
          type: "button",
          className: "react-datepicker__close-icon",
          onClick: _this.onClearClick,
          title: _this.props.clearButtonTitle,
          tabIndex: -1
        });
      } else {
        return null;
      }
    };

    _this.state = _this.calcInitialState();
    return _this;
  }

  DatePicker.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (prevProps.inline && hasPreSelectionChanged(prevProps.selected, this.props.selected)) {
      this.setPreSelection(this.props.selected);
    }
    if (prevProps.highlightDates !== this.props.highlightDates) {
      this.setState({
        highlightDates: getHightLightDaysMap(this.props.highlightDates)
      });
    }
    if (!prevState.focused && hasSelectionChanged(prevProps.selected, this.props.selected)) {
      this.setState({ inputValue: null });
    }
  };

  DatePicker.prototype.componentWillUnmount = function componentWillUnmount() {
    this.clearPreventFocusTimeout();
  };

  DatePicker.prototype.render = function render() {
    var calendar = this.renderCalendar();

    if (this.props.inline && !this.props.withPortal) {
      return calendar;
    }

    if (this.props.withPortal) {
      return React.createElement(
        "div",
        null,
        !this.props.inline ? React.createElement(
          "div",
          { className: "react-datepicker__input-container" },
          this.renderDateInput(),
          this.renderClearButton()
        ) : null,
        this.state.open || this.props.inline ? React.createElement(
          "div",
          { className: "react-datepicker__portal" },
          calendar
        ) : null
      );
    }

    return React.createElement(PopperComponent, {
      className: this.props.popperClassName,
      hidePopper: !this.state.open || this.props.disabled || this.props.readOnly,
      popperModifiers: this.props.popperModifiers,
      targetComponent: React.createElement(
        "div",
        { className: "react-datepicker__input-container" },
        this.renderDateInput(),
        this.renderClearButton()
      ),
      popperContainer: this.props.popperContainer,
      popperComponent: calendar,
      popperPlacement: this.props.popperPlacement
    });
  };

  return DatePicker;
}(React.Component);

DatePicker.propTypes = {
  adjustDateOnChange: PropTypes.bool,
  allowSameDay: PropTypes.bool,
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  calendarClassName: PropTypes.string,
  calendarContainer: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  customInput: PropTypes.element,
  customInputRef: PropTypes.object,
  // eslint-disable-next-line react/no-unused-prop-types
  dateFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  dateFormatCalendar: PropTypes.string,
  dayClassName: PropTypes.func,
  disabled: PropTypes.bool,
  disabledKeyboardNavigation: PropTypes.bool,
  dropdownMode: PropTypes.oneOf(["scroll", "select"]).isRequired,
  endDate: PropTypes.object,
  excludeDates: PropTypes.array,
  filterDate: PropTypes.func,
  fixedHeight: PropTypes.bool,
  formatWeekNumber: PropTypes.func,
  highlightDates: PropTypes.array,
  id: PropTypes.string,
  includeDates: PropTypes.array,
  includeTimes: PropTypes.array,
  injectTimes: PropTypes.array,
  inline: PropTypes.bool,
  isClearable: PropTypes.bool,
  locale: PropTypes.string,
  maxDate: PropTypes.object,
  minDate: PropTypes.object,
  monthsShown: PropTypes.number,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  onWeekSelect: PropTypes.func,
  onClickOutside: PropTypes.func,
  onChangeRaw: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onMonthChange: PropTypes.func,
  onYearChange: PropTypes.func,
  openToDate: PropTypes.object,
  peekNextMonth: PropTypes.bool,
  placeholderText: PropTypes.string,
  popperContainer: PropTypes.func,
  popperClassName: PropTypes.string, // <PopperComponent/> props
  popperModifiers: PropTypes.object, // <PopperComponent/> props
  popperPlacement: PropTypes.oneOf(popperPlacementPositions), // <PopperComponent/> props
  preventOpenOnFocus: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  scrollableYearDropdown: PropTypes.bool,
  scrollableMonthYearDropdown: PropTypes.bool,
  selected: PropTypes.object,
  selectsEnd: PropTypes.bool,
  selectsStart: PropTypes.bool,
  showMonthDropdown: PropTypes.bool,
  showMonthYearDropdown: PropTypes.bool,
  showWeekNumbers: PropTypes.bool,
  showYearDropdown: PropTypes.bool,
  forceShowMonthNavigation: PropTypes.bool,
  showDisabledMonthNavigation: PropTypes.bool,
  startDate: PropTypes.object,
  startOpen: PropTypes.bool,
  tabIndex: PropTypes.number,
  timeCaption: PropTypes.string,
  title: PropTypes.string,
  todayButton: PropTypes.string,
  useWeekdaysShort: PropTypes.bool,
  formatWeekDay: PropTypes.func,
  utcOffset: PropTypes.number,
  value: PropTypes.string,
  weekLabel: PropTypes.string,
  withPortal: PropTypes.bool,
  yearDropdownItemNumber: PropTypes.number,
  shouldCloseOnSelect: PropTypes.bool,
  showTimeSelect: PropTypes.bool,
  showTimeSelectOnly: PropTypes.bool,
  timeFormat: PropTypes.string,
  timeIntervals: PropTypes.number,
  minTime: PropTypes.object,
  maxTime: PropTypes.object,
  excludeTimes: PropTypes.array,
  useShortMonthInDropdown: PropTypes.bool,
  clearButtonTitle: PropTypes.string,
  previousMonthButtonLabel: PropTypes.string,
  nextMonthButtonLabel: PropTypes.string
};
var PRESELECT_CHANGE_VIA_INPUT = "input";
var PRESELECT_CHANGE_VIA_NAVIGATE = "navigate";

exports['default'] = DatePicker;
exports.CalendarContainer = CalendarContainer;
