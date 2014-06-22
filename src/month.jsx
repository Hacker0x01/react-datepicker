/** @jsx React.DOM */

window.Month = React.createClass({
  weeks: function() {
    var firstDayToShow = this.props.month.clone().startOf('week');
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
        {this.weeks()}
      </div>
    );
  }
});
