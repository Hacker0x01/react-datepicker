import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import {
  getDay,
  getMonth,
  getDate,
  newDate,
  isSameDay,
  isDayDisabled,
  isDayExcluded,
  isDayInRange,
  isEqual,
  isBefore,
  isAfter,
  getDayOfWeekCode,
  formatDate,
} from "./date_utils";

export default class Day extends React.Component {
  static propTypes = {
    ariaLabelPrefixWhenEnabled: PropTypes.string,
    ariaLabelPrefixWhenDisabled: PropTypes.string,
    disabledKeyboardNavigation: PropTypes.bool,
    day: PropTypes.instanceOf(Date).isRequired,
    dayClassName: PropTypes.func,
    endDate: PropTypes.instanceOf(Date),
    highlightDates: PropTypes.instanceOf(Map),
    holidays: PropTypes.instanceOf(Map),
    inline: PropTypes.bool,
    shouldFocusDayInline: PropTypes.bool,
    month: PropTypes.number,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    preSelection: PropTypes.instanceOf(Date),
    selected: PropTypes.object,
    selectingDate: PropTypes.instanceOf(Date),
    selectsEnd: PropTypes.bool,
    selectsStart: PropTypes.bool,
    selectsRange: PropTypes.bool,
    selectsDisabledDaysInRange: PropTypes.bool,
    startDate: PropTypes.instanceOf(Date),
    renderDayContents: PropTypes.func,
    handleOnKeyDown: PropTypes.func,
    containerRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]),
    monthShowsDuplicateDaysEnd: PropTypes.bool,
    monthShowsDuplicateDaysStart: PropTypes.bool,
    locale: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ locale: PropTypes.object }),
    ]),
  };

  componentDidMount() {
    this.handleFocusDay();
  }

  componentDidUpdate(prevProps) {
    this.handleFocusDay(prevProps);
  }

  dayEl = React.createRef();

  handleClick = (event) => {
    if (!this.isDisabled() && this.props.onClick) {
      this.props.onClick(event);
    }
  };

  handleMouseEnter = (event) => {
    if (!this.isDisabled() && this.props.onMouseEnter) {
      this.props.onMouseEnter(event);
    }
  };

  handleOnKeyDown = (event) => {
    const eventKey = event.key;
    if (eventKey === " ") {
      event.preventDefault();
      event.key = "Enter";
    }

    this.props.handleOnKeyDown(event);
  };

  isSameDay = (other) => isSameDay(this.props.day, other);

  isKeyboardSelected = () =>
    !this.props.disabledKeyboardNavigation &&
    !this.isSameDay(this.props.selected) &&
    this.isSameDay(this.props.preSelection);

  isDisabled = () => isDayDisabled(this.props.day, this.props);

  isExcluded = () => isDayExcluded(this.props.day, this.props);

  getHighLightedClass = () => {
    const { day, highlightDates } = this.props;

    if (!highlightDates) {
      return false;
    }

    // Looking for className in the Map of {'day string, 'className'}
    const dayStr = formatDate(day, "MM.dd.yyyy");
    return highlightDates.get(dayStr);
  };

  // Function to return the array containing classname associated to the date
  getHolidaysClass = () => {
    const { day, holidays } = this.props;
    if (!holidays) {
      return false;
    }
    const dayStr = formatDate(day, "MM.dd.yyyy");
    // Looking for className in the Map of {day string: {className, holidayName}}
    if (holidays.has(dayStr)) {
      return [holidays.get(dayStr).className];
    }
  };

  isInRange = () => {
    const { day, startDate, endDate } = this.props;
    if (!startDate || !endDate) {
      return false;
    }
    return isDayInRange(day, startDate, endDate);
  };

  isInSelectingRange = () => {
    const {
      day,
      selectsStart,
      selectsEnd,
      selectsRange,
      selectsDisabledDaysInRange,
      startDate,
      endDate,
    } = this.props;

    const selectingDate = this.props.selectingDate ?? this.props.preSelection;

    if (
      !(selectsStart || selectsEnd || selectsRange) ||
      !selectingDate ||
      (!selectsDisabledDaysInRange && this.isDisabled())
    ) {
      return false;
    }

    if (
      selectsStart &&
      endDate &&
      (isBefore(selectingDate, endDate) || isEqual(selectingDate, endDate))
    ) {
      return isDayInRange(day, selectingDate, endDate);
    }

    if (
      selectsEnd &&
      startDate &&
      (isAfter(selectingDate, startDate) || isEqual(selectingDate, startDate))
    ) {
      return isDayInRange(day, startDate, selectingDate);
    }

    if (
      selectsRange &&
      startDate &&
      !endDate &&
      (isAfter(selectingDate, startDate) || isEqual(selectingDate, startDate))
    ) {
      return isDayInRange(day, startDate, selectingDate);
    }

    return false;
  };

  isSelectingRangeStart = () => {
    if (!this.isInSelectingRange()) {
      return false;
    }

    const { day, startDate, selectsStart } = this.props;
    const selectingDate = this.props.selectingDate ?? this.props.preSelection;

    if (selectsStart) {
      return isSameDay(day, selectingDate);
    } else {
      return isSameDay(day, startDate);
    }
  };

  isSelectingRangeEnd = () => {
    if (!this.isInSelectingRange()) {
      return false;
    }

    const { day, endDate, selectsEnd, selectsRange } = this.props;
    const selectingDate = this.props.selectingDate ?? this.props.preSelection;

    if (selectsEnd || selectsRange) {
      return isSameDay(day, selectingDate);
    } else {
      return isSameDay(day, endDate);
    }
  };

  isRangeStart = () => {
    const { day, startDate, endDate } = this.props;
    if (!startDate || !endDate) {
      return false;
    }
    return isSameDay(startDate, day);
  };

  isRangeEnd = () => {
    const { day, startDate, endDate } = this.props;
    if (!startDate || !endDate) {
      return false;
    }
    return isSameDay(endDate, day);
  };

  isWeekend = () => {
    const weekday = getDay(this.props.day);
    return weekday === 0 || weekday === 6;
  };

  isAfterMonth = () => {
    return (
      this.props.month !== undefined &&
      (this.props.month + 1) % 12 === getMonth(this.props.day)
    );
  };

  isBeforeMonth = () => {
    return (
      this.props.month !== undefined &&
      (getMonth(this.props.day) + 1) % 12 === this.props.month
    );
  };

  isCurrentDay = () => this.isSameDay(newDate());

  isSelected = () => this.isSameDay(this.props.selected);

  getClassNames = (date) => {
    const dayClassName = this.props.dayClassName
      ? this.props.dayClassName(date)
      : undefined;
    return classnames(
      "react-datepicker__day",
      dayClassName,
      "react-datepicker__day--" + getDayOfWeekCode(this.props.day),
      {
        "react-datepicker__day--disabled": this.isDisabled(),
        "react-datepicker__day--excluded": this.isExcluded(),
        "react-datepicker__day--selected": this.isSelected(),
        "react-datepicker__day--keyboard-selected": this.isKeyboardSelected(),
        "react-datepicker__day--range-start": this.isRangeStart(),
        "react-datepicker__day--range-end": this.isRangeEnd(),
        "react-datepicker__day--in-range": this.isInRange(),
        "react-datepicker__day--in-selecting-range": this.isInSelectingRange(),
        "react-datepicker__day--selecting-range-start":
          this.isSelectingRangeStart(),
        "react-datepicker__day--selecting-range-end":
          this.isSelectingRangeEnd(),
        "react-datepicker__day--today": this.isCurrentDay(),
        "react-datepicker__day--weekend": this.isWeekend(),
        "react-datepicker__day--outside-month":
          this.isAfterMonth() || this.isBeforeMonth(),
      },
      this.getHighLightedClass("react-datepicker__day--highlighted"),
      this.getHolidaysClass()
    );
  };

  getAriaLabel = () => {
    const {
      day,
      ariaLabelPrefixWhenEnabled = "Choose",
      ariaLabelPrefixWhenDisabled = "Not available",
    } = this.props;

    const prefix =
      this.isDisabled() || this.isExcluded()
        ? ariaLabelPrefixWhenDisabled
        : ariaLabelPrefixWhenEnabled;

    return `${prefix} ${formatDate(day, "PPPP", this.props.locale)}`;
  };

  // A function to return the holiday's name as title's content
  getTitle = () => {
    const { day, holidays = new Map() } = this.props;
    const compareDt = formatDate(day, "MM.dd.yyyy");
    if (holidays.has(compareDt)) {
      return holidays.get(compareDt).holidayNames.length > 0
        ? holidays.get(compareDt).holidayNames.join(", ")
        : "";
    }
    return "";
  };

  getTabIndex = (selected, preSelection) => {
    const selectedDay = selected || this.props.selected;
    const preSelectionDay = preSelection || this.props.preSelection;

    const tabIndex =
      this.isKeyboardSelected() ||
      (this.isSameDay(selectedDay) && isSameDay(preSelectionDay, selectedDay))
        ? 0
        : -1;

    return tabIndex;
  };

  // various cases when we need to apply focus to the preselected day
  // focus the day on mount/update so that keyboard navigation works while cycling through months with up or down keys (not for prev and next month buttons)
  // prevent focus for these activeElement cases so we don't pull focus from the input as the calendar opens
  handleFocusDay = (prevProps = {}) => {
    let shouldFocusDay = false;
    // only do this while the input isn't focused
    // otherwise, typing/backspacing the date manually may steal focus away from the input
    if (
      this.getTabIndex() === 0 &&
      !prevProps.isInputFocused &&
      this.isSameDay(this.props.preSelection)
    ) {
      // there is currently no activeElement and not inline
      if (!document.activeElement || document.activeElement === document.body) {
        shouldFocusDay = true;
      }
      // inline version:
      // do not focus on initial render to prevent autoFocus issue
      // focus after month has changed via keyboard
      if (this.props.inline && !this.props.shouldFocusDayInline) {
        shouldFocusDay = false;
      }
      // the activeElement is in the container, and it is another instance of Day
      if (
        this.props.containerRef &&
        this.props.containerRef.current &&
        this.props.containerRef.current.contains(document.activeElement) &&
        document.activeElement.classList.contains("react-datepicker__day")
      ) {
        shouldFocusDay = true;
      }
      //day is one of the non rendered duplicate days
      if (this.props.monthShowsDuplicateDaysEnd && this.isAfterMonth()) {
        shouldFocusDay = false;
      }
      if (this.props.monthShowsDuplicateDaysStart && this.isBeforeMonth()) {
        shouldFocusDay = false;
      }
    }

    shouldFocusDay && this.dayEl.current.focus({ preventScroll: true });
  };

  renderDayContents = () => {
    if (this.props.monthShowsDuplicateDaysEnd && this.isAfterMonth())
      return null;
    if (this.props.monthShowsDuplicateDaysStart && this.isBeforeMonth())
      return null;
    return this.props.renderDayContents
      ? this.props.renderDayContents(getDate(this.props.day), this.props.day)
      : getDate(this.props.day);
  };

  render = () => (
    <div
      ref={this.dayEl}
      className={this.getClassNames(this.props.day)}
      onKeyDown={this.handleOnKeyDown}
      onClick={this.handleClick}
      onMouseEnter={this.handleMouseEnter}
      tabIndex={this.getTabIndex()}
      aria-label={this.getAriaLabel()}
      role="option"
      title={this.getTitle()}
      aria-disabled={this.isDisabled()}
      aria-current={this.isCurrentDay() ? "date" : undefined}
      aria-selected={this.isSelected() || this.isInRange()}
    >
      {this.renderDayContents()}
      {this.getTitle() !== "" && (
        <span className="holiday-overlay">{this.getTitle()}</span>
      )}
    </div>
  );
}
