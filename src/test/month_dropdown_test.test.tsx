import { render, fireEvent } from "@testing-library/react";
import { el } from "date-fns/locale/el";
import { ru } from "date-fns/locale/ru";
import { zhCN } from "date-fns/locale/zh-CN";
import React from "react";

import { getMonthInLocale, registerLocale } from "../date_utils";
import MonthDropdown from "../month_dropdown";
import MonthDropdownOptions from "../month_dropdown_options";

import { range, safeQuerySelector, safeQuerySelectorAll } from "./test_utils";

type MonthDropdownProps = React.ComponentProps<typeof MonthDropdown>;

describe("MonthDropdown", () => {
  let monthDropdown: HTMLElement;
  let handleChangeResult: number | null;
  const mockHandleChange = function (changeInput: number) {
    handleChangeResult = changeInput;
  };

  function getMonthDropdown(
    overrideProps?: Partial<
      Pick<MonthDropdownProps, "dropdownMode" | "month" | "onChange">
    > &
      Omit<MonthDropdownProps, "dropdownMode" | "month" | "onChange">,
  ) {
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
      expect(monthDropdown?.textContent).toContain("December");
    });

    it("opens a list when read view is clicked", () => {
      const monthReadView = safeQuerySelector(
        monthDropdown,
        ".react-datepicker__month-read-view",
      );
      fireEvent.click(monthReadView);
      const optionsView = monthDropdown?.querySelector(
        ".react-datepicker__month-dropdown",
      );
      expect(optionsView).not.toBeNull();
    });

    describe("with the selected month", () => {
      let selectedMonth: HTMLSelectElement | null | undefined;

      beforeEach(() => {
        const monthReadView = safeQuerySelector(
          monthDropdown,
          ".react-datepicker__month-read-view",
        );
        fireEvent.click(monthReadView);
        selectedMonth = monthDropdown?.querySelector<HTMLSelectElement>(
          ".react-datepicker__month-option--selected_month",
        );
      });

      it("applies the 'selected' modifier class to the selected month", () => {
        expect(selectedMonth?.textContent).toContain("December");
      });

      it("adds aria-selected property to the selected month", () => {
        const ariaSelected = selectedMonth?.getAttribute("aria-selected");
        expect(ariaSelected).toEqual("true");
      });
    });

    describe("with a not selected month", () => {
      let notSelectedMonth: HTMLElement | null | undefined;

      beforeEach(() => {
        fireEvent.click(
          monthDropdown?.querySelector(".react-datepicker__month-read-view") ??
            new HTMLSelectElement(),
        );
        notSelectedMonth = safeQuerySelector(
          monthDropdown,
          ".react-datepicker__month-option",
        );
      });

      it("does not apply the 'selected' modifier class to the selected month", () => {
        expect(notSelectedMonth?.textContent).not.toContain("December");
      });

      it("does not add aria-selected property to the selected month", () => {
        const ariaSelected = notSelectedMonth?.getAttribute("aria-selected");
        expect(ariaSelected).toBeNull();
      });
    });

    it("closes the dropdown when a month is clicked", () => {
      const monthReadView = safeQuerySelector(
        monthDropdown,
        ".react-datepicker__month-read-view",
      );
      fireEvent.click(monthReadView);

      const minMonthOptionsLen = 2;
      const monthOptions = safeQuerySelectorAll(
        monthDropdown,
        ".react-datepicker__month-option",
        minMonthOptionsLen,
      );

      fireEvent.click(monthOptions[1]!);
      expect(
        monthDropdown?.querySelectorAll(".react-datepicker__month-dropdown"),
      ).toHaveLength(0);
    });

    it("closes the dropdown if outside is clicked", () => {
      const monthNames = range(0, 12).map((M) => getMonthInLocale(M));

      const onCancelSpy = jest.fn();
      render(
        <MonthDropdownOptions
          onCancel={onCancelSpy}
          onChange={onCancelSpy}
          month={11}
          monthNames={monthNames}
        />,
      );
      fireEvent.mouseDown(document.body);
      fireEvent.touchStart(document.body);
      expect(onCancelSpy).toHaveBeenCalledTimes(1);
    });

    it("does not call the supplied onChange function when the same month is clicked", () => {
      const monthReadView = safeQuerySelector(
        monthDropdown,
        ".react-datepicker__month-read-view",
      );
      fireEvent.click(monthReadView);

      const monthOptionsLen = 12;
      const monthOptions = safeQuerySelectorAll(
        monthDropdown,
        ".react-datepicker__month-option",
        monthOptionsLen,
      );
      fireEvent.click(monthOptions[11]!);
      expect(handleChangeResult).toBeNull();
    });

    it("calls the supplied onChange function when a different month is clicked", () => {
      const monthReadView = safeQuerySelector(
        monthDropdown,
        ".react-datepicker__month-read-view",
      );
      fireEvent.click(monthReadView);

      const minRequiredMonthsLen = 3;
      const monthOptions = safeQuerySelectorAll(
        monthDropdown,
        ".react-datepicker__month-option",
        minRequiredMonthsLen,
      );
      fireEvent.click(monthOptions[2]!);
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

    it("calls the supplied onChange function when a month is selected using arrows and enter key", () => {
      const monthReadView = safeQuerySelector(
        monthDropdown,
        ".react-datepicker__month-read-view",
      );
      fireEvent.click(monthReadView);

      const monthOptions = safeQuerySelectorAll(
        monthDropdown,
        ".react-datepicker__month-option",
      );

      const monthOption = monthOptions[3]!;
      fireEvent.keyDown(monthOption, { key: "ArrowDown" });

      const nextMonthOption = monthOptions[4];
      expect(document.activeElement).toEqual(nextMonthOption);

      fireEvent.keyDown(document.activeElement!, { key: "Enter" });
      expect(handleChangeResult).toEqual(4);
    });

    it("handles ArrowUp key navigation correctly", () => {
      const monthReadView = safeQuerySelector(
        monthDropdown,
        ".react-datepicker__month-read-view",
      );
      fireEvent.click(monthReadView);

      const monthOptions = safeQuerySelectorAll(
        monthDropdown,
        ".react-datepicker__month-option",
      );

      const monthOption = monthOptions[5]!;
      fireEvent.keyDown(monthOption, { key: "ArrowUp" });

      const prevMonthOption = monthOptions[4];
      expect(document.activeElement).toEqual(prevMonthOption);
    });

    it("handles Escape key to cancel dropdown", () => {
      const monthReadView = safeQuerySelector(
        monthDropdown,
        ".react-datepicker__month-read-view",
      );
      fireEvent.click(monthReadView);

      const monthOptions = safeQuerySelectorAll(
        monthDropdown,
        ".react-datepicker__month-option",
      );

      const monthOption = monthOptions[5]!;
      fireEvent.keyDown(monthOption, { key: "Escape" });

      expect(
        monthDropdown?.querySelectorAll(".react-datepicker__month-dropdown"),
      ).toHaveLength(0);
    });

    it("wraps around when using ArrowUp on first month", () => {
      const monthReadView = safeQuerySelector(
        monthDropdown,
        ".react-datepicker__month-read-view",
      );
      fireEvent.click(monthReadView);

      const monthOptions = safeQuerySelectorAll(
        monthDropdown,
        ".react-datepicker__month-option",
      );

      const firstMonthOption = monthOptions[0]!;
      fireEvent.keyDown(firstMonthOption, { key: "ArrowUp" });

      const lastMonthOption = monthOptions[11];
      expect(document.activeElement).toEqual(lastMonthOption);
    });

    it("wraps around when using ArrowDown on last month", () => {
      const monthReadView = safeQuerySelector(
        monthDropdown,
        ".react-datepicker__month-read-view",
      );
      fireEvent.click(monthReadView);

      const monthOptions = safeQuerySelectorAll(
        monthDropdown,
        ".react-datepicker__month-option",
      );

      const lastMonthOption = monthOptions[11]!;
      fireEvent.keyDown(lastMonthOption, { key: "ArrowDown" });

      const firstMonthOption = monthOptions[0];
      expect(document.activeElement).toEqual(firstMonthOption);
    });
  });

  describe("select mode", () => {
    it("renders a select", () => {
      monthDropdown = getMonthDropdown({ dropdownMode: "select" });
      const select = monthDropdown.querySelector<HTMLSelectElement>(
        ".react-datepicker__month-select",
      );
      expect(select).not.toBeNull();
      expect(select?.value).toEqual("11");
      const options = select?.querySelectorAll("option");
      expect(Array.from(options ?? []).map((o) => Number(o.value))).toEqual(
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

    it("calls the supplied onChange function when a different month is clicked", () => {
      monthDropdown = getMonthDropdown({ dropdownMode: "select", month: 11 });
      const select = monthDropdown.querySelector<HTMLSelectElement>(
        ".react-datepicker__month-select",
      );
      fireEvent.change(select ?? new HTMLSelectElement(), {
        target: { value: 9 },
      });
      expect(handleChangeResult).toEqual(9);
    });
  });
});
