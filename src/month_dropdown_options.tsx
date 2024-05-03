import React, { Component } from "react";

interface MonthDropdownOptionsProps {
  onCancel: VoidFunction;
  onChange: (month: number) => void;
  month: number;
  monthNames: string[];
}

export default class MonthDropdownOptions extends Component<MonthDropdownOptionsProps> {
  isSelectedMonth = (i: number): boolean => this.props.month === i;

  renderOptions = (): JSX.Element[] => {
    return this.props.monthNames.map<JSX.Element>(
      (month: string, i: number): JSX.Element => (
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

  render(): JSX.Element {
    return (
      <div className="react-datepicker__month-dropdown">
        {this.renderOptions()}
      </div>
    );
  }
}
