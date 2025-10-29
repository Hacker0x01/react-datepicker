import { render, cleanup } from "@testing-library/react";
import React from "react";

import Portal from "../portal";

describe("Portal", () => {
  afterEach(() => {
    // Clean up any portals created during tests
    const portals = document.querySelectorAll('[id^="test-portal"]');
    portals.forEach((portal) => portal.remove());
    cleanup();
  });

  it("should render children in a portal", () => {
    render(
      <Portal portalId="test-portal-1">
        <div className="portal-content">Content</div>
      </Portal>,
    );

    const portalRoot = document.getElementById("test-portal-1");
    expect(portalRoot).not.toBeNull();

    const content = portalRoot?.querySelector(".portal-content");
    expect(content).not.toBeNull();
  });

  it("should create portal root if it doesn't exist", () => {
    render(
      <Portal portalId="test-portal-2">
        <div>New Portal</div>
      </Portal>,
    );

    // Lines 32-36: creates portal root if not exists
    const portalRoot = document.getElementById("test-portal-2");
    expect(portalRoot).not.toBeNull();
    expect(document.body.contains(portalRoot)).toBe(true);
  });

  it("should use existing portal root if it exists", () => {
    // Pre-create a portal root
    const existingRoot = document.createElement("div");
    existingRoot.setAttribute("id", "test-portal-3");
    document.body.appendChild(existingRoot);

    render(
      <Portal portalId="test-portal-3">
        <div>Using Existing</div>
      </Portal>,
    );

    // Line 29-30: uses existing portal root
    const portalRoot = document.getElementById("test-portal-3");
    expect(portalRoot).toBe(existingRoot);
  });

  it("should clean up portal element on unmount", () => {
    const { unmount } = render(
      <Portal portalId="test-portal-4">
        <div className="cleanup-test">Cleanup Test</div>
      </Portal>,
    );

    const portalRoot = document.getElementById("test-portal-4");
    expect(portalRoot?.querySelector(".cleanup-test")).not.toBeNull();

    // Lines 40-43: cleanup on unmount
    unmount();

    // The portal root should still exist but the content should be removed
    const stillExists = document.getElementById("test-portal-4");
    expect(stillExists).toBeTruthy();
    expect(stillExists!.querySelector(".cleanup-test")).toBeNull();
  });

  it("should render to portalHost when provided", () => {
    const shadowHost = document.createElement("div");
    const shadowRoot = shadowHost.attachShadow({ mode: "open" });

    render(
      <Portal portalId="test-portal-5" portalHost={shadowRoot}>
        <div className="shadow-content">Shadow Content</div>
      </Portal>,
    );

    // Line 29, 35: uses portalHost instead of document
    const portalRoot = shadowRoot.getElementById("test-portal-5");
    expect(portalRoot).not.toBeNull();

    const content = portalRoot?.querySelector(".shadow-content");
    expect(content).not.toBeNull();
  });

  it("should handle multiple portals", () => {
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

  it("should create portal root in portalHost when it doesn't exist", () => {
    const shadowHost = document.createElement("div");
    const shadowRoot = shadowHost.attachShadow({ mode: "open" });

    render(
      <Portal portalId="test-portal-7" portalHost={shadowRoot}>
        <div>Shadow Portal</div>
      </Portal>,
    );

    // Lines 32-36: creates portal in shadow root if not exists
    const portalRoot = shadowRoot.getElementById("test-portal-7");
    expect(portalRoot).not.toBeNull();
    expect(shadowRoot.contains(portalRoot)).toBe(true);
  });
});
