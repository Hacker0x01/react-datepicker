/** @jsx React.DOM */

window.Popover = React.createClass({
  displayName: 'ReactPopover',

  componentWillMount: function() {
    popoverContainer = document.createElement('span');
    popoverContainer.className = 'calendar-container';

    this._tooltipElement = popoverContainer;

    document.querySelector('body').appendChild(this._tooltipElement);
  },

  componentDidMount: function() {
    this._renderTooltip();
  },

  componentDidUpdate: function() {
    this._renderTooltip();
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
      element: this._tooltipElement,
      target: this.getDOMNode().parentElement,
      attachment: 'bottom',
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

  _renderTooltip: function() {
    React.renderComponent(this._popoverComponent(), this._tooltipElement);
    if (this._tether != null) {
      this._tether.setOptions(this._tetherOptions());
    } else {
      this._tether = new Tether(this._tetherOptions());
    }
  },

  componentWillUnmount: function() {
    this._tether.destroy();
    React.unmountComponentAtNode(this._tooltipElement);
    if (this._tooltipElement.parentNode) {
      this._tooltipElement.parentNode.removeChild(this._tooltipElement);
    }
  },

  render: function() {
    return <span/>;
  }
});
