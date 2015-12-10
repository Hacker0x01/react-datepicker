var React = require( "react" );
var ReactDOM = require( "react-dom" );
var DateUtil = require( "./util/date" );
var moment = require( "moment" );

var DateInput = React.createClass( {
  getInitialState: function() {
    function generateYears( year ) {
      var list = [];
      for ( var i = 0; i < 5; i++ ) {
        list.push( year - i );
      }
      return list;
    }
    return {
      year: this.props.year,
      yearsList: generateYears( this.props.year ),
      dropdownVisible: false
    };
  },

  renderReadView: function() {
    return (
      <div className="datepicker__year-read-view" onClick={this.toggleDropdown}>
        <span className="datepicker__year-read-view--selected-year">{this.props.year}</span>
        <span className="datepicker__year-read-view--down-arrow"></span>
      </div>
    );
  },

  renderDropdown: function() {
    return (
      <div className="datepicker__year-dropdown"
        value={this.props.year}
        onChange={this.onChange}>
        { this.renderOptions() }
      </div>
    );
  },

  renderOptions: function() {
    var selectedYear = this.props.year;
    var options = this.state.yearsList.map( year =>
      <div className="datepicker__year-option"
        key={year}
        onClick={this.onChange.bind( this, year )}>
        { selectedYear === year ? <span className="datepicker__year-option--selected">&#10003;</span> : "" }
        { year }
      </div>
    );

    options.unshift(
      <div className="datepicker__year-option"
        key={"upcoming"}
        onClick={this.incrementYears}>
        <a className="datepicker__navigation datepicker__navigation--years datepicker__navigation--years-upcoming"></a>
      </div>
    );
    options.push(
      <div className="datepicker__year-option"
        key={"previous"}
        onClick={this.decrementYears}>
        <a className="datepicker__navigation datepicker__navigation--years datepicker__navigation--years-previous"></a>
      </div>
    );
    return options;
  },

  onChange: function( year ) {
    this.toggleDropdown();
    if ( parseInt( year ) === this.props.year ) return;
    this.props.onChange( year );
  },

  toggleDropdown: function() {
    this.setState( {
      dropdownVisible: !this.state.dropdownVisible
    } );
  },

  shiftYears: function( amount ) {
    var years = this.state.yearsList.map( function( year ) {
      return year + amount;
    } );

    this.setState( {
      yearsList: years
    } );
  },

  incrementYears: function() {
    return this.shiftYears( 1 );
  },

  decrementYears: function() {
    return this.shiftYears( -1 );
  },

  render: function() {
    return (
      <div>
        { this.state.dropdownVisible ? this.renderDropdown() : this.renderReadView() }
      </div>
    );
  }
} );

module.exports = DateInput;
