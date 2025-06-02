import { render, fireEvent } from "@testing-library/react";
import React from "react";

import {
  DEFAULT_YEAR_ITEM_NUMBER,
  KeyType,
  formatDate,
  getStartOfYear,
  getYear,
  getYearsPeriod,
  newDate,
  setYear,
} from "../date_utils";
import DatePicker from "../index";
import Year from "../year";

import {
  getKey,
  gotoNextView,
  openDateInput,
  SafeElementWrapper,
  safeQuerySelector,
  safeQuerySelectorAll,
} from "./test_utils";

const getYearOffset = (calendar: Element, date: Date): number => {
  const dateNode = calendar.querySelector(
    `.react-datepicker__year-text.react-datepicker__year-${date.getFullYear()}`,
  )!;
  const yearPicker = calendar.querySelector(".react-datepicker__year-wrapper")!;
  return Array.from(yearPicker.children).indexOf(dateNode);
};

describe("YearPicker", () => {
  it("should show year picker component when showYearPicker prop is present", () => {
    const { container } = render(<DatePicker showYearPicker open />);
    const year = container.querySelector(".react-datepicker__year");
    expect(year).not.toBeNull();
  });

  it("should show year picker component with default year item number", () => {
    const { container } = render(
      <Year
        date={new Date()}
        onYearMouseEnter={() => {}}
        onYearMouseLeave={() => {}}
      />,
    );
    const yearItems = container.querySelectorAll(
      ".react-datepicker__year-text",
    );
    expect(yearItems.length).toBe(DEFAULT_YEAR_ITEM_NUMBER);
  });

  it("should show year picker component with specific year item number", () => {
    const yearItemNumber = 9;
    const { container } = render(
      <Year
        date={new Date()}
        yearItemNumber={yearItemNumber}
        onYearMouseEnter={() => {}}
        onYearMouseLeave={() => {}}
      />,
    );
    const yearItems = container.querySelectorAll(
      ".react-datepicker__year-text",
    );
    expect(yearItems.length).toBe(yearItemNumber);
  });

  it("should change the year when clicked on any option in the picker", () => {
    const onYearChangeSpy = jest.fn();
    const { container } = render(
      <Year
        onDayClick={onYearChangeSpy}
        date={new Date("2020-05-05")}
        onYearMouseEnter={() => {}}
        onYearMouseLeave={() => {}}
      />,
    );

    const minRequiredYearLen = 2;
    const yearDivs = safeQuerySelectorAll(
      container,
      ".react-datepicker__year-text",
      minRequiredYearLen,
    );

    const firstYearDiv = yearDivs[1]!;
    fireEvent.click(firstYearDiv);
    expect(onYearChangeSpy).toHaveBeenCalled();
  });

  it("should has selected class when element of array equal of choosen year", () => {
    const date = new Date("2015-01-01");
    const { container } = render(
      <Year
        selected={date}
        date={date}
        onYearMouseEnter={() => {}}
        onYearMouseLeave={() => {}}
      />,
    );
    const year = container.querySelectorAll(
      ".react-datepicker__year-text--selected",
    )[0]?.textContent;
    expect(year).toBe(getYear(date).toString());
  });

  it("should has selected class applied for all the selectedDates when selectsMultiple is set", () => {
    const selectedDates = [new Date("2025-01-01"), new Date("2026-01-01")];
    const { container } = render(
      <Year
        selectsMultiple
        selectedDates={selectedDates}
        date={selectedDates[0]}
        onYearMouseEnter={() => {}}
        onYearMouseLeave={() => {}}
      />,
    );
    const yearElements = Array.from(
      container.querySelectorAll(".react-datepicker__year-text--selected"),
    );

    expect(yearElements.length).toBe(selectedDates.length);

    const isSelectedDatesHighlighted = yearElements.every((yearElement) => {
      const yearValue = yearElement?.textContent;
      return selectedDates.some(
        (selectedDate) => getYear(selectedDate).toString() === yearValue,
      );
    });
    expect(isSelectedDatesHighlighted).toBe(true);
  });

  it("should not has selected class where there is no selectedDates when selectsMultiple is set", () => {
    const { container } = render(
      <Year
        selectsMultiple
        date={new Date()}
        onYearMouseEnter={() => {}}
        onYearMouseLeave={() => {}}
      />,
    );
    const yearElements = Array.from(
      container.querySelectorAll(".react-datepicker__year-text--selected"),
    );
    expect(yearElements.length).toBe(0);
  });

  it("should not has selected class where there is no selectedDates", () => {
    const { container } = render(
      <Year
        date={new Date()}
        onYearMouseEnter={() => {}}
        onYearMouseLeave={() => {}}
      />,
    );
    const yearElements = Array.from(
      container.querySelectorAll(".react-datepicker__year-text--selected"),
    );
    expect(yearElements.length).toBe(0);
  });

  it("should have current year class when element of array equal of current year", () => {
    const date = new Date();
    const { container } = render(
      <Year
        date={date}
        onYearMouseEnter={() => {}}
        onYearMouseLeave={() => {}}
      />,
    );
    const year = container.querySelector(
      ".react-datepicker__year-text--today",
    )?.textContent;
    expect(year).toBe(getYear(date).toString());
  });

  it("should have aria-current date when element of array equal to current year", () => {
    const date = new Date();
    const { container } = render(
      <Year
        date={date}
        onYearMouseEnter={() => {}}
        onYearMouseLeave={() => {}}
      />,
    );
    const ariaCurrent = container
      .querySelector(".react-datepicker__year-text--today")
      ?.getAttribute("aria-current");

    expect(ariaCurrent).toBe("date");
  });

  it("should not have aria-current date when element of array does not equal current year", () => {
    const date = new Date("2015-01-01");
    const { container } = render(
      <Year
        date={date}
        onYearMouseEnter={() => {}}
        onYearMouseLeave={() => {}}
      />,
    );
    const ariaCurrent = container
      .querySelector(".react-datepicker__year-text")
      ?.getAttribute("aria-current");
    expect(ariaCurrent).toBeNull();
  });

  it("should return disabled class if current date is out of bound of minDate and maxDate", () => {
    const { container } = render(
      <Year
        date={newDate("2020-01-01")}
        minDate={newDate("2018-01-01")}
        maxDate={newDate("2025-01-01")}
        onYearMouseEnter={() => {}}
        onYearMouseLeave={() => {}}
      />,
    );
    const year = container.querySelector(".react-datepicker__year-text");
    expect(
      year?.classList.contains("react-datepicker__year-text--disabled"),
    ).toBe(true);
  });

  it("should not return disabled class if current date is before minDate but same year", () => {
    const date = newDate("2023-01-01");
    const { container } = render(
      <Year
        date={date}
        minDate={newDate("2023-12-31")}
        onYearMouseEnter={() => {}}
        onYearMouseLeave={() => {}}
      />,
    );
    const yearTexts = container.querySelectorAll(
      ".react-datepicker__year-text",
    );
    const firstYear = getYearsPeriod(
      date,
      DEFAULT_YEAR_ITEM_NUMBER,
    ).startPeriod;

    expect(
      yearTexts[2023 - firstYear]?.classList.contains(
        "react-datepicker__year-text--disabled",
      ),
    ).toBe(false);
  });

  it("should not return disabled class if current date is after maxDate but same year", () => {
    const date = newDate("2023-12-31");
    const { container } = render(
      <Year
        date={date}
        maxDate={newDate("2023-01-01")}
        onYearMouseEnter={() => {}}
        onYearMouseLeave={() => {}}
      />,
    );
    const yearTexts = container.querySelectorAll(
      ".react-datepicker__year-text",
    );
    const firstYear = getYearsPeriod(
      date,
      DEFAULT_YEAR_ITEM_NUMBER,
    ).startPeriod;

    expect(
      yearTexts[2023 - firstYear]?.classList.contains(
        "react-datepicker__year-text--disabled",
      ),
    ).toBe(false);
  });

  it("should return disabled class if specified excludeDate", () => {
    const date = newDate("2023-12-31");
    const firstYear = getYearsPeriod(
      date,
      DEFAULT_YEAR_ITEM_NUMBER,
    ).startPeriod;

    const excludeDates: Date[] = [];
    for (let year = firstYear; year <= 2023; year++) {
      excludeDates.push(newDate(`${year}-01-01`));
    }

    const { container } = render(
      <Year
        date={newDate("2023-01-01")}
        excludeDates={excludeDates}
        onYearMouseEnter={() => {}}
        onYearMouseLeave={() => {}}
      />,
    );

    const yearTexts = container.querySelectorAll(
      ".react-datepicker__year-text",
    );

    for (let i = 0; i <= 2023 - firstYear; i++) {
      const year = yearTexts[i];
      expect(
        year?.classList.contains("react-datepicker__year-text--disabled"),
      ).toBe(true);
    }
  });

  it("should return disabled class if specified includeDate", () => {
    const date = newDate("2023-12-31");
    const firstYear = getYearsPeriod(
      date,
      DEFAULT_YEAR_ITEM_NUMBER,
    ).startPeriod;

    const includeDates: Date[] = [];
    for (let year = firstYear; year <= 2023; year++) {
      includeDates.push(newDate(`${year}-01-01`));
    }
    const { container } = render(
      <Year
        date={newDate("2023-01-01")}
        includeDates={includeDates}
        onYearMouseEnter={() => {}}
        onYearMouseLeave={() => {}}
      />,
    );

    const yearTexts = container.querySelectorAll(
      ".react-datepicker__year-text",
    );

    const pos = 2023 - firstYear;
    for (let i = 0; i <= pos; i++) {
      const year = yearTexts[i];
      expect(
        year?.classList.contains("react-datepicker__year-text--disabled"),
      ).toBe(false);
    }
    for (let i = pos + 1; i < 12; i++) {
      const year = yearTexts[i];
      expect(
        year?.classList.contains("react-datepicker__year-text--disabled"),
      ).toBe(true);
    }
  });

  it("should render custom year content", () => {
    function renderYearContent() {
      return <span>custom render</span>;
    }
    const { container } = render(
      <Year
        date={newDate()}
        renderYearContent={renderYearContent}
        onYearMouseEnter={() => {}}
        onYearMouseLeave={() => {}}
      />,
    );
    const year = container.querySelector(".react-datepicker__year-text");
    expect(year?.querySelector("span")?.textContent).toBe("custom render");
  });

  describe("range", () => {
    it("should add range classes", () => {
      const { container } = render(
        <Year
          date={newDate("2009-01-01")}
          startDate={newDate("2009-01-01")}
          endDate={newDate("2012-01-01")}
          onYearMouseEnter={() => {}}
          onYearMouseLeave={() => {}}
        />,
      );

      const inRangeYears = container.querySelectorAll(
        ".react-datepicker__year-text--in-range",
      );

      expect(inRangeYears.length).toBe(4);
      expect(inRangeYears[0]?.textContent).toBe("2009");
      expect(inRangeYears[1]?.textContent).toBe("2010");
      expect(inRangeYears[2]?.textContent).toBe("2011");
      expect(inRangeYears[3]?.textContent).toBe("2012");

      const rangeStartYear = container.querySelectorAll(
        ".react-datepicker__year-text--range-start",
      );

      expect(rangeStartYear.length).toBe(1);
      expect(rangeStartYear[0]?.textContent).toBe("2009");

      const rangeEndYear = container.querySelectorAll(
        ".react-datepicker__year-text--range-end",
      );

      expect(rangeEndYear.length).toBe(1);
      expect(rangeEndYear[0]?.textContent).toBe("2012");
    });

    it("should not add range classes when start date is not defined", () => {
      const { container } = render(
        <Year
          date={newDate("2009-01-01")}
          endDate={newDate("2012-01-01")}
          onYearMouseEnter={() => {}}
          onYearMouseLeave={() => {}}
        />,
      );

      const inRangeYears = container.querySelectorAll(
        ".react-datepicker__year-text--in-range",
      );
      const rangeStartYear = container.querySelectorAll(
        ".react-datepicker__year-text--range-start",
      );
      const rangeEndYear = container.querySelectorAll(
        ".react-datepicker__year-text--range-end",
      );

      expect(inRangeYears.length).toBe(0);
      expect(rangeEndYear.length).toBe(0);
      expect(rangeStartYear.length).toBe(0);
    });

    it("should not add range classes when end date is not defined", () => {
      const { container } = render(
        <Year
          date={newDate("2009-01-01")}
          startDate={newDate("2009-01-01")}
          onYearMouseEnter={() => {}}
          onYearMouseLeave={() => {}}
        />,
      );

      const inRangeYears = container.querySelectorAll(
        ".react-datepicker__year-text--in-range",
      );
      const rangeStartYear = container.querySelectorAll(
        ".react-datepicker__year-text--range-start",
      );
      const rangeEndYear = container.querySelectorAll(
        ".react-datepicker__year-text--range-end",
      );

      expect(inRangeYears.length).toBe(0);
      expect(rangeEndYear.length).toBe(0);
      expect(rangeStartYear.length).toBe(0);
    });

    describe("selecting", () => {
      it("should add in-selecting-range class if year is between the selecting date and end date", () => {
        const { container } = render(
          <Year
            preSelection={newDate("2015-01-01")}
            date={newDate("2012-01-01")}
            endDate={newDate("2016-01-01")}
            selectingDate={newDate("2015-01-01")}
            selectsStart
            onYearMouseEnter={() => {}}
            onYearMouseLeave={() => {}}
          />,
        );

        const years = container.querySelectorAll(
          ".react-datepicker__year-text--in-selecting-range",
        );

        expect(years.length).toBe(2);
        expect(years[0]?.textContent).toBe("2015");
        expect(years[1]?.textContent).toBe("2016");
      });

      it("should add in-selecting-range class if year is between the start date and selecting date", () => {
        const { container } = render(
          <Year
            preSelection={newDate("2011-01-01")}
            date={newDate("2015-01-01")}
            startDate={newDate("2010-01-01")}
            selectingDate={newDate("2011-01-01")}
            selectsEnd
            onYearMouseEnter={() => {}}
            onYearMouseLeave={() => {}}
          />,
        );

        const years = container.querySelectorAll(
          ".react-datepicker__year-text--in-selecting-range",
        );

        expect(years.length).toBe(2);
        expect(years[0]?.textContent).toBe("2010");
        expect(years[1]?.textContent).toBe("2011");
      });

      it("should use pre selection date if selecting date is not defined", () => {
        const { container } = render(
          <Year
            preSelection={newDate("2011-01-01")}
            date={newDate("2015-01-01")}
            startDate={newDate("2010-01-01")}
            selectsEnd
            onYearMouseEnter={() => {}}
            onYearMouseLeave={() => {}}
          />,
        );

        const years = container.querySelectorAll(
          ".react-datepicker__year-text--in-selecting-range",
        );

        expect(years.length).toBe(2);
        expect(years[0]?.textContent).toBe("2010");
        expect(years[1]?.textContent).toBe("2011");
      });

      it("should add in-selecting-range class for one year picker if year is between the start date and selecting date", () => {
        const { container } = render(
          <Year
            preSelection={newDate("2011-01-01")}
            date={newDate("2015-01-01")}
            startDate={newDate("2010-02-01")}
            selectingDate={newDate("2011-01-01")}
            selectsRange
            onYearMouseEnter={() => {}}
            onYearMouseLeave={() => {}}
          />,
        );
        const years = container.querySelectorAll(
          ".react-datepicker__year-text--in-selecting-range",
        );

        expect(years.length).toBe(2);
        expect(years[0]?.textContent).toBe("2010");
        expect(years[1]?.textContent).toBe("2011");
      });

      it("should not add in-selecting-range class for one year picker if the start date is not defined", () => {
        const { container } = render(
          <Year
            preSelection={newDate("2014-01-01")}
            date={newDate("2015-01-01")}
            selectingDate={newDate("2014-01-01")}
            selectsRange
            onYearMouseEnter={() => {}}
            onYearMouseLeave={() => {}}
          />,
        );
        const years = container.querySelectorAll(
          ".react-datepicker__year-text--in-selecting-range",
        );

        expect(years.length).toBe(0);
      });

      it("should not add in-selecting-range class for one year picker if the end date is defined", () => {
        const { container } = render(
          <Year
            preSelection={newDate("2014-01-01")}
            date={newDate("2013-01-01")}
            selectingDate={newDate("2014-01-01")}
            endDate={newDate("2013-01-01")}
            selectsRange
            onYearMouseEnter={() => {}}
            onYearMouseLeave={() => {}}
          />,
        );
        const years = container.querySelectorAll(
          ".react-datepicker__month-text--in-selecting-range",
        );

        expect(years.length).toBe(0);
      });

      it("should add 'selecting-range-start' class to the start selecting year", () => {
        const { container } = render(
          <Year
            preSelection={newDate("2012-01-01")}
            date={newDate("2010-01-01")}
            endDate={newDate("2015-01-01")}
            selectingDate={newDate("2012-01-01")}
            selectsStart
            onYearMouseEnter={() => {}}
            onYearMouseLeave={() => {}}
          />,
        );
        const years = container.querySelectorAll(
          ".react-datepicker__year-text--selecting-range-start",
        );
        expect(years.length).toBe(1);
        expect(years[0]?.textContent).toBe("2012");
      });

      it("should add 'selecting-range-end' class to the end selecting year", () => {
        const { container } = render(
          <Year
            preSelection={newDate("2014-01-01")}
            date={newDate("2012-01-01")}
            startDate={newDate("2010-01-01")}
            endDate={newDate("2015-01-01")}
            selectingDate={newDate("2014-01-01")}
            selectsEnd
            onYearMouseEnter={() => {}}
            onYearMouseLeave={() => {}}
          />,
        );
        const years = container.querySelectorAll(
          ".react-datepicker__year-text--selecting-range-end",
        );
        expect(years.length).toBe(1);
        expect(years[0]?.textContent).toBe("2014");
      });
    });
  });

  describe("keyboard-selected", () => {
    const className = "react-datepicker__year-text--keyboard-selected";

    it("should set the key-selected class automatically to the current year when there is no selected date passed", () => {
      const { container } = render(
        <DatePicker showYearPicker dateFormat="yyyy" />,
      );

      const dateInput = safeQuerySelector(container, "input");
      fireEvent.focus(dateInput);

      const selectedYear = container.querySelector(
        ".react-datepicker__year-text--keyboard-selected",
      );
      expect(selectedYear).toBeDefined();

      const currentYear = new Date().getFullYear();
      expect(selectedYear?.textContent).toBe(`${currentYear}`);
    });

    it("should set the date to the selected year of the previous period when previous button clicked", () => {
      let date: Date | null;
      const expectedDate = getStartOfYear(setYear(newDate(), 2008));
      const { container } = render(
        <DatePicker
          selected={newDate("2020-01-01")}
          adjustDateOnChange
          showYearPicker
          onChange={(d) => {
            date = d;
          }}
        />,
      );

      const input = safeQuerySelector(container, "input");
      fireEvent.focus(input);

      const previousButton = new SafeElementWrapper(container)
        .safeQuerySelector(".react-datepicker")
        .safeQuerySelector(".react-datepicker__navigation--previous")
        .getElement();
      fireEvent.click(previousButton);

      const year = container.querySelector(".react-datepicker__year");
      const allPreselectedYears = year?.querySelectorAll(`.${className}`) ?? [];

      expect(formatDate(date!, "dd.MM.yyyy")).toBe(
        formatDate(expectedDate, "dd.MM.yyyy"),
      );
      expect(allPreselectedYears.length).toBe(1);
    });

    it("should set the date to the selected year of the next period when next button clicked", () => {
      let date: Date | null;
      const expectedDate = getStartOfYear(setYear(newDate(), 2032));
      const { container } = render(
        <DatePicker
          selected={newDate("2020-01-01")}
          adjustDateOnChange
          showYearPicker
          onChange={(d) => {
            date = d;
          }}
        />,
      );

      const input = safeQuerySelector(container, "input");
      fireEvent.focus(input);

      const nextButton = new SafeElementWrapper(container)
        .safeQuerySelector(".react-datepicker")
        .safeQuerySelector(".react-datepicker__navigation--next")
        .getElement();
      fireEvent.click(nextButton);

      const year = container.querySelector(".react-datepicker__year");
      const allPreselectedYears = year?.querySelectorAll(`.${className}`) ?? [];

      expect(formatDate(date!, "dd.MM.yyyy")).toBe(
        formatDate(expectedDate, "dd.MM.yyyy"),
      );
      expect(allPreselectedYears.length).toBe(1);
    });

    it("should not set the key-selected class when the year is a part of disabled dates", () => {
      const date = newDate("2024-06-01");
      const excludeDates = [newDate("2036-05-05")];

      const { container } = render(
        <DatePicker
          selected={date}
          excludeDates={excludeDates}
          showYearPicker
          dateFormat="yyyy"
        />,
      );

      const dateInput = container.querySelector("input")!;
      fireEvent.focus(dateInput);

      const calendar = container.querySelector(".react-datepicker")!;
      const nextButton = calendar.querySelector(
        ".react-datepicker__navigation--next",
      )!;
      fireEvent.click(nextButton);

      expect(
        container.querySelector(
          ".react-datepicker__year-text--keyboard-selected",
        ),
      ).toBeNull();
    });
  });

  describe("Keyboard navigation", () => {
    let preSelected: Date | null | undefined;
    const setPreSelection = (preSelection: Date | null | undefined) => {
      preSelected = preSelection ? newDate(preSelection) : preSelection;
    };

    let selectedDay: Date | null | undefined;
    const onDayClick = (day: Date | null | undefined) => {
      selectedDay = day;
    };

    const getPicker = (
      initialDate: string | number | Date | null | undefined,
      props = {},
    ) =>
      render(
        <Year
          selected={newDate(initialDate)}
          date={newDate(initialDate)}
          setPreSelection={setPreSelection}
          preSelection={newDate(initialDate)}
          onDayClick={onDayClick}
          yearItemNumber={12}
          onYearMouseEnter={() => {}}
          onYearMouseLeave={() => {}}
          {...props}
        />,
      ).container;

    const simulateLeft = (target: HTMLElement) =>
      fireEvent.keyDown(target, getKey(KeyType.ArrowLeft));
    const simulateRight = (target: HTMLElement) =>
      fireEvent.keyDown(target, getKey(KeyType.ArrowRight));
    const simulateUp = (target: HTMLElement) =>
      fireEvent.keyDown(target, getKey(KeyType.ArrowUp));
    const simulateDown = (target: HTMLElement) =>
      fireEvent.keyDown(target, getKey(KeyType.ArrowDown));

    it("should preSelect and set 2020 on left arrow press", () => {
      const yearPicker = getPicker("2021-01-01");

      const target = safeQuerySelector(
        yearPicker,
        ".react-datepicker__year-text--selected",
      );
      simulateLeft(target);

      expect(preSelected ? getYear(preSelected) : preSelected).toBe(2020);
    });
    it("should preSelect and set 2022 on left arrow press", () => {
      const yearPicker = getPicker("2021-01-01");

      const target = safeQuerySelector(
        yearPicker,
        ".react-datepicker__year-text--selected",
      );
      simulateRight(target);

      expect(preSelected ? getYear(preSelected) : preSelected).toBe(2022);
    });
    it("should preSelect and set 2021 on up arrow press", () => {
      const yearPicker = getPicker("2024-01-01");

      const target = safeQuerySelector(
        yearPicker,
        ".react-datepicker__year-text--selected",
      );
      simulateUp(target);

      expect(preSelected ? getYear(preSelected) : preSelected).toBe(2021);
    });
    it("should preSelect and set 2027 on down arrow press", () => {
      const yearPicker = getPicker("2024-01-01");

      const target = safeQuerySelector(
        yearPicker,
        ".react-datepicker__year-text--selected",
      );
      simulateDown(target);

      expect(preSelected ? getYear(preSelected) : preSelected).toBe(2027);
    });
    it("should paginate from 2018 to 2015", () => {
      const yearPicker = getPicker("2018-01-01");

      const target = safeQuerySelector(
        yearPicker,
        ".react-datepicker__year-text--selected",
      );
      simulateUp(target);

      expect(preSelected ? getYear(preSelected) : preSelected).toBe(2015);
    });
    it("should paginate from 2018 to 2016 with custom yearItemNumber", () => {
      const yearPicker = getPicker("2018-01-01", { yearItemNumber: 8 });

      const target = safeQuerySelector(
        yearPicker,
        ".react-datepicker__year-text--selected",
      );
      simulateUp(target);

      expect(preSelected ? getYear(preSelected) : preSelected).toBe(2016);
    });
    it("should paginate from 2019 to 2014 with custom yearItemNumber", () => {
      const yearPicker = getPicker("2019-01-01", { yearItemNumber: 8 });

      const target = safeQuerySelector(
        yearPicker,
        ".react-datepicker__year-text--selected",
      );
      simulateUp(target);

      expect(preSelected ? getYear(preSelected) : preSelected).toBe(2014);
    });
    it("should paginate from 2028 to 2031", () => {
      const yearPicker = getPicker("2028-01-01");

      const target = safeQuerySelector(
        yearPicker,
        ".react-datepicker__year-text--selected",
      );
      simulateDown(target);

      expect(preSelected ? getYear(preSelected) : preSelected).toBe(2031);
    });
    it("should paginate from 2024 to 2026 with custom yearItemNumber", () => {
      const yearPicker = getPicker("2024-01-01", { yearItemNumber: 8 });

      const target = safeQuerySelector(
        yearPicker,
        ".react-datepicker__year-text--selected",
      );
      simulateDown(target);

      expect(preSelected ? getYear(preSelected) : preSelected).toBe(2026);
    });
    it("should paginate from 2022 to 2027 with custom yearItemNumber", () => {
      const yearPicker = getPicker("2022-01-01", { yearItemNumber: 8 });

      const target = safeQuerySelector(
        yearPicker,
        ".react-datepicker__year-text--selected",
      );
      simulateDown(target);

      expect(preSelected ? getYear(preSelected) : preSelected).toBe(2027);
    });
    it("should paginate from 2017 to 2016", () => {
      const yearPicker = getPicker("2017-01-01");

      const target = safeQuerySelector(
        yearPicker,
        ".react-datepicker__year-text--selected",
      );
      simulateLeft(target);

      expect(preSelected ? getYear(preSelected) : preSelected).toBe(2016);
    });
    it("should paginate from 2028 to 2029", () => {
      const yearPicker = getPicker("2028-01-01");

      const target = safeQuerySelector(
        yearPicker,
        ".react-datepicker__year-text--selected",
      );
      simulateRight(target);

      expect(preSelected ? getYear(preSelected) : preSelected).toBe(2029);
    });
    it("should select 2021 when Enter key is pressed", () => {
      const yearPicker = getPicker("2021-01-01");

      const target = safeQuerySelector(
        yearPicker,
        ".react-datepicker__year-text--selected",
      );

      fireEvent.keyDown(target, getKey(KeyType.Enter));
      expect(selectedDay ? getYear(selectedDay) : selectedDay).toBe(2021);
    });

    it("should call onKeyDown handler on any key press", () => {
      const onKeyDownSpy = jest.fn();

      const { container } = render(
        <DatePicker
          selected={new Date()}
          showYearPicker
          dateFormat="yyyy"
          onKeyDown={onKeyDownSpy}
        />,
      );

      const dateInput = safeQuerySelector(container, "input");
      fireEvent.focus(dateInput);

      const year = safeQuerySelector(container, ".react-datepicker__year-text");

      fireEvent.keyDown(year, getKey(KeyType.ArrowDown));

      expect(onKeyDownSpy).toHaveBeenCalledTimes(1);
    });

    it("should select 2021 when Space key is pressed", () => {
      const yearPicker = getPicker("2021-01-01");

      const target = safeQuerySelector(
        yearPicker,
        ".react-datepicker__year-text--selected",
      );

      fireEvent.keyDown(target, getKey(KeyType.Space));
      expect(selectedDay ? getYear(selectedDay) : selectedDay).toBe(2021);
    });

    it("should disable keyboard navigation", () => {
      const yearPicker = getPicker("2021-01-01", {
        disabledKeyboardNavigation: true,
      });

      const target = safeQuerySelector(
        yearPicker,
        ".react-datepicker__year-text--selected",
      );
      simulateRight(target);

      expect(preSelected ? getYear(preSelected) : preSelected).toBe(2021);
    });
  });

  it("should apply className returned from passed yearClassName prop function", () => {
    const className = "customClassName";
    const yearClassNameFunc = () => className;
    const date = new Date();
    const { container } = render(
      <Year
        date={date}
        onYearMouseEnter={() => {}}
        onYearMouseLeave={() => {}}
        yearClassName={yearClassNameFunc}
      />,
    );
    expect(
      container
        .querySelector(".react-datepicker__year-text")
        ?.classList.contains(className),
    ).toBe(true);

    expect(
      container.querySelector(`.react-datepicker__year-${date.getFullYear()}`),
    ).not.toBeNull();
  });

  describe("Auto-Focus", () => {
    it("should auto-focus on the same year offset in the next/previous view when navigating", () => {
      const date = newDate("2024-06-01");
      const { container } = render(
        <DatePicker selected={date} showYearPicker dateFormat="yyyy" />,
      );
      openDateInput(container);
      const calendar = container.querySelector(".react-datepicker")!;
      const selectedElementOffset = getYearOffset(calendar, date);
      gotoNextView(container);
      const preSelectedDateElement = container.querySelector(
        `.react-datepicker__year-wrapper :nth-child(${selectedElementOffset + 1}).react-datepicker__year-text`,
      )!;
      expect(preSelectedDateElement.getAttribute("tabindex")).toBe("0");
    });
    it("shouldn't auto-focus on the same year offset in the next/previous view when navigating if the year in the corresponding offset is disabled", () => {
      const date = newDate("2024-06-01");
      const excludeDate = newDate("2036-05-01"); // 2036 is in the same 8th offset like 2024
      const { container } = render(
        <DatePicker
          selected={date}
          excludeDates={[excludeDate]}
          showYearPicker
          dateFormat="yyyy"
        />,
      );
      openDateInput(container);
      const calendar = container.querySelector(".react-datepicker")!;
      const selectedElementOffset = getYearOffset(calendar, date);
      gotoNextView(container);
      const preSelectedDateElement = container.querySelector(
        `.react-datepicker__year-wrapper :nth-child(${selectedElementOffset + 1}).react-datepicker__year-${excludeDate.getFullYear()}`,
      )!;
      expect(preSelectedDateElement.getAttribute("tabindex")).toBe("-1");
    });
  });
});
