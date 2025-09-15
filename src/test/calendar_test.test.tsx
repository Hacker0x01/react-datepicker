/**
 * @jest-environment jsdom
 */

import { render, fireEvent, act, waitFor } from "@testing-library/react";
import {
  setDate,
  startOfMonth,
  eachDayOfInterval,
  endOfMonth,
  endOfYear,
  isSunday,
} from "date-fns";
import { eo } from "date-fns/locale/eo";
import { fi } from "date-fns/locale/fi";
import React from "react";

import Calendar from "../calendar";
import {
  KeyType,
  getMonthInLocale,
  getStartOfMonth,
  getStartOfWeek,
  getWeekdayMinInLocale,
  newDate,
  parseDate,
  registerLocale,
  setDefaultLocale,
  formatDate,
  addMonths,
  addYears,
  getMonth,
  getYear,
  isSameDay,
  subMonths,
  subYears,
  addDays,
  getDate,
} from "../date_utils";
import DatePicker from "../index";

import {
  getKey,
  getRandomMonthExcludingCurrent,
  SafeElementWrapper,
  safeQuerySelector,
  safeQuerySelectorAll,
  setupMockResizeObserver,
} from "./test_utils";

import type { ReactDatePickerCustomHeaderProps } from "../calendar";
import type { Locale } from "../date_utils";
import type { Day } from "date-fns";
import type Month from "month";
import type MonthYearDropdown from "month_year_dropdown";
import type Year from "year";
import type YearDropdown from "year_dropdown";

const DATE_FORMAT = "MM/dd/yyyy";

type CalendarProps = React.ComponentProps<typeof Calendar>;

interface YearDropdownProps
  extends React.ComponentPropsWithoutRef<typeof YearDropdown> {}

interface MonthYearDropdownProps
  extends React.ComponentPropsWithoutRef<typeof MonthYearDropdown> {}

interface YearProps extends React.ComponentPropsWithoutRef<typeof Year> {}

interface MonthProps extends React.ComponentPropsWithoutRef<typeof Month> {}

describe("Calendar", () => {
  const dateFormat = "MMMM yyyy";
  registerLocale("fi", fi);

  function getCalendar(
    extraProps?: Partial<
      Pick<
        CalendarProps,
        "dateFormat" | "onSelect" | "onClickOutside" | "dropdownMode"
      >
    > &
      Omit<
        CalendarProps,
        | "dateFormat"
        | "onSelect"
        | "onClickOutside"
        | "dropdownMode"
        | "showMonthYearDropdown"
      > &
      (
        | ({
            showMonthYearDropdown: true;
          } & Pick<MonthYearDropdownProps, "maxDate" | "minDate">)
        | ({
            showMonthYearDropdown?: never;
          } & Pick<YearDropdownProps, "maxDate" | "minDate"> &
            Pick<YearProps, "maxDate" | "minDate"> &
            Pick<MonthProps, "maxDate" | "minDate">)
      ),
  ) {
    let instance: Calendar | null = null;
    const { container, rerender } = render(
      <Calendar
        ref={(node) => {
          instance = node;
        }}
        dateFormat={dateFormat}
        onSelect={() => {}}
        onClickOutside={() => {}}
        dropdownMode="scroll"
        {...extraProps}
      />,
    );
    const rerenderFunc = (
      props?: Partial<Omit<CalendarProps, "showMonthYearDropdown">>,
    ) => {
      return rerender(
        <Calendar
          ref={(node) => {
            instance = node;
          }}
          dateFormat={dateFormat}
          onSelect={() => {}}
          onClickOutside={() => {}}
          dropdownMode="scroll"
          {...extraProps}
          {...props}
        />,
      );
    };
    return {
      calendar: container,
      instance: instance as unknown as Calendar | null,
      rerender: rerenderFunc,
    };
  }

  beforeAll(() => {
    setupMockResizeObserver();
  });

  it("should start with the current date in view if no date range", () => {
    const now = newDate();
    const { instance } = getCalendar();
    expect(isSameDay(instance?.state.date, now)).toBeTruthy();
  });

  it("should start with the selected date in view if provided", () => {
    const selected = addYears(newDate(), 1);
    const { instance } = getCalendar({ selected });
    expect(isSameDay(instance?.state.date, selected)).toBeTruthy();
  });

  it("should start with the current date in view if in date range", () => {
    const now = newDate();
    const minDate = subYears(now, 1);
    const maxDate = addYears(now, 1);
    const { instance } = getCalendar({ minDate, maxDate });
    expect(isSameDay(instance?.state.date, now)).toBeTruthy();
  });

  it("should start with the min date in view if after the current date", () => {
    const minDate = addYears(newDate(), 1);
    const { instance } = getCalendar({ minDate });
    expect(isSameDay(instance?.state.date, minDate)).toBeTruthy();
  });

  it("should start with the min include date in view if after the current date", () => {
    const minDate = addYears(newDate(), 1);
    const { instance } = getCalendar({ includeDates: [minDate] });
    expect(isSameDay(instance?.state.date, minDate)).toBeTruthy();
  });

  it("should start with the max date in view if before the current date", () => {
    const maxDate = subYears(newDate(), 1);
    const { instance } = getCalendar({ maxDate });
    expect(isSameDay(instance?.state.date, maxDate)).toBeTruthy();
  });

  it("should start with the max include date in view if before the current date", () => {
    const maxDate = subYears(newDate(), 1);
    const { instance } = getCalendar({ includeDates: [maxDate] });
    expect(isSameDay(instance?.state.date, maxDate)).toBeTruthy();
  });

  it("should start with the open to date in view if given and no selected/min/max dates given", () => {
    const openToDate =
      parseDate("09/28/1993", DATE_FORMAT, undefined, false) ?? undefined;
    const { instance } = getCalendar({ openToDate });
    expect(isSameDay(instance?.state.date, openToDate)).toBeTruthy();
  });

  it("should start with the open to date in view if given and after a min date", () => {
    const openToDate =
      parseDate("09/28/1993", DATE_FORMAT, undefined, false) ?? undefined;
    const minDate =
      parseDate("01/01/1993", DATE_FORMAT, undefined, false) ?? undefined;
    const { instance } = getCalendar({ openToDate, minDate });
    expect(isSameDay(instance?.state.date, openToDate)).toBeTruthy();
  });

  it("should start with the open to date in view if given and before a max date", () => {
    const openToDate =
      parseDate("09/28/1993", DATE_FORMAT, undefined, false) ?? undefined;
    const maxDate =
      parseDate("12/31/1993", DATE_FORMAT, undefined, false) ?? undefined;
    const { instance } = getCalendar({ openToDate, maxDate });
    expect(isSameDay(instance?.state.date, openToDate)).toBeTruthy();
  });

  it("should start with the open to date in view if given and in range of the min/max dates", () => {
    const openToDate =
      parseDate("09/28/1993", DATE_FORMAT, undefined, false) ?? undefined;
    const minDate =
      parseDate("01/01/1993", DATE_FORMAT, undefined, false) ?? undefined;
    const maxDate =
      parseDate("12/31/1993", DATE_FORMAT, undefined, false) ?? undefined;
    const { instance } = getCalendar({ openToDate, minDate, maxDate });
    expect(isSameDay(instance?.state.date, openToDate)).toBeTruthy();
  });

  it("should open on openToDate date rather than selected date when both are specified", () => {
    const openToDate =
      parseDate("09/28/1993", DATE_FORMAT, undefined, false) ?? undefined;
    const selected =
      parseDate("09/28/1995", DATE_FORMAT, undefined, false) ?? undefined;
    const { instance } = getCalendar({ openToDate, selected });
    expect(isSameDay(instance?.state.date, openToDate)).toBeTruthy();
  });

  it("should trigger date change when openToDate prop is set after calcInitialState()", () => {
    const openToDate =
      parseDate("09/28/1993", DATE_FORMAT, undefined, false) ?? undefined;
    const oneMonthFromOpenToDate =
      parseDate("10/28/1993", DATE_FORMAT, undefined, false) ?? undefined;
    const { instance, rerender } = getCalendar({ openToDate });

    expect(isSameDay(instance?.state.date, openToDate)).toBeTruthy();
    rerender({
      openToDate: oneMonthFromOpenToDate,
    });
    expect(
      isSameDay(instance?.state.date, oneMonthFromOpenToDate),
    ).toBeTruthy();
  });

  it("should render month and year as a header of datepicker by default", () => {
    const { calendar } = getCalendar();
    expect(() =>
      calendar.querySelector("h2.react-datepicker__current-month"),
    ).not.toThrow();
  });

  it("should not show the year dropdown menu by default", () => {
    const { calendar } = getCalendar();
    const yearReadView = calendar.querySelectorAll(
      ".react-datepicker__year-dropdown-container",
    );
    expect(yearReadView).toHaveLength(0);
  });

  it("should show the year dropdown menu if toggled on", () => {
    const { calendar } = getCalendar({ showYearDropdown: true });
    const yearReadView = calendar.querySelectorAll(
      ".react-datepicker__year-dropdown-container",
    );
    expect(yearReadView).toHaveLength(1);
  });

  it("should show only one year dropdown menu if toggled on and multiple month mode on", () => {
    const { calendar } = getCalendar({
      showYearDropdown: true,
      monthsShown: 2,
    });
    const monthReadView = calendar.querySelectorAll(
      ".react-datepicker__year-dropdown-container",
    );
    expect(monthReadView).toHaveLength(1);
  });

  it("should show month navigation if toggled on", () => {
    const { calendar } = getCalendar({
      includeDates: [newDate()],
      forceShowMonthNavigation: true,
    });
    const nextNavigationButton = calendar.querySelectorAll(
      ".react-datepicker__navigation--next",
    );
    expect(nextNavigationButton).toHaveLength(1);
  });

  it("should correctly format weekday using formatWeekDay prop", () => {
    const { calendar } = getCalendar({ formatWeekDay: (day) => day.charAt(0) });
    calendar
      .querySelectorAll(
        ".react-datepicker__day-name > span[aria-hidden='true']",
      )
      .forEach((dayName) => expect(dayName.textContent).toHaveLength(1));
  });

  it("should contain the correct class when using the weekDayClassName prop", () => {
    const func = (date: Date) => (isSunday(date) ? "sunday" : "");

    const { container } = render(
      <Calendar
        dateFormat={dateFormat}
        dropdownMode="scroll"
        onClickOutside={() => {}}
        onSelect={() => {}}
        weekDayClassName={func}
      />,
    );

    const sunday = container.querySelectorAll(
      ".react-datepicker__day-name.sunday",
    );
    expect(sunday).toHaveLength(1);
  });

  it("should render the months correctly adjusted by monthSelectedIn", () => {
    const selected = newDate("2018-11-19");
    const { calendar, rerender } = getCalendar({
      inline: true,
      monthsShown: 2,
      selected,
    });
    rerender();
    const renderedMonths = calendar.querySelectorAll(
      ".react-datepicker__month",
    );
    expect(
      getMonth(renderedMonths[0]?.getAttribute("aria-label") ?? 0),
    ).toEqual(10);
  });

  it("should render the months correctly adjusted by monthSelectedIn for showPreviousMonths", () => {
    const selected = newDate("2018-11-19");
    const { calendar, rerender } = getCalendar({
      inline: true,
      monthsShown: 2,
      selected,
      showPreviousMonths: true,
    });
    rerender();
    const renderedMonths = calendar.querySelectorAll(
      ".react-datepicker__month",
    );
    expect(
      getMonth(renderedMonths[0]?.getAttribute("aria-label") ?? 0),
    ).toEqual(9);
  });

  it("should render the correct default aria labels for next and prev months buttons", () => {
    const { calendar } = getCalendar();
    const previousButtonAriaLabel = calendar
      .querySelector(".react-datepicker__navigation--previous")
      ?.getAttribute("aria-label");
    const nextButtonAriaLabel = calendar
      .querySelector(".react-datepicker__navigation--next")
      ?.getAttribute("aria-label");

    expect(previousButtonAriaLabel).toBe("Previous Month");
    expect(nextButtonAriaLabel).toBe("Next Month");
  });

  it("should render by default aria labels for next and prev months button equal to the next and prev buttons text", () => {
    const previousMonthButtonLabel = "Go to previous month";
    const nextMonthButtonLabel = "Go to next month";
    const { calendar } = getCalendar({
      previousMonthButtonLabel,
      nextMonthButtonLabel,
    });

    const previousButtonAriaLabel = calendar
      .querySelector(".react-datepicker__navigation--previous")
      ?.getAttribute("aria-label");
    const nextButtonAriaLabel = calendar
      .querySelector(".react-datepicker__navigation--next")
      ?.getAttribute("aria-label");

    expect(previousButtonAriaLabel).toBe(previousMonthButtonLabel);
    expect(nextButtonAriaLabel).toBe(nextMonthButtonLabel);
  });

  it("should allow user to pass a custom aria label for next and/or previous month button", () => {
    const previousMonthAriaLabel = "Go to the previous month of the year";
    const nextMonthAriaLabel = "Go to the next month of the year";
    const { calendar } = getCalendar({
      previousMonthButtonLabel: "Go to previous month",
      nextMonthButtonLabel: "Go to next month",
      previousMonthAriaLabel,
      nextMonthAriaLabel,
    });

    const previousButtonAriaLabel = calendar
      .querySelector(".react-datepicker__navigation--previous")
      ?.getAttribute("aria-label");
    const nextButtonAriaLabel = calendar
      .querySelector(".react-datepicker__navigation--next")
      ?.getAttribute("aria-label");

    expect(previousButtonAriaLabel).toBe(previousButtonAriaLabel);
    expect(nextButtonAriaLabel).toBe(nextButtonAriaLabel);
  });

  it("should render by default aria labels for next and prev months buttons when providing a react node", () => {
    const previousMonthButtonLabel = <span>Custom react previous month</span>;
    const nextMonthButtonLabel = <span>Custom react next month</span>;
    const { calendar } = getCalendar({
      previousMonthButtonLabel,
      nextMonthButtonLabel,
    });

    const previousButtonAriaLabel = calendar
      .querySelector(".react-datepicker__navigation--previous")
      ?.getAttribute("aria-label");
    const nextButtonAriaLabel = calendar
      .querySelector(".react-datepicker__navigation--next")
      ?.getAttribute("aria-label");

    expect(previousButtonAriaLabel).toBe("Previous Month");
    expect(nextButtonAriaLabel).toBe("Next Month");
  });

  it("should render the correct default aria labels for next and prev year buttons", () => {
    const { calendar } = getCalendar({ showYearPicker: true });
    const previousButtonAriaLabel = calendar
      .querySelector(".react-datepicker__navigation--previous")
      ?.getAttribute("aria-label");
    const nextButtonAriaLabel = calendar
      .querySelector(".react-datepicker__navigation--next")
      ?.getAttribute("aria-label");

    expect(previousButtonAriaLabel).toBe("Previous Year");
    expect(nextButtonAriaLabel).toBe("Next Year");
  });

  it("should render by default aria labels for next and prev year buttons equal to the next and prev buttons text", () => {
    const previousYearButtonLabel = "Go to previous year";
    const nextYearButtonLabel = "Go to next year";
    const { calendar } = getCalendar({
      showYearPicker: true,
      previousYearButtonLabel,
      nextYearButtonLabel,
    });

    const previousButtonAriaLabel = calendar
      .querySelector(".react-datepicker__navigation--previous")
      ?.getAttribute("aria-label");
    const nextButtonAriaLabel = calendar
      .querySelector(".react-datepicker__navigation--next")
      ?.getAttribute("aria-label");

    expect(previousButtonAriaLabel).toBe(previousYearButtonLabel);
    expect(nextButtonAriaLabel).toBe(nextYearButtonLabel);
  });

  it("should allow user to pass a custom aria label for next and/or previous year button", () => {
    const previousYearAriaLabel = "Go to the previous year";
    const nextYearAriaLabel = "Go to the next year";
    const { calendar } = getCalendar({
      showYearPicker: true,
      previousYearButtonLabel: "Go to prev year",
      nextYearButtonLabel: "Go to next year",
      previousYearAriaLabel,
      nextYearAriaLabel,
    });

    const previousButtonAriaLabel = calendar
      .querySelector(".react-datepicker__navigation--previous")
      ?.getAttribute("aria-label");
    const nextButtonAriaLabel = calendar
      .querySelector(".react-datepicker__navigation--next")
      ?.getAttribute("aria-label");

    expect(previousButtonAriaLabel).toBe(previousYearAriaLabel);
    expect(nextButtonAriaLabel).toBe(nextYearAriaLabel);
  });

  it("should render by default aria labels for next and prev year buttons when providing a react node", () => {
    const previousYearButtonLabel = <span>Custom react previous year</span>;
    const nextYearButtonLabel = <span>Custom react next year</span>;
    const { calendar } = getCalendar({
      showYearPicker: true,
      previousYearButtonLabel,
      nextYearButtonLabel,
    });

    const previousButtonAriaLabel = calendar
      .querySelector(".react-datepicker__navigation--previous")
      ?.getAttribute("aria-label");
    const nextButtonAriaLabel = calendar
      .querySelector(".react-datepicker__navigation--next")
      ?.getAttribute("aria-label");

    expect(previousButtonAriaLabel).toBe("Previous Year");
    expect(nextButtonAriaLabel).toBe("Next Year");
  });

  it("should not have previous month button when selecting a date in the second month, when min date is specified", () => {
    const minDate = new Date("2024-11-06");
    const maxDate = new Date("2025-01-01");
    const selectedDate = minDate;

    const { container } = render(
      <DatePicker
        inline
        monthsShown={2}
        selected={selectedDate}
        minDate={minDate}
        maxDate={maxDate}
      />,
    );

    expect(
      container.querySelector(".react-datepicker__navigation--previous"),
    ).toBe(null);

    const secondMonthDate = safeQuerySelectorAll(
      container,
      ".react-datepicker__day--009",
    )[1];
    if (!secondMonthDate) {
      throw new Error("second month date is not found");
    }

    fireEvent.click(secondMonthDate);

    expect(
      container.querySelector(".react-datepicker__navigation--previous"),
    ).toBe(null);
  });

  describe("custom header", () => {
    const months = [
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
    ];

    const renderCustomHeader = (params: ReactDatePickerCustomHeaderProps) => {
      const {
        date,
        visibleYearsRange,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      } = params;

      return (
        <div className="custom-header">
          {visibleYearsRange && (
            <h6 className="visible-years-range">
              {visibleYearsRange.startYear} to {visibleYearsRange.endYear}
            </h6>
          )}
          <button
            className="prevMonth"
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
          >
            {"<"}
          </button>

          <select
            value={getYear(date)}
            className="year-select"
            onChange={({ target: { value } }) => changeYear(Number(value))}
          >
            {[2017, 2018, 2019].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            className="month-select"
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) => changeMonth(Number(value))}
          >
            {months.map((option, index) => (
              <option key={option} value={index}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="nextMonth"
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
          >
            {"<"}
          </button>
        </div>
      );
    };

    it("should call render custom header function and returns parameters", () => {
      const renderCustomHeader = jest.fn();

      getCalendar({ renderCustomHeader });

      const match = {
        customHeaderCount: expect.any(Number),
        changeMonth: expect.any(Function),
        changeYear: expect.any(Function),
        date: expect.any(Date),
        decreaseMonth: expect.any(Function),
        increaseMonth: expect.any(Function),
        decreaseYear: expect.any(Function),
        increaseYear: expect.any(Function),
        nextMonthButtonDisabled: expect.any(Boolean),
        prevMonthButtonDisabled: expect.any(Boolean),
        nextYearButtonDisabled: expect.any(Boolean),
        prevYearButtonDisabled: expect.any(Boolean),
        isRenderAriaLiveMessage: expect.any(Boolean),
        monthContainer: undefined,
        monthDate: expect.any(Date),
        selectingDate: undefined,
      };

      expect(renderCustomHeader).toHaveBeenCalledWith(match);
    });

    it("should render only custom header", () => {
      const { calendar } = getCalendar({ renderCustomHeader });

      const nextMontButton = calendar.querySelectorAll(
        ".react-datepicker__navigation--next",
      );
      const prevMontButton = calendar.querySelectorAll(
        ".react-datepicker__navigation--previous",
      );

      expect(nextMontButton).toHaveLength(0);
      expect(prevMontButton).toHaveLength(0);
    });

    it("should render custom header with selects and buttons", () => {
      const { calendar } = getCalendar({
        renderCustomHeader,
      });

      expect(
        calendar.querySelectorAll(".react-datepicker__header--custom"),
      ).toHaveLength(1);
      expect(calendar.querySelectorAll(".custom-header")).toHaveLength(1);

      const yearSelect = calendar.querySelectorAll(".year-select");
      const monthSelect = calendar.querySelectorAll(".month-select");
      const prevMonth = calendar.querySelectorAll(".prevMonth");
      const nextMonth = calendar.querySelectorAll(".nextMonth");

      expect(yearSelect).toHaveLength(1);
      expect(monthSelect).toHaveLength(1);
      expect(prevMonth).toHaveLength(1);
      expect(nextMonth).toHaveLength(1);
    });

    it("should render custom header when showing year picker", () => {
      const { calendar } = getCalendar({
        renderCustomHeader,
        showYearPicker: true,
      });

      expect(
        calendar.querySelectorAll(".react-datepicker__header--custom"),
      ).toHaveLength(1);

      expect(
        calendar.querySelectorAll(".react-datepicker__year--container"),
      ).toHaveLength(1);
    });

    it("should render day names with renderCustomHeader", () => {
      const { calendar } = getCalendar({
        renderCustomHeader,
      });

      expect(
        calendar.querySelectorAll(".react-datepicker__header--custom"),
      ).toHaveLength(1);

      expect(
        calendar.querySelectorAll(".react-datepicker__day-names"),
      ).toHaveLength(1);
    });

    it("should render custom header with visible year range for YearPicker", () => {
      const { calendar } = getCalendar({
        renderCustomHeader,
        showYearPicker: true,
      });

      expect(
        calendar.querySelector(
          ".react-datepicker__header--custom .visible-years-range",
        ),
      ).not.toBeNull();
    });

    it("should not render visible year range for non-YearPicker views", () => {
      const { calendar } = getCalendar({
        renderCustomHeader,
      });

      expect(
        calendar.querySelector(
          ".react-datepicker__header--custom .visible-years-range",
        ),
      ).toBeNull();
    });

    it("should not render day names with renderCustomHeader & showMonthYearPicker", () => {
      const { calendar } = getCalendar({
        renderCustomHeader,
        showMonthYearPicker: true,
      });

      expect(
        calendar.querySelectorAll(".react-datepicker__header--custom"),
      ).toHaveLength(1);

      expect(
        calendar.querySelectorAll(".react-datepicker__day-names"),
      ).toHaveLength(0);
    });

    it("should not render day names with renderCustomHeader & showYearPicker", () => {
      const { calendar } = getCalendar({
        renderCustomHeader,
        showYearPicker: true,
      });

      expect(
        calendar.querySelectorAll(".react-datepicker__header--custom"),
      ).toHaveLength(1);

      expect(
        calendar.querySelectorAll(".react-datepicker__day-names"),
      ).toHaveLength(0);
    });

    it("should not render day names with renderCustomHeader & showQuarterYearPicker", () => {
      const { calendar } = getCalendar({
        renderCustomHeader,
        showQuarterYearPicker: true,
      });

      expect(
        calendar.querySelectorAll(".react-datepicker__header--custom"),
      ).toHaveLength(1);

      expect(
        calendar.querySelectorAll(".react-datepicker__day-names"),
      ).toHaveLength(0);
    });

    it("should go to previous month", () => {
      const { calendar, instance } = getCalendar({
        renderCustomHeader,
      });

      const selected = newDate(instance?.state.date);
      const prevMonth = safeQuerySelector(calendar, ".prevMonth");

      fireEvent.click(prevMonth);

      expect(getMonth(selected)).toBe(
        (getMonth(instance!.state.date) + 1) % 12,
      );
    });

    it("should go to next month", () => {
      const { calendar, instance } = getCalendar({
        renderCustomHeader,
      });

      const selected = newDate(instance?.state.date);
      const nextMonth = safeQuerySelector(calendar, ".nextMonth");

      fireEvent.click(nextMonth);

      const newMonth = getMonth(instance!.state.date) - 1;

      const resultMonth = newMonth === -1 ? 11 : newMonth;

      expect(getMonth(selected)).toBe(resultMonth);
    });

    it("nextMonthButtonDisabled flag should be true", () => {
      const renderCustomHeader = jest.fn();

      getCalendar({
        renderCustomHeader,
        minDate: subMonths(newDate(), 1),
        maxDate: newDate(),
      });

      const { prevMonthButtonDisabled, nextMonthButtonDisabled } =
        renderCustomHeader.mock.calls[0][0];

      expect(prevMonthButtonDisabled).toBe(false);
      expect(nextMonthButtonDisabled).toBe(true);
    });

    it("prevMonthButtonDisabled flag should be true", () => {
      const renderCustomHeader = jest.fn();

      getCalendar({
        renderCustomHeader,
        minDate: newDate(),
        maxDate: addMonths(newDate(), 1),
      });

      const { prevMonthButtonDisabled, nextMonthButtonDisabled } =
        renderCustomHeader.mock.calls[0][0];

      expect(prevMonthButtonDisabled).toBe(true);
      expect(nextMonthButtonDisabled).toBe(false);
    });

    it("should select april from month select", async () => {
      const { calendar, instance } = getCalendar({
        renderCustomHeader,
      });

      const monthSelect = safeQuerySelector(calendar, ".month-select");
      fireEvent.change(monthSelect, { target: { value: 4 } });

      const selected = newDate(instance?.state.date);

      expect(getMonth(selected)).toBe(4);
    });

    it("should select 2017 from month select", () => {
      const { calendar, instance } = getCalendar({
        renderCustomHeader,
      });

      const yearSelect = safeQuerySelector(calendar, ".year-select");

      fireEvent.change(yearSelect, { target: { value: 2017 } });

      const selected = newDate(instance?.state.date);

      expect(getYear(selected)).toBe(2017);
    });

    it("should render custom headers according to monthsShown prop", () => {
      const { calendar: twoMonthsCalendar } = getCalendar({
        renderCustomHeader,
        monthsShown: 2,
      });
      expect(
        twoMonthsCalendar.querySelectorAll(".react-datepicker__header--custom"),
      ).toHaveLength(2);

      const { calendar: fourMonthsCalendar } = getCalendar({
        renderCustomHeader,
        monthsShown: 4,
      });
      expect(
        fourMonthsCalendar.querySelectorAll(
          ".react-datepicker__header--custom",
        ),
      ).toHaveLength(4);
    });

    it("should set monthDate prop correctly when rendering custom headers", () => {
      const renderMonthDateInCustomHeader = ({
        monthDate,
      }: {
        monthDate: Date;
      }) => (
        <div className="customheader-monthdate">{`${monthDate.getFullYear()}-${monthDate.getMonth()}-${monthDate.getDate()}`}</div>
      );
      const { calendar: twoMonthsCalendar } = getCalendar({
        renderCustomHeader: renderMonthDateInCustomHeader,
        monthsShown: 2,
      });

      const firstDate = new Date();
      const secondDate = addMonths(new Date(), 1);
      const firstDateInCustomHeader = twoMonthsCalendar.querySelectorAll(
        ".customheader-monthdate",
      )[0]?.textContent;
      const secondDateInCustomHeader = twoMonthsCalendar.querySelectorAll(
        ".customheader-monthdate",
      )[1]?.textContent;

      expect(firstDateInCustomHeader).toBe(
        `${firstDate.getFullYear()}-${firstDate.getMonth()}-${firstDate.getDate()}`,
      );
      expect(secondDateInCustomHeader).toBe(
        `${secondDate.getFullYear()}-${secondDate.getMonth()}-${secondDate.getDate()}`,
      );
    });

    it("should render custom header with show time select", () => {
      const { container } = render(
        <Calendar
          renderCustomHeader={renderCustomHeader}
          showTimeSelect
          dateFormat={dateFormat}
          dropdownMode="scroll"
          onClickOutside={() => {}}
          onSelect={() => {}}
        />,
      );
      const header = container.querySelectorAll(
        ".react-datepicker__header--custom",
      );
      const time = container.querySelectorAll(".react-datepicker__time");
      expect(header).toHaveLength(1);
      expect(time).toHaveLength(1);
    });
  });

  describe("when showDisabledMonthNavigation is enabled", () => {
    let onMonthChangeSpy = jest.fn();

    beforeEach(() => {
      onMonthChangeSpy = jest.fn();
    });

    it("should show disabled previous month navigation", () => {
      const { calendar } = getCalendar({
        minDate: newDate(),
        maxDate: addMonths(newDate(), 3),
        showDisabledMonthNavigation: true,
      });

      const prevDisabledNavigationButton = calendar.querySelectorAll(
        ".react-datepicker__navigation--previous--disabled",
      );

      const nextDisabledNavigationButton = calendar.querySelectorAll(
        ".react-datepicker__navigation--next--disabled",
      );
      expect(prevDisabledNavigationButton).toHaveLength(1);
      expect(nextDisabledNavigationButton).toHaveLength(0);
    });

    it("should show disabled next month navigation", () => {
      const { calendar } = getCalendar({
        minDate: subMonths(newDate(), 3),
        maxDate: newDate(),
        showDisabledMonthNavigation: true,
      });
      const prevDisabledNavigationButton = calendar.querySelectorAll(
        ".react-datepicker__navigation--previous--disabled",
      );

      const nextDisabledNavigationButton = calendar.querySelectorAll(
        ".react-datepicker__navigation--next--disabled",
      );
      expect(prevDisabledNavigationButton).toHaveLength(0);
      expect(nextDisabledNavigationButton).toHaveLength(1);
    });

    it("should not show disabled previous/next month navigation when next/previous month available", () => {
      const { calendar } = getCalendar({
        minDate: subMonths(newDate(), 3),
        maxDate: addMonths(newDate(), 3),
        showDisabledMonthNavigation: true,
      });
      const prevDisabledNavigationButton = calendar.querySelectorAll(
        ".react-datepicker__navigation--previous--disabled",
      );

      const nextDisabledNavigationButton = calendar.querySelectorAll(
        ".react-datepicker__navigation--next--disabled",
      );
      expect(prevDisabledNavigationButton).toHaveLength(0);
      expect(nextDisabledNavigationButton).toHaveLength(0);
    });

    it("when clicking disabled month navigation, should not change month", () => {
      const { calendar } = getCalendar({
        minDate: newDate(),
        maxDate: newDate(),
        showDisabledMonthNavigation: true,
        onMonthChange: onMonthChangeSpy,
      });
      const prevNavigationButton = safeQuerySelector(
        calendar,
        ".react-datepicker__navigation--previous",
      );

      const nextNavigationButton = safeQuerySelector(
        calendar,
        ".react-datepicker__navigation--next",
      );

      fireEvent.click(prevNavigationButton);

      expect(onMonthChangeSpy).toHaveBeenCalledTimes(0);

      fireEvent.click(nextNavigationButton);

      expect(onMonthChangeSpy).toHaveBeenCalledTimes(0);
    });

    it("when clicking non-disabled month navigation, should change month", () => {
      const { calendar } = getCalendar({
        selected: newDate(),
        minDate: subMonths(newDate(), 3),
        maxDate: addMonths(newDate(), 3),
        showDisabledMonthNavigation: true,
        onMonthChange: onMonthChangeSpy,
      });
      const prevNavigationButton = safeQuerySelector(
        calendar,
        ".react-datepicker__navigation--previous",
      );

      const nextNavigationButton = safeQuerySelector(
        calendar,
        ".react-datepicker__navigation--next",
      );

      fireEvent.click(prevNavigationButton);
      fireEvent.click(nextNavigationButton);

      expect(onMonthChangeSpy).toHaveBeenCalledTimes(2);
    });
  });

  it("should not show the month dropdown menu by default", () => {
    const { calendar } = getCalendar();
    const monthReadView = calendar.querySelectorAll(
      ".react-datepicker__month-dropdown-container",
    );
    expect(monthReadView).toHaveLength(0);
  });

  it("should show the month dropdown menu if toggled on", () => {
    const { calendar } = getCalendar({ showMonthDropdown: true });
    const monthReadView = calendar.querySelectorAll(
      ".react-datepicker__month-dropdown-container",
    );
    expect(monthReadView).toHaveLength(1);
  });

  it("should show only one month dropdown menu if toggled on and multiple month mode on", () => {
    const { calendar } = getCalendar({
      showMonthDropdown: true,
      monthsShown: 2,
    });
    const monthReadView = calendar.querySelectorAll(
      ".react-datepicker__month-dropdown-container",
    );
    expect(monthReadView).toHaveLength(1);
  });

  it("should not show the month-year dropdown menu by default", () => {
    const { calendar } = getCalendar();
    const monthYearReadView = calendar.querySelectorAll(
      ".react-datepicker__month-year-dropdown-container",
    );
    expect(monthYearReadView).toHaveLength(0);
  });

  it("should show the month-year dropdown menu if toggled on", () => {
    const { calendar } = getCalendar({
      showMonthYearDropdown: true,
      minDate: subYears(newDate(), 1),
      maxDate: addYears(newDate(), 1),
    });
    const monthYearReadView = calendar.querySelectorAll(
      ".react-datepicker__month-year-dropdown-container",
    );
    expect(monthYearReadView).toHaveLength(1);
  });

  it("should show only one month-year dropdown menu if toggled on and multiple month mode on", () => {
    const { calendar } = getCalendar({
      showMonthYearDropdown: true,
      minDate: subYears(newDate(), 1),
      maxDate: addYears(newDate(), 1),
      monthsShown: 2,
    });
    const monthReadView = calendar.querySelectorAll(
      ".react-datepicker__month-year-dropdown-container",
    );
    expect(monthReadView).toHaveLength(1);
  });

  it("should not show the today button by default", () => {
    const { calendar } = getCalendar();
    const todayButton = calendar.querySelectorAll(
      ".react-datepicker__today-button",
    );
    expect(todayButton).toHaveLength(0);
  });

  it("should show the today button if toggled on", () => {
    const { calendar } = getCalendar({ todayButton: "Vandaag" });
    const todayButton = calendar.querySelectorAll(
      ".react-datepicker__today-button",
    );
    expect(todayButton).toHaveLength(1);
    expect(todayButton[0]?.textContent).toBe("Vandaag");
  });

  it("should set the date when pressing todayButton", () => {
    const { calendar, instance } = getCalendar({ todayButton: "Vandaag" });
    const todayButton = safeQuerySelector(
      calendar,
      ".react-datepicker__today-button",
    );
    fireEvent.click(todayButton);
    expect(isSameDay(instance?.state.date, newDate())).toBeTruthy();
  });

  it("should use a hash for week label if weekLabel is NOT provided", () => {
    const { calendar } = getCalendar({ showWeekNumbers: true });
    const weekLabel = calendar.querySelectorAll(
      ".react-datepicker__day-name > span[aria-hidden='true']",
    );
    expect(weekLabel[0]?.textContent).toBe("#");
  });

  it("should set custom week label if weekLabel is provided", () => {
    const { calendar } = getCalendar({
      showWeekNumbers: true,
      weekLabel: "Foo",
    });
    const weekLabel = calendar.querySelectorAll(
      ".react-datepicker__day-name > span[aria-hidden='true']",
    );
    expect(weekLabel[0]?.textContent).toBe("Foo");
  });

  it("should track the currently hovered day (Mouse Event)", () => {
    const onDayMouseEnterSpy = jest.fn();

    const { container } = render(
      <Calendar
        dateFormat={dateFormat}
        dropdownMode="scroll"
        onClickOutside={() => {}}
        onSelect={() => {}}
        onDayMouseEnter={onDayMouseEnterSpy}
      />,
    );

    const day = safeQuerySelector(container, ".react-datepicker__day");
    fireEvent.mouseEnter(day);

    expect(onDayMouseEnterSpy).toHaveBeenLastCalledWith(
      getStartOfWeek(getStartOfMonth(newDate())),
    );
  });

  it("should track the currently hovered day (Pointer Event)", () => {
    const onDayMouseEnterSpy = jest.fn();

    const { container } = render(
      <Calendar
        dateFormat={dateFormat}
        dropdownMode="scroll"
        onClickOutside={() => {}}
        onSelect={() => {}}
        onDayMouseEnter={onDayMouseEnterSpy}
        usePointerEvent
      />,
    );

    const day = safeQuerySelector(container, ".react-datepicker__day");
    fireEvent.pointerEnter(day);

    expect(onDayMouseEnterSpy).toHaveBeenLastCalledWith(
      getStartOfWeek(getStartOfMonth(newDate())),
    );
  });

  it("should clear the hovered day when the mouse leaves", () => {
    let instance: Calendar | null = null;
    const { container, rerender } = render(
      <Calendar
        ref={(node) => {
          instance = node;
        }}
        selectsStart
        dateFormat={dateFormat}
        dropdownMode="scroll"
        onClickOutside={() => {}}
        onSelect={() => {}}
      />,
    );
    expect(instance).not.toBeFalsy();
    act(() => {
      (instance!.state as Pick<MonthProps, "selectingDate">).selectingDate =
        newDate();
    });
    rerender(
      <Calendar
        ref={(node) => {
          instance = node;
        }}
        selectsStart
        dateFormat={dateFormat}
        dropdownMode="scroll"
        onClickOutside={() => {}}
        onSelect={() => {}}
      />,
    );
    const month = safeQuerySelector(container, ".react-datepicker__month");
    expect(
      month?.classList.contains("react-datepicker__month--selecting-range"),
    ).toBeTruthy();
    fireEvent.mouseLeave(month);

    expect(
      container
        .querySelector(".react-datepicker__month")
        ?.classList.contains("react-datepicker__month--selecting-range"),
    ).toBeFalsy();
  });

  it("uses weekdaysShort instead of weekdaysMin provided useWeekdaysShort prop is present", () => {
    const calendarShort = render(
      <Calendar
        locale="en"
        dateFormat={dateFormat}
        onClickOutside={() => {}}
        onSelect={() => {}}
        useWeekdaysShort
        dropdownMode="scroll"
      />,
    ).container;
    const calendarMin = render(
      <Calendar
        locale="en"
        dateFormat={dateFormat}
        onClickOutside={() => {}}
        onSelect={() => {}}
        dropdownMode="scroll"
      />,
    ).container;

    const daysNamesShort = calendarShort.querySelectorAll(
      ".react-datepicker__day-name > span[aria-hidden='true']",
    );
    expect(daysNamesShort[0]?.textContent).toBe("Sun");
    expect(daysNamesShort[6]?.textContent).toBe("Sat");

    const daysNamesMin = calendarMin.querySelectorAll(
      ".react-datepicker__day-name > span[aria-hidden='true']",
    );
    expect(daysNamesMin[0]?.textContent).toBe("Su");
    expect(daysNamesMin[6]?.textContent).toBe("Sa");
  });

  it("should set the date to the selected day of the previous month when previous button clicked", () => {
    let date: Date | null = null;
    const expectedDate = "28.06.2017";
    const { container } = render(
      <DatePicker
        selected={newDate("2017-07-28")}
        adjustDateOnChange
        onChange={(d) => {
          date = d;
        }}
      />,
    );
    const input = safeQuerySelector(container, "input");
    fireEvent.focus(input);
    const previousButton = safeQuerySelector(
      container,
      ".react-datepicker__navigation--previous",
    );
    fireEvent.click(previousButton);

    expect(date).not.toBeNull();
    expect(formatDate(date!, "dd.MM.yyyy")).toBe(expectedDate);
  });

  it("should set the date to the selected day of the next when next button clicked", () => {
    let date: Date | null = null;
    const expectedDate = "28.08.2017";
    const { container } = render(
      <DatePicker
        selected={newDate("2017-07-28")}
        adjustDateOnChange
        onChange={(d) => {
          date = d;
        }}
      />,
    );

    const input = safeQuerySelector(container, "input");
    fireEvent.focus(input);
    const nextButton = safeQuerySelector(
      container,
      ".react-datepicker__navigation--next",
    );
    fireEvent.click(nextButton);
    expect(date).not.toBeNull();
    expect(formatDate(date!, "dd.MM.yyyy")).toBe(expectedDate);
  });

  it("should set the date to the last possible day of the previous month when previous button clicked", () => {
    let date: Date | null = null;
    const expectedDate = "30.11.2017";
    const { container } = render(
      <DatePicker
        selected={newDate("2017-12-31")}
        adjustDateOnChange
        onChange={(d) => {
          date = d;
        }}
      />,
    );

    const input = safeQuerySelector(container, "input");
    fireEvent.focus(input);
    const previousButton = safeQuerySelector(
      container,
      ".react-datepicker__navigation--previous",
    );
    fireEvent.click(previousButton);
    expect(date).not.toBeNull();
    expect(formatDate(date!, "dd.MM.yyyy")).toBe(expectedDate);
  });

  it("should trigger onCalendarOpen and onCalendarClose", () => {
    const onCalendarOpen = jest.fn();
    const onCalendarClose = jest.fn();

    const { container } = render(
      <DatePicker
        onCalendarOpen={onCalendarOpen}
        onCalendarClose={onCalendarClose}
      />,
    );

    const input = safeQuerySelector(container, "input");

    fireEvent.focus(input);
    expect(onCalendarOpen).toHaveBeenCalled();

    fireEvent.blur(input);
    expect(onCalendarOpen).toHaveBeenCalled();
  });

  describe("onMonthChange", () => {
    let onMonthChangeSpy = jest.fn();
    let calendar: HTMLElement;

    beforeEach(() => {
      onMonthChangeSpy = jest.fn();
      calendar = render(
        <Calendar
          dateFormat={dateFormat}
          onSelect={() => {}}
          onClickOutside={() => {}}
          dropdownMode="select"
          showYearDropdown
          showMonthDropdown
          forceShowMonthNavigation
          onMonthChange={onMonthChangeSpy}
        />,
      ).container;
    });

    it("calls onMonthChange prop when previous month button clicked", () => {
      const select = safeQuerySelector(
        calendar,
        ".react-datepicker__navigation--previous",
      );
      fireEvent.click(select);

      expect(onMonthChangeSpy).toHaveBeenCalled();
    });

    it("calls onMonthChange prop when next month button clicked", () => {
      const select = safeQuerySelector(
        calendar,
        ".react-datepicker__navigation--next",
      );
      fireEvent.click(select);

      expect(onMonthChangeSpy).toHaveBeenCalled();
    });

    it("calls onMonthChange prop when month changed from month dropdown", () => {
      const select = new SafeElementWrapper(calendar)
        .safeQuerySelector(".react-datepicker__month-dropdown-container")
        .safeQuerySelector("select")
        .getElement();

      const month = getRandomMonthExcludingCurrent();
      fireEvent.change(select, {
        target: {
          value: month,
        },
      });

      expect(onMonthChangeSpy).toHaveBeenCalled();
    });
  });

  describe("onYearChange", () => {
    let onYearChangeSpy = jest.fn();
    let calendar: HTMLElement;

    beforeEach(() => {
      onYearChangeSpy = jest.fn();
      calendar = render(
        <Calendar
          dateFormat={dateFormat}
          onSelect={() => {}}
          onClickOutside={() => {}}
          dropdownMode="select"
          showYearDropdown
          onYearChange={onYearChangeSpy}
        />,
      ).container;
    });

    it("calls onYearChange prop when year changed from year dropdown", () => {
      const yearDropdownContainer = safeQuerySelector(
        calendar,
        ".react-datepicker__year-dropdown-container",
      );
      const select = safeQuerySelector(yearDropdownContainer, "select");
      fireEvent.change(select, {
        target: {
          value: Array.from<HTMLOptionElement>(
            select.querySelectorAll("option"),
          ).at(-2)?.value,
        },
      });

      expect(onYearChangeSpy).toHaveBeenCalled();
    });
  });

  describe("monthYearDropdown change", () => {
    let onYearChangeSpy = jest.fn();
    let onMonthChangeSpy = jest.fn();

    beforeEach(() => {
      onYearChangeSpy = jest.fn();
      onMonthChangeSpy = jest.fn();
    });

    const renderCalendar = () => {
      let instance: Calendar | null = null;
      const { container } = render(
        <Calendar
          ref={(node) => {
            instance = node;
          }}
          dateFormat={dateFormat}
          onSelect={() => {}}
          onClickOutside={() => {}}
          dropdownMode="select"
          showMonthYearDropdown
          minDate={subYears(newDate(), 1)}
          maxDate={addYears(newDate(), 1)}
          onYearChange={onYearChangeSpy}
          onMonthChange={onMonthChangeSpy}
        />,
      );

      return {
        calendar: container,
        instance,
      };
    };

    it("calls onYearChange prop when selection is changed from month-year dropdown", () => {
      const { calendar } = renderCalendar();
      const monthYearDropdownContainer = safeQuerySelector(
        calendar,
        ".react-datepicker__month-year-dropdown-container",
      );

      const select = safeQuerySelector(monthYearDropdownContainer, "select");
      const minMonthYearOptionsLen = 4;
      const options = safeQuerySelectorAll<HTMLOptionElement>(
        select,
        "option",
        minMonthYearOptionsLen,
      );

      const option = options[3]!;
      fireEvent.change(select, {
        target: {
          value: option.value,
        },
      });

      expect(onYearChangeSpy).toHaveBeenCalled();
    });

    it("calls onMonthChange prop when selection is changed from month-year dropdown", () => {
      const { calendar } = renderCalendar();

      const monthYearDropdownContainer = safeQuerySelector(
        calendar,
        ".react-datepicker__month-year-dropdown-container",
      );
      const select = safeQuerySelector(monthYearDropdownContainer, "select");
      const options = safeQuerySelectorAll<HTMLOptionElement>(select, "option");
      const option = options[3];
      if (!option) {
        throw new Error("option is undefined");
      }

      fireEvent.change(select, {
        target: {
          value: option.value,
        },
      });

      expect(onMonthChangeSpy).toHaveBeenCalled();
    });
  });

  describe("onDropdownFocus", () => {
    let onDropdownFocusSpy = jest.fn();
    let calendar: HTMLElement;

    beforeEach(() => {
      onDropdownFocusSpy = jest.fn();
      calendar = render(
        <Calendar
          dateFormat={dateFormat}
          onSelect={() => {}}
          onClickOutside={() => {}}
          dropdownMode="select"
          showYearDropdown
          showMonthDropdown
          showMonthYearDropdown
          minDate={subYears(newDate(), 1)}
          maxDate={addYears(newDate(), 1)}
          onDropdownFocus={onDropdownFocusSpy}
        />,
      ).container;
    });

    it("calls onDropdownFocus prop when year select is focused", () => {
      const select = safeQuerySelector(
        calendar,
        ".react-datepicker__year-select",
      );
      fireEvent.focus(select);

      expect(onDropdownFocusSpy).toHaveBeenCalled();
    });

    it("calls onDropdownFocus prop when month select is focused", () => {
      const select = safeQuerySelector(
        calendar,
        ".react-datepicker__month-select",
      );
      fireEvent.focus(select);

      expect(onDropdownFocusSpy).toHaveBeenCalled();
    });

    it("calls onDropdownFocus prop when year-month select is focused", () => {
      const select = safeQuerySelector(
        calendar,
        ".react-datepicker__month-year-select",
      );
      fireEvent.focus(select);

      expect(onDropdownFocusSpy).toHaveBeenCalled();
    });

    it("does not call onDropdownFocus prop when the dropdown container div is focused", () => {
      const select = safeQuerySelector(
        calendar,
        ".react-datepicker__header__dropdown",
      );
      fireEvent.focus(select);

      expect(onDropdownFocusSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe("localization", () => {
    function testLocale(
      calendar: HTMLElement,
      selected: Date,
      locale?: Locale,
      calendarStartDay?: Day,
    ) {
      const calendarText = calendar.querySelector(
        ".react-datepicker__current-month",
      );
      expect(calendarText?.textContent).toBe(
        formatDate(selected, dateFormat, locale),
      );
      const firstDateOfWeek = getStartOfWeek(
        selected,
        locale,
        calendarStartDay,
      );
      const firstWeekDayMin = getWeekdayMinInLocale(firstDateOfWeek, locale);
      const firstHeader = calendar.querySelector(
        ".react-datepicker__day-name > span[aria-hidden='true']",
      );
      expect(firstHeader?.textContent).toBe(firstWeekDayMin);
    }

    it("should use the 'en' locale by default", () => {
      const selected = newDate();
      const { calendar } = getCalendar({ selected });
      testLocale(calendar, selected);
    });

    it("should use the default locale when set", () => {
      const selected = newDate();
      setDefaultLocale("fi");

      const { calendar } = getCalendar({ selected });
      testLocale(calendar, selected, "fi");
      setDefaultLocale("");
    });

    it("should use the locale specified as a prop", () => {
      registerLocale("fi", fi);
      const locale = "fi";
      const selected = newDate();
      const { calendar } = getCalendar({ selected, locale });
      testLocale(calendar, selected, locale);
    });

    it("should override the default locale with the locale prop", () => {
      const locale = "en";
      const selected = newDate();
      setDefaultLocale("fi");

      const { calendar } = getCalendar({ selected, locale });
      testLocale(calendar, selected, locale);
      setDefaultLocale("");
    });

    it("should accept a raw date-fns locale object", () => {
      // Note that we explicitly do not call `registerLocale`, because that
      // would create a global variable, which we want to avoid.
      const locale = eo;
      const selected = newDate();

      const { calendar } = getCalendar({ selected, locale });
      testLocale(calendar, selected, locale);

      // Other tests touch this global, so it will always be present, but at the
      // very least we can make sure the test worked without 'eo' being added.
      expect(
        window as unknown as { __localeData__: object }["__localeData__"],
      ).not.toHaveProperty("eo");
    });

    it("should render empty custom header", () => {
      const { calendar } = getCalendar({
        renderCustomHeader: (_props: ReactDatePickerCustomHeaderProps) => <></>,
      });

      const header = calendar.querySelectorAll(
        ".react-datepicker__header--custom",
      );
      expect(header).toHaveLength(1);
    });
  });

  describe("renderInputTimeSection", () => {
    const renderCalendar = (
      props?: Partial<
        Pick<
          CalendarProps,
          "dateFormat" | "onSelect" | "onClickOutside" | "dropdownMode"
        >
      > &
        Omit<
          CalendarProps,
          | "dateFormat"
          | "onSelect"
          | "onClickOutside"
          | "dropdownMode"
          | "showMonthYearDropdown"
          | "showYearDropdown"
          | "showTimeInput"
        >,
    ) =>
      render(
        <Calendar
          dateFormat={dateFormat}
          onSelect={() => {}}
          onClickOutside={() => {}}
          dropdownMode="select"
          showYearDropdown
          showTimeInput
          {...props}
        />,
      );
    const timeInputSelector = ".react-datepicker__input-time-container";

    it("should render InputTime component", () => {
      const { container } = renderCalendar();
      const timeInputClassname = container.querySelectorAll(timeInputSelector);
      expect(timeInputClassname).toHaveLength(1);
    });

    it("should pass empty string to InputTime when no selected date", () => {
      const { container } = renderCalendar();
      const timeInputEl: HTMLInputElement | null = container.querySelector(
        `${timeInputSelector} input`,
      );
      expect(timeInputEl?.value).toBe("");
    });
  });

  describe("renderYearPicker", () => {
    it("should render YearPicker component", () => {
      const { container } = render(
        <Calendar
          dateFormat={dateFormat}
          onSelect={() => {}}
          onClickOutside={() => {}}
          dropdownMode="select"
          showYearPicker
        />,
      );
      const timeInputClassname = container.querySelectorAll(
        ".react-datepicker__year",
      );
      expect(timeInputClassname).toHaveLength(1);
    });

    it("calls increaseYear when next year button clicked", () => {
      let instance: Calendar | null = null;
      const { rerender } = render(
        <Calendar
          ref={(node) => {
            instance = node;
          }}
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          showYearPicker
          dropdownMode="scroll"
        />,
      );
      expect(instance).not.toBeFalsy();
      act(() => {
        (instance!.state as { date: Required<YearProps>["date"] }).date =
          parseDate("09/28/1993", DATE_FORMAT, undefined, false)!;
      });
      rerender(
        <Calendar
          ref={(node) => {
            instance = node;
          }}
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          showYearPicker
          dropdownMode="scroll"
        />,
      );
      const increaseYear = instance!.increaseYear;
      act(() => {
        increaseYear();
      });
      expect(getYear(instance!.state.date)).toBe(2005);
    });

    it("calls decreaseYear when previous year button clicked", () => {
      let instance: Calendar | null = null;
      const { rerender } = render(
        <Calendar
          ref={(node) => {
            instance = node;
          }}
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          showYearPicker
          dropdownMode="scroll"
        />,
      );
      expect(instance).not.toBeFalsy();
      act(() => {
        (instance!.state as { date: Required<YearProps>["date"] }).date =
          parseDate("09/28/1993", DATE_FORMAT, undefined, false)!;
      });
      rerender(
        <Calendar
          ref={(node) => {
            instance = node;
          }}
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          showYearPicker
          dropdownMode="scroll"
        />,
      );
      const decreaseYear = instance!.decreaseYear;
      act(() => {
        decreaseYear();
      });
      expect(getYear(instance!.state.date)).toBe(1981);
    });

    it("calls increaseYear for custom year item number when next year button clicked", () => {
      let instance: Calendar | null = null;
      const { rerender } = render(
        <Calendar
          ref={(node) => {
            instance = node;
          }}
          dateFormat={DATE_FORMAT}
          onClickOutside={() => {}}
          onSelect={() => {}}
          showYearPicker
          yearItemNumber={10}
          dropdownMode="scroll"
        />,
      );
      expect(instance).not.toBeFalsy();
      act(() => {
        (instance!.state as { date: Required<YearProps>["date"] }).date =
          parseDate("09/28/1993", DATE_FORMAT, undefined, true)!;
      });
      rerender(
        <Calendar
          ref={(node) => {
            instance = node;
          }}
          dateFormat={DATE_FORMAT}
          onClickOutside={() => {}}
          onSelect={() => {}}
          showYearPicker
          yearItemNumber={10}
          dropdownMode="scroll"
        />,
      );
      act(() => {
        instance!.increaseYear();
      });
      expect(getYear(instance!.state.date)).toBe(2003);
    });

    it("calls decreaseYear for custom year item number when previous year button clicked", () => {
      let instance: Calendar | null = null;
      const { rerender } = render(
        <Calendar
          ref={(node) => {
            instance = node;
          }}
          onClickOutside={() => {}}
          onSelect={() => {}}
          dateFormat={DATE_FORMAT}
          showYearPicker
          yearItemNumber={10}
          dropdownMode="scroll"
        />,
      );
      expect(instance).not.toBeFalsy();
      act(() => {
        (instance!.state as { date: Required<YearProps>["date"] }).date =
          parseDate("09/28/1993", DATE_FORMAT, undefined, true)!;
      });
      rerender(
        <Calendar
          ref={(node) => {
            instance = node;
          }}
          onClickOutside={() => {}}
          onSelect={() => {}}
          dateFormat={DATE_FORMAT}
          showYearPicker
          yearItemNumber={10}
          dropdownMode="scroll"
        />,
      );
      act(() => {
        instance!.decreaseYear();
      });
      expect(getYear(instance!.state.date)).toBe(1983);
    });
  });

  describe("when showMonthYearPicker is enabled", () => {
    it("should change the next and previous labels", () => {
      const { container } = render(
        <Calendar
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          showMonthYearPicker
          dropdownMode="scroll"
        />,
      );

      const previous = container.querySelector(
        ".react-datepicker__navigation--previous",
      );
      const next = container.querySelector(
        ".react-datepicker__navigation--next",
      );
      expect(previous?.textContent).toBe("Previous Year");
      expect(next?.textContent).toBe("Next Year");
    });

    it("should render custom next and previous labels", () => {
      const { container } = render(
        <Calendar
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          showMonthYearPicker
          previousYearButtonLabel="Custom Previous Year Label"
          nextYearButtonLabel="Custom Next Year Label"
          dropdownMode="scroll"
        />,
      );
      const previous = container.querySelector(
        ".react-datepicker__navigation--previous",
      );
      const next = container.querySelector(
        ".react-datepicker__navigation--next",
      );
      expect(previous?.textContent).toBe("Custom Previous Year Label");
      expect(next?.textContent).toBe("Custom Next Year Label");
    });

    it("calls decreaseYear when previous month button clicked", () => {
      let instance: Calendar | null = null;
      const { rerender } = render(
        <Calendar
          ref={(node) => {
            instance = node;
          }}
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          showMonthYearPicker
          dropdownMode="scroll"
        />,
      );
      expect(instance).not.toBeFalsy();
      act(() => {
        (instance!.state as { date: Required<YearProps>["date"] }).date =
          parseDate("09/28/1993", DATE_FORMAT, undefined, false)!;
      });
      rerender(
        <Calendar
          ref={(node) => {
            instance = node;
          }}
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          showMonthYearPicker
          dropdownMode="scroll"
        />,
      );
      const decreaseYear = instance!.decreaseYear;
      act(() => {
        decreaseYear();
      });
      expect(getYear(instance!.state.date)).toBe(1992);
    });

    it("calls increaseYear when next month button clicked", () => {
      let instance: Calendar | null = null;
      const { rerender } = render(
        <Calendar
          ref={(node) => {
            instance = node;
          }}
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          showMonthYearPicker
          dropdownMode="scroll"
        />,
      );
      expect(instance).not.toBeFalsy();
      act(() => {
        (instance!.state as { date: Required<YearProps>["date"] }).date =
          parseDate("09/28/1993", DATE_FORMAT, undefined, false)!;
      });
      rerender(
        <Calendar
          ref={(node) => {
            instance = node;
          }}
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          showMonthYearPicker
          dropdownMode="scroll"
        />,
      );
      const increaseYear = instance!.increaseYear;
      act(() => {
        increaseYear();
      });
      expect(getYear(instance!.state.date)).toBe(1994);
    });
  });

  describe("when showQuarterYearPicker is enabled", () => {
    it("should change the next and previous labels", () => {
      const { container } = render(
        <Calendar
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          showQuarterYearPicker
          dropdownMode="scroll"
        />,
      );

      const previous = container.querySelector(
        ".react-datepicker__navigation--previous",
      );
      const next = container.querySelector(
        ".react-datepicker__navigation--next",
      );
      expect(previous?.textContent).toBe("Previous Year");
      expect(next?.textContent).toBe("Next Year");
    });

    it("should render custom next and previous labels", () => {
      const { container } = render(
        <Calendar
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          showQuarterYearPicker
          previousYearButtonLabel="Custom Previous Year Label"
          nextYearButtonLabel="Custom Next Year Label"
          dropdownMode="scroll"
        />,
      );
      const previous = container.querySelector(
        ".react-datepicker__navigation--previous",
      );
      const next = container.querySelector(
        ".react-datepicker__navigation--next",
      );
      expect(previous?.textContent).toBe("Custom Previous Year Label");
      expect(next?.textContent).toBe("Custom Next Year Label");
    });

    it("calls decreaseYear when previous month button clicked", () => {
      let instance: Calendar | null = null;
      const { rerender } = render(
        <Calendar
          ref={(node) => {
            instance = node;
          }}
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          showQuarterYearPicker
          dropdownMode="scroll"
        />,
      );
      expect(instance).not.toBeFalsy();
      act(() => {
        (instance!.state as { date: Required<YearProps>["date"] }).date =
          parseDate("09/28/1993", DATE_FORMAT, undefined, false)!;
      });
      rerender(
        <Calendar
          ref={(node) => {
            instance = node;
          }}
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          showQuarterYearPicker
          dropdownMode="scroll"
        />,
      );
      const decreaseYear = instance!.decreaseYear;
      act(() => {
        decreaseYear();
      });
      expect(getYear(instance!.state.date)).toBe(1992);
    });

    it("calls increaseYear when next month button clicked", () => {
      let instance: Calendar | null = null;
      const { rerender } = render(
        <Calendar
          ref={(node) => {
            instance = node;
          }}
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          showQuarterYearPicker
          dropdownMode="scroll"
        />,
      );
      expect(instance).not.toBeFalsy();
      act(() => {
        (instance!.state as { date: Required<YearProps>["date"] }).date =
          parseDate("09/28/1993", DATE_FORMAT, undefined, false)!;
      });
      rerender(
        <Calendar
          ref={(node) => {
            instance = node;
          }}
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          showQuarterYearPicker
          dropdownMode="scroll"
        />,
      );
      const increaseYear = instance!.increaseYear;
      act(() => {
        increaseYear();
      });
      expect(getYear(instance!.state.date)).toBe(1994);
    });

    it("should hide the previous year navigation arrow button when the minDate falls under the currently visible year", () => {
      const { container } = render(
        <Calendar
          dateFormat={DATE_FORMAT}
          showQuarterYearPicker
          minDate={getStartOfMonth(new Date())}
          onClickOutside={() => {}}
          onSelect={() => {}}
          dropdownMode="scroll"
        />,
      );
      const previous = container.querySelector(
        ".react-datepicker__navigation--previous",
      );
      expect(previous).toBeNull();
    });

    it("should hide the next year navigation arrow button when the maxDate falls under the currently visible year", () => {
      const { container } = render(
        <Calendar
          dateFormat={DATE_FORMAT}
          showQuarterYearPicker
          maxDate={endOfYear(new Date())}
          onClickOutside={() => {}}
          onSelect={() => {}}
          dropdownMode="scroll"
        />,
      );

      const next = container.querySelector(
        ".react-datepicker__navigation--next",
      );
      expect(next).toBeNull();
    });
  });

  describe("using click outside", () => {
    const clickOutsideSpy = jest.fn();
    const renderCalendar = () => {
      let instance: Calendar | null = null;
      render(
        <Calendar
          ref={(node) => {
            instance = node;
          }}
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={clickOutsideSpy}
          dropdownMode="scroll"
        />,
      );
      expect(instance).not.toBeFalsy();
      return {
        instance: instance!,
      };
    };

    it("calls onClickOutside prop when handles click outside", () => {
      const { instance } = renderCalendar();
      act(() => {
        instance.handleClickOutside("__event__" as unknown as MouseEvent);
      });

      expect(clickOutsideSpy).toHaveBeenCalledWith("__event__");
    });

    it("setClickOutsideRef function returns container ref", () => {
      const { instance } = renderCalendar();
      const ref = instance.setClickOutsideRef();

      expect(ref).not.toBeNull();
      expect(ref).toEqual(instance.containerRef.current);
    });
  });

  it("should add the aria-label correctly to day names", () => {
    const expectedAriaLabels = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const { container } = render(
      <Calendar
        dateFormat={DATE_FORMAT}
        onSelect={() => {}}
        onClickOutside={() => {}}
        dropdownMode="scroll"
      />,
    );

    const header = container.querySelector(".react-datepicker__header");
    const dayNameElements = header?.querySelectorAll(
      ".react-datepicker__day-name > span.react-datepicker__sr-only",
    );

    dayNameElements?.forEach((element, index) => {
      expect(element.textContent).toBe(expectedAriaLabels[index]);
    });
  });

  it("should have a next-button with the provided aria-label for year", () => {
    const ariaLabel = "A label in my native language for next year";
    const { container } = render(
      <Calendar
        nextYearAriaLabel={ariaLabel}
        dateFormat={DATE_FORMAT}
        onSelect={() => {}}
        onClickOutside={() => {}}
        showQuarterYearPicker
        dropdownMode="scroll"
      />,
    );
    expect(container.innerHTML.indexOf(`aria-label="${ariaLabel}"`)).not.toBe(
      -1,
    );
  });

  it("should have a previous-button with the provided aria-label for year", () => {
    const ariaLabel = "A label in my native language for previous year";
    const { container } = render(
      <Calendar
        previousYearAriaLabel={ariaLabel}
        dateFormat={DATE_FORMAT}
        onSelect={() => {}}
        onClickOutside={() => {}}
        showQuarterYearPicker
        dropdownMode="scroll"
      />,
    );
    expect(container.innerHTML.indexOf(`aria-label="${ariaLabel}"`)).not.toBe(
      -1,
    );
  });

  it("should have a next-button with the provided aria-label for month", () => {
    const ariaLabel = "A label in my native language for next month";
    const { container } = render(
      <Calendar
        nextMonthAriaLabel={ariaLabel}
        dateFormat={DATE_FORMAT}
        onSelect={() => {}}
        onClickOutside={() => {}}
        dropdownMode="scroll"
      />,
    );
    expect(container.innerHTML.indexOf(`aria-label="${ariaLabel}"`)).not.toBe(
      -1,
    );
  });

  it("should have a previous-button with the provided aria-label for month", () => {
    const ariaLabel = "A label in my native language for previous month";
    const { container } = render(
      <Calendar
        previousMonthAriaLabel={ariaLabel}
        dateFormat={DATE_FORMAT}
        onSelect={() => {}}
        onClickOutside={() => {}}
        dropdownMode="scroll"
      />,
    );
    expect(container.innerHTML.indexOf(`aria-label="${ariaLabel}"`)).not.toBe(
      -1,
    );
  });

  describe("changing the month also changes the preselection to preserve keyboard navigation abilities", () => {
    it("updates the preselection when you choose Next Month", () => {
      const selected = new Date();
      selected.setDate(1);
      const currentMonth = selected.getMonth();

      let instance: DatePicker | null = null;
      render(
        <DatePicker
          ref={(node) => {
            instance = node;
          }}
          selected={selected}
        />,
      );
      expect(instance).not.toBeFalsy();
      expect(instance!.input).not.toBeFalsy();
      const dateInput = instance!.input!;
      fireEvent.focus(dateInput);
      const calendar = instance!.calendar?.containerRef.current;
      const navigation = calendar?.querySelector(
        ".react-datepicker__navigation--next",
      );
      expect(navigation).not.toBeFalsy();
      fireEvent.click(navigation!);
      expect(instance!.state.preSelection?.getMonth()).toBe(
        currentMonth === 11 ? 0 : currentMonth + 1,
      );
    });
    it("updates the preselection when you choose Previous Month", () => {
      const selected = new Date();
      selected.setDate(1);
      const currentMonth = selected.getMonth();

      let instance: DatePicker | null = null;
      render(
        <DatePicker
          ref={(node) => {
            instance = node;
          }}
          selected={selected}
        />,
      );
      expect(instance).not.toBeFalsy();
      expect(instance!.input).not.toBeFalsy();
      const dateInput = instance!.input!;
      fireEvent.focus(dateInput);
      const calendar = instance!.calendar?.containerRef.current;
      expect(calendar).not.toBeFalsy();
      const navigation = calendar!.querySelector(
        ".react-datepicker__navigation--previous",
      );
      expect(navigation).not.toBeFalsy();
      fireEvent.click(navigation!);
      expect(instance!.state.preSelection?.getMonth()).toBe(
        currentMonth === 0 ? 11 : currentMonth - 1,
      );
    });

    describe("pre-selection & disabled dates", () => {
      it("should update the pre-selected dates to the first enabled day in a month when the next month is selected", () => {
        const selected = new Date("2024-06-01");
        const excludeDate = addMonths(selected, 1);

        const { container } = render(
          <DatePicker selected={selected} excludeDates={[excludeDate]} />,
        );
        const input = safeQuerySelector<HTMLInputElement>(container, "input");
        fireEvent.focus(input);

        const nextButton = safeQuerySelector<HTMLButtonElement>(
          container,
          ".react-datepicker__navigation--next",
        );
        fireEvent.click(nextButton);

        const preSelectedNewDate = safeQuerySelector(
          container,
          ".react-datepicker__day--keyboard-selected",
        ).textContent;
        const expectedPreSelectedNewDate = addDays(excludeDate, 1);

        expect(Number(preSelectedNewDate)).toBe(
          getDate(expectedPreSelectedNewDate),
        );
      });

      it("should update the pre-selected dates to the first enabled day in a month when the previous month is selected", () => {
        const selected = new Date("2024-06-08");
        const excludeDate = addMonths(selected, 1);

        const { container } = render(
          <DatePicker selected={selected} excludeDates={[excludeDate]} />,
        );
        const input = safeQuerySelector<HTMLInputElement>(container, "input");
        fireEvent.focus(input);

        const nextButton = safeQuerySelector<HTMLButtonElement>(
          container,
          ".react-datepicker__navigation--next",
        );
        fireEvent.click(nextButton);

        const preSelectedNewDate = safeQuerySelector(
          container,
          ".react-datepicker__day--keyboard-selected",
        ).textContent;
        const expectedPreSelectedNewDate = setDate(excludeDate, 1);

        expect(Number(preSelectedNewDate)).toBe(
          getDate(expectedPreSelectedNewDate),
        );
      });

      it("shouldn't set pre-select any date if all dates of a next month is disabled", () => {
        const selected = new Date("2024-06-08");
        const nextMonth = addMonths(selected, 1);
        const excludeDates = eachDayOfInterval({
          start: startOfMonth(nextMonth),
          end: endOfMonth(nextMonth),
        });

        const { container } = render(
          <DatePicker selected={selected} excludeDates={excludeDates} />,
        );
        const input = safeQuerySelector<HTMLInputElement>(container, "input");
        fireEvent.focus(input);

        const nextButton = safeQuerySelector<HTMLButtonElement>(
          container,
          ".react-datepicker__navigation--next",
        );
        fireEvent.click(nextButton);

        expect(
          container.querySelector(".react-datepicker__day--keyboard-selected"),
        ).toBeNull();
      });

      it("shouldn't set pre-select any date if all dates of a last month is disabled", () => {
        const selected = new Date("2024-06-08");
        const lastMonth = subMonths(selected, 1);
        const excludeDates = eachDayOfInterval({
          start: startOfMonth(lastMonth),
          end: endOfMonth(lastMonth),
        });

        const { container } = render(
          <DatePicker selected={selected} excludeDates={excludeDates} />,
        );
        const input = safeQuerySelector<HTMLInputElement>(container, "input");
        fireEvent.focus(input);

        const nextButton = safeQuerySelector<HTMLButtonElement>(
          container,
          ".react-datepicker__navigation--previous",
        );
        fireEvent.click(nextButton);

        expect(
          container.querySelector(".react-datepicker__day--keyboard-selected"),
        ).toBeNull();
      });
    });
  });

  describe("showTimeSelect", () => {
    it("should not contain the time select classname in header by default", () => {
      const { calendar } = getCalendar();
      const header = calendar.querySelectorAll(
        ".react-datepicker__header--has-time-select",
      );
      expect(header).toHaveLength(0);
    });

    it("should contain the time select classname in header if enabled", () => {
      const { calendar } = getCalendar({ showTimeSelect: true });
      const header = calendar.querySelectorAll(
        ".react-datepicker__header--has-time-select",
      );
      expect(header).toHaveLength(1);
    });
  });

  describe("calendarStartDay", () => {
    it("should have default sunday as start day if No prop passed", () => {
      const { calendar } = getCalendar();
      const calendarDays = calendar.querySelectorAll(
        ".react-datepicker__day-name > span[aria-hidden='true']",
      );
      expect(calendarDays[0]?.textContent).toBe("Su");
      expect(calendarDays[6]?.textContent).toBe("Sa");
    });

    it("should have default wednesday as start day if No prop passed", () => {
      const { calendar } = getCalendar({ calendarStartDay: 3 });
      const calendarDays = calendar.querySelectorAll(
        ".react-datepicker__day-name > span[aria-hidden='true']",
      );
      expect(calendarDays[0]?.textContent).toBe("We");
      expect(calendarDays[6]?.textContent).toBe("Tu");
    });
  });

  describe("prev/next month button onKeyDown handler", () => {
    it("should call the prevMonthButton onKeyDown handler on Tab press", () => {
      const onKeyDownSpy = jest.fn();

      const { container } = render(
        <DatePicker
          selected={new Date("February 28, 2018 4:43 PM")}
          onKeyDown={onKeyDownSpy}
        />,
      );
      const input = safeQuerySelector(container, "input");
      fireEvent.focus(input);
      const prevMonthButton = safeQuerySelector(
        container,
        ".react-datepicker__navigation--previous",
      );
      fireEvent.keyDown(prevMonthButton, getKey(KeyType.Tab));
      expect(onKeyDownSpy).toHaveBeenCalledTimes(1);
    });
    it("should call the nextMonthButton onKeyDown handler on Tab press", () => {
      const onKeyDownSpy = jest.fn();

      const { container } = render(
        <DatePicker
          selected={new Date("February 28, 2018 4:43 PM")}
          onKeyDown={onKeyDownSpy}
        />,
      );
      const input = safeQuerySelector(container, "input");
      fireEvent.focus(input);
      const nextMonthButton = safeQuerySelector(
        container,
        ".react-datepicker__navigation--next",
      );
      fireEvent.keyDown(nextMonthButton, getKey(KeyType.Tab));
      expect(onKeyDownSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("renderChildren", () => {
    const renderCalendar = (
      props?: Partial<
        Pick<
          CalendarProps,
          "dateFormat" | "onSelect" | "onClickOutside" | "dropdownMode"
        >
      > &
        Omit<
          CalendarProps,
          | "dateFormat"
          | "onSelect"
          | "onClickOutside"
          | "dropdownMode"
          | "showMonthYearDropdown"
        >,
    ) =>
      render(
        <Calendar
          dateFormat={dateFormat}
          onSelect={() => {}}
          onClickOutside={() => {}}
          dropdownMode="scroll"
          {...props}
        />,
      );
    const childrenContainerSelector = ".react-datepicker__children-container";

    it("should render children components", () => {
      const { container } = renderCalendar({
        children: <div>This is a child component for test.</div>,
      });
      const childrenContainer = container.querySelectorAll(
        childrenContainerSelector,
      );
      expect(childrenContainer).toHaveLength(1);
    });

    it("should not render children components", () => {
      const { container } = renderCalendar();
      const childrenContainer = container.querySelectorAll(
        childrenContainerSelector,
      );
      expect(childrenContainer).toHaveLength(0);
    });
  });

  describe("should render aria live region after month/year change", () => {
    it("should render aria live region after month change", () => {
      const { container } = render(<DatePicker selected={newDate()} />);
      const input = safeQuerySelector(container, "input");
      fireEvent.focus(input);

      const nextNavigationButton = safeQuerySelector(
        container,
        ".react-datepicker__navigation--next",
      );
      fireEvent.click(nextNavigationButton);

      const currentMonthText = container.querySelector(
        ".react-datepicker__current-month",
      )?.textContent;

      const ariaLiveMessage = container.querySelector(
        ".react-datepicker__aria-live",
      )?.textContent;

      expect(currentMonthText).toBe(ariaLiveMessage);
    });

    it("should render aria live region after year change", async () => {
      let instance: DatePicker | null = null;
      render(
        <DatePicker
          ref={(node) => {
            instance = node;
          }}
          showYearDropdown
          selected={newDate()}
        />,
      );

      expect((instance as DatePicker | null)?.input).not.toBeFalsy();
      const dateInput = instance!.input!;

      fireEvent.focus(dateInput);

      expect((instance as DatePicker | null)?.calendar).not.toBeFalsy();
      const calendar = instance!.calendar!.containerRef.current;
      const yearDropdown = calendar?.querySelector(
        ".react-datepicker__year-read-view",
      );
      expect(yearDropdown).not.toBeFalsy();
      fireEvent.click(yearDropdown!);

      const option = calendar?.querySelectorAll(
        ".react-datepicker__year-option",
      )[7];
      expect(option).not.toBeFalsy();
      fireEvent.click(option!);

      const ariaLiveMessage = calendar?.querySelector(
        ".react-datepicker__aria-live",
      )?.textContent;

      await waitFor(() => {
        expect((instance as DatePicker | null)?.calendar).not.toBeFalsy();
        expect(ariaLiveMessage).toBe(
          `${getMonthInLocale(
            getMonth(instance!.calendar!.state.date),
            instance!.props.locale,
          )} ${getYear(instance!.calendar!.state.date)}`,
        );
      });
    });
  });

  describe("calendar container", () => {
    it("should render Calendar with accessibility props", () => {
      const { container } = render(
        <Calendar
          dateFormat={dateFormat}
          onClickOutside={() => {}}
          onSelect={() => {}}
          dropdownMode="scroll"
        />,
      );

      const dialog = container.querySelector(".react-datepicker");
      expect(dialog).not.toBeNull();
      expect(dialog?.getAttribute("role")).toBe("dialog");
      expect(dialog?.getAttribute("aria-modal")).toBe("true");
      expect(dialog?.getAttribute("aria-label")).toBe("Choose Date");
    });

    it("should display corresponding aria-label for Calendar with showTimeSelect", () => {
      const { container } = render(
        <Calendar
          dateFormat={dateFormat}
          showTimeSelect
          onClickOutside={() => {}}
          onSelect={() => {}}
          dropdownMode="scroll"
        />,
      );

      const dialog = container.querySelector(".react-datepicker");
      expect(dialog).not.toBeNull();
      expect(dialog?.getAttribute("aria-label")?.toLowerCase().trim()).toBe(
        "choose date and time",
      );
    });

    it("should display corresponding aria-label for Calendar with showTimeInput", () => {
      const { container } = render(
        <Calendar
          dateFormat={dateFormat}
          showTimeInput
          onClickOutside={() => {}}
          onSelect={() => {}}
          dropdownMode="scroll"
        />,
      );

      const dialog = container.querySelector(".react-datepicker");
      expect(dialog).not.toBeNull();
      expect(dialog?.getAttribute("aria-label")?.toLowerCase().trim()).toBe(
        "choose date and time",
      );
    });

    it("should display corresponding aria-label for Calendar with showTimeSelectOnly", () => {
      const { container } = render(
        <Calendar
          dateFormat={dateFormat}
          showTimeSelectOnly
          onClickOutside={() => {}}
          onSelect={() => {}}
          dropdownMode="scroll"
        />,
      );

      const dialog = container.querySelector(".react-datepicker");
      expect(dialog).not.toBeNull();
      expect(dialog?.getAttribute("aria-label")?.toLowerCase().trim()).toBe(
        "choose time",
      );
    });
  });
});
