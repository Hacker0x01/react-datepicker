import React from "react";
import range from "lodash/range";
import MonthDropdown from "../src/month_dropdown.jsx";
import MonthDropdownOptions from "../src/month_dropdown_options.jsx";
import { mount } from "enzyme";
import { newDate, getMonthInLocale, registerLocale } from "../src/date_utils";
import zh_cn from "date-fns/locale/zh-CN";
import el from "date-fns/locale/el";
import ru from "date-fns/locale/ru";

describe("MonthDropdown", () => {
  let monthDropdown;
  let handleChangeResult;
  const mockHandleChange = function(changeInput) {
    handleChangeResult = changeInput;
  };
  let sandbox;

  function getMonthDropdown(overrideProps) {
    return mount(
      <MonthDropdown
        dropdownMode="scroll"
        month={11}
        onChange={mockHandleChange}
        {...overrideProps}
      />
    );
  }

  beforeEach(() => {
    handleChangeResult = null;
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("scroll mode", () => {
    beforeEach(function() {
      monthDropdown = getMonthDropdown();
    });

    it("shows the selected month in the initial view", () => {
      expect(monthDropdown.text()).to.contain("December");
    });

    it("opens a list when read view is clicked", () => {
      monthDropdown
        .find(".react-datepicker__month-read-view")
        .simulate("click");
      var optionsView = monthDropdown.find(MonthDropdownOptions);
      expect(optionsView).to.exist;
    });

    it("applies the 'selected' modifier class to the selected month", () => {
      monthDropdown
        .find(".react-datepicker__month-read-view")
        .simulate("click");
      var selectedMonth = monthDropdown.find(
        ".react-datepicker__month-option--selected_month"
      );
      expect(selectedMonth.text()).to.contain("December");
    });

    it("closes the dropdown when a month is clicked", () => {
      monthDropdown
        .find(".react-datepicker__month-read-view")
        .simulate("click");
      monthDropdown
        .find(".react-datepicker__month-option")
        .at(1)
        .simulate("click");
      expect(monthDropdown.find(MonthDropdownOptions)).to.have.length(0);
    });

    it("closes the dropdown if outside is clicked", () => {
      const monthNames = range(0, 12).map(M => getMonthInLocale(M));
      const onCancelSpy = sandbox.spy();
      const monthDropdownOptionsInstance = mount(
        <MonthDropdownOptions
          onCancel={onCancelSpy}
          onChange={sandbox.spy()}
          month={11}
          monthNames={monthNames}
        />
      ).instance();
      monthDropdownOptionsInstance.handleClickOutside();
      expect(onCancelSpy.calledOnce).to.be.true;
    });

    it("does not call the supplied onChange function when the same month is clicked", () => {
      monthDropdown
        .find(".react-datepicker__month-read-view")
        .simulate("click");
      monthDropdown
        .find(".react-datepicker__month-option")
        .at(11)
        .simulate("click");
      expect(handleChangeResult).to.be.null;
    });

    it("calls the supplied onChange function when a different month is clicked", () => {
      monthDropdown
        .find(".react-datepicker__month-read-view")
        .simulate("click");
      monthDropdown
        .find(".react-datepicker__month-option")
        .at(2)
        .simulate("click");
      expect(handleChangeResult).to.eq(2);
    });

    it("should use locale stand-alone formatting to display month names", () => {
      registerLocale("el", el);
      registerLocale("ru", ru);

      let dropdownDateFormat = getMonthDropdown();
      expect(dropdownDateFormat.text()).to.contain("December");

      dropdownDateFormat = getMonthDropdown({ locale: "el" });
      expect(dropdownDateFormat.text()).to.contain("Δεκέμβριος");

      dropdownDateFormat = getMonthDropdown({ locale: "ru" });
      expect(dropdownDateFormat.text()).to.contain("декабрь");
    });
  });

  describe("select mode", () => {
    it("renders a select", () => {
      monthDropdown = getMonthDropdown({ dropdownMode: "select" });
      var select = monthDropdown.find(".react-datepicker__month-select");
      expect(select).to.have.length(1);
      expect(select.prop("value")).to.eq(11);
      var options = select.find("option");
      expect(options.map(o => o.prop("value"))).to.eql(range(0, 12));
    });

    it("renders month options with default locale", () => {
      monthDropdown = getMonthDropdown({ dropdownMode: "select" });
      var options = monthDropdown.find("option");
      expect(options.map(o => o.text())).to.eql([
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
        "December"
      ]);
    });
    // Short Month Names
    it("renders month options with short name and default locale", () => {
      monthDropdown = getMonthDropdown({
        dropdownMode: "select",
        useShortMonthInDropdown: true
      });
      var options = monthDropdown.find("option");
      expect(options.map(o => o.text())).to.eql([
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ]);
    });

    it("renders month options with specified locale", () => {
      registerLocale("zh-cn", zh_cn);
      monthDropdown = getMonthDropdown({
        dropdownMode: "select",
        locale: "zh-cn"
      });
      var options = monthDropdown.find("option");
      expect(options.map(o => o.text())).to.eql([
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ]);
    });

    it("does not call the supplied onChange function when the same month is clicked", () => {
      monthDropdown = getMonthDropdown({ dropdownMode: "select", month: 11 });
      var select = monthDropdown.find(".react-datepicker__month-select");
      select.simulate("change", { target: { value: 11 } });
      expect(handleChangeResult).to.not.exist;
    });

    it("calls the supplied onChange function when a different month is clicked", () => {
      monthDropdown = getMonthDropdown({ dropdownMode: "select", month: 11 });
      var select = monthDropdown.find(".react-datepicker__month-select");
      select.simulate("change", { target: { value: 9 } });
      expect(handleChangeResult).to.equal(9);
    });
  });
});
