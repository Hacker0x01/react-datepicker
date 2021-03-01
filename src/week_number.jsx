// @flow
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { isSameDay } from "./date_utils";

export default class WeekNumber extends React.Component<{
  weekNumber: number,
  date: date,
  selected: date,
  preSelection: date,
  onClick?: Function,
  ariaLabelPrefix?: string,
  showWeekPicker?: boolean,
  showWeekNumber?: boolean
}> {
  static propTypes = {
    weekNumber: PropTypes.number.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    selected: PropTypes.instanceOf(Date),
    preSelection: PropTypes.instanceOf(Date),
    onClick: PropTypes.func,
    showWeekPicker: PropTypes.bool,
    showWeekNumber: PropTypes.bool
  };

  handleClick = (event: any) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  isSameDay = other => isSameDay(this.props.date, other)

  isKeyboardSelected = () =>
    !this.props.disabledKeyboardNavigation &&
    !this.isSameDay(this.props.selected) &&
    this.isSameDay(this.props.preSelection);

  getTabIndex = () =>
    this.props.showWeekPicker && this.props.showWeekNumber &&
    (
      this.isKeyboardSelected() ||
      (this.isSameDay(this.props.selected) && isSameDay(this.props.preSelection, this.props.selected))
    )
      ? 0
      : -1;


  render() {
    const { weekNumber, ariaLabelPrefix = "week ", onClick, selected } = this.props;

    const weekNumberClasses = {
      "react-datepicker__week-number": true,
      "react-datepicker__week-number--clickable": !!onClick,
      "react-datepicker__week-number--selected": this.isSameDay(selected),
      "react-datepicker__week-number--keyboard-selected": this.isKeyboardSelected()
    };
    return (
      <div
        className={classnames(weekNumberClasses)}
        tabIndex={this.getTabIndex()}
        aria-label={`${ariaLabelPrefix} ${this.props.weekNumber}`}
        onClick={this.handleClick}
      >
        {weekNumber}
      </div>
    );
  }
}
