import { clsx } from "clsx";
import React, { Component, createRef } from "react";

import {
  KeyType,
  addDays,
  addMonths,
  addQuarters,
  addWeeks,
  formatDate,
  getMonth,
  getMonthInLocale,
  getMonthShortInLocale,
  getQuarter,
  getQuarterShortInLocale,
  getStartOfMonth,
  getStartOfQuarter,
  getStartOfWeek,
  getYear,
  isDayDisabled,
  isDayExcluded,
  isMonthDisabled,
  isMonthInRange,
  isMonthYearDisabled,
  isQuarterDisabled,
  isQuarterInRange,
  isSameMonth,
  isSameQuarter,
  isSpaceKeyDown,
  newDate,
  setMonth,
  setQuarter,
  subMonths,
  subQuarters,
} from "./date_utils";
import Week from "./week";

const FIXED_HEIGHT_STANDARD_WEEK_COUNT = 6;

const MONTH_COLUMNS_LAYOUT = {
  TWO_COLUMNS: "two_columns",
  THREE_COLUMNS: "three_columns",
  FOUR_COLUMNS: "four_columns",
};
const MONTH_COLUMNS = {
  [MONTH_COLUMNS_LAYOUT.TWO_COLUMNS]: {
    grid: [
      [0, 1],
      [2, 3],
      [4, 5],
      [6, 7],
      [8, 9],
      [10, 11],
    ],
    verticalNavigationOffset: 2,
  },
  [MONTH_COLUMNS_LAYOUT.THREE_COLUMNS]: {
    grid: [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [9, 10, 11],
    ],
    verticalNavigationOffset: 3,
  },
  [MONTH_COLUMNS_LAYOUT.FOUR_COLUMNS]: {
    grid: [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
    ],
    verticalNavigationOffset: 4,
  },
};
const MONTH_NAVIGATION_HORIZONTAL_OFFSET = 1;

function getMonthColumnsLayout(
  showFourColumnMonthYearPicker?: boolean,
  showTwoColumnMonthYearPicker?: boolean,
) {
  if (showFourColumnMonthYearPicker) {
    return MONTH_COLUMNS_LAYOUT.FOUR_COLUMNS;
  }
  if (showTwoColumnMonthYearPicker) {
    return MONTH_COLUMNS_LAYOUT.TWO_COLUMNS;
  }
  return MONTH_COLUMNS_LAYOUT.THREE_COLUMNS;
}

interface WeekProps extends React.ComponentPropsWithoutRef<typeof Week> {}

interface MonthProps
  extends Omit<
    WeekProps,
    | "ariaLabelPrefix"
    | "chooseDayAriaLabelPrefix"
    | "day"
    | "disabledDayAriaLabelPrefix"
    | "month"
    | "onDayClick"
    | "onDayMouseEnter"
    | "preSelection"
    | "selected"
    | "showWeekNumber"
  > {
  monthClassName?: (date: Date) => string;
  onDayClick?: (
    date: Date,
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>,
    orderInDisplay?: number,
  ) => void;
  onDayMouseEnter?: (date: Date) => void;
  onMouseLeave?: VoidFunction;
  setPreSelection?: (date?: Date | null) => void;
  renderMonthContent?: (
    m: number,
    shortMonthText: string,
    fullMonthText: string,
    day: Date,
  ) => React.ReactNode;
  renderQuarterContent?: (q: number, shortQuarter: string) => React.ReactNode;
  handleOnMonthKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  ariaLabelPrefix?: string;
  day: Date;
  startDate?: Date | null;
  endDate?: Date | null;
  orderInDisplay?: number;
  fixedHeight?: boolean;
  peekNextMonth?: boolean;
  preSelection?: Date | null;
  selected?: Date | null;
  showWeekNumbers?: WeekProps["showWeekNumber"];
  showMonthYearPicker?: boolean;
  showFullMonthYearPicker?: boolean;
  showTwoColumnMonthYearPicker?: boolean;
  showFourColumnMonthYearPicker?: boolean;
  showQuarterYearPicker?: boolean;
  weekAriaLabelPrefix?: WeekProps["ariaLabelPrefix"];
  chooseDayAriaLabelPrefix?: WeekProps["chooseDayAriaLabelPrefix"];
  disabledDayAriaLabelPrefix?: WeekProps["disabledDayAriaLabelPrefix"];
  dayNamesHeader?: React.ReactNode;
}

/**
 * `Month` is a React component that represents a month in a calendar.
 * It accepts a `MonthProps` object as props which provides various configurations and event handlers.
 *
 * @prop dayClassName - Function to determine the class name for a day.
 * @prop monthClassName - Function to determine the class name for a month.
 * @prop filterDate - Function to filter dates.
 * @prop formatWeekNumber - Function to format the week number.
 * @prop onDayClick - Function to handle day click events.
 * @prop onDayMouseEnter - Function to handle mouse enter events on a day.
 * @prop onMouseLeave - Function to handle mouse leave events.
 * @prop onWeekSelect - Function to handle week selection.
 * @prop setPreSelection - Function to set pre-selection.
 * @prop setOpen - Function to set open state.
 * @prop renderDayContents - Function to render day contents.
 * @prop renderMonthContent - Function to render month content.
 * @prop renderQuarterContent - Function to render quarter content.
 * @prop handleOnKeyDown - Function to handle key down events.
 * @prop handleOnMonthKeyDown - Function to handle key down events on a month.
 * @prop ariaLabelPrefix - Aria label prefix.
 * @prop chooseDayAriaLabelPrefix - Aria label prefix for choosing a day.
 * @prop disabledDayAriaLabelPrefix - Aria label prefix for disabled day.
 * @prop disabledKeyboardNavigation - Flag to disable keyboard navigation.
 * @prop day - The day.
 * @prop endDate - The end date.
 * @prop orderInDisplay - The order in display.
 * @prop excludeDates - Dates to exclude.
 * @prop excludeDateIntervals - Date intervals to exclude.
 * @prop fixedHeight - Flag to set fixed height.
 * @prop highlightDates - Dates to highlight.
 * @prop holidays - Holidays.
 * @prop includeDates - Dates to include.
 * @prop includeDateIntervals - Date intervals to include.
 * @prop inline - Flag to set inline.
 * @prop shouldFocusDayInline - Flag to set focus on day inline.
 * @prop locale - The locale.
 * @prop maxDate - The maximum date.
 * @prop minDate - The minimum date.
 * @prop usePointerEvent - Flag to use pointer event.
 * @prop peekNextMonth - Flag to peek next month.
 * @prop preSelection - The pre-selection.
 * @prop selected - The selected date.
 * @prop selectingDate - The selecting date.
 * @prop calendarStartDay - The calendar start day.
 * @prop selectsEnd - Flag to select end.
 * @prop selectsStart - Flag to select start.
 * @prop selectsRange - Flag to select range.
 * @prop selectsDisabledDaysInRange - Flag to select disabled days in range.
 * @prop selectsMultiple - Flag to select multiple.
 * @prop selectedDates - The selected dates.
 * @prop showWeekNumbers - Flag to show week numbers.
 * @prop startDate - The start date.
 * @prop shouldCloseOnSelect - Flag to close on select.
 * @prop showMonthYearPicker - Flag to show month year picker.
 * @prop showFullMonthYearPicker - Flag to show full month year picker.
 * @prop showTwoColumnMonthYearPicker - Flag to show two column month year picker.
 * @prop showFourColumnMonthYearPicker - Flag to show four column month year picker.
 * @prop showQuarterYearPicker - Flag to show quarter year picker.
 * @prop showWeekPicker - Flag to show week picker.
 * @prop isInputFocused - Flag to set input focus.
 * @prop weekAriaLabelPrefix - Aria label prefix for week.
 * @prop containerRef - The container reference.
 * @prop monthShowsDuplicateDaysEnd - Flag to show duplicate days at the end of the month.
 * @prop monthShowsDuplicateDaysStart - Flag to show duplicate days at the start of the month.
 *
 * @example
 * ```tsx
 * function App() {
 *  const handleDayClick = (date) => {
 *     console.log('Day clicked: ', date);
 *   };
 *
 *   const handleDayMouseEnter = (date) => {
 *     console.log('Mouse entered on day: ', date);
 *   };
 *
 *   return (
 *     <div>
 *       <Month
 *         day={new Date()}
 *         endDate={new Date()}
 *         onDayClick={handleDayClick}
 *         onDayMouseEnter={handleDayMouseEnter}
 *         disabledKeyboardNavigation={false}
 *         showWeekNumbers={true}
 *         showMonthYearPicker={false}
 *       />
 *     </div>
 *   );
 * }
 * ```
 */
export default class Month extends Component<MonthProps> {
  MONTH_REFS = [...Array(12)].map(() => createRef<HTMLDivElement>());
  QUARTER_REFS = [...Array(4)].map(() => createRef<HTMLDivElement>());

  isDisabled = (day: Date) =>
    // Almost all props previously were passed as this.props w/o proper typing with prop-types
    // after the migration to TS i made it explicit
    isDayDisabled(day, {
      minDate: this.props.minDate,
      maxDate: this.props.maxDate,
      excludeDates: this.props.excludeDates,
      excludeDateIntervals: this.props.excludeDateIntervals,
      includeDateIntervals: this.props.includeDateIntervals,
      includeDates: this.props.includeDates,
      filterDate: this.props.filterDate,
    });

  isExcluded = (day: Date) =>
    // Almost all props previously were passed as this.props w/o proper typing with prop-types
    // after the migration to TS i made it explicit
    isDayExcluded(day, {
      excludeDates: this.props.excludeDates,
      excludeDateIntervals: this.props.excludeDateIntervals,
    });

  handleDayClick = (
    day: Date,
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>,
  ) => {
    this.props.onDayClick?.(day, event, this.props.orderInDisplay);
  };

  handleDayMouseEnter = (day: Date) => {
    this.props.onDayMouseEnter?.(day);
  };

  handleMouseLeave = () => {
    this.props.onMouseLeave?.();
  };

  isRangeStartMonth = (m: number) => {
    const { day, startDate, endDate } = this.props;
    if (!startDate || !endDate) {
      return false;
    }
    return isSameMonth(setMonth(day, m), startDate);
  };

  isRangeStartQuarter = (q: number) => {
    const { day, startDate, endDate } = this.props;
    if (!startDate || !endDate) {
      return false;
    }
    return isSameQuarter(setQuarter(day, q), startDate);
  };

  isRangeEndMonth = (m: number) => {
    const { day, startDate, endDate } = this.props;
    if (!startDate || !endDate) {
      return false;
    }
    return isSameMonth(setMonth(day, m), endDate);
  };

  isRangeEndQuarter = (q: number) => {
    const { day, startDate, endDate } = this.props;
    if (!startDate || !endDate) {
      return false;
    }
    return isSameQuarter(setQuarter(day, q), endDate);
  };

  isInSelectingRangeMonth = (m: number) => {
    const { day, selectsStart, selectsEnd, selectsRange, startDate, endDate } =
      this.props;

    const selectingDate = this.props.selectingDate ?? this.props.preSelection;

    if (!(selectsStart || selectsEnd || selectsRange) || !selectingDate) {
      return false;
    }

    if (selectsStart && endDate) {
      return isMonthInRange(selectingDate, endDate, m, day);
    }

    if (selectsEnd && startDate) {
      return isMonthInRange(startDate, selectingDate, m, day);
    }

    if (selectsRange && startDate && !endDate) {
      return isMonthInRange(startDate, selectingDate, m, day);
    }

    return false;
  };

  isSelectingMonthRangeStart = (m: number) => {
    if (!this.isInSelectingRangeMonth(m)) {
      return false;
    }

    const { day, startDate, selectsStart } = this.props;
    const _month = setMonth(day, m);
    const selectingDate = this.props.selectingDate ?? this.props.preSelection;

    if (selectsStart) {
      return isSameMonth(_month, selectingDate);
    } else {
      return isSameMonth(_month, startDate);
    }
  };

  isSelectingMonthRangeEnd = (m: number) => {
    if (!this.isInSelectingRangeMonth(m)) {
      return false;
    }

    const { day, endDate, selectsEnd, selectsRange } = this.props;
    const _month = setMonth(day, m);
    const selectingDate = this.props.selectingDate ?? this.props.preSelection;

    if (selectsEnd || selectsRange) {
      return isSameMonth(_month, selectingDate);
    } else {
      return isSameMonth(_month, endDate);
    }
  };

  isInSelectingRangeQuarter = (q: number) => {
    const { day, selectsStart, selectsEnd, selectsRange, startDate, endDate } =
      this.props;

    const selectingDate = this.props.selectingDate ?? this.props.preSelection;

    if (!(selectsStart || selectsEnd || selectsRange) || !selectingDate) {
      return false;
    }

    if (selectsStart && endDate) {
      return isQuarterInRange(selectingDate, endDate, q, day);
    }

    if (selectsEnd && startDate) {
      return isQuarterInRange(startDate, selectingDate, q, day);
    }

    if (selectsRange && startDate && !endDate) {
      return isQuarterInRange(startDate, selectingDate, q, day);
    }

    return false;
  };

  isWeekInMonth = (startOfWeek: Date) => {
    const day = this.props.day;
    const endOfWeek = addDays(startOfWeek, 6);
    return isSameMonth(startOfWeek, day) || isSameMonth(endOfWeek, day);
  };

  isCurrentMonth = (day: Date, m: number) =>
    getYear(day) === getYear(newDate()) && m === getMonth(newDate());

  isCurrentQuarter = (day: Date, q: number) =>
    getYear(day) === getYear(newDate()) && q === getQuarter(newDate());

  isSelectedMonth = (day: Date, m: number, selected: Date) =>
    getMonth(selected) === m && getYear(day) === getYear(selected);

  isSelectMonthInList = (day: Date, m: number, selectedDates: Date[]) =>
    selectedDates.some((selectedDate) =>
      this.isSelectedMonth(day, m, selectedDate),
    );

  isSelectedQuarter = (day: Date, q: number, selected: Date): boolean =>
    getQuarter(day) === q && getYear(day) === getYear(selected);

  isMonthSelected = () => {
    const { day, selected, selectedDates, selectsMultiple } = this.props;
    const monthIdx = getMonth(day);

    if (selectsMultiple) {
      return selectedDates?.some((date) =>
        this.isSelectedMonth(day, monthIdx, date),
      );
    }

    return !!selected && this.isSelectedMonth(day, monthIdx, selected);
  };

  renderWeeks = () => {
    const weeks = [];
    const isFixedHeight = this.props.fixedHeight;

    let i = 0;
    let breakAfterNextPush = false;
    let currentWeekStart = getStartOfWeek(
      getStartOfMonth(this.props.day),
      this.props.locale,
      this.props.calendarStartDay,
    );

    const isPreSelected = (preSelection: Date) =>
      this.props.showWeekPicker
        ? getStartOfWeek(
            preSelection,
            this.props.locale,
            this.props.calendarStartDay,
          )
        : this.props.preSelection;

    const isSelected = (selected: Date) =>
      this.props.showWeekPicker
        ? getStartOfWeek(
            selected,
            this.props.locale,
            this.props.calendarStartDay,
          )
        : this.props.selected;

    const selected = this.props.selected
      ? isSelected(this.props.selected)
      : undefined;

    const preSelection = this.props.preSelection
      ? isPreSelected(this.props.preSelection)
      : undefined;

    while (true) {
      weeks.push(
        <Week
          {...this.props}
          ariaLabelPrefix={this.props.weekAriaLabelPrefix}
          key={i}
          day={currentWeekStart}
          month={getMonth(this.props.day)}
          onDayClick={this.handleDayClick}
          onDayMouseEnter={this.handleDayMouseEnter}
          selected={selected}
          preSelection={preSelection}
          showWeekNumber={this.props.showWeekNumbers}
        />,
      );

      if (breakAfterNextPush) break;

      i++;
      currentWeekStart = addWeeks(currentWeekStart, 1);

      // If one of these conditions is true, we will either break on this week
      // or break on the next week
      const isFixedAndFinalWeek =
        isFixedHeight && i >= FIXED_HEIGHT_STANDARD_WEEK_COUNT;
      const isNonFixedAndOutOfMonth =
        !isFixedHeight && !this.isWeekInMonth(currentWeekStart);

      if (isFixedAndFinalWeek || isNonFixedAndOutOfMonth) {
        if (this.props.peekNextMonth) {
          breakAfterNextPush = true;
        } else {
          break;
        }
      }
    }

    return weeks;
  };

  onMonthClick = (
    event:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.KeyboardEvent<HTMLDivElement>,
    m: number,
  ) => {
    const { isDisabled, labelDate } = this.isMonthDisabledForLabelDate(m);

    if (isDisabled) {
      return;
    }

    this.handleDayClick(getStartOfMonth(labelDate), event);
  };

  onMonthMouseEnter = (m: number) => {
    const { isDisabled, labelDate } = this.isMonthDisabledForLabelDate(m);

    if (isDisabled) {
      return;
    }

    this.handleDayMouseEnter(getStartOfMonth(labelDate));
  };

  handleMonthNavigation = (newMonth: number, newDate: Date) => {
    this.props.setPreSelection?.(newDate);

    this.MONTH_REFS[newMonth]?.current?.focus();
  };

  handleKeyboardNavigation = (
    event: React.KeyboardEvent<HTMLDivElement>,
    eventKey: KeyType,
    month: number,
  ) => {
    const {
      selected,
      preSelection,
      setPreSelection,
      minDate,
      maxDate,
      showFourColumnMonthYearPicker,
      showTwoColumnMonthYearPicker,
    } = this.props;
    if (!preSelection) return;

    const monthColumnsLayout = getMonthColumnsLayout(
      showFourColumnMonthYearPicker,
      showTwoColumnMonthYearPicker,
    );

    const verticalOffset = this.getVerticalOffset(monthColumnsLayout);

    const monthsGrid = MONTH_COLUMNS[monthColumnsLayout]?.grid;

    const calculateNewDateAndMonth = (
      eventKey: KeyType,
      date: Date,
      month: number,
    ): { newCalculatedDate: Date; newCalculatedMonth: number } => {
      let newCalculatedDate = date;
      let newCalculatedMonth = month;
      switch (eventKey) {
        case KeyType.ArrowRight:
          newCalculatedDate = addMonths(
            date,
            MONTH_NAVIGATION_HORIZONTAL_OFFSET,
          );
          newCalculatedMonth =
            month === 11 ? 0 : month + MONTH_NAVIGATION_HORIZONTAL_OFFSET;
          break;
        case KeyType.ArrowLeft:
          newCalculatedDate = subMonths(
            date,
            MONTH_NAVIGATION_HORIZONTAL_OFFSET,
          );
          newCalculatedMonth =
            month === 0 ? 11 : month - MONTH_NAVIGATION_HORIZONTAL_OFFSET;
          break;
        case KeyType.ArrowUp:
          newCalculatedDate = subMonths(date, verticalOffset);
          newCalculatedMonth = monthsGrid?.[0]?.includes(month)
            ? month + 12 - verticalOffset
            : month - verticalOffset;
          break;
        case KeyType.ArrowDown:
          newCalculatedDate = addMonths(date, verticalOffset);
          newCalculatedMonth = monthsGrid?.[monthsGrid.length - 1]?.includes(
            month,
          )
            ? month - 12 + verticalOffset
            : month + verticalOffset;
          break;
      }

      return { newCalculatedDate, newCalculatedMonth };
    };

    const getNewDateAndMonth = (
      eventKey: KeyType,
      selectedDate: Date,
      month: number,
    ): { newCalculatedDate: Date; newCalculatedMonth: number } => {
      const MAX_ITERATIONS = 40;
      let eventKeyCopy = eventKey;
      let validDateFound = false;
      let iterations = 0;
      let { newCalculatedDate, newCalculatedMonth } = calculateNewDateAndMonth(
        eventKeyCopy,
        selectedDate,
        month,
      );

      while (!validDateFound) {
        if (iterations >= MAX_ITERATIONS) {
          newCalculatedDate = selectedDate;
          newCalculatedMonth = month;
          break;
        }
        // if minDate exists and the new month is before the minimum month, it will try to find the next available month after
        if (minDate && newCalculatedDate < minDate) {
          eventKeyCopy = KeyType.ArrowRight;
          const obj = calculateNewDateAndMonth(
            eventKeyCopy,
            newCalculatedDate,
            newCalculatedMonth,
          );
          newCalculatedDate = obj.newCalculatedDate;
          newCalculatedMonth = obj.newCalculatedMonth;
        }

        // if maxDate exists and the new month is after the maximum month, it will try to find the next available month before
        if (maxDate && newCalculatedDate > maxDate) {
          eventKeyCopy = KeyType.ArrowLeft;
          const obj = calculateNewDateAndMonth(
            eventKeyCopy,
            newCalculatedDate,
            newCalculatedMonth,
          );
          newCalculatedDate = obj.newCalculatedDate;
          newCalculatedMonth = obj.newCalculatedMonth;
        }

        if (isMonthYearDisabled(newCalculatedDate, this.props)) {
          const obj = calculateNewDateAndMonth(
            eventKeyCopy,
            newCalculatedDate,
            newCalculatedMonth,
          );
          newCalculatedDate = obj.newCalculatedDate;
          newCalculatedMonth = obj.newCalculatedMonth;
        } else {
          validDateFound = true;
        }
        iterations++;
      }

      return { newCalculatedDate, newCalculatedMonth };
    };

    if (eventKey === KeyType.Enter) {
      if (!this.isMonthDisabled(month)) {
        this.onMonthClick(event, month);
        setPreSelection?.(selected);
      }
      return;
    }

    const { newCalculatedDate, newCalculatedMonth } = getNewDateAndMonth(
      eventKey,
      preSelection,
      month,
    );

    switch (eventKey) {
      case KeyType.ArrowRight:
      case KeyType.ArrowLeft:
      case KeyType.ArrowUp:
      case KeyType.ArrowDown:
        this.handleMonthNavigation(newCalculatedMonth, newCalculatedDate);
        break;
    }
  };

  getVerticalOffset = (monthColumnsLayout: string) => {
    return MONTH_COLUMNS[monthColumnsLayout]?.verticalNavigationOffset ?? 0;
  };

  onMonthKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    month: number,
  ) => {
    const { disabledKeyboardNavigation, handleOnMonthKeyDown } = this.props;
    const eventKey = event.key as KeyType;
    if (eventKey !== KeyType.Tab) {
      // preventDefault on tab event blocks focus change
      event.preventDefault();
    }
    if (!disabledKeyboardNavigation) {
      this.handleKeyboardNavigation(event, eventKey, month);
    }

    handleOnMonthKeyDown && handleOnMonthKeyDown(event);
  };

  onQuarterClick = (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>,
    q: number,
  ) => {
    const labelDate = setQuarter(this.props.day, q);

    if (isQuarterDisabled(labelDate, this.props)) {
      return;
    }

    this.handleDayClick(getStartOfQuarter(labelDate), event);
  };

  onQuarterMouseEnter = (q: number) => {
    const labelDate = setQuarter(this.props.day, q);

    if (isQuarterDisabled(labelDate, this.props)) {
      return;
    }

    this.handleDayMouseEnter(getStartOfQuarter(labelDate));
  };

  handleQuarterNavigation = (newQuarter: number, newDate: Date) => {
    if (this.isDisabled(newDate) || this.isExcluded(newDate)) {
      return;
    }
    this.props.setPreSelection?.(newDate);
    this.QUARTER_REFS[newQuarter - 1]?.current?.focus();
  };

  onQuarterKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    quarter: number,
  ) => {
    const eventKey = event.key;
    if (!this.props.disabledKeyboardNavigation) {
      switch (eventKey) {
        case KeyType.Enter:
          this.onQuarterClick(event, quarter);
          this.props.setPreSelection?.(this.props.selected);
          break;
        case KeyType.ArrowRight:
          if (!this.props.preSelection) {
            break;
          }
          this.handleQuarterNavigation(
            quarter === 4 ? 1 : quarter + 1,
            addQuarters(this.props.preSelection, 1),
          );
          break;
        case KeyType.ArrowLeft:
          if (!this.props.preSelection) {
            break;
          }
          this.handleQuarterNavigation(
            quarter === 1 ? 4 : quarter - 1,
            subQuarters(this.props.preSelection, 1),
          );
          break;
      }
    }
  };

  isMonthDisabledForLabelDate = (
    month: number,
  ): {
    isDisabled: boolean;
    labelDate: Date;
  } => {
    const { day, minDate, maxDate, excludeDates, includeDates } = this.props;
    const labelDate = setMonth(day, month);
    return {
      isDisabled:
        ((minDate || maxDate || excludeDates || includeDates) &&
          isMonthDisabled(labelDate, this.props)) ??
        false,
      labelDate,
    };
  };

  isMonthDisabled = (month: number) => {
    const { isDisabled } = this.isMonthDisabledForLabelDate(month);
    return isDisabled;
  };

  getSelection() {
    const { selected, selectedDates, selectsMultiple } = this.props;

    if (selectsMultiple) {
      return selectedDates;
    }

    if (selected) {
      return [selected];
    }

    return undefined;
  }

  getMonthClassNames = (m: number) => {
    const { day, startDate, endDate, preSelection, monthClassName } =
      this.props;
    const _monthClassName = monthClassName
      ? monthClassName(setMonth(day, m))
      : undefined;

    const selection = this.getSelection();

    return clsx(
      "react-datepicker__month-text",
      `react-datepicker__month-${m}`,
      _monthClassName,
      {
        "react-datepicker__month-text--disabled": this.isMonthDisabled(m),
        "react-datepicker__month-text--selected": selection
          ? this.isSelectMonthInList(day, m, selection)
          : undefined,
        "react-datepicker__month-text--keyboard-selected":
          !this.props.disabledKeyboardNavigation &&
          preSelection &&
          this.isSelectedMonth(day, m, preSelection) &&
          !this.isMonthSelected() &&
          !this.isMonthDisabled(m),
        "react-datepicker__month-text--in-selecting-range":
          this.isInSelectingRangeMonth(m),
        "react-datepicker__month-text--in-range":
          startDate && endDate
            ? isMonthInRange(startDate, endDate, m, day)
            : undefined,
        "react-datepicker__month-text--range-start": this.isRangeStartMonth(m),
        "react-datepicker__month-text--range-end": this.isRangeEndMonth(m),
        "react-datepicker__month-text--selecting-range-start":
          this.isSelectingMonthRangeStart(m),
        "react-datepicker__month-text--selecting-range-end":
          this.isSelectingMonthRangeEnd(m),
        "react-datepicker__month-text--today": this.isCurrentMonth(day, m),
      },
    );
  };

  getTabIndex = (m: number) => {
    if (this.props.preSelection == null) {
      return "-1";
    }
    const preSelectedMonth = getMonth(this.props.preSelection);
    const { isDisabled: isPreSelectedMonthDisabled } =
      this.isMonthDisabledForLabelDate(preSelectedMonth);

    const tabIndex =
      m === preSelectedMonth &&
      !(isPreSelectedMonthDisabled || this.props.disabledKeyboardNavigation)
        ? "0"
        : "-1";

    return tabIndex;
  };

  getQuarterTabIndex = (q: number) => {
    if (this.props.preSelection == null) {
      return "-1";
    }
    const preSelectedQuarter = getQuarter(this.props.preSelection);
    const isCurrentQuarterDisabled = isQuarterDisabled(
      this.props.day,
      this.props,
    );

    const tabIndex =
      q === preSelectedQuarter &&
      !(isCurrentQuarterDisabled || this.props.disabledKeyboardNavigation)
        ? "0"
        : "-1";

    return tabIndex;
  };

  getAriaLabel = (month: number) => {
    const {
      chooseDayAriaLabelPrefix = "Choose",
      disabledDayAriaLabelPrefix = "Not available",
      day,
      locale,
    } = this.props;
    const labelDate = setMonth(day, month);
    const prefix =
      this.isDisabled(labelDate) || this.isExcluded(labelDate)
        ? disabledDayAriaLabelPrefix
        : chooseDayAriaLabelPrefix;

    return `${prefix} ${formatDate(labelDate, "MMMM yyyy", locale)}`;
  };

  getQuarterClassNames = (q: number) => {
    const {
      day,
      startDate,
      endDate,
      selected,
      minDate,
      maxDate,
      excludeDates,
      includeDates,
      filterDate,
      preSelection,
      disabledKeyboardNavigation,
    } = this.props;

    const isDisabled =
      (minDate || maxDate || excludeDates || includeDates || filterDate) &&
      isQuarterDisabled(setQuarter(day, q), this.props);

    return clsx(
      "react-datepicker__quarter-text",
      `react-datepicker__quarter-${q}`,
      {
        "react-datepicker__quarter-text--disabled": isDisabled,
        "react-datepicker__quarter-text--selected": selected
          ? this.isSelectedQuarter(day, q, selected)
          : undefined,
        "react-datepicker__quarter-text--keyboard-selected":
          !disabledKeyboardNavigation &&
          preSelection &&
          this.isSelectedQuarter(day, q, preSelection) &&
          !isDisabled,
        "react-datepicker__quarter-text--in-selecting-range":
          this.isInSelectingRangeQuarter(q),
        "react-datepicker__quarter-text--in-range":
          startDate && endDate
            ? isQuarterInRange(startDate, endDate, q, day)
            : undefined,
        "react-datepicker__quarter-text--range-start":
          this.isRangeStartQuarter(q),
        "react-datepicker__quarter-text--range-end": this.isRangeEndQuarter(q),
        "react-datepicker__quarter-text--today": this.isCurrentQuarter(day, q),
      },
    );
  };

  getMonthContent = (m: number) => {
    const { showFullMonthYearPicker, renderMonthContent, locale, day } =
      this.props;
    const shortMonthText = getMonthShortInLocale(m, locale);
    const fullMonthText = getMonthInLocale(m, locale);
    if (renderMonthContent) {
      return renderMonthContent(m, shortMonthText, fullMonthText, day);
    }
    return showFullMonthYearPicker ? fullMonthText : shortMonthText;
  };

  getQuarterContent = (q: number) => {
    const { renderQuarterContent, locale } = this.props;
    const shortQuarter = getQuarterShortInLocale(q, locale);
    return renderQuarterContent?.(q, shortQuarter) ?? shortQuarter;
  };

  renderMonths = () => {
    const {
      showTwoColumnMonthYearPicker,
      showFourColumnMonthYearPicker,
      day,
      selected,
    } = this.props;

    const monthColumns =
      MONTH_COLUMNS[
        getMonthColumnsLayout(
          showFourColumnMonthYearPicker,
          showTwoColumnMonthYearPicker,
        )
      ]?.grid;
    return monthColumns?.map((month, i) => (
      <div className="react-datepicker__month-wrapper" key={i}>
        {month.map((m, j) => (
          <div
            ref={this.MONTH_REFS[m]}
            key={j}
            onClick={(event) => {
              this.onMonthClick(event, m);
            }}
            onKeyDown={(event) => {
              if (isSpaceKeyDown(event)) {
                event.preventDefault();
                event.key = KeyType.Enter;
              }

              this.onMonthKeyDown(event, m);
            }}
            onMouseEnter={
              !this.props.usePointerEvent
                ? () => this.onMonthMouseEnter(m)
                : undefined
            }
            onPointerEnter={
              this.props.usePointerEvent
                ? () => this.onMonthMouseEnter(m)
                : undefined
            }
            tabIndex={Number(this.getTabIndex(m))}
            className={this.getMonthClassNames(m)}
            aria-disabled={this.isMonthDisabled(m)}
            role="option"
            aria-label={this.getAriaLabel(m)}
            aria-current={this.isCurrentMonth(day, m) ? "date" : undefined}
            aria-selected={
              selected ? this.isSelectedMonth(day, m, selected) : undefined
            }
          >
            {this.getMonthContent(m)}
          </div>
        ))}
      </div>
    ));
  };

  renderQuarters = () => {
    const { day, selected } = this.props;
    const quarters = [1, 2, 3, 4];
    return (
      <div className="react-datepicker__quarter-wrapper">
        {quarters.map((q, j) => (
          <div
            key={j}
            ref={this.QUARTER_REFS[j]}
            role="option"
            onClick={(event) => {
              this.onQuarterClick(event, q);
            }}
            onKeyDown={(event) => {
              this.onQuarterKeyDown(event, q);
            }}
            onMouseEnter={
              !this.props.usePointerEvent
                ? () => this.onQuarterMouseEnter(q)
                : undefined
            }
            onPointerEnter={
              this.props.usePointerEvent
                ? () => this.onQuarterMouseEnter(q)
                : undefined
            }
            className={this.getQuarterClassNames(q)}
            aria-selected={
              selected ? this.isSelectedQuarter(day, q, selected) : undefined
            }
            tabIndex={Number(this.getQuarterTabIndex(q))}
            aria-current={this.isCurrentQuarter(day, q) ? "date" : undefined}
          >
            {this.getQuarterContent(q)}
          </div>
        ))}
      </div>
    );
  };

  getClassNames = () => {
    const {
      selectingDate,
      selectsStart,
      selectsEnd,
      showMonthYearPicker,
      showQuarterYearPicker,
      showWeekPicker,
    } = this.props;

    return clsx(
      "react-datepicker__month",
      {
        "react-datepicker__month--selecting-range":
          selectingDate && (selectsStart || selectsEnd),
      },
      { "react-datepicker__monthPicker": showMonthYearPicker },
      { "react-datepicker__quarterPicker": showQuarterYearPicker },
      { "react-datepicker__weekPicker": showWeekPicker },
    );
  };

  render() {
    const {
      showMonthYearPicker,
      showQuarterYearPicker,
      day,
      ariaLabelPrefix = "Month ",
    } = this.props;

    const formattedAriaLabelPrefix = ariaLabelPrefix
      ? ariaLabelPrefix.trim() + " "
      : "";

    const shouldUseListboxRole = showMonthYearPicker || showQuarterYearPicker;

    if (shouldUseListboxRole) {
      return (
        <div
          className={this.getClassNames()}
          onMouseLeave={
            !this.props.usePointerEvent ? this.handleMouseLeave : undefined
          }
          onPointerLeave={
            this.props.usePointerEvent ? this.handleMouseLeave : undefined
          }
          aria-label={`${formattedAriaLabelPrefix}${formatDate(day, "MMMM, yyyy", this.props.locale)}`}
          role="listbox"
        >
          {showMonthYearPicker ? this.renderMonths() : this.renderQuarters()}
        </div>
      );
    }

    // For regular calendar view, use table structure
    return (
      <div role="table">
        {this.props.dayNamesHeader && (
          <div role="rowgroup">{this.props.dayNamesHeader}</div>
        )}
        <div
          className={this.getClassNames()}
          onMouseLeave={
            !this.props.usePointerEvent ? this.handleMouseLeave : undefined
          }
          onPointerLeave={
            this.props.usePointerEvent ? this.handleMouseLeave : undefined
          }
          aria-label={`${formattedAriaLabelPrefix}${formatDate(day, "MMMM, yyyy", this.props.locale)}`}
          role="rowgroup"
        >
          {this.renderWeeks()}
        </div>
      </div>
    );
  }
}
