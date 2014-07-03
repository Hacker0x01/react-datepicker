/** @jsx React.DOM */

var Popover = React.createClass({
  displayName: 'Popover',

  componentWillMount: function() {
    popoverContainer = document.createElement('span');
    popoverContainer.className = 'calendar-container';

    this._popoverElement = popoverContainer;

    document.querySelector('body').appendChild(this._popoverElement);
  },

  componentDidMount: function() {
    this._renderPopover();
  },

  componentDidUpdate: function() {
    this._renderPopover();
  },

  _popoverComponent: function() {
    var className = this.props.className || 'translucent-popover';
    return (
      <div className={className}>
        <div className="popover-content">
          {this.props.children}
        </div>
      </div>
    );
  },

  _tetherOptions: function() {
    return {
      element: this._popoverElement,
      target: 'input',
      attachment: 'bottom center',
      optimizations: {
        moveElement: false
      },
      constraints: [
        {
          to: 'scrollParent',
          attachment: 'together'
        }
      ]
    };
  },

  _renderPopover: function() {
    React.renderComponent(this._popoverComponent(), this._popoverElement);
    if (this._tether != null) {
      this._tether.setOptions(this._tetherOptions());
    } else {
      this._tether = new Tether(this._tetherOptions());
    }
  },

  componentWillUnmount: function() {
    this._tether.destroy();
    React.unmountComponentAtNode(this._popoverElement);
    if (this._popoverElement.parentNode) {
      this._popoverElement.parentNode.removeChild(this._popoverElement);
    }
  },

  render: function() {
    return <span/>;
  }
});

module.exports = Popover;
