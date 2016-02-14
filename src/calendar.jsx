import YearDropdown from "./year_dropdown";
import Month from "./month";
import React from "react";
import { isSameDay } from "./date_utils";

function getDateInView({ moment, selected, minDate, maxDate }) {
  var current = moment();
  if (selected) {
    return selected;
  } else if (minDate && minDate.isAfter(current)) {
    return minDate;
  } else if (maxDate && maxDate.isBefore(current)) {
    return maxDate;
  } else {
    return current;
  }
}

var Calendar = React.createClass({
  mixins: [require("react-onclickoutside")],

  propTypes: {
    locale: React.PropTypes.string,
    moment: React.PropTypes.func.isRequired,
    dateFormat: React.PropTypes.string.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    onClickOutside: React.PropTypes.func.isRequired,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    startDate: React.PropTypes.object,
    endDate: React.PropTypes.object,
    excludeDates: React.PropTypes.array,
    includeDates: React.PropTypes.array,
    filterDate: React.PropTypes.func,
    showYearDropdown: React.PropTypes.bool
  },

  handleClickOutside(event) {
    this.props.onClickOutside(event);
  },

  getInitialState() {
    return {
      date: this.localizeMoment(getDateInView(this.props))
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected && !isSameDay(nextProps.selected, this.props.selected)) {
      this.setState({
        date: this.localizeMoment(nextProps.selected)
      });
    }
  },

  localizeMoment(date) {
    return date.clone().locale(this.props.locale || this.props.moment.locale());
  },

  increaseMonth() {
    this.setState({
      date: this.state.date.clone().add(1, "month")
    });
  },

  decreaseMonth() {
    this.setState({
      date: this.state.date.clone().subtract(1, "month")
    });
  },

  handleDayClick(day) {
    this.props.onSelect(day);
  },

  changeYear(year) {
    this.setState({
      date: this.state.date.clone().set("year", year)
    });
  },

  header() {
    const startOfWeek = this.state.date.clone().startOf("week");
    return [0, 1, 2, 3, 4, 5, 6].map(offset => {
      const day = startOfWeek.clone().add(offset, "days");
      return (
        <div key={offset} className="datepicker__day">
          {day.localeData().weekdaysMin(day)}
        </div>
      );
    });
  },

  renderCurrentMonth() {
    var classes = ["datepicker__current-month"];
    if (this.props.showYearDropdown) {
      classes.push("datepicker__current-month--hasYearDropdown");
    }
    return (
      <div className={classes.join(" ")}>
        {this.state.date.format(this.props.dateFormat)}
      </div>
    );
  },

  renderYearDropdown() {
    if (!this.props.showYearDropdown) {
      return;
    }
    return (
      <YearDropdown
        onChange={this.changeYear}
        year={this.state.date.year()} />
    );
  },

  renderTodayButton() {
    const { moment, onSelect } = this.props;

    if (!this.props.todayButton) {
      return;
    }

    return (
      <div className="datepicker__today-button" onClick={() => onSelect(moment())}>
        {this.props.todayButton}
      </div>
    );
  },

  render() {
    return (
      <div className="datepicker">
        <div className="datepicker__triangle"></div>
        <div className="datepicker__header">
          <a className="datepicker__navigation datepicker__navigation--previous"
              onClick={this.decreaseMonth}>
          </a>
          {this.renderCurrentMonth()}
          {this.renderYearDropdown()}
          <a className="datepicker__navigation datepicker__navigation--next"
              onClick={this.increaseMonth}>
          </a>
          <div>
            {this.header()}
          </div>
        </div>
        <Month
          day={this.state.date}
          onDayClick={this.handleDayClick}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          excludeDates={this.props.excludeDates}
          includeDates={this.props.includeDates}
          filterDate={this.props.filterDate}
          selected={this.props.selected}
          startDate={this.props.startDate}
          endDate={this.props.endDate} />
        {this.renderTodayButton()}
      </div>
    );
  }
});

module.exports = Calendar;
