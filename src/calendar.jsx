/** @jsx React.DOM */

window.Calendar = React.createClass({
  getInitialState: function() {
    return {
      date: this.props.selected.clone()
    };
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
      <div className="calendar">
        <div className="calendar-triangle"></div>
        <div className="calendar-header">
          <a className="calendar-header-navigation-left"
              onClick={this.decreaseMonth}>
            <i className="icon-backward"></i>
          </a>
          <span className="calendar-header-month">
            {this.state.date.format("MMMM YYYY")}
          </span>
          <a className="calendar-header-navigation-right"
              onClick={this.increaseMonth}>
            <i className="icon-forward"></i>
          </a>
          <div>
            <div className="calendar-header-day">MO</div>
            <div className="calendar-header-day">TU</div>
            <div className="calendar-header-day">WE</div>
            <div className="calendar-header-day">TH</div>
            <div className="calendar-header-day">FR</div>
            <div className="calendar-header-day">SA</div>
            <div className="calendar-header-day">SU</div>
          </div>
        </div>
        <div className="calendar-month">
          {this.weeks()}
        </div>
      </div>
    );
  }
});
