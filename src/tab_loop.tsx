import React, { Component, createRef } from "react";

import type { ReactNode } from "react";

interface TabLoopProps {
  enableTabLoop?: boolean;
  children?: ReactNode | undefined;
}

const focusableElementsSelector =
  "[tabindex], a, button, input, select, textarea";
const focusableFilter = (
  node:
    | HTMLButtonElement
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLTextAreaElement
    | HTMLAnchorElement,
) => {
  if (node instanceof HTMLAnchorElement) {
    return node.tabIndex !== -1;
  }

  return !node.disabled && node.tabIndex !== -1;
};

/**
 * `TabLoop` is a React component that manages tabbing behavior for its children.
 *
 * TabLoop prevents the user from tabbing outside of the popper
 * It creates a tabindex loop so that "Tab" on the last element will focus the first element
 * and "Shift Tab" on the first element will focus the last element
 *
 * @component
 * @example
 * <TabLoop enableTabLoop={true}>
 *   <ChildComponent />
 * </TabLoop>
 *
 * @param props - The properties that define the `TabLoop` component.
 * @param props.children - The child components.
 * @param props.enableTabLoop - Whether to enable the tab loop.
 *
 * @returns The `TabLoop` component.
 */
export default class TabLoop extends Component<TabLoopProps> {
  static defaultProps = {
    enableTabLoop: true,
  };

  constructor(props: TabLoopProps) {
    super(props);

    this.tabLoopRef = createRef();
  }

  private tabLoopRef: React.RefObject<HTMLDivElement | null>;

  /**
   * `getTabChildren` is a method of the `TabLoop` class that retrieves all tabbable children of the component.
   *
   * This method uses the `tabbable` library to find all tabbable elements within the `TabLoop` component.
   * It then filters out any elements that are not visible.
   *
   * @returns An array of all tabbable and visible children of the `TabLoop` component.
   */
  getTabChildren = () =>
    Array.prototype.slice
      .call(
        this.tabLoopRef.current?.querySelectorAll(focusableElementsSelector),
        1,
        -1,
      )
      .filter(focusableFilter);

  handleFocusStart = () => {
    const tabChildren = this.getTabChildren();
    tabChildren &&
      tabChildren.length > 1 &&
      tabChildren[tabChildren.length - 1].focus();
  };

  handleFocusEnd = () => {
    const tabChildren = this.getTabChildren();
    tabChildren && tabChildren.length > 1 && tabChildren[0].focus();
  };

  render() {
    if (!(this.props.enableTabLoop ?? TabLoop.defaultProps.enableTabLoop)) {
      return this.props.children;
    }
    return (
      <div className="react-datepicker__tab-loop" ref={this.tabLoopRef}>
        <div
          className="react-datepicker__tab-loop__start"
          tabIndex={0}
          onFocus={this.handleFocusStart}
        />
        {this.props.children}
        <div
          className="react-datepicker__tab-loop__end"
          tabIndex={0}
          onFocus={this.handleFocusEnd}
        />
      </div>
    );
  }
}
