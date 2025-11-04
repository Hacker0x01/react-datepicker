import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Year from "../year";
import { newDate, getYear } from "../date_utils";

describe("Year", () => {
  const defaultProps = {
    date: newDate("2020-01-01"),
    onYearMouseEnter: jest.fn(),
    onYearMouseLeave: jest.fn(),
    yearItemNumber: 12,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render year items", () => {
    const { container } = render(<Year {...defaultProps} />);

    const yearItems = container.querySelectorAll(
      ".react-datepicker__year-text",
    );
    expect(yearItems.length).toBe(12);
  });

  it("should render correct year range", () => {
    const { container } = render(<Year {...defaultProps} />);

    const yearItems = container.querySelectorAll(
      ".react-datepicker__year-text",
    );
    const firstYear = yearItems[0].textContent;
    const lastYear = yearItems[11].textContent;

    expect(firstYear).toBe("2017");
    expect(lastYear).toBe("2028");
  });

  it("should call onDayClick when year is clicked", () => {
    const handleDayClick = jest.fn();
    const { container } = render(
      <Year {...defaultProps} onDayClick={handleDayClick} />,
    );

    const yearItem = container.querySelector(".react-datepicker__year-text");
    fireEvent.click(yearItem!);

    expect(handleDayClick).toHaveBeenCalled();
  });

  it("should mark selected year", () => {
    const selectedDate = newDate("2020-06-15");
    const { container } = render(
      <Year {...defaultProps} selected={selectedDate} />,
    );

    const selectedYear = container.querySelector(
      ".react-datepicker__year-text--selected",
    );
    expect(selectedYear?.textContent).toBe("2020");
  });

  it("should mark current year", () => {
    const currentYear = getYear(newDate());
    const { container } = render(
      <Year {...defaultProps} date={newDate()} yearItemNumber={12} />,
    );

    const todayYear = container.querySelector(
      ".react-datepicker__year-text--today",
    );
    expect(todayYear?.textContent).toBe(String(currentYear));
  });

  it("should mark disabled years", () => {
    const minDate = newDate("2020-01-01");
    const maxDate = newDate("2022-12-31");
    const { container } = render(
      <Year {...defaultProps} minDate={minDate} maxDate={maxDate} />,
    );

    const disabledYears = container.querySelectorAll(
      ".react-datepicker__year-text--disabled",
    );
    expect(disabledYears.length).toBeGreaterThan(0);
  });

  it("should mark keyboard selected year", () => {
    const preSelection = newDate("2021-01-01");
    const { container } = render(
      <Year {...defaultProps} preSelection={preSelection} />,
    );

    const keyboardSelected = container.querySelector(
      ".react-datepicker__year-text--keyboard-selected",
    );
    expect(keyboardSelected?.textContent).toBe("2021");
  });

  it("should handle Enter key press", () => {
    const handleDayClick = jest.fn();
    const selected = newDate("2020-01-01");
    const preSelection = newDate("2020-01-01");
    const { container } = render(
      <Year
        {...defaultProps}
        onDayClick={handleDayClick}
        selected={selected}
        preSelection={preSelection}
      />,
    );

    const yearItem = container.querySelector(
      ".react-datepicker__year-text",
    ) as HTMLElement;
    fireEvent.keyDown(yearItem, { key: "Enter" });

    expect(handleDayClick).toHaveBeenCalled();
  });

  it("should navigate to next year on ArrowRight", () => {
    const setPreSelection = jest.fn();
    const preSelection = newDate("2020-01-01");
    const { container } = render(
      <Year
        {...defaultProps}
        preSelection={preSelection}
        setPreSelection={setPreSelection}
      />,
    );

    const yearItem = container.querySelector(
      ".react-datepicker__year-2020",
    ) as HTMLElement;
    fireEvent.keyDown(yearItem, { key: "ArrowRight" });

    expect(setPreSelection).toHaveBeenCalled();
  });

  it("should navigate to previous year on ArrowLeft", () => {
    const setPreSelection = jest.fn();
    const preSelection = newDate("2020-01-01");
    const { container } = render(
      <Year
        {...defaultProps}
        preSelection={preSelection}
        setPreSelection={setPreSelection}
      />,
    );

    const yearItem = container.querySelector(
      ".react-datepicker__year-2020",
    ) as HTMLElement;
    fireEvent.keyDown(yearItem, { key: "ArrowLeft" });

    expect(setPreSelection).toHaveBeenCalled();
  });

  it("should navigate up on ArrowUp", () => {
    const setPreSelection = jest.fn();
    const preSelection = newDate("2020-01-01");
    const { container } = render(
      <Year
        {...defaultProps}
        preSelection={preSelection}
        setPreSelection={setPreSelection}
      />,
    );

    const yearItem = container.querySelector(
      ".react-datepicker__year-2020",
    ) as HTMLElement;
    fireEvent.keyDown(yearItem, { key: "ArrowUp" });

    expect(setPreSelection).toHaveBeenCalled();
  });

  it("should navigate down on ArrowDown", () => {
    const setPreSelection = jest.fn();
    const preSelection = newDate("2020-01-01");
    const { container } = render(
      <Year
        {...defaultProps}
        preSelection={preSelection}
        setPreSelection={setPreSelection}
      />,
    );

    const yearItem = container.querySelector(
      ".react-datepicker__year-2020",
    ) as HTMLElement;
    fireEvent.keyDown(yearItem, { key: "ArrowDown" });

    expect(setPreSelection).toHaveBeenCalled();
  });

  it("should not navigate when keyboard navigation is disabled", () => {
    const setPreSelection = jest.fn();
    const preSelection = newDate("2020-01-01");
    const { container } = render(
      <Year
        {...defaultProps}
        preSelection={preSelection}
        setPreSelection={setPreSelection}
        disabledKeyboardNavigation={true}
      />,
    );

    const yearItem = container.querySelector(
      ".react-datepicker__year-2020",
    ) as HTMLElement;
    fireEvent.keyDown(yearItem, { key: "ArrowRight" });

    expect(setPreSelection).not.toHaveBeenCalled();
  });

  it("should handle Space key as Enter", () => {
    const handleDayClick = jest.fn();
    const selected = newDate("2020-01-01");
    const preSelection = newDate("2020-01-01");
    const { container } = render(
      <Year
        {...defaultProps}
        onDayClick={handleDayClick}
        selected={selected}
        preSelection={preSelection}
      />,
    );

    const yearItem = container.querySelector(
      ".react-datepicker__year-text",
    ) as HTMLElement;
    fireEvent.keyDown(yearItem, { key: " " });

    expect(handleDayClick).toHaveBeenCalled();
  });

  it("should call onYearMouseEnter when hovering", () => {
    const handleMouseEnter = jest.fn();
    const { container } = render(
      <Year {...defaultProps} onYearMouseEnter={handleMouseEnter} />,
    );

    const yearItem = container.querySelector(".react-datepicker__year-text");
    fireEvent.mouseEnter(yearItem!);

    expect(handleMouseEnter).toHaveBeenCalled();
  });

  it("should call onYearMouseLeave when leaving", () => {
    const handleMouseLeave = jest.fn();
    const { container } = render(
      <Year {...defaultProps} onYearMouseLeave={handleMouseLeave} />,
    );

    const yearWrapper = container.querySelector(
      ".react-datepicker__year-wrapper",
    );
    fireEvent.mouseLeave(yearWrapper!);

    expect(handleMouseLeave).toBeUndefined();
  });

  it("should use pointer events when usePointerEvent is true", () => {
    const handleMouseEnter = jest.fn();
    const { container } = render(
      <Year
        {...defaultProps}
        usePointerEvent={true}
        onYearMouseEnter={handleMouseEnter}
      />,
    );

    const yearItem = container.querySelector(".react-datepicker__year-text");
    fireEvent.pointerEnter(yearItem!);

    expect(handleMouseEnter).toHaveBeenCalled();
  });

  it("should mark range start year", () => {
    const startDate = newDate("2020-01-01");
    const endDate = newDate("2022-12-31");
    const { container } = render(
      <Year
        {...defaultProps}
        startDate={startDate}
        endDate={endDate}
        selectsRange={true}
      />,
    );

    const rangeStart = container.querySelector(
      ".react-datepicker__year-text--range-start",
    );
    expect(rangeStart?.textContent).toBe("2020");
  });

  it("should mark range end year", () => {
    const startDate = newDate("2020-01-01");
    const endDate = newDate("2022-12-31");
    const { container } = render(
      <Year
        {...defaultProps}
        startDate={startDate}
        endDate={endDate}
        selectsRange={true}
      />,
    );

    const rangeEnd = container.querySelector(
      ".react-datepicker__year-text--range-end",
    );
    expect(rangeEnd?.textContent).toBe("2022");
  });

  it("should mark years in range", () => {
    const startDate = newDate("2020-01-01");
    const endDate = newDate("2022-12-31");
    const { container } = render(
      <Year
        {...defaultProps}
        startDate={startDate}
        endDate={endDate}
        selectsRange={true}
      />,
    );

    const inRange = container.querySelectorAll(
      ".react-datepicker__year-text--in-range",
    );
    expect(inRange.length).toBeGreaterThan(0);
  });

  it("should handle selectsMultiple", () => {
    const selectedDates = [newDate("2020-01-01"), newDate("2021-01-01")];
    const { container } = render(
      <Year
        {...defaultProps}
        selectsMultiple={true}
        selectedDates={selectedDates}
      />,
    );

    const selectedYears = container.querySelectorAll(
      ".react-datepicker__year-text--selected",
    );
    expect(selectedYears.length).toBe(2);
  });

  it("should render custom year content", () => {
    const renderYearContent = (year: number) => `Year ${year}`;
    const { container } = render(
      <Year {...defaultProps} renderYearContent={renderYearContent} />,
    );

    const yearItem = container.querySelector(".react-datepicker__year-text");
    expect(yearItem?.textContent).toContain("Year");
  });

  it("should apply custom year class", () => {
    const yearClassName = (date: Date) => {
      return getYear(date) === 2020 ? "custom-year-class" : "";
    };
    const { container } = render(
      <Year {...defaultProps} yearClassName={yearClassName} />,
    );

    const customYear = container.querySelector(".custom-year-class");
    expect(customYear).toBeTruthy();
  });

  it("should set correct tabIndex for preselected year", () => {
    const preSelection = newDate("2020-01-01");
    const { container } = render(
      <Year {...defaultProps} preSelection={preSelection} />,
    );

    const year2020 = container.querySelector(".react-datepicker__year-2020");
    expect(year2020?.getAttribute("tabIndex")).toBe("0");
  });

  it("should set tabIndex -1 for non-preselected years", () => {
    const preSelection = newDate("2020-01-01");
    const { container } = render(
      <Year {...defaultProps} preSelection={preSelection} />,
    );

    const year2021 = container.querySelector(".react-datepicker__year-2021");
    expect(year2021?.getAttribute("tabIndex")).toBe("-1");
  });

  it("should handle excluded dates", () => {
    const excludeDates = [newDate("2020-01-01")];
    const { container } = render(
      <Year {...defaultProps} excludeDates={excludeDates} />,
    );

    const year2020 = container.querySelector(".react-datepicker__year-2020");
    expect(year2020).toHaveClass("react-datepicker__year-text--disabled");
  });

  it("should handle included dates", () => {
    const includeDates = [newDate("2020-01-01"), newDate("2021-01-01")];
    const { container } = render(
      <Year {...defaultProps} includeDates={includeDates} />,
    );

    const disabledYears = container.querySelectorAll(
      ".react-datepicker__year-text--disabled",
    );
    expect(disabledYears.length).toBeGreaterThan(0);
  });

  it("should handle filterDate", () => {
    const filterDate = (date: Date) => {
      return getYear(date) !== 2020;
    };
    const { container } = render(
      <Year {...defaultProps} filterDate={filterDate} />,
    );

    const year2020 = container.querySelector(".react-datepicker__year-2020");
    expect(year2020).toHaveClass("react-datepicker__year-text--disabled");
  });

  it("should call handleOnKeyDown when provided", () => {
    const handleOnKeyDown = jest.fn();
    const preSelection = newDate("2020-01-01");
    const { container } = render(
      <Year
        {...defaultProps}
        preSelection={preSelection}
        handleOnKeyDown={handleOnKeyDown}
      />,
    );

    const yearItem = container.querySelector(
      ".react-datepicker__year-2020",
    ) as HTMLElement;
    fireEvent.keyDown(yearItem, { key: "ArrowRight" });

    expect(handleOnKeyDown).toHaveBeenCalled();
  });

  it("should not prevent default on Tab key", () => {
    const { container } = render(<Year {...defaultProps} />);

    const yearItem = container.querySelector(
      ".react-datepicker__year-text",
    ) as HTMLElement;
    const event = new KeyboardEvent("keydown", {
      key: "Tab",
      bubbles: true,
      cancelable: true,
    });
    const preventDefaultSpy = jest.spyOn(event, "preventDefault");

    yearItem.dispatchEvent(event);

    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it("should mark selecting range start", () => {
    const startDate = newDate("2020-01-01");
    const selectingDate = newDate("2022-01-01");
    const { container } = render(
      <Year
        {...defaultProps}
        selectsEnd={true}
        startDate={startDate}
        selectingDate={selectingDate}
      />,
    );

    const selectingRangeStart = container.querySelector(
      ".react-datepicker__year-text--selecting-range-start",
    );
    expect(selectingRangeStart?.textContent).toBe("2020");
  });

  it("should mark selecting range end", () => {
    const startDate = newDate("2020-01-01");
    const selectingDate = newDate("2022-01-01");
    const { container } = render(
      <Year
        {...defaultProps}
        selectsEnd={true}
        startDate={startDate}
        selectingDate={selectingDate}
      />,
    );

    const selectingRangeEnd = container.querySelector(
      ".react-datepicker__year-text--selecting-range-end",
    );
    expect(selectingRangeEnd?.textContent).toBe("2022");
  });

  it("should set aria-current for current year", () => {
    const currentYear = getYear(newDate());
    const { container } = render(
      <Year {...defaultProps} date={newDate()} yearItemNumber={12} />,
    );

    const currentYearElement = container.querySelector(`[aria-current="date"]`);
    expect(currentYearElement?.textContent).toBe(String(currentYear));
  });

  it("should return null when date is undefined", () => {
    const { container } = render(
      <Year
        {...defaultProps}
        date={undefined}
        onYearMouseEnter={jest.fn()}
        onYearMouseLeave={jest.fn()}
      />,
    );

    expect(container.querySelector(".react-datepicker__year")).toBeNull();
  });

  it("should call clearSelectingDate on mouse leave", () => {
    const clearSelectingDate = jest.fn();
    const { container } = render(
      <Year {...defaultProps} clearSelectingDate={clearSelectingDate} />,
    );

    const yearWrapper = container.querySelector(
      ".react-datepicker__year-wrapper",
    );
    fireEvent.mouseLeave(yearWrapper!);

    expect(clearSelectingDate).toHaveBeenCalled();
  });

  it("should call clearSelectingDate on pointer leave when usePointerEvent is true", () => {
    const clearSelectingDate = jest.fn();
    const { container } = render(
      <Year
        {...defaultProps}
        usePointerEvent={true}
        clearSelectingDate={clearSelectingDate}
      />,
    );

    const yearWrapper = container.querySelector(
      ".react-datepicker__year-wrapper",
    );
    fireEvent.pointerLeave(yearWrapper!);

    expect(clearSelectingDate).toHaveBeenCalled();
  });
});
