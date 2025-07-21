import { render, fireEvent } from "@testing-library/react";
import React from "react";

import {
  addDays,
  addWeeks,
  formatDate,
  getMonth,
  getStartOfWeek,
  getWeek,
  isEqual,
  newDate,
} from "../date_utils";
import Week from "../week";

import { safeQuerySelector } from "./test_utils";

describe("Week", () => {
  it("should have the week CSS class", () => {
    const { container } = render(
      <Week day={newDate()} month={getMonth(newDate())} />,
    );
    expect(container.querySelector(".react-datepicker__week")).not.toBeNull();
  });

  it("should apply className returned from passed weekClassName prop function", () => {
    const className = "customClassNameWeek";
    const monthClassNameFunc = () => className;
    const { container } = render(
      <Week
        day={newDate()}
        month={getMonth(newDate())}
        weekClassName={monthClassNameFunc}
      />,
    );
    expect(
      container
        .querySelector(".react-datepicker__week")
        ?.classList.contains(className),
    ).toBe(true);
  });

  it("should render the days of the week", () => {
    const weekStart = getStartOfWeek(newDate("2015-12-20"));
    const { container } = render(
      <Week day={weekStart} month={getMonth(weekStart)} />,
    );

    const days = container.querySelectorAll(".react-datepicker__day");
    expect(days.length).toBe(7);
    days.forEach((day, offset) => {
      const expectedDay = addDays(weekStart, offset);
      expect(day.getAttribute("aria-label")).toEqual(
        `Choose ${formatDate(expectedDay, "PPPP")}`,
      );
    });

    const weekNumber = container.querySelectorAll(
      ".react-datepicker__week-number",
    );
    expect(weekNumber.length).toBe(0);
  });

  it("should render the week number", () => {
    const weekStart = getStartOfWeek(newDate("2015-12-20"));
    const { container } = render(
      <Week showWeekNumber day={weekStart} month={getMonth(weekStart)} />,
    );

    const days = container.querySelectorAll(".react-datepicker__day");
    expect(days.length).toBe(7);
    days.forEach((day, offset) => {
      const expectedDay = addDays(weekStart, offset);
      expect(day.getAttribute("aria-label")).toEqual(
        `Choose ${formatDate(expectedDay, "PPPP")}`,
      );
    });

    const weekNumber = container.querySelectorAll(
      ".react-datepicker__week-number",
    );
    expect(weekNumber.length).toBe(1);
  });

  it("should call the provided onDayClick function", () => {
    let dayClicked: Date | null = null;

    function onDayClick(day: Date) {
      dayClicked = day;
    }

    const weekStart = newDate("2015-12-20");
    const { container } = render(
      <Week
        day={weekStart}
        onDayClick={onDayClick}
        month={getMonth(weekStart)}
      />,
    );
    const day = container.querySelector(".react-datepicker__day");
    if (day && dayClicked) {
      fireEvent.click(day);
      // eslint-disable-next-line jest/no-conditional-expect
      expect(day.getAttribute("aria-label")).toEqual(
        `Choose ${formatDate(dayClicked, "PPPP")}`,
      );
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(day).not.toBeNull();
    }
  });

  it("should call the provided onWeekSelect function and pass the first day of the week", () => {
    let firstDayReceived: Date | null = null;

    function onWeekClick(newFirstWeekDay: Date) {
      firstDayReceived = newFirstWeekDay;
    }

    const weekStart = newDate("2015-12-20");
    const setOpenSpy = jest.fn();
    const { container } = render(
      <Week
        day={weekStart}
        showWeekNumber
        onWeekSelect={onWeekClick}
        setOpen={setOpenSpy}
        month={getMonth(weekStart)}
      />,
    );

    const weekNumberElement = safeQuerySelector(
      container,
      ".react-datepicker__week-number",
    );
    fireEvent.click(weekNumberElement);
    expect(isEqual(firstDayReceived, weekStart)).toBe(true);
  });

  it("should call the provided onWeekSelect function and call the setopen function", () => {
    const weekStart = newDate("2015-12-20");
    const setOpenSpy = jest.fn();

    const { container } = render(
      <Week
        day={weekStart}
        showWeekNumber
        shouldCloseOnSelect
        onWeekSelect={() => {}}
        setOpen={setOpenSpy}
        month={getMonth(weekStart)}
      />,
    );
    const weekNumberElement = safeQuerySelector(
      container,
      ".react-datepicker__week-number",
    );
    fireEvent.click(weekNumberElement);
    expect(setOpenSpy).toHaveBeenCalledTimes(1);
  });

  it("should call the provided onWeekSelect function and not call the setopen function when 'shouldCloseOnSelect' is false", () => {
    const weekStart = newDate("2015-12-20");
    const setOpenSpy = jest.fn();
    const setOnWeekSelect = jest.fn();

    const { container } = render(
      <Week
        day={weekStart}
        showWeekNumber
        shouldCloseOnSelect={false}
        onWeekSelect={setOnWeekSelect}
        setOpen={setOpenSpy}
        month={getMonth(weekStart)}
      />,
    );

    const weekNumberElement = safeQuerySelector(
      container,
      ".react-datepicker__week-number",
    );
    fireEvent.click(weekNumberElement);

    expect(setOnWeekSelect).toHaveBeenCalledTimes(1);
    expect(setOpenSpy).toHaveBeenCalledTimes(0);
  });

  it("should call the provided onWeekSelect function and pass the week number", () => {
    let weekNumberReceived: number | null = null;

    function onWeekClick(_unused: Date, newWeekNumber: number) {
      weekNumberReceived = newWeekNumber;
    }

    const weekStart = newDate("2015-12-20");
    const realWeekNumber = getWeek(weekStart);
    const { container } = render(
      <Week
        day={weekStart}
        showWeekNumber
        shouldCloseOnSelect={false}
        onWeekSelect={onWeekClick}
        month={getMonth(weekStart)}
      />,
    );

    const weekNumberElement = safeQuerySelector(
      container,
      ".react-datepicker__week-number",
    );
    fireEvent.click(weekNumberElement);
    expect(weekNumberReceived).toBe(realWeekNumber);
  });

  it("should set the week number with the provided formatWeekNumber function", () => {
    let firstDayReceived: Date | null = null;

    function weekNumberFormatter(newFirstWeekDay: Date) {
      firstDayReceived = newFirstWeekDay;
      return 9;
    }

    const weekStart = newDate("2015-12-20");
    const { container } = render(
      <Week
        day={weekStart}
        showWeekNumber
        formatWeekNumber={weekNumberFormatter}
        month={getMonth(weekStart)}
      />,
    );
    const weekNumberElement = container.querySelector(
      ".react-datepicker__week-number",
    );
    expect(weekNumberElement).not.toBeNull();
    expect(isEqual(firstDayReceived, weekStart)).toBe(true);
    expect(weekNumberElement?.getAttribute("aria-label")).toBe("week  9");
  });

  it("should call the provided onDayMouseEnter (Mouse Event) function", () => {
    const onDayMouseEnterSpy = jest.fn();
    const weekStart = newDate();
    const { container } = render(
      <Week
        day={weekStart}
        onDayMouseEnter={onDayMouseEnterSpy}
        month={getMonth(weekStart)}
      />,
    );

    const day = safeQuerySelector(container, ".react-datepicker__day");
    fireEvent.mouseEnter(day);

    expect(onDayMouseEnterSpy).toHaveBeenLastCalledWith(
      getStartOfWeek(weekStart),
    );
  });

  it("should call the provided onDayMouseEnter (Pointer Event) function", () => {
    const onDayMouseEnterSpy = jest.fn();
    const weekStart = newDate();
    const { container } = render(
      <Week
        day={weekStart}
        onDayMouseEnter={onDayMouseEnterSpy}
        usePointerEvent
        month={getMonth(weekStart)}
      />,
    );

    const day = container.querySelector(".react-datepicker__day");
    if (day) {
      fireEvent.pointerEnter(day);
      // eslint-disable-next-line jest/no-conditional-expect
      expect(onDayMouseEnterSpy).toHaveBeenLastCalledWith(
        getStartOfWeek(weekStart),
      );
      // eslint-disable-next-line jest/no-conditional-expect
    } else expect(day).not.toBeNull();
  });

  describe("handleWeekClick", () => {
    it("should call onWeekSelect prop with correct arguments", () => {
      const onWeekSelect = jest.fn();
      const day = new Date("2022-02-01");
      const weekNumber = 5;
      const event = { target: {} } as React.MouseEvent<HTMLDivElement>;
      let instance: Week | null;
      render(
        <Week
          ref={(node) => {
            instance = node;
          }}
          day={day}
          onWeekSelect={onWeekSelect}
          showWeekPicker={false}
          shouldCloseOnSelect={false}
          setOpen={() => {}}
          month={getMonth(day)}
        />,
      );
      instance!.handleWeekClick(day, weekNumber, event);
      expect(onWeekSelect).toHaveBeenCalledWith(day, weekNumber, event);
    });

    it("should call handleDayClick with start of week if showWeekPicker prop is true", () => {
      const day = new Date("2022-02-01");
      const weekNumber = 5;
      const event = { target: {} } as React.MouseEvent<HTMLDivElement>;
      let instance: Week | null;
      render(
        <Week
          ref={(node) => {
            instance = node;
          }}
          day={day}
          onWeekSelect={() => {}}
          showWeekPicker
          shouldCloseOnSelect={false}
          setOpen={() => {}}
          month={getMonth(day)}
        />,
      );
      const handleDayClick = jest.spyOn(instance!, "handleDayClick");
      instance!.handleWeekClick(day, weekNumber, event);
      expect(handleDayClick).toHaveBeenCalledWith(day, event);
    });

    it("should call setOpen prop with false if shouldCloseOnSelect prop is true", () => {
      const setOpen = jest.fn();
      const day = new Date("2022-02-01");
      const weekNumber = 5;
      const event = { target: {} } as React.MouseEvent<HTMLDivElement>;
      let instance: Week | null;
      render(
        <Week
          ref={(node) => {
            instance = node;
          }}
          day={day}
          onWeekSelect={() => {}}
          showWeekPicker={false}
          shouldCloseOnSelect
          setOpen={setOpen}
          month={getMonth(day)}
        />,
      );
      instance!.handleWeekClick(day, weekNumber, event);
      expect(setOpen).toHaveBeenCalledWith(false);
    });
  });

  describe("selected and keyboard-selected", () => {
    it("selected is current week and preselected is also current week", () => {
      const currentWeek = newDate("2023-10-22T13:09:53+02:00");
      const { container } = render(
        <Week
          day={currentWeek}
          selected={currentWeek}
          preSelection={currentWeek}
          month={getMonth(currentWeek)}
        />,
      );
      expect(
        container.querySelector(".react-datepicker__week--selected"),
      ).not.toBeNull();
    });

    it("selected is current week and preselected is not current week", () => {
      const currentWeek = newDate("2023-10-22T13:09:53+02:00");
      const preSelection = addWeeks(currentWeek, 1);
      const { container } = render(
        <Week
          day={currentWeek}
          selected={currentWeek}
          preSelection={preSelection}
          month={getMonth(currentWeek)}
        />,
      );
      expect(
        container.querySelector(".react-datepicker__week--selected"),
      ).not.toBeNull();
    });

    it("selected is not current week and preselect is current week", () => {
      const currentWeek = newDate("2023-10-22T13:09:53+02:00");
      const selected = addWeeks(currentWeek, 1);
      const { container } = render(
        <Week
          day={currentWeek}
          selected={selected}
          preSelection={currentWeek}
          month={getMonth(currentWeek)}
        />,
      );
      expect(
        container.querySelector(".react-datepicker__week--selected"),
      ).toBeNull();
      expect(
        container.querySelector(".react-datepicker__week--keyboard-selected"),
      ).not.toBeNull();
    });

    it("select is not current week and preselect is not current week", () => {
      const currentWeek = newDate("2023-10-22T13:09:53+02:00");
      const selected = addWeeks(currentWeek, 1);
      const { container } = render(
        <Week
          day={currentWeek}
          selected={selected}
          preSelection={selected}
          month={getMonth(currentWeek)}
        />,
      );
      expect(
        container.querySelector(".react-datepicker__week--selected"),
      ).toBeNull();
      expect(
        container.querySelector(".react-datepicker__week--keyboard-selected"),
      ).toBeNull();
    });
  });
  describe("selected and calendarStartDay", () => {
    it("shoud starts the selected day on the Wednesday immediately preceding that day, When the calendarStartDay Props is 3.", () => {
      const calendarStartDay = 3;
      const currentWeek = getStartOfWeek(
        newDate("2024-03-01"),
        undefined,
        calendarStartDay,
      );
      const selected = addWeeks(currentWeek, 0);
      const { container } = render(
        <Week
          day={currentWeek}
          selected={selected}
          preSelection={currentWeek}
          calendarStartDay={calendarStartDay}
          showWeekPicker
          month={getMonth(currentWeek)}
        />,
      );
      const week = container.querySelector(".react-datepicker__week--selected");

      expect(week).not.toBeNull();

      const days = container.querySelectorAll(
        ".react-datepicker__day--selected",
      );

      expect(days).toHaveLength(7);
      // 2024-02-28 to 2024-03-05
      expect(days[0]?.textContent).toBe("28");
      expect(days[1]?.textContent).toBe("29");
      expect(days[2]?.textContent).toBe("1");
      expect(days[3]?.textContent).toBe("2");
      expect(days[4]?.textContent).toBe("3");
      expect(days[5]?.textContent).toBe("4");
      expect(days[6]?.textContent).toBe("5");
    });
  });
});
