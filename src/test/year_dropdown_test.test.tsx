import { render, fireEvent } from "@testing-library/react";
import React from "react";

import { newDate } from "../date_utils";
import YearDropdown from "../year_dropdown";

import { range, safeQuerySelector, safeQuerySelectorAll } from "./test_utils";

describe("YearDropdown", () => {
  let yearDropdown: HTMLElement;
  let lastOnChangeValue: number | null;

  function onChangeMock(value: number) {
    lastOnChangeValue = value;
  }

  function getYearDropdown(
    overrideProps?: Partial<React.ComponentProps<typeof YearDropdown>>,
  ): HTMLElement {
    const date = new Date();
    return render(
      <YearDropdown
        date={date}
        dropdownMode="scroll"
        year={2015}
        onChange={onChangeMock}
        {...overrideProps}
      />,
    ).container;
  }

  beforeEach(() => {
    lastOnChangeValue = null;
  });

  describe("scroll mode", () => {
    const selectedYear = 2015;

    beforeEach(function () {
      yearDropdown = getYearDropdown({
        year: selectedYear,
      });
    });

    it("read view has correct ARIA attributes and toggles aria-expanded", () => {
      const yearReadView = safeQuerySelector<HTMLButtonElement>(
        yearDropdown,
        ".react-datepicker__year-read-view",
      );
      expect(yearReadView.getAttribute("aria-haspopup")).toBe("listbox");
      expect(yearReadView.getAttribute("aria-expanded")).toBe("false");

      fireEvent.click(yearReadView);
      expect(yearReadView.getAttribute("aria-expanded")).toBe("true");
    });

    it("shows the selected year in the initial view", () => {
      expect(yearDropdown?.textContent).toMatch("2015");
    });

    it("starts with the year options list hidden", () => {
      const optionsView = yearDropdown?.querySelectorAll(
        "react-datepicker__year-dropdown",
      );
      expect(optionsView).toHaveLength(0);
    });

    it("marks the down arrow as aria-hidden so it is excluded from the accessibility tree", () => {
      const downArrow = safeQuerySelector(
        yearDropdown,
        ".react-datepicker__year-read-view--down-arrow",
      );

      expect(downArrow.getAttribute("aria-hidden")).toBe("true");
      expect(downArrow.textContent).toBe("");
    });

    it("renders a sr-only Year label for screen readers inside the read view button", () => {
      const yearReadView = safeQuerySelector(
        yearDropdown,
        ".react-datepicker__year-read-view",
      );
      const srOnlyLabel = safeQuerySelector(
        yearReadView,
        ".react-datepicker__sr-only",
      );

      expect(srOnlyLabel.textContent).toBe("Year");
      expect(srOnlyLabel.classList.contains("react-datepicker__sr-only")).toBe(
        true,
      );
      expect(srOnlyLabel.getAttribute("aria-hidden")).not.toBe("true");
    });

    it("applies aria-selected to the selected year option in scroll dropdown", () => {
      const yearReadView = safeQuerySelector(
        yearDropdown,
        ".react-datepicker__year-read-view",
      );
      fireEvent.click(yearReadView);

      const selectedYearOption = safeQuerySelector(
        yearDropdown,
        ".react-datepicker__year-option--selected_year",
      );
      expect(selectedYearOption.getAttribute("aria-selected")).toBe("true");
    });

    it("applies aria-hidden to the selected year option's check mark in scroll dropdown", () => {
      const yearReadView = safeQuerySelector(
        yearDropdown,
        ".react-datepicker__year-read-view",
      );
      fireEvent.click(yearReadView);
      const selectedYearOption = safeQuerySelector(
        yearDropdown,
        ".react-datepicker__year-option--selected_year",
      );

      const checkSpan = selectedYearOption?.querySelector<HTMLSpanElement>(
        "span.react-datepicker__year-option--selected",
      );
      expect(checkSpan).not.toBeNull();
      expect(checkSpan?.getAttribute("aria-hidden")).toBe("true");
    });

    it("opens a list when read view is clicked", () => {
      const yearReadView = safeQuerySelector(
        yearDropdown,
        ".react-datepicker__year-read-view",
      );
      fireEvent.click(yearReadView);
      const optionsView = yearDropdown?.querySelectorAll(
        "react-datepicker__year-dropdown",
      );
      expect(optionsView).not.toBeNull();
    });

    it("closes the dropdown when a year is clicked", () => {
      const yearReadView = safeQuerySelector(
        yearDropdown,
        ".react-datepicker__year-read-view",
      );
      fireEvent.click(yearReadView);

      const yearOptions = safeQuerySelectorAll(
        yearDropdown,
        ".react-datepicker__year-option",
      );
      const yearOption = yearOptions[0]!;
      fireEvent.click(yearOption);
      expect(
        yearDropdown?.querySelectorAll("react-datepicker__year-dropdown"),
      ).toHaveLength(0);
    });

    it("does not call the supplied onChange function when the same year is clicked", () => {
      const yearReadView = safeQuerySelector(
        yearDropdown,
        ".react-datepicker__year-read-view",
      );
      fireEvent.click(yearReadView);

      const minYearOptionsLen = 7;
      const yearOptions = safeQuerySelectorAll(
        yearDropdown,
        ".react-datepicker__year-option",
        minYearOptionsLen,
      );

      const yearOption = yearOptions[6]!;
      fireEvent.click(yearOption);
      expect(lastOnChangeValue).toBeNull();
    });

    it("calls the supplied onChange function when a different year is clicked", () => {
      const yearReadView = safeQuerySelector(
        yearDropdown,
        ".react-datepicker__year-read-view",
      );
      fireEvent.click(yearReadView);

      const minYearOptionsLen = 7;
      const yearOptions = safeQuerySelectorAll(
        yearDropdown,
        ".react-datepicker__year-option",
        minYearOptionsLen,
      );

      const yearOption = yearOptions[7]!;
      fireEvent.click(yearOption);
      expect(lastOnChangeValue).toEqual(2014);
    });

    it("calls the supplied onChange function when a year is selected using arrows and enter key", () => {
      const yearReadView = safeQuerySelector(
        yearDropdown,
        ".react-datepicker__year-read-view",
      );
      fireEvent.click(yearReadView);
      const minYearOptionsLen = 7;
      const yearOptions = safeQuerySelectorAll(
        yearDropdown,
        ".react-datepicker__year-option",
        minYearOptionsLen,
      );
      const yearOption = yearOptions[6]!;
      fireEvent.keyDown(yearOption, { key: "ArrowUp" });

      const previousYearOption = yearOptions[5]!;
      expect(document.activeElement).toBe(previousYearOption);

      fireEvent.keyDown(document.activeElement!, { key: "Enter" });
      expect(lastOnChangeValue).toEqual(2016);
    });
  });

  describe("select mode", () => {
    it("renders a select with default year range options", () => {
      yearDropdown = getYearDropdown({ dropdownMode: "select" });
      const select: NodeListOf<HTMLSelectElement> =
        yearDropdown.querySelectorAll(".react-datepicker__year-select");
      expect(select).toHaveLength(1);
      expect(select[0]?.value).toBe("2015");

      const options = select[0]?.querySelectorAll("option") ?? [];
      expect(Array.from(options).map((o) => o.textContent)).toEqual(
        range(1900, 2101).map((n) => `${n}`),
      );
    });

    it("renders a select with min and max year range options", () => {
      yearDropdown = getYearDropdown({
        dropdownMode: "select",
        minDate: newDate("1988-01-01"),
        maxDate: newDate("2016-01-01"),
      });
      const select: NodeListOf<HTMLSelectElement> =
        yearDropdown.querySelectorAll(".react-datepicker__year-select");
      expect(select).toHaveLength(1);
      expect(select[0]?.value).toEqual("2015");

      const options = select[0]?.querySelectorAll("option") ?? [];
      expect(Array.from(options).map((o) => o.textContent)).toEqual(
        range(1988, 2017).map((n) => `${n}`),
      );
    });

    it("does not call the supplied onChange function when the same year is clicked", () => {
      yearDropdown = getYearDropdown({ dropdownMode: "select" });
      const select: HTMLSelectElement =
        yearDropdown.querySelector(".react-datepicker__year-select") ??
        new HTMLSelectElement();
      fireEvent.click(select, { target: { value: 2015 } });
      expect(lastOnChangeValue).toBeNull();
    });

    it("calls the supplied onChange function when a different year is clicked", () => {
      yearDropdown = getYearDropdown({ dropdownMode: "select" });
      const select: HTMLSelectElement =
        yearDropdown.querySelector(".react-datepicker__year-select") ??
        new HTMLSelectElement();
      fireEvent.change(select, { target: { value: 2014 } });
      expect(lastOnChangeValue).toEqual(2014);
    });

    it("calls the supplied onChange, onSelect, setOpen function when a different year is clicked", () => {
      const onSelectSpy = jest.fn();
      const setOpenSpy = jest.fn();
      yearDropdown = getYearDropdown({
        dropdownMode: "select",
        onSelect: onSelectSpy,
        setOpen: setOpenSpy,
        adjustDateOnChange: true,
      });
      const select: HTMLSelectElement =
        yearDropdown.querySelector(".react-datepicker__year-select") ??
        new HTMLSelectElement();

      fireEvent.change(select, { target: { value: 2014 } });
      expect(onSelectSpy).toHaveBeenCalledTimes(1);
      expect(setOpenSpy).toHaveBeenCalledTimes(1);
    });
  });
});
