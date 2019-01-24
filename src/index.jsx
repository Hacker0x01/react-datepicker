import React from "react";
import PropTypes from "prop-types";
import Calendar from "./calendar";
import PopperComponent, { popperPlacementPositions } from "./popper_component";
import classnames from "classnames";
import {
  newDate,
  isDate,
  isBefore,
  isAfter,
  isEqual,
  setTime,
  getSeconds,
  getMinutes,
  getHours,
  addDays,
  addMonths,
  addWeeks,
  addYears,
  subDays,
  subMonths,
  subWeeks,
  subYears,
  isSameDay,
  isDayDisabled,
  isOutOfBounds,
  isDayInRange,
  getEffectiveMinDate,
  getEffectiveMaxDate,
  parseDate,
  safeDateFormat,
  getHightLightDaysMap,
  getYear,
  getMonth,
  registerLocale,
  setDefaultLocale,
  getDefaultLocale
} from "./date_utils";
import onClickOutside from "react-onclickoutside";

export { default as CalendarContainer } from "./calendar_container";

export { registerLocale, setDefaultLocale, getDefaultLocale };

const outsideClickIgnoreClass = "react-datepicker-ignore-onclickoutside";
const WrappedCalendar = onClickOutside(Calendar);

// Compares dates year+month combinations
function hasPreSelectionChanged(date1, date2) {
  if (date1 && date2) {
    return (
      getMonth(date1) !== getMonth(date2) || getYear(date1) !== getYear(date2)
    );
  }

  return date1 !== date2;
}

function hasSelectionChanged(date1, date2) {
  if (date1 && date2) {
    return !isEqual(date1, date2);
  }

  return false;
}

/**
 * General datepicker component.
 */
const INPUT_ERR_1 = "Date input not valid.";

export default class DatePicker extends React.Component {
  static propTypes = {
    adjustDateOnChange: PropTypes.bool,
    allowSameDay: PropTypes.bool,
    autoComplete: PropTypes.string,
    autoFocus: PropTypes.bool,
    calendarClassName: PropTypes.string,
    calendarContainer: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    customInput: PropTypes.element,
    customInputRef: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    dateFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    dateFormatCalendar: PropTypes.string,
    dayClassName: PropTypes.func,
    disabled: PropTypes.bool,
    disabledKeyboardNavigation: PropTypes.bool,
    dropdownMode: PropTypes.oneOf(["scroll", "select"]).isRequired,
    endDate: PropTypes.instanceOf(Date),
    excludeDates: PropTypes.array,
    filterDate: PropTypes.func,
    fixedHeight: PropTypes.bool,
    formatWeekNumber: PropTypes.func,
    highlightDates: PropTypes.array,
    id: PropTypes.string,
    includeDates: PropTypes.array,
    includeTimes: PropTypes.array,
    injectTimes: PropTypes.array,
    inline: PropTypes.bool,
    isClearable: PropTypes.bool,
    locale: PropTypes.string,
    maxDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    monthsShown: PropTypes.number,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
    onWeekSelect: PropTypes.func,
    onClickOutside: PropTypes.func,
    onChangeRaw: PropTypes.func,
    onFocus: PropTypes.func,
    onInputClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    onMonthChange: PropTypes.func,
    onYearChange: PropTypes.func,
    onInputError: PropTypes.func,
    open: PropTypes.bool,
    openToDate: PropTypes.instanceOf(Date),
    peekNextMonth: PropTypes.bool,
    placeholderText: PropTypes.string,
    popperContainer: PropTypes.func,
    popperClassName: PropTypes.string, // <PopperComponent/> props
    popperModifiers: PropTypes.object, // <PopperComponent/> props
    popperPlacement: PropTypes.oneOf(popperPlacementPositions), // <PopperComponent/> props
    popperProps: PropTypes.object,
    preventOpenOnFocus: PropTypes.bool,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    scrollableYearDropdown: PropTypes.bool,
    scrollableMonthYearDropdown: PropTypes.bool,
    selected: PropTypes.instanceOf(Date),
    selectsEnd: PropTypes.bool,
    selectsStart: PropTypes.bool,
    showMonthDropdown: PropTypes.bool,
    showMonthYearDropdown: PropTypes.bool,
    showWeekNumbers: PropTypes.bool,
    showYearDropdown: PropTypes.bool,
    forceShowMonthNavigation: PropTypes.bool,
    showDisabledMonthNavigation: PropTypes.bool,
    startDate: PropTypes.instanceOf(Date),
    startOpen: PropTypes.bool,
    tabIndex: PropTypes.number,
    timeCaption: PropTypes.string,
    title: PropTypes.string,
    todayButton: PropTypes.node,
    useWeekdaysShort: PropTypes.bool,
    formatWeekDay: PropTypes.func,
    value: PropTypes.string,
    weekLabel: PropTypes.string,
    withPortal: PropTypes.bool,
    yearDropdownItemNumber: PropTypes.number,
    shouldCloseOnSelect: PropTypes.bool,
    showTimeSelect: PropTypes.bool,
    showTimeSelectOnly: PropTypes.bool,
    timeFormat: PropTypes.string,
    timeIntervals: PropTypes.number,
    minTime: PropTypes.instanceOf(Date),
    maxTime: PropTypes.instanceOf(Date),
    excludeTimes: PropTypes.array,
    useShortMonthInDropdown: PropTypes.bool,
    clearButtonTitle: PropTypes.string,
    previousMonthButtonLabel: PropTypes.string,
    nextMonthButtonLabel: PropTypes.string,
    renderCustomHeader: PropTypes.func,
    renderDayContents: PropTypes.func,
    inlineFocusSelectedMonth: PropTypes.bool
  };

  static get defaultProps() {
    return {
      allowSameDay: false,
      dateFormat: "MM/dd/yyyy",
      dateFormatCalendar: "LLLL yyyy",
      onChange() {},
      disabled: false,
      disabledKeyboardNavigation: false,
      dropdownMode: "scroll",
      onFocus() {},
      onBlur() {},
      onKeyDown() {},
      onInputClick() {},
      onSelect() {},
      onClickOutside() {},
      onMonthChange() {},
      preventOpenOnFocus: false,
      onYearChange() {},
      onInputError() {},
      monthsShown: 1,
      readOnly: false,
      withPortal: false,
      shouldCloseOnSelect: true,
      showTimeSelect: false,
      timeIntervals: 30,
      timeCaption: "Time",
      previousMonthButtonLabel: "Previous Month",
      nextMonthButtonLabel: "Next month",
      renderDayContents(date) {
        return date;
      },
      inlineFocusSelectedMonth: false
    };
  }

  constructor(props) {
    super(props);
    this.state = this.calcInitialState();
  }

  componentDidUpdate(prevProps, prevState) {
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
        highlightDates: getHightLightDaysMap(this.props.highlightDates)
      });
    }
    if (
      !prevState.focused &&
      hasSelectionChanged(prevProps.selected, this.props.selected)
    ) {
      this.setState({ inputValue: null });
    }
  }

  componentWillUnmount() {
    this.clearPreventFocusTimeout();
  }

  getPreSelection = () =>
    this.props.openToDate
      ? this.props.openToDate
      : this.props.selectsEnd && this.props.startDate
        ? this.props.startDate
        : this.props.selectsStart && this.props.endDate
          ? this.props.endDate
          : newDate();

  calcInitialState = () => {
    const defaultPreSelection = this.getPreSelection();
    const minDate = getEffectiveMinDate(this.props);
    const maxDate = getEffectiveMaxDate(this.props);
    const boundedPreSelection =
      minDate && isBefore(defaultPreSelection, minDate)
        ? minDate
        : maxDate && isAfter(defaultPreSelection, maxDate)
          ? maxDate
          : defaultPreSelection;
    return {
      open: this.props.startOpen || false,
      preventFocus: false,
      preSelection: this.props.selected
        ? this.props.selected
        : boundedPreSelection,
      // transforming highlighted days (perhaps nested array)
      // to flat Map for faster access in day.jsx
      highlightDates: getHightLightDaysMap(this.props.highlightDates),
      focused: false
    };
  };

  clearPreventFocusTimeout = () => {
    if (this.preventFocusTimeout) {
      clearTimeout(this.preventFocusTimeout);
    }
  };

  setFocus = () => {
    if (this.input && this.input.focus) {
      this.input.focus();
    }
  };

  setBlur = () => {
    if (this.input && this.input.blur) {
      this.input.blur();
    }

    this.cancelFocusInput();
  };

  setOpen = (open, skipSetBlur = false) => {
    this.setState(
      {
        open: open,
        preSelection:
          open && this.state.open
            ? this.state.preSelection
            : this.calcInitialState().preSelection,
        lastPreSelectChange: PRESELECT_CHANGE_VIA_NAVIGATE
      },
      () => {
        if (!open) {
          this.setState(
            prev => ({
              focused: skipSetBlur ? prev.focused : false
            }),
            () => {
              !skipSetBlur && this.setBlur();

              this.setState({ inputValue: null });
            }
          );
        }
      }
    );
  };
  inputOk = () => isDate(this.state.preSelection);

  isCalendarOpen = () =>
    this.props.open === undefined
      ? this.state.open && !this.props.disabled && !this.props.readOnly
      : this.props.open;

  handleFocus = event => {
    if (!this.state.preventFocus) {
      this.props.onFocus(event);
      if (!this.props.preventOpenOnFocus && !this.props.readOnly) {
        this.setOpen(true);
      }
    }
    this.setState({ focused: true });
  };

  cancelFocusInput = () => {
    clearTimeout(this.inputFocusTimeout);
    this.inputFocusTimeout = null;
  };

  deferFocusInput = () => {
    this.cancelFocusInput();
    this.inputFocusTimeout = setTimeout(() => this.setFocus(), 1);
  };

  handleDropdownFocus = () => {
    this.cancelFocusInput();
  };

  handleBlur = event => {
    if (this.state.open && !this.props.withPortal) {
      this.deferFocusInput();
    } else {
      this.props.onBlur(event);
    }
    this.setState({ focused: false });
  };

  handleCalendarClickOutside = event => {
    if (!this.props.inline) {
      this.setOpen(false);
    }
    this.props.onClickOutside(event);
    if (this.props.withPortal) {
      event.preventDefault();
    }
  };

  handleChange = (...allArgs) => {
    let event = allArgs[0];
    if (this.props.onChangeRaw) {
      this.props.onChangeRaw.apply(this, allArgs);
      if (
        typeof event.isDefaultPrevented !== "function" ||
        event.isDefaultPrevented()
      ) {
        return;
      }
    }
    this.setState({
      inputValue: event.target.value,
      lastPreSelectChange: PRESELECT_CHANGE_VIA_INPUT
    });
    const date = parseDate(
      event.target.value,
      this.props.dateFormat,
      this.props.locale
    );
    if (date || !event.target.value) {
      this.setSelected(date, event, true);
    }
  };

  handleSelect = (date, event, monthSelectedIn) => {
    // Preventing onFocus event to fix issue
    // https://github.com/Hacker0x01/react-datepicker/issues/628
    this.setState({ preventFocus: true }, () => {
      this.preventFocusTimeout = setTimeout(
        () => this.setState({ preventFocus: false }),
        50
      );
      return this.preventFocusTimeout;
    });
    this.setSelected(date, event, undefined, monthSelectedIn);
    if (!this.props.shouldCloseOnSelect || this.props.showTimeSelect) {
      this.setPreSelection(date);
    } else if (!this.props.inline) {
      this.setOpen(false);
    }
  };

  setSelected = (date, event, keepInput, monthSelectedIn) => {
    let changedDate = date;

    if (changedDate !== null && isDayDisabled(changedDate, this.props)) {
      if (isOutOfBounds(changedDate, this.props)) {
        this.props.onChange(date, event);
        this.props.onSelect(changedDate, event);
      }

      return;
    }

    if (
      !isSameDay(this.props.selected, changedDate) ||
      this.props.allowSameDay
    ) {
      if (changedDate !== null) {
        if (this.props.selected) {
          let selected = this.props.selected;
          if (keepInput) selected = newDate(changedDate);
          changedDate = setTime(changedDate, {
            hour: getHours(selected),
            minute: getMinutes(selected),
            second: getSeconds(selected)
          });
        }
        if (!this.props.inline) {
          this.setState({
            preSelection: changedDate
          });
        }
        if (
          this.props.inline &&
          this.props.monthsShown > 1 &&
          !this.props.inlineFocusSelectedMonth
        ) {
          this.setState({ monthSelectedIn: monthSelectedIn });
        }
      }
      this.props.onChange(changedDate, event);
    }

    this.props.onSelect(changedDate, event);

    if (!keepInput) {
      this.setState({ inputValue: null });
    }
  };

  setPreSelection = date => {
    const isDateRangePresent =
      typeof this.props.minDate !== "undefined" &&
      typeof this.props.maxDate !== "undefined";
    const isValidDateSelection =
      isDateRangePresent && date
        ? isDayInRange(date, this.props.minDate, this.props.maxDate)
        : true;
    if (isValidDateSelection) {
      this.setState({
        preSelection: date
      });
    }
  };

  handleTimeChange = time => {
    const selected = this.props.selected
      ? this.props.selected
      : this.getPreSelection();
    let changedDate = setTime(selected, {
      hour: getHours(time),
      minute: getMinutes(time)
    });

    this.setState({
      preSelection: changedDate
    });

    this.props.onChange(changedDate);
    if (this.props.shouldCloseOnSelect) {
      this.setOpen(false);
    }
    this.setState({ inputValue: null });
  };

  onInputClick = () => {
    if (!this.props.disabled && !this.props.readOnly) {
      this.setOpen(true);
    }

    this.props.onInputClick();
  };

  onInputKeyDown = event => {
    this.props.onKeyDown(event);
    const eventKey = event.key;
    if (
      !this.state.open &&
      !this.props.inline &&
      !this.props.preventOpenOnFocus
    ) {
      if (eventKey === "ArrowDown" || eventKey === "ArrowUp") {
        this.onInputClick();
      }
      return;
    }
    const copy = newDate(this.state.preSelection);
    if (eventKey === "Enter") {
      event.preventDefault();
      if (
        this.inputOk() &&
        this.state.lastPreSelectChange === PRESELECT_CHANGE_VIA_NAVIGATE
      ) {
        this.handleSelect(copy, event);
        !this.props.shouldCloseOnSelect && this.setPreSelection(copy);
      } else {
        this.setOpen(false);
      }
    } else if (eventKey === "Escape") {
      event.preventDefault();

      this.setOpen(false);
      if (!this.inputOk()) {
        this.props.onInputError({ code: 1, msg: INPUT_ERR_1 });
      }
    } else if (eventKey === "Tab") {
      this.setOpen(false, true);
    } else if (!this.props.disabledKeyboardNavigation) {
      let newSelection;
      switch (eventKey) {
        case "ArrowLeft":
          newSelection = subDays(copy, 1);
          break;
        case "ArrowRight":
          newSelection = addDays(copy, 1);
          break;
        case "ArrowUp":
          newSelection = subWeeks(copy, 1);
          break;
        case "ArrowDown":
          newSelection = addWeeks(copy, 1);
          break;
        case "PageUp":
          newSelection = subMonths(copy, 1);
          break;
        case "PageDown":
          newSelection = addMonths(copy, 1);
          break;
        case "Home":
          newSelection = subYears(copy, 1);
          break;
        case "End":
          newSelection = addYears(copy, 1);
          break;
      }
      if (!newSelection) {
        if (this.props.onInputError) {
          this.props.onInputError({ code: 1, msg: INPUT_ERR_1 });
        }
        return; // Let the input component handle this keydown
      }
      event.preventDefault();
      this.setState({ lastPreSelectChange: PRESELECT_CHANGE_VIA_NAVIGATE });
      if (this.props.adjustDateOnChange) {
        this.setSelected(newSelection);
      }
      this.setPreSelection(newSelection);
    }
  };

  onClearClick = event => {
    if (event) {
      if (event.preventDefault) {
        event.preventDefault();
      }
    }
    this.props.onChange(null, event);
    this.setState({ inputValue: null });
  };

  clear = () => {
    this.onClearClick();
  };

  renderCalendar = () => {
    if (!this.props.inline && !this.isCalendarOpen()) {
      return null;
    }
    return (
      <WrappedCalendar
        ref={elem => {
          this.calendar = elem;
        }}
        locale={this.props.locale}
        adjustDateOnChange={this.props.adjustDateOnChange}
        setOpen={this.setOpen}
        shouldCloseOnSelect={this.props.shouldCloseOnSelect}
        dateFormat={this.props.dateFormatCalendar}
        useWeekdaysShort={this.props.useWeekdaysShort}
        formatWeekDay={this.props.formatWeekDay}
        dropdownMode={this.props.dropdownMode}
        selected={this.props.selected}
        preSelection={this.state.preSelection}
        onSelect={this.handleSelect}
        onWeekSelect={this.props.onWeekSelect}
        openToDate={this.props.openToDate}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        selectsStart={this.props.selectsStart}
        selectsEnd={this.props.selectsEnd}
        startDate={this.props.startDate}
        endDate={this.props.endDate}
        excludeDates={this.props.excludeDates}
        filterDate={this.props.filterDate}
        onClickOutside={this.handleCalendarClickOutside}
        formatWeekNumber={this.props.formatWeekNumber}
        highlightDates={this.state.highlightDates}
        includeDates={this.props.includeDates}
        includeTimes={this.props.includeTimes}
        injectTimes={this.props.injectTimes}
        inline={this.props.inline}
        peekNextMonth={this.props.peekNextMonth}
        showMonthDropdown={this.props.showMonthDropdown}
        useShortMonthInDropdown={this.props.useShortMonthInDropdown}
        showMonthYearDropdown={this.props.showMonthYearDropdown}
        showWeekNumbers={this.props.showWeekNumbers}
        showYearDropdown={this.props.showYearDropdown}
        withPortal={this.props.withPortal}
        forceShowMonthNavigation={this.props.forceShowMonthNavigation}
        showDisabledMonthNavigation={this.props.showDisabledMonthNavigation}
        scrollableYearDropdown={this.props.scrollableYearDropdown}
        scrollableMonthYearDropdown={this.props.scrollableMonthYearDropdown}
        todayButton={this.props.todayButton}
        weekLabel={this.props.weekLabel}
        outsideClickIgnoreClass={outsideClickIgnoreClass}
        fixedHeight={this.props.fixedHeight}
        monthsShown={this.props.monthsShown}
        monthSelectedIn={this.state.monthSelectedIn}
        onDropdownFocus={this.handleDropdownFocus}
        onMonthChange={this.props.onMonthChange}
        onYearChange={this.props.onYearChange}
        dayClassName={this.props.dayClassName}
        showTimeSelect={this.props.showTimeSelect}
        showTimeSelectOnly={this.props.showTimeSelectOnly}
        onTimeChange={this.handleTimeChange}
        timeFormat={this.props.timeFormat}
        timeIntervals={this.props.timeIntervals}
        minTime={this.props.minTime}
        maxTime={this.props.maxTime}
        excludeTimes={this.props.excludeTimes}
        timeCaption={this.props.timeCaption}
        className={this.props.calendarClassName}
        container={this.props.calendarContainer}
        yearDropdownItemNumber={this.props.yearDropdownItemNumber}
        previousMonthButtonLabel={this.props.previousMonthButtonLabel}
        nextMonthButtonLabel={this.props.nextMonthButtonLabel}
        disabledKeyboardNavigation={this.props.disabledKeyboardNavigation}
        renderCustomHeader={this.props.renderCustomHeader}
        popperProps={this.props.popperProps}
        renderDayContents={this.props.renderDayContents}
      >
        {this.props.children}
      </WrappedCalendar>
    );
  };

  renderDateInput = () => {
    const className = classnames(this.props.className, {
      [outsideClickIgnoreClass]: this.state.open
    });

    const customInput = this.props.customInput || <input type="text" />;
    const customInputRef = this.props.customInputRef || "ref";
    const inputValue =
      typeof this.props.value === "string"
        ? this.props.value
        : typeof this.state.inputValue === "string"
          ? this.state.inputValue
          : safeDateFormat(this.props.selected, this.props);

    return React.cloneElement(customInput, {
      [customInputRef]: input => {
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
      autoFocus: this.props.autoFocus,
      placeholder: this.props.placeholderText,
      disabled: this.props.disabled,
      autoComplete: this.props.autoComplete,
      className: className,
      title: this.props.title,
      readOnly: this.props.readOnly,
      required: this.props.required,
      tabIndex: this.props.tabIndex
    });
  };

  renderClearButton = () => {
    if (this.props.isClearable && this.props.selected != null) {
      return (
        <button
          type="button"
          className="react-datepicker__close-icon"
          onClick={this.onClearClick}
          title={this.props.clearButtonTitle}
          tabIndex={-1}
        />
      );
    } else {
      return null;
    }
  };

  render() {
    const calendar = this.renderCalendar();

    if (this.props.inline && !this.props.withPortal) {
      return calendar;
    }

    if (this.props.withPortal) {
      return (
        <div>
          {!this.props.inline ? (
            <div className="react-datepicker__input-container">
              {this.renderDateInput()}
              {this.renderClearButton()}
            </div>
          ) : null}
          {this.state.open || this.props.inline ? (
            <div className="react-datepicker__portal">{calendar}</div>
          ) : null}
        </div>
      );
    }

    return (
      <PopperComponent
        className={this.props.popperClassName}
        hidePopper={!this.isCalendarOpen()}
        popperModifiers={this.props.popperModifiers}
        targetComponent={
          <div className="react-datepicker__input-container">
            {this.renderDateInput()}
            {this.renderClearButton()}
          </div>
        }
        popperContainer={this.props.popperContainer}
        popperComponent={calendar}
        popperPlacement={this.props.popperPlacement}
        popperProps={this.props.popperProps}
      />
    );
  }
}

const PRESELECT_CHANGE_VIA_INPUT = "input";
const PRESELECT_CHANGE_VIA_NAVIGATE = "navigate";
