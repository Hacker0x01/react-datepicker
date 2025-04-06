import React, { Component } from "react";

import {
  getHours,
  getMinutes,
  newDate,
  getStartOfDay,
  addMinutes,
  formatDate,
  isTimeInDisabledRange,
  isTimeDisabled,
  timesToInjectAfter,
  getHoursInDay,
  isSameMinute,
  getSeconds,
  type Locale,
  type TimeFilterOptions,
  KeyType,
} from "./date_utils";

interface TimeProps
  extends Pick<
    TimeFilterOptions,
    "minTime" | "maxTime" | "excludeTimes" | "includeTimes" | "filterTime"
  > {
  format?: string;
  intervals?: number;
  selected?: Date | null;
  openToDate?: Date;
  onChange?: (time: Date) => void;
  timeClassName?: (time: Date) => string;
  todayButton?: React.ReactNode;
  monthRef?: HTMLDivElement;
  timeCaption?: string;
  injectTimes?: Date[];
  handleOnKeyDown?: React.KeyboardEventHandler<HTMLLIElement>;
  locale?: Locale;
  showTimeSelectOnly?: boolean;
  showTimeCaption?: boolean;
}

interface TimeState {
  height: number | null;
}

export default class Time extends Component<TimeProps, TimeState> {
  static get defaultProps() {
    return {
      intervals: 30,
      todayButton: null,
      timeCaption: "Time",
      showTimeCaption: true,
    };
  }

  static calcCenterPosition = (
    listHeight: number,
    centerLiRef: HTMLLIElement,
  ): number => {
    return (
      centerLiRef.offsetTop - (listHeight / 2 - centerLiRef.clientHeight / 2)
    );
  };

  private resizeObserver?: ResizeObserver;
  state: TimeState = {
    height: null,
  };

  componentDidMount(): void {
    // code to ensure selected time will always be in focus within time window when it first appears
    this.scrollToTheSelectedTime();
    this.observeDatePickerHeightChanges();
  }

  componentWillUnmount(): void {
    this.resizeObserver?.disconnect();
  }

  private header?: HTMLDivElement;

  private list?: HTMLUListElement;

  private centerLi?: HTMLLIElement;

  private observeDatePickerHeightChanges(): void {
    const { monthRef } = this.props;
    this.updateContainerHeight();

    if (monthRef) {
      this.resizeObserver = new ResizeObserver(() => {
        this.updateContainerHeight();
      });

      this.resizeObserver.observe(monthRef);
    }
  }

  private updateContainerHeight(): void {
    if (this.props.monthRef && this.header) {
      this.setState({
        height: this.props.monthRef.clientHeight - this.header.clientHeight,
      });
    }
  }

  scrollToTheSelectedTime = (): void => {
    requestAnimationFrame((): void => {
      if (!this.list) return;

      this.list.scrollTop =
        (this.centerLi &&
          Time.calcCenterPosition(
            this.props.monthRef
              ? this.props.monthRef.clientHeight -
                  (this.header?.clientHeight ?? 0)
              : this.list.clientHeight,
            this.centerLi,
          )) ??
        0;
    });
  };

  handleClick = (time: Date): void => {
    if (
      ((this.props.minTime || this.props.maxTime) &&
        isTimeInDisabledRange(time, this.props)) ||
      ((this.props.excludeTimes ||
        this.props.includeTimes ||
        this.props.filterTime) &&
        isTimeDisabled(time, this.props))
    ) {
      return;
    }
    this.props.onChange?.(time);
  };

  isSelectedTime = (time: Date) =>
    this.props.selected && isSameMinute(this.props.selected, time);

  isDisabledTime = (time: Date): boolean | undefined =>
    ((this.props.minTime || this.props.maxTime) &&
      isTimeInDisabledRange(time, this.props)) ||
    ((this.props.excludeTimes ||
      this.props.includeTimes ||
      this.props.filterTime) &&
      isTimeDisabled(time, this.props));

  liClasses = (time: Date): string => {
    const classes = [
      "react-datepicker__time-list-item",
      this.props.timeClassName ? this.props.timeClassName(time) : undefined,
    ];

    if (this.isSelectedTime(time)) {
      classes.push("react-datepicker__time-list-item--selected");
    }

    if (this.isDisabledTime(time)) {
      classes.push("react-datepicker__time-list-item--disabled");
    }

    //convert this.props.intervals and the relevant time to seconds and check if it it's a clean multiple of the interval
    if (
      this.props.injectTimes &&
      (getHours(time) * 3600 + getMinutes(time) * 60 + getSeconds(time)) %
        ((this.props.intervals ?? Time.defaultProps.intervals) * 60) !==
        0
    ) {
      classes.push("react-datepicker__time-list-item--injected");
    }

    return classes.join(" ");
  };

  handleOnKeyDown = (
    event: React.KeyboardEvent<HTMLLIElement>,
    time: Date,
  ): void => {
    if (event.key === KeyType.Space) {
      event.preventDefault();
      event.key = KeyType.Enter;
    }

    if (
      (event.key === KeyType.ArrowUp || event.key === KeyType.ArrowLeft) &&
      event.target instanceof HTMLElement &&
      event.target.previousSibling
    ) {
      event.preventDefault();
      event.target.previousSibling instanceof HTMLElement &&
        event.target.previousSibling.focus();
    }
    if (
      (event.key === KeyType.ArrowDown || event.key === KeyType.ArrowRight) &&
      event.target instanceof HTMLElement &&
      event.target.nextSibling
    ) {
      event.preventDefault();
      event.target.nextSibling instanceof HTMLElement &&
        event.target.nextSibling.focus();
    }

    if (event.key === KeyType.Enter) {
      this.handleClick(time);
    }
    this.props.handleOnKeyDown?.(event);
  };

  renderTimes = (): React.ReactElement[] => {
    let times: Date[] = [];
    const format =
      typeof this.props.format === "string" ? this.props.format : "p";
    const intervals = this.props.intervals ?? Time.defaultProps.intervals;

    const activeDate =
      this.props.selected || this.props.openToDate || newDate();

    const base = getStartOfDay(activeDate);
    const sortedInjectTimes =
      this.props.injectTimes &&
      this.props.injectTimes.sort(function (a: Date, b: Date): number {
        return a.getTime() - b.getTime();
      });

    const minutesInDay = 60 * getHoursInDay(activeDate);
    const multiplier = minutesInDay / intervals;

    for (let i = 0; i < multiplier; i++) {
      const currentTime = addMinutes(base, i * intervals);
      times.push(currentTime);

      if (sortedInjectTimes) {
        const timesToInject = timesToInjectAfter(
          base,
          currentTime,
          i,
          intervals,
          sortedInjectTimes,
        );
        times = times.concat(timesToInject);
      }
    }

    // Determine which time to focus and scroll into view when component mounts
    const timeToFocus = times.reduce<Date | undefined>((prev, time) => {
      if (time.getTime() <= activeDate.getTime()) {
        return time;
      }
      return prev;
    }, times[0]);

    return times.map<React.ReactElement>((time): React.ReactElement => {
      return (
        <li
          key={time.valueOf()}
          onClick={this.handleClick.bind(this, time)}
          className={this.liClasses(time)}
          ref={(li: HTMLLIElement): void => {
            if (time === timeToFocus) {
              this.centerLi = li;
            }
          }}
          onKeyDown={(event: React.KeyboardEvent<HTMLLIElement>): void => {
            this.handleOnKeyDown(event, time);
          }}
          tabIndex={time === timeToFocus ? 0 : -1}
          role="option"
          aria-selected={this.isSelectedTime(time) ? "true" : undefined}
          aria-disabled={this.isDisabledTime(time) ? "true" : undefined}
        >
          {formatDate(time, format, this.props.locale)}
        </li>
      );
    });
  };

  renderTimeCaption = (): React.ReactElement => {
    if (this.props.showTimeCaption === false) {
      return <></>;
    }

    return (
      <div
        className={`react-datepicker__header react-datepicker__header--time ${
          this.props.showTimeSelectOnly
            ? "react-datepicker__header--time--only"
            : ""
        }`}
        ref={(header: HTMLDivElement) => {
          this.header = header;
        }}
      >
        <div className="react-datepicker-time__header">
          {this.props.timeCaption}
        </div>
      </div>
    );
  };

  render() {
    const { height } = this.state;

    return (
      <div
        className={`react-datepicker__time-container ${
          (this.props.todayButton ?? Time.defaultProps.todayButton)
            ? "react-datepicker__time-container--with-today-button"
            : ""
        }`}
      >
        {this.renderTimeCaption()}
        <div className="react-datepicker__time">
          <div className="react-datepicker__time-box">
            <ul
              className="react-datepicker__time-list"
              ref={(list: HTMLUListElement) => {
                this.list = list;
              }}
              style={height ? { height } : {}}
              role="listbox"
              aria-label={this.props.timeCaption}
            >
              {this.renderTimes()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
