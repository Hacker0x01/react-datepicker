//@ts-check
import React, { createRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { getYear } from "./date_utils";

/**
 * @param {number} year
 * @param {number} noOfYear
 * @param {Date|undefined} minDate
 * @param {Date|undefined} maxDate
 * @returns {number[]}
 */
function generateYears(year, noOfYear, minDate, maxDate) {
  const list = [];
  for (let i = 0; i < 2 * noOfYear + 1; i++) {
    const newYear = year + noOfYear - i;
    let isInRange = true;

    if (minDate) {
      isInRange = getYear(minDate) <= newYear;
    }

    if (maxDate && isInRange) {
      isInRange = getYear(maxDate) >= newYear;
    }

    if (isInRange) {
      list.push(newYear);
    }
  }

  return list;
}

/**
 * @typedef {Object} Props
 * @property {Date|undefined} minDate
 * @property {Date|undefined} maxDate
 * @property {VoidFunction} onCancel
 * @property {(year:number) => void} onChange
 * @property {boolean|undefined} scrollableYearDropdown
 * @property {number} year
 * @property {number|undefined} yearDropdownItemNumber
 */

/**
 * @typedef {Object} State
 * @property {number[]} yearsList
 */

/**
 * @class
 * @extends {React.Component<Props, State>}
 */
export default class YearDropdownOptions extends React.Component {
  static propTypes = {
    minDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date),
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    scrollableYearDropdown: PropTypes.bool,
    year: PropTypes.number.isRequired,
    yearDropdownItemNumber: PropTypes.number,
  };

  /**
   * @constructor
   * @param {Props}  props
   */
  constructor(props) {
    super(props);
    const { yearDropdownItemNumber, scrollableYearDropdown } = props;
    const noOfYear =
      yearDropdownItemNumber || (scrollableYearDropdown ? 10 : 5);

    this.state = {
      yearsList: generateYears(
        this.props.year,
        noOfYear,
        this.props.minDate,
        this.props.maxDate,
      ),
    };
    /** @type {React.RefObject<HTMLDivElement>} */
    this.dropdownRef = createRef();
  }

  /**
   * @returns {void}
   */
  componentDidMount() {
    const dropdownCurrent = this.dropdownRef.current;

    if (dropdownCurrent) {
      // Get array from HTMLCollection
      const dropdownCurrentChildren = dropdownCurrent.children
        ? Array.from(dropdownCurrent.children)
        : null;
      const selectedYearOptionEl = dropdownCurrentChildren
        ? dropdownCurrentChildren.find((childEl) => childEl.ariaSelected)
        : null;

      dropdownCurrent.scrollTop = selectedYearOptionEl
        ? selectedYearOptionEl.offsetTop +
          (selectedYearOptionEl.clientHeight - dropdownCurrent.clientHeight) / 2
        : (dropdownCurrent.scrollHeight - dropdownCurrent.clientHeight) / 2;
    }
  }

  /**
   * @returns {React.ReactNode[]}
   */
  renderOptions = () => {
    const selectedYear = this.props.year;
    const options = this.state.yearsList.map((year) => (
      <div
        className={
          selectedYear === year
            ? "react-datepicker__year-option react-datepicker__year-option--selected_year"
            : "react-datepicker__year-option"
        }
        key={year}
        onClick={this.onChange.bind(this, year)}
        aria-selected={selectedYear === year ? "true" : undefined}
      >
        {selectedYear === year ? (
          <span className="react-datepicker__year-option--selected">✓</span>
        ) : (
          ""
        )}
        {year}
      </div>
    ));

    const minYear = this.props.minDate ? getYear(this.props.minDate) : null;
    const maxYear = this.props.maxDate ? getYear(this.props.maxDate) : null;

    if (!maxYear || !this.state.yearsList.find((year) => year === maxYear)) {
      options.unshift(
        <div
          className="react-datepicker__year-option"
          key={"upcoming"}
          onClick={this.incrementYears}
        >
          <a className="react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming" />
        </div>,
      );
    }

    if (!minYear || !this.state.yearsList.find((year) => year === minYear)) {
      options.push(
        <div
          className="react-datepicker__year-option"
          key={"previous"}
          onClick={this.decrementYears}
        >
          <a className="react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous" />
        </div>,
      );
    }

    return options;
  };

  /**
   * @param {number} year
   * @returns {void}
   */
  onChange = (year) => {
    this.props.onChange(year);
  };

  /**
   * @returns {void}
   */
  handleClickOutside = () => {
    this.props.onCancel();
  };

  /**
   * @param {number} amount
   * @returns {void}
   */
  shiftYears = (amount) => {
    const years = this.state.yearsList.map(function (year) {
      return year + amount;
    });

    this.setState({
      yearsList: years,
    });
  };

  /**
   * @returns {void}
   */
  incrementYears = () => {
    return this.shiftYears(1);
  };

  /**
   * @returns {void}
   */
  decrementYears = () => {
    return this.shiftYears(-1);
  };

  /**
   * @returns {React.ReactElement}
   */
  render() {
    let dropdownClass = classNames({
      "react-datepicker__year-dropdown": true,
      "react-datepicker__year-dropdown--scrollable":
        this.props.scrollableYearDropdown,
    });

    return (
      <div className={dropdownClass} ref={this.dropdownRef}>
        {this.renderOptions()}
      </div>
    );
  }
}
