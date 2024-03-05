import React from "react";
import range from "lodash/range";
import MonthDropdown from "../src/month_dropdown.jsx";
import MonthDropdownOptions from "../src/month_dropdown_options.jsx";
import { mount } from "enzyme";
import { render, fireEvent } from "@testing-library/react";
import { getMonthInLocale, registerLocale } from "../src/date_utils";
import { zhCN } from "date-fns/locale/zh-CN";
import { el } from "date-fns/locale/el";
import { ru } from "date-fns/locale/ru";

describe("MonthDropdown", () => {
  let monthDropdown;
  let handleChangeResult;
  const mockHandleChange = function (changeInput) {
    handleChangeResult = changeInput;
  };

  function getMonthDropdown(overrideProps) {
    return render(
      <MonthDropdown
        dropdownMode="scroll"
        month={11}
        onChange={mockHandleChange}
        {...overrideProps}
      />,
    ).container;
  }

  beforeEach(() => {
    handleChangeResult = null;
  });

  describe("scroll mode", () => {
    beforeEach(() => {
      monthDropdown = getMonthDropdown();
    });

    it("shows the selected month in the initial view", () => {
      expect(monthDropdown.textContent).toContain("December");
    });

    it("opens a list when read view is clicked", () => {
      fireEvent.click(
        monthDropdown.querySelector(".react-datepicker__month-read-view"),
      );
      const optionsView = monthDropdown.querySelector(
        ".react-datepicker__month-dropdown",
      );
      expect(optionsView).not.toBeNull();
    });

    describe("with the selected month", () => {
      let selectedMonth;

      beforeEach(() => {
        fireEvent.click(
          monthDropdown.querySelector(".react-datepicker__month-read-view"),
        );
        selectedMonth = monthDropdown.querySelector(
          ".react-datepicker__month-option--selected_month",
        );
      });

      it("applies the 'selected' modifier class to the selected month", () => {
        expect(selectedMonth.textContent).toContain("December");
      });

      it("adds aria-selected property to the selected month", () => {
        const ariaSelected = selectedMonth.getAttribute("aria-selected");
        expect(ariaSelected).toEqual("true");
      });
    });

    describe("with a not selected month", () => {
      let notSelectedMonth;

      beforeEach(() => {
        fireEvent.click(
          monthDropdown.querySelector(".react-datepicker__month-read-view"),
        );
        notSelectedMonth = monthDropdown.querySelector(
          ".react-datepicker__month-option",
        );
      });

      it("does not apply the 'selected' modifier class to the selected month", () => {
        expect(notSelectedMonth.textContent).not.toContain("December");
      });

      it("does not add aria-selected property to the selected month", () => {
        const ariaSelected = notSelectedMonth.getAttribute("aria-selected");
        expect(ariaSelected).toBeNull();
      });
    });

    it("closes the dropdown when a month is clicked", () => {
      fireEvent.click(
        monthDropdown.querySelector(".react-datepicker__month-read-view"),
      );
      fireEvent.click(
        monthDropdown.querySelectorAll(".react-datepicker__month-option")[1],
      );
      expect(
        monthDropdown.querySelectorAll(".react-datepicker__month-dropdown"),
      ).toHaveLength(0);
    });

    it("closes the dropdown if outside is clicked", () => {
      const monthNames = range(0, 12).map((M) => getMonthInLocale(M));
      const onCancelSpy = jest.fn();
      const monthDropdownOptionsInstance = mount(
        <MonthDropdownOptions
          onCancel={onCancelSpy}
          onChange={onCancelSpy}
          month={11}
          monthNames={monthNames}
        />,
      ).instance();
      monthDropdownOptionsInstance.handleClickOutside();
      expect(onCancelSpy).toHaveBeenCalledTimes(1);
    });

    it("does not call the supplied onChange function when the same month is clicked", () => {
      fireEvent.click(
        monthDropdown.querySelector(".react-datepicker__month-read-view"),
      );
      fireEvent.click(
        monthDropdown.querySelectorAll(".react-datepicker__month-option")[11],
      );
      expect(handleChangeResult).toBeNull();
    });

    it("calls the supplied onChange function when a different month is clicked", () => {
      fireEvent.click(
        monthDropdown.querySelector(".react-datepicker__month-read-view"),
      );
      fireEvent.click(
        monthDropdown.querySelectorAll(".react-datepicker__month-option")[2],
      );
      expect(handleChangeResult).toEqual(2);
    });

    it("should use locale stand-alone formatting to display month names", () => {
      registerLocale("el", el);
      registerLocale("ru", ru);

      let dropdownDateFormat = getMonthDropdown();
      expect(dropdownDateFormat.textContent).toContain("December");

      dropdownDateFormat = getMonthDropdown({ locale: "el" });
      expect(dropdownDateFormat.textContent).toContain("Δεκέμβριος");

      dropdownDateFormat = getMonthDropdown({ locale: "ru" });
      expect(dropdownDateFormat.textContent).toContain("декабрь");
    });
  });

  describe("select mode", () => {
    it("renders a select", () => {
      monthDropdown = getMonthDropdown({ dropdownMode: "select" });
      const select = monthDropdown.querySelector(
        ".react-datepicker__month-select",
      );
      expect(select).not.toBeNull();
      expect(select.value).toEqual("11");
      const options = select.querySelectorAll("option");
      expect(Array.from(options).map((o) => Number(o.value))).toEqual(
        range(0, 12),
      );
    });

    it("renders month options with default locale", () => {
      monthDropdown = getMonthDropdown({ dropdownMode: "select" });
      const options = monthDropdown.querySelectorAll("option");
      expect(Array.from(options).map((o) => o.textContent)).toEqual([
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ]);
    });
    // Short Month Names
    it("renders month options with short name and default locale", () => {
      monthDropdown = getMonthDropdown({
        dropdownMode: "select",
        useShortMonthInDropdown: true,
      });
      const options = monthDropdown.querySelectorAll("option");
      expect(Array.from(options).map((o) => o.textContent)).toEqual([
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ]);
    });

    it("renders month options with specified locale", () => {
      registerLocale("zh-cn", zhCN);
      monthDropdown = getMonthDropdown({
        dropdownMode: "select",
        locale: "zh-cn",
      });
      const options = monthDropdown.querySelectorAll("option");
      expect(Array.from(options).map((o) => o.textContent)).toEqual([
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ]);
    });

    // Native select elements do not fire onChange for the same value, so no testing is required.
    // However, in RTL, the test is skipped because the Event is fired.
    xit("does not call the supplied onChange function when the same month is clicked", () => {
      monthDropdown = getMonthDropdown({ dropdownMode: "select", month: 11 });
      const select = monthDropdown.querySelector(
        ".react-datepicker__month-select",
      );
      fireEvent.change(select, { target: { value: 11 } });
      expect(handleChangeResult).toBeNull();
    });

    it("calls the supplied onChange function when a different month is clicked", () => {
      monthDropdown = getMonthDropdown({ dropdownMode: "select", month: 11 });
      const select = monthDropdown.querySelector(
        ".react-datepicker__month-select",
      );
      fireEvent.change(select, { target: { value: 9 } });
      expect(handleChangeResult).toEqual("9");
    });
  });
});
