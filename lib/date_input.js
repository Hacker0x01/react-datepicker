'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _date_utils = require('./date_utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateInput = _react2.default.createClass({
  displayName: 'DateInput',

  amPmRegex: new RegExp("[0-9| ]+[pm|PM]+[^a-z|A-Z]+"),

  propTypes: {
    date: _react2.default.PropTypes.object,
    dateFormat: _react2.default.PropTypes.string,
    dateOnlyFormat: _react2.default.PropTypes.string,
    dateOnly: _react2.default.PropTypes.bool,
    disabled: _react2.default.PropTypes.bool,
    excludeDates: _react2.default.PropTypes.array,
    filterDate: _react2.default.PropTypes.func,
    includeDates: _react2.default.PropTypes.array,
    locale: _react2.default.PropTypes.string,
    maxDate: _react2.default.PropTypes.object,
    minDate: _react2.default.PropTypes.object,
    onBlur: _react2.default.PropTypes.func,
    onChange: _react2.default.PropTypes.func,
    onChangeDate: _react2.default.PropTypes.func,
    onInputKeyDown: _react2.default.PropTypes.func,
    isEmpty: _react2.default.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      dateFormat: 'L'
    };
  },
  getInitialState: function getInitialState() {
    return {
      value: this.props.isEmpty ? '' : this.safeDateFormat(this.props),
      manualDate: null
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    this.setState({
      value: newProps.isEmpty ? '' : this.safeDateFormat(newProps)
    });
  },
  onKeyDown: function onKeyDown(event) {
    if (event.key === 'Enter') {
      this.handleBlur(event);
    } else {
      this.props.onInputKeyDown(event);
    }
  },
  handleChange: function handleChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event);
    }
    if (!event.isDefaultPrevented()) {
      this.handleChangeDate(event.target.value);
    }
  },
  handleChangeDate: function handleChangeDate(value) {
    this.setState({
      manualDate: value,
      value: value
    });
  },
  safeDateFormat: function safeDateFormat(props) {
    return props.date && props.date.clone().locale(props.locale || _momentTimezone2.default.locale()).format(props.dateOnly ? props.dateOnlyFormat : props.dateFormat) || '';
  },
  handleBlur: function handleBlur(event) {
    this.checkManualDate();
  },
  checkManualDate: function checkManualDate() {
    var dateFormats = [this.props.DateOnlyFormat, "MMM D, YYYY", "MMM D, YY", "MMMM D, YYYY", "MMMM D, YY", "MMM/D/YYYY",

    // without commas
    "MMM D YYYY", "MMM D YY", "MMMM D YYYY", "MMMM D YY", "MMM-D-YYYY", "MM-DD-YYYY", "MM/DD/YYYY", "MM-DD-YY", "MM/DD/YY"];

    var timeFormats = ["HH:mm:ss a"];

    var dateTimeFormats = [];
    dateTimeFormats.push(this.props.dateFormat);
    dateFormats.forEach(function (dateFormat) {
      timeFormats.forEach(function (timeFormat) {
        dateTimeFormats.push(dateFormat + " " + timeFormat);
        dateTimeFormats.push(dateFormat); // just date without time
      });
    });

    if (this.state.manualDate === null) {
      return;
    }

    var fullDate = _momentTimezone2.default.tz(this.state.manualDate, dateTimeFormats, "GMT");

    var formatted = fullDate.format(this.props.dateFormat);
    var dateHour = fullDate.get('hour');
    var dateMinute = fullDate.get('minute');
    var isDateOnly = dateHour === 0 && dateMinute === 0 && this.state.manualDate.indexOf(":") === -1;

    // Add 12 hours if user entered something like 5:00pm (i.e. forgot to include a space)
    if (dateHour < 12 && this.amPmRegex.test(this.state.manualDate)) {
      dateHour += 12;
      fullDate.add(12, 'hours');
    }

    if (this.props.onChangeDate) {
      if (!isDateOnly) {
        if (fullDate.isValid() && !(0, _date_utils.isDayDisabled)(fullDate, this.props)) {
          this.props.onChangeDate(fullDate, false);
        } else if (this.state.value === '') {
          this.props.onChangeDate('', false);
        }
      } else {
        if ((0, _momentTimezone2.default)(this.state.manualDate).isValid() && !(0, _date_utils.isDayDisabled)((0, _momentTimezone2.default)(this.state.manualDate), this.props)) {
          this.props.onChangeDate((0, _momentTimezone2.default)(this.state.manualDate), true);
        }
      }
      this.state.manualDate = null;
    }
    this.setState({
      date: fullDate,
      value: this.safeDateFormat(this.props)
    });
  },
  focus: function focus() {
    this.refs.input.focus();
  },
  render: function render() {
    return _react2.default.createElement('input', _extends({
      ref: 'input',
      type: 'text'
    }, this.props, {
      value: this.state.value,
      onKeyDown: this.onKeyDown,
      onBlur: this.handleBlur,
      onChange: this.handleChange }));
  }
});

module.exports = DateInput;
