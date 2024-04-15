/**
 * @jest-environment jsdom
 */

import React from "react";
import Calendar from "../src/calendar";
import { render, fireEvent, act, waitFor } from "@testing-library/react";
import DatePicker from "../src/index.jsx";
import * as utils from "../src/date_utils";
import { eo } from "date-fns/locale/eo";
import { fi } from "date-fns/locale/fi";
import { endOfYear, isSunday, startOfMonth } from "date-fns";
import { getKey } from "./test_utils";

// TODO Possibly rename
const DATE_FORMAT = "MM/dd/yyyy";

describe("Calendar", () => {
  const dateFormat = "MMMM yyyy";
  utils.registerLocale("fi", fi);

  function getCalendar(extraProps) {
    let instance;
    const { container, rerender } = render(
      <Calendar
        ref={(node) => {
          instance = node;
        }}
        dateFormat={dateFormat}
        onSelect={() => {}}
        onClickOutside={() => {}}
        hideCalendar={() => {}}
        dropdownMode="scroll"
        {...extraProps}
      />,
    );
    const rerenderFunc = (props) => {
      return rerender(
        <Calendar
          ref={(node) => {
            instance = node;
          }}
          dateFormat={dateFormat}
          onSelect={() => {}}
          onClickOutside={() => {}}
          hideCalendar={() => {}}
          dropdownMode="scroll"
          {...extraProps}
          {...props}
        />,
      );
    };
    return {
      calendar: container,
      instance,
      rerender: rerenderFunc,
    };
  }

  it("should start with the current date in view if no date range", () => {
    const now = utils.newDate();
    const { instance } = getCalendar();
    expect(utils.isSameDay(instance.date, now));
  });

  it("should start with the selected date in view if provided", () => {
    const selected = utils.addYears(utils.newDate(), 1);
    const { instance } = getCalendar({ selected });
    expect(utils.isSameDay(instance.date, selected));
  });

  it("should start with the pre-selected date in view if provided", () => {
    const preSelected = utils.addYears(utils.newDate(), 2);
    const selected = utils.addYears(utils.newDate(), 1);
    const { instance } = getCalendar({ preSelected, selected });
    expect(utils.isSameDay(instance.date, selected));
  });

  it("should start with the current date in view if in date range", () => {
    const now = utils.newDate();
    const minDate = utils.subYears(now, 1);
    const maxDate = utils.addYears(now, 1);
    const { instance } = getCalendar({ minDate, maxDate });
    expect(utils.isSameDay(instance.date, now));
  });

  it("should start with the min date in view if after the current date", () => {
    const minDate = utils.addYears(utils.newDate(), 1);
    const { instance } = getCalendar({ minDate });
    expect(utils.isSameDay(instance.date, minDate));
  });

  it("should start with the min include date in view if after the current date", () => {
    const minDate = utils.addYears(utils.newDate(), 1);
    const { instance } = getCalendar({ includeDates: [minDate] });
    expect(utils.isSameDay(instance.date, minDate));
  });

  it("should start with the max date in view if before the current date", () => {
    const maxDate = utils.subYears(utils.newDate(), 1);
    const { instance } = getCalendar({ maxDate });
    expect(utils.isSameDay(instance.date, maxDate));
  });

  it("should start with the max include date in view if before the current date", () => {
    const maxDate = utils.subYears(utils.newDate(), 1);
    const { instance } = getCalendar({ includeDates: [maxDate] });
    expect(utils.isSameDay(instance.date, maxDate));
  });

  it("should start with the open to date in view if given and no selected/min/max dates given", () => {
    const openToDate = utils.parseDate("09/28/1993", DATE_FORMAT);
    const { instance } = getCalendar({ openToDate });
    expect(utils.isSameDay(instance.date, openToDate));
  });

  it("should start with the open to date in view if given and after a min date", () => {
    const openToDate = utils.parseDate("09/28/1993", DATE_FORMAT);
    const minDate = utils.parseDate("01/01/1993", DATE_FORMAT);
    const { instance } = getCalendar({ openToDate, minDate });
    expect(utils.isSameDay(instance.date, openToDate));
  });

  it("should start with the open to date in view if given and before a max date", () => {
    const openToDate = utils.parseDate("09/28/1993", DATE_FORMAT);
    const maxDate = utils.parseDate("12/31/1993", DATE_FORMAT);
    const { instance } = getCalendar({ openToDate, maxDate });
    expect(utils.isSameDay(instance.date, openToDate));
  });

  it("should start with the open to date in view if given and in range of the min/max dates", () => {
    const openToDate = utils.parseDate("09/28/1993", DATE_FORMAT);
    const minDate = utils.parseDate("01/01/1993", DATE_FORMAT);
    const maxDate = utils.parseDate("12/31/1993", DATE_FORMAT);
    const { instance } = getCalendar({ openToDate, minDate, maxDate });
    expect(utils.isSameDay(instance.date, openToDate));
  });

  it("should open on openToDate date rather than selected date when both are specified", () => {
    const openToDate = utils.parseDate("09/28/1993", DATE_FORMAT);
    const selected = utils.parseDate("09/28/1995", DATE_FORMAT);
    const { instance } = getCalendar({ openToDate, selected });
    expect(utils.isSameDay(instance.date, openToDate));
  });

  it("should trigger date change when openToDate prop is set after calcInitialState()", () => {
    let openToDate = utils.parseDate("09/28/1993", DATE_FORMAT);
    const oneMonthFromOpenToDate = utils.parseDate("10/28/1993", DATE_FORMAT);
    const { instance, rerender } = getCalendar({ openToDate });

    expect(utils.isSameDay(instance.date, openToDate));
    rerender({
      openToDate: oneMonthFromOpenToDate,
    });
    expect(utils.isSameDay(instance.date, oneMonthFromOpenToDate));
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
      includeDates: [utils.newDate()],
      forceShowMonthNavigation: true,
    });
    const nextNavigationButton = calendar.querySelectorAll(
      ".react-datepicker__navigation--next",
    );
    expect(nextNavigationButton).toHaveLength(1);
  });

  it("should correctly format weekday using formatWeekDay prop", () => {
    const { calendar } = getCalendar({ formatWeekDay: (day) => day[0] });
    calendar
      .querySelectorAll(".react-datepicker__day-name")
      .forEach((dayName) => expect(dayName.textContent).toHaveLength(1));
  });

  it("should contain the correct class when using the weekDayClassName prop", () => {
    const func = (date) => (isSunday(date) ? "sunday" : undefined);

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
    const selected = utils.newDate("2018-11-19");
    const { calendar, instance, rerender } = getCalendar({
      inline: true,
      monthsShown: 2,
      selected,
    });
    act(() => {
      instance.state.monthSelectedIn = 1;
    });
    rerender();
    const renderedMonths = calendar.querySelectorAll(
      ".react-datepicker__month",
    );
    expect(
      utils.getMonth(renderedMonths[0].getAttribute("aria-label")),
    ).toEqual(10);
  });

  it("should render the months correctly adjusted by monthSelectedIn for showPreviousMonths", () => {
    const selected = utils.newDate("2018-11-19");
    const { calendar, instance, rerender } = getCalendar({
      inline: true,
      monthsShown: 2,
      selected,
      showPreviousMonths: true,
    });
    act(() => {
      instance.state.monthSelectedIn = 1;
    });
    rerender();
    const renderedMonths = calendar.querySelectorAll(
      ".react-datepicker__month",
    );
    expect(
      utils.getMonth(renderedMonths[0].getAttribute("aria-label")),
    ).toEqual(9);
  });

  it("should render the correct default aria labels for next and prev months buttons", () => {
    const { calendar } = getCalendar();
    const previousButtonAriaLabel = calendar
      .querySelector(".react-datepicker__navigation--previous")
      .getAttribute("aria-label");
    const nextButtonAriaLabel = calendar
      .querySelector(".react-datepicker__navigation--next")
      .getAttribute("aria-label");

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
      .getAttribute("aria-label");
    const nextButtonAriaLabel = calendar
      .querySelector(".react-datepicker__navigation--next")
      .getAttribute("aria-label");

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
      .getAttribute("aria-label");
    const nextButtonAriaLabel = calendar
      .querySelector(".react-datepicker__navigation--next")
      .getAttribute("aria-label");

    expect(previousButtonAriaLabel).toBe(previousButtonAriaLabel);
    expect(nextButtonAriaLabel).toBe(nextButtonAriaLabel);
  });

  it("should render the correct default aria labels for next and prev year buttons", () => {
    const { calendar } = getCalendar({ showYearPicker: true });
    const previousButtonAriaLabel = calendar
      .querySelector(".react-datepicker__navigation--previous")
      .getAttribute("aria-label");
    const nextButtonAriaLabel = calendar
      .querySelector(".react-datepicker__navigation--next")
      .getAttribute("aria-label");

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
      .getAttribute("aria-label");
    const nextButtonAriaLabel = calendar
      .querySelector(".react-datepicker__navigation--next")
      .getAttribute("aria-label");

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
      .getAttribute("aria-label");
    const nextButtonAriaLabel = calendar
      .querySelector(".react-datepicker__navigation--next")
      .getAttribute("aria-label");

    expect(previousButtonAriaLabel).toBe(previousYearAriaLabel);
    expect(nextButtonAriaLabel).toBe(nextYearAriaLabel);
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

    const renderCustomHeader = (params) => {
      const {
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      } = params;

      return (
        <div className="custom-header">
          <button
            className="prevMonth"
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
          >
            {"<"}
          </button>

          <select
            value={utils.getYear(date)}
            className="year-select"
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {[2017, 2018, 2019].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            className="month-select"
            value={months[utils.getMonth(date)]}
            onChange={({ target: { value } }) => changeMonth(value)}
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
        monthContainer: null,
        monthDate: expect.any(Date),
        selectingDate: null,
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

      const selected = utils.newDate(instance.state.date);
      const prevMonth = calendar.querySelector(".prevMonth");

      fireEvent.click(prevMonth);

      expect(utils.getMonth(selected)).toBe(
        (utils.getMonth(instance.state.date) + 1) % 12,
      );
    });

    it("should go to next month", () => {
      const { calendar, instance } = getCalendar({
        renderCustomHeader,
      });

      const selected = utils.newDate(instance.state.date);
      const nextMonth = calendar.querySelector(".nextMonth");

      fireEvent.click(nextMonth);

      const newMonth = utils.getMonth(instance.state.date) - 1;

      const resultMonth = newMonth === -1 ? 11 : newMonth;

      expect(utils.getMonth(selected)).toBe(resultMonth);
    });

    it("nextMonthButtonDisabled flag should be true", () => {
      const renderCustomHeader = jest.fn();

      getCalendar({
        renderCustomHeader,
        minDate: utils.subMonths(utils.newDate(), 1),
        maxDate: utils.newDate(),
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
        minDate: utils.newDate(),
        maxDate: utils.addMonths(utils.newDate(), 1),
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

      const monthSelect = calendar.querySelector(".month-select");
      fireEvent.change(monthSelect, { target: { value: 4 } });

      const selected = utils.newDate(instance.state.date);

      expect(utils.getMonth(selected)).toBe(4);
    });

    it("should select 2017 from month select", () => {
      const { calendar, instance } = getCalendar({
        renderCustomHeader,
      });

      const yearSelect = calendar.querySelector(".year-select");

      fireEvent.change(yearSelect, { target: { value: 2017 } });

      const selected = utils.newDate(instance.state.date);

      expect(utils.getYear(selected)).toBe(2017);
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
      const renderMonthDateInCustomHeader = ({ monthDate }) => (
        <div className="customheader-monthdate">{`${monthDate.getFullYear()}-${monthDate.getMonth()}-${monthDate.getDate()}`}</div>
      );
      const { calendar: twoMonthsCalendar } = getCalendar({
        renderCustomHeader: renderMonthDateInCustomHeader,
        monthsShown: 2,
      });

      const firstDate = new Date();
      const secondDate = utils.addMonths(new Date(), 1);
      const firstDateInCustomHeader = twoMonthsCalendar.querySelectorAll(
        ".customheader-monthdate",
      )[0].textContent;
      const secondDateInCustomHeader = twoMonthsCalendar.querySelectorAll(
        ".customheader-monthdate",
      )[1].textContent;

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
        minDate: utils.newDate(),
        maxDate: utils.addMonths(utils.newDate(), 3),
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
        minDate: utils.subMonths(utils.newDate(), 3),
        maxDate: utils.newDate(),
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
        minDate: utils.subMonths(utils.newDate(), 3),
        maxDate: utils.addMonths(utils.newDate(), 3),
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
        minDate: utils.newDate(),
        maxDate: utils.newDate(),
        showDisabledMonthNavigation: true,
        onMonthChange: onMonthChangeSpy,
      });
      const prevNavigationButton = calendar.querySelector(
        ".react-datepicker__navigation--previous",
      );

      const nextNavigationButton = calendar.querySelector(
        ".react-datepicker__navigation--next",
      );

      fireEvent.click(prevNavigationButton);

      expect(onMonthChangeSpy).toHaveBeenCalledTimes(0);

      fireEvent.click(nextNavigationButton);

      expect(onMonthChangeSpy).toHaveBeenCalledTimes(0);
    });

    it("when clicking non-disabled month navigation, should change month", () => {
      const { calendar } = getCalendar({
        selected: utils.newDate(),
        minDate: utils.subMonths(utils.newDate(), 3),
        maxDate: utils.addMonths(utils.newDate(), 3),
        showDisabledMonthNavigation: true,
        onMonthChange: onMonthChangeSpy,
      });
      const prevNavigationButton = calendar.querySelector(
        ".react-datepicker__navigation--previous",
      );

      const nextNavigationButton = calendar.querySelector(
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
      minDate: utils.subYears(utils.newDate(), 1),
      maxDate: utils.addYears(utils.newDate(), 1),
    });
    const monthYearReadView = calendar.querySelectorAll(
      ".react-datepicker__month-year-dropdown-container",
    );
    expect(monthYearReadView).toHaveLength(1);
  });

  it("should show only one month-year dropdown menu if toggled on and multiple month mode on", () => {
    const { calendar } = getCalendar({
      showMonthYearDropdown: true,
      minDate: utils.subYears(utils.newDate(), 1),
      maxDate: utils.addYears(utils.newDate(), 1),
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
    expect(todayButton[0].textContent).toBe("Vandaag");
  });

  it("should set the date when pressing todayButton", () => {
    const { calendar, instance } = getCalendar({ todayButton: "Vandaag" });
    const todayButton = calendar.querySelector(
      ".react-datepicker__today-button",
    );
    fireEvent.click(todayButton);
    expect(utils.isSameDay(instance.state.date, utils.newDate()));
  });

  it("should use a hash for week label if weekLabel is NOT provided", () => {
    const { calendar } = getCalendar({ showWeekNumbers: true });
    const weekLabel = calendar.querySelectorAll(".react-datepicker__day-name");
    expect(weekLabel[0].textContent).toBe("#");
  });

  it("should set custom week label if weekLabel is provided", () => {
    const { calendar } = getCalendar({
      showWeekNumbers: true,
      weekLabel: "Foo",
    });
    const weekLabel = calendar.querySelectorAll(".react-datepicker__day-name");
    expect(weekLabel[0].textContent).toBe("Foo");
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

    const day = container.querySelector(".react-datepicker__day");
    fireEvent.mouseEnter(day);

    expect(onDayMouseEnterSpy).toHaveBeenLastCalledWith(
      utils.getStartOfWeek(utils.getStartOfMonth(utils.newDate())),
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

    const day = container.querySelector(".react-datepicker__day");
    fireEvent.pointerEnter(day);

    expect(onDayMouseEnterSpy).toHaveBeenLastCalledWith(
      utils.getStartOfWeek(utils.getStartOfMonth(utils.newDate())),
    );
  });

  it("should clear the hovered day when the mouse leaves", () => {
    let instance;
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
    act(() => {
      instance.state.selectingDate = utils.newDate();
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
    const month = container.querySelector(".react-datepicker__month");
    expect(
      month.classList.contains("react-datepicker__month--selecting-range"),
    ).toBeTruthy();
    fireEvent.mouseLeave(month);

    expect(
      container
        .querySelector(".react-datepicker__month")
        .classList.contains("react-datepicker__month--selecting-range"),
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
      />,
    ).container;
    const calendarMin = render(
      <Calendar
        locale="en"
        dateFormat={dateFormat}
        onClickOutside={() => {}}
        onSelect={() => {}}
      />,
    ).container;

    const daysNamesShort = calendarShort.querySelectorAll(
      ".react-datepicker__day-name",
    );
    expect(daysNamesShort[0].textContent).toBe("Sun");
    expect(daysNamesShort[6].textContent).toBe("Sat");

    const daysNamesMin = calendarMin.querySelectorAll(
      ".react-datepicker__day-name",
    );
    expect(daysNamesMin[0].textContent).toBe("Su");
    expect(daysNamesMin[6].textContent).toBe("Sa");
  });

  it("should set the date to the selected day of the previous month when previous button clicked", () => {
    let date;
    const expectedDate = "28.06.2017";
    const { container } = render(
      <DatePicker
        selected={utils.newDate("2017-07-28")}
        adjustDateOnChange
        onChange={(d) => {
          date = d;
        }}
      />,
    );
    fireEvent.focus(container.querySelector("input"));
    const previousButton = container.querySelector(
      ".react-datepicker__navigation--previous",
    );
    fireEvent.click(previousButton);

    expect(utils.formatDate(date, "dd.MM.yyyy")).toBe(expectedDate);
  });

  it("should set the date to the selected day of the next when next button clicked", () => {
    let date;
    const expectedDate = "28.08.2017";
    const { container } = render(
      <DatePicker
        selected={utils.newDate("2017-07-28")}
        adjustDateOnChange
        onChange={(d) => {
          date = d;
        }}
      />,
    );
    fireEvent.focus(container.querySelector("input"));
    const nextButton = container.querySelector(
      ".react-datepicker__navigation--next",
    );
    fireEvent.click(nextButton);
    expect(utils.formatDate(date, "dd.MM.yyyy")).toBe(expectedDate);
  });

  it("should set the date to the last possible day of the previous month when previous button clicked", () => {
    let date;
    const expectedDate = "30.11.2017";
    const { container } = render(
      <DatePicker
        selected={utils.newDate("2017-12-31")}
        adjustDateOnChange
        onChange={(d) => {
          date = d;
        }}
      />,
    );
    fireEvent.focus(container.querySelector("input"));
    const previousButton = container.querySelector(
      ".react-datepicker__navigation--previous",
    );
    fireEvent.click(previousButton);
    expect(utils.formatDate(date, "dd.MM.yyyy")).toBe(expectedDate);
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

    const input = container.querySelector("input");

    fireEvent.focus(input);
    expect(onCalendarOpen).toHaveBeenCalled();

    fireEvent.blur(input);
    expect(onCalendarOpen).toHaveBeenCalled();
  });

  describe("onMonthChange", () => {
    let onMonthChangeSpy = jest.fn();
    let calendar;

    beforeEach(() => {
      onMonthChangeSpy = jest.fn();
      calendar = render(
        <Calendar
          dateFormat={dateFormat}
          onSelect={() => {}}
          onClickOutside={() => {}}
          hideCalendar={() => {}}
          dropdownMode="select"
          showYearDropdown
          showMonthDropdown
          forceShowMonthNavigation
          onMonthChange={onMonthChangeSpy}
        />,
      ).container;
    });

    it("calls onMonthChange prop when previous month button clicked", () => {
      const select = calendar.querySelector(
        ".react-datepicker__navigation--previous",
      );
      fireEvent.click(select);

      expect(onMonthChangeSpy).toHaveBeenCalled();
    });

    it("calls onMonthChange prop when next month button clicked", () => {
      const select = calendar.querySelector(
        ".react-datepicker__navigation--next",
      );
      fireEvent.click(select);

      expect(onMonthChangeSpy).toHaveBeenCalled();
    });

    it("calls onMonthChange prop when month changed from month dropdown", () => {
      const select = calendar
        .querySelector(".react-datepicker__month-dropdown-container")
        .querySelector("select");
      fireEvent.change(select);

      expect(onMonthChangeSpy).toHaveBeenCalled();
    });
  });

  describe("onYearChange", () => {
    let onYearChangeSpy = jest.fn();
    let calendar;

    beforeEach(() => {
      onYearChangeSpy = jest.fn();
      calendar = render(
        <Calendar
          dateFormat={dateFormat}
          onSelect={() => {}}
          onClickOutside={() => {}}
          hideCalendar={() => {}}
          dropdownMode="select"
          showYearDropdown
          onYearChange={onYearChangeSpy}
        />,
      ).container;
    });

    it("calls onYearChange prop when year changed from year dropdown", () => {
      const select = calendar
        .querySelector(".react-datepicker__year-dropdown-container")
        .querySelector("select");
      fireEvent.change(select);

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
      let instance;
      const { container } = render(
        <Calendar
          ref={(node) => {
            instance = node;
          }}
          dateFormat={dateFormat}
          onSelect={() => {}}
          onClickOutside={() => {}}
          hideCalendar={() => {}}
          dropdownMode="select"
          showMonthYearDropdown
          minDate={utils.subYears(utils.newDate(), 1)}
          maxDate={utils.addYears(utils.newDate(), 1)}
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
      const select = calendar
        .querySelector(".react-datepicker__month-year-dropdown-container")
        .querySelector("select");
      const option = select.querySelectorAll("option")[3];
      fireEvent.change(select, {
        target: {
          value: option.value,
        },
      });

      expect(onYearChangeSpy).toHaveBeenCalled();
    });

    it("calls onMonthChange prop when selection is changed from month-year dropdown", () => {
      const { calendar } = renderCalendar();
      const select = calendar
        .querySelector(".react-datepicker__month-year-dropdown-container")
        .querySelector("select");
      const option = select.querySelectorAll("option")[3];
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
    let calendar;

    beforeEach(() => {
      onDropdownFocusSpy = jest.fn();
      calendar = render(
        <Calendar
          dateFormat={dateFormat}
          onSelect={() => {}}
          onClickOutside={() => {}}
          hideCalendar={() => {}}
          dropdownMode="select"
          showYearDropdown
          showMonthDropdown
          showMonthYearDropdown
          minDate={utils.subYears(utils.newDate(), 1)}
          maxDate={utils.addYears(utils.newDate(), 1)}
          onDropdownFocus={onDropdownFocusSpy}
        />,
      ).container;
    });

    it("calls onDropdownFocus prop when year select is focused", () => {
      const select = calendar.querySelector(".react-datepicker__year-select");
      fireEvent.focus(select);

      expect(onDropdownFocusSpy).toHaveBeenCalled();
    });

    it("calls onDropdownFocus prop when month select is focused", () => {
      const select = calendar.querySelector(".react-datepicker__month-select");
      fireEvent.focus(select);

      expect(onDropdownFocusSpy).toHaveBeenCalled();
    });

    it("calls onDropdownFocus prop when year-month select is focused", () => {
      const select = calendar.querySelector(
        ".react-datepicker__month-year-select",
      );
      fireEvent.focus(select);

      expect(onDropdownFocusSpy).toHaveBeenCalled();
    });

    it("does not call onDropdownFocus prop when the dropdown container div is focused", () => {
      const select = calendar.querySelector(
        ".react-datepicker__header__dropdown",
      );
      fireEvent.focus(select);

      expect(onDropdownFocusSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe("localization", () => {
    function testLocale(calendar, selected, locale, calendarStartDay) {
      const calendarText = calendar.querySelector(
        ".react-datepicker__current-month",
      );
      expect(calendarText.textContent).toBe(
        utils.formatDate(selected, dateFormat, locale),
      );
      const firstDateOfWeek = utils.getStartOfWeek(
        selected,
        locale,
        calendarStartDay,
      );
      const firstWeekDayMin = utils.getWeekdayMinInLocale(
        firstDateOfWeek,
        locale,
      );
      const firstHeader = calendar.querySelector(".react-datepicker__day-name");
      expect(firstHeader.textContent).toBe(firstWeekDayMin);
    }

    it("should use the 'en' locale by default", () => {
      const selected = utils.newDate();
      const { calendar } = getCalendar({ selected });
      testLocale(calendar, selected);
    });

    it("should use the default locale when set", () => {
      const selected = utils.newDate();
      utils.setDefaultLocale("fi");

      const { calendar } = getCalendar({ selected });
      testLocale(calendar, selected, "fi");
      utils.setDefaultLocale("");
    });

    it("should use the locale specified as a prop", () => {
      utils.registerLocale("fi", fi);
      const locale = "fi";
      const selected = utils.newDate();
      const { calendar } = getCalendar({ selected, locale });
      testLocale(calendar, selected, locale);
    });

    it("should override the default locale with the locale prop", () => {
      const locale = "en";
      const selected = utils.newDate();
      utils.setDefaultLocale("fi");

      const { calendar } = getCalendar({ selected, locale });
      testLocale(calendar, selected, locale);
      utils.setDefaultLocale("");
    });

    it("should accept a raw date-fns locale object", () => {
      // Note that we explicitly do not call `registerLocale`, because that
      // would create a global variable, which we want to avoid.
      const locale = eo;
      const selected = utils.newDate();

      const { calendar } = getCalendar({ selected, locale });
      testLocale(calendar, selected, locale);

      // Other tests touch this global, so it will always be present, but at the
      // very least we can make sure the test worked without 'eo' being added.
      expect(window.__localeData__).not.toHaveProperty("eo");
    });

    it("should render empty custom header", () => {
      const { calendar } = getCalendar({ renderCustomHeader: () => {} });

      const header = calendar.querySelectorAll(
        ".react-datepicker__header--custom",
      );
      expect(header).toHaveLength(1);
    });
  });

  describe("renderInputTimeSection", () => {
    const renderCalendar = (props) =>
      render(
        <Calendar
          dateFormat={dateFormat}
          onSelect={() => {}}
          onClickOutside={() => {}}
          hideCalendar={() => {}}
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
      const timeInputEl = container.querySelector(`${timeInputSelector} input`);
      expect(timeInputEl.value).toBe("");
    });
  });

  describe("renderYearPicker", () => {
    it("should render YearPicker component", () => {
      const { container } = render(
        <Calendar
          dateFormat={dateFormat}
          onSelect={() => {}}
          onClickOutside={() => {}}
          hideCalendar={() => {}}
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
      let instance;
      const { rerender } = render(
        <Calendar
          ref={(node) => {
            instance = node;
          }}
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          showYearPicker
        />,
      );
      act(() => {
        instance.state.date = utils.parseDate("09/28/1993", DATE_FORMAT);
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
        />,
      );
      const increaseYear = instance.increaseYear;
      act(() => {
        increaseYear();
      });
      expect(utils.getYear(instance.state.date)).toBe(2005);
    });

    it("calls decreaseYear when previous year button clicked", () => {
      let instance;
      const { rerender } = render(
        <Calendar
          ref={(node) => {
            instance = node;
          }}
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          showYearPicker
        />,
      );
      act(() => {
        instance.state.date = utils.parseDate("09/28/1993", DATE_FORMAT);
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
        />,
      );
      const decreaseYear = instance.decreaseYear;
      act(() => {
        decreaseYear();
      });
      expect(utils.getYear(instance.state.date)).toBe(1981);
    });

    it("calls increaseYear for custom year item number when next year button clicked", () => {
      let instance;
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
        />,
      );
      act(() => {
        instance.state.date = utils.parseDate("09/28/1993", DATE_FORMAT);
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
        />,
      );
      act(() => {
        instance.increaseYear();
      });
      expect(utils.getYear(instance.state.date)).toBe(2003);
    });

    it("calls decreaseYear for custom year item number when previous year button clicked", () => {
      let instance;
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
        />,
      );
      act(() => {
        instance.state.date = utils.parseDate("09/28/1993", DATE_FORMAT);
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
        />,
      );
      act(() => {
        instance.decreaseYear();
      });
      expect(utils.getYear(instance.state.date)).toBe(1983);
    });
  });

  describe("when showMonthYearPicker is enabled", () => {
    it("should change the next and previous labels", () => {
      const { container } = render(
        <Calendar
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          hideCalendar={() => {}}
          showMonthYearPicker
        />,
      );

      const previous = container.querySelector(
        ".react-datepicker__navigation--previous",
      );
      const next = container.querySelector(
        ".react-datepicker__navigation--next",
      );
      expect(previous.textContent).toBe("Previous Year");
      expect(next.textContent).toBe("Next Year");
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
        />,
      );
      const previous = container.querySelector(
        ".react-datepicker__navigation--previous",
      );
      const next = container.querySelector(
        ".react-datepicker__navigation--next",
      );
      expect(previous.textContent).toBe("Custom Previous Year Label");
      expect(next.textContent).toBe("Custom Next Year Label");
    });

    it("calls decreaseYear when previous month button clicked", () => {
      let instance;
      const { rerender } = render(
        <Calendar
          ref={(node) => {
            instance = node;
          }}
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          showMonthYearPicker
        />,
      );
      act(() => {
        instance.state.date = utils.parseDate("09/28/1993", DATE_FORMAT);
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
        />,
      );
      const decreaseYear = instance.decreaseYear;
      act(() => {
        decreaseYear();
      });
      expect(utils.getYear(instance.state.date)).toBe(1992);
    });

    it("calls increaseYear when next month button clicked", () => {
      let instance;
      const { rerender } = render(
        <Calendar
          ref={(node) => {
            instance = node;
          }}
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          showMonthYearPicker
        />,
      );
      act(() => {
        instance.state.date = utils.parseDate("09/28/1993", DATE_FORMAT);
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
        />,
      );
      const increaseYear = instance.increaseYear;
      act(() => {
        increaseYear();
      });
      expect(utils.getYear(instance.state.date)).toBe(1994);
    });
  });

  describe("when showQuarterYearPicker is enabled", () => {
    it("should change the next and previous labels", () => {
      const { container } = render(
        <Calendar
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          hideCalendar={() => {}}
          showQuarterYearPicker
        />,
      );

      const previous = container.querySelector(
        ".react-datepicker__navigation--previous",
      );
      const next = container.querySelector(
        ".react-datepicker__navigation--next",
      );
      expect(previous.textContent).toBe("Previous Year");
      expect(next.textContent).toBe("Next Year");
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
        />,
      );
      const previous = container.querySelector(
        ".react-datepicker__navigation--previous",
      );
      const next = container.querySelector(
        ".react-datepicker__navigation--next",
      );
      expect(previous.textContent).toBe("Custom Previous Year Label");
      expect(next.textContent).toBe("Custom Next Year Label");
    });

    it("calls decreaseYear when previous month button clicked", () => {
      let instance;
      const { rerender } = render(
        <Calendar
          ref={(node) => {
            instance = node;
          }}
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          showQuarterYearPicker
        />,
      );
      act(() => {
        instance.state.date = utils.parseDate("09/28/1993", DATE_FORMAT);
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
        />,
      );
      const decreaseYear = instance.decreaseYear;
      act(() => {
        decreaseYear();
      });
      expect(utils.getYear(instance.state.date)).toBe(1992);
    });

    it("calls increaseYear when next month button clicked", () => {
      let instance;
      const { rerender } = render(
        <Calendar
          ref={(node) => {
            instance = node;
          }}
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          showQuarterYearPicker
        />,
      );
      act(() => {
        instance.state.date = utils.parseDate("09/28/1993", DATE_FORMAT);
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
        />,
      );
      const increaseYear = instance.increaseYear;
      act(() => {
        increaseYear();
      });
      expect(utils.getYear(instance.state.date)).toBe(1994);
    });

    it("should hide the previous year navigation arrow button when the minDate falls under the currently visible year ", () => {
      const { container } = render(
        <Calendar showQuarterYearPicker minDate={startOfMonth(new Date())} />,
      );
      const previous = container.querySelector(
        ".react-datepicker__navigation--previous",
      );
      expect(previous).toBeNull();
    });

    it("should hide the next year navigation arrow button when the maxDate falls under the currently visible year ", () => {
      const { container } = render(
        <Calendar showQuarterYearPicker maxDate={endOfYear(new Date())} />,
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
      let instance;
      render(
        <Calendar
          ref={(node) => {
            instance = node;
          }}
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={clickOutsideSpy}
        />,
      );
      return {
        instance,
      };
    };

    it("calls onClickOutside prop when handles click outside", () => {
      const { instance } = renderCalendar();
      act(() => {
        instance.handleClickOutside("__event__");
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
      />,
    );

    const header = container.querySelector(".react-datepicker__header");
    const dayNameElements = header.querySelectorAll(
      ".react-datepicker__day-name",
    );

    dayNameElements.forEach((element, index) => {
      expect(element.getAttribute("aria-label")).toBe(
        expectedAriaLabels[index],
      );
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
      />,
    );
    expect(container.innerHTML.indexOf(`aria-label="${ariaLabel}"`)).not.toBe(
      -1,
    );
  });

  describe("changing the month also changes the preselection to preserve keyboard navigation abilities", () => {
    it("updates the preselection when you choose Next Month", () => {
      let selected = new Date();
      selected.setDate(1);
      const currentMonth = selected.getMonth();

      let instance;
      render(
        <DatePicker
          ref={(node) => {
            instance = node;
          }}
          selected={selected}
        />,
      );
      const dateInput = instance.input;
      fireEvent.focus(dateInput);
      fireEvent.click(
        instance.calendar.componentNode.querySelector(
          ".react-datepicker__navigation--next",
        ),
      );
      expect(instance.state.preSelection.getMonth()).toBe(
        currentMonth === 11 ? 0 : currentMonth + 1,
      );
    });
    it("updates the preselection when you choose Previous Month", () => {
      let selected = new Date();
      selected.setDate(1);
      const currentMonth = selected.getMonth();

      let instance;
      render(
        <DatePicker
          ref={(node) => {
            instance = node;
          }}
          selected={selected}
        />,
      );
      const dateInput = instance.input;
      fireEvent.focus(dateInput);
      fireEvent.click(
        instance.calendar.componentNode.querySelector(
          ".react-datepicker__navigation--previous",
        ),
      );
      expect(instance.state.preSelection.getMonth()).toBe(
        currentMonth === 0 ? 11 : currentMonth - 1,
      );
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
        ".react-datepicker__day-name",
      );
      expect(calendarDays[0].textContent).toBe("Su");
      expect(calendarDays[6].textContent).toBe("Sa");
    });

    it("should have default wednesday as start day if No prop passed", () => {
      const { calendar } = getCalendar({ calendarStartDay: 3 });
      const calendarDays = calendar.querySelectorAll(
        ".react-datepicker__day-name",
      );
      expect(calendarDays[0].textContent).toBe("We");
      expect(calendarDays[6].textContent).toBe("Tu");
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
      fireEvent.focus(container.querySelector("input"));
      const prevMonthButton = container.querySelector(
        ".react-datepicker__navigation--previous",
      );
      fireEvent.keyDown(prevMonthButton, getKey("Tab"));
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
      fireEvent.focus(container.querySelector("input"));
      const nextMonthButton = container.querySelector(
        ".react-datepicker__navigation--next",
      );
      fireEvent.keyDown(nextMonthButton, getKey("Tab"));
      expect(onKeyDownSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("renderChildren", () => {
    const renderCalendar = (props) =>
      render(
        <Calendar
          dateFormat={dateFormat}
          onSelect={() => {}}
          onClickOutside={() => {}}
          hideCalendar={() => {}}
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
      const { container } = render(<DatePicker selected={utils.newDate()} />);
      fireEvent.focus(container.querySelector("input"));

      const nextNavigationButton = container.querySelector(
        ".react-datepicker__navigation--next",
      );
      fireEvent.click(nextNavigationButton);

      const currentMonthText = container.querySelector(
        ".react-datepicker__current-month",
      ).textContent;

      const ariaLiveMessage = container.querySelector(
        ".react-datepicker__aria-live",
      ).textContent;

      expect(currentMonthText).toBe(ariaLiveMessage);
    });

    it("should render aria live region after year change", async () => {
      let instance;
      render(
        <DatePicker
          ref={(node) => {
            instance = node;
          }}
          showYearDropdown
          selected={utils.newDate()}
        />,
      );
      const dateInput = instance.input;

      fireEvent.focus(dateInput);

      const calendar = instance.calendar.componentNode;
      const yearDropdown = calendar.querySelector(
        ".react-datepicker__year-read-view",
      );
      fireEvent.click(yearDropdown);

      const option = calendar.querySelectorAll(
        ".react-datepicker__year-option",
      )[7];
      fireEvent.click(option);

      const ariaLiveMessage = calendar.querySelector(
        ".react-datepicker__aria-live",
      ).textContent;

      await waitFor(() => {
        expect(ariaLiveMessage).toBe(
          `${utils.getMonthInLocale(
            utils.getMonth(instance.calendar.getInstance().state.date),
            instance.props.locale,
          )} ${utils.getYear(instance.calendar.getInstance().state.date)}`,
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
        />,
      );

      const dialog = container.querySelector(".react-datepicker");
      expect(dialog).not.toBeNull();
      expect(dialog.getAttribute("role")).toBe("dialog");
      expect(dialog.getAttribute("aria-modal")).toBe("true");
      expect(dialog.getAttribute("aria-label")).toBe("Choose Date");
    });

    it("should display corresponding aria-label for Calendar with showTimeSelect", () => {
      const { container } = render(
        <Calendar dateFormat={dateFormat} showTimeSelect />,
      );

      const dialog = container.querySelector(".react-datepicker");
      expect(dialog).not.toBeNull();
      expect(dialog.getAttribute("aria-label").toLowerCase().trim()).toBe(
        "choose date and time",
      );
    });

    it("should display corresponding aria-label for Calendar with showTimeInput", () => {
      const { container } = render(
        <Calendar dateFormat={dateFormat} showTimeInput />,
      );

      const dialog = container.querySelector(".react-datepicker");
      expect(dialog).not.toBeNull();
      expect(dialog.getAttribute("aria-label").toLowerCase().trim()).toBe(
        "choose date and time",
      );
    });

    it("should display corresponding aria-label for Calendar with showTimeSelectOnly", () => {
      const { container } = render(
        <Calendar dateFormat={dateFormat} showTimeSelectOnly />,
      );

      const dialog = container.querySelector(".react-datepicker");
      expect(dialog).not.toBeNull();
      expect(dialog.getAttribute("aria-label").toLowerCase().trim()).toBe(
        "choose time",
      );
    });
  });
});
