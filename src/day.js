/** @jsx React.DOM */

var Day = React.createClass({
  test: function() {
    // debugger
  },
  render: function() {
    classes = React.addons.classSet({
      'datepicker__day': true,
      'datepicker__day--previouslyselected': this.props.day.sameDay(this.props.startSelected),
      'datepicker__day--selected': this.props.day.sameDay(this.props.selected),
      'datepicker__day--this-month': this.props.day.sameMonth(this.props.date),
      'datepicker__day--other-month': !this.props.day.sameMonth(this.props.date),
      'datepicker__day--today': this.props.day.sameDay(moment()),
      'datepicker__day--between': this.props.day.isBefore(this.props.selected) && this.props.day.isAfter(this.props.startSelected)
    });

    return (
      <div className={classes} onClick={this.props.onClick} onMouseEnter={this.test} onMouseLeave={this.test}>
        {this.props.day.day()}
      </div>
    );
  }
});

module.exports = Day;
