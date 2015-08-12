var React = require( "react" );

var Popover = React.createClass( {
  displayName: "Popover",

  propTypes: {
    attachment: React.PropTypes.string,
    targetAttachment: React.PropTypes.string,
    targetOffset: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      attachment: "top left",
      targetAttachment: "bottom left",
      targetOffset: "10px 0"
    };
  },

  componentWillMount: function() {
    var popoverContainer = document.createElement( "span" );
    popoverContainer.className = "datepicker__container";

    this._popoverElement = popoverContainer;

    document.querySelector( "body" ).appendChild( this._popoverElement );
  },

  componentDidMount: function() {
    this._renderPopover();
  },

  componentDidUpdate: function() {
    this._renderPopover();
  },

  _popoverComponent: function() {
    var className = this.props.className;
    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  },

  _tetherOptions: function() {
    return {
      element: this._popoverElement,
      target: this.getDOMNode().parentElement.querySelector( "input" ),
      attachment: this.props.attachment,
      targetAttachment: this.props.targetAttachment,
      targetOffset: this.props.targetOffset,
      optimizations: {
        moveElement: false // always moves to <body> anyway!
      },
      constraints: [
        {
          to: "window",
          attachment: "together"
        }
      ]
    };
  },

  _renderPopover: function() {
    React.render( this._popoverComponent(), this._popoverElement );

    if ( this._tether != null ) {
      this._tether.setOptions( this._tetherOptions() );
    } else if ( window && document ) {
      var Tether = require( "tether" );
      this._tether = new Tether( this._tetherOptions() );
    }
  },

  componentWillUnmount: function() {
    this._tether.destroy();
    React.unmountComponentAtNode( this._popoverElement );
    if ( this._popoverElement.parentNode ) {
      this._popoverElement.parentNode.removeChild( this._popoverElement );
    }
  },

  render: function() {
    return <span/>;
  }
} );

module.exports = Popover;
