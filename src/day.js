/** @jsx React.DOM */

var Day = React.createClass({
  handleClick: function(event) {
    this.props.onSelect(this.props.day);
  },

  render: function() {
    classes = React.addons.classSet({
      'calendar-day': true,
      'selected': this.props.day.sameDay(this.props.selected),
      'this-month': this.props.day.sameMonth(this.props.date),
      'today': this.props.day.sameDay(moment())
    });

    return (
      <div className={classes} onClick={this.handleClick}>
        {this.props.day.day()}
      </div>
    );
  }
});

module.exports = Day;
