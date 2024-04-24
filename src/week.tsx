import React from "react";
import Day from "./day";
import WeekNumber from "./week_number";
import { clsx } from "clsx";
import { addDays, getWeek, getStartOfWeek, isSameDay } from "./date_utils";

interface DayProps extends React.ComponentPropsWithoutRef<typeof Day> {}
interface WeekNumberProps
  extends React.ComponentPropsWithoutRef<typeof WeekNumber> {}

interface WeekProps
  extends Omit<
      DayProps,
      | "ariaLabelPrefixWhenEnabled"
      | "disabledDayAriaLabelPrefix"
      | "day"
      | "onClick"
      | "onMouseEnter"
    >,
    Omit<
      WeekNumberProps,
      "weekNumber" | "date" | "onClick" | "handleOnKeyDown"
    > {
  day: Date;
  chooseDayAriaLabelPrefix: DayProps["ariaLabelPrefixWhenEnabled"];
  disabledDayAriaLabelPrefix: DayProps["ariaLabelPrefixWhenDisabled"];
  onDayClick?: (day: Date, event: React.MouseEvent<HTMLDivElement>) => void;
  onDayMouseEnter?: (day: Date) => void;
  shouldCloseOnSelect?: boolean;
  setOpen?: (open: boolean) => void;
  formatWeekNumber?: (date: Date) => number;
  onWeekSelect?: (
    day: Date,
    weekNumber: number,
    event: React.MouseEvent<HTMLDivElement>,
  ) => void;
}

export default class Week extends React.Component<WeekProps> {
  static get defaultProps(): Partial<WeekProps> {
    return {
      shouldCloseOnSelect: true,
    };
  }

  handleDayClick = (
    day: Date,
    event: React.MouseEvent<HTMLDivElement>,
  ): void => {
    if (this.props.onDayClick) {
      this.props.onDayClick(day, event);
    }
  };

  handleDayMouseEnter = (day: Date): void => {
    if (this.props.onDayMouseEnter) {
      this.props.onDayMouseEnter(day);
    }
  };

  handleWeekClick = (
    day: Date,
    weekNumber: number,
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (typeof this.props.onWeekSelect === "function") {
      this.props.onWeekSelect(day, weekNumber, event);
    }
    if (this.props.showWeekPicker) {
      this.handleDayClick(day, event);
    }
    if (this.props.shouldCloseOnSelect) {
      this.props.setOpen?.(false);
    }
  };

  formatWeekNumber = (date: Date): number => {
    if (this.props.formatWeekNumber) {
      return this.props.formatWeekNumber(date);
    }
    return getWeek(date);
  };

  renderDays = () => {
    const startOfWeek = this.startOfWeek();
    const days = [];
    const weekNumber = this.formatWeekNumber(startOfWeek);
    if (this.props.showWeekNumber) {
      const onClickAction =
        this.props.onWeekSelect || this.props.showWeekPicker
          ? this.handleWeekClick.bind(this, startOfWeek, weekNumber)
          : undefined;
      days.push(
        <WeekNumber
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
      [0, 1, 2, 3, 4, 5, 6].map<JSX.Element>((offset: number): JSX.Element => {
        const day = addDays(startOfWeek, offset);
        return (
          <Day
            ariaLabelPrefixWhenEnabled={this.props.chooseDayAriaLabelPrefix}
            ariaLabelPrefixWhenDisabled={this.props.disabledDayAriaLabelPrefix}
            key={day.valueOf()}
            day={day}
            month={this.props.month}
            onClick={this.handleDayClick.bind(this, day)}
            usePointerEvent={this.props.usePointerEvent}
            onMouseEnter={this.handleDayMouseEnter.bind(this, day)}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            calendarStartDay={this.props.calendarStartDay}
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
            selectsMultiple={this.props.selectsMultiple}
            selectedDates={this.props.selectedDates}
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            dayClassName={this.props.dayClassName}
            renderDayContents={this.props.renderDayContents}
            disabledKeyboardNavigation={this.props.disabledKeyboardNavigation}
            handleOnKeyDown={this.props.handleOnKeyDown}
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

  startOfWeek = (): Date =>
    getStartOfWeek(
      this.props.day,
      this.props.locale,
      this.props.calendarStartDay,
    );

  isKeyboardSelected = (): boolean =>
    !this.props.disabledKeyboardNavigation &&
    !isSameDay(this.startOfWeek(), this.props.selected) &&
    isSameDay(this.startOfWeek(), this.props.preSelection);

  render(): JSX.Element {
    const weekNumberClasses = {
      "react-datepicker__week": true,
      "react-datepicker__week--selected": isSameDay(
        this.startOfWeek(),
        this.props.selected,
      ),
      "react-datepicker__week--keyboard-selected": this.isKeyboardSelected(),
    };
    return <div className={clsx(weekNumberClasses)}>{this.renderDays()}</div>;
  }
}
