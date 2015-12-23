import isEqual from "lodash/lang/isEqual";
import moment from "moment";
import DateInput from "./date_input";
import Calendar from "./calendar";
import DateUtil from "./util/date";
import Popover from "./popover";
import React from "react";

var DatePicker = React.createClass({

  propTypes: {
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
    tabIndex: React.PropTypes.number
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
      onBlur() {}
    };
  },

  getInitialState() {
    return {
      focus: false,
      virtualFocus: false,
      selected: this.props.selected
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      selected: nextProps.selected
    });
  },

  shouldComponentUpdate(nextProps, nextState) {
    return !(isEqual(nextProps, this.props) && isEqual(nextState, this.state));
  },

  getValue() {
    return this.state.selected;
  },

  handleFocus() {
    this.props.onFocus();
    this.setState({
      focus: true
    });
  },

  handleBlur() {
    this.setState({ virtualFocus: false }, () => {
      setTimeout(() => {
        if (!this.state.virtualFocus) {
          this.props.onBlur(this.state.selected);
          this.hideCalendar();
        }
      }, 200);
    });
  },

  hideCalendar() {
    setTimeout(() => {
      this.setState({
        focus: false
      });
    }, 0);
  },

  handleSelect(date) {
    this.setSelected(date);

    setTimeout(() => {
      this.hideCalendar();
    }, 200);
  },

  setSelected(date) {
    this.setState({
      selected: date.moment()
    }, () => {
      this.props.onChange(this.state.selected);
    });
  },

  invalidateSelected() {
    if (this.state.selected === null) return;
    this.props.onChange(null);
  },

  onInputClick() {
    if (!this.state.virtualFocus) {
      return this.setState({
        focus: true,
        virtualFocus: true
      });
    }
    this.setState({ virtualFocus: false });
  },

  onClearClick(event) {
    event.preventDefault();

    // Due to issues with IE onchange events sometimes this gets noisy, so skip if we've already cleared
    if (this.state.selected === null) return;

    this.setState({
      selected: null
    }, () => {
      this.props.onChange(null);
    });
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
            selected={this.state.selected}
            onSelect={this.handleSelect}
            hideCalendar={this.hideCalendar}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            excludeDates={this.props.excludeDates}
            handleClick={this.onInputClick}
            includeDates={this.props.includeDates}
            weekStart={this.props.weekStart}
            showYearDropdown={this.props.showYearDropdown} />
        </Popover>
      );
    }
  },

  render() {
    var clearButton = null;
    if (this.props.isClearable && this.state.selected != null) {
      clearButton = (
        <a className="close-icon" href="#" onClick={this.onClearClick}></a>
      );
    }

    return (
      <div className="datepicker__input-container">
        <DateInput
          ref="input"
          id={this.props.id}
          name={this.props.name}
          date={this.state.selected}
          dateFormat={this.props.dateFormat}
          focus={this.state.focus}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          handleClick={this.onInputClick}
          handleEnter={this.hideCalendar}
          setSelected={this.setSelected}
          invalidateSelected={this.invalidateSelected}
          hideCalendar={this.hideCalendar}
          placeholderText={this.props.placeholderText}
          disabled={this.props.disabled}
          className={this.props.className}
          title={this.props.title}
          readOnly={this.props.readOnly}
          required={this.props.required}
          tabIndex={this.props.tabIndex} />
        {clearButton}
        {this.props.disabled ? null : this.calendar()}
      </div>
    );
  }
});

module.exports = DatePicker;
