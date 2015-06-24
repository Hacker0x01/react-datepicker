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
    dateFormatCallendar: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired
  },

  getDefaultProps: function() {
    return {
      weekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      locale: 'en',
      dateFormatCallendar: "MMMM YYYY",
      moment: moment,
      onChange: function() {}
    };
  },

  getInitialState: function() {
    return {
      focus: false,
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
      selected: moment
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
      focus: true
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
            dateFormat={this.props.dateFormatCallendar}
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
