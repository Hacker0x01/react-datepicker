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
    var el = this.refs.input.getDOMNode();

    if (this.props.focus) {
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
    };
  },

  handleArrowUpDown: function(key) {
    if (! this.isValueAValidDate())
      return;

    var selectedDatePart, incrementer;
    var clonedDate = this.props.date.clone();
    var el = this.refs.input.getDOMNode();

    if (key == "ArrowUp") {
      incrementer = 1;
    } else {
      incrementer = -1;
    }

    if (el.selectionStart >= 0 && el.selectionEnd <= 4) {
      selectedDatePart = "year";
    } else if (el.selectionStart >= 5 && el.selectionEnd <= 7) {
      selectedDatePart = "month";
    } else if (el.selectionStart >= 8 && el.selectionEnd <= 10) {
      selectedDatePart = "day";
    }

    this.setState({
      selectionStart: el.selectionStart,
      selectionEnd: el.selectionEnd
    });

    clonedDate.add(selectedDatePart, incrementer);

    this.props.setSelected(new DateUtil(clonedDate));
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
