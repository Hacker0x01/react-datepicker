/** @jsx React.DOM */

var DateUtil = require('./util/date');

var DateInput = React.createClass({
  getDateFormat: function() {
    return this.props.dateFormat != null ? this.props.dateFormat : "YYYY-MM-DD";
  },

  getInitialState: function() {
    return {
      value: this.props.date.format(this.getDateFormat())
    };
  },

  componentDidMount: function() {
    this.toggleFocus(this.props.focus);
  },

  componentWillReceiveProps: function(newProps) {
    this.toggleFocus(newProps.focus);

    this.setState({
      value: newProps.date.format(this.getDateFormat())
    });
  },

  toggleFocus: function(focus) {
    if (focus) {
      this.refs.input.getDOMNode().focus();
    } else {
      this.refs.input.getDOMNode().blur();
    }
  },

  handleChange: function(event) {
    var date = moment(event.target.value, this.getDateFormat(), true);

    this.setState({
      value: event.target.value
    });

    if (this.isValueAValidDate()) {
      this.props.setSelected(new DateUtil(date));
    }
  },

  isValueAValidDate: function() {
    var date = moment(event.target.value, this.getDateFormat(), true);

    return date.isValid();
  },

  handleKeyDown: function(event) {
    switch(event.key) {
    case "Enter":
      event.preventDefault();
      this.props.handleEnter();
      break;
    }
  },

  handleClick: function(event) {
    this.props.handleClick(event);
  },

  render: function() {
    return <input
      ref="input"
      type="text"
      value={this.state.value}
      onBlur={this.props.onBlur}
      onClick={this.handleClick}
      onKeyDown={this.handleKeyDown}
      onFocus={this.props.onFocus}
      onChange={this.handleChange}
      className="datepicker-input" />;
  }
});

module.exports = DateInput;
