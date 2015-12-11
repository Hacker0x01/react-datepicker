import moment from "moment";
import DateUtil from "./util/date";
import ReactDOM from "react-dom";
import React from "react";
var DateInput = React.createClass({

  getDefaultProps() {
    return {
      dateFormat: "YYYY-MM-DD",
      className: "datepicker__input",
      onBlur() {}
    };
  },

  componentWillMount() {
    this.setState({
        maybeDate: this.safeDateFormat(this.props.date)
    });
  },

  componentDidMount() {
    this.toggleFocus(this.props.focus);
  },

  componentWillReceiveProps(newProps) {
    this.toggleFocus(newProps.focus);

    // If we're receiving a different date then apply it.
    // If we're receiving a null date continue displaying the
    // value currently in the textbox.
    if (newProps.date != null && newProps.date != this.props.date) {
        this.setState({
            maybeDate: this.safeDateFormat(newProps.date)
        });
    }
  },

  toggleFocus(focus) {
    if (focus) {
      this.refs.input.focus();
    } else {
      this.refs.input.blur();
    }
  },

  handleChange(event) {
    var value = event.target.value;
    var date = moment(value, this.props.dateFormat, true);

    if (date.isValid()) {
      this.props.setSelected(new DateUtil(date));
    } else {
        this.props.invalidateSelected();
    }

    this.setState({
        maybeDate: value
    });
  },

  safeDateFormat(date) {
    return !!date ? date.format(this.props.dateFormat) : null;
  },

  handleKeyDown(event) {
    switch (event.key) {
    case "Enter":
      event.preventDefault();
      this.props.handleEnter();
      break;
    case "Escape":
      event.preventDefault();
      this.props.hideCalendar();
      break;
    }
  },

  handleClick(event) {
    if (!this.props.disabled) {
      this.props.handleClick(event);
    }
  },

  render() {
    return <input
        ref="input"
        type="text"
        id={this.props.id}
        name={this.props.name}
        value={this.state.maybeDate}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        onChange={this.handleChange}
        className={this.props.className}
        disabled={this.props.disabled}
        placeholder={this.props.placeholderText}
        readOnly={this.props.readOnly}
        required={this.props.required} />;
  }
});

module.exports = DateInput;
