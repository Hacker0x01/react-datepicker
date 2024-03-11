import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Week from "../src/week";
import * as utils from "../src/date_utils";

describe("Week", () => {
  it("should have the week CSS class", () => {
    const { container } = render(<Week day={utils.newDate()} />);
    expect(container.querySelector(".react-datepicker__week")).not.toBeNull();
  });

  it("should render the days of the week", () => {
    const weekStart = utils.getStartOfWeek(utils.newDate("2015-12-20"));
    const { container } = render(<Week day={weekStart} />);

    const days = container.querySelectorAll(".react-datepicker__day");
    expect(days.length).toBe(7);
    days.forEach((day, offset) => {
      const expectedDay = utils.addDays(weekStart, offset);
      expect(day.getAttribute("aria-label")).toEqual(
        `Choose ${utils.formatDate(expectedDay, "PPPP")}`,
      );
    });

    const weekNumber = container.querySelectorAll(
      ".react-datepicker__week-number",
    );
    expect(weekNumber.length).toBe(0);
  });

  it("should render the week number", () => {
    const weekStart = utils.getStartOfWeek(utils.newDate("2015-12-20"));
    const { container } = render(<Week showWeekNumber day={weekStart} />);

    const days = container.querySelectorAll(".react-datepicker__day");
    expect(days.length).toBe(7);
    days.forEach((day, offset) => {
      const expectedDay = utils.addDays(weekStart, offset);
      expect(day.getAttribute("aria-label")).toEqual(
        `Choose ${utils.formatDate(expectedDay, "PPPP")}`,
      );
    });

    const weekNumber = container.querySelectorAll(
      ".react-datepicker__week-number",
    );
    expect(weekNumber.length).toBe(1);
  });

  it("should call the provided onDayClick function", () => {
    let dayClicked = null;

    function onDayClick(day) {
      dayClicked = day;
    }

    const weekStart = utils.newDate("2015-12-20");
    const { container } = render(
      <Week day={weekStart} onDayClick={onDayClick} />,
    );
    const day = container.querySelector(".react-datepicker__day");
    fireEvent.click(day);
    expect(day.getAttribute("aria-label")).toEqual(
      `Choose ${utils.formatDate(dayClicked, "PPPP")}`,
    );
  });

  it("should call the provided onWeekSelect function and pass the first day of the week", () => {
    let firstDayReceived = null;

    function onWeekClick(newFirstWeekDay) {
      firstDayReceived = newFirstWeekDay;
    }

    const weekStart = utils.newDate("2015-12-20");
    const setOpenSpy = jest.fn();
    const { container } = render(
      <Week
        day={weekStart}
        showWeekNumber
        onWeekSelect={onWeekClick}
        setOpen={setOpenSpy}
      />,
    );
    const weekNumberElement = container.querySelector(
      ".react-datepicker__week-number",
    );
    fireEvent.click(weekNumberElement);
    expect(utils.isEqual(firstDayReceived, weekStart)).toBe(true);
  });

  it("should call the provided onWeekSelect function and call the setopen function", () => {
    const weekStart = utils.newDate("2015-12-20");
    const setOpenSpy = jest.fn();

    const { container } = render(
      <Week
        day={weekStart}
        showWeekNumber
        shouldCloseOnSelect
        onWeekSelect={() => {}}
        setOpen={setOpenSpy}
      />,
    );
    const weekNumberElement = container.querySelector(
      ".react-datepicker__week-number",
    );
    fireEvent.click(weekNumberElement);
    expect(setOpenSpy).toHaveBeenCalledTimes(1);
  });

  it("should call the provided onWeekSelect function and not call the setopen function when 'shouldCloseOnSelect' is false", () => {
    const weekStart = utils.newDate("2015-12-20");
    const setOpenSpy = jest.fn();
    const setOnWeekSelect = jest.fn();

    const { container } = render(
      <Week
        day={weekStart}
        showWeekNumber
        shouldCloseOnSelect={false}
        onWeekSelect={setOnWeekSelect}
        setOpen={setOpenSpy}
      />,
    );

    const weekNumberElement = container.querySelector(
      ".react-datepicker__week-number",
    );
    fireEvent.click(weekNumberElement);
    expect(setOnWeekSelect).toHaveBeenCalledTimes(1);
    expect(setOpenSpy).toHaveBeenCalledTimes(0);
  });

  it("should call the provided onWeekSelect function and pass the week number", () => {
    let weekNumberReceived = null;

    function onWeekClick(unused, newWeekNumber) {
      weekNumberReceived = newWeekNumber;
    }

    const weekStart = utils.newDate("2015-12-20");
    const realWeekNumber = utils.getWeek(weekStart);
    const { container } = render(
      <Week
        day={weekStart}
        showWeekNumber
        shouldCloseOnSelect={false}
        onWeekSelect={onWeekClick}
      />,
    );
    const weekNumberElement = container.querySelector(
      ".react-datepicker__week-number",
    );
    fireEvent.click(weekNumberElement);
    expect(weekNumberReceived).toBe(realWeekNumber);
  });

  it("should set the week number with the provided formatWeekNumber function", () => {
    let firstDayReceived = null;

    function weekNumberFormatter(newFirstWeekDay) {
      firstDayReceived = newFirstWeekDay;
      return 9;
    }

    const weekStart = utils.newDate("2015-12-20");
    const { container } = render(
      <Week
        day={weekStart}
        showWeekNumber
        formatWeekNumber={weekNumberFormatter}
      />,
    );
    const weekNumberElement = container.querySelector(
      ".react-datepicker__week-number",
    );

    expect(utils.isEqual(firstDayReceived, weekStart)).toBe(true);
    expect(weekNumberElement.getAttribute("aria-label")).toBe("week  9");
  });

  it("should call the provided onDayMouseEnter (Mouse Event) function", () => {
    const onDayMouseEnterSpy = jest.fn();
    const weekStart = utils.newDate();
    const { container } = render(
      <Week day={weekStart} onDayMouseEnter={onDayMouseEnterSpy} />,
    );

    const day = container.querySelector(".react-datepicker__day");
    fireEvent.mouseEnter(day);

    expect(onDayMouseEnterSpy).toHaveBeenLastCalledWith(
      utils.getStartOfWeek(weekStart),
    );
  });

  it("should call the provided onDayMouseEnter (Pointer Event) function", () => {
    const onDayMouseEnterSpy = jest.fn();
    const weekStart = utils.newDate();
    const { container } = render(
      <Week
        day={weekStart}
        onDayMouseEnter={onDayMouseEnterSpy}
        usePointerEvent
      />,
    );

    const day = container.querySelector(".react-datepicker__day");
    fireEvent.pointerEnter(day);

    expect(onDayMouseEnterSpy).toHaveBeenLastCalledWith(
      utils.getStartOfWeek(weekStart),
    );
  });

  describe("handleWeekClick", () => {
    it("should call onWeekSelect prop with correct arguments", () => {
      const onWeekSelect = jest.fn();
      const day = new Date("2022-02-01");
      const weekNumber = 5;
      const event = { target: {} };
      let instance;
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
        />,
      );
      instance.handleWeekClick(day, weekNumber, event);
      expect(onWeekSelect).toHaveBeenCalledWith(day, weekNumber, event);
    });

    it("should call handleDayClick with start of week if showWeekPicker prop is true", () => {
      const day = new Date("2022-02-01");
      const weekNumber = 5;
      const event = { target: {} };
      let instance;
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
        />,
      );
      const handleDayClick = jest.spyOn(instance, "handleDayClick");
      instance.handleWeekClick(day, weekNumber, event);
      const startOfWeek = utils.getStartOfWeek(day);
      expect(handleDayClick).toHaveBeenCalledWith(startOfWeek, event);
    });

    it("should call setOpen prop with false if shouldCloseOnSelect prop is true", () => {
      const setOpen = jest.fn();
      const day = new Date("2022-02-01");
      const weekNumber = 5;
      const event = { target: {} };
      let instance;
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
        />,
      );
      instance.handleWeekClick(day, weekNumber, event);
      expect(setOpen).toHaveBeenCalledWith(false);
    });
  });

  describe("selected and keyboard-selected", () => {
    it("selected is current week and preselected is also current week", () => {
      const currentWeek = utils.newDate("2023-10-22T13:09:53+02:00");
      const { container } = render(
        <Week
          day={currentWeek}
          selected={currentWeek}
          preSelection={currentWeek}
        />,
      );
      expect(
        container.querySelector(".react-datepicker__week--selected"),
      ).not.toBeNull();
    });

    it("selected is current week and preselected is not current week", () => {
      const currentWeek = utils.newDate("2023-10-22T13:09:53+02:00");
      const preSelection = utils.addWeeks(currentWeek, 1);
      const { container } = render(
        <Week
          day={currentWeek}
          selected={currentWeek}
          preSelection={preSelection}
        />,
      );
      expect(
        container.querySelector(".react-datepicker__week--selected"),
      ).not.toBeNull();
    });

    it("selected is not current week and preselect is current week", () => {
      const currentWeek = utils.newDate("2023-10-22T13:09:53+02:00");
      const selected = utils.addWeeks(currentWeek, 1);
      const { container } = render(
        <Week
          day={currentWeek}
          selected={selected}
          preSelection={currentWeek}
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
      const currentWeek = utils.newDate("2023-10-22T13:09:53+02:00");
      const selected = utils.addWeeks(currentWeek, 1);
      const { container } = render(
        <Week day={currentWeek} selected={selected} preSelection={selected} />,
      );
      expect(
        container.querySelector(".react-datepicker__week--selected"),
      ).toBeNull();
      expect(
        container.querySelector(".react-datepicker__week--keyboard-selected"),
      ).toBeNull();
    });
  });
});
