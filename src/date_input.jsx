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
    onInputKeyDown: React.PropTypes.func,
    isEmpty: React.PropTypes.bool,
    showPicker: React.PropTypes.func
  },

  getDefaultProps () {
    return {
      dateFormat: 'L'
    }
  },

  getInitialState () {
    return {
      value: this.props.isEmpty ? '' : this.safeDateFormat(this.props),
      manualDate: null
    }
  },

  componentWillReceiveProps (newProps) {
      this.setState({
        value: newProps.isEmpty ? '' : this.safeDateFormat(newProps)
      })
  },

  onKeyDown (event) {
    if (event.key === 'Enter') {
      this.handleBlur(event)
    } else {
      this.props.onInputKeyDown(event)
    }
  },

  handleFocus (event) {
    let clickLocation = event.target.selectionStart;
    this.props.showPicker(clickLocation);
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
    if (this.state.manualDate === null) {
      return;
    }
    let formatted = moment(this.state.manualDate, this.props.dateFormat).format()
    let dateHour = moment(this.state.manualDate, this.props.dateFormat).get('hour')
    let dateMinute = moment(this.state.manualDate, this.props.dateFormat).get('minute')
    let isDateOnly = ((dateHour === 0) && (dateMinute === 0) && (this.state.manualDate.indexOf(":") === -1));
    if (this.props.onChangeDate) {
      if (!isDateOnly) {
        var fullDate = moment(formatted);
        if (fullDate.isValid() && !isDayDisabled(fullDate, this.props)) {
          this.props.onChangeDate(fullDate, false)
        } else if (this.state.value === '') {
          this.props.onChangeDate('', false)
        }
      } else {
        if (moment(this.state.manualDate).isValid() && !isDayDisabled(moment(this.state.manualDate), this.props))  {
          this.props.onChangeDate(moment(this.state.manualDate), true)
        }
      }
      this.state.manualDate = null;
    }
    this.setState({
      date: fullDate,
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
        onChange={this.handleChange}
        onClick={this.handleFocus} />
  }
})

module.exports = DateInput
