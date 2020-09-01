'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
require('prop-types');
var classnames = require('classnames');
var isDate = require('date-fns/isDate');
var isValidDate = require('date-fns/isValid');
var format = require('date-fns/format');
var addMinutes = require('date-fns/addMinutes');
var addHours = require('date-fns/addHours');
var utils$2 = require('date-fns/addDays');
var utils$3 = require('date-fns/addWeeks');
var addMonths = require('date-fns/addMonths');
var addYears = require('date-fns/addYears');
require('date-fns/subMinutes');
require('date-fns/subHours');
var subDays = require('date-fns/subDays');
var subWeeks = require('date-fns/subWeeks');
var subMonths = require('date-fns/subMonths');
var subYears = require('date-fns/subYears');
var getSeconds = require('date-fns/getSeconds');
var getMinutes = require('date-fns/getMinutes');
var getHours = require('date-fns/getHours');
var getDay = require('date-fns/getDay');
var getDate = require('date-fns/getDate');
var dfgetWeek = require('date-fns/getWeek');
var getMonth = require('date-fns/getMonth');
var getQuarter = require('date-fns/getQuarter');
var getYear = require('date-fns/getYear');
var getTime = require('date-fns/getTime');
var setSeconds = require('date-fns/setSeconds');
var setMinutes = require('date-fns/setMinutes');
var setHours = require('date-fns/setHours');
var utils = require('date-fns/setMonth');
var utils$1 = require('date-fns/setQuarter');
var utils$4 = require('date-fns/setYear');
var min = require('date-fns/min');
var max = require('date-fns/max');
var differenceInCalendarDays = require('date-fns/differenceInCalendarDays');
var differenceInCalendarMonths = require('date-fns/differenceInCalendarMonths');
require('date-fns/differenceInCalendarWeeks');
var differenceInCalendarYears = require('date-fns/differenceInCalendarYears');
var startOfDay = require('date-fns/startOfDay');
var startOfWeek = require('date-fns/startOfWeek');
var startOfMonth = require('date-fns/startOfMonth');
var startOfQuarter = require('date-fns/startOfQuarter');
var startOfYear = require('date-fns/startOfYear');
var endOfDay = require('date-fns/endOfDay');
require('date-fns/endOfWeek');
require('date-fns/endOfMonth');
var dfIsEqual = require('date-fns/isEqual');
var dfIsSameDay = require('date-fns/isSameDay');
var dfIsSameMonth = require('date-fns/isSameMonth');
var dfIsSameYear = require('date-fns/isSameYear');
var dfIsSameQuarter = require('date-fns/isSameQuarter');
var isAfter = require('date-fns/isAfter');
var isBefore = require('date-fns/isBefore');
var isWithinInterval = require('date-fns/isWithinInterval');
var toDate = require('date-fns/toDate');
var parse = require('date-fns/parse');
var parseISO = require('date-fns/parseISO');
var onClickOutside = require('react-onclickoutside');
var reactPopper = require('react-popper');
var ReactDOM = require('react-dom');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var classnames__default = /*#__PURE__*/_interopDefaultLegacy(classnames);
var isDate__default = /*#__PURE__*/_interopDefaultLegacy(isDate);
var isValidDate__default = /*#__PURE__*/_interopDefaultLegacy(isValidDate);
var format__default = /*#__PURE__*/_interopDefaultLegacy(format);
var addMinutes__default = /*#__PURE__*/_interopDefaultLegacy(addMinutes);
var addHours__default = /*#__PURE__*/_interopDefaultLegacy(addHours);
var utils__default$2 = /*#__PURE__*/_interopDefaultLegacy(utils$2);
var utils__default$3 = /*#__PURE__*/_interopDefaultLegacy(utils$3);
var addMonths__default = /*#__PURE__*/_interopDefaultLegacy(addMonths);
var addYears__default = /*#__PURE__*/_interopDefaultLegacy(addYears);
var subDays__default = /*#__PURE__*/_interopDefaultLegacy(subDays);
var subWeeks__default = /*#__PURE__*/_interopDefaultLegacy(subWeeks);
var subMonths__default = /*#__PURE__*/_interopDefaultLegacy(subMonths);
var subYears__default = /*#__PURE__*/_interopDefaultLegacy(subYears);
var getSeconds__default = /*#__PURE__*/_interopDefaultLegacy(getSeconds);
var getMinutes__default = /*#__PURE__*/_interopDefaultLegacy(getMinutes);
var getHours__default = /*#__PURE__*/_interopDefaultLegacy(getHours);
var getDay__default = /*#__PURE__*/_interopDefaultLegacy(getDay);
var getDate__default = /*#__PURE__*/_interopDefaultLegacy(getDate);
var dfgetWeek__default = /*#__PURE__*/_interopDefaultLegacy(dfgetWeek);
var getMonth__default = /*#__PURE__*/_interopDefaultLegacy(getMonth);
var getQuarter__default = /*#__PURE__*/_interopDefaultLegacy(getQuarter);
var getYear__default = /*#__PURE__*/_interopDefaultLegacy(getYear);
var getTime__default = /*#__PURE__*/_interopDefaultLegacy(getTime);
var setSeconds__default = /*#__PURE__*/_interopDefaultLegacy(setSeconds);
var setMinutes__default = /*#__PURE__*/_interopDefaultLegacy(setMinutes);
var setHours__default = /*#__PURE__*/_interopDefaultLegacy(setHours);
var utils__default = /*#__PURE__*/_interopDefaultLegacy(utils);
var utils__default$1 = /*#__PURE__*/_interopDefaultLegacy(utils$1);
var utils__default$4 = /*#__PURE__*/_interopDefaultLegacy(utils$4);
var min__default = /*#__PURE__*/_interopDefaultLegacy(min);
var max__default = /*#__PURE__*/_interopDefaultLegacy(max);
var differenceInCalendarDays__default = /*#__PURE__*/_interopDefaultLegacy(differenceInCalendarDays);
var differenceInCalendarMonths__default = /*#__PURE__*/_interopDefaultLegacy(differenceInCalendarMonths);
var differenceInCalendarYears__default = /*#__PURE__*/_interopDefaultLegacy(differenceInCalendarYears);
var startOfDay__default = /*#__PURE__*/_interopDefaultLegacy(startOfDay);
var startOfWeek__default = /*#__PURE__*/_interopDefaultLegacy(startOfWeek);
var startOfMonth__default = /*#__PURE__*/_interopDefaultLegacy(startOfMonth);
var startOfQuarter__default = /*#__PURE__*/_interopDefaultLegacy(startOfQuarter);
var startOfYear__default = /*#__PURE__*/_interopDefaultLegacy(startOfYear);
var endOfDay__default = /*#__PURE__*/_interopDefaultLegacy(endOfDay);
var dfIsEqual__default = /*#__PURE__*/_interopDefaultLegacy(dfIsEqual);
var dfIsSameDay__default = /*#__PURE__*/_interopDefaultLegacy(dfIsSameDay);
var dfIsSameMonth__default = /*#__PURE__*/_interopDefaultLegacy(dfIsSameMonth);
var dfIsSameYear__default = /*#__PURE__*/_interopDefaultLegacy(dfIsSameYear);
var dfIsSameQuarter__default = /*#__PURE__*/_interopDefaultLegacy(dfIsSameQuarter);
var isAfter__default = /*#__PURE__*/_interopDefaultLegacy(isAfter);
var isBefore__default = /*#__PURE__*/_interopDefaultLegacy(isBefore);
var isWithinInterval__default = /*#__PURE__*/_interopDefaultLegacy(isWithinInterval);
var toDate__default = /*#__PURE__*/_interopDefaultLegacy(toDate);
var parse__default = /*#__PURE__*/_interopDefaultLegacy(parse);
var parseISO__default = /*#__PURE__*/_interopDefaultLegacy(parseISO);
var onClickOutside__default = /*#__PURE__*/_interopDefaultLegacy(onClickOutside);
var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function dateLongFormatter(pattern, formatLong) {
  switch (pattern) {
    case 'P':
      return formatLong.date({
        width: 'short'
      });

    case 'PP':
      return formatLong.date({
        width: 'medium'
      });

    case 'PPP':
      return formatLong.date({
        width: 'long'
      });

    case 'PPPP':
    default:
      return formatLong.date({
        width: 'full'
      });
  }
}

function timeLongFormatter(pattern, formatLong) {
  switch (pattern) {
    case 'p':
      return formatLong.time({
        width: 'short'
      });

    case 'pp':
      return formatLong.time({
        width: 'medium'
      });

    case 'ppp':
      return formatLong.time({
        width: 'long'
      });

    case 'pppp':
    default:
      return formatLong.time({
        width: 'full'
      });
  }
}

function dateTimeLongFormatter(pattern, formatLong) {
  var matchResult = pattern.match(/(P+)(p+)?/);
  var datePattern = matchResult[1];
  var timePattern = matchResult[2];

  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong);
  }

  var dateTimeFormat;

  switch (datePattern) {
    case 'P':
      dateTimeFormat = formatLong.dateTime({
        width: 'short'
      });
      break;

    case 'PP':
      dateTimeFormat = formatLong.dateTime({
        width: 'medium'
      });
      break;

    case 'PPP':
      dateTimeFormat = formatLong.dateTime({
        width: 'long'
      });
      break;

    case 'PPPP':
    default:
      dateTimeFormat = formatLong.dateTime({
        width: 'full'
      });
      break;
  }

  return dateTimeFormat.replace('{{date}}', dateLongFormatter(datePattern, formatLong)).replace('{{time}}', timeLongFormatter(timePattern, formatLong));
}

var longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};

var DEFAULT_YEAR_ITEM_NUMBER = 12; // This RegExp catches symbols escaped by quotes, and also
// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`

var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g; // ** Date Constructors **

function newDate(value) {
  var d = value ? typeof value === "string" || value instanceof String ? parseISO__default['default'](value) : toDate__default['default'](value) : new Date();
  return isValid(d) ? d : null;
}
function parseDate(value, dateFormat, locale, strictParsing) {
  var parsedDate = null;
  var localeObject = getLocaleObject(locale) || getDefaultLocale();
  var strictParsingValueMatch = true;

  if (Array.isArray(dateFormat)) {
    dateFormat.forEach(function (df) {
      var tryParseDate = parse__default['default'](value, df, new Date(), {
        locale: localeObject
      });

      if (strictParsing) {
        strictParsingValueMatch = isValid(tryParseDate) && value === format__default['default'](tryParseDate, df, {
          awareOfUnicodeTokens: true
        });
      }

      if (isValid(tryParseDate) && strictParsingValueMatch) {
        parsedDate = tryParseDate;
      }
    });
    return parsedDate;
  }

  parsedDate = parse__default['default'](value, dateFormat, new Date(), {
    locale: localeObject
  });

  if (strictParsing) {
    strictParsingValueMatch = isValid(parsedDate) && value === format__default['default'](parsedDate, dateFormat, {
      awareOfUnicodeTokens: true
    });
  } else if (!isValid(parsedDate)) {
    dateFormat = dateFormat.match(longFormattingTokensRegExp).map(function (substring) {
      var firstCharacter = substring[0];

      if (firstCharacter === "p" || firstCharacter === "P") {
        var longFormatter = longFormatters[firstCharacter];
        return localeObject ? longFormatter(substring, localeObject.formatLong) : firstCharacter;
      }

      return substring;
    }).join("");

    if (value.length > 0) {
      parsedDate = parse__default['default'](value, dateFormat.slice(0, value.length), new Date());
    }

    if (!isValid(parsedDate)) {
      parsedDate = new Date(value);
    }
  }

  return isValid(parsedDate) && strictParsingValueMatch ? parsedDate : null;
} // ** Date "Reflection" **
function isValid(date) {
  return isValidDate__default['default'](date) && isAfter__default['default'](date, new Date("1/1/1000"));
} // ** Date Formatting **

function formatDate(date, formatStr, locale) {
  if (locale === "en") {
    return format__default['default'](date, formatStr, {
      awareOfUnicodeTokens: true
    });
  }

  var localeObj = getLocaleObject(locale);

  if (locale && !localeObj) {
    console.warn("A locale object was not found for the provided string [\"".concat(locale, "\"]."));
  }

  if (!localeObj && !!getDefaultLocale() && !!getLocaleObject(getDefaultLocale())) {
    localeObj = getLocaleObject(getDefaultLocale());
  }

  return format__default['default'](date, formatStr, {
    locale: localeObj ? localeObj : null,
    awareOfUnicodeTokens: true
  });
}
function safeDateFormat(date, _ref) {
  var dateFormat = _ref.dateFormat,
      locale = _ref.locale;
  return date && formatDate(date, Array.isArray(dateFormat) ? dateFormat[0] : dateFormat, locale) || "";
} // ** Date Setters **

function setTime(date, _ref2) {
  var _ref2$hour = _ref2.hour,
      hour = _ref2$hour === void 0 ? 0 : _ref2$hour,
      _ref2$minute = _ref2.minute,
      minute = _ref2$minute === void 0 ? 0 : _ref2$minute,
      _ref2$second = _ref2.second,
      second = _ref2$second === void 0 ? 0 : _ref2$second;
  return setHours__default['default'](setMinutes__default['default'](setSeconds__default['default'](date, second), minute), hour);
}
function getWeek(date, locale) {
  var localeObj = locale && getLocaleObject(locale) || getDefaultLocale() && getLocaleObject(getDefaultLocale());
  return dfgetWeek__default['default'](date, localeObj ? {
    locale: localeObj
  } : null);
}
function getDayOfWeekCode(day, locale) {
  return formatDate(day, "ddd", locale);
} // *** Start of ***

function getStartOfDay(date) {
  return startOfDay__default['default'](date);
}
function getStartOfWeek(date, locale) {
  var localeObj = locale ? getLocaleObject(locale) : getLocaleObject(getDefaultLocale());
  return startOfWeek__default['default'](date, {
    locale: localeObj
  });
}
function getStartOfMonth(date) {
  return startOfMonth__default['default'](date);
}
function getStartOfYear(date) {
  return startOfYear__default['default'](date);
}
function getStartOfQuarter(date) {
  return startOfQuarter__default['default'](date);
}
function getStartOfToday() {
  return startOfDay__default['default'](newDate());
} // *** End of ***
function isSameYear(date1, date2) {
  if (date1 && date2) {
    return dfIsSameYear__default['default'](date1, date2);
  } else {
    return !date1 && !date2;
  }
}
function isSameMonth(date1, date2) {
  if (date1 && date2) {
    return dfIsSameMonth__default['default'](date1, date2);
  } else {
    return !date1 && !date2;
  }
}
function isSameQuarter(date1, date2) {
  if (date1 && date2) {
    return dfIsSameQuarter__default['default'](date1, date2);
  } else {
    return !date1 && !date2;
  }
}
function isSameDay(date1, date2) {
  if (date1 && date2) {
    return dfIsSameDay__default['default'](date1, date2);
  } else {
    return !date1 && !date2;
  }
}
function isEqual(date1, date2) {
  if (date1 && date2) {
    return dfIsEqual__default['default'](date1, date2);
  } else {
    return !date1 && !date2;
  }
}
function isDayInRange(day, startDate, endDate) {
  var valid;
  var start = startOfDay__default['default'](startDate);
  var end = endOfDay__default['default'](endDate);

  try {
    valid = isWithinInterval__default['default'](day, {
      start: start,
      end: end
    });
  } catch (err) {
    valid = false;
  }

  return valid;
} // *** Diffing ***

function registerLocale(localeName, localeData) {
  var scope = typeof window !== "undefined" ? window : global;

  if (!scope.__localeData__) {
    scope.__localeData__ = {};
  }

  scope.__localeData__[localeName] = localeData;
}
function setDefaultLocale(localeName) {
  var scope = typeof window !== "undefined" ? window : global;
  scope.__localeId__ = localeName;
}
function getDefaultLocale() {
  var scope = typeof window !== "undefined" ? window : global;
  return scope.__localeId__;
}
function getLocaleObject(localeSpec) {
  if (typeof localeSpec === "string") {
    // Treat it as a locale name registered by registerLocale
    var scope = typeof window !== "undefined" ? window : global;
    return scope.__localeData__ ? scope.__localeData__[localeSpec] : null;
  } else {
    // Treat it as a raw date-fns locale object
    return localeSpec;
  }
}
function getFormattedWeekdayInLocale(date, formatFunc, locale) {
  return formatFunc(formatDate(date, "EEEE", locale));
}
function getWeekdayMinInLocale(date, locale) {
  return formatDate(date, "EEEEEE", locale);
}
function getWeekdayShortInLocale(date, locale) {
  return formatDate(date, "EEE", locale);
}
function getMonthInLocale(month, locale) {
  return formatDate(utils__default['default'](newDate(), month), "LLLL", locale);
}
function getMonthShortInLocale(month, locale) {
  return formatDate(utils__default['default'](newDate(), month), "LLL", locale);
}
function getQuarterShortInLocale(quarter, locale) {
  return formatDate(utils__default$1['default'](newDate(), quarter), "QQQ", locale);
} // ** Utils for some components **

function isDayDisabled(day) {
  var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      minDate = _ref3.minDate,
      maxDate = _ref3.maxDate,
      excludeDates = _ref3.excludeDates,
      includeDates = _ref3.includeDates,
      filterDate = _ref3.filterDate;

  return isOutOfBounds(day, {
    minDate: minDate,
    maxDate: maxDate
  }) || excludeDates && excludeDates.some(function (excludeDate) {
    return isSameDay(day, excludeDate);
  }) || includeDates && !includeDates.some(function (includeDate) {
    return isSameDay(day, includeDate);
  }) || filterDate && !filterDate(newDate(day)) || false;
}
function isDayExcluded(day) {
  var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      excludeDates = _ref4.excludeDates;

  return excludeDates && excludeDates.some(function (excludeDate) {
    return isSameDay(day, excludeDate);
  }) || false;
}
function isMonthDisabled(month) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      minDate = _ref5.minDate,
      maxDate = _ref5.maxDate,
      excludeDates = _ref5.excludeDates,
      includeDates = _ref5.includeDates,
      filterDate = _ref5.filterDate;

  return isOutOfBounds(month, {
    minDate: minDate,
    maxDate: maxDate
  }) || excludeDates && excludeDates.some(function (excludeDate) {
    return isSameMonth(month, excludeDate);
  }) || includeDates && !includeDates.some(function (includeDate) {
    return isSameMonth(month, includeDate);
  }) || filterDate && !filterDate(newDate(month)) || false;
}
function isMonthinRange(startDate, endDate, m, day) {
  var startDateYear = getYear__default['default'](startDate);
  var startDateMonth = getMonth__default['default'](startDate);
  var endDateYear = getYear__default['default'](endDate);
  var endDateMonth = getMonth__default['default'](endDate);
  var dayYear = getYear__default['default'](day);

  if (startDateYear === endDateYear && startDateYear === dayYear) {
    return startDateMonth <= m && m <= endDateMonth;
  } else if (startDateYear < endDateYear) {
    return dayYear === startDateYear && startDateMonth <= m || dayYear === endDateYear && endDateMonth >= m || dayYear < endDateYear && dayYear > startDateYear;
  }
}
function isQuarterDisabled(quarter) {
  var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      minDate = _ref6.minDate,
      maxDate = _ref6.maxDate,
      excludeDates = _ref6.excludeDates,
      includeDates = _ref6.includeDates,
      filterDate = _ref6.filterDate;

  return isOutOfBounds(quarter, {
    minDate: minDate,
    maxDate: maxDate
  }) || excludeDates && excludeDates.some(function (excludeDate) {
    return isSameQuarter(quarter, excludeDate);
  }) || includeDates && !includeDates.some(function (includeDate) {
    return isSameQuarter(quarter, includeDate);
  }) || filterDate && !filterDate(newDate(quarter)) || false;
}
function isYearDisabled(year) {
  var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      minDate = _ref7.minDate,
      maxDate = _ref7.maxDate;

  var date = new Date(year, 0, 1);
  return isOutOfBounds(date, {
    minDate: minDate,
    maxDate: maxDate
  }) || false;
}
function isQuarterInRange(startDate, endDate, q, day) {
  var startDateYear = getYear__default['default'](startDate);
  var startDateQuarter = getQuarter__default['default'](startDate);
  var endDateYear = getYear__default['default'](endDate);
  var endDateQuarter = getQuarter__default['default'](endDate);
  var dayYear = getYear__default['default'](day);

  if (startDateYear === endDateYear && startDateYear === dayYear) {
    return startDateQuarter <= q && q <= endDateQuarter;
  } else if (startDateYear < endDateYear) {
    return dayYear === startDateYear && startDateQuarter <= q || dayYear === endDateYear && endDateQuarter >= q || dayYear < endDateYear && dayYear > startDateYear;
  }
}
function isOutOfBounds(day) {
  var _ref8 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      minDate = _ref8.minDate,
      maxDate = _ref8.maxDate;

  return minDate && differenceInCalendarDays__default['default'](day, minDate) < 0 || maxDate && differenceInCalendarDays__default['default'](day, maxDate) > 0;
}
function isTimeDisabled(time, disabledTimes) {
  var l = disabledTimes.length;

  for (var i = 0; i < l; i++) {
    if (getHours__default['default'](disabledTimes[i]) === getHours__default['default'](time) && getMinutes__default['default'](disabledTimes[i]) === getMinutes__default['default'](time)) {
      return true;
    }
  }

  return false;
}
function isTimeInDisabledRange(time, _ref9) {
  var minTime = _ref9.minTime,
      maxTime = _ref9.maxTime;

  if (!minTime || !maxTime) {
    throw new Error("Both minTime and maxTime props required");
  }

  var base = newDate();
  var baseTime = setHours__default['default'](setMinutes__default['default'](base, getMinutes__default['default'](time)), getHours__default['default'](time));
  var min = setHours__default['default'](setMinutes__default['default'](base, getMinutes__default['default'](minTime)), getHours__default['default'](minTime));
  var max = setHours__default['default'](setMinutes__default['default'](base, getMinutes__default['default'](maxTime)), getHours__default['default'](maxTime));
  var valid;

  try {
    valid = !isWithinInterval__default['default'](baseTime, {
      start: min,
      end: max
    });
  } catch (err) {
    valid = false;
  }

  return valid;
}
function monthDisabledBefore(day) {
  var _ref10 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      minDate = _ref10.minDate,
      includeDates = _ref10.includeDates;

  var previousMonth = subMonths__default['default'](day, 1);
  return minDate && differenceInCalendarMonths__default['default'](minDate, previousMonth) > 0 || includeDates && includeDates.every(function (includeDate) {
    return differenceInCalendarMonths__default['default'](includeDate, previousMonth) > 0;
  }) || false;
}
function monthDisabledAfter(day) {
  var _ref11 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      maxDate = _ref11.maxDate,
      includeDates = _ref11.includeDates;

  var nextMonth = addMonths__default['default'](day, 1);
  return maxDate && differenceInCalendarMonths__default['default'](nextMonth, maxDate) > 0 || includeDates && includeDates.every(function (includeDate) {
    return differenceInCalendarMonths__default['default'](nextMonth, includeDate) > 0;
  }) || false;
}
function yearDisabledBefore(day) {
  var _ref12 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      minDate = _ref12.minDate,
      includeDates = _ref12.includeDates;

  var previousYear = subYears__default['default'](day, 1);
  return minDate && differenceInCalendarYears__default['default'](minDate, previousYear) > 0 || includeDates && includeDates.every(function (includeDate) {
    return differenceInCalendarYears__default['default'](includeDate, previousYear) > 0;
  }) || false;
}
function yearsDisabledBefore(day) {
  var _ref13 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      minDate = _ref13.minDate,
      _ref13$yearItemNumber = _ref13.yearItemNumber,
      yearItemNumber = _ref13$yearItemNumber === void 0 ? DEFAULT_YEAR_ITEM_NUMBER : _ref13$yearItemNumber;

  var previousYear = getStartOfYear(subYears__default['default'](day, yearItemNumber));

  var _getYearsPeriod = getYearsPeriod(previousYear, yearItemNumber),
      endPeriod = _getYearsPeriod.endPeriod;

  var minDateYear = minDate && getYear__default['default'](minDate);
  return minDateYear && minDateYear > endPeriod || false;
}
function yearDisabledAfter(day) {
  var _ref14 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      maxDate = _ref14.maxDate,
      includeDates = _ref14.includeDates;

  var nextYear = addYears__default['default'](day, 1);
  return maxDate && differenceInCalendarYears__default['default'](nextYear, maxDate) > 0 || includeDates && includeDates.every(function (includeDate) {
    return differenceInCalendarYears__default['default'](nextYear, includeDate) > 0;
  }) || false;
}
function yearsDisabledAfter(day) {
  var _ref15 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      maxDate = _ref15.maxDate,
      _ref15$yearItemNumber = _ref15.yearItemNumber,
      yearItemNumber = _ref15$yearItemNumber === void 0 ? DEFAULT_YEAR_ITEM_NUMBER : _ref15$yearItemNumber;

  var nextYear = addYears__default['default'](day, yearItemNumber);

  var _getYearsPeriod2 = getYearsPeriod(nextYear, yearItemNumber),
      startPeriod = _getYearsPeriod2.startPeriod;

  var maxDateYear = maxDate && getYear__default['default'](maxDate);
  return maxDateYear && maxDateYear < startPeriod || false;
}
function getEffectiveMinDate(_ref16) {
  var minDate = _ref16.minDate,
      includeDates = _ref16.includeDates;

  if (includeDates && minDate) {
    var minDates = includeDates.filter(function (includeDate) {
      return differenceInCalendarDays__default['default'](includeDate, minDate) >= 0;
    });
    return min__default['default'](minDates);
  } else if (includeDates) {
    return min__default['default'](includeDates);
  } else {
    return minDate;
  }
}
function getEffectiveMaxDate(_ref17) {
  var maxDate = _ref17.maxDate,
      includeDates = _ref17.includeDates;

  if (includeDates && maxDate) {
    var maxDates = includeDates.filter(function (includeDate) {
      return differenceInCalendarDays__default['default'](includeDate, maxDate) <= 0;
    });
    return max__default['default'](maxDates);
  } else if (includeDates) {
    return max__default['default'](includeDates);
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

    if (isDate__default['default'](obj)) {
      var key = formatDate(obj, "MM.dd.yyyy");
      var classNamesArr = dateClasses.get(key) || [];

      if (!classNamesArr.includes(defaultClassName)) {
        classNamesArr.push(defaultClassName);
        dateClasses.set(key, classNamesArr);
      }
    } else if (_typeof(obj) === "object") {
      var keys = Object.keys(obj);
      var className = keys[0];
      var arrOfDates = obj[keys[0]];

      if (typeof className === "string" && arrOfDates.constructor === Array) {
        for (var k = 0, _len = arrOfDates.length; k < _len; k++) {
          var _key = formatDate(arrOfDates[k], "MM.dd.yyyy");

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
    var injectedTime = addMinutes__default['default'](addHours__default['default'](startOfDay, getHours__default['default'](injectedTimes[i])), getMinutes__default['default'](injectedTimes[i]));
    var nextTime = addMinutes__default['default'](startOfDay, (currentMultiplier + 1) * intervals);

    if (isAfter__default['default'](injectedTime, currentTime) && isBefore__default['default'](injectedTime, nextTime)) {
      times.push(injectedTimes[i]);
    }
  }

  return times;
}
function addZero(i) {
  return i < 10 ? "0".concat(i) : "".concat(i);
}
function getYearsPeriod(date) {
  var yearItemNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_YEAR_ITEM_NUMBER;
  var endPeriod = Math.ceil(getYear__default['default'](date) / yearItemNumber) * yearItemNumber;
  var startPeriod = endPeriod - (yearItemNumber - 1);
  return {
    startPeriod: startPeriod,
    endPeriod: endPeriod
  };
}

function generateYears(year, noOfYear, minDate, maxDate) {
  var list = [];

  for (var i = 0; i < 2 * noOfYear + 1; i++) {
    var newYear = year + noOfYear - i;
    var isInRange = true;

    if (minDate) {
      isInRange = getYear__default['default'](minDate) <= newYear;
    }

    if (maxDate && isInRange) {
      isInRange = getYear__default['default'](maxDate) >= newYear;
    }

    if (isInRange) {
      list.push(newYear);
    }
  }

  return list;
}

var YearDropdownOptions = /*#__PURE__*/function (_React$Component) {
  _inherits(YearDropdownOptions, _React$Component);

  var _super = _createSuper(YearDropdownOptions);

  function YearDropdownOptions(props) {
    var _this;

    _classCallCheck(this, YearDropdownOptions);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "renderOptions", function () {
      var selectedYear = _this.props.year;

      var options = _this.state.yearsList.map(function (year) {
        return /*#__PURE__*/React__default['default'].createElement("div", {
          className: selectedYear === year ? "react-datepicker__year-option react-datepicker__year-option--selected_year" : "react-datepicker__year-option",
          key: year,
          onClick: _this.onChange.bind(_assertThisInitialized(_this), year)
        }, selectedYear === year ? /*#__PURE__*/React__default['default'].createElement("span", {
          className: "react-datepicker__year-option--selected"
        }, "\u2713") : "", year);
      });

      var minYear = _this.props.minDate ? getYear__default['default'](_this.props.minDate) : null;
      var maxYear = _this.props.maxDate ? getYear__default['default'](_this.props.maxDate) : null;

      if (!maxYear || !_this.state.yearsList.find(function (year) {
        return year === maxYear;
      })) {
        options.unshift( /*#__PURE__*/React__default['default'].createElement("div", {
          className: "react-datepicker__year-option",
          key: "upcoming",
          onClick: _this.incrementYears
        }, /*#__PURE__*/React__default['default'].createElement("a", {
          className: "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming"
        })));
      }

      if (!minYear || !_this.state.yearsList.find(function (year) {
        return year === minYear;
      })) {
        options.push( /*#__PURE__*/React__default['default'].createElement("div", {
          className: "react-datepicker__year-option",
          key: "previous",
          onClick: _this.decrementYears
        }, /*#__PURE__*/React__default['default'].createElement("a", {
          className: "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous"
        })));
      }

      return options;
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (year) {
      _this.props.onChange(year);
    });

    _defineProperty(_assertThisInitialized(_this), "handleClickOutside", function () {
      _this.props.onCancel();
    });

    _defineProperty(_assertThisInitialized(_this), "shiftYears", function (amount) {
      var years = _this.state.yearsList.map(function (year) {
        return year + amount;
      });

      _this.setState({
        yearsList: years
      });
    });

    _defineProperty(_assertThisInitialized(_this), "incrementYears", function () {
      return _this.shiftYears(1);
    });

    _defineProperty(_assertThisInitialized(_this), "decrementYears", function () {
      return _this.shiftYears(-1);
    });

    var yearDropdownItemNumber = props.yearDropdownItemNumber,
        scrollableYearDropdown = props.scrollableYearDropdown;
    var noOfYear = yearDropdownItemNumber || (scrollableYearDropdown ? 10 : 5);
    _this.state = {
      yearsList: generateYears(_this.props.year, noOfYear, _this.props.minDate, _this.props.maxDate)
    };
    return _this;
  }

  _createClass(YearDropdownOptions, [{
    key: "render",
    value: function render() {
      var dropdownClass = classnames__default['default']({
        "react-datepicker__year-dropdown": true,
        "react-datepicker__year-dropdown--scrollable": this.props.scrollableYearDropdown
      });
      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: dropdownClass
      }, this.renderOptions());
    }
  }]);

  return YearDropdownOptions;
}(React__default['default'].Component);

var WrappedYearDropdownOptions = onClickOutside__default['default'](YearDropdownOptions);

var YearDropdown = /*#__PURE__*/function (_React$Component) {
  _inherits(YearDropdown, _React$Component);

  var _super = _createSuper(YearDropdown);

  function YearDropdown() {
    var _this;

    _classCallCheck(this, YearDropdown);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      dropdownVisible: false
    });

    _defineProperty(_assertThisInitialized(_this), "renderSelectOptions", function () {
      var minYear = _this.props.minDate ? getYear__default['default'](_this.props.minDate) : 1900;
      var maxYear = _this.props.maxDate ? getYear__default['default'](_this.props.maxDate) : 2100;
      var options = [];

      for (var i = minYear; i <= maxYear; i++) {
        options.push( /*#__PURE__*/React__default['default'].createElement("option", {
          key: i,
          value: i
        }, i));
      }

      return options;
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectChange", function (e) {
      _this.onChange(e.target.value);
    });

    _defineProperty(_assertThisInitialized(_this), "renderSelectMode", function () {
      return /*#__PURE__*/React__default['default'].createElement("select", {
        value: _this.props.year,
        className: "react-datepicker__year-select",
        onChange: _this.onSelectChange
      }, _this.renderSelectOptions());
    });

    _defineProperty(_assertThisInitialized(_this), "renderReadView", function (visible) {
      return /*#__PURE__*/React__default['default'].createElement("div", {
        key: "read",
        style: {
          visibility: visible ? "visible" : "hidden"
        },
        className: "react-datepicker__year-read-view",
        onClick: function onClick(event) {
          return _this.toggleDropdown(event);
        }
      }, /*#__PURE__*/React__default['default'].createElement("span", {
        className: "react-datepicker__year-read-view--down-arrow"
      }), /*#__PURE__*/React__default['default'].createElement("span", {
        className: "react-datepicker__year-read-view--selected-year"
      }, _this.props.year));
    });

    _defineProperty(_assertThisInitialized(_this), "renderDropdown", function () {
      return /*#__PURE__*/React__default['default'].createElement(WrappedYearDropdownOptions, {
        key: "dropdown",
        year: _this.props.year,
        onChange: _this.onChange,
        onCancel: _this.toggleDropdown,
        minDate: _this.props.minDate,
        maxDate: _this.props.maxDate,
        scrollableYearDropdown: _this.props.scrollableYearDropdown,
        yearDropdownItemNumber: _this.props.yearDropdownItemNumber
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderScrollMode", function () {
      var dropdownVisible = _this.state.dropdownVisible;
      var result = [_this.renderReadView(!dropdownVisible)];

      if (dropdownVisible) {
        result.unshift(_this.renderDropdown());
      }

      return result;
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (year) {
      _this.toggleDropdown();

      if (year === _this.props.year) return;

      _this.props.onChange(year);
    });

    _defineProperty(_assertThisInitialized(_this), "toggleDropdown", function (event) {
      _this.setState({
        dropdownVisible: !_this.state.dropdownVisible
      }, function () {
        if (_this.props.adjustDateOnChange) {
          _this.handleYearChange(_this.props.date, event);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleYearChange", function (date, event) {
      _this.onSelect(date, event);

      _this.setOpen();
    });

    _defineProperty(_assertThisInitialized(_this), "onSelect", function (date, event) {
      if (_this.props.onSelect) {
        _this.props.onSelect(date, event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setOpen", function () {
      if (_this.props.setOpen) {
        _this.props.setOpen(true);
      }
    });

    return _this;
  }

  _createClass(YearDropdown, [{
    key: "render",
    value: function render() {
      var renderedDropdown;

      switch (this.props.dropdownMode) {
        case "scroll":
          renderedDropdown = this.renderScrollMode();
          break;

        case "select":
          renderedDropdown = this.renderSelectMode();
          break;
      }

      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: "react-datepicker__year-dropdown-container react-datepicker__year-dropdown-container--".concat(this.props.dropdownMode)
      }, renderedDropdown);
    }
  }]);

  return YearDropdown;
}(React__default['default'].Component);

var MonthDropdownOptions = /*#__PURE__*/function (_React$Component) {
  _inherits(MonthDropdownOptions, _React$Component);

  var _super = _createSuper(MonthDropdownOptions);

  function MonthDropdownOptions() {
    var _this;

    _classCallCheck(this, MonthDropdownOptions);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "renderOptions", function () {
      return _this.props.monthNames.map(function (month, i) {
        return /*#__PURE__*/React__default['default'].createElement("div", {
          className: _this.props.month === i ? "react-datepicker__month-option react-datepicker__month-option--selected_month" : "react-datepicker__month-option",
          key: month,
          onClick: _this.onChange.bind(_assertThisInitialized(_this), i)
        }, _this.props.month === i ? /*#__PURE__*/React__default['default'].createElement("span", {
          className: "react-datepicker__month-option--selected"
        }, "\u2713") : "", month);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (month) {
      return _this.props.onChange(month);
    });

    _defineProperty(_assertThisInitialized(_this), "handleClickOutside", function () {
      return _this.props.onCancel();
    });

    return _this;
  }

  _createClass(MonthDropdownOptions, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: "react-datepicker__month-dropdown"
      }, this.renderOptions());
    }
  }]);

  return MonthDropdownOptions;
}(React__default['default'].Component);

var WrappedMonthDropdownOptions = onClickOutside__default['default'](MonthDropdownOptions);

var MonthDropdown = /*#__PURE__*/function (_React$Component) {
  _inherits(MonthDropdown, _React$Component);

  var _super = _createSuper(MonthDropdown);

  function MonthDropdown() {
    var _this;

    _classCallCheck(this, MonthDropdown);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      dropdownVisible: false
    });

    _defineProperty(_assertThisInitialized(_this), "renderSelectOptions", function (monthNames) {
      return monthNames.map(function (M, i) {
        return /*#__PURE__*/React__default['default'].createElement("option", {
          key: i,
          value: i
        }, M);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderSelectMode", function (monthNames) {
      return /*#__PURE__*/React__default['default'].createElement("select", {
        value: _this.props.month,
        className: "react-datepicker__month-select",
        onChange: function onChange(e) {
          return _this.onChange(e.target.value);
        }
      }, _this.renderSelectOptions(monthNames));
    });

    _defineProperty(_assertThisInitialized(_this), "renderReadView", function (visible, monthNames) {
      return /*#__PURE__*/React__default['default'].createElement("div", {
        key: "read",
        style: {
          visibility: visible ? "visible" : "hidden"
        },
        className: "react-datepicker__month-read-view",
        onClick: _this.toggleDropdown
      }, /*#__PURE__*/React__default['default'].createElement("span", {
        className: "react-datepicker__month-read-view--down-arrow"
      }), /*#__PURE__*/React__default['default'].createElement("span", {
        className: "react-datepicker__month-read-view--selected-month"
      }, monthNames[_this.props.month]));
    });

    _defineProperty(_assertThisInitialized(_this), "renderDropdown", function (monthNames) {
      return /*#__PURE__*/React__default['default'].createElement(WrappedMonthDropdownOptions, {
        key: "dropdown",
        month: _this.props.month,
        monthNames: monthNames,
        onChange: _this.onChange,
        onCancel: _this.toggleDropdown
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderScrollMode", function (monthNames) {
      var dropdownVisible = _this.state.dropdownVisible;
      var result = [_this.renderReadView(!dropdownVisible, monthNames)];

      if (dropdownVisible) {
        result.unshift(_this.renderDropdown(monthNames));
      }

      return result;
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (month) {
      _this.toggleDropdown();

      if (month !== _this.props.month) {
        _this.props.onChange(month);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "toggleDropdown", function () {
      return _this.setState({
        dropdownVisible: !_this.state.dropdownVisible
      });
    });

    return _this;
  }

  _createClass(MonthDropdown, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var monthNames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(this.props.useShortMonthInDropdown ? function (M) {
        return getMonthShortInLocale(M, _this2.props.locale);
      } : function (M) {
        return getMonthInLocale(M, _this2.props.locale);
      });
      var renderedDropdown;

      switch (this.props.dropdownMode) {
        case "scroll":
          renderedDropdown = this.renderScrollMode(monthNames);
          break;

        case "select":
          renderedDropdown = this.renderSelectMode(monthNames);
          break;
      }

      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: "react-datepicker__month-dropdown-container react-datepicker__month-dropdown-container--".concat(this.props.dropdownMode)
      }, renderedDropdown);
    }
  }]);

  return MonthDropdown;
}(React__default['default'].Component);

function generateMonthYears(minDate, maxDate) {
  var list = [];
  var currDate = getStartOfMonth(minDate);
  var lastDate = getStartOfMonth(maxDate);

  while (!isAfter__default['default'](currDate, lastDate)) {
    list.push(newDate(currDate));
    currDate = addMonths__default['default'](currDate, 1);
  }

  return list;
}

var MonthYearDropdownOptions = /*#__PURE__*/function (_React$Component) {
  _inherits(MonthYearDropdownOptions, _React$Component);

  var _super = _createSuper(MonthYearDropdownOptions);

  function MonthYearDropdownOptions(props) {
    var _this;

    _classCallCheck(this, MonthYearDropdownOptions);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "renderOptions", function () {
      return _this.state.monthYearsList.map(function (monthYear) {
        var monthYearPoint = getTime__default['default'](monthYear);
        var isSameMonthYear = isSameYear(_this.props.date, monthYear) && isSameMonth(_this.props.date, monthYear);
        return /*#__PURE__*/React__default['default'].createElement("div", {
          className: isSameMonthYear ? "react-datepicker__month-year-option --selected_month-year" : "react-datepicker__month-year-option",
          key: monthYearPoint,
          onClick: _this.onChange.bind(_assertThisInitialized(_this), monthYearPoint)
        }, isSameMonthYear ? /*#__PURE__*/React__default['default'].createElement("span", {
          className: "react-datepicker__month-year-option--selected"
        }, "\u2713") : "", formatDate(monthYear, _this.props.dateFormat));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (monthYear) {
      return _this.props.onChange(monthYear);
    });

    _defineProperty(_assertThisInitialized(_this), "handleClickOutside", function () {
      _this.props.onCancel();
    });

    _this.state = {
      monthYearsList: generateMonthYears(_this.props.minDate, _this.props.maxDate)
    };
    return _this;
  }

  _createClass(MonthYearDropdownOptions, [{
    key: "render",
    value: function render() {
      var dropdownClass = classnames__default['default']({
        "react-datepicker__month-year-dropdown": true,
        "react-datepicker__month-year-dropdown--scrollable": this.props.scrollableMonthYearDropdown
      });
      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: dropdownClass
      }, this.renderOptions());
    }
  }]);

  return MonthYearDropdownOptions;
}(React__default['default'].Component);

var WrappedMonthYearDropdownOptions = onClickOutside__default['default'](MonthYearDropdownOptions);

var MonthYearDropdown = /*#__PURE__*/function (_React$Component) {
  _inherits(MonthYearDropdown, _React$Component);

  var _super = _createSuper(MonthYearDropdown);

  function MonthYearDropdown() {
    var _this;

    _classCallCheck(this, MonthYearDropdown);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      dropdownVisible: false
    });

    _defineProperty(_assertThisInitialized(_this), "renderSelectOptions", function () {
      var currDate = getStartOfMonth(_this.props.minDate);
      var lastDate = getStartOfMonth(_this.props.maxDate);
      var options = [];

      while (!isAfter__default['default'](currDate, lastDate)) {
        var timepoint = getTime__default['default'](currDate);
        options.push( /*#__PURE__*/React__default['default'].createElement("option", {
          key: timepoint,
          value: timepoint
        }, formatDate(currDate, _this.props.dateFormat, _this.props.locale)));
        currDate = addMonths__default['default'](currDate, 1);
      }

      return options;
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectChange", function (e) {
      _this.onChange(e.target.value);
    });

    _defineProperty(_assertThisInitialized(_this), "renderSelectMode", function () {
      return /*#__PURE__*/React__default['default'].createElement("select", {
        value: getTime__default['default'](getStartOfMonth(_this.props.date)),
        className: "react-datepicker__month-year-select",
        onChange: _this.onSelectChange
      }, _this.renderSelectOptions());
    });

    _defineProperty(_assertThisInitialized(_this), "renderReadView", function (visible) {
      var yearMonth = formatDate(_this.props.date, _this.props.dateFormat, _this.props.locale);
      return /*#__PURE__*/React__default['default'].createElement("div", {
        key: "read",
        style: {
          visibility: visible ? "visible" : "hidden"
        },
        className: "react-datepicker__month-year-read-view",
        onClick: function onClick(event) {
          return _this.toggleDropdown(event);
        }
      }, /*#__PURE__*/React__default['default'].createElement("span", {
        className: "react-datepicker__month-year-read-view--down-arrow"
      }), /*#__PURE__*/React__default['default'].createElement("span", {
        className: "react-datepicker__month-year-read-view--selected-month-year"
      }, yearMonth));
    });

    _defineProperty(_assertThisInitialized(_this), "renderDropdown", function () {
      return /*#__PURE__*/React__default['default'].createElement(WrappedMonthYearDropdownOptions, {
        key: "dropdown",
        date: _this.props.date,
        dateFormat: _this.props.dateFormat,
        onChange: _this.onChange,
        onCancel: _this.toggleDropdown,
        minDate: _this.props.minDate,
        maxDate: _this.props.maxDate,
        scrollableMonthYearDropdown: _this.props.scrollableMonthYearDropdown
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderScrollMode", function () {
      var dropdownVisible = _this.state.dropdownVisible;
      var result = [_this.renderReadView(!dropdownVisible)];

      if (dropdownVisible) {
        result.unshift(_this.renderDropdown());
      }

      return result;
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (monthYearPoint) {
      _this.toggleDropdown();

      var changedDate = newDate(parseInt(monthYearPoint));

      if (isSameYear(_this.props.date, changedDate) && isSameMonth(_this.props.date, changedDate)) {
        return;
      }

      _this.props.onChange(changedDate);
    });

    _defineProperty(_assertThisInitialized(_this), "toggleDropdown", function () {
      return _this.setState({
        dropdownVisible: !_this.state.dropdownVisible
      });
    });

    return _this;
  }

  _createClass(MonthYearDropdown, [{
    key: "render",
    value: function render() {
      var renderedDropdown;

      switch (this.props.dropdownMode) {
        case "scroll":
          renderedDropdown = this.renderScrollMode();
          break;

        case "select":
          renderedDropdown = this.renderSelectMode();
          break;
      }

      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: "react-datepicker__month-year-dropdown-container react-datepicker__month-year-dropdown-container--".concat(this.props.dropdownMode)
      }, renderedDropdown);
    }
  }]);

  return MonthYearDropdown;
}(React__default['default'].Component);

var Day = /*#__PURE__*/function (_React$Component) {
  _inherits(Day, _React$Component);

  var _super = _createSuper(Day);

  function Day() {
    var _this;

    _classCallCheck(this, Day);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "dayEl", /*#__PURE__*/React__default['default'].createRef());

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (event) {
      if (!_this.isDisabled() && _this.props.onClick) {
        _this.props.onClick(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseEnter", function (event) {
      if (!_this.isDisabled() && _this.props.onMouseEnter) {
        _this.props.onMouseEnter(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleOnKeyDown", function (event) {
      var eventKey = event.key;

      if (eventKey === " ") {
        event.preventDefault();
        event.key = "Enter";
      }

      _this.props.handleOnKeyDown(event);
    });

    _defineProperty(_assertThisInitialized(_this), "isSameDay", function (other) {
      return isSameDay(_this.props.day, other);
    });

    _defineProperty(_assertThisInitialized(_this), "isKeyboardSelected", function () {
      return !_this.props.disabledKeyboardNavigation && !_this.isSameDay(_this.props.selected) && _this.isSameDay(_this.props.preSelection);
    });

    _defineProperty(_assertThisInitialized(_this), "isDisabled", function () {
      return isDayDisabled(_this.props.day, _this.props);
    });

    _defineProperty(_assertThisInitialized(_this), "isExcluded", function () {
      return isDayExcluded(_this.props.day, _this.props);
    });

    _defineProperty(_assertThisInitialized(_this), "getHighLightedClass", function (defaultClassName) {
      var _this$props = _this.props,
          day = _this$props.day,
          highlightDates = _this$props.highlightDates;

      if (!highlightDates) {
        return false;
      } // Looking for className in the Map of {'day string, 'className'}


      var dayStr = formatDate(day, "MM.dd.yyyy");
      return highlightDates.get(dayStr);
    });

    _defineProperty(_assertThisInitialized(_this), "isInRange", function () {
      var _this$props2 = _this.props,
          day = _this$props2.day,
          startDate = _this$props2.startDate,
          endDate = _this$props2.endDate;

      if (!startDate || !endDate) {
        return false;
      }

      return isDayInRange(day, startDate, endDate);
    });

    _defineProperty(_assertThisInitialized(_this), "isInSelectingRange", function () {
      var _this$props3 = _this.props,
          day = _this$props3.day,
          selectsStart = _this$props3.selectsStart,
          selectsEnd = _this$props3.selectsEnd,
          selectsRange = _this$props3.selectsRange,
          selectingDate = _this$props3.selectingDate,
          startDate = _this$props3.startDate,
          endDate = _this$props3.endDate;

      if (!(selectsStart || selectsEnd || selectsRange) || !selectingDate || _this.isDisabled()) {
        return false;
      }

      if (selectsStart && endDate && (isBefore__default['default'](selectingDate, endDate) || isEqual(selectingDate, endDate))) {
        return isDayInRange(day, selectingDate, endDate);
      }

      if (selectsEnd && startDate && (isAfter__default['default'](selectingDate, startDate) || isEqual(selectingDate, startDate))) {
        return isDayInRange(day, startDate, selectingDate);
      }

      if (selectsRange && startDate && !endDate && (isAfter__default['default'](selectingDate, startDate) || isEqual(selectingDate, startDate))) {
        return isDayInRange(day, startDate, selectingDate);
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "isSelectingRangeStart", function () {
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
    });

    _defineProperty(_assertThisInitialized(_this), "isSelectingRangeEnd", function () {
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
    });

    _defineProperty(_assertThisInitialized(_this), "isRangeStart", function () {
      var _this$props6 = _this.props,
          day = _this$props6.day,
          startDate = _this$props6.startDate,
          endDate = _this$props6.endDate;

      if (!startDate || !endDate) {
        return false;
      }

      return isSameDay(startDate, day);
    });

    _defineProperty(_assertThisInitialized(_this), "isRangeEnd", function () {
      var _this$props7 = _this.props,
          day = _this$props7.day,
          startDate = _this$props7.startDate,
          endDate = _this$props7.endDate;

      if (!startDate || !endDate) {
        return false;
      }

      return isSameDay(endDate, day);
    });

    _defineProperty(_assertThisInitialized(_this), "isWeekend", function () {
      var weekday = getDay__default['default'](_this.props.day);
      return weekday === 0 || weekday === 6;
    });

    _defineProperty(_assertThisInitialized(_this), "isOutsideMonth", function () {
      return _this.props.month !== undefined && _this.props.month !== getMonth__default['default'](_this.props.day);
    });

    _defineProperty(_assertThisInitialized(_this), "getClassNames", function (date) {
      var dayClassName = _this.props.dayClassName ? _this.props.dayClassName(date) : undefined;
      return classnames__default['default']("react-datepicker__day", dayClassName, "react-datepicker__day--" + getDayOfWeekCode(_this.props.day), {
        "react-datepicker__day--disabled": _this.isDisabled(),
        "react-datepicker__day--excluded": _this.isExcluded(),
        "react-datepicker__day--selected": _this.isSameDay(_this.props.selected),
        "react-datepicker__day--keyboard-selected": _this.isKeyboardSelected(),
        "react-datepicker__day--range-start": _this.isRangeStart(),
        "react-datepicker__day--range-end": _this.isRangeEnd(),
        "react-datepicker__day--in-range": _this.isInRange(),
        "react-datepicker__day--in-selecting-range": _this.isInSelectingRange(),
        "react-datepicker__day--selecting-range-start": _this.isSelectingRangeStart(),
        "react-datepicker__day--selecting-range-end": _this.isSelectingRangeEnd(),
        "react-datepicker__day--today": _this.isSameDay(newDate()),
        "react-datepicker__day--weekend": _this.isWeekend(),
        "react-datepicker__day--outside-month": _this.isOutsideMonth()
      }, _this.getHighLightedClass("react-datepicker__day--highlighted"));
    });

    _defineProperty(_assertThisInitialized(_this), "getAriaLabel", function () {
      var _this$props8 = _this.props,
          day = _this$props8.day,
          _this$props8$ariaLabe = _this$props8.ariaLabelPrefixWhenEnabled,
          ariaLabelPrefixWhenEnabled = _this$props8$ariaLabe === void 0 ? "Choose" : _this$props8$ariaLabe,
          _this$props8$ariaLabe2 = _this$props8.ariaLabelPrefixWhenDisabled,
          ariaLabelPrefixWhenDisabled = _this$props8$ariaLabe2 === void 0 ? "Not available" : _this$props8$ariaLabe2;
      var prefix = _this.isDisabled() || _this.isExcluded() ? ariaLabelPrefixWhenDisabled : ariaLabelPrefixWhenEnabled;
      return "".concat(prefix, " ").concat(formatDate(day, "PPPP"));
    });

    _defineProperty(_assertThisInitialized(_this), "getTabIndex", function (selected, preSelection) {
      var selectedDay = selected || _this.props.selected;
      var preSelectionDay = preSelection || _this.props.preSelection;
      var tabIndex = _this.isKeyboardSelected() || _this.isSameDay(selectedDay) && isSameDay(preSelectionDay, selectedDay) ? 0 : -1;
      return tabIndex;
    });

    _defineProperty(_assertThisInitialized(_this), "handleFocusDay", function () {
      var prevProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var shouldFocusDay = false; // only do this while the input isn't focused
      // otherwise, typing/backspacing the date manually may steal focus away from the input

      if (_this.getTabIndex() === 0 && !prevProps.isInputFocused && _this.isSameDay(_this.props.preSelection)) {
        // there is currently no activeElement
        if (!document.activeElement || document.activeElement === document.body) {
          shouldFocusDay = true;
        } // the activeElement is in the container, and it is another instance of Day


        if (_this.props.containerRef && _this.props.containerRef.current && _this.props.containerRef.current.contains(document.activeElement) && document.activeElement.classList.contains("react-datepicker__day")) {
          shouldFocusDay = true;
        }
      }

      shouldFocusDay && _this.dayEl.current.focus({
        preventScroll: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      return /*#__PURE__*/React__default['default'].createElement("div", {
        ref: _this.dayEl,
        className: _this.getClassNames(_this.props.day),
        onKeyDown: _this.handleOnKeyDown,
        onClick: _this.handleClick,
        onMouseEnter: _this.handleMouseEnter,
        tabIndex: _this.getTabIndex(),
        "aria-label": _this.getAriaLabel(),
        role: "button",
        "aria-disabled": _this.isDisabled()
      }, _this.props.renderDayContents ? _this.props.renderDayContents(getDate__default['default'](_this.props.day), _this.props.day) : getDate__default['default'](_this.props.day));
    });

    return _this;
  }

  _createClass(Day, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.handleFocusDay();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      this.handleFocusDay(prevProps);
    }
  }]);

  return Day;
}(React__default['default'].Component);

var WeekNumber = /*#__PURE__*/function (_React$Component) {
  _inherits(WeekNumber, _React$Component);

  var _super = _createSuper(WeekNumber);

  function WeekNumber() {
    var _this;

    _classCallCheck(this, WeekNumber);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (event) {
      if (_this.props.onClick) {
        _this.props.onClick(event);
      }
    });

    return _this;
  }

  _createClass(WeekNumber, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          weekNumber = _this$props.weekNumber,
          _this$props$ariaLabel = _this$props.ariaLabelPrefix,
          ariaLabelPrefix = _this$props$ariaLabel === void 0 ? "week " : _this$props$ariaLabel,
          onClick = _this$props.onClick;
      var weekNumberClasses = {
        "react-datepicker__week-number": true,
        "react-datepicker__week-number--clickable": !!onClick
      };
      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: classnames__default['default'](weekNumberClasses),
        "aria-label": "".concat(ariaLabelPrefix, " ").concat(this.props.weekNumber),
        onClick: this.handleClick
      }, weekNumber);
    }
  }]);

  return WeekNumber;
}(React__default['default'].Component);

var Week = /*#__PURE__*/function (_React$Component) {
  _inherits(Week, _React$Component);

  var _super = _createSuper(Week);

  function Week() {
    var _this;

    _classCallCheck(this, Week);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "handleDayClick", function (day, event) {
      if (_this.props.onDayClick) {
        _this.props.onDayClick(day, event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleDayMouseEnter", function (day) {
      if (_this.props.onDayMouseEnter) {
        _this.props.onDayMouseEnter(day);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleWeekClick", function (day, weekNumber, event) {
      if (typeof _this.props.onWeekSelect === "function") {
        _this.props.onWeekSelect(day, weekNumber, event);
      }

      if (_this.props.shouldCloseOnSelect) {
        _this.props.setOpen(false);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "formatWeekNumber", function (date) {
      if (_this.props.formatWeekNumber) {
        return _this.props.formatWeekNumber(date);
      }

      return getWeek(date, _this.props.locale);
    });

    _defineProperty(_assertThisInitialized(_this), "renderDays", function () {
      var startOfWeek = getStartOfWeek(_this.props.day, _this.props.locale);
      var days = [];

      var weekNumber = _this.formatWeekNumber(startOfWeek);

      if (_this.props.showWeekNumber) {
        var onClickAction = _this.props.onWeekSelect ? _this.handleWeekClick.bind(_assertThisInitialized(_this), startOfWeek, weekNumber) : undefined;
        days.push( /*#__PURE__*/React__default['default'].createElement(WeekNumber, {
          key: "W",
          weekNumber: weekNumber,
          onClick: onClickAction,
          ariaLabelPrefix: _this.props.ariaLabelPrefix
        }));
      }

      return days.concat([0, 1, 2, 3, 4, 5, 6].map(function (offset) {
        var day = utils__default$2['default'](startOfWeek, offset);
        return /*#__PURE__*/React__default['default'].createElement(Day, {
          ariaLabelPrefixWhenEnabled: _this.props.chooseDayAriaLabelPrefix,
          ariaLabelPrefixWhenDisabled: _this.props.disabledDayAriaLabelPrefix,
          key: day.valueOf(),
          day: day,
          month: _this.props.month,
          onClick: _this.handleDayClick.bind(_assertThisInitialized(_this), day),
          onMouseEnter: _this.handleDayMouseEnter.bind(_assertThisInitialized(_this), day),
          minDate: _this.props.minDate,
          maxDate: _this.props.maxDate,
          excludeDates: _this.props.excludeDates,
          includeDates: _this.props.includeDates,
          highlightDates: _this.props.highlightDates,
          selectingDate: _this.props.selectingDate,
          filterDate: _this.props.filterDate,
          preSelection: _this.props.preSelection,
          selected: _this.props.selected,
          selectsStart: _this.props.selectsStart,
          selectsEnd: _this.props.selectsEnd,
          selectsRange: _this.props.selectsRange,
          startDate: _this.props.startDate,
          endDate: _this.props.endDate,
          dayClassName: _this.props.dayClassName,
          renderDayContents: _this.props.renderDayContents,
          disabledKeyboardNavigation: _this.props.disabledKeyboardNavigation,
          handleOnKeyDown: _this.props.handleOnKeyDown,
          isInputFocused: _this.props.isInputFocused,
          containerRef: _this.props.containerRef
        });
      }));
    });

    return _this;
  }

  _createClass(Week, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: "react-datepicker__week"
      }, this.renderDays());
    }
  }], [{
    key: "defaultProps",
    get: function get() {
      return {
        shouldCloseOnSelect: true
      };
    }
  }]);

  return Week;
}(React__default['default'].Component);

var FIXED_HEIGHT_STANDARD_WEEK_COUNT = 6;

var Month = /*#__PURE__*/function (_React$Component) {
  _inherits(Month, _React$Component);

  var _super = _createSuper(Month);

  function Month() {
    var _this;

    _classCallCheck(this, Month);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "handleDayClick", function (day, event) {
      if (_this.props.onDayClick) {
        _this.props.onDayClick(day, event, _this.props.orderInDisplay);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleDayMouseEnter", function (day) {
      if (_this.props.onDayMouseEnter) {
        _this.props.onDayMouseEnter(day);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseLeave", function () {
      if (_this.props.onMouseLeave) {
        _this.props.onMouseLeave();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "isRangeStartMonth", function (m) {
      var _this$props = _this.props,
          day = _this$props.day,
          startDate = _this$props.startDate,
          endDate = _this$props.endDate;

      if (!startDate || !endDate) {
        return false;
      }

      return isSameMonth(utils__default['default'](day, m), startDate);
    });

    _defineProperty(_assertThisInitialized(_this), "isRangeStartQuarter", function (q) {
      var _this$props2 = _this.props,
          day = _this$props2.day,
          startDate = _this$props2.startDate,
          endDate = _this$props2.endDate;

      if (!startDate || !endDate) {
        return false;
      }

      return isSameQuarter(utils__default$1['default'](day, q), startDate);
    });

    _defineProperty(_assertThisInitialized(_this), "isRangeEndMonth", function (m) {
      var _this$props3 = _this.props,
          day = _this$props3.day,
          startDate = _this$props3.startDate,
          endDate = _this$props3.endDate;

      if (!startDate || !endDate) {
        return false;
      }

      return isSameMonth(utils__default['default'](day, m), endDate);
    });

    _defineProperty(_assertThisInitialized(_this), "isRangeEndQuarter", function (q) {
      var _this$props4 = _this.props,
          day = _this$props4.day,
          startDate = _this$props4.startDate,
          endDate = _this$props4.endDate;

      if (!startDate || !endDate) {
        return false;
      }

      return isSameQuarter(utils__default$1['default'](day, q), endDate);
    });

    _defineProperty(_assertThisInitialized(_this), "isWeekInMonth", function (startOfWeek) {
      var day = _this.props.day;
      var endOfWeek = utils__default$2['default'](startOfWeek, 6);
      return isSameMonth(startOfWeek, day) || isSameMonth(endOfWeek, day);
    });

    _defineProperty(_assertThisInitialized(_this), "renderWeeks", function () {
      var weeks = [];
      var isFixedHeight = _this.props.fixedHeight;
      var currentWeekStart = getStartOfWeek(getStartOfMonth(_this.props.day), _this.props.locale);
      var i = 0;
      var breakAfterNextPush = false;

      while (true) {
        weeks.push( /*#__PURE__*/React__default['default'].createElement(Week, {
          ariaLabelPrefix: _this.props.weekAriaLabelPrefix,
          chooseDayAriaLabelPrefix: _this.props.chooseDayAriaLabelPrefix,
          disabledDayAriaLabelPrefix: _this.props.disabledDayAriaLabelPrefix,
          key: i,
          day: currentWeekStart,
          month: getMonth__default['default'](_this.props.day),
          onDayClick: _this.handleDayClick,
          onDayMouseEnter: _this.handleDayMouseEnter,
          onWeekSelect: _this.props.onWeekSelect,
          formatWeekNumber: _this.props.formatWeekNumber,
          locale: _this.props.locale,
          minDate: _this.props.minDate,
          maxDate: _this.props.maxDate,
          excludeDates: _this.props.excludeDates,
          includeDates: _this.props.includeDates,
          highlightDates: _this.props.highlightDates,
          selectingDate: _this.props.selectingDate,
          filterDate: _this.props.filterDate,
          preSelection: _this.props.preSelection,
          selected: _this.props.selected,
          selectsStart: _this.props.selectsStart,
          selectsEnd: _this.props.selectsEnd,
          selectsRange: _this.props.selectsRange,
          showWeekNumber: _this.props.showWeekNumbers,
          startDate: _this.props.startDate,
          endDate: _this.props.endDate,
          dayClassName: _this.props.dayClassName,
          setOpen: _this.props.setOpen,
          shouldCloseOnSelect: _this.props.shouldCloseOnSelect,
          disabledKeyboardNavigation: _this.props.disabledKeyboardNavigation,
          renderDayContents: _this.props.renderDayContents,
          handleOnKeyDown: _this.props.handleOnKeyDown,
          isInputFocused: _this.props.isInputFocused,
          containerRef: _this.props.containerRef
        }));
        if (breakAfterNextPush) break;
        i++;
        currentWeekStart = utils__default$3['default'](currentWeekStart, 1); // If one of these conditions is true, we will either break on this week
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
    });

    _defineProperty(_assertThisInitialized(_this), "onMonthClick", function (e, m) {
      _this.handleDayClick(getStartOfMonth(utils__default['default'](_this.props.day, m)), e);
    });

    _defineProperty(_assertThisInitialized(_this), "onQuarterClick", function (e, q) {
      _this.handleDayClick(getStartOfQuarter(utils__default$1['default'](_this.props.day, q)), e);
    });

    _defineProperty(_assertThisInitialized(_this), "getMonthClassNames", function (m) {
      var _this$props5 = _this.props,
          day = _this$props5.day,
          startDate = _this$props5.startDate,
          endDate = _this$props5.endDate,
          selected = _this$props5.selected,
          minDate = _this$props5.minDate,
          maxDate = _this$props5.maxDate;
      return classnames__default['default']("react-datepicker__month-text", "react-datepicker__month-".concat(m), {
        "react-datepicker__month--disabled": (minDate || maxDate) && isMonthDisabled(utils__default['default'](day, m), _this.props),
        "react-datepicker__month--selected": getMonth__default['default'](day) === m && getYear__default['default'](day) === getYear__default['default'](selected),
        "react-datepicker__month--in-range": isMonthinRange(startDate, endDate, m, day),
        "react-datepicker__month--range-start": _this.isRangeStartMonth(m),
        "react-datepicker__month--range-end": _this.isRangeEndMonth(m)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getQuarterClassNames", function (q) {
      var _this$props6 = _this.props,
          day = _this$props6.day,
          startDate = _this$props6.startDate,
          endDate = _this$props6.endDate,
          selected = _this$props6.selected,
          minDate = _this$props6.minDate,
          maxDate = _this$props6.maxDate;
      return classnames__default['default']("react-datepicker__quarter-text", "react-datepicker__quarter-".concat(q), {
        "react-datepicker__quarter--disabled": (minDate || maxDate) && isQuarterDisabled(utils__default$1['default'](day, q), _this.props),
        "react-datepicker__quarter--selected": getQuarter__default['default'](day) === q && getYear__default['default'](day) === getYear__default['default'](selected),
        "react-datepicker__quarter--in-range": isQuarterInRange(startDate, endDate, q, day),
        "react-datepicker__quarter--range-start": _this.isRangeStartQuarter(q),
        "react-datepicker__quarter--range-end": _this.isRangeEndQuarter(q)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderMonths", function () {
      var _this$props7 = _this.props,
          showFullMonthYearPicker = _this$props7.showFullMonthYearPicker,
          showTwoColumnMonthYearPicker = _this$props7.showTwoColumnMonthYearPicker,
          locale = _this$props7.locale;
      var monthsThreeColumns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]];
      var monthsTwoColumns = [[0, 1], [2, 3], [4, 5], [6, 7], [8, 9], [10, 11]];
      var monthLayout = showTwoColumnMonthYearPicker ? monthsTwoColumns : monthsThreeColumns;
      return monthLayout.map(function (month, i) {
        return /*#__PURE__*/React__default['default'].createElement("div", {
          className: "react-datepicker__month-wrapper",
          key: i
        }, month.map(function (m, j) {
          return /*#__PURE__*/React__default['default'].createElement("div", {
            key: j,
            onClick: function onClick(ev) {
              _this.onMonthClick(ev, m);
            },
            className: _this.getMonthClassNames(m)
          }, showFullMonthYearPicker ? getMonthInLocale(m, locale) : getMonthShortInLocale(m, locale));
        }));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderQuarters", function () {
      var quarters = [1, 2, 3, 4];
      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: "react-datepicker__quarter-wrapper"
      }, quarters.map(function (q, j) {
        return /*#__PURE__*/React__default['default'].createElement("div", {
          key: j,
          onClick: function onClick(ev) {
            _this.onQuarterClick(ev, q);
          },
          className: _this.getQuarterClassNames(q)
        }, getQuarterShortInLocale(q, _this.props.locale));
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "getClassNames", function () {
      var _this$props8 = _this.props,
          selectingDate = _this$props8.selectingDate,
          selectsStart = _this$props8.selectsStart,
          selectsEnd = _this$props8.selectsEnd,
          showMonthYearPicker = _this$props8.showMonthYearPicker,
          showQuarterYearPicker = _this$props8.showQuarterYearPicker;
      return classnames__default['default']("react-datepicker__month", {
        "react-datepicker__month--selecting-range": selectingDate && (selectsStart || selectsEnd)
      }, {
        "react-datepicker__monthPicker": showMonthYearPicker
      }, {
        "react-datepicker__quarterPicker": showQuarterYearPicker
      });
    });

    return _this;
  }

  _createClass(Month, [{
    key: "render",
    value: function render() {
      var _this$props9 = this.props,
          showMonthYearPicker = _this$props9.showMonthYearPicker,
          showQuarterYearPicker = _this$props9.showQuarterYearPicker,
          day = _this$props9.day,
          _this$props9$ariaLabe = _this$props9.ariaLabelPrefix,
          ariaLabelPrefix = _this$props9$ariaLabe === void 0 ? "month " : _this$props9$ariaLabe;
      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: this.getClassNames(),
        onMouseLeave: this.handleMouseLeave,
        "aria-label": "".concat(ariaLabelPrefix, " ").concat(formatDate(day, "yyyy-MM"))
      }, showMonthYearPicker ? this.renderMonths() : showQuarterYearPicker ? this.renderQuarters() : this.renderWeeks());
    }
  }]);

  return Month;
}(React__default['default'].Component);

var Time = /*#__PURE__*/function (_React$Component) {
  _inherits(Time, _React$Component);

  var _super = _createSuper(Time);

  function Time() {
    var _this;

    _classCallCheck(this, Time);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      height: null
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (time) {
      if ((_this.props.minTime || _this.props.maxTime) && isTimeInDisabledRange(time, _this.props) || _this.props.excludeTimes && isTimeDisabled(time, _this.props.excludeTimes) || _this.props.includeTimes && !isTimeDisabled(time, _this.props.includeTimes)) {
        return;
      }

      _this.props.onChange(time);
    });

    _defineProperty(_assertThisInitialized(_this), "liClasses", function (time, currH, currM) {
      var classes = ["react-datepicker__time-list-item", _this.props.timeClassName ? _this.props.timeClassName(time, currH, currM) : undefined];

      if (_this.props.selected && currH === getHours__default['default'](time) && currM === getMinutes__default['default'](time)) {
        classes.push("react-datepicker__time-list-item--selected");
      }

      if ((_this.props.minTime || _this.props.maxTime) && isTimeInDisabledRange(time, _this.props) || _this.props.excludeTimes && isTimeDisabled(time, _this.props.excludeTimes) || _this.props.includeTimes && !isTimeDisabled(time, _this.props.includeTimes)) {
        classes.push("react-datepicker__time-list-item--disabled");
      }

      if (_this.props.injectTimes && (getHours__default['default'](time) * 60 + getMinutes__default['default'](time)) % _this.props.intervals !== 0) {
        classes.push("react-datepicker__time-list-item--injected");
      }

      return classes.join(" ");
    });

    _defineProperty(_assertThisInitialized(_this), "renderTimes", function () {
      var times = [];
      var format = _this.props.format ? _this.props.format : "p";
      var intervals = _this.props.intervals;
      var base = getStartOfDay(newDate());
      var multiplier = 1440 / intervals;

      var sortedInjectTimes = _this.props.injectTimes && _this.props.injectTimes.sort(function (a, b) {
        return a - b;
      });

      var activeDate = _this.props.selected || _this.props.openToDate || newDate();
      var currH = getHours__default['default'](activeDate);
      var currM = getMinutes__default['default'](activeDate);
      var activeTime = setHours__default['default'](setMinutes__default['default'](base, currM), currH);

      for (var i = 0; i < multiplier; i++) {
        var currentTime = addMinutes__default['default'](base, i * intervals);
        times.push(currentTime);

        if (sortedInjectTimes) {
          var timesToInject = timesToInjectAfter(base, currentTime, i, intervals, sortedInjectTimes);
          times = times.concat(timesToInject);
        }
      }

      return times.map(function (time, i) {
        return /*#__PURE__*/React__default['default'].createElement("li", {
          key: i,
          onClick: _this.handleClick.bind(_assertThisInitialized(_this), time),
          className: _this.liClasses(time, currH, currM),
          ref: function ref(li) {
            if (isBefore__default['default'](time, activeTime) || isEqual(time, activeTime)) {
              _this.centerLi = li;
            }
          }
        }, formatDate(time, format, _this.props.locale));
      });
    });

    return _this;
  }

  _createClass(Time, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // code to ensure selected time will always be in focus within time window when it first appears
      this.list.scrollTop = Time.calcCenterPosition(this.props.monthRef ? this.props.monthRef.clientHeight - this.header.clientHeight : this.list.clientHeight, this.centerLi);

      if (this.props.monthRef && this.header) {
        this.setState({
          height: this.props.monthRef.clientHeight - this.header.clientHeight
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var height = this.state.height;
      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: "react-datepicker__time-container ".concat(this.props.todayButton ? "react-datepicker__time-container--with-today-button" : "")
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        className: "react-datepicker__header react-datepicker__header--time ".concat(this.props.showTimeSelectOnly ? 'react-datepicker__header--time--only' : ''),
        ref: function ref(header) {
          _this2.header = header;
        }
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        className: "react-datepicker-time__header"
      }, this.props.timeCaption)), /*#__PURE__*/React__default['default'].createElement("div", {
        className: "react-datepicker__time"
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        className: "react-datepicker__time-box"
      }, /*#__PURE__*/React__default['default'].createElement("ul", {
        className: "react-datepicker__time-list",
        ref: function ref(list) {
          _this2.list = list;
        },
        style: height ? {
          height: height
        } : {}
      }, this.renderTimes()))));
    }
  }], [{
    key: "defaultProps",
    get: function get() {
      return {
        intervals: 30,
        onTimeChange: function onTimeChange() {},
        todayButton: null,
        timeCaption: "Time"
      };
    }
  }]);

  return Time;
}(React__default['default'].Component);

_defineProperty(Time, "calcCenterPosition", function (listHeight, centerLiRef) {
  return centerLiRef.offsetTop - (listHeight / 2 - centerLiRef.clientHeight / 2);
});

var Year = /*#__PURE__*/function (_React$Component) {
  _inherits(Year, _React$Component);

  var _super = _createSuper(Year);

  function Year(props) {
    var _this;

    _classCallCheck(this, Year);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleYearClick", function (day, event) {
      if (_this.props.onDayClick) {
        _this.props.onDayClick(day, event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "isSameDay", function (y, other) {
      return isSameDay(y, other);
    });

    _defineProperty(_assertThisInitialized(_this), "isKeyboardSelected", function (y) {
      var date = getStartOfYear(utils__default$4['default'](_this.props.date, y));
      return !_this.props.disabledKeyboardNavigation && !_this.props.inline && !isSameDay(date, getStartOfYear(_this.props.selected)) && isSameDay(date, getStartOfYear(_this.props.preSelection));
    });

    _defineProperty(_assertThisInitialized(_this), "onYearClick", function (e, y) {
      var date = _this.props.date;

      _this.handleYearClick(getStartOfYear(utils__default$4['default'](date, y)), e);
    });

    _defineProperty(_assertThisInitialized(_this), "getYearClassNames", function (y) {
      var _this$props = _this.props,
          minDate = _this$props.minDate,
          maxDate = _this$props.maxDate,
          selected = _this$props.selected;
      return classnames__default['default']("react-datepicker__year-text", {
        "react-datepicker__year-text--selected": y === getYear__default['default'](selected),
        "react-datepicker__year-text--disabled": (minDate || maxDate) && isYearDisabled(y, _this.props),
        "react-datepicker__year-text--keyboard-selected": _this.isKeyboardSelected(y),
        "react-datepicker__year-text--today": y === getYear__default['default'](newDate())
      });
    });

    return _this;
  }

  _createClass(Year, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var yearsList = [];
      var _this$props2 = this.props,
          date = _this$props2.date,
          yearItemNumber = _this$props2.yearItemNumber;

      var _utils$getYearsPeriod = getYearsPeriod(date, yearItemNumber),
          startPeriod = _utils$getYearsPeriod.startPeriod,
          endPeriod = _utils$getYearsPeriod.endPeriod;

      var _loop = function _loop(y) {
        yearsList.push( /*#__PURE__*/React__default['default'].createElement("div", {
          onClick: function onClick(ev) {
            _this2.onYearClick(ev, y);
          },
          className: _this2.getYearClassNames(y),
          key: y
        }, y));
      };

      for (var y = startPeriod; y <= endPeriod; y++) {
        _loop(y);
      }

      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: "react-datepicker__year"
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        className: "react-datepicker__year-wrapper"
      }, yearsList));
    }
  }]);

  return Year;
}(React__default['default'].Component);

var inputTime = /*#__PURE__*/function (_React$Component) {
  _inherits(inputTime, _React$Component);

  var _super = _createSuper(inputTime);

  function inputTime(props) {
    var _this;

    _classCallCheck(this, inputTime);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "onTimeChange", function (time) {
      _this.setState({
        time: time
      });

      var date = new Date();
      date.setHours(time.split(":")[0]);
      date.setMinutes(time.split(":")[1]);

      _this.props.onChange(date);
    });

    _defineProperty(_assertThisInitialized(_this), "renderTimeInput", function () {
      var time = _this.state.time;
      var _this$props = _this.props,
          timeString = _this$props.timeString,
          customTimeInput = _this$props.customTimeInput;

      if (customTimeInput) {
        return /*#__PURE__*/React__default['default'].cloneElement(customTimeInput, {
          value: time,
          onChange: _this.onTimeChange
        });
      }

      return /*#__PURE__*/React__default['default'].createElement("input", {
        type: "time",
        className: "react-datepicker-time__input",
        placeholder: "Time",
        name: "time-input",
        required: true,
        value: time,
        onChange: function onChange(ev) {
          _this.onTimeChange(ev.target.value || timeString);
        }
      });
    });

    _this.state = {
      time: _this.props.timeString
    };
    return _this;
  }

  _createClass(inputTime, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: "react-datepicker__input-time-container"
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        className: "react-datepicker-time__caption"
      }, this.props.timeInputLabel), /*#__PURE__*/React__default['default'].createElement("div", {
        className: "react-datepicker-time__input-container"
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        className: "react-datepicker-time__input"
      }, this.renderTimeInput())));
    }
  }]);

  return inputTime;
}(React__default['default'].Component);

function CalendarContainer(_ref) {
  var className = _ref.className,
      children = _ref.children,
      showPopperArrow = _ref.showPopperArrow,
      _ref$arrowProps = _ref.arrowProps,
      arrowProps = _ref$arrowProps === void 0 ? {} : _ref$arrowProps;
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: className
  }, showPopperArrow && /*#__PURE__*/React__default['default'].createElement("div", _extends({
    className: "react-datepicker__triangle"
  }, arrowProps)), children);
}

var DROPDOWN_FOCUS_CLASSNAMES = ["react-datepicker__year-select", "react-datepicker__month-select", "react-datepicker__month-year-select"];

var isDropdownSelect = function isDropdownSelect() {
  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var classNames = (element.className || "").split(/\s+/);
  return DROPDOWN_FOCUS_CLASSNAMES.some(function (testClassname) {
    return classNames.indexOf(testClassname) >= 0;
  });
};

var Calendar = /*#__PURE__*/function (_React$Component) {
  _inherits(Calendar, _React$Component);

  var _super = _createSuper(Calendar);

  _createClass(Calendar, null, [{
    key: "defaultProps",
    get: function get() {
      return {
        onDropdownFocus: function onDropdownFocus() {},
        monthsShown: 1,
        monthSelectedIn: 0,
        forceShowMonthNavigation: false,
        timeCaption: "Time",
        previousYearButtonLabel: "Previous Year",
        nextYearButtonLabel: "Next Year",
        previousMonthButtonLabel: "Previous Month",
        nextMonthButtonLabel: "Next Month",
        customTimeInput: null,
        yearItemNumber: DEFAULT_YEAR_ITEM_NUMBER
      };
    }
  }]);

  function Calendar(props) {
    var _this;

    _classCallCheck(this, Calendar);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleClickOutside", function (event) {
      _this.props.onClickOutside(event);
    });

    _defineProperty(_assertThisInitialized(_this), "setClickOutsideRef", function () {
      return _this.containerRef.current;
    });

    _defineProperty(_assertThisInitialized(_this), "handleDropdownFocus", function (event) {
      if (isDropdownSelect(event.target)) {
        _this.props.onDropdownFocus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getDateInView", function () {
      var _this$props = _this.props,
          preSelection = _this$props.preSelection,
          selected = _this$props.selected,
          openToDate = _this$props.openToDate;
      var minDate = getEffectiveMinDate(_this.props);
      var maxDate = getEffectiveMaxDate(_this.props);
      var current = newDate();
      var initialDate = openToDate || selected || preSelection;

      if (initialDate) {
        return initialDate;
      } else {
        if (minDate && isBefore__default['default'](current, minDate)) {
          return minDate;
        } else if (maxDate && isAfter__default['default'](current, maxDate)) {
          return maxDate;
        }
      }

      return current;
    });

    _defineProperty(_assertThisInitialized(_this), "increaseMonth", function () {
      _this.setState(function (_ref) {
        var date = _ref.date;
        return {
          date: addMonths__default['default'](date, 1)
        };
      }, function () {
        return _this.handleMonthChange(_this.state.date);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "decreaseMonth", function () {
      _this.setState(function (_ref2) {
        var date = _ref2.date;
        return {
          date: subMonths__default['default'](date, 1)
        };
      }, function () {
        return _this.handleMonthChange(_this.state.date);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleDayClick", function (day, event, monthSelectedIn) {
      return _this.props.onSelect(day, event, monthSelectedIn);
    });

    _defineProperty(_assertThisInitialized(_this), "handleDayMouseEnter", function (day) {
      _this.setState({
        selectingDate: day
      });

      _this.props.onDayMouseEnter && _this.props.onDayMouseEnter(day);
    });

    _defineProperty(_assertThisInitialized(_this), "handleMonthMouseLeave", function () {
      _this.setState({
        selectingDate: null
      });

      _this.props.onMonthMouseLeave && _this.props.onMonthMouseLeave();
    });

    _defineProperty(_assertThisInitialized(_this), "handleYearChange", function (date) {
      if (_this.props.onYearChange) {
        _this.props.onYearChange(date);
      }

      if (_this.props.adjustDateOnChange) {
        if (_this.props.onSelect) {
          _this.props.onSelect(date);
        }

        if (_this.props.setOpen) {
          _this.props.setOpen(true);
        }
      }

      _this.props.setPreSelection && _this.props.setPreSelection(date);
    });

    _defineProperty(_assertThisInitialized(_this), "handleMonthChange", function (date) {
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

      _this.props.setPreSelection && _this.props.setPreSelection(date);
    });

    _defineProperty(_assertThisInitialized(_this), "handleMonthYearChange", function (date) {
      _this.handleYearChange(date);

      _this.handleMonthChange(date);
    });

    _defineProperty(_assertThisInitialized(_this), "changeYear", function (year) {
      _this.setState(function (_ref3) {
        var date = _ref3.date;
        return {
          date: utils__default$4['default'](date, year)
        };
      }, function () {
        return _this.handleYearChange(_this.state.date);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "changeMonth", function (month) {
      _this.setState(function (_ref4) {
        var date = _ref4.date;
        return {
          date: utils__default['default'](date, month)
        };
      }, function () {
        return _this.handleMonthChange(_this.state.date);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "changeMonthYear", function (monthYear) {
      _this.setState(function (_ref5) {
        var date = _ref5.date;
        return {
          date: utils__default$4['default'](utils__default['default'](date, getMonth__default['default'](monthYear)), getYear__default['default'](monthYear))
        };
      }, function () {
        return _this.handleMonthYearChange(_this.state.date);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "header", function () {
      var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.date;
      var startOfWeek = getStartOfWeek(date, _this.props.locale);
      var dayNames = [];

      if (_this.props.showWeekNumbers) {
        dayNames.push( /*#__PURE__*/React__default['default'].createElement("div", {
          key: "W",
          className: "react-datepicker__day-name"
        }, _this.props.weekLabel || "#"));
      }

      return dayNames.concat([0, 1, 2, 3, 4, 5, 6].map(function (offset) {
        var day = utils__default$2['default'](startOfWeek, offset);

        var weekDayName = _this.formatWeekday(day, _this.props.locale);

        var weekDayClassName = _this.props.weekDayClassName ? _this.props.weekDayClassName(day) : undefined;
        return /*#__PURE__*/React__default['default'].createElement("div", {
          key: offset,
          className: classnames__default['default']("react-datepicker__day-name", weekDayClassName)
        }, weekDayName);
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "formatWeekday", function (day, locale) {
      if (_this.props.formatWeekDay) {
        return getFormattedWeekdayInLocale(day, _this.props.formatWeekDay, locale);
      }

      return _this.props.useWeekdaysShort ? getWeekdayShortInLocale(day, locale) : getWeekdayMinInLocale(day, locale);
    });

    _defineProperty(_assertThisInitialized(_this), "decreaseYear", function () {
      _this.setState(function (_ref6) {
        var date = _ref6.date;
        return {
          date: subYears__default['default'](date, _this.props.showYearPicker ? _this.props.yearItemNumber : 1)
        };
      }, function () {
        return _this.handleYearChange(_this.state.date);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderPreviousButton", function () {
      if (_this.props.renderCustomHeader) {
        return;
      }

      var allPrevDaysDisabled;

      switch (true) {
        case _this.props.showMonthYearPicker:
          allPrevDaysDisabled = yearDisabledBefore(_this.state.date, _this.props);
          break;

        case _this.props.showYearPicker:
          allPrevDaysDisabled = yearsDisabledBefore(_this.state.date, _this.props);
          break;

        default:
          allPrevDaysDisabled = monthDisabledBefore(_this.state.date, _this.props);
          break;
      }

      if (!_this.props.forceShowMonthNavigation && !_this.props.showDisabledMonthNavigation && allPrevDaysDisabled || _this.props.showTimeSelectOnly) {
        return;
      }

      var classes = ["react-datepicker__navigation", "react-datepicker__navigation--previous"];
      var clickHandler = _this.decreaseMonth;

      if (_this.props.showMonthYearPicker || _this.props.showQuarterYearPicker || _this.props.showYearPicker) {
        clickHandler = _this.decreaseYear;
      }

      if (allPrevDaysDisabled && _this.props.showDisabledMonthNavigation) {
        classes.push("react-datepicker__navigation--previous--disabled");
        clickHandler = null;
      }

      var isForYear = _this.props.showMonthYearPicker || _this.props.showQuarterYearPicker || _this.props.showYearPicker;
      var _this$props2 = _this.props,
          _this$props2$previous = _this$props2.previousMonthAriaLabel,
          previousMonthAriaLabel = _this$props2$previous === void 0 ? "Previous Month" : _this$props2$previous,
          _this$props2$previous2 = _this$props2.previousYearAriaLabel,
          previousYearAriaLabel = _this$props2$previous2 === void 0 ? "Previous Year" : _this$props2$previous2;
      return /*#__PURE__*/React__default['default'].createElement("button", {
        type: "button",
        className: classes.join(" "),
        onClick: clickHandler,
        "aria-label": isForYear ? previousYearAriaLabel : previousMonthAriaLabel
      }, isForYear ? _this.props.previousYearButtonLabel : _this.props.previousMonthButtonLabel);
    });

    _defineProperty(_assertThisInitialized(_this), "increaseYear", function () {
      _this.setState(function (_ref7) {
        var date = _ref7.date;
        return {
          date: addYears__default['default'](date, _this.props.showYearPicker ? _this.props.yearItemNumber : 1)
        };
      }, function () {
        return _this.handleYearChange(_this.state.date);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderNextButton", function () {
      if (_this.props.renderCustomHeader) {
        return;
      }

      var allNextDaysDisabled;

      switch (true) {
        case _this.props.showMonthYearPicker:
          allNextDaysDisabled = yearDisabledAfter(_this.state.date, _this.props);
          break;

        case _this.props.showYearPicker:
          allNextDaysDisabled = yearsDisabledAfter(_this.state.date, _this.props);
          break;

        default:
          allNextDaysDisabled = monthDisabledAfter(_this.state.date, _this.props);
          break;
      }

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

      if (_this.props.showMonthYearPicker || _this.props.showQuarterYearPicker || _this.props.showYearPicker) {
        clickHandler = _this.increaseYear;
      }

      if (allNextDaysDisabled && _this.props.showDisabledMonthNavigation) {
        classes.push("react-datepicker__navigation--next--disabled");
        clickHandler = null;
      }

      var isForYear = _this.props.showMonthYearPicker || _this.props.showQuarterYearPicker || _this.props.showYearPicker;
      var _this$props3 = _this.props,
          _this$props3$nextMont = _this$props3.nextMonthAriaLabel,
          nextMonthAriaLabel = _this$props3$nextMont === void 0 ? "Next Month" : _this$props3$nextMont,
          _this$props3$nextYear = _this$props3.nextYearAriaLabel,
          nextYearAriaLabel = _this$props3$nextYear === void 0 ? "Next Year" : _this$props3$nextYear;
      return /*#__PURE__*/React__default['default'].createElement("button", {
        type: "button",
        className: classes.join(" "),
        onClick: clickHandler,
        "aria-label": isForYear ? nextYearAriaLabel : nextMonthAriaLabel
      }, isForYear ? _this.props.nextYearButtonLabel : _this.props.nextMonthButtonLabel);
    });

    _defineProperty(_assertThisInitialized(_this), "renderCurrentMonth", function () {
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

      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: classes.join(" ")
      }, formatDate(date, _this.props.dateFormat, _this.props.locale));
    });

    _defineProperty(_assertThisInitialized(_this), "renderYearDropdown", function () {
      var overrideHide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!_this.props.showYearDropdown || overrideHide) {
        return;
      }

      return /*#__PURE__*/React__default['default'].createElement(YearDropdown, {
        adjustDateOnChange: _this.props.adjustDateOnChange,
        date: _this.state.date,
        onSelect: _this.props.onSelect,
        setOpen: _this.props.setOpen,
        dropdownMode: _this.props.dropdownMode,
        onChange: _this.changeYear,
        minDate: _this.props.minDate,
        maxDate: _this.props.maxDate,
        year: getYear__default['default'](_this.state.date),
        scrollableYearDropdown: _this.props.scrollableYearDropdown,
        yearDropdownItemNumber: _this.props.yearDropdownItemNumber
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderMonthDropdown", function () {
      var overrideHide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!_this.props.showMonthDropdown || overrideHide) {
        return;
      }

      return /*#__PURE__*/React__default['default'].createElement(MonthDropdown, {
        dropdownMode: _this.props.dropdownMode,
        locale: _this.props.locale,
        onChange: _this.changeMonth,
        month: getMonth__default['default'](_this.state.date),
        useShortMonthInDropdown: _this.props.useShortMonthInDropdown
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderMonthYearDropdown", function () {
      var overrideHide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!_this.props.showMonthYearDropdown || overrideHide) {
        return;
      }

      return /*#__PURE__*/React__default['default'].createElement(MonthYearDropdown, {
        dropdownMode: _this.props.dropdownMode,
        locale: _this.props.locale,
        dateFormat: _this.props.dateFormat,
        onChange: _this.changeMonthYear,
        minDate: _this.props.minDate,
        maxDate: _this.props.maxDate,
        date: _this.state.date,
        scrollableMonthYearDropdown: _this.props.scrollableMonthYearDropdown
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderTodayButton", function () {
      if (!_this.props.todayButton || _this.props.showTimeSelectOnly) {
        return;
      }

      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: "react-datepicker__today-button",
        onClick: function onClick(e) {
          return _this.props.onSelect(getStartOfToday(), e);
        }
      }, _this.props.todayButton);
    });

    _defineProperty(_assertThisInitialized(_this), "renderDefaultHeader", function (_ref8) {
      var monthDate = _ref8.monthDate,
          i = _ref8.i;
      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: "react-datepicker__header ".concat(_this.props.showTimeSelect ? 'react-datepicker__header--has-time-select' : '')
      }, _this.renderCurrentMonth(monthDate), /*#__PURE__*/React__default['default'].createElement("div", {
        className: "react-datepicker__header__dropdown react-datepicker__header__dropdown--".concat(_this.props.dropdownMode),
        onFocus: _this.handleDropdownFocus
      }, _this.renderMonthDropdown(i !== 0), _this.renderMonthYearDropdown(i !== 0), _this.renderYearDropdown(i !== 0)), /*#__PURE__*/React__default['default'].createElement("div", {
        className: "react-datepicker__day-names"
      }, _this.header(monthDate)));
    });

    _defineProperty(_assertThisInitialized(_this), "renderCustomHeader", function () {
      var headerArgs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var monthDate = headerArgs.monthDate,
          i = headerArgs.i;

      if (i !== 0 && i !== undefined) {
        return null;
      }

      var prevMonthButtonDisabled = monthDisabledBefore(_this.state.date, _this.props);
      var nextMonthButtonDisabled = monthDisabledAfter(_this.state.date, _this.props);
      var prevYearButtonDisabled = yearDisabledBefore(_this.state.date, _this.props);
      var nextYearButtonDisabled = yearDisabledAfter(_this.state.date, _this.props);
      var showDayNames = !_this.props.showMonthYearPicker && !_this.props.showQuarterYearPicker && !_this.props.showYearPicker;
      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: "react-datepicker__header react-datepicker__header--custom",
        onFocus: _this.props.onDropdownFocus
      }, _this.props.renderCustomHeader(_objectSpread2(_objectSpread2({}, _this.state), {}, {
        changeMonth: _this.changeMonth,
        changeYear: _this.changeYear,
        decreaseMonth: _this.decreaseMonth,
        increaseMonth: _this.increaseMonth,
        decreaseYear: _this.decreaseYear,
        increaseYear: _this.increaseYear,
        prevMonthButtonDisabled: prevMonthButtonDisabled,
        nextMonthButtonDisabled: nextMonthButtonDisabled,
        prevYearButtonDisabled: prevYearButtonDisabled,
        nextYearButtonDisabled: nextYearButtonDisabled
      })), showDayNames && /*#__PURE__*/React__default['default'].createElement("div", {
        className: "react-datepicker__day-names"
      }, _this.header(monthDate)));
    });

    _defineProperty(_assertThisInitialized(_this), "renderYearHeader", function () {
      var date = _this.state.date;
      var _this$props4 = _this.props,
          showYearPicker = _this$props4.showYearPicker,
          yearItemNumber = _this$props4.yearItemNumber;

      var _getYearsPeriod = getYearsPeriod(date, yearItemNumber),
          startPeriod = _getYearsPeriod.startPeriod,
          endPeriod = _getYearsPeriod.endPeriod;

      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: "react-datepicker__header react-datepicker-year-header"
      }, showYearPicker ? "".concat(startPeriod, " - ").concat(endPeriod) : getYear__default['default'](date));
    });

    _defineProperty(_assertThisInitialized(_this), "renderHeader", function (headerArgs) {
      switch (true) {
        case _this.props.renderCustomHeader !== undefined:
          return _this.renderCustomHeader(headerArgs);

        case _this.props.showMonthYearPicker || _this.props.showQuarterYearPicker || _this.props.showYearPicker:
          return _this.renderYearHeader(headerArgs);

        default:
          return _this.renderDefaultHeader(headerArgs);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderMonths", function () {
      if (_this.props.showTimeSelectOnly || _this.props.showYearPicker) {
        return;
      }

      var monthList = [];
      var monthsToSubtract = _this.props.showPreviousMonths ? _this.props.monthsShown - 1 : 0;
      var fromMonthDate = subMonths__default['default'](_this.state.date, monthsToSubtract);

      for (var i = 0; i < _this.props.monthsShown; ++i) {
        var monthsToAdd = i - _this.props.monthSelectedIn;
        var monthDate = addMonths__default['default'](fromMonthDate, monthsToAdd);
        var monthKey = "month-".concat(i);
        monthList.push( /*#__PURE__*/React__default['default'].createElement("div", {
          key: monthKey,
          ref: function ref(div) {
            _this.monthContainer = div;
          },
          className: "react-datepicker__month-container"
        }, _this.renderHeader({
          monthDate: monthDate,
          i: i
        }), /*#__PURE__*/React__default['default'].createElement(Month, {
          chooseDayAriaLabelPrefix: _this.props.chooseDayAriaLabelPrefix,
          disabledDayAriaLabelPrefix: _this.props.disabledDayAriaLabelPrefix,
          weekAriaLabelPrefix: _this.props.weekAriaLabelPrefix,
          onChange: _this.changeMonthYear,
          day: monthDate,
          dayClassName: _this.props.dayClassName,
          monthClassName: _this.props.monthClassName,
          onDayClick: _this.handleDayClick,
          handleOnKeyDown: _this.props.handleOnKeyDown,
          onDayMouseEnter: _this.handleDayMouseEnter,
          onMouseLeave: _this.handleMonthMouseLeave,
          onWeekSelect: _this.props.onWeekSelect,
          orderInDisplay: i,
          formatWeekNumber: _this.props.formatWeekNumber,
          locale: _this.props.locale,
          minDate: _this.props.minDate,
          maxDate: _this.props.maxDate,
          excludeDates: _this.props.excludeDates,
          highlightDates: _this.props.highlightDates,
          selectingDate: _this.state.selectingDate,
          includeDates: _this.props.includeDates,
          fixedHeight: _this.props.fixedHeight,
          filterDate: _this.props.filterDate,
          preSelection: _this.props.preSelection,
          selected: _this.props.selected,
          selectsStart: _this.props.selectsStart,
          selectsEnd: _this.props.selectsEnd,
          selectsRange: _this.props.selectsRange,
          showWeekNumbers: _this.props.showWeekNumbers,
          startDate: _this.props.startDate,
          endDate: _this.props.endDate,
          peekNextMonth: _this.props.peekNextMonth,
          setOpen: _this.props.setOpen,
          shouldCloseOnSelect: _this.props.shouldCloseOnSelect,
          renderDayContents: _this.props.renderDayContents,
          disabledKeyboardNavigation: _this.props.disabledKeyboardNavigation,
          showMonthYearPicker: _this.props.showMonthYearPicker,
          showFullMonthYearPicker: _this.props.showFullMonthYearPicker,
          showTwoColumnMonthYearPicker: _this.props.showTwoColumnMonthYearPicker,
          showYearPicker: _this.props.showYearPicker,
          showQuarterYearPicker: _this.props.showQuarterYearPicker,
          isInputFocused: _this.props.isInputFocused,
          containerRef: _this.containerRef
        })));
      }

      return monthList;
    });

    _defineProperty(_assertThisInitialized(_this), "renderYears", function () {
      if (_this.props.showTimeSelectOnly) {
        return;
      }

      if (_this.props.showYearPicker) {
        return /*#__PURE__*/React__default['default'].createElement("div", {
          className: "react-datepicker__year--container"
        }, _this.renderHeader(), /*#__PURE__*/React__default['default'].createElement(Year, _extends({
          onDayClick: _this.handleDayClick,
          date: _this.state.date
        }, _this.props)));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderTimeSection", function () {
      if (_this.props.showTimeSelect && (_this.state.monthContainer || _this.props.showTimeSelectOnly)) {
        return /*#__PURE__*/React__default['default'].createElement(Time, {
          selected: _this.props.selected,
          openToDate: _this.props.openToDate,
          onChange: _this.props.onTimeChange,
          timeClassName: _this.props.timeClassName,
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
          injectTimes: _this.props.injectTimes,
          locale: _this.props.locale,
          showTimeSelectOnly: _this.props.showTimeSelectOnly
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderInputTimeSection", function () {
      var time = new Date(_this.props.selected);
      var timeValid = isValid(time) && Boolean(_this.props.selected);
      var timeString = timeValid ? "".concat(addZero(time.getHours()), ":").concat(addZero(time.getMinutes())) : "";

      if (_this.props.showTimeInput) {
        return /*#__PURE__*/React__default['default'].createElement(inputTime, {
          timeString: timeString,
          timeInputLabel: _this.props.timeInputLabel,
          onChange: _this.props.onTimeChange,
          customTimeInput: _this.props.customTimeInput
        });
      }
    });

    _this.containerRef = /*#__PURE__*/React__default['default'].createRef();
    _this.state = {
      date: _this.getDateInView(),
      selectingDate: null,
      monthContainer: null
    };
    return _this;
  }

  _createClass(Calendar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      // monthContainer height is needed in time component
      // to determine the height for the ul in the time component
      // setState here so height is given after final component
      // layout is rendered
      if (this.props.showTimeSelect) {
        this.assignMonthContainer = function () {
          _this2.setState({
            monthContainer: _this2.monthContainer
          });
        }();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.preSelection && !isSameDay(this.props.preSelection, prevProps.preSelection)) {
        this.setState({
          date: this.props.preSelection
        });
      } else if (this.props.openToDate && !isSameDay(this.props.openToDate, prevProps.openToDate)) {
        this.setState({
          date: this.props.openToDate
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var Container = this.props.container || CalendarContainer;
      return /*#__PURE__*/React__default['default'].createElement("div", {
        ref: this.containerRef
      }, /*#__PURE__*/React__default['default'].createElement(Container, {
        className: classnames__default['default']("react-datepicker", this.props.className, {
          "react-datepicker--time-only": this.props.showTimeSelectOnly
        }),
        showPopperArrow: this.props.showPopperArrow,
        arrowProps: this.props.arrowProps
      }, this.renderPreviousButton(), this.renderNextButton(), this.renderMonths(), this.renderYears(), this.renderTodayButton(), this.renderTimeSection(), this.renderInputTimeSection(), this.props.children));
    }
  }]);

  return Calendar;
}(React__default['default'].Component);

// It creates a tabindex loop so that "Tab" on the last element will focus the first element
// and "Shift Tab" on the first element will focus the last element

var focusableElementsSelector = "[tabindex], a, button, input, select, textarea";

var focusableFilter = function focusableFilter(node) {
  return !node.disabled && node.tabIndex !== -1;
};

var TabLoop = /*#__PURE__*/function (_React$Component) {
  _inherits(TabLoop, _React$Component);

  var _super = _createSuper(TabLoop);

  _createClass(TabLoop, null, [{
    key: "defaultProps",
    get: function get() {
      return {
        enableTabLoop: true
      };
    }
  }]);

  function TabLoop(props) {
    var _this;

    _classCallCheck(this, TabLoop);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "getTabChildren", function () {
      return Array.prototype.slice.call(_this.tabLoopRef.current.querySelectorAll(focusableElementsSelector), 1, -1).filter(focusableFilter);
    });

    _defineProperty(_assertThisInitialized(_this), "handleFocusStart", function (e) {
      var tabChildren = _this.getTabChildren();

      tabChildren && tabChildren.length > 1 && tabChildren[tabChildren.length - 1].focus();
    });

    _defineProperty(_assertThisInitialized(_this), "handleFocusEnd", function (e) {
      var tabChildren = _this.getTabChildren();

      tabChildren && tabChildren.length > 1 && tabChildren[0].focus();
    });

    _this.tabLoopRef = /*#__PURE__*/React__default['default'].createRef();
    return _this;
  } // query all focusable elements
  // trim first and last because they are the focus guards


  _createClass(TabLoop, [{
    key: "render",
    value: function render() {
      if (!this.props.enableTabLoop) {
        return this.props.children;
      }

      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: "react-datepicker__tab-loop",
        ref: this.tabLoopRef
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        className: "react-datepicker__tab-loop__start",
        tabIndex: "0",
        onFocus: this.handleFocusStart
      }), this.props.children, /*#__PURE__*/React__default['default'].createElement("div", {
        className: "react-datepicker__tab-loop__end",
        tabIndex: "0",
        onFocus: this.handleFocusEnd
      }));
    }
  }]);

  return TabLoop;
}(React__default['default'].Component);

var Portal = /*#__PURE__*/function (_React$Component) {
  _inherits(Portal, _React$Component);

  var _super = _createSuper(Portal);

  function Portal(props) {
    var _this;

    _classCallCheck(this, Portal);

    _this = _super.call(this, props);
    _this.el = document.createElement("div");
    return _this;
  }

  _createClass(Portal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.portalRoot = document.getElementById(this.props.portalId);

      if (!this.portalRoot) {
        this.portalRoot = document.createElement("div");
        this.portalRoot.setAttribute("id", this.props.portalId);
        document.body.appendChild(this.portalRoot);
      }

      this.portalRoot.appendChild(this.el);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.portalRoot.removeChild(this.el);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/ReactDOM__default['default'].createPortal(this.props.children, this.el);
    }
  }]);

  return Portal;
}(React__default['default'].Component);

var PopperComponent = /*#__PURE__*/function (_React$Component) {
  _inherits(PopperComponent, _React$Component);

  var _super = _createSuper(PopperComponent);

  function PopperComponent() {
    _classCallCheck(this, PopperComponent);

    return _super.apply(this, arguments);
  }

  _createClass(PopperComponent, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          wrapperClassName = _this$props.wrapperClassName,
          hidePopper = _this$props.hidePopper,
          popperComponent = _this$props.popperComponent,
          popperModifiers = _this$props.popperModifiers,
          popperPlacement = _this$props.popperPlacement,
          popperProps = _this$props.popperProps,
          targetComponent = _this$props.targetComponent,
          enableTabLoop = _this$props.enableTabLoop,
          popperOnKeyDown = _this$props.popperOnKeyDown,
          portalId = _this$props.portalId;
      var popper;

      if (!hidePopper) {
        var classes = classnames__default['default']("react-datepicker-popper", className);
        popper = /*#__PURE__*/React__default['default'].createElement(reactPopper.Popper, _extends({
          modifiers: popperModifiers,
          placement: popperPlacement
        }, popperProps), function (_ref) {
          var ref = _ref.ref,
              style = _ref.style,
              placement = _ref.placement,
              arrowProps = _ref.arrowProps;
          return /*#__PURE__*/React__default['default'].createElement(TabLoop, {
            enableTabLoop: enableTabLoop
          }, /*#__PURE__*/React__default['default'].createElement("div", _extends({
            ref: ref,
            style: style
          }, {
            className: classes,
            "data-placement": placement,
            onKeyDown: popperOnKeyDown
          }), /*#__PURE__*/React__default['default'].cloneElement(popperComponent, {
            arrowProps: arrowProps
          })));
        });
      }

      if (this.props.popperContainer) {
        popper = /*#__PURE__*/React__default['default'].createElement(this.props.popperContainer, {}, popper);
      }

      if (portalId && !hidePopper) {
        popper = /*#__PURE__*/React__default['default'].createElement(Portal, {
          portalId: portalId
        }, popper);
      }

      var wrapperClasses = classnames__default['default']("react-datepicker-wrapper", wrapperClassName);
      return /*#__PURE__*/React__default['default'].createElement(reactPopper.Manager, {
        className: "react-datepicker-manager"
      }, /*#__PURE__*/React__default['default'].createElement(reactPopper.Reference, null, function (_ref2) {
        var ref = _ref2.ref;
        return /*#__PURE__*/React__default['default'].createElement("div", {
          ref: ref,
          className: wrapperClasses
        }, targetComponent);
      }), popper);
    }
  }], [{
    key: "defaultProps",
    get: function get() {
      return {
        hidePopper: true,
        popperModifiers: {
          preventOverflow: {
            enabled: true,
            escapeWithReference: true,
            boundariesElement: "viewport"
          }
        },
        popperProps: {},
        popperPlacement: "bottom-start"
      };
    }
  }]);

  return PopperComponent;
}(React__default['default'].Component);

var outsideClickIgnoreClass = "react-datepicker-ignore-onclickoutside";
var WrappedCalendar = onClickOutside__default['default'](Calendar); // Compares dates year+month combinations

function hasPreSelectionChanged(date1, date2) {
  if (date1 && date2) {
    return getMonth__default['default'](date1) !== getMonth__default['default'](date2) || getYear__default['default'](date1) !== getYear__default['default'](date2);
  }

  return date1 !== date2;
}
/**
 * General datepicker component.
 */


var INPUT_ERR_1 = "Date input not valid.";

var DatePicker = /*#__PURE__*/function (_React$Component) {
  _inherits(DatePicker, _React$Component);

  var _super = _createSuper(DatePicker);

  _createClass(DatePicker, null, [{
    key: "defaultProps",
    get: function get() {
      return {
        allowSameDay: false,
        dateFormat: "MM/dd/yyyy",
        dateFormatCalendar: "LLLL yyyy",
        onChange: function onChange() {},
        disabled: false,
        disabledKeyboardNavigation: false,
        dropdownMode: "scroll",
        onFocus: function onFocus() {},
        onBlur: function onBlur() {},
        onKeyDown: function onKeyDown() {},
        onInputClick: function onInputClick() {},
        onSelect: function onSelect() {},
        onClickOutside: function onClickOutside() {},
        onMonthChange: function onMonthChange() {},
        onCalendarOpen: function onCalendarOpen() {},
        onCalendarClose: function onCalendarClose() {},
        preventOpenOnFocus: false,
        onYearChange: function onYearChange() {},
        onInputError: function onInputError() {},
        monthsShown: 1,
        readOnly: false,
        withPortal: false,
        shouldCloseOnSelect: true,
        showTimeSelect: false,
        showTimeInput: false,
        showPreviousMonths: false,
        showMonthYearPicker: false,
        showFullMonthYearPicker: false,
        showTwoColumnMonthYearPicker: false,
        showYearPicker: false,
        showQuarterYearPicker: false,
        strictParsing: false,
        timeIntervals: 30,
        timeCaption: "Time",
        previousMonthButtonLabel: "Previous Month",
        nextMonthButtonLabel: "Next Month",
        previousYearButtonLabel: "Previous Year",
        nextYearButtonLabel: "Next Year",
        timeInputLabel: "Time",
        enableTabLoop: true,
        yearItemNumber: DEFAULT_YEAR_ITEM_NUMBER,
        renderDayContents: function renderDayContents(date) {
          return date;
        },
        focusSelectedMonth: false,
        showPopperArrow: true,
        excludeScrollbar: true,
        customTimeInput: null
      };
    }
  }]);

  function DatePicker(props) {
    var _this;

    _classCallCheck(this, DatePicker);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "getPreSelection", function () {
      return _this.props.openToDate ? _this.props.openToDate : _this.props.selectsEnd && _this.props.startDate ? _this.props.startDate : _this.props.selectsStart && _this.props.endDate ? _this.props.endDate : newDate();
    });

    _defineProperty(_assertThisInitialized(_this), "calcInitialState", function () {
      var defaultPreSelection = _this.getPreSelection();

      var minDate = getEffectiveMinDate(_this.props);
      var maxDate = getEffectiveMaxDate(_this.props);
      var boundedPreSelection = minDate && isBefore__default['default'](defaultPreSelection, minDate) ? minDate : maxDate && isAfter__default['default'](defaultPreSelection, maxDate) ? maxDate : defaultPreSelection;
      return {
        open: _this.props.startOpen || false,
        preventFocus: false,
        preSelection: _this.props.selected ? _this.props.selected : boundedPreSelection,
        // transforming highlighted days (perhaps nested array)
        // to flat Map for faster access in day.jsx
        highlightDates: getHightLightDaysMap(_this.props.highlightDates),
        focused: false
      };
    });

    _defineProperty(_assertThisInitialized(_this), "clearPreventFocusTimeout", function () {
      if (_this.preventFocusTimeout) {
        clearTimeout(_this.preventFocusTimeout);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setFocus", function () {
      if (_this.input && _this.input.focus) {
        _this.input.focus({
          preventScroll: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setBlur", function () {
      if (_this.input && _this.input.blur) {
        _this.input.blur();
      }

      _this.cancelFocusInput();
    });

    _defineProperty(_assertThisInitialized(_this), "setOpen", function (open) {
      var skipSetBlur = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      _this.setState({
        open: open,
        preSelection: open && _this.state.open ? _this.state.preSelection : _this.calcInitialState().preSelection,
        lastPreSelectChange: PRESELECT_CHANGE_VIA_NAVIGATE
      }, function () {
        if (!open) {
          _this.setState(function (prev) {
            return {
              focused: skipSetBlur ? prev.focused : false
            };
          }, function () {
            !skipSetBlur && _this.setBlur();

            _this.setState({
              inputValue: null
            });
          });
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "inputOk", function () {
      return isDate__default['default'](_this.state.preSelection);
    });

    _defineProperty(_assertThisInitialized(_this), "isCalendarOpen", function () {
      return _this.props.open === undefined ? _this.state.open && !_this.props.disabled && !_this.props.readOnly : _this.props.open;
    });

    _defineProperty(_assertThisInitialized(_this), "handleFocus", function (event) {
      if (!_this.state.preventFocus) {
        _this.props.onFocus(event);

        if (!_this.props.preventOpenOnFocus && !_this.props.readOnly) {
          _this.setOpen(true);
        }
      }

      _this.setState({
        focused: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "cancelFocusInput", function () {
      clearTimeout(_this.inputFocusTimeout);
      _this.inputFocusTimeout = null;
    });

    _defineProperty(_assertThisInitialized(_this), "deferFocusInput", function () {
      _this.cancelFocusInput();

      _this.inputFocusTimeout = setTimeout(function () {
        return _this.setFocus();
      }, 1);
    });

    _defineProperty(_assertThisInitialized(_this), "handleDropdownFocus", function () {
      _this.cancelFocusInput();
    });

    _defineProperty(_assertThisInitialized(_this), "handleBlur", function (event) {
      if (!_this.state.open || _this.props.withPortal || _this.props.showTimeInput) {
        _this.props.onBlur(event);
      }

      _this.setState({
        focused: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleCalendarClickOutside", function (event) {
      if (!_this.props.inline) {
        _this.setOpen(false);
      }

      _this.props.onClickOutside(event);

      if (_this.props.withPortal) {
        event.preventDefault();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function () {
      for (var _len = arguments.length, allArgs = new Array(_len), _key = 0; _key < _len; _key++) {
        allArgs[_key] = arguments[_key];
      }

      var event = allArgs[0];

      if (_this.props.onChangeRaw) {
        _this.props.onChangeRaw.apply(_assertThisInitialized(_this), allArgs);

        if (typeof event.isDefaultPrevented !== "function" || event.isDefaultPrevented()) {
          return;
        }
      }

      _this.setState({
        inputValue: event.target.value,
        lastPreSelectChange: PRESELECT_CHANGE_VIA_INPUT
      });

      var date = parseDate(event.target.value, _this.props.dateFormat, _this.props.locale, _this.props.strictParsing);

      if (date || !event.target.value) {
        _this.setSelected(date, event, true);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelect", function (date, event, monthSelectedIn) {
      // Preventing onFocus event to fix issue
      // https://github.com/Hacker0x01/react-datepicker/issues/628
      _this.setState({
        preventFocus: true
      }, function () {
        _this.preventFocusTimeout = setTimeout(function () {
          return _this.setState({
            preventFocus: false
          });
        }, 50);
        return _this.preventFocusTimeout;
      });

      if (_this.props.onChangeRaw) {
        _this.props.onChangeRaw(event);
      }

      _this.setSelected(date, event, false, monthSelectedIn);

      if (!_this.props.shouldCloseOnSelect || _this.props.showTimeSelect) {
        _this.setPreSelection(date);
      } else if (!_this.props.inline) {
        _this.setOpen(false);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setSelected", function (date, event, keepInput, monthSelectedIn) {
      var changedDate = date;

      if (changedDate !== null && isDayDisabled(changedDate, _this.props)) {
        return;
      }

      var _this$props = _this.props,
          onChange = _this$props.onChange,
          selectsRange = _this$props.selectsRange,
          startDate = _this$props.startDate,
          endDate = _this$props.endDate;

      if (!isEqual(_this.props.selected, changedDate) || _this.props.allowSameDay || selectsRange) {
        if (changedDate !== null) {
          if (_this.props.selected && (!keepInput || !_this.props.showTimeSelect && !_this.props.showTimeSelectOnly && !_this.props.showTimeInput)) {
            changedDate = setTime(changedDate, {
              hour: getHours__default['default'](_this.props.selected),
              minute: getMinutes__default['default'](_this.props.selected),
              second: getSeconds__default['default'](_this.props.selected)
            });
          }

          if (!_this.props.inline) {
            _this.setState({
              preSelection: changedDate
            });
          }

          if (!_this.props.focusSelectedMonth) {
            _this.setState({
              monthSelectedIn: monthSelectedIn
            });
          }
        }

        if (selectsRange) {
          var noRanges = !startDate && !endDate;
          var hasStartRange = startDate && !endDate;
          var isRangeFilled = startDate && endDate;

          if (noRanges) {
            onChange([changedDate, null], event);
          } else if (hasStartRange) {
            if (isBefore__default['default'](changedDate, startDate)) {
              onChange([changedDate, null], event);
            } else {
              onChange([startDate, changedDate], event);
            }
          }

          if (isRangeFilled) {
            onChange([changedDate, null], event);
          }
        } else {
          onChange(changedDate, event);
        }
      }

      if (!keepInput) {
        _this.props.onSelect(changedDate, event);

        _this.setState({
          inputValue: null
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setPreSelection", function (date) {
      var hasMinDate = typeof _this.props.minDate !== "undefined";
      var hasMaxDate = typeof _this.props.maxDate !== "undefined";
      var isValidDateSelection = true;

      if (date) {
        if (hasMinDate && hasMaxDate) {
          isValidDateSelection = isDayInRange(date, _this.props.minDate, _this.props.maxDate);
        } else if (hasMinDate) {
          isValidDateSelection = isAfter__default['default'](date, _this.props.minDate);
        } else if (hasMaxDate) {
          isValidDateSelection = isBefore__default['default'](date, _this.props.maxDate);
        }
      }

      if (isValidDateSelection) {
        _this.setState({
          preSelection: date
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleTimeChange", function (time) {
      var selected = _this.props.selected ? _this.props.selected : _this.getPreSelection();
      var changedDate = setTime(selected, {
        hour: getHours__default['default'](time),
        minute: getMinutes__default['default'](time)
      });

      _this.setState({
        preSelection: changedDate
      });

      _this.props.onChange(changedDate);

      if (_this.props.shouldCloseOnSelect) {
        _this.setOpen(false);
      }

      if (_this.props.showTimeInput) {
        _this.setOpen(true);
      }

      _this.setState({
        inputValue: null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onInputClick", function () {
      if (!_this.props.disabled && !_this.props.readOnly) {
        _this.setOpen(true);
      }

      _this.props.onInputClick();
    });

    _defineProperty(_assertThisInitialized(_this), "onInputKeyDown", function (event) {
      _this.props.onKeyDown(event);

      var eventKey = event.key;

      if (!_this.state.open && !_this.props.inline && !_this.props.preventOpenOnFocus) {
        if (eventKey === "ArrowDown" || eventKey === "ArrowUp" || eventKey === "Enter") {
          _this.onInputClick();
        }

        return;
      } // if calendar is open, these keys will focus the selected day


      if (_this.state.open) {
        if (eventKey === "ArrowDown" || eventKey === "ArrowUp") {
          event.preventDefault();

          var selectedDay = _this.calendar.componentNode && _this.calendar.componentNode.querySelector('.react-datepicker__day[tabindex="0"]');

          selectedDay && selectedDay.focus({
            preventScroll: true
          });
          return;
        }

        var copy = newDate(_this.state.preSelection);

        if (eventKey === "Enter") {
          event.preventDefault();

          if (_this.inputOk() && _this.state.lastPreSelectChange === PRESELECT_CHANGE_VIA_NAVIGATE) {
            _this.handleSelect(copy, event);

            !_this.props.shouldCloseOnSelect && _this.setPreSelection(copy);
          } else {
            _this.setOpen(false);
          }
        } else if (eventKey === "Escape") {
          event.preventDefault();

          _this.setOpen(false);
        }

        if (!_this.inputOk()) {
          _this.props.onInputError({
            code: 1,
            msg: INPUT_ERR_1
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onDayKeyDown", function (event) {
      _this.props.onKeyDown(event);

      var eventKey = event.key;
      var copy = newDate(_this.state.preSelection);

      if (eventKey === "Enter") {
        event.preventDefault();

        _this.handleSelect(copy, event);

        !_this.props.shouldCloseOnSelect && _this.setPreSelection(copy);
      } else if (eventKey === "Escape") {
        event.preventDefault();

        _this.setOpen(false);

        if (!_this.inputOk()) {
          _this.props.onInputError({
            code: 1,
            msg: INPUT_ERR_1
          });
        }
      } else if (!_this.props.disabledKeyboardNavigation) {
        var newSelection;

        switch (eventKey) {
          case "ArrowLeft":
            newSelection = subDays__default['default'](copy, 1);
            break;

          case "ArrowRight":
            newSelection = utils__default$2['default'](copy, 1);
            break;

          case "ArrowUp":
            newSelection = subWeeks__default['default'](copy, 1);
            break;

          case "ArrowDown":
            newSelection = utils__default$3['default'](copy, 1);
            break;

          case "PageUp":
            newSelection = subMonths__default['default'](copy, 1);
            break;

          case "PageDown":
            newSelection = addMonths__default['default'](copy, 1);
            break;

          case "Home":
            newSelection = subYears__default['default'](copy, 1);
            break;

          case "End":
            newSelection = addYears__default['default'](copy, 1);
            break;
        }

        if (!newSelection) {
          if (_this.props.onInputError) {
            _this.props.onInputError({
              code: 1,
              msg: INPUT_ERR_1
            });
          }

          return;
        }

        event.preventDefault();

        _this.setState({
          lastPreSelectChange: PRESELECT_CHANGE_VIA_NAVIGATE
        });

        if (_this.props.adjustDateOnChange) {
          _this.setSelected(newSelection);
        }

        _this.setPreSelection(newSelection);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onPopperKeyDown", function (event) {
      var eventKey = event.key;

      if (eventKey === "Escape") {
        // close the popper and refocus the input
        // stop the input from auto opening onFocus
        // close the popper
        // setFocus to the input
        // allow input auto opening onFocus
        event.preventDefault();

        _this.setState({
          preventFocus: true
        }, function () {
          _this.setOpen(false);

          setTimeout(function () {
            _this.setFocus();

            _this.setState({
              preventFocus: false
            });
          });
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onClearClick", function (event) {
      if (event) {
        if (event.preventDefault) {
          event.preventDefault();
        }
      }

      _this.props.onChange(null, event);

      _this.setState({
        inputValue: null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "clear", function () {
      _this.onClearClick();
    });

    _defineProperty(_assertThisInitialized(_this), "onScroll", function (event) {
      if (typeof _this.props.closeOnScroll === "boolean" && _this.props.closeOnScroll) {
        if (event.target === document || event.target === document.documentElement || event.target === document.body) {
          _this.setOpen(false);
        }
      } else if (typeof _this.props.closeOnScroll === "function") {
        if (_this.props.closeOnScroll(event)) {
          _this.setOpen(false);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderCalendar", function () {
      if (!_this.props.inline && !_this.isCalendarOpen()) {
        return null;
      }

      return /*#__PURE__*/React__default['default'].createElement(WrappedCalendar, {
        ref: function ref(elem) {
          _this.calendar = elem;
        },
        locale: _this.props.locale,
        chooseDayAriaLabelPrefix: _this.props.chooseDayAriaLabelPrefix,
        disabledDayAriaLabelPrefix: _this.props.disabledDayAriaLabelPrefix,
        weekAriaLabelPrefix: _this.props.weekAriaLabelPrefix,
        adjustDateOnChange: _this.props.adjustDateOnChange,
        setOpen: _this.setOpen,
        shouldCloseOnSelect: _this.props.shouldCloseOnSelect,
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
        selectsRange: _this.props.selectsRange,
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
        peekNextMonth: _this.props.peekNextMonth,
        showMonthDropdown: _this.props.showMonthDropdown,
        showPreviousMonths: _this.props.showPreviousMonths,
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
        outsideClickIgnoreClass: outsideClickIgnoreClass,
        fixedHeight: _this.props.fixedHeight,
        monthsShown: _this.props.monthsShown,
        monthSelectedIn: _this.state.monthSelectedIn,
        onDropdownFocus: _this.handleDropdownFocus,
        onMonthChange: _this.props.onMonthChange,
        onYearChange: _this.props.onYearChange,
        dayClassName: _this.props.dayClassName,
        weekDayClassName: _this.props.weekDayClassName,
        monthClassName: _this.props.monthClassName,
        timeClassName: _this.props.timeClassName,
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
        yearItemNumber: _this.props.yearItemNumber,
        yearDropdownItemNumber: _this.props.yearDropdownItemNumber,
        previousMonthButtonLabel: _this.props.previousMonthButtonLabel,
        nextMonthButtonLabel: _this.props.nextMonthButtonLabel,
        previousYearButtonLabel: _this.props.previousYearButtonLabel,
        nextYearButtonLabel: _this.props.nextYearButtonLabel,
        timeInputLabel: _this.props.timeInputLabel,
        disabledKeyboardNavigation: _this.props.disabledKeyboardNavigation,
        renderCustomHeader: _this.props.renderCustomHeader,
        popperProps: _this.props.popperProps,
        renderDayContents: _this.props.renderDayContents,
        onDayMouseEnter: _this.props.onDayMouseEnter,
        onMonthMouseLeave: _this.props.onMonthMouseLeave,
        showTimeInput: _this.props.showTimeInput,
        showMonthYearPicker: _this.props.showMonthYearPicker,
        showFullMonthYearPicker: _this.props.showFullMonthYearPicker,
        showTwoColumnMonthYearPicker: _this.props.showTwoColumnMonthYearPicker,
        showYearPicker: _this.props.showYearPicker,
        showQuarterYearPicker: _this.props.showQuarterYearPicker,
        showPopperArrow: _this.props.showPopperArrow,
        excludeScrollbar: _this.props.excludeScrollbar,
        handleOnKeyDown: _this.onDayKeyDown,
        isInputFocused: _this.state.focused,
        customTimeInput: _this.props.customTimeInput,
        setPreSelection: _this.setPreSelection
      }, _this.props.children);
    });

    _defineProperty(_assertThisInitialized(_this), "renderDateInput", function () {
      var _React$cloneElement;

      var className = classnames__default['default'](_this.props.className, _defineProperty({}, outsideClickIgnoreClass, _this.state.open));
      var customInput = _this.props.customInput || /*#__PURE__*/React__default['default'].createElement("input", {
        type: "text"
      });
      var customInputRef = _this.props.customInputRef || "ref";
      var inputValue = typeof _this.props.value === "string" ? _this.props.value : typeof _this.state.inputValue === "string" ? _this.state.inputValue : safeDateFormat(_this.props.selected, _this.props);
      return /*#__PURE__*/React__default['default'].cloneElement(customInput, (_React$cloneElement = {}, _defineProperty(_React$cloneElement, customInputRef, function (input) {
        _this.input = input;
      }), _defineProperty(_React$cloneElement, "value", inputValue), _defineProperty(_React$cloneElement, "onBlur", _this.handleBlur), _defineProperty(_React$cloneElement, "onChange", _this.handleChange), _defineProperty(_React$cloneElement, "onClick", _this.onInputClick), _defineProperty(_React$cloneElement, "onFocus", _this.handleFocus), _defineProperty(_React$cloneElement, "onKeyDown", _this.onInputKeyDown), _defineProperty(_React$cloneElement, "id", _this.props.id), _defineProperty(_React$cloneElement, "name", _this.props.name), _defineProperty(_React$cloneElement, "autoFocus", _this.props.autoFocus), _defineProperty(_React$cloneElement, "placeholder", _this.props.placeholderText), _defineProperty(_React$cloneElement, "disabled", _this.props.disabled), _defineProperty(_React$cloneElement, "autoComplete", _this.props.autoComplete), _defineProperty(_React$cloneElement, "className", classnames__default['default'](customInput.props.className, className)), _defineProperty(_React$cloneElement, "title", _this.props.title), _defineProperty(_React$cloneElement, "readOnly", _this.props.readOnly), _defineProperty(_React$cloneElement, "required", _this.props.required), _defineProperty(_React$cloneElement, "tabIndex", _this.props.tabIndex), _defineProperty(_React$cloneElement, "aria-labelledby", _this.props.ariaLabelledBy), _React$cloneElement));
    });

    _defineProperty(_assertThisInitialized(_this), "renderClearButton", function () {
      var _this$props2 = _this.props,
          isClearable = _this$props2.isClearable,
          selected = _this$props2.selected,
          clearButtonTitle = _this$props2.clearButtonTitle,
          _this$props2$ariaLabe = _this$props2.ariaLabelClose,
          ariaLabelClose = _this$props2$ariaLabe === void 0 ? "Close" : _this$props2$ariaLabe;

      if (isClearable && selected != null) {
        return /*#__PURE__*/React__default['default'].createElement("button", {
          type: "button",
          className: "react-datepicker__close-icon",
          "aria-label": ariaLabelClose,
          onClick: _this.onClearClick,
          title: clearButtonTitle,
          tabIndex: -1
        });
      } else {
        return null;
      }
    });

    _this.state = _this.calcInitialState();
    return _this;
  }

  _createClass(DatePicker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener("scroll", this.onScroll, true);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.inline && hasPreSelectionChanged(prevProps.selected, this.props.selected)) {
        this.setPreSelection(this.props.selected);
      }

      if (this.state.monthSelectedIn !== undefined && prevProps.monthsShown !== this.props.monthsShown) {
        this.setState({
          monthSelectedIn: 0
        });
      }

      if (prevProps.highlightDates !== this.props.highlightDates) {
        this.setState({
          highlightDates: getHightLightDaysMap(this.props.highlightDates)
        });
      }

      if (!prevState.focused && !isEqual(prevProps.selected, this.props.selected)) {
        this.setState({
          inputValue: null
        });
      }

      if (prevState.open !== this.state.open) {
        if (prevState.open === false && this.state.open === true) {
          this.props.onCalendarOpen();
        }

        if (prevState.open === true && this.state.open === false) {
          this.props.onCalendarClose();
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.clearPreventFocusTimeout();
      window.removeEventListener("scroll", this.onScroll, true);
    }
  }, {
    key: "render",
    value: function render() {
      var calendar = this.renderCalendar();

      if (this.props.inline && !this.props.withPortal) {
        return calendar;
      }

      if (this.props.withPortal) {
        return /*#__PURE__*/React__default['default'].createElement("div", null, !this.props.inline ? /*#__PURE__*/React__default['default'].createElement("div", {
          className: "react-datepicker__input-container"
        }, this.renderDateInput(), this.renderClearButton()) : null, this.state.open || this.props.inline ? /*#__PURE__*/React__default['default'].createElement("div", {
          className: "react-datepicker__portal"
        }, calendar) : null);
      }

      return /*#__PURE__*/React__default['default'].createElement(PopperComponent, {
        className: this.props.popperClassName,
        wrapperClassName: this.props.wrapperClassName,
        hidePopper: !this.isCalendarOpen(),
        portalId: this.props.portalId,
        popperModifiers: this.props.popperModifiers,
        targetComponent: /*#__PURE__*/React__default['default'].createElement("div", {
          className: "react-datepicker__input-container"
        }, this.renderDateInput(), this.renderClearButton()),
        popperContainer: this.props.popperContainer,
        popperComponent: calendar,
        popperPlacement: this.props.popperPlacement,
        popperProps: this.props.popperProps,
        popperOnKeyDown: this.onPopperKeyDown,
        enableTabLoop: this.props.enableTabLoop
      });
    }
  }]);

  return DatePicker;
}(React__default['default'].Component);
var PRESELECT_CHANGE_VIA_INPUT = "input";
var PRESELECT_CHANGE_VIA_NAVIGATE = "navigate";

exports.CalendarContainer = CalendarContainer;
exports.default = DatePicker;
exports.getDefaultLocale = getDefaultLocale;
exports.registerLocale = registerLocale;
exports.setDefaultLocale = setDefaultLocale;
