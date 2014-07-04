/** @jsx React.DOM */

var Day = require('./day');

var Calendar = React.createClass({
  getInitialState: function() {
    return {
      date: this.props.selected.clone()
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      date: nextProps.selected.clone()
    });
  },

  increaseMonth: function() {
    this.setState({
      date: this.state.date.addMonth()
    });
  },

  decreaseMonth: function() {
    this.setState({
      date: this.state.date.subtractMonth()
    });
  },

  weeks: function() {
    return this.state.date.mapWeeksInMonth(this.renderWeek);
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

  renderDay: function(day, key) {
    return (
      <Day
        key={key}
        day={day}
        date={this.state.date}
        onSelect={this.props.onSelect}
        selected={this.props.selected} />
    );
  },

  days: function(weekStart) {
    return weekStart.mapDaysInWeek(this.renderDay);
  },

  render: function() {
    return (
      <div className="datepicker-calendar" onClick={this.props.onClick}>
        <div className="datepicker-calendar-triangle"></div>
        <div className="datepicker-calendar-header">
          <a className="datepicker-calendar-header-navigation-left"
              onClick={this.decreaseMonth}>
          </a>
          <span className="datepicker-calendar-header-month">
            {this.state.date.format("MMMM YYYY")}
          </span>
          <a className="datepicker-calendar-header-navigation-right"
              onClick={this.increaseMonth}>
          </a>
          <div>
            <div className="datepicker-calendar-header-day">Mo</div>
            <div className="datepicker-calendar-header-day">Tu</div>
            <div className="datepicker-calendar-header-day">We</div>
            <div className="datepicker-calendar-header-day">Th</div>
            <div className="datepicker-calendar-header-day">Fr</div>
            <div className="datepicker-calendar-header-day">Sa</div>
            <div className="datepicker-calendar-header-day">Su</div>
          </div>
        </div>
        <div className="datepicker-calendar-month">
          {this.weeks()}
        </div>
      </div>
    );
  }
});

module.exports = Calendar;
