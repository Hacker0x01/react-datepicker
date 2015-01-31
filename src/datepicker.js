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
    setTimeout(function() {
      this.setState({
        focus: false
      });
    }.bind(this), 2000);
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

  onInputClick: function() {
    this.setState({
      focus: true
    });
  },

  calendar: function() {
    if (this.state.focus) {
      return (
        <Popover>
          <Calendar
            startSelected={this.props.startSelected}
            selected={this.props.selected}
            onSelect={this.handleSelect}
            whatDo={this.props.whatDo}
            hideCalendar={this.hideCalendar} />
        </Popover>
      );
    }
  },

  render: function() {
    return (
      <div className="formy">
        <DateInput
          date={this.props.selected}
          dateFormat={this.props.dateFormat}
          focus={this.state.focus}
          onFocus={this.handleFocus}
          handleClick={this.onInputClick}
          handleEnter={this.hideCalendar}
          setSelected={this.setSelected}
          hideCalendar={this.hideCalendar} />
        {this.calendar()}
      </div>
    );
  }
});

module.exports = DatePicker;
