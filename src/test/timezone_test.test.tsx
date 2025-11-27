import {
  toZonedTime,
  fromZonedTime,
  formatInTimeZone,
  nowInTimeZone,
} from "../date_utils";

describe("Timezone utility functions", () => {
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

    it("should return the original date when date-fns-tz is not installed", () => {
      // Suppress console.warn for this test
      const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

      // Since date-fns-tz is not installed, it should return the original date
      const result = toZonedTime(testDate, "America/New_York");
      expect(result).toBe(testDate);

      // Should have warned about missing date-fns-tz
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining("date-fns-tz"),
      );

      warnSpy.mockRestore();
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

    it("should return the original date when date-fns-tz is not installed", () => {
      // Suppress console.warn for this test
      const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

      // Since date-fns-tz is not installed, it should return the original date
      const result = fromZonedTime(testDate, "America/New_York");
      expect(result).toBe(testDate);

      warnSpy.mockRestore();
    });
  });

  describe("formatInTimeZone", () => {
    it("should use standard format when no timezone is provided", () => {
      const result = formatInTimeZone(testDate, "yyyy-MM-dd");
      // Without timezone, it should use the standard format function
      expect(result).toBe("2024-06-15");
    });

    it("should use standard format when date-fns-tz is not installed", () => {
      // Suppress console.warn for this test
      const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

      // Since date-fns-tz is not installed, it should fall back to standard format
      const result = formatInTimeZone(
        testDate,
        "yyyy-MM-dd",
        "America/New_York",
      );
      expect(result).toBe("2024-06-15");

      warnSpy.mockRestore();
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

    it("should return current date when date-fns-tz is not installed", () => {
      // Suppress console.warn for this test
      const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

      const before = new Date();
      const result = nowInTimeZone("America/New_York");
      const after = new Date();

      // The result should be a Date object within the expected range
      expect(result).toBeInstanceOf(Date);
      expect(result.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(result.getTime()).toBeLessThanOrEqual(after.getTime());

      warnSpy.mockRestore();
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
});
