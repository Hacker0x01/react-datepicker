import React, { Component } from "react";

import { getYear } from "./date_utils";
import YearDropdownOptions from "./year_dropdown_options";

interface YearDropdownOptionsProps
  extends React.ComponentPropsWithoutRef<typeof YearDropdownOptions> {}

interface YearDropdownProps
  extends Omit<YearDropdownOptionsProps, "onChange" | "onCancel"> {
  adjustDateOnChange?: boolean;
  dropdownMode: "scroll" | "select";
  onChange: (year: number) => void;
  date: Date;
  onSelect?: (date: Date, event?: React.MouseEvent<HTMLDivElement>) => void;
  setOpen?: (open: boolean) => void;
}

interface YearDropdownState {
  dropdownVisible: boolean;
}

export default class YearDropdown extends Component<
  YearDropdownProps,
  YearDropdownState
> {
  state: YearDropdownState = {
    dropdownVisible: false,
  };

  renderSelectOptions = (): JSX.Element[] => {
    const minYear: number = this.props.minDate
      ? getYear(this.props.minDate)
      : 1900;
    const maxYear: number = this.props.maxDate
      ? getYear(this.props.maxDate)
      : 2100;

    const options: JSX.Element[] = [];
    for (let i = minYear; i <= maxYear; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>,
      );
    }
    return options;
  };

  onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    this.onChange(parseInt(event.target.value));
  };

  renderSelectMode = (): JSX.Element => (
    <select
      value={this.props.year}
      className="react-datepicker__year-select"
      onChange={this.onSelectChange}
    >
      {this.renderSelectOptions()}
    </select>
  );

  renderReadView = (visible: boolean): JSX.Element => (
    <div
      key="read"
      style={{ visibility: visible ? "visible" : "hidden" }}
      className="react-datepicker__year-read-view"
      onClick={(event: React.MouseEvent<HTMLDivElement>): void =>
        this.toggleDropdown(event)
      }
    >
      <span className="react-datepicker__year-read-view--down-arrow" />
      <span className="react-datepicker__year-read-view--selected-year">
        {this.props.year}
      </span>
    </div>
  );

  renderDropdown = (): JSX.Element => (
    <YearDropdownOptions
      key="dropdown"
      {...this.props}
      onChange={this.onChange}
      onCancel={this.toggleDropdown}
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

  onChange = (year: number): void => {
    this.toggleDropdown();
    if (year === this.props.year) return;
    this.props.onChange(year);
  };

  toggleDropdown = (event?: React.MouseEvent<HTMLDivElement>): void => {
    this.setState(
      {
        dropdownVisible: !this.state.dropdownVisible,
      },
      () => {
        if (this.props.adjustDateOnChange) {
          this.handleYearChange(this.props.date, event);
        }
      },
    );
  };

  handleYearChange = (
    date: Date,
    event?: React.MouseEvent<HTMLDivElement>,
  ): void => {
    this.onSelect?.(date, event);
    this.setOpen();
  };

  onSelect = (date: Date, event?: React.MouseEvent<HTMLDivElement>): void => {
    this.props.onSelect?.(date, event);
  };

  setOpen = (): void => {
    this.props.setOpen?.(true);
  };

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
        className={`react-datepicker__year-dropdown-container react-datepicker__year-dropdown-container--${this.props.dropdownMode}`}
      >
        {renderedDropdown}
      </div>
    );
  }
}
