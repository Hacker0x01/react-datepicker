import { findElement, findElements } from "../dom_utils";

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
});
