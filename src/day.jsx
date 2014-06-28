/** @jsx React.DOM */

window.Day = React.createClass({
  render: function() {
    classes = React.addons.classSet({
      'day': true,
      'selected': this.props.day.isSame(this.props.date, 'day'),
      'this-month': this.props.day.isSame(this.props.date, 'month'),
      'today': moment().isSame(this.props.day, 'day')
    });

    return (
      <div className={classes}>{this.props.day.date()}</div>
    );
  }
});
