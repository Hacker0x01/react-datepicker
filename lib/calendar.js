'use strict';

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _year_dropdown = require('./year_dropdown');

var _year_dropdown2 = _interopRequireDefault(_year_dropdown);

var _month = require('./month');

var _month2 = _interopRequireDefault(_month);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _date_utils = require('./date_utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Calendar = _react2.default.createClass({
  displayName: 'Calendar',

  propTypes: {
    dateFormat: _react2.default.PropTypes.string.isRequired,
    endDate: _react2.default.PropTypes.object,
    excludeDates: _react2.default.PropTypes.array,
    filterDate: _react2.default.PropTypes.func,
    includeDates: _react2.default.PropTypes.array,
    locale: _react2.default.PropTypes.string,
    maxDate: _react2.default.PropTypes.object,
    minDate: _react2.default.PropTypes.object,
    onClickOutside: _react2.default.PropTypes.func.isRequired,
    onSelect: _react2.default.PropTypes.func.isRequired,
    openToDate: _react2.default.PropTypes.object,
    selected: _react2.default.PropTypes.object,
    showYearDropdown: _react2.default.PropTypes.bool,
    startDate: _react2.default.PropTypes.object,
    todayButton: _react2.default.PropTypes.string
  },

  mixins: [require('react-onclickoutside')],

  getInitialState: function getInitialState() {
    return {
      date: this.localizeMoment(this.getDateInView())
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.selected && !(0, _date_utils.isSameDay)(nextProps.selected, this.props.selected)) {
      this.setState({
        date: this.localizeMoment(nextProps.selected)
      });
    }
  },
  handleClickOutside: function handleClickOutside(event) {
    this.props.onClickOutside(event);
  },
  getDateInView: function getDateInView() {
    var _props = this.props;
    var selected = _props.selected;
    var openToDate = _props.openToDate;

    var minDate = (0, _date_utils.getEffectiveMinDate)(this.props);
    var maxDate = (0, _date_utils.getEffectiveMaxDate)(this.props);
    var current = (0, _moment2.default)();
    if (selected) {
      return selected;
    } else if (minDate && minDate.isAfter(current)) {
      return minDate;
    } else if (maxDate && maxDate.isBefore(current)) {
      return maxDate;
    } else if (openToDate) {
      return openToDate;
    } else {
      return current;
    }
  },
  localizeMoment: function localizeMoment(date) {
    return date.clone().locale(this.props.locale || _moment2.default.locale());
  },
  increaseMonth: function increaseMonth() {
    this.setState({
      date: this.state.date.clone().add(1, 'month')
    });
  },
  decreaseMonth: function decreaseMonth() {
    this.setState({
      date: this.state.date.clone().subtract(1, 'month')
    });
  },
  handleDayClick: function handleDayClick(day) {
    this.props.onSelect(day);
  },
  changeYear: function changeYear(year) {
    this.setState({
      date: this.state.date.clone().set('year', year)
    });
  },
  header: function header() {
    var startOfWeek = this.state.date.clone().startOf('week');
    return [0, 1, 2, 3, 4, 5, 6].map(function (offset) {
      var day = startOfWeek.clone().add(offset, 'days');
      return _react2.default.createElement(
        'div',
        { key: offset, className: 'react-datepicker__day-name' },
        day.localeData().weekdaysMin(day)
      );
    });
  },
  renderPreviousMonthButton: function renderPreviousMonthButton() {
    if ((0, _date_utils.allDaysDisabledBefore)(this.state.date, 'month', this.props)) {
      return;
    }
    return _react2.default.createElement('a', {
      className: 'react-datepicker__navigation react-datepicker__navigation--previous',
      onClick: this.decreaseMonth });
  },
  renderNextMonthButton: function renderNextMonthButton() {
    if ((0, _date_utils.allDaysDisabledAfter)(this.state.date, 'month', this.props)) {
      return;
    }
    return _react2.default.createElement('a', {
      className: 'react-datepicker__navigation react-datepicker__navigation--next',
      onClick: this.increaseMonth });
  },
  renderCurrentMonth: function renderCurrentMonth() {
    var classes = ['react-datepicker__current-month'];
    if (this.props.showYearDropdown) {
      classes.push('react-datepicker__current-month--hasYearDropdown');
    }
    return _react2.default.createElement(
      'div',
      { className: classes.join(' ') },
      this.state.date.format(this.props.dateFormat)
    );
  },
  renderYearDropdown: function renderYearDropdown() {
    if (!this.props.showYearDropdown) {
      return;
    }
    return _react2.default.createElement(_year_dropdown2.default, {
      onChange: this.changeYear,
      year: this.state.date.year() });
  },
  renderTodayButton: function renderTodayButton() {
    var _this = this;

    if (!this.props.todayButton) {
      return;
    }
    return _react2.default.createElement(
      'div',
      { className: 'react-datepicker__today-button', onClick: function onClick() {
          return _this.props.onSelect((0, _moment2.default)());
        } },
      this.props.todayButton
    );
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'react-datepicker' },
      _react2.default.createElement('div', { className: 'react-datepicker__triangle' }),
      _react2.default.createElement(
        'div',
        { className: 'react-datepicker__header' },
        this.renderPreviousMonthButton(),
        this.renderCurrentMonth(),
        this.renderYearDropdown(),
        this.renderNextMonthButton(),
        _react2.default.createElement(
          'div',
          null,
          this.header()
        )
      ),
      _react2.default.createElement(_month2.default, {
        day: this.state.date,
        onDayClick: this.handleDayClick,
        minDate: this.props.minDate,
        maxDate: this.props.maxDate,
        excludeDates: this.props.excludeDates,
        includeDates: this.props.includeDates,
        filterDate: this.props.filterDate,
        selected: this.props.selected,
        startDate: this.props.startDate,
        endDate: this.props.endDate }),
      this.renderTodayButton()
    );
  }
});

module.exports = Calendar;
