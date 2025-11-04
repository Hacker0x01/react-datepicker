import React from "react";
import { render } from "@testing-library/react";
import withFloating, { type FloatingProps } from "../with_floating";
import * as FloatingUI from "@floating-ui/react";

// Mock @floating-ui/react
jest.mock("@floating-ui/react", () => ({
  useFloating: jest.fn(() => ({
    refs: {
      setReference: jest.fn(),
      setFloating: jest.fn(),
    },
    floatingStyles: {
      position: "absolute",
      top: 0,
      left: 0,
    },
    placement: "bottom",
    context: {},
  })),
  arrow: jest.fn(() => ({})),
  offset: jest.fn(() => ({})),
  flip: jest.fn(() => ({})),
  autoUpdate: jest.fn(),
}));

interface TestComponentProps extends FloatingProps {
  testProp?: string;
}

const TestComponent: React.FC<TestComponentProps> = ({
  popperProps,
  hidePopper,
  testProp,
}) => {
  return (
    <div data-testid="test-component">
      <div data-testid="hide-popper">{String(hidePopper)}</div>
      <div data-testid="test-prop">{testProp}</div>
      <div data-testid="has-popper-props">{popperProps ? "true" : "false"}</div>
    </div>
  );
};

describe("withFloating", () => {
  it("should wrap component with floating behavior", () => {
    const WrappedComponent = withFloating(TestComponent);
    const { getByTestId } = render(<WrappedComponent />);

    expect(getByTestId("test-component")).toBeTruthy();
    expect(getByTestId("has-popper-props").textContent).toBe("true");
  });

  it("should pass through component props", () => {
    const WrappedComponent = withFloating(TestComponent);
    const { getByTestId } = render(
      <WrappedComponent testProp="custom-value" />,
    );

    expect(getByTestId("test-prop").textContent).toBe("custom-value");
  });

  it("should default hidePopper to true", () => {
    const WrappedComponent = withFloating(TestComponent);
    const { getByTestId } = render(<WrappedComponent />);

    expect(getByTestId("hide-popper").textContent).toBe("true");
  });

  it("should respect hidePopper prop when set to false", () => {
    const WrappedComponent = withFloating(TestComponent);
    const { getByTestId } = render(<WrappedComponent hidePopper={false} />);

    expect(getByTestId("hide-popper").textContent).toBe("false");
  });

  it("should respect hidePopper prop when set to true", () => {
    const WrappedComponent = withFloating(TestComponent);
    const { getByTestId } = render(<WrappedComponent hidePopper={true} />);

    expect(getByTestId("hide-popper").textContent).toBe("true");
  });

  it("should provide popperProps with floating UI data", () => {
    const WrappedComponent = withFloating(TestComponent);
    const { getByTestId } = render(<WrappedComponent />);

    expect(getByTestId("has-popper-props").textContent).toBe("true");
  });

  it("should set display name correctly", () => {
    const NamedComponent: React.FC<FloatingProps> = () => <div />;
    NamedComponent.displayName = "CustomComponent";

    const WrappedComponent = withFloating(NamedComponent);

    expect(WrappedComponent.displayName).toBe("withFloating(CustomComponent)");
  });

  it("should use component name if displayName is not set", () => {
    const WrappedComponent = withFloating(TestComponent);

    expect(WrappedComponent.displayName).toBe("withFloating(TestComponent)");
  });

  it("should fallback to 'Component' if no name is available", () => {
    const AnonymousComponent: React.FC<FloatingProps> = () => <div />;
    Object.defineProperty(AnonymousComponent, "name", { value: "" });
    Object.defineProperty(AnonymousComponent, "displayName", { value: "" });

    const WrappedComponent = withFloating(AnonymousComponent);

    expect(WrappedComponent.displayName).toBe("withFloating(Component)");
  });

  it("should handle popperModifiers prop", () => {
    const WrappedComponent = withFloating(TestComponent);

    const customModifier = { name: "customModifier" };
    render(<WrappedComponent popperModifiers={[customModifier]} />);

    expect(FloatingUI.useFloating).toHaveBeenCalledWith(
      expect.objectContaining({
        middleware: expect.arrayContaining([customModifier]),
      }),
    );
  });

  it("should handle popperPlacement prop", () => {
    const WrappedComponent = withFloating(TestComponent);

    render(<WrappedComponent popperPlacement="top" />);

    expect(FloatingUI.useFloating).toHaveBeenCalledWith(
      expect.objectContaining({
        placement: "top",
      }),
    );
  });

  it("should handle popperProps prop", () => {
    const WrappedComponent = withFloating(TestComponent);

    const customPopperProps = {
      strategy: "fixed" as const,
    };
    render(<WrappedComponent popperProps={customPopperProps} />);

    expect(FloatingUI.useFloating).toHaveBeenCalledWith(
      expect.objectContaining({
        strategy: "fixed",
      }),
    );
  });

  it("should include default middleware", () => {
    const WrappedComponent = withFloating(TestComponent);

    render(<WrappedComponent />);

    expect(FloatingUI.flip).toHaveBeenCalledWith({ padding: 15 });
    expect(FloatingUI.offset).toHaveBeenCalledWith(10);
    expect(FloatingUI.arrow).toHaveBeenCalled();
    expect(FloatingUI.useFloating).toHaveBeenCalledWith(
      expect.objectContaining({
        middleware: expect.any(Array),
      }),
    );
  });

  it("should set open based on hidePopper", () => {
    const WrappedComponent = withFloating(TestComponent);

    const { rerender } = render(<WrappedComponent hidePopper={true} />);

    expect(FloatingUI.useFloating).toHaveBeenCalledWith(
      expect.objectContaining({
        open: false,
      }),
    );

    rerender(<WrappedComponent hidePopper={false} />);

    expect(FloatingUI.useFloating).toHaveBeenCalledWith(
      expect.objectContaining({
        open: true,
      }),
    );
  });

  it("should include autoUpdate in floating options", () => {
    const WrappedComponent = withFloating(TestComponent);

    render(<WrappedComponent />);

    expect(FloatingUI.useFloating).toHaveBeenCalledWith(
      expect.objectContaining({
        whileElementsMounted: FloatingUI.autoUpdate,
      }),
    );
  });

  it("should provide arrowRef in popperProps", () => {
    const TestComponentWithArrow: React.FC<FloatingProps> = ({
      popperProps,
    }) => {
      return (
        <div data-testid="has-arrow-ref">
          {popperProps.arrowRef ? "true" : "false"}
        </div>
      );
    };

    const WrappedComponent = withFloating(TestComponentWithArrow);
    const { getByTestId } = render(<WrappedComponent />);

    expect(getByTestId("has-arrow-ref").textContent).toBe("true");
  });
});
