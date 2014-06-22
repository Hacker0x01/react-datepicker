/** @jsx React.DOM */

window.Day = React.createClass({
  className: function() {
    classNames = ['day'];

    if(this.props.day.isSame(this.props.month, 'month')) {
      classNames.push('this-month');
    }

    if(moment().isSame(this.props.day, 'day')) {
      classNames.push('today');
    }

    return classNames.join(' ');
  },

  render: function() {
    return (
      <div className={this.className()}>{this.props.day.date()}</div>
    );
  }
});
