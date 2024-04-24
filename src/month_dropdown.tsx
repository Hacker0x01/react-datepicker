import React from "react";
import MonthDropdownOptions from "./month_dropdown_options";
import onClickOutside from "react-onclickoutside";
import type { LocaleObj } from "./date_utils";
import { getMonthShortInLocale, getMonthInLocale } from "./date_utils";

const WrappedMonthDropdownOptions = onClickOutside(MonthDropdownOptions);

interface MonthDropdownProps {
  dropdownMode: "scroll" | "select";
  locale?: string | LocaleObj;
  month: number;
  onChange: (month: number | string) => void;
  useShortMonthInDropdown?: boolean;
}

interface MonthDropdownState {
  dropdownVisible: boolean;
}

export default class MonthDropdown extends React.Component<
  MonthDropdownProps,
  MonthDropdownState
> {
  state: MonthDropdownState = {
    dropdownVisible: false,
  };

  renderSelectOptions = (monthNames: string[]): JSX.Element[] =>
    monthNames.map<JSX.Element>(
      (m: string, i: number): JSX.Element => (
        <option key={m} value={i}>
          {m}
        </option>
      ),
    );

  renderSelectMode = (monthNames: string[]): JSX.Element => (
    <select
      value={this.props.month}
      className="react-datepicker__month-select"
      onChange={(e) => this.onChange(e.target.value)}
    >
      {this.renderSelectOptions(monthNames)}
    </select>
  );

  renderReadView = (visible: boolean, monthNames: string[]): JSX.Element => (
    <div
      key="read"
      style={{ visibility: visible ? "visible" : "hidden" }}
      className="react-datepicker__month-read-view"
      onClick={this.toggleDropdown}
    >
      <span className="react-datepicker__month-read-view--down-arrow" />
      <span className="react-datepicker__month-read-view--selected-month">
        {monthNames[this.props.month]}
      </span>
    </div>
  );

  renderDropdown = (monthNames: string[]): JSX.Element => (
    <WrappedMonthDropdownOptions
      key="dropdown"
      month={this.props.month}
      monthNames={monthNames}
      onChange={this.onChange}
      onCancel={this.toggleDropdown}
    />
  );

  renderScrollMode = (monthNames: string[]): JSX.Element[] => {
    const { dropdownVisible } = this.state;
    const result = [this.renderReadView(!dropdownVisible, monthNames)];
    if (dropdownVisible) {
      result.unshift(this.renderDropdown(monthNames));
    }
    return result;
  };

  onChange = (month: number | string): void => {
    this.toggleDropdown();
    if (month !== this.props.month) {
      this.props.onChange(month);
    }
  };

  toggleDropdown = (): void =>
    this.setState({
      dropdownVisible: !this.state.dropdownVisible,
    });

  render(): JSX.Element {
    const monthNames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
      this.props.useShortMonthInDropdown
        ? (m) => getMonthShortInLocale(m, this.props.locale)
        : (m) => getMonthInLocale(m, this.props.locale),
    );

    let renderedDropdown;
    switch (this.props.dropdownMode) {
      case "scroll":
        renderedDropdown = this.renderScrollMode(monthNames);
        break;
      case "select":
        renderedDropdown = this.renderSelectMode(monthNames);
        break;
    }

    return (
      <div
        className={`react-datepicker__month-dropdown-container react-datepicker__month-dropdown-container--${this.props.dropdownMode}`}
      >
        {renderedDropdown}
      </div>
    );
  }
}
