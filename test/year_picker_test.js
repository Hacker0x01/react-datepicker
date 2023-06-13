import React from "react";
import { mount } from "enzyme";
import DatePicker from "../src/index.jsx";
import Year from "../src/year";
import TestUtils from "react-dom/test-utils";
import { create } from "react-test-renderer";
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
    const yearItems = yearComponent.find(".react-datepicker__year-text");
    expect(yearItems.length).to.be.eq(utils.DEFAULT_YEAR_ITEM_NUMBER);
  });

  it("should show year picker component with specific year item number", () => {
    const yearItemNumber = 9;
    const yearComponent = mount(
      <Year date={new Date()} yearItemNumber={yearItemNumber} />
    );
    const yearItems = yearComponent.find(".react-datepicker__year-text");
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

  it("should have current year class when element of array equal of current year", () => {
    const date = new Date();
    const yearComponent = mount(<Year date={date} />);
    const year = yearComponent
      .find(".react-datepicker__year-text--today")
      .at(0)
      .text();
    expect(year).to.equal(utils.getYear(date).toString());
  });

  it("should have aria-current date when element of array equal to current year", () => {
    const date = new Date();
    const yearComponent = mount(<Year date={date} />);
    const ariaCurrent = yearComponent
      .find(".react-datepicker__year-text--today")
      .prop("aria-current");
    expect(ariaCurrent).to.equal("date");
  });

  it("should not have aria-current date when element of array does not equal current year", () => {
    const date = new Date("2015-01-01");
    const yearComponent = mount(<Year date={date} />);
    const ariaCurrent = yearComponent
      .find(".react-datepicker__year-text")
      .at(0)
      .prop("aria-current");
    expect(ariaCurrent).to.be.undefined;
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

  it("should not return disabled class if current date is before minDate but same year", () => {
    const date = utils.newDate("2023-01-01");
    const yearComponent = mount(
      <Year date={date} minDate={utils.newDate("2023-12-31")} />
    );
    const yearTexts = yearComponent.find(".react-datepicker__year-text");
    const firstYear = utils.getYearsPeriod(
      date,
      utils.DEFAULT_YEAR_ITEM_NUMBER
    ).startPeriod;

    expect(
      yearTexts
        .at(2023 - firstYear)
        .hasClass("react-datepicker__year-text--disabled")
    ).to.equal(false);
  });

  it("should not return disabled class if current date is after maxDate but same year", () => {
    const date = utils.newDate("2023-12-31");
    const yearComponent = mount(
      <Year date={date} maxDate={utils.newDate("2023-01-01")} />
    );
    const yearTexts = yearComponent.find(".react-datepicker__year-text");
    const firstYear = utils.getYearsPeriod(
      date,
      utils.DEFAULT_YEAR_ITEM_NUMBER
    ).startPeriod;

    expect(
      yearTexts
        .at(2023 - firstYear)
        .hasClass("react-datepicker__year-text--disabled")
    ).to.equal(false);
  });

  it("should return disabled class if specified excludeDate", () => {
    const date = utils.newDate("2023-12-31");
    const firstYear = utils.getYearsPeriod(
      date,
      utils.DEFAULT_YEAR_ITEM_NUMBER
    ).startPeriod;

    const excludeDates = [];
    for (let year = firstYear; year <= 2023; year++) {
      excludeDates.push(utils.newDate(`${year}-01-01`));
    }

    const yearComponent = mount(
      <Year date={utils.newDate("2023-01-01")} excludeDates={excludeDates} />
    );

    const yearTexts = yearComponent.find(".react-datepicker__year-text");

    for (let i = 0; i <= 2023 - firstYear; i++) {
      const year = yearTexts.at(i);
      expect(year.hasClass("react-datepicker__year-text--disabled")).to.equal(
        true
      );
    }
  });

  it("should return disabled class if specified includeDate", () => {
    const date = utils.newDate("2023-12-31");
    const firstYear = utils.getYearsPeriod(
      date,
      utils.DEFAULT_YEAR_ITEM_NUMBER
    ).startPeriod;

    const includeDates = [];
    for (let year = firstYear; year <= 2023; year++) {
      includeDates.push(utils.newDate(`${year}-01-01`));
    }
    const yearComponent = mount(
      <Year date={utils.newDate("2023-01-01")} includeDates={includeDates} />
    );

    const yearTexts = yearComponent.find(".react-datepicker__year-text");

    const pos = 2023 - firstYear;
    for (let i = 0; i <= pos; i++) {
      const year = yearTexts.at(i);
      expect(year.hasClass("react-datepicker__year-text--disabled")).to.equal(
        false
      );
    }
    for (let i = pos + 1; i < 12; i++) {
      const year = yearTexts.at(i);
      expect(year.hasClass("react-datepicker__year-text--disabled")).to.equal(
        true
      );
    }
  });

  describe("range", () => {
    it("should add range classes", () => {
      const yearComponent = mount(
        <Year
          date={utils.newDate("2009-01-01")}
          startDate={utils.newDate("2009-01-01")}
          endDate={utils.newDate("2012-01-01")}
        />
      );

      const inRangeYears = yearComponent.find(
        ".react-datepicker__year-text--in-range"
      );

      expect(inRangeYears.length).to.equal(4);
      expect(inRangeYears.at(0).text()).to.eq("2009");
      expect(inRangeYears.at(1).text()).to.eq("2010");
      expect(inRangeYears.at(2).text()).to.eq("2011");
      expect(inRangeYears.at(3).text()).to.eq("2012");

      const rangeStartYear = yearComponent.find(
        ".react-datepicker__year-text--range-start"
      );

      expect(rangeStartYear.length).to.equal(1);
      expect(rangeStartYear.at(0).text()).to.eq("2009");

      const rangeEndYear = yearComponent.find(
        ".react-datepicker__year-text--range-end"
      );

      expect(rangeEndYear.length).to.equal(1);
      expect(rangeEndYear.at(0).text()).to.eq("2012");
    });

    it("should not add range classes when start date is not defined", () => {
      const yearComponent = mount(
        <Year
          date={utils.newDate("2009-01-01")}
          endDate={utils.newDate("2012-01-01")}
        />
      );

      const inRangeYears = yearComponent.find(
        ".react-datepicker__year-text--in-range"
      );
      const rangeStartYear = yearComponent.find(
        ".react-datepicker__year-text--range-start"
      );
      const rangeEndYear = yearComponent.find(
        ".react-datepicker__year-text--range-end"
      );

      expect(inRangeYears.length).to.equal(0);
      expect(rangeEndYear.length).to.equal(0);
      expect(rangeStartYear.length).to.equal(0);
    });

    it("should not add range classes when end date is not defined", () => {
      const yearComponent = mount(
        <Year
          date={utils.newDate("2009-01-01")}
          startDate={utils.newDate("2009-01-01")}
        />
      );

      const inRangeYears = yearComponent.find(
        ".react-datepicker__year-text--in-range"
      );
      const rangeStartYear = yearComponent.find(
        ".react-datepicker__year-text--range-start"
      );
      const rangeEndYear = yearComponent.find(
        ".react-datepicker__year-text--range-end"
      );

      expect(inRangeYears.length).to.equal(0);
      expect(rangeEndYear.length).to.equal(0);
      expect(rangeStartYear.length).to.equal(0);
    });

    describe("selecting", () => {
      it("should add in-selecting-range class if year is between the selecting date and end date", () => {
        const yearComponent = mount(
          <Year
            preSelection={utils.newDate("2015-01-01")}
            date={utils.newDate("2012-01-01")}
            endDate={utils.newDate("2016-01-01")}
            selectingDate={utils.newDate("2015-01-01")}
            selectsStart
          />
        );

        const years = yearComponent.find(
          ".react-datepicker__year-text--in-selecting-range"
        );

        expect(years.length).to.equal(2);
        expect(years.at(0).text()).to.eq("2015");
        expect(years.at(1).text()).to.eq("2016");
      });

      it("should add in-selecting-range class if year is between the start date and selecting date", () => {
        const yearComponent = mount(
          <Year
            preSelection={utils.newDate("2011-01-01")}
            date={utils.newDate("2015-01-01")}
            startDate={utils.newDate("2010-01-01")}
            selectingDate={utils.newDate("2011-01-01")}
            selectsEnd
          />
        );

        const years = yearComponent.find(
          ".react-datepicker__year-text--in-selecting-range"
        );

        expect(years.length).to.equal(2);
        expect(years.at(0).text()).to.eq("2010");
        expect(years.at(1).text()).to.eq("2011");
      });

      it("should use pre selection date if selecting date is not defined", () => {
        const yearComponent = mount(
          <Year
            preSelection={utils.newDate("2011-01-01")}
            date={utils.newDate("2015-01-01")}
            startDate={utils.newDate("2010-01-01")}
            selectsEnd
          />
        );

        const years = yearComponent.find(
          ".react-datepicker__year-text--in-selecting-range"
        );

        expect(years.length).to.equal(2);
        expect(years.at(0).text()).to.eq("2010");
        expect(years.at(1).text()).to.eq("2011");
      });

      it("should add in-selecting-range class for one year picker if year is between the start date and selecting date", () => {
        const yearComponent = mount(
          <Year
            preSelection={utils.newDate("2011-01-01")}
            date={utils.newDate("2015-01-01")}
            startDate={utils.newDate("2010-02-01")}
            selectingDate={utils.newDate("2011-01-01")}
            selectsRange
          />
        );
        const years = yearComponent.find(
          ".react-datepicker__year-text--in-selecting-range"
        );

        expect(years.length).to.equal(2);
        expect(years.at(0).text()).to.eq("2010");
        expect(years.at(1).text()).to.eq("2011");
      });

      it("should not add in-selecting-range class for one year picker if the start date is not defined", () => {
        const yearComponent = mount(
          <Year
            preSelection={utils.newDate("2014-01-01")}
            date={utils.newDate("2015-01-01")}
            selectingDate={utils.newDate("2014-01-01")}
            selectsRange
          />
        );
        const years = yearComponent.find(
          ".react-datepicker__year-text--in-selecting-range"
        );

        expect(years.length).to.equal(0);
      });

      it("should not add in-selecting-range class for one year picker if the end date is defined", () => {
        const yearComponent = mount(
          <Year
            preSelection={utils.newDate("2014-01-01")}
            date={utils.newDate("2013-01-01")}
            selectingDate={utils.newDate("2014-01-01")}
            endDate={utils.newDate("2013-01-01")}
            selectsRange
          />
        );
        const years = yearComponent.find(
          ".react-datepicker__month-text--in-selecting-range"
        );

        expect(years.length).to.equal(0);
      });

      it("should add 'selecting-range-start' class to the start selecting year", () => {
        const yearComponent = mount(
          <Year
            preSelection={utils.newDate("2012-01-01")}
            date={utils.newDate("2010-01-01")}
            endDate={utils.newDate("2015-01-01")}
            selectingDate={utils.newDate("2012-01-01")}
            selectsStart
          />
        );
        const years = yearComponent.find(
          ".react-datepicker__year-text--selecting-range-start"
        );
        expect(years.length).to.equal(1);
        expect(years.at(0).text()).to.eq("2012");
      });

      it("should add 'selecting-range-end' class to the end selecting year", () => {
        const yearComponent = mount(
          <Year
            preSelection={utils.newDate("2014-01-01")}
            date={utils.newDate("2012-01-01")}
            startDate={utils.newDate("2010-01-01")}
            endDate={utils.newDate("2015-01-01")}
            selectingDate={utils.newDate("2014-01-01")}
            selectsEnd
          />
        );
        const years = yearComponent.find(
          ".react-datepicker__year-text--selecting-range-end"
        );
        expect(years.length).to.equal(1);
        expect(years.at(0).text()).to.eq("2014");
      });
    });
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
          onChange={(d) => {
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
          onChange={(d) => {
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

  describe("Keyboard navigation", () => {
    let preSelected;
    const setPreSelection = (preSelection) => {
      preSelected = preSelection;
    };

    let selectedDay;
    const onDayClick = (day) => {
      selectedDay = day;
    };

    const getPicker = (initialDate, props) =>
      TestUtils.renderIntoDocument(
        <Year
          selected={utils.newDate(initialDate)}
          date={utils.newDate(initialDate)}
          setPreSelection={setPreSelection}
          preSelection={utils.newDate(initialDate)}
          onDayClick={onDayClick}
          yearItemNumber={12}
          {...props}
        />
      );

    const simulateLeft = (target) =>
      TestUtils.Simulate.keyDown(target, {
        key: "ArrowLeft",
        keyCode: 37,
        which: 37,
      });
    const simulateRight = (target) =>
      TestUtils.Simulate.keyDown(target, {
        key: "ArrowRight",
        keyCode: 39,
        which: 39,
      });

    it("should preSelect and set 2020 on left arrow press", () => {
      const yearPicker = getPicker("2021-01-01");

      const target = TestUtils.findRenderedDOMComponentWithClass(
        yearPicker,
        "react-datepicker__year-text--selected"
      );
      simulateLeft(target);

      expect(utils.getYear(preSelected)).to.equal(2020);
    });
    it("should preSelect and set 2022 on left arrow press", () => {
      const yearPicker = getPicker("2021-01-01");

      const target = TestUtils.findRenderedDOMComponentWithClass(
        yearPicker,
        "react-datepicker__year-text--selected"
      );
      simulateRight(target);

      expect(utils.getYear(preSelected)).to.equal(2022);
    });
    it("should paginate from 2017 to 2016", () => {
      const yearPicker = getPicker("2017-01-01");

      const target = TestUtils.findRenderedDOMComponentWithClass(
        yearPicker,
        "react-datepicker__year-text--selected"
      );
      simulateLeft(target);

      expect(utils.getYear(preSelected)).to.equal(2016);
    });
    it("should paginate from 2028 to 2029", () => {
      const yearPicker = getPicker("2028-01-01");

      const target = TestUtils.findRenderedDOMComponentWithClass(
        yearPicker,
        "react-datepicker__year-text--selected"
      );
      simulateRight(target);

      expect(utils.getYear(preSelected)).to.equal(2029);
    });
    it("should select 2021 when Enter key is pressed", () => {
      const yearPicker = getPicker("2021-01-01");

      const target = TestUtils.findRenderedDOMComponentWithClass(
        yearPicker,
        "react-datepicker__year-text--selected"
      );

      TestUtils.Simulate.keyDown(target, { key: "Enter", code: 13, which: 13 });
      expect(utils.getYear(selectedDay)).to.equal(2021);
    });
    it("should disable keyboard navigation", () => {
      const yearPicker = getPicker("2021-01-01", {
        disabledKeyboardNavigation: true,
      });

      const target = TestUtils.findRenderedDOMComponentWithClass(
        yearPicker,
        "react-datepicker__year-text--selected"
      );
      simulateRight(target);

      expect(utils.getYear(preSelected)).to.equal(2021);
    });
  });
});
