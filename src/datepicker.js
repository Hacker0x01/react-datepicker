/** @jsx React.DOM */

var DateUtil = require('./util/date');
var Popover  = require('./popover');
var Calendar = require('./calendar');

var DatePicker = React.createClass({
  getInitialState: function() {
    var selected = new DateUtil(moment());

    return {
      focus: false,
      selected: selected,
      value: selected.format("YYYY-MM-DD")
    };
  },

  handleFocus: function() {
    this.setState({
      focus: true
    });
  },

  hideCalendar: function() {
    this.setState({
      focus: false
    });
  },

  handleBlur: function() {
    this._blurTimeout = setTimeout(this.hideCalendar, 20);
  },

  handleSelect: function(date) {
    window.clearTimeout(this._blurTimeout);

    this.setSelected(date);

    this.setState({
      focus: false
    });
  },

  setSelected: function(date) {
    this.setState({
      selected: date,
      value: date.format("YYYY-MM-DD")
    });
  },

  inputValue: function() {
    return this.state.selected.format("YYYY-MM-DD");
  },

  calendar: function() {
    if (this.state.focus) {
      return (
        <Popover>
          <Calendar
            selected={this.state.selected}
            onSelect={this.handleSelect}/>
        </Popover>
      );
    }
  },

  handleInputChange: function(event) {
    var date = moment(event.target.value, "YYYY-MM-DD");

    this.setState({
      value: event.target.value
    });

    if(date.isValid()) {
      this.setState({
        selected: new DateUtil(date)
      });
    }
  },

  render: function() {
    return (
      <div>
        <input
          type="text"
          value={this.state.value}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onChange={this.handleInputChange} />
        {this.calendar()}
      </div>
    );
  }
});

module.exports = DatePicker;
