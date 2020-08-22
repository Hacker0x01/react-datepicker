import React from "react";
import PropTypes from "prop-types";
import { getYear, newDate } from "./date_utils";
import * as utils from "./date_utils";
import classnames from "classnames";

export default class Year extends React.Component {
  static propTypes = {
    date: PropTypes.string,
    disabledKeyboardNavigation: PropTypes.bool,
    onDayClick: PropTypes.func,
    preSelection: PropTypes.instanceOf(Date),
    selected: PropTypes.object,
    inline: PropTypes.bool,
    maxDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    yearItemNumber: PropTypes.number
  };

  constructor(props) {
    super(props);
  }

  handleYearClick = (day, event) => {
    if (this.props.onDayClick) {
      this.props.onDayClick(day, event);
    }
  };

  isSameDay = (y, other) => utils.isSameDay(y, other);

  isKeyboardSelected = y => {
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

  getYearClassNames = y => {
    const { minDate, maxDate, selected } = this.props;
    return classnames("react-datepicker__year-text", {
      "react-datepicker__year-text--selected": y === getYear(selected),
      "react-datepicker__year-text--disabled":
        (minDate || maxDate) && utils.isYearDisabled(y, this.props),
      "react-datepicker__year-text--keyboard-selected": this.isKeyboardSelected(
        y
      ),
      "react-datepicker__year-text--today": y === getYear(newDate()),
    });
  };

  render() {
    const yearsList = [];
    const { date, yearItemNumber } = this.props;
    const { startPeriod, endPeriod } = utils.getYearsPeriod(date, yearItemNumber);

    for (let y = startPeriod; y <= endPeriod; y++) {
      yearsList.push(
        <div
          onClick={ev => {
            this.onYearClick(ev, y);
          }}
          className={this.getYearClassNames(y)}
          key={y}
        >
          {y}
        </div>
      );
    }
    return (
      <div className="react-datepicker__year">
        <div className="react-datepicker__year-wrapper">{yearsList}</div>
      </div>
    );
  }
}
