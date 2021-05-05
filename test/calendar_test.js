import React from "react";
import Calendar from "../src/calendar";
import Month from "../src/month";
import Day from "../src/day";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";
import YearDropdown from "../src/year_dropdown";
import MonthDropdown from "../src/month_dropdown";
import MonthYearDropdown from "../src/month_year_dropdown";
import DatePicker from "../src/index.jsx";
import { shallow, mount } from "enzyme";
import sinon from "sinon";
import * as utils from "../src/date_utils";
import eo from "date-fns/locale/eo";
import fi from "date-fns/locale/fi";
import { isSunday } from "date-fns";

// TODO Possibly rename
const DATE_FORMAT = "MM/dd/yyyy";

describe("Calendar", function () {
  const dateFormat = "MMMM yyyy";
  utils.registerLocale("fi", fi);

  function getCalendar(extraProps) {
    return shallow(
      <Calendar
        dateFormat={dateFormat}
        onSelect={() => {}}
        onClickOutside={() => {}}
        hideCalendar={() => {}}
        dropdownMode="scroll"
        {...extraProps}
      />
    );
  }

  it("should start with the current date in view if no date range", function () {
    const now = utils.newDate();
    const calendar = getCalendar();
    assert(utils.isSameDay(calendar.state().date, now));
  });

  it("should start with the selected date in view if provided", function () {
    const selected = utils.addYears(utils.newDate(), 1);
    const calendar = getCalendar({ selected });
    assert(utils.isSameDay(calendar.state().date, selected));
  });

  it("should start with the pre-selected date in view if provided", function () {
    const preSelected = utils.addYears(utils.newDate(), 2);
    const selected = utils.addYears(utils.newDate(), 1);
    const calendar = getCalendar({ preSelected, selected });
    assert(utils.isSameDay(calendar.state().date, selected));
  });

  it("should start with the current date in view if in date range", function () {
    const now = utils.newDate();
    const minDate = utils.subYears(now, 1);
    const maxDate = utils.addYears(now, 1);
    const calendar = getCalendar({ minDate, maxDate });
    assert(utils.isSameDay(calendar.state().date, now));
  });

  it("should start with the min date in view if after the current date", function () {
    const minDate = utils.addYears(utils.newDate(), 1);
    const calendar = getCalendar({ minDate });
    assert(utils.isSameDay(calendar.state().date, minDate));
  });

  it("should start with the min include date in view if after the current date", function () {
    const minDate = utils.addYears(utils.newDate(), 1);
    const calendar = getCalendar({ includeDates: [minDate] });
    assert(utils.isSameDay(calendar.state().date, minDate));
  });

  it("should start with the max date in view if before the current date", function () {
    const maxDate = utils.subYears(utils.newDate(), 1);
    const calendar = getCalendar({ maxDate });
    assert(utils.isSameDay(calendar.state().date, maxDate));
  });

  it("should start with the max include date in view if before the current date", function () {
    const maxDate = utils.subYears(utils.newDate(), 1);
    const calendar = getCalendar({ includeDates: [maxDate] });
    assert(utils.isSameDay(calendar.state().date, maxDate));
  });

  it("should start with the open to date in view if given and no selected/min/max dates given", function () {
    const openToDate = utils.parseDate("09/28/1993", DATE_FORMAT);
    const calendar = getCalendar({ openToDate });
    assert(utils.isSameDay(calendar.state().date, openToDate));
  });

  it("should start with the open to date in view if given and after a min date", function () {
    const openToDate = utils.parseDate("09/28/1993", DATE_FORMAT);
    const minDate = utils.parseDate("01/01/1993", DATE_FORMAT);
    const calendar = getCalendar({ openToDate, minDate });
    assert(utils.isSameDay(calendar.state().date, openToDate));
  });

  it("should start with the open to date in view if given and before a max date", function () {
    const openToDate = utils.parseDate("09/28/1993", DATE_FORMAT);
    const maxDate = utils.parseDate("12/31/1993", DATE_FORMAT);
    const calendar = getCalendar({ openToDate, maxDate });
    assert(utils.isSameDay(calendar.state().date, openToDate));
  });

  it("should start with the open to date in view if given and in range of the min/max dates", function () {
    const openToDate = utils.parseDate("09/28/1993", DATE_FORMAT);
    const minDate = utils.parseDate("01/01/1993", DATE_FORMAT);
    const maxDate = utils.parseDate("12/31/1993", DATE_FORMAT);
    const calendar = getCalendar({ openToDate, minDate, maxDate });
    assert(utils.isSameDay(calendar.state().date, openToDate));
  });

  it("should open on openToDate date rather than selected date when both are specified", function () {
    var openToDate = utils.parseDate("09/28/1993", DATE_FORMAT);
    var selected = utils.parseDate("09/28/1995", DATE_FORMAT);
    var calendar = getCalendar({ openToDate, selected });
    assert(utils.isSameDay(calendar.state().date, openToDate));
  });

  it("should trigger date change when openToDate prop is set after calcInitialState()", () => {
    const openToDate = utils.parseDate("09/28/1993", DATE_FORMAT);
    const oneMonthFromOpenToDate = utils.parseDate("10/28/1993", DATE_FORMAT);
    const calendar = getCalendar({ openToDate });

    assert(utils.isSameDay(calendar.state().date, openToDate));
    calendar.setProps({ openToDate: oneMonthFromOpenToDate });
    assert(utils.isSameDay(calendar.state().date, oneMonthFromOpenToDate));
  });

  it("should not show the year dropdown menu by default", function () {
    const calendar = getCalendar();
    const yearReadView = calendar.find(YearDropdown);
    expect(yearReadView).to.have.length(0);
  });

  it("should show the year dropdown menu if toggled on", function () {
    const calendar = getCalendar({ showYearDropdown: true });
    const yearReadView = calendar.find(YearDropdown);
    expect(yearReadView).to.have.length(1);
  });

  it("should show only one year dropdown menu if toggled on and multiple month mode on", function () {
    const calendar = getCalendar({ showYearDropdown: true, monthsShown: 2 });
    const monthReadView = calendar.find(YearDropdown);
    expect(monthReadView).to.have.length(1);
  });

  it("should show month navigation if toggled on", function () {
    const calendar = getCalendar({
      includeDates: [utils.newDate()],
      forceShowMonthNavigation: true,
    });
    const nextNavigationButton = calendar.find(
      ".react-datepicker__navigation--next"
    );
    expect(nextNavigationButton).to.have.length(1);
  });

  it("should correctly format weekday using formatWeekDay prop", function () {
    const calendar = getCalendar({ formatWeekDay: (day) => day[0] });
    calendar
      .find(".react-datepicker__day-name")
      .forEach((dayName) => expect(dayName.text()).to.have.length(1));
  });

  it("should contain the correct class when using the weekDayClassName prop", () => {
    const func = (date) => (isSunday(date) ? "sunday" : undefined);

    const calendar = mount(
      <Calendar
        dateFormat={dateFormat}
        dropdownMode="scroll"
        onClickOutside={() => {}}
        onSelect={() => {}}
        weekDayClassName={func}
      />
    );

    const sunday = calendar.find(".react-datepicker__day-name.sunday");
    expect(sunday).to.have.length(1);
  });

  it("should render the months correctly adjusted by monthSelectedIn", () => {
    const selected = utils.newDate("2018-11-19");
    const calendar = getCalendar({ inline: true, monthsShown: 2, selected });
    calendar.setProps({ monthSelectedIn: 1 }, () => {
      const renderedMonths = calendar.find(Month);
      assert.equal(utils.getMonth(renderedMonths.first().prop("day")), 9);
    });
  });

  describe("custom header", function () {
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
            {months.map((option) => (
              <option key={option} value={option}>
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

    it("should call render custom header function and returns parameters", function () {
      const renderCustomHeader = sinon.spy();

      getCalendar({ renderCustomHeader });

      const match = {
        customHeaderCount: 0,
        changeMonth: sinon.match.func,
        changeYear: sinon.match.func,
        date: sinon.match.instanceOf(Date),
        decreaseMonth: sinon.match.func,
        increaseMonth: sinon.match.func,
        nextMonthButtonDisabled: sinon.match.bool,
        prevMonthButtonDisabled: sinon.match.bool,
      };

      expect(renderCustomHeader.calledWithMatch(match)).to.be.true;
    });

    it("should render only custom header", function () {
      const calendar = getCalendar({ renderCustomHeader });

      const nextMontButton = calendar.find(
        ".react-datepicker__navigation--next"
      );
      const prevMontButton = calendar.find(
        ".react-datepicker__navigation--previous"
      );

      expect(nextMontButton).to.have.length(0);
      expect(prevMontButton).to.have.length(0);
    });

    it("should render custom header with selects and buttons", function () {
      const calendar = getCalendar({
        renderCustomHeader,
      });

      expect(calendar.find(".react-datepicker__header--custom")).to.have.length(
        1
      );
      expect(calendar.find(".custom-header")).to.have.length(1);

      const yearSelect = calendar.find(".year-select");
      const monthSelect = calendar.find(".month-select");
      const prevMonth = calendar.find(".prevMonth");
      const nextMonth = calendar.find(".nextMonth");

      expect(yearSelect).to.have.length(1);
      expect(monthSelect).to.have.length(1);
      expect(prevMonth).to.have.length(1);
      expect(nextMonth).to.have.length(1);
    });

    it("should render custom header when showing year picker", function () {
      const calendar = getCalendar({
        renderCustomHeader,
        showYearPicker: true,
      });

      expect(calendar.find(".react-datepicker__header--custom")).to.have.length(
        1
      );

      expect(
        calendar.find(".react-datepicker__year--container")
      ).to.have.length(1);
    });

    it("should render day names with renderCustomHeader", function () {
      const calendar = getCalendar({
        renderCustomHeader,
      });

      expect(calendar.find(".react-datepicker__header--custom")).to.have.length(
        1
      );

      expect(calendar.find(".react-datepicker__day-names")).to.have.length(1);
    });

    it("should not render day names with renderCustomHeader & showMonthYearPicker", function () {
      const calendar = getCalendar({
        renderCustomHeader,
        showMonthYearPicker: true,
      });

      expect(calendar.find(".react-datepicker__header--custom")).to.have.length(
        1
      );

      expect(calendar.find(".react-datepicker__day-names")).to.have.length(0);
    });

    it("should not render day names with renderCustomHeader & showYearPicker", function () {
      const calendar = getCalendar({
        renderCustomHeader,
        showYearPicker: true,
      });

      expect(calendar.find(".react-datepicker__header--custom")).to.have.length(
        1
      );

      expect(calendar.find(".react-datepicker__day-names")).to.have.length(0);
    });

    it("should not render day names with renderCustomHeader & showQuarterYearPicker", function () {
      const calendar = getCalendar({
        renderCustomHeader,
        showQuarterYearPicker: true,
      });

      expect(calendar.find(".react-datepicker__header--custom")).to.have.length(
        1
      );

      expect(calendar.find(".react-datepicker__day-names")).to.have.length(0);
    });

    it("should go to previous month", function () {
      const calendar = getCalendar({
        renderCustomHeader,
      });

      const selected = utils.newDate(calendar.state().date);
      const prevMonth = calendar.find(".prevMonth");

      prevMonth.simulate("click");

      expect(utils.getMonth(selected)).to.be.equal(
        (utils.getMonth(calendar.state().date) + 1) % 12
      );
    });

    it("should go to next month", function () {
      const calendar = getCalendar({
        renderCustomHeader,
      });

      const selected = utils.newDate(calendar.state().date);
      const nextMonth = calendar.find(".nextMonth");

      nextMonth.simulate("click");

      const newMonth = utils.getMonth(calendar.state().date) - 1;

      const resultMonth = newMonth === -1 ? 11 : newMonth;

      expect(utils.getMonth(selected)).to.be.equal(resultMonth);
    });

    it("nextMonthButtonDisabled flag should be true", function () {
      const renderCustomHeader = sinon.spy();

      getCalendar({
        renderCustomHeader,
        minDate: utils.subMonths(utils.newDate(), 1),
        maxDate: utils.newDate(),
      });

      const {
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      } = renderCustomHeader.getCall(0).args[0];

      assert(
        prevMonthButtonDisabled === false,
        "prevMonthButtonDisabled should be set to false"
      );
      assert(
        nextMonthButtonDisabled === true,
        "nextMonthButtonDisabled  should be set to true"
      );
    });

    it("prevMonthButtonDisabled flag should be true", function () {
      const renderCustomHeader = sinon.spy();

      getCalendar({
        renderCustomHeader,
        minDate: utils.newDate(),
        maxDate: utils.addMonths(utils.newDate(), 1),
      });

      const {
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      } = renderCustomHeader.getCall(0).args[0];

      assert(
        prevMonthButtonDisabled === true,
        "prevMonthButtonDisabled should be set to true"
      );
      assert(
        nextMonthButtonDisabled === false,
        "nextMonthButtonDisabled  should be set to false"
      );
    });

    it("should select april from month select", function () {
      const calendar = getCalendar({
        renderCustomHeader,
      });

      const monthSelect = calendar.find(".month-select");

      monthSelect.simulate("change", { target: { value: 4 } });

      const selected = utils.newDate(calendar.state().date);

      expect(utils.getMonth(selected)).to.be.equal(4);
    });

    it("should select 2017 from month select", function () {
      const calendar = getCalendar({
        renderCustomHeader,
      });

      const yearSelect = calendar.find(".year-select");

      yearSelect.simulate("change", { target: { value: 2017 } });

      const selected = utils.newDate(calendar.state().date);

      expect(utils.getYear(selected)).to.be.equal(2017);
    });

    it("should render custom headers according to monthsShown prop", () => {
      const twoMonthsCalendar = getCalendar({
        renderCustomHeader,
        monthsShown: 2,
      });
      expect(
        twoMonthsCalendar.find(".react-datepicker__header--custom")
      ).to.have.length(2);

      const fourMonthsCalendar = getCalendar({
        renderCustomHeader,
        monthsShown: 4,
      });
      expect(
        fourMonthsCalendar.find(".react-datepicker__header--custom")
      ).to.have.length(4);
    });

    it("should render custom header with show time select", function () {
      const calendar = mount(
        <Calendar
          renderCustomHeader={renderCustomHeader}
          showTimeSelect
          dateFormat={dateFormat}
          dropdownMode="scroll"
          onClickOutside={() => {}}
          onSelect={() => {}}
        />
      );
      const header = calendar.find(".react-datepicker__header--custom");
      const time = calendar.find(".react-datepicker__time");
      expect(header).to.have.length(1);
      expect(time).to.have.length(1);
    });
  });

  describe("when showDisabledMonthNavigation is enabled", () => {
    let onMonthChangeSpy = sinon.spy();

    beforeEach(() => {
      onMonthChangeSpy = sinon.spy();
    });

    it("should show disabled previous month navigation", function () {
      const calendar = getCalendar({
        minDate: utils.newDate(),
        maxDate: utils.addMonths(utils.newDate(), 3),
        showDisabledMonthNavigation: true,
      });

      const prevDisabledNavigationButton = calendar.find(
        ".react-datepicker__navigation--previous--disabled"
      );

      const nextDisabledNavigationButton = calendar.find(
        ".react-datepicker__navigation--next--disabled"
      );
      expect(prevDisabledNavigationButton).to.have.length(1);
      expect(nextDisabledNavigationButton).to.have.length(0);
    });

    it("should show disabled next month navigation", function () {
      const calendar = getCalendar({
        minDate: utils.subMonths(utils.newDate(), 3),
        maxDate: utils.newDate(),
        showDisabledMonthNavigation: true,
      });
      const prevDisabledNavigationButton = calendar.find(
        ".react-datepicker__navigation--previous--disabled"
      );

      const nextDisabledNavigationButton = calendar.find(
        ".react-datepicker__navigation--next--disabled"
      );
      expect(prevDisabledNavigationButton).to.have.length(0);
      expect(nextDisabledNavigationButton).to.have.length(1);
    });

    it("should not show disabled previous/next month navigation when next/previous month available", function () {
      const calendar = getCalendar({
        minDate: utils.subMonths(utils.newDate(), 3),
        maxDate: utils.addMonths(utils.newDate(), 3),
        showDisabledMonthNavigation: true,
      });
      const prevDisabledNavigationButton = calendar.find(
        ".react-datepicker__navigation--previous--disabled"
      );

      const nextDisabledNavigationButton = calendar.find(
        ".react-datepicker__navigation--next--disabled"
      );
      expect(prevDisabledNavigationButton).to.have.length(0);
      expect(nextDisabledNavigationButton).to.have.length(0);
    });

    it("when clicking disabled month navigation, should not change month", function () {
      const calendar = getCalendar({
        minDate: utils.newDate(),
        maxDate: utils.newDate(),
        showDisabledMonthNavigation: true,
        onMonthChange: onMonthChangeSpy,
      });
      const prevNavigationButton = calendar.find(
        ".react-datepicker__navigation--previous"
      );

      const nextNavigationButton = calendar.find(
        ".react-datepicker__navigation--next"
      );

      prevNavigationButton.simulate("click");

      assert(
        onMonthChangeSpy.called === false,
        "onMonthChange should not be called"
      );

      nextNavigationButton.simulate("click");

      assert(
        onMonthChangeSpy.called === false,
        "onMonthChange should not be called"
      );
    });

    it("when clicking non-disabled month navigation, should change month", function () {
      const calendar = getCalendar({
        selected: utils.newDate(),
        minDate: utils.subMonths(utils.newDate(), 3),
        maxDate: utils.addMonths(utils.newDate(), 3),
        showDisabledMonthNavigation: true,
        onMonthChange: onMonthChangeSpy,
      });
      const prevNavigationButton = calendar.find(
        ".react-datepicker__navigation--previous"
      );

      const nextNavigationButton = calendar.find(
        ".react-datepicker__navigation--next"
      );

      prevNavigationButton.simulate("click");
      nextNavigationButton.simulate("click");

      assert(
        onMonthChangeSpy.callCount === 2,
        "onMonthChange should be called 2 times"
      );
    });
  });

  it("should not show the month dropdown menu by default", function () {
    const calendar = getCalendar();
    const monthReadView = calendar.find(MonthDropdown);
    expect(monthReadView).to.have.length(0);
  });

  it("should show the month dropdown menu if toggled on", function () {
    const calendar = getCalendar({ showMonthDropdown: true });
    const monthReadView = calendar.find(MonthDropdown);
    expect(monthReadView).to.have.length(1);
  });

  it("should show only one month dropdown menu if toggled on and multiple month mode on", function () {
    const calendar = getCalendar({ showMonthDropdown: true, monthsShown: 2 });
    const monthReadView = calendar.find(MonthDropdown);
    expect(monthReadView).to.have.length(1);
  });

  it("should not show the month-year dropdown menu by default", function () {
    const calendar = getCalendar();
    const monthYearReadView = calendar.find(MonthYearDropdown);
    expect(monthYearReadView).to.have.length(0);
  });

  it("should show the month-year dropdown menu if toggled on", function () {
    const calendar = getCalendar({
      showMonthYearDropdown: true,
      minDate: utils.subYears(utils.newDate(), 1),
      maxDate: utils.addYears(utils.newDate(), 1),
    });
    const monthYearReadView = calendar.find(MonthYearDropdown);
    expect(monthYearReadView).to.have.length(1);
  });

  it("should show only one month-year dropdown menu if toggled on and multiple month mode on", function () {
    const calendar = getCalendar({
      showMonthYearDropdown: true,
      minDate: utils.subYears(utils.newDate(), 1),
      maxDate: utils.addYears(utils.newDate(), 1),
      monthsShown: 2,
    });
    const monthReadView = calendar.find(MonthYearDropdown);
    expect(monthReadView).to.have.length(1);
  });

  it("should not show the today button by default", function () {
    const calendar = getCalendar();
    const todayButton = calendar.find(".react-datepicker__today-button");
    expect(todayButton).to.have.length(0);
  });

  it("should show the today button if toggled on", function () {
    const calendar = getCalendar({ todayButton: "Vandaag" });
    const todayButton = calendar.find(".react-datepicker__today-button");
    expect(todayButton).to.have.length(1);
    expect(todayButton.text()).to.equal("Vandaag");
  });

  it("should set the date when pressing todayButton", () => {
    const calendar = getCalendar({ todayButton: "Vandaag" });
    const todayButton = calendar.find(".react-datepicker__today-button");
    todayButton.simulate("click");
    expect(utils.isSameDay(calendar.state().date, utils.newDate()));
  });

  it("should use a hash for week label if weekLabel is NOT provided", () => {
    const calendar = getCalendar({ showWeekNumbers: true });
    const weekLabel = calendar.find(".react-datepicker__day-name");
    expect(weekLabel.at(0).text()).to.equal("#");
  });

  it("should set custom week label if weekLabel is provided", () => {
    const calendar = getCalendar({ showWeekNumbers: true, weekLabel: "Foo" });
    const weekLabel = calendar.find(".react-datepicker__day-name");
    expect(weekLabel.at(0).text()).to.equal("Foo");
  });

  it("should track the currently hovered day", () => {
    const calendar = mount(
      <Calendar
        dateFormat={dateFormat}
        dropdownMode="scroll"
        onClickOutside={() => {}}
        onSelect={() => {}}
      />
    );
    const day = calendar.find(Day).first();
    day.simulate("mouseenter");
    const month = calendar.find(Month).first();
    expect(month.prop("selectingDate")).to.exist;
    expect(utils.isSameDay(month.prop("selectingDate"), day.prop("day"))).to.be
      .true;
  });

  it("should clear the hovered day when the mouse leaves", () => {
    const calendar = mount(
      <Calendar
        dateFormat={dateFormat}
        dropdownMode="scroll"
        onClickOutside={() => {}}
        onSelect={() => {}}
      />
    );
    calendar.setState({ selectingDate: utils.newDate() });
    const month = calendar.find(Month).first();
    expect(month.prop("selectingDate")).to.exist;
    month.simulate("mouseleave");
    calendar.update();
    expect(calendar.find(Month).first().prop("selectingDate")).not.to.exist;
  });

  it("uses weekdaysShort instead of weekdaysMin provided useWeekdaysShort prop is present", () => {
    const calendarShort = mount(
      <Calendar
        locale="en"
        dateFormat={dateFormat}
        onClickOutside={() => {}}
        onSelect={() => {}}
        useWeekdaysShort
      />
    );
    const calendarMin = mount(
      <Calendar
        locale="en"
        dateFormat={dateFormat}
        onClickOutside={() => {}}
        onSelect={() => {}}
      />
    );

    const daysNamesShort = calendarShort.find(".react-datepicker__day-name");
    expect(daysNamesShort.at(0).text()).to.equal("Sun");
    expect(daysNamesShort.at(6).text()).to.equal("Sat");

    const daysNamesMin = calendarMin.find(".react-datepicker__day-name");
    expect(daysNamesMin.at(0).text()).to.equal("Su");
    expect(daysNamesMin.at(6).text()).to.equal("Sa");
  });

  it("should set the date to the selected day of the previous month when previous button clicked", () => {
    let date;
    const expectedDate = "28.06.2017";
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        selected={utils.newDate("2017-07-28")}
        adjustDateOnChange
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
    const previousButton = TestUtils.findRenderedDOMComponentWithClass(
      calendar,
      "react-datepicker__navigation--previous"
    );
    TestUtils.Simulate.click(previousButton);
    expect(utils.formatDate(date, "dd.MM.yyyy")).to.equal(expectedDate);
  });

  it("should set the date to the selected day of the next when next button clicked", () => {
    let date;
    const expectedDate = "28.08.2017";
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        selected={utils.newDate("2017-07-28")}
        adjustDateOnChange
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
    const nextButton = TestUtils.findRenderedDOMComponentWithClass(
      calendar,
      "react-datepicker__navigation--next"
    );
    TestUtils.Simulate.click(nextButton);
    expect(utils.formatDate(date, "dd.MM.yyyy")).to.equal(expectedDate);
  });

  it("should set the date to the last possible day of the previous month when previous button clicked", () => {
    let date;
    const expectedDate = "30.11.2017";
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        selected={utils.newDate("2017-12-31")}
        adjustDateOnChange
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
    const previousButton = TestUtils.findRenderedDOMComponentWithClass(
      calendar,
      "react-datepicker__navigation--previous"
    );
    TestUtils.Simulate.click(previousButton);
    expect(utils.formatDate(date, "dd.MM.yyyy")).to.equal(expectedDate);
  });

  it("should trigger onCalendarOpen and onCalendarClose", () => {
    const onCalendarOpen = sinon.spy();
    const onCalendarClose = sinon.spy();

    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        onCalendarOpen={onCalendarOpen}
        onCalendarClose={onCalendarClose}
      />
    );

    TestUtils.Simulate.focus(ReactDOM.findDOMNode(datePicker.input));

    assert(onCalendarOpen.called === true, "onCalendarOpen should be called");

    TestUtils.Simulate.blur(ReactDOM.findDOMNode(datePicker.input));

    assert(onCalendarOpen.called === true, "onCalendarClose should be called");
  });

  describe("onMonthChange", () => {
    let onMonthChangeSpy = sinon.spy();
    let calendar;

    beforeEach(() => {
      onMonthChangeSpy = sinon.spy();
      calendar = mount(
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
        />
      );
    });

    it("calls onMonthChange prop when previous month button clicked", () => {
      const select = calendar.find(".react-datepicker__navigation--previous");
      select.simulate("click");

      assert(
        onMonthChangeSpy.called === true,
        "onMonthChange should be called"
      );
    });

    it("calls onMonthChange prop when next month button clicked", () => {
      const select = calendar.find(".react-datepicker__navigation--next");
      select.simulate("click");

      assert(
        onMonthChangeSpy.called === true,
        "onMonthChange should be called"
      );
    });

    it("calls onMonthChange prop when month changed from month dropdown", () => {
      const select = calendar.find(MonthDropdown).find("select");
      select.simulate("change");

      assert(
        onMonthChangeSpy.called === true,
        "onMonthChange should be called"
      );
    });
  });

  describe("onYearChange", () => {
    let onYearChangeSpy = sinon.spy();
    let calendar;

    beforeEach(() => {
      onYearChangeSpy = sinon.spy();
      calendar = mount(
        <Calendar
          dateFormat={dateFormat}
          onSelect={() => {}}
          onClickOutside={() => {}}
          hideCalendar={() => {}}
          dropdownMode="select"
          showYearDropdown
          onYearChange={onYearChangeSpy}
        />
      );
    });

    it("calls onYearChange prop when year changed from year dropdown", () => {
      const select = calendar.find(YearDropdown).find("select");
      select.simulate("change");

      assert(onYearChangeSpy.called === true, "onYearChange should be called");
    });
  });

  describe("monthYearDropdown change", () => {
    let onYearChangeSpy = sinon.spy();
    let onMonthChangeSpy = sinon.spy();
    let calendar;

    beforeEach(() => {
      onYearChangeSpy = sinon.spy();
      onMonthChangeSpy = sinon.spy();
      calendar = mount(
        <Calendar
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
        />
      );
    });

    it("calls onYearChange prop when selection is changed from month-year dropdown", () => {
      const option = calendar
        .find(MonthYearDropdown)
        .find("select")
        .find("option")
        .at(3);
      option.simulate("change");

      assert(onYearChangeSpy.called === true, "onYearChange should be called");
    });

    it("calls onMonthChange prop when selection is changed from month-year dropdown", () => {
      const option = calendar
        .find(MonthYearDropdown)
        .find("select")
        .find("option")
        .at(3);
      option.simulate("change");

      assert(
        onMonthChangeSpy.called === true,
        "onMonthChange should be called"
      );
    });
  });

  describe("onDropdownFocus", () => {
    let onDropdownFocusSpy = sinon.spy();
    let calendar;

    beforeEach(() => {
      onDropdownFocusSpy = sinon.spy();
      calendar = mount(
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
        />
      );
    });

    it("calls onDropdownFocus prop when year select is focused", () => {
      const select = calendar.find(".react-datepicker__year-select");
      select.simulate("focus");

      assert(
        onDropdownFocusSpy.called === true,
        "onDropdownFocus should be called"
      );
    });

    it("calls onDropdownFocus prop when month select is focused", () => {
      const select = calendar.find(".react-datepicker__month-select");
      select.simulate("focus");

      assert(
        onDropdownFocusSpy.called === true,
        "onDropdownFocus should to be called"
      );
    });

    it("calls onDropdownFocus prop when year-month select is focused", () => {
      const select = calendar.find(".react-datepicker__month-year-select");
      select.simulate("focus");

      assert(
        onDropdownFocusSpy.called === true,
        "onDropdownFocus should to be called"
      );
    });

    it("does not call onDropdownFocus prop when the dropdown container div is focused", () => {
      const select = calendar.find(".react-datepicker__header__dropdown");
      select.simulate("focus");

      assert(
        onDropdownFocusSpy.called === false,
        "onDropdownFocus should not to be called"
      );
    });
  });

  describe("localization", function () {
    function testLocale(calendar, selected, locale) {
      const calendarText = calendar.find(".react-datepicker__current-month");
      expect(calendarText.text()).to.equal(
        utils.formatDate(selected, dateFormat, locale)
      );
      const firstDateOfWeek = utils.getStartOfWeek(selected, locale);
      const firstWeekDayMin = utils.getWeekdayMinInLocale(
        firstDateOfWeek,
        locale
      );
      const firstHeader = calendar.find(".react-datepicker__day-name").at(0);
      expect(firstHeader.text()).to.equal(firstWeekDayMin);
    }

    it("should use the 'en' locale by default", function () {
      const selected = utils.newDate();
      const calendar = getCalendar({ selected });
      testLocale(calendar, selected);
    });

    it("should use the default locale when set", function () {
      const selected = utils.newDate();
      utils.setDefaultLocale("fi");

      const calendar = getCalendar({ selected });
      testLocale(calendar, selected, "fi");
      utils.setDefaultLocale("");
    });

    it("should use the locale specified as a prop", function () {
      utils.registerLocale("fi", fi);
      const locale = "fi";
      const selected = utils.newDate();
      const calendar = getCalendar({ selected, locale });
      testLocale(calendar, selected, locale);
    });

    it("should override the default locale with the locale prop", function () {
      const locale = "en";
      const selected = utils.newDate();
      utils.setDefaultLocale("fi");

      const calendar = getCalendar({ selected, locale });
      testLocale(calendar, selected, locale);
      utils.setDefaultLocale("");
    });

    it("should accept a raw date-fns locale object", function () {
      // Note that we explicitly do not call `registerLocale`, because that
      // would create a global variable, which we want to avoid.
      const locale = eo;
      const selected = utils.newDate();

      const calendar = getCalendar({ selected, locale });
      testLocale(calendar, selected, locale);

      // Other tests touch this global, so it will always be present, but at the
      // very least we can make sure the test worked without 'eo' being added.
      expect(window.__localeData__).not.to.haveOwnProperty("eo");
    });

    it("should render empty custom header", function () {
      const calendar = getCalendar({ renderCustomHeader: () => {} });

      const header = calendar.find(".react-datepicker__header--custom");
      expect(header).to.have.length(1);
    });
  });

  describe("renderInputTimeSection", function () {
    const renderCalendar = (props) =>
      mount(
        <Calendar
          dateFormat={dateFormat}
          onSelect={() => {}}
          onClickOutside={() => {}}
          hideCalendar={() => {}}
          dropdownMode="select"
          showYearDropdown
          showTimeInput
          {...props}
        />
      );
    const timeInputSelector = ".react-datepicker__input-time-container";

    it("should render InputTime component", function () {
      const calendar = renderCalendar();
      const timeInputClassname = calendar.find(timeInputSelector);
      expect(timeInputClassname).to.have.length(1);
    });

    it("should pass empty string to InputTime when no selected date", () => {
      const calendar = renderCalendar();
      const timeInputEl = calendar.find(`${timeInputSelector} input`);
      expect(timeInputEl.prop("value")).to.equal("");
    });
  });

  describe("renderYearPicker", function () {
    it("should render YearPicker component", function () {
      let calendar = mount(
        <Calendar
          dateFormat={dateFormat}
          onSelect={() => {}}
          onClickOutside={() => {}}
          hideCalendar={() => {}}
          dropdownMode="select"
          showYearPicker
        />
      );
      const timeInputClassname = calendar.find(".react-datepicker__year");
      expect(timeInputClassname).to.have.length(1);
    });

    it("calls increaseYear when next year button clicked", () => {
      var calendar = TestUtils.renderIntoDocument(
        <Calendar
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          showYearPicker
        />
      );
      calendar.state.date = utils.parseDate("09/28/1993", DATE_FORMAT);
      var increaseYear = calendar.increaseYear;
      increaseYear();
      assert.equal(utils.getYear(calendar.state.date), 2005);
    });

    it("calls decreaseYear when previous year button clicked", () => {
      var calendar = TestUtils.renderIntoDocument(
        <Calendar
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          showYearPicker
        />
      );
      calendar.state.date = utils.parseDate("09/28/1993", DATE_FORMAT);
      var decreaseYear = calendar.decreaseYear;
      decreaseYear();
      assert.equal(utils.getYear(calendar.state.date), 1981);
    });

    it("calls increaseYear for custom year item number when next year button clicked", () => {
      let calendar = TestUtils.renderIntoDocument(
        <Calendar dateFormat={DATE_FORMAT} showYearPicker yearItemNumber={10} />
      );
      calendar.state.date = utils.parseDate("09/28/1993", DATE_FORMAT);
      calendar.increaseYear();
      assert.equal(utils.getYear(calendar.state.date), 2003);
    });

    it("calls decreaseYear for custom year item number when previous year button clicked", () => {
      let calendar = TestUtils.renderIntoDocument(
        <Calendar dateFormat={DATE_FORMAT} showYearPicker yearItemNumber={10} />
      );
      calendar.state.date = utils.parseDate("09/28/1993", DATE_FORMAT);
      calendar.decreaseYear();
      assert.equal(utils.getYear(calendar.state.date), 1983);
    });
  });

  describe("when showMonthYearPicker is enabled", () => {
    let calendar = mount(
      <Calendar
        dateFormat={DATE_FORMAT}
        onSelect={() => {}}
        onClickOutside={() => {}}
        hideCalendar={() => {}}
        showMonthYearPicker
      />
    );
    it("should change the next and previous labels", () => {
      const previous = calendar.find(".react-datepicker__navigation--previous");
      const next = calendar.find(".react-datepicker__navigation--next");
      expect(previous.text()).to.equal("Previous Year");
      expect(next.text()).to.equal("Next Year");
    });

    it("should render custom next and previous labels", function () {
      var calendar = mount(
        <Calendar
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          showMonthYearPicker
          previousYearButtonLabel="Custom Previous Year Label"
          nextYearButtonLabel="Custom Next Year Label"
        />
      );
      const previous = calendar.find(".react-datepicker__navigation--previous");
      const next = calendar.find(".react-datepicker__navigation--next");
      expect(previous.text()).to.equal("Custom Previous Year Label");
      expect(next.text()).to.equal("Custom Next Year Label");
    });

    it("calls decreaseYear when previous month button clicked", () => {
      var calendar = TestUtils.renderIntoDocument(
        <Calendar
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          showMonthYearPicker
        />
      );
      calendar.state.date = utils.parseDate("09/28/1993", DATE_FORMAT);
      var decreaseYear = calendar.decreaseYear;
      decreaseYear();
      assert.equal(utils.getYear(calendar.state.date), 1992);
    });

    it("calls increaseYear when next month button clicked", () => {
      var calendar = TestUtils.renderIntoDocument(
        <Calendar
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          showMonthYearPicker
        />
      );
      calendar.state.date = utils.parseDate("09/28/1993", DATE_FORMAT);
      var increaseYear = calendar.increaseYear;
      increaseYear();
      assert.equal(utils.getYear(calendar.state.date), 1994);
    });
  });

  describe("when showQuarterYearPicker is enabled", () => {
    let calendar = mount(
      <Calendar
        dateFormat={DATE_FORMAT}
        onSelect={() => {}}
        onClickOutside={() => {}}
        hideCalendar={() => {}}
        showQuarterYearPicker
      />
    );
    it("should change the next and previous labels", () => {
      const previous = calendar.find(".react-datepicker__navigation--previous");
      const next = calendar.find(".react-datepicker__navigation--next");
      expect(previous.text()).to.equal("Previous Year");
      expect(next.text()).to.equal("Next Year");
    });

    it("should render custom next and previous labels", function () {
      var calendar = mount(
        <Calendar
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          showQuarterYearPicker
          previousYearButtonLabel="Custom Previous Year Label"
          nextYearButtonLabel="Custom Next Year Label"
        />
      );
      const previous = calendar.find(".react-datepicker__navigation--previous");
      const next = calendar.find(".react-datepicker__navigation--next");
      expect(previous.text()).to.equal("Custom Previous Year Label");
      expect(next.text()).to.equal("Custom Next Year Label");
    });

    it("calls decreaseYear when previous month button clicked", () => {
      var calendar = TestUtils.renderIntoDocument(
        <Calendar
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          showQuarterYearPicker
        />
      );
      calendar.state.date = utils.parseDate("09/28/1993", DATE_FORMAT);
      var decreaseYear = calendar.decreaseYear;
      decreaseYear();
      assert.equal(utils.getYear(calendar.state.date), 1992);
    });

    it("calls increaseYear when next month button clicked", () => {
      var calendar = TestUtils.renderIntoDocument(
        <Calendar
          dateFormat={DATE_FORMAT}
          onSelect={() => {}}
          onClickOutside={() => {}}
          showQuarterYearPicker
        />
      );
      calendar.state.date = utils.parseDate("09/28/1993", DATE_FORMAT);
      var increaseYear = calendar.increaseYear;
      increaseYear();
      assert.equal(utils.getYear(calendar.state.date), 1994);
    });
  });

  describe("using click outside", () => {
    const clickOutsideSpy = sinon.spy();
    const calendar = mount(
      <Calendar
        dateFormat={DATE_FORMAT}
        onSelect={() => {}}
        onClickOutside={clickOutsideSpy}
      />
    );

    const instance = calendar.instance();

    it("calls onClickOutside prop when handles click outside", () => {
      instance.handleClickOutside("__event__");

      assert(clickOutsideSpy.calledWith("__event__"));
    });

    it("setClickOutsideRef function returns container ref", () => {
      const ref = instance.setClickOutsideRef();

      assert.isNotNull(ref);
      assert.equal(ref, instance.containerRef.current);
    });
  });

  it("should have a next-button with the provided aria-label for year", () => {
    const ariaLabel = "A label in my native language for next year";
    const shallowCalendar = mount(
      <Calendar
        nextYearAriaLabel={ariaLabel}
        dateFormat={DATE_FORMAT}
        onSelect={() => {}}
        onClickOutside={() => {}}
        showQuarterYearPicker
      />
    );
    expect(
      shallowCalendar.html().indexOf(`aria-label="${ariaLabel}"`)
    ).not.equal(-1);
  });

  it("should have a previous-button with the provided aria-label for year", () => {
    const ariaLabel = "A label in my native language for previous year";
    const shallowCalendar = mount(
      <Calendar
        previousYearAriaLabel={ariaLabel}
        dateFormat={DATE_FORMAT}
        onSelect={() => {}}
        onClickOutside={() => {}}
        showQuarterYearPicker
      />
    );
    expect(
      shallowCalendar.html().indexOf(`aria-label="${ariaLabel}"`)
    ).not.equal(-1);
  });

  it("should have a next-button with the provided aria-label for month", () => {
    const ariaLabel = "A label in my native language for next month";
    const shallowCalendar = mount(
      <Calendar
        nextMonthAriaLabel={ariaLabel}
        dateFormat={DATE_FORMAT}
        onSelect={() => {}}
        onClickOutside={() => {}}
      />
    );
    expect(
      shallowCalendar.html().indexOf(`aria-label="${ariaLabel}"`)
    ).not.equal(-1);
  });

  it("should have a previous-button with the provided aria-label for month", () => {
    const ariaLabel = "A label in my native language for previous month";
    const shallowCalendar = mount(
      <Calendar
        previousMonthAriaLabel={ariaLabel}
        dateFormat={DATE_FORMAT}
        onSelect={() => {}}
        onClickOutside={() => {}}
      />
    );
    expect(
      shallowCalendar.html().indexOf(`aria-label="${ariaLabel}"`)
    ).not.equal(-1);
  });

  describe("changing the month also changes the preselection to preserve keyboard navigation abilities", () => {
    it("updates the preselection when you choose Next Month", () => {
      let selected = new Date();
      selected.setDate(1);
      const currentMonth = selected.getMonth();

      const datePicker = TestUtils.renderIntoDocument(
        <DatePicker selected={selected} />
      );
      const dateInput = datePicker.input;
      TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
      TestUtils.Simulate.click(
        TestUtils.findRenderedDOMComponentWithClass(
          datePicker,
          "react-datepicker__navigation--next"
        )
      );
      expect(datePicker.state.preSelection.getMonth()).to.equal(
        currentMonth === 11 ? 0 : currentMonth + 1
      );
    });
    it("updates the preselection when you choose Previous Month", () => {
      let selected = new Date();
      selected.setDate(1);
      const currentMonth = selected.getMonth();

      const datePicker = TestUtils.renderIntoDocument(
        <DatePicker selected={selected} />
      );
      const dateInput = datePicker.input;
      TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
      TestUtils.Simulate.click(
        TestUtils.findRenderedDOMComponentWithClass(
          datePicker,
          "react-datepicker__navigation--previous"
        )
      );
      expect(datePicker.state.preSelection.getMonth()).to.equal(
        currentMonth === 0 ? 11 : currentMonth - 1
      );
    });
  });

  describe("showTimeSelect", () => {
    it("should not contain the time select classname in header by default", () => {
      const calendar = getCalendar();
      const header = calendar.find(
        ".react-datepicker__header--has-time-select"
      );
      expect(header).to.have.length(0);
    });

    it("should contain the time select classname in header if enabled", () => {
      const calendar = getCalendar({ showTimeSelect: true });
      const header = calendar.find(
        ".react-datepicker__header--has-time-select"
      );
      expect(header).to.have.length(1);
    });
  });
});
