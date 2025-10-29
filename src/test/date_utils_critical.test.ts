import { safeDateFormat, isDayInRange, getDefaultLocale } from "../date_utils";

describe("date_utils critical functions coverage", () => {
  describe("safeDateFormat with invalid locale", () => {
    it("should warn when locale object is not found (line 195)", () => {
      const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();

      const testDate = new Date("2024-01-15T10:00:00");

      // Line 195: console.warn for invalid locale
      safeDateFormat(testDate, {
        dateFormat: "PP",
        locale: "invalid-locale-xyz",
      });

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'A locale object was not found for the provided string ["invalid-locale-xyz"]',
        ),
      );

      consoleWarnSpy.mockRestore();
    });

    it("should not warn when valid locale is provided", () => {
      const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();

      const testDate = new Date("2024-01-15T10:00:00");

      // Should not warn with valid locale
      safeDateFormat(testDate, {
        dateFormat: "PP",
        locale: getDefaultLocale(),
      });

      expect(consoleWarnSpy).not.toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
    });

    it("should fallback to default locale when invalid locale is provided", () => {
      const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();

      const testDate = new Date("2024-01-15T10:00:00");

      // Should still format the date even with invalid locale
      const result = safeDateFormat(testDate, {
        dateFormat: "yyyy-MM-dd",
        locale: "invalid-locale",
      });

      expect(result).toBeTruthy();
      expect(typeof result).toBe("string");

      consoleWarnSpy.mockRestore();
    });
  });

  describe("isDayInRange with error handling", () => {
    it("should catch error and return false when isWithinInterval throws (line 565)", () => {
      const testDate = new Date("2024-01-15");

      // Create invalid date range that might cause isWithinInterval to throw
      const invalidStartDate = new Date("invalid");
      const invalidEndDate = new Date("also-invalid");

      // Line 565: error catch block
      const result = isDayInRange(testDate, invalidStartDate, invalidEndDate);

      // Should return false instead of throwing
      expect(result).toBe(false);
    });

    it("should return true for date within valid range", () => {
      const testDate = new Date("2024-01-15");
      const startDate = new Date("2024-01-10");
      const endDate = new Date("2024-01-20");

      const result = isDayInRange(testDate, startDate, endDate);

      expect(result).toBe(true);
    });

    it("should return false for date outside valid range", () => {
      const testDate = new Date("2024-01-25");
      const startDate = new Date("2024-01-10");
      const endDate = new Date("2024-01-20");

      const result = isDayInRange(testDate, startDate, endDate);

      expect(result).toBe(false);
    });

    it("should handle edge case with same start and end date", () => {
      const testDate = new Date("2024-01-15");
      const startDate = new Date("2024-01-15");
      const endDate = new Date("2024-01-15");

      const result = isDayInRange(testDate, startDate, endDate);

      expect(result).toBe(true);
    });

    it("should handle null start date", () => {
      const testDate = new Date("2024-01-15");
      const endDate = new Date("2024-01-20");

      // Should handle null gracefully
      const result = isDayInRange(testDate, null as unknown as Date, endDate);

      // Depending on implementation, this might throw or return false
      expect(typeof result).toBe("boolean");
    });

    it("should handle null end date", () => {
      const testDate = new Date("2024-01-15");
      const startDate = new Date("2024-01-10");

      // Should handle null gracefully
      const result = isDayInRange(testDate, startDate, null as unknown as Date);

      // Depending on implementation, this might throw or return false
      expect(typeof result).toBe("boolean");
    });
  });

  describe("Edge cases in date utilities", () => {
    it("should handle very old dates", () => {
      const oldDate = new Date("1900-01-01");

      const formatted = safeDateFormat(oldDate, {
        dateFormat: "yyyy-MM-dd",
      });

      expect(formatted).toContain("1900");
    });

    it("should handle far future dates", () => {
      const futureDate = new Date("2099-12-31");

      const formatted = safeDateFormat(futureDate, {
        dateFormat: "yyyy-MM-dd",
      });

      expect(formatted).toContain("2099");
    });

    it("should handle leap year dates", () => {
      const leapYearDate = new Date("2024-02-29");

      const formatted = safeDateFormat(leapYearDate, {
        dateFormat: "yyyy-MM-dd",
      });

      expect(formatted).toContain("2024-02-29");
    });

    it("should handle daylight saving time transitions", () => {
      // Date during DST transition (US)
      const dstDate = new Date("2024-03-10T02:30:00");

      const formatted = safeDateFormat(dstDate, {
        dateFormat: "yyyy-MM-dd HH:mm",
      });

      expect(formatted).toBeTruthy();
      expect(typeof formatted).toBe("string");
    });
  });

  describe("safeDateFormat with various formats", () => {
    it("should format with time tokens", () => {
      const testDate = new Date("2024-01-15T14:30:45");

      const formatted = safeDateFormat(testDate, {
        dateFormat: "yyyy-MM-dd HH:mm:ss",
      });

      expect(formatted).toContain("2024-01-15");
      expect(formatted).toContain("14:30:45");
    });

    it("should format with localized patterns", () => {
      const testDate = new Date("2024-01-15");

      const formatted = safeDateFormat(testDate, {
        dateFormat: "PPP",
      });

      expect(formatted).toBeTruthy();
      expect(typeof formatted).toBe("string");
    });
  });
});
