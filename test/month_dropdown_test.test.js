import React from "react";
import range from "lodash/range";
import MonthDropdown from "../src/month_dropdown.jsx";
import MonthDropdownOptions from "../src/month_dropdown_options.jsx";
import { mount } from "enzyme";
import { getMonthInLocale, registerLocale } from "../src/date_utils";
import zh_cn from "date-fns/locale/zh-CN";
import el from "date-fns/locale/el";
import ru from "date-fns/locale/ru";

describe("MonthDropdown", () => {
  let monthDropdown;
  let handleChangeResult;
  const mockHandleChange = function (changeInput) {
    handleChangeResult = changeInput;
  };

  function getMonthDropdown(overrideProps) {
    return mount(
      <MonthDropdown
        dropdownMode="scroll"
        month={11}
        onChange={mockHandleChange}
        {...overrideProps}
      />,
    );
  }

  beforeEach(() => {
    handleChangeResult = null;
  });

  describe("scroll mode", () => {
    beforeEach(() => {
      monthDropdown = getMonthDropdown();
    });

    it("shows the selected month in the initial view", () => {
      expect(monthDropdown.text()).toContain("December");
    });

    it("opens a list when read view is clicked", () => {
      monthDropdown
        .find(".react-datepicker__month-read-view")
        .simulate("click");
      var optionsView = monthDropdown.find(MonthDropdownOptions);
      expect(optionsView).not.toBeNull();
    });

    describe("with the selected month", () => {
      let selectedMonth;

      beforeEach(() => {
        monthDropdown
          .find(".react-datepicker__month-read-view")
          .simulate("click");
        selectedMonth = monthDropdown.find(
          ".react-datepicker__month-option--selected_month",
        );
      });

      it("applies the 'selected' modifier class to the selected month", () => {
        expect(selectedMonth.text()).toContain("December");
      });

      it("adds aria-selected property to the selected month", () => {
        const ariaSelected = selectedMonth.prop("aria-selected");
        expect(ariaSelected).toEqual("true");
      });
    });

    describe("with a not selected month", () => {
      let notSelectedMonth;

      beforeEach(() => {
        monthDropdown
          .find(".react-datepicker__month-read-view")
          .simulate("click");
        notSelectedMonth = monthDropdown
          .find(".react-datepicker__month-option")
          .at(0);
      });

      it("does not apply the 'selected' modifier class to the selected month", () => {
        expect(notSelectedMonth.text()).not.toContain("December");
      });

      it("does not add aria-selected property to the selected month", () => {
        const ariaSelected = notSelectedMonth.prop("aria-selected");
        expect(ariaSelected).toBe(undefined);
      });
    });

    it("closes the dropdown when a month is clicked", () => {
      monthDropdown
        .find(".react-datepicker__month-read-view")
        .simulate("click");
      monthDropdown
        .find(".react-datepicker__month-option")
        .at(1)
        .simulate("click");
      expect(monthDropdown.find(MonthDropdownOptions)).toHaveLength(0);
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
      monthDropdown
        .find(".react-datepicker__month-read-view")
        .simulate("click");
      monthDropdown
        .find(".react-datepicker__month-option")
        .at(11)
        .simulate("click");
      expect(handleChangeResult).toBeNull();
    });

    it("calls the supplied onChange function when a different month is clicked", () => {
      monthDropdown
        .find(".react-datepicker__month-read-view")
        .simulate("click");
      monthDropdown
        .find(".react-datepicker__month-option")
        .at(2)
        .simulate("click");
      expect(handleChangeResult).toEqual(2);
    });

    it("should use locale stand-alone formatting to display month names", () => {
      registerLocale("el", el);
      registerLocale("ru", ru);

      let dropdownDateFormat = getMonthDropdown();
      expect(dropdownDateFormat.text()).toContain("December");

      dropdownDateFormat = getMonthDropdown({ locale: "el" });
      expect(dropdownDateFormat.text()).toContain("Δεκέμβριος");

      dropdownDateFormat = getMonthDropdown({ locale: "ru" });
      expect(dropdownDateFormat.text()).toContain("декабрь");
    });
  });

  describe("select mode", () => {
    it("renders a select", () => {
      monthDropdown = getMonthDropdown({ dropdownMode: "select" });
      var select = monthDropdown.find(".react-datepicker__month-select");
      expect(select).toHaveLength(1);
      expect(select.prop("value")).toEqual(11);
      var options = select.find("option");
      expect(options.map((o) => o.prop("value"))).toEqual(range(0, 12));
    });

    it("renders month options with default locale", () => {
      monthDropdown = getMonthDropdown({ dropdownMode: "select" });
      var options = monthDropdown.find("option");
      expect(options.map((o) => o.text())).toEqual([
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
      var options = monthDropdown.find("option");
      expect(options.map((o) => o.text())).toEqual([
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
      registerLocale("zh-cn", zh_cn);
      monthDropdown = getMonthDropdown({
        dropdownMode: "select",
        locale: "zh-cn",
      });
      var options = monthDropdown.find("option");
      expect(options.map((o) => o.text())).toEqual([
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

    it("does not call the supplied onChange function when the same month is clicked", () => {
      monthDropdown = getMonthDropdown({ dropdownMode: "select", month: 11 });
      var select = monthDropdown.find(".react-datepicker__month-select");
      select.simulate("change", { target: { value: 11 } });
      expect(handleChangeResult).toBeFalsy();
    });

    it("calls the supplied onChange function when a different month is clicked", () => {
      monthDropdown = getMonthDropdown({ dropdownMode: "select", month: 11 });
      var select = monthDropdown.find(".react-datepicker__month-select");
      select.simulate("change", { target: { value: 9 } });
      expect(handleChangeResult).toEqual(9);
    });
  });
});
