import { render, fireEvent } from "@testing-library/react";
import React from "react";

import { ClickOutsideWrapper } from "../click_outside_wrapper";

describe("ClickOutsideWrapper", () => {
  let onClickOutsideMock: jest.Mock;

  beforeEach(() => {
    onClickOutsideMock = jest.fn();
  });

  afterEach(() => {
    onClickOutsideMock.mockClear();
  });

  it("renders children correctly", () => {
    const { container } = render(
      <ClickOutsideWrapper onClickOutside={onClickOutsideMock}>
        <div data-testid="child">Test Content</div>
      </ClickOutsideWrapper>,
    );

    expect(container.querySelector('[data-testid="child"]')).toBeTruthy();
  });

  it("calls onClickOutside when clicking outside the wrapper", () => {
    const { container } = render(
      <div>
        <ClickOutsideWrapper onClickOutside={onClickOutsideMock}>
          <div data-testid="inside">Inside</div>
        </ClickOutsideWrapper>
        <div data-testid="outside">Outside</div>
      </div>,
    );

    const outsideElement = container.querySelector(
      '[data-testid="outside"]',
    ) as HTMLElement;
    fireEvent.mouseDown(outsideElement);

    expect(onClickOutsideMock).toHaveBeenCalledTimes(1);
  });

  it("does not call onClickOutside when clicking inside the wrapper", () => {
    const { container } = render(
      <ClickOutsideWrapper onClickOutside={onClickOutsideMock}>
        <div data-testid="inside">Inside</div>
      </ClickOutsideWrapper>,
    );

    const insideElement = container.querySelector(
      '[data-testid="inside"]',
    ) as HTMLElement;
    fireEvent.mouseDown(insideElement);

    expect(onClickOutsideMock).not.toHaveBeenCalled();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ClickOutsideWrapper
        onClickOutside={onClickOutsideMock}
        className="custom-class"
      >
        <div>Content</div>
      </ClickOutsideWrapper>,
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toBe("custom-class");
  });

  it("applies custom style", () => {
    const customStyle = { backgroundColor: "red", padding: "10px" };
    const { container } = render(
      <ClickOutsideWrapper
        onClickOutside={onClickOutsideMock}
        style={customStyle}
      >
        <div>Content</div>
      </ClickOutsideWrapper>,
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.backgroundColor).toBe("red");
    expect(wrapper.style.padding).toBe("10px");
  });

  it("does not call onClickOutside when clicking on element with ignoreClass", () => {
    const { container } = render(
      <div>
        <ClickOutsideWrapper
          onClickOutside={onClickOutsideMock}
          ignoreClass="ignore-me"
        >
          <div data-testid="inside">Inside</div>
        </ClickOutsideWrapper>
        <div className="ignore-me" data-testid="ignored">
          Ignored
        </div>
      </div>,
    );

    const ignoredElement = container.querySelector(
      '[data-testid="ignored"]',
    ) as HTMLElement;
    fireEvent.mouseDown(ignoredElement);

    expect(onClickOutsideMock).not.toHaveBeenCalled();
  });

  it("calls onClickOutside when clicking on element without ignoreClass", () => {
    const { container } = render(
      <div>
        <ClickOutsideWrapper
          onClickOutside={onClickOutsideMock}
          ignoreClass="ignore-me"
        >
          <div data-testid="inside">Inside</div>
        </ClickOutsideWrapper>
        <div className="not-ignored" data-testid="not-ignored">
          Not Ignored
        </div>
      </div>,
    );

    const notIgnoredElement = container.querySelector(
      '[data-testid="not-ignored"]',
    ) as HTMLElement;
    fireEvent.mouseDown(notIgnoredElement);

    expect(onClickOutsideMock).toHaveBeenCalledTimes(1);
  });

  it("uses containerRef when provided", () => {
    const containerRef = React.createRef<HTMLDivElement>();
    render(
      <ClickOutsideWrapper
        onClickOutside={onClickOutsideMock}
        containerRef={containerRef}
      >
        <div>Content</div>
      </ClickOutsideWrapper>,
    );

    expect(containerRef.current).toBeTruthy();
    expect(containerRef.current?.tagName).toBe("DIV");
  });

  it("handles composedPath events (e.g. shadow DOM)", () => {
    render(
      <div>
        <ClickOutsideWrapper onClickOutside={onClickOutsideMock}>
          <div data-testid="inside">Inside</div>
        </ClickOutsideWrapper>
      </div>,
    );

    const outsideNode = document.createElement("div");
    document.body.appendChild(outsideNode);

    const event = new MouseEvent("mousedown", {
      bubbles: true,
      composed: true,
    });
    Object.defineProperty(event, "composed", { value: true });
    Object.defineProperty(event, "composedPath", {
      value: () => [outsideNode, document.body],
    });

    outsideNode.dispatchEvent(event);

    expect(onClickOutsideMock).toHaveBeenCalled();

    document.body.removeChild(outsideNode);
  });

  it("cleans up event listener on unmount", () => {
    const removeEventListenerSpy = jest.spyOn(document, "removeEventListener");

    const { unmount } = render(
      <ClickOutsideWrapper onClickOutside={onClickOutsideMock}>
        <div>Content</div>
      </ClickOutsideWrapper>,
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function),
    );

    removeEventListenerSpy.mockRestore();
  });

  it("invokes handler registered on document with composedPath target", () => {
    const addEventListenerSpy = jest.spyOn(document, "addEventListener");
    const removeEventListenerSpy = jest.spyOn(document, "removeEventListener");

    const { unmount } = render(
      <ClickOutsideWrapper onClickOutside={onClickOutsideMock}>
        <div>Inside</div>
      </ClickOutsideWrapper>,
    );

    const handlerEntry = addEventListenerSpy.mock.calls.find(
      ([type]) => type === "mousedown",
    );
    const handler = handlerEntry?.[1] as EventListener;

    const outsideNode = document.createElement("div");
    const mockEvent = {
      composed: true,
      composedPath: () => [outsideNode],
      target: outsideNode,
    } as unknown as MouseEvent;

    handler(mockEvent);

    expect(onClickOutsideMock).toHaveBeenCalledTimes(1);

    unmount();
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it("falls back to event.target when composedPath does not return nodes", () => {
    const addEventListenerSpy = jest.spyOn(document, "addEventListener");
    render(
      <ClickOutsideWrapper onClickOutside={onClickOutsideMock}>
        <div>Inside</div>
      </ClickOutsideWrapper>,
    );

    const handlerEntry = addEventListenerSpy.mock.calls.find(
      ([type]) => type === "mousedown",
    );
    const handler = handlerEntry?.[1] as EventListener;

    const outsideNode = document.createElement("div");
    const mockEvent = {
      composed: true,
      composedPath: () => [{}],
      target: outsideNode,
    } as unknown as MouseEvent;

    handler(mockEvent);

    expect(onClickOutsideMock).toHaveBeenCalledTimes(1);
    addEventListenerSpy.mockRestore();
  });

  it("does not treat non-HTMLElement targets as ignored elements", () => {
    const addEventListenerSpy = jest.spyOn(document, "addEventListener");
    render(
      <ClickOutsideWrapper
        onClickOutside={onClickOutsideMock}
        ignoreClass="ignore-me"
      >
        <div>Inside</div>
      </ClickOutsideWrapper>,
    );

    const handlerEntry = addEventListenerSpy.mock.calls.find(
      ([type]) => type === "mousedown",
    );
    const handler = handlerEntry?.[1] as EventListener;

    const textNode = document.createTextNode("outside");
    const mockEvent = {
      composed: false,
      target: textNode,
    } as unknown as MouseEvent;

    handler(mockEvent);

    expect(onClickOutsideMock).toHaveBeenCalledTimes(1);
    addEventListenerSpy.mockRestore();
  });
});
