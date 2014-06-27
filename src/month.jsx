/** @jsx React.DOM */

window.Month = React.createClass({
  weeks: function() {
    var firstDayToShow = this.props.month.clone().startOf('isoWeek');
    var weeks = [];

    for(var week = 0; week < 6; week++) {
      var firstDayInWeek = firstDayToShow.clone().add('weeks', week);

      weeks[week] = (
        <Week week={firstDayInWeek} month={this.props.month} />
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
