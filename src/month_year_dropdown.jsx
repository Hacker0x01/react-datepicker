import React from "react";
import PropTypes from "prop-types";
import MonthYearDropdownOptions from "./month_year_dropdown_options";
import onClickOutside from "react-onclickoutside";
import {
  addMonths,
  formatDate,
  getStartOfMonth,
  isAfter,
  isSameMonth,
  isSameYear,
  localizeDate,
  newDate
} from "./date_utils";

var WrappedMonthYearDropdownOptions = onClickOutside(MonthYearDropdownOptions);

export default class MonthYearDropdown extends React.Component {
  static propTypes = {
    dropdownMode: PropTypes.oneOf(["scroll", "select"]).isRequired,
    dateFormat: PropTypes.string.isRequired,
    locale: PropTypes.string,
    maxDate: PropTypes.object.isRequired,
    minDate: PropTypes.object.isRequired,
    date: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    scrollableMonthYearDropdown: PropTypes.bool
  };

  state = {
    dropdownVisible: false
  };

  renderSelectOptions = () => {
    const currDate = getStartOfMonth(
      localizeDate(this.props.minDate, this.props.locale)
    );
    const lastDate = getStartOfMonth(
      localizeDate(this.props.maxDate, this.props.locale)
    );

    const options = [];

    while (!isAfter(currDate, lastDate)) {
      const timepoint = currDate.valueOf();
      options.push(
        <option key={timepoint} value={timepoint}>
          {formatDate(currDate, this.props.dateFormat)}
        </option>
      );

      addMonths(currDate, 1);
    }

    return options;
  };

  onSelectChange = e => {
    this.onChange(e.target.value);
  };

  renderSelectMode = () => (
    <select
      value={getStartOfMonth(this.props.date).valueOf()}
      className="react-datepicker__month-year-select"
      onChange={this.onSelectChange}
    >
      {this.renderSelectOptions()}
    </select>
  );

  renderReadView = visible => {
    const yearMonth = formatDate(
      localizeDate(newDate(this.props.date), this.props.locale),
      this.props.dateFormat
    );

    return (
      <div
        key="read"
        style={{ visibility: visible ? "visible" : "hidden" }}
        className="react-datepicker__month-year-read-view"
        onClick={event => this.toggleDropdown(event)}
      >
        <span className="react-datepicker__month-year-read-view--down-arrow" />
        <span className="react-datepicker__month-year-read-view--selected-month-year">
          {yearMonth}
        </span>
      </div>
    );
  };

  renderDropdown = () => (
    <WrappedMonthYearDropdownOptions
      key="dropdown"
      ref="options"
      date={this.props.date}
      dateFormat={this.props.dateFormat}
      onChange={this.onChange}
      onCancel={this.toggleDropdown}
      minDate={localizeDate(this.props.minDate, this.props.locale)}
      maxDate={localizeDate(this.props.maxDate, this.props.locale)}
      scrollableMonthYearDropdown={this.props.scrollableMonthYearDropdown}
    />
  );

  renderScrollMode = () => {
    const { dropdownVisible } = this.state;
    let result = [this.renderReadView(!dropdownVisible)];
    if (dropdownVisible) {
      result.unshift(this.renderDropdown());
    }
    return result;
  };

  onChange = monthYearPoint => {
    this.toggleDropdown();

    const changedDate = newDate(parseInt(monthYearPoint));

    if (
      isSameYear(this.props.date, changedDate) &&
      isSameMonth(this.props.date, changedDate)
    ) {
      return;
    }

    this.props.onChange(changedDate);
  };

  toggleDropdown = () =>
    this.setState({
      dropdownVisible: !this.state.dropdownVisible
    });

  render() {
    let renderedDropdown;
    switch (this.props.dropdownMode) {
      case "scroll":
        renderedDropdown = this.renderScrollMode();
        break;
      case "select":
        renderedDropdown = this.renderSelectMode();
        break;
    }

    return (
      <div
        className={`react-datepicker__month-year-dropdown-container react-datepicker__month-year-dropdown-container--${
          this.props.dropdownMode
        }`}
      >
        {renderedDropdown}
      </div>
    );
  }
}
