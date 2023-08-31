import React from "react";
import Week from "../src/week";
import WeekNumber from "../src/week_number";
import Day from "../src/day";
import { shallow } from "enzyme";
import * as utils from "../src/date_utils";

describe("Week", () => {
  it("should have the week CSS class", () => {
    const week = shallow(<Week day={utils.newDate()} />);
    expect(week.hasClass("react-datepicker__week")).toBe(true);
  });

  it("should render the days of the week", () => {
    const weekStart = utils.getStartOfWeek(utils.newDate("2015-12-20"));
    const week = shallow(<Week day={weekStart} />);

    const days = week.find(Day);
    expect(days.length).toBe(7);
    days.forEach((day, offset) => {
      const expectedDay = utils.addDays(weekStart, offset);
      expect(day.prop("day")).toEqual(expectedDay);
    });

    const weekNumber = week.find(WeekNumber);
    expect(weekNumber.length).toBe(0);
  });

  it("should render the week number", () => {
    const weekStart = utils.getStartOfWeek(utils.newDate("2015-12-20"));
    const week = shallow(<Week showWeekNumber day={weekStart} />);

    const days = week.find(Day);
    expect(days.length).toBe(7);
    days.forEach((day, offset) => {
      const expectedDay = utils.addDays(weekStart, offset);
      expect(day.prop("day")).toEqual(expectedDay);
    });

    const weekNumber = week.find(WeekNumber);
    expect(weekNumber.length).toBe(1);
  });

  it("should call the provided onDayClick function", () => {
    let dayClicked = null;

    function onDayClick(day) {
      dayClicked = day;
    }

    const weekStart = utils.newDate("2015-12-20");
    const week = shallow(<Week day={weekStart} onDayClick={onDayClick} />);
    const day = week.find(Day).at(0);
    day.simulate("click");
    expect(day.prop("day")).toEqual(dayClicked);
  });

  it("should call the provided onWeekSelect function and pass the first day of the week", () => {
    let firstDayReceived = null;

    function onWeekClick(newFirstWeekDay) {
      firstDayReceived = newFirstWeekDay;
    }

    const weekStart = utils.newDate("2015-12-20");
    const setOpenSpy = jest.fn();
    const week = shallow(
      <Week
        day={weekStart}
        showWeekNumber
        onWeekSelect={onWeekClick}
        setOpen={setOpenSpy}
      />,
    );
    const weekNumberElement = week.find(WeekNumber);
    weekNumberElement.simulate("click");
    expect(utils.isEqual(firstDayReceived, weekStart)).toBe(true);
  });

  it("should call the provided onWeekSelect function and call the setopen function", () => {
    const weekStart = utils.newDate("2015-12-20");
    const setOpenSpy = jest.fn();

    const week = shallow(
      <Week
        day={weekStart}
        showWeekNumber
        shouldCloseOnSelect
        onWeekSelect={() => {}}
        setOpen={setOpenSpy}
      />,
    );

    const weekNumberElement = week.find(WeekNumber);
    weekNumberElement.simulate("click");
    expect(setOpenSpy).toHaveBeenCalledTimes(1);
  });

  it("should call the provided onWeekSelect function and not call the setopen function when 'shouldCloseOnSelect' is false", () => {
    const weekStart = utils.newDate("2015-12-20");
    const setOpenSpy = jest.fn();
    const setOnWeekSelect = jest.fn();

    const week = shallow(
      <Week
        day={weekStart}
        showWeekNumber
        shouldCloseOnSelect={false}
        onWeekSelect={setOnWeekSelect}
        setOpen={setOpenSpy}
      />,
    );

    const weekNumberElement = week.find(WeekNumber);
    weekNumberElement.simulate("click");
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
    const week = shallow(
      <Week
        day={weekStart}
        showWeekNumber
        shouldCloseOnSelect={false}
        onWeekSelect={onWeekClick}
      />,
    );
    const weekNumberElement = week.find(WeekNumber);
    weekNumberElement.simulate("click");
    expect(weekNumberReceived).toBe(realWeekNumber);
  });

  it("should set the week number with the provided formatWeekNumber function", () => {
    let firstDayReceived = null;

    function weekNumberFormatter(newFirstWeekDay) {
      firstDayReceived = newFirstWeekDay;
      return 9;
    }

    const weekStart = utils.newDate("2015-12-20");
    const week = shallow(
      <Week
        day={weekStart}
        showWeekNumber
        formatWeekNumber={weekNumberFormatter}
      />,
    );
    const weekNumberElement = week.find(WeekNumber);

    expect(utils.isEqual(firstDayReceived, weekStart)).toBe(true);
    expect(weekNumberElement.prop("weekNumber")).toBe(9);
  });

  it("should call the provided onDayMouseEnter function", () => {
    let dayMouseEntered = null;

    function onDayMouseEnter(day) {
      dayMouseEntered = day;
    }

    const weekStart = utils.newDate();
    const week = shallow(
      <Week day={weekStart} onDayMouseEnter={onDayMouseEnter} />,
    );
    const day = week.find(Day).first();
    day.simulate("mouseenter");
    expect(day.prop("day")).toEqual(dayMouseEntered);
  });
});
