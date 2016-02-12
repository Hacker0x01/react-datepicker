import moment from "moment";
import DateInput from "./date_input";
import Calendar from "./calendar";
import React from "react";
import TetherComponent from "react-tether";
import { isSameDay } from "./date_utils";

var DatePicker = React.createClass({

  propTypes: {
    selected: React.PropTypes.object,
    weekdays: React.PropTypes.arrayOf(React.PropTypes.string),
    locale: React.PropTypes.string,
    dateFormatCalendar: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    id: React.PropTypes.string,
    popoverAttachment: React.PropTypes.string,
    popoverTargetAttachment: React.PropTypes.string,
    popoverTargetOffset: React.PropTypes.string,
    tetherConstraints: React.PropTypes.array,
    weekStart: React.PropTypes.string,
    showYearDropdown: React.PropTypes.bool,
    onChange: React.PropTypes.func.isRequired,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    tabIndex: React.PropTypes.number,
    filterDate: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      weekdays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      locale: "en",
      dateFormatCalendar: "MMMM YYYY",
      onChange() {},
      disabled: false,
      onFocus() {},
      onBlur() {},
      popoverAttachment: "top left",
      popoverTargetAttachment: "bottom left",
      popoverTargetOffset: "10px 0",
      tetherConstraints: [
        {
          to: "window",
          attachment: "together"
        }
      ]
    };
  },

  getInitialState() {
    return {
      open: false
    };
  },

  setOpen(open) {
    this.setState({ open });
  },

  handleFocus(event) {
    this.props.onFocus(event);
    this.setOpen(true);
  },

  handleBlur(event) {
    if (this.state.open) {
      this.refs.input.focus();
    } else {
      this.props.onBlur(event);
    }
  },

  handleCalendarClickOutside(event) {
    this.setOpen(false);
  },

  handleSelect(date) {
    this.setSelected(date);
    this.setOpen(false);
  },

  setSelected(date) {
    if (!isSameDay(this.props.selected, date)) {
      this.props.onChange(date);
    }
  },

  onInputClick() {
    this.setOpen(true);
  },

  handleInputDone() {
    this.setOpen(false);
  },

  onClearClick(event) {
    event.preventDefault();
    this.props.onChange(null);
  },

  renderCalendar() {
    if (!this.state.open || this.props.disabled) {
      return null;
    }
    return <Calendar
      ref="calendar"
      weekdays={this.props.weekdays}
      locale={this.props.locale}
      moment={moment}
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
      weekStart={this.props.weekStart}
      showYearDropdown={this.props.showYearDropdown} />;
  },

  renderClearButton() {
    if (this.props.isClearable && this.props.selected != null) {
      return <a className="close-icon" href="#" onClick={this.onClearClick}></a>;
    } else {
      return null;
    }
  },

  render() {
    return (
      <TetherComponent
        classPrefix={"datepicker__tether"}
        attachment={this.props.popoverAttachment}
        targetAttachment={this.props.popoverTargetAttachment}
        targetOffset={this.props.popoverTargetOffset}
        constraints={this.props.tetherConstraints}>
        <div className="datepicker__input-container">
          <DateInput
            ref="input"
            id={this.props.id}
            name={this.props.name}
            date={this.props.selected}
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
    );
  }
});

module.exports = DatePicker;
