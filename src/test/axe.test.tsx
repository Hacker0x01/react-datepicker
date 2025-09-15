import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import React from "react";
import DatePicker from "../index";
import { newDate, addDays } from "../date_utils";

expect.extend(toHaveNoViolations);

describe("Accessibility Tests", () => {
  describe("Basic DatePicker", () => {
    it("should work with proper labeling", async () => {
      const { container } = render(
        <div>
          <label htmlFor="datepicker">Select date</label>
          <DatePicker id="datepicker" selected={newDate()} />
        </div>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should work with placeholder", async () => {
      const { container } = render(
        <DatePicker placeholderText="Select date" selected={newDate()} />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should work with aria-label", async () => {
      const { container } = render(
        <DatePicker
          placeholderText="Select date"
          aria-label="Choose a date"
          selected={newDate()}
        />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should work when disabled", async () => {
      const { container } = render(
        <div>
          <label htmlFor="disabled-picker">Select date</label>
          <DatePicker id="disabled-picker" selected={newDate()} disabled />
        </div>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should work when readonly", async () => {
      const { container } = render(
        <div>
          <label htmlFor="readonly-picker">Select date</label>
          <DatePicker id="readonly-picker" selected={newDate()} readOnly />
        </div>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Opened DatePicker", () => {
    it("should not have violations when calendar is open", async () => {
      // FAILING: ARIA structure issues - role="row" needs proper parent container
      const { container } = render(
        <div>
          <label htmlFor="open-picker">Select date</label>
          <DatePicker id="open-picker" selected={newDate()} open />
        </div>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should work with inline calendar", async () => {
      // FAILING: ARIA structure issues - role="row" needs proper parent container
      const { container } = render(
        <div>
          <h2 id="calendar-title">Select a date</h2>
          <DatePicker
            selected={newDate()}
            inline
            aria-labelledby="calendar-title"
          />
        </div>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Date Range Picker", () => {
    it("should work with date range picker", async () => {
      const { container } = render(
        <div>
          <label htmlFor="range-picker">Select date range</label>
          <DatePicker
            id="range-picker"
            selectsRange
            startDate={newDate()}
            endDate={addDays(newDate(), 7)}
          />
        </div>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should work with open range picker", async () => {
      // FAILING: ARIA structure issues - role="row" needs proper parent container
      const { container } = render(
        <div>
          <label htmlFor="open-range-picker">Select date range</label>
          <DatePicker
            id="open-range-picker"
            selectsRange
            startDate={newDate()}
            endDate={addDays(newDate(), 7)}
            open
          />
        </div>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Time Selection", () => {
    it("should work with time selection", async () => {
      const { container } = render(
        <div>
          <label htmlFor="time-picker">Select date and time</label>
          <DatePicker
            id="time-picker"
            selected={newDate()}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should work with time input", async () => {
      const { container } = render(
        <div>
          <label htmlFor="time-input-picker">Select date and time</label>
          <DatePicker
            id="time-input-picker"
            selected={newDate()}
            showTimeInput
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should work with time only", async () => {
      const { container } = render(
        <div>
          <label htmlFor="time-only-picker">Select time</label>
          <DatePicker
            id="time-only-picker"
            selected={newDate()}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </div>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Month and Year Pickers", () => {
    it("should work with month picker", async () => {
      const { container } = render(
        <div>
          <label htmlFor="month-picker">Select month</label>
          <DatePicker
            id="month-picker"
            selected={newDate()}
            dateFormat="MM/yyyy"
            showMonthYearPicker
          />
        </div>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should work with year picker", async () => {
      const { container } = render(
        <div>
          <label htmlFor="year-picker">Select year</label>
          <DatePicker
            id="year-picker"
            selected={newDate()}
            showYearPicker
            dateFormat="yyyy"
          />
        </div>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should work with quarter picker", async () => {
      const { container } = render(
        <div>
          <label htmlFor="quarter-picker">Select quarter</label>
          <DatePicker
            id="quarter-picker"
            selected={newDate()}
            showQuarterYearPicker
            dateFormat="'Q'Q yyyy"
          />
        </div>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Week Selection", () => {
    it("should work with week picker", async () => {
      const { container } = render(
        <div>
          <label htmlFor="week-picker">Select week</label>
          <DatePicker
            id="week-picker"
            selected={newDate()}
            showWeekPicker
            dateFormat="'Week' w, yyyy"
          />
        </div>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should work with week numbers shown", async () => {
      // FAILING: ARIA children requirements - role="listbox" has incorrect child elements
      const { container } = render(
        <div>
          <label htmlFor="week-numbers-picker">Select date</label>
          <DatePicker
            id="week-numbers-picker"
            selected={newDate()}
            showWeekNumbers
            open
          />
        </div>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Multiple Months", () => {
    it("should work with multiple months", async () => {
      // FAILING: ARIA structure issues - role="row" needs proper parent container
      const { container } = render(
        <div>
          <label htmlFor="multi-month-picker">Select date</label>
          <DatePicker
            id="multi-month-picker"
            selected={newDate()}
            monthsShown={2}
            open
          />
        </div>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Custom Components", () => {
    it("should work with clear button", async () => {
      const { container } = render(
        <div>
          <label htmlFor="clearable-picker">Select date</label>
          <DatePicker
            id="clearable-picker"
            selected={newDate()}
            isClearable
            clearButtonTitle="Clear date"
          />
        </div>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should work with calendar icon", async () => {
      const { container } = render(
        <div>
          <label htmlFor="icon-picker">Select date</label>
          <DatePicker id="icon-picker" selected={newDate()} showIcon />
        </div>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Edge Cases", () => {
    it("should work with no selected date", async () => {
      const { container } = render(
        <div>
          <label htmlFor="empty-picker">Select date</label>
          <DatePicker id="empty-picker" placeholderText="Choose a date" />
        </div>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should work with portal", async () => {
      const { container } = render(
        <div>
          <label htmlFor="portal-picker">Select date</label>
          <DatePicker id="portal-picker" selected={newDate()} withPortal open />
        </div>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
