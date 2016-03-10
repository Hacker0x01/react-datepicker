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
    includeDates: React.PropTypes.array,
    locale: React.PropTypes.string,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onBlur: React.PropTypes.func,
    setSelected: React.PropTypes.func
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
    var date = moment(value, this.props.dateFormat, this.props.locale || moment.locale(), true)
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

  render () {
    return <input
        ref='input'
        type='text'
        {...this.props}
        value={this.state.maybeDate}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        className={classnames('datepicker__input', this.props.className)} />
  }
})

module.exports = DateInput
