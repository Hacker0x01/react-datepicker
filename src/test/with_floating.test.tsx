import { render } from "@testing-library/react";
import React from "react";

import withFloating from "../with_floating";

import type { FloatingProps } from "../with_floating";

// Mock @floating-ui/react
const mockUseFloating = jest.fn(() => ({
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
}));

const mockArrow = jest.fn(() => ({ name: "arrow", fn: jest.fn() }));
const mockOffset = jest.fn(() => ({ name: "offset", fn: jest.fn() }));
const mockFlip = jest.fn(() => ({ name: "flip", fn: jest.fn() }));
const mockAutoUpdate = jest.fn();

jest.mock("@floating-ui/react", () => ({
  useFloating: mockUseFloating,
  arrow: mockArrow,
  offset: mockOffset,
  flip: mockFlip,
  autoUpdate: mockAutoUpdate,
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
    const WrappedComponent = withFloating(TestComponent);
    render(<WrappedComponent />);

    expect(mockUseFloating).toHaveBeenCalledWith(
      expect.objectContaining({
        open: false,
      }),
    );
  });

  it("respects hidePopper prop when set to false", () => {
    const WrappedComponent = withFloating(TestComponent);
    render(<WrappedComponent hidePopper={false} />);

    expect(mockUseFloating).toHaveBeenCalledWith(
      expect.objectContaining({
        open: true,
      }),
    );
  });

  it("passes popperPlacement to useFloating", () => {
    const WrappedComponent = withFloating(TestComponent);
    render(<WrappedComponent popperPlacement="top" />);

    expect(mockUseFloating).toHaveBeenCalledWith(
      expect.objectContaining({
        placement: "top",
      }),
    );
  });

  it("includes default middleware", () => {
    const WrappedComponent = withFloating(TestComponent);
    render(<WrappedComponent />);

    expect(mockFlip).toHaveBeenCalledWith({ padding: 15 });
    expect(mockOffset).toHaveBeenCalledWith(10);
    expect(mockArrow).toHaveBeenCalled();
    expect(mockUseFloating).toHaveBeenCalledWith(
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
    const customModifier = { name: "custom", fn: jest.fn() };
    const WrappedComponent = withFloating(TestComponent);
    render(<WrappedComponent popperModifiers={[customModifier]} />);

    expect(mockUseFloating).toHaveBeenCalledWith(
      expect.objectContaining({
        middleware: expect.arrayContaining([
          expect.objectContaining({ name: "custom" }),
        ]),
      }),
    );
  });

  it("passes popperProps to useFloating", () => {
    const customProps = { strategy: "fixed" as const };
    const WrappedComponent = withFloating(TestComponent);
    render(<WrappedComponent popperProps={customProps} />);

    expect(mockUseFloating).toHaveBeenCalledWith(
      expect.objectContaining({
        strategy: "fixed",
      }),
    );
  });

  it("sets whileElementsMounted to autoUpdate", () => {
    const WrappedComponent = withFloating(TestComponent);
    render(<WrappedComponent />);

    expect(mockUseFloating).toHaveBeenCalledWith(
      expect.objectContaining({
        whileElementsMounted: mockAutoUpdate,
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
    const WrappedComponent = withFloating(TestComponent);

    const { rerender } = render(<WrappedComponent hidePopper={true} />);
    expect(mockUseFloating).toHaveBeenCalledWith(
      expect.objectContaining({ open: false }),
    );

    rerender(<WrappedComponent hidePopper={false} />);
    expect(mockUseFloating).toHaveBeenCalledWith(
      expect.objectContaining({ open: true }),
    );
  });
});
