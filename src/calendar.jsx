var React = require( "react" );
var Day = require( "./day" );
var DateUtil = require( "./util/date" );
var map = require( "lodash/collection/map" );
var some = require( "lodash/collection/some" );

var Calendar = React.createClass( {
  mixins: [ require( "react-onclickoutside" ) ],

  propTypes: {
    weekdays: React.PropTypes.array,
    locale: React.PropTypes.string,
    moment: React.PropTypes.func.isRequired,
    dateFormat: React.PropTypes.string.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    hideCalendar: React.PropTypes.func.isRequired,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    startDate: React.PropTypes.object,
    endDate: React.PropTypes.object,
    excludeDates: React.PropTypes.array,
    weekStart: React.PropTypes.string
  },

  handleClickOutside: function() {
    this.props.hideCalendar();
  },

  getInitialState: function() {
    return {
      date: this.localizeDateUtil( new DateUtil( this.props.selected ).safeClone( this.props.moment() ) )
    };
  },

  getDefaultProps: function() {
    return {
      weekStart: "1"
    };
  },

  componentWillReceiveProps: function( nextProps ) {
    if ( nextProps.selected === null ) { return; }

    // When the selected date changed
    if ( nextProps.selected !== this.props.selected ) {
      this.setState( {
        date: this.localizeDateUtil( new DateUtil( nextProps.selected ).clone() )
      } );
    }
  },

  localizeDateUtil: function( dateUtil ) {
    var thisMoment = dateUtil.moment();
    if ( this.props.locale ) thisMoment.locale( this.props.locale );
    if ( this.props.weekStart ) thisMoment._locale._week.dow = this.props.weekStart;
    return dateUtil;
  },

  increaseMonth: function() {
    this.setState( {
      date: this.state.date.addMonth()
    } );
  },

  decreaseMonth: function() {
    this.setState( {
      date: this.state.date.subtractMonth()
    } );
  },

  weeks: function() {
    return this.state.date.mapWeeksInMonth( this.renderWeek );
  },

  handleDayClick: function( day ) {
    this.props.onSelect( day );
  },

  renderWeek: function( weekStart, key ) {
    if ( !weekStart.weekInMonth( this.state.date ) ) {
      return;
    }

    return (
      <div key={key}>
        {this.days( weekStart )}
      </div>
    );
  },

  renderDay: function( day, key ) {
    var minDate = new DateUtil( this.props.minDate ).safeClone(),
        maxDate = new DateUtil( this.props.maxDate ).safeClone(),
        excludeDates,
        disabled,
        inRange = day.inRange( this.props.startDate, this.props.endDate );

    if ( this.props.excludeDates && Array.isArray( this.props.excludeDates ) ) {
      excludeDates = map( this.props.excludeDates, function( date ) {
        return new DateUtil( date ).safeClone();
      } );
    }

    disabled = day.isBefore( minDate ) || day.isAfter( maxDate ) ||
      some( excludeDates, function( xDay ) { return day.sameDay( xDay ); } );

    return (
      <Day
        key={key}
        day={day}
        date={this.state.date}
        onClick={this.handleDayClick.bind( this, day )}
        selected={new DateUtil( this.props.selected )}
        inRange={inRange}
        disabled={disabled} />
    );
  },

  days: function( weekStart ) {
    return weekStart.mapDaysInWeek( this.renderDay );
  },

  header: function() {
    var localeData = this.state.date.moment().localeData();
    var weekdays = localeData._weekdaysMin.slice( 0 );
    weekdays = weekdays.concat( weekdays.splice( 0, localeData._week.dow ) );
    return weekdays.map( function( day, key ) {
      return <div className="datepicker__day" key={key}>{day}</div>;
    } );
  },

  render: function() {
    var locale = this.state.date.moment().locale();
    return (
      <div className="datepicker">
        <div className="datepicker__triangle"></div>
        <div className="datepicker__header">
          <a className="datepicker__navigation datepicker__navigation--previous"
              onClick={this.decreaseMonth}>
          </a>
          <span className="datepicker__current-month">
            {this.state.date.localeFormat( locale, this.props.dateFormat )}
          </span>
          <a className="datepicker__navigation datepicker__navigation--next"
              onClick={this.increaseMonth}>
          </a>
          <div>
            {this.header()}
          </div>
        </div>
        <div className="datepicker__month">
          {this.weeks()}
        </div>
      </div>
    );
  }
} );

module.exports = Calendar;
