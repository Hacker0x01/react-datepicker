/** @jsx React.DOM */

var Day = React.createClass({
  render: function() {
    classes = React.addons.classSet({
      'datepicker__day': true,
      'datepicker__day--selected': this.props.day.sameDay(this.props.selected),
      'datepicker__day--this-month': this.props.day.sameMonth(this.props.date),
      'datepicker__day--today': this.props.day.sameDay(moment())
    });

    return (
      <div className={classes} onClick={this.props.onClick}>
        {this.props.day.day()}
      </div>
    );
  }
});

module.exports = Day;
