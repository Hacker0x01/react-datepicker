import React from "react";
import ReactDOM from "react-dom";
import Month from "../src/month";
import Day from "../src/day";
import range from "lodash/range";
import { mount, shallow } from "enzyme";
import * as utils from "../src/date_utils";
import TestUtils from "react-dom/test-utils";
import { runAxe } from "./run_axe";

function getKey(key) {
  switch (key) {
    case "Tab":
      return { key, code: 9, which: 9 };
    case "Enter":
      return { key, code: 13, which: 13 };
    case "ArrowLeft":
      return { key, code: 37, which: 37 };
    case "ArrowRight":
      return { key, code: 39, which: 39 };
    case "ArrowUp":
      return { key, code: 38, which: 38 };
    case "ArrowDown":
      return { key, code: 40, which: 40 };
  }
  throw new Error("Unknown key :" + key);
}

describe("Month", () => {
  function assertDateRangeInclusive(month, start, end) {
    const dayCount = utils.getDaysDiff(end, start) + 1;
    const days = month.find(Day);
    expect(days).to.have.length(dayCount);
    range(0, dayCount).forEach((offset) => {
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

  xit("should apply className returned from passed monthClassName prop function", () => {
    const className = "customClassName";
    const monthClassNameFunc = (date) => className;
    const month = shallow(
      <Month day={utils.newDate()} monthClassName={monthClassNameFunc} />
    );
    expect(month.hasClass(className)).to.equal(true);
  });

  it("should have the month CSS class", () => {
    const month = shallow(<Month day={utils.newDate()} />);
    expect(month.hasClass("react-datepicker__month")).to.equal(true);
  });

  it("should have the month aria-label", () => {
    const dateString = "2015-12";
    const month = TestUtils.renderIntoDocument(
      <Month day={utils.newDate(`${dateString}-01`)} />
    );
    const month_dom = TestUtils.findRenderedDOMComponentWithClass(
      month,
      "react-datepicker__month"
    );
    expect(month_dom.getAttribute("aria-label")).to.contain(dateString);
  });

  it("should have an aria-label containing the provided prefix", () => {
    const ariaLabelPrefix = "A prefix in my native language";
    const shallowMonth = shallow(
      <Month ariaLabelPrefix={ariaLabelPrefix} day={utils.newDate()} />
    );
    expect(
      shallowMonth.html().indexOf(`aria-label="${ariaLabelPrefix}`)
    ).not.equal(-1);
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

  it("should not return disabled class if current date is before minDate but same month", () => {
    const monthComponent = mount(
      <Month
        day={utils.newDate("2015-01-01")}
        minDate={utils.newDate("2015-01-10")}
        showMonthYearPicker
      />
    );
    const month = monthComponent.find(".react-datepicker__month-text").at(0);
    expect(month.hasClass("react-datepicker__month--disabled")).to.not.equal(
      true
    );
  });

  it("should not return disabled class if current date is after maxDate but same month", () => {
    const monthComponent = mount(
      <Month
        day={utils.newDate("2015-01-10")}
        maxDate={utils.newDate("2015-01-01")}
        showMonthYearPicker
      />
    );
    const month = monthComponent.find(".react-datepicker__month-text").at(0);
    expect(month.hasClass("react-datepicker__month--disabled")).to.not.equal(
      true
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
      />
    );
    // exclude month index
    const monthTexts = monthComponent.find(".react-datepicker__month-text");

    [(1, 3, 6, 9)].forEach((i) => {
      const month = monthTexts.at(i);
      expect(month.hasClass("react-datepicker__month--disabled")).to.equal(
        true
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
      />
    );
    const monthTexts = monthComponent.find(".react-datepicker__month-text");
    for (let i = 0; i < 6; i++) {
      const month = monthTexts.at(i);
      expect(month.hasClass("react-datepicker__month--disabled")).to.equal(
        false
      );
    }
    for (let i = 6; i < 12; i++) {
      const month = monthTexts.at(i);
      expect(month.hasClass("react-datepicker__month--disabled")).to.equal(
        true
      );
    }
  });

  it("should have no axe violations", () => {
    const monthComponent = mount(
      <Month
        day={utils.newDate("2015-02-01")}
        selected={utils.newDate("2015-02-01")}
        preSelection={utils.newDate("2015-02-03")}
      />
    );
    return runAxe(monthComponent.getDOMNode());
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
        />
      );
      month = monthComponent.find(".react-datepicker__month-text").at(1);
    });

    it("should return selected class", () => {
      expect(month.hasClass("react-datepicker__month--selected")).to.equal(
        true
      );
    });

    it('should set aria-selected attribute to "true"', () => {
      expect(month.getDOMNode().getAttribute("aria-selected")).to.equal("true");
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
        />
      );
      month = monthComponent.find(".react-datepicker__month-text").at(0);
    });

    it("should not have the selected class", () => {
      expect(month.hasClass("react-datepicker__month--selected")).to.equal(
        false
      );
    });

    it('should set aria-selected attribute to "false"', () => {
      expect(month.getDOMNode().getAttribute("aria-selected")).to.equal(
        "false"
      );
    });
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

  it("should return month-text--today class if month is current year's month", () => {
    const date = new Date();
    const monthComponent = mount(
      <Month day={date} selected={date} showMonthYearPicker />
    );
    const month = monthComponent
      .find(".react-datepicker__month-text--today")
      .at(0)
      .text();
    expect(month).to.equal(utils.getMonthShortInLocale(date.getMonth()));
  });

  it("should not return month-text--today class if month is not current year's month", () => {
    const lastYearDate = new Date();
    lastYearDate.setFullYear(lastYearDate.getFullYear() - 1);
    const monthComponent = mount(
      <Month day={lastYearDate} selected={lastYearDate} showMonthYearPicker />
    );
    const months = monthComponent.find(".react-datepicker__month-text--today");
    expect(months).to.have.length(0);
  });

  it("should include aria-current property if month is current year's month", () => {
    const date = new Date();
    const monthComponent = mount(
      <Month day={date} selected={date} showMonthYearPicker />
    );
    const ariaCurrent = monthComponent
      .find(".react-datepicker__month-text--today")
      .prop("aria-current");
    expect(ariaCurrent).to.equal("date");
  });

  it("should not include aria-current property if month is not current year's month", () => {
    const lastYearDate = new Date();
    lastYearDate.setFullYear(lastYearDate.getFullYear() - 1);
    const monthComponent = mount(
      <Month day={lastYearDate} selected={lastYearDate} showMonthYearPicker />
    );
    const ariaCurrent = monthComponent
      .find(".react-datepicker__month-text")
      .at(0)
      .prop("aria-current");
    expect(ariaCurrent).to.be.undefined;
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
        />
      );
      quarter = monthComponent.find(".react-datepicker__quarter-text").at(0);
    });

    it("should return selected class", () => {
      expect(quarter.hasClass("react-datepicker__quarter--selected")).to.equal(
        true
      );
    });

    it('should set aria-selected attribute to "true"', () => {
      expect(quarter.getDOMNode().getAttribute("aria-selected")).to.equal(
        "true"
      );
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
        />
      );
      quarter = monthComponent.find(".react-datepicker__quarter-text").at(1);
    });

    it("should not return selected class", () => {
      expect(quarter.hasClass("react-datepicker__quarter--selected")).to.equal(
        false
      );
    });

    it('should set aria-selected attribute to "false"', () => {
      expect(quarter.getDOMNode().getAttribute("aria-selected")).to.equal(
        "false"
      );
    });
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

  it("should enable keyboard focus on the preselected component", () => {
    const monthComponent = mount(
      <Month
        preSelection={utils.newDate("2015-02-01")}
        day={utils.newDate("2015-02-01")}
        startDate={utils.newDate("2015-01-01")}
        endDate={utils.newDate("2015-08-01")}
        showQuarterYearPicker
      />
    );
    const quarter = monthComponent.find(".react-datepicker__quarter-1");
    expect(quarter.prop("tabIndex")).to.equal("0");
  });

  it("should render full month name", () => {
    const monthComponent = mount(
      <Month
        day={utils.newDate("2015-12-01")}
        showMonthYearPicker
        showFullMonthYearPicker
      />
    );
    const month = monthComponent.find(".react-datepicker__month-1").at(0);

    expect(month.text()).to.equal("February");
  });

  it("should render short month name", () => {
    const monthComponent = mount(
      <Month day={utils.newDate("2015-12-01")} showMonthYearPicker />
    );
    const month = monthComponent.find(".react-datepicker__month-1").at(0);

    expect(month.text()).to.equal("Feb");
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

      expect(preSelected.toString()).to.equal(
        utils.newDate("2015-07-01").toString()
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

      expect(preSelected.toString()).to.equal(
        utils.newDate("2015-01-01").toString()
      );
    });
  });

  describe("Keyboard navigation", () => {
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

      expect(preSelected.toString()).to.equal(
        utils.newDate("2015-03-01").toString()
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

      expect(preSelected.toString()).to.equal(
        utils.newDate("2015-01-01").toString()
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
        .find(".react-datepicker__month-1")
        .simulate("keydown", getKey("ArrowUp"));

      expect(preSelected.toString()).to.equal(
        utils.newDate("2015-05-01").toString()
      );
    });

    it("should trigger setPreSelection and set Nov as pre-selected on arrowDown", () => {
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
        .find(".react-datepicker__month-1")
        .simulate("keydown", getKey("ArrowDown"));

      expect(preSelected.toString()).to.equal(
        utils.newDate("2015-11-01").toString()
      );
    });

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

      expect(preSelected).to.equal(true);
      expect(selectedDate.toString()).to.equal(
        utils.newDate("2015-03-01").toString()
      );
    });

    it("should pre-select Jan of next year on arrowRight", () => {
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
      expect(preSelected.toString()).to.equal(
        utils.newDate("2016-01-01").toString()
      );
    });

    it("should pre-select Dec of previous year on arrowLeft", () => {
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
      expect(preSelected.toString()).to.equal(
        utils.newDate("2014-12-01").toString()
      );
    });

    it("should pre-select Nov of previous year on arrowUp", () => {
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
        .find(".react-datepicker__month-11")
        .simulate("keydown", getKey("ArrowUp"));
      expect(preSelected.toString()).to.equal(
        utils.newDate("2014-11-01").toString()
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
        .find(".react-datepicker__month-11")
        .simulate("keydown", getKey("ArrowDown"));
      expect(preSelected.toString()).to.equal(
        utils.newDate("2016-02-01").toString()
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
      expect(preSelected.toString()).to.equal(
        utils.newDate("2015-08-01").toString()
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
      expect(preSelected.toString()).to.equal(
        utils.newDate("2015-08-01").toString()
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

      expect(enabled.prop("aria-label")).to.equal("Choose May 2015");
      expect(disabled.prop("aria-label")).to.equal(
        "Not available January 2015"
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

      const enabled = monthComponent.find(".react-datepicker__month-4").at(0);

      const disabled = monthComponent.find(".react-datepicker__month-0").at(0);

      expect(enabled.prop("aria-label")).to.equal("Select this May 2015");
      expect(disabled.prop("aria-label")).to.equal(
        `Can't select this January 2015`
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
              .find(".react-datepicker__month--selected")
              .hasClass("react-datepicker__month-text--keyboard-selected")
      ).to.equal(false);
    });
  });
});
