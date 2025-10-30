import { render, fireEvent } from "@testing-library/react";
import React from "react";

import TabLoop from "../tab_loop";

describe("TabLoop", () => {
  describe("when enableTabLoop is true (default)", () => {
    it("should render tab loop container with start and end sentinels", () => {
      const { container } = render(
        <TabLoop>
          <button>Button 1</button>
        </TabLoop>,
      );

      const tabLoopContainer = container.querySelector(
        ".react-datepicker__tab-loop",
      );
      expect(tabLoopContainer).not.toBeNull();

      const startSentinel = container.querySelector(
        ".react-datepicker__tab-loop__start",
      );
      expect(startSentinel).not.toBeNull();
      expect(startSentinel?.getAttribute("tabIndex")).toBe("0");

      const endSentinel = container.querySelector(
        ".react-datepicker__tab-loop__end",
      );
      expect(endSentinel).not.toBeNull();
      expect(endSentinel?.getAttribute("tabIndex")).toBe("0");
    });

    it("should focus last tabbable child when start sentinel is focused", () => {
      const { container } = render(
        <TabLoop>
          <button>Button 1</button>
          <button>Button 2</button>
          <button>Button 3</button>
        </TabLoop>,
      );

      const buttons = container.querySelectorAll("button");
      const startSentinel = container.querySelector(
        ".react-datepicker__tab-loop__start",
      ) as HTMLElement;

      // Mock focus on the last button
      const focusSpy = jest.spyOn(buttons[2] as HTMLElement, "focus");

      fireEvent.focus(startSentinel);

      expect(focusSpy).toHaveBeenCalled();
      focusSpy.mockRestore();
    });

    it("should focus first tabbable child when end sentinel is focused", () => {
      const { container } = render(
        <TabLoop>
          <button>Button 1</button>
          <button>Button 2</button>
          <button>Button 3</button>
        </TabLoop>,
      );

      const buttons = container.querySelectorAll("button");
      const endSentinel = container.querySelector(
        ".react-datepicker__tab-loop__end",
      ) as HTMLElement;

      // Mock focus on the first button
      const focusSpy = jest.spyOn(buttons[0] as HTMLElement, "focus");

      fireEvent.focus(endSentinel);

      expect(focusSpy).toHaveBeenCalled();
      focusSpy.mockRestore();
    });

    it("should handle multiple focusable element types", () => {
      const { container } = render(
        <TabLoop>
          <button>Button</button>
          <input type="text" placeholder="Input" />
          <select>
            <option>Option</option>
          </select>
          <textarea placeholder="Textarea" />
          <a href="#">Link</a>
        </TabLoop>,
      );

      const startSentinel = container.querySelector(
        ".react-datepicker__tab-loop__start",
      ) as HTMLElement;
      const endSentinel = container.querySelector(
        ".react-datepicker__tab-loop__end",
      ) as HTMLElement;

      const link = container.querySelector("a") as HTMLElement;
      const button = container.querySelector("button") as HTMLElement;

      const linkFocusSpy = jest.spyOn(link, "focus");
      const buttonFocusSpy = jest.spyOn(button, "focus");

      fireEvent.focus(startSentinel);
      expect(linkFocusSpy).toHaveBeenCalled();

      fireEvent.focus(endSentinel);
      expect(buttonFocusSpy).toHaveBeenCalled();

      linkFocusSpy.mockRestore();
      buttonFocusSpy.mockRestore();
    });

    it("should filter out disabled elements", () => {
      const { container } = render(
        <TabLoop>
          <button>Button 1</button>
          <button disabled>Button 2 (disabled)</button>
          <button>Button 3</button>
        </TabLoop>,
      );

      const buttons = container.querySelectorAll("button");
      const endSentinel = container.querySelector(
        ".react-datepicker__tab-loop__end",
      ) as HTMLElement;

      // Should focus Button 1, skipping the disabled button
      const focusSpy = jest.spyOn(buttons[0] as HTMLElement, "focus");

      fireEvent.focus(endSentinel);

      expect(focusSpy).toHaveBeenCalled();
      focusSpy.mockRestore();
    });

    it("should filter out elements with tabIndex -1", () => {
      const { container } = render(
        <TabLoop>
          <button>Button 1</button>
          <button tabIndex={-1}>Button 2 (tabIndex -1)</button>
          <button>Button 3</button>
        </TabLoop>,
      );

      const buttons = container.querySelectorAll("button");
      const endSentinel = container.querySelector(
        ".react-datepicker__tab-loop__end",
      ) as HTMLElement;

      // Should focus Button 1, skipping button with tabIndex -1
      const focusSpy = jest.spyOn(buttons[0] as HTMLElement, "focus");

      fireEvent.focus(endSentinel);

      expect(focusSpy).toHaveBeenCalled();
      focusSpy.mockRestore();
    });

    it("should filter out anchor elements with tabIndex -1", () => {
      const { container } = render(
        <TabLoop>
          <button>Button 1</button>
          <a href="#" tabIndex={-1}>
            Link (tabIndex -1)
          </a>
          <button>Button 2</button>
        </TabLoop>,
      );

      const buttons = container.querySelectorAll("button");
      const endSentinel = container.querySelector(
        ".react-datepicker__tab-loop__end",
      ) as HTMLElement;

      // Should focus Button 1, skipping the anchor with tabIndex -1
      const focusSpy = jest.spyOn(buttons[0] as HTMLElement, "focus");

      fireEvent.focus(endSentinel);

      expect(focusSpy).toHaveBeenCalled();
      focusSpy.mockRestore();
    });

    it("should handle elements with custom tabindex", () => {
      const { container } = render(
        <TabLoop>
          <button>Button 1</button>
          <div tabIndex={0}>Div with tabindex</div>
          <button>Button 2</button>
        </TabLoop>,
      );

      const startSentinel = container.querySelector(
        ".react-datepicker__tab-loop__start",
      ) as HTMLElement;
      const endSentinel = container.querySelector(
        ".react-datepicker__tab-loop__end",
      ) as HTMLElement;

      const buttons = container.querySelectorAll("button");

      // Test that custom tabindex elements are included in tab children
      const firstButton = buttons[0] as HTMLElement;
      const lastButton = buttons[1] as HTMLElement;

      const firstFocusSpy = jest.spyOn(firstButton, "focus");
      const lastFocusSpy = jest.spyOn(lastButton, "focus");

      // Focus end sentinel should focus first tabbable element
      fireEvent.focus(endSentinel);
      expect(firstFocusSpy).toHaveBeenCalled();

      // Focus start sentinel should focus last tabbable element
      fireEvent.focus(startSentinel);
      expect(lastFocusSpy).toHaveBeenCalled();

      firstFocusSpy.mockRestore();
      lastFocusSpy.mockRestore();
    });

    it("should not focus if there are no tabbable children", () => {
      const { container } = render(
        <TabLoop>
          <div>Not focusable</div>
        </TabLoop>,
      );

      const startSentinel = container.querySelector(
        ".react-datepicker__tab-loop__start",
      ) as HTMLElement;

      // Should not throw an error
      expect(() => fireEvent.focus(startSentinel)).not.toThrow();
    });

    it("should not focus if there is only one tabbable child", () => {
      const { container } = render(
        <TabLoop>
          <button>Only Button</button>
        </TabLoop>,
      );

      const button = container.querySelector("button") as HTMLElement;
      const startSentinel = container.querySelector(
        ".react-datepicker__tab-loop__start",
      ) as HTMLElement;

      const focusSpy = jest.spyOn(button, "focus");

      fireEvent.focus(startSentinel);

      // Should not focus because length is not > 1
      expect(focusSpy).not.toHaveBeenCalled();
      focusSpy.mockRestore();
    });
  });

  describe("when enableTabLoop is false", () => {
    it("should render children without tab loop wrapper", () => {
      const { container } = render(
        <TabLoop enableTabLoop={false}>
          <button>Button 1</button>
        </TabLoop>,
      );

      const tabLoopContainer = container.querySelector(
        ".react-datepicker__tab-loop",
      );
      expect(tabLoopContainer).toBeNull();

      const startSentinel = container.querySelector(
        ".react-datepicker__tab-loop__start",
      );
      expect(startSentinel).toBeNull();

      const endSentinel = container.querySelector(
        ".react-datepicker__tab-loop__end",
      );
      expect(endSentinel).toBeNull();

      const button = container.querySelector("button");
      expect(button).not.toBeNull();
    });

    it("should render nothing when no children are provided", () => {
      const { container } = render(<TabLoop enableTabLoop={false} />);

      expect(container.firstChild).toBeNull();
    });
  });

  describe("edge cases", () => {
    it("should handle undefined children", () => {
      const { container } = render(<TabLoop>{undefined}</TabLoop>);

      const tabLoopContainer = container.querySelector(
        ".react-datepicker__tab-loop",
      );
      expect(tabLoopContainer).not.toBeNull();
    });

    it("should handle null children", () => {
      const { container } = render(<TabLoop>{null}</TabLoop>);

      const tabLoopContainer = container.querySelector(
        ".react-datepicker__tab-loop",
      );
      expect(tabLoopContainer).not.toBeNull();
    });

    it("should handle mixed enabled and disabled inputs", () => {
      const { container } = render(
        <TabLoop>
          <input type="text" placeholder="Input 1" />
          <input type="text" disabled placeholder="Input 2 (disabled)" />
          <input type="text" placeholder="Input 3" />
        </TabLoop>,
      );

      const inputs = container.querySelectorAll("input:not([disabled])");
      const endSentinel = container.querySelector(
        ".react-datepicker__tab-loop__end",
      ) as HTMLElement;

      const focusSpy = jest.spyOn(inputs[0] as HTMLElement, "focus");

      fireEvent.focus(endSentinel);

      expect(focusSpy).toHaveBeenCalled();
      focusSpy.mockRestore();
    });

    it("should handle complex nested structure", () => {
      const { container } = render(
        <TabLoop>
          <div>
            <button>Button 1</button>
            <div>
              <input type="text" />
            </div>
          </div>
          <button>Button 2</button>
        </TabLoop>,
      );

      const buttons = container.querySelectorAll("button");
      const startSentinel = container.querySelector(
        ".react-datepicker__tab-loop__start",
      ) as HTMLElement;

      const focusSpy = jest.spyOn(buttons[1] as HTMLElement, "focus");

      fireEvent.focus(startSentinel);

      expect(focusSpy).toHaveBeenCalled();
      focusSpy.mockRestore();
    });
  });
});
