import moment from "moment";
import DateUtil from "./util/date";
import ReactDOM from "react-dom";
import React from "react";

var DateInput = React.createClass( {
  getInitialState() {
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

  renderReadView() {
    return (
      <div className="datepicker__year-read-view" onClick={this.toggleDropdown}>
        <span className="datepicker__year-read-view--selected-year">{this.props.year}</span>
        <span className="datepicker__year-read-view--down-arrow"></span>
      </div>
    );
  },

  renderDropdown() {
    return (
      <div className="datepicker__year-dropdown"
        value={this.props.year}
        onChange={this.onChange}>
        { this.renderOptions() }
      </div>
    );
  },

  renderOptions() {
    var selectedYear = this.props.year;
    var options = this.state.yearsList.map( year =>
      <div className="datepicker__year-option"
        key={year}
        onClick={this.onChange.bind( this, year )}>
        { selectedYear === year ? <span className="datepicker__year-option--selected">✓</span> : "" }
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

  onChange( year ) {
    this.toggleDropdown();
    if ( parseInt( year ) === this.props.year ) return;
    this.props.onChange( year );
  },

  toggleDropdown() {
    this.setState( {
      dropdownVisible: !this.state.dropdownVisible
    } );
  },

  shiftYears( amount ) {
    var years = this.state.yearsList.map( function( year ) {
      return year + amount;
    } );

    this.setState( {
      yearsList: years
    } );
  },

  incrementYears() {
    return this.shiftYears( 1 );
  },

  decrementYears() {
    return this.shiftYears( -1 );
  },

  render() {
    return (
      <div>
        { this.state.dropdownVisible ? this.renderDropdown() : this.renderReadView() }
      </div>
    );
  }
} );

module.exports = DateInput;
