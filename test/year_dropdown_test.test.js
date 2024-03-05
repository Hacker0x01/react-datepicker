import React from "react";
import range from "lodash/range";
import YearDropdown from "../src/year_dropdown.jsx";
import { render, fireEvent } from "@testing-library/react";
import { newDate } from "../src/date_utils.js";

describe("YearDropdown", () => {
  var yearDropdown;
  var lastOnChangeValue;

  function onChangeMock(value) {
    lastOnChangeValue = value;
  }

  function getYearDropdown(overrideProps) {
    return render(
      <YearDropdown
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
    beforeEach(function () {
      yearDropdown = getYearDropdown();
    });

    it("shows the selected year in the initial view", () => {
      expect(yearDropdown.textContent).toMatch("2015");
    });

    it("starts with the year options list hidden", () => {
      var optionsView = yearDropdown.querySelectorAll(
        "react-datepicker__year-dropdown",
      );
      expect(optionsView).toHaveLength(0);
    });

    it("opens a list when read view is clicked", () => {
      fireEvent.click(
        yearDropdown.querySelector(".react-datepicker__year-read-view"),
      );
      var optionsView = yearDropdown.querySelectorAll(
        "react-datepicker__year-dropdown",
      );
      expect(optionsView).not.toBeNull();
    });

    it("closes the dropdown when a year is clicked", () => {
      fireEvent.click(
        yearDropdown.querySelector(".react-datepicker__year-read-view"),
      );
      fireEvent.click(
        yearDropdown.querySelectorAll(".react-datepicker__year-option")[0],
      );
      expect(
        yearDropdown.querySelectorAll("react-datepicker__year-dropdown"),
      ).toHaveLength(0);
    });

    it("does not call the supplied onChange function when the same year is clicked", () => {
      fireEvent.click(
        yearDropdown.querySelector(".react-datepicker__year-read-view"),
      );
      fireEvent.click(
        yearDropdown.querySelectorAll(".react-datepicker__year-option")[6],
      );
      expect(lastOnChangeValue).toBeNull();
    });

    it("calls the supplied onChange function when a different year is clicked", () => {
      fireEvent.click(
        yearDropdown.querySelector(".react-datepicker__year-read-view"),
      );
      fireEvent.click(
        yearDropdown.querySelectorAll(".react-datepicker__year-option")[7],
      );
      expect(lastOnChangeValue).toEqual(2014);
    });
  });

  describe("select mode", () => {
    it("renders a select with default year range options", () => {
      yearDropdown = getYearDropdown({ dropdownMode: "select" });
      const select = yearDropdown.querySelectorAll(
        ".react-datepicker__year-select",
      );
      expect(select).toHaveLength(1);
      expect(select[0].value).toBe("2015");

      const options = select[0].querySelectorAll("option");
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
      const select = yearDropdown.querySelectorAll(
        ".react-datepicker__year-select",
      );
      expect(select).toHaveLength(1);
      expect(select[0].value).toEqual("2015");

      const options = select[0].querySelectorAll("option");
      expect(Array.from(options).map((o) => o.textContent)).toEqual(
        range(1988, 2017).map((n) => `${n}`),
      );
    });

    it("does not call the supplied onChange function when the same year is clicked", () => {
      yearDropdown = getYearDropdown({ dropdownMode: "select" });
      const select = yearDropdown.querySelector(
        ".react-datepicker__year-select",
      );
      fireEvent.click(select, { target: { value: 2015 } });
      expect(lastOnChangeValue).toBeNull();
    });

    it("calls the supplied onChange function when a different year is clicked", () => {
      yearDropdown = getYearDropdown({ dropdownMode: "select" });
      const select = yearDropdown.querySelector(
        ".react-datepicker__year-select",
      );
      fireEvent.change(select, { target: { value: 2014 } });
      expect(lastOnChangeValue).toEqual("2014");
    });

    it("calls the supplied onChange function when a different year is clicked", () => {
      var onSelectSpy = jest.fn();
      var setOpenSpy = jest.fn();
      yearDropdown = getYearDropdown({
        dropdownMode: "select",
        onSelect: onSelectSpy,
        setOpen: setOpenSpy,
        adjustDateOnChange: true,
      });
      const select = yearDropdown.querySelector(
        ".react-datepicker__year-select",
      );

      fireEvent.change(select, { target: { value: 2014 } });
      expect(onSelectSpy).toHaveBeenCalledTimes(1);
      expect(setOpenSpy).toHaveBeenCalledTimes(1);
    });
  });
});
