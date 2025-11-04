import { render } from "@testing-library/react";
import React from "react";

import withFloating from "../with_floating";

import type { FloatingProps } from "../with_floating";

// Mock @floating-ui/react
jest.mock("@floating-ui/react", () => ({
  useFloating: jest.fn(() => ({
    placement: "bottom",
    strategy: "absolute",
    middlewareData: {},
    x: 0,
    y: 0,
    isPositioned: true,
    update: jest.fn(),
    floatingStyles: { position: "absolute" as const, top: 0, left: 0 },
    refs: {
      reference: { current: null },
      floating: { current: null },
      setFloating: jest.fn(),
      setReference: jest.fn(),
    },
    elements: {
      reference: null,
      floating: null,
      domReference: null,
    },
    context: {},
  })),
  arrow: jest.fn(() => ({ name: "arrow", fn: jest.fn() })),
  offset: jest.fn(() => ({ name: "offset", fn: jest.fn() })),
  flip: jest.fn(() => ({ name: "flip", fn: jest.fn() })),
  autoUpdate: jest.fn(),
}));

interface TestComponentProps extends FloatingProps {
  testProp?: string;
}

const TestComponent: React.FC<TestComponentProps> = ({
  testProp,
  popperProps,
}) => (
  <div data-testid="test-component" data-test-prop={testProp}>
    <div data-testid="placement">{popperProps.placement}</div>
    <div data-testid="arrow-ref">
      {popperProps.arrowRef.current ? "has-ref" : "no-ref"}
    </div>
  </div>
);

describe("withFloating", () => {
  it("wraps component and provides popperProps", () => {
    const WrappedComponent = withFloating(TestComponent);
    const { container } = render(<WrappedComponent />);

    expect(
      container.querySelector('[data-testid="test-component"]'),
    ).toBeTruthy();
    expect(
      container.querySelector('[data-testid="placement"]')?.textContent,
    ).toBe("bottom");
  });

  it("passes through original props", () => {
    const WrappedComponent = withFloating(TestComponent);
    const { container } = render(<WrappedComponent testProp="custom-value" />);

    const testComponent = container.querySelector(
      '[data-testid="test-component"]',
    );
    expect(testComponent?.getAttribute("data-test-prop")).toBe("custom-value");
  });

  it("provides arrowRef in popperProps", () => {
    const WrappedComponent = withFloating(TestComponent);
    const { container } = render(<WrappedComponent />);

    expect(
      container.querySelector('[data-testid="arrow-ref"]')?.textContent,
    ).toBe("no-ref");
  });

  it("sets hidePopper to true by default", () => {
    const { useFloating } = require("@floating-ui/react");
    const WrappedComponent = withFloating(TestComponent);
    render(<WrappedComponent />);

    expect(useFloating).toHaveBeenCalledWith(
      expect.objectContaining({
        open: false,
      }),
    );
  });

  it("respects hidePopper prop when set to false", () => {
    const { useFloating } = require("@floating-ui/react");
    const WrappedComponent = withFloating(TestComponent);
    render(<WrappedComponent hidePopper={false} />);

    expect(useFloating).toHaveBeenCalledWith(
      expect.objectContaining({
        open: true,
      }),
    );
  });

  it("passes popperPlacement to useFloating", () => {
    const { useFloating } = require("@floating-ui/react");
    const WrappedComponent = withFloating(TestComponent);
    render(<WrappedComponent popperPlacement="top" />);

    expect(useFloating).toHaveBeenCalledWith(
      expect.objectContaining({
        placement: "top",
      }),
    );
  });

  it("includes default middleware", () => {
    const { useFloating, flip, offset, arrow } = require("@floating-ui/react");
    const WrappedComponent = withFloating(TestComponent);
    render(<WrappedComponent />);

    expect(flip).toHaveBeenCalledWith({ padding: 15 });
    expect(offset).toHaveBeenCalledWith(10);
    expect(arrow).toHaveBeenCalled();
    expect(useFloating).toHaveBeenCalledWith(
      expect.objectContaining({
        middleware: expect.arrayContaining([
          expect.objectContaining({ name: "flip" }),
          expect.objectContaining({ name: "offset" }),
          expect.objectContaining({ name: "arrow" }),
        ]),
      }),
    );
  });

  it("includes custom popperModifiers", () => {
    const { useFloating } = require("@floating-ui/react");
    const customModifier = { name: "custom", fn: jest.fn() };
    const WrappedComponent = withFloating(TestComponent);
    render(<WrappedComponent popperModifiers={[customModifier]} />);

    expect(useFloating).toHaveBeenCalledWith(
      expect.objectContaining({
        middleware: expect.arrayContaining([
          expect.objectContaining({ name: "custom" }),
        ]),
      }),
    );
  });

  it("passes popperProps to useFloating", () => {
    const { useFloating } = require("@floating-ui/react");
    const customProps = { strategy: "fixed" as const };
    const WrappedComponent = withFloating(TestComponent);
    render(<WrappedComponent popperProps={customProps} />);

    expect(useFloating).toHaveBeenCalledWith(
      expect.objectContaining({
        strategy: "fixed",
      }),
    );
  });

  it("sets whileElementsMounted to autoUpdate", () => {
    const { useFloating, autoUpdate } = require("@floating-ui/react");
    const WrappedComponent = withFloating(TestComponent);
    render(<WrappedComponent />);

    expect(useFloating).toHaveBeenCalledWith(
      expect.objectContaining({
        whileElementsMounted: autoUpdate,
      }),
    );
  });

  it("sets displayName correctly", () => {
    const NamedComponent: React.FC<FloatingProps> = () => <div />;
    NamedComponent.displayName = "MyComponent";

    const WrappedComponent = withFloating(NamedComponent);
    expect(WrappedComponent.displayName).toBe("withFloating(MyComponent)");
  });

  it("sets displayName from component name if displayName not set", () => {
    function MyNamedFunction(_props: FloatingProps) {
      return <div />;
    }

    const WrappedComponent = withFloating(MyNamedFunction);
    expect(WrappedComponent.displayName).toBe("withFloating(MyNamedFunction)");
  });

  it("sets displayName to Component if no name available", () => {
    const AnonymousComponent: React.FC<FloatingProps> = () => <div />;

    const WrappedComponent = withFloating(AnonymousComponent);
    expect(WrappedComponent.displayName).toBe(
      "withFloating(AnonymousComponent)",
    );
  });

  it("handles hidePopper boolean correctly", () => {
    const { useFloating } = require("@floating-ui/react");
    const WrappedComponent = withFloating(TestComponent);

    const { rerender } = render(<WrappedComponent hidePopper={true} />);
    expect(useFloating).toHaveBeenCalledWith(
      expect.objectContaining({ open: false }),
    );

    rerender(<WrappedComponent hidePopper={false} />);
    expect(useFloating).toHaveBeenCalledWith(
      expect.objectContaining({ open: true }),
    );
  });
});
