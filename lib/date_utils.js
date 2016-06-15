'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSameDay = isSameDay;
exports.isDayDisabled = isDayDisabled;
exports.allDaysDisabledBefore = allDaysDisabledBefore;
exports.allDaysDisabledAfter = allDaysDisabledAfter;
exports.getEffectiveMinDate = getEffectiveMinDate;
exports.getEffectiveMaxDate = getEffectiveMaxDate;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isSameDay(moment1, moment2) {
  if (moment1 && moment2) {
    return moment1.isSame(moment2, 'day');
  } else {
    return !moment1 && !moment2;
  }
}

function isDayDisabled(day) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var minDate = _ref.minDate;
  var maxDate = _ref.maxDate;
  var excludeDates = _ref.excludeDates;
  var includeDates = _ref.includeDates;
  var filterDate = _ref.filterDate;

  return minDate && day.isBefore(minDate, 'day') || maxDate && day.isAfter(maxDate, 'day') || excludeDates && excludeDates.some(function (excludeDate) {
    return isSameDay(day, excludeDate);
  }) || includeDates && !includeDates.some(function (includeDate) {
    return isSameDay(day, includeDate);
  }) || filterDate && !filterDate(day.clone()) || false;
}

function allDaysDisabledBefore(day, unit) {
  var _ref2 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var minDate = _ref2.minDate;
  var includeDates = _ref2.includeDates;

  var dateBefore = day.clone().subtract(1, unit);
  return minDate && dateBefore.isBefore(minDate, unit) || includeDates && includeDates.every(function (includeDate) {
    return dateBefore.isBefore(includeDate, unit);
  }) || false;
}

function allDaysDisabledAfter(day, unit) {
  var _ref3 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var maxDate = _ref3.maxDate;
  var includeDates = _ref3.includeDates;

  var dateAfter = day.clone().add(1, unit);
  return maxDate && dateAfter.isAfter(maxDate, unit) || includeDates && includeDates.every(function (includeDate) {
    return dateAfter.isAfter(includeDate, unit);
  }) || false;
}

function getEffectiveMinDate(_ref4) {
  var minDate = _ref4.minDate;
  var includeDates = _ref4.includeDates;

  if (includeDates && minDate) {
    return _moment2.default.min(includeDates.filter(function (includeDate) {
      return minDate.isSameOrBefore(includeDate, 'day');
    }));
  } else if (includeDates) {
    return _moment2.default.min(includeDates);
  } else {
    return minDate;
  }
}

function getEffectiveMaxDate(_ref5) {
  var maxDate = _ref5.maxDate;
  var includeDates = _ref5.includeDates;

  if (includeDates && maxDate) {
    return _moment2.default.max(includeDates.filter(function (includeDate) {
      return maxDate.isSameOrAfter(includeDate, 'day');
    }));
  } else if (includeDates) {
    return _moment2.default.max(includeDates);
  } else {
    return maxDate;
  }
}
