/** @jsx React.DOM */

window.Week = React.createClass({
  startsInMonth: function() {
    var firstDayInWeek = this.props.week.clone();

    return firstDayInWeek.isSame(this.props.month, 'month');
  },

  endsInMonth: function() {
    var lastDayInWeek = this.props.week.clone().day(6);

    return lastDayInWeek.isSame(this.props.month, 'month');
  },

  days: function() {
    if(! this.startsInMonth() && ! this.endsInMonth()) {
      return;
    }

    var days = [];

    for(var day = 0; day < 7; day++) {
      var date = this.props.week.clone().add('days', day);
      days[day] = <Day day={date} month={this.props.month} />;
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
