/** @jsx React.DOM */

window.Week = React.createClass({
  render: function() {
    if(! this.props.week.weekInMonth(this.props.date)) {
      return <div />;
    }

    return (
      <div className="week">
        {
          this.props.week.mapDaysInWeek(function(day, key) {
            return (
              <Day key={key} day={day} date={this.props.date} />
            );
          }, this)
        }
      </div>
    );
  }
});
