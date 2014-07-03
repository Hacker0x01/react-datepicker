/** @jsx React.DOM */

window.DatePicker = React.createClass({
  getInitialState: function() {
    var selected = new DateUtil(moment());

    return {
      focus: false,
      selected: selected,
      value: selected.format("YYYY-MM-DD")
    }
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
    // Reset the value of this._dontBlur to it's default
    this._dontBlur = false;

    // If state.focus is still true, ignore the browser's blur
    if (this.state.focus) {
      this.refs.input.getDOMNode().focus();
    }

    // Give the browser some time to execute the possible click handlers
    //   (for when the user clicks inside of the calendar)
    setTimeout(function() {
      // If no handler set the value of this._dontBlur to true, we can safely
      //   assume that it's time to blur
      if (! this._dontBlur) {
        this.setState({
          focus: false
        });
      }
    }.bind(this), 50);
  },

  handleCalendarClick: function() {
    this._dontBlur = true;

    this.setState({
      focus: true
    });
  },

  handleSelect: function(date) {
    this._dontBlur = true;

    this.setSelected(date);
    this.hideCalendar();
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
            onSelect={this.handleSelect}
            onClick={this.handleCalendarClick} />
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
          onChange={this.handleInputChange} />
        {this.calendar()}
      </div>
    );
  }
});
