import React from "react";
import PropTypes from "prop-types";

export default class MonthDropdownOptions extends React.Component {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    month: PropTypes.number.isRequired,
    monthNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  };

  isSelectedMonth = (i) => this.props.month === i;

  renderOptions = () => {
    return this.props.monthNames.map((month, i) => (
      <div
        className={
          this.isSelectedMonth(i)
            ? "react-datepicker__month-option react-datepicker__month-option--selected_month"
            : "react-datepicker__month-option"
        }
        key={month}
        onClick={this.onChange.bind(this, i)}
        aria-selected={this.isSelectedMonth(i) ? "true" : undefined}
      >
        {this.isSelectedMonth(i) ? (
          <span className="react-datepicker__month-option--selected">✓</span>
        ) : (
          ""
        )}
        {month}
      </div>
    ));
  };

  onChange = (month) => this.props.onChange(month);

  handleClickOutside = () => this.props.onCancel();

  render() {
    return (
      <div className="react-datepicker__month-dropdown">
        {this.renderOptions()}
      </div>
    );
  }
}
