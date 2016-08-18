import moment from 'moment'
import React from 'react'
import { isSameDay, isDayDisabled } from './date_utils'

var DateInput = React.createClass({
  displayName: 'DateInput',

  propTypes: {
    allowInvalidDates: React.PropTypes.bool,
    date: React.PropTypes.object,
    dateFormat: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array
    ]),
    disabled: React.PropTypes.bool,
    excludeDates: React.PropTypes.array,
    filterDate: React.PropTypes.func,
    includeDates: React.PropTypes.array,
    locale: React.PropTypes.string,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onChangeDate: React.PropTypes.func
  },

  getDefaultProps () {
    return {
      dateFormat: 'L'
    }
  },

  getInitialState () {
    if (this.props.allowInvalidDates && !this.props.date) {
      return {
        value: ''
      }
    }

    return {
      value: this.safeDateFormat(this.props)
    }
  },

  componentWillReceiveProps (newProps) {
    if (!isSameDay(newProps.date, this.props.date) ||
          newProps.locale !== this.props.locale ||
          newProps.dateFormat !== this.props.dateFormat) {
      this.updateState({
        value: this.safeDateFormat(newProps)
      })
    }
  },

  updateState (obj) {
    if (!this.props.allowInvalidDates) {
      return this.setState({value: obj.value})
    }

    if (typeof obj.value !== 'undefined') {
      this.setState({value: obj.value})
    }
  },

  handleChange (event) {
    if (this.props.allowInvalidDates) {
      this.updateState({value: event.target.value})
    } else if (this.props.onChange) {
      this.props.onChange(event)
    }

    if (!event.isDefaultPrevented()) {
      this.handleChangeDate(event.target.value)
    }
  },

  handleChangeDate (value) {
    if (this.props.onChangeDate) {
      var date = moment(value, this.props.dateFormat, this.props.locale || moment.locale(), true)

      if (date.isValid() && !isDayDisabled(date, this.props)) {
        this.props.onChangeDate(date)
      } else if (value === '' || this.props.allowInvalidDates) {
        this.props.onChangeDate(null)
      }
    }

    this.updateState({value})
  },

  safeDateFormat (props, value) {
    if (this.props.allowInvalidDates) {
      if (typeof props.date === 'string' || !props.date) {
        return value
      }
    }

    return props.date && props.date.clone()
      .locale(props.locale || moment.locale())
      .format(Array.isArray(props.dateFormat) ? props.dateFormat[0] : props.dateFormat) || ''
  },

  handleBlur (event) {
    this.updateState({
      value: this.safeDateFormat(this.props)
    })

    if (this.props.onBlur) {
      this.props.onBlur(event)
    }
  },

  focus () {
    this.refs.input.focus()
  },

  render () {
    const { allowInvalidDates, date, locale, minDate, maxDate, excludeDates, includeDates, filterDate, dateFormat, onChangeDate, ...rest } = this.props // eslint-disable-line no-unused-vars

    return <input
        ref='input'
        type='text'
        {...rest}
        value={this.state.value}
        onBlur={this.handleBlur}
        onChange={this.handleChange} />
  }
})

module.exports = DateInput
