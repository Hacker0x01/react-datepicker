import moment from 'moment'
import React from 'react'
import { isSameDay, isDayDisabled, isSameUtcOffset } from './date_utils'

var DateInput = React.createClass({
  displayName: 'DateInput',

  propTypes: {
    // ##################################################
    // ##  START custom code in concur fork
    allowInvalidDates: React.PropTypes.bool,
    // ##  END custom code in concur fork
    // ##################################################
    customInput: React.PropTypes.element,
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
    onChangeRaw: React.PropTypes.func,
    onChangeDate: React.PropTypes.func
  },

  getDefaultProps () {
    return {
      dateFormat: 'L'
    }
  },

  getInitialState () {
    // ##################################################
    // ##  START custom code in concur fork
    if (this.props.allowInvalidDates && !this.props.date) {
      return {
        value: ''
      }
    }
    // ##  END custom code in concur fork
    // ##################################################

    return {
      value: this.safeDateFormat(this.props)
    }
  },

  componentWillReceiveProps (newProps) {
    if (!isSameDay(newProps.date, this.props.date) ||
        !isSameUtcOffset(newProps.date, this.props.date) ||
          newProps.locale !== this.props.locale ||
          newProps.dateFormat !== this.props.dateFormat) {
      // ##################################################
      // ##  START custom code in concur fork
      this.updateState({
        value: this.safeDateFormat(newProps)
      })
      // ##  END custom code in concur fork
      // ##################################################
    }
  },

  // ##################################################
  // ##  START custom code in concur fork
  updateState (obj) {
    if (!this.props.allowInvalidDates) {
      return this.setState({value: obj.value})
    }

    if (typeof obj.value !== 'undefined') {
      this.setState({value: obj.value})
    }
  },
  // ##  END custom code in concur fork
  // ##################################################

  handleChange (event) {
    // ##################################################
    // ##  START custom code in concur fork
    if (this.props.allowInvalidDates) {
      this.updateState({value: event.target.value})
    } else if (this.props.onChange) {
      this.props.onChange(event)
    }
    // ##  END custom code in concur fork
    // ##################################################
    if (this.props.onChangeRaw) {
      this.props.onChangeRaw(event)
    }
    // ##################################################
    // ##  START custom code in concur fork
    if (event.isDefaultPrevented && !event.isDefaultPrevented()) {
      this.handleChangeDate(event.target.value)
    }
    // ##  END custom code in concur fork
    // ##################################################
  },

  handleChangeDate (value) {
    if (this.props.onChangeDate) {
      var date = moment(value.trim(), this.props.dateFormat, this.props.locale || moment.locale(), true)
      if (date.isValid() && !isDayDisabled(date, this.props)) {
        this.props.onChangeDate(date)
      } else if (value === '') {
        this.props.onChangeDate(null)
      }
    }
    // ##################################################
    // ##  START custom code in concur fork
    this.updateState({value})
    // ##  END custom code in concur fork
    // ##################################################
  },

  // ##################################################
  // ##  START custom code in concur fork
  safeDateFormat (props, value) {
    if (this.props.allowInvalidDates) {
      if (typeof props.date === 'string' || !props.date) {
        return value
      }
    }
    // ##  END custom code in concur fork
    // ##################################################

    return props.date && props.date.clone()
      .locale(props.locale || moment.locale())
      .format(Array.isArray(props.dateFormat) ? props.dateFormat[0] : props.dateFormat) || ''
  },

  handleBlur (event) {
    // ##################################################
    // ##  START custom code in concur fork
    this.updateState({
      value: this.safeDateFormat(this.props)
    })
    // ##  END custom code in concur fork
    // ##################################################
    if (this.props.onBlur) {
      this.props.onBlur(event)
    }
  },

  focus () {
    this.refs.input.focus()
  },

  render () {
    // ##################################################
    // ##  START custom code in concur fork
    const { allowInvalidDates, customInput, date, locale, minDate, maxDate, excludeDates, includeDates, filterDate, dateFormat, onChangeDate, onChangeRaw, ...rest } = this.props // eslint-disable-line no-unused-vars
    // ##  END custom code in concur fork
    // ##################################################

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
