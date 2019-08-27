import React from "react";
import Month from "../src/month";
import Day from "../src/day";
import range from "lodash/range";
import { mount, shallow } from "enzyme";
import * as utils from "../src/date_utils";
import TestUtils from "react-dom/test-utils";

describe("Month", () => {
  function assertDateRangeInclusive(month, start, end) {
    const dayCount = utils.getDaysDiff(end, start) + 1;
    const days = month.find(Day);
    expect(days).to.have.length(dayCount);
    range(0, dayCount).forEach(offset => {
      const day = days.get(offset);
      const expectedDay = utils.addDays(start, offset);
      assert(
        utils.isSameDay(day.props.day, expectedDay),
        `Day ${(offset % 7) + 1} ` +
          `of week ${Math.floor(offset / 7) + 1} ` +
          `should be "${utils.formatDate(expectedDay, "yyyy-MM-dd")}" ` +
          `but it is "${utils.formatDate(day.props.day, "yyyy-MM-dd")}"`
      );
    });
  }

  it("should have the month CSS class", () => {
    const month = shallow(<Month day={utils.newDate()} />);
    expect(month.hasClass("react-datepicker__month")).to.equal(true);
  });

  it("should have the month aria-label", () => {
    const month = TestUtils.renderIntoDocument(
      <Month day={utils.newDate("2015-12-01")} />
    );
    const month_dom = TestUtils.findRenderedDOMComponentWithClass(
      month,
      "react-datepicker__month"
    );
    expect(month_dom.getAttribute("aria-label")).to.equal("month-2015-12");
  });

  it("should render all days of the month and some days in neighboring months", () => {
    const monthStart = utils.newDate("2015-12-01");

    assertDateRangeInclusive(
      mount(<Month day={monthStart} />),
      utils.getStartOfWeek(monthStart),
      utils.getEndOfWeek(utils.getEndOfMonth(monthStart))
    );
  });

  it("should render all days of the month and peek into the next month", () => {
    const monthStart = utils.newDate("2015-12-01");

    assertDateRangeInclusive(
      mount(<Month day={monthStart} peekNextMonth />),
      utils.getStartOfWeek(monthStart),
      utils.getEndOfWeek(utils.addWeeks(utils.addMonths(monthStart, 1), 1))
    );
  });

  it("should render a calendar of fixed height", () => {
    const monthStart = utils.newDate("2016-11-01");
    const calendarStart = utils.getStartOfWeek(monthStart);

    assertDateRangeInclusive(
      mount(<Month day={monthStart} fixedHeight />),
      calendarStart,
      utils.getEndOfWeek(utils.addWeeks(calendarStart, 5))
    );
  });

  it("should render a calendar of fixed height with peeking", () => {
    const monthStart = utils.newDate("2016-11-01");
    const calendarStart = utils.getStartOfWeek(monthStart);

    assertDateRangeInclusive(
      mount(<Month day={monthStart} fixedHeight peekNextMonth />),
      calendarStart,
      utils.getEndOfWeek(utils.addWeeks(calendarStart, 6))
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
    assert(utils.isSameDay(day.prop("day"), dayClicked));
  });

  it("should call the provided onMouseLeave function", () => {
    let mouseLeaveCalled = false;

    function onMouseLeave() {
      mouseLeaveCalled = true;
    }

    const month = shallow(
      <Month day={utils.newDate()} onMouseLeave={onMouseLeave} />
    );
    month.simulate("mouseleave");
    expect(mouseLeaveCalled).to.be.true;
  });

  it("should call the provided onDayMouseEnter function", () => {
    let dayMouseEntered = null;

    function onDayMouseEnter(day) {
      dayMouseEntered = day;
    }

    const month = mount(
      <Month day={utils.newDate()} onDayMouseEnter={onDayMouseEnter} />
    );
    const day = month.find(Day).first();
    day.simulate("mouseenter");
    assert(utils.isSameDay(day.prop("day"), dayMouseEntered));
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
      />
    );
    const day = month.find(Day).at(0);

    day.simulate("click");
    expect(orderValueMatched).to.be.true;
  });

  it("should have the month picker CSS class", () => {
    const month = shallow(<Month showMonthYearPicker day={utils.newDate()} />);
    expect(month.hasClass("react-datepicker__monthPicker")).to.equal(true);
  });

  it("should call the provided onMonthClick function", () => {
    let monthClicked = null;

    function onDayClick(day) {
      monthClicked = day;
    }

    const monthStart = utils.newDate("2015-12-01");
    const monthComponent = mount(
      <Month day={monthStart} showMonthYearPicker onDayClick={onDayClick} />
    );
    const month = monthComponent.find(".react-datepicker__month-text").at(6);
    month.simulate("click");
    expect(utils.getMonth(monthClicked)).to.be.equal(6);
  });

  it("should return disabled class if current date is out of bound of minDate and maxdate", () => {
    const monthComponent = mount(
      <Month
        day={utils.newDate("2015-12-01")}
        minDate={utils.newDate("2016-02-01")}
        maxDate={utils.newDate()}
        showMonthYearPicker
      />
    );
    const month = monthComponent.find(".react-datepicker__month-text").at(0);
    expect(month.hasClass("react-datepicker__month--disabled")).to.equal(true);
  });

  it("should return selected class if month is selected", () => {
    const monthComponent = mount(
      <Month
        day={utils.newDate("2015-02-01")}
        selected={utils.newDate("2015-02-01")}
        showMonthYearPicker
      />
    );
    const month = monthComponent.find(".react-datepicker__month-text").at(1);
    expect(month.hasClass("react-datepicker__month--selected")).to.equal(true);
  });

  it("should return month-in-range class if month is between the start date and end date", () => {
    const monthComponent = mount(
      <Month
        day={utils.newDate("2015-02-01")}
        startDate={utils.newDate("2015-01-01")}
        endDate={utils.newDate("2015-08-01")}
        showMonthYearPicker
      />
    );
    const quarter = monthComponent.find(".react-datepicker__month-text").at(2);
    expect(quarter.hasClass("react-datepicker__month--in-range")).to.equal(
      true
    );
  });

  it("should have the quarter picker CSS class", () => {
    const month = shallow(
      <Month showQuarterYearPicker day={utils.newDate()} />
    );
    expect(month.hasClass("react-datepicker__quarterPicker")).to.equal(true);
  });

  it("should call the provided onQuarterClick function", () => {
    let quarterClicked = null;

    function onDayClick(day) {
      quarterClicked = day;
    }

    const monthStart = utils.newDate("2015-12-01");
    const monthComponent = mount(
      <Month day={monthStart} showQuarterYearPicker onDayClick={onDayClick} />
    );
    const quarter = monthComponent
      .find(".react-datepicker__quarter-text")
      .at(3);
    quarter.simulate("click");
    expect(utils.getQuarter(quarterClicked)).to.be.equal(4);
  });

  it("should return disabled class if current date is out of bound of minDate and maxdate", () => {
    const monthComponent = mount(
      <Month
        day={utils.newDate("2015-12-01")}
        minDate={utils.newDate("2016-02-01")}
        maxDate={utils.newDate()}
        showQuarterYearPicker
      />
    );
    const quarter = monthComponent
      .find(".react-datepicker__quarter-text")
      .at(0);
    expect(quarter.hasClass("react-datepicker__quarter--disabled")).to.equal(
      true
    );
  });

  it("should return selected class if quarter is selected", () => {
    const monthComponent = mount(
      <Month
        day={utils.newDate("2015-02-01")}
        selected={utils.newDate("2015-02-01")}
        showQuarterYearPicker
      />
    );
    const quarter = monthComponent
      .find(".react-datepicker__quarter-text")
      .at(0);
    expect(quarter.hasClass("react-datepicker__quarter--selected")).to.equal(
      true
    );
  });

  it("should return quarter-in-range class if quarter is between the start date and end date", () => {
    const monthComponent = mount(
      <Month
        day={utils.newDate("2015-02-01")}
        startDate={utils.newDate("2015-01-01")}
        endDate={utils.newDate("2015-08-01")}
        showQuarterYearPicker
      />
    );
    const quarter = monthComponent
      .find(".react-datepicker__quarter-text")
      .at(2);
    expect(quarter.hasClass("react-datepicker__quarter--in-range")).to.equal(
      true
    );
  });
});
