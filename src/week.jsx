import React from "react";
import PropTypes from "prop-types";
import Day from "./day";
import WeekNumber from "./week_number";
import classnames from "classnames";

import { addDays, getWeek, getStartOfWeek, isSameDay } from "./date_utils";

export default class Week extends React.Component {
  static get defaultProps() {
    return {
      shouldCloseOnSelect: true,
    };
  }
  static propTypes = {
    ariaLabelPrefix: PropTypes.string,
    disabledKeyboardNavigation: PropTypes.bool,
    day: PropTypes.instanceOf(Date).isRequired,
    dayClassName: PropTypes.func,
    disabledDayAriaLabelPrefix: PropTypes.string,
    chooseDayAriaLabelPrefix: PropTypes.string,
    endDate: PropTypes.instanceOf(Date),
    excludeDates: PropTypes.array,
    excludeDateIntervals: PropTypes.arrayOf(
      PropTypes.shape({
        start: PropTypes.instanceOf(Date),
        end: PropTypes.instanceOf(Date),
      }),
    ),
    filterDate: PropTypes.func,
    formatWeekNumber: PropTypes.func,
    highlightDates: PropTypes.instanceOf(Map),
    holidays: PropTypes.instanceOf(Map),
    includeDates: PropTypes.array,
    includeDateIntervals: PropTypes.array,
    inline: PropTypes.bool,
    shouldFocusDayInline: PropTypes.bool,
    locale: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ locale: PropTypes.object }),
    ]),
    maxDate: PropTypes.instanceOf(Date),
    calendarStartDay: PropTypes.number,
    minDate: PropTypes.instanceOf(Date),
    month: PropTypes.number,
    onDayClick: PropTypes.func,
    onDayMouseEnter: PropTypes.func,
    onWeekSelect: PropTypes.func,
    preSelection: PropTypes.instanceOf(Date),
    selected: PropTypes.instanceOf(Date),
    selectingDate: PropTypes.instanceOf(Date),
    selectsEnd: PropTypes.bool,
    selectsStart: PropTypes.bool,
    selectsRange: PropTypes.bool,
    selectsDisabledDaysInRange: PropTypes.bool,
    showWeekNumber: PropTypes.bool,
    showWeekPicker: PropTypes.bool,
    startDate: PropTypes.instanceOf(Date),
    setOpen: PropTypes.func,
    shouldCloseOnSelect: PropTypes.bool,
    renderDayContents: PropTypes.func,
    handleOnKeyDown: PropTypes.func,
    isInputFocused: PropTypes.bool,
    containerRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.object }),
    ]),
    monthShowsDuplicateDaysEnd: PropTypes.bool,
    monthShowsDuplicateDaysStart: PropTypes.bool,
  };

  handleDayClick = (day, event) => {
    if (this.props.onDayClick) {
      this.props.onDayClick(day, event);
    }
  };

  handleDayMouseEnter = (day) => {
    if (this.props.onDayMouseEnter) {
      this.props.onDayMouseEnter(day);
    }
  };

  handleWeekClick = (day, weekNumber, event) => {
    if (typeof this.props.onWeekSelect === "function") {
      this.props.onWeekSelect(day, weekNumber, event);
    }
    if (this.props.showWeekPicker) {
      const startOfWeek = getStartOfWeek(day, this.props.locale);
      this.handleDayClick(startOfWeek, event);
    }
    if (this.props.shouldCloseOnSelect) {
      this.props.setOpen(false);
    }
  };

  formatWeekNumber = (date) => {
    if (this.props.formatWeekNumber) {
      return this.props.formatWeekNumber(date);
    }
    return getWeek(date);
  };

  renderDays = () => {
    // TODO: Ensure calendarStartDay is passed in all other occurrences in this PR
    const startOfWeek = utils.getStartOfWeek(
      this.props.day,
      this.props.locale,
      this.props.calendarStartDay,
    );
    const days = [];
    const weekNumber = this.formatWeekNumber(startOfWeek);
    if (this.props.showWeekNumber) {
      const onClickAction =
        this.props.onWeekSelect || this.props.showWeekPicker
          ? this.handleWeekClick.bind(this, startOfWeek, weekNumber)
          : undefined;
      days.push(
        <WeekNumber
          key="W"
          weekNumber={weekNumber}
          date={startOfWeek}
          onClick={onClickAction}
          selected={this.props.selected}
          preSelection={this.props.preSelection}
          ariaLabelPrefix={this.props.ariaLabelPrefix}
          showWeekPicker={this.props.showWeekPicker}
          showWeekNumber={this.props.showWeekNumber}
          disabledKeyboardNavigation={this.props.disabledKeyboardNavigation}
          handleOnKeyDown={this.props.handleOnKeyDown}
          isInputFocused={this.props.isInputFocused}
          containerRef={this.props.containerRef}
        />,
      );
    }
    return days.concat(
      [0, 1, 2, 3, 4, 5, 6].map((offset) => {
        const day = addDays(startOfWeek, offset);
        return (
          <Day
            ariaLabelPrefixWhenEnabled={this.props.chooseDayAriaLabelPrefix}
            ariaLabelPrefixWhenDisabled={this.props.disabledDayAriaLabelPrefix}
            key={day.valueOf()}
            day={day}
            month={this.props.month}
            onClick={this.handleDayClick.bind(this, day)}
            onMouseEnter={this.handleDayMouseEnter.bind(this, day)}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            excludeDates={this.props.excludeDates}
            excludeDateIntervals={this.props.excludeDateIntervals}
            includeDates={this.props.includeDates}
            includeDateIntervals={this.props.includeDateIntervals}
            highlightDates={this.props.highlightDates}
            holidays={this.props.holidays}
            selectingDate={this.props.selectingDate}
            filterDate={this.props.filterDate}
            preSelection={this.props.preSelection}
            selected={this.props.selected}
            selectsStart={this.props.selectsStart}
            selectsEnd={this.props.selectsEnd}
            selectsRange={this.props.selectsRange}
            showWeekPicker={this.props.showWeekPicker}
            showWeekNumber={this.props.showWeekNumber}
            selectsDisabledDaysInRange={this.props.selectsDisabledDaysInRange}
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            dayClassName={this.props.dayClassName}
            renderDayContents={this.props.renderDayContents}
            disabledKeyboardNavigation={this.props.disabledKeyboardNavigation}
            handleOnKeyDown={this.props.handleOnKeyDown}
            isInputFocused={this.props.isInputFocused}
            containerRef={this.props.containerRef}
            inline={this.props.inline}
            shouldFocusDayInline={this.props.shouldFocusDayInline}
            monthShowsDuplicateDaysEnd={this.props.monthShowsDuplicateDaysEnd}
            monthShowsDuplicateDaysStart={
              this.props.monthShowsDuplicateDaysStart
            }
            locale={this.props.locale}
          />
        );
      }),
    );
  };

  isSameDay = (other) =>
    isSameDay(getStartOfWeek(this.props.day, this.props.locale), other);

  isKeyboardSelected = () =>
    !this.props.disabledKeyboardNavigation &&
    !this.isSameDay(this.props.selected) &&
    this.isSameDay(this.props.preSelection);

  render() {
    const { day, locale, selected } = this.props;

    const startOfWeek = getStartOfWeek(day, locale);
    const weekNumberClasses = {
      "react-datepicker__week": true,
      "react-datepicker__week--selected": this.isSameDay(this.props.selected),
      "react-datepicker__week--keyboard-selected": this.isKeyboardSelected(),
    };
    return (
      <div className={classnames(weekNumberClasses)}>{this.renderDays()}</div>
    );
  }
}
