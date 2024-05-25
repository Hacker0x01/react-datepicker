import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Month from "../src/month";
import DatePicker from "../src";
import range from "lodash/range";
import * as utils from "../src/date_utils";
import { runAxe } from "./run_axe";
import { getKey } from "./test_utils";
import { es } from "date-fns/locale";

describe("Month", () => {
  function assertDateRangeInclusive(month, start, end) {
    const dayCount = utils.getDaysDiff(end, start) + 1;
    const days = month.container.querySelectorAll(".react-datepicker__day");
    expect(days).toHaveLength(dayCount);
    range(0, dayCount).forEach((offset) => {
      const expectedDay = utils.addDays(start, offset);
      expect(
        utils.isSameDay(days[offset].textContent, expectedDay.toString()),
      ).toBe(true);
    });
  }

  function renderDayContents(_, day) {
    return day.toString();
  }

  it("should apply className returned from passed monthClassName prop function", () => {
    const className = "customClassName";
    const monthClassNameFunc = () => className;
    const { container } = render(
      <Month
        day={utils.newDate()}
        monthClassName={monthClassNameFunc}
        showMonthYearPicker
      />,
    );
    expect(
      container
        .querySelector(".react-datepicker__month-text")
        .classList.contains(className),
    ).toBe(true);
  });

  it("should have the month CSS class", () => {
    const { container } = render(<Month day={utils.newDate()} />);
    expect(container.querySelector(".react-datepicker__month")).not.toBeNull();
  });

  it("should have the month aria-label", () => {
    const date = utils.newDate("2015-12-01");

    const { container } = render(<Month day={date} />);

    const expectedAriaLabel = utils.formatDate(date, "MMMM, yyyy");
    expect(
      container
        .querySelector(".react-datepicker__month")
        .getAttribute("aria-label"),
    ).toContain(expectedAriaLabel);
  });

  it("should display month listbox aria-label in Spanish if Spanish locale is provided", () => {
    utils.registerLocale("es", es);
    const date = utils.newDate("2015-12-01");
    const { container } = render(
      <Month day={date} locale="es" showMonthYearPicker />,
    );
    const expectedAriaLabel = utils.formatDate(date, "MMMM, yyyy", "es");

    expect(
      container
        .querySelector(".react-datepicker__month")
        .getAttribute("aria-label"),
    ).toContain(expectedAriaLabel);
  });

  it("should display month options aria-label in Spanish if Spanish locale is provided", () => {
    utils.registerLocale("es", es);
    const date = utils.newDate("2015-01-01");
    const { container } = render(
      <Month day={date} locale="es" showMonthYearPicker />,
    );
    const expectedAriaLabel = utils.formatDate(date, "MMMM yyyy", "es");

    expect(
      container
        .querySelectorAll(".react-datepicker__month-text")[0]
        .getAttribute("aria-label"),
    ).toContain(expectedAriaLabel);
  });

  it("should have the month aria-label with the specified prefix", () => {
    const date = utils.newDate("2015-12-01");
    const ariaLabelPrefix = "Selected Month";

    const { container } = render(
      <Month day={date} ariaLabelPrefix={ariaLabelPrefix} />,
    );

    const expectedAriaLabel =
      `${ariaLabelPrefix} ${utils.formatDate(date, "MMMM, yyyy")}`.toLowerCase();
    expect(
      container
        .querySelector(".react-datepicker__month")
        .getAttribute("aria-label")
        .toLowerCase(),
    ).toContain(expectedAriaLabel);
  });

  it("should have the month aria-label without any prefix when ariaLabelPrefix is null", () => {
    const date = utils.newDate("2015-12-01");
    const ariaLabelPrefix = null;

    const { container } = render(
      <Month day={date} ariaLabelPrefix={ariaLabelPrefix} />,
    );

    const expectedAriaLabel =
      `${utils.formatDate(date, "MMMM, yyyy")}`.toLowerCase();
    expect(
      container
        .querySelector(".react-datepicker__month")
        .getAttribute("aria-label")
        .toLowerCase(),
    ).toContain(expectedAriaLabel);
  });

  it("should have an aria-label containing the provided prefix", () => {
    const ariaLabelPrefix = "A prefix in my native language";
    const { container } = render(
      <Month ariaLabelPrefix={ariaLabelPrefix} day={utils.newDate()} />,
    );
    expect(
      container
        .querySelector(".react-datepicker__month")
        .getAttribute("aria-label"),
    ).toContain(ariaLabelPrefix);
  });

  it("should render all days of the month and some days in neighboring months", () => {
    const monthStart = utils.newDate("2015-12-01");

    assertDateRangeInclusive(
      render(<Month day={monthStart} renderDayContents={renderDayContents} />),
      utils.getStartOfWeek(monthStart),
      utils.getEndOfWeek(utils.getEndOfMonth(monthStart)),
    );
  });

  it("should render all days of the month and peek into the next month", () => {
    const monthStart = utils.newDate("2015-12-01");

    assertDateRangeInclusive(
      render(
        <Month
          day={monthStart}
          peekNextMonth
          renderDayContents={renderDayContents}
        />,
      ),
      utils.getStartOfWeek(monthStart),
      utils.getEndOfWeek(utils.addWeeks(utils.addMonths(monthStart, 1), 1)),
    );
  });

  it("should render a calendar of fixed height", () => {
    const monthStart = utils.newDate("2016-11-01");
    const calendarStart = utils.getStartOfWeek(monthStart);

    assertDateRangeInclusive(
      render(
        <Month
          day={monthStart}
          fixedHeight
          renderDayContents={renderDayContents}
        />,
      ),
      calendarStart,
      utils.getEndOfWeek(utils.addWeeks(calendarStart, 5)),
    );
  });

  it("should render a calendar of fixed height with peeking", () => {
    const monthStart = utils.newDate("2016-11-01");
    const calendarStart = utils.getStartOfWeek(monthStart);

    assertDateRangeInclusive(
      render(
        <Month
          day={monthStart}
          fixedHeight
          peekNextMonth
          renderDayContents={renderDayContents}
        />,
      ),
      calendarStart,
      utils.getEndOfWeek(utils.addWeeks(calendarStart, 6)),
    );
  });

  it("should call the provided onDayClick function", () => {
    let dayClicked = null;

    function onDayClick(day) {
      dayClicked = day;
    }

    const monthStart = utils.newDate("2015-12-01");
    const { container } = render(
      <Month day={monthStart} onDayClick={onDayClick} />,
    );

    fireEvent.click(
      container.querySelector(
        ".react-datepicker__day:not(.react-datepicker__day--outside-month)",
      ),
    );

    expect(utils.isSameDay(monthStart, dayClicked)).toBe(true);
  });

  it("should call the provided onMouseLeave function", () => {
    let mouseLeaveCalled = false;

    function onMouseLeave() {
      mouseLeaveCalled = true;
    }

    const { container } = render(
      <Month day={utils.newDate()} onMouseLeave={onMouseLeave} />,
    );

    fireEvent.mouseLeave(container.querySelector(".react-datepicker__month"));

    expect(mouseLeaveCalled).toBe(true);
  });

  it("should call the provided onMouseLeave function", () => {
    let mouseLeaveCalled = false;

    function onMouseLeave() {
      mouseLeaveCalled = true;
    }

    const { container } = render(
      <Month
        day={utils.newDate()}
        onMouseLeave={onMouseLeave}
        usePointerEvent
      />,
    );

    fireEvent.pointerLeave(container.querySelector(".react-datepicker__month"));

    expect(mouseLeaveCalled).toBe(true);
  });

  it("should call the provided onDayMouseEnter (Mouse Event) function", () => {
    const onDayMouseEnterSpy = jest.fn();

    const startDay = utils.newDate();

    const { container } = render(
      <Month day={startDay} onDayMouseEnter={onDayMouseEnterSpy} />,
    );

    const day = container.querySelector(".react-datepicker__day");
    fireEvent.mouseEnter(day);

    expect(onDayMouseEnterSpy).toHaveBeenLastCalledWith(
      utils.getStartOfWeek(utils.getStartOfMonth(startDay)),
    );
  });

  it("should call the provided onDayMouseEnter (Pointer Event) function", () => {
    const onDayMouseEnterSpy = jest.fn();

    const startDay = utils.newDate();

    const { container } = render(
      <Month
        day={startDay}
        onDayMouseEnter={onDayMouseEnterSpy}
        usePointerEvent
      />,
    );

    const day = container.querySelector(".react-datepicker__day");
    fireEvent.pointerEnter(day);

    expect(onDayMouseEnterSpy).toHaveBeenLastCalledWith(
      utils.getStartOfWeek(utils.getStartOfMonth(startDay)),
    );
  });

  it("should call the provided onDayMouseEnter (Mouse Event) function", () => {
    const onDayMouseEnterSpy = jest.fn();

    const startDay = utils.newDate("2024-02-02");

    const { container } = render(
      <Month
        day={startDay}
        showMonthYearPicker
        onDayMouseEnter={onDayMouseEnterSpy}
      />,
    );

    const month = container.querySelector(".react-datepicker__month-text");
    fireEvent.mouseEnter(month);

    expect(onDayMouseEnterSpy).toHaveBeenLastCalledWith(
      utils.getStartOfMonth(utils.setMonth(startDay, 0)),
    );
  });

  it("should call the provided onDayMouseEnter (Pointer Event) function", () => {
    const onDayMouseEnterSpy = jest.fn();

    const startDay = utils.newDate("2024-02-02");

    const { container } = render(
      <Month
        day={startDay}
        showMonthYearPicker
        onDayMouseEnter={onDayMouseEnterSpy}
        usePointerEvent
      />,
    );

    const month = container.querySelector(".react-datepicker__month-text");
    fireEvent.pointerEnter(month);

    expect(onDayMouseEnterSpy).toHaveBeenLastCalledWith(
      utils.getStartOfMonth(utils.setMonth(startDay, 0)),
    );
  });

  it("should call the provided onDayMouseEnter (Mouse Event) function", () => {
    const onDayMouseEnterSpy = jest.fn();

    const startDay = utils.newDate("2024-02-02");

    const { container } = render(
      <Month
        day={startDay}
        showQuarterYearPicker
        onDayMouseEnter={onDayMouseEnterSpy}
      />,
    );

    const quarter = container.querySelector(".react-datepicker__quarter-text");
    fireEvent.mouseEnter(quarter);

    expect(onDayMouseEnterSpy).toHaveBeenLastCalledWith(
      utils.getStartOfQuarter(utils.setQuarter(startDay, 1)),
    );
  });

  it("should call the provided onDayMouseEnter (Pointer Event) function", () => {
    const onDayMouseEnterSpy = jest.fn();

    const startDay = utils.newDate("2024-02-02");

    const { container } = render(
      <Month
        day={startDay}
        showQuarterYearPicker
        onDayMouseEnter={onDayMouseEnterSpy}
        usePointerEvent
      />,
    );

    const quarter = container.querySelector(".react-datepicker__quarter-text");
    fireEvent.pointerEnter(quarter);

    expect(onDayMouseEnterSpy).toHaveBeenLastCalledWith(
      utils.getStartOfQuarter(utils.setQuarter(startDay, 1)),
    );
  });

  it("should use its month order in handleDayClick", () => {
    const order = 2;
    let orderValueMatched = false;

    function onDayClick(day, event, monthSelectedIn) {
      orderValueMatched = monthSelectedIn === order;
    }

    const { container } = render(
      <Month
        day={utils.newDate()}
        orderInDisplay={order}
        onDayClick={onDayClick}
      />,
    );

    fireEvent.click(container.querySelector(".react-datepicker__day"));

    expect(orderValueMatched).toBe(true);
  });

  it("should have the month picker CSS class", () => {
    const { container } = render(
      <Month showMonthYearPicker day={utils.newDate()} />,
    );
    expect(
      container
        .querySelector(".react-datepicker__month")
        .classList.contains("react-datepicker__monthPicker"),
    ).toBe(true);
  });

  it("should call the provided onMonthClick function", () => {
    let monthClicked = null;

    function onDayClick(day) {
      monthClicked = day;
    }

    const monthStart = utils.newDate("2015-12-01");
    const { container } = render(
      <Month day={monthStart} showMonthYearPicker onDayClick={onDayClick} />,
    );
    const month = container.querySelectorAll(
      ".react-datepicker__month-text",
    )[6];
    fireEvent.click(month);
    expect(utils.getMonth(monthClicked)).toBe(6);
  });

  it("should return disabled month if current date is out of bound of minDate and maxDate", () => {
    const onDayClickSpy = jest.fn();
    const onDayMouseEnterSpy = jest.fn();
    const { container } = render(
      <Month
        day={utils.newDate("2015-12-01")}
        minDate={utils.newDate("2016-02-01")}
        maxDate={utils.newDate()}
        showMonthYearPicker
        onDayClick={onDayClickSpy}
        onDayMouseEnter={onDayMouseEnterSpy}
      />,
    );
    const month = container.querySelectorAll(
      ".react-datepicker__month-text",
    )[0];
    expect(
      month.classList.contains("react-datepicker__month-text--disabled"),
    ).toBe(true);
    expect(month.getAttribute("aria-disabled")).toBe("true");
    fireEvent.click(month);
    expect(onDayClickSpy).not.toHaveBeenCalled();
    fireEvent.mouseEnter(month);
    expect(onDayMouseEnterSpy).not.toHaveBeenCalled();
  });

  it("should not return disabled month if current date is before minDate but same month", () => {
    const onDayClickSpy = jest.fn();
    const onDayMouseEnterSpy = jest.fn();
    const { container } = render(
      <Month
        day={utils.newDate("2015-01-01")}
        minDate={utils.newDate("2015-01-10")}
        showMonthYearPicker
        onDayClick={onDayClickSpy}
        onDayMouseEnter={onDayMouseEnterSpy}
      />,
    );
    const month = container.querySelectorAll(
      ".react-datepicker__month-text",
    )[0];
    expect(
      month.classList.contains("react-datepicker__month-text--disabled"),
    ).not.toBe(true);
    expect(month.getAttribute("aria-disabled")).not.toBe("true");
    fireEvent.click(month);
    expect(onDayClickSpy).toHaveBeenCalled();
    fireEvent.mouseEnter(month);
    expect(onDayMouseEnterSpy).toHaveBeenCalled();
  });

  it("should not return disabled month if current date is after maxDate but same month", () => {
    const onDayClickSpy = jest.fn();
    const onDayMouseEnterSpy = jest.fn();
    const { container } = render(
      <Month
        day={utils.newDate("2015-01-10")}
        maxDate={utils.newDate("2015-01-01")}
        showMonthYearPicker
        onDayClick={onDayClickSpy}
        onDayMouseEnter={onDayMouseEnterSpy}
      />,
    );
    const month = container.querySelectorAll(
      ".react-datepicker__month-text",
    )[0];
    expect(
      month.classList.contains("react-datepicker__month-text--disabled"),
    ).not.toBe(true);
    expect(month.getAttribute("aria-disabled")).not.toBe("true");
    fireEvent.click(month);
    expect(onDayClickSpy).toHaveBeenCalled();
    fireEvent.mouseEnter(month);
    expect(onDayMouseEnterSpy).toHaveBeenCalled();
  });

  it("should return disabled month if specified excludeDate", () => {
    const onDayClickSpy = jest.fn();
    const onDayMouseEnterSpy = jest.fn();
    const { container } = render(
      <Month
        day={utils.newDate("2015-01-01")}
        excludeDates={[
          utils.newDate("2015-02-01"),
          utils.newDate("2015-04-02"),
          utils.newDate("2015-07-03"),
          utils.newDate("2015-10-04"),
        ]}
        showMonthYearPicker
        onDayClick={onDayClickSpy}
        onDayMouseEnter={onDayMouseEnterSpy}
      />,
    );
    // exclude month index
    const monthTexts = container.querySelectorAll(
      ".react-datepicker__month-text",
    );

    [(1, 3, 6, 9)].forEach((i) => {
      const month = monthTexts[i];
      expect(
        month.classList.contains("react-datepicker__month-text--disabled"),
      ).toBe(true);
      expect(month.getAttribute("aria-disabled")).toBe("true");
      fireEvent.click(month);
      expect(onDayClickSpy).not.toHaveBeenCalled();
      fireEvent.mouseEnter(month);
      expect(onDayMouseEnterSpy).not.toHaveBeenCalled();
    });
  });

  it("should return disabled month if specified includeDate", () => {
    const { container } = render(
      <Month
        day={utils.newDate("2015-01-01")}
        includeDates={[
          utils.newDate("2015-01-01"),
          utils.newDate("2015-02-02"),
          utils.newDate("2015-03-03"),
          utils.newDate("2015-04-04"),
          utils.newDate("2015-05-05"),
          utils.newDate("2015-06-06"),
        ]}
        showMonthYearPicker
      />,
    );
    const monthTexts = container.querySelectorAll(
      ".react-datepicker__month-text",
    );
    for (let i = 0; i < 6; i++) {
      const month = monthTexts[i];
      expect(
        month.classList.contains("react-datepicker__month-text--disabled"),
      ).toBe(false);
    }
    for (let i = 6; i < 12; i++) {
      const month = monthTexts[i];
      expect(
        month.classList.contains("react-datepicker__month-text--disabled"),
      ).toBe(true);
      expect(month.getAttribute("aria-disabled")).toBe("true");
    }
  });

  it("should have no axe violations", () => {
    const { container } = render(
      <Month
        day={utils.newDate("2015-02-01")}
        selected={utils.newDate("2015-02-01")}
        preSelection={utils.newDate("2015-02-03")}
      />,
    );
    return runAxe(container);
  });

  describe("selecting month range", () => {
    it("should add in-selecting-range class if month is between the selecting date and end date", () => {
      const { container } = render(
        <Month
          preSelection={utils.newDate("2015-01-01")}
          day={utils.newDate("2015-01-01")}
          endDate={utils.newDate("2015-03-01")}
          selectingDate={utils.newDate("2015-02-01")}
          selectsStart
          showMonthYearPicker
        />,
      );
      const months = container.querySelectorAll(
        ".react-datepicker__month-text--in-selecting-range",
      );
      expect(months.length).toBe(2);
      expect(months[0].textContent).toBe("Feb");
      expect(months[1].textContent).toBe("Mar");
    });

    it("should add in-selecting-range class if month is between the start date and selecting date", () => {
      const { container } = render(
        <Month
          preSelection={utils.newDate("2015-01-01")}
          day={utils.newDate("2015-01-01")}
          startDate={utils.newDate("2015-02-01")}
          selectingDate={utils.newDate("2015-03-01")}
          selectsEnd
          showMonthYearPicker
        />,
      );
      const months = container.querySelectorAll(
        ".react-datepicker__month-text--in-selecting-range",
      );

      expect(months.length).toBe(2);
      expect(months[0].textContent).toBe("Feb");
      expect(months[1].textContent).toBe("Mar");
    });

    it("should use pre selection date if selecting date is not defined", () => {
      const { container } = render(
        <Month
          preSelection={utils.newDate("2015-03-01")}
          day={utils.newDate("2015-01-01")}
          startDate={utils.newDate("2015-02-01")}
          selectsEnd
          showMonthYearPicker
        />,
      );
      const months = container.querySelectorAll(
        ".react-datepicker__month-text--in-selecting-range",
      );

      expect(months.length).toBe(2);
      expect(months[0].textContent).toBe("Feb");
      expect(months[1].textContent).toBe("Mar");
    });

    it("should add in-selecting-range class for one month picker if month is between the start date and selecting date", () => {
      const { container } = render(
        <Month
          preSelection={utils.newDate("2015-01-01")}
          day={utils.newDate("2015-01-01")}
          startDate={utils.newDate("2015-02-01")}
          selectingDate={utils.newDate("2015-03-01")}
          selectsRange
          showMonthYearPicker
        />,
      );
      const months = container.querySelectorAll(
        ".react-datepicker__month-text--in-selecting-range",
      );

      expect(months.length).toBe(2);
      expect(months[0].textContent).toBe("Feb");
      expect(months[1].textContent).toBe("Mar");
    });

    it("should not add in-selecting-range class for one month picker if the start date is not defined", () => {
      const { container } = render(
        <Month
          preSelection={utils.newDate("2015-01-01")}
          day={utils.newDate("2015-01-01")}
          selectingDate={utils.newDate("2015-03-01")}
          selectsRange
          showMonthYearPicker
        />,
      );
      const months = container.querySelectorAll(
        ".react-datepicker__month-text--in-selecting-range",
      );

      expect(months.length).toBe(0);
    });

    it("should not add in-selecting-range class for one month picker if the end date is defined", () => {
      const { container } = render(
        <Month
          preSelection={utils.newDate("2015-01-01")}
          day={utils.newDate("2015-01-01")}
          selectingDate={utils.newDate("2015-03-01")}
          endDate={utils.newDate("2015-03-01")}
          selectsRange
          showMonthYearPicker
        />,
      );
      const months = container.querySelectorAll(
        ".react-datepicker__month-text--in-selecting-range",
      );

      expect(months.length).toBe(0);
    });

    it("should add 'selecting-range-start' class to the start selecting month", () => {
      const { container } = render(
        <Month
          preSelection={utils.newDate("2015-01-01")}
          day={utils.newDate("2015-01-01")}
          endDate={utils.newDate("2015-03-01")}
          selectingDate={utils.newDate("2015-02-01")}
          selectsStart
          showMonthYearPicker
        />,
      );
      const months = container.querySelectorAll(
        ".react-datepicker__month-text--selecting-range-start",
      );
      expect(months.length).toBe(1);
      expect(months[0].textContent).toBe("Feb");
    });

    it("should add 'selecting-range-end' class to the end selecting month", () => {
      const { container } = render(
        <Month
          preSelection={utils.newDate("2015-01-01")}
          day={utils.newDate("2015-01-01")}
          startDate={utils.newDate("2015-01-01")}
          endDate={utils.newDate("2015-03-01")}
          selectingDate={utils.newDate("2015-06-01")}
          selectsEnd
          showMonthYearPicker
        />,
      );
      const months = container.querySelectorAll(
        ".react-datepicker__month-text--selecting-range-end",
      );
      expect(months.length).toBe(1);
      expect(months[0].textContent).toBe("Jun");
    });
  });

  describe("selecting quarter range", () => {
    it("should add in-selecting-range class if quarter is between the selecting date and end date", () => {
      const { container } = render(
        <Month
          preSelection={utils.newDate("2015-01-01")}
          day={utils.newDate("2015-01-01")}
          endDate={utils.newDate("2015-07-01")}
          selectingDate={utils.newDate("2015-04-01")}
          selectsStart
          showQuarterYearPicker
        />,
      );

      const quarters = container.querySelectorAll(
        ".react-datepicker__quarter-text--in-selecting-range",
      );

      expect(quarters.length).toBe(2);
      expect(quarters[0].textContent).toBe("Q2");
      expect(quarters[1].textContent).toBe("Q3");
    });

    it("should add in-selecting-range class if quarter is between the start date and selecting date", () => {
      const { container } = render(
        <Month
          preSelection={utils.newDate("2015-01-01")}
          day={utils.newDate("2015-01-01")}
          startDate={utils.newDate("2015-04-01")}
          selectingDate={utils.newDate("2015-07-01")}
          selectsEnd
          showQuarterYearPicker
        />,
      );
      const quarters = container.querySelectorAll(
        ".react-datepicker__quarter-text--in-selecting-range",
      );

      expect(quarters.length).toBe(2);
      expect(quarters[0].textContent).toBe("Q2");
      expect(quarters[1].textContent).toBe("Q3");
    });

    it("should use pre selection date if selecting date is not defined", () => {
      const { container } = render(
        <Month
          preSelection={utils.newDate("2015-07-01")}
          day={utils.newDate("2015-01-01")}
          startDate={utils.newDate("2015-04-01")}
          selectsEnd
          showQuarterYearPicker
        />,
      );
      const quarters = container.querySelectorAll(
        ".react-datepicker__quarter-text--in-selecting-range",
      );

      expect(quarters.length).toBe(2);
      expect(quarters[0].textContent).toBe("Q2");
      expect(quarters[1].textContent).toBe("Q3");
    });

    it("should add in-selecting-range class for one quarter picker if quarter is between the start date and selecting date", () => {
      const { container } = render(
        <Month
          preSelection={utils.newDate("2015-01-01")}
          day={utils.newDate("2015-01-01")}
          startDate={utils.newDate("2015-04-01")}
          selectingDate={utils.newDate("2015-07-01")}
          selectsRange
          showQuarterYearPicker
        />,
      );
      const quarters = container.querySelectorAll(
        ".react-datepicker__quarter-text--in-selecting-range",
      );

      expect(quarters.length).toBe(2);
      expect(quarters[0].textContent).toBe("Q2");
      expect(quarters[1].textContent).toBe("Q3");
    });

    it("should not add in-selecting-range class for one quarter picker if the start date is not defined", () => {
      const { container } = render(
        <Month
          preSelection={utils.newDate("2015-01-01")}
          day={utils.newDate("2015-01-01")}
          selectingDate={utils.newDate("2015-04-01")}
          selectsRange
          showQuarterYearPicker
        />,
      );
      const quarters = container.querySelectorAll(
        ".react-datepicker__quarter-text--in-selecting-range",
      );

      expect(quarters.length).toBe(0);
    });

    it("should not add in-selecting-range class for one quarter picker if the end date is defined", () => {
      const { container } = render(
        <Month
          preSelection={utils.newDate("2015-01-01")}
          day={utils.newDate("2015-01-01")}
          selectingDate={utils.newDate("2015-04-01")}
          endDate={utils.newDate("2015-07-01")}
          selectsRange
          showQuarterYearPicker
        />,
      );
      const quarters = container.querySelectorAll(
        ".react-datepicker__quarter-text--in-selecting-range",
      );

      expect(quarters.length).toBe(0);
    });
  });

  describe("if month is selected", () => {
    let monthComponent;
    let month;

    beforeEach(() => {
      monthComponent = render(
        <Month
          day={utils.newDate("2015-02-01")}
          selected={utils.newDate("2015-02-01")}
          preSelection={utils.newDate("2015-03-01")}
          showMonthYearPicker
        />,
      ).container;
      month = monthComponent.querySelectorAll(
        ".react-datepicker__month-text",
      )[1];
    });

    it("should return selected class", () => {
      expect(
        month.classList.contains("react-datepicker__month-text--selected"),
      ).toBe(true);
    });

    it('should set aria-selected attribute to "true"', () => {
      expect(month.getAttribute("aria-selected")).toBe("true");
    });

    it("should have no axe violations", () => runAxe(monthComponent));
  });

  describe("if month is not selected", () => {
    let month;

    beforeEach(() => {
      const monthComponent = render(
        <Month
          day={utils.newDate("2015-02-01")}
          selected={utils.newDate("2015-02-01")}
          showMonthYearPicker
        />,
      ).container;
      month = monthComponent.querySelectorAll(
        ".react-datepicker__month-text",
      )[0];
    });

    it("should not have the selected class", () => {
      expect(
        month.classList.contains("react-datepicker__month-text--selected"),
      ).toBe(false);
    });

    it('should set aria-selected attribute to "false"', () => {
      expect(month.getAttribute("aria-selected")).toBe("false");
    });
  });

  it("should return month-in-range class if month is between the start date and end date", () => {
    const { container } = render(
      <Month
        day={utils.newDate("2015-02-01")}
        startDate={utils.newDate("2015-01-01")}
        endDate={utils.newDate("2015-08-01")}
        showMonthYearPicker
      />,
    );
    const month = container.querySelectorAll(
      ".react-datepicker__month-text",
    )[0];
    expect(
      month.classList.contains("react-datepicker__month-text--in-range"),
    ).toBe(true);
  });

  it("should return month-text--today class if month is current year's month", () => {
    const date = new Date();
    const { container } = render(
      <Month day={date} selected={date} showMonthYearPicker />,
    );
    const month = container.querySelectorAll(
      ".react-datepicker__month-text--today",
    )[0].textContent;
    expect(month).toBe(utils.getMonthShortInLocale(date.getMonth()));
  });

  it("should not return month-text--today class if month is not current year's month", () => {
    const lastYearDate = new Date();
    lastYearDate.setFullYear(lastYearDate.getFullYear() - 1);
    const { container } = render(
      <Month day={lastYearDate} selected={lastYearDate} showMonthYearPicker />,
    );
    const months = container.querySelectorAll(
      ".react-datepicker__month-text--today",
    );
    expect(months).toHaveLength(0);
  });

  it("should include aria-current property if month is current year's month", () => {
    const date = new Date();
    const { container } = render(
      <Month day={date} selected={date} showMonthYearPicker />,
    );
    const ariaCurrent = container
      .querySelector(".react-datepicker__month-text--today")
      .getAttribute("aria-current");
    expect(ariaCurrent).toBe("date");
  });

  it("should not include aria-current property if month is not current year's month", () => {
    const lastYearDate = new Date();
    lastYearDate.setFullYear(lastYearDate.getFullYear() - 1);
    const { container } = render(
      <Month day={lastYearDate} selected={lastYearDate} showMonthYearPicker />,
    );
    const ariaCurrent = container
      .querySelector(".react-datepicker__month-text")
      .getAttribute("aria-current");
    expect(ariaCurrent).toBeNull();
  });

  it("should have the quarter picker CSS class", () => {
    const { container } = render(
      <Month showQuarterYearPicker day={utils.newDate()} />,
    );
    expect(
      container
        .querySelector(".react-datepicker__month")
        .classList.contains("react-datepicker__quarterPicker"),
    ).toBe(true);
  });

  it("should call the provided onQuarterClick function", () => {
    let quarterClicked = null;

    function onDayClick(day) {
      quarterClicked = day;
    }

    const monthStart = utils.newDate("2015-12-01");
    const { container } = render(
      <Month day={monthStart} showQuarterYearPicker onDayClick={onDayClick} />,
    );
    const quarter = container.querySelectorAll(
      ".react-datepicker__quarter-text",
    )[3];
    fireEvent.click(quarter);
    expect(utils.getQuarter(quarterClicked)).toBe(4);
  });

  it("should return disabled class if current date is out of bound of minDate and maxDate", () => {
    const onDayClickSpy = jest.fn();
    const onDayMouseEnterSpy = jest.fn();
    const { container } = render(
      <Month
        day={utils.newDate("2015-12-01")}
        minDate={utils.newDate("2016-02-01")}
        maxDate={utils.newDate()}
        showQuarterYearPicker
        onDayClick={onDayClickSpy}
        onDayMouseEnter={onDayMouseEnterSpy}
      />,
    );
    const quarter = container.querySelectorAll(
      ".react-datepicker__quarter-text",
    )[0];
    expect(
      quarter.classList.contains("react-datepicker__quarter-text--disabled"),
    ).toBe(true);
    fireEvent.click(quarter);
    expect(onDayClickSpy).not.toHaveBeenCalled();
    fireEvent.mouseEnter(quarter);
    expect(onDayMouseEnterSpy).not.toHaveBeenCalled();
  });

  describe("if quarter is selected", () => {
    let monthComponent;
    let quarter;

    beforeEach(() => {
      monthComponent = render(
        <Month
          day={utils.newDate("2015-02-01")}
          selected={utils.newDate("2015-02-01")}
          preSelection={utils.newDate("2015-05-01")}
          showQuarterYearPicker
        />,
      ).container;
      quarter = monthComponent.querySelector(".react-datepicker__quarter-text");
    });

    it("should return selected class", () => {
      expect(
        quarter.classList.contains("react-datepicker__quarter-text--selected"),
      ).toBe(true);
    });

    it('should set aria-selected attribute to "true"', () => {
      expect(quarter.getAttribute("aria-selected")).toBe("true");
    });

    it("should have no axe violations", () => runAxe(monthComponent));
  });

  describe("if quarter is not selected", () => {
    let quarter;

    beforeEach(() => {
      const monthComponent = render(
        <Month
          day={utils.newDate("2015-02-01")}
          selected={utils.newDate("2015-02-01")}
          showQuarterYearPicker
        />,
      ).container;
      quarter = monthComponent.querySelectorAll(
        ".react-datepicker__quarter-text",
      )[1];
    });

    it("should not return selected class", () => {
      expect(
        quarter.classList.contains("react-datepicker__quarter-text--selected"),
      ).toBe(false);
    });

    it('should set aria-selected attribute to "false"', () => {
      expect(quarter.getAttribute("aria-selected")).toBe("false");
    });
  });

  it("should return quarter-in-range class if quarter is between the start date and end date", () => {
    const { container } = render(
      <Month
        day={utils.newDate("2015-02-01")}
        startDate={utils.newDate("2015-01-01")}
        endDate={utils.newDate("2015-08-01")}
        showQuarterYearPicker
      />,
    );
    const quarter = container.querySelectorAll(
      ".react-datepicker__quarter-text",
    )[2];
    expect(
      quarter.classList.contains("react-datepicker__quarter-text--in-range"),
    ).toBe(true);
  });

  it("should enable keyboard focus on the preselected component", () => {
    const { container } = render(
      <Month
        preSelection={utils.newDate("2015-02-01")}
        day={utils.newDate("2015-02-01")}
        startDate={utils.newDate("2015-01-01")}
        endDate={utils.newDate("2015-08-01")}
        showQuarterYearPicker
      />,
    );
    const quarter = container.querySelector(".react-datepicker__quarter-1");
    expect(quarter.tabIndex).toBe(0);
  });

  it("should render full month name", () => {
    const { container } = render(
      <Month
        day={utils.newDate("2015-12-01")}
        showMonthYearPicker
        showFullMonthYearPicker
      />,
    );
    const month = container.querySelector(".react-datepicker__month-1");

    expect(month.textContent).toBe("February");
  });

  it("should render short month name", () => {
    const { container } = render(
      <Month day={utils.newDate("2015-12-01")} showMonthYearPicker />,
    );
    const month = container.querySelector(".react-datepicker__month-1");

    expect(month.textContent).toBe("Feb");
  });

  describe("custom renders", () => {
    it("should render custom month content", () => {
      function renderMonthContent(_, __, ___, day) {
        return <span data-day={day}>custom render</span>;
      }
      const day = utils.newDate();

      const { container } = render(
        <Month
          day={day}
          renderMonthContent={renderMonthContent}
          showMonthYearPicker
        />,
      );
      const month = container.querySelector(".react-datepicker__month-text");
      const span = month.querySelector("span");
      expect(span.textContent).toBe("custom render");
      expect(span.dataset.day).toBe(day.toString());
    });

    it("should render custom quarter content", () => {
      function renderQuarterContent() {
        return <span>custom render</span>;
      }
      const { container } = render(
        <Month
          day={utils.newDate()}
          renderQuarterContent={renderQuarterContent}
          showQuarterYearPicker
        />,
      );
      const quarter = container.querySelector(
        ".react-datepicker__quarter-text",
      );
      expect(quarter.querySelector("span").textContent).toBe("custom render");
    });
  });

  describe("Quarters keyboard navigation", () => {
    const renderQuarters = (props) =>
      render(<Month showQuarterYearPicker {...props} />).container;

    it("should select Q2 when pressing Enter", () => {
      let preSelected = false;
      const setPreSelection = (param) => {
        preSelected = param;
      };

      const quartersComponent = renderQuarters({
        selected: utils.newDate("2015-04-01"),
        day: utils.newDate("2015-04-01"),
        setPreSelection: setPreSelection,
        preSelection: utils.newDate("2015-04-01"),
      });
      fireEvent.keyDown(
        quartersComponent.querySelector(".react-datepicker__quarter-2"),
        getKey("Tab"),
      );

      fireEvent.keyDown(
        quartersComponent.querySelector(".react-datepicker__quarter-2"),
        getKey("Enter"),
      );

      expect(preSelected.toString()).toBe(
        utils.newDate("2015-04-01").toString(),
      );
    });

    it("should trigger setPreSelection and set Q3 as pre-selected on arrowRight", () => {
      let preSelected = false;
      const setPreSelection = (param) => {
        preSelected = param;
      };

      const quartersComponent = renderQuarters({
        selected: utils.newDate("2015-04-01"),
        day: utils.newDate("2015-04-01"),
        setPreSelection: setPreSelection,
        preSelection: utils.newDate("2015-04-01"),
      });
      fireEvent.keyDown(
        quartersComponent.querySelector(".react-datepicker__quarter-2"),
        getKey("Tab"),
      );
      fireEvent.keyDown(
        quartersComponent.querySelector(".react-datepicker__quarter-2"),
        getKey("ArrowRight"),
      );

      expect(preSelected.toString()).toBe(
        utils.newDate("2015-07-01").toString(),
      );
    });

    it("should trigger setPreSelection and set Q1 as pre-selected on arrowLeft", () => {
      let preSelected = false;
      const setPreSelection = (param) => {
        preSelected = param;
      };
      const quartersComponent = renderQuarters({
        selected: utils.newDate("2015-04-01"),
        day: utils.newDate("2015-04-01"),
        setPreSelection: setPreSelection,
        preSelection: utils.newDate("2015-04-01"),
      });
      fireEvent.keyDown(
        quartersComponent.querySelector(".react-datepicker__quarter-2"),
        getKey("Tab"),
      );
      fireEvent.keyDown(
        quartersComponent.querySelector(".react-datepicker__quarter-2"),
        getKey("ArrowLeft"),
      );

      expect(preSelected.toString()).toBe(
        utils.newDate("2015-01-01").toString(),
      );
    });

    describe("if keyboard navigation is disabled", () => {
      it("should not have the selected class", () => {
        let preSelected = utils.newDate("2015-08-01");
        const setPreSelection = (param) => {
          preSelected = param;
        };
        const quartersComponent = renderQuarters({
          selected: utils.newDate("2015-08-01"),
          day: utils.newDate("2015-08-01"),
          setPreSelection: setPreSelection,
          preSelection: preSelected,
          disabledKeyboardNavigation: true,
          showQuarterYearPicker: true,
        });

        expect(
          quartersComponent
            .querySelector(".react-datepicker__quarter-text--selected")
            .classList.contains(
              "react-datepicker__quarter-text--keyboard-selected",
            ),
        ).toBe(false);
      });
    });

    it("should call onKeyDown handler on any key press", () => {
      const onKeyDownSpy = jest.fn();

      const { container } = render(
        <DatePicker
          selected={new Date()}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          onKeyDown={onKeyDownSpy}
        />,
      );

      const dateInput = container.querySelector("input");
      fireEvent.focus(dateInput);

      const month = container.querySelector(".react-datepicker__month-0");

      fireEvent.keyDown(month, {
        key: "ArrowDown",
      });

      expect(onKeyDownSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("Keyboard navigation", () => {
    describe("monthsFourColumns", () => {
      const renderMonth = (props) =>
        render(
          <Month
            showMonthYearPicker
            showFourColumnMonthYearPicker
            {...props}
          />,
        ).container;

      it("should trigger setPreSelection and set March as pre-selected on arrowRight", () => {
        let preSelected = false;
        const setPreSelection = (param) => {
          preSelected = param;
        };

        const monthComponent = renderMonth({
          selected: utils.newDate("2015-02-01"),
          day: utils.newDate("2015-02-01"),
          setPreSelection: setPreSelection,
          preSelection: utils.newDate("2015-02-01"),
        });
        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-1"),
          getKey("Tab"),
        );
        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-1"),
          getKey("ArrowRight"),
        );

        expect(preSelected.toString()).toBe(
          utils.newDate("2015-03-01").toString(),
        );
      });

      it("should trigger setPreSelection and set January as pre-selected on arrowLeft", () => {
        let preSelected = false;
        const setPreSelection = (param) => {
          preSelected = param;
        };
        const monthComponent = renderMonth({
          selected: utils.newDate("2015-02-01"),
          day: utils.newDate("2015-02-01"),
          setPreSelection: setPreSelection,
          preSelection: utils.newDate("2015-02-01"),
        });
        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-1"),
          getKey("ArrowLeft"),
        );

        expect(preSelected.toString()).toBe(
          utils.newDate("2015-01-01").toString(),
        );
      });

      it("should trigger setPreSelection and set April as pre-selected on arrowUp", () => {
        let preSelected = false;
        const setPreSelection = (param) => {
          preSelected = param;
        };

        const monthComponent = renderMonth({
          selected: utils.newDate("2015-08-01"),
          day: utils.newDate("2015-08-01"),
          setPreSelection: setPreSelection,
          preSelection: utils.newDate("2015-08-01"),
        });

        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-7"),
          getKey("ArrowUp"),
        );

        expect(preSelected.toString()).toBe(
          utils.newDate("2015-04-01").toString(),
        );
      });

      it("should trigger setPreSelection and set December as pre-selected on arrowDown", () => {
        let preSelected = false;
        const setPreSelection = (param) => {
          preSelected = param;
        };

        const monthComponent = renderMonth({
          selected: utils.newDate("2015-08-01"),
          day: utils.newDate("2015-08-01"),
          setPreSelection: setPreSelection,
          preSelection: utils.newDate("2015-08-01"),
        });

        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-7"),
          getKey("ArrowDown"),
        );

        expect(preSelected.toString()).toBe(
          utils.newDate("2015-12-01").toString(),
        );
      });

      it("should pre-select January of next year on arrowRight", () => {
        let preSelected = false;
        const setPreSelection = (param) => {
          preSelected = param;
        };

        const monthComponent = renderMonth({
          selected: utils.newDate("2015-12-01"),
          day: utils.newDate("2015-12-01"),
          setPreSelection: setPreSelection,
          preSelection: utils.newDate("2015-12-01"),
        });

        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-11"),
          getKey("ArrowRight"),
        );
        expect(preSelected.toString()).toBe(
          utils.newDate("2016-01-01").toString(),
        );
      });

      it("should pre-select December of previous year on arrowLeft", () => {
        let preSelected = false;
        const setPreSelection = (param) => {
          preSelected = param;
        };

        const monthComponent = renderMonth({
          selected: utils.newDate("2015-01-01"),
          day: utils.newDate("2015-01-01"),
          setPreSelection: setPreSelection,
          preSelection: utils.newDate("2015-01-01"),
        });

        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-0"),
          getKey("ArrowLeft"),
        );
        expect(preSelected.toString()).toBe(
          utils.newDate("2014-12-01").toString(),
        );
      });

      it("should pre-select October of previous year on arrowUp", () => {
        let preSelected = false;
        const setPreSelection = (param) => {
          preSelected = param;
        };

        const monthComponent = renderMonth({
          selected: utils.newDate("2015-02-01"),
          day: utils.newDate("2015-02-01"),
          setPreSelection: setPreSelection,
          preSelection: utils.newDate("2015-02-01"),
        });

        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-1"),
          getKey("ArrowUp"),
        );
        expect(preSelected.toString()).toBe(
          utils.newDate("2014-10-01").toString(),
        );
      });

      it("should pre-select March of next year on arrowDown", () => {
        let preSelected = false;
        const setPreSelection = (param) => {
          preSelected = param;
        };

        const monthComponent = renderMonth({
          selected: utils.newDate("2015-11-01"),
          day: utils.newDate("2015-11-01"),
          setPreSelection: setPreSelection,
          preSelection: utils.newDate("2015-11-01"),
        });

        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-10"),
          getKey("ArrowDown"),
        );
        expect(preSelected.toString()).toBe(
          utils.newDate("2016-03-01").toString(),
        );
      });
    });
    describe("monthsThreeColumns", () => {
      const renderMonth = (props) =>
        render(<Month showMonthYearPicker {...props} />).container;

      it("should trigger setPreSelection and set March as pre-selected on arrowRight", () => {
        let preSelected = false;
        const setPreSelection = (param) => {
          preSelected = param;
        };

        const monthComponent = renderMonth({
          selected: utils.newDate("2015-02-01"),
          day: utils.newDate("2015-02-01"),
          setPreSelection: setPreSelection,
          preSelection: utils.newDate("2015-02-01"),
        });
        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-1"),
          getKey("Tab"),
        );
        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-1"),
          getKey("ArrowRight"),
        );

        expect(preSelected.toString()).toBe(
          utils.newDate("2015-03-01").toString(),
        );
      });

      it("should trigger setPreSelection and set January as pre-selected on arrowLeft", () => {
        let preSelected = false;
        const setPreSelection = (param) => {
          preSelected = param;
        };
        const monthComponent = renderMonth({
          selected: utils.newDate("2015-02-01"),
          day: utils.newDate("2015-02-01"),
          setPreSelection: setPreSelection,
          preSelection: utils.newDate("2015-02-01"),
        });
        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-1"),
          getKey("ArrowLeft"),
        );

        expect(preSelected.toString()).toBe(
          utils.newDate("2015-01-01").toString(),
        );
      });

      it("should trigger setPreSelection and set May as pre-selected on arrowUp", () => {
        let preSelected = false;
        const setPreSelection = (param) => {
          preSelected = param;
        };

        const monthComponent = renderMonth({
          selected: utils.newDate("2015-08-01"),
          day: utils.newDate("2015-08-01"),
          setPreSelection: setPreSelection,
          preSelection: utils.newDate("2015-08-01"),
        });

        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-7"),
          getKey("ArrowUp"),
        );

        expect(preSelected.toString()).toBe(
          utils.newDate("2015-05-01").toString(),
        );
      });

      it("should trigger setPreSelection and set November as pre-selected on arrowDown", () => {
        let preSelected = false;
        const setPreSelection = (param) => {
          preSelected = param;
        };

        const monthComponent = renderMonth({
          selected: utils.newDate("2015-08-01"),
          day: utils.newDate("2015-08-01"),
          setPreSelection: setPreSelection,
          preSelection: utils.newDate("2015-08-01"),
        });

        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-7"),
          getKey("ArrowDown"),
        );

        expect(preSelected.toString()).toBe(
          utils.newDate("2015-11-01").toString(),
        );
      });

      it("should pre-select January of next year on arrowRight", () => {
        let preSelected = false;
        const setPreSelection = (param) => {
          preSelected = param;
        };

        const monthComponent = renderMonth({
          selected: utils.newDate("2015-12-01"),
          day: utils.newDate("2015-12-01"),
          setPreSelection: setPreSelection,
          preSelection: utils.newDate("2015-12-01"),
        });

        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-11"),
          getKey("ArrowRight"),
        );
        expect(preSelected.toString()).toBe(
          utils.newDate("2016-01-01").toString(),
        );
      });

      it("should pre-select December of previous year on arrowLeft", () => {
        let preSelected = false;
        const setPreSelection = (param) => {
          preSelected = param;
        };

        const monthComponent = renderMonth({
          selected: utils.newDate("2015-01-01"),
          day: utils.newDate("2015-01-01"),
          setPreSelection: setPreSelection,
          preSelection: utils.newDate("2015-01-01"),
        });

        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-0"),
          getKey("ArrowLeft"),
        );
        expect(preSelected.toString()).toBe(
          utils.newDate("2014-12-01").toString(),
        );
      });

      it("should pre-select November of previous year on arrowUp", () => {
        let preSelected = false;
        const setPreSelection = (param) => {
          preSelected = param;
        };

        const monthComponent = renderMonth({
          selected: utils.newDate("2015-02-01"),
          day: utils.newDate("2015-02-01"),
          setPreSelection: setPreSelection,
          preSelection: utils.newDate("2015-02-01"),
        });

        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-1"),
          getKey("ArrowUp"),
        );
        expect(preSelected.toString()).toBe(
          utils.newDate("2014-11-01").toString(),
        );
      });

      it("should pre-select March of next year on arrowDown", () => {
        let preSelected = false;
        const setPreSelection = (param) => {
          preSelected = param;
        };

        const monthComponent = renderMonth({
          selected: utils.newDate("2015-11-01"),
          day: utils.newDate("2015-11-01"),
          setPreSelection: setPreSelection,
          preSelection: utils.newDate("2015-11-01"),
        });

        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-10"),
          getKey("ArrowDown"),
        );
        expect(preSelected.toString()).toBe(
          utils.newDate("2016-02-01").toString(),
        );
      });
    });
    describe("monthsTwoColumns", () => {
      const renderMonth = (props) =>
        render(
          <Month showMonthYearPicker showTwoColumnMonthYearPicker {...props} />,
        ).container;

      it("should trigger setPreSelection and set March as pre-selected on arrowRight", () => {
        let preSelected = false;
        const setPreSelection = (param) => {
          preSelected = param;
        };

        const monthComponent = renderMonth({
          selected: utils.newDate("2015-02-01"),
          day: utils.newDate("2015-02-01"),
          setPreSelection: setPreSelection,
          preSelection: utils.newDate("2015-02-01"),
        });
        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-1"),
          getKey("Tab"),
        );
        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-1"),
          getKey("ArrowRight"),
        );

        expect(preSelected.toString()).toBe(
          utils.newDate("2015-03-01").toString(),
        );
      });

      it("should trigger setPreSelection and set January as pre-selected on arrowLeft", () => {
        let preSelected = false;
        const setPreSelection = (param) => {
          preSelected = param;
        };
        const monthComponent = renderMonth({
          selected: utils.newDate("2015-02-01"),
          day: utils.newDate("2015-02-01"),
          setPreSelection: setPreSelection,
          preSelection: utils.newDate("2015-02-01"),
        });
        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-1"),
          getKey("ArrowLeft"),
        );

        expect(preSelected.toString()).toBe(
          utils.newDate("2015-01-01").toString(),
        );
      });

      it("should trigger setPreSelection and set June as pre-selected on arrowUp", () => {
        let preSelected = false;
        const setPreSelection = (param) => {
          preSelected = param;
        };

        const monthComponent = renderMonth({
          selected: utils.newDate("2015-08-01"),
          day: utils.newDate("2015-08-01"),
          setPreSelection: setPreSelection,
          preSelection: utils.newDate("2015-08-01"),
        });

        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-7"),
          getKey("ArrowUp"),
        );

        expect(preSelected.toString()).toBe(
          utils.newDate("2015-06-01").toString(),
        );
      });

      it("should trigger setPreSelection and set October as pre-selected on arrowDown", () => {
        let preSelected = false;
        const setPreSelection = (param) => {
          preSelected = param;
        };

        const monthComponent = renderMonth({
          selected: utils.newDate("2015-08-01"),
          day: utils.newDate("2015-08-01"),
          setPreSelection: setPreSelection,
          preSelection: utils.newDate("2015-08-01"),
        });

        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-7"),
          getKey("ArrowDown"),
        );

        expect(preSelected.toString()).toBe(
          utils.newDate("2015-10-01").toString(),
        );
      });

      it("should pre-select January of next year on arrowRight", () => {
        let preSelected = false;
        const setPreSelection = (param) => {
          preSelected = param;
        };

        const monthComponent = renderMonth({
          selected: utils.newDate("2015-12-01"),
          day: utils.newDate("2015-12-01"),
          setPreSelection: setPreSelection,
          preSelection: utils.newDate("2015-12-01"),
        });

        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-11"),
          getKey("ArrowRight"),
        );
        expect(preSelected.toString()).toBe(
          utils.newDate("2016-01-01").toString(),
        );
      });

      it("should pre-select December of previous year on arrowLeft", () => {
        let preSelected = false;
        const setPreSelection = (param) => {
          preSelected = param;
        };

        const monthComponent = renderMonth({
          selected: utils.newDate("2015-01-01"),
          day: utils.newDate("2015-01-01"),
          setPreSelection: setPreSelection,
          preSelection: utils.newDate("2015-01-01"),
        });

        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-0"),
          getKey("ArrowLeft"),
        );
        expect(preSelected.toString()).toBe(
          utils.newDate("2014-12-01").toString(),
        );
      });

      it("should pre-select November of previous year on arrowUp", () => {
        let preSelected = false;
        const setPreSelection = (param) => {
          preSelected = param;
        };

        const monthComponent = renderMonth({
          selected: utils.newDate("2015-01-01"),
          day: utils.newDate("2015-01-01"),
          setPreSelection: setPreSelection,
          preSelection: utils.newDate("2015-01-01"),
        });

        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-0"),
          getKey("ArrowUp"),
        );
        expect(preSelected.toString()).toBe(
          utils.newDate("2014-11-01").toString(),
        );
      });

      it("should pre-select January of next year on arrowDown", () => {
        let preSelected = false;
        const setPreSelection = (param) => {
          preSelected = param;
        };

        const monthComponent = renderMonth({
          selected: utils.newDate("2015-11-01"),
          day: utils.newDate("2015-11-01"),
          setPreSelection: setPreSelection,
          preSelection: utils.newDate("2015-11-01"),
        });

        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-10"),
          getKey("ArrowDown"),
        );
        expect(preSelected.toString()).toBe(
          utils.newDate("2016-01-01").toString(),
        );
      });
    });

    const renderMonth = (props) =>
      render(<Month showMonthYearPicker {...props} />).container;

    it("should select March when Enter is pressed", () => {
      let preSelected = false;
      let selectedDate = null;
      const setPreSelection = () => {
        preSelected = true;
      };
      const setSelectedDate = (param) => {
        selectedDate = param;
      };

      const monthComponent = renderMonth({
        selected: utils.newDate("2015-02-01"),
        day: utils.newDate("2015-02-01"),
        setPreSelection: setPreSelection,
        preSelection: utils.newDate("2015-02-01"),
        onDayClick: setSelectedDate,
      });

      fireEvent.keyDown(
        monthComponent.querySelector(".react-datepicker__month-1"),
        getKey("ArrowLeft"),
      );
      fireEvent.keyDown(
        monthComponent.querySelector(".react-datepicker__month-2"),
        getKey("Enter"),
      );

      expect(preSelected).toBe(true);
      expect(selectedDate.toString()).toBe(
        utils.newDate("2015-03-01").toString(),
      );
    });

    it("should select March when Space is pressed", () => {
      const SPACE_KEY = " ";
      let preSelected = false;
      let selectedDate = null;
      const setPreSelection = () => {
        preSelected = true;
      };
      const setSelectedDate = (param) => {
        selectedDate = param;
      };

      const monthComponent = renderMonth({
        selected: utils.newDate("2015-02-01"),
        day: utils.newDate("2015-02-01"),
        setPreSelection: setPreSelection,
        preSelection: utils.newDate("2015-02-01"),
        onDayClick: setSelectedDate,
      });

      fireEvent.keyDown(
        monthComponent.querySelector(".react-datepicker__month-1"),
        getKey("ArrowLeft"),
      );
      fireEvent.keyDown(
        monthComponent.querySelector(".react-datepicker__month-2"),
        getKey(SPACE_KEY),
      );

      expect(preSelected).toBe(true);
      expect(selectedDate.toString()).toBe(
        utils.newDate("2015-03-01").toString(),
      );
    });

    it("should prevent navigation to disabled month", () => {
      let preSelected = utils.newDate("2015-08-01");
      const setPreSelection = (param) => {
        preSelected = param;
      };

      const monthComponent = renderMonth({
        selected: utils.newDate("2015-08-01"),
        day: utils.newDate("2015-08-01"),
        setPreSelection: setPreSelection,
        preSelection: preSelected,
        minDate: utils.newDate("2015-03-01"),
        maxDate: utils.newDate("2015-08-01"),
      });

      fireEvent.keyDown(
        monthComponent.querySelector(".react-datepicker__month-7"),
        getKey("ArrowRight"),
      );
      expect(preSelected.toString()).toBe(
        utils.newDate("2015-08-01").toString(),
      );
    });

    it("should prevent selection of disabled month", () => {
      const excludeDates = [utils.newDate("2015-08-01")];
      let selected = utils.newDate("2015-07-01");
      let day = utils.newDate("2015-08-01");

      const monthComponent = renderMonth({
        selected: selected,
        day: day,
        month: 7,
        preSelection: excludeDates[0],
        setPreSelection: () => {},
        excludeDates: excludeDates,
      });

      fireEvent.keyDown(
        monthComponent.querySelector(".react-datepicker__month-7"),
        getKey("Enter"),
      );

      expect(selected).not.toBe(excludeDates[0]);
    });

    it("should prevent navigation", () => {
      let preSelected = utils.newDate("2015-08-01");
      const setPreSelection = (param) => {
        preSelected = param;
      };

      const monthComponent = renderMonth({
        selected: utils.newDate("2015-08-01"),
        day: utils.newDate("2015-08-01"),
        setPreSelection: setPreSelection,
        preSelection: preSelected,
        disabledKeyboardNavigation: true,
      });

      fireEvent.keyDown(
        monthComponent.querySelector(".react-datepicker__month-7"),
        getKey("ArrowRight"),
      );
      expect(preSelected.toString()).toBe(
        utils.newDate("2015-08-01").toString(),
      );
    });

    it("should have label for enabled/disabled month", () => {
      const monthComponent = renderMonth({
        selected: utils.newDate("2015-03-01"),
        day: utils.newDate("2015-03-01"),
        setPreSelection: () => {},
        preSelection: utils.newDate("2015-03-01"),
        minDate: utils.newDate("2015-03-01"),
        maxDate: utils.newDate("2015-08-01"),
      });

      const enabled = monthComponent.querySelector(
        ".react-datepicker__month-4",
      );

      const disabled = monthComponent.querySelector(
        ".react-datepicker__month-0",
      );

      expect(enabled.getAttribute("aria-label")).toBe("Choose May 2015");
      expect(disabled.getAttribute("aria-label")).toBe(
        "Not available January 2015",
      );
    });

    it("should have custom label for month", () => {
      const monthComponent = renderMonth({
        selected: utils.newDate("2015-03-01"),
        day: utils.newDate("2015-03-01"),
        setPreSelection: () => {},
        preSelection: utils.newDate("2015-03-01"),
        minDate: utils.newDate("2015-03-01"),
        maxDate: utils.newDate("2015-08-01"),
        chooseDayAriaLabelPrefix: "Select this",
        disabledDayAriaLabelPrefix: "Can't select this",
      });

      const enabled = monthComponent.querySelector(
        ".react-datepicker__month-4",
      );

      const disabled = monthComponent.querySelector(
        ".react-datepicker__month-0",
      );

      expect(enabled.getAttribute("aria-label")).toBe("Select this May 2015");
      expect(disabled.getAttribute("aria-label")).toBe(
        `Can't select this January 2015`,
      );
    });

    describe("skip over excluded dates", () => {
      it("should skip over excluded date when pressed arrow right", () => {
        const excludeDates = [utils.newDate("2015-08-01")];
        let preSelected = false;
        const setPreSelection = (param) => {
          preSelected = param;
        };
        const selected = utils.newDate("2015-07-01");

        const monthComponent = renderMonth({
          selected,
          day: selected,
          setPreSelection,
          preSelection: selected,
          excludeDates,
        });

        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-6"),
          getKey("ArrowRight"),
        );

        expect(preSelected.toString()).toBe(
          utils.newDate("2015-09-01").toString(),
        );
      });

      it("should skip over excluded date when pressed arrow left", () => {
        const excludeDates = [utils.newDate("2015-08-01")];
        let preSelected = false;
        const setPreSelection = (param) => {
          preSelected = param;
        };
        const selected = utils.newDate("2015-09-01");

        const monthComponent = renderMonth({
          selected,
          day: selected,
          setPreSelection,
          preSelection: selected,
          excludeDates,
        });

        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-8"),
          getKey("ArrowLeft"),
        );

        expect(preSelected.toString()).toBe(
          utils.newDate("2015-07-01").toString(),
        );
      });

      it("should skip over excluded date when pressed arrow up", () => {
        const excludeDates = [utils.newDate("2015-08-01")];
        let preSelected = false;
        const setPreSelection = (param) => {
          preSelected = param;
        };
        const selected = utils.newDate("2015-11-01");

        const monthComponent = renderMonth({
          selected,
          day: selected,
          setPreSelection,
          preSelection: selected,
          excludeDates,
        });

        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-10"),
          getKey("ArrowUp"),
        );

        expect(preSelected.toString()).toBe(
          utils.newDate("2015-05-01").toString(),
        );
      });

      it("should skip over excluded date when pressed arrow down", () => {
        const excludeDates = [utils.newDate("2015-08-01")];
        let preSelected = false;
        const setPreSelection = (param) => {
          preSelected = param;
        };
        const selected = utils.newDate("2015-05-01");

        const monthComponent = renderMonth({
          selected,
          day: selected,
          setPreSelection,
          preSelection: selected,
          excludeDates,
        });

        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-4"),
          getKey("ArrowDown"),
        );

        expect(preSelected.toString()).toBe(
          utils.newDate("2015-11-01").toString(),
        );
      });

      it("should not navigate to any date when all dates are disabled (edge case)", () => {
        const date = utils.newDate("2015-05-01");
        let preSelected = false;
        const setPreSelection = (param) => {
          preSelected = param;
        };

        const monthComponent = renderMonth({
          selected: date,
          day: date,
          setPreSelection,
          preSelection: date,
          minDate: date,
          maxDate: date,
          excludeDates: [date],
        });

        fireEvent.keyDown(
          monthComponent.querySelector(".react-datepicker__month-4"),
          getKey("ArrowDown"),
        );

        expect(preSelected.toString()).toBe(
          utils.newDate("2015-05-01").toString(),
        );
      });
    });

    it("should prevent navigation when cursor is next to minimum date and the left arrow is pressed", () => {
      let preSelected = utils.newDate("2015-03-01");
      const setPreSelection = (param) => {
        preSelected = param;
      };

      const monthComponent = renderMonth({
        selected: preSelected,
        day: utils.newDate("2015-03-01"),
        setPreSelection: setPreSelection,
        preSelection: preSelected,
        minDate: utils.newDate("2015-03-01"),
      });

      fireEvent.keyDown(
        monthComponent.querySelector(".react-datepicker__month-2"),
        getKey("ArrowLeft"),
      );

      expect(preSelected.toString()).toBe(
        utils.newDate("2015-03-01").toString(),
      );
    });

    it("should prevent navigation when cursor is next to maximum date and right arrow is pressed", () => {
      let preSelected = utils.newDate("2015-08-01");
      const setPreSelection = (param) => {
        preSelected = param;
      };

      const monthComponent = renderMonth({
        selected: utils.newDate("2015-08-01"),
        day: utils.newDate("2015-08-01"),
        setPreSelection: setPreSelection,
        preSelection: preSelected,
        minDate: utils.newDate("2015-03-01"),
        maxDate: utils.newDate("2015-08-01"),
      });

      fireEvent.keyDown(
        monthComponent.querySelector(".react-datepicker__month-8"),
        getKey("ArrowRight"),
      );

      expect(preSelected.toString()).toBe(
        utils.newDate("2015-08-01").toString(),
      );
    });
  });

  describe("if keyboard navigation is disabled", () => {
    const renderMonth = (props) =>
      render(<Month showMonthYearPicker {...props} />).container;

    it("should not have the selected class", () => {
      let preSelected = utils.newDate("2015-08-01");
      const setPreSelection = (param) => {
        preSelected = param;
      };

      const monthComponent = renderMonth({
        selected: utils.newDate("2015-08-01"),
        day: utils.newDate("2015-08-01"),
        setPreSelection: setPreSelection,
        preSelection: preSelected,
        disabledKeyboardNavigation: true,
      });

      expect(
        monthComponent
          .querySelector(".react-datepicker__month-text--selected")
          .classList.contains(
            "react-datepicker__month-text--keyboard-selected",
          ),
      ).toBe(false);
    });
  });
});
