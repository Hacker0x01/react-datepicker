'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _year_dropdown_options = require('./year_dropdown_options');

var _year_dropdown_options2 = _interopRequireDefault(_year_dropdown_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var YearDropdown = _react2.default.createClass({
  displayName: 'YearDropdown',

  propTypes: {
    onChange: _react2.default.PropTypes.func.isRequired,
    year: _react2.default.PropTypes.number.isRequired
  },

  getInitialState: function getInitialState() {
    return {
      dropdownVisible: false
    };
  },
  renderReadView: function renderReadView() {
    return _react2.default.createElement(
      'div',
      { className: 'react-datepicker__year-read-view', onClick: this.toggleDropdown },
      _react2.default.createElement(
        'span',
        { className: 'react-datepicker__year-read-view--selected-year' },
        this.props.year
      ),
      _react2.default.createElement('span', { className: 'react-datepicker__year-read-view--down-arrow' })
    );
  },
  renderDropdown: function renderDropdown() {
    return _react2.default.createElement(_year_dropdown_options2.default, {
      ref: 'options',
      year: this.props.year,
      onChange: this.onChange,
      onCancel: this.toggleDropdown });
  },
  onChange: function onChange(year) {
    this.toggleDropdown();
    if (year === this.props.year) return;
    this.props.onChange(year);
  },
  toggleDropdown: function toggleDropdown() {
    this.setState({
      dropdownVisible: !this.state.dropdownVisible
    });
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      this.state.dropdownVisible ? this.renderDropdown() : this.renderReadView()
    );
  }
});

module.exports = YearDropdown;
