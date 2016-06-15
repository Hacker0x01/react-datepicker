'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _tether = require('tether');

var _tether2 = _interopRequireDefault(_tether);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function childrenPropType(_ref, propName, componentName) {
  var children = _ref.children;

  var childCount = _react.Children.count(children);
  if (childCount <= 0) {
    return new Error(componentName + ' expects at least one child to use as the target element.');
  } else if (childCount > 2) {
    return new Error('Only a max of two children allowed in ' + componentName + '.');
  }
}

var attachmentPositions = ['top left', 'top center', 'top right', 'middle left', 'middle center', 'middle right', 'bottom left', 'bottom center', 'bottom right'];

var TetherComponent = _react2.default.createClass({
  displayName: 'TetherComponent',

  propTypes: {
    attachment: _react.PropTypes.oneOf(attachmentPositions).isRequired,
    children: childrenPropType,
    className: _react.PropTypes.string,
    classPrefix: _react.PropTypes.string,
    classes: _react.PropTypes.object,
    constraints: _react.PropTypes.array,
    enabled: _react.PropTypes.bool,
    id: _react.PropTypes.string,
    offset: _react.PropTypes.string,
    optimizations: _react.PropTypes.object,
    renderElementTag: _react.PropTypes.string,
    renderElementTo: _react.PropTypes.any,
    style: _react.PropTypes.object,
    targetAttachment: _react.PropTypes.oneOf(attachmentPositions),
    targetModifier: _react.PropTypes.string,
    targetOffset: _react.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      renderElementTag: 'div',
      renderElementTo: null
    };
  },
  componentDidMount: function componentDidMount() {
    this._targetNode = _reactDom2.default.findDOMNode(this);
    this._update();
  },
  componentDidUpdate: function componentDidUpdate() {
    this._update();
  },
  componentWillUnmount: function componentWillUnmount() {
    this._destroy();
  },
  disable: function disable() {
    this._tether.disable();
  },
  enable: function enable() {
    this._tether.enable();
  },
  position: function position() {
    this._tether.position();
  },
  _destroy: function _destroy() {
    if (this._elementParentNode) {
      _reactDom2.default.unmountComponentAtNode(this._elementParentNode);
      this._elementParentNode.parentNode.removeChild(this._elementParentNode);
    }

    if (this._tether) {
      this._tether.destroy();
    }

    this._elementParentNode = null;
    this._tether = null;
  },
  _update: function _update() {
    var _this = this;

    var _props = this.props;
    var children = _props.children;
    var renderElementTag = _props.renderElementTag;
    var renderElementTo = _props.renderElementTo;

    var elementComponent = children[1];

    // if no element component provided, bail out
    if (!elementComponent) {
      // destroy Tether elements if they have been created
      if (this._tether) {
        this._destroy();
      }
      return;
    }

    // create element node container if it hasn't been yet
    if (!this._elementParentNode) {
      // create a node that we can stick our content Component in
      this._elementParentNode = document.createElement(renderElementTag);

      // append node to the end of the body
      var renderTo = renderElementTo || document.body;
      renderTo.appendChild(this._elementParentNode);
    }

    // render element component into the DOM
    _reactDom2.default.unstable_renderSubtreeIntoContainer(this, elementComponent, this._elementParentNode, function () {
      // don't update Tether until the subtree has finished rendering
      _this._updateTether();
    });
  },
  _updateTether: function _updateTether() {
    var _props2 = this.props;
    var renderElementTag = _props2.renderElementTag;
    var renderElementTo = _props2.renderElementTo;

    var options = _objectWithoutProperties(_props2, ['renderElementTag', 'renderElementTo']); // eslint-disable-line no-unused-vars


    var tetherOptions = _extends({
      target: this._targetNode,
      element: this._elementParentNode
    }, options);

    if (!this._tether) {
      this._tether = new _tether2.default(tetherOptions);
    } else {
      this._tether.setOptions(tetherOptions);
    }

    this._tether.position();
  },
  render: function render() {
    var children = this.props.children;

    var firstChild = null;

    // we use forEach because the second child could be null
    // causing children to not be an array
    _react.Children.forEach(children, function (child, index) {
      if (index === 0) {
        firstChild = child;
        return;
      }
    });

    return firstChild;
  }
});

module.exports = TetherComponent;
