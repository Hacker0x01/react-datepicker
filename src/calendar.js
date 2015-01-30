/** @jsx React.DOM */

var Day = require('./day');
var DateUtil = require('./util/date');

var Calendar = React.createClass({
  mixins: [require('react-onclickoutside')],

  handleClickOutside: function() {
    this.props.hideCalendar();
  },

  getInitialState: function() {
    var date = new DateUtil(this.props.selected).clone();
    return {
      date: date,
      nextMonth: new DateUtil(date._date.clone().add(1, 'month'))
    };
  },

  componentWillReceiveProps: function(nextProps) {
    // When the selected date changed
    if (nextProps.selected !== this.props.selected) {
      var date = new DateUtil(nextProps.selected).clone();
      this.setState({
        date: date,
        nextMonth: new DateUtil(date._date.clone().add(1, 'month'))
      });
    }
  },

  increaseMonth: function() {
    this.setState({
      date: this.state.date.addMonth(),
      nextMonth: this.state.nextMonth.addMonth()
    });
  },

  decreaseMonth: function() {
    this.setState({
      date: this.state.date.subtractMonth(),
      nextMonth: this.state.nextMonth.subtractMonth()
    });
  },

  weeks: function() {
    return this.state.date.mapWeeksInMonth(this.renderWeek);
  },

  nextMonthWeeks: function() {
    return this.state.nextMonth.mapWeeksInMonth(this.renderNextMonthWeek);
  },

  handleDayClick: function(day) {
    this.props.onSelect(day);
  },

  renderWeek: function(weekStart, key) {
    if(! weekStart.weekInMonth(this.state.date)) {
      return;
    }

    return (
      <div key={key} className="week">
        {this.days(weekStart)}
      </div>
    );
  },

  renderNextMonthWeek: function(weekStart, key) {
    if(! weekStart.weekInMonth(this.state.nextMonth)) {
      return;
    }

    return (
      <div key={key} className="week">
        {this.days(weekStart)}
      </div>
    );
  },

  renderDay: function(day, key) {
    return (
      <Day
        key={key}
        day={day}
        date={this.state.date}
        whatDo={this.props.whatDo}
        onClick={this.handleDayClick.bind(this, day)}
        selected={new DateUtil(this.props.selected)}
        startSelected={new DateUtil(this.props.startSelected)} />
    );
  },

  days: function(weekStart) {
    return weekStart.mapDaysInWeek(this.renderDay);
  },

  render: function() {
    return (
      <div className="datepicker">
        <div className="datepicker__triangle"></div>
        <div className="datepicker__header">
          <a className="datepicker__navigation datepicker__navigation--previous"
              onClick={this.decreaseMonth}>
          </a>
          <div className="currentMonth">
            <span className="datepicker__current-month">
              {this.state.date.format("MMMM YYYY")}
            </span>
            <a className="datepicker__navigation datepicker__navigation--next"
                onClick={this.increaseMonth}>
            </a>
            <div>
              <div className="datepicker__day">Mo</div>
              <div className="datepicker__day">Tu</div>
              <div className="datepicker__day">We</div>
              <div className="datepicker__day">Th</div>
              <div className="datepicker__day">Fr</div>
              <div className="datepicker__day">Sa</div>
              <div className="datepicker__day">Su</div>
            </div>
            <div className="datepicker__month">
              {this.weeks()}
            </div>
          </div>
          <div className="nextMonth">
            <span className="datepicker__current-month">
              {this.state.nextMonth.format("MMMM YYYY")}
            </span>
            <a className="datepicker__navigation datepicker__navigation--next"
                onClick={this.increaseMonth}>
            </a>
            <div>
              <div className="datepicker__day">Mo</div>
              <div className="datepicker__day">Tu</div>
              <div className="datepicker__day">We</div>
              <div className="datepicker__day">Th</div>
              <div className="datepicker__day">Fr</div>
              <div className="datepicker__day">Sa</div>
              <div className="datepicker__day">Su</div>
            </div>
            <div className="datepicker__month">
              {this.nextMonthWeeks()}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Calendar;
