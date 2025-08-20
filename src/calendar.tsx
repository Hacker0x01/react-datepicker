import { clsx } from "clsx";
import { differenceInDays } from "date-fns";
import React, { Component, createRef } from "react";

import CalendarContainer from "./calendar_container";
import { ClickOutsideWrapper } from "./click_outside_wrapper";
import {
  newDate,
  setMonth,
  getMonth,
  addMonths,
  subMonths,
  getStartOfWeek,
  getStartOfToday,
  addDays,
  formatDate,
  setYear,
  getYear,
  isBefore,
  addYears,
  subYears,
  isAfter,
  getFormattedWeekdayInLocale,
  getWeekdayShortInLocale,
  getWeekdayMinInLocale,
  isSameDay,
  isSameMonth,
  monthDisabledBefore,
  monthDisabledAfter,
  yearDisabledBefore,
  yearDisabledAfter,
  yearsDisabledAfter,
  yearsDisabledBefore,
  quarterDisabledBefore,
  quarterDisabledAfter,
  getEffectiveMinDate,
  getEffectiveMaxDate,
  addZero,
  isValid,
  getYearsPeriod,
  DEFAULT_YEAR_ITEM_NUMBER,
  getMonthInLocale,
  type Locale,
  getStartOfMonth,
  getEndOfMonth,
  isDayDisabled,
} from "./date_utils";
import InputTime from "./input_time";
import Month from "./month";
import MonthDropdown from "./month_dropdown";
import MonthYearDropdown from "./month_year_dropdown";
import Time from "./time";
import Year from "./year";
import YearDropdown from "./year_dropdown";

import type { ClickOutsideHandler } from "./click_outside_wrapper";
import type { Day } from "date-fns";

interface YearDropdownProps
  extends React.ComponentPropsWithoutRef<typeof YearDropdown> {}

interface MonthDropdownProps
  extends React.ComponentPropsWithoutRef<typeof MonthDropdown> {}

interface MonthYearDropdownProps
  extends React.ComponentPropsWithoutRef<typeof MonthYearDropdown> {}

interface YearProps extends React.ComponentPropsWithoutRef<typeof Year> {}

interface MonthProps extends React.ComponentPropsWithoutRef<typeof Month> {}

interface TimeProps extends React.ComponentPropsWithoutRef<typeof Time> {}

interface InputTimeProps
  extends React.ComponentPropsWithoutRef<typeof InputTime> {}

const DROPDOWN_FOCUS_CLASSNAMES = [
  "react-datepicker__year-select",
  "react-datepicker__month-select",
  "react-datepicker__month-year-select",
];

export const OUTSIDE_CLICK_IGNORE_CLASS =
  "react-datepicker-ignore-onclickoutside";

const isDropdownSelect = (element: HTMLDivElement) => {
  const classNames = (element.className || "").split(/\s+/);
  return DROPDOWN_FOCUS_CLASSNAMES.some(
    (testClassname) => classNames.indexOf(testClassname) >= 0,
  );
};

export interface ReactDatePickerCustomHeaderProps {
  date: CalendarState["date"];
  customHeaderCount: number;
  monthDate: Date;
  changeMonth: (month: number) => void;
  changeYear: (year: number) => void;
  decreaseMonth: VoidFunction;
  increaseMonth: VoidFunction;
  decreaseYear: VoidFunction;
  increaseYear: VoidFunction;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
  prevYearButtonDisabled: boolean;
  nextYearButtonDisabled: boolean;
  visibleYearsRange?: {
    startYear: number;
    endYear: number;
  };
}

type CalendarProps = React.PropsWithChildren<
  Omit<
    YearDropdownProps,
    "date" | "onChange" | "year" | "minDate" | "maxDate"
  > &
    Omit<MonthDropdownProps, "month" | "onChange"> &
    Omit<MonthYearDropdownProps, "date" | "onChange" | "minDate" | "maxDate"> &
    Omit<
      YearProps,
      | "onDayClick"
      | "selectingDate"
      | "clearSelectingDate"
      | "onYearMouseEnter"
      | "onYearMouseLeave"
      | "minDate"
      | "maxDate"
    > &
    Omit<
      MonthProps,
      | "ariaLabelPrefix"
      | "onChange"
      | "day"
      | "onDayClick"
      | "handleOnKeyDown"
      | "handleOnMonthKeyDown"
      | "onDayMouseEnter"
      | "onMouseLeave"
      | "orderInDisplay"
      | "monthShowsDuplicateDaysEnd"
      | "monthShowsDuplicateDaysStart"
      | "minDate"
      | "maxDate"
    > &
    Omit<TimeProps, "onChange" | "format" | "intervals" | "monthRef"> &
    Omit<InputTimeProps, "date" | "timeString" | "onChange"> & {
      className?: string;
      container?: React.ElementType;
      showYearPicker?: boolean;
      showMonthYearPicker?: boolean;
      showQuarterYearPicker?: boolean;
      showTimeSelect?: boolean;
      showTimeInput?: boolean;
      showYearDropdown?: boolean;
      showMonthDropdown?: boolean;
      yearItemNumber?: number;
      useWeekdaysShort?: boolean;
      forceShowMonthNavigation?: boolean;
      showDisabledMonthNavigation?: boolean;
      formatWeekDay?: (date: string) => string;
      onDropdownFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
      calendarStartDay?: Day;
      weekDayClassName?: (date: Date) => string;
      onMonthChange?: (date: Date) => void;
      onYearChange?: (date: Date) => void;
      onDayMouseEnter?: (date: Date) => void;
      onMonthMouseLeave?: VoidFunction;
      weekLabel?: string;
      onClickOutside: ClickOutsideHandler;
      outsideClickIgnoreClass?: string;
      previousMonthButtonLabel?: React.ReactNode;
      previousYearButtonLabel?: React.ReactNode;
      previousMonthAriaLabel?: string;
      previousYearAriaLabel?: string;
      nextMonthButtonLabel?: React.ReactNode;
      nextYearButtonLabel?: React.ReactNode;
      nextMonthAriaLabel?: string;
      nextYearAriaLabel?: string;
      showPreviousMonths?: boolean;
      monthsShown?: number;
      monthSelectedIn?: number;
      onSelect: (
        day: Date,
        event?:
          | React.MouseEvent<HTMLDivElement>
          | React.KeyboardEvent<HTMLDivElement>,
        monthSelectedIn?: number,
      ) => void;
      renderCustomHeader?: (
        props: ReactDatePickerCustomHeaderProps,
      ) => React.ReactElement;
      onYearMouseEnter?: YearProps["onYearMouseEnter"];
      onYearMouseLeave?: YearProps["onYearMouseLeave"];
      monthAriaLabelPrefix?: MonthProps["ariaLabelPrefix"];
      handleOnDayKeyDown?: MonthProps["handleOnKeyDown"];
      handleOnKeyDown?: (
        event:
          | React.KeyboardEvent<HTMLDivElement>
          | React.KeyboardEvent<HTMLLIElement>
          | React.KeyboardEvent<HTMLButtonElement>,
      ) => void;
      onTimeChange?: TimeProps["onChange"] | InputTimeProps["onChange"];
      timeFormat?: TimeProps["format"];
      timeIntervals?: TimeProps["intervals"];
    } & (
      | ({
          showMonthYearDropdown: true;
        } & Pick<MonthYearDropdownProps, "maxDate" | "minDate">)
      | ({
          showMonthYearDropdown?: never;
        } & Pick<YearDropdownProps, "maxDate" | "minDate"> &
          Pick<YearProps, "maxDate" | "minDate"> &
          Pick<MonthProps, "maxDate" | "minDate">)
    )
>;

interface CalendarState
  extends Pick<YearProps, "selectingDate">,
    Pick<MonthProps, "selectingDate"> {
  date: Required<YearProps>["date"];
  monthContainer: TimeProps["monthRef"];
  isRenderAriaLiveMessage: boolean;
}

export default class Calendar extends Component<CalendarProps, CalendarState> {
  static get defaultProps() {
    return {
      monthsShown: 1,
      forceShowMonthNavigation: false,
      outsideClickIgnoreClass: OUTSIDE_CLICK_IGNORE_CLASS,
      timeCaption: "Time",
      previousYearButtonLabel: "Previous Year",
      nextYearButtonLabel: "Next Year",
      previousMonthButtonLabel: "Previous Month",
      nextMonthButtonLabel: "Next Month",
      yearItemNumber: DEFAULT_YEAR_ITEM_NUMBER,
    };
  }

  constructor(props: CalendarProps) {
    super(props);

    this.containerRef = createRef<HTMLDivElement>();

    this.state = {
      date: this.getDateInView(),
      selectingDate: undefined,
      monthContainer: undefined,
      isRenderAriaLiveMessage: false,
    };
  }

  componentDidMount() {
    // monthContainer height is needed in time component
    // to determine the height for the ul in the time component
    // setState here so height is given after final component
    // layout is rendered
    if (this.props.showTimeSelect) {
      this.assignMonthContainer = ((): void => {
        this.setState({ monthContainer: this.monthContainer });
      })();
    }
  }

  componentDidUpdate(prevProps: CalendarProps) {
    if (
      this.props.preSelection &&
      (!isSameDay(this.props.preSelection, prevProps.preSelection) ||
        this.props.monthSelectedIn !== prevProps.monthSelectedIn)
    ) {
      const hasMonthChanged = !isSameMonth(
        this.state.date,
        this.props.preSelection,
      );
      this.setState(
        {
          date: this.props.preSelection,
        },
        () => hasMonthChanged && this.handleCustomMonthChange(this.state.date),
      );
    } else if (
      this.props.openToDate &&
      !isSameDay(this.props.openToDate, prevProps.openToDate)
    ) {
      this.setState({
        date: this.props.openToDate,
      });
    }
  }

  containerRef: React.RefObject<HTMLDivElement | null>;

  monthContainer: CalendarState["monthContainer"] = undefined;

  assignMonthContainer: void | undefined;

  handleClickOutside = (event: MouseEvent): void => {
    this.props.onClickOutside(event);
  };

  setClickOutsideRef = (): HTMLDivElement | null => {
    return this.containerRef.current;
  };

  handleDropdownFocus = (event: React.FocusEvent<HTMLDivElement>): void => {
    if (isDropdownSelect(event.target)) {
      this.props.onDropdownFocus?.(event);
    }
  };

  getDateInView = (): Date => {
    const { preSelection, selected, openToDate } = this.props;
    const minDate = getEffectiveMinDate(this.props);
    const maxDate = getEffectiveMaxDate(this.props);
    const current = newDate();
    const initialDate = openToDate || selected || preSelection;
    if (initialDate) {
      return initialDate;
    } else {
      if (minDate && isBefore(current, minDate)) {
        return minDate;
      } else if (maxDate && isAfter(current, maxDate)) {
        return maxDate;
      }
    }
    return current;
  };

  increaseMonth = (): void => {
    this.setState(
      ({ date }) => ({
        date: addMonths(date, 1),
      }),
      () => this.handleMonthChange(this.state.date),
    );
  };

  decreaseMonth = (): void => {
    this.setState(
      ({ date }) => ({
        date: subMonths(date, 1),
      }),
      () => this.handleMonthChange(this.state.date),
    );
  };

  handleDayClick = (
    day: Date,
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>,
    monthSelectedIn?: number,
  ): void => {
    this.props.onSelect(day, event, monthSelectedIn);
    this.props.setPreSelection && this.props.setPreSelection(day);
  };

  handleDayMouseEnter = (day: Date): void => {
    this.setState({ selectingDate: day });
    this.props.onDayMouseEnter && this.props.onDayMouseEnter(day);
  };

  handleMonthMouseLeave = (): void => {
    this.setState({ selectingDate: undefined });
    this.props.onMonthMouseLeave && this.props.onMonthMouseLeave();
  };

  handleYearMouseEnter = (
    event: React.MouseEvent<HTMLDivElement>,
    year: number,
  ): void => {
    this.setState({ selectingDate: setYear(newDate(), year) });
    !!this.props.onYearMouseEnter && this.props.onYearMouseEnter(event, year);
  };

  handleYearMouseLeave = (
    event: React.MouseEvent<HTMLDivElement>,
    year: number,
  ): void => {
    !!this.props.onYearMouseLeave && this.props.onYearMouseLeave(event, year);
  };

  handleYearChange = (date: Date): void => {
    this.props.onYearChange?.(date);
    this.setState({ isRenderAriaLiveMessage: true });
    if (this.props.adjustDateOnChange) {
      this.props.onSelect(date);
      this.props.setOpen?.(true);
    }

    this.props.setPreSelection && this.props.setPreSelection(date);
  };

  getEnabledPreSelectionDateForMonth = (date: Date) => {
    if (!isDayDisabled(date, this.props)) {
      return date;
    }

    const startOfMonth = getStartOfMonth(date);
    const endOfMonth = getEndOfMonth(date);

    const totalDays = differenceInDays(endOfMonth, startOfMonth);

    let preSelectedDate = null;

    for (let dayIdx = 0; dayIdx <= totalDays; dayIdx++) {
      const processingDate = addDays(startOfMonth, dayIdx);

      if (!isDayDisabled(processingDate, this.props)) {
        preSelectedDate = processingDate;
        break;
      }
    }

    return preSelectedDate;
  };

  handleMonthChange = (date: Date): void => {
    const enabledPreSelectionDate =
      this.getEnabledPreSelectionDateForMonth(date) ?? date;

    this.handleCustomMonthChange(enabledPreSelectionDate);
    if (this.props.adjustDateOnChange) {
      this.props.onSelect(enabledPreSelectionDate);
      this.props.setOpen?.(true);
    }

    this.props.setPreSelection &&
      this.props.setPreSelection(enabledPreSelectionDate);
  };

  handleCustomMonthChange = (date: Date): void => {
    this.props.onMonthChange?.(date);
    this.setState({ isRenderAriaLiveMessage: true });
  };

  handleMonthYearChange = (date: Date): void => {
    this.handleYearChange(date);
    this.handleMonthChange(date);
  };

  changeYear = (year: number): void => {
    this.setState(
      ({ date }) => ({
        date: setYear(date, Number(year)),
      }),
      () => this.handleYearChange(this.state.date),
    );
  };

  changeMonth = (month: number): void => {
    this.setState(
      ({ date }) => ({
        date: setMonth(date, Number(month)),
      }),
      () => this.handleMonthChange(this.state.date),
    );
  };

  changeMonthYear = (monthYear: Date): void => {
    this.setState(
      ({ date }) => ({
        date: setYear(setMonth(date, getMonth(monthYear)), getYear(monthYear)),
      }),
      () => this.handleMonthYearChange(this.state.date),
    );
  };

  header = (date: Date = this.state.date): React.ReactElement[] => {
    const startOfWeek = getStartOfWeek(
      date,
      this.props.locale,
      this.props.calendarStartDay,
    );

    const dayNames: React.ReactElement[] = [];
    if (this.props.showWeekNumbers) {
      dayNames.push(
        <div key="W" className="react-datepicker__day-name" role="columnheader">
          <span className="react-datepicker__sr-only">Week number</span>
          <span aria-hidden="true">{this.props.weekLabel || "#"}</span>
        </div>,
      );
    }
    return dayNames.concat(
      [0, 1, 2, 3, 4, 5, 6].map((offset) => {
        const day = addDays(startOfWeek, offset);
        const weekDayName = this.formatWeekday(day, this.props.locale);

        const weekDayClassName = this.props.weekDayClassName
          ? this.props.weekDayClassName(day)
          : undefined;

        return (
          <div
            key={offset}
            role="columnheader"
            className={clsx("react-datepicker__day-name", weekDayClassName)}
          >
            <span className="react-datepicker__sr-only">
              {formatDate(day, "EEEE", this.props.locale)}
            </span>
            <span aria-hidden="true">{weekDayName}</span>
          </div>
        );
      }),
    );
  };

  formatWeekday = (day: Date, locale?: Locale): string => {
    if (this.props.formatWeekDay) {
      return getFormattedWeekdayInLocale(day, this.props.formatWeekDay, locale);
    }
    return this.props.useWeekdaysShort
      ? getWeekdayShortInLocale(day, locale)
      : getWeekdayMinInLocale(day, locale);
  };

  decreaseYear = (): void => {
    this.setState(
      ({ date }) => ({
        date: subYears(
          date,
          this.props.showYearPicker
            ? (this.props.yearItemNumber ??
                Calendar.defaultProps.yearItemNumber)
            : 1,
        ),
      }),
      () => this.handleYearChange(this.state.date),
    );
  };

  clearSelectingDate = (): void => {
    this.setState({ selectingDate: undefined });
  };

  renderPreviousButton = (): React.ReactElement | void => {
    if (this.props.renderCustomHeader) {
      return;
    }

    const monthsShown =
      this.props.monthsShown ?? Calendar.defaultProps.monthsShown;
    const monthsToSubtract = this.props.showPreviousMonths
      ? monthsShown - 1
      : 0;
    const monthSelectedIn = this.props.monthSelectedIn ?? monthsToSubtract;
    const fromMonthDate = subMonths(this.state.date, monthSelectedIn);

    let allPrevDaysDisabled;
    switch (true) {
      case this.props.showMonthYearPicker:
        allPrevDaysDisabled = yearDisabledBefore(this.state.date, this.props);
        break;
      case this.props.showYearPicker:
        allPrevDaysDisabled = yearsDisabledBefore(this.state.date, this.props);
        break;
      case this.props.showQuarterYearPicker:
        allPrevDaysDisabled = quarterDisabledBefore(
          this.state.date,
          this.props,
        );
        break;
      default:
        allPrevDaysDisabled = monthDisabledBefore(fromMonthDate, this.props);
        break;
    }

    if (
      (!(
        this.props.forceShowMonthNavigation ??
        Calendar.defaultProps.forceShowMonthNavigation
      ) &&
        !this.props.showDisabledMonthNavigation &&
        allPrevDaysDisabled) ||
      this.props.showTimeSelectOnly
    ) {
      return;
    }

    const iconClasses = [
      "react-datepicker__navigation-icon",
      "react-datepicker__navigation-icon--previous",
    ];

    const classes = [
      "react-datepicker__navigation",
      "react-datepicker__navigation--previous",
    ];

    let clickHandler: React.MouseEventHandler<HTMLButtonElement> | undefined =
      this.decreaseMonth;

    if (
      this.props.showMonthYearPicker ||
      this.props.showQuarterYearPicker ||
      this.props.showYearPicker
    ) {
      clickHandler = this.decreaseYear;
    }

    if (allPrevDaysDisabled && this.props.showDisabledMonthNavigation) {
      classes.push("react-datepicker__navigation--previous--disabled");
      clickHandler = undefined;
    }

    const isForYear =
      this.props.showMonthYearPicker ||
      this.props.showQuarterYearPicker ||
      this.props.showYearPicker;

    const {
      previousMonthButtonLabel = Calendar.defaultProps.previousMonthButtonLabel,
      previousYearButtonLabel = Calendar.defaultProps.previousYearButtonLabel,
    } = this.props;

    const {
      previousMonthAriaLabel = typeof previousMonthButtonLabel === "string"
        ? previousMonthButtonLabel
        : "Previous Month",
      previousYearAriaLabel = typeof previousYearButtonLabel === "string"
        ? previousYearButtonLabel
        : "Previous Year",
    } = this.props;

    return (
      <button
        type="button"
        className={classes.join(" ")}
        onClick={clickHandler}
        onKeyDown={this.props.handleOnKeyDown}
        aria-label={isForYear ? previousYearAriaLabel : previousMonthAriaLabel}
      >
        <span className={iconClasses.join(" ")}>
          {isForYear ? previousYearButtonLabel : previousMonthButtonLabel}
        </span>
      </button>
    );
  };

  increaseYear = (): void => {
    this.setState(
      ({ date }) => ({
        date: addYears(
          date,
          this.props.showYearPicker
            ? (this.props.yearItemNumber ??
                Calendar.defaultProps.yearItemNumber)
            : 1,
        ),
      }),
      () => this.handleYearChange(this.state.date),
    );
  };

  renderNextButton = (): React.ReactElement | void => {
    if (this.props.renderCustomHeader) {
      return;
    }

    let allNextDaysDisabled: boolean;
    switch (true) {
      case this.props.showMonthYearPicker:
        allNextDaysDisabled = yearDisabledAfter(this.state.date, this.props);
        break;
      case this.props.showYearPicker:
        allNextDaysDisabled = yearsDisabledAfter(this.state.date, this.props);
        break;
      case this.props.showQuarterYearPicker:
        allNextDaysDisabled = quarterDisabledAfter(this.state.date, this.props);
        break;
      default:
        allNextDaysDisabled = monthDisabledAfter(this.state.date, this.props);
        break;
    }

    if (
      (!(
        this.props.forceShowMonthNavigation ??
        Calendar.defaultProps.forceShowMonthNavigation
      ) &&
        !this.props.showDisabledMonthNavigation &&
        allNextDaysDisabled) ||
      this.props.showTimeSelectOnly
    ) {
      return;
    }

    const classes: string[] = [
      "react-datepicker__navigation",
      "react-datepicker__navigation--next",
    ];
    const iconClasses = [
      "react-datepicker__navigation-icon",
      "react-datepicker__navigation-icon--next",
    ];
    if (this.props.showTimeSelect) {
      classes.push("react-datepicker__navigation--next--with-time");
    }
    if (this.props.todayButton) {
      classes.push("react-datepicker__navigation--next--with-today-button");
    }

    let clickHandler: React.MouseEventHandler<HTMLButtonElement> | undefined =
      this.increaseMonth;

    if (
      this.props.showMonthYearPicker ||
      this.props.showQuarterYearPicker ||
      this.props.showYearPicker
    ) {
      clickHandler = this.increaseYear;
    }

    if (allNextDaysDisabled && this.props.showDisabledMonthNavigation) {
      classes.push("react-datepicker__navigation--next--disabled");
      clickHandler = undefined;
    }

    const isForYear =
      this.props.showMonthYearPicker ||
      this.props.showQuarterYearPicker ||
      this.props.showYearPicker;

    const {
      nextMonthButtonLabel = Calendar.defaultProps.nextMonthButtonLabel,
      nextYearButtonLabel = Calendar.defaultProps.nextYearButtonLabel,
    } = this.props;
    const {
      nextMonthAriaLabel = typeof nextMonthButtonLabel === "string"
        ? nextMonthButtonLabel
        : "Next Month",
      nextYearAriaLabel = typeof nextYearButtonLabel === "string"
        ? nextYearButtonLabel
        : "Next Year",
    } = this.props;

    return (
      <button
        type="button"
        className={classes.join(" ")}
        onClick={clickHandler}
        onKeyDown={this.props.handleOnKeyDown}
        aria-label={isForYear ? nextYearAriaLabel : nextMonthAriaLabel}
      >
        <span className={iconClasses.join(" ")}>
          {isForYear ? nextYearButtonLabel : nextMonthButtonLabel}
        </span>
      </button>
    );
  };

  renderCurrentMonth = (date: Date = this.state.date): React.ReactElement => {
    const classes = ["react-datepicker__current-month"];

    if (this.props.showYearDropdown) {
      classes.push("react-datepicker__current-month--hasYearDropdown");
    }
    if (this.props.showMonthDropdown) {
      classes.push("react-datepicker__current-month--hasMonthDropdown");
    }
    if (this.props.showMonthYearDropdown) {
      classes.push("react-datepicker__current-month--hasMonthYearDropdown");
    }
    return (
      <h2 className={classes.join(" ")}>
        {formatDate(date, this.props.dateFormat, this.props.locale)}
      </h2>
    );
  };

  renderYearDropdown = (
    overrideHide: boolean = false,
  ): React.ReactElement | undefined => {
    if (!this.props.showYearDropdown || overrideHide) {
      return;
    }
    return (
      <YearDropdown
        {...Calendar.defaultProps}
        {...this.props}
        date={this.state.date}
        onChange={this.changeYear}
        year={getYear(this.state.date)}
      />
    );
  };

  renderMonthDropdown = (
    overrideHide: boolean = false,
  ): React.ReactElement | undefined => {
    if (!this.props.showMonthDropdown || overrideHide) {
      return;
    }
    return (
      <MonthDropdown
        {...Calendar.defaultProps}
        {...this.props}
        month={getMonth(this.state.date)}
        onChange={this.changeMonth}
      />
    );
  };

  renderMonthYearDropdown = (
    overrideHide: boolean = false,
  ): React.ReactElement | undefined => {
    if (!this.props.showMonthYearDropdown || overrideHide) {
      return;
    }
    return (
      <MonthYearDropdown
        {...Calendar.defaultProps}
        {...this.props}
        date={this.state.date}
        onChange={this.changeMonthYear}
      />
    );
  };

  handleTodayButtonClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    this.props.onSelect(getStartOfToday(), event);
    this.props.setPreSelection && this.props.setPreSelection(getStartOfToday());
  };

  renderTodayButton = (): React.ReactElement | undefined => {
    if (!this.props.todayButton || this.props.showTimeSelectOnly) {
      return;
    }
    return (
      <div
        className="react-datepicker__today-button"
        onClick={this.handleTodayButtonClick}
      >
        {this.props.todayButton}
      </div>
    );
  };

  renderDayNamesHeader = (monthDate: Date) => (
    <div className="react-datepicker__day-names" role="row">
      {this.header(monthDate)}
    </div>
  );

  renderDefaultHeader = ({ monthDate, i }: { monthDate: Date; i: number }) => (
    <div
      className={`react-datepicker__header ${
        this.props.showTimeSelect
          ? "react-datepicker__header--has-time-select"
          : ""
      }`}
    >
      {this.renderCurrentMonth(monthDate)}
      <div
        className={`react-datepicker__header__dropdown react-datepicker__header__dropdown--${this.props.dropdownMode}`}
        onFocus={this.handleDropdownFocus}
      >
        {this.renderMonthDropdown(i !== 0)}
        {this.renderMonthYearDropdown(i !== 0)}
        {this.renderYearDropdown(i !== 0)}
      </div>
    </div>
  );

  renderCustomHeader = (headerArgs: { monthDate: Date; i: number }) => {
    const { monthDate, i } = headerArgs;

    if (
      (this.props.showTimeSelect && !this.state.monthContainer) ||
      this.props.showTimeSelectOnly
    ) {
      return null;
    }

    const { showYearPicker, yearItemNumber } = this.props;

    let visibleYearsRange;
    if (showYearPicker) {
      const { startPeriod: startYear, endPeriod: endYear } = getYearsPeriod(
        monthDate,
        yearItemNumber,
      );
      visibleYearsRange = {
        startYear,
        endYear,
      };
    }

    const prevMonthButtonDisabled = monthDisabledBefore(
      this.state.date,
      this.props,
    );

    const nextMonthButtonDisabled = monthDisabledAfter(
      this.state.date,
      this.props,
    );

    const prevYearButtonDisabled = yearDisabledBefore(
      this.state.date,
      this.props,
    );

    const nextYearButtonDisabled = yearDisabledAfter(
      this.state.date,
      this.props,
    );

    return (
      <div
        className="react-datepicker__header react-datepicker__header--custom"
        onFocus={this.props.onDropdownFocus}
      >
        {this.props.renderCustomHeader?.({
          ...this.state,
          ...(showYearPicker && { visibleYearsRange }),
          customHeaderCount: i,
          monthDate,
          changeMonth: this.changeMonth,
          changeYear: this.changeYear,
          decreaseMonth: this.decreaseMonth,
          increaseMonth: this.increaseMonth,
          decreaseYear: this.decreaseYear,
          increaseYear: this.increaseYear,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
          prevYearButtonDisabled,
          nextYearButtonDisabled,
        })}
      </div>
    );
  };

  renderYearHeader = ({
    monthDate,
  }: {
    monthDate: Date;
  }): React.ReactElement => {
    const {
      showYearPicker,
      yearItemNumber = Calendar.defaultProps.yearItemNumber,
    } = this.props;
    const { startPeriod, endPeriod } = getYearsPeriod(
      monthDate,
      yearItemNumber,
    );
    return (
      <div className="react-datepicker__header react-datepicker-year-header">
        {showYearPicker ? `${startPeriod} - ${endPeriod}` : getYear(monthDate)}
      </div>
    );
  };

  renderHeader = ({
    monthDate,
    i = 0,
  }: {
    monthDate: Date;
    i?: number;
  }): React.ReactElement | null => {
    const headerArgs = { monthDate, i };
    switch (true) {
      case this.props.renderCustomHeader !== undefined:
        return this.renderCustomHeader(headerArgs);
      case this.props.showMonthYearPicker ||
        this.props.showQuarterYearPicker ||
        this.props.showYearPicker:
        return this.renderYearHeader(headerArgs);
      default:
        return this.renderDefaultHeader(headerArgs);
    }
  };

  renderMonths = (): React.ReactElement[] | undefined => {
    if (this.props.showTimeSelectOnly || this.props.showYearPicker) {
      return;
    }

    const monthList: React.ReactElement[] = [];
    const monthsShown =
      this.props.monthsShown ?? Calendar.defaultProps.monthsShown;
    const monthsToSubtract = this.props.showPreviousMonths
      ? monthsShown - 1
      : 0;
    const fromMonthDate =
      this.props.showMonthYearPicker || this.props.showQuarterYearPicker
        ? addYears(this.state.date, monthsToSubtract)
        : subMonths(this.state.date, monthsToSubtract);
    const monthSelectedIn = this.props.monthSelectedIn ?? monthsToSubtract;
    for (let i = 0; i < monthsShown; ++i) {
      const monthsToAdd = i - monthSelectedIn + monthsToSubtract;
      const monthDate =
        this.props.showMonthYearPicker || this.props.showQuarterYearPicker
          ? addYears(fromMonthDate, monthsToAdd)
          : addMonths(fromMonthDate, monthsToAdd);
      const monthKey = `month-${i}`;
      const monthShowsDuplicateDaysEnd = i < monthsShown - 1;
      const monthShowsDuplicateDaysStart = i > 0;
      monthList.push(
        <div
          key={monthKey}
          ref={(div) => {
            this.monthContainer = div ?? undefined;
          }}
          className="react-datepicker__month-container"
        >
          {this.renderHeader({ monthDate, i })}
          <Month
            {...Calendar.defaultProps}
            {...this.props}
            containerRef={this.containerRef}
            ariaLabelPrefix={this.props.monthAriaLabelPrefix}
            day={monthDate}
            onDayClick={this.handleDayClick}
            handleOnKeyDown={this.props.handleOnDayKeyDown}
            handleOnMonthKeyDown={this.props.handleOnKeyDown}
            onDayMouseEnter={this.handleDayMouseEnter}
            onMouseLeave={this.handleMonthMouseLeave}
            orderInDisplay={i}
            selectingDate={this.state.selectingDate}
            monthShowsDuplicateDaysEnd={monthShowsDuplicateDaysEnd}
            monthShowsDuplicateDaysStart={monthShowsDuplicateDaysStart}
            dayNamesHeader={this.renderDayNamesHeader(monthDate)}
          />
        </div>,
      );
    }
    return monthList;
  };

  renderYears = (): React.ReactElement | undefined => {
    if (this.props.showTimeSelectOnly) {
      return;
    }
    if (this.props.showYearPicker) {
      return (
        <div className="react-datepicker__year--container">
          {this.renderHeader({ monthDate: this.state.date })}
          <Year
            {...Calendar.defaultProps}
            {...this.props}
            selectingDate={this.state.selectingDate}
            date={this.state.date}
            onDayClick={this.handleDayClick}
            clearSelectingDate={this.clearSelectingDate}
            onYearMouseEnter={this.handleYearMouseEnter}
            onYearMouseLeave={this.handleYearMouseLeave}
          />
        </div>
      );
    }
    return;
  };

  renderTimeSection = (): React.ReactElement | undefined => {
    if (
      this.props.showTimeSelect &&
      (this.state.monthContainer || this.props.showTimeSelectOnly)
    ) {
      return (
        <Time
          {...Calendar.defaultProps}
          {...this.props}
          onChange={this.props.onTimeChange}
          format={this.props.timeFormat}
          intervals={this.props.timeIntervals}
          monthRef={this.state.monthContainer}
        />
      );
    }
    return;
  };

  renderInputTimeSection = (): React.ReactElement | undefined => {
    const time = this.props.selected
      ? new Date(this.props.selected)
      : undefined;
    const timeValid = time && isValid(time) && Boolean(this.props.selected);
    const timeString = timeValid
      ? `${addZero(time.getHours())}:${addZero(time.getMinutes())}`
      : "";
    if (this.props.showTimeInput) {
      return (
        <InputTime
          {...Calendar.defaultProps}
          {...this.props}
          date={time}
          timeString={timeString}
          onChange={this.props.onTimeChange}
        />
      );
    }
    return;
  };

  renderAriaLiveRegion = (): React.ReactElement => {
    const { startPeriod, endPeriod } = getYearsPeriod(
      this.state.date,
      this.props.yearItemNumber ?? Calendar.defaultProps.yearItemNumber,
    );
    let ariaLiveMessage;

    if (this.props.showYearPicker) {
      ariaLiveMessage = `${startPeriod} - ${endPeriod}`;
    } else if (
      this.props.showMonthYearPicker ||
      this.props.showQuarterYearPicker
    ) {
      ariaLiveMessage = getYear(this.state.date);
    } else {
      ariaLiveMessage = `${getMonthInLocale(
        getMonth(this.state.date),
        this.props.locale,
      )} ${getYear(this.state.date)}`;
    }

    return (
      <span
        role="alert"
        aria-live="polite"
        className="react-datepicker__aria-live"
      >
        {this.state.isRenderAriaLiveMessage && ariaLiveMessage}
      </span>
    );
  };

  renderChildren = (): React.ReactElement | undefined => {
    if (this.props.children) {
      return (
        <div className="react-datepicker__children-container">
          {this.props.children}
        </div>
      );
    }
    return;
  };

  render(): React.ReactElement {
    const Container = this.props.container || CalendarContainer;
    return (
      <ClickOutsideWrapper
        onClickOutside={this.handleClickOutside}
        style={{ display: "contents" }}
        ignoreClass={this.props.outsideClickIgnoreClass}
      >
        <div style={{ display: "contents" }} ref={this.containerRef}>
          <Container
            className={clsx("react-datepicker", this.props.className, {
              "react-datepicker--time-only": this.props.showTimeSelectOnly,
            })}
            showTime={this.props.showTimeSelect || this.props.showTimeInput}
            showTimeSelectOnly={this.props.showTimeSelectOnly}
          >
            {this.renderAriaLiveRegion()}
            {this.renderPreviousButton()}
            {this.renderNextButton()}
            {this.renderMonths()}
            {this.renderYears()}
            {this.renderTodayButton()}
            {this.renderTimeSection()}
            {this.renderInputTimeSection()}
            {this.renderChildren()}
          </Container>
        </div>
      </ClickOutsideWrapper>
    );
  }
}
