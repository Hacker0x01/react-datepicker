/**
 * Test suite for Portal component
 *
 * Portal is a React component that renders children into a DOM node that exists
 * outside the parent component's DOM hierarchy. This is useful for modals, tooltips,
 * and dropdowns that need to break out of overflow:hidden containers.
 *
 * Key features tested:
 * - Portal creation and rendering
 * - Reusing existing portal roots
 * - Shadow DOM support
 * - Cleanup on unmount
 * - Multiple portals
 *
 * @see ../portal.tsx
 */
import React from "react";
import { render } from "@testing-library/react";
import Portal from "../portal";

describe("Portal", () => {
  afterEach(() => {
    // Clean up any portal roots created during tests to prevent test pollution
    const portalRoots = document.querySelectorAll('[id^="test-portal"]');
    portalRoots.forEach((root) => root.remove());
  });

  /**
   * Test: Basic portal rendering
   * Verifies that children are rendered in a separate DOM node (portal root)
   * rather than in the component's normal location.
   */
  it("should render children in a portal", () => {
    const { container } = render(
      <Portal portalId="test-portal-1">
        <div data-testid="portal-content">Portal Content</div>
      </Portal>,
    );

    // Content should not be in the main container (React's render root)
    expect(
      container.querySelector('[data-testid="portal-content"]'),
    ).toBeNull();

    // Content should be in the portal root (separate DOM location)
    const portalRoot = document.getElementById("test-portal-1");
    expect(portalRoot).not.toBeNull();
    expect(
      portalRoot?.querySelector('[data-testid="portal-content"]'),
    ).not.toBeNull();
  });

  /**
   * Test: Automatic portal root creation
   * If no element with the specified portalId exists, the Portal should
   * create one and append it to document.body.
   */
  it("should create portal root if it doesn't exist", () => {
    expect(document.getElementById("test-portal-2")).toBeNull();

    render(
      <Portal portalId="test-portal-2">
        <div>Portal Content</div>
      </Portal>,
    );

    const portalRoot = document.getElementById("test-portal-2");
    expect(portalRoot).not.toBeNull();
    expect(portalRoot?.parentElement).toBe(document.body);
  });

  /**
   * Test: Reusing existing portal roots
   * If an element with the portalId already exists, the Portal should use it
   * instead of creating a new one.
   */
  it("should use existing portal root if it exists", () => {
    const existingRoot = document.createElement("div");
    existingRoot.id = "test-portal-3";
    document.body.appendChild(existingRoot);

    render(
      <Portal portalId="test-portal-3">
        <div data-testid="portal-content">Portal Content</div>
      </Portal>,
    );

    const portalRoot = document.getElementById("test-portal-3");
    expect(portalRoot).toBe(existingRoot);
    expect(
      portalRoot?.querySelector('[data-testid="portal-content"]'),
    ).not.toBeNull();
  });

  /**
   * Test: Cleanup on unmount
   * When the Portal unmounts, it should remove its content from the portal root
   * (but the portal root itself should remain for potential reuse).
   */
  it("should cleanup portal element on unmount", () => {
    const { unmount } = render(
      <Portal portalId="test-portal-4">
        <div data-testid="portal-content">Portal Content</div>
      </Portal>,
    );

    const portalRoot = document.getElementById("test-portal-4");
    expect(portalRoot).not.toBeNull();
    expect(
      portalRoot?.querySelector('[data-testid="portal-content"]'),
    ).not.toBeNull();

    unmount();

    // Portal root should still exist but content should be removed
    expect(document.getElementById("test-portal-4")).not.toBeNull();
    expect(
      document
        .getElementById("test-portal-4")
        ?.querySelector('[data-testid="portal-content"]'),
    ).toBeNull();
  });

  /**
   * Test: Multiple children support
   * Verifies that the Portal can render multiple child elements.
   */
  it("should render multiple children", () => {
    render(
      <Portal portalId="test-portal-5">
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <div data-testid="child-3">Child 3</div>
      </Portal>,
    );

    const portalRoot = document.getElementById("test-portal-5");
    expect(portalRoot?.querySelector('[data-testid="child-1"]')).not.toBeNull();
    expect(portalRoot?.querySelector('[data-testid="child-2"]')).not.toBeNull();
    expect(portalRoot?.querySelector('[data-testid="child-3"]')).not.toBeNull();
  });

  /**
   * Test: Shadow DOM support
   * Tests that the Portal can render into a Shadow DOM by accepting
   * a ShadowRoot as the portalHost prop.
   */
  it("should support ShadowRoot as portalHost", () => {
    const hostElement = document.createElement("div");
    document.body.appendChild(hostElement);
    const shadowRoot = hostElement.attachShadow({ mode: "open" });

    render(
      <Portal portalId="test-portal-6" portalHost={shadowRoot}>
        <div data-testid="shadow-content">Shadow Content</div>
      </Portal>,
    );

    // Portal should be in shadow root, not in document body (regular DOM)
    expect(document.getElementById("test-portal-6")).toBeNull();

    const portalInShadow = shadowRoot.getElementById("test-portal-6");
    expect(portalInShadow).not.toBeNull();
    expect(
      portalInShadow?.querySelector('[data-testid="shadow-content"]'),
    ).not.toBeNull();

    // Cleanup: Remove the shadow host element
    hostElement.remove();
  });

  /**
   * Test: Re-render handling
   * When the Portal's children change, the portal content should update accordingly.
   */
  it("should handle re-renders correctly", () => {
    const { rerender } = render(
      <Portal portalId="test-portal-7">
        <div data-testid="content">Initial Content</div>
      </Portal>,
    );

    let portalRoot = document.getElementById("test-portal-7");
    expect(portalRoot?.textContent).toContain("Initial Content");

    rerender(
      <Portal portalId="test-portal-7">
        <div data-testid="content">Updated Content</div>
      </Portal>,
    );

    portalRoot = document.getElementById("test-portal-7");
    expect(portalRoot?.textContent).toContain("Updated Content");
  });

  /**
   * Test: Multiple independent portals
   * Multiple Portal components with different IDs should create separate
   * portal roots and not interfere with each other.
   */
  it("should handle multiple portals with different IDs", () => {
    render(
      <>
        <Portal portalId="test-portal-8a">
          <div data-testid="portal-a">Portal A</div>
        </Portal>
        <Portal portalId="test-portal-8b">
          <div data-testid="portal-b">Portal B</div>
        </Portal>
      </>,
    );

    const portalA = document.getElementById("test-portal-8a");
    const portalB = document.getElementById("test-portal-8b");

    expect(portalA?.querySelector('[data-testid="portal-a"]')).not.toBeNull();
    expect(portalB?.querySelector('[data-testid="portal-b"]')).not.toBeNull();
    expect(portalA?.querySelector('[data-testid="portal-b"]')).toBeNull();
    expect(portalB?.querySelector('[data-testid="portal-a"]')).toBeNull();
  });
});
