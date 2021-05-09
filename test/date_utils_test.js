import {
  newDate,
  addHours,
  addDays,
  subDays,
  isEqual,
  isSameDay,
  isSameMonth,
  isSameQuarter,
  isSameYear,
  isDayDisabled,
  isDayExcluded,
  isMonthDisabled,
  isQuarterDisabled,
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
  isMonthinRange,
  isQuarterInRange,
  getStartOfYear,
  getYearsPeriod,
  setDefaultLocale,
  yearsDisabledAfter,
  yearsDisabledBefore,
  getWeek,
  safeDateRangeFormat,
} from "../src/date_utils";
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";
import ptBR from "date-fns/locale/pt-BR";
import { registerLocale } from "../src/date_utils";

registerLocale("pt-BR", ptBR);

describe("date_utils", function () {
  describe("newDate", function () {
    it("should return null for invalid value passed", function () {
      expect(newDate("21123asd")).to.be.null;
    });
  });

  describe("isEqual", function () {
    it("should return true for null dates", function () {
      expect(isEqual(null, null)).to.be.true;
    });

    it("should return false for a null and non-null date", function () {
      expect(isEqual(newDate(), null)).to.be.false;
      expect(isEqual(null, newDate())).to.be.false;
    });

    it("should return false for non-equal dates", function () {
      expect(isEqual(newDate("2016-02-10"), newDate("2016-02-11"))).to.be.false;
    });

    it("should return false for non-equal date and date with time", function () {
      expect(isEqual(newDate("2016-02-10"), newDate("2016-02-11 13:13"))).to.be
        .false;
    });

    it("should return false for non-equal time", function () {
      expect(isEqual(newDate("2016-02-10 13:13"), newDate("2016-02-11 13:14")))
        .to.be.false;
    });

    it("should return true for equal dates", function () {
      expect(isEqual(newDate("2016-02-10"), newDate("2016-02-10"))).to.be.true;
    });

    it("should return true for equal time", function () {
      expect(isEqual(newDate("2016-02-10 13:13"), newDate("2016-02-10 13:13")))
        .to.be.true;
    });
  });

  describe("isSameDay", function () {
    it("should return true for null dates", function () {
      expect(isSameDay(null, null)).to.be.true;
    });

    it("should return false for a null and non-null date", function () {
      expect(isSameDay(newDate(), null)).to.be.false;
      expect(isSameDay(null, newDate())).to.be.false;
    });

    it("should return false for non-equal dates", function () {
      expect(isSameDay(newDate("2016-02-10"), newDate("2016-02-11"))).to.be
        .false;
    });

    it("should return true for equal dates", function () {
      expect(isSameDay(newDate("2016-02-10"), newDate("2016-02-10"))).to.be
        .true;
    });
  });

  describe("isSameMonth", function () {
    it("should return true for null dates", function () {
      expect(isSameMonth(null, null)).to.be.true;
    });

    it("should return false for a null and non-null date", function () {
      expect(isSameMonth(newDate(), null)).to.be.false;
      expect(isSameMonth(null, newDate())).to.be.false;
    });

    it("should return false for non-equal months ", function () {
      expect(isSameMonth(newDate("2016-02-10"), newDate("2016-03-10"))).to.be
        .false;
    });

    it("should return true for equal months", function () {
      expect(isSameMonth(newDate("2016-02-10"), newDate("2016-02-29"))).to.be
        .true;
    });
  });

  describe("isSameQuarter", function () {
    it("should return true for null dates", function () {
      expect(isSameQuarter(null, null)).to.be.true;
    });

    it("should return false for a null and non-null date", function () {
      expect(isSameQuarter(newDate(), null)).to.be.false;
      expect(isSameQuarter(null, newDate())).to.be.false;
    });

    it("should return false for non-equal quarters ", function () {
      expect(isSameQuarter(newDate("2016-02-10"), newDate("2016-04-10"))).to.be
        .false;
    });

    it("should return true for equal quarters", function () {
      expect(isSameQuarter(newDate("2016-02-10"), newDate("2016-03-29"))).to.be
        .true;
    });
  });

  describe("isSameYear", function () {
    it("should return true for null dates", function () {
      expect(isSameYear(null, null)).to.be.true;
    });

    it("should return false for a null and non-null date", function () {
      expect(isSameYear(newDate(), null)).to.be.false;
      expect(isSameYear(null, newDate())).to.be.false;
    });

    it("should return false for non-equal years ", function () {
      expect(isSameYear(newDate("2016-02-10"), newDate("2015-02-10"))).to.be
        .false;
    });

    it("should return true for equal years", function () {
      expect(isSameYear(newDate("2016-02-10"), newDate("2016-12-24"))).to.be
        .true;
    });
  });

  describe("isDayDisabled", function () {
    it("should be enabled by default", () => {
      const day = newDate();
      expect(isDayDisabled(day)).to.be.false;
    });

    it("should be enabled if on the min date", () => {
      const day = newDate();
      expect(isDayDisabled(day, { minDate: day })).to.be.false;
    });

    it("should be disabled if before the min date", () => {
      const day = newDate();
      const minDate = addDays(day, 1);
      expect(isDayDisabled(day, { minDate })).to.be.true;
    });

    it("should be enabled if on the max date", () => {
      const day = newDate();
      expect(isDayDisabled(day, { maxDate: day })).to.be.false;
    });

    it("should be disabled if after the max date", () => {
      const day = newDate();
      const maxDate = subDays(day, 1);
      expect(isDayDisabled(day, { maxDate })).to.be.true;
    });

    it("should be disabled if in excluded dates", () => {
      const day = newDate();
      expect(isDayDisabled(day, { excludeDates: [day] })).to.be.true;
    });

    it("should be enabled if in included dates", () => {
      const day = newDate();
      expect(isDayDisabled(day, { includeDates: [day] })).to.be.false;
    });

    it("should be disabled if not in included dates", () => {
      const day = newDate();
      const includeDates = [addDays(day, 1)];
      expect(isDayDisabled(day, { includeDates })).to.be.true;
    });

    it("should be enabled if date filter returns true", () => {
      const day = newDate();
      const filterDate = (d) => isEqual(d, day);
      expect(isDayDisabled(day, { filterDate })).to.be.false;
    });

    it("should be disabled if date filter returns false", () => {
      const day = newDate();
      const filterDate = (d) => !isEqual(d, day);
      expect(isDayDisabled(day, { filterDate })).to.be.true;
    });

    it("should not allow date filter to modify input date", () => {
      const day = newDate();
      const dayClone = newDate(day);
      const filterDate = (d) => {
        addDays(d, 1);
        return true;
      };
      isDayDisabled(day, { filterDate });
      expect(isEqual(day, dayClone)).to.be.true;
    });
  });

  describe("isDayExcluded", function () {
    it("should not be excluded by default", () => {
      const day = newDate();
      expect(isDayExcluded(day)).to.be.false;
    });

    it("should be excluded if in excluded dates", () => {
      const day = newDate();
      expect(isDayExcluded(day, { excludeDates: [day] })).to.be.true;
    });

    it("should not be excluded if not in excluded dates", () => {
      const day = newDate();
      const excludedDay = newDate();
      const currentMonth = excludedDay.getMonth();
      excludedDay.setMonth(currentMonth === 11 ? 0 : currentMonth + 1);
      expect(isDayExcluded(day, { excludeDates: [] }));
    });
  });

  describe("isMonthDisabled", function () {
    it("should be enabled by default", () => {
      const day = newDate();
      expect(isMonthDisabled(day)).to.be.false;
    });

    it("should be enabled if on the min date", () => {
      const day = newDate();
      expect(isMonthDisabled(day, { minDate: day })).to.be.false;
    });

    it("should be disabled if before the min date", () => {
      const day = newDate();
      const minDate = addDays(day, 40);
      expect(isMonthDisabled(day, { minDate })).to.be.true;
    });

    it("should be enabled if on the max date", () => {
      const day = newDate();
      expect(isMonthDisabled(day, { maxDate: day })).to.be.false;
    });

    it("should be disabled if after the max date", () => {
      const day = newDate();
      const maxDate = subDays(day, 40);
      expect(isMonthDisabled(day, { maxDate })).to.be.true;
    });

    it("should be disabled if in excluded dates", () => {
      const day = newDate();
      expect(isMonthDisabled(day, { excludeDates: [day] })).to.be.true;
    });

    it("should be enabled if in included dates", () => {
      const day = newDate();
      expect(isMonthDisabled(day, { includeDates: [day] })).to.be.false;
    });

    it("should be disabled if not in included dates", () => {
      const day = newDate();
      const includeDates = [addDays(day, 40)];
      expect(isMonthDisabled(day, { includeDates })).to.be.true;
    });

    it("should be enabled if date filter returns true", () => {
      const day = newDate();
      const filterDate = (d) => isEqual(d, day);
      expect(isMonthDisabled(day, { filterDate })).to.be.false;
    });

    it("should be disabled if date filter returns false", () => {
      const day = newDate();
      const filterDate = (d) => !isEqual(d, day);
      expect(isMonthDisabled(day, { filterDate })).to.be.true;
    });

    it("should not allow date filter to modify input date", () => {
      const day = newDate();
      const dayClone = newDate(day);
      const filterDate = (d) => {
        addDays(d, 40);
        return true;
      };
      isMonthDisabled(day, { filterDate });
      expect(isEqual(day, dayClone)).to.be.true;
    });
  });

  describe("isQuarterDisabled", function () {
    it("should be enabled by default", () => {
      const day = newDate();
      expect(isQuarterDisabled(day)).to.be.false;
    });

    it("should be enabled if on the min date", () => {
      const day = newDate();
      expect(isQuarterDisabled(day, { minDate: day })).to.be.false;
    });

    it("should be disabled if before the min date", () => {
      const day = newDate();
      const minDate = addDays(day, 40);
      expect(isQuarterDisabled(day, { minDate })).to.be.true;
    });

    it("should be enabled if on the max date", () => {
      const day = newDate();
      expect(isQuarterDisabled(day, { maxDate: day })).to.be.false;
    });

    it("should be disabled if after the max date", () => {
      const day = newDate();
      const maxDate = subDays(day, 40);
      expect(isQuarterDisabled(day, { maxDate })).to.be.true;
    });

    it("should be disabled if in excluded dates", () => {
      const day = newDate();
      expect(isQuarterDisabled(day, { excludeDates: [day] })).to.be.true;
    });

    it("should be enabled if in included dates", () => {
      const day = newDate();
      expect(isQuarterDisabled(day, { includeDates: [day] })).to.be.false;
    });

    xit("should be disabled if not in included dates", () => {
      const day = newDate();
      const includeDates = [addDays(day, 40)];
      expect(isQuarterDisabled(day, { includeDates })).to.be.true;
    });

    it("should be enabled if date filter returns true", () => {
      const day = newDate();
      const filterDate = (d) => isEqual(d, day);
      expect(isQuarterDisabled(day, { filterDate })).to.be.false;
    });

    it("should be disabled if date filter returns false", () => {
      const day = newDate();
      const filterDate = (d) => !isEqual(d, day);
      expect(isQuarterDisabled(day, { filterDate })).to.be.true;
    });

    it("should not allow date filter to modify input date", () => {
      const day = newDate();
      const dayClone = newDate(day);
      const filterDate = (d) => {
        addDays(d, 40);
        return true;
      };
      isQuarterDisabled(day, { filterDate });
      expect(isEqual(day, dayClone)).to.be.true;
    });
  });

  describe("monthDisabledBefore", () => {
    it("should return false by default", () => {
      expect(monthDisabledBefore(newDate())).to.be.false;
    });

    it("should return true if min date is in the same month", () => {
      const day = newDate("2016-03-19");
      const minDate = newDate("2016-03-01");
      expect(monthDisabledBefore(day, { minDate })).to.be.true;
    });

    it("should return false if min date is in the previous month", () => {
      const day = newDate("2016-03-19");
      const minDate = newDate("2016-02-29");
      expect(monthDisabledBefore(day, { minDate })).to.be.false;
    });

    it("should return true if previous month is before include dates", () => {
      const day = newDate("2016-03-19");
      const includeDates = [newDate("2016-03-01")];
      expect(monthDisabledBefore(day, { includeDates })).to.be.true;
    });
  });

  describe("monthDisabledAfter", () => {
    it("should return false by default", () => {
      expect(monthDisabledAfter(newDate())).to.be.false;
    });

    it("should return true if max date is in the same month", () => {
      const day = newDate("2016-03-19");
      const maxDate = newDate("2016-03-31");
      expect(monthDisabledAfter(day, { maxDate })).to.be.true;
    });

    it("should return false if max date is in the next month", () => {
      const day = newDate("2016-03-19");
      const maxDate = newDate("2016-04-01");
      expect(monthDisabledAfter(day, { maxDate })).to.be.false;
    });

    it("should return true if next month is after include dates", () => {
      const day = newDate("2016-03-19");
      const includeDates = [newDate("2016-03-01")];
      expect(monthDisabledAfter(day, { includeDates })).to.be.true;
    });
  });

  describe("yearDisabledBefore", () => {
    it("should return false by default", () => {
      expect(yearDisabledBefore(newDate())).to.be.false;
    });

    it("should return true if min date is in the same year", () => {
      const day = newDate("2016-02-19");
      const minDate = newDate("2016-03-01");
      expect(yearDisabledBefore(day, { minDate })).to.be.true;
    });

    it("should return false if min date is in the previous year", () => {
      const day = newDate("2016-03-19");
      const minDate = newDate("2015-03-29");
      expect(yearDisabledBefore(day, { minDate })).to.be.false;
    });

    it("should return true if previous year is before include dates", () => {
      const day = newDate("2016-03-19");
      const includeDates = [newDate("2016-03-01")];
      expect(yearDisabledBefore(day, { includeDates })).to.be.true;
    });
  });

  describe("yearDisabledAfter", () => {
    it("should return false by default", () => {
      expect(yearDisabledAfter(newDate())).to.be.false;
    });

    it("should return true if max date is in the same year", () => {
      const day = newDate("2016-03-19");
      const maxDate = newDate("2016-08-31");
      expect(yearDisabledAfter(day, { maxDate })).to.be.true;
    });

    it("should return false if max date is in the next year", () => {
      const day = newDate("2016-03-19");
      const maxDate = newDate("2017-04-01");
      expect(yearDisabledAfter(day, { maxDate })).to.be.false;
    });

    it("should return true if next year is after include dates", () => {
      const day = newDate("2016-03-19");
      const includeDates = [newDate("2016-03-01")];
      expect(yearDisabledAfter(day, { includeDates })).to.be.true;
    });
  });

  describe("getEffectiveMinDate", () => {
    it("should return null by default", () => {
      expect(getEffectiveMinDate({})).to.not.exist;
    });

    it("should return the min date", () => {
      const minDate = newDate("2016-03-30");
      const result = getEffectiveMinDate({ minDate });
      assert(isEqual(minDate, result));
    });

    it("should return the minimum include date", () => {
      const date1 = newDate("2016-03-30");
      const date2 = newDate("2016-04-01");
      const includeDates = [date1, date2];
      assert(isEqual(getEffectiveMinDate({ includeDates }), date1));
    });

    it("should return the minimum include date satisfying the min date", () => {
      const minDate = newDate("2016-03-31");
      const date1 = newDate("2016-03-30");
      const date2 = newDate("2016-04-01");
      const includeDates = [date1, date2];
      assert(isEqual(getEffectiveMinDate({ minDate, includeDates }), date2));
    });
  });

  describe("getEffectiveMaxDate", () => {
    it("should return null by default", () => {
      expect(getEffectiveMaxDate({})).to.not.exist;
    });

    it("should return the max date", () => {
      const maxDate = newDate("2016-03-30");
      assert(isEqual(getEffectiveMaxDate({ maxDate }), maxDate));
    });

    it("should return the maximum include date", () => {
      const date1 = newDate("2016-03-30");
      const date2 = newDate("2016-04-01");
      const includeDates = [date1, date2];
      assert(isEqual(getEffectiveMaxDate({ includeDates }), date2));
    });

    it("should return the maximum include date satisfying the max date", () => {
      const maxDate = newDate("2016-03-31");
      const date1 = newDate("2016-03-30");
      const date2 = newDate("2016-04-01");
      const includeDates = [date1, date2];
      assert(isEqual(getEffectiveMaxDate({ maxDate, includeDates }), date1));
    });
  });

  describe("addZero", () => {
    it("should return the same number if greater than 10", () => {
      const input = 11;
      const expected = "11";
      const result = addZero(input);
      assert(result === expected);
    });

    it("should return the number prefixed with zero if less than 10", () => {
      const input = 1;
      const expected = "01";
      const result = addZero(input);
      assert(result === expected);
    });
  });

  describe("isTimeDisabled", function () {
    it("should be enabled by default", () => {
      const date = newDate();
      const time = setHours(setMinutes(date, 30), 1);
      expect(isTimeDisabled(time)).to.be.false;
    });

    it("should be disabled if in excluded times", () => {
      const date = newDate();
      const time = setHours(setMinutes(date, 30), 1);
      expect(isTimeDisabled(time, { excludeTimes: [time] })).to.be.true;
    });

    it("should be enabled if in included times", () => {
      const date = newDate();
      const time = setHours(setMinutes(date, 30), 1);
      expect(isTimeDisabled(time, { includeTimes: [time] })).to.be.false;
    });

    it("should be disabled if not in included times", () => {
      const date = newDate();
      const time = setHours(setMinutes(date, 30), 1);
      const includeTimes = [addHours(time, 1)];
      expect(isTimeDisabled(time, { includeTimes })).to.be.true;
    });

    it("should be enabled if time filter returns true", () => {
      const date = newDate();
      const time = setHours(setMinutes(date, 30), 1);
      const filterTime = (t) => isEqual(t, time);
      expect(isTimeDisabled(time, { filterTime })).to.be.false;
    });

    it("should be disabled if time filter returns false", () => {
      const date = newDate();
      const time = setHours(setMinutes(date, 30), 1);
      const filterTime = (t) => !isEqual(t, time);
      expect(isTimeDisabled(time, { filterTime })).to.be.true;
    });

    it("should not allow time filter to modify input time", () => {
      const date = newDate();
      const time = setHours(setMinutes(date, 30), 1);
      const timeClone = newDate(time);
      const filterTime = (t) => {
        addHours(t, 1);
        return true;
      };
      isTimeDisabled(time, { filterTime });
      expect(isEqual(time, timeClone)).to.be.true;
    });
  });

  describe("isTimeInDisabledRange", () => {
    it("should tell if time is in disabled range", () => {
      const date = newDate("2016-03-15");
      const time = setHours(setMinutes(date, 30), 1);
      const minTime = setHours(setMinutes(date, 30), 0);
      const maxTime = setHours(setMinutes(date, 30), 5);
      expect(isTimeInDisabledRange(time, { minTime, maxTime })).to.be.false;
    });

    it("should tell if time is not in disabled range", () => {
      const date = newDate("2016-03-15");
      const time = setHours(setMinutes(date, 30), 0);
      const minTime = setHours(setMinutes(date, 30), 1);
      const maxTime = setHours(setMinutes(date, 30), 5);
      expect(isTimeInDisabledRange(time, { minTime, maxTime })).to.be.true;
    });

    it("should not throw an exception if max time is before min time", () => {
      const date = newDate("2016-03-15");
      const time = setHours(setMinutes(date, 30), 10);
      const minTime = setHours(setMinutes(date, 30), 5);
      const maxTime = setHours(setMinutes(date, 30), 0);
      expect(isTimeInDisabledRange(time, { minTime, maxTime })).to.be.false;
    });
  });

  describe("isDayInRange", () => {
    it("should tell if day is in range", () => {
      const day = newDate("2016-02-15 09:40");
      const startDate = newDate("2016-02-01 09:40");
      const endDate = newDate("2016-03-15 08:40");
      expect(isDayInRange(day, startDate, endDate)).to.be.true;
    });

    it("should tell if day is in range, max bound test", () => {
      const day = newDate("2016-03-15 09:40");
      const startDate = newDate("2016-02-01 09:40");
      const endDate = newDate("2016-03-15 08:40");
      expect(isDayInRange(day, startDate, endDate)).to.be.true;
    });

    it("should tell if day is in range, min bound test", () => {
      const day = newDate("2016-02-01 08:40");
      const startDate = newDate("2016-02-01 09:40");
      const endDate = newDate("2016-03-15 08:40");
      expect(isDayInRange(day, startDate, endDate)).to.be.true;
    });

    it("should tell if day is not in range", () => {
      const day = newDate("2016-07-15 09:40");
      const startDate = newDate("2016-02-15 09:40");
      const endDate = newDate("2016-03-15 08:40");
      expect(isDayInRange(day, startDate, endDate)).to.be.false;
    });

    it("should not throw exception if end date is before start date", () => {
      const day = newDate("2016-02-01 09:40");
      const startDate = newDate("2016-02-15 09:40");
      const endDate = newDate("2016-01-15 08:40");
      expect(isDayInRange(day, startDate, endDate)).to.be.false;
    });
  });

  describe("parseDate", () => {
    it("should parse date that matches the format", () => {
      const value = "01/15/2019";
      const dateFormat = "MM/dd/yyyy";

      expect(parseDate(value, dateFormat, null, true)).to.not.be.null;
    });

    it("should parse date that matches one of the formats", () => {
      const value = "01/15/2019";
      const dateFormat = ["MM/dd/yyyy", "yyyy-MM-dd"];

      expect(parseDate(value, dateFormat, null, true)).to.not.be.null;
    });

    it("should not parse date that does not match the format", () => {
      const value = "01/15/20";
      const dateFormat = "MM/dd/yyyy";

      expect(parseDate(value, dateFormat, null, true)).to.be.null;
    });

    it("should not parse date that does not match any of the formats", () => {
      const value = "01/15/20";
      const dateFormat = ["MM/dd/yyyy", "yyyy-MM-dd"];

      expect(parseDate(value, dateFormat, null, true)).to.be.null;
    });

    it("should parse date without strict parsing", () => {
      const value = "01/15/20";
      const dateFormat = "MM/dd/yyyy";

      expect(parseDate(value, dateFormat, null, false)).to.not.be.null;
    });

    it("should parse date based on locale", () => {
      const value = "26/05/1995";
      const dateFormat = "P";

      const expected = new Date("05/26/1995");
      const actual = parseDate(value, dateFormat, "pt-BR", false);

      assert(isEqual(actual, expected));
    });

    it("should not parse date based on locale without a given locale", () => {
      const value = "26/05/1995";
      const dateFormat = "P";

      const actual = parseDate(value, dateFormat, null, false);

      expect(actual).to.be.null;
    });

    it("should parse date based on default locale", () => {
      const value = "26/05/1995";
      const dateFormat = "P";

      const expected = new Date("05/26/1995");
      setDefaultLocale("pt-BR");
      const actual = parseDate(value, dateFormat, null, false);
      setDefaultLocale(null);

      assert(isEqual(actual, expected));
    });
  });

  describe("isMonthinRange", () => {
    it("should return true if the month passed is in range", () => {
      const day = newDate("2015-02-01");
      const startDate = newDate("2015-01-01");
      const endDate = newDate("2015-08-01");

      expect(isMonthinRange(startDate, endDate, 4, day)).to.be.true;
    });

    it("should return false if the month passed is not in range", () => {
      const day = newDate("2015-02-01");
      const startDate = newDate("2015-01-01");
      const endDate = newDate("2015-08-01");

      expect(isMonthinRange(startDate, endDate, 9, day)).to.be.false;
    });

    it("should return true if the month passed is in range and maxDate +1 year", () => {
      const day = newDate("2019-06-04");
      const startDate = newDate("2019-06-04");
      const endDate = newDate("2020-02-01");

      expect(isMonthinRange(startDate, endDate, 5, day)).to.be.true;
    });
  });

  describe("getStartOfYear", () => {
    it("should return the start of the year", () => {
      const day = new Date("2020-04-13T00:00:00.000+08:00");
      expect(getStartOfYear(day).getDate()).to.be.eq(1);
      expect(getStartOfYear(day).getMonth()).to.be.eq(0);
    });
  });

  describe("isQuarterInRange", () => {
    it("should return true if the quarter passed is in range", () => {
      const day = newDate("2015-02-01");
      const startDate = newDate("2015-01-01");
      const endDate = newDate("2015-08-01");

      expect(isQuarterInRange(startDate, endDate, 2, day)).to.be.true;
    });

    it("should return false if the quarter passed is not in range", () => {
      const day = newDate("2015-02-01");
      const startDate = newDate("2015-01-01");
      const endDate = newDate("2015-09-01");

      expect(isQuarterInRange(startDate, endDate, 4, day)).to.be.false;
    });

    it("should return true if the quarter passed is in range and maxDate +1 year", () => {
      const day = newDate("2019-06-04");
      const startDate = newDate("2019-06-04");
      const endDate = newDate("2020-02-01");

      expect(isQuarterInRange(startDate, endDate, 5, day)).to.be.true;
    });
  });

  describe("getYearsPeriod", () => {
    it("should get start and end of default 11 years period", () => {
      const date = newDate("2000-01-01");
      const { startPeriod, endPeriod } = getYearsPeriod(date);
      expect(startPeriod).to.be.eq(1993);
      expect(endPeriod).to.be.eq(2004);
    });

    it("should get start and end of custom 8 years period", () => {
      const date = newDate("2000-01-01");
      const { startPeriod, endPeriod } = getYearsPeriod(date, 9);
      expect(startPeriod).to.be.eq(1999);
      expect(endPeriod).to.be.eq(2007);
    });
  });

  describe("yearsDisabledAfter", () => {
    it("should return false by default", () => {
      expect(yearsDisabledAfter(newDate())).to.be.false;
    });

    it("should return true if max date is in the same year", () => {
      const day = newDate("2016-03-19");
      const maxDate = newDate("2016-08-31");
      expect(yearsDisabledAfter(day, { maxDate })).to.be.true;
    });

    it("should return false if max date is in the next period years", () => {
      const day = newDate("2016-03-19");
      const maxDate = newDate("2018-04-01");
      expect(yearsDisabledAfter(day, { maxDate })).to.be.false;
    });

    it("should return false if max date is in a next period year", () => {
      const day = newDate("1996-08-08 00:00:00");
      const maxDate = newDate("2020-08-08 00:00:00");
      expect(yearsDisabledAfter(day, { maxDate })).to.be.false;
    });
  });

  describe("yearsDisabledBefore", () => {
    it("should return false by default", () => {
      expect(yearsDisabledBefore(newDate())).to.be.false;
    });

    it("should return true if min date is in the same year", () => {
      const day = newDate("2016-02-19");
      const minDate = newDate("2016-03-01");
      expect(yearsDisabledBefore(day, { minDate })).to.be.true;
    });

    it("should return false if min date is in the previous period year", () => {
      const day = newDate("2016-03-19");
      const minDate = newDate("2004-03-29");
      expect(yearsDisabledBefore(day, { minDate })).to.be.false;
    });

    it("should return false if min date is in a previous period year", () => {
      const day = newDate("2044-08-08 00:00:00");
      const minDate = newDate("2020-08-08 00:00:00");
      expect(yearsDisabledBefore(day, { minDate })).to.be.false;
    });
  });

  describe("week", () => {
    it("should return the first 2021 year week", () => {
      const first2021Day = new Date("2021-01-01");
      assert(getWeek(first2021Day) === 53);
    });

    it("should return the 4 2021 year week", () => {
      const date = new Date("2021-01-18");
      assert(getWeek(date) === 3);
    });

    it("should return the first 2022 year week", () => {
      const first2022Day = new Date("2022-01-01");
      assert(getWeek(first2022Day) === 52);
    });
  });

  describe("safeDateRangeFormat", () => {
    const props = {
      dateFormat: "MM/dd/yyyy",
      locale: "en",
    };

    it("should return blank string when startDate and endDate are both null", () => {
      const startDate = null;
      const endDate = null;
      expect(safeDateRangeFormat(startDate, endDate, props)).to.equal("");
    });

    it("should return a formatted startDate followed by a dash when endDate is null", () => {
      const startDate = new Date("2021-04-20 00:00:00");
      const endDate = null;
      expect(safeDateRangeFormat(startDate, endDate, props)).to.equal(
        "04/20/2021 - "
      );
    });

    it("should return a formatted startDate followed by a dash followed by a formatted endDate when startDate and endDate both have values", () => {
      const startDate = new Date("2021-04-20 00:00:00");
      const endDate = new Date("2021-04-28 00:00:00");
      expect(safeDateRangeFormat(startDate, endDate, props)).to.equal(
        "04/20/2021 - 04/28/2021"
      );
    });
  });
});
