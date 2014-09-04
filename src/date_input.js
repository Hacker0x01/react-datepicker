/** @jsx React.DOM */

var DateUtil = require('./util/date');

var DateInput = React.createClass({
  getInitialState: function() {
    return {
      value: this.props.date.format("YYYY-MM-DD")
    };
  },

  componentDidMount: function() {
    this.toggleFocus(this.props.focus);
  },

  componentWillReceiveProps: function(newProps) {
    this.toggleFocus(newProps.focus);

    this.setState({
      value: newProps.date.format("YYYY-MM-DD")
    });
  },

  componentDidUpdate: function() {
    if (this.props.focus) {
      var el = this.refs.input.getDOMNode();

      if (typeof this.state.selectionStart == "number")
        el.selectionStart = this.state.selectionStart;

      if (typeof this.state.selectionEnd == "number")
        el.selectionEnd = this.state.selectionEnd;
    }
  },

  toggleFocus: function(focus) {
    if (focus) {
      this.refs.input.getDOMNode().focus();
    } else {
      this.refs.input.getDOMNode().blur();
    }
  },

  handleChange: function(event) {
    var date = moment(event.target.value, "YYYY-MM-DD", true);

    this.setState({
      value: event.target.value
    });

    if (this.isValueAValidDate()) {
      this.props.setSelected(new DateUtil(date));
    }
  },

  isValueAValidDate: function() {
    var date = moment(event.target.value, "YYYY-MM-DD", true);

    return date.isValid();
  },

  handleKeyDown: function(event) {
    switch(event.key) {
    case "Enter":
      event.preventDefault();
      this.props.handleEnter();
      break;
    case "ArrowUp":
    case "ArrowDown":
      event.preventDefault();
      this.handleArrowUpDown(event.key);
      break;
    }
  },

  handleArrowUpDown: function(key) {
    if (! this.isValueAValidDate())
      return;

    var el = this.refs.input.getDOMNode();

    this.setState({
      selectionStart: el.selectionStart,
      selectionEnd: el.selectionEnd
    });

    var step = key === "ArrowUp" ? 1 : -1;

    var selectedDatePart = this.getSelectedDatePart(el.selectionStart, el.selectionEnd);
    var newDate = this.stepSelectedDatePart(selectedDatePart, step);

    this.props.setSelected(newDate);
  },

  stepSelectedDatePart: function(selectedDatePart, step) {
    var clonedDate = this.props.date.clone();

    return new DateUtil(clonedDate.add(selectedDatePart, step));
  },

  getSelectedDatePart: function(selectionStart, selectionEnd) {
    if (selectionStart >= 0 && selectionEnd <= 4) {
      return "year";
    } else if (selectionStart >= 5 && selectionEnd <= 7) {
      return "month";
    } else if (selectionStart >= 8 && selectionEnd <= 10) {
      return "day";
    }
  },

  render: function() {
    return <input
      ref="input"
      type="text"
      value={this.state.value}
      onBlur={this.props.onBlur}
      onKeyDown={this.handleKeyDown}
      onFocus={this.props.onFocus}
      onChange={this.handleChange}
      className="datepicker-input" />;
  }
});

module.exports = DateInput;
