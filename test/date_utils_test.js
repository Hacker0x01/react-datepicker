import {
  newDate,
  setUTCOffset,
  addDays,
  subDays,
  equals,
  isSameDay,
  isSameMonth,
  isSameYear,
  isSameUtcOffset,
  isDayDisabled,
  monthDisabledBefore,
  monthDisabledAfter,
  getEffectiveMinDate,
  getEffectiveMaxDate
} from "../src/date_utils";

describe.only("date_utils", function() {
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

  describe("isSameUtcOffset", function() {
    it("should return true for null dates", function() {
      expect(isSameUtcOffset(null, null)).to.be.true;
    });

    it("should return false for a null and a non-null date", function() {
      expect(isSameUtcOffset(newDate(), null)).to.be.false;
      expect(isSameUtcOffset(null, newDate())).to.be.false;
    });

    it("should return true for non-equal utc offsets, but same dates", function() {
      expect(
        isSameUtcOffset(
          setUTCOffset(newDate("2016-02-10"), -3),
          setUTCOffset(newDate("2016-02-10"), 5)
        )
      ).to.be.false;
      expect(
        isSameUtcOffset(
          setUTCOffset(newDate("2016-02-10"), 3),
          setUTCOffset(newDate("2016-02-10"), -5)
        )
      ).to.be.false;
      expect(
        isSameUtcOffset(
          setUTCOffset(newDate("2016-02-10"), 180),
          setUTCOffset(newDate("2016-02-10"), -210)
        )
      ).to.be.false;
    });

    it("should return true for equal utc offsets, regardless of dates", function() {
      expect(isSameUtcOffset(newDate("2016-02-10"), newDate("2016-02-10"))).to
        .be.true;
      expect(
        isSameUtcOffset(
          setUTCOffset(newDate("2016-02-10"), -3),
          setUTCOffset(newDate("2016-05-10"), -3)
        )
      ).to.be.true;
      expect(
        isSameUtcOffset(
          setUTCOffset(newDate("2016-12-10"), 6),
          setUTCOffset(newDate("2016-02-15"), 6)
        )
      ).to.be.true;
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
      const filterDate = d => equals(d, day);
      expect(isDayDisabled(day, { filterDate })).to.be.false;
    });

    it("should be disabled if date filter returns false", () => {
      const day = newDate();
      const filterDate = d => !equals(d, day);
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
      expect(equals(day, dayClone)).to.be.true;
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
      assert(equals(minDate, result));
    });

    it("should return the minimum include date", () => {
      const date1 = newDate("2016-03-30");
      const date2 = newDate("2016-04-01");
      const includeDates = [date1, date2];
      assert(equals(getEffectiveMinDate({ includeDates }), date1));
    });

    it("should return the minimum include date satisfying the min date", () => {
      const minDate = newDate("2016-03-31");
      const date1 = newDate("2016-03-30");
      const date2 = newDate("2016-04-01");
      const includeDates = [date1, date2];
      assert(equals(getEffectiveMinDate({ minDate, includeDates }), date2));
    });
  });

  describe("getEffectiveMaxDate", () => {
    it("should return null by default", () => {
      expect(getEffectiveMaxDate({})).to.not.exist;
    });

    it("should return the max date", () => {
      const maxDate = newDate("2016-03-30");
      assert(equals(getEffectiveMaxDate({ maxDate }), maxDate));
    });

    it("should return the maximum include date", () => {
      const date1 = newDate("2016-03-30");
      const date2 = newDate("2016-04-01");
      const includeDates = [date1, date2];
      assert(equals(getEffectiveMaxDate({ includeDates }), date2));
    });

    it("should return the maximum include date satisfying the max date", () => {
      const maxDate = newDate("2016-03-31");
      const date1 = newDate("2016-03-30");
      const date2 = newDate("2016-04-01");
      const includeDates = [date1, date2];
      assert(equals(getEffectiveMaxDate({ maxDate, includeDates }), date1));
    });
  });
});
