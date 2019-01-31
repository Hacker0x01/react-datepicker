import {
  newDate,
  addDays,
  subDays,
  isEqual,
  isSameDay,
  isSameMonth,
  isSameYear,
  isDayDisabled,
  monthDisabledBefore,
  monthDisabledAfter,
  getEffectiveMinDate,
  getEffectiveMaxDate,
  isTimeInDisabledRange,
  isDayInRange
} from "../src/date_utils";
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";

describe("date_utils", function() {
  describe("isSameDay", function() {
    it("should return true for null dates", function() {
      expect(isSameDay(null, null)).to.be.true;
    });

    it("should return false for a null and non-null date", function() {
      expect(isSameDay(newDate(), null)).to.be.false;
      expect(isSameDay(null, newDate())).to.be.false;
    });

    it("should return false for non-equal dates", function() {
      expect(isSameDay(newDate("2016-02-10"), newDate("2016-02-11"))).to.be
        .false;
    });

    it("should return true for equal dates", function() {
      expect(isSameDay(newDate("2016-02-10"), newDate("2016-02-10"))).to.be
        .true;
    });
  });

  describe("isSameMonth", function() {
    it("should return true for null dates", function() {
      expect(isSameMonth(null, null)).to.be.true;
    });

    it("should return false for a null and non-null date", function() {
      expect(isSameMonth(newDate(), null)).to.be.false;
      expect(isSameMonth(null, newDate())).to.be.false;
    });

    it("should return false for non-equal months ", function() {
      expect(isSameMonth(newDate("2016-02-10"), newDate("2016-03-10"))).to.be
        .false;
    });

    it("should return true for equal months", function() {
      expect(isSameMonth(newDate("2016-02-10"), newDate("2016-02-29"))).to.be
        .true;
    });
  });

  describe("isSameYear", function() {
    it("should return true for null dates", function() {
      expect(isSameYear(null, null)).to.be.true;
    });

    it("should return false for a null and non-null date", function() {
      expect(isSameYear(newDate(), null)).to.be.false;
      expect(isSameYear(null, newDate())).to.be.false;
    });

    it("should return false for non-equal years ", function() {
      expect(isSameYear(newDate("2016-02-10"), newDate("2015-02-10"))).to.be
        .false;
    });

    it("should return true for equal years", function() {
      expect(isSameYear(newDate("2016-02-10"), newDate("2016-12-24"))).to.be
        .true;
    });
  });

  describe("isDayDisabled", function() {
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
      const filterDate = d => isEqual(d, day);
      expect(isDayDisabled(day, { filterDate })).to.be.false;
    });

    it("should be disabled if date filter returns false", () => {
      const day = newDate();
      const filterDate = d => !isEqual(d, day);
      expect(isDayDisabled(day, { filterDate })).to.be.true;
    });

    it("should not allow date filter to modify input date", () => {
      const day = newDate();
      const dayClone = newDate(day);
      const filterDate = d => {
        addDays(d, 1);
        return true;
      };
      isDayDisabled(day, { filterDate });
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
      const day = newDate("2016-02-15");
      const startDate = newDate("2016-02-01");
      const endDate = newDate("2016-03-15");
      expect(isDayInRange(day, startDate, endDate)).to.be.true;
    });

    it("should tell if day is not in range", () => {
      const day = newDate("2016-07-15");
      const startDate = newDate("2016-02-15");
      const endDate = newDate("2016-03-15");
      expect(isDayInRange(day, startDate, endDate)).to.be.false;
    });

    it("should not throw exception if end date is before start date", () => {
      const day = newDate("2016-02-01");
      const startDate = newDate("2016-02-15");
      const endDate = newDate("2016-01-15");
      expect(isDayInRange(day, startDate, endDate)).to.be.false;
    });
  });
});
