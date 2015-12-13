import some from "lodash/collection/some";
import map from "lodash/collection/map";
import DateUtil from "./util/date";
import YearDropdown from "./year_dropdown";
import Day from "./day";
import React from "react";

var Calendar = React.createClass({
  mixins: [require("react-onclickoutside")],

  propTypes: {
    weekdays: React.PropTypes.array,
    locale: React.PropTypes.string,
    moment: React.PropTypes.func.isRequired,
    dateFormat: React.PropTypes.string.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    handleClick: React.PropTypes.func.isRequired,
    hideCalendar: React.PropTypes.func.isRequired,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    startDate: React.PropTypes.object,
    endDate: React.PropTypes.object,
    excludeDates: React.PropTypes.array,
    includeDates: React.PropTypes.array,
    weekStart: React.PropTypes.string
  },

  handleClickOutside() {
    this.props.hideCalendar();
  },

  getInitialState() {
    return {
      date: this.localizeDateUtil(new DateUtil(this.props.selected).safeClone(this.props.moment()))
    };
  },

  getDefaultProps() {
    return {
      weekStart: "1"
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected === null) { return; }

    // When the selected date changed
    if (nextProps.selected !== this.props.selected) {
      this.setState({
        date: this.localizeDateUtil(new DateUtil(nextProps.selected).clone())
      });
    }
  },

  localizeDateUtil(dateUtil) {
    var thisMoment = dateUtil.moment();

    if (this.props.locale) { thisMoment.locale(this.props.locale); }
    if (this.props.weekStart) { thisMoment._locale._week.dow = this.props.weekStart; }

    return dateUtil;
  },

  increaseMonth() {
    this.setState({
      date: this.state.date.addMonth()
    });
  },

  decreaseMonth() {
    this.setState({
      date: this.state.date.subtractMonth()
    });
  },

  weeks() {
    return this.state.date.mapWeeksInMonth(this.renderWeek);
  },

  handleDayClick(day) {
    this.props.onSelect(day);
  },

  changeYear(year) {
    this.setState({
      date: this.state.date.changeYear(year)
    });
  },

  renderWeek(weekStart, key) {
    if (!weekStart.weekInMonth(this.state.date)) {
      return;
    }

    return (
      <div key={key}>
        {this.days(weekStart)}
      </div>
    );
  },

  renderDay(day, key) {
    var minDate = new DateUtil(this.props.minDate).safeClone(),
        maxDate = new DateUtil(this.props.maxDate).safeClone(),
        excludeDates,
        includeDates,
        disabled,
        inRange;

    if (this.props.excludeDates && Array.isArray(this.props.excludeDates)) {
      excludeDates = map(this.props.excludeDates, function(date) {
        return new DateUtil(date).safeClone();
      });
    }

    if (this.props.includeDates && Array.isArray(this.props.includeDates)) {
      includeDates = map(this.props.includeDates, function(date) {
        return new DateUtil(date).safeClone();
      });
    }

    disabled = day.isBefore(minDate) || day.isAfter(maxDate) ||
      some(excludeDates, function(xDay) { return day.sameDay(xDay); }) ||
      (includeDates && !some(includeDates, function(xDay) { return day.sameDay(xDay); }));

    if (this.props.startDate && this.props.endDate) {
      inRange = day.inRange(new DateUtil(this.props.startDate), new DateUtil(this.props.endDate));
    }

    return (
      <Day
        key={key}
        day={day}
        date={this.state.date}
        onClick={this.handleDayClick.bind(this, day)}
        selected={new DateUtil(this.props.selected)}
        inRange={inRange}
        disabled={disabled} />
    );
  },

  days(weekStart) {
    return weekStart.mapDaysInWeek(this.renderDay);
  },

  header() {
    var localeData = this.state.date.moment().localeData();
    var weekdays = localeData._weekdaysMin.slice(0);
    weekdays = weekdays.concat(weekdays.splice(0, localeData._week.dow));

    return weekdays.map(function(day, key) {
      return <div className="datepicker__day" key={key}>{day}</div>;
    });
  },

  render() {
    return (
      <div className="datepicker" onClick={this.props.handleClick}>
        <div className="datepicker__triangle"></div>
        <div className="datepicker__header">
          <a className="datepicker__navigation datepicker__navigation--previous"
              onClick={this.decreaseMonth}>
          </a>
          <h2 className="datepicker__current-month">
            {this.state.date.localeFormat(locale, this.props.dateFormat)}
          </h2>
          <YearDropdown
              onChange={this.changeYear}
              year={this.state.date.year()}
          />
          <a className="datepicker__navigation datepicker__navigation--next"
              onClick={this.increaseMonth}>
          </a>
          <div>
            {this.header()}
          </div>
        </div>
        <div className="datepicker__month">
          {this.weeks()}
        </div>
      </div>
    );
  }
});

module.exports = Calendar;
