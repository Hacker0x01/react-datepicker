import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DatePicker from "../index";
import * as dateUtils from "../date_utils";

const {
  toZonedTime,
  fromZonedTime,
  formatInTimeZone,
  nowInTimeZone,
  __resetDateFnsTzCache,
  __setDateFnsTzNull,
} = dateUtils;

describe("Timezone utility functions", () => {
  // Use a fixed UTC date for consistent testing
  const testDate = new Date("2024-06-15T12:00:00Z");

  describe("toZonedTime", () => {
    it("should return the original date when no timezone is provided", () => {
      const result = toZonedTime(testDate);
      expect(result).toBe(testDate);
    });

    it("should return the original date when timezone is undefined", () => {
      const result = toZonedTime(testDate, undefined);
      expect(result).toBe(testDate);
    });

    it("should convert UTC date to specified timezone", () => {
      // 2024-06-15T12:00:00Z in America/New_York (EDT, UTC-4) should be 08:00
      const result = toZonedTime(testDate, "America/New_York");
      expect(result).toBeInstanceOf(Date);
      // The result should represent 08:00 in New York time
      expect(result.getHours()).toBe(8);
      expect(result.getMinutes()).toBe(0);
    });

    it("should handle UTC timezone", () => {
      const result = toZonedTime(testDate, "UTC");
      expect(result).toBeInstanceOf(Date);
      // toZonedTime returns a date that represents the time in the target timezone
      // When displayed locally, it should show 12:00 (the UTC time)
      expect(result.getHours()).toBe(12);
      expect(result.getMinutes()).toBe(0);
    });

    it("should handle different timezones", () => {
      // Test with Europe/London (BST in June, UTC+1)
      const londonResult = toZonedTime(testDate, "Europe/London");
      expect(londonResult).toBeInstanceOf(Date);
      // 12:00 UTC should be 13:00 in London during BST
      expect(londonResult.getHours()).toBe(13);

      // Test with Asia/Tokyo (JST, UTC+9)
      const tokyoResult = toZonedTime(testDate, "Asia/Tokyo");
      expect(tokyoResult).toBeInstanceOf(Date);
      // 12:00 UTC should be 21:00 in Tokyo
      expect(tokyoResult.getHours()).toBe(21);
    });
  });

  describe("fromZonedTime", () => {
    it("should return the original date when no timezone is provided", () => {
      const result = fromZonedTime(testDate);
      expect(result).toBe(testDate);
    });

    it("should return the original date when timezone is undefined", () => {
      const result = fromZonedTime(testDate, undefined);
      expect(result).toBe(testDate);
    });

    it("should convert zoned time to UTC", () => {
      // Create a date representing 08:00 in New York (which is 12:00 UTC in June)
      const nyDate = new Date("2024-06-15T08:00:00");
      const result = fromZonedTime(nyDate, "America/New_York");
      expect(result).toBeInstanceOf(Date);
      // The result should be 12:00 UTC
      expect(result.getUTCHours()).toBe(12);
    });

    it("should handle UTC timezone", () => {
      const utcDate = new Date("2024-06-15T12:00:00");
      const result = fromZonedTime(utcDate, "UTC");
      expect(result).toBeInstanceOf(Date);
      expect(result.getUTCHours()).toBe(12);
    });

    it("should be inverse of toZonedTime", () => {
      const timezone = "America/Los_Angeles";
      const zonedTime = toZonedTime(testDate, timezone);
      const backToUtc = fromZonedTime(zonedTime, timezone);
      // The round-trip should give us back the original UTC time
      expect(backToUtc.getTime()).toBe(testDate.getTime());
    });
  });

  describe("formatInTimeZone", () => {
    it("should use standard format when no timezone is provided", () => {
      const result = formatInTimeZone(testDate, "yyyy-MM-dd");
      // Without timezone, it should use the standard format function
      expect(result).toBe("2024-06-15");
    });

    it("should format date in specified timezone", () => {
      // 2024-06-15T12:00:00Z formatted in America/New_York should show 08:00
      const result = formatInTimeZone(
        testDate,
        "yyyy-MM-dd HH:mm",
        "America/New_York",
      );
      expect(result).toBe("2024-06-15 08:00");
    });

    it("should format date in UTC timezone", () => {
      const result = formatInTimeZone(testDate, "yyyy-MM-dd HH:mm", "UTC");
      expect(result).toBe("2024-06-15 12:00");
    });

    it("should format date in different timezones", () => {
      // Europe/London (BST in June, UTC+1)
      const londonResult = formatInTimeZone(testDate, "HH:mm", "Europe/London");
      expect(londonResult).toBe("13:00");

      // Asia/Tokyo (JST, UTC+9)
      const tokyoResult = formatInTimeZone(testDate, "HH:mm", "Asia/Tokyo");
      expect(tokyoResult).toBe("21:00");
    });

    it("should handle complex format strings", () => {
      const result = formatInTimeZone(
        testDate,
        "EEEE, MMMM d, yyyy 'at' h:mm a",
        "America/New_York",
      );
      expect(result).toBe("Saturday, June 15, 2024 at 8:00 AM");
    });
  });

  describe("nowInTimeZone", () => {
    it("should return current date when no timezone is provided", () => {
      const before = new Date();
      const result = nowInTimeZone();
      const after = new Date();

      expect(result.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(result.getTime()).toBeLessThanOrEqual(after.getTime());
    });

    it("should return current date in specified timezone", () => {
      const result = nowInTimeZone("America/New_York");
      expect(result).toBeInstanceOf(Date);
      // We can't test exact time, but we can verify it's a valid date
      expect(result.getTime()).not.toBeNaN();
    });

    it("should return current date in UTC", () => {
      const result = nowInTimeZone("UTC");
      expect(result).toBeInstanceOf(Date);
      expect(result.getTime()).not.toBeNaN();
    });
  });
});

describe("Timezone utility functions - edge cases", () => {
  it("should handle empty string timezone", () => {
    const testDate = new Date("2024-06-15T12:00:00Z");
    const result = toZonedTime(testDate, "");
    // Empty string is falsy, so should return original date
    expect(result).toBe(testDate);
  });

  it("should handle various date inputs", () => {
    const dates = [
      new Date("2024-01-01T00:00:00Z"),
      new Date("2024-06-15T12:30:45Z"),
      new Date("2024-12-31T23:59:59Z"),
    ];

    dates.forEach((date) => {
      const result = toZonedTime(date);
      expect(result).toBe(date);
    });
  });

  it("should handle DST transitions", () => {
    // Test a date during DST (summer)
    const summerDate = new Date("2024-07-15T12:00:00Z");
    const summerResult = formatInTimeZone(
      summerDate,
      "HH:mm",
      "America/New_York",
    );
    expect(summerResult).toBe("08:00"); // EDT (UTC-4)

    // Test a date outside DST (winter)
    const winterDate = new Date("2024-01-15T12:00:00Z");
    const winterResult = formatInTimeZone(
      winterDate,
      "HH:mm",
      "America/New_York",
    );
    expect(winterResult).toBe("07:00"); // EST (UTC-5)
  });

  it("should handle dates at midnight", () => {
    const midnightUtc = new Date("2024-06-15T00:00:00Z");
    const result = formatInTimeZone(
      midnightUtc,
      "yyyy-MM-dd HH:mm",
      "America/New_York",
    );
    // Midnight UTC is 8 PM previous day in New York (EDT)
    expect(result).toBe("2024-06-14 20:00");
  });

  it("should handle dates at end of day", () => {
    const endOfDayUtc = new Date("2024-06-15T23:59:59Z");
    const result = formatInTimeZone(
      endOfDayUtc,
      "yyyy-MM-dd HH:mm",
      "Asia/Tokyo",
    );
    // 23:59 UTC is 08:59 next day in Tokyo (JST, UTC+9)
    expect(result).toBe("2024-06-16 08:59");
  });
});

describe("Timezone utility functions - integration", () => {
  it("should correctly round-trip dates through timezone conversions", () => {
    const originalDate = new Date("2024-06-15T15:30:00Z");
    const timezones = [
      "America/New_York",
      "America/Los_Angeles",
      "Europe/London",
      "Europe/Paris",
      "Asia/Tokyo",
      "Australia/Sydney",
      "UTC",
    ];

    timezones.forEach((tz) => {
      const zoned = toZonedTime(originalDate, tz);
      const backToUtc = fromZonedTime(zoned, tz);
      expect(backToUtc.getTime()).toBe(originalDate.getTime());
    });
  });

  it("should format consistently across different timezones", () => {
    const utcDate = new Date("2024-06-15T00:00:00Z");

    // All these should represent the same moment in time
    const utcFormatted = formatInTimeZone(utcDate, "yyyy-MM-dd HH:mm", "UTC");
    const nyFormatted = formatInTimeZone(
      utcDate,
      "yyyy-MM-dd HH:mm",
      "America/New_York",
    );
    const tokyoFormatted = formatInTimeZone(
      utcDate,
      "yyyy-MM-dd HH:mm",
      "Asia/Tokyo",
    );

    expect(utcFormatted).toBe("2024-06-15 00:00");
    expect(nyFormatted).toBe("2024-06-14 20:00"); // Previous day in NY
    expect(tokyoFormatted).toBe("2024-06-15 09:00"); // Same day, later in Tokyo
  });
});

describe("DatePicker with timeZone prop", () => {
  it("should render DatePicker with timeZone prop", () => {
    const { container } = render(
      <DatePicker
        selected={new Date("2024-06-15T12:00:00Z")}
        onChange={() => {}}
        timeZone="America/New_York"
      />,
    );
    expect(container.querySelector("input")).not.toBeNull();
  });

  it("should convert initial date to timezone", () => {
    const utcDate = new Date("2024-06-15T12:00:00Z");
    const { container } = render(
      <DatePicker
        selected={utcDate}
        onChange={() => {}}
        timeZone="America/New_York"
        dateFormat="yyyy-MM-dd"
      />,
    );
    const input = container.querySelector("input");
    // The date should be displayed (time formatting depends on local timezone)
    expect(input?.value).toContain("2024-06-15");
  });

  it("should handle date selection with timezone", () => {
    const utcDate = new Date("2024-06-15T12:00:00Z");
    let selectedDate: Date | null = null;

    const { container } = render(
      <DatePicker
        selected={utcDate}
        onChange={(date) => {
          selectedDate = date;
        }}
        timeZone="America/New_York"
      />,
    );

    // Open the calendar
    const input = container.querySelector("input");
    if (input) {
      fireEvent.focus(input);
    }

    // Find and click a day
    const days = container.querySelectorAll(".react-datepicker__day");
    const dayToClick = Array.from(days).find(
      (day) =>
        !day.classList.contains("react-datepicker__day--outside-month") &&
        day.textContent === "20",
    );

    if (dayToClick) {
      fireEvent.click(dayToClick);
    }

    // The selected date should be converted back to UTC
    expect(selectedDate).not.toBeNull();
  });

  it("should handle preSelection with timezone", () => {
    const { container } = render(
      <DatePicker onChange={() => {}} timeZone="Europe/London" />,
    );

    // Open the calendar
    const input = container.querySelector("input");
    if (input) {
      fireEvent.focus(input);
    }

    // Calendar should be open
    expect(container.querySelector(".react-datepicker__month")).not.toBeNull();
  });

  it("should work with inline mode and timezone", () => {
    const utcDate = new Date("2024-06-15T12:00:00Z");
    const { container } = render(
      <DatePicker
        selected={utcDate}
        onChange={() => {}}
        timeZone="Asia/Tokyo"
        inline
      />,
    );

    // Calendar should be visible inline
    expect(container.querySelector(".react-datepicker__month")).not.toBeNull();
  });

  it("should handle onChange with timezone conversion", () => {
    const utcDate = new Date("2024-06-15T12:00:00Z");
    const onChangeMock = jest.fn();

    const { container } = render(
      <DatePicker
        selected={utcDate}
        onChange={onChangeMock}
        timeZone="America/Los_Angeles"
      />,
    );

    // Open the calendar
    const input = container.querySelector("input");
    if (input) {
      fireEvent.focus(input);
    }

    // Find and click a day
    const days = container.querySelectorAll(".react-datepicker__day");
    const dayToClick = Array.from(days).find(
      (day) =>
        !day.classList.contains("react-datepicker__day--outside-month") &&
        day.textContent === "15",
    );

    if (dayToClick) {
      fireEvent.click(dayToClick);
    }

    // onChange should have been called
    expect(onChangeMock).toHaveBeenCalled();
  });

  it("should handle onSelect with timezone", () => {
    const utcDate = new Date("2024-06-15T12:00:00Z");
    const onSelectMock = jest.fn();

    const { container } = render(
      <DatePicker
        selected={utcDate}
        onChange={() => {}}
        onSelect={onSelectMock}
        timeZone="UTC"
      />,
    );

    // Open the calendar
    const input = container.querySelector("input");
    if (input) {
      fireEvent.focus(input);
    }

    // Find and click a day
    const days = container.querySelectorAll(".react-datepicker__day");
    const dayToClick = Array.from(days).find(
      (day) =>
        !day.classList.contains("react-datepicker__day--outside-month") &&
        day.textContent === "15",
    );

    if (dayToClick) {
      fireEvent.click(dayToClick);
    }

    // onSelect should have been called
    expect(onSelectMock).toHaveBeenCalled();
  });

  it("should handle time change with timezone", () => {
    // Mock ResizeObserver
    const mockResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
    window.ResizeObserver = mockResizeObserver;

    const utcDate = new Date("2024-06-15T12:00:00Z");
    const onChangeMock = jest.fn();

    const { container } = render(
      <DatePicker
        selected={utcDate}
        onChange={onChangeMock}
        timeZone="America/New_York"
        showTimeSelect
        dateFormat="yyyy-MM-dd HH:mm"
      />,
    );

    // Open the calendar
    const input = container.querySelector("input");
    if (input) {
      fireEvent.focus(input);
    }

    // Find and click a time option
    const timeOptions = container.querySelectorAll(
      ".react-datepicker__time-list-item",
    );
    if (timeOptions.length > 0) {
      fireEvent.click(timeOptions[0]!);
    }

    // onChange should have been called with timezone conversion
    expect(onChangeMock).toHaveBeenCalled();
  });

  it("should handle time change with timezone and selectsRange using showTimeInput (start date)", () => {
    const startDate = new Date("2024-06-15T12:00:00Z");
    const endDate = new Date("2024-06-20T14:00:00Z");
    const onChangeMock = jest.fn();

    const { container } = render(
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={onChangeMock}
        timeZone="America/New_York"
        showTimeInput
        inline
      />,
    );

    // Find the start time input and change it
    const timeInputs = container.querySelectorAll(
      ".react-datepicker-time__input input",
    );
    expect(timeInputs.length).toBe(2);

    // Change the start time input
    fireEvent.change(timeInputs[0]!, { target: { value: "10:30" } });

    // onChange should have been called with timezone conversion
    expect(onChangeMock).toHaveBeenCalled();
    const [changedStartDate, changedEndDate] = onChangeMock.mock.calls[0][0];

    // Both dates should be Date objects
    expect(changedStartDate).toBeInstanceOf(Date);
    expect(changedEndDate).toBeInstanceOf(Date);
  });

  it("should handle time change with timezone and selectsRange using showTimeInput (end date)", () => {
    const startDate = new Date("2024-06-15T12:00:00Z");
    const endDate = new Date("2024-06-20T14:00:00Z");
    const onChangeMock = jest.fn();

    const { container } = render(
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={onChangeMock}
        timeZone="America/New_York"
        showTimeInput
        inline
      />,
    );

    // Find the end time input and change it
    const timeInputs = container.querySelectorAll(
      ".react-datepicker-time__input input",
    );
    expect(timeInputs.length).toBe(2);

    // Change the end time input
    fireEvent.change(timeInputs[1]!, { target: { value: "16:45" } });

    // onChange should have been called with timezone conversion
    expect(onChangeMock).toHaveBeenCalled();
    const [changedStartDate, changedEndDate] = onChangeMock.mock.calls[0][0];

    // Both dates should be Date objects
    expect(changedStartDate).toBeInstanceOf(Date);
    expect(changedEndDate).toBeInstanceOf(Date);
  });

  it("should handle time change with timezone and selectsRange with only start date", () => {
    const startDate = new Date("2024-06-15T12:00:00Z");
    const onChangeMock = jest.fn();

    const { container } = render(
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={null}
        onChange={onChangeMock}
        timeZone="America/New_York"
        showTimeInput
        inline
      />,
    );

    // Find the start time input and change it
    const timeInputs = container.querySelectorAll(
      ".react-datepicker-time__input input",
    );
    expect(timeInputs.length).toBe(2);

    // Change the start time input
    fireEvent.change(timeInputs[0]!, { target: { value: "10:30" } });

    // onChange should have been called with timezone conversion
    expect(onChangeMock).toHaveBeenCalled();
    const [changedStartDate, changedEndDate] = onChangeMock.mock.calls[0][0];

    // Start date should be converted, end date should be null
    expect(changedStartDate).toBeInstanceOf(Date);
    expect(changedEndDate).toBeNull();
  });

  it("should handle time change with timezone and selectsRange with only end date (edge case)", () => {
    const endDate = new Date("2024-06-20T14:00:00Z");
    const onChangeMock = jest.fn();

    const { container } = render(
      <DatePicker
        selectsRange
        startDate={null}
        endDate={endDate}
        onChange={onChangeMock}
        timeZone="America/New_York"
        showTimeInput
        inline
      />,
    );

    // Find the end time input and change it
    const timeInputs = container.querySelectorAll(
      ".react-datepicker-time__input input",
    );
    expect(timeInputs.length).toBe(2);

    // Change the end time input
    fireEvent.change(timeInputs[1]!, { target: { value: "16:45" } });

    // onChange should have been called with timezone conversion
    expect(onChangeMock).toHaveBeenCalled();
    const [changedStartDate, changedEndDate] = onChangeMock.mock.calls[0][0];

    // Start date should be null, end date should be converted
    expect(changedStartDate).toBeNull();
    expect(changedEndDate).toBeInstanceOf(Date);
  });

  it("should handle time change with timezone and selectsRange using legacy showTimeSelect (both dates)", () => {
    // Mock ResizeObserver
    const mockResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
    window.ResizeObserver = mockResizeObserver;

    const startDate = new Date("2024-06-15T12:00:00Z");
    const endDate = new Date("2024-06-20T14:00:00Z");
    const onChangeMock = jest.fn();

    const { container } = render(
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={onChangeMock}
        timeZone="America/New_York"
        showTimeSelect
        dateFormat="yyyy-MM-dd HH:mm"
        inline
      />,
    );

    // Find and click a time option (legacy single time picker behavior)
    const timeOptions = container.querySelectorAll(
      ".react-datepicker__time-list-item",
    );
    if (timeOptions.length > 0) {
      fireEvent.click(timeOptions[0]!);
    }

    // onChange should have been called with timezone conversion
    expect(onChangeMock).toHaveBeenCalled();
  });

  it("should handle time change with timezone and selectsRange using legacy showTimeSelect (only start date)", () => {
    // Mock ResizeObserver
    const mockResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
    window.ResizeObserver = mockResizeObserver;

    const startDate = new Date("2024-06-15T12:00:00Z");
    const onChangeMock = jest.fn();

    const { container } = render(
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={null}
        onChange={onChangeMock}
        timeZone="America/New_York"
        showTimeSelect
        dateFormat="yyyy-MM-dd HH:mm"
        inline
      />,
    );

    // Find and click a time option (legacy single time picker behavior - applies to start date when no end date)
    const timeOptions = container.querySelectorAll(
      ".react-datepicker__time-list-item",
    );
    if (timeOptions.length > 0) {
      fireEvent.click(timeOptions[0]!);
    }

    // onChange should have been called with timezone conversion
    expect(onChangeMock).toHaveBeenCalled();
    const [changedStartDate, changedEndDate] = onChangeMock.mock.calls[0][0];

    // Start date should be converted, end date should be null
    expect(changedStartDate).toBeInstanceOf(Date);
    expect(changedEndDate).toBeNull();
  });
});

describe("Timezone fallback behavior (when date-fns-tz is not installed)", () => {
  const originalNodeEnv = process.env.NODE_ENV;

  beforeEach(() => {
    // Set to development to trigger console.warn
    process.env.NODE_ENV = "development";
    // Simulate date-fns-tz not being installed
    __setDateFnsTzNull();
  });

  afterEach(() => {
    // Reset the cache after each test
    __resetDateFnsTzCache();
    process.env.NODE_ENV = originalNodeEnv;
  });

  it("toZonedTime should return original date and warn when date-fns-tz is not installed", () => {
    const consoleSpy = jest.spyOn(console, "warn").mockImplementation();
    const testDate = new Date("2024-06-15T12:00:00Z");

    const result = toZonedTime(testDate, "America/New_York");

    expect(result).toBe(testDate);
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("date-fns-tz"),
    );

    consoleSpy.mockRestore();
  });

  it("fromZonedTime should return original date and warn when date-fns-tz is not installed", () => {
    const consoleSpy = jest.spyOn(console, "warn").mockImplementation();
    const testDate = new Date("2024-06-15T12:00:00Z");

    const result = fromZonedTime(testDate, "America/New_York");

    expect(result).toBe(testDate);
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("date-fns-tz"),
    );

    consoleSpy.mockRestore();
  });

  it("formatInTimeZone should use standard format and warn when date-fns-tz is not installed", () => {
    const consoleSpy = jest.spyOn(console, "warn").mockImplementation();
    const testDate = new Date("2024-06-15T12:00:00Z");

    const result = formatInTimeZone(testDate, "yyyy-MM-dd", "America/New_York");

    // Should return formatted date using standard format
    expect(result).toBe("2024-06-15");
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("date-fns-tz"),
    );

    consoleSpy.mockRestore();
  });

  it("should not warn in production mode", () => {
    process.env.NODE_ENV = "production";
    const consoleSpy = jest.spyOn(console, "warn").mockImplementation();
    const testDate = new Date("2024-06-15T12:00:00Z");

    toZonedTime(testDate, "America/New_York");

    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
