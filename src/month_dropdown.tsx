import React, { Component } from "react";
import MonthDropdownOptions from "./month_dropdown_options";
import onClickOutside from "react-onclickoutside";
import {
  getMonthShortInLocale,
  getMonthInLocale,
  type Locale,
} from "./date_utils";

interface MonthDropdownOptionsProps
  extends React.ComponentPropsWithoutRef<typeof MonthDropdownOptions> {}

const WrappedMonthDropdownOptions = onClickOutside(MonthDropdownOptions);

interface MonthDropdownProps extends Pick<MonthDropdownOptionsProps, "month"> {
  dropdownMode: "scroll" | "select";
  locale?: Locale;
  onChange: (month: number | string) => void;
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
    const monthNames: string[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
      this.props.useShortMonthInDropdown
        ? (m: number): string => getMonthShortInLocale(m, this.props.locale)
        : (m: number): string => getMonthInLocale(m, this.props.locale),
    );

    let renderedDropdown: JSX.Element | JSX.Element[];
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
