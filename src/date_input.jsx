import moment from 'moment-timezone'
import React from 'react'
import { isSameDayAndTime, isDayDisabled } from './date_utils'

var DateInput = React.createClass({
  displayName: 'DateInput',

  propTypes: {
    date: React.PropTypes.object,
    dateFormat: React.PropTypes.string,
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
    return {
      value: this.safeDateFormat(this.props)
    }
  },

  componentWillReceiveProps (newProps) {
      this.setState({
        value: this.safeDateFormat(newProps)
      })
  },

  handleChange (event) {
    if (this.props.onChange) {
      this.props.onChange(event)
    }
    if (!event.isDefaultPrevented()) {
      this.handleChangeDate(event.target.value)
    }
  },

  handleChangeDate (value) {
    let formatted = moment(value, this.props.dateFormat).format();
    if (this.props.onChangeDate) {
      var date = moment(formatted);
      var justDate = moment(formatted, moment.ISO_8601).toString();
      var dateTZ = moment.tz(date, this.props.timeZone);
      if (dateTZ.isValid() && !isDayDisabled(dateTZ, this.props)) {
        this.props.onChangeDate(dateTZ)
      } else if (value === '') {
        this.props.onChangeDate(null)
      }
    }
    this.setState({date: dateTZ})
  },

  safeDateFormat (props) {
    return props.date && props.date.clone()
      .locale(props.locale || moment.locale())
      .format(props.dateFormat) || ''
  },

  handleBlur (event) {
    this.setState({
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
    return <input
        ref='input'
        type='text'
        {...this.props}
        value={this.state.value}
        onBlur={this.handleBlur}
        onChange={this.handleChange} />
  }
})

module.exports = DateInput
