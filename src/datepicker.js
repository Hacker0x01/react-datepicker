/** @jsx React.DOM */

var Popover  = require('./popover');
var DateUtil = require('./util/date');
var Calendar = require('./calendar');

var DatePicker = React.createClass({
  getInitialState: function() {
    return {
      focus: false,
      value: this.props.selected.format("YYYY-MM-DD")
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
        this.refs.input.getDOMNode().focus();
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
    this.setState({
      value: date.format("YYYY-MM-DD")
    });

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

  handleInputChange: function(event) {
    var date = moment(event.target.value, "YYYY-MM-DD", true);

    this.setState({
      value: event.target.value
    });

    if (date.isValid()) {
      this.setSelected(new DateUtil(date));
    }
  },

  componentDidUpdate: function() {
    if (this.state.focus) {
      this.refs.input.getDOMNode().focus();
    } else {
      this.refs.input.getDOMNode().blur();
    }
  },

  render: function() {
    return (
      <div>
        <input
          ref="input"
          type="text"
          value={this.state.value}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onChange={this.handleInputChange}
          className="datepicker-input" />
        {this.calendar()}
      </div>
    );
  }
});

module.exports = DatePicker;
