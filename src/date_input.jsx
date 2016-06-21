import moment from 'moment-timezone'
import React from 'react'
import { isSameDayAndTime, isDayDisabled } from './date_utils'

var DateInput = React.createClass({
  displayName: 'DateInput',

  propTypes: {
    date: React.PropTypes.object,
    dateFormat: React.PropTypes.string,
    dateOnlyFormat: React.PropTypes.string,
    dateOnly: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    excludeDates: React.PropTypes.array,
    filterDate: React.PropTypes.func,
    includeDates: React.PropTypes.array,
    locale: React.PropTypes.string,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onChangeDate: React.PropTypes.func,
    onInputKeyDown: React.PropTypes.func
  },

  getDefaultProps () {
    return {
      dateFormat: 'L'
    }
  },

  getInitialState () {
    return {
      value: this.safeDateFormat(this.props),
      manualDate: null
    }
  },

  componentWillReceiveProps (newProps) {
      this.setState({
        value: this.safeDateFormat(newProps)
      })
  },

  onKeyDown (event) {
    if (event.key === 'Enter') {
      this.handleBlur(event)
    } else {
      this.props.onInputKeyDown
    }
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
    this.setState({
      manualDate: value,
      value: value
    })
  },

  safeDateFormat (props) {
    return props.date && props.date.clone()
      .locale(props.locale || moment.locale())
      .format(props.dateOnly ? props.dateOnlyFormat : props.dateFormat) || ''
  },

  handleBlur (event) {
    this.checkManualDate()
  },

  checkManualDate () {
    let formatted = moment(this.state.manualDate ? this.state.manualDate : this.state.value, this.props.dateFormat).format();
    let dateOnly = moment(this.state.manualDate).format(this.props.dateOnlyFormat);
    if (this.props.onChangeDate) {
      if (dateOnly === "Invalid date") {
        var fullDate = moment(formatted);
        var dateTZ = moment.tz(fullDate, this.props.timeZone);
        if (dateTZ.isValid() && !isDayDisabled(dateTZ, this.props)) {
          this.props.onChangeDate(dateTZ, false)
        } else if (this.state.value === '') {
          this.props.onChangeDate(null, false)
        }
      } else {
          if (moment(this.state.manualDate).isValid() && !isDayDisabled(moment(this.state.manualDate), this.props))  {
            this.props.onChangeDate(moment(this.state.manualDate), true)
          }
      }
    }
    this.setState({
      date: dateTZ,
      value: this.safeDateFormat(this.props)
    })
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
        onKeyDown={this.onKeyDown}
        onBlur={this.handleBlur}
        onChange={this.handleChange} />
  }
})

module.exports = DateInput
