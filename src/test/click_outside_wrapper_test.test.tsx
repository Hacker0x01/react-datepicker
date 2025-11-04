/**
 * Test suite for ClickOutsideWrapper component
 *
 * ClickOutsideWrapper is a utility component that detects clicks outside of its children
 * and triggers a callback. It's commonly used for closing dropdowns, modals, and popovers.
 *
 * Key features tested:
 * - Click detection (inside vs outside)
 * - Ignore class functionality
 * - Event listener cleanup
 * - Composed events support (Shadow DOM)
 * - Ref forwarding
 *
 * @see ../click_outside_wrapper.tsx
 */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ClickOutsideWrapper } from "../click_outside_wrapper";

describe("ClickOutsideWrapper", () => {
  /**
   * Test: Basic rendering
   * Verifies that children are rendered correctly within the wrapper.
   */
  it("should render children", () => {
    const { getByText } = render(
      <ClickOutsideWrapper onClickOutside={jest.fn()}>
        <div>Test Content</div>
      </ClickOutsideWrapper>,
    );

    expect(getByText("Test Content")).toBeTruthy();
  });

  /**
   * Test: Outside click detection
   * When a user clicks outside the wrapper, the onClickOutside callback should be triggered.
   */
  it("should call onClickOutside when clicking outside", () => {
    const handleClickOutside = jest.fn();
    const { container } = render(
      <div>
        <ClickOutsideWrapper onClickOutside={handleClickOutside}>
          <div>Inside Content</div>
        </ClickOutsideWrapper>
        <div data-testid="outside">Outside Content</div>
      </div>,
    );

    const outsideElement = container.querySelector('[data-testid="outside"]');
    fireEvent.mouseDown(outsideElement!);

    expect(handleClickOutside).toHaveBeenCalledTimes(1);
  });

  /**
   * Test: Inside click handling
   * Clicks inside the wrapper should NOT trigger the onClickOutside callback.
   */
  it("should not call onClickOutside when clicking inside", () => {
    const handleClickOutside = jest.fn();
    const { getByText } = render(
      <ClickOutsideWrapper onClickOutside={handleClickOutside}>
        <div>Inside Content</div>
      </ClickOutsideWrapper>,
    );

    fireEvent.mouseDown(getByText("Inside Content"));

    expect(handleClickOutside).not.toHaveBeenCalled();
  });

  /**
   * Test: Custom styling
   * Verifies that custom CSS classes are properly applied to the wrapper element.
   */
  it("should apply custom className", () => {
    const { container } = render(
      <ClickOutsideWrapper onClickOutside={jest.fn()} className="custom-class">
        <div>Test Content</div>
      </ClickOutsideWrapper>,
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });

  /**
   * Test: Inline styles
   * Ensures that inline styles are correctly applied to the wrapper element.
   */
  it("should apply custom style", () => {
    const customStyle = { backgroundColor: "red", padding: "10px" };
    const { container } = render(
      <ClickOutsideWrapper onClickOutside={jest.fn()} style={customStyle}>
        <div>Test Content</div>
      </ClickOutsideWrapper>,
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.backgroundColor).toBe("red");
    expect(wrapper.style.padding).toBe("10px");
  });

  /**
   * Test: Ref forwarding
   * When a containerRef is provided, it should be properly assigned to the wrapper element.
   */
  it("should use containerRef when provided", () => {
    const containerRef = React.createRef<HTMLDivElement>();
    render(
      <ClickOutsideWrapper
        onClickOutside={jest.fn()}
        containerRef={containerRef}
      >
        <div>Test Content</div>
      </ClickOutsideWrapper>,
    );

    expect(containerRef.current).not.toBeNull();
    expect(containerRef.current?.tagName).toBe("DIV");
  });

  /**
   * Test: Ignore class functionality
   * Elements with the specified ignoreClass should not trigger onClickOutside,
   * while other outside elements should still trigger it.
   */
  it("should ignore clicks on elements with ignoreClass", () => {
    const handleClickOutside = jest.fn();
    const { container } = render(
      <div>
        <ClickOutsideWrapper
          onClickOutside={handleClickOutside}
          ignoreClass="ignore-me"
        >
          <div>Inside Content</div>
        </ClickOutsideWrapper>
        <div className="ignore-me" data-testid="ignored">
          Ignored Content
        </div>
        <div data-testid="not-ignored">Not Ignored Content</div>
      </div>,
    );

    const ignoredElement = container.querySelector('[data-testid="ignored"]');
    fireEvent.mouseDown(ignoredElement!);
    expect(handleClickOutside).not.toHaveBeenCalled();

    const notIgnoredElement = container.querySelector(
      '[data-testid="not-ignored"]',
    );
    fireEvent.mouseDown(notIgnoredElement!);
    expect(handleClickOutside).toHaveBeenCalledTimes(1);
  });

  /**
   * Test: Composed events (Shadow DOM support)
   * Tests that the component correctly handles composed events which traverse
   * Shadow DOM boundaries using composedPath().
   */
  it("should handle composed events with composedPath", () => {
    const handleClickOutside = jest.fn();
    const { container } = render(
      <div>
        <ClickOutsideWrapper onClickOutside={handleClickOutside}>
          <div>Inside Content</div>
        </ClickOutsideWrapper>
        <div data-testid="outside">Outside Content</div>
      </div>,
    );

    const outsideElement = container.querySelector('[data-testid="outside"]');
    const event = new MouseEvent("mousedown", {
      bubbles: true,
      composed: true,
    });

    // Mock composedPath to simulate Shadow DOM event traversal
    Object.defineProperty(event, "composedPath", {
      value: () => [outsideElement, container, document.body, document],
    });

    outsideElement?.dispatchEvent(event);

    expect(handleClickOutside).toHaveBeenCalledTimes(1);
  });

  /**
   * Test: Memory leak prevention
   * Ensures that event listeners are properly removed when the component unmounts
   * to prevent memory leaks.
   */
  it("should cleanup event listener on unmount", () => {
    const handleClickOutside = jest.fn();
    const removeEventListenerSpy = jest.spyOn(document, "removeEventListener");

    const { unmount } = render(
      <ClickOutsideWrapper onClickOutside={handleClickOutside}>
        <div>Test Content</div>
      </ClickOutsideWrapper>,
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function),
    );

    removeEventListenerSpy.mockRestore();
  });

  /**
   * Test: Dynamic handler updates
   * When the onClickOutside prop changes, the new handler should be used
   * instead of the old one.
   */
  it("should update onClickOutside handler when prop changes", () => {
    const firstHandler = jest.fn();
    const secondHandler = jest.fn();

    const { rerender, container } = render(
      <div>
        <ClickOutsideWrapper onClickOutside={firstHandler}>
          <div>Inside Content</div>
        </ClickOutsideWrapper>
        <div data-testid="outside">Outside Content</div>
      </div>,
    );

    rerender(
      <div>
        <ClickOutsideWrapper onClickOutside={secondHandler}>
          <div>Inside Content</div>
        </ClickOutsideWrapper>
        <div data-testid="outside">Outside Content</div>
      </div>,
    );

    const outsideElement = container.querySelector('[data-testid="outside"]');
    fireEvent.mouseDown(outsideElement!);

    expect(firstHandler).not.toHaveBeenCalled();
    expect(secondHandler).toHaveBeenCalledTimes(1);
  });
});
