import YearDropdown from "./year_dropdown";
import MonthDropdown from "./month_dropdown";
import MonthYearDropdown from "./month_year_dropdown";
import Month from "./month";
import Time from "./time";
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
  isAfter,
  getFormattedWeekdayInLocale,
  getWeekdayShortInLocale,
  getWeekdayMinInLocale,
  isSameDay,
  monthDisabledBefore,
  monthDisabledAfter,
  getEffectiveMinDate,
  getEffectiveMaxDate
} from "./date_utils";

const DROPDOWN_FOCUS_CLASSNAMES = [
  "react-datepicker__year-select",
  "react-datepicker__month-select",
  "react-datepicker__month-year-select"
];

const isDropdownSelect = (element = {}) => {
  const classNames = (element.className || "").split(/\s+/);
  return DROPDOWN_FOCUS_CLASSNAMES.some(
    testClassname => classNames.indexOf(testClassname) >= 0
  );
};

export default class Calendar extends React.Component {
  static propTypes = {
    adjustDateOnChange: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
    container: PropTypes.func,
    dateFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
      .isRequired,
    dayClassName: PropTypes.func,
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
    locale: PropTypes.string,
    maxDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    monthsShown: PropTypes.number,
    monthSelectedIn: PropTypes.number,
    onClickOutside: PropTypes.func.isRequired,
    onMonthChange: PropTypes.func,
    onYearChange: PropTypes.func,
    forceShowMonthNavigation: PropTypes.bool,
    onDropdownFocus: PropTypes.func,
    onSelect: PropTypes.func.isRequired,
    onWeekSelect: PropTypes.func,
    showTimeSelect: PropTypes.bool,
    showTimeSelectOnly: PropTypes.bool,
    timeFormat: PropTypes.string,
    timeIntervals: PropTypes.number,
    onTimeChange: PropTypes.func,
    minTime: PropTypes.instanceOf(Date),
    maxTime: PropTypes.instanceOf(Date),
    excludeTimes: PropTypes.array,
    timeCaption: PropTypes.string,
    openToDate: PropTypes.instanceOf(Date),
    peekNextMonth: PropTypes.bool,
    scrollableYearDropdown: PropTypes.bool,
    scrollableMonthYearDropdown: PropTypes.bool,
    preSelection: PropTypes.instanceOf(Date),
    selected: PropTypes.instanceOf(Date),
    selectsEnd: PropTypes.bool,
    selectsStart: PropTypes.bool,
    showMonthDropdown: PropTypes.bool,
    showMonthYearDropdown: PropTypes.bool,
    showWeekNumbers: PropTypes.bool,
    showYearDropdown: PropTypes.bool,
    startDate: PropTypes.instanceOf(Date),
    todayButton: PropTypes.string,
    useWeekdaysShort: PropTypes.bool,
    formatWeekDay: PropTypes.func,
    withPortal: PropTypes.bool,
    weekLabel: PropTypes.string,
    yearDropdownItemNumber: PropTypes.number,
    setOpen: PropTypes.func,
    shouldCloseOnSelect: PropTypes.bool,
    useShortMonthInDropdown: PropTypes.bool,
    showDisabledMonthNavigation: PropTypes.bool,
    previousMonthButtonLabel: PropTypes.string,
    nextMonthButtonLabel: PropTypes.string,
    renderCustomHeader: PropTypes.func,
    renderDayContents: PropTypes.func
  };

  static get defaultProps() {
    return {
      onDropdownFocus: () => {},
      monthsShown: 1,
      monthSelectedIn: 0,
      forceShowMonthNavigation: false,
      timeCaption: "Time",
      previousMonthButtonLabel: "Previous Month",
      nextMonthButtonLabel: "Next Month"
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      date: this.getDateInView(),
      selectingDate: null,
      monthContainer: null
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
        date: this.props.preSelection
      });
    } else if (
      this.props.openToDate &&
      !isSameDay(this.props.openToDate, prevProps.openToDate)
    ) {
      this.setState({
        date: this.props.openToDate
      });
    }
  }

  handleClickOutside = event => {
    this.props.onClickOutside(event);
  };

  handleDropdownFocus = event => {
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
      {
        date: addMonths(this.state.date, 1)
      },
      () => this.handleMonthChange(this.state.date)
    );
  };

  decreaseMonth = () => {
    this.setState(
      {
        date: subMonths(this.state.date, 1)
      },
      () => this.handleMonthChange(this.state.date)
    );
  };

  handleDayClick = (day, event, monthSelectedIn) =>
    this.props.onSelect(day, event, monthSelectedIn);

  handleDayMouseEnter = day => this.setState({ selectingDate: day });

  handleMonthMouseLeave = () => this.setState({ selectingDate: null });

  handleYearChange = date => {
    if (this.props.onYearChange) {
      this.props.onYearChange(date);
    }
  };

  handleMonthChange = date => {
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
  };

  handleMonthYearChange = date => {
    this.handleYearChange(date);
    this.handleMonthChange(date);
  };

  changeYear = year => {
    this.setState(
      {
        date: setYear(this.state.date, year)
      },
      () => this.handleYearChange(this.state.date)
    );
  };

  changeMonth = month => {
    this.setState(
      {
        date: setMonth(this.state.date, month)
      },
      () => this.handleMonthChange(this.state.date)
    );
  };

  changeMonthYear = monthYear => {
    this.setState(
      {
        date: setYear(
          setMonth(this.state.date, getMonth(monthYear)),
          getYear(monthYear)
        )
      },
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
      [0, 1, 2, 3, 4, 5, 6].map(offset => {
        const day = addDays(startOfWeek, offset);
        const weekDayName = this.formatWeekday(day, this.props.locale);
        return (
          <div key={offset} className="react-datepicker__day-name">
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

  renderPreviousMonthButton = () => {
    if (this.props.renderCustomHeader) {
      return;
    }

    const allPrevDaysDisabled = monthDisabledBefore(
      this.state.date,
      this.props
    );

    if (
      (!this.props.forceShowMonthNavigation &&
        !this.props.showDisabledMonthNavigation &&
        allPrevDaysDisabled) ||
      this.props.showTimeSelectOnly
    ) {
      return;
    }

    const classes = [
      "react-datepicker__navigation",
      "react-datepicker__navigation--previous"
    ];

    let clickHandler = this.decreaseMonth;

    if (allPrevDaysDisabled && this.props.showDisabledMonthNavigation) {
      classes.push("react-datepicker__navigation--previous--disabled");
      clickHandler = null;
    }

    return (
      <button
        type="button"
        className={classes.join(" ")}
        onClick={clickHandler}
      >
        {this.props.previousMonthButtonLabel}
      </button>
    );
  };

  renderNextMonthButton = () => {
    if (this.props.renderCustomHeader) {
      return;
    }

    const allNextDaysDisabled = monthDisabledAfter(this.state.date, this.props);

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
      "react-datepicker__navigation--next"
    ];
    if (this.props.showTimeSelect) {
      classes.push("react-datepicker__navigation--next--with-time");
    }
    if (this.props.todayButton) {
      classes.push("react-datepicker__navigation--next--with-today-button");
    }

    let clickHandler = this.increaseMonth;

    if (allNextDaysDisabled && this.props.showDisabledMonthNavigation) {
      classes.push("react-datepicker__navigation--next--disabled");
      clickHandler = null;
    }

    return (
      <button
        type="button"
        className={classes.join(" ")}
        onClick={clickHandler}
      >
        {this.props.nextMonthButtonLabel}
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
        onClick={e => this.props.onSelect(getStartOfToday(), e)}
      >
        {this.props.todayButton}
      </div>
    );
  };

  renderDefaultHeader = ({ monthDate, i }) => (
    <div className="react-datepicker__header">
      {this.renderCurrentMonth(monthDate)}
      <div
        className={`react-datepicker__header__dropdown react-datepicker__header__dropdown--${
          this.props.dropdownMode
        }`}
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

  renderCustomHeader = ({ monthDate, i }) => {
    if (i !== 0) {
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

    return (
      <div
        className="react-datepicker__header react-datepicker__header--custom"
        onFocus={this.props.onDropdownFocus}
      >
        {this.props.renderCustomHeader({
          ...this.state,
          changeMonth: this.changeMonth,
          changeYear: this.changeYear,
          decreaseMonth: this.decreaseMonth,
          increaseMonth: this.increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled
        })}
        <div className="react-datepicker__day-names">
          {this.header(monthDate)}
        </div>
      </div>
    );
  };

  renderMonths = () => {
    if (this.props.showTimeSelectOnly) {
      return;
    }

    var monthList = [];
    for (var i = 0; i < this.props.monthsShown; ++i) {
      var monthsToAdd = i - this.props.monthSelectedIn;
      var monthDate = addMonths(this.state.date, monthsToAdd);
      var monthKey = `month-${i}`;
      monthList.push(
        <div
          key={monthKey}
          ref={div => {
            this.monthContainer = div;
          }}
          className="react-datepicker__month-container"
        >
          {this.props.renderCustomHeader
            ? this.renderCustomHeader({ monthDate, i })
            : this.renderDefaultHeader({ monthDate, i })}
          <Month
            day={monthDate}
            dayClassName={this.props.dayClassName}
            onDayClick={this.handleDayClick}
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
            fixedHeight={this.props.fixedHeight}
            filterDate={this.props.filterDate}
            preSelection={this.props.preSelection}
            selected={this.props.selected}
            selectsStart={this.props.selectsStart}
            selectsEnd={this.props.selectsEnd}
            showWeekNumbers={this.props.showWeekNumbers}
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            peekNextMonth={this.props.peekNextMonth}
            setOpen={this.props.setOpen}
            shouldCloseOnSelect={this.props.shouldCloseOnSelect}
            renderDayContents={this.props.renderDayContents}
            disabledKeyboardNavigation={this.props.disabledKeyboardNavigation}
          />
        </div>
      );
    }
    return monthList;
  };

  renderTimeSection = () => {
    if (
      this.props.showTimeSelect &&
      (this.state.monthContainer || this.props.showTimeSelectOnly)
    ) {
      return (
        <Time
          selected={this.props.selected}
          onChange={this.props.onTimeChange}
          format={this.props.timeFormat}
          includeTimes={this.props.includeTimes}
          intervals={this.props.timeIntervals}
          minTime={this.props.minTime}
          maxTime={this.props.maxTime}
          excludeTimes={this.props.excludeTimes}
          timeCaption={this.props.timeCaption}
          todayButton={this.props.todayButton}
          showMonthDropdown={this.props.showMonthDropdown}
          showMonthYearDropdown={this.props.showMonthYearDropdown}
          showYearDropdown={this.props.showYearDropdown}
          withPortal={this.props.withPortal}
          monthRef={this.state.monthContainer}
          injectTimes={this.props.injectTimes}
        />
      );
    }
  };

  render() {
    const Container = this.props.container || CalendarContainer;

    return (
      <Container
        className={classnames("react-datepicker", this.props.className, {
          "react-datepicker--time-only": this.props.showTimeSelectOnly
        })}
      >
        {this.renderPreviousMonthButton()}
        {this.renderNextMonthButton()}
        {this.renderMonths()}
        {this.renderTodayButton()}
        {this.renderTimeSection()}
        {this.props.children}
      </Container>
    );
  }
}
