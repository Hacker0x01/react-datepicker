'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _day = require('./day');

var _day2 = _interopRequireDefault(_day);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Week = _react2.default.createClass({
  displayName: 'Week',

  propTypes: {
    day: _react2.default.PropTypes.object.isRequired,
    endDate: _react2.default.PropTypes.object,
    excludeDates: _react2.default.PropTypes.array,
    filterDate: _react2.default.PropTypes.func,
    includeDates: _react2.default.PropTypes.array,
    maxDate: _react2.default.PropTypes.object,
    minDate: _react2.default.PropTypes.object,
    month: _react2.default.PropTypes.number,
    onDayClick: _react2.default.PropTypes.func,
    selected: _react2.default.PropTypes.object,
    startDate: _react2.default.PropTypes.object
  },

  handleDayClick: function handleDayClick(day) {
    if (this.props.onDayClick) {
      this.props.onDayClick(day);
    }
  },
  renderDays: function renderDays() {
    var _this = this;

    var startOfWeek = this.props.day.clone().startOf('week');
    return [0, 1, 2, 3, 4, 5, 6].map(function (offset) {
      var day = startOfWeek.clone().add(offset, 'days');
      return _react2.default.createElement(_day2.default, {
        key: offset,
        day: day,
        month: _this.props.month,
        onClick: _this.handleDayClick.bind(_this, day),
        minDate: _this.props.minDate,
        maxDate: _this.props.maxDate,
        excludeDates: _this.props.excludeDates,
        includeDates: _this.props.includeDates,
        filterDate: _this.props.filterDate,
        selected: _this.props.selected,
        startDate: _this.props.startDate,
        endDate: _this.props.endDate });
    });
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'react-datepicker__week' },
      this.renderDays()
    );
  }
});

module.exports = Week;
