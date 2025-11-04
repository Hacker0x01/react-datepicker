import { render, fireEvent } from "@testing-library/react";
import React from "react";

import { PopperComponent } from "../popper_component";

// Mock the withFloating HOC
jest.mock("../with_floating", () => ({
  __esModule: true,
  default: <T,>(Component: React.ComponentType<T>) => Component,
}));

// Mock FloatingArrow component
jest.mock("@floating-ui/react", () => ({
  FloatingArrow: ({ className }: { className: string }) => (
    <div data-testid="floating-arrow" className={className} />
  ),
}));

describe("PopperComponent", () => {
  const mockPopperProps = {
    refs: {
      reference: { current: null },
      floating: { current: null },
      setFloating: jest.fn(),
      setReference: jest.fn(),
      setPositionReference: jest.fn(),
    },
    floatingStyles: { position: "absolute" as const, top: 0, left: 0 },
    placement: "bottom" as const,
    strategy: "absolute" as const,
    x: 0,
    y: 0,
    middlewareData: {},
    isPositioned: true,
    update: jest.fn(),
    elements: {
      reference: null,
      floating: null,
      domReference: null,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context: {} as any,
    arrowRef: { current: null },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;

  const defaultProps = {
    popperComponent: <div data-testid="popper-content">Popper Content</div>,
    targetComponent: <div data-testid="target">Target</div>,
    popperOnKeyDown: jest.fn(),
    popperProps: mockPopperProps,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders target component", () => {
    const { container } = render(<PopperComponent {...defaultProps} />);

    expect(container.querySelector('[data-testid="target"]')).toBeTruthy();
  });

  it("renders target component with wrapper class", () => {
    const { container } = render(<PopperComponent {...defaultProps} />);

    const wrapper = container.querySelector(".react-datepicker-wrapper");
    expect(wrapper).toBeTruthy();
    expect(wrapper?.querySelector('[data-testid="target"]')).toBeTruthy();
  });

  it("applies custom wrapperClassName", () => {
    const { container } = render(
      <PopperComponent {...defaultProps} wrapperClassName="custom-wrapper" />,
    );

    const wrapper = container.querySelector(
      ".react-datepicker-wrapper.custom-wrapper",
    );
    expect(wrapper).toBeTruthy();
  });

  it("hides popper when hidePopper is true", () => {
    const { container } = render(
      <PopperComponent {...defaultProps} hidePopper={true} />,
    );

    expect(container.querySelector('[data-testid="popper-content"]')).toBe(
      null,
    );
  });

  it("shows popper when hidePopper is false", () => {
    const { container } = render(
      <PopperComponent {...defaultProps} hidePopper={false} />,
    );

    expect(
      container.querySelector('[data-testid="popper-content"]'),
    ).toBeTruthy();
  });

  it("applies popper className", () => {
    const { container } = render(
      <PopperComponent
        {...defaultProps}
        hidePopper={false}
        className="custom-popper"
      />,
    );

    const popper = container.querySelector(
      ".react-datepicker-popper.custom-popper",
    );
    expect(popper).toBeTruthy();
  });

  it("applies data-placement attribute", () => {
    const { container } = render(
      <PopperComponent {...defaultProps} hidePopper={false} />,
    );

    const popper = container.querySelector(".react-datepicker-popper");
    expect(popper?.getAttribute("data-placement")).toBe("bottom");
  });

  it("calls popperOnKeyDown when key is pressed in popper", () => {
    const onKeyDownMock = jest.fn();
    const { container } = render(
      <PopperComponent
        {...defaultProps}
        hidePopper={false}
        popperOnKeyDown={onKeyDownMock}
      />,
    );

    const popper = container.querySelector(
      ".react-datepicker-popper",
    ) as HTMLElement;
    fireEvent.keyDown(popper, { key: "Escape" });

    expect(onKeyDownMock).toHaveBeenCalledTimes(1);
  });

  it("renders arrow when showArrow is true", () => {
    const { container } = render(
      <PopperComponent {...defaultProps} hidePopper={false} showArrow={true} />,
    );

    expect(
      container.querySelector('[data-testid="floating-arrow"]'),
    ).toBeTruthy();
  });

  it("does not render arrow when showArrow is false", () => {
    const { container } = render(
      <PopperComponent
        {...defaultProps}
        hidePopper={false}
        showArrow={false}
      />,
    );

    expect(container.querySelector('[data-testid="floating-arrow"]')).toBe(
      null,
    );
  });

  it("wraps popper in TabLoop when enableTabLoop is true", () => {
    const { container } = render(
      <PopperComponent
        {...defaultProps}
        hidePopper={false}
        enableTabLoop={true}
      />,
    );

    expect(container.querySelector(".react-datepicker__tab-loop")).toBeTruthy();
  });

  it("renders in portal when portalId is provided", () => {
    const { container } = render(
      <PopperComponent
        {...defaultProps}
        hidePopper={false}
        portalId="test-portal"
      />,
    );

    // Popper should not be in the main container
    expect(container.querySelector('[data-testid="popper-content"]')).toBe(
      null,
    );

    // Popper should be in the portal
    const portalRoot = document.getElementById("test-portal");
    expect(portalRoot).toBeTruthy();
    expect(
      portalRoot?.querySelector('[data-testid="popper-content"]'),
    ).toBeTruthy();

    // Cleanup
    portalRoot?.remove();
  });

  it("does not render in portal when hidePopper is true even with portalId", () => {
    const { container } = render(
      <PopperComponent
        {...defaultProps}
        hidePopper={true}
        portalId="test-portal-2"
      />,
    );

    expect(container.querySelector('[data-testid="popper-content"]')).toBe(
      null,
    );
    expect(document.getElementById("test-portal-2")).toBe(null);
  });

  it("wraps popper in custom container when popperContainer is provided", () => {
    const CustomContainer: React.FC<{ children?: React.ReactNode }> = ({
      children,
    }) => <div data-testid="custom-container">{children}</div>;

    const { container } = render(
      <PopperComponent
        {...defaultProps}
        hidePopper={false}
        popperContainer={CustomContainer}
      />,
    );

    expect(
      container.querySelector('[data-testid="custom-container"]'),
    ).toBeTruthy();
    expect(
      container
        .querySelector('[data-testid="custom-container"]')
        ?.querySelector('[data-testid="popper-content"]'),
    ).toBeTruthy();
  });

  it("applies floating styles to popper", () => {
    const customStyles = {
      position: "absolute" as const,
      top: 100,
      left: 200,
    };

    const customPopperProps = {
      ...mockPopperProps,
      floatingStyles: customStyles,
    };

    const { container } = render(
      <PopperComponent
        {...defaultProps}
        hidePopper={false}
        popperProps={customPopperProps}
      />,
    );

    const popper = container.querySelector(
      ".react-datepicker-popper",
    ) as HTMLElement;
    expect(popper.style.position).toBe("absolute");
    expect(popper.style.top).toBe("100px");
    expect(popper.style.left).toBe("200px");
  });

  it("renders with shadow DOM when portalHost is provided", () => {
    const shadowHost = document.createElement("div");
    document.body.appendChild(shadowHost);
    const shadowRoot = shadowHost.attachShadow({ mode: "open" });

    render(
      <PopperComponent
        {...defaultProps}
        hidePopper={false}
        portalId="shadow-portal"
        portalHost={shadowRoot}
      />,
    );

    const portalRoot = shadowRoot.getElementById("shadow-portal");
    expect(portalRoot).toBeTruthy();
    expect(
      portalRoot?.querySelector('[data-testid="popper-content"]'),
    ).toBeTruthy();

    shadowHost.remove();
  });
});
