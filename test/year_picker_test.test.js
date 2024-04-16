import React from "react";
import DatePicker from "../src/index.jsx";
import Year from "../src/year.jsx";
import { render, fireEvent } from "@testing-library/react";
import * as utils from "../src/date_utils.js";
import { getKey } from "./test_utils.js";

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
    expect(yearItems.length).toBe(utils.DEFAULT_YEAR_ITEM_NUMBER);
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
    const firstYearDiv = container.querySelectorAll(
      ".react-datepicker__year-text",
    )[1];
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
    )[0].textContent;
    expect(year).toBe(utils.getYear(date).toString());
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
    ).textContent;
    expect(year).toBe(utils.getYear(date).toString());
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
      .getAttribute("aria-current");

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
      .getAttribute("aria-current");
    expect(ariaCurrent).toBeNull();
  });

  it("should return disabled class if current date is out of bound of minDate and maxDate", () => {
    const { container } = render(
      <Year
        date={utils.newDate("2020-01-01")}
        minDate={utils.newDate("2018-01-01")}
        maxDate={utils.newDate("2025-01-01")}
        onYearMouseEnter={() => {}}
        onYearMouseLeave={() => {}}
      />,
    );
    const year = container.querySelector(".react-datepicker__year-text");
    expect(
      year.classList.contains("react-datepicker__year-text--disabled"),
    ).toBe(true);
  });

  it("should not return disabled class if current date is before minDate but same year", () => {
    const date = utils.newDate("2023-01-01");
    const { container } = render(
      <Year
        date={date}
        minDate={utils.newDate("2023-12-31")}
        onYearMouseEnter={() => {}}
        onYearMouseLeave={() => {}}
      />,
    );
    const yearTexts = container.querySelectorAll(
      ".react-datepicker__year-text",
    );
    const firstYear = utils.getYearsPeriod(
      date,
      utils.DEFAULT_YEAR_ITEM_NUMBER,
    ).startPeriod;

    expect(
      yearTexts[2023 - firstYear].classList.contains(
        "react-datepicker__year-text--disabled",
      ),
    ).toBe(false);
  });

  it("should not return disabled class if current date is after maxDate but same year", () => {
    const date = utils.newDate("2023-12-31");
    const { container } = render(
      <Year
        date={date}
        maxDate={utils.newDate("2023-01-01")}
        onYearMouseEnter={() => {}}
        onYearMouseLeave={() => {}}
      />,
    );
    const yearTexts = container.querySelectorAll(
      ".react-datepicker__year-text",
    );
    const firstYear = utils.getYearsPeriod(
      date,
      utils.DEFAULT_YEAR_ITEM_NUMBER,
    ).startPeriod;

    expect(
      yearTexts[2023 - firstYear].classList.contains(
        "react-datepicker__year-text--disabled",
      ),
    ).toBe(false);
  });

  it("should return disabled class if specified excludeDate", () => {
    const date = utils.newDate("2023-12-31");
    const firstYear = utils.getYearsPeriod(
      date,
      utils.DEFAULT_YEAR_ITEM_NUMBER,
    ).startPeriod;

    const excludeDates = [];
    for (let year = firstYear; year <= 2023; year++) {
      excludeDates.push(utils.newDate(`${year}-01-01`));
    }

    const { container } = render(
      <Year
        date={utils.newDate("2023-01-01")}
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
        year.classList.contains("react-datepicker__year-text--disabled"),
      ).toBe(true);
    }
  });

  it("should return disabled class if specified includeDate", () => {
    const date = utils.newDate("2023-12-31");
    const firstYear = utils.getYearsPeriod(
      date,
      utils.DEFAULT_YEAR_ITEM_NUMBER,
    ).startPeriod;

    const includeDates = [];
    for (let year = firstYear; year <= 2023; year++) {
      includeDates.push(utils.newDate(`${year}-01-01`));
    }
    const { container } = render(
      <Year
        date={utils.newDate("2023-01-01")}
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
        year.classList.contains("react-datepicker__year-text--disabled"),
      ).toBe(false);
    }
    for (let i = pos + 1; i < 12; i++) {
      const year = yearTexts[i];
      expect(
        year.classList.contains("react-datepicker__year-text--disabled"),
      ).toBe(true);
    }
  });

  it("should render custom year content", () => {
    function renderYearContent() {
      return <span>custom render</span>;
    }
    const { container } = render(
      <Year
        date={utils.newDate()}
        renderYearContent={renderYearContent}
        onYearMouseEnter={() => {}}
        onYearMouseLeave={() => {}}
      />,
    );
    const year = container.querySelector(".react-datepicker__year-text");
    expect(year.querySelector("span").textContent).toBe("custom render");
  });

  describe("range", () => {
    it("should add range classes", () => {
      const { container } = render(
        <Year
          date={utils.newDate("2009-01-01")}
          startDate={utils.newDate("2009-01-01")}
          endDate={utils.newDate("2012-01-01")}
          onYearMouseEnter={() => {}}
          onYearMouseLeave={() => {}}
        />,
      );

      const inRangeYears = container.querySelectorAll(
        ".react-datepicker__year-text--in-range",
      );

      expect(inRangeYears.length).toBe(4);
      expect(inRangeYears[0].textContent).toBe("2009");
      expect(inRangeYears[1].textContent).toBe("2010");
      expect(inRangeYears[2].textContent).toBe("2011");
      expect(inRangeYears[3].textContent).toBe("2012");

      const rangeStartYear = container.querySelectorAll(
        ".react-datepicker__year-text--range-start",
      );

      expect(rangeStartYear.length).toBe(1);
      expect(rangeStartYear[0].textContent).toBe("2009");

      const rangeEndYear = container.querySelectorAll(
        ".react-datepicker__year-text--range-end",
      );

      expect(rangeEndYear.length).toBe(1);
      expect(rangeEndYear[0].textContent).toBe("2012");
    });

    it("should not add range classes when start date is not defined", () => {
      const { container } = render(
        <Year
          date={utils.newDate("2009-01-01")}
          endDate={utils.newDate("2012-01-01")}
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
          date={utils.newDate("2009-01-01")}
          startDate={utils.newDate("2009-01-01")}
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
            preSelection={utils.newDate("2015-01-01")}
            date={utils.newDate("2012-01-01")}
            endDate={utils.newDate("2016-01-01")}
            selectingDate={utils.newDate("2015-01-01")}
            selectsStart
            onYearMouseEnter={() => {}}
            onYearMouseLeave={() => {}}
          />,
        );

        const years = container.querySelectorAll(
          ".react-datepicker__year-text--in-selecting-range",
        );

        expect(years.length).toBe(2);
        expect(years[0].textContent).toBe("2015");
        expect(years[1].textContent).toBe("2016");
      });

      it("should add in-selecting-range class if year is between the start date and selecting date", () => {
        const { container } = render(
          <Year
            preSelection={utils.newDate("2011-01-01")}
            date={utils.newDate("2015-01-01")}
            startDate={utils.newDate("2010-01-01")}
            selectingDate={utils.newDate("2011-01-01")}
            selectsEnd
            onYearMouseEnter={() => {}}
            onYearMouseLeave={() => {}}
          />,
        );

        const years = container.querySelectorAll(
          ".react-datepicker__year-text--in-selecting-range",
        );

        expect(years.length).toBe(2);
        expect(years[0].textContent).toBe("2010");
        expect(years[1].textContent).toBe("2011");
      });

      it("should use pre selection date if selecting date is not defined", () => {
        const { container } = render(
          <Year
            preSelection={utils.newDate("2011-01-01")}
            date={utils.newDate("2015-01-01")}
            startDate={utils.newDate("2010-01-01")}
            selectsEnd
            onYearMouseEnter={() => {}}
            onYearMouseLeave={() => {}}
          />,
        );

        const years = container.querySelectorAll(
          ".react-datepicker__year-text--in-selecting-range",
        );

        expect(years.length).toBe(2);
        expect(years[0].textContent).toBe("2010");
        expect(years[1].textContent).toBe("2011");
      });

      it("should add in-selecting-range class for one year picker if year is between the start date and selecting date", () => {
        const { container } = render(
          <Year
            preSelection={utils.newDate("2011-01-01")}
            date={utils.newDate("2015-01-01")}
            startDate={utils.newDate("2010-02-01")}
            selectingDate={utils.newDate("2011-01-01")}
            selectsRange
            onYearMouseEnter={() => {}}
            onYearMouseLeave={() => {}}
          />,
        );
        const years = container.querySelectorAll(
          ".react-datepicker__year-text--in-selecting-range",
        );

        expect(years.length).toBe(2);
        expect(years[0].textContent).toBe("2010");
        expect(years[1].textContent).toBe("2011");
      });

      it("should not add in-selecting-range class for one year picker if the start date is not defined", () => {
        const { container } = render(
          <Year
            preSelection={utils.newDate("2014-01-01")}
            date={utils.newDate("2015-01-01")}
            selectingDate={utils.newDate("2014-01-01")}
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
            preSelection={utils.newDate("2014-01-01")}
            date={utils.newDate("2013-01-01")}
            selectingDate={utils.newDate("2014-01-01")}
            endDate={utils.newDate("2013-01-01")}
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
            preSelection={utils.newDate("2012-01-01")}
            date={utils.newDate("2010-01-01")}
            endDate={utils.newDate("2015-01-01")}
            selectingDate={utils.newDate("2012-01-01")}
            selectsStart
            onYearMouseEnter={() => {}}
            onYearMouseLeave={() => {}}
          />,
        );
        const years = container.querySelectorAll(
          ".react-datepicker__year-text--selecting-range-start",
        );
        expect(years.length).toBe(1);
        expect(years[0].textContent).toBe("2012");
      });

      it("should add 'selecting-range-end' class to the end selecting year", () => {
        const { container } = render(
          <Year
            preSelection={utils.newDate("2014-01-01")}
            date={utils.newDate("2012-01-01")}
            startDate={utils.newDate("2010-01-01")}
            endDate={utils.newDate("2015-01-01")}
            selectingDate={utils.newDate("2014-01-01")}
            selectsEnd
            onYearMouseEnter={() => {}}
            onYearMouseLeave={() => {}}
          />,
        );
        const years = container.querySelectorAll(
          ".react-datepicker__year-text--selecting-range-end",
        );
        expect(years.length).toBe(1);
        expect(years[0].textContent).toBe("2014");
      });
    });
  });

  describe("keyboard-selected", () => {
    const className = "react-datepicker__year-text--keyboard-selected";

    it("should set the date to the selected year of the previous period when previous button clicked", () => {
      let date;
      const expectedDate = utils.getStartOfYear(
        utils.setYear(utils.newDate(), 2008),
      );
      const { container } = render(
        <DatePicker
          selected={utils.newDate("2020-01-01")}
          adjustDateOnChange
          showYearPicker
          onChange={(d) => {
            date = d;
          }}
        />,
      );

      fireEvent.focus(container.querySelector("input"));

      const calendar = container.querySelector(".react-datepicker");
      const previousButton = calendar.querySelector(
        ".react-datepicker__navigation--previous",
      );
      fireEvent.click(previousButton);

      const year = container.querySelector(".react-datepicker__year");
      const allPreselectedYears = year.querySelectorAll(`.${className}`);

      expect(utils.formatDate(date, "dd.MM.yyyy")).toBe(
        utils.formatDate(expectedDate, "dd.MM.yyyy"),
      );
      expect(allPreselectedYears.length).toBe(1);
    });

    it("should set the date to the selected year of the next period when next button clicked", () => {
      let date;
      const expectedDate = utils.getStartOfYear(
        utils.setYear(utils.newDate(), 2032),
      );
      const { container } = render(
        <DatePicker
          selected={utils.newDate("2020-01-01")}
          adjustDateOnChange
          showYearPicker
          onChange={(d) => {
            date = d;
          }}
        />,
      );

      fireEvent.focus(container.querySelector("input"));

      const calendar = container.querySelector(".react-datepicker");
      const nextButton = calendar.querySelector(
        ".react-datepicker__navigation--next",
      );

      fireEvent.click(nextButton);

      const year = container.querySelector(".react-datepicker__year");
      const allPreselectedYears = year.querySelectorAll(`.${className}`);

      expect(utils.formatDate(date, "dd.MM.yyyy")).toBe(
        utils.formatDate(expectedDate, "dd.MM.yyyy"),
      );
      expect(allPreselectedYears.length).toBe(1);
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
      render(
        <Year
          selected={utils.newDate(initialDate)}
          date={utils.newDate(initialDate)}
          setPreSelection={setPreSelection}
          preSelection={utils.newDate(initialDate)}
          onDayClick={onDayClick}
          yearItemNumber={12}
          onYearMouseEnter={() => {}}
          onYearMouseLeave={() => {}}
          {...props}
        />,
      ).container;

    const simulateLeft = (target) =>
      fireEvent.keyDown(target, {
        key: "ArrowLeft",
        keyCode: 37,
        which: 37,
      });
    const simulateRight = (target) =>
      fireEvent.keyDown(target, {
        key: "ArrowRight",
        keyCode: 39,
        which: 39,
      });

    const simulateUp = (target) =>
      fireEvent.keyDown(target, {
        key: "ArrowUp",
        keyCode: 38,
        which: 38,
      });

    const simulateDown = (target) =>
      fireEvent.keyDown(target, {
        key: "ArrowDown",
        keyCode: 40,
        which: 40,
      });

    it("should preSelect and set 2020 on left arrow press", () => {
      const yearPicker = getPicker("2021-01-01");

      const target = yearPicker.querySelector(
        ".react-datepicker__year-text--selected",
      );
      simulateLeft(target);

      expect(utils.getYear(preSelected)).toBe(2020);
    });
    it("should preSelect and set 2022 on left arrow press", () => {
      const yearPicker = getPicker("2021-01-01");

      const target = yearPicker.querySelector(
        ".react-datepicker__year-text--selected",
      );
      simulateRight(target);

      expect(utils.getYear(preSelected)).toBe(2022);
    });
    it("should preSelect and set 2021 on up arrow press", () => {
      const yearPicker = getPicker("2024-01-01");

      const target = yearPicker.querySelector(
        ".react-datepicker__year-text--selected",
      );
      simulateUp(target);

      expect(utils.getYear(preSelected)).toBe(2021);
    });
    it("should preSelect and set 2027 on down arrow press", () => {
      const yearPicker = getPicker("2024-01-01");

      const target = yearPicker.querySelector(
        ".react-datepicker__year-text--selected",
      );
      simulateDown(target);

      expect(utils.getYear(preSelected)).toBe(2027);
    });
    it("should paginate from 2018 to 2015", () => {
      const yearPicker = getPicker("2018-01-01");

      const target = yearPicker.querySelector(
        ".react-datepicker__year-text--selected",
      );
      simulateUp(target);

      expect(utils.getYear(preSelected)).toBe(2015);
    });
    it("should paginate from 2018 to 2016 with custom yearItemNumber", () => {
      const yearPicker = getPicker("2018-01-01", { yearItemNumber: 8 });

      const target = yearPicker.querySelector(
        ".react-datepicker__year-text--selected",
      );
      simulateUp(target);

      expect(utils.getYear(preSelected)).toBe(2016);
    });
    it("should paginate from 2019 to 2014 with custom yearItemNumber", () => {
      const yearPicker = getPicker("2019-01-01", { yearItemNumber: 8 });

      const target = yearPicker.querySelector(
        ".react-datepicker__year-text--selected",
      );
      simulateUp(target);

      expect(utils.getYear(preSelected)).toBe(2014);
    });
    it("should paginate from 2028 to 2031", () => {
      const yearPicker = getPicker("2028-01-01");

      const target = yearPicker.querySelector(
        ".react-datepicker__year-text--selected",
      );
      simulateDown(target);

      expect(utils.getYear(preSelected)).toBe(2031);
    });
    it("should paginate from 2024 to 2026 with custom yearItemNumber", () => {
      const yearPicker = getPicker("2024-01-01", { yearItemNumber: 8 });

      const target = yearPicker.querySelector(
        ".react-datepicker__year-text--selected",
      );
      simulateDown(target);

      expect(utils.getYear(preSelected)).toBe(2026);
    });
    it("should paginate from 2022 to 2027 with custom yearItemNumber", () => {
      const yearPicker = getPicker("2022-01-01", { yearItemNumber: 8 });

      const target = yearPicker.querySelector(
        ".react-datepicker__year-text--selected",
      );
      simulateDown(target);

      expect(utils.getYear(preSelected)).toBe(2027);
    });
    it("should paginate from 2017 to 2016", () => {
      const yearPicker = getPicker("2017-01-01");

      const target = yearPicker.querySelector(
        ".react-datepicker__year-text--selected",
      );
      simulateLeft(target);

      expect(utils.getYear(preSelected)).toBe(2016);
    });
    it("should paginate from 2028 to 2029", () => {
      const yearPicker = getPicker("2028-01-01");

      const target = yearPicker.querySelector(
        ".react-datepicker__year-text--selected",
      );
      simulateRight(target);

      expect(utils.getYear(preSelected)).toBe(2029);
    });
    it("should select 2021 when Enter key is pressed", () => {
      const yearPicker = getPicker("2021-01-01");

      const target = yearPicker.querySelector(
        ".react-datepicker__year-text--selected",
      );

      fireEvent.keyDown(target, { key: "Enter", code: 13, which: 13 });
      expect(utils.getYear(selectedDay)).toBe(2021);
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

      const dateInput = container.querySelector("input");
      fireEvent.focus(dateInput);

      const year = container.querySelector(".react-datepicker__year-text");

      fireEvent.keyDown(year, {
        key: "ArrowDown",
      });

      expect(onKeyDownSpy).toHaveBeenCalledTimes(1);
    });

    it("should select 2021 when Space key is pressed", () => {
      const yearPicker = getPicker("2021-01-01");

      const target = yearPicker.querySelector(
        ".react-datepicker__year-text--selected",
      );

      const SPACE_KEY = " ";
      fireEvent.keyDown(target, getKey(SPACE_KEY));
      expect(utils.getYear(selectedDay)).toBe(2021);
    });

    it("should disable keyboard navigation", () => {
      const yearPicker = getPicker("2021-01-01", {
        disabledKeyboardNavigation: true,
      });

      const target = yearPicker.querySelector(
        ".react-datepicker__year-text--selected",
      );
      simulateRight(target);

      expect(utils.getYear(preSelected)).toBe(2021);
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
        .classList.contains(className),
    ).toBe(true);

    expect(
      container.querySelector(`.react-datepicker__year-${date.getFullYear()}`),
    ).not.toBeNull();
  });
});
