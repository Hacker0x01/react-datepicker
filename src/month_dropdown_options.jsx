//@ts-check
import React from "react";
import PropTypes from "prop-types";

/**
 * @typedef {Object} Props
 * @property {number} month
 * @property {VoidFunction} onCancel
 * @property {(month:number) => void} onChange
 * @property {string[]} monthNames
 */

/**
 * @class
 * @extends {React.Component<Props, {}>}
 */
export default class MonthDropdownOptions extends React.Component {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    month: PropTypes.number.isRequired,
    monthNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  };

  /**
   * @param {number} i
   * @returns {boolean}
   */
  isSelectedMonth = (i) => this.props.month === i;

  /**
   * @returns {React.ReactNode[]}
   */
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

  /**
   *
   * @param {number} month
   * @returns {void}
   */
  onChange = (month) => this.props.onChange(month);

  /**
   * @returns {void}
   */
  handleClickOutside = () => this.props.onCancel();

  /**
   * @returns {React.ReactElement}
   */
  render() {
    return (
      <div className="react-datepicker__month-dropdown">
        {this.renderOptions()}
      </div>
    );
  }
}
