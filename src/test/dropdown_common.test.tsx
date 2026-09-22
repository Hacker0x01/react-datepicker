import { render, fireEvent } from "@testing-library/react";
import React from "react";

import {
  DropdownReadView,
  dropdownContainerClassName,
  renderScrollModeChildren,
} from "../dropdown_common";

import { safeQuerySelector } from "./test_utils";

describe("dropdown_common", () => {
  describe("DropdownReadView", () => {
    it("renders a real button carrying the selected value", () => {
      const onClick = jest.fn();
      const { container } = render(
        <DropdownReadView kind="year" visible onClick={onClick}>
          2026
        </DropdownReadView>,
      );

      const button = safeQuerySelector<HTMLButtonElement>(
        container,
        ".react-datepicker__year-read-view",
      );
      expect(button.tagName).toBe("BUTTON");
      expect(button.getAttribute("type")).toBe("button");
      expect(button.textContent).toBe("2026");

      fireEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("derives down-arrow and selected-value class names from kind", () => {
      const { container } = render(
        <DropdownReadView kind="month-year" visible onClick={jest.fn()}>
          September 2026
        </DropdownReadView>,
      );

      expect(
        container.querySelector(
          ".react-datepicker__month-year-read-view--down-arrow",
        ),
      ).not.toBeNull();
      expect(
        container.querySelector(
          ".react-datepicker__month-year-read-view--selected-month-year",
        )?.textContent,
      ).toBe("September 2026");
    });

    it("hides itself visually (but not from the DOM) when not visible", () => {
      const { container } = render(
        <DropdownReadView kind="month" visible={false} onClick={jest.fn()}>
          September
        </DropdownReadView>,
      );

      const button = safeQuerySelector<HTMLButtonElement>(
        container,
        ".react-datepicker__month-read-view",
      );
      expect(button.style.visibility).toBe("hidden");
    });
  });

  describe("dropdownContainerClassName", () => {
    it("builds the BEM container class pair for the given kind and mode", () => {
      expect(dropdownContainerClassName("year", "scroll")).toBe(
        "react-datepicker__year-dropdown-container react-datepicker__year-dropdown-container--scroll",
      );
      expect(dropdownContainerClassName("month-year", "select")).toBe(
        "react-datepicker__month-year-dropdown-container react-datepicker__month-year-dropdown-container--select",
      );
    });
  });

  describe("renderScrollModeChildren", () => {
    const readView = <span key="read">read</span>;
    const dropdown = <span key="dropdown">dropdown</span>;

    it("returns only the read view when the dropdown is not visible", () => {
      expect(renderScrollModeChildren(readView, false, dropdown)).toEqual([
        readView,
      ]);
    });

    it("puts the dropdown before the read view when visible", () => {
      expect(renderScrollModeChildren(readView, true, dropdown)).toEqual([
        dropdown,
        readView,
      ]);
    });
  });
});
