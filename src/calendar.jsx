import YearDropdown from "./year_dropdown";
import MonthDropdown from "./month_dropdown";
import MonthYearDropdown from "./month_year_dropdown";
import Month from "./month";
import Time from "./time";
import Year from "./year";
import InputTime from "./inputTime";
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import CalendarContainer from "./calendar_container";
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
  monthDisabledBefore,
  monthDisabledAfter,
  yearDisabledBefore,
  yearDisabledAfter,
  yearsDisabledAfter,
  yearsDisabledBefore,
  getEffectiveMinDate,
  getEffectiveMaxDate,
  addZero,
  isValid,
  getYearsPeriod,
  DEFAULT_YEAR_ITEM_NUMBER,
} from "./date_utils";

const DROPDOWN_FOCUS_CLASSNAMES = [
  "react-datepicker__year-select",
  "react-datepicker__month-select",
  "react-datepicker__month-year-select",
];

const isDropdownSelect = (element = {}) => {
  const classNames = (element.className || "").split(/\s+/);
  return DROPDOWN_FOCUS_CLASSNAMES.some(
    (testClassname) => classNames.indexOf(testClassname) >= 0
  );
};

export default class Calendar extends React.Component {
  static get defaultProps() {
    return {
      onDropdownFocus: () => {},
      monthsShown: 1,
      monthSelectedIn: 0,
      forceShowMonthNavigation: false,
      timeCaption: "Time",
      previousYearButtonLabel: "Previous Year",
      nextYearButtonLabel: "Next Year",
      previousMonthButtonLabel: "Previous Month",
      nextMonthButtonLabel: "Next Month",
      customTimeInput: null,
      yearItemNumber: DEFAULT_YEAR_ITEM_NUMBER,
    };
  }

  static propTypes = {
    adjustDateOnChange: PropTypes.bool,
    arrowProps: PropTypes.object,
    chooseDayAriaLabelPrefix: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    container: PropTypes.func,
    dateFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
      .isRequired,
    dayClassName: PropTypes.func,
    weekDayClassName: PropTypes.func,
    disabledDayAriaLabelPrefix: PropTypes.string,
    monthClassName: PropTypes.func,
    timeClassName: PropTypes.func,
    disabledKeyboardNavigation: PropTypes.bool,
    dropdownMode: PropTypes.oneOf(["scroll", "select"]),
    endDate: PropTypes.instanceOf(Date),
    excludeDates: PropTypes.array,
    filterDate: PropTypes.func,
    fixedHeight: PropTypes.bool,
    formatWeekNumber: PropTypes.func,
    highlightDates: PropTypes.instanceOf(Map),
    includeDates: PropTypes.array,
    includeTimes: PropTypes.array,
    injectTimes: PropTypes.array,
    inline: PropTypes.bool,
    shouldFocusDayInline: PropTypes.bool,
    locale: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ locale: PropTypes.object }),
    ]),
    maxDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    monthsShown: PropTypes.number,
    monthSelectedIn: PropTypes.number,
    nextMonthAriaLabel: PropTypes.string,
    nextYearAriaLabel: PropTypes.string,
    onClickOutside: PropTypes.func.isRequired,
    onMonthChange: PropTypes.func,
    onYearChange: PropTypes.func,
    forceShowMonthNavigation: PropTypes.bool,
    onDropdownFocus: PropTypes.func,
    onSelect: PropTypes.func.isRequired,
    onWeekSelect: PropTypes.func,
    showTimeSelect: PropTypes.bool,
    showTimeInput: PropTypes.bool,
    showMonthYearPicker: PropTypes.bool,
    showFullMonthYearPicker: PropTypes.bool,
    showTwoColumnMonthYearPicker: PropTypes.bool,
    showFourColumnMonthYearPicker: PropTypes.bool,
    showYearPicker: PropTypes.bool,
    showQuarterYearPicker: PropTypes.bool,
    showTimeSelectOnly: PropTypes.bool,
    timeFormat: PropTypes.string,
    timeIntervals: PropTypes.number,
    onTimeChange: PropTypes.func,
    timeInputLabel: PropTypes.string,
    minTime: PropTypes.instanceOf(Date),
    maxTime: PropTypes.instanceOf(Date),
    excludeTimes: PropTypes.array,
    filterTime: PropTypes.func,
    timeCaption: PropTypes.string,
    openToDate: PropTypes.instanceOf(Date),
    peekNextMonth: PropTypes.bool,
    previousMonthAriaLabel: PropTypes.string,
    previousYearAriaLabel: PropTypes.string,
    scrollableYearDropdown: PropTypes.bool,
    scrollableMonthYearDropdown: PropTypes.bool,
    preSelection: PropTypes.instanceOf(Date),
    selected: PropTypes.instanceOf(Date),
    selectsEnd: PropTypes.bool,
    selectsStart: PropTypes.bool,
    selectsRange: PropTypes.bool,
    showMonthDropdown: PropTypes.bool,
    showPreviousMonths: PropTypes.bool,
    showMonthYearDropdown: PropTypes.bool,
    showWeekNumbers: PropTypes.bool,
    showYearDropdown: PropTypes.bool,
    startDate: PropTypes.instanceOf(Date),
    todayButton: PropTypes.string,
    useWeekdaysShort: PropTypes.bool,
    formatWeekDay: PropTypes.func,
    withPortal: PropTypes.bool,
    weekLabel: PropTypes.string,
    yearItemNumber: PropTypes.number,
    yearDropdownItemNumber: PropTypes.number,
    setOpen: PropTypes.func,
    shouldCloseOnSelect: PropTypes.bool,
    useShortMonthInDropdown: PropTypes.bool,
    showDisabledMonthNavigation: PropTypes.bool,
    previousMonthButtonLabel: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    nextMonthButtonLabel: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    previousYearButtonLabel: PropTypes.string,
    nextYearButtonLabel: PropTypes.string,
    renderCustomHeader: PropTypes.func,
    renderDayContents: PropTypes.func,
    onDayMouseEnter: PropTypes.func,
    onMonthMouseLeave: PropTypes.func,
    showPopperArrow: PropTypes.bool,
    handleOnKeyDown: PropTypes.func,
    isInputFocused: PropTypes.bool,
    customTimeInput: PropTypes.element,
    weekAriaLabelPrefix: PropTypes.string,
    setPreSelection: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.containerRef = React.createRef();

    this.state = {
      date: this.getDateInView(),
      selectingDate: null,
      monthContainer: null,
    };
  }

  componentDidMount() {
    // monthContainer height is needed in time component
    // to determine the height for the ul in the time component
    // setState here so height is given after final component
    // layout is rendered
    if (this.props.showTimeSelect) {
      this.assignMonthContainer = (() => {
        this.setState({ monthContainer: this.monthContainer });
      })();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.preSelection &&
      !isSameDay(this.props.preSelection, prevProps.preSelection)
    ) {
      this.setState({
        date: this.props.preSelection,
      });
    } else if (
      this.props.openToDate &&
      !isSameDay(this.props.openToDate, prevProps.openToDate)
    ) {
      this.setState({
        date: this.props.openToDate,
      });
    }
  }

  handleClickOutside = (event) => {
    this.props.onClickOutside(event);
  };

  setClickOutsideRef = () => {
    return this.containerRef.current;
  };

  handleDropdownFocus = (event) => {
    if (isDropdownSelect(event.target)) {
      this.props.onDropdownFocus();
    }
  };

  getDateInView = () => {
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

  increaseMonth = () => {
    this.setState(
      ({ date }) => ({
        date: addMonths(date, 1),
      }),
      () => this.handleMonthChange(this.state.date)
    );
  };

  decreaseMonth = () => {
    this.setState(
      ({ date }) => ({
        date: subMonths(date, 1),
      }),
      () => this.handleMonthChange(this.state.date)
    );
  };

  handleDayClick = (day, event, monthSelectedIn) => {
    this.props.onSelect(day, event, monthSelectedIn);
    this.props.setPreSelection && this.props.setPreSelection(day);
  };

  handleDayMouseEnter = (day) => {
    this.setState({ selectingDate: day });
    this.props.onDayMouseEnter && this.props.onDayMouseEnter(day);
  };

  handleMonthMouseLeave = () => {
    this.setState({ selectingDate: null });
    this.props.onMonthMouseLeave && this.props.onMonthMouseLeave();
  };

  handleYearChange = (date) => {
    if (this.props.onYearChange) {
      this.props.onYearChange(date);
    }
    if (this.props.adjustDateOnChange) {
      if (this.props.onSelect) {
        this.props.onSelect(date);
      }
      if (this.props.setOpen) {
        this.props.setOpen(true);
      }
    }

    this.props.setPreSelection && this.props.setPreSelection(date);
  };

  handleMonthChange = (date) => {
    if (this.props.onMonthChange) {
      this.props.onMonthChange(date);
    }
    if (this.props.adjustDateOnChange) {
      if (this.props.onSelect) {
        this.props.onSelect(date);
      }
      if (this.props.setOpen) {
        this.props.setOpen(true);
      }
    }

    this.props.setPreSelection && this.props.setPreSelection(date);
  };

  handleMonthYearChange = (date) => {
    this.handleYearChange(date);
    this.handleMonthChange(date);
  };

  changeYear = (year) => {
    this.setState(
      ({ date }) => ({
        date: setYear(date, year),
      }),
      () => this.handleYearChange(this.state.date)
    );
  };

  changeMonth = (month) => {
    this.setState(
      ({ date }) => ({
        date: setMonth(date, month),
      }),
      () => this.handleMonthChange(this.state.date)
    );
  };

  changeMonthYear = (monthYear) => {
    this.setState(
      ({ date }) => ({
        date: setYear(setMonth(date, getMonth(monthYear)), getYear(monthYear)),
      }),
      () => this.handleMonthYearChange(this.state.date)
    );
  };

  header = (date = this.state.date) => {
    const startOfWeek = getStartOfWeek(date, this.props.locale);
    const dayNames = [];
    if (this.props.showWeekNumbers) {
      dayNames.push(
        <div key="W" className="react-datepicker__day-name">
          {this.props.weekLabel || "#"}
        </div>
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
            className={classnames(
              "react-datepicker__day-name",
              weekDayClassName
            )}
          >
            {weekDayName}
          </div>
        );
      })
    );
  };

  formatWeekday = (day, locale) => {
    if (this.props.formatWeekDay) {
      return getFormattedWeekdayInLocale(day, this.props.formatWeekDay, locale);
    }
    return this.props.useWeekdaysShort
      ? getWeekdayShortInLocale(day, locale)
      : getWeekdayMinInLocale(day, locale);
  };

  decreaseYear = () => {
    this.setState(
      ({ date }) => ({
        date: subYears(
          date,
          this.props.showYearPicker ? this.props.yearItemNumber : 1
        ),
      }),
      () => this.handleYearChange(this.state.date)
    );
  };

  renderPreviousButton = () => {
    if (this.props.renderCustomHeader) {
      return;
    }

    let allPrevDaysDisabled;
    switch (true) {
      case this.props.showMonthYearPicker:
        allPrevDaysDisabled = yearDisabledBefore(this.state.date, this.props);
        break;
      case this.props.showYearPicker:
        allPrevDaysDisabled = yearsDisabledBefore(this.state.date, this.props);
        break;
      default:
        allPrevDaysDisabled = monthDisabledBefore(this.state.date, this.props);
        break;
    }

    if (
      (!this.props.forceShowMonthNavigation &&
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

    let clickHandler = this.decreaseMonth;

    if (
      this.props.showMonthYearPicker ||
      this.props.showQuarterYearPicker ||
      this.props.showYearPicker
    ) {
      clickHandler = this.decreaseYear;
    }

    if (allPrevDaysDisabled && this.props.showDisabledMonthNavigation) {
      classes.push("react-datepicker__navigation--previous--disabled");
      clickHandler = null;
    }

    const isForYear =
      this.props.showMonthYearPicker ||
      this.props.showQuarterYearPicker ||
      this.props.showYearPicker;

    const {
      previousMonthAriaLabel = "Previous Month",
      previousYearAriaLabel = "Previous Year",
    } = this.props;

    return (
      <button
        type="button"
        className={classes.join(" ")}
        onClick={clickHandler}
        aria-label={isForYear ? previousYearAriaLabel : previousMonthAriaLabel}
      >
        <span className={iconClasses.join(" ")}>
          {isForYear
            ? this.props.previousYearButtonLabel
            : this.props.previousMonthButtonLabel}
        </span>
      </button>
    );
  };

  increaseYear = () => {
    this.setState(
      ({ date }) => ({
        date: addYears(
          date,
          this.props.showYearPicker ? this.props.yearItemNumber : 1
        ),
      }),
      () => this.handleYearChange(this.state.date)
    );
  };

  renderNextButton = () => {
    if (this.props.renderCustomHeader) {
      return;
    }

    let allNextDaysDisabled;
    switch (true) {
      case this.props.showMonthYearPicker:
        allNextDaysDisabled = yearDisabledAfter(this.state.date, this.props);
        break;
      case this.props.showYearPicker:
        allNextDaysDisabled = yearsDisabledAfter(this.state.date, this.props);
        break;
      default:
        allNextDaysDisabled = monthDisabledAfter(this.state.date, this.props);
        break;
    }

    if (
      (!this.props.forceShowMonthNavigation &&
        !this.props.showDisabledMonthNavigation &&
        allNextDaysDisabled) ||
      this.props.showTimeSelectOnly
    ) {
      return;
    }

    const classes = [
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

    let clickHandler = this.increaseMonth;

    if (
      this.props.showMonthYearPicker ||
      this.props.showQuarterYearPicker ||
      this.props.showYearPicker
    ) {
      clickHandler = this.increaseYear;
    }

    if (allNextDaysDisabled && this.props.showDisabledMonthNavigation) {
      classes.push("react-datepicker__navigation--next--disabled");
      clickHandler = null;
    }

    const isForYear =
      this.props.showMonthYearPicker ||
      this.props.showQuarterYearPicker ||
      this.props.showYearPicker;

    const {
      nextMonthAriaLabel = "Next Month",
      nextYearAriaLabel = "Next Year",
    } = this.props;

    return (
      <button
        type="button"
        className={classes.join(" ")}
        onClick={clickHandler}
        aria-label={isForYear ? nextYearAriaLabel : nextMonthAriaLabel}
      >
        <span className={iconClasses.join(" ")}>
          {isForYear
            ? this.props.nextYearButtonLabel
            : this.props.nextMonthButtonLabel}
        </span>
      </button>
    );
  };

  renderCurrentMonth = (date = this.state.date) => {
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
      <div className={classes.join(" ")}>
        {formatDate(date, this.props.dateFormat, this.props.locale)}
      </div>
    );
  };

  renderYearDropdown = (overrideHide = false) => {
    if (!this.props.showYearDropdown || overrideHide) {
      return;
    }
    return (
      <YearDropdown
        adjustDateOnChange={this.props.adjustDateOnChange}
        date={this.state.date}
        onSelect={this.props.onSelect}
        setOpen={this.props.setOpen}
        dropdownMode={this.props.dropdownMode}
        onChange={this.changeYear}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        year={getYear(this.state.date)}
        scrollableYearDropdown={this.props.scrollableYearDropdown}
        yearDropdownItemNumber={this.props.yearDropdownItemNumber}
      />
    );
  };

  renderMonthDropdown = (overrideHide = false) => {
    if (!this.props.showMonthDropdown || overrideHide) {
      return;
    }
    return (
      <MonthDropdown
        dropdownMode={this.props.dropdownMode}
        locale={this.props.locale}
        onChange={this.changeMonth}
        month={getMonth(this.state.date)}
        useShortMonthInDropdown={this.props.useShortMonthInDropdown}
      />
    );
  };

  renderMonthYearDropdown = (overrideHide = false) => {
    if (!this.props.showMonthYearDropdown || overrideHide) {
      return;
    }
    return (
      <MonthYearDropdown
        dropdownMode={this.props.dropdownMode}
        locale={this.props.locale}
        dateFormat={this.props.dateFormat}
        onChange={this.changeMonthYear}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        date={this.state.date}
        scrollableMonthYearDropdown={this.props.scrollableMonthYearDropdown}
      />
    );
  };

  renderTodayButton = () => {
    if (!this.props.todayButton || this.props.showTimeSelectOnly) {
      return;
    }
    return (
      <div
        className="react-datepicker__today-button"
        onClick={(e) => this.props.onSelect(getStartOfToday(), e)}
      >
        {this.props.todayButton}
      </div>
    );
  };

  renderDefaultHeader = ({ monthDate, i }) => (
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
      <div className="react-datepicker__day-names">
        {this.header(monthDate)}
      </div>
    </div>
  );

  renderCustomHeader = (headerArgs = {}) => {
    const { monthDate, i } = headerArgs;

    if (
      (this.props.showTimeSelect && !this.state.monthContainer) ||
      this.props.showTimeSelectOnly
    ) {
      return null;
    }

    const prevMonthButtonDisabled = monthDisabledBefore(
      this.state.date,
      this.props
    );

    const nextMonthButtonDisabled = monthDisabledAfter(
      this.state.date,
      this.props
    );

    const prevYearButtonDisabled = yearDisabledBefore(
      this.state.date,
      this.props
    );

    const nextYearButtonDisabled = yearDisabledAfter(
      this.state.date,
      this.props
    );

    const showDayNames =
      !this.props.showMonthYearPicker &&
      !this.props.showQuarterYearPicker &&
      !this.props.showYearPicker;

    return (
      <div
        className="react-datepicker__header react-datepicker__header--custom"
        onFocus={this.props.onDropdownFocus}
      >
        {this.props.renderCustomHeader({
          ...this.state,
          customHeaderCount: i,
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
        {showDayNames && (
          <div className="react-datepicker__day-names">
            {this.header(monthDate)}
          </div>
        )}
      </div>
    );
  };

  renderYearHeader = () => {
    const { date } = this.state;
    const { showYearPicker, yearItemNumber } = this.props;
    const { startPeriod, endPeriod } = getYearsPeriod(date, yearItemNumber);
    return (
      <div className="react-datepicker__header react-datepicker-year-header">
        {showYearPicker ? `${startPeriod} - ${endPeriod}` : getYear(date)}
      </div>
    );
  };

  renderHeader = (headerArgs) => {
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

  renderMonths = () => {
    if (this.props.showTimeSelectOnly || this.props.showYearPicker) {
      return;
    }

    var monthList = [];
    var monthsToSubtract = this.props.showPreviousMonths
      ? this.props.monthsShown - 1
      : 0;
    var fromMonthDate = subMonths(this.state.date, monthsToSubtract);
    for (var i = 0; i < this.props.monthsShown; ++i) {
      var monthsToAdd = i - this.props.monthSelectedIn;
      var monthDate = addMonths(fromMonthDate, monthsToAdd);
      var monthKey = `month-${i}`;
      var monthShowsDuplicateDaysEnd = i < this.props.monthsShown - 1;
      var monthShowsDuplicateDaysStart = i > 0;
      monthList.push(
        <div
          key={monthKey}
          ref={(div) => {
            this.monthContainer = div;
          }}
          className="react-datepicker__month-container"
        >
          {this.renderHeader({ monthDate, i })}
          <Month
            chooseDayAriaLabelPrefix={this.props.chooseDayAriaLabelPrefix}
            disabledDayAriaLabelPrefix={this.props.disabledDayAriaLabelPrefix}
            weekAriaLabelPrefix={this.props.weekAriaLabelPrefix}
            onChange={this.changeMonthYear}
            day={monthDate}
            dayClassName={this.props.dayClassName}
            monthClassName={this.props.monthClassName}
            onDayClick={this.handleDayClick}
            handleOnKeyDown={this.props.handleOnKeyDown}
            onDayMouseEnter={this.handleDayMouseEnter}
            onMouseLeave={this.handleMonthMouseLeave}
            onWeekSelect={this.props.onWeekSelect}
            orderInDisplay={i}
            formatWeekNumber={this.props.formatWeekNumber}
            locale={this.props.locale}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            excludeDates={this.props.excludeDates}
            highlightDates={this.props.highlightDates}
            selectingDate={this.state.selectingDate}
            includeDates={this.props.includeDates}
            inline={this.props.inline}
            shouldFocusDayInline={this.props.shouldFocusDayInline}
            fixedHeight={this.props.fixedHeight}
            filterDate={this.props.filterDate}
            preSelection={this.props.preSelection}
            setPreSelection={this.props.setPreSelection}
            selected={this.props.selected}
            selectsStart={this.props.selectsStart}
            selectsEnd={this.props.selectsEnd}
            selectsRange={this.props.selectsRange}
            showWeekNumbers={this.props.showWeekNumbers}
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            peekNextMonth={this.props.peekNextMonth}
            setOpen={this.props.setOpen}
            shouldCloseOnSelect={this.props.shouldCloseOnSelect}
            renderDayContents={this.props.renderDayContents}
            disabledKeyboardNavigation={this.props.disabledKeyboardNavigation}
            showMonthYearPicker={this.props.showMonthYearPicker}
            showFullMonthYearPicker={this.props.showFullMonthYearPicker}
            showTwoColumnMonthYearPicker={
              this.props.showTwoColumnMonthYearPicker
            }
            showFourColumnMonthYearPicker={
              this.props.showFourColumnMonthYearPicker
            }
            showYearPicker={this.props.showYearPicker}
            showQuarterYearPicker={this.props.showQuarterYearPicker}
            isInputFocused={this.props.isInputFocused}
            containerRef={this.containerRef}
            monthShowsDuplicateDaysEnd={monthShowsDuplicateDaysEnd}
            monthShowsDuplicateDaysStart={monthShowsDuplicateDaysStart}
          />
        </div>
      );
    }
    return monthList;
  };

  renderYears = () => {
    if (this.props.showTimeSelectOnly) {
      return;
    }
    if (this.props.showYearPicker) {
      return (
        <div className="react-datepicker__year--container">
          {this.renderHeader()}
          <Year
            onDayClick={this.handleDayClick}
            date={this.state.date}
            {...this.props}
          />
        </div>
      );
    }
  };

  renderTimeSection = () => {
    if (
      this.props.showTimeSelect &&
      (this.state.monthContainer || this.props.showTimeSelectOnly)
    ) {
      return (
        <Time
          selected={this.props.selected}
          openToDate={this.props.openToDate}
          onChange={this.props.onTimeChange}
          timeClassName={this.props.timeClassName}
          format={this.props.timeFormat}
          includeTimes={this.props.includeTimes}
          intervals={this.props.timeIntervals}
          minTime={this.props.minTime}
          maxTime={this.props.maxTime}
          excludeTimes={this.props.excludeTimes}
          filterTime={this.props.filterTime}
          timeCaption={this.props.timeCaption}
          todayButton={this.props.todayButton}
          showMonthDropdown={this.props.showMonthDropdown}
          showMonthYearDropdown={this.props.showMonthYearDropdown}
          showYearDropdown={this.props.showYearDropdown}
          withPortal={this.props.withPortal}
          monthRef={this.state.monthContainer}
          injectTimes={this.props.injectTimes}
          locale={this.props.locale}
          showTimeSelectOnly={this.props.showTimeSelectOnly}
        />
      );
    }
  };

  renderInputTimeSection = () => {
    const time = new Date(this.props.selected);
    const timeValid = isValid(time) && Boolean(this.props.selected);
    const timeString = timeValid
      ? `${addZero(time.getHours())}:${addZero(time.getMinutes())}`
      : "";
    if (this.props.showTimeInput) {
      return (
        <InputTime
          date={time}
          timeString={timeString}
          timeInputLabel={this.props.timeInputLabel}
          onChange={this.props.onTimeChange}
          customTimeInput={this.props.customTimeInput}
        />
      );
    }
  };

  render() {
    const Container = this.props.container || CalendarContainer;
    return (
      <div ref={this.containerRef}>
        <Container
          className={classnames("react-datepicker", this.props.className, {
            "react-datepicker--time-only": this.props.showTimeSelectOnly,
          })}
          showPopperArrow={this.props.showPopperArrow}
          arrowProps={this.props.arrowProps}
        >
          {this.renderPreviousButton()}
          {this.renderNextButton()}
          {this.renderMonths()}
          {this.renderYears()}
          {this.renderTodayButton()}
          {this.renderTimeSection()}
          {this.renderInputTimeSection()}
          {this.props.children}
        </Container>
      </div>
    );
  }
}
