import { clsx } from "clsx";
import React, { Component } from "react";

import {
  addDays,
  getWeek,
  getStartOfWeek,
  isSameDay,
  isDayDisabled,
} from "./date_utils";
import Day from "./day";
import WeekNumber from "./week_number";

interface DayProps extends React.ComponentPropsWithoutRef<typeof Day> {}

interface WeekNumberProps
  extends React.ComponentPropsWithoutRef<typeof WeekNumber> {}

interface WeekProps
  extends Omit<
      DayProps,
      | "ariaLabelPrefixWhenEnabled"
      | "ariaLabelPrefixWhenDisabled"
      | "day"
      | "onClick"
      | "onMouseEnter"
    >,
    Omit<WeekNumberProps, "weekNumber" | "date" | "onClick"> {
  day: Date;
  chooseDayAriaLabelPrefix?: DayProps["ariaLabelPrefixWhenEnabled"];
  disabledDayAriaLabelPrefix?: DayProps["ariaLabelPrefixWhenDisabled"];
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
  weekClassName?: (date: Date) => string;
}

export default class Week extends Component<WeekProps> {
  static get defaultProps() {
    return {
      shouldCloseOnSelect: true,
    };
  }

  isDisabled = (day: Date): boolean =>
    isDayDisabled(day, {
      minDate: this.props.minDate,
      maxDate: this.props.maxDate,
      excludeDates: this.props.excludeDates,
      excludeDateIntervals: this.props.excludeDateIntervals,
      includeDateIntervals: this.props.includeDateIntervals,
      includeDates: this.props.includeDates,
      filterDate: this.props.filterDate,
    });

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
    let enabledWeekDay = new Date(day);

    for (let i = 0; i < 7; i++) {
      const processingDay = new Date(day);
      processingDay.setDate(processingDay.getDate() + i);

      const isEnabled = !this.isDisabled(processingDay);

      if (isEnabled) {
        enabledWeekDay = processingDay;
        break;
      }
    }

    if (typeof this.props.onWeekSelect === "function") {
      this.props.onWeekSelect(enabledWeekDay, weekNumber, event);
    }
    if (this.props.showWeekPicker) {
      this.handleDayClick(enabledWeekDay, event);
    }
    if (
      this.props.shouldCloseOnSelect ??
      Week.defaultProps.shouldCloseOnSelect
    ) {
      this.props.setOpen?.(false);
    }
  };

  formatWeekNumber = (date: Date): number => {
    if (this.props.formatWeekNumber) {
      return this.props.formatWeekNumber(date);
    }
    return getWeek(date);
  };

  isWeekDisabled = (): boolean => {
    const startOfWeek = this.startOfWeek();
    const endOfWeek = addDays(startOfWeek, 6);

    let processingDate = new Date(startOfWeek);
    while (processingDate <= endOfWeek) {
      if (!this.isDisabled(processingDate)) return false;

      processingDate = addDays(processingDate, 1);
    }

    return true;
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
          key="W"
          {...Week.defaultProps}
          {...this.props}
          weekNumber={weekNumber}
          isWeekDisabled={this.isWeekDisabled()}
          date={startOfWeek}
          onClick={onClickAction}
        />,
      );
    }
    return days.concat(
      [0, 1, 2, 3, 4, 5, 6].map<React.ReactElement>(
        (offset: number): React.ReactElement => {
          const day = addDays(startOfWeek, offset);
          return (
            <Day
              {...Week.defaultProps}
              {...this.props}
              ariaLabelPrefixWhenEnabled={this.props.chooseDayAriaLabelPrefix}
              ariaLabelPrefixWhenDisabled={
                this.props.disabledDayAriaLabelPrefix
              }
              key={day.valueOf()}
              day={day}
              onClick={this.handleDayClick.bind(this, day)}
              onMouseEnter={this.handleDayMouseEnter.bind(this, day)}
            />
          );
        },
      ),
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

  render(): React.ReactElement {
    const weekNumberClasses = {
      "react-datepicker__week": true,
      "react-datepicker__week--selected": isSameDay(
        this.startOfWeek(),
        this.props.selected,
      ),
      "react-datepicker__week--keyboard-selected": this.isKeyboardSelected(),
    };
    const customWeekClassName = this.props.weekClassName
      ? this.props.weekClassName(this.startOfWeek())
      : undefined;
    return (
      <div className={clsx(weekNumberClasses, customWeekClassName)} role="row">
        {this.renderDays()}
      </div>
    );
  }
}
