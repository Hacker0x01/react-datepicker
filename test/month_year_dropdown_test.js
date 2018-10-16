import React from "react";
import MonthYearDropdown from "../src/month_year_dropdown.jsx";
import MonthYearDropdownOptions from "../src/month_year_dropdown_options.jsx";
import { mount } from "enzyme";
import {
  newDate,
  addMonths,
  subtractMonths,
  formatDate,
  cloneDate,
  isAfter
} from "../src/date_utils";
import "dayjs/locale/es";

describe("MonthYearDropdown", () => {
  let monthYearDropdown;
  let handleChangeResult;
  const mockHandleChange = function(changeInput) {
    handleChangeResult = changeInput;
  };
  let sandbox;

  function getMonthYearDropdown(overrideProps) {
    const dateFormatCalendar = "MMMM YYYY";
    const date = newDate("2018-01");
    const minDate = newDate("2017-07-01");
    const maxDate = newDate("2018-06-30");

    return mount(
      <MonthYearDropdown
        dropdownMode="scroll"
        date={date}
        dateFormat={dateFormatCalendar}
        minDate={minDate}
        maxDate={maxDate}
        onChange={mockHandleChange}
        {...overrideProps}
      />
    );
  }

  beforeEach(() => {
    handleChangeResult = null;
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("scroll mode", () => {
    let selectedDate;
    beforeEach(function() {
      selectedDate = newDate("2018-01");
      monthYearDropdown = getMonthYearDropdown({ date: selectedDate });
    });

    it("shows the selected month year in the initial view", () => {
      const selected_month_year_name = formatDate(selectedDate, "MMMM YYYY");
      expect(monthYearDropdown.text()).to.contain(selected_month_year_name);
    });

    it("opens a list when read view is clicked", () => {
      monthYearDropdown
        .find(".react-datepicker__month-year-read-view")
        .simulate("click");
      var optionsView = monthYearDropdown.find(MonthYearDropdownOptions);
      expect(optionsView).to.exist;
    });

    it("closes the dropdown when a month year is clicked", () => {
      monthYearDropdown
        .find(".react-datepicker__month-year-read-view")
        .simulate("click");
      monthYearDropdown
        .find(".react-datepicker__month-year-option")
        .at(1)
        .simulate("click");
      expect(monthYearDropdown.find(MonthYearDropdownOptions)).to.have.length(
        0
      );
    });

    it("closes the dropdown if outside is clicked", () => {
      const date = newDate();
      const dateFormatCalendar = "MMMM YYYY";

      const onCancelSpy = sandbox.spy();
      const monthYearDropdownOptionsInstance = mount(
        <MonthYearDropdownOptions
          onCancel={onCancelSpy}
          onChange={sandbox.spy()}
          dateFormat={dateFormatCalendar}
          date={date}
          minDate={subtractMonths(cloneDate(date), 6)}
          maxDate={addMonths(cloneDate(date), 6)}
        />
      ).instance();
      monthYearDropdownOptionsInstance.handleClickOutside();
      expect(onCancelSpy.calledOnce).to.be.true;
    });

    it("does not call the supplied onChange function when the same month year is clicked", () => {
      monthYearDropdown
        .find(".react-datepicker__month-year-read-view")
        .simulate("click");

      monthYearDropdown
        .find(".react-datepicker__month-year-option")
        .at(6)
        .simulate("click");
      expect(handleChangeResult).to.be.null;
    });

    it("calls the supplied onChange function when a different month year is clicked", () => {
      const expected_date = newDate("2017-12");

      monthYearDropdown
        .find(".react-datepicker__month-year-read-view")
        .simulate("click");

      monthYearDropdown
        .find(".react-datepicker__month-year-option")
        .at(5)
        .simulate("click");
      expect(handleChangeResult.toString()).to.eq(expected_date.toString());
    });

    it("should use dateFormat to display date in dropdown", () => {
      let dropdownDateFormat = getMonthYearDropdown({
        dateFormat: "MMMM YYYY"
      });

      expect(dropdownDateFormat.text()).to.eq("January 2018");

      dropdownDateFormat = getMonthYearDropdown({ locale: "es" });

      expect(dropdownDateFormat.text()).to.eq("tammikuu 2018");

      dropdownDateFormat = getMonthYearDropdown({
        locale: "es",
        showMonthYearDropwdown: true
      });
      expect(dropdownDateFormat.text()).to.eq("tammikuu 2018");

      dropdownDateFormat = getMonthYearDropdown({
        dateFormat: "YYYY MMM",
        locale: "es"
      });
      expect(dropdownDateFormat.text()).to.eq("2018 tammi");
      dropdownDateFormat = getMonthYearDropdown({
        dateFormat: "YYYY MMM",
        locale: "es",
        showMonthYearDropwdown: true
      });
      expect(dropdownDateFormat.text()).to.eq("2018 tammi");
    });
  });

  describe("select mode", () => {
    it("renders a select", () => {
      const expected_date = newDate("2018-01");
      const currentMonth = newDate("2017-07");
      const maxMonth = newDate("2018-06");

      const expected_values = [];

      while (!isAfter(currentMonth, maxMonth)) {
        expected_values.push(currentMonth.valueOf());

        addMonths(currentMonth, 1);
      }

      monthYearDropdown = getMonthYearDropdown({ dropdownMode: "select" });
      var select = monthYearDropdown.find(
        ".react-datepicker__month-year-select"
      );
      expect(select).to.have.length(1);
      expect(select.prop("value")).to.eq(expected_date.valueOf());
      var options = select.find("option");
      expect(options.map(o => o.prop("value"))).to.eql(expected_values);
    });

    it("renders month options with default locale", () => {
      monthYearDropdown = getMonthYearDropdown({ dropdownMode: "select" });
      var options = monthYearDropdown.find("option");

      expect(options.map(o => o.text())).to.eql([
        "July 2017",
        "August 2017",
        "September 2017",
        "October 2017",
        "November 2017",
        "December 2017",
        "January 2018",
        "February 2018",
        "March 2018",
        "April 2018",
        "May 2018",
        "June 2018"
      ]);
    });

    it("renders month options with specified locale", () => {
      monthYearDropdown = getMonthYearDropdown({
        dropdownMode: "select",
        locale: "es"
      });
      var options = monthYearDropdown.find("option");
      expect(options.map(o => o.text())).to.eql([
        "Julio 2017",
        "Agosto 2017",
        "Septiembre 2017",
        "Octubre 2017",
        "Noviembre 2017",
        "Diciembre 2017",
        "Enero 2018",
        "Febrero 2018",
        "Marzo 2018",
        "Abril 2018",
        "Mayo 2018",
        "Julio 2018"
      ]);
    });

    it("does not call the supplied onChange function when the same month is clicked", () => {
      const selectedMonth = newDate("2017-11");
      monthYearDropdown = getMonthYearDropdown({
        dropdownMode: "select",
        date: selectedMonth
      });
      var select = monthYearDropdown.find(
        ".react-datepicker__month-year-select"
      );
      select.simulate("change", { target: { value: selectedMonth.valueOf() } });
      expect(handleChangeResult).to.not.exist;
    });

    it("calls the supplied onChange function when a different month is clicked", () => {
      const selectedMonth = newDate("2017-11");
      const monthToClick = newDate("2017-09");
      monthYearDropdown = getMonthYearDropdown({
        dropdownMode: "select",
        month: selectedMonth
      });
      var select = monthYearDropdown.find(
        ".react-datepicker__month-year-select"
      );
      select.simulate("change", { target: { value: monthToClick.valueOf() } });
      expect(handleChangeResult.valueOf()).to.equal(monthToClick.valueOf());
    });
  });
});
