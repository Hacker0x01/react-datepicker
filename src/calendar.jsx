/** @jsx React.DOM */

window.Calendar = React.createClass({
  getInitialState: function() {
    return {
      date: new DateUtil(moment())
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

  render: function() {
    return (
      <div className="calendar">
        <div className="calendar-header">
          <a className="calendar-month-navigation-left"
              onClick={this.decreaseMonth}>
            &laquo;
          </a>
          <span className="calendar-current-month">
            {this.state.date.format("MMMM YYYY")}
          </span>
          <a className="calendar-month-navigation-right"
              onClick={this.increaseMonth}>
            &raquo;
          </a>
        </div>
        <div className="month">
          <div>
            <div className="day head">MO</div>
            <div className="day head">TU</div>
            <div className="day head">WE</div>
            <div className="day head">TH</div>
            <div className="day head">FR</div>
            <div className="day head">SA</div>
            <div className="day head">SU</div>
          </div>
          {
            this.state.date.mapWeeksInMonth(function(weekStart, key) {
              if(! weekStart.weekInMonth(this.state.date)) {
                return;
              }

              return (
                <div className="week">
                  {
                    weekStart.mapDaysInWeek(function(day, key) {
                      return (
                        <Day key={key} day={day} date={this.state.date} />
                      );
                    }, this)
                  }
                </div>
              );
            }, this)
          }
        </div>
      </div>
    );
  }
});
