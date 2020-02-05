import React from "react";
import PropTypes from "prop-types";

// TabLoop prevents the user from tabbing outside of the popper
// It creates a tabindex loop so that "Tab" on the last element will focus the first element
// and "Shift Tab" on the first element will focus the last element

const focusableElementsSelector =
  "[tabindex], a, button, input, select, textarea";
const focusableFilter = node => !node.disabled && node.tabIndex !== -1;

export default class TabLoop extends React.Component {
  static get defaultProps() {
    return {
      enableTabLoop: true
    };
  }

  static propTypes = {
    children: PropTypes.any,
    enableTabLoop: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.tabLoopRef = React.createRef();
  }

  // query all focusable elements
  // trim first and last because they are the focus guards
  getTabChildren = () =>
    Array.prototype.slice
      .call(
        this.tabLoopRef.current.querySelectorAll(focusableElementsSelector),
        1,
        -1
      )
      .filter(focusableFilter);

  handleFocusStart = e => {
    const tabChildren = this.getTabChildren();
    tabChildren &&
      tabChildren.length > 1 &&
      tabChildren[tabChildren.length - 1].focus();
  };

  handleFocusEnd = e => {
    const tabChildren = this.getTabChildren();
    tabChildren && tabChildren.length > 1 && tabChildren[0].focus();
  };

  render() {
    if (!this.props.enableTabLoop) {
      return this.props.children;
    }
    return (
      <div className="react-datepicker__tab-loop" ref={this.tabLoopRef}>
        <div
          className="react-datepicker__tab-loop__start"
          tabIndex="0"
          onFocus={this.handleFocusStart}
        />
        {this.props.children}
        <div
          className="react-datepicker__tab-loop__end"
          tabIndex="0"
          onFocus={this.handleFocusEnd}
        />
      </div>
    );
  }
}
