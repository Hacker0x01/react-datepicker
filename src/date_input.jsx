import moment from 'moment'
import React from 'react'
import { isSameDay, isDayDisabled, isSameUtcOffset } from './date_utils'

var DateInput = React.createClass({
  displayName: 'DateInput',

  propTypes: {
    customInput: React.PropTypes.element,
    date: React.PropTypes.object,
    dateFormat: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array
    ]),
    disabled: React.PropTypes.bool,
    disableDateAutoCorrection: React.PropTypes.bool,
    excludeDates: React.PropTypes.array,
    filterDate: React.PropTypes.func,
    includeDates: React.PropTypes.array,
    locale: React.PropTypes.string,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onChangeRaw: React.PropTypes.func,
    onChangeDate: React.PropTypes.func
  },

  getDefaultProps () {
    return {
      dateFormat: 'L',
      disableDateAutoCorrection: false
    }
  },

  getInitialState () {
    return {
      value: this.safeDateFormat(this.props)
    }
  },

  componentWillReceiveProps (newProps) {
    if (!isSameDay(newProps.date, this.props.date) ||
        !isSameUtcOffset(newProps.date, this.props.date) ||
          newProps.locale !== this.props.locale ||
          newProps.dateFormat !== this.props.dateFormat) {
      if (!this.props.disableDateAutoCorrection || (newProps.date && newProps.date.isValid())) {
        this.setState({
          value: this.safeDateFormat(newProps)
        })
      }
    }
  },

  handleChange (event) {
    if (this.props.onChange) {
      this.props.onChange(event)
    }
    if (this.props.onChangeRaw) {
      this.props.onChangeRaw(event)
    }
    if (!event.defaultPrevented) {
      this.handleChangeDate(event.target.value)
    }
  },

  handleChangeDate (value) {
    if (this.props.onChangeDate) {
      var date = moment(value.trim(), this.props.dateFormat, this.props.locale || moment.locale(), true)
      if (date.isValid() && !isDayDisabled(date, this.props)) {
        this.props.onChangeDate(date)
      } else if (value === '') {
        this.props.onChangeDate(null)
      } else if (this.props.disableDateAutoCorrection && !date.isValid()) {
        this.props.onChangeDate(null)
      }
    }
    this.setState({value})
  },

  safeDateFormat (props) {
    return props.date && props.date.clone()
      .locale(props.locale || moment.locale())
      .format(Array.isArray(props.dateFormat) ? props.dateFormat[0] : props.dateFormat) || ''
  },

  handleBlur (event) {
    let val = this.safeDateFormat(this.props)
    if (!this.props.disableDateAutoCorrection || val !== '') {
      this.setState({
        value: val
      })
    }
    if (this.props.onBlur) {
      this.props.onBlur(event)
    }
  },

  focus () {
    this.refs.input.focus()
  },

  render () {
    const { customInput, date, disableDateAutoCorrection, locale, minDate, maxDate, excludeDates, includeDates, filterDate, dateFormat, onChangeDate, onChangeRaw, ...rest } = this.props // eslint-disable-line no-unused-vars

    if (customInput) {
      return React.cloneElement(customInput, {
        ...rest,
        ref: 'input',
        value: this.state.value,
        onBlur: this.handleBlur,
        onChange: this.handleChange
      })
    } else {
      return <input
          ref="input"
          type="text"
          {...rest}
          value={this.state.value}
          onBlur={this.handleBlur}
          onChange={this.handleChange}/>
    }
  }
})

module.exports = DateInput
