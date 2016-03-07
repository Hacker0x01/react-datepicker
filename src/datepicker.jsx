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
    selected: React.PropTypes.object,
    locale: React.PropTypes.string,
    dateFormat: React.PropTypes.string,
    dateFormatCalendar: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    id: React.PropTypes.string,
    popoverAttachment: React.PropTypes.string,
    popoverTargetAttachment: React.PropTypes.string,
    popoverTargetOffset: React.PropTypes.string,
    tetherConstraints: React.PropTypes.array,
    showYearDropdown: React.PropTypes.bool,
    onChange: React.PropTypes.func.isRequired,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    tabIndex: React.PropTypes.number,
    filterDate: React.PropTypes.func,
    todayButton: React.PropTypes.string,
    className: React.PropTypes.string,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    startDate: React.PropTypes.object,
    endDate: React.PropTypes.object,
    excludeDates: React.PropTypes.array,
    includeDates: React.PropTypes.array,
    name: React.PropTypes.string,
    isClearable: React.PropTypes.bool,
    placeholderText: React.PropTypes.string,
    title: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    required: React.PropTypes.bool,
    renderCalendarTo: React.PropTypes.any,
    calendarClassName: React.PropTypes.string
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
        todayButton={this.props.todayButton}
        className={this.props.calendarClassName} />
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
              id={this.props.id}
              name={this.props.name}
              date={this.props.selected}
              locale={this.props.locale}
              minDate={this.props.minDate}
              maxDate={this.props.maxDate}
              excludeDates={this.props.excludeDates}
              includeDates={this.props.includeDates}
              filterDate={this.props.filterDate}
              dateFormat={this.props.dateFormat}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              handleClick={this.onInputClick}
              handleDone={this.handleInputDone}
              setSelected={this.setSelected}
              placeholderText={this.props.placeholderText}
              disabled={this.props.disabled}
              className={this.props.className}
              title={this.props.title}
              readOnly={this.props.readOnly}
              required={this.props.required}
              tabIndex={this.props.tabIndex}
              open={this.state.open} />
          {this.renderClearButton()}
        </div>
        {this.renderCalendar()}
      </TetherComponent>
    )
  }
})

module.exports = DatePicker
