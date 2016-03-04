import moment from "moment"
import ReactDOM from "react-dom"
import React from "react"
import classnames from "classnames"
import { isSameDay, isDayDisabled } from "./date_utils"

var DateInput = React.createClass({

  propTypes: {
    date: React.PropTypes.object,
    locale: React.PropTypes.string,
    dateFormat: React.PropTypes.string,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    excludeDates: React.PropTypes.array,
    includeDates: React.PropTypes.array,
    filterDate: React.PropTypes.func,
    open: React.PropTypes.bool
  },

  getDefaultProps () {
    return {
      dateFormat: 'L'
    }
  },

  getInitialState () {
    return {
      maybeDate: this.safeDateFormat(this.props.date)
    }
  },

  componentWillReceiveProps (newProps) {
    if (!isSameDay(newProps.date, this.props.date)) {
      this.setState({
        maybeDate: this.safeDateFormat(newProps.date)
      })
    }
  },

  handleChange (event) {
    var value = event.target.value
    var date = moment(value, this.props.dateFormat, true)
    if (date.isValid() && !isDayDisabled(date, this.props)) {
      this.props.setSelected(date)
    } else if (value === '') {
      this.props.setSelected(null)
    }
    this.setState({
      maybeDate: value
    })
  },

  safeDateFormat (date) {
    return date && date.clone()
      .locale(this.props.locale || moment.locale())
      .format(this.props.dateFormat)
  },

  handleKeyDown (event) {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.preventDefault()
      this.props.handleDone()
    } else if (event.key === 'Tab') {
      this.props.handleDone()
    }
  },

  handleClick (event) {
    if (!this.props.disabled) {
      this.props.handleClick(event)
    }
  },

  handleBlur (event) {
    this.setState({
      maybeDate: this.safeDateFormat(this.props.date)
    })
    if (this.props.onBlur) {
      this.props.onBlur(event)
    }
  },

  focus () {
    this.refs.input.focus()
  },

  getClassNames () {
    return classnames(
      'datepicker__input',
      { 'ignore-react-onclickoutside': this.props.open },
      this.props.className)
  },

  render () {
    return <input
        ref="input"
        type="text"
        id={this.props.id}
        name={this.props.name}
        value={this.state.maybeDate}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        onFocus={this.props.onFocus}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        className={this.getClassNames()}
        disabled={this.props.disabled}
        placeholder={this.props.placeholderText}
        readOnly={this.props.readOnly}
        required={this.props.required}
        tabIndex={this.props.tabIndex} />
  }
})

module.exports = DateInput
