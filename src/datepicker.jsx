var React = require('react');
var Popover = require('./popover');
var DateUtil = require('./util/date');
var Calendar = require('./calendar');
var DateInput = require('./date_input');
var moment = require('moment');

var DatePicker = React.createClass({

  propTypes: {
    onChange: React.PropTypes.func.isRequired
  },

  getDefaultProps: function() {
    return {
      weekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      locale: 'en',
      dateFormatCallendar: "MMMM YYYY",
      moment: moment
    };
  },

  componentDidUpdate: function (props, previousState) {
    if (previousState.focus === true && this.state.focus === false) {
      if (typeof this.props.onBlur === 'function') {
        this.props.onBlur(this.state.value);
      }
    }
  },

  getInitialState: function() {
    return {
      focus: false
    };
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
    this.setState({ value: date.moment() });
    this.props.onChange(date.moment());
  },

  clearSelected: function() {
    this.setState({ value: null });
    this.props.onChange(this.state.value);
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
            selected={this.props.selected}
            onSelect={this.handleSelect}
            hideCalendar={this.hideCalendar}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            weekStart={this.props.weekStart} />
        </Popover>
      );
    }
  },

  render: function() {
    var { onBlur, name, selected, dateFormat, weekdays, locale, dateFormatCallendar, moment, ...props } = this.props;

    return (
      <div>
        <DateInput
          name={name}
          date={selected}
          dateFormat={dateFormat}
          focus={this.state.focus}
          onFocus={this.handleFocus}
          handleClick={this.onInputClick}
          handleEnter={this.hideCalendar}
          setSelected={this.setSelected}
          clearSelected={this.clearSelected}
          hideCalendar={this.hideCalendar}
          placeholderText={this.props.placeholderText}
          { ...props }
            />
        {this.calendar()}
      </div>
    );
  }
});

module.exports = DatePicker;
