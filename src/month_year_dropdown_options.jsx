import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  addMonths,
  cloneDate,
  formatDate,
  getStartOfMonth,
  isAfter,
  isSameMonth,
  isSameYear
} from "./date_utils";

function generateMonthYears(minDate, maxDate) {
  const list = [];

  const currDate = getStartOfMonth(cloneDate(minDate));
  const lastDate = getStartOfMonth(cloneDate(maxDate));

  while (!isAfter(currDate, lastDate)) {
    list.push(cloneDate(currDate));

    addMonths(currDate, 1);
  }

  return list;
}

export default class MonthYearDropdownOptions extends React.Component {
  static propTypes = {
    minDate: PropTypes.object.isRequired,
    maxDate: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    scrollableMonthYearDropdown: PropTypes.bool,
    date: PropTypes.object.isRequired,
    dateFormat: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      monthYearsList: generateMonthYears(this.props.minDate, this.props.maxDate)
    };
  }

  renderOptions = () => {
    return this.state.monthYearsList.map(monthYear => {
      const monthYearPoint = monthYear.valueOf();

      const isSameMonthYear =
        isSameYear(this.props.date, monthYear) &&
        isSameMonth(this.props.date, monthYear);

      return (
        <div
          className={
            isSameMonthYear
              ? "react-datepicker__month-year-option --selected_month-year"
              : "react-datepicker__month-year-option"
          }
          key={monthYearPoint}
          ref={monthYearPoint}
          onClick={this.onChange.bind(this, monthYearPoint)}
        >
          {isSameMonthYear ? (
            <span className="react-datepicker__month-year-option--selected">
              ✓
            </span>
          ) : (
            ""
          )}
          {formatDate(monthYear, this.props.dateFormat)}
        </div>
      );
    });
  };

  onChange = monthYear => this.props.onChange(monthYear);

  handleClickOutside = () => {
    this.props.onCancel();
  };

  render() {
    let dropdownClass = classNames({
      "react-datepicker__month-year-dropdown": true,
      "react-datepicker__month-year-dropdown--scrollable": this.props
        .scrollableMonthYearDropdown
    });

    return <div className={dropdownClass}>{this.renderOptions()}</div>;
  }
}
