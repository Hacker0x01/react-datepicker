import React from "react";
import range from "lodash/range";
import YearDropdown from "../src/year_dropdown.jsx";
import YearDropdownOptions from "../src/year_dropdown_options.jsx";
import { mount } from "enzyme";
import { newDate } from "../src/date_utils.js";

describe("YearDropdown", () => {
  var yearDropdown;
  var lastOnChangeValue;

  function onChangeMock(value) {
    lastOnChangeValue = value;
  }

  function getYearDropdown(overrideProps) {
    return mount(
      // eslint-disable-line enzyme-deprecation/no-mount
      <YearDropdown
        dropdownMode="scroll"
        year={2015}
        onChange={onChangeMock}
        {...overrideProps}
      />,
    );
  }

  beforeEach(() => {
    lastOnChangeValue = null;
  });

  describe("scroll mode", () => {
    beforeEach(function () {
      yearDropdown = getYearDropdown();
    });

    it("shows the selected year in the initial view", () => {
      expect(yearDropdown.text()).toMatch("2015");
    });

    it("starts with the year options list hidden", () => {
      var optionsView = yearDropdown.find(YearDropdownOptions);
      expect(optionsView).toHaveLength(0);
    });

    it("opens a list when read view is clicked", () => {
      yearDropdown.find(".react-datepicker__year-read-view").simulate("click");
      var optionsView = yearDropdown.find(YearDropdownOptions);
      expect(optionsView).not.toBeNull();
    });

    it("closes the dropdown when a year is clicked", () => {
      yearDropdown.find(".react-datepicker__year-read-view").simulate("click");
      yearDropdown
        .find(".react-datepicker__year-option")
        .at(1)
        .simulate("click");
      expect(yearDropdown.find(YearDropdownOptions)).toHaveLength(0);
    });

    it("does not call the supplied onChange function when the same year is clicked", () => {
      yearDropdown.find(".react-datepicker__year-read-view").simulate("click");
      yearDropdown
        .find(".react-datepicker__year-option")
        .at(6)
        .simulate("click");
      expect(lastOnChangeValue).toBeNull();
    });

    it("calls the supplied onChange function when a different year is clicked", () => {
      yearDropdown.find(".react-datepicker__year-read-view").simulate("click");
      yearDropdown
        .find(".react-datepicker__year-option")
        .at(7)
        .simulate("click");
      expect(lastOnChangeValue).toEqual(2014);
    });
  });

  describe("select mode", () => {
    it("renders a select with default year range options", () => {
      yearDropdown = getYearDropdown({ dropdownMode: "select" });
      const select = yearDropdown.find(".react-datepicker__year-select");
      expect(select).toHaveLength(1);
      expect(select.prop("value")).toBe(2015);

      const options = select.find("option");
      expect(options.map((o) => o.text())).toEqual(
        range(1900, 2101).map((n) => `${n}`),
      );
    });

    it("renders a select with min and max year range options", () => {
      yearDropdown = getYearDropdown({
        dropdownMode: "select",
        minDate: newDate("1988-01-01"),
        maxDate: newDate("2016-01-01"),
      });
      const select = yearDropdown.find(".react-datepicker__year-select");
      expect(select).toHaveLength(1);
      expect(select.prop("value")).toEqual(2015);

      const options = select.find("option");
      expect(options.map((o) => o.text())).toEqual(
        range(1988, 2017).map((n) => `${n}`),
      );
    });

    it("does not call the supplied onChange function when the same year is clicked", () => {
      yearDropdown = getYearDropdown({ dropdownMode: "select" });
      const select = yearDropdown.find(".react-datepicker__year-select");
      select.simulate("click", { target: { value: 2015 } });
      expect(lastOnChangeValue).toBeNull();
    });

    it("calls the supplied onChange function when a different year is clicked", () => {
      yearDropdown = getYearDropdown({ dropdownMode: "select" });
      const select = yearDropdown.find(".react-datepicker__year-select");
      select.simulate("change", { target: { value: 2014 } });
      expect(lastOnChangeValue).toEqual(2014);
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
      const select = yearDropdown.find(".react-datepicker__year-select");

      select.simulate("change", { target: { value: 2014 } });
      expect(onSelectSpy).toBeCalledTimes(1);
      expect(setOpenSpy).toBeCalledTimes(1);
    });
  });
});
