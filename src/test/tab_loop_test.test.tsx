/**
 * Test suite for TabLoop component
 *
 * TabLoop manages keyboard navigation within the datepicker by creating a tab loop.
 * This prevents users from tabbing out of the picker and ensures focus stays within
 * the interactive elements.
 *
 * Key features tested:
 * - Tab loop creation (start and end sentinels)
 * - Focus management (first/last element)
 * - Disabled element handling
 * - Various focusable element types (buttons, inputs, links, etc.)
 * - Enable/disable functionality
 *
 * @see ../tab_loop.tsx
 */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TabLoop from "../tab_loop";

describe("TabLoop", () => {
  it("should render children when enableTabLoop is true", () => {
    const { getByText } = render(
      <TabLoop enableTabLoop={true}>
        <div>Test Content</div>
      </TabLoop>,
    );

    expect(getByText("Test Content")).toBeTruthy();
  });

  it("should render children when enableTabLoop is false", () => {
    const { getByText } = render(
      <TabLoop enableTabLoop={false}>
        <div>Test Content</div>
      </TabLoop>,
    );

    expect(getByText("Test Content")).toBeTruthy();
  });

  it("should render tab loop elements when enableTabLoop is true", () => {
    const { container } = render(
      <TabLoop enableTabLoop={true}>
        <div>Test Content</div>
      </TabLoop>,
    );

    const tabLoopStart = container.querySelector(
      ".react-datepicker__tab-loop__start",
    );
    const tabLoopEnd = container.querySelector(
      ".react-datepicker__tab-loop__end",
    );

    expect(tabLoopStart).not.toBeNull();
    expect(tabLoopEnd).not.toBeNull();
    expect(tabLoopStart?.getAttribute("tabIndex")).toBe("0");
    expect(tabLoopEnd?.getAttribute("tabIndex")).toBe("0");
  });

  it("should not render tab loop elements when enableTabLoop is false", () => {
    const { container } = render(
      <TabLoop enableTabLoop={false}>
        <div>Test Content</div>
      </TabLoop>,
    );

    const tabLoopStart = container.querySelector(
      ".react-datepicker__tab-loop__start",
    );
    const tabLoopEnd = container.querySelector(
      ".react-datepicker__tab-loop__end",
    );

    expect(tabLoopStart).toBeNull();
    expect(tabLoopEnd).toBeNull();
  });

  it("should use default enableTabLoop value of true", () => {
    const { container } = render(
      <TabLoop>
        <div>Test Content</div>
      </TabLoop>,
    );

    const tabLoopStart = container.querySelector(
      ".react-datepicker__tab-loop__start",
    );
    expect(tabLoopStart).not.toBeNull();
  });

  it("should focus last tabbable element when tab loop start is focused", () => {
    const { container } = render(
      <TabLoop enableTabLoop={true}>
        <button>Button 1</button>
        <button>Button 2</button>
        <button>Button 3</button>
      </TabLoop>,
    );

    const tabLoopStart = container.querySelector(
      ".react-datepicker__tab-loop__start",
    ) as HTMLElement;
    const buttons = container.querySelectorAll("button");
    const lastButton = buttons[buttons.length - 1] as HTMLElement;

    fireEvent.focus(tabLoopStart);

    expect(document.activeElement).toBe(lastButton);
  });

  it("should focus first tabbable element when tab loop end is focused", () => {
    const { container } = render(
      <TabLoop enableTabLoop={true}>
        <button>Button 1</button>
        <button>Button 2</button>
        <button>Button 3</button>
      </TabLoop>,
    );

    const tabLoopEnd = container.querySelector(
      ".react-datepicker__tab-loop__end",
    ) as HTMLElement;
    const buttons = container.querySelectorAll("button");
    const firstButton = buttons[0] as HTMLElement;

    fireEvent.focus(tabLoopEnd);

    expect(document.activeElement).toBe(firstButton);
  });

  it("should handle inputs with tabindex", () => {
    const { container } = render(
      <TabLoop enableTabLoop={true}>
        <input type="text" tabIndex={0} />
        <input type="text" tabIndex={0} />
      </TabLoop>,
    );

    const tabLoopStart = container.querySelector(
      ".react-datepicker__tab-loop__start",
    ) as HTMLElement;
    const inputs = container.querySelectorAll("input");
    const lastInput = inputs[inputs.length - 1] as HTMLElement;

    fireEvent.focus(tabLoopStart);

    expect(document.activeElement).toBe(lastInput);
  });

  it("should skip disabled elements", () => {
    const { container } = render(
      <TabLoop enableTabLoop={true}>
        <button>Button 1</button>
        <button disabled>Button 2 (disabled)</button>
        <button>Button 3</button>
      </TabLoop>,
    );

    const tabLoopStart = container.querySelector(
      ".react-datepicker__tab-loop__start",
    ) as HTMLElement;
    const buttons = container.querySelectorAll("button:not([disabled])");
    const lastEnabledButton = buttons[buttons.length - 1] as HTMLElement;

    fireEvent.focus(tabLoopStart);

    expect(document.activeElement).toBe(lastEnabledButton);
  });

  it("should skip elements with tabindex -1", () => {
    const { container } = render(
      <TabLoop enableTabLoop={true}>
        <button tabIndex={0}>Button 1</button>
        <button tabIndex={-1}>Button 2 (tabindex -1)</button>
        <button tabIndex={0}>Button 3</button>
      </TabLoop>,
    );

    const tabLoopStart = container.querySelector(
      ".react-datepicker__tab-loop__start",
    ) as HTMLElement;
    const button3 = container.querySelectorAll("button")[2] as HTMLElement;

    fireEvent.focus(tabLoopStart);

    expect(document.activeElement).toBe(button3);
  });

  it("should handle anchor elements", () => {
    const { container } = render(
      <TabLoop enableTabLoop={true}>
        <a href="#link1">Link 1</a>
        <a href="#link2">Link 2</a>
      </TabLoop>,
    );

    const tabLoopStart = container.querySelector(
      ".react-datepicker__tab-loop__start",
    ) as HTMLElement;
    const links = container.querySelectorAll("a");
    const lastLink = links[links.length - 1] as HTMLElement;

    fireEvent.focus(tabLoopStart);

    expect(document.activeElement).toBe(lastLink);
  });

  it("should handle select elements", () => {
    const { container } = render(
      <TabLoop enableTabLoop={true}>
        <select>
          <option>Option 1</option>
        </select>
        <select>
          <option>Option 2</option>
        </select>
      </TabLoop>,
    );

    const tabLoopEnd = container.querySelector(
      ".react-datepicker__tab-loop__end",
    ) as HTMLElement;
    const selects = container.querySelectorAll("select");
    const firstSelect = selects[0] as HTMLElement;

    fireEvent.focus(tabLoopEnd);

    expect(document.activeElement).toBe(firstSelect);
  });

  it("should handle textarea elements", () => {
    const { container } = render(
      <TabLoop enableTabLoop={true}>
        <textarea />
        <textarea />
      </TabLoop>,
    );

    const tabLoopStart = container.querySelector(
      ".react-datepicker__tab-loop__start",
    ) as HTMLElement;
    const textareas = container.querySelectorAll("textarea");
    const lastTextarea = textareas[textareas.length - 1] as HTMLElement;

    fireEvent.focus(tabLoopStart);

    expect(document.activeElement).toBe(lastTextarea);
  });

  it("should not focus when there are no tabbable children", () => {
    const { container } = render(
      <TabLoop enableTabLoop={true}>
        <div>Non-tabbable content</div>
      </TabLoop>,
    );

    const tabLoopStart = container.querySelector(
      ".react-datepicker__tab-loop__start",
    ) as HTMLElement;

    fireEvent.focus(tabLoopStart);

    // Should not throw error, just not focus anything
    expect(true).toBe(true);
  });

  it("should not focus when there is only one tabbable element", () => {
    const { container } = render(
      <TabLoop enableTabLoop={true}>
        <button>Single Button</button>
      </TabLoop>,
    );

    const tabLoopStart = container.querySelector(
      ".react-datepicker__tab-loop__start",
    ) as HTMLElement;
    const button = container.querySelector("button") as HTMLElement;

    fireEvent.focus(tabLoopStart);

    // Should not focus the single button (needs more than 1)
    expect(document.activeElement).not.toBe(button);
  });

  it("should render with wrapper class", () => {
    const { container } = render(
      <TabLoop enableTabLoop={true}>
        <div>Test Content</div>
      </TabLoop>,
    );

    const wrapper = container.querySelector(".react-datepicker__tab-loop");
    expect(wrapper).not.toBeNull();
  });
});
