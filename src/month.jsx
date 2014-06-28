/** @jsx React.DOM */

window.Month = React.createClass({
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
        {
          this.props.date.mapWeeksInMonth(function(weekStart, key) {
            return (
              <Week key={key} week={weekStart} date={this.props.date} />
            );
          }, this)
        }
      </div>
    );
  }
});
