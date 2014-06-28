/** @jsx React.DOM */

window.Day = React.createClass({
  render: function() {
    classes = React.addons.classSet({
      'day': true,
      'selected': this.props.day.sameDay(this.props.date),
      'this-month': this.props.day.sameMonth(this.props.date),
      'today': this.props.day.sameDay(moment())
    });

    return (
      <div className={classes}>{this.props.day.day()}</div>
    );
  }
});
