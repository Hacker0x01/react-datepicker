import React from "react";
import YearDropdownOptions from "../src/year_dropdown_options.jsx";
import { mount, shallow } from "enzyme";
import * as utils from "../src/date_utils.js";

describe("YearDropdownOptions", () => {
  let yearDropdown, handleChangeResult;
  const mockHandleChange = function (changeInput) {
    handleChangeResult = changeInput;
  };
  let onCancelSpy;

  beforeEach(() => {
    onCancelSpy = jest.fn();
    yearDropdown = mount(
      <YearDropdownOptions
        year={2015}
        onChange={mockHandleChange}
        onCancel={onCancelSpy}
      />,
    );
  });

  it("shows the available years in the initial view", () => {
    const yearDropdownNode = yearDropdown.find("div");
    const textContents = yearDropdownNode
      .find(".react-datepicker__year-option")
      .map((node) => node.text());

    expect(textContents).toEqual(
      expect.arrayContaining([
        "",
        "2020",
        "2019",
        "2018",
        "2017",
        "2016",
        "✓2015",
        "2014",
        "2013",
        "2012",
        "2011",
        "2010",
        "",
      ]),
    );
  });

  it("generate 10 years, 5 below and 5 above the selected one, if prop scrollableYearDropdown is false", () => {
    const yearsListLength = yearDropdown.state().yearsList.length;
    expect(yearsListLength).toBe(11);
  });

  it("increments the available years when the 'upcoming years' button is clicked", () => {
    yearDropdown
      .find(".react-datepicker__navigation--years-upcoming")
      .simulate("click");

    const textContents = yearDropdown
      .find(".react-datepicker__year-option")
      .map((node) => node.text());

    expect(textContents).toEqual(
      expect.arrayContaining([
        "",
        "2021",
        "2020",
        "2019",
        "2018",
        "2017",
        "2016",
        "✓2015",
        "2014",
        "2013",
        "2012",
        "2011",
        "",
      ]),
    );
  });

  it("decrements the available years when the 'previous years' button is clicked", () => {
    yearDropdown
      .find(".react-datepicker__navigation--years-previous")
      .simulate("click");

    const textContents = yearDropdown
      .find(".react-datepicker__year-option")
      .map((node) => node.text());

    expect(textContents).toEqual(
      expect.arrayContaining([
        "",
        "2019",
        "2018",
        "2017",
        "2016",
        "✓2015",
        "2014",
        "2013",
        "2012",
        "2011",
        "2010",
        "2009",
        "",
      ]),
    );
  });

  it("calls the supplied onChange function when a year is clicked", () => {
    yearDropdown
      .find(".react-datepicker__year-option")
      .filterWhere((e) => e.text().includes("2015"))
      .simulate("click");
    expect(handleChangeResult).toBe(2015);
  });

  it("calls the supplied onCancel function on handleClickOutside", () => {
    const instance = yearDropdown.instance();
    instance.handleClickOutside();
    expect(onCancelSpy).toBeCalled();
  });

  describe("selected", () => {
    const className = "react-datepicker__year-option--selected_year";
    let yearOptions;

    beforeEach(() => {
      yearOptions = yearDropdown.find(".react-datepicker__year-option");
    });

    describe("if selected", () => {
      let selectedYearOption;
      beforeEach(() => {
        selectedYearOption = yearOptions.filterWhere((o) =>
          o.hasClass(className),
        );
      });
      it("should apply the selected class", () => {
        expect(selectedYearOption.hasClass(className)).toBe(true);
      });

      it("should add aria-selected property with the value of true", () => {
        const ariaSelected = selectedYearOption.prop("aria-selected");
        expect(ariaSelected).toBe("true");
      });
    });

    describe("if not selected", () => {
      let selectedYearOption;
      beforeEach(() => {
        selectedYearOption = yearOptions
          .filterWhere((o) => !o.hasClass(className))
          .at(0);
      });
      it("should not apply the selected class", () => {
        expect(selectedYearOption.hasClass(className)).toBe(false);
      });

      it("should not add aria-selected property with the value of true", () => {
        const ariaSelected = selectedYearOption.prop("aria-selected");
        expect(ariaSelected).toBeUndefined();
      });
    });
  });
});

describe("YearDropdownOptions with scrollable dropwdown", () => {
  it("should show upcoming and previous links and generate 10 years if prop scrollableYearDropdown is true", () => {
    const onCancelSpy = jest.fn();
    const onChangeSpy = jest.fn();
    const yearDropdown = shallow(
      <YearDropdownOptions
        onCancel={onCancelSpy}
        onChange={onChangeSpy}
        scrollableYearDropdown
        year={2015}
      />,
    );
    expect(yearDropdown.state().yearsList.length).toBe(21);
    expect(
      yearDropdown.find(".react-datepicker__navigation--years-upcoming").length,
    ).toBe(1);
    expect(
      yearDropdown.find(".react-datepicker__navigation--years-previous").length,
    ).toBe(1);
  });

  it("should generate years between minDate and maxDate if prop scrollableYearDropdown is true", () => {
    const onCancelSpy = jest.fn();
    const onChangeSpy = jest.fn();
    const minDate = utils.newDate();
    const maxDate = utils.addYears(utils.newDate(), 1);
    const yearDropdown = shallow(
      <YearDropdownOptions
        onCancel={onCancelSpy}
        onChange={onChangeSpy}
        scrollableYearDropdown
        year={utils.getYear(utils.newDate())}
        minDate={minDate}
        maxDate={maxDate}
      />,
    );
    expect(yearDropdown.state().yearsList.length).toBe(2);
    expect(yearDropdown.state().yearsList).toContain(utils.getYear(minDate));
    expect(yearDropdown.state().yearsList).toContain(utils.getYear(maxDate));
  });

  it("should hide arrows to add years, if not between minDate and maxDate", () => {
    const onCancelSpy = jest.fn();
    const onChangeSpy = jest.fn();
    const minDate = utils.newDate();
    const maxDate = utils.addYears(utils.newDate(), 1);
    const yearDropdown = mount(
      <YearDropdownOptions
        onCancel={onCancelSpy}
        onChange={onChangeSpy}
        scrollableYearDropdown
        year={utils.getYear(utils.newDate())}
        minDate={minDate}
        maxDate={maxDate}
      />,
    );

    expect(
      yearDropdown.find(".react-datepicker__navigation--years-upcoming").length,
    ).toBe(0);
    expect(
      yearDropdown.find(".react-datepicker__navigation--years-previous").length,
    ).toBe(0);
  });

  it("should show arrows to add years, if actual years list contains years between minDate and maxDate", () => {
    const onCancelSpy = jest.fn();
    const onChangeSpy = jest.fn();
    const minDate = utils.subYears(utils.newDate(), 11);
    const maxDate = utils.addYears(utils.newDate(), 11);
    const yearDropdown = mount(
      <YearDropdownOptions
        onCancel={onCancelSpy}
        onChange={onChangeSpy}
        scrollableYearDropdown
        year={utils.getYear(utils.newDate())}
        minDate={minDate}
        maxDate={maxDate}
      />,
    );

    expect(
      yearDropdown.find(".react-datepicker__navigation--years-previous").length,
    ).toBe(1);
    expect(
      yearDropdown.find(".react-datepicker__navigation--years-upcoming").length,
    ).toBe(1);

    let textContents = yearDropdown
      .find(".react-datepicker__year-option")
      .map((node) => node.text());

    expect(
      textContents.find((year) => year === utils.getYear(minDate)),
    ).toBeUndefined();
    expect(
      textContents.find((year) => year === utils.getYear(maxDate)),
    ).toBeUndefined();

    yearDropdown
      .find(".react-datepicker__navigation--years-previous")
      .simulate("click");
    textContents = yearDropdown
      .find(".react-datepicker__year-option")
      .map((node) => node.text());
    const x = textContents.find((year) => year === utils.getYear(minDate));
    expect(x).toBeUndefined();
    expect(
      textContents.find((year) => year === utils.getYear(maxDate)),
    ).toBeUndefined();
    expect(
      yearDropdown.find(".react-datepicker__navigation--years-previous").length,
    ).toBe(0);

    yearDropdown
      .find(".react-datepicker__navigation--years-upcoming")
      .simulate("click");
    textContents = yearDropdown
      .find(".react-datepicker__year-option")
      .map((node) => node.text());
    expect(
      textContents.find((year) => year === utils.getYear(minDate)),
    ).toBeUndefined();
    expect(
      textContents.find((year) => year === utils.getYear(maxDate)),
    ).toBeUndefined();
  });

  it("should show arrows to add previous years, if actual years list does not contain minDate year, if only minDate is provided", () => {
    const onCancelSpy = jest.fn();
    const onChangeSpy = jest.fn();
    const minDate = utils.subYears(utils.newDate(), 11);
    const yearDropdown = mount(
      <YearDropdownOptions
        onCancel={onCancelSpy}
        onChange={onChangeSpy}
        scrollableYearDropdown
        year={utils.getYear(utils.newDate())}
        minDate={minDate}
      />,
    );

    expect(
      yearDropdown.find(".react-datepicker__navigation--years-previous").length,
    ).toBe(1);
    expect(
      yearDropdown.find(".react-datepicker__navigation--years-upcoming").length,
    ).toBe(1);

    let textContents = yearDropdown
      .find(".react-datepicker__year-option")
      .map((node) => node.text());

    expect(
      textContents.find((year) => year === utils.getYear(minDate)),
    ).toBeUndefined();

    yearDropdown
      .find(".react-datepicker__navigation--years-previous")
      .simulate("click");

    textContents = yearDropdown
      .find(".react-datepicker__year-option")
      .map((node) => node.text());
    expect(
      textContents.find((year) => year === utils.getYear(minDate)),
    ).toBeUndefined();
    expect(
      yearDropdown.find(".react-datepicker__navigation--years-upcoming").length,
    ).toBe(1);
    expect(
      yearDropdown.find(".react-datepicker__navigation--years-previous").length,
    ).toBe(0);
  });

  it("should show arrows to add upcoming years, if actual years list does not contain maxDate year, if only maxDate is provided", () => {
    const onCancelSpy = jest.fn();
    const onChangeSpy = jest.fn();
    const maxDate = utils.addYears(utils.newDate(), 11);
    const yearDropdown = mount(
      <YearDropdownOptions
        onCancel={onCancelSpy}
        onChange={onChangeSpy}
        scrollableYearDropdown
        year={utils.getYear(utils.newDate())}
        maxDate={maxDate}
      />,
    );

    expect(
      yearDropdown.find(".react-datepicker__navigation--years-previous").length,
    ).toBe(1);
    expect(
      yearDropdown.find(".react-datepicker__navigation--years-upcoming").length,
    ).toBe(1);

    let textContents = yearDropdown
      .find(".react-datepicker__year-option")
      .map((node) => node.text());

    expect(
      textContents.find((year) => year === utils.getYear(maxDate)),
    ).toBeUndefined();

    yearDropdown
      .find(".react-datepicker__navigation--years-upcoming")
      .simulate("click");

    textContents = yearDropdown
      .find(".react-datepicker__year-option")
      .map((node) => node.text());

    expect(
      textContents.find((year) => year === utils.getYear(maxDate)),
    ).toBeUndefined();
    expect(
      yearDropdown.find(".react-datepicker__navigation--years-upcoming").length,
    ).toBe(0);
    expect(
      yearDropdown.find(".react-datepicker__navigation--years-previous").length,
    ).toBe(1);
  });

  it("should generate 25 years (25 above, 25 below selected) if prop yearDropdownItemNumber is set to 25", () => {
    const onCancelSpy = jest.fn();
    const onChangeSpy = jest.fn();
    const yearDropdown = shallow(
      <YearDropdownOptions
        onCancel={onCancelSpy}
        onChange={onChangeSpy}
        scrollableYearDropdown
        year={2015}
        yearDropdownItemNumber={25}
      />,
    );
    expect(yearDropdown.state().yearsList.length).toBe(51);
  });

  it("should scroll year dropdown to the middle on open", () => {
    const onCancelSpy = jest.fn();
    const onChangeSpy = jest.fn();
    const yearDropdownInstance = mount(
      <YearDropdownOptions
        onCancel={onCancelSpy}
        onChange={onChangeSpy}
        scrollableYearDropdown
        year={2015}
        yearDropdownItemNumber={25}
      />,
    ).instance();

    yearDropdownInstance.dropdownRef.current = {
      scrollHeight: 800,
      clientHeight: 400,
    };
    yearDropdownInstance.componentDidMount();
    expect(yearDropdownInstance.dropdownRef.current.scrollTop).toBe(200);
  });
});
