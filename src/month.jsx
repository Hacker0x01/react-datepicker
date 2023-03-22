import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Week from "./week";
import * as utils from "./date_utils";

const FIXED_HEIGHT_STANDARD_WEEK_COUNT = 6;

export default class Month extends React.Component {
  static propTypes = {
    ariaLabelPrefix: PropTypes.string,
    chooseDayAriaLabelPrefix: PropTypes.string,
    disabledDayAriaLabelPrefix: PropTypes.string,
    disabledKeyboardNavigation: PropTypes.bool,
    day: PropTypes.instanceOf(Date).isRequired,
    dayClassName: PropTypes.func,
    monthClassName: PropTypes.func,
    endDate: PropTypes.instanceOf(Date),
    orderInDisplay: PropTypes.number,
    excludeDates: PropTypes.array,
    excludeDateIntervals: PropTypes.arrayOf(
      PropTypes.shape({
        start: PropTypes.instanceOf(Date),
        end: PropTypes.instanceOf(Date),
      })
    ),
    filterDate: PropTypes.func,
    fixedHeight: PropTypes.bool,
    formatWeekNumber: PropTypes.func,
    highlightDates: PropTypes.instanceOf(Map),
    includeDates: PropTypes.array,
    includeDateIntervals: PropTypes.array,
    inline: PropTypes.bool,
    shouldFocusDayInline: PropTypes.bool,
    locale: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ locale: PropTypes.object }),
    ]),
    maxDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    onDayClick: PropTypes.func,
    onDayMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onWeekSelect: PropTypes.func,
    peekNextMonth: PropTypes.bool,
    preSelection: PropTypes.instanceOf(Date),
    setPreSelection: PropTypes.func,
    selected: PropTypes.instanceOf(Date),
    selectingDate: PropTypes.instanceOf(Date),
    calendarStartDay: PropTypes.number,
    selectsEnd: PropTypes.bool,
    selectsStart: PropTypes.bool,
    selectsRange: PropTypes.bool,
    selectsDisabledDaysInRange: PropTypes.bool,
    showWeekNumbers: PropTypes.bool,
    startDate: PropTypes.instanceOf(Date),
    setOpen: PropTypes.func,
    shouldCloseOnSelect: PropTypes.bool,
    renderDayContents: PropTypes.func,
    showMonthYearPicker: PropTypes.bool,
    showFullMonthYearPicker: PropTypes.bool,
    showTwoColumnMonthYearPicker: PropTypes.bool,
    showFourColumnMonthYearPicker: PropTypes.bool,
    showQuarterYearPicker: PropTypes.bool,
    handleOnKeyDown: PropTypes.func,
    isInputFocused: PropTypes.bool,
    weekAriaLabelPrefix: PropTypes.string,
    containerRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]),
    monthShowsDuplicateDaysEnd: PropTypes.bool,
    monthShowsDuplicateDaysStart: PropTypes.bool,
  };

  MONTH_REFS = [...Array(12)].map(() => React.createRef());
  QUARTER_REFS = [...Array(4)].map(() => React.createRef());

  isDisabled = (date) => utils.isDayDisabled(date, this.props);

  isExcluded = (date) => utils.isDayExcluded(date, this.props);

  handleDayClick = (day, event) => {
    if (this.props.onDayClick) {
      this.props.onDayClick(day, event, this.props.orderInDisplay);
    }
  };

  handleDayMouseEnter = (day) => {
    if (this.props.onDayMouseEnter) {
      this.props.onDayMouseEnter(day);
    }
  };

  handleMouseLeave = () => {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave();
    }
  };

  isRangeStartMonth = (m) => {
    const { day, startDate, endDate } = this.props;
    if (!startDate || !endDate) {
      return false;
    }
    return utils.isSameMonth(utils.setMonth(day, m), startDate);
  };

  isRangeStartQuarter = (q) => {
    const { day, startDate, endDate } = this.props;
    if (!startDate || !endDate) {
      return false;
    }
    return utils.isSameQuarter(utils.setQuarter(day, q), startDate);
  };

  isRangeEndMonth = (m) => {
    const { day, startDate, endDate } = this.props;
    if (!startDate || !endDate) {
      return false;
    }
    return utils.isSameMonth(utils.setMonth(day, m), endDate);
  };

  isRangeEndQuarter = (q) => {
    const { day, startDate, endDate } = this.props;
    if (!startDate || !endDate) {
      return false;
    }
    return utils.isSameQuarter(utils.setQuarter(day, q), endDate);
  };

  isInSelectingRangeMonth = (m) => {
    const { day, selectsStart, selectsEnd, selectsRange, startDate, endDate } =
      this.props;

    const selectingDate = this.props.selectingDate ?? this.props.preSelection;

    if (!(selectsStart || selectsEnd || selectsRange) || !selectingDate) {
      return false;
    }

    if (selectsStart && endDate) {
      return utils.isMonthinRange(selectingDate, endDate, m, day);
    }

    if (selectsEnd && startDate) {
      return utils.isMonthinRange(startDate, selectingDate, m, day);
    }

    if (selectsRange && startDate && !endDate) {
      return utils.isMonthinRange(startDate, selectingDate, m, day);
    }

    return false;
  };

  isInSelectingRangeQuarter = (q) => {
    const { day, selectsStart, selectsEnd, selectsRange, startDate, endDate } =
      this.props;

    const selectingDate = this.props.selectingDate ?? this.props.preSelection;

    if (!(selectsStart || selectsEnd || selectsRange) || !selectingDate) {
      return false;
    }

    if (selectsStart && endDate) {
      return utils.isQuarterInRange(selectingDate, endDate, q, day);
    }

    if (selectsEnd && startDate) {
      return utils.isQuarterInRange(startDate, selectingDate, q, day);
    }

    if (selectsRange && startDate && !endDate) {
      return utils.isQuarterInRange(startDate, selectingDate, q, day);
    }

    return false;
  };

  isWeekInMonth = (startOfWeek) => {
    const day = this.props.day;
    const endOfWeek = utils.addDays(startOfWeek, 6);
    return (
      utils.isSameMonth(startOfWeek, day) || utils.isSameMonth(endOfWeek, day)
    );
  };

  isCurrentMonth = (day, m) =>
    utils.getYear(day) === utils.getYear(utils.newDate()) &&
    m === utils.getMonth(utils.newDate());

  isCurrentQuarter = (day, q) =>
    utils.getYear(day) === utils.getYear(utils.newDate()) &&
    q === utils.getQuarter(utils.newDate());

  isSelectedMonth = (day, m, selected) =>
    utils.getMonth(day) === m && utils.getYear(day) === utils.getYear(selected);

  isSelectedQuarter = (day, q, selected) =>
    utils.getQuarter(day) === q &&
    utils.getYear(day) === utils.getYear(selected);

  renderWeeks = () => {
    const weeks = [];
    var isFixedHeight = this.props.fixedHeight;

    let i = 0;
    let breakAfterNextPush = false;
    let currentWeekStart = utils.getStartOfWeek(
      utils.getStartOfMonth(this.props.day),
      this.props.locale,
      this.props.calendarStartDay
    );

    while (true) {
      weeks.push(
        <Week
          ariaLabelPrefix={this.props.weekAriaLabelPrefix}
          chooseDayAriaLabelPrefix={this.props.chooseDayAriaLabelPrefix}
          disabledDayAriaLabelPrefix={this.props.disabledDayAriaLabelPrefix}
          key={i}
          day={currentWeekStart}
          month={utils.getMonth(this.props.day)}
          onDayClick={this.handleDayClick}
          onDayMouseEnter={this.handleDayMouseEnter}
          onWeekSelect={this.props.onWeekSelect}
          formatWeekNumber={this.props.formatWeekNumber}
          locale={this.props.locale}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          excludeDates={this.props.excludeDates}
          excludeDateIntervals={this.props.excludeDateIntervals}
          includeDates={this.props.includeDates}
          includeDateIntervals={this.props.includeDateIntervals}
          inline={this.props.inline}
          shouldFocusDayInline={this.props.shouldFocusDayInline}
          highlightDates={this.props.highlightDates}
          selectingDate={this.props.selectingDate}
          filterDate={this.props.filterDate}
          preSelection={this.props.preSelection}
          selected={this.props.selected}
          selectsStart={this.props.selectsStart}
          selectsEnd={this.props.selectsEnd}
          selectsRange={this.props.selectsRange}
          selectsDisabledDaysInRange={this.props.selectsDisabledDaysInRange}
          showWeekNumber={this.props.showWeekNumbers}
          startDate={this.props.startDate}
          endDate={this.props.endDate}
          dayClassName={this.props.dayClassName}
          setOpen={this.props.setOpen}
          shouldCloseOnSelect={this.props.shouldCloseOnSelect}
          disabledKeyboardNavigation={this.props.disabledKeyboardNavigation}
          renderDayContents={this.props.renderDayContents}
          handleOnKeyDown={this.props.handleOnKeyDown}
          isInputFocused={this.props.isInputFocused}
          containerRef={this.props.containerRef}
          calendarStartDay={this.props.calendarStartDay}
          monthShowsDuplicateDaysEnd={this.props.monthShowsDuplicateDaysEnd}
          monthShowsDuplicateDaysStart={this.props.monthShowsDuplicateDaysStart}
        />
      );

      if (breakAfterNextPush) break;

      i++;
      currentWeekStart = utils.addWeeks(currentWeekStart, 1);

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

  onMonthClick = (e, m) => {
    this.handleDayClick(
      utils.getStartOfMonth(utils.setMonth(this.props.day, m)),
      e
    );
  };

  onMonthMouseEnter = (m) => {
    this.handleDayMouseEnter(
      utils.getStartOfMonth(utils.setMonth(this.props.day, m))
    );
  };

  handleMonthNavigation = (newMonth, newDate) => {
    if (this.isDisabled(newDate) || this.isExcluded(newDate)) return;
    this.props.setPreSelection(newDate);
    this.MONTH_REFS[newMonth].current &&
      this.MONTH_REFS[newMonth].current.focus();
  };

  onMonthKeyDown = (event, month) => {
    event.preventDefault();
    const eventKey = event.key;
    if (!this.props.disabledKeyboardNavigation) {
      switch (eventKey) {
        case "Enter":
          this.onMonthClick(event, month);
          this.props.setPreSelection(this.props.selected);
          break;
        case "ArrowRight":
          this.handleMonthNavigation(
            month === 11 ? 0 : month + 1,
            utils.addMonths(this.props.preSelection, 1)
          );
          break;
        case "ArrowLeft":
          this.handleMonthNavigation(
            month === 0 ? 11 : month - 1,
            utils.subMonths(this.props.preSelection, 1)
          );
          break;
        case "ArrowUp":
          this.handleMonthNavigation(
            month >= 0 && month <= 2 ? month + 9 : month - 3,
            utils.subMonths(this.props.preSelection, 3)
          );
          break;
        case "ArrowDown":
          this.handleMonthNavigation(
            month >= 9 && month <= 11 ? month - 9 : month + 3,
            utils.addMonths(this.props.preSelection, 3)
          );
          break;
      }
    }
  };

  onQuarterClick = (e, q) => {
    this.handleDayClick(
      utils.getStartOfQuarter(utils.setQuarter(this.props.day, q)),
      e
    );
  };

  onQuarterMouseEnter = (q) => {
    this.handleDayMouseEnter(
      utils.getStartOfQuarter(utils.setQuarter(this.props.day, q))
    );
  };

  handleQuarterNavigation = (newQuarter, newDate) => {
    if (this.isDisabled(newDate) || this.isExcluded(newDate)) return;
    this.props.setPreSelection(newDate);
    this.QUARTER_REFS[newQuarter - 1].current &&
      this.QUARTER_REFS[newQuarter - 1].current.focus();
  };

  onQuarterKeyDown = (event, quarter) => {
    const eventKey = event.key;
    if (!this.props.disabledKeyboardNavigation) {
      switch (eventKey) {
        case "Enter":
          this.onQuarterClick(event, quarter);
          this.props.setPreSelection(this.props.selected);
          break;
        case "ArrowRight":
          this.handleQuarterNavigation(
            quarter === 4 ? 1 : quarter + 1,
            utils.addQuarters(this.props.preSelection, 1)
          );
          break;
        case "ArrowLeft":
          this.handleQuarterNavigation(
            quarter === 1 ? 4 : quarter - 1,
            utils.subQuarters(this.props.preSelection, 1)
          );
          break;
      }
    }
  };

  getMonthClassNames = (m) => {
    const {
      day,
      startDate,
      endDate,
      selected,
      minDate,
      maxDate,
      preSelection,
      monthClassName,
      excludeDates,
      includeDates,
    } = this.props;
    const _monthClassName = monthClassName
      ? monthClassName(utils.setMonth(day, m))
      : undefined;
    const labelDate = utils.setMonth(day, m);
    return classnames(
      "react-datepicker__month-text",
      `react-datepicker__month-${m}`,
      _monthClassName,
      {
        "react-datepicker__month-text--disabled":
          (minDate || maxDate || excludeDates || includeDates) &&
          utils.isMonthDisabled(labelDate, this.props),
        "react-datepicker__month-text--selected": this.isSelectedMonth(
          day,
          m,
          selected
        ),
        "react-datepicker__month-text--keyboard-selected":
          !this.props.disabledKeyboardNavigation &&
          utils.getMonth(preSelection) === m,
        "react-datepicker__month-text--in-selecting-range":
          this.isInSelectingRangeMonth(m),
        "react-datepicker__month-text--in-range": utils.isMonthinRange(
          startDate,
          endDate,
          m,
          day
        ),
        "react-datepicker__month-text--range-start": this.isRangeStartMonth(m),
        "react-datepicker__month-text--range-end": this.isRangeEndMonth(m),
        "react-datepicker__month-text--today": this.isCurrentMonth(day, m),
      }
    );
  };

  getTabIndex = (m) => {
    const preSelectedMonth = utils.getMonth(this.props.preSelection);
    const tabIndex =
      !this.props.disabledKeyboardNavigation && m === preSelectedMonth
        ? "0"
        : "-1";

    return tabIndex;
  };

  getQuarterTabIndex = (q) => {
    const preSelectedQuarter = utils.getQuarter(this.props.preSelection);
    const tabIndex =
      !this.props.disabledKeyboardNavigation && q === preSelectedQuarter
        ? "0"
        : "-1";

    return tabIndex;
  };

  getAriaLabel = (month) => {
    const {
      chooseDayAriaLabelPrefix = "Choose",
      disabledDayAriaLabelPrefix = "Not available",
      day,
    } = this.props;

    const labelDate = utils.setMonth(day, month);
    const prefix =
      this.isDisabled(labelDate) || this.isExcluded(labelDate)
        ? disabledDayAriaLabelPrefix
        : chooseDayAriaLabelPrefix;

    return `${prefix} ${utils.formatDate(labelDate, "MMMM yyyy")}`;
  };

  getQuarterClassNames = (q) => {
    const {
      day,
      startDate,
      endDate,
      selected,
      minDate,
      maxDate,
      preSelection,
    } = this.props;
    return classnames(
      "react-datepicker__quarter-text",
      `react-datepicker__quarter-${q}`,
      {
        "react-datepicker__quarter-text--disabled":
          (minDate || maxDate) &&
          utils.isQuarterDisabled(utils.setQuarter(day, q), this.props),
        "react-datepicker__quarter-text--selected": this.isSelectedQuarter(
          day,
          q,
          selected
        ),
        "react-datepicker__quarter-text--keyboard-selected":
          utils.getQuarter(preSelection) === q,
        "react-datepicker__quarter-text--in-selecting-range":
          this.isInSelectingRangeQuarter(q),
        "react-datepicker__quarter-text--in-range": utils.isQuarterInRange(
          startDate,
          endDate,
          q,
          day
        ),
        "react-datepicker__quarter-text--range-start":
          this.isRangeStartQuarter(q),
        "react-datepicker__quarter-text--range-end": this.isRangeEndQuarter(q),
      }
    );
  };

  renderMonths = () => {
    const {
      showFullMonthYearPicker,
      showTwoColumnMonthYearPicker,
      showFourColumnMonthYearPicker,
      locale,
      day,
      selected,
    } = this.props;
    const monthsFourColumns = [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
    ];
    const monthsThreeColumns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [9, 10, 11],
    ];
    const monthsTwoColumns = [
      [0, 1],
      [2, 3],
      [4, 5],
      [6, 7],
      [8, 9],
      [10, 11],
    ];
    const monthLayout = showFourColumnMonthYearPicker
      ? monthsFourColumns
      : showTwoColumnMonthYearPicker
      ? monthsTwoColumns
      : monthsThreeColumns;
    return monthLayout.map((month, i) => (
      <div className="react-datepicker__month-wrapper" key={i}>
        {month.map((m, j) => (
          <div
            ref={this.MONTH_REFS[m]}
            key={j}
            onClick={(ev) => {
              this.onMonthClick(ev, m);
            }}
            onKeyDown={(ev) => {
              this.onMonthKeyDown(ev, m);
            }}
            onMouseEnter={() => this.onMonthMouseEnter(m)}
            tabIndex={this.getTabIndex(m)}
            className={this.getMonthClassNames(m)}
            role="option"
            aria-label={this.getAriaLabel(m)}
            aria-current={this.isCurrentMonth(day, m) ? "date" : undefined}
            aria-selected={this.isSelectedMonth(day, m, selected)}
          >
            {showFullMonthYearPicker
              ? utils.getMonthInLocale(m, locale)
              : utils.getMonthShortInLocale(m, locale)}
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
            onClick={(ev) => {
              this.onQuarterClick(ev, q);
            }}
            onKeyDown={(ev) => {
              this.onQuarterKeyDown(ev, q);
            }}
            onMouseEnter={() => this.onQuarterMouseEnter(q)}
            className={this.getQuarterClassNames(q)}
            aria-selected={this.isSelectedQuarter(day, q, selected)}
            tabIndex={this.getQuarterTabIndex(q)}
            aria-current={this.isCurrentQuarter(day, q) ? "date" : undefined}
          >
            {utils.getQuarterShortInLocale(q, this.props.locale)}
          </div>
        ))}
      </div>
    );
  };

  getClassNames = () => {
    const {
      day,
      selectingDate,
      selectsStart,
      selectsEnd,
      showMonthYearPicker,
      showQuarterYearPicker,
    } = this.props;

    return classnames(
      "react-datepicker__month",
      {
        "react-datepicker__month--selecting-range":
          selectingDate && (selectsStart || selectsEnd),
      },
      { "react-datepicker__monthPicker": showMonthYearPicker },
      { "react-datepicker__quarterPicker": showQuarterYearPicker }
    );
  };

  render() {
    const {
      showMonthYearPicker,
      showQuarterYearPicker,
      day,
      ariaLabelPrefix = "month ",
    } = this.props;
    return (
      <div
        className={this.getClassNames()}
        onMouseLeave={this.handleMouseLeave}
        aria-label={`${ariaLabelPrefix} ${utils.formatDate(day, "yyyy-MM")}`}
        role="listbox"
      >
        {showMonthYearPicker
          ? this.renderMonths()
          : showQuarterYearPicker
          ? this.renderQuarters()
          : this.renderWeeks()}
      </div>
    );
  }
}
