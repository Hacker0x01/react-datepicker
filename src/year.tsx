import { clsx } from "clsx";
import React, { Component, createRef } from "react";

import {
  type DateFilterOptionsWithDisabled,
  addYears,
  getStartOfYear,
  getYear,
  getYearsPeriod,
  isDayDisabled,
  isDayExcluded,
  isSameDay,
  isSameYear,
  isSpaceKeyDown,
  isYearDisabled,
  isYearInRange,
  newDate,
  setYear,
  subYears,
  KeyType,
} from "./date_utils";

const VERTICAL_NAVIGATION_OFFSET = 3;

interface YearProps
  extends Pick<
    DateFilterOptionsWithDisabled,
    | "minDate"
    | "maxDate"
    | "excludeDates"
    | "includeDates"
    | "filterDate"
    | "disabled"
  > {
  clearSelectingDate?: VoidFunction;
  date?: Date;
  disabledKeyboardNavigation?: boolean;
  onDayClick?: (
    date: Date,
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>,
  ) => void;
  preSelection?: Date | null;
  setPreSelection?: (date?: Date | null) => void;
  selectsMultiple?: boolean;
  selectedDates?: Date[];
  selected?: Date | null;
  inline?: boolean;
  usePointerEvent?: boolean;
  onYearMouseEnter: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    year: number,
  ) => void;
  onYearMouseLeave: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    year: number,
  ) => void;
  selectingDate?: Date;
  renderYearContent?: (year: number) => React.ReactNode;
  selectsEnd?: boolean;
  selectsStart?: boolean;
  selectsRange?: boolean;
  startDate?: Date | null;
  endDate?: Date | null;
  yearItemNumber?: number;
  handleOnKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  yearClassName?: (date: Date) => string;
}

/**
 * `Year` is a component that represents a year in a date picker.
 *
 * @class
 * @param {YearProps} props - The properties that define the `Year` component.
 * @property {VoidFunction} [props.clearSelectingDate] - Function to clear the selected date.
 * @property {Date} [props.date] - The currently selected date.
 * @property {boolean} [props.disabledKeyboardNavigation] - If true, keyboard navigation is disabled.
 * @property {Date} [props.endDate] - The end date in a range selection.
 * @property {(date: Date) => void} props.onDayClick - Function to handle day click events.
 * @property {Date} props.preSelection - The date that is currently in focus.
 * @property {(date: Date) => void} props.setPreSelection - Function to set the pre-selected date.
 * @property {{ [key: string]: any }} props.selected - The selected date(s).
 * @property {boolean} props.inline - If true, the date picker is displayed inline.
 * @property {Date} props.maxDate - The maximum selectable date.
 * @property {Date} props.minDate - The minimum selectable date.
 * @property {boolean} props.usePointerEvent - If true, pointer events are used instead of mouse events.
 * @property {(date: Date) => void} props.onYearMouseEnter - Function to handle mouse enter events on a year.
 * @property {(date: Date) => void} props.onYearMouseLeave - Function to handle mouse leave events on a year.
 */
export default class Year extends Component<YearProps> {
  constructor(props: YearProps) {
    super(props);
  }

  YEAR_REFS = [...Array(this.props.yearItemNumber)].map(() =>
    createRef<HTMLDivElement>(),
  );

  isDisabled = (date: Date) =>
    isDayDisabled(date, {
      minDate: this.props.minDate,
      maxDate: this.props.maxDate,
      excludeDates: this.props.excludeDates,
      includeDates: this.props.includeDates,
      filterDate: this.props.filterDate,
    });

  isExcluded = (date: Date) =>
    isDayExcluded(date, {
      excludeDates: this.props.excludeDates,
    });

  selectingDate = () => this.props.selectingDate ?? this.props.preSelection;

  updateFocusOnPaginate = (refIndex: number) => {
    const waitForReRender = () => {
      this.YEAR_REFS[refIndex]?.current?.focus();
    };

    window.requestAnimationFrame(waitForReRender);
  };

  handleYearClick = (
    day: Date,
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (this.props.onDayClick) {
      this.props.onDayClick(day, event);
    }
  };

  handleYearNavigation = (newYear: number, newDate: Date) => {
    const { date, yearItemNumber } = this.props;
    if (date === undefined || yearItemNumber === undefined) {
      return;
    }

    const { startPeriod } = getYearsPeriod(date, yearItemNumber);

    if (this.isDisabled(newDate) || this.isExcluded(newDate)) {
      return;
    }
    this.props.setPreSelection?.(newDate);

    if (newYear - startPeriod < 0) {
      this.updateFocusOnPaginate(yearItemNumber - (startPeriod - newYear));
    } else if (newYear - startPeriod >= yearItemNumber) {
      this.updateFocusOnPaginate(
        Math.abs(yearItemNumber - (newYear - startPeriod)),
      );
    } else this.YEAR_REFS[newYear - startPeriod]?.current?.focus();
  };

  isSameDay = (y: Date, other: Date) => isSameDay(y, other);

  isCurrentYear = (y: number) => y === getYear(newDate());

  isRangeStart = (y: number) =>
    this.props.startDate &&
    this.props.endDate &&
    isSameYear(setYear(newDate(), y), this.props.startDate);

  isRangeEnd = (y: number) =>
    this.props.startDate &&
    this.props.endDate &&
    isSameYear(setYear(newDate(), y), this.props.endDate);

  isInRange = (y: number) =>
    isYearInRange(y, this.props.startDate, this.props.endDate);

  isInSelectingRange = (y: number) => {
    const { selectsStart, selectsEnd, selectsRange, startDate, endDate } =
      this.props;

    if (
      !(selectsStart || selectsEnd || selectsRange) ||
      !this.selectingDate()
    ) {
      return false;
    }
    if (selectsStart && endDate) {
      return isYearInRange(y, this.selectingDate(), endDate);
    }
    if (selectsEnd && startDate) {
      return isYearInRange(y, startDate, this.selectingDate());
    }
    if (selectsRange && startDate && !endDate) {
      return isYearInRange(y, startDate, this.selectingDate());
    }
    return false;
  };

  isSelectingRangeStart = (y: number) => {
    if (!this.isInSelectingRange(y)) {
      return false;
    }

    const { startDate, selectsStart } = this.props;
    const _year = setYear(newDate(), y);

    if (selectsStart) {
      return isSameYear(_year, this.selectingDate() ?? null);
    }
    return isSameYear(_year, startDate ?? null);
  };

  isSelectingRangeEnd = (y: number) => {
    if (!this.isInSelectingRange(y)) {
      return false;
    }

    const { endDate, selectsEnd, selectsRange } = this.props;
    const _year = setYear(newDate(), y);

    if (selectsEnd || selectsRange) {
      return isSameYear(_year, this.selectingDate() ?? null);
    }
    return isSameYear(_year, endDate ?? null);
  };

  isKeyboardSelected = (y: number) => {
    if (
      this.props.disabledKeyboardNavigation ||
      this.props.date === undefined ||
      this.props.preSelection == null
    ) {
      return;
    }

    const {
      minDate,
      maxDate,
      excludeDates,
      includeDates,
      filterDate,
      selected,
    } = this.props;

    const date = getStartOfYear(setYear(this.props.date, y));
    const isDisabled =
      (minDate || maxDate || excludeDates || includeDates || filterDate) &&
      isYearDisabled(y, this.props);

    const isSelectedDay =
      !!selected && isSameDay(date, getStartOfYear(selected));
    const isKeyboardSelectedDay = isSameDay(
      date,
      getStartOfYear(this.props.preSelection),
    );

    return (
      !this.props.inline &&
      !isSelectedDay &&
      isKeyboardSelectedDay &&
      !isDisabled
    );
  };

  isSelectedYear = (year: number) => {
    const { selectsMultiple, selected, selectedDates } = this.props;

    if (selectsMultiple) {
      return selectedDates?.some((date) => year === getYear(date));
    }
    return !!selected && year === getYear(selected);
  };

  onYearClick = (
    event:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.KeyboardEvent<HTMLDivElement>,
    y: number,
  ) => {
    const { date } = this.props;
    if (date === undefined) {
      return;
    }
    this.handleYearClick(getStartOfYear(setYear(date, y)), event);
  };

  onYearKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, y: number) => {
    const { key } = event;
    const { date, yearItemNumber, handleOnKeyDown } = this.props;

    if (key !== KeyType.Tab) {
      // preventDefault on tab event blocks focus change
      event.preventDefault();
    }

    if (!this.props.disabledKeyboardNavigation) {
      switch (key) {
        case KeyType.Enter:
          if (this.props.selected == null) {
            break;
          }
          this.onYearClick(event, y);
          this.props.setPreSelection?.(this.props.selected);
          break;
        case KeyType.ArrowRight:
          if (this.props.preSelection == null) {
            break;
          }
          this.handleYearNavigation(
            y + 1,
            addYears(this.props.preSelection, 1),
          );
          break;
        case KeyType.ArrowLeft:
          if (this.props.preSelection == null) {
            break;
          }
          this.handleYearNavigation(
            y - 1,
            subYears(this.props.preSelection, 1),
          );
          break;
        case KeyType.ArrowUp: {
          if (
            date === undefined ||
            yearItemNumber === undefined ||
            this.props.preSelection == null
          ) {
            break;
          }
          const { startPeriod } = getYearsPeriod(date, yearItemNumber);
          let offset = VERTICAL_NAVIGATION_OFFSET;
          let newYear = y - offset;

          if (newYear < startPeriod) {
            const leftOverOffset = yearItemNumber % offset;

            if (y >= startPeriod && y < startPeriod + leftOverOffset) {
              offset = leftOverOffset;
            } else {
              offset += leftOverOffset;
            }

            newYear = y - offset;
          }

          this.handleYearNavigation(
            newYear,
            subYears(this.props.preSelection, offset),
          );
          break;
        }
        case KeyType.ArrowDown: {
          if (
            date === undefined ||
            yearItemNumber === undefined ||
            this.props.preSelection == null
          ) {
            break;
          }
          const { endPeriod } = getYearsPeriod(date, yearItemNumber);
          let offset = VERTICAL_NAVIGATION_OFFSET;
          let newYear = y + offset;

          if (newYear > endPeriod) {
            const leftOverOffset = yearItemNumber % offset;

            if (y <= endPeriod && y > endPeriod - leftOverOffset) {
              offset = leftOverOffset;
            } else {
              offset += leftOverOffset;
            }

            newYear = y + offset;
          }

          this.handleYearNavigation(
            newYear,
            addYears(this.props.preSelection, offset),
          );
          break;
        }
      }
    }

    handleOnKeyDown && handleOnKeyDown(event);
  };

  getYearClassNames = (y: number) => {
    const {
      date,
      disabled,
      minDate,
      maxDate,
      excludeDates,
      includeDates,
      filterDate,
      yearClassName,
    } = this.props;

    return clsx(
      "react-datepicker__year-text",
      `react-datepicker__year-${y}`,
      date ? yearClassName?.(setYear(date, y)) : undefined,
      {
        "react-datepicker__year-text--selected": this.isSelectedYear(y),
        "react-datepicker__year-text--disabled":
          (minDate ||
            maxDate ||
            excludeDates ||
            includeDates ||
            filterDate ||
            disabled) &&
          isYearDisabled(y, this.props),
        "react-datepicker__year-text--keyboard-selected":
          this.isKeyboardSelected(y),
        "react-datepicker__year-text--range-start": this.isRangeStart(y),
        "react-datepicker__year-text--range-end": this.isRangeEnd(y),
        "react-datepicker__year-text--in-range": this.isInRange(y),
        "react-datepicker__year-text--in-selecting-range":
          this.isInSelectingRange(y),
        "react-datepicker__year-text--selecting-range-start":
          this.isSelectingRangeStart(y),
        "react-datepicker__year-text--selecting-range-end":
          this.isSelectingRangeEnd(y),
        "react-datepicker__year-text--today": this.isCurrentYear(y),
      },
    );
  };

  getYearTabIndex = (y: number) => {
    if (
      this.props.disabledKeyboardNavigation ||
      this.props.preSelection == null
    ) {
      return "-1";
    }
    const preSelected = getYear(this.props.preSelection);
    const isPreSelectedYearDisabled = isYearDisabled(y, this.props);

    return y === preSelected && !isPreSelectedYearDisabled ? "0" : "-1";
  };

  getYearContent = (y: number) => {
    return this.props.renderYearContent ? this.props.renderYearContent(y) : y;
  };

  render() {
    const yearsList = [];
    const { date, yearItemNumber, onYearMouseEnter, onYearMouseLeave } =
      this.props;
    if (date === undefined) {
      return null;
    }
    const { startPeriod, endPeriod } = getYearsPeriod(date, yearItemNumber);

    for (let y = startPeriod; y <= endPeriod; y++) {
      yearsList.push(
        <div
          ref={this.YEAR_REFS[y - startPeriod]}
          onClick={(event) => {
            this.onYearClick(event, y);
          }}
          onKeyDown={(event) => {
            if (isSpaceKeyDown(event)) {
              event.preventDefault();
              event.key = KeyType.Enter;
            }

            this.onYearKeyDown(event, y);
          }}
          tabIndex={Number(this.getYearTabIndex(y))}
          className={this.getYearClassNames(y)}
          onMouseEnter={
            !this.props.usePointerEvent
              ? (event) => onYearMouseEnter(event, y)
              : undefined
          }
          onPointerEnter={
            this.props.usePointerEvent
              ? (event) => onYearMouseEnter(event, y)
              : undefined
          }
          onMouseLeave={
            !this.props.usePointerEvent
              ? (event) => onYearMouseLeave(event, y)
              : undefined
          }
          onPointerLeave={
            this.props.usePointerEvent
              ? (event) => onYearMouseLeave(event, y)
              : undefined
          }
          key={y}
          aria-current={this.isCurrentYear(y) ? "date" : undefined}
        >
          {this.getYearContent(y)}
        </div>,
      );
    }

    return (
      <div className="react-datepicker__year">
        <div
          className="react-datepicker__year-wrapper"
          onMouseLeave={
            !this.props.usePointerEvent
              ? this.props.clearSelectingDate
              : undefined
          }
          onPointerLeave={
            this.props.usePointerEvent
              ? this.props.clearSelectingDate
              : undefined
          }
        >
          {yearsList}
        </div>
      </div>
    );
  }
}
