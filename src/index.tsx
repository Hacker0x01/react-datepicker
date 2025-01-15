import { clsx } from "clsx";
import React, { Component, cloneElement } from "react";

import Calendar from "./calendar";
import CalendarIcon from "./calendar_icon";
import {
  set,
  newDate,
  isDate,
  isBefore,
  isAfter,
  isEqual,
  setTime,
  isValid,
  getSeconds,
  getMinutes,
  getHours,
  addDays,
  addMonths,
  addWeeks,
  subDays,
  subMonths,
  subWeeks,
  addYears,
  subYears,
  isDayDisabled,
  isDayInRange,
  getEffectiveMinDate,
  getEffectiveMaxDate,
  parseDate,
  safeDateFormat,
  safeDateRangeFormat,
  getHighLightDaysMap,
  getYear,
  getMonth,
  getStartOfWeek,
  getEndOfWeek,
  registerLocale,
  setDefaultLocale,
  getDefaultLocale,
  DEFAULT_YEAR_ITEM_NUMBER,
  isSameDay,
  isMonthDisabled,
  isYearDisabled,
  safeMultipleDatesFormat,
  getHolidaysMap,
  isDateBefore,
  getStartOfDay,
  getEndOfDay,
  type HighlightDate,
  type HolidayItem,
  KeyType,
} from "./date_utils";
import PopperComponent from "./popper_component";
import Portal from "./portal";
import TabLoop from "./tab_loop";

import type { ClickOutsideHandler } from "./click_outside_wrapper";

export { default as CalendarContainer } from "./calendar_container";

export { registerLocale, setDefaultLocale, getDefaultLocale };

const outsideClickIgnoreClass = "react-datepicker-ignore-onclickoutside";

export { ReactDatePickerCustomHeaderProps } from "./calendar";

// Compares dates year+month combinations
function hasPreSelectionChanged(
  date1?: Date | null,
  date2?: Date | null,
): boolean {
  if (date1 && date2) {
    return (
      getMonth(date1) !== getMonth(date2) || getYear(date1) !== getYear(date2)
    );
  }

  return date1 !== date2;
}

/**
 * General datepicker component.
 */
const INPUT_ERR_1 = "Date input not valid.";

interface Holiday {
  date: string;
  holidayName: string;
}

type CalendarProps = React.ComponentPropsWithoutRef<typeof Calendar>;

interface CalendarIconProps
  extends React.ComponentPropsWithoutRef<typeof CalendarIcon> {}

interface PortalProps extends React.ComponentPropsWithoutRef<typeof Portal> {}

interface PopperComponentProps
  extends React.ComponentPropsWithoutRef<typeof PopperComponent> {}

// see https://github.com/microsoft/TypeScript/issues/31501
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OmitUnion<T, K extends keyof any> = T extends any ? Omit<T, K> : never;
export type DatePickerProps = OmitUnion<
  CalendarProps,
  | "setOpen"
  | "dateFormat"
  | "preSelection"
  | "onSelect"
  | "onClickOutside"
  | "highlightDates"
  | "holidays"
  | "shouldFocusDayInline"
  | "outsideClickIgnoreClass"
  | "monthSelectedIn"
  | "onDropdownFocus"
  | "onTimeChange"
  | "className"
  | "container"
  | "handleOnKeyDown"
  | "handleOnDayKeyDown"
  | "isInputFocused"
  | "setPreSelection"
  | "selectsRange"
  | "selectsMultiple"
  | "dropdownMode"
> &
  Pick<CalendarIconProps, "icon"> &
  OmitUnion<PortalProps, "children" | "portalId"> &
  OmitUnion<
    PopperComponentProps,
    | "className"
    | "hidePopper"
    | "targetComponent"
    | "popperComponent"
    | "popperOnKeyDown"
    | "showArrow"
  > & {
    dateFormatCalendar?: CalendarProps["dateFormat"];
    calendarClassName?: CalendarProps["className"];
    calendarContainer?: CalendarProps["container"];
    dropdownMode?: CalendarProps["dropdownMode"];
    onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
    popperClassName?: PopperComponentProps["className"];
    showPopperArrow?: PopperComponentProps["showArrow"];
    open?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    startOpen?: boolean;
    onFocus?: React.FocusEventHandler<HTMLElement>;
    onBlur?: React.FocusEventHandler<HTMLElement>;
    onClickOutside?: ClickOutsideHandler;
    onInputClick?: VoidFunction;
    preventOpenOnFocus?: boolean;
    closeOnScroll?: boolean | ((event: Event) => boolean);
    isClearable?: boolean;
    clearButtonTitle?: string;
    clearButtonClassName?: string;
    ariaLabelClose?: string;
    className?: string;
    customInput?: Parameters<typeof cloneElement>[0];
    dateFormat?: string | string[];
    showDateSelect?: boolean;
    highlightDates?: (Date | HighlightDate)[];
    onCalendarOpen?: VoidFunction;
    onCalendarClose?: VoidFunction;
    strictParsing?: boolean;
    swapRange?: boolean;
    onInputError?: (error: { code: 1; msg: string }) => void;
    allowSameDay?: boolean;
    withPortal?: boolean;
    focusSelectedMonth?: boolean;
    showIcon?: boolean;
    calendarIconClassname?: never;
    calendarIconClassName?: string;
    toggleCalendarOnIconClick?: boolean;
    holidays?: Holiday[];
    startDate?: Date | null;
    endDate?: Date | null;
    selected?: Date | null;
    value?: string;
    customInputRef?: string;
    id?: string;
    name?: string;
    form?: string;
    autoFocus?: boolean;
    placeholderText?: string;
    autoComplete?: string;
    title?: string;
    required?: boolean;
    tabIndex?: number;
    ariaDescribedBy?: string;
    ariaInvalid?: string;
    ariaLabelledBy?: string;
    ariaRequired?: string;
    onChangeRaw?: (
      event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    ) => void;
    onSelect?: (
      date: Date | null,
      event?:
        | React.MouseEvent<HTMLElement, MouseEvent>
        | React.KeyboardEvent<HTMLElement>,
    ) => void;
  } & (
    | {
        selectsRange?: never;
        selectsMultiple?: never;
        onChange?: (
          date: Date | null,
          event?:
            | React.MouseEvent<HTMLElement>
            | React.KeyboardEvent<HTMLElement>,
        ) => void;
      }
    | {
        selectsRange: true;
        selectsMultiple?: never;
        onChange?: (
          date: [Date | null, Date | null],
          event?:
            | React.MouseEvent<HTMLElement>
            | React.KeyboardEvent<HTMLElement>,
        ) => void;
      }
    | {
        selectsRange?: never;
        selectsMultiple: true;
        onChange?: (
          date: Date[] | null,
          event?:
            | React.MouseEvent<HTMLElement>
            | React.KeyboardEvent<HTMLElement>,
        ) => void;
      }
  );

interface DatePickerState {
  open: boolean;
  wasHidden: boolean;
  lastPreSelectChange?:
    | typeof PRESELECT_CHANGE_VIA_INPUT
    | typeof PRESELECT_CHANGE_VIA_NAVIGATE;
  inputValue: string | null;
  preventFocus: boolean;
  preSelection?: CalendarProps["preSelection"];
  shouldFocusDayInline?: CalendarProps["shouldFocusDayInline"];
  monthSelectedIn?: CalendarProps["monthSelectedIn"];
  focused?: CalendarProps["isInputFocused"];
  highlightDates: Required<CalendarProps>["highlightDates"];
  isRenderAriaLiveMessage?: boolean;
}

export default class DatePicker extends Component<
  DatePickerProps,
  DatePickerState
> {
  static get defaultProps() {
    return {
      allowSameDay: false,
      dateFormat: "MM/dd/yyyy",
      dateFormatCalendar: "LLLL yyyy",
      disabled: false,
      disabledKeyboardNavigation: false,
      dropdownMode: "scroll" as const,
      preventOpenOnFocus: false,
      monthsShown: 1,
      readOnly: false,
      withPortal: false,
      selectsDisabledDaysInRange: false,
      shouldCloseOnSelect: true,
      showTimeSelect: false,
      showTimeInput: false,
      showPreviousMonths: false,
      showMonthYearPicker: false,
      showFullMonthYearPicker: false,
      showTwoColumnMonthYearPicker: false,
      showFourColumnMonthYearPicker: false,
      showYearPicker: false,
      showQuarterYearPicker: false,
      showWeekPicker: false,
      strictParsing: false,
      swapRange: false,
      timeIntervals: 30,
      timeCaption: "Time",
      previousMonthAriaLabel: "Previous Month",
      previousMonthButtonLabel: "Previous Month",
      nextMonthAriaLabel: "Next Month",
      nextMonthButtonLabel: "Next Month",
      previousYearAriaLabel: "Previous Year",
      previousYearButtonLabel: "Previous Year",
      nextYearAriaLabel: "Next Year",
      nextYearButtonLabel: "Next Year",
      timeInputLabel: "Time",
      enableTabLoop: true,
      yearItemNumber: DEFAULT_YEAR_ITEM_NUMBER,
      focusSelectedMonth: false,
      showPopperArrow: true,
      excludeScrollbar: true,
      customTimeInput: null,
      calendarStartDay: undefined,
      toggleCalendarOnIconClick: false,
      usePointerEvent: false,
    };
  }

  constructor(props: DatePickerProps) {
    super(props);
    this.state = this.calcInitialState();
    this.preventFocusTimeout = undefined;
  }

  componentDidMount(): void {
    window.addEventListener("scroll", this.onScroll, true);
    document.addEventListener(
      "visibilitychange",
      this.setHiddenStateOnVisibilityHidden,
    );
  }

  componentDidUpdate(
    prevProps: DatePickerProps,
    prevState: DatePickerState,
  ): void {
    if (
      prevProps.inline &&
      hasPreSelectionChanged(prevProps.selected, this.props.selected)
    ) {
      this.setPreSelection(this.props.selected);
    }
    if (
      this.state.monthSelectedIn !== undefined &&
      prevProps.monthsShown !== this.props.monthsShown
    ) {
      this.setState({ monthSelectedIn: 0 });
    }
    if (prevProps.highlightDates !== this.props.highlightDates) {
      this.setState({
        highlightDates: getHighLightDaysMap(this.props.highlightDates),
      });
    }
    if (
      !prevState.focused &&
      !isEqual(prevProps.selected, this.props.selected)
    ) {
      this.setState({ inputValue: null });
    }

    if (prevState.open !== this.state.open) {
      if (prevState.open === false && this.state.open === true) {
        this.props.onCalendarOpen?.();
      }

      if (prevState.open === true && this.state.open === false) {
        this.props.onCalendarClose?.();
      }
    }
  }

  componentWillUnmount(): void {
    this.clearPreventFocusTimeout();
    window.removeEventListener("scroll", this.onScroll, true);
    document.removeEventListener(
      "visibilitychange",
      this.setHiddenStateOnVisibilityHidden,
    );
  }

  preventFocusTimeout: ReturnType<typeof setTimeout> | undefined;

  inputFocusTimeout: ReturnType<typeof setTimeout> | undefined;

  calendar: Calendar | null = null;

  input: HTMLElement | null = null;

  getPreSelection = (): Date =>
    this.props.openToDate
      ? this.props.openToDate
      : this.props.selectsEnd && this.props.startDate
        ? this.props.startDate
        : this.props.selectsStart && this.props.endDate
          ? this.props.endDate
          : newDate();

  // Convert the date from string format to standard Date format
  modifyHolidays = () =>
    this.props.holidays?.reduce<HolidayItem[]>((accumulator, holiday) => {
      const date = new Date(holiday.date);
      if (!isValid(date)) {
        return accumulator;
      }

      return [...accumulator, { ...holiday, date }];
    }, []);

  calcInitialState = (): DatePickerState => {
    const defaultPreSelection = this.getPreSelection();
    const minDate = getEffectiveMinDate(this.props);
    const maxDate = getEffectiveMaxDate(this.props);
    const boundedPreSelection =
      minDate && isBefore(defaultPreSelection, getStartOfDay(minDate))
        ? minDate
        : maxDate && isAfter(defaultPreSelection, getEndOfDay(maxDate))
          ? maxDate
          : defaultPreSelection;
    return {
      open: this.props.startOpen || false,
      preventFocus: false,
      inputValue: null,
      preSelection:
        (this.props.selectsRange
          ? this.props.startDate
          : this.props.selected) ?? boundedPreSelection,
      // transforming highlighted days (perhaps nested array)
      // to flat Map for faster access in day.jsx
      highlightDates: getHighLightDaysMap(this.props.highlightDates),
      focused: false,
      // used to focus day in inline version after month has changed, but not on
      // initial render
      shouldFocusDayInline: false,
      isRenderAriaLiveMessage: false,
      wasHidden: false,
    };
  };

  resetHiddenStatus = (): void => {
    this.setState({
      ...this.state,
      wasHidden: false,
    });
  };

  setHiddenStatus = (): void => {
    this.setState({
      ...this.state,
      wasHidden: true,
    });
  };

  setHiddenStateOnVisibilityHidden = (): void => {
    if (document.visibilityState !== "hidden") {
      return;
    }

    this.setHiddenStatus();
  };

  clearPreventFocusTimeout = () => {
    if (this.preventFocusTimeout) {
      clearTimeout(this.preventFocusTimeout);
    }
  };

  safeFocus = () => {
    setTimeout(() => {
      this.input?.focus?.({ preventScroll: true });
    }, 0);
  };

  safeBlur = () => {
    setTimeout(() => {
      this.input?.blur?.();
    }, 0);
  };

  setFocus = () => {
    this.safeFocus();
  };

  setBlur = () => {
    this.safeBlur();
    this.cancelFocusInput();
  };

  setOpen = (open: boolean, skipSetBlur: boolean = false): void => {
    this.setState(
      {
        open: open,
        preSelection:
          open && this.state.open
            ? this.state.preSelection
            : this.calcInitialState().preSelection,
        lastPreSelectChange: PRESELECT_CHANGE_VIA_NAVIGATE,
      },
      () => {
        if (!open) {
          this.setState(
            (prev: DatePickerState) => ({
              focused: skipSetBlur ? prev.focused : false,
            }),
            () => {
              !skipSetBlur && this.setBlur();

              this.setState({ inputValue: null });
            },
          );
        }
      },
    );
  };
  inputOk = (): boolean => isDate(this.state.preSelection);

  isCalendarOpen = () =>
    this.props.open === undefined
      ? this.state.open && !this.props.disabled && !this.props.readOnly
      : this.props.open;

  handleFocus = (event: React.FocusEvent<HTMLElement>): void => {
    const isAutoReFocus = this.state.wasHidden;
    const isOpenAllowed = isAutoReFocus ? this.state.open : true;

    if (isAutoReFocus) {
      this.resetHiddenStatus();
    }

    if (!this.state.preventFocus) {
      this.props.onFocus?.(event);
      if (
        isOpenAllowed &&
        !this.props.preventOpenOnFocus &&
        !this.props.readOnly
      ) {
        this.setOpen(true);
      }
    }
    this.setState({ focused: true });
  };

  sendFocusBackToInput = (): void => {
    // Clear previous timeout if it exists
    if (this.preventFocusTimeout) {
      this.clearPreventFocusTimeout();
    }

    // close the popper and refocus the input
    // stop the input from auto opening onFocus
    // setFocus to the input
    this.setState({ preventFocus: true }, (): void => {
      this.preventFocusTimeout = setTimeout((): void => {
        this.setFocus();
        this.setState({ preventFocus: false });
      });
    });
  };

  cancelFocusInput = () => {
    clearTimeout(this.inputFocusTimeout);
    this.inputFocusTimeout = undefined;
  };

  deferFocusInput = () => {
    this.cancelFocusInput();
    this.inputFocusTimeout = setTimeout(() => this.setFocus(), 1);
  };

  handleDropdownFocus = () => {
    this.cancelFocusInput();
  };

  handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    if (!this.state.open || this.props.withPortal || this.props.showTimeInput) {
      this.props.onBlur?.(event);
    }

    this.setState({ focused: false });
  };

  handleCalendarClickOutside = (event: MouseEvent) => {
    if (!this.props.inline) {
      this.setOpen(false);
    }
    this.props.onClickOutside?.(event);
    if (this.props.withPortal) {
      event.preventDefault();
    }
  };

  // handleChange is called when user types in the textbox
  handleChange = (
    ...allArgs: Parameters<Required<DatePickerProps>["onChangeRaw"]>
  ) => {
    const event = allArgs[0];
    if (this.props.onChangeRaw) {
      this.props.onChangeRaw.apply(this, allArgs);
      if (
        !event ||
        typeof event.isDefaultPrevented !== "function" ||
        event.isDefaultPrevented()
      ) {
        return;
      }
    }

    this.setState({
      inputValue:
        event?.target instanceof HTMLInputElement ? event.target.value : null,
      lastPreSelectChange: PRESELECT_CHANGE_VIA_INPUT,
    });

    const {
      dateFormat = DatePicker.defaultProps.dateFormat,
      strictParsing = DatePicker.defaultProps.strictParsing,
      selectsRange,
      startDate,
      endDate,
    } = this.props;

    const value =
      event?.target instanceof HTMLInputElement ? event.target.value : "";

    if (selectsRange) {
      const [valueStart, valueEnd] = value
        .split("-", 2)
        .map((val) => val.trim());
      const startDateNew = parseDate(
        valueStart ?? "",
        dateFormat,
        this.props.locale,
        strictParsing,
      );
      const endDateNew = parseDate(
        valueEnd ?? "",
        dateFormat,
        this.props.locale,
        strictParsing,
      );
      const startChanged = startDate?.getTime() !== startDateNew?.getTime();
      const endChanged = endDate?.getTime() !== endDateNew?.getTime();

      if (!startChanged && !endChanged) {
        return;
      }

      if (startDateNew && isDayDisabled(startDateNew, this.props)) {
        return;
      }
      if (endDateNew && isDayDisabled(endDateNew, this.props)) {
        return;
      }

      this.props.onChange?.([startDateNew, endDateNew], event);
    } else {
      // not selectsRange
      let date = parseDate(
        value,
        dateFormat,
        this.props.locale,
        strictParsing,
        this.props.minDate,
      );

      // Use date from `selected` prop when manipulating only time for input value
      if (
        this.props.showTimeSelectOnly &&
        this.props.selected &&
        date &&
        !isSameDay(date, this.props.selected)
      ) {
        date = set(this.props.selected, {
          hours: getHours(date),
          minutes: getMinutes(date),
          seconds: getSeconds(date),
        });
      }

      // Update selection if either (1) date was successfully parsed, or (2) input field is empty
      if (date || !value) {
        this.setSelected(date, event, true);
      }
    }
  };

  handleSelect = (
    date: Date,
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    monthSelectedIn?: number,
  ) => {
    if (this.props.shouldCloseOnSelect && !this.props.showTimeSelect) {
      // Preventing onFocus event to fix issue
      // https://github.com/Hacker0x01/react-datepicker/issues/628
      this.sendFocusBackToInput();
    }
    if (this.props.onChangeRaw) {
      this.props.onChangeRaw(event);
    }
    this.setSelected(date, event, false, monthSelectedIn);
    if (this.props.showDateSelect) {
      this.setState({ isRenderAriaLiveMessage: true });
    }
    if (!this.props.shouldCloseOnSelect || this.props.showTimeSelect) {
      this.setPreSelection(date);
    } else if (!this.props.inline) {
      if (!this.props.selectsRange) {
        this.setOpen(false);
      }

      const { startDate, endDate } = this.props;

      if (
        startDate &&
        !endDate &&
        (this.props.swapRange || !isDateBefore(date, startDate))
      ) {
        this.setOpen(false);
      }
    }
  };

  // setSelected is called either from handleChange (user typed date into textbox and it was parsed) or handleSelect (user selected date from calendar using mouse or keyboard)
  setSelected = (
    date: Date | null,
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    keepInput?: boolean,
    monthSelectedIn?: number,
  ) => {
    let changedDate = date;

    // Early return if selected year/month/day is disabled
    if (this.props.showYearPicker) {
      if (
        changedDate !== null &&
        isYearDisabled(getYear(changedDate), this.props)
      ) {
        return;
      }
    } else if (this.props.showMonthYearPicker) {
      if (changedDate !== null && isMonthDisabled(changedDate, this.props)) {
        return;
      }
    } else {
      if (changedDate !== null && isDayDisabled(changedDate, this.props)) {
        return;
      }
    }

    const {
      onChange,
      selectsRange,
      startDate,
      endDate,
      selectsMultiple,
      selectedDates,
      minTime,
      swapRange,
    } = this.props;

    if (
      !isEqual(this.props.selected, changedDate) ||
      this.props.allowSameDay ||
      selectsRange ||
      selectsMultiple
    ) {
      if (changedDate !== null) {
        // Preserve previously selected time if only date is currently being changed
        if (
          this.props.selected &&
          (!keepInput ||
            (!this.props.showTimeSelect &&
              !this.props.showTimeSelectOnly &&
              !this.props.showTimeInput))
        ) {
          changedDate = setTime(changedDate, {
            hour: getHours(this.props.selected),
            minute: getMinutes(this.props.selected),
            second: getSeconds(this.props.selected),
          });
        }

        // If minTime is present then set the time to minTime
        if (
          !keepInput &&
          (this.props.showTimeSelect || this.props.showTimeSelectOnly)
        ) {
          if (minTime) {
            changedDate = setTime(changedDate, {
              hour: minTime.getHours(),
              minute: minTime.getMinutes(),
              second: minTime.getSeconds(),
            });
          }
        }

        if (!this.props.inline) {
          this.setState({
            preSelection: changedDate,
          });
        }
        if (!this.props.focusSelectedMonth) {
          this.setState({ monthSelectedIn: monthSelectedIn });
        }
      }

      if (selectsRange) {
        const noRanges = !startDate && !endDate;
        const hasStartRange = startDate && !endDate;
        const isRangeFilled = startDate && endDate;
        if (noRanges) {
          onChange?.([changedDate, null], event);
        } else if (hasStartRange) {
          if (changedDate === null) {
            onChange?.([null, null], event);
          } else if (isDateBefore(changedDate, startDate)) {
            if (swapRange) {
              onChange?.([changedDate, startDate], event);
            } else {
              onChange?.([changedDate, null], event);
            }
          } else {
            onChange?.([startDate, changedDate], event);
          }
        }
        if (isRangeFilled) {
          onChange?.([changedDate, null], event);
        }
      } else if (selectsMultiple) {
        if (changedDate !== null) {
          if (!selectedDates?.length) {
            onChange?.([changedDate], event);
          } else {
            const isChangedDateAlreadySelected = selectedDates.some(
              (selectedDate) => isSameDay(selectedDate, changedDate),
            );

            if (isChangedDateAlreadySelected) {
              const nextDates = selectedDates.filter(
                (selectedDate) => !isSameDay(selectedDate, changedDate),
              );

              onChange?.(nextDates, event);
            } else {
              onChange?.([...selectedDates, changedDate], event);
            }
          }
        }
      } else {
        onChange?.(changedDate, event);
      }
    }

    if (!keepInput) {
      this.props.onSelect?.(changedDate, event);
      this.setState({ inputValue: null });
    }
  };

  // When checking preSelection via min/maxDate, times need to be manipulated via getStartOfDay/getEndOfDay
  setPreSelection = (date?: Date | null): void => {
    const hasMinDate = isDate(this.props.minDate);
    const hasMaxDate = isDate(this.props.maxDate);
    let isValidDateSelection = true;
    if (date) {
      const dateStartOfDay = getStartOfDay(date);
      if (hasMinDate && hasMaxDate) {
        // isDayInRange uses getStartOfDay internally, so not necessary to manipulate times here
        isValidDateSelection = isDayInRange(
          date,
          this.props.minDate,
          this.props.maxDate,
        );
      } else if (hasMinDate) {
        const minDateStartOfDay = getStartOfDay(this.props.minDate);
        isValidDateSelection =
          isAfter(date, minDateStartOfDay) ||
          isEqual(dateStartOfDay, minDateStartOfDay);
      } else if (hasMaxDate) {
        const maxDateEndOfDay = getEndOfDay(this.props.maxDate);
        isValidDateSelection =
          isBefore(date, maxDateEndOfDay) ||
          isEqual(dateStartOfDay, maxDateEndOfDay);
      }
    }
    if (isValidDateSelection) {
      this.setState({
        preSelection: date,
      });
    }
  };

  toggleCalendar = (): void => {
    this.setOpen(!this.state.open);
  };

  handleTimeChange = (time: Date): void => {
    if (this.props.selectsRange || this.props.selectsMultiple) {
      return;
    }

    const selected = this.props.selected
      ? this.props.selected
      : this.getPreSelection();
    const changedDate = this.props.selected
      ? time
      : setTime(selected, {
          hour: getHours(time),
          minute: getMinutes(time),
        });

    this.setState({
      preSelection: changedDate,
    });

    this.props.onChange?.(changedDate);
    if (this.props.shouldCloseOnSelect && !this.props.showTimeInput) {
      this.sendFocusBackToInput();
      this.setOpen(false);
    }
    if (this.props.showTimeInput) {
      this.setOpen(true);
    }
    if (this.props.showTimeSelectOnly || this.props.showTimeSelect) {
      this.setState({ isRenderAriaLiveMessage: true });
    }
    this.setState({ inputValue: null });
  };

  onInputClick = (): void => {
    if (!this.props.disabled && !this.props.readOnly) {
      this.setOpen(true);
    }

    this.props.onInputClick?.();
  };

  onInputKeyDown = (event: React.KeyboardEvent<HTMLElement>): void => {
    this.props.onKeyDown?.(event);
    const eventKey = event.key;

    if (
      !this.state.open &&
      !this.props.inline &&
      !this.props.preventOpenOnFocus
    ) {
      if (
        eventKey === KeyType.ArrowDown ||
        eventKey === KeyType.ArrowUp ||
        eventKey === KeyType.Enter
      ) {
        this.onInputClick?.();
      }
      return;
    }

    // if calendar is open, these keys will focus the selected item
    if (this.state.open) {
      if (eventKey === KeyType.ArrowDown || eventKey === KeyType.ArrowUp) {
        event.preventDefault();
        const selectorString = this.props.showTimeSelectOnly
          ? ".react-datepicker__time-list-item[tabindex='0']"
          : this.props.showWeekPicker && this.props.showWeekNumbers
            ? '.react-datepicker__week-number[tabindex="0"]'
            : this.props.showFullMonthYearPicker ||
                this.props.showMonthYearPicker
              ? '.react-datepicker__month-text[tabindex="0"]'
              : '.react-datepicker__day[tabindex="0"]';
        const selectedItem =
          this.calendar?.containerRef.current instanceof Element &&
          this.calendar.containerRef.current.querySelector(selectorString);
        selectedItem instanceof HTMLElement &&
          selectedItem.focus({ preventScroll: true });

        return;
      }

      const copy = newDate(this.state.preSelection);
      if (eventKey === KeyType.Enter) {
        event.preventDefault();
        (event.target as HTMLInputElement).blur();
        if (
          this.inputOk() &&
          this.state.lastPreSelectChange === PRESELECT_CHANGE_VIA_NAVIGATE
        ) {
          this.handleSelect(copy, event);
          !this.props.shouldCloseOnSelect && this.setPreSelection(copy);
        } else {
          this.setOpen(false);
        }
      } else if (eventKey === KeyType.Escape) {
        event.preventDefault();
        (event.target as HTMLInputElement).blur();
        this.sendFocusBackToInput();
        this.setOpen(false);
      } else if (eventKey === KeyType.Tab) {
        this.setOpen(false);
      }

      if (!this.inputOk()) {
        this.props.onInputError?.({ code: 1, msg: INPUT_ERR_1 });
      }
    }
  };

  onPortalKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    const eventKey = event.key;
    if (eventKey === KeyType.Escape) {
      event.preventDefault();
      this.setState(
        {
          preventFocus: true,
        },
        () => {
          this.setOpen(false);
          setTimeout(() => {
            this.setFocus();
            this.setState({ preventFocus: false });
          });
        },
      );
    }
  };

  // keyDown events passed down to day.jsx
  onDayKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const {
      minDate,
      maxDate,
      disabledKeyboardNavigation,
      showWeekPicker,
      shouldCloseOnSelect,
      locale,
      calendarStartDay,
      adjustDateOnChange,
      inline,
    } = this.props;
    this.props.onKeyDown?.(event);
    if (disabledKeyboardNavigation) return;
    const eventKey = event.key as KeyType;
    const isShiftKeyActive = event.shiftKey;

    const copy = newDate(this.state.preSelection);

    const calculateNewDate = (eventKey: KeyType, date: Date): Date => {
      let newCalculatedDate = date;
      switch (eventKey) {
        case KeyType.ArrowRight:
          newCalculatedDate = showWeekPicker
            ? addWeeks(date, 1)
            : addDays(date, 1);
          break;
        case KeyType.ArrowLeft:
          newCalculatedDate = showWeekPicker
            ? subWeeks(date, 1)
            : subDays(date, 1);
          break;
        case KeyType.ArrowUp:
          newCalculatedDate = subWeeks(date, 1);
          break;
        case KeyType.ArrowDown:
          newCalculatedDate = addWeeks(date, 1);
          break;
        case KeyType.PageUp:
          newCalculatedDate = isShiftKeyActive
            ? subYears(date, 1)
            : subMonths(date, 1);
          break;
        case KeyType.PageDown:
          newCalculatedDate = isShiftKeyActive
            ? addYears(date, 1)
            : addMonths(date, 1);
          break;
        case KeyType.Home:
          newCalculatedDate = getStartOfWeek(date, locale, calendarStartDay);
          break;
        case KeyType.End:
          newCalculatedDate = getEndOfWeek(date);
          break;
      }
      return newCalculatedDate;
    };

    const getNewDate = (eventKey: KeyType, date: Date): Date => {
      const MAX_ITERATIONS = 40;
      let eventKeyCopy = eventKey;
      let validDateFound = false;
      let iterations = 0;
      let newSelection = calculateNewDate(eventKey, date);

      while (!validDateFound) {
        if (iterations >= MAX_ITERATIONS) {
          newSelection = date;
          break;
        }
        // if minDate exists and the new selection is before the min date, get the nearest date that isn't disabled
        if (minDate && newSelection < minDate) {
          eventKeyCopy = KeyType.ArrowRight;
          newSelection = isDayDisabled(minDate, this.props)
            ? calculateNewDate(eventKeyCopy, newSelection)
            : minDate;
        }

        // if maxDate exists and the new selection is after the max date, get the nearest date that isn't disabled
        if (maxDate && newSelection > maxDate) {
          eventKeyCopy = KeyType.ArrowLeft;
          newSelection = isDayDisabled(maxDate, this.props)
            ? calculateNewDate(eventKeyCopy, newSelection)
            : maxDate;
        }

        if (isDayDisabled(newSelection, this.props)) {
          // if PageUp and Home is pressed to a disabled date, it will try to find the next available date after
          if (
            eventKeyCopy === KeyType.PageUp ||
            eventKeyCopy === KeyType.Home
          ) {
            eventKeyCopy = KeyType.ArrowRight;
          }

          // if PageDown and End is pressed to a disabled date, it will try to find the next available date before
          if (
            eventKeyCopy === KeyType.PageDown ||
            eventKeyCopy === KeyType.End
          ) {
            eventKeyCopy = KeyType.ArrowLeft;
          }
          newSelection = calculateNewDate(eventKeyCopy, newSelection);
        } else {
          validDateFound = true;
        }
        iterations++;
      }

      return newSelection;
    };

    if (eventKey === KeyType.Enter) {
      event.preventDefault();
      this.handleSelect(copy, event);
      !shouldCloseOnSelect && this.setPreSelection(copy);
      return;
    } else if (eventKey === KeyType.Escape) {
      event.preventDefault();

      this.setOpen(false);
      if (!this.inputOk()) {
        this.props.onInputError?.({ code: 1, msg: INPUT_ERR_1 });
      }
      return;
    }

    let newSelection = null;
    switch (eventKey) {
      case KeyType.ArrowLeft:
      case KeyType.ArrowRight:
      case KeyType.ArrowUp:
      case KeyType.ArrowDown:
      case KeyType.PageUp:
      case KeyType.PageDown:
      case KeyType.Home:
      case KeyType.End:
        newSelection = getNewDate(eventKey, copy);
        break;
    }
    if (!newSelection) {
      this.props.onInputError?.({ code: 1, msg: INPUT_ERR_1 });
      return;
    }
    event.preventDefault();
    this.setState({ lastPreSelectChange: PRESELECT_CHANGE_VIA_NAVIGATE });
    if (adjustDateOnChange) {
      this.setSelected(newSelection);
    }
    this.setPreSelection(newSelection);
    // need to figure out whether month has changed to focus day in inline version
    if (inline) {
      const prevMonth = getMonth(copy);
      const newMonth = getMonth(newSelection);
      const prevYear = getYear(copy);
      const newYear = getYear(newSelection);

      if (prevMonth !== newMonth || prevYear !== newYear) {
        // month has changed
        this.setState({ shouldFocusDayInline: true });
      } else {
        // month hasn't changed
        this.setState({ shouldFocusDayInline: false });
      }
    }
  };

  // handle generic key down events in the popper that do not adjust or select dates
  // ex: while focusing prev and next month buttons
  onPopperKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    const eventKey = event.key;
    if (eventKey === KeyType.Escape) {
      event.preventDefault();
      this.sendFocusBackToInput();
    }
  };

  onClearClick = (event?: React.MouseEvent<HTMLButtonElement>): void => {
    if (event) {
      if (event.preventDefault) {
        event.preventDefault();
      }
    }

    this.sendFocusBackToInput();

    const { selectsRange, onChange } = this.props;
    if (selectsRange) {
      onChange?.([null, null], event);
    } else {
      onChange?.(null, event);
    }

    this.setState({ inputValue: null });
  };

  clear = () => {
    this.onClearClick();
  };

  onScroll = (event: Event): void => {
    if (
      typeof this.props.closeOnScroll === "boolean" &&
      this.props.closeOnScroll
    ) {
      if (
        event.target === document ||
        event.target === document.documentElement ||
        event.target === document.body
      ) {
        this.setOpen(false);
      }
    } else if (typeof this.props.closeOnScroll === "function") {
      if (this.props.closeOnScroll(event)) {
        this.setOpen(false);
      }
    }
  };

  renderCalendar = () => {
    if (!this.props.inline && !this.isCalendarOpen()) {
      return null;
    }
    return (
      <Calendar
        showMonthYearDropdown={undefined}
        ref={(elem) => {
          this.calendar = elem;
        }}
        {...this.props}
        {...this.state}
        setOpen={this.setOpen}
        dateFormat={
          this.props.dateFormatCalendar ??
          DatePicker.defaultProps.dateFormatCalendar
        }
        onSelect={this.handleSelect}
        onClickOutside={this.handleCalendarClickOutside}
        holidays={getHolidaysMap(this.modifyHolidays())}
        outsideClickIgnoreClass={outsideClickIgnoreClass}
        onDropdownFocus={this.handleDropdownFocus}
        onTimeChange={this.handleTimeChange}
        className={this.props.calendarClassName}
        container={this.props.calendarContainer}
        handleOnKeyDown={this.props.onKeyDown}
        handleOnDayKeyDown={this.onDayKeyDown}
        setPreSelection={this.setPreSelection}
        dropdownMode={
          this.props.dropdownMode ?? DatePicker.defaultProps.dropdownMode
        }
      >
        {this.props.children}
      </Calendar>
    );
  };

  renderAriaLiveRegion = () => {
    const { dateFormat = DatePicker.defaultProps.dateFormat, locale } =
      this.props;
    const isContainsTime =
      this.props.showTimeInput || this.props.showTimeSelect;
    const longDateFormat = isContainsTime ? "PPPPp" : "PPPP";
    let ariaLiveMessage;

    if (this.props.selectsRange) {
      ariaLiveMessage = `Selected start date: ${safeDateFormat(
        this.props.startDate,
        {
          dateFormat: longDateFormat,
          locale,
        },
      )}. ${
        this.props.endDate
          ? "End date: " +
            safeDateFormat(this.props.endDate, {
              dateFormat: longDateFormat,
              locale,
            })
          : ""
      }`;
    } else {
      if (this.props.showTimeSelectOnly) {
        ariaLiveMessage = `Selected time: ${safeDateFormat(
          this.props.selected,
          { dateFormat, locale },
        )}`;
      } else if (this.props.showYearPicker) {
        ariaLiveMessage = `Selected year: ${safeDateFormat(
          this.props.selected,
          { dateFormat: "yyyy", locale },
        )}`;
      } else if (this.props.showMonthYearPicker) {
        ariaLiveMessage = `Selected month: ${safeDateFormat(
          this.props.selected,
          { dateFormat: "MMMM yyyy", locale },
        )}`;
      } else if (this.props.showQuarterYearPicker) {
        ariaLiveMessage = `Selected quarter: ${safeDateFormat(
          this.props.selected,
          {
            dateFormat: "yyyy, QQQ",
            locale,
          },
        )}`;
      } else {
        ariaLiveMessage = `Selected date: ${safeDateFormat(
          this.props.selected,
          {
            dateFormat: longDateFormat,
            locale,
          },
        )}`;
      }
    }

    return (
      <span
        role="alert"
        aria-live="polite"
        className="react-datepicker__aria-live"
      >
        {ariaLiveMessage}
      </span>
    );
  };

  renderDateInput = () => {
    const className = clsx(this.props.className, {
      [outsideClickIgnoreClass]: this.state.open,
    });

    const customInput = this.props.customInput || <input type="text" />;
    const customInputRef = this.props.customInputRef || "ref";
    const { dateFormat = DatePicker.defaultProps.dateFormat, locale } =
      this.props;
    const inputValue =
      typeof this.props.value === "string"
        ? this.props.value
        : typeof this.state.inputValue === "string"
          ? this.state.inputValue
          : this.props.selectsRange
            ? safeDateRangeFormat(this.props.startDate, this.props.endDate, {
                dateFormat,
                locale,
              })
            : this.props.selectsMultiple
              ? safeMultipleDatesFormat(this.props.selectedDates ?? [], {
                  dateFormat,
                  locale,
                })
              : safeDateFormat(this.props.selected, {
                  dateFormat,
                  locale,
                });

    return cloneElement(customInput, {
      [customInputRef]: (input: HTMLElement | null) => {
        this.input = input;
      },
      value: inputValue,
      onBlur: this.handleBlur,
      onChange: this.handleChange,
      onClick: this.onInputClick,
      onFocus: this.handleFocus,
      onKeyDown: this.onInputKeyDown,
      id: this.props.id,
      name: this.props.name,
      form: this.props.form,
      autoFocus: this.props.autoFocus,
      placeholder: this.props.placeholderText,
      disabled: this.props.disabled,
      autoComplete: this.props.autoComplete,
      className: clsx(customInput.props.className, className),
      title: this.props.title,
      readOnly: this.props.readOnly,
      required: this.props.required,
      tabIndex: this.props.tabIndex,
      "aria-describedby": this.props.ariaDescribedBy,
      "aria-invalid": this.props.ariaInvalid,
      "aria-labelledby": this.props.ariaLabelledBy,
      "aria-required": this.props.ariaRequired,
    });
  };

  renderClearButton = (): React.ReactElement | null => {
    const {
      isClearable,
      disabled,
      selected,
      startDate,
      endDate,
      clearButtonTitle,
      clearButtonClassName = "",
      ariaLabelClose = "Close",
      selectedDates,
    } = this.props;
    if (
      isClearable &&
      (selected != null ||
        startDate != null ||
        endDate != null ||
        selectedDates?.length)
    ) {
      return (
        <button
          type="button"
          className={clsx(
            "react-datepicker__close-icon",
            clearButtonClassName,
            { "react-datepicker__close-icon--disabled": disabled },
          )}
          disabled={disabled}
          aria-label={ariaLabelClose}
          onClick={this.onClearClick}
          title={clearButtonTitle}
          tabIndex={-1}
        />
      );
    } else {
      return null;
    }
  };

  renderInputContainer(): React.ReactElement {
    const {
      showIcon,
      icon,
      calendarIconClassname,
      calendarIconClassName,
      toggleCalendarOnIconClick,
    } = this.props;
    const { open } = this.state;

    if (calendarIconClassname) {
      console.warn(
        `calendarIconClassname props is deprecated. should use calendarIconClassName props.`,
      );
    }

    return (
      <div
        className={`react-datepicker__input-container${
          showIcon ? " react-datepicker__view-calendar-icon" : ""
        }`}
      >
        {showIcon && (
          <CalendarIcon
            icon={icon}
            className={clsx(
              calendarIconClassName,
              !calendarIconClassName && calendarIconClassname,
              open && "react-datepicker-ignore-onclickoutside",
            )}
            {...(toggleCalendarOnIconClick
              ? {
                  onClick: this.toggleCalendar,
                }
              : null)}
          />
        )}
        {this.state.isRenderAriaLiveMessage && this.renderAriaLiveRegion()}
        {this.renderDateInput()}
        {this.renderClearButton()}
      </div>
    );
  }

  render(): React.ReactElement | null {
    const calendar = this.renderCalendar();

    if (this.props.inline) return calendar;

    if (this.props.withPortal) {
      let portalContainer = this.state.open ? (
        <TabLoop enableTabLoop={this.props.enableTabLoop}>
          <div
            className="react-datepicker__portal"
            tabIndex={-1}
            onKeyDown={this.onPortalKeyDown}
          >
            {calendar}
          </div>
        </TabLoop>
      ) : null;

      if (this.state.open && this.props.portalId) {
        portalContainer = (
          <Portal portalId={this.props.portalId} {...this.props}>
            {portalContainer}
          </Portal>
        );
      }

      return (
        <div>
          {this.renderInputContainer()}
          {portalContainer}
        </div>
      );
    }

    return (
      <PopperComponent
        {...this.props}
        className={this.props.popperClassName}
        hidePopper={!this.isCalendarOpen()}
        targetComponent={this.renderInputContainer()}
        popperComponent={calendar}
        popperOnKeyDown={this.onPopperKeyDown}
        showArrow={this.props.showPopperArrow}
      />
    );
  }
}

const PRESELECT_CHANGE_VIA_INPUT = "input";
const PRESELECT_CHANGE_VIA_NAVIGATE = "navigate";
