import moment from "moment";
import React from "react";

var Day = React.createClass( {
  handleClick( event ) {
    if ( this.props.disabled ) return;

    this.props.onClick( event );
  },

  isWeekend() {
    var weekday = this.props.day.moment().weekday();
    return weekday === 5 || weekday === 6;
  },

  render() {
    var classes = [ "datepicker__day" ];

    if ( this.props.disabled )
      classes.push( "datepicker__day--disabled" );

    if ( this.props.day.sameDay( this.props.selected ) )
      classes.push( "datepicker__day--selected" );

    if ( this.props.inRange )
      classes.push( "datepicker__day--in-range" );

    if ( this.props.day.sameDay( moment() ) )
      classes.push( "datepicker__day--today" );

    if ( this.isWeekend() )
      classes.push( "datepicker__day--weekend" );

    return (
      <div className={classes.join( " " )} onClick={this.handleClick}>
        {this.props.day.day()}
      </div>
    );
  }
} );

module.exports = Day;
