import DateInput from './date_input'
import Calendar from './calendar'
import React from 'react'
import TetherComponent from './tether_component'
import classnames from 'classnames'
import moment from 'moment-timezone'

import { isSameDay, isSameDayAndTime } from './date_utils'

var outsideClickIgnoreClass = 'react-datepicker-ignore-onclickoutside'

/**
 * General datepicker component.
 */

var DatePicker = React.createClass({
  displayName: 'DatePicker',

  propTypes: {
    autoComplete: React.PropTypes.string,
    className: React.PropTypes.string,
    dateFormat: React.PropTypes.string,
    dateFormatCalendar: React.PropTypes.string,
    dateFormatDay: React.PropTypes.string,
    dateOnlyFormat: React.PropTypes.string,
    dateOnly: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    endDate: React.PropTypes.object,
    excludeDates: React.PropTypes.array,
    filterDate: React.PropTypes.func,
    id: React.PropTypes.string,
    includeDates: React.PropTypes.array,
    inline: React.PropTypes.bool,
    isClearable: React.PropTypes.bool,
    locale: React.PropTypes.string,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    name: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func.isRequired,
    onFocus: React.PropTypes.func,
    openToDate: React.PropTypes.object,
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
    todayButton: React.PropTypes.string,
    timezone: React.PropTypes.string,
    timePickerButton: React.PropTypes.bool
  },

  getDefaultProps () {
    return {
      dateFormatCalendar: 'MMMM YYYY',
      dateFormat: 'MMM/DD/YYYY',
      dateOnlyFormat: 'YYYY/MM/DD',
      dateFormatDay: 'YYYY/MM/DD',
      dateOnly: true,
      onChange () {},
      disabled: false,
      onFocus () {},
      onBlur () {},
      popoverAttachment: 'top left',
      popoverTargetAttachment: 'bottom left',
      popoverTargetOffset: '10px 0',
      timezone: 'America/Los_Angeles',
      tetherConstraints: [
        {
          to: 'window',
          attachment: 'together'
        }
      ],
      timePickerButton: false
    }
  },

  getInitialState () {
    return {
      open: false,
      showTimePicker: false
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

  handleToggleTime () {
    this.setState({
      showTimePicker: !this.state.showTimePicker
    })
  },

  handleSelect (date) {
    console.log(date);
    let formattedDate = moment(date).format("YYYY-MM-DD");
    let previousHour = this.props.selected ? moment(this.props.selected).hours() : 0;
    let previousMinute = this.props.selected ? moment(this.props.selected).minutes() : 0;
    let adjustedDate = moment.tz(formattedDate + " " + previousHour + ":" + previousMinute + " +0000", "YYYY-MM-DD HH:mm Z", "GMT");
    this.setSelected(adjustedDate, this.props.dateOnly)
    this.setOpen(false)
  },

  handleSelectTime (time) {
    let formattedDate = moment(this.props.selected).format("YYYY-MM-DD");
    let adjustedDate = moment.tz(formattedDate + " " + time.hours + ":" + time.minutes + " +0000", "YYYY-MM-DD HH:mm Z", "GMT");
    console.log(adjustedDate);
    this.setSelected(adjustedDate, this.props.dateOnly)
    this.setOpen(false)
  },

  setSelected (date, isDateOnly) {
    if (!isSameDayAndTime(this.props.selected, date)) {
      this.props.onChange(date, isDateOnly)
    }
  },

  onInputClick () {
    if (!this.props.disabled) {
      this.setOpen(true)
    }
  },

  onInputKeyDown (event) {
    if (event.key === 'Escape') {
      event.preventDefault()
      this.setOpen(false)
    } else if (event.key === 'Tab') {
      this.setOpen(false)
    }
  },

  onClearClick (event) {
    event.preventDefault()
    this.props.onChange(null, true)
  },

  renderCalendar () {
    if (!this.props.inline && (!this.state.open || this.props.disabled)) {
      return null
    }
    return <Calendar
        ref="calendar"
        locale={this.props.locale}
        dateFormat={this.props.dateFormatCalendar}
        dateFormatDay={this.props.dateFormatDay}
        selected={this.props.selected}
        onSelect={this.handleSelect}
        onSelectTime={this.handleSelectTime}
        openToDate={this.props.openToDate}
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
        outsideClickIgnoreClass={outsideClickIgnoreClass}
        timezone={this.props.timezone}
        timePickerButton={this.props.timePickerButton}
        onToggle={this.handleToggleTime}
        showTimePicker={this.state.showTimePicker} />
  },

  renderDateInput () {
    var className = classnames(this.props.className, {
      [outsideClickIgnoreClass]: this.state.open
    })
    return <DateInput
        ref='input'
        id={this.props.id}
        name={this.props.name}
        date={moment(this.props.selected, this.props.dateOnly ? this.props.dateOnlyFormat : this.props.dateFormat)}
        locale={this.props.locale}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        excludeDates={this.props.excludeDates}
        includeDates={this.props.includeDates}
        filterDate={this.props.filterDate}
        dateFormat={this.props.dateFormat}
        dateOnlyFormat={this.props.dateOnlyFormat}
        dateOnly={this.props.dateOnly}
        isEmpty={this.props.selected === null ? true : false}
        onFocus={this.handleFocus}
        onClick={this.onInputClick}
        onInputKeyDown={this.onInputKeyDown}
        onChangeDate={this.setSelected}
        placeholder={this.props.placeholderText}
        disabled={this.props.disabled}
        autoComplete={this.props.autoComplete}
        className={className}
        title={this.props.title}
        readOnly={this.props.readOnly}
        required={this.props.required}
        tabIndex={this.props.tabIndex}
        timezone={this.props.timezone}/>
  },

  renderClearButton () {
    if (this.props.isClearable && this.props.selected != null) {
      return <a className="react-datepicker__close-icon" href="#" onClick={this.onClearClick}></a>
    } else {
      return null
    }
  },

  render () {
    const calendar = this.renderCalendar()

    if (this.props.inline) {
      return calendar
    } else {
      return (
        <TetherComponent
            classPrefix={"react-datepicker__tether"}
            attachment={this.props.popoverAttachment}
            targetAttachment={this.props.popoverTargetAttachment}
            targetOffset={this.props.popoverTargetOffset}
            renderElementTo={this.props.renderCalendarTo}
            constraints={this.props.tetherConstraints}>
          <div className="react-datepicker__input-container">
            {this.renderDateInput()}
            {this.renderClearButton()}
          </div>
          {calendar}
        </TetherComponent>
      )
    }
  }
})

module.exports = DatePicker
