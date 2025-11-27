import {
  toZonedTime,
  fromZonedTime,
  formatInTimeZone,
  nowInTimeZone,
} from "../date_utils";

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
