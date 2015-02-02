'use strict';

var React = require('react');
var DateUtil = require('./util/date');
var moment = require('moment');

var DateInput = React.createClass({displayName: "DateInput",

  getDefaultProps: function() {
    return {
      dateFormat: 'YYYY-MM-DD'
    };
  },

  getInitialState: function() {
    var value = this.props.date ? this.props.date.format(this.props.dateFormat) :
                                  '';
    return {
      value: value
    };
  },

  componentDidMount: function() {
    this.toggleFocus(this.props.focus);
  },

  componentWillReceiveProps: function(newProps) {
    var value = this.props.date ? this.props.date.format(this.props.dateFormat) :
                                  '';

    this.toggleFocus(newProps.focus);

    this.setState({
      value: value
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
    var date = moment(event.target.value, this.props.dateFormat, true);

    this.setState({
      value: event.target.value
    });

    if (this.isValueAValidDate()) {
      this.props.setSelected(new DateUtil(date));
    }
  },

  isValueAValidDate: function() {
    var date = moment(event.target.value, this.props.dateFormat, true);

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
    return React.createElement("input", {
      ref: "input",
      type: "text",
      value: this.state.value,
      onClick: this.handleClick,
      onKeyDown: this.handleKeyDown,
      onFocus: this.props.onFocus,
      onChange: this.handleChange,
      className: "datepicker__input"});
  }
});

module.exports = DateInput;
