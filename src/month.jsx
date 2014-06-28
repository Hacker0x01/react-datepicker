/** @jsx React.DOM */

window.Month = React.createClass({
  firstDayOfMonth: function() {
    return this.props.date.clone().startOf('month');
  },

  weeks: function() {
    var firstDayToShow = this.firstDayOfMonth().startOf('isoWeek');
    var weeks = [];

    for(var week = 0; week < 6; week++) {
      var firstDayInWeek = firstDayToShow.clone().add('weeks', week);

      weeks[week] = (
        <Week key={week} week={firstDayInWeek} date={this.props.date} />
      );
    }

    return weeks;
  },

  render: function() {
    return (
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
        {this.weeks()}
      </div>
    );
  }
});
