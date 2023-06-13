import React from "react";
import PropTypes from "prop-types";
import { getYear, newDate } from "./date_utils";
import * as utils from "./date_utils";
import classnames from "classnames";

export default class Year extends React.Component {
  static propTypes = {
    clearSelectingDate: PropTypes.func,
    date: PropTypes.instanceOf(Date),
    disabledKeyboardNavigation: PropTypes.bool,
    endDate: PropTypes.instanceOf(Date),
    onDayClick: PropTypes.func,
    preSelection: PropTypes.instanceOf(Date),
    setPreSelection: PropTypes.func,
    selected: PropTypes.object,
    inline: PropTypes.bool,
    maxDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    onYearMouseEnter: PropTypes.func.isRequired,
    onYearMouseLeave: PropTypes.func.isRequired,
    selectingDate: PropTypes.instanceOf(Date),
    selectsEnd: PropTypes.bool,
    selectsStart: PropTypes.bool,
    selectsRange: PropTypes.bool,
    startDate: PropTypes.instanceOf(Date),
    excludeDates: PropTypes.array,
    includeDates: PropTypes.array,
    filterDate: PropTypes.func,
    yearItemNumber: PropTypes.number,
  };

  constructor(props) {
    super(props);
  }

  YEAR_REFS = [...Array(this.props.yearItemNumber)].map(() =>
    React.createRef()
  );

  isDisabled = (date) => utils.isDayDisabled(date, this.props);

  isExcluded = (date) => utils.isDayExcluded(date, this.props);

  selectingDate = () => this.props.selectingDate ?? this.props.preSelection;

  updateFocusOnPaginate = (refIndex) => {
    const waitForReRender = function () {
      this.YEAR_REFS[refIndex].current.focus();
    }.bind(this);

    window.requestAnimationFrame(waitForReRender);
  };

  handleYearClick = (day, event) => {
    if (this.props.onDayClick) {
      this.props.onDayClick(day, event);
    }
  };

  handleYearNavigation = (newYear, newDate) => {
    const { date, yearItemNumber } = this.props;
    const { startPeriod } = utils.getYearsPeriod(date, yearItemNumber);

    if (this.isDisabled(newDate) || this.isExcluded(newDate)) return;
    this.props.setPreSelection(newDate);

    if (newYear - startPeriod === -1) {
      this.updateFocusOnPaginate(yearItemNumber - 1);
    } else if (newYear - startPeriod === yearItemNumber) {
      this.updateFocusOnPaginate(0);
    } else this.YEAR_REFS[newYear - startPeriod].current.focus();
  };

  isSameDay = (y, other) => utils.isSameDay(y, other);

  isCurrentYear = (y) => y === getYear(newDate());

  isRangeStart = (y) =>
    this.props.startDate &&
    this.props.endDate &&
    utils.isSameYear(utils.setYear(newDate(), y), this.props.startDate);

  isRangeEnd = (y) =>
    this.props.startDate &&
    this.props.endDate &&
    utils.isSameYear(utils.setYear(newDate(), y), this.props.endDate);

  isInRange = (y) =>
    utils.isYearInRange(y, this.props.startDate, this.props.endDate);

  isInSelectingRange = (y) => {
    const { selectsStart, selectsEnd, selectsRange, startDate, endDate } =
      this.props;

    if (
      !(selectsStart || selectsEnd || selectsRange) ||
      !this.selectingDate()
    ) {
      return false;
    }
    if (selectsStart && endDate) {
      return utils.isYearInRange(y, this.selectingDate(), endDate);
    }
    if (selectsEnd && startDate) {
      return utils.isYearInRange(y, startDate, this.selectingDate());
    }
    if (selectsRange && startDate && !endDate) {
      return utils.isYearInRange(y, startDate, this.selectingDate());
    }
    return false;
  };

  isSelectingRangeStart = (y) => {
    if (!this.isInSelectingRange(y)) {
      return false;
    }

    const { startDate, selectsStart } = this.props;
    const _year = utils.setYear(newDate(), y);

    if (selectsStart) {
      return utils.isSameYear(_year, this.selectingDate());
    }
    return utils.isSameYear(_year, startDate);
  };

  isSelectingRangeEnd = (y) => {
    if (!this.isInSelectingRange(y)) {
      return false;
    }

    const { endDate, selectsEnd, selectsRange } = this.props;
    const _year = utils.setYear(newDate(), y);

    if (selectsEnd || selectsRange) {
      return utils.isSameYear(_year, this.selectingDate());
    }
    return utils.isSameYear(_year, endDate);
  };

  isKeyboardSelected = (y) => {
    const date = utils.getStartOfYear(utils.setYear(this.props.date, y));
    return (
      !this.props.disabledKeyboardNavigation &&
      !this.props.inline &&
      !utils.isSameDay(date, utils.getStartOfYear(this.props.selected)) &&
      utils.isSameDay(date, utils.getStartOfYear(this.props.preSelection))
    );
  };

  onYearClick = (e, y) => {
    const { date } = this.props;
    this.handleYearClick(utils.getStartOfYear(utils.setYear(date, y)), e);
  };

  onYearKeyDown = (e, y) => {
    const { key } = e;
    if (!this.props.disabledKeyboardNavigation) {
      switch (key) {
        case "Enter":
          this.onYearClick(e, y);
          this.props.setPreSelection(this.props.selected);
          break;
        case "ArrowRight":
          this.handleYearNavigation(
            y + 1,
            utils.addYears(this.props.preSelection, 1)
          );
          break;
        case "ArrowLeft":
          this.handleYearNavigation(
            y - 1,
            utils.subYears(this.props.preSelection, 1)
          );
          break;
      }
    }
  };

  getYearClassNames = (y) => {
    const {
      minDate,
      maxDate,
      selected,
      excludeDates,
      includeDates,
      filterDate,
    } = this.props;
    return classnames("react-datepicker__year-text", {
      "react-datepicker__year-text--selected": y === getYear(selected),
      "react-datepicker__year-text--disabled":
        (minDate || maxDate || excludeDates || includeDates || filterDate) &&
        utils.isYearDisabled(y, this.props),
      "react-datepicker__year-text--keyboard-selected":
        this.isKeyboardSelected(y),
      "react-datepicker__year-text--range-start": this.isRangeStart(y),
      "react-datepicker__year-text--range-end": this.isRangeEnd(y),
      "react-datepicker__year-text--in-range": this.isInRange(y),
      "react-datepicker__year-text--in-selecting-range":
        this.isInSelectingRange(y),
      "react-datepicker__year-text--selecting-range-start":
        this.isSelectingRangeStart(y),
      "react-datepicker__year-text--selecting-range-end":
        this.isSelectingRangeEnd(y),
      "react-datepicker__year-text--today": this.isCurrentYear(y),
    });
  };

  getYearTabIndex = (y) => {
    if (this.props.disabledKeyboardNavigation) return "-1";
    const preSelected = utils.getYear(this.props.preSelection);

    return y === preSelected ? "0" : "-1";
  };

  getYearContainerClassNames = () => {
    const { selectingDate, selectsStart, selectsEnd, selectsRange } =
      this.props;
    return classnames("react-datepicker__year", {
      "react-datepicker__year--selecting-range":
        selectingDate && (selectsStart || selectsEnd || selectsRange),
    });
  };

  render() {
    const yearsList = [];
    const { date, yearItemNumber, onYearMouseEnter, onYearMouseLeave } =
      this.props;
    const { startPeriod, endPeriod } = utils.getYearsPeriod(
      date,
      yearItemNumber
    );

    for (let y = startPeriod; y <= endPeriod; y++) {
      yearsList.push(
        <div
          ref={this.YEAR_REFS[y - startPeriod]}
          onClick={(ev) => {
            this.onYearClick(ev, y);
          }}
          onKeyDown={(ev) => {
            this.onYearKeyDown(ev, y);
          }}
          tabIndex={this.getYearTabIndex(y)}
          className={this.getYearClassNames(y)}
          onMouseEnter={(ev) => onYearMouseEnter(ev, y)}
          onMouseLeave={(ev) => onYearMouseLeave(ev, y)}
          key={y}
          aria-current={this.isCurrentYear(y) ? "date" : undefined}
        >
          {y}
        </div>
      );
    }

    return (
      <div className={this.getYearContainerClassNames()}>
        <div
          className="react-datepicker__year-wrapper"
          onMouseLeave={this.props.clearSelectingDate}
        >
          {yearsList}
        </div>
      </div>
    );
  }
}
