import isEqual from "lodash/lang/isEqual";
import moment from "moment";
import DateInput from "./date_input";
import Calendar from "./calendar";
import Popover from "./popover";
import React from "react";
import ReactDOM from "react-dom";

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
    weekStart: React.PropTypes.string,
    showYearDropdown: React.PropTypes.bool,
    onChange: React.PropTypes.func.isRequired,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onClear: React.PropTypes.func,
    tabIndex: React.PropTypes.number,
    isTypeable: React.PropTypes.bool,
    filterDate: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      weekdays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      locale: "en",
      dateFormatCalendar: "MMMM YYYY",
      moment: moment,
      onChange() {},
      disabled: false,
      onFocus() {},
      onBlur() {},
      onClear() {},
      isTypeable: false
    };
  },

  getInitialState() {
    return {
      focus: false
    };
  },

  shouldComponentUpdate(nextProps, nextState) {
    return !(isEqual(nextProps, this.props) && isEqual(nextState, this.state));
  },

  handleFocus() {
    this.props.onFocus();
    setTimeout(() => {
      this.setState({ focus: true });
    }, 200);
  },

  handleBlur() {
    setTimeout(() => {
      if (!this.state.datePickerHasFocus) {
        this.props.onBlur();
        this.hideCalendar();
      }
    }, 200);
  },

  hideCalendar() {
    setTimeout(() => {
      this.setState({
        focus: false
      });
    }, 0);
  },

  doesDatePickerContainElement(element) {
    var datePicker = ReactDOM.findDOMNode(this.refs.calendar);
    if (!datePicker) {
      return false;
    }
    return datePicker.contains(element);
  },

  handleSelect(date) {
    this.setSelected(date);

    setTimeout(() => {
      this.hideCalendar();
    }, 200);
  },

  setSelected(date) {
    this.props.onChange(date);
  },

  invalidateSelected() {
    if (this.props.selected === null) return;
    this.props.onChange(null);
  },

  onInputClick(event) {
    var previousFocusState = this.state.focus;

    this.setState({
      focus: (event.target === ReactDOM.findDOMNode(this.refs.input) ? !this.state.focus : true),
      datePickerHasFocus: this.doesDatePickerContainElement(event.target)
    }, () => {
      this.forceUpdate();
      if (previousFocusState && !this.state.datePickerHasFocus) {
        this.hideCalendar();
      }
    });
  },

  onClearClick(event) {
    event.preventDefault();
    this.props.onClear();
    this.props.onChange(null);
  },

  calendar() {
    if (this.state.focus) {
      return (
        <Popover
          attachment={this.props.popoverAttachment}
          targetAttachment={this.props.popoverTargetAttachment}
          targetOffset={this.props.popoverTargetOffset}
          constraints={this.props.tetherConstraints}>

          <Calendar
            ref="calendar"
            weekdays={this.props.weekdays}
            locale={this.props.locale}
            moment={this.props.moment}
            dateFormat={this.props.dateFormatCalendar}
            selected={this.props.selected}
            onSelect={this.handleSelect}
            hideCalendar={this.hideCalendar}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            excludeDates={this.props.excludeDates}
            filterDate={this.props.filterDate}
            handleClick={this.onInputClick}
            includeDates={this.props.includeDates}
            weekStart={this.props.weekStart}
            showYearDropdown={this.props.showYearDropdown} />
        </Popover>
      );
    }
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
      <div className="datepicker__input-container">
        <DateInput
          ref="input"
          id={this.props.id}
          name={this.props.name}
          date={this.props.selected}
          dateFormat={this.props.dateFormat}
          focus={this.state.focus}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          handleClick={this.onInputClick}
          handleEnter={this.hideCalendar}
          setSelected={this.setSelected}
          invalidateSelected={this.invalidateSelected}
          placeholderText={this.props.placeholderText}
          disabled={this.props.disabled}
          className={this.props.className}
          title={this.props.title}
          readOnly={this.props.readOnly}
          required={this.props.required}
          tabIndex={this.props.tabIndex}
          isTypeable={this.props.isTypeable} />
        {this.renderClearButton()}
        {this.props.disabled ? null : this.calendar()}
      </div>
    );
  }
});

module.exports = DatePicker;
