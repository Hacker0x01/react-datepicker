import React, { Component } from "react";

import {
  getMonthShortInLocale,
  getMonthInLocale,
  type Locale,
} from "./date_utils";
import MonthDropdownOptions from "./month_dropdown_options";

interface MonthDropdownOptionsProps
  extends React.ComponentPropsWithoutRef<typeof MonthDropdownOptions> {}

interface MonthDropdownProps
  extends Omit<
    MonthDropdownOptionsProps,
    "monthNames" | "onChange" | "onCancel"
  > {
  dropdownMode: "scroll" | "select";
  locale?: Locale;
  onChange: (month: number) => void;
  useShortMonthInDropdown?: boolean;
}

interface MonthDropdownState {
  dropdownVisible: boolean;
}

export default class MonthDropdown extends Component<
  MonthDropdownProps,
  MonthDropdownState
> {
  state: MonthDropdownState = {
    dropdownVisible: false,
  };

  renderSelectOptions = (monthNames: string[]): React.ReactElement[] =>
    monthNames.map<React.ReactElement>(
      (m: string, i: number): React.ReactElement => (
        <option key={m} value={i}>
          {m}
        </option>
      ),
    );

  renderSelectMode = (monthNames: string[]): React.ReactElement => (
    <select
      value={this.props.month}
      className="react-datepicker__month-select"
      onChange={(e) => this.onChange(parseInt(e.target.value))}
    >
      {this.renderSelectOptions(monthNames)}
    </select>
  );

  renderReadView = (
    visible: boolean,
    monthNames: string[],
  ): React.ReactElement => (
    <button
      key="read"
      type="button"
      style={{ visibility: visible ? "visible" : "hidden" }}
      className="react-datepicker__month-read-view"
      onClick={this.toggleDropdown}
    >
      <span className="react-datepicker__month-read-view--down-arrow" />
      <span className="react-datepicker__month-read-view--selected-month">
        {monthNames[this.props.month]}
      </span>
    </button>
  );

  renderDropdown = (monthNames: string[]): React.ReactElement => (
    <MonthDropdownOptions
      key="dropdown"
      {...this.props}
      monthNames={monthNames}
      onChange={this.onChange}
      onCancel={this.toggleDropdown}
    />
  );

  renderScrollMode = (monthNames: string[]): React.ReactElement[] => {
    const { dropdownVisible } = this.state;
    const result = [this.renderReadView(!dropdownVisible, monthNames)];
    if (dropdownVisible) {
      result.unshift(this.renderDropdown(monthNames));
    }
    return result;
  };

  onChange = (month: number): void => {
    this.toggleDropdown();
    if (month !== this.props.month) {
      this.props.onChange(month);
    }
  };

  toggleDropdown = (): void =>
    this.setState({
      dropdownVisible: !this.state.dropdownVisible,
    });

  render(): React.ReactElement {
    const monthNames: string[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
      this.props.useShortMonthInDropdown
        ? (m: number): string => getMonthShortInLocale(m, this.props.locale)
        : (m: number): string => getMonthInLocale(m, this.props.locale),
    );

    let renderedDropdown: React.ReactElement | React.ReactElement[];
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
