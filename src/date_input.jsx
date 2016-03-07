import moment from 'moment'
import React from 'react'
import classnames from 'classnames'
import { isSameDay, isDayDisabled } from './date_utils'

var DateInput = React.createClass({
  displayName: 'DateInput',

  propTypes: {
    className: React.PropTypes.string,
    date: React.PropTypes.object,
    dateFormat: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    excludeDates: React.PropTypes.array,
    filterDate: React.PropTypes.func,
    handleClick: React.PropTypes.func,
    handleDone: React.PropTypes.func,
    id: React.PropTypes.string,
    includeDates: React.PropTypes.array,
    locale: React.PropTypes.string,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    name: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    open: React.PropTypes.bool,
    placeholderText: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    required: React.PropTypes.bool,
    setSelected: React.PropTypes.func,
    tabIndex: React.PropTypes.number
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
