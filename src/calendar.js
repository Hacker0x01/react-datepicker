/** @jsx React.DOM */

var Day = require('./day');
var DateUtil = require('./util/date');

var Calendar = React.createClass({
  getInitialState: function() {
    return {
      date: new DateUtil(this.props.selected).clone()
    };
  },

  componentWillReceiveProps: function(nextProps) {
    // When the selected date changed
    if (nextProps.selected !== this.props.selected) {
      this.setState({
        date: new DateUtil(nextProps.selected).clone()
      });
    }
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

  handleDayClick: function(day) {
    this.props.onSelect(day);
  },

  renderWeek: function(weekStart, key) {
    if(! weekStart.weekInMonth(this.state.date)) {
      return;
    }

    return (
      <div key={key}>
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
        onClick={this.handleDayClick.bind(this, day)}
        selected={new DateUtil(this.props.selected)} />
    );
  },

  days: function(weekStart) {
    return weekStart.mapDaysInWeek(this.renderDay);
  },

  render: function() {
    return (
      <div className="datepicker" onMouseDown={this.props.onMouseDown}>
        <div className="datepicker__triangle"></div>
        <div className="datepicker__header">
          <a className="datepicker__navigation datepicker__navigation--previous"
              onClick={this.decreaseMonth}>
          </a>
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
        </div>
        <div className="datepicker__month">
          {this.weeks()}
        </div>
      </div>
    );
  }
});

module.exports = Calendar;
