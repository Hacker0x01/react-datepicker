import React, { Component } from "react";

import {
  addMonths,
  formatDate,
  getStartOfMonth,
  isAfter,
  isSameMonth,
  isSameYear,
  newDate,
  getTime,
  type Locale,
} from "./date_utils";
import MonthYearDropdownOptions from "./month_year_dropdown_options";

interface MonthYearDropdownOptionsProps
  extends React.ComponentPropsWithoutRef<typeof MonthYearDropdownOptions> {}

interface MonthYearDropdownProps
  extends Omit<MonthYearDropdownOptionsProps, "onChange" | "onCancel"> {
  dropdownMode: "scroll" | "select";
  onChange: (monthYear: Date) => void;
  locale?: Locale;
}

interface MonthYearDropdownState {
  dropdownVisible: boolean;
}

export default class MonthYearDropdown extends Component<
  MonthYearDropdownProps,
  MonthYearDropdownState
> {
  state: MonthYearDropdownState = {
    dropdownVisible: false,
  };

  renderSelectOptions = (): React.ReactElement[] => {
    let currDate = getStartOfMonth(this.props.minDate);
    const lastDate = getStartOfMonth(this.props.maxDate);
    const options = [];

    while (!isAfter(currDate, lastDate)) {
      const timePoint = getTime(currDate);
      options.push(
        <option key={timePoint} value={timePoint}>
          {formatDate(currDate, this.props.dateFormat, this.props.locale)}
        </option>,
      );

      currDate = addMonths(currDate, 1);
    }

    return options;
  };

  onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    this.onChange(parseInt(event.target.value));
  };

  renderSelectMode = (): React.ReactElement => (
    <select
      value={getTime(getStartOfMonth(this.props.date))}
      className="react-datepicker__month-year-select"
      onChange={this.onSelectChange}
    >
      {this.renderSelectOptions()}
    </select>
  );

  renderReadView = (visible: boolean): React.ReactElement => {
    const yearMonth = formatDate(
      this.props.date,
      this.props.dateFormat,
      this.props.locale,
    );

    return (
      <div
        key="read"
        style={{ visibility: visible ? "visible" : "hidden" }}
        className="react-datepicker__month-year-read-view"
        onClick={this.toggleDropdown}
      >
        <span className="react-datepicker__month-year-read-view--down-arrow" />
        <span className="react-datepicker__month-year-read-view--selected-month-year">
          {yearMonth}
        </span>
      </div>
    );
  };

  renderDropdown = (): React.ReactElement => (
    <MonthYearDropdownOptions
      key="dropdown"
      {...this.props}
      onChange={this.onChange}
      onCancel={this.toggleDropdown}
    />
  );

  renderScrollMode = (): React.ReactElement[] => {
    const { dropdownVisible } = this.state;
    const result = [this.renderReadView(!dropdownVisible)];
    if (dropdownVisible) {
      result.unshift(this.renderDropdown());
    }
    return result;
  };

  onChange = (monthYearPoint: number): void => {
    this.toggleDropdown();

    const changedDate = newDate(monthYearPoint);

    if (
      isSameYear(this.props.date, changedDate) &&
      isSameMonth(this.props.date, changedDate)
    ) {
      return;
    }

    this.props.onChange(changedDate);
  };

  toggleDropdown = (): void =>
    this.setState({
      dropdownVisible: !this.state.dropdownVisible,
    });

  render(): React.ReactElement {
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
        className={`react-datepicker__month-year-dropdown-container react-datepicker__month-year-dropdown-container--${this.props.dropdownMode}`}
      >
        {renderedDropdown}
      </div>
    );
  }
}
