import DateInput from './date_input'
import Calendar from './calendar'
import React from 'react'
import TetherComponent from 'react-tether'
import { isSameDay } from './date_utils'

/**
 * General datepicker component.
 */

var DatePicker = React.createClass({
  displayName: 'DatePicker',

  propTypes: {
    className: React.PropTypes.string,
    dateFormat: React.PropTypes.string,
    dateFormatCalendar: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    endDate: React.PropTypes.object,
    excludeDates: React.PropTypes.array,
    filterDate: React.PropTypes.func,
    id: React.PropTypes.string,
    includeDates: React.PropTypes.array,
    isClearable: React.PropTypes.bool,
    isValidOrEmpty: React.PropTypes.func,
    locale: React.PropTypes.string,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    name: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func.isRequired,
    onFocus: React.PropTypes.func,
    placeholderText: React.PropTypes.string,
    popoverAttachment: React.PropTypes.string,
    popoverTargetAttachment: React.PropTypes.string,
    popoverTargetOffset: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    renderCalendarTo: React.PropTypes.any,
    required: React.PropTypes.bool,
    selected: React.PropTypes.object,
    showYearDropdown: React.PropTypes.bool,
    startDate: React.PropTypes.object,
    tabIndex: React.PropTypes.number,
    tetherConstraints: React.PropTypes.array,
    title: React.PropTypes.string,
    todayButton: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      dateFormatCalendar: 'MMMM YYYY',
      onChange () {},
      disabled: false,
      onFocus () {},
      onBlur () {},
      popoverAttachment: 'top left',
      popoverTargetAttachment: 'bottom left',
      popoverTargetOffset: '10px 0',
      tetherConstraints: [
        {
          to: 'window',
          attachment: 'together'
        }
      ]
    }
  },

  getInitialState () {
    return {
      open: false
    }
  },

  setOpen (open) {
    this.setState({ open })
  },

  handleFocus (event) {
    this.props.onFocus(event)
    this.setOpen(true)
  },

  handleBlur (event) {
    if (this.state.open) {
      this.refs.input.focus()
    } else {
      this.props.onBlur(event)
    }
  },

  handleCalendarClickOutside (event) {
    this.setOpen(false)
  },

  handleSelect (date) {
    this.setSelected(date)
    this.setOpen(false)
  },

  setSelected (date) {
    if (!isSameDay(this.props.selected, date)) {
      if (date !== null) {
        this.props.isValidOrEmpty(true, this.props.dateFormat ? date.format(this.props.dateFormat) : date )
      }
      this.props.onChange(date)
    }
  },

  onInputClick () {
    this.setOpen(true)
  },

  handleInputDone () {
    this.setOpen(false)
  },

  onClearClick (event) {
    event.preventDefault()
    this.props.onChange(null)
  },

  renderCalendar () {
    if (!this.state.open || this.props.disabled) {
      return null
    }
    return <Calendar
        ref="calendar"
        locale={this.props.locale}
        dateFormat={this.props.dateFormatCalendar}
        selected={this.props.selected}
        onSelect={this.handleSelect}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        startDate={this.props.startDate}
        endDate={this.props.endDate}
        excludeDates={this.props.excludeDates}
        filterDate={this.props.filterDate}
        onClickOutside={this.handleCalendarClickOutside}
        includeDates={this.props.includeDates}
        showYearDropdown={this.props.showYearDropdown}
        todayButton={this.props.todayButton} />
  },

  renderClearButton () {
    if (this.props.isClearable && this.props.selected != null) {
      return <a className="close-icon" href="#" onClick={this.onClearClick}></a>
    } else {
      return null
    }
  },

  render () {
    return (
      <TetherComponent
          classPrefix={"datepicker__tether"}
          attachment={this.props.popoverAttachment}
          targetAttachment={this.props.popoverTargetAttachment}
          targetOffset={this.props.popoverTargetOffset}
          renderElementTo={this.props.renderCalendarTo}
          constraints={this.props.tetherConstraints}>
        <div className="datepicker__input-container">
          <DateInput
              ref="input"
              className={this.props.className}
              date={this.props.selected}
              dateFormat={this.props.dateFormat}
              disabled={this.props.disabled}
              excludeDates={this.props.excludeDates}
              filterDate={this.props.filterDate}
              handleClick={this.onInputClick}
              handleDone={this.handleInputDone}
              id={this.props.id}
              includeDates={this.props.includeDates}
              isValidOrEmpty={this.props.isValidOrEmpty}
              locale={this.props.locale}
              maxDate={this.props.maxDate}
              minDate={this.props.minDate}
              name={this.props.name}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
              open={this.state.open}
              placeholderText={this.props.placeholderText}
              readOnly={this.props.readOnly}
              required={this.props.required}
              setSelected={this.setSelected}
              tabIndex={this.props.tabIndex}
              title={this.props.title} />
          {this.renderClearButton()}
        </div>
        {this.renderCalendar()}
      </TetherComponent>
    )
  }
})

module.exports = DatePicker
