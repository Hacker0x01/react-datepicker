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
