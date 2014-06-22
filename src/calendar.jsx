/** @jsx React.DOM */

window.Calendar = React.createClass({
  getInitialState: function() {
    return {
      date: moment().startOf('month')
    };
  },

  increaseMonth: function() {
    this.setState({
      date: this.state.date.add('month', 1)
    });
  },

  decreaseMonth: function() {
    this.setState({
      date: this.state.date.subtract('month', 1)
    });
  },

  render: function() {
    return (
      <div className="calendar">
        <div className="calendar-header">
          <a className="calendar-month-navigation-left" onClick={this.decreaseMonth}>
            &laquo;
          </a>
          <span className="calendar-current-month">
            {this.state.date.format("MMMM YYYY")}
          </span>
          <a className="calendar-month-navigation-right" onClick={this.increaseMonth}>
            &raquo;
          </a>
        </div>
        <Month month={this.state.date} />
      </div>
    );
  }
});
