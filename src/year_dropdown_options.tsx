import { clsx } from "clsx";
import React, { Component, createRef } from "react";

import { ClickOutsideWrapper } from "./click_outside_wrapper";
import { getYear } from "./date_utils";

function generateYears(
  year: number,
  noOfYear: number,
  minDate?: Date,
  maxDate?: Date,
): number[] {
  const list: number[] = [];
  for (let i = 0; i < 2 * noOfYear + 1; i++) {
    const newYear = year + noOfYear - i;
    let isInRange = true;

    if (minDate) {
      isInRange = getYear(minDate) <= newYear;
    }

    if (maxDate && isInRange) {
      isInRange = getYear(maxDate) >= newYear;
    }

    if (isInRange) {
      list.push(newYear);
    }
  }

  return list;
}

interface YearDropdownOptionsProps {
  minDate?: Date;
  maxDate?: Date;
  onChange: (year: number) => void;
  onCancel: VoidFunction;
  scrollableYearDropdown?: boolean;
  year: number;
  yearDropdownItemNumber?: number;
}

interface YearDropdownOptionsState {
  yearsList: number[];
}

export default class YearDropdownOptions extends Component<
  YearDropdownOptionsProps,
  YearDropdownOptionsState
> {
  constructor(props: YearDropdownOptionsProps) {
    super(props);
    const { yearDropdownItemNumber, scrollableYearDropdown } = props;
    const noOfYear =
      yearDropdownItemNumber || (scrollableYearDropdown ? 10 : 5);

    this.state = {
      yearsList: generateYears(
        this.props.year,
        noOfYear,
        this.props.minDate,
        this.props.maxDate,
      ),
    };
    this.dropdownRef = createRef<HTMLDivElement>();
  }

  componentDidMount(): void {
    const dropdownCurrent = this.dropdownRef.current;

    if (dropdownCurrent) {
      // Get array from HTMLCollection
      const dropdownCurrentChildren = dropdownCurrent.children
        ? Array.from(dropdownCurrent.children)
        : null;
      const selectedYearOptionEl = dropdownCurrentChildren
        ? dropdownCurrentChildren.find((childEl) => childEl.ariaSelected)
        : null;

      dropdownCurrent.scrollTop =
        selectedYearOptionEl && selectedYearOptionEl instanceof HTMLElement
          ? selectedYearOptionEl.offsetTop +
            (selectedYearOptionEl.clientHeight - dropdownCurrent.clientHeight) /
              2
          : (dropdownCurrent.scrollHeight - dropdownCurrent.clientHeight) / 2;
    }
  }

  dropdownRef: React.RefObject<HTMLDivElement | null>;
  yearOptionButtonsRef: Record<number, HTMLDivElement | null> = {};

  handleOptionKeyDown = (year: number, e: React.KeyboardEvent): void => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        this.onChange(year);
        break;
      case "Escape":
        e.preventDefault();
        this.props.onCancel();
        break;
      case "ArrowUp":
      case "ArrowDown": {
        e.preventDefault();
        const newYear = year + (e.key === "ArrowUp" ? 1 : -1);
        // Add bounds checking to ensure the year exists in our refs
        if (this.yearOptionButtonsRef[newYear]) {
          this.yearOptionButtonsRef[newYear]?.focus();
        }
        break;
      }
    }
  };

  renderOptions = (): React.ReactElement[] => {
    // Clear refs to prevent memory leaks on re-render
    this.yearOptionButtonsRef = {};

    const selectedYear = this.props.year;
    const options = this.state.yearsList.map((year) => (
      <div
        ref={(el) => {
          this.yearOptionButtonsRef[year] = el;
          if (year === selectedYear) {
            el?.focus();
          }
        }}
        role="button"
        tabIndex={0}
        className={
          selectedYear === year
            ? "react-datepicker__year-option react-datepicker__year-option--selected_year"
            : "react-datepicker__year-option"
        }
        key={year}
        onClick={this.onChange.bind(this, year)}
        onKeyDown={this.handleOptionKeyDown.bind(this, year)}
        aria-selected={selectedYear === year ? "true" : undefined}
      >
        {selectedYear === year ? (
          <span className="react-datepicker__year-option--selected">✓</span>
        ) : (
          ""
        )}
        {year}
      </div>
    ));

    const minYear = this.props.minDate ? getYear(this.props.minDate) : null;
    const maxYear = this.props.maxDate ? getYear(this.props.maxDate) : null;

    if (!maxYear || !this.state.yearsList.find((year) => year === maxYear)) {
      options.unshift(
        <div
          className="react-datepicker__year-option"
          key={"upcoming"}
          onClick={this.incrementYears}
        >
          <a className="react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming" />
        </div>,
      );
    }

    if (!minYear || !this.state.yearsList.find((year) => year === minYear)) {
      options.push(
        <div
          className="react-datepicker__year-option"
          key={"previous"}
          onClick={this.decrementYears}
        >
          <a className="react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous" />
        </div>,
      );
    }

    return options;
  };

  onChange = (year: number): void => {
    this.props.onChange(year);
  };

  handleClickOutside = (): void => {
    this.props.onCancel();
  };

  shiftYears = (amount: number): void => {
    const years = this.state.yearsList.map(function (year) {
      return year + amount;
    });

    this.setState({
      yearsList: years,
    });
  };

  incrementYears = (): void => {
    return this.shiftYears(1);
  };

  decrementYears = (): void => {
    return this.shiftYears(-1);
  };

  render() {
    const dropdownClass = clsx({
      "react-datepicker__year-dropdown": true,
      "react-datepicker__year-dropdown--scrollable":
        this.props.scrollableYearDropdown,
    });

    return (
      <ClickOutsideWrapper
        className={dropdownClass}
        containerRef={this.dropdownRef}
        onClickOutside={this.handleClickOutside}
      >
        {this.renderOptions()}
      </ClickOutsideWrapper>
    );
  }
}
