export function findElement<T extends HTMLElement = HTMLElement>(
  container: Element | null | undefined,
  selector: string,
): T | null {
  if (!(container instanceof Element)) {
    return null;
  }

  const element = container.querySelector(selector);
  return element instanceof HTMLElement ? (element as T) : null;
}

export function findElements<T extends HTMLElement = HTMLElement>(
  container: Element | null | undefined,
  selector: string,
): T[] {
  if (!(container instanceof Element)) {
    return [];
  }

  return Array.from(container.querySelectorAll(selector)).filter(
    (element): element is T => element instanceof HTMLElement,
  );
}

/** True when no element has focus (focus is on the page body). */
export function isNothingFocused(): boolean {
  return !document.activeElement || document.activeElement === document.body;
}

/**
 * True when the focused element is inside `container` and has the given class.
 * Used to ask "is focus already on another cell of this calendar?".
 */
export function isFocusOnClassInside(
  container: Element | null | undefined,
  className: string,
): boolean {
  const active = document.activeElement;
  return Boolean(
    container?.contains(active) && active?.classList.contains(className),
  );
}

/**
 * Moves focus to the previous or next sibling of `element`.
 * Returns true when a sibling exists in that direction, so callers know
 * whether to call `preventDefault()` on the key event.
 */
export function focusSibling(
  element: EventTarget | null,
  direction: "previous" | "next",
): boolean {
  if (!(element instanceof HTMLElement)) {
    return false;
  }

  const sibling =
    direction === "previous" ? element.previousSibling : element.nextSibling;
  if (!sibling) {
    return false;
  }

  if (sibling instanceof HTMLElement) {
    sibling.focus();
  }
  return true;
}
