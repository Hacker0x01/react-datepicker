import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Month from "../src/month";
import Day from "../src/day";
import DatePicker from "../src";
import range from "lodash/range";
import { mount, shallow } from "enzyme";
import * as utils from "../src/date_utils";
import TestUtils from "react-dom/test-utils";
import { runAxe } from "./run_axe";

import { getKey } from "./test_utils";

describe("Month", () => {
  function assertDateRangeInclusive(month, start, end) {
    const dayCount = utils.getDaysDiff(end, start) + 1;
    const days = month.find(Day);
    expect(days).toHaveLength(dayCount);
    range(0, dayCount).forEach((offset) => {
      const day = days.get(offset);
      const expectedDay = utils.addDays(start, offset);
      expect(utils.isSameDay(day.props.day, expectedDay)).toBe(true);
    });
  }

  xit("should apply className returned from passed monthClassName prop function", () => {
    const className = "customClassName";
    const monthClassNameFunc = () => className;
    const month = shallow(
      <Month day={utils.newDate()} monthClassName={monthClassNameFunc} />,
    );
    expect(month.hasClass(className)).toBe(true);
  });

  it("should have the month CSS class", () => {
    const month = shallow(<Month day={utils.newDate()} />);
    expect(month.hasClass("react-datepicker__month")).toBe(true);
  });

  it("should have the month aria-label", () => {
    const date = utils.newDate("2015-12-01");

    const month = TestUtils.renderIntoDocument(<Month day={date} />);
    const month_dom = TestUtils.findRenderedDOMComponentWithClass(
      month,
      "react-datepicker__month",
    );

    const expectedAriaLabel = utils.formatDate(date, "MMMM, yyyy");
    expect(month_dom.getAttribute("aria-label")).toContain(expectedAriaLabel);
  });

  it("should have the month aria-label with the specified prefix", () => {
    const date = utils.newDate("2015-12-01");
    const ariaLabelPrefix = "Selected Month";

    const month = TestUtils.renderIntoDocument(
      <Month day={date} ariaLabelPrefix={ariaLabelPrefix} />,
    );
    const month_dom = TestUtils.findRenderedDOMComponentWithClass(
      month,
      "react-datepicker__month",
    );

    const expectedAriaLabel =
      `${ariaLabelPrefix} ${utils.formatDate(date, "MMMM, yyyy")}`.toLowerCase();
    expect(month_dom.getAttribute("aria-label").toLowerCase()).toEqual(
      expectedAriaLabel,
    );
  });

  it("should have the month aria-label without any prefix when ariaLabelPrefix is null", () => {
    const date = utils.newDate("2015-12-01");
    const ariaLabelPrefix = null;

    const month = TestUtils.renderIntoDocument(
      <Month day={date} ariaLabelPrefix={ariaLabelPrefix} />,
    );
    const month_dom = TestUtils.findRenderedDOMComponentWithClass(
      month,
      "react-datepicker__month",
    );

    const expectedAriaLabel =
      `${utils.formatDate(date, "MMMM, yyyy")}`.toLowerCase();
    expect(month_dom.getAttribute("aria-label").toLowerCase()).toEqual(
      expectedAriaLabel,
    );
  });

  it("should have an aria-label containing the provided prefix", () => {
    const ariaLabelPrefix = "A prefix in my native language";
    const shallowMonth = shallow(
      <Month ariaLabelPrefix={ariaLabelPrefix} day={utils.newDate()} />,
    );
    expect(
      shallowMonth.html().indexOf(`aria-label="${ariaLabelPrefix}`),
    ).not.toBe(-1);
  });

  it("should render all days of the month and some days in neighboring months", () => {
    const monthStart = utils.newDate("2015-12-01");

    assertDateRangeInclusive(
      mount(<Month day={monthStart} />),
      utils.getStartOfWeek(monthStart),
      utils.getEndOfWeek(utils.getEndOfMonth(monthStart)),
    );
  });

  it("should render all days of the month and peek into the next month", () => {
    const monthStart = utils.newDate("2015-12-01");

    assertDateRangeInclusive(
      mount(<Month day={monthStart} peekNextMonth />),
      utils.getStartOfWeek(monthStart),
      utils.getEndOfWeek(utils.addWeeks(utils.addMonths(monthStart, 1), 1)),
    );
  });

  it("should render a calendar of fixed height", () => {
    const monthStart = utils.newDate("2016-11-01");
    const calendarStart = utils.getStartOfWeek(monthStart);

    assertDateRangeInclusive(
      mount(<Month day={monthStart} fixedHeight />),
      calendarStart,
      utils.getEndOfWeek(utils.addWeeks(calendarStart, 5)),
    );
  });

  it("should render a calendar of fixed height with peeking", () => {
    const monthStart = utils.newDate("2016-11-01");
    const calendarStart = utils.getStartOfWeek(monthStart);

    assertDateRangeInclusive(
      mount(<Month day={monthStart} fixedHeight peekNextMonth />),
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
    const month = mount(<Month day={monthStart} onDayClick={onDayClick} />);
    const day = month.find(Day).at(0);

    day.simulate("click");
    expect(utils.isSameDay(day.prop("day"), dayClicked)).toBe(true);
  });

  it("should call the provided onMouseLeave function", () => {
    let mouseLeaveCalled = false;

    function onMouseLeave() {
      mouseLeaveCalled = true;
    }

    const month = shallow(
      <Month day={utils.newDate()} onMouseLeave={onMouseLeave} />,
    );
    month.simulate("mouseleave");
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

  it("should use its month order in handleDayClick", () => {
    const order = 2;
    let orderValueMatched = false;

    function onDayClick(day, event, monthSelectedIn) {
      orderValueMatched = monthSelectedIn === order;
    }

    const month = mount(
      <Month
        day={utils.newDate()}
        orderInDisplay={order}
        onDayClick={onDayClick}
      />,
    );
    const day = month.find(Day).at(0);

    day.simulate("click");
    expect(orderValueMatched).toBe(true);
  });

  it("should have the month picker CSS class", () => {
    const month = shallow(<Month showMonthYearPicker day={utils.newDate()} />);
    expect(month.hasClass("react-datepicker__monthPicker")).toBe(true);
  });

  it("should call the provided onMonthClick function", () => {
    let monthClicked = null;

    function onDayClick(day) {
      monthClicked = day;
    }

    const monthStart = utils.newDate("2015-12-01");
    const monthComponent = mount(
      <Month day={monthStart} showMonthYearPicker onDayClick={onDayClick} />,
    );
    const month = monthComponent.find(".react-datepicker__month-text").at(6);
    month.simulate("click");
    expect(utils.getMonth(monthClicked)).toBe(6);
  });

  it("should return disabled class if current date is out of bound of minDate and maxDate", () => {
    const monthComponent = mount(
      <Month
        day={utils.newDate("2015-12-01")}
        minDate={utils.newDate("2016-02-01")}
        maxDate={utils.newDate()}
        showMonthYearPicker
      />,
    );
    const month = monthComponent.find(".react-datepicker__month-text").at(0);
    expect(month.hasClass("react-datepicker__month-text--disabled")).toBe(true);
  });

  it("should not return disabled class if current date is before minDate but same month", () => {
    const monthComponent = mount(
      <Month
        day={utils.newDate("2015-01-01")}
        minDate={utils.newDate("2015-01-10")}
        showMonthYearPicker
      />,
    );
    const month = monthComponent.find(".react-datepicker__month-text").at(0);
    expect(month.hasClass("react-datepicker__month-text--disabled")).not.toBe(
      true,
    );
  });

  it("should not return disabled class if current date is after maxDate but same month", () => {
    const monthComponent = mount(
      <Month
        day={utils.newDate("2015-01-10")}
        maxDate={utils.newDate("2015-01-01")}
        showMonthYearPicker
      />,
    );
    const month = monthComponent.find(".react-datepicker__month-text").at(0);
    expect(month.hasClass("react-datepicker__month-text--disabled")).not.toBe(
      true,
    );
  });

  it("should return disabled class if specified excludeDate", () => {
    const monthComponent = mount(
      <Month
        day={utils.newDate("2015-01-01")}
        excludeDates={[
          utils.newDate("2015-02-01"),
          utils.newDate("2015-04-02"),
          utils.newDate("2015-07-03"),
          utils.newDate("2015-10-04"),
        ]}
        showMonthYearPicker
      />,
    );
    // exclude month index
    const monthTexts = monthComponent.find(".react-datepicker__month-text");

    [(1, 3, 6, 9)].forEach((i) => {
      const month = monthTexts.at(i);
      expect(month.hasClass("react-datepicker__month-text--disabled")).toBe(
        true,
      );
    });
  });

  it("should return disabled class if specified includeDate", () => {
    const monthComponent = mount(
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
    const monthTexts = monthComponent.find(".react-datepicker__month-text");
    for (let i = 0; i < 6; i++) {
      const month = monthTexts.at(i);
      expect(month.hasClass("react-datepicker__month-text--disabled")).toBe(
        false,
      );
    }
    for (let i = 6; i < 12; i++) {
      const month = monthTexts.at(i);
      expect(month.hasClass("react-datepicker__month-text--disabled")).toBe(
        true,
      );
    }
  });

  it("should have no axe violations", () => {
    const monthComponent = mount(
      <Month
        day={utils.newDate("2015-02-01")}
        selected={utils.newDate("2015-02-01")}
        preSelection={utils.newDate("2015-02-03")}
      />,
    );
    return runAxe(monthComponent.getDOMNode());
  });

  describe("selecting month range", () => {
    it("should add in-selecting-range class if month is between the selecting date and end date", () => {
      const monthComponent = mount(
        <Month
          preSelection={utils.newDate("2015-01-01")}
          day={utils.newDate("2015-01-01")}
          endDate={utils.newDate("2015-03-01")}
          selectingDate={utils.newDate("2015-02-01")}
          selectsStart
          showMonthYearPicker
        />,
      );
      const months = monthComponent.find(
        ".react-datepicker__month-text--in-selecting-range",
      );
      expect(months.length).toBe(2);
      expect(months.at(0).text()).toBe("Feb");
      expect(months.at(1).text()).toBe("Mar");
    });

    it("should add in-selecting-range class if month is between the start date and selecting date", () => {
      const monthComponent = mount(
        <Month
          preSelection={utils.newDate("2015-01-01")}
          day={utils.newDate("2015-01-01")}
          startDate={utils.newDate("2015-02-01")}
          selectingDate={utils.newDate("2015-03-01")}
          selectsEnd
          showMonthYearPicker
        />,
      );
      const months = monthComponent.find(
        ".react-datepicker__month-text--in-selecting-range",
      );

      expect(months.length).toBe(2);
      expect(months.at(0).text()).toBe("Feb");
      expect(months.at(1).text()).toBe("Mar");
    });

    it("should use pre selection date if selecting date is not defined", () => {
      const monthComponent = mount(
        <Month
          preSelection={utils.newDate("2015-03-01")}
          day={utils.newDate("2015-01-01")}
          startDate={utils.newDate("2015-02-01")}
          selectsEnd
          showMonthYearPicker
        />,
      );
      const months = monthComponent.find(
        ".react-datepicker__month-text--in-selecting-range",
      );

      expect(months.length).toBe(2);
      expect(months.at(0).text()).toBe("Feb");
      expect(months.at(1).text()).toBe("Mar");
    });

    it("should add in-selecting-range class for one month picker if month is between the start date and selecting date", () => {
      const monthComponent = mount(
        <Month
          preSelection={utils.newDate("2015-01-01")}
          day={utils.newDate("2015-01-01")}
          startDate={utils.newDate("2015-02-01")}
          selectingDate={utils.newDate("2015-03-01")}
          selectsRange
          showMonthYearPicker
        />,
      );
      const months = monthComponent.find(
        ".react-datepicker__month-text--in-selecting-range",
      );

      expect(months.length).toBe(2);
      expect(months.at(0).text()).toBe("Feb");
      expect(months.at(1).text()).toBe("Mar");
    });

    it("should not add in-selecting-range class for one month picker if the start date is not defined", () => {
      const monthComponent = mount(
        <Month
          preSelection={utils.newDate("2015-01-01")}
          day={utils.newDate("2015-01-01")}
          selectingDate={utils.newDate("2015-03-01")}
          selectsRange
          showMonthYearPicker
        />,
      );
      const months = monthComponent.find(
        ".react-datepicker__month-text--in-selecting-range",
      );

      expect(months.length).toBe(0);
    });

    it("should not add in-selecting-range class for one month picker if the end date is defined", () => {
      const monthComponent = mount(
        <Month
          preSelection={utils.newDate("2015-01-01")}
          day={utils.newDate("2015-01-01")}
          selectingDate={utils.newDate("2015-03-01")}
          endDate={utils.newDate("2015-03-01")}
          selectsRange
          showMonthYearPicker
        />,
      );
      const months = monthComponent.find(
        ".react-datepicker__month-text--in-selecting-range",
      );

      expect(months.length).toBe(0);
    });

    it("should add 'selecting-range-start' class to the start selecting month", () => {
      const monthComponent = mount(
        <Month
          preSelection={utils.newDate("2015-01-01")}
          day={utils.newDate("2015-01-01")}
          endDate={utils.newDate("2015-03-01")}
          selectingDate={utils.newDate("2015-02-01")}
          selectsStart
          showMonthYearPicker
        />,
      );
      const months = monthComponent.find(
        ".react-datepicker__month-text--selecting-range-start",
      );
      expect(months.length).toBe(1);
      expect(months.at(0).text()).toBe("Feb");
    });

    it("should add 'selecting-range-end' class to the end selecting month", () => {
      const monthComponent = mount(
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
      const months = monthComponent.find(
        ".react-datepicker__month-text--selecting-range-end",
      );
      expect(months.length).toBe(1);
      expect(months.at(0).text()).toBe("Jun");
    });
  });

  describe("selecting quarter range", () => {
    it("should add in-selecting-range class if quarter is between the selecting date and end date", () => {
      const monthComponent = mount(
        <Month
          preSelection={utils.newDate("2015-01-01")}
          day={utils.newDate("2015-01-01")}
          endDate={utils.newDate("2015-07-01")}
          selectingDate={utils.newDate("2015-04-01")}
          selectsStart
          showQuarterYearPicker
        />,
      );

      const quarters = monthComponent.find(
        ".react-datepicker__quarter-text--in-selecting-range",
      );

      expect(quarters.length).toBe(2);
      expect(quarters.at(0).text()).toBe("Q2");
      expect(quarters.at(1).text()).toBe("Q3");
    });

    it("should add in-selecting-range class if quarter is between the start date and selecting date", () => {
      const monthComponent = mount(
        <Month
          preSelection={utils.newDate("2015-01-01")}
          day={utils.newDate("2015-01-01")}
          startDate={utils.newDate("2015-04-01")}
          selectingDate={utils.newDate("2015-07-01")}
          selectsEnd
          showQuarterYearPicker
        />,
      );
      const quarters = monthComponent.find(
        ".react-datepicker__quarter-text--in-selecting-range",
      );

      expect(quarters.length).toBe(2);
      expect(quarters.at(0).text()).toBe("Q2");
      expect(quarters.at(1).text()).toBe("Q3");
    });

    it("should use pre selection date if selecting date is not defined", () => {
      const monthComponent = mount(
        <Month
          preSelection={utils.newDate("2015-07-01")}
          day={utils.newDate("2015-01-01")}
          startDate={utils.newDate("2015-04-01")}
          selectsEnd
          showQuarterYearPicker
        />,
      );
      const quarters = monthComponent.find(
        ".react-datepicker__quarter-text--in-selecting-range",
      );

      expect(quarters.length).toBe(2);
      expect(quarters.at(0).text()).toBe("Q2");
      expect(quarters.at(1).text()).toBe("Q3");
    });

    it("should add in-selecting-range class for one quarter picker if quarter is between the start date and selecting date", () => {
      const monthComponent = mount(
        <Month
          preSelection={utils.newDate("2015-01-01")}
          day={utils.newDate("2015-01-01")}
          startDate={utils.newDate("2015-04-01")}
          selectingDate={utils.newDate("2015-07-01")}
          selectsRange
          showQuarterYearPicker
        />,
      );
      const quarters = monthComponent.find(
        ".react-datepicker__quarter-text--in-selecting-range",
      );

      expect(quarters.length).toBe(2);
      expect(quarters.at(0).text()).toBe("Q2");
      expect(quarters.at(1).text()).toBe("Q3");
    });

    it("should not add in-selecting-range class for one quarter picker if the start date is not defined", () => {
      const monthComponent = mount(
        <Month
          preSelection={utils.newDate("2015-01-01")}
          day={utils.newDate("2015-01-01")}
          selectingDate={utils.newDate("2015-04-01")}
          selectsRange
          showQuarterYearPicker
        />,
      );
      const quarters = monthComponent.find(
        ".react-datepicker__quarter-text--in-selecting-range",
      );

      expect(quarters.length).toBe(0);
    });

    it("should not add in-selecting-range class for one quarter picker if the end date is defined", () => {
      const monthComponent = mount(
        <Month
          preSelection={utils.newDate("2015-01-01")}
          day={utils.newDate("2015-01-01")}
          selectingDate={utils.newDate("2015-04-01")}
          endDate={utils.newDate("2015-07-01")}
          selectsRange
          showQuarterYearPicker
        />,
      );
      const quarters = monthComponent.find(
        ".react-datepicker__quarter-text--in-selecting-range",
      );

      expect(quarters.length).toBe(0);
    });
  });

  describe("if month is selected", () => {
    let monthComponent;
    let month;

    beforeEach(() => {
      monthComponent = mount(
        <Month
          day={utils.newDate("2015-02-01")}
          selected={utils.newDate("2015-02-01")}
          preSelection={utils.newDate("2015-03-01")}
          showMonthYearPicker
        />,
      );
      month = monthComponent.find(".react-datepicker__month-text").at(1);
    });

    it("should return selected class", () => {
      expect(month.hasClass("react-datepicker__month-text--selected")).toBe(
        true,
      );
    });

    it('should set aria-selected attribute to "true"', () => {
      expect(month.getDOMNode().getAttribute("aria-selected")).toBe("true");
    });

    it("should have no axe violations", () =>
      runAxe(monthComponent.getDOMNode()));
  });

  describe("if month is not selected", () => {
    let month;

    beforeEach(() => {
      const monthComponent = mount(
        <Month
          day={utils.newDate("2015-02-01")}
          selected={utils.newDate("2015-02-01")}
          showMonthYearPicker
        />,
      );
      month = monthComponent.find(".react-datepicker__month-text").at(0);
    });

    it("should not have the selected class", () => {
      expect(month.hasClass("react-datepicker__month-text--selected")).toBe(
        false,
      );
    });

    it('should set aria-selected attribute to "false"', () => {
      expect(month.getDOMNode().getAttribute("aria-selected")).toBe("false");
    });
  });

  it("should return month-in-range class if month is between the start date and end date", () => {
    const monthComponent = mount(
      <Month
        day={utils.newDate("2015-02-01")}
        startDate={utils.newDate("2015-01-01")}
        endDate={utils.newDate("2015-08-01")}
        showMonthYearPicker
      />,
    );
    const month = monthComponent.find(".react-datepicker__month-text").at(2);
    expect(month.hasClass("react-datepicker__month-text--in-range")).toBe(true);
  });

  it("should return month-text--today class if month is current year's month", () => {
    const date = new Date();
    const monthComponent = mount(
      <Month day={date} selected={date} showMonthYearPicker />,
    );
    const month = monthComponent
      .find(".react-datepicker__month-text--today")
      .at(0)
      .text();
    expect(month).toBe(utils.getMonthShortInLocale(date.getMonth()));
  });

  it("should not return month-text--today class if month is not current year's month", () => {
    const lastYearDate = new Date();
    lastYearDate.setFullYear(lastYearDate.getFullYear() - 1);
    const monthComponent = mount(
      <Month day={lastYearDate} selected={lastYearDate} showMonthYearPicker />,
    );
    const months = monthComponent.find(".react-datepicker__month-text--today");
    expect(months).toHaveLength(0);
  });

  it("should include aria-current property if month is current year's month", () => {
    const date = new Date();
    const monthComponent = mount(
      <Month day={date} selected={date} showMonthYearPicker />,
    );
    const ariaCurrent = monthComponent
      .find(".react-datepicker__month-text--today")
      .prop("aria-current");
    expect(ariaCurrent).toBe("date");
  });

  it("should not include aria-current property if month is not current year's month", () => {
    const lastYearDate = new Date();
    lastYearDate.setFullYear(lastYearDate.getFullYear() - 1);
    const monthComponent = mount(
      <Month day={lastYearDate} selected={lastYearDate} showMonthYearPicker />,
    );
    const ariaCurrent = monthComponent
      .find(".react-datepicker__month-text")
      .at(0)
      .prop("aria-current");
    expect(ariaCurrent).toBeUndefined();
  });

  it("should have the quarter picker CSS class", () => {
    const month = shallow(
      <Month showQuarterYearPicker day={utils.newDate()} />,
    );
    expect(month.hasClass("react-datepicker__quarterPicker")).toBe(true);
  });

  it("should call the provided onQuarterClick function", () => {
    let quarterClicked = null;

    function onDayClick(day) {
      quarterClicked = day;
    }

    const monthStart = utils.newDate("2015-12-01");
    const monthComponent = mount(
      <Month day={monthStart} showQuarterYearPicker onDayClick={onDayClick} />,
    );
    const quarter = monthComponent
      .find(".react-datepicker__quarter-text")
      .at(3);
    quarter.simulate("click");
    expect(utils.getQuarter(quarterClicked)).toBe(4);
  });

  it("should return disabled class if current date is out of bound of minDate and maxDate", () => {
    const monthComponent = mount(
      <Month
        day={utils.newDate("2015-12-01")}
        minDate={utils.newDate("2016-02-01")}
        maxDate={utils.newDate()}
        showQuarterYearPicker
      />,
    );
    const quarter = monthComponent
      .find(".react-datepicker__quarter-text")
      .at(0);
    expect(quarter.hasClass("react-datepicker__quarter-text--disabled")).toBe(
      true,
    );
  });

  describe("if quarter is selected", () => {
    let monthComponent;
    let quarter;

    beforeEach(() => {
      monthComponent = mount(
        <Month
          day={utils.newDate("2015-02-01")}
          selected={utils.newDate("2015-02-01")}
          preSelection={utils.newDate("2015-05-01")}
          showQuarterYearPicker
        />,
      );
      quarter = monthComponent.find(".react-datepicker__quarter-text").at(0);
    });

    it("should return selected class", () => {
      expect(quarter.hasClass("react-datepicker__quarter-text--selected")).toBe(
        true,
      );
    });

    it('should set aria-selected attribute to "true"', () => {
      expect(quarter.getDOMNode().getAttribute("aria-selected")).toBe("true");
    });

    it("should have no axe violations", () =>
      runAxe(monthComponent.getDOMNode()));
  });

  describe("if quarter is not selected", () => {
    let quarter;

    beforeEach(() => {
      const monthComponent = mount(
        <Month
          day={utils.newDate("2015-02-01")}
          selected={utils.newDate("2015-02-01")}
          showQuarterYearPicker
        />,
      );
      quarter = monthComponent.find(".react-datepicker__quarter-text").at(1);
    });

    it("should not return selected class", () => {
      expect(quarter.hasClass("react-datepicker__quarter-text--selected")).toBe(
        false,
      );
    });

    it('should set aria-selected attribute to "false"', () => {
      expect(quarter.getDOMNode().getAttribute("aria-selected")).toBe("false");
    });
  });

  it("should return quarter-in-range class if quarter is between the start date and end date", () => {
    const monthComponent = mount(
      <Month
        day={utils.newDate("2015-02-01")}
        startDate={utils.newDate("2015-01-01")}
        endDate={utils.newDate("2015-08-01")}
        showQuarterYearPicker
      />,
    );
    const quarter = monthComponent
      .find(".react-datepicker__quarter-text")
      .at(2);
    expect(quarter.hasClass("react-datepicker__quarter-text--in-range")).toBe(
      true,
    );
  });

  it("should enable keyboard focus on the preselected component", () => {
    const monthComponent = mount(
      <Month
        preSelection={utils.newDate("2015-02-01")}
        day={utils.newDate("2015-02-01")}
        startDate={utils.newDate("2015-01-01")}
        endDate={utils.newDate("2015-08-01")}
        showQuarterYearPicker
      />,
    );
    const quarter = monthComponent.find(".react-datepicker__quarter-1");
    expect(quarter.prop("tabIndex")).toBe("0");
  });

  it("should render full month name", () => {
    const monthComponent = mount(
      <Month
        day={utils.newDate("2015-12-01")}
        showMonthYearPicker
        showFullMonthYearPicker
      />,
    );
    const month = monthComponent.find(".react-datepicker__month-1").at(0);

    expect(month.text()).toBe("February");
  });

  it("should render short month name", () => {
    const monthComponent = mount(
      <Month day={utils.newDate("2015-12-01")} showMonthYearPicker />,
    );
    const month = monthComponent.find(".react-datepicker__month-1").at(0);

    expect(month.text()).toBe("Feb");
  });

  describe("custom renders", () => {
    it("should render custom month content", () => {
      function renderMonthContent(_, __, ___, day) {
        return <span data-day={day}>custom render</span>;
      }
      const day = utils.newDate();

      const monthComponent = mount(
        <Month
          day={day}
          renderMonthContent={renderMonthContent}
          showMonthYearPicker
        />,
      );
      const month = monthComponent.find(".react-datepicker__month-text").at(0);
      const span = month.find("span").at(0);
      expect(span.text()).toBe("custom render");
      expect(span.prop("data-day")).toBe(day);
    });

    it("should render custom quarter content", () => {
      function renderQuarterContent() {
        return <span>custom render</span>;
      }
      const monthComponent = mount(
        <Month
          day={utils.newDate()}
          renderQuarterContent={renderQuarterContent}
          showQuarterYearPicker
        />,
      );
      const quarter = monthComponent
        .find(".react-datepicker__quarter-text")
        .at(0);
      expect(quarter.find("span").at(0).text()).toBe("custom render");
    });
  });

  describe("Keyboard navigation", () => {
    const renderQuarters = (props) =>
      shallow(<Month showQuarterYearPicker {...props} />);

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
      quartersComponent
        .find(".react-datepicker__quarter-2")
        .simulate("keydown", getKey("Tab"));
      quartersComponent
        .find(".react-datepicker__quarter-2")
        .simulate("keydown", getKey("ArrowRight"));

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
      quartersComponent
        .find(".react-datepicker__quarter-2")
        .simulate("keydown", getKey("Tab"));
      quartersComponent
        .find(".react-datepicker__quarter-2")
        .simulate("keydown", getKey("ArrowLeft"));

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
            .find(".react-datepicker__quarter-text--selected")
            .hasClass("react-datepicker__quarter-text--keyboard-selected"),
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
        mount(
          <Month
            showMonthYearPicker
            showFourColumnMonthYearPicker
            {...props}
          />,
        );

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
        monthComponent
          .find(".react-datepicker__month-1")
          .simulate("keydown", getKey("Tab"));
        monthComponent
          .find(".react-datepicker__month-1")
          .simulate("keydown", getKey("ArrowRight"));

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
        monthComponent
          .find(".react-datepicker__month-1")
          .simulate("keydown", getKey("ArrowLeft"));

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

        monthComponent
          .find(".react-datepicker__month-7")
          .simulate("keydown", getKey("ArrowUp"));

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

        monthComponent
          .find(".react-datepicker__month-7")
          .simulate("keydown", getKey("ArrowDown"));

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

        monthComponent
          .find(".react-datepicker__month-11")
          .simulate("keydown", getKey("ArrowRight"));
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

        monthComponent
          .find(".react-datepicker__month-0")
          .simulate("keydown", getKey("ArrowLeft"));
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

        monthComponent
          .find(".react-datepicker__month-1")
          .simulate("keydown", getKey("ArrowUp"));
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

        monthComponent
          .find(".react-datepicker__month-10")
          .simulate("keydown", getKey("ArrowDown"));
        expect(preSelected.toString()).toBe(
          utils.newDate("2016-03-01").toString(),
        );
      });
    });
    describe("monthsThreeColumns", () => {
      const renderMonth = (props) =>
        mount(<Month showMonthYearPicker {...props} />);

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
        monthComponent
          .find(".react-datepicker__month-1")
          .simulate("keydown", getKey("Tab"));
        monthComponent
          .find(".react-datepicker__month-1")
          .simulate("keydown", getKey("ArrowRight"));

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
        monthComponent
          .find(".react-datepicker__month-1")
          .simulate("keydown", getKey("ArrowLeft"));

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

        monthComponent
          .find(".react-datepicker__month-7")
          .simulate("keydown", getKey("ArrowUp"));

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

        monthComponent
          .find(".react-datepicker__month-7")
          .simulate("keydown", getKey("ArrowDown"));

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

        monthComponent
          .find(".react-datepicker__month-11")
          .simulate("keydown", getKey("ArrowRight"));
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

        monthComponent
          .find(".react-datepicker__month-0")
          .simulate("keydown", getKey("ArrowLeft"));
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

        monthComponent
          .find(".react-datepicker__month-1")
          .simulate("keydown", getKey("ArrowUp"));
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

        monthComponent
          .find(".react-datepicker__month-10")
          .simulate("keydown", getKey("ArrowDown"));
        expect(preSelected.toString()).toBe(
          utils.newDate("2016-02-01").toString(),
        );
      });
    });
    describe("monthsTwoColumns", () => {
      const renderMonth = (props) =>
        mount(
          <Month showMonthYearPicker showTwoColumnMonthYearPicker {...props} />,
        );

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
        monthComponent
          .find(".react-datepicker__month-1")
          .simulate("keydown", getKey("Tab"));
        monthComponent
          .find(".react-datepicker__month-1")
          .simulate("keydown", getKey("ArrowRight"));

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
        monthComponent
          .find(".react-datepicker__month-1")
          .simulate("keydown", getKey("ArrowLeft"));

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

        monthComponent
          .find(".react-datepicker__month-7")
          .simulate("keydown", getKey("ArrowUp"));

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

        monthComponent
          .find(".react-datepicker__month-7")
          .simulate("keydown", getKey("ArrowDown"));

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

        monthComponent
          .find(".react-datepicker__month-11")
          .simulate("keydown", getKey("ArrowRight"));
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

        monthComponent
          .find(".react-datepicker__month-0")
          .simulate("keydown", getKey("ArrowLeft"));
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

        monthComponent
          .find(".react-datepicker__month-0")
          .simulate("keydown", getKey("ArrowUp"));
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

        monthComponent
          .find(".react-datepicker__month-10")
          .simulate("keydown", getKey("ArrowDown"));
        expect(preSelected.toString()).toBe(
          utils.newDate("2016-01-01").toString(),
        );
      });
    });

    const renderMonth = (props) =>
      mount(<Month showMonthYearPicker {...props} />);

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

      monthComponent
        .find(".react-datepicker__month-1")
        .simulate("keydown", getKey("ArrowLeft"));
      monthComponent
        .find(".react-datepicker__month-2")
        .simulate("keydown", getKey("Enter"));

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

      monthComponent
        .find(".react-datepicker__month-1")
        .simulate("keydown", getKey("ArrowLeft"));
      monthComponent
        .find(".react-datepicker__month-2")
        .simulate("keydown", getKey(SPACE_KEY));

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

      monthComponent
        .find(".react-datepicker__month-7")
        .simulate("keydown", getKey("ArrowRight"));
      expect(preSelected.toString()).toBe(
        utils.newDate("2015-08-01").toString(),
      );
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

      monthComponent
        .find(".react-datepicker__month-7")
        .simulate("keydown", getKey("ArrowRight"));
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

      const enabled = monthComponent.find(".react-datepicker__month-4").at(0);

      const disabled = monthComponent.find(".react-datepicker__month-0").at(0);

      expect(enabled.prop("aria-label")).toBe("Choose May 2015");
      expect(disabled.prop("aria-label")).toBe("Not available January 2015");
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

      const enabled = monthComponent.find(".react-datepicker__month-4").at(0);

      const disabled = monthComponent.find(".react-datepicker__month-0").at(0);

      expect(enabled.prop("aria-label")).toBe("Select this May 2015");
      expect(disabled.prop("aria-label")).toBe(
        `Can't select this January 2015`,
      );
    });
  });

  describe("if keyboard navigation is disabled", () => {
    const renderMonth = (props) =>
      mount(<Month showMonthYearPicker {...props} />);

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
          .find(".react-datepicker__month-text--selected")
          .hasClass("react-datepicker__month-text--keyboard-selected"),
      ).toBe(false);
    });
  });
});
