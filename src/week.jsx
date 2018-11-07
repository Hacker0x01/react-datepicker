import React from "react";
import PropTypes from "prop-types";
import Day from "./day";
import WeekNumber from "./week_number";
import * as utils from "./date_utils";

export default class Week extends React.Component {
  static get defaultProps() {
    return {
      shouldCloseOnSelect: true
    };
  }
  static propTypes = {
    disabledKeyboardNavigation: PropTypes.bool,
    day: PropTypes.object.isRequired,
    dayClassName: PropTypes.func,
    endDate: PropTypes.object,
    excludeDates: PropTypes.array,
    filterDate: PropTypes.func,
    formatWeekNumber: PropTypes.func,
    highlightDates: PropTypes.instanceOf(Map),
    includeDates: PropTypes.array,
    inline: PropTypes.bool,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    month: PropTypes.number,
    onDayClick: PropTypes.func,
    onDayMouseEnter: PropTypes.func,
    onWeekSelect: PropTypes.func,
    preSelection: PropTypes.object,
    selected: PropTypes.object,
    selectingDate: PropTypes.object,
    selectsEnd: PropTypes.bool,
    selectsStart: PropTypes.bool,
    showWeekNumber: PropTypes.bool,
    startDate: PropTypes.object,
    setOpen: PropTypes.func,
    shouldCloseOnSelect: PropTypes.bool,
    utcOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    renderDayContents: PropTypes.func,
    accessibleMode: PropTypes.bool
  };

  handleDayClick = (day, event) => {
    if (this.props.onDayClick) {
      this.props.onDayClick(day, event);
    }
  };

  handleDayMouseEnter = day => {
    if (this.props.onDayMouseEnter) {
      this.props.onDayMouseEnter(day);
    }
  };

  handleWeekClick = (day, weekNumber, event) => {
    if (typeof this.props.onWeekSelect === "function") {
      this.props.onWeekSelect(day, weekNumber, event);
    }
    if (this.props.shouldCloseOnSelect) {
      this.props.setOpen(false);
    }
  };

  formatWeekNumber = startOfWeek => {
    if (this.props.formatWeekNumber) {
      return this.props.formatWeekNumber(startOfWeek);
    }
    return utils.getWeek(startOfWeek);
  };

  renderDays = () => {
    const startOfWeek = utils.getStartOfWeek(utils.cloneDate(this.props.day));
    const days = [];
    const weekNumber = this.formatWeekNumber(startOfWeek);
    if (this.props.showWeekNumber) {
      const onClickAction = this.props.onWeekSelect
        ? this.handleWeekClick.bind(this, startOfWeek, weekNumber)
        : undefined;
      days.push(
        <WeekNumber key="W" weekNumber={weekNumber} onClick={onClickAction} />
      );
    }
    return days.concat(
      [0, 1, 2, 3, 4, 5, 6].map(offset => {
        const day = utils.addDays(utils.cloneDate(startOfWeek), offset);
        return (
          <Day
            key={offset}
            day={day}
            month={this.props.month}
            onClick={this.handleDayClick.bind(this, day)}
            onMouseEnter={this.handleDayMouseEnter.bind(this, day)}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            excludeDates={this.props.excludeDates}
            includeDates={this.props.includeDates}
            inline={this.props.inline}
            highlightDates={this.props.highlightDates}
            selectingDate={this.props.selectingDate}
            filterDate={this.props.filterDate}
            preSelection={this.props.preSelection}
            selected={this.props.selected}
            selectsStart={this.props.selectsStart}
            selectsEnd={this.props.selectsEnd}
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            dayClassName={this.props.dayClassName}
            utcOffset={this.props.utcOffset}
            renderDayContents={this.props.renderDayContents}
            disabledKeyboardNavigation={this.props.disabledKeyboardNavigation}
            accessibleMode={this.props.accessibleMode}
          />
        );
      })
    );
  };

  render() {
    return <div className="react-datepicker__week">{this.renderDays()}</div>;
  }
}
