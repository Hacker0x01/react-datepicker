/** @jsx React.DOM */

var Popover   = require('./popover');
var DateUtil  = require('./util/date');
var Calendar  = require('./calendar');
var DateInput = require('./date_input');

var DatePicker = React.createClass({
  getInitialState: function() {
    return {
      focus: false
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
    this.setState({
      focus: !! this._shouldBeFocussed
    });

    if (!! this._shouldBeFocussed) {
      // Firefox doesn't support immediately focussing inside of blur
      setTimeout(function() {
        this.setState({
          focus: true
        });
      }.bind(this), 0);
    }

    // Reset the value of this._shouldBeFocussed to it's default
    this._shouldBeFocussed = false;
  },

  handleCalendarMouseDown: function() {
    this._shouldBeFocussed = true;
  },

  handleSelect: function(date) {
    this.setSelected(date);

    setTimeout(function(){
      this.hideCalendar();
    }.bind(this), 200);
  },

  setSelected: function(date) {
    this.props.onChange(date.moment());
  },

  calendar: function() {
    if (this.state.focus) {
      return (
        <Popover>
          <Calendar
            selected={this.props.selected}
            onSelect={this.handleSelect}
            onMouseDown={this.handleCalendarMouseDown} />
        </Popover>
      );
    }
  },

  render: function() {
    return (
      <div>
        <DateInput
          date={this.props.selected}
          focus={this.state.focus}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          handleEnter={this.hideCalendar}
          setSelected={this.setSelected} />
        {this.calendar()}
      </div>
    );
  }
});

module.exports = DatePicker;
