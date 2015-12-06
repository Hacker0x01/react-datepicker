var React = require( "react" );
var ReactDOM = require( "react-dom" );
var DateUtil = require( "./util/date" );
var moment = require( "moment" );

var DateInput = React.createClass( {

  // getDefaultProps: function() {
  //   return {
  //     dateFormat: "YYYY-MM-DD",
  //     className: "datepicker__input",
  //     onBlur: function() {}
  //   };
  // },
  //
  getInitialState: function() {
    return {
      year: this.props.year
    };
  },

  //
  // componentDidMount: function() {
  //   this.toggleFocus( this.props.focus );
  // },
  //
  // componentWillReceiveProps: function( newProps ) {
  //   this.toggleFocus( newProps.focus );

    // If we're receiving a different date then apply it.
    // If we're receiving a null date continue displaying the
    // value currently in the textbox.
  //   if ( newProps.date != null && newProps.date != this.props.date ) {
  //       this.setState( {
  //           maybeDate: this.safeDateFormat( newProps.date )
  //       } );
  //   }
  // },
  //
  // toggleFocus: function( focus ) {
  //   if ( focus ) {
  //     this.refs.input.focus();
  //   } else {
  //     this.refs.input.blur();
  //   }
  // },
  //
  // handleChange: function( event ) {
  //   var value = event.target.value;
  //   var date = moment( value, this.props.dateFormat, true );
  //
  //   if ( date.isValid() ) {
  //     this.props.setSelected( new DateUtil( date ) );
  //   } else {
  //       this.props.invalidateSelected();
  //   }
  //
  //   this.setState( {
  //       maybeDate: value
  //   } );
  // },
  //
  // safeDateFormat: function( date ) {
  //   return !!date ? date.format( this.props.dateFormat ) : null;
  // },
  //
  // handleKeyDown: function( event ) {
  //   switch ( event.key ) {
  //   case "Enter":
  //     event.preventDefault();
  //     this.props.handleEnter();
  //     break;
  //   case "Escape":
  //     event.preventDefault();
  //     this.props.hideCalendar();
  //     break;
  //   }
  // },
  //
  // handleClick: function( event ) {
  //   if ( !this.props.disabled ) {
  //     this.props.handleClick( event );
  //   }
  // },

  renderOptions: function() {
    var options = [];
    for ( var i = 0; i < 5; i++ ) {
      options.push(
        <option value={this.props.year - i} key={i}>
          {this.props.year - i}
        </option>
      );
    };
    return options;
  },

  handleScroll: function( event ) {
    console.log( event );
  },

  onChange: function( event ) {
    this.props.onChange( event.target.value );
  },

  render: function() {
    return (
      <select value={this.props.year}
        onChange={this.onChange}
        onScroll={this.handleScroll}>
        {this.renderOptions()}
      </select>
    );
  }
} );

module.exports = DateInput;
