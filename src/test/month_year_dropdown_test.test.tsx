import { render, fireEvent } from "@testing-library/react";
import { fi } from "date-fns/locale/fi";
import React from "react";

import {
  newDate,
  addMonths,
  subMonths,
  formatDate,
  isAfter,
  registerLocale,
} from "../date_utils";
import MonthYearDropdown from "../month_year_dropdown";
import MonthYearDropdownOptions from "../month_year_dropdown_options";

import { safeQuerySelector, safeQuerySelectorAll } from "./test_utils";

type MonthYearDropdownProps = React.ComponentProps<typeof MonthYearDropdown>;

describe("MonthYearDropdown", () => {
  let monthYearDropdown: HTMLElement;
  let handleChangeResult: Date | null = null;
  const mockHandleChange = function (changeInput: Date) {
    handleChangeResult = changeInput;
  };

  function getMonthYearDropdown(
    overrideProps: Partial<
      Pick<
        MonthYearDropdownProps,
        | "dropdownMode"
        | "date"
        | "dateFormat"
        | "minDate"
        | "maxDate"
        | "onChange"
      >
    > &
      Omit<
        MonthYearDropdownProps,
        | "dropdownMode"
        | "date"
        | "dateFormat"
        | "minDate"
        | "maxDate"
        | "onChange"
      >,
  ) {
    const dateFormatCalendar = "LLLL yyyy";
    const date = newDate("2018-01");
    const minDate = newDate("2017-07-01");
    const maxDate = newDate("2018-06-30");

    return render(
      <MonthYearDropdown
        dropdownMode="scroll"
        date={date}
        dateFormat={dateFormatCalendar}
        minDate={minDate}
        maxDate={maxDate}
        onChange={mockHandleChange}
        {...overrideProps}
      />,
    ).container;
  }

  beforeEach(() => {
    handleChangeResult = null;
  });

  describe("scroll mode", () => {
    let selectedDate: Date;
    beforeEach(() => {
      selectedDate = newDate("2018-01");
      monthYearDropdown = getMonthYearDropdown({ date: selectedDate });
    });

    it("shows the selected month year in the initial view", () => {
      const selected_month_year_name = formatDate(selectedDate, "LLLL yyyy");
      expect(monthYearDropdown?.textContent).toContain(
        selected_month_year_name,
      );
    });

    it("opens a list when read view is clicked", () => {
      const monthYearReadView = safeQuerySelector(
        monthYearDropdown,
        ".react-datepicker__month-year-read-view",
      );
      fireEvent.click(monthYearReadView);
      const optionsView = monthYearDropdown?.querySelector(
        ".react-datepicker__month-year-dropdown",
      );
      expect(optionsView).not.toBeNull();
    });

    it("closes the dropdown when a month year is clicked", () => {
      const monthYearReadView = safeQuerySelector(
        monthYearDropdown,
        ".react-datepicker__month-year-read-view",
      );
      fireEvent.click(monthYearReadView);

      const monthYearOptions = safeQuerySelectorAll(
        monthYearDropdown,
        ".react-datepicker__month-year-option",
      );
      const monthYearOption = monthYearOptions[0]!;
      fireEvent.click(monthYearOption);
      expect(
        monthYearDropdown?.querySelectorAll(
          ".react-datepicker__month-year-dropdown",
        ),
      ).toHaveLength(0);
    });

    it("closes the dropdown if outside is clicked", () => {
      const date = newDate();
      const dateFormatCalendar = "LLLL yyyy";

      const onCancelSpy = jest.fn();
      render(
        <MonthYearDropdownOptions
          onCancel={onCancelSpy}
          onChange={jest.fn()}
          dateFormat={dateFormatCalendar}
          date={date}
          minDate={subMonths(date, 6)}
          maxDate={addMonths(date, 6)}
        />,
      );
      fireEvent.mouseDown(document.body);
      fireEvent.touchStart(document.body);
      expect(onCancelSpy).toHaveBeenCalledTimes(1);
    });

    it("does not call the supplied onChange function when the same month year is clicked", () => {
      const monthYearReadView = safeQuerySelector(
        monthYearDropdown,
        ".react-datepicker__month-year-read-view",
      );
      fireEvent.click(monthYearReadView);

      const selectedMonthYear = safeQuerySelector(
        monthYearDropdown,
        ".react-datepicker__month-year-option--selected_month-year",
      );
      fireEvent.click(selectedMonthYear);

      expect(handleChangeResult).toBeNull();
    });

    it("adds aria-selected to selected option", () => {
      const monthYearReadView = safeQuerySelector(
        monthYearDropdown,
        ".react-datepicker__month-year-read-view",
      );
      fireEvent.click(monthYearReadView);

      const ariaSelected = monthYearDropdown
        ?.querySelector(
          ".react-datepicker__month-year-option--selected_month-year",
        )
        ?.getAttribute("aria-selected");

      expect(ariaSelected).toBe("true");
    });

    it("does not add aria-selected to non-selected option", () => {
      const monthYearReadView = safeQuerySelector(
        monthYearDropdown,
        ".react-datepicker__month-year-read-view",
      );
      fireEvent.click(monthYearReadView);
      const ariaSelected = monthYearDropdown
        ?.querySelector(".react-datepicker__month-year-option")
        ?.getAttribute("aria-selected");

      expect(ariaSelected).toBeNull();
    });

    it("calls the supplied onChange function when a different month year is clicked", () => {
      const expected_date = newDate("2017-12");

      const monthYearReadView = safeQuerySelector(
        monthYearDropdown,
        ".react-datepicker__month-year-read-view",
      );
      fireEvent.click(monthYearReadView);

      const minRequiredMonthYearOptionsLen = 6;
      const monthYearOptions = safeQuerySelectorAll(
        monthYearDropdown,
        ".react-datepicker__month-year-option",
        minRequiredMonthYearOptionsLen,
      );

      const monthYearOption = monthYearOptions[5]!;
      fireEvent.click(monthYearOption);

      expect(handleChangeResult?.toString()).toBe(expected_date.toString());
    });

    it("should use dateFormat to display date in dropdown", () => {
      registerLocale("fi", fi);
      let dropdownDateFormat = getMonthYearDropdown({
        dateFormat: "LLLL yyyy",
      });

      expect(dropdownDateFormat.textContent).toBe("January 2018");

      dropdownDateFormat = getMonthYearDropdown({ locale: "fi" });

      expect(dropdownDateFormat.textContent).toBe("tammikuu 2018");

      dropdownDateFormat = getMonthYearDropdown({
        locale: "fi",
      });
      expect(dropdownDateFormat.textContent).toBe("tammikuu 2018");

      dropdownDateFormat = getMonthYearDropdown({
        dateFormat: "yyyy LLL",
        locale: "fi",
      });
      expect(dropdownDateFormat.textContent).toBe("2018 tammi");
      dropdownDateFormat = getMonthYearDropdown({
        dateFormat: "yyyy LLL",
        locale: "fi",
      });
      expect(dropdownDateFormat.textContent).toBe("2018 tammi");
    });
  });

  describe("select mode", () => {
    it("renders a select", () => {
      const expected_date = newDate("2018-01");
      let currentMonth = newDate("2017-07");
      const maxMonth = newDate("2018-06");

      const expected_values: string[] = [];

      while (!isAfter(currentMonth, maxMonth)) {
        expected_values.push(`${currentMonth.valueOf()}`);

        currentMonth = addMonths(currentMonth, 1);
      }

      monthYearDropdown = getMonthYearDropdown({ dropdownMode: "select" });
      const select = monthYearDropdown.querySelector<HTMLSelectElement>(
        ".react-datepicker__month-year-select",
      );
      expect(select).not.toBeNull();
      expect(select?.value).toBe(`${expected_date.valueOf()}`);
      const options = select?.querySelectorAll("option");
      expect(Array.from(options ?? []).map((o) => o.value)).toEqual(
        expected_values,
      );
    });

    it("renders month options with default locale", () => {
      monthYearDropdown = getMonthYearDropdown({ dropdownMode: "select" });
      const options = monthYearDropdown.querySelectorAll("option");

      expect(Array.from(options).map((o) => o.textContent)).toEqual([
        "July 2017",
        "August 2017",
        "September 2017",
        "October 2017",
        "November 2017",
        "December 2017",
        "January 2018",
        "February 2018",
        "March 2018",
        "April 2018",
        "May 2018",
        "June 2018",
      ]);
    });

    it("renders month options with specified locale", () => {
      registerLocale("fi", fi);
      monthYearDropdown = getMonthYearDropdown({
        dropdownMode: "select",
        locale: "fi",
      });
      const options = monthYearDropdown.querySelectorAll("option");
      expect(Array.from(options).map((o) => o.textContent)).toEqual([
        "heinäkuu 2017",
        "elokuu 2017",
        "syyskuu 2017",
        "lokakuu 2017",
        "marraskuu 2017",
        "joulukuu 2017",
        "tammikuu 2018",
        "helmikuu 2018",
        "maaliskuu 2018",
        "huhtikuu 2018",
        "toukokuu 2018",
        "kesäkuu 2018",
      ]);
    });

    it("does not call the supplied onChange function when the same month is clicked", () => {
      const selectedMonth = newDate("2017-11");
      monthYearDropdown = getMonthYearDropdown({
        dropdownMode: "select",
        date: selectedMonth,
      });
      const select = safeQuerySelector(
        monthYearDropdown,
        ".react-datepicker__month-year-select",
      );
      fireEvent.change(select, {
        target: { value: selectedMonth.valueOf() },
      });
      expect(handleChangeResult).toBeFalsy();
    });

    it("calls the supplied onChange function when a different month is clicked", () => {
      const selectedMonth = newDate("2017-11");
      const monthToClick = newDate("2017-09");
      monthYearDropdown = getMonthYearDropdown({
        dropdownMode: "select",
        date: selectedMonth,
      });
      const select = safeQuerySelector(
        monthYearDropdown,
        ".react-datepicker__month-year-select",
      );
      fireEvent.change(select, {
        target: { value: monthToClick.valueOf() },
      });
      expect(handleChangeResult?.valueOf()).toBe(monthToClick.valueOf());
    });
  });
});
