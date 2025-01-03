import React, { Component } from "react";

import { ClickOutsideWrapper } from "./click_outside_wrapper";

interface MonthDropdownOptionsProps {
  onCancel: VoidFunction;
  onChange: (month: number) => void;
  month: number;
  monthNames: string[];
}

export default class MonthDropdownOptions extends Component<MonthDropdownOptionsProps> {
  isSelectedMonth = (i: number): boolean => this.props.month === i;

  renderOptions = (): React.ReactElement[] => {
    return this.props.monthNames.map<React.ReactElement>(
      (month: string, i: number): React.ReactElement => (
        <div
          className={
            this.isSelectedMonth(i)
              ? "react-datepicker__month-option react-datepicker__month-option--selected_month"
              : "react-datepicker__month-option"
          }
          key={month}
          onClick={this.onChange.bind(this, i)}
          aria-selected={this.isSelectedMonth(i) ? "true" : undefined}
        >
          {this.isSelectedMonth(i) ? (
            <span className="react-datepicker__month-option--selected">✓</span>
          ) : (
            ""
          )}
          {month}
        </div>
      ),
    );
  };

  onChange = (month: number): void => this.props.onChange(month);

  handleClickOutside = (): void => this.props.onCancel();

  render(): React.ReactElement {
    return (
      <ClickOutsideWrapper
        className="react-datepicker__month-dropdown"
        onClickOutside={this.handleClickOutside}
      >
        {this.renderOptions()}
      </ClickOutsideWrapper>
    );
  }
}
