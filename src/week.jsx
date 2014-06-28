/** @jsx React.DOM */

window.Week = React.createClass({
  startsInMonth: function() {
    var firstDayInWeek = this.props.week.clone();

    return firstDayInWeek.isSame(this.props.date, 'month');
  },

  endsInMonth: function() {
    var lastDayInWeek = this.props.week.clone().isoWeekday(7);

    return lastDayInWeek.isSame(this.props.date, 'month');
  },

  days: function() {
    if(! this.startsInMonth() && ! this.endsInMonth()) {
      return;
    }

    var days = [];

    for(var day_number = 0; day_number < 7; day_number++) {
      var day = this.props.week.clone().add('days', day_number);

      days[day_number] = (
        <Day key={day_number} day={day} date={this.props.date} />
      );
    }

    return days;
  },

  render: function() {
    return (
      <div className="week">
        {this.days()}
      </div>
    );
  }
});
