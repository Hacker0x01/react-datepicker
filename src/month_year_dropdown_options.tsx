import { clsx } from "clsx";
import React, { Component } from "react";

import { ClickOutsideWrapper } from "./click_outside_wrapper";
import {
  addMonths,
  addYears,
  subYears,
  formatDate,
  getStartOfMonth,
  newDate,
  isAfter,
  isSameMonth,
  isSameYear,
  getTime,
  type Locale,
} from "./date_utils";

// Default range: 5 years before and after current date
const DEFAULT_YEAR_RANGE = 5;

function generateMonthYears(
  minDate: Date | undefined,
  maxDate: Date | undefined,
  currentDate: Date,
): Date[] {
  const list = [];

  // Use defaults if minDate/maxDate not provided
  const effectiveMinDate = minDate ?? subYears(currentDate, DEFAULT_YEAR_RANGE);
  const effectiveMaxDate = maxDate ?? addYears(currentDate, DEFAULT_YEAR_RANGE);

  let currDate = getStartOfMonth(effectiveMinDate);
  const lastDate = getStartOfMonth(effectiveMaxDate);

  while (!isAfter(currDate, lastDate)) {
    list.push(newDate(currDate));

    currDate = addMonths(currDate, 1);
  }
  return list;
}

interface MonthYearDropdownOptionsProps {
  minDate?: Date;
  maxDate?: Date;
  onCancel: VoidFunction;
  onChange: (monthYear: number) => void;
  scrollableMonthYearDropdown?: boolean;
  date: Date;
  dateFormat: string;
  locale?: Locale;
}

interface MonthYearDropdownOptionsState {
  monthYearsList: Date[];
}

export default class MonthYearDropdownOptions extends Component<
  MonthYearDropdownOptionsProps,
  MonthYearDropdownOptionsState
> {
  constructor(props: MonthYearDropdownOptionsProps) {
    super(props);

    this.state = {
      monthYearsList: generateMonthYears(
        this.props.minDate,
        this.props.maxDate,
        this.props.date,
      ),
    };
  }

  monthYearOptionButtonsRef: Record<number, HTMLDivElement | null> = {};

  handleOptionKeyDown = (
    i: number,
    monthYearPoint: number,
    e: React.KeyboardEvent,
  ): void => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        this.onChange(monthYearPoint);
        break;
      case "Escape":
        e.preventDefault();
        this.props.onCancel();
        break;
      case "ArrowUp":
      case "ArrowDown": {
        e.preventDefault();
        const newIndex = i + (e.key === "ArrowUp" ? -1 : 1);
        this.monthYearOptionButtonsRef[newIndex]?.focus();
        break;
      }
    }
  };

  renderOptions = (): React.ReactElement[] => {
    // Clear refs to prevent memory leaks on re-render
    this.monthYearOptionButtonsRef = {};

    return this.state.monthYearsList.map<React.ReactElement>(
      (monthYear: Date, i: number): React.ReactElement => {
        const monthYearPoint = getTime(monthYear);
        const isSameMonthYear =
          isSameYear(this.props.date, monthYear) &&
          isSameMonth(this.props.date, monthYear);

        return (
          <div
            ref={(el) => {
              this.monthYearOptionButtonsRef[i] = el;
              if (isSameMonthYear) {
                el?.focus();
              }
            }}
            role="button"
            tabIndex={0}
            className={
              isSameMonthYear
                ? "react-datepicker__month-year-option--selected_month-year"
                : "react-datepicker__month-year-option"
            }
            key={monthYearPoint}
            onClick={this.onChange.bind(this, monthYearPoint)}
            onKeyDown={this.handleOptionKeyDown.bind(this, i, monthYearPoint)}
            aria-selected={isSameMonthYear ? "true" : undefined}
          >
            {isSameMonthYear ? (
              <span className="react-datepicker__month-year-option--selected">
                ✓
              </span>
            ) : (
              ""
            )}
            {formatDate(monthYear, this.props.dateFormat, this.props.locale)}
          </div>
        );
      },
    );
  };

  onChange = (monthYear: number): void => this.props.onChange(monthYear);

  handleClickOutside = (): void => {
    this.props.onCancel();
  };

  render(): React.ReactElement {
    const dropdownClass = clsx({
      "react-datepicker__month-year-dropdown": true,
      "react-datepicker__month-year-dropdown--scrollable":
        this.props.scrollableMonthYearDropdown,
    });

    return (
      <ClickOutsideWrapper
        className={dropdownClass}
        onClickOutside={this.handleClickOutside}
      >
        {this.renderOptions()}
      </ClickOutsideWrapper>
    );
  }
}
