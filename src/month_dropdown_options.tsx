import React, { Component } from "react";

import { ClickOutsideWrapper } from "./click_outside_wrapper";

interface MonthDropdownOptionsProps {
  onCancel: VoidFunction;
  onChange: (month: number) => void;
  month: number;
  monthNames: string[];
}

export default class MonthDropdownOptions extends Component<MonthDropdownOptionsProps> {
  monthOptionButtonsRef: Record<number, HTMLDivElement | null> = {};

  isSelectedMonth = (i: number): boolean => this.props.month === i;

  handleOptionKeyDown = (i: number, e: React.KeyboardEvent): void => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        this.onChange(i);
        break;
      case "Escape":
        e.preventDefault();
        this.props.onCancel();
        break;
      case "ArrowUp":
      case "ArrowDown": {
        e.preventDefault();
        const newMonth =
          (i + (e.key === "ArrowUp" ? -1 : 1) + this.props.monthNames.length) %
          this.props.monthNames.length;
        this.monthOptionButtonsRef[newMonth]?.focus();
        break;
      }
    }
  };

  renderOptions = (): React.ReactElement[] => {
    // Clear refs to prevent memory leaks on re-render
    this.monthOptionButtonsRef = {};

    return this.props.monthNames.map<React.ReactElement>(
      (month: string, i: number): React.ReactElement => (
        <div
          ref={(el) => {
            this.monthOptionButtonsRef[i] = el;
            if (this.isSelectedMonth(i)) {
              el?.focus();
            }
          }}
          role="button"
          tabIndex={0}
          className={
            this.isSelectedMonth(i)
              ? "react-datepicker__month-option react-datepicker__month-option--selected_month"
              : "react-datepicker__month-option"
          }
          key={month}
          onClick={this.onChange.bind(this, i)}
          onKeyDown={this.handleOptionKeyDown.bind(this, i)}
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
