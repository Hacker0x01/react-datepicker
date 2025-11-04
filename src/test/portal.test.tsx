import { render } from "@testing-library/react";
import React from "react";

import Portal from "../portal";

describe("Portal", () => {
  afterEach(() => {
    // Clean up any portal elements created during tests
    const portalElements = document.querySelectorAll('[id^="test-portal"]');
    portalElements.forEach((el) => el.remove());
  });

  it("renders children into a portal", () => {
    const { container } = render(
      <Portal portalId="test-portal-1">
        <div data-testid="portal-content">Portal Content</div>
      </Portal>,
    );

    // Content should not be in the original container
    expect(container.querySelector('[data-testid="portal-content"]')).toBe(
      null,
    );

    // Content should be in the portal
    const portalRoot = document.getElementById("test-portal-1");
    expect(portalRoot).toBeTruthy();
    expect(
      portalRoot?.querySelector('[data-testid="portal-content"]'),
    ).toBeTruthy();
  });

  it("creates portal root if it doesn't exist", () => {
    expect(document.getElementById("test-portal-2")).toBe(null);

    render(
      <Portal portalId="test-portal-2">
        <div>Content</div>
      </Portal>,
    );

    const portalRoot = document.getElementById("test-portal-2");
    expect(portalRoot).toBeTruthy();
    expect(portalRoot?.parentElement).toBe(document.body);
  });

  it("uses existing portal root if it exists", () => {
    const existingPortal = document.createElement("div");
    existingPortal.id = "test-portal-3";
    document.body.appendChild(existingPortal);

    render(
      <Portal portalId="test-portal-3">
        <div data-testid="content">Content</div>
      </Portal>,
    );

    const portalRoot = document.getElementById("test-portal-3");
    expect(portalRoot).toBe(existingPortal);
    expect(portalRoot?.querySelector('[data-testid="content"]')).toBeTruthy();

    existingPortal.remove();
  });

  it("removes portal content on unmount", () => {
    const { unmount } = render(
      <Portal portalId="test-portal-4">
        <div data-testid="portal-content">Portal Content</div>
      </Portal>,
    );

    const portalRoot = document.getElementById("test-portal-4");
    expect(
      portalRoot?.querySelector('[data-testid="portal-content"]'),
    ).toBeTruthy();

    unmount();

    expect(portalRoot?.querySelector('[data-testid="portal-content"]')).toBe(
      null,
    );
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
    customHost.id = "custom-host";
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

  it("handles re-renders correctly", () => {
    const { rerender } = render(
      <Portal portalId="test-portal-6">
        <div data-testid="content-1">Content 1</div>
      </Portal>,
    );

    const portalRoot = document.getElementById("test-portal-6");
    expect(portalRoot?.querySelector('[data-testid="content-1"]')).toBeTruthy();

    rerender(
      <Portal portalId="test-portal-6">
        <div data-testid="content-2">Content 2</div>
      </Portal>,
    );

    expect(portalRoot?.querySelector('[data-testid="content-1"]')).toBe(null);
    expect(portalRoot?.querySelector('[data-testid="content-2"]')).toBeTruthy();
  });
});
