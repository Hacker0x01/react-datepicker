var React = require('react');
var DateUtil = require('./util/date');
var moment = require('moment');

var DateInput = React.createClass({

  getDefaultProps: function() {
    return {
      dateFormat: 'YYYY-MM-DD'
    };
  },

  getInitialState: function() {
    return {
      value: this.safeDateFormat(this.props.date)
    };
  },

  componentDidMount: function() {
    this.toggleFocus(this.props.focus);
  },

  componentWillReceiveProps: function(newProps) {
    this.toggleFocus(newProps.focus);

    this.setState({
      value: this.safeDateFormat(newProps.date)
    });
  },

  toggleFocus: function(focus) {
    if (focus) {
      React.findDOMNode(this.refs.input).focus();
    } else {
      React.findDOMNode(this.refs.input).blur();
    }
  },

  handleChange: function(event) {
    var date = moment(event.target.value, this.props.dateFormat, true);

    this.setState({
      value: event.target.value
    });

    if (date.isValid()) {
      this.props.setSelected(new DateUtil(date));
    } else if (event.target.value === '') {
      this.props.clearSelected();
    }
  },

  safeDateFormat: function(date) {
    return !! date ? date.format(this.props.dateFormat) : null;
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
    var { name, onFocus, placeholderText, dateFormat, ...props } = this.props;

    return <input
      ref="input"
      type="text"
      name={name}
      value={this.state.value}
      onClick={this.handleClick}
      onKeyDown={this.handleKeyDown}
      onFocus={onFocus}
      onChange={this.handleChange}
      className="datepicker__input"
      placeholder={placeholderText}
      {...props }
      />;
  }
});

module.exports = DateInput;
