import {
  findElement,
  findElements,
  focusSibling,
  isFocusOnClassInside,
  isNothingFocused,
} from "../dom_utils";

describe("dom_utils", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    container.innerHTML = `
      <div id="parentDiv">
        <div class="childDiv">
          <span class="childSpan">Span 1</span>
          <span class="childSpan">Span 2</span>
        </div>
        <svg><rect class="svgRect" /></svg>
      </div>
    `;
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe("findElement", () => {
    it("returns the element when the selector matches an HTMLElement", () => {
      const result = findElement<HTMLDivElement>(container, ".childDiv");
      expect(result).toBeInstanceOf(HTMLDivElement);
      expect(result?.className).toBe("childDiv");
    });

    it("returns null when the selector does not match anything", () => {
      expect(findElement(container, ".nonExistent")).toBeNull();
    });

    it("returns null when the container is null or undefined", () => {
      expect(findElement(null, ".childDiv")).toBeNull();
      expect(findElement(undefined, ".childDiv")).toBeNull();
    });

    it("returns null when the matched node is not an HTMLElement", () => {
      expect(findElement(container, ".svgRect")).toBeNull();
    });
  });

  describe("findElements", () => {
    it("returns all matching HTMLElements", () => {
      const results = findElements<HTMLSpanElement>(container, ".childSpan");
      expect(results).toHaveLength(2);
      expect(results[0]?.textContent).toBe("Span 1");
      expect(results[1]?.textContent).toBe("Span 2");
    });

    it("returns an empty array when nothing matches", () => {
      expect(findElements(container, ".nonExistent")).toEqual([]);
    });

    it("returns an empty array when the container is null or undefined", () => {
      expect(findElements(null, ".childSpan")).toEqual([]);
      expect(findElements(undefined, ".childSpan")).toEqual([]);
    });

    it("filters out matched nodes that are not HTMLElements", () => {
      expect(findElements(container, ".svgRect")).toEqual([]);
    });
  });

  describe("isNothingFocused", () => {
    it("is true when focus is on the body", () => {
      (document.activeElement as HTMLElement | null)?.blur();
      expect(isNothingFocused()).toBe(true);
    });

    it("is false when an element has focus", () => {
      const button = document.createElement("button");
      container.appendChild(button);
      button.focus();
      expect(isNothingFocused()).toBe(false);
    });
  });

  describe("isFocusOnClassInside", () => {
    let cell: HTMLButtonElement;

    beforeEach(() => {
      cell = document.createElement("button");
      cell.className = "cell";
      container.appendChild(cell);
    });

    it("is true when the focused element is inside the container and has the class", () => {
      cell.focus();
      expect(isFocusOnClassInside(container, "cell")).toBe(true);
    });

    it("is false when the focused element lacks the class", () => {
      cell.focus();
      expect(isFocusOnClassInside(container, "other")).toBe(false);
    });

    it("is false when the focused element is outside the container", () => {
      const outside = document.createElement("button");
      outside.className = "cell";
      document.body.appendChild(outside);
      outside.focus();
      expect(isFocusOnClassInside(container, "cell")).toBe(false);
      document.body.removeChild(outside);
    });

    it("is false when the container is null or undefined", () => {
      cell.focus();
      expect(isFocusOnClassInside(null, "cell")).toBe(false);
      expect(isFocusOnClassInside(undefined, "cell")).toBe(false);
    });
  });

  describe("focusSibling", () => {
    let first: HTMLButtonElement;
    let second: HTMLButtonElement;

    beforeEach(() => {
      container.innerHTML = "<button id='a'></button><button id='b'></button>";
      first = container.querySelector("#a") as HTMLButtonElement;
      second = container.querySelector("#b") as HTMLButtonElement;
    });

    it("focuses the next sibling and returns true", () => {
      expect(focusSibling(first, "next")).toBe(true);
      expect(document.activeElement).toBe(second);
    });

    it("focuses the previous sibling and returns true", () => {
      expect(focusSibling(second, "previous")).toBe(true);
      expect(document.activeElement).toBe(first);
    });

    it("returns false when there is no sibling in that direction", () => {
      expect(focusSibling(first, "previous")).toBe(false);
      expect(focusSibling(second, "next")).toBe(false);
    });

    it("returns true but does not move focus when the sibling is not an HTMLElement", () => {
      container.innerHTML = "<button id='a'></button>text";
      const only = container.querySelector("#a") as HTMLButtonElement;
      only.focus();
      expect(focusSibling(only, "next")).toBe(true);
      expect(document.activeElement).toBe(only);
    });

    it("returns false when the target is not an HTMLElement", () => {
      expect(focusSibling(null, "next")).toBe(false);
      expect(focusSibling(window, "next")).toBe(false);
    });
  });
});
