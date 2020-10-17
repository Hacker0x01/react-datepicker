import React from "react";
import { mount } from "enzyme";
import DatePicker from "../src/index.jsx";
import Year from "../src/year";
import TestUtils from "react-dom/test-utils";
import ReactDOM from "react-dom";
import * as utils from "../src/date_utils";
import Calendar from "../src/calendar";

describe("YearPicker", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should show year picker component when showYearPicker prop is present", () => {
    const datePicker = mount(<DatePicker showYearPicker />);
    const component = datePicker.find(Year);
    expect(component).to.exist;
  });

  it("should show year picker component with default year item number", () => {
    const yearComponent = mount(<Year date={new Date()} />);
    const yearItems = yearComponent
      .find(".react-datepicker__year-text");
    expect(yearItems.length).to.be.eq(utils.DEFAULT_YEAR_ITEM_NUMBER);
  });

  it("should show year picker component with specific year item number", () => {
    const yearItemNumber = 9;
    const yearComponent = mount(<Year date={new Date()} yearItemNumber={yearItemNumber} />);
    const yearItems = yearComponent
      .find(".react-datepicker__year-text");
    expect(yearItems.length).to.be.eq(yearItemNumber);
  });

  it("should change the year when clicked on any option in the picker", () => {
    const onYearChangeSpy = sinon.spy();
    const yearComponent = mount(
      <Year onDayClick={onYearChangeSpy} date={new Date("2020-05-05")} />
    );
    const firstYearDiv = yearComponent
      .find(".react-datepicker__year-text")
      .at(1);
    firstYearDiv.simulate("click");
    expect(onYearChangeSpy.called).to.be.true;
  });

  it("should has selected class when element of array equal of choosen year", () => {
    const date = new Date("2015-01-01");
    const yearComponent = mount(<Year selected={date} date={date} />);
    const year = yearComponent
      .find(".react-datepicker__year-text--selected")
      .at(0)
      .text();
    expect(year).to.equal(utils.getYear(date).toString());
  });

  it("should has current year class when element of array equal of current year", () => {
    const date = new Date();
    const yearComponent = mount(<Year date={date} />);
    const year = yearComponent
      .find(".react-datepicker__year-text--today")
      .at(0)
      .text();
    expect(year).to.equal(utils.getYear(date).toString());
  });

  it("should return disabled class if current date is out of bound of minDate and maxdate", () => {
    const yearComponent = mount(
      <Year
        date={utils.newDate("2020-01-01")}
        minDate={utils.newDate("2018-01-01")}
        maxDate={utils.newDate("2025-01-01")}
      />
    );
    const year = yearComponent.find(".react-datepicker__year-text").at(0);
    expect(year.hasClass("react-datepicker__year-text--disabled")).to.equal(
      true
    );
  });

  describe("keyboard-selected", () => {
    const className = "react-datepicker__year-text--keyboard-selected";

    it("should set the date to the selected year of the previous period when previous button clicked", () => {
      let date;
      const expectedDate = utils.getStartOfYear(
        utils.setYear(utils.newDate(), 2008)
      );
      const datePicker = TestUtils.renderIntoDocument(
        <DatePicker
          selected={utils.newDate("2020-01-01")}
          adjustDateOnChange
          showYearPicker
          onChange={d => {
            date = d;
          }}
        />
      );
      TestUtils.Simulate.focus(ReactDOM.findDOMNode(datePicker.input));
      const calendar = TestUtils.scryRenderedComponentsWithType(
        datePicker.calendar,
        Calendar
      )[0];
      const year = TestUtils.scryRenderedComponentsWithType(
        datePicker,
        Year
      )[0];
      const previousButton = TestUtils.findRenderedDOMComponentWithClass(
        calendar,
        "react-datepicker__navigation--previous"
      );
      TestUtils.Simulate.click(previousButton);
      const allPreselectedYears = TestUtils.scryRenderedDOMComponentsWithClass(
        year,
        className
      );
      expect(utils.formatDate(date, "dd.MM.yyyy")).to.equal(
        utils.formatDate(expectedDate, "dd.MM.yyyy")
      );
      expect(allPreselectedYears.length).to.equal(1);
    });

    it("should set the date to the selected year of the next period when next button clicked", () => {
      let date;
      const expectedDate = utils.getStartOfYear(
        utils.setYear(utils.newDate(), 2032)
      );
      const datePicker = TestUtils.renderIntoDocument(
        <DatePicker
          selected={utils.newDate("2020-01-01")}
          adjustDateOnChange
          showYearPicker
          onChange={d => {
            date = d;
          }}
        />
      );
      TestUtils.Simulate.focus(ReactDOM.findDOMNode(datePicker.input));
      const calendar = TestUtils.scryRenderedComponentsWithType(
        datePicker.calendar,
        Calendar
      )[0];
      const year = TestUtils.scryRenderedComponentsWithType(
        datePicker,
        Year
      )[0];
      const previousButton = TestUtils.findRenderedDOMComponentWithClass(
        calendar,
        "react-datepicker__navigation--next"
      );
      TestUtils.Simulate.click(previousButton);
      const allPreselectedYears = TestUtils.scryRenderedDOMComponentsWithClass(
        year,
        className
      );
      expect(utils.formatDate(date, "dd.MM.yyyy")).to.equal(
        utils.formatDate(expectedDate, "dd.MM.yyyy")
      );
      expect(allPreselectedYears.length).to.equal(1);
    });
  });
});
