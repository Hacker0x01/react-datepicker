import { render, fireEvent } from "@testing-library/react";
import React from "react";

import { addYears, getYear, newDate, subYears } from "../date_utils";
import YearDropdownOptions from "../year_dropdown_options";

import { safeQuerySelector, safeQuerySelectorAll } from "./test_utils";

describe("YearDropdownOptions", () => {
  let yearDropdown: HTMLElement, handleChangeResult: number;
  const mockHandleChange = function (changeInput: number) {
    handleChangeResult = changeInput;
  };
  let onCancelSpy: jest.Mock;

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
    const yearDropdownNode = yearDropdown?.querySelector("div");
    const textContents = Array.from(
      yearDropdownNode?.querySelectorAll(".react-datepicker__year-option") ??
        [],
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
      yearDropdown?.querySelectorAll(".react-datepicker__year-option") ?? [],
    ).filter((node) => node.textContent).length;
    expect(yearsListLength).toBe(11);
  });

  it("increments the available years when the 'upcoming years' button is clicked", () => {
    const navigationYearsUpcoming = safeQuerySelector(
      yearDropdown,
      ".react-datepicker__navigation--years-upcoming",
    );
    fireEvent.click(navigationYearsUpcoming);

    const textContents = Array.from(
      yearDropdown?.querySelectorAll(".react-datepicker__year-option") ?? [],
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
    const navigationYearsPrevious = safeQuerySelector(
      yearDropdown,
      ".react-datepicker__navigation--years-previous",
    );
    fireEvent.click(navigationYearsPrevious);

    const textContents = Array.from(
      yearDropdown?.querySelectorAll(".react-datepicker__year-option") ?? [],
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
    const yearOptions = safeQuerySelectorAll(
      yearDropdown,
      ".react-datepicker__year-option",
    );
    const year = yearOptions.find((node) => node.textContent?.includes("2015"));

    if (!year) {
      throw new Error("Year 2015 not found!");
    }

    fireEvent.click(year);

    expect(handleChangeResult).toBe(2015);
  });

  it("calls the supplied onCancel function on handleClickOutside", () => {
    render(
      <YearDropdownOptions
        year={2015}
        onChange={mockHandleChange}
        onCancel={onCancelSpy}
      />,
    );
    fireEvent.mouseDown(document.body);
    fireEvent.touchStart(document.body);
    expect(onCancelSpy).toHaveBeenCalledTimes(2);
  });

  it("handles Enter key to select year", () => {
    const yearOptions = safeQuerySelectorAll(
      yearDropdown,
      ".react-datepicker__year-option",
    );
    const year2014Option = yearOptions.find((node) =>
      node.textContent?.includes("2014"),
    );

    if (!year2014Option) {
      throw new Error("Year 2014 not found!");
    }

    fireEvent.keyDown(year2014Option, { key: "Enter" });
    expect(handleChangeResult).toBe(2014);
  });

  it("handles Escape key to cancel dropdown", () => {
    const yearOptions = safeQuerySelectorAll(
      yearDropdown,
      ".react-datepicker__year-option",
    );
    const year2014Option = yearOptions.find((node) =>
      node.textContent?.includes("2014"),
    );

    if (!year2014Option) {
      throw new Error("Year 2014 not found!");
    }

    fireEvent.keyDown(year2014Option, { key: "Escape" });
    expect(onCancelSpy).toHaveBeenCalled();
  });

  it("handles ArrowUp key navigation", () => {
    const yearOptions = safeQuerySelectorAll(
      yearDropdown,
      ".react-datepicker__year-option",
    );
    const year2015Option = yearOptions.find((node) =>
      node.textContent?.includes("✓2015"),
    );

    if (!year2015Option) {
      throw new Error("Year 2015 not found!");
    }

    fireEvent.keyDown(year2015Option, { key: "ArrowUp" });
    // ArrowUp should focus year 2016 (year + 1 in the code)
    expect(document.activeElement?.textContent).toContain("2016");
  });

  it("handles ArrowDown key navigation", () => {
    const yearOptions = safeQuerySelectorAll(
      yearDropdown,
      ".react-datepicker__year-option",
    );
    const year2015Option = yearOptions.find((node) =>
      node.textContent?.includes("✓2015"),
    );

    if (!year2015Option) {
      throw new Error("Year 2015 not found!");
    }

    fireEvent.keyDown(year2015Option, { key: "ArrowDown" });
    // ArrowDown should focus year 2014 (year - 1 in the code)
    expect(document.activeElement?.textContent).toContain("2014");
  });

  describe("selected", () => {
    const className = "react-datepicker__year-option--selected_year";
    let yearOptions: HTMLElement[];

    beforeEach(() => {
      yearOptions = Array.from(
        yearDropdown?.querySelectorAll(".react-datepicker__year-option") ?? [],
      );
    });

    describe("if selected", () => {
      let selectedYearOption: HTMLElement;
      beforeEach(() => {
        selectedYearOption = yearOptions.find((o) =>
          o.classList.contains(className),
        )!;
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
      let selectedYearOption: HTMLElement;
      beforeEach(() => {
        selectedYearOption = yearOptions.find(
          (o) => !o.classList.contains(className),
        )!;
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
    const minDate = newDate();
    const maxDate = addYears(newDate(), 1);
    const { container } = render(
      <YearDropdownOptions
        onCancel={onCancelSpy}
        onChange={onChangeSpy}
        scrollableYearDropdown
        year={getYear(newDate())}
        minDate={minDate}
        maxDate={maxDate}
      />,
    );
    const yearsList = Array.from(
      container.querySelectorAll(".react-datepicker__year-option"),
    )
      .filter((node) => node.textContent)
      .map((node) => node.textContent?.replace("✓", ""));

    expect(yearsList.length).toBe(2);
    expect(yearsList).toContain(`${getYear(minDate)}`);
    expect(yearsList).toContain(`${getYear(maxDate)}`);
  });

  it("should hide arrows to add years, if not between minDate and maxDate", () => {
    const onCancelSpy = jest.fn();
    const onChangeSpy = jest.fn();
    const minDate = newDate();
    const maxDate = addYears(newDate(), 1);
    const { container } = render(
      <YearDropdownOptions
        onCancel={onCancelSpy}
        onChange={onChangeSpy}
        scrollableYearDropdown
        year={getYear(newDate())}
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
    const minDate = subYears(newDate(), 11);
    const maxDate = addYears(newDate(), 11);
    const { container } = render(
      <YearDropdownOptions
        onCancel={onCancelSpy}
        onChange={onChangeSpy}
        scrollableYearDropdown
        year={getYear(newDate())}
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
      textContents.find(
        (year) => parseInt(year.textContent ?? "") === getYear(minDate),
      ),
    ).toBeUndefined();
    expect(
      textContents.find(
        (year) => parseInt(year.textContent ?? "") === getYear(maxDate),
      ),
    ).toBeUndefined();

    const navigationYearsPrevious = safeQuerySelector(
      container,
      ".react-datepicker__navigation--years-previous",
    );
    fireEvent.click(navigationYearsPrevious);

    textContents = Array.from(
      container.querySelectorAll(".react-datepicker__year-option"),
    ).filter((node) => node.textContent);

    const x = textContents.find(
      (year) => parseInt(year.textContent ?? "") === getYear(minDate),
    );
    expect(x).not.toBeUndefined();
    expect(
      textContents.find(
        (year) => parseInt(year.textContent ?? "") === getYear(maxDate),
      ),
    ).toBeUndefined();
    expect(
      container.querySelectorAll(
        ".react-datepicker__navigation--years-previous",
      ).length,
    ).toBe(0);

    const navigationYearsUpcoming = safeQuerySelector(
      container,
      ".react-datepicker__navigation--years-upcoming",
    );
    fireEvent.click(navigationYearsUpcoming);

    textContents = Array.from(
      container.querySelectorAll(".react-datepicker__year-option"),
    ).filter((node) => node.textContent);

    expect(
      textContents.find(
        (year) => parseInt(year.textContent ?? "") === getYear(minDate),
      ),
    ).toBeUndefined();
    expect(
      textContents.find(
        (year) => parseInt(year.textContent ?? "") === getYear(maxDate),
      ),
    ).toBeUndefined();
  });

  it("should show arrows to add previous years, if actual years list does not contain minDate year, if only minDate is provided", () => {
    const onCancelSpy = jest.fn();
    const onChangeSpy = jest.fn();
    const minDate = subYears(newDate(), 11);
    const { container } = render(
      <YearDropdownOptions
        onCancel={onCancelSpy}
        onChange={onChangeSpy}
        scrollableYearDropdown
        year={getYear(newDate())}
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
      textContents.find(
        (year) => parseInt(year.textContent ?? "") === getYear(minDate),
      ),
    ).toBeUndefined();

    const navigationYearsPrevious = safeQuerySelector(
      container,
      ".react-datepicker__navigation--years-previous",
    );
    fireEvent.click(navigationYearsPrevious);

    textContents = Array.from(
      container.querySelectorAll(".react-datepicker__year-option"),
    ).filter((node) => node.textContent);

    expect(
      textContents.find(
        (year) => parseInt(year.textContent ?? "") === getYear(minDate),
      ),
    ).not.toBeUndefined();
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
    const maxDate = addYears(newDate(), 11);
    const { container } = render(
      <YearDropdownOptions
        onCancel={onCancelSpy}
        onChange={onChangeSpy}
        scrollableYearDropdown
        year={getYear(newDate())}
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
      textContents.find(
        (year) => parseInt(year.textContent ?? "") === getYear(maxDate),
      ),
    ).toBeUndefined();

    const navigationYearsUpcoming = safeQuerySelector(
      container,
      ".react-datepicker__navigation--years-upcoming",
    );
    fireEvent.click(navigationYearsUpcoming);

    textContents = Array.from(
      container.querySelectorAll(".react-datepicker__year-option"),
    ).filter((node) => node.textContent);

    expect(
      textContents.find(
        (year) => parseInt(year.textContent ?? "") === getYear(maxDate),
      ),
    ).not.toBeUndefined();
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
    let instance: YearDropdownOptions | null;
    render(
      <YearDropdownOptions
        ref={(node) => {
          instance = node;
        }}
        onCancel={onCancelSpy}
        onChange={onChangeSpy}
        scrollableYearDropdown
        year={2015}
        yearDropdownItemNumber={25}
      />,
    );

    (
      instance!.dropdownRef as { current: Record<string, number> | null }
    ).current = {
      scrollHeight: 800,
      clientHeight: 400,
    };
    instance!.componentDidMount();
    expect(instance!.dropdownRef.current!.scrollTop).toBe(200);
  });
});
