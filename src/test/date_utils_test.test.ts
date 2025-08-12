import {
  addYears,
  setSeconds,
  addQuarters,
  setHours,
  setMinutes,
} from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

import {
  newDate,
  addHours,
  addDays,
  subDays,
  isEqual,
  isSameMinute,
  isSameDay,
  isSameMonth,
  isSameQuarter,
  isSameYear,
  isDayDisabled,
  isDayExcluded,
  isMonthDisabled,
  isQuarterDisabled,
  isYearDisabled,
  isValid,
  monthDisabledBefore,
  monthDisabledAfter,
  yearDisabledBefore,
  yearDisabledAfter,
  getEffectiveMinDate,
  getEffectiveMaxDate,
  addZero,
  isTimeDisabled,
  isTimeInDisabledRange,
  isDayInRange,
  parseDate,
  isMonthInRange,
  isQuarterInRange,
  isYearInRange,
  getStartOfYear,
  getYearsPeriod,
  setDefaultLocale,
  yearsDisabledAfter,
  yearsDisabledBefore,
  quarterDisabledBefore,
  quarterDisabledAfter,
  getWeek,
  safeDateRangeFormat,
  getHolidaysMap,
  arraysAreEqual,
  startOfMinute,
  isDateBefore,
  getMidnightDate,
  registerLocale,
  isMonthYearDisabled,
} from "../date_utils";

registerLocale("pt-BR", ptBR);

describe("date_utils", () => {
  describe("newDate", () => {
    it("should return new Date() for invalid value passed", () => {
      jest.useFakeTimers();
      expect(newDate("21123asd")).toEqual(new Date());
      jest.useRealTimers();
    });
  });

  describe("isEqual", () => {
    it("should return true for null dates", () => {
      expect(isEqual(null, null)).toBe(true);
    });

    it("should return false for a null and non-null date", () => {
      expect(isEqual(newDate(), null)).toBe(false);
      expect(isEqual(null, newDate())).toBe(false);
    });

    it("should return false for non-equal dates", () => {
      expect(isEqual(newDate("2016-02-10"), newDate("2016-02-11"))).toBe(false);
    });

    it("should return false for non-equal date and date with time", () => {
      expect(isEqual(newDate("2016-02-10"), newDate("2016-02-11 13:13"))).toBe(
        false,
      );
    });

    it("should return false for non-equal time", () => {
      expect(
        isEqual(newDate("2016-02-10 13:13"), newDate("2016-02-11 13:14")),
      ).toBe(false);
    });

    it("should return true for equal dates", () => {
      expect(isEqual(newDate("2016-02-10"), newDate("2016-02-10"))).toBe(true);
    });

    it("should return true for equal time", () => {
      expect(
        isEqual(newDate("2016-02-10 13:13"), newDate("2016-02-10 13:13")),
      ).toBe(true);
    });
  });

  describe("isSameDay", () => {
    it("should return true for null dates", () => {
      expect(isSameDay(null, null)).toBe(true);
    });

    it("should return false for a null and non-null date", () => {
      expect(isSameDay(newDate(), null)).toBe(false);
      expect(isSameDay(null, newDate())).toBe(false);
    });

    it("should return false for non-equal dates", () => {
      expect(isSameDay(newDate("2016-02-10"), newDate("2016-02-11"))).toBe(
        false,
      );
    });

    it("should return true for equal dates", () => {
      expect(isSameDay(newDate("2016-02-10"), newDate("2016-02-10"))).toBe(
        true,
      );
    });
  });

  describe("isSameMonth", () => {
    it("should return true for null dates", () => {
      expect(isSameMonth(null, null)).toBe(true);
    });

    it("should return false for a null and non-null date", () => {
      expect(isSameMonth(newDate(), null)).toBe(false);
      expect(isSameMonth(null, newDate())).toBe(false);
    });

    it("should return false for non-equal months", () => {
      expect(isSameMonth(newDate("2016-02-10"), newDate("2016-03-10"))).toBe(
        false,
      );
    });

    it("should return true for equal months", () => {
      expect(isSameMonth(newDate("2016-02-10"), newDate("2016-02-29"))).toBe(
        true,
      );
    });
  });

  describe("isSameQuarter", () => {
    it("should return true for null dates", () => {
      expect(isSameQuarter(null, null)).toBe(true);
    });

    it("should return false for a null and non-null date", () => {
      expect(isSameQuarter(newDate(), null)).toBe(false);
      expect(isSameQuarter(null, newDate())).toBe(false);
    });

    it("should return false for non-equal quarters", () => {
      expect(isSameQuarter(newDate("2016-02-10"), newDate("2016-04-10"))).toBe(
        false,
      );
    });

    it("should return true for equal quarters", () => {
      expect(isSameQuarter(newDate("2016-02-10"), newDate("2016-03-29"))).toBe(
        true,
      );
    });
  });

  describe("isSameYear", () => {
    it("should return true for null dates", () => {
      expect(isSameYear(null, null)).toBe(true);
    });

    it("should return false for a null and non-null date", () => {
      expect(isSameYear(newDate(), null)).toBe(false);
      expect(isSameYear(null, newDate())).toBe(false);
    });

    it("should return false for non-equal years", () => {
      expect(isSameYear(newDate("2016-02-10"), newDate("2015-02-10"))).toBe(
        false,
      );
    });

    it("should return true for equal years", () => {
      expect(isSameYear(newDate("2016-02-10"), newDate("2016-12-24"))).toBe(
        true,
      );
    });
  });

  describe("isDayDisabled", () => {
    it("should be enabled by default", () => {
      const day = newDate();
      expect(isDayDisabled(day)).toBe(false);
    });

    it("should be enabled if on the min date", () => {
      const day = newDate();
      expect(isDayDisabled(day, { minDate: day })).toBe(false);
    });

    it("should be disabled if before the min date", () => {
      const day = newDate();
      const minDate = addDays(day, 1);
      expect(isDayDisabled(day, { minDate })).toBe(true);
    });

    it("should be enabled if on the max date", () => {
      const day = newDate();
      expect(isDayDisabled(day, { maxDate: day })).toBe(false);
    });

    it("should be disabled if after the max date", () => {
      const day = newDate();
      const maxDate = subDays(day, 1);
      expect(isDayDisabled(day, { maxDate })).toBe(true);
    });

    it("should be disabled if in excluded dates", () => {
      const day = newDate();
      expect(isDayDisabled(day, { excludeDates: [day] })).toBe(true);
    });

    it("should be disabled if on excluded date interval start", () => {
      const day = newDate();
      expect(
        isDayDisabled(day, {
          excludeDateIntervals: [{ start: day, end: addDays(day, 1) }],
        }),
      ).toBe(true);
    });

    it("should be disabled if within excluded date interval", () => {
      const day = newDate();
      expect(
        isDayDisabled(day, {
          excludeDateIntervals: [
            { start: subDays(day, 1), end: addDays(day, 1) },
          ],
        }),
      ).toBe(true);
    });

    it("should be disabled if on excluded date interval end", () => {
      const day = newDate();
      expect(
        isDayDisabled(day, {
          excludeDateIntervals: [{ start: subDays(day, 1), end: day }],
        }),
      ).toBe(true);
    });

    it("should be enabled and normalize negative intervals correctly", () => {
      const day = newDate();
      expect(
        isDayDisabled(day, {
          excludeDateIntervals: [
            { start: addDays(day, 1), end: subDays(day, 1) },
          ],
        }),
      ).toBe(true);
    });

    it("should be enabled if excluded date interval is empty", () => {
      const day = newDate();
      expect(isDayDisabled(day, { excludeDateIntervals: [] })).toBe(false);
    });

    it("should be enabled if not in excluded date interval", () => {
      const day = newDate();
      expect(
        isDayDisabled(day, {
          excludeDateIntervals: [
            { start: addDays(day, 1), end: addDays(day, 2) },
          ],
        }),
      ).toBe(false);
    });

    it("should be enabled if in included dates", () => {
      const day = newDate();
      expect(isDayDisabled(day, { includeDates: [day] })).toBe(false);
    });

    it("should be enabled if in included date intervals", () => {
      const day = newDate();
      expect(
        isDayDisabled(day, {
          includeDateIntervals: [
            { start: subDays(day, 1), end: addDays(day, 1) },
          ],
        }),
      ).toBe(false);
    });

    it("should be disabled if not in included dates", () => {
      const day = newDate();
      const includeDates = [addDays(day, 1)];
      expect(isDayDisabled(day, { includeDates })).toBe(true);
    });

    // eslint-disable-next-line jest/no-identical-title
    it("should be disabled if not in included dates", () => {
      const day = newDate();
      expect(
        isDayDisabled(day, {
          includeDateIntervals: [
            { start: subDays(day, 10), end: subDays(day, 5) },
          ],
        }),
      ).toBe(true);
    });

    it("should be enabled if date filter returns true", () => {
      const day = newDate();
      const filterDate = (d: Date) => isEqual(d, day);
      expect(isDayDisabled(day, { filterDate })).toBe(false);
    });

    it("should be disabled if date filter returns false", () => {
      const day = newDate();
      const filterDate = (d: Date) => !isEqual(d, day);
      expect(isDayDisabled(day, { filterDate })).toBe(true);
    });

    it("should not allow date filter to modify input date", () => {
      const day = newDate();
      const dayClone = newDate(day);
      const filterDate = (d: Date) => {
        addDays(d, 1);
        return true;
      };
      isDayDisabled(day, { filterDate });
      expect(isEqual(day, dayClone)).toBe(true);
    });
  });

  describe("isDayExcluded", () => {
    it("should not be excluded by default", () => {
      const day = newDate();
      expect(isDayExcluded(day)).toBe(false);
    });

    it("should be excluded if within excluded date interval", () => {
      const day = newDate();
      expect(
        isDayExcluded(day, {
          excludeDateIntervals: [
            { start: subDays(day, 1), end: addDays(day, 1) },
          ],
        }),
      ).toBe(true);
    });

    it("should not be excluded if excluded date interval is empty", () => {
      const day = newDate();
      expect(isDayExcluded(day, { excludeDateIntervals: [] })).toBe(false);
    });

    it("should not be excluded if not within excluded date intervals", () => {
      const day = newDate();
      expect(
        isDayExcluded(day, {
          excludeDateIntervals: [
            { start: addDays(day, 1), end: addDays(day, 2) },
          ],
        }),
      ).toBe(false);
    });

    it("should be enabled and normalize negative intervals correctly", () => {
      const day = newDate();
      expect(
        isDayExcluded(day, {
          excludeDateIntervals: [
            { start: addDays(day, 1), end: subDays(day, 1) },
          ],
        }),
      ).toBe(true);
    });

    it("should not be excluded if in excluded dates and not within excluded date intervals", () => {
      const day = newDate();
      expect(
        isDayExcluded(day, {
          excludeDates: [day],
          excludeDateIntervals: [
            { start: addDays(day, 1), end: addDays(day, 2) },
          ],
        }),
      ).toBe(false);
    });

    it("should be excluded if in excluded dates and there are no excluded date intervals", () => {
      const day = newDate();
      expect(isDayExcluded(day, { excludeDates: [day] })).toBe(true);
    });

    it("should not be excluded if not in excluded dates and there are no excluded date intervals", () => {
      const day = newDate();
      const excludedDay = newDate();
      const currentMonth = excludedDay.getMonth();
      excludedDay.setMonth(currentMonth === 11 ? 0 : currentMonth + 1);
      expect(isDayExcluded(day, { excludeDates: [] })).toBeFalsy();
    });
  });

  describe("isMonthDisabled", () => {
    it("should be enabled by default", () => {
      const day = newDate();
      expect(isMonthDisabled(day)).toBe(false);
    });

    it("should be enabled if on the min date", () => {
      const day = newDate();
      expect(isMonthDisabled(day, { minDate: day })).toBe(false);
    });

    it("should be disabled if before the min date", () => {
      const day = newDate();
      const minDate = addDays(day, 40);
      expect(isMonthDisabled(day, { minDate })).toBe(true);
    });

    it("should be enabled if on the max date", () => {
      const day = newDate();
      expect(isMonthDisabled(day, { maxDate: day })).toBe(false);
    });

    it("should be disabled if after the max date", () => {
      const day = newDate();
      const maxDate = subDays(day, 40);
      expect(isMonthDisabled(day, { maxDate })).toBe(true);
    });

    it("should be disabled if in excluded dates", () => {
      const day = newDate();
      expect(isMonthDisabled(day, { excludeDates: [day] })).toBe(true);
    });

    it("should be enabled if in included dates", () => {
      const day = newDate();
      expect(isMonthDisabled(day, { includeDates: [day] })).toBe(false);
    });

    it("should be disabled if not in included dates", () => {
      const day = newDate();
      const includeDates = [addDays(day, 40)];
      expect(isMonthDisabled(day, { includeDates })).toBe(true);
    });

    it("should be enabled if date filter returns true", () => {
      const day = newDate();
      const filterDate = (d: Date) => isEqual(d, day);
      expect(isMonthDisabled(day, { filterDate })).toBe(false);
    });

    it("should be disabled if date filter returns false", () => {
      const day = newDate();
      const filterDate = (d: Date) => !isEqual(d, day);
      expect(isMonthDisabled(day, { filterDate })).toBe(true);
    });

    it("should not allow date filter to modify input date", () => {
      const day = newDate();
      const dayClone = newDate(day);
      const filterDate = (d: Date) => {
        addDays(d, 40);
        return true;
      };
      isMonthDisabled(day, { filterDate });
      expect(isEqual(day, dayClone)).toBe(true);
    });

    it("should be enabled if before minDate but same month", () => {
      const day = newDate("2023-01-01");
      expect(isMonthDisabled(day, { minDate: newDate("2023-01-02") })).toBe(
        false,
      );
    });

    it("should be enabled if after maxDate but same month", () => {
      const day = newDate("2023-01-02");
      expect(
        isMonthDisabled(day, {
          maxDate: newDate("2023-01-01"),
        }),
      ).toBe(false);
    });
  });

  describe("isQuarterDisabled", () => {
    it("should be enabled by default", () => {
      const day = newDate();
      expect(isQuarterDisabled(day)).toBe(false);
    });

    it("should be enabled if on the min date", () => {
      const day = newDate();
      expect(isQuarterDisabled(day, { minDate: day })).toBe(false);
    });

    it("should be disabled if before the min date", () => {
      const day = newDate();
      const minDate = addDays(day, 40);
      expect(isQuarterDisabled(day, { minDate })).toBe(true);
    });

    it("should be enabled if on the max date", () => {
      const day = newDate();
      expect(isQuarterDisabled(day, { maxDate: day })).toBe(false);
    });

    it("should be disabled if after the max date", () => {
      const day = newDate();
      const maxDate = subDays(day, 40);
      expect(isQuarterDisabled(day, { maxDate })).toBe(true);
    });

    it("should be disabled if in excluded dates", () => {
      const day = newDate();
      expect(isQuarterDisabled(day, { excludeDates: [day] })).toBe(true);
    });

    it("should be enabled if in included dates", () => {
      const day = newDate();
      expect(isQuarterDisabled(day, { includeDates: [day] })).toBe(false);
    });

    it("should be disabled if not in included dates", () => {
      const day = newDate();
      const includeDates = [addQuarters(day, 1)];
      expect(isQuarterDisabled(day, { includeDates })).toBe(true);
    });

    it("should be enabled if date filter returns true", () => {
      const day = newDate();
      const filterDate = (d: Date) => isEqual(d, day);
      expect(isQuarterDisabled(day, { filterDate })).toBe(false);
    });

    it("should be disabled if date filter returns false", () => {
      const day = newDate();
      const filterDate = (d: Date) => !isEqual(d, day);
      expect(isQuarterDisabled(day, { filterDate })).toBe(true);
    });

    it("should not allow date filter to modify input date", () => {
      const day = newDate();
      const dayClone = newDate(day);
      const filterDate = (d: Date) => {
        addDays(d, 40);
        return true;
      };
      isQuarterDisabled(day, { filterDate });
      expect(isEqual(day, dayClone)).toBe(true);
    });
  });

  describe("isYearDisabled", () => {
    const year = 2023;
    const newYearsDay = newDate(`${year}-01-01`);

    it("should be enabled by default", () => {
      expect(isYearDisabled(year)).toBe(false);
    });

    it("should be enabled if on the min date", () => {
      expect(isYearDisabled(year, { minDate: newYearsDay })).toBe(false);
    });

    it("should be disabled if before the min date", () => {
      expect(isYearDisabled(year, { minDate: addYears(newYearsDay, 1) })).toBe(
        true,
      );
    });

    it("should be enabled if on the max date", () => {
      expect(isYearDisabled(year, { maxDate: newYearsDay })).toBe(false);
    });

    it("should be disabled if after the max date", () => {
      expect(isYearDisabled(year, { maxDate: addYears(newYearsDay, -1) })).toBe(
        true,
      );
    });

    it("should be disabled if in excluded dates", () => {
      const day = newDate(`${year}-02-01`);
      expect(isYearDisabled(year, { excludeDates: [day] })).toBe(true);
    });

    it("should be enabled if in included dates", () => {
      expect(isYearDisabled(year, { includeDates: [newYearsDay] })).toBe(false);
    });

    it("should be disabled if not in included dates", () => {
      const includeDates = [addYears(newYearsDay, 1)];
      expect(isYearDisabled(year, { includeDates })).toBe(true);
    });

    it("should be enabled if date filter returns true", () => {
      const filterDate = (d: Date) => isSameYear(d, newYearsDay);
      expect(isYearDisabled(year, { filterDate })).toBe(false);
    });

    it("should be disabled if date filter returns false", () => {
      const filterDate = (d: Date) => !isSameYear(d, newYearsDay);
      expect(isYearDisabled(year, { filterDate })).toBe(true);
    });
  });

  describe("isValid", () => {
    it("should return true if date is valid and equal or after minDate", () => {
      expect(isValid(newDate("2021-11-15"), newDate("2021-11-15"))).toBe(true);
      expect(isValid(newDate("2021-11-30"), newDate("2021-11-15"))).toBe(true);
    });

    it("should return false if date is valid and before minDate", () => {
      expect(isValid(newDate("2021-11-01"), newDate("2021-11-15"))).toBe(false);
    });
  });

  describe("monthDisabledBefore", () => {
    it("should return false by default", () => {
      expect(monthDisabledBefore(newDate())).toBe(false);
    });

    it("should return true if min date is in the same month", () => {
      const day = newDate("2016-03-19");
      const minDate = newDate("2016-03-01");
      expect(monthDisabledBefore(day, { minDate })).toBe(true);
    });

    it("should return false if min date is in the previous month", () => {
      const day = newDate("2016-03-19");
      const minDate = newDate("2016-02-29");
      expect(monthDisabledBefore(day, { minDate })).toBe(false);
    });

    it("should return true if previous month is before include dates", () => {
      const day = newDate("2016-03-19");
      const includeDates = [newDate("2016-03-01")];
      expect(monthDisabledBefore(day, { includeDates })).toBe(true);
    });
  });

  describe("monthDisabledAfter", () => {
    it("should return false by default", () => {
      expect(monthDisabledAfter(newDate())).toBe(false);
    });

    it("should return true if max date is in the same month", () => {
      const day = newDate("2016-03-19");
      const maxDate = newDate("2016-03-31");
      expect(monthDisabledAfter(day, { maxDate })).toBe(true);
    });

    it("should return false if max date is in the next month", () => {
      const day = newDate("2016-03-19");
      const maxDate = newDate("2016-04-01");
      expect(monthDisabledAfter(day, { maxDate })).toBe(false);
    });

    it("should return true if next month is after include dates", () => {
      const day = newDate("2016-03-19");
      const includeDates = [newDate("2016-03-01")];
      expect(monthDisabledAfter(day, { includeDates })).toBe(true);
    });
  });

  describe("quarterDisabledBefore", () => {
    it("should return false by default", () => {
      expect(quarterDisabledBefore(newDate())).toBe(false);
    });

    it("should return true if min date is in the same year", () => {
      const day = newDate("2016-02-19");
      const minDate = newDate("2016-03-01");
      expect(quarterDisabledBefore(day, { minDate })).toBe(true);
    });

    it("should return false if min date is in the previous year", () => {
      const day = newDate("2016-03-19");
      const minDate = newDate("2015-03-29");
      expect(quarterDisabledBefore(day, { minDate })).toBe(false);
    });

    it("should return true if previous year is before include dates", () => {
      const day = newDate("2016-03-19");
      const includeDates = [newDate("2016-03-01")];
      expect(quarterDisabledBefore(day, { includeDates })).toBe(true);
    });
  });

  describe("quarterDisabledAfter", () => {
    it("should return false by default", () => {
      expect(quarterDisabledAfter(newDate())).toBe(false);
    });

    it("should return true if max date is in the same year", () => {
      const day = newDate("2016-03-19");
      const maxDate = newDate("2016-08-31");
      expect(quarterDisabledAfter(day, { maxDate })).toBe(true);
    });

    it("should return false if max date is in the next year", () => {
      const day = newDate("2016-03-19");
      const maxDate = newDate("2017-04-01");
      expect(quarterDisabledAfter(day, { maxDate })).toBe(false);
    });

    it("should return true if next year is after include dates", () => {
      const day = newDate("2016-03-19");
      const includeDates = [newDate("2016-03-01")];
      expect(quarterDisabledAfter(day, { includeDates })).toBe(true);
    });
  });

  describe("yearDisabledBefore", () => {
    it("should return false by default", () => {
      expect(yearDisabledBefore(newDate())).toBe(false);
    });

    it("should return true if min date is in the same year", () => {
      const day = newDate("2016-02-19");
      const minDate = newDate("2016-03-01");
      expect(yearDisabledBefore(day, { minDate })).toBe(true);
    });

    it("should return false if min date is in the previous year", () => {
      const day = newDate("2016-03-19");
      const minDate = newDate("2015-03-29");
      expect(yearDisabledBefore(day, { minDate })).toBe(false);
    });

    it("should return true if previous year is before include dates", () => {
      const day = newDate("2016-03-19");
      const includeDates = [newDate("2016-03-01")];
      expect(yearDisabledBefore(day, { includeDates })).toBe(true);
    });
  });

  describe("yearDisabledAfter", () => {
    it("should return false by default", () => {
      expect(yearDisabledAfter(newDate())).toBe(false);
    });

    it("should return true if max date is in the same year", () => {
      const day = newDate("2016-03-19");
      const maxDate = newDate("2016-08-31");
      expect(yearDisabledAfter(day, { maxDate })).toBe(true);
    });

    it("should return false if max date is in the next year", () => {
      const day = newDate("2016-03-19");
      const maxDate = newDate("2017-04-01");
      expect(yearDisabledAfter(day, { maxDate })).toBe(false);
    });

    it("should return true if next year is after include dates", () => {
      const day = newDate("2016-03-19");
      const includeDates = [newDate("2016-03-01")];
      expect(yearDisabledAfter(day, { includeDates })).toBe(true);
    });
  });

  describe("getEffectiveMinDate", () => {
    it("should return null by default", () => {
      expect(getEffectiveMinDate({})).toBeFalsy();
    });

    it("should return the min date", () => {
      const minDate = newDate("2016-03-30");
      const result = getEffectiveMinDate({ minDate });
      expect(minDate).toEqual(result);
    });

    it("should return the minimum include date", () => {
      const date1 = newDate("2016-03-30");
      const date2 = newDate("2016-04-01");
      const includeDates = [date1, date2];
      expect(getEffectiveMinDate({ includeDates })).toEqual(date1);
    });

    it("should return the minimum include date satisfying the min date", () => {
      const minDate = newDate("2016-03-31");
      const date1 = newDate("2016-03-30");
      const date2 = newDate("2016-04-01");
      const includeDates = [date1, date2];
      expect(getEffectiveMinDate({ minDate, includeDates })).toEqual(date2);
    });
  });

  describe("getEffectiveMaxDate", () => {
    it("should return null by default", () => {
      expect(getEffectiveMaxDate({})).toBeFalsy();
    });

    it("should return the max date", () => {
      const maxDate = newDate("2016-03-30");
      expect(getEffectiveMaxDate({ maxDate })).toEqual(maxDate);
    });

    it("should return the maximum include date", () => {
      const date1 = newDate("2016-03-30");
      const date2 = newDate("2016-04-01");
      const includeDates = [date1, date2];
      expect(getEffectiveMaxDate({ includeDates })).toEqual(date2);
    });

    it("should return the maximum include date satisfying the max date", () => {
      const maxDate = newDate("2016-03-31");
      const date1 = newDate("2016-03-30");
      const date2 = newDate("2016-04-01");
      const includeDates = [date1, date2];
      expect(getEffectiveMaxDate({ maxDate, includeDates })).toEqual(date1);
    });
  });

  describe("addZero", () => {
    it("should return the same number if greater than 10", () => {
      const input = 11;
      const expected = "11";
      const result = addZero(input);
      expect(result).toEqual(expected);
    });

    it("should return the number prefixed with zero if less than 10", () => {
      const input = 1;
      const expected = "01";
      const result = addZero(input);
      expect(result).toEqual(expected);
    });
  });

  describe("isTimeDisabled", () => {
    it("should be enabled by default", () => {
      const date = newDate();
      const time = setHours(setMinutes(date, 30), 1);
      expect(isTimeDisabled(time)).toBe(false);
    });

    it("should be disabled if in excluded times", () => {
      const date = newDate();
      const time = setHours(setMinutes(date, 30), 1);
      expect(isTimeDisabled(time, { excludeTimes: [time] })).toBe(true);
    });

    it("should be enabled if in included times", () => {
      const date = newDate();
      const time = setHours(setMinutes(date, 30), 1);
      expect(isTimeDisabled(time, { includeTimes: [time] })).toBe(false);
    });

    it("should be disabled if not in included times", () => {
      const date = newDate();
      const time = setHours(setMinutes(date, 30), 1);
      const includeTimes = [addHours(time, 1)];
      expect(isTimeDisabled(time, { includeTimes })).toBe(true);
    });

    it("should be enabled if time filter returns true", () => {
      const date = newDate();
      const time = setHours(setMinutes(date, 30), 1);
      const filterTime = (t: Date) => isEqual(t, time);
      expect(isTimeDisabled(time, { filterTime })).toBe(false);
    });

    it("should be disabled if time filter returns false", () => {
      const date = newDate();
      const time = setHours(setMinutes(date, 30), 1);
      const filterTime = (t: Date) => !isEqual(t, time);
      expect(isTimeDisabled(time, { filterTime })).toBe(true);
    });

    it("should not allow time filter to modify input time", () => {
      const date = newDate();
      const time = setHours(setMinutes(date, 30), 1);
      const timeClone = newDate(time);
      const filterTime = (t: Date) => {
        addHours(t, 1);
        return true;
      };
      isTimeDisabled(time, { filterTime });
      expect(isEqual(time, timeClone)).toBe(true);
    });
  });

  describe("isTimeInDisabledRange", () => {
    it("should tell if time is in disabled range", () => {
      const date = newDate("2016-03-15");
      let time = setHours(date, 1);
      time = setMinutes(time, 30);
      time = setSeconds(time, 30); // 2016-03-15 01:30:30

      const minTime = setHours(setMinutes(date, 30), 0); //2016-03-15 00:30:00
      const maxTime = setHours(setMinutes(setSeconds(date, 35), 30), 1); //2016-03-15 01:30:35
      expect(isTimeInDisabledRange(time, { minTime, maxTime })).toBe(false);
    });

    it("should tell if time is not in disabled range", () => {
      const date = newDate("2016-03-15");
      const time = setHours(setMinutes(date, 30), 0);
      const minTime = setHours(setMinutes(date, 30), 1);
      const maxTime = setHours(setMinutes(date, 30), 5);
      expect(isTimeInDisabledRange(time, { minTime, maxTime })).toBe(true);
    });

    it("should correctly handle max time is before min time", () => {
      const date = newDate("2016-03-15");
      const time = setHours(setMinutes(date, 30), 10);
      const minTime = setHours(setMinutes(date, 30), 5);
      const maxTime = setHours(setMinutes(date, 30), 0);
      expect(isTimeInDisabledRange(time, { minTime, maxTime })).toBe(true);
    });
  });

  describe("isDayInRange", () => {
    it("should tell if day is in range", () => {
      const day = newDate("2016-02-15 09:40");
      const startDate = newDate("2016-02-01 09:40");
      const endDate = newDate("2016-03-15 08:40");
      expect(isDayInRange(day, startDate, endDate)).toBe(true);
    });

    it("should tell if day is in range, max bound test", () => {
      const day = newDate("2016-03-15 09:40");
      const startDate = newDate("2016-02-01 09:40");
      const endDate = newDate("2016-03-15 08:40");
      expect(isDayInRange(day, startDate, endDate)).toBe(true);
    });

    it("should tell if day is in range, min bound test", () => {
      const day = newDate("2016-02-01 08:40");
      const startDate = newDate("2016-02-01 09:40");
      const endDate = newDate("2016-03-15 08:40");
      expect(isDayInRange(day, startDate, endDate)).toBe(true);
    });

    it("should tell if day is not in range", () => {
      const day = newDate("2016-07-15 09:40");
      const startDate = newDate("2016-02-15 09:40");
      const endDate = newDate("2016-03-15 08:40");
      expect(isDayInRange(day, startDate, endDate)).toBe(false);
    });

    it("should correctly handle max time is before min time", () => {
      const day = newDate("2016-02-01 09:40");
      const startDate = newDate("2016-02-15 09:40");
      const endDate = newDate("2016-01-15 08:40");
      expect(isDayInRange(day, startDate, endDate)).toBe(true);
    });
  });

  describe("parseDate", () => {
    it("should parse date that matches the format", () => {
      const value = "01/15/2019";
      const dateFormat = "MM/dd/yyyy";

      expect(parseDate(value, dateFormat, undefined, true)).not.toBeNull();
    });

    it("should parse date based on locale", () => {
      const value = "26/05/1995";
      const dateFormat = "P";

      const expected = new Date("05/26/1995");
      const actual = parseDate(value, dateFormat, "pt-BR", true);

      expect(actual).toEqual(expected);
    });

    it("should parse date that matches one of the formats", () => {
      const value = "01/15/2019";
      const dateFormat = ["yyyy-MM-dd", "MM/dd/yyyy"];

      expect(parseDate(value, dateFormat, undefined, true)).not.toBeNull();
    });

    it("should prefer the first matching format in array (strict)", () => {
      const value = "01/06/2019";
      const valueLax = "1/6/2019";
      const dateFormat = ["MM/dd/yyyy", "dd/MM/yyyy"];

      const expected = new Date(2019, 0, 6);

      expect(parseDate(value, dateFormat, undefined, true)).toEqual(expected);
      expect(parseDate(valueLax, dateFormat, undefined, true)).toBeNull();
    });

    it("should prefer the first matching format in array", () => {
      const value = "01/06/2019";
      const valueLax = "1/6/2019";
      const dateFormat = ["MM/dd/yyyy", "dd/MM/yyyy"];

      const expected = new Date(2019, 0, 6);

      expect(parseDate(value, dateFormat, undefined, false)).toEqual(expected);
      expect(parseDate(valueLax, dateFormat, undefined, false)).toEqual(
        expected,
      );
    });

    it("should not parse date that does not match the format", () => {
      const value = "01/15/20";
      const dateFormat = "MM/dd/yyyy";

      expect(parseDate(value, dateFormat, undefined, true)).toBeNull();
    });

    it("should not parse date that does not match any of the formats", () => {
      const value = "01/15/20";
      const dateFormat = ["MM/dd/yyyy", "yyyy-MM-dd"];

      expect(parseDate(value, dateFormat, undefined, true)).toBeNull();
    });

    it("should parse date without strict parsing", () => {
      const value = "1/2/2020";
      const dateFormat = "MM/dd/yyyy";

      expect(parseDate(value, dateFormat, undefined, false)).not.toBeNull();
    });

    it("should parse date based on locale without strict parsing", () => {
      const value = "26/05/1995";
      const dateFormat = "P";

      const expected = new Date("05/26/1995");
      const actual = parseDate(value, dateFormat, "pt-BR", false);

      expect(actual).toEqual(expected);
    });

    it("should parse date based on locale w/o strict", () => {
      const valuePt = "26. fev 1995";
      const valueEn = "26. feb 1995";

      const locale = "pt-BR";
      const dateFormat = "d. MMM yyyy";

      const expected = new Date(1995, 1, 26);

      expect(parseDate(valuePt, dateFormat, locale, false)).toEqual(expected);
      expect(parseDate(valueEn, dateFormat, undefined, false)).toEqual(
        expected,
      );
      expect(parseDate(valueEn, dateFormat, locale, false)).toBeNull();
    });

    it("should not parse date based on locale without a given locale", () => {
      const value = "26/05/1995";
      const dateFormat = "P";

      const actual = parseDate(value, dateFormat, undefined, false);

      expect(actual).toBeNull();
    });

    it("should parse date based on default locale", () => {
      const value = "26/05/1995";
      const dateFormat = "P";

      const expected = new Date("05/26/1995");
      setDefaultLocale("pt-BR");
      const actual = parseDate(value, dateFormat, undefined, false);
      setDefaultLocale(undefined);

      expect(actual).toEqual(expected);
    });
  });

  describe("isMonthInRange", () => {
    it("should return true if the month passed is in range", () => {
      const day = newDate("2015-02-01");
      const startDate = newDate("2015-01-01");
      const endDate = newDate("2015-08-01");

      expect(isMonthInRange(startDate, endDate, 4, day)).toBe(true);
    });

    it("should return false if the month passed is not in range", () => {
      const day = newDate("2015-02-01");
      const startDate = newDate("2015-01-01");
      const endDate = newDate("2015-08-01");

      expect(isMonthInRange(startDate, endDate, 9, day)).toBe(false);
    });

    it("should return true if the month passed is in range and maxDate +1 year", () => {
      const day = newDate("2019-06-04");
      const startDate = newDate("2019-06-04");
      const endDate = newDate("2020-02-01");

      expect(isMonthInRange(startDate, endDate, 5, day)).toBe(true);
    });
  });

  describe("getStartOfYear", () => {
    it("should return the start of the year", () => {
      const day = new Date("2020-04-13T00:00:00.000+08:00");
      expect(getStartOfYear(day).getDate()).toBe(1);
      expect(getStartOfYear(day).getMonth()).toBe(0);
    });
  });

  describe("isQuarterInRange", () => {
    it("should return true if the quarter passed is in range", () => {
      const day = newDate("2015-02-01");
      const startDate = newDate("2015-01-01");
      const endDate = newDate("2015-08-01");

      expect(isQuarterInRange(startDate, endDate, 2, day)).toBe(true);
    });

    it("should return false if the quarter passed is not in range", () => {
      const day = newDate("2015-02-01");
      const startDate = newDate("2015-01-01");
      const endDate = newDate("2015-09-01");

      expect(isQuarterInRange(startDate, endDate, 4, day)).toBe(false);
    });

    it("should return true if the quarter passed is in range and maxDate +1 year", () => {
      const day = newDate("2019-06-04");
      const startDate = newDate("2019-06-04");
      const endDate = newDate("2020-02-01");

      expect(isQuarterInRange(startDate, endDate, 5, day)).toBe(true);
    });
  });

  describe("isYearInRange", () => {
    it("should return true if the year passed is in range", () => {
      const startDate = newDate("2000-01-01");
      const endDate = newDate("2015-08-01");
      // Check start range
      expect(isYearInRange(2000, startDate, endDate)).toBe(true);
      // Check end range
      expect(isYearInRange(2015, startDate, endDate)).toBe(true);
      expect(isYearInRange(2010, startDate, endDate)).toBe(true);
    });

    it("should return false if the year passed is not in range", () => {
      const startDate = newDate("2000-01-01");
      const endDate = newDate("2015-08-01");

      expect(isYearInRange(1999, startDate, endDate)).toBe(false);
      expect(isYearInRange(2016, startDate, endDate)).toBe(false);
    });

    it("should return false if range isn't passed", () => {
      expect(isYearInRange(2016)).toBe(false);
    });
  });

  describe("getYearsPeriod", () => {
    it("should get start and end of default 11 years period", () => {
      const date = newDate("2000-01-01");
      const { startPeriod, endPeriod } = getYearsPeriod(date);
      expect(startPeriod).toBe(1993);
      expect(endPeriod).toBe(2004);
    });

    it("should get start and end of custom 8 years period", () => {
      const date = newDate("2000-01-01");
      const { startPeriod, endPeriod } = getYearsPeriod(date, 9);
      expect(startPeriod).toBe(1999);
      expect(endPeriod).toBe(2007);
    });
  });

  describe("yearsDisabledAfter", () => {
    it("should return false by default", () => {
      expect(yearsDisabledAfter(newDate())).toBe(false);
    });

    it("should return true if max date is in the same year", () => {
      const day = newDate("2016-03-19");
      const maxDate = newDate("2016-08-31");
      expect(yearsDisabledAfter(day, { maxDate })).toBe(true);
    });

    it("should return false if max date is in the next period years", () => {
      const day = newDate("2016-03-19");
      const maxDate = newDate("2018-04-01");
      expect(yearsDisabledAfter(day, { maxDate })).toBe(false);
    });

    it("should return false if max date is in a next period year", () => {
      const day = newDate("1996-08-08 00:00:00");
      const maxDate = newDate("2020-08-08 00:00:00");
      expect(yearsDisabledAfter(day, { maxDate })).toBe(false);
    });
  });

  describe("yearsDisabledBefore", () => {
    it("should return false by default", () => {
      expect(yearsDisabledBefore(newDate())).toBe(false);
    });

    it("should return true if min date is in the same year", () => {
      const day = newDate("2016-02-19");
      const minDate = newDate("2016-03-01");
      expect(yearsDisabledBefore(day, { minDate })).toBe(true);
    });

    it("should return false if min date is in the previous period year", () => {
      const day = newDate("2016-03-19");
      const minDate = newDate("2004-03-29");
      expect(yearsDisabledBefore(day, { minDate })).toBe(false);
    });

    it("should return false if min date is in a previous period year", () => {
      const day = newDate("2044-08-08 00:00:00");
      const minDate = newDate("2020-08-08 00:00:00");
      expect(yearsDisabledBefore(day, { minDate })).toBe(false);
    });
  });

  describe("week", () => {
    it("should return the first 2021 year week", () => {
      const first2021Day = new Date("2021-01-01");
      expect(getWeek(first2021Day)).toEqual(53);
    });

    it("should return the 4 2021 year week", () => {
      const date = new Date("2021-01-19");
      expect(getWeek(date)).toEqual(3);
    });

    it("should return the first 2022 year week", () => {
      const first2022Day = new Date("2022-01-01");
      expect(getWeek(first2022Day)).toEqual(52);
    });
  });

  describe("safeDateRangeFormat", () => {
    const props = {
      dateFormat: "MM/dd/yyyy",
      locale: "en",
    };

    it("should return blank string when startDate and endDate are both null", () => {
      const startDate = undefined;
      const endDate = undefined;
      expect(safeDateRangeFormat(startDate, endDate, props)).toBe("");
    });

    it("should return a formatted startDate followed by a dash when endDate is null", () => {
      const startDate = new Date("2021-04-20 00:00:00");
      const endDate = undefined;
      expect(safeDateRangeFormat(startDate, endDate, props)).toBe(
        "04/20/2021 - ",
      );
    });

    it("should return a formatted endDate prefixed by a dash when startDate is null", () => {
      const startDate = null;
      const endDate = new Date("2021-04-20 00:00:00");
      expect(safeDateRangeFormat(startDate, endDate, props)).toBe(
        " - 04/20/2021",
      );
    });

    it("should return a formatted startDate followed by a dash followed by a formatted endDate when startDate and endDate both have values", () => {
      const startDate = new Date("2021-04-20 00:00:00");
      const endDate = new Date("2021-04-28 00:00:00");
      expect(safeDateRangeFormat(startDate, endDate, props)).toBe(
        "04/20/2021 - 04/28/2021",
      );
    });

    it("should return a formatted startDate followed by the provided rangeSeparator when endDate is null", () => {
      const startDate = new Date("2021-04-20 00:00:00");
      const endDate = undefined;
      expect(
        safeDateRangeFormat(startDate, endDate, {
          ...props,
          rangeSeparator: " to ",
        }),
      ).toBe("04/20/2021 to ");
    });

    it("should return a formatted startDate followed by the provided rangeSeparator followed by a formatted endDate when startDate and endDate both have values", () => {
      const startDate = new Date("2021-04-20 00:00:00");
      const endDate = new Date("2021-04-28 00:00:00");
      expect(
        safeDateRangeFormat(startDate, endDate, {
          ...props,
          rangeSeparator: " to ",
        }),
      ).toBe("04/20/2021 to 04/28/2021");
    });
  });

  describe("getHolidaysMap", () => {
    it("should return a map of dateClasses", () => {
      const holidayDates = [
        {
          date: new Date(2023, 7, 15),
          holidayName: "India's Independence Day",
        },
        {
          date: new Date(2023, 11, 25),
          holidayName: "Christmas",
        },
      ];

      expect([...getHolidaysMap(holidayDates).keys()]).toEqual([
        "08.15.2023",
        "12.25.2023",
      ]);
    });

    it("should return empty if invalid date is provided", () => {
      const holidayDates = [
        {
          date: "invalid date" as unknown as Date, // cast to any for the sake of testing
          holidayName: "Fake holiday",
        },
      ];
      expect([...getHolidaysMap(holidayDates).keys()]).toHaveLength(0);
    });

    it("should not add duplicate entries", () => {
      const holidayDates = [
        {
          date: new Date(2023, 7, 15),
          holidayName: "India's Independence Day",
        },
        {
          date: new Date(2023, 7, 15),
          holidayName: "India's Independence Day",
        },
      ];
      expect([...getHolidaysMap(holidayDates).keys()]).toHaveLength(1);
    });
  });

  describe("arraysAreEqual", () => {
    it("should return true if both arrays are equal", () => {
      const array1 = ["India's Independence Day", "Christmas"];
      const array2 = ["India's Independence Day", "Christmas"];
      expect(arraysAreEqual(array1, array2)).toBe(true);
    });

    it("should return false if both arrays are not equal", () => {
      const array1 = ["India's Independence Day", "Christmas"];
      const array2 = ["New Year's day"];
      expect(arraysAreEqual(array1, array2)).toBe(false);
    });
  });

  describe("isSameMinute", () => {
    it("should return true if two dates are within the same minute", () => {
      const d1 = new Date(2020, 10, 10, 10, 10, 10); // Nov 10, 2020 10:10:10
      const d2 = new Date(2020, 10, 10, 10, 10, 20); // Nov 10, 2020 10:10:20
      expect(isSameMinute(d1, d2)).toBe(true);
    });

    it("should return false if two dates aren't within the same minute", () => {
      const d1 = new Date(2020, 10, 10, 10, 10, 10); // Nov 10, 2020 10:10:10
      const d2 = new Date(2020, 10, 10, 10, 11, 10); // Nov 10, 2020 10:11:10
      expect(isSameMinute(d1, d2)).toBe(false);
    });
  });

  describe("startOfMinute", () => {
    it("should properly find the start of the minute", () => {
      const d = new Date(2020, 10, 10, 10, 10, 10); // Nov 10, 2020 10:10:10
      const expected = new Date(2020, 10, 10, 10, 10, 0); // Nov 10, 2020 10:10:00

      expect(startOfMinute(d)).toEqual(expected);
    });
  });

  describe("getMidnightDate", () => {
    it("should return a date with midnight time when a valid date is provided", () => {
      const inputDate = new Date(2023, 0, 1, 12, 30, 45); // January 1, 2023, 12:30:45 PM

      const result = getMidnightDate(inputDate);

      expect(result).toEqual(new Date(2023, 0, 1, 0, 0, 0, 0)); // January 1, 2023, 00:00:00.000
    });

    it("should throw an error when an invalid date is provided", () => {
      const invalidDate = "not a date" as unknown as Date; // cast to any for the sake of testing

      expect(() => {
        getMidnightDate(invalidDate);
      }).toThrow("Invalid date");
    });
  });

  describe("isDateBefore", () => {
    it("should return true when date is before dateToCompare", () => {
      const date = new Date(2022, 11, 31); // December 31, 2022
      const dateToCompare = new Date(2023, 0, 1); // January 1, 2023

      const result = isDateBefore(date, dateToCompare);

      expect(result).toBe(true);
    });

    it("should return false when date is not before dateToCompare", () => {
      const date = new Date(2023, 0, 1); // January 1, 2023
      const dateToCompare = new Date(2022, 11, 31); // December 31, 2022

      const result = isDateBefore(date, dateToCompare);

      expect(result).toBe(false);
    });

    it("should throw an error when either date or dateToCompare is not a valid date", () => {
      expect(() => {
        const invalidDate = "not a date" as unknown as Date; // cast to any for the sake of testing
        const validDate = new Date(2023, 0, 1); // January 1, 2023

        isDateBefore(invalidDate, validDate);
      }).toThrow();
    });
  });

  describe("isMonthYearDisabled", () => {
    const props = {
      minDate: new Date(2023, 2, 1),
      maxDate: new Date(2023, 11, 31),
      excludeDates: [new Date(2023, 5, 1)],
    };

    it("should return true if month is disabled", () => {
      const date = new Date(new Date(2023, 5, 1));
      expect(isMonthYearDisabled(date, props)).toBe(true);
    });

    it("should return true if month is before the min date", () => {
      const date = new Date(new Date(2023, 1, 1));
      expect(isMonthYearDisabled(date, props)).toBe(true);
    });

    it("should return true if month is after the max date", () => {
      const date = new Date(new Date(2024, 1, 1));
      expect(isMonthYearDisabled(date, props)).toBe(true);
    });

    it("should return false if month is not disabled", () => {
      const date = new Date(new Date(2023, 3, 1));
      expect(isMonthYearDisabled(date, props)).toBe(false);
    });

    it("should return false if month is in include dates", () => {
      const date = new Date(2024, 2, 1);
      expect(
        isMonthYearDisabled(date, { includeDates: [new Date(2024, 2, 1)] }),
      ).toBe(false);
    });

    it("should return false if two dates have the same month but different years", () => {
      const date = new Date(2021, 5, 1);
      expect(
        isMonthYearDisabled(date, { excludeDates: [new Date(2023, 5, 1)] }),
      ).toBe(false);
    });

    it("should return false by default", () => {
      const date = new Date(new Date(2023, 3, 1));
      expect(isMonthYearDisabled(date)).toBe(false);
    });
  });
});
