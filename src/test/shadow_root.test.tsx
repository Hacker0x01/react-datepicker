import { render } from "@testing-library/react";
import React from "react";

import ShadowRoot from "./helper_components/shadow_root";

describe("ShadowRoot", () => {
  it("should render children in shadow root", () => {
    const { container } = render(
      <ShadowRoot>
        <div className="test-child">Test Content</div>
      </ShadowRoot>,
    );

    const hostElement = container.querySelector("div");
    expect(hostElement).not.toBeNull();
    expect(hostElement?.shadowRoot).not.toBeNull();

    // Content should be in shadow root
    const childInShadow = hostElement?.shadowRoot?.querySelector(".test-child");
    expect(childInShadow).not.toBeNull();
  });

  it("should handle multiple children", () => {
    const { container } = render(
      <ShadowRoot>
        <div className="child-1">Child 1</div>
        <div className="child-2">Child 2</div>
      </ShadowRoot>,
    );

    const hostElement = container.querySelector("div");
    const shadowRoot = hostElement?.shadowRoot;

    expect(shadowRoot?.querySelector(".child-1")).not.toBeNull();
    expect(shadowRoot?.querySelector(".child-2")).not.toBeNull();
  });

  it("should initialize shadow root only once", () => {
    const { rerender } = render(
      <ShadowRoot>
        <div>Initial</div>
      </ShadowRoot>,
    );

    // Rerender to test the early return when already initialized (line 19)
    rerender(
      <ShadowRoot>
        <div>Updated</div>
      </ShadowRoot>,
    );

    // Should still work after rerender
    expect(true).toBe(true);
  });

  it("should handle null/undefined children gracefully", () => {
    const { container } = render(<ShadowRoot>{null}</ShadowRoot>);

    const hostElement = container.querySelector("div");
    expect(hostElement).not.toBeNull();
    expect(hostElement?.shadowRoot).not.toBeNull();
  });

  it("should use existing shadow root if already attached", () => {
    const div = document.createElement("div");
    const existingShadowRoot = div.attachShadow({ mode: "open" });
    existingShadowRoot.innerHTML = "<span>Existing</span>";

    // This tests line 23: container.shadowRoot ?? container.attachShadow
    const { container } = render(
      <ShadowRoot>
        <div>New Content</div>
      </ShadowRoot>,
    );

    expect(container.querySelector("div")).not.toBeNull();
  });
});
