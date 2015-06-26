var React = require('react');
var Popover = require('./popover');
var DateUtil = require('./util/date');
var Calendar = require('./calendar');
var DateInput = require('./date_input');
var moment = require('moment');

var DatePicker = React.createClass({

  propTypes: {
    weekdays: React.PropTypes.arrayOf(React.PropTypes.string),
    locale: React.PropTypes.string,
    dateFormatCalendar: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    onBlur: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      weekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      locale: 'en',
      dateFormatCalendar: "MMMM YYYY",
      moment: moment,
      onChange: function() {}
    };
  },


  getInitialState: function() {
    return {
      focus: false,
      virtualFocus: false,
      selected: this.props.selected
    };
  },

  getValue: function() {
    return this.state.selected;
  },

  handleFocus: function() {
    this.setState({
      focus: true
    });
  },

  handleBlur: function () {
    this.setState({ virtualFocus: false });
    setTimeout(function(){
      if (!this.state.virtualFocus && typeof this.props.onBlur === 'function') {
        this.props.onBlur(this.state.selected);
        this.hideCalendar();
      }
    }.bind(this), 200);
  },

  hideCalendar: function() {
    setTimeout(function() {
      this.setState({
        focus: false
      });
    }.bind(this), 0);
  },

  handleSelect: function(date) {
    this.setSelected(date);

    setTimeout(function(){
      this.hideCalendar();
    }.bind(this), 200);
  },

  setSelected: function(date) {
    var moment = date.moment();

    this.props.onChange(moment);

    this.setState({
      selected: moment,
      virtualFocus: true
    });
  },

  clearSelected: function() {
    this.props.onChange(null);

    this.setState({
      selected: null
    });
  },

  onInputClick: function() {
    this.setState({
      focus: true,
      virtualFocus: true
    });
  },

  calendar: function() {
    if (this.state.focus) {
      return (
        <Popover>
          <Calendar
            weekdays={this.props.weekdays}
            locale={this.props.locale}
            moment={this.props.moment}
            dateFormat={this.props.dateFormatCalendar}
            selected={this.state.selected}
            onSelect={this.handleSelect}
            hideCalendar={this.hideCalendar}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            excludeDates={this.props.excludeDates}
            weekStart={this.props.weekStart} />
        </Popover>
      );
    }
  },

  render: function() {

    return (
      <div>
        <DateInput
          name={this.props.name}
          date={this.state.selected}
          dateFormat={this.props.dateFormat}
          focus={this.state.focus}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          handleClick={this.onInputClick}
          handleEnter={this.hideCalendar}
          setSelected={this.setSelected}
          clearSelected={this.clearSelected}
          hideCalendar={this.hideCalendar}
          placeholderText={this.props.placeholderText} />
        {this.calendar()}
      </div>
    );
  }
});

module.exports = DatePicker;
