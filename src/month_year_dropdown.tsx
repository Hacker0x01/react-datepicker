import React from "react";
import MonthYearDropdownOptions from "./month_year_dropdown_options";
import onClickOutside from "react-onclickoutside";
import type { LocaleObj } from "./date_utils";
import {
  addMonths,
  formatDate,
  getStartOfMonth,
  isAfter,
  isSameMonth,
  isSameYear,
  newDate,
  getTime,
} from "./date_utils";

const WrappedMonthYearDropdownOptions = onClickOutside(
  MonthYearDropdownOptions,
);

interface MonthYearDropdownProps {
  dropdownMode: "scroll" | "select";
  dateFormat: string;
  locale?: string | LocaleObj;
  minDate: Date;
  maxDate: Date;
  date: Date;
  onChange: (monthYear: Date) => void;
  scrollableMonthYearDropdown?: boolean;
}

interface MonthYearDropdownState {
  dropdownVisible: boolean;
}

export default class MonthYearDropdown extends React.Component<
  MonthYearDropdownProps,
  MonthYearDropdownState
> {
  state: MonthYearDropdownState = {
    dropdownVisible: false,
  };

  renderSelectOptions = (): JSX.Element[] => {
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

  onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    this.onChange(e.target.value);
  };

  renderSelectMode = (): JSX.Element => (
    <select
      value={getTime(getStartOfMonth(this.props.date))}
      className="react-datepicker__month-year-select"
      onChange={this.onSelectChange}
    >
      {this.renderSelectOptions()}
    </select>
  );

  renderReadView = (visible: boolean): JSX.Element => {
    const yearMonth = formatDate(
      this.props.date,
      this.props.dateFormat,
      this.props.locale,
    );

    return (
      <div
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

  renderDropdown = (): JSX.Element => (
    <WrappedMonthYearDropdownOptions
      date={this.props.date}
      dateFormat={this.props.dateFormat}
      onChange={this.onChange}
      onCancel={this.toggleDropdown}
      minDate={this.props.minDate}
      maxDate={this.props.maxDate}
      scrollableMonthYearDropdown={this.props.scrollableMonthYearDropdown}
      locale={this.props.locale}
    />
  );

  renderScrollMode = (): JSX.Element[] => {
    const { dropdownVisible } = this.state;
    const result = [this.renderReadView(!dropdownVisible)];
    if (dropdownVisible) {
      result.unshift(this.renderDropdown());
    }
    return result;
  };

  onChange = (monthYearPoint: number | string): void => {
    this.toggleDropdown();

    const changedDate = newDate(
      typeof monthYearPoint === "string"
        ? parseInt(monthYearPoint)
        : monthYearPoint,
    );

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

  render(): JSX.Element {
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
