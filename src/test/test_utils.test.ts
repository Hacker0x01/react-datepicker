import { KeyType } from "../date_utils";
import {
  SafeElementWrapper,
  safeQuerySelector,
  safeQuerySelectorAll,
  getKey,
} from "./test_utils";

describe("test_utils", () => {
  describe("safeQuerySelector", () => {
    let container: HTMLElement;

    beforeEach(() => {
      container = document.createElement("div");
      container.innerHTML = `
              <div id="parentDiv">
                  <div class="childDiv">
                      <span class="childSpan">Span 1</span>
                  </div>
              </div>
          `;
      document.body.appendChild(container);
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it("should return the element when the selector matches", () => {
      const result = safeQuerySelector<HTMLDivElement>(container, ".childDiv");
      expect(result).toBeInstanceOf(HTMLDivElement);
      expect(result.className).toBe("childDiv");
    });

    it("should throw an error if the element is not found", () => {
      expect(() => safeQuerySelector(container, ".nonExistent")).toThrow(
        "Element with selector '.nonExistent' not found",
      );
    });
  });

  describe("getKey", () => {
    it("should throw when key is not supported", () => {
      expect(() => getKey("?" as KeyType)).toThrow("Unknown key");
    });
  });

  describe("safeQuerySelectorAll", () => {
    let container: HTMLElement;

    beforeEach(() => {
      container = document.createElement("div");
      container.innerHTML = `
              <div id="parentDiv">
                  <div class="childDiv">
                      <span class="childSpan">Span 1</span>
                      <span class="childSpan">Span 2</span>
                  </div>
              </div>
          `;
      document.body.appendChild(container);
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it("should return an array of elements when the selector matches", () => {
      const results = safeQuerySelectorAll<HTMLSpanElement>(
        container,
        ".childSpan",
      );
      expect(results).toHaveLength(2);
      expect(results[0]!.textContent).toBe("Span 1");
      expect(results[1]!.textContent).toBe("Span 2");
    });

    it("should throw an error if no elements are found", () => {
      expect(() => safeQuerySelectorAll(container, ".nonExistent")).toThrow(
        "Element with selector '.nonExistent' not found",
      );
    });

    it("should throw an error if fewer elements than expected are found", () => {
      expect(() => safeQuerySelectorAll(container, ".childSpan", 3)).toThrow(
        "Expected at least 3 element(s) for selector '.childSpan'.  Only 2 found",
      );
    });

    it("should return elements if the minimum expected number of elements are found", () => {
      const results = safeQuerySelectorAll<HTMLSpanElement>(
        container,
        ".childSpan",
        2,
      );
      expect(results).toHaveLength(2);
    });
  });

  describe("SafeElementWrapper", () => {
    let container: HTMLElement;

    beforeEach(() => {
      container = document.createElement("div");
      container.innerHTML = `
        <div id="parentDiv">
            <div class="childDiv">
              <span class="childSpan">Span 1</span>
              <span class="childSpan">Span 2</span>
            </div>
        </div>
    `;
      document.body.appendChild(container);
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it("should wrap an element using getElement", () => {
      const element = document.getElementById("parentDiv");
      const wrapper = new SafeElementWrapper(element!);

      expect(wrapper).toBeInstanceOf(SafeElementWrapper);
      expect(wrapper.getElement()).toBe(element);
    });

    it("should find a child element using safeQuerySelector", () => {
      const element = document.getElementById("parentDiv");
      const wrapper = new SafeElementWrapper(element!);
      const childWrapper = wrapper.safeQuerySelector(".childDiv");

      expect(childWrapper).toBeInstanceOf(SafeElementWrapper);
      expect(childWrapper.getElement().className).toBe("childDiv");
    });

    it("should throw an error if child element is not found using safeQuerySelector", () => {
      const element = document.getElementById("parentDiv");
      const wrapper = new SafeElementWrapper(element!);

      expect(() => wrapper.safeQuerySelector(".nonExistent")).toThrow(
        "Element with selector '.nonExistent' not found",
      );
    });

    it("should find all matching child elements using safeQuerySelectorAll", () => {
      const element = document.getElementById("parentDiv");
      const wrapper = new SafeElementWrapper(element!);
      const childWrappers = wrapper.safeQuerySelectorAll(".childSpan");

      expect(childWrappers.length).toBe(2);
      expect(childWrappers[0]!.getElement().textContent).toBe("Span 1");
      expect(childWrappers[1]!.getElement().textContent).toBe("Span 2");
    });

    it("should throw an error if no matching elements are found using safeQuerySelectorAll", () => {
      const element = document.getElementById("parentDiv");
      const wrapper = new SafeElementWrapper(element!);

      expect(() => wrapper.safeQuerySelectorAll(".nonExistent")).toThrow(
        "Element with selector '.nonExistent' not found",
      );
    });

    it("should throw an error if fewer elements than expected are found using safeQuerySelectorAll", () => {
      const element = document.getElementById("parentDiv");
      const wrapper = new SafeElementWrapper(element!);

      expect(() => wrapper.safeQuerySelectorAll(".childSpan", 3)).toThrow(
        "Expected at least 3 element(s) for selector '.childSpan'.  Only 2 found",
      );
    });

    it("should pass if expected number of elements are found using safeQuerySelectorAll", () => {
      const element = document.getElementById("parentDiv");
      const wrapper = new SafeElementWrapper(element!);

      const childWrappers = wrapper.safeQuerySelectorAll(".childSpan", 2);
      expect(childWrappers.length).toBe(2);
    });
  });
});
