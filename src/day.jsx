var React = require( "react" );
var moment = require( "moment" );

var Day = React.createClass( {
  handleClick: function( event ) {
    if ( this.props.disabled ) return;

    this.props.onClick( event );
  },

  isWeekend: function() {
    var weekday = this.props.day.moment().weekday();
    return weekday === 5 || weekday === 6;
  },

  render: function() {
    var classes = [ "datepicker__day" ];

    if ( this.props.disabled )
      classes.push( "datepicker__day--disabled" );

    if ( this.props.day.sameDay( this.props.selected ) )
      classes.push( "datepicker__day--selected" );

    if ( this.props.day.sameDay( moment() ) )
      classes.push( "datepicker__day--today" );

    if ( this.isWeekend() ) {
      classes.push( "datepicker__day--weekend" );
    }

    return (
      <div className={classes.join( " " )} onClick={this.handleClick}>
        {this.props.day.day()}
      </div>
    );
  }
} );

module.exports = Day;
