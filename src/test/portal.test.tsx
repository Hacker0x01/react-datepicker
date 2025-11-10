import { cleanup, render } from "@testing-library/react";
import React from "react";

import Portal from "../portal";

describe("Portal", () => {
  afterEach(() => {
    const portals = document.querySelectorAll('[id^="test-portal"]');
    portals.forEach((portal) => portal.remove());
    cleanup();
  });

  it("renders children into a portal", () => {
    const { container } = render(
      <Portal portalId="test-portal-1">
        <div data-testid="portal-content">Portal Content</div>
      </Portal>,
    );

    expect(
      container.querySelector('[data-testid="portal-content"]'),
    ).toBeNull();

    const portalRoot = document.getElementById("test-portal-1");
    expect(portalRoot).toBeTruthy();
    expect(
      portalRoot?.querySelector('[data-testid="portal-content"]'),
    ).toBeTruthy();
  });

  it("creates portal root if it doesn't exist", () => {
    expect(document.getElementById("test-portal-2")).toBeNull();

    render(
      <Portal portalId="test-portal-2">
        <div>Content</div>
      </Portal>,
    );

    const portalRoot = document.getElementById("test-portal-2");
    expect(portalRoot).not.toBeNull();
    expect(portalRoot?.parentElement).toBe(document.body);
  });

  it("uses existing portal root if it exists", () => {
    const existingRoot = document.createElement("div");
    existingRoot.id = "test-portal-3";
    document.body.appendChild(existingRoot);

    render(
      <Portal portalId="test-portal-3">
        <div data-testid="existing-content">Using Existing</div>
      </Portal>,
    );

    const portalRoot = document.getElementById("test-portal-3");
    expect(portalRoot).toBe(existingRoot);
    expect(
      portalRoot?.querySelector('[data-testid="existing-content"]'),
    ).toBeTruthy();

    existingRoot.remove();
  });

  it("removes portal content on unmount", () => {
    const { unmount } = render(
      <Portal portalId="test-portal-4">
        <div data-testid="portal-content">Cleanup Test</div>
      </Portal>,
    );

    const portalRoot = document.getElementById("test-portal-4");
    expect(
      portalRoot?.querySelector('[data-testid="portal-content"]'),
    ).toBeTruthy();

    unmount();

    const stillExists = document.getElementById("test-portal-4");
    expect(stillExists).toBeTruthy();
    expect(
      stillExists?.querySelector('[data-testid="portal-content"]'),
    ).toBeNull();
  });

  it("renders multiple children correctly", () => {
    render(
      <Portal portalId="test-portal-5">
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <span data-testid="child-3">Child 3</span>
      </Portal>,
    );

    const portalRoot = document.getElementById("test-portal-5");
    expect(portalRoot?.querySelector('[data-testid="child-1"]')).toBeTruthy();
    expect(portalRoot?.querySelector('[data-testid="child-2"]')).toBeTruthy();
    expect(portalRoot?.querySelector('[data-testid="child-3"]')).toBeTruthy();
  });

  it("handles multiple portals", () => {
    render(
      <Portal portalId="test-portal-6a">
        <div>Portal A</div>
      </Portal>,
    );

    render(
      <Portal portalId="test-portal-6b">
        <div>Portal B</div>
      </Portal>,
    );

    expect(document.getElementById("test-portal-6a")).not.toBeNull();
    expect(document.getElementById("test-portal-6b")).not.toBeNull();
  });

  it("works with shadow DOM when portalHost is provided", () => {
    const shadowHost = document.createElement("div");
    document.body.appendChild(shadowHost);
    const shadowRoot = shadowHost.attachShadow({ mode: "open" });

    render(
      <Portal portalId="test-portal-shadow" portalHost={shadowRoot}>
        <div data-testid="shadow-content">Shadow Content</div>
      </Portal>,
    );

    const portalRoot = shadowRoot.getElementById("test-portal-shadow");
    expect(portalRoot).toBeTruthy();
    expect(
      portalRoot?.querySelector('[data-testid="shadow-content"]'),
    ).toBeTruthy();

    shadowHost.remove();
  });

  it("appends to portalHost instead of document.body when provided", () => {
    const customHost = document.createElement("div");
    document.body.appendChild(customHost);
    const shadowRoot = customHost.attachShadow({ mode: "open" });

    render(
      <Portal portalId="test-portal-custom-host" portalHost={shadowRoot}>
        <div data-testid="custom-host-content">Custom Host Content</div>
      </Portal>,
    );

    const portalRoot = shadowRoot.getElementById("test-portal-custom-host");
    expect(portalRoot).toBeTruthy();
    expect(portalRoot?.parentNode).toBe(shadowRoot);

    customHost.remove();
  });

  it("creates portal root in portalHost when it doesn't exist", () => {
    const shadowHost = document.createElement("div");
    document.body.appendChild(shadowHost);
    const shadowRoot = shadowHost.attachShadow({ mode: "open" });

    render(
      <Portal portalId="test-portal-7" portalHost={shadowRoot}>
        <div>Shadow Portal</div>
      </Portal>,
    );

    const portalRoot = shadowRoot.getElementById("test-portal-7");
    expect(portalRoot).not.toBeNull();
    expect(shadowRoot.contains(portalRoot!)).toBe(true);

    shadowHost.remove();
  });

  it("handles re-renders correctly", () => {
    const { rerender } = render(
      <Portal portalId="test-portal-8">
        <div data-testid="content-1">Content 1</div>
      </Portal>,
    );

    const portalRoot = document.getElementById("test-portal-8");
    expect(portalRoot?.querySelector('[data-testid="content-1"]')).toBeTruthy();

    rerender(
      <Portal portalId="test-portal-8">
        <div data-testid="content-2">Content 2</div>
      </Portal>,
    );

    expect(portalRoot?.querySelector('[data-testid="content-1"]')).toBeNull();
    expect(portalRoot?.querySelector('[data-testid="content-2"]')).toBeTruthy();
  });
});
