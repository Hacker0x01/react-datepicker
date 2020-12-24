import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  addMonths,
  formatDate,
  getStartOfMonth,
  newDate,
  isAfter,
  isSameMonth,
  isSameYear,
  getTime
} from "./date_utils";

function generateMonthYears(minDate, maxDate) {
  const list = [];

  let currDate = getStartOfMonth(minDate);
  const lastDate = getStartOfMonth(maxDate);

  while (!isAfter(currDate, lastDate)) {
    list.push(newDate(currDate));

    currDate = addMonths(currDate, 1);
  }
  return list;
}

export default class MonthYearDropdownOptions extends React.Component {
  static propTypes = {
    minDate: PropTypes.instanceOf(Date).isRequired,
    maxDate: PropTypes.instanceOf(Date).isRequired,
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    scrollableMonthYearDropdown: PropTypes.bool,
    date: PropTypes.instanceOf(Date).isRequired,
    dateFormat: PropTypes.string.isRequired,
    locale: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      monthYearsList: generateMonthYears(this.props.minDate, this.props.maxDate)
    };
  }

  renderOptions = () => {
    return this.state.monthYearsList.map(monthYear => {
      const monthYearPoint = getTime(monthYear);
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
          onClick={this.onChange.bind(this, monthYearPoint)}
        >
          {isSameMonthYear ? (
            <span className="react-datepicker__month-year-option--selected">
              ✓
            </span>
          ) : (
            ""
          )}
          {formatDate(monthYear, this.props.dateFormat, this.props.locale)}
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
