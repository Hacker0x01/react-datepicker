import React from "react";
import YearDropdownOptions from "../src/year_dropdown_options.jsx";
import { mount } from "enzyme";
import { render, fireEvent } from "@testing-library/react";
import * as utils from "../src/date_utils.js";
import onClickOutside from "react-onclickoutside";

describe("YearDropdownOptions", () => {
  let yearDropdown, handleChangeResult;
  const mockHandleChange = function (changeInput) {
    handleChangeResult = changeInput;
  };
  let onCancelSpy;

  beforeEach(() => {
    onCancelSpy = jest.fn();
    yearDropdown = render(
      <YearDropdownOptions
        year={2015}
        onChange={mockHandleChange}
        onCancel={onCancelSpy}
      />,
    ).container;
  });

  it("shows the available years in the initial view", () => {
    const yearDropdownNode = yearDropdown.querySelector("div");
    const textContents = Array.from(
      yearDropdownNode.querySelectorAll(".react-datepicker__year-option"),
    ).map((node) => node.textContent);

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
    const yearsListLength = Array.from(
      yearDropdown.querySelectorAll(".react-datepicker__year-option"),
    ).filter((node) => node.textContent).length;
    expect(yearsListLength).toBe(11);
  });

  it("increments the available years when the 'upcoming years' button is clicked", () => {
    fireEvent.click(
      yearDropdown.querySelector(
        ".react-datepicker__navigation--years-upcoming",
      ),
    );

    const textContents = Array.from(
      yearDropdown.querySelectorAll(".react-datepicker__year-option"),
    ).map((node) => node.textContent);

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
    fireEvent.click(
      yearDropdown.querySelector(
        ".react-datepicker__navigation--years-previous",
      ),
    );

    const textContents = Array.from(
      yearDropdown.querySelectorAll(".react-datepicker__year-option"),
    ).map((node) => node.textContent);

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
    fireEvent.click(
      Array.from(
        yearDropdown.querySelectorAll(".react-datepicker__year-option"),
      ).find((node) => node.textContent.includes("2015")),
    );

    expect(handleChangeResult).toBe(2015);
  });

  it("calls the supplied onCancel function on handleClickOutside", () => {
    const WrappedYearDropdownOptions = onClickOutside(YearDropdownOptions)
    render(
      <WrappedYearDropdownOptions
        year={2015}
        onChange={mockHandleChange}
        onCancel={onCancelSpy}
      />
    );
    fireEvent.mouseDown(document.body)
    fireEvent.touchStart(document.body)
    expect(onCancelSpy).toHaveBeenCalledTimes(2);
  });

  describe("selected", () => {
    const className = "react-datepicker__year-option--selected_year";
    let yearOptions;

    beforeEach(() => {
      yearOptions = Array.from(
        yearDropdown.querySelectorAll(".react-datepicker__year-option"),
      );
    });

    describe("if selected", () => {
      let selectedYearOption;
      beforeEach(() => {
        selectedYearOption = yearOptions.find((o) =>
          o.classList.contains(className),
        );
      });
      it("should apply the selected class", () => {
        expect(selectedYearOption.classList.contains(className)).toBe(true);
      });

      it("should add aria-selected property with the value of true", () => {
        const ariaSelected = selectedYearOption.getAttribute("aria-selected");
        expect(ariaSelected).toBe("true");
      });
    });

    describe("if not selected", () => {
      let selectedYearOption;
      beforeEach(() => {
        selectedYearOption = yearOptions.find(
          (o) => !o.classList.contains(className),
        );
      });
      it("should not apply the selected class", () => {
        expect(selectedYearOption.classList.contains(className)).toBe(false);
      });

      it("should not add aria-selected property with the value of true", () => {
        const ariaSelected = selectedYearOption.getAttribute("aria-selected");
        expect(ariaSelected).toBeNull();
      });
    });
  });
});

describe("YearDropdownOptions with scrollable dropwdown", () => {
  it("should show upcoming and previous links and generate 10 years if prop scrollableYearDropdown is true", () => {
    const onCancelSpy = jest.fn();
    const onChangeSpy = jest.fn();
    const { container } = render(
      <YearDropdownOptions
        onCancel={onCancelSpy}
        onChange={onChangeSpy}
        scrollableYearDropdown
        year={2015}
      />,
    );
    expect(
      Array.from(
        container.querySelectorAll(".react-datepicker__year-option"),
      ).filter((node) => node.textContent).length,
    ).toBe(21);
    expect(
      container.querySelectorAll(
        ".react-datepicker__navigation--years-upcoming",
      ).length,
    ).toBe(1);
    expect(
      container.querySelectorAll(
        ".react-datepicker__navigation--years-previous",
      ).length,
    ).toBe(1);
  });

  it("should generate years between minDate and maxDate if prop scrollableYearDropdown is true", () => {
    const onCancelSpy = jest.fn();
    const onChangeSpy = jest.fn();
    const minDate = utils.newDate();
    const maxDate = utils.addYears(utils.newDate(), 1);
    const { container } = render(
      <YearDropdownOptions
        onCancel={onCancelSpy}
        onChange={onChangeSpy}
        scrollableYearDropdown
        year={utils.getYear(utils.newDate())}
        minDate={minDate}
        maxDate={maxDate}
      />,
    );
    const yearsList = Array.from(
      container.querySelectorAll(".react-datepicker__year-option"),
    )
      .filter((node) => node.textContent)
      .map((node) => node.textContent.replace("✓", ""));

    expect(yearsList.length).toBe(2);
    expect(yearsList).toContain(`${utils.getYear(minDate)}`);
    expect(yearsList).toContain(`${utils.getYear(maxDate)}`);
  });

  it("should hide arrows to add years, if not between minDate and maxDate", () => {
    const onCancelSpy = jest.fn();
    const onChangeSpy = jest.fn();
    const minDate = utils.newDate();
    const maxDate = utils.addYears(utils.newDate(), 1);
    const { container } = render(
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
      container.querySelectorAll(
        ".react-datepicker__navigation--years-upcoming",
      ).length,
    ).toBe(0);
    expect(
      container.querySelectorAll(
        ".react-datepicker__navigation--years-previous",
      ).length,
    ).toBe(0);
  });

  it("should show arrows to add years, if actual years list contains years between minDate and maxDate", () => {
    const onCancelSpy = jest.fn();
    const onChangeSpy = jest.fn();
    const minDate = utils.subYears(utils.newDate(), 11);
    const maxDate = utils.addYears(utils.newDate(), 11);
    const { container } = render(
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
      container.querySelectorAll(
        ".react-datepicker__navigation--years-previous",
      ).length,
    ).toBe(1);
    expect(
      container.querySelectorAll(
        ".react-datepicker__navigation--years-upcoming",
      ).length,
    ).toBe(1);

    let textContents = Array.from(
      container.querySelectorAll(".react-datepicker__year-option"),
    ).filter((node) => node.textContent);

    expect(
      textContents.find((year) => year === utils.getYear(minDate)),
    ).toBeUndefined();
    expect(
      textContents.find((year) => year === utils.getYear(maxDate)),
    ).toBeUndefined();

    fireEvent.click(
      container.querySelector(".react-datepicker__navigation--years-previous"),
    );

    textContents = Array.from(
      container.querySelectorAll(".react-datepicker__year-option"),
    ).filter((node) => node.textContent);

    const x = textContents.find((year) => year === utils.getYear(minDate));
    expect(x).toBeUndefined();
    expect(
      textContents.find((year) => year === utils.getYear(maxDate)),
    ).toBeUndefined();
    expect(
      container.querySelectorAll(
        ".react-datepicker__navigation--years-previous",
      ).length,
    ).toBe(0);

    fireEvent.click(
      container.querySelector(".react-datepicker__navigation--years-upcoming"),
    );
    textContents = Array.from(
      container.querySelectorAll(".react-datepicker__year-option"),
    ).filter((node) => node.textContent);
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
    const { container } = render(
      <YearDropdownOptions
        onCancel={onCancelSpy}
        onChange={onChangeSpy}
        scrollableYearDropdown
        year={utils.getYear(utils.newDate())}
        minDate={minDate}
      />,
    );

    expect(
      container.querySelectorAll(
        ".react-datepicker__navigation--years-previous",
      ).length,
    ).toBe(1);
    expect(
      container.querySelectorAll(
        ".react-datepicker__navigation--years-upcoming",
      ).length,
    ).toBe(1);

    let textContents = Array.from(
      container.querySelectorAll(".react-datepicker__year-option"),
    ).filter((node) => node.textContent);

    expect(
      textContents.find((year) => year === utils.getYear(minDate)),
    ).toBeUndefined();

    fireEvent.click(
      container.querySelector(".react-datepicker__navigation--years-previous"),
    );

    textContents = Array.from(
      container.querySelectorAll(".react-datepicker__year-option"),
    ).filter((node) => node.textContent);

    expect(
      textContents.find((year) => year === utils.getYear(minDate)),
    ).toBeUndefined();
    expect(
      container.querySelectorAll(
        ".react-datepicker__navigation--years-upcoming",
      ).length,
    ).toBe(1);
    expect(
      container.querySelectorAll(
        ".react-datepicker__navigation--years-previous",
      ).length,
    ).toBe(0);
  });

  it("should show arrows to add upcoming years, if actual years list does not contain maxDate year, if only maxDate is provided", () => {
    const onCancelSpy = jest.fn();
    const onChangeSpy = jest.fn();
    const maxDate = utils.addYears(utils.newDate(), 11);
    const { container } = render(
      <YearDropdownOptions
        onCancel={onCancelSpy}
        onChange={onChangeSpy}
        scrollableYearDropdown
        year={utils.getYear(utils.newDate())}
        maxDate={maxDate}
      />,
    );

    expect(
      container.querySelectorAll(
        ".react-datepicker__navigation--years-previous",
      ).length,
    ).toBe(1);
    expect(
      container.querySelectorAll(
        ".react-datepicker__navigation--years-upcoming",
      ).length,
    ).toBe(1);

    let textContents = Array.from(
      container.querySelectorAll(".react-datepicker__year-option"),
    ).filter((node) => node.textContent);

    expect(
      textContents.find((year) => year === utils.getYear(maxDate)),
    ).toBeUndefined();

    fireEvent.click(
      container.querySelector(".react-datepicker__navigation--years-upcoming"),
    );

    textContents = Array.from(
      container.querySelectorAll(".react-datepicker__year-option"),
    ).filter((node) => node.textContent);

    expect(
      textContents.find((year) => year === utils.getYear(maxDate)),
    ).toBeUndefined();
    expect(
      container.querySelectorAll(
        ".react-datepicker__navigation--years-upcoming",
      ).length,
    ).toBe(0);
    expect(
      container.querySelectorAll(
        ".react-datepicker__navigation--years-previous",
      ).length,
    ).toBe(1);
  });

  it("should generate 25 years (25 above, 25 below selected) if prop yearDropdownItemNumber is set to 25", () => {
    const onCancelSpy = jest.fn();
    const onChangeSpy = jest.fn();
    const { container } = render(
      <YearDropdownOptions
        onCancel={onCancelSpy}
        onChange={onChangeSpy}
        scrollableYearDropdown
        year={2015}
        yearDropdownItemNumber={25}
      />,
    );

    const yearsList = Array.from(
      container.querySelectorAll(".react-datepicker__year-option"),
    ).filter((node) => node.textContent);
    expect(yearsList.length).toBe(51);
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
