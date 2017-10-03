import {
  newDate,
  setUTCOffset,
  cloneDate,
  addDays,
  subtractDays,
  equals,

  isSameDay,
  isSameUtcOffset,
  isDayDisabled,
  allDaysDisabledBefore,
  allDaysDisabledAfter,
  getEffectiveMinDate,
  getEffectiveMaxDate
} from '../src/date_utils'

describe('date_utils', function () {
  describe('isSameDay', function () {
    it('should return true for null dates', function () {
      expect(isSameDay(null, null)).to.be.true
    })

    it('should return false for a null and non-null date', function () {
      expect(isSameDay(newDate(), null)).to.be.false
      expect(isSameDay(null, newDate())).to.be.false
    })

    it('should return false for non-equal dates', function () {
      expect(isSameDay(newDate('2016-02-10'), newDate('2016-02-11'))).to.be.false
    })

    it('should return true for equal dates', function () {
      expect(isSameDay(newDate('2016-02-10'), newDate('2016-02-10'))).to.be.true
    })
  })

  describe('isSameUtcOffset', function () {
    it('should return true for null dates', function () {
      expect(isSameUtcOffset(null, null)).to.be.true
    })

    it('should return false for a null and a non-null date', function () {
      expect(isSameUtcOffset(newDate(), null)).to.be.false
      expect(isSameUtcOffset(null, newDate())).to.be.false
    })

    it('should return true for non-equal utc offsets, but same dates', function () {
      expect(isSameUtcOffset(setUTCOffset(newDate('2016-02-10'), -3), setUTCOffset(newDate('2016-02-10'), 5))).to.be.false
      expect(isSameUtcOffset(setUTCOffset(newDate('2016-02-10'), 3), setUTCOffset(newDate('2016-02-10'), -5))).to.be.false
      expect(isSameUtcOffset(setUTCOffset(newDate('2016-02-10'), 180), setUTCOffset(newDate('2016-02-10'), -210))).to.be.false
    })

    it('should return true for equal utc offsets, regardless of dates', function () {
      expect(isSameUtcOffset(newDate('2016-02-10'), newDate('2016-02-10'))).to.be.true
      expect(isSameUtcOffset(setUTCOffset(newDate('2016-02-10'), -3), setUTCOffset(newDate('2016-05-10'), -3))).to.be.true
      expect(isSameUtcOffset(setUTCOffset(newDate('2016-12-10'), 6), setUTCOffset(newDate('2016-02-15'), 6))).to.be.true
    })
  })

  describe('isDayDisabled', function () {
    it('should be enabled by default', () => {
      const day = newDate()
      expect(isDayDisabled(day)).to.be.false
    })

    it('should be enabled if on the min date', () => {
      const day = newDate()
      expect(isDayDisabled(day, { minDate: day })).to.be.false
    })

    it('should be disabled if before the min date', () => {
      const day = newDate()
      const minDate = addDays(cloneDate(day), 1)
      expect(isDayDisabled(day, { minDate })).to.be.true
    })

    it('should be enabled if on the max date', () => {
      const day = newDate()
      expect(isDayDisabled(day, { maxDate: day })).to.be.false
    })

    it('should be disabled if after the max date', () => {
      const day = newDate()
      const maxDate = subtractDays(cloneDate(day), 1)
      expect(isDayDisabled(day, { maxDate })).to.be.true
    })

    it('should be disabled if in excluded dates', () => {
      const day = newDate()
      expect(isDayDisabled(day, { excludeDates: [day] })).to.be.true
    })

    it('should be enabled if in included dates', () => {
      const day = newDate()
      expect(isDayDisabled(day, { includeDates: [day] })).to.be.false
    })

    it('should be disabled if not in included dates', () => {
      const day = newDate()
      const includeDates = [addDays(cloneDate(day), 1)]
      expect(isDayDisabled(day, { includeDates })).to.be.true
    })

    it('should be enabled if date filter returns true', () => {
      const day = newDate()
      const filterDate = d => equals(d, day)
      expect(isDayDisabled(day, { filterDate })).to.be.false
    })

    it('should be disabled if date filter returns false', () => {
      const day = newDate()
      const filterDate = d => !equals(d, day)
      expect(isDayDisabled(day, { filterDate })).to.be.true
    })

    it('should not allow date filter to modify input date', () => {
      const day = newDate()
      const dayClone = cloneDate(day)
      const filterDate = d => {
        addDays(d, 1)
        return true
      }
      isDayDisabled(day, { filterDate })
      expect(equals(day, dayClone)).to.be.true
    })
  })

  describe('allDaysDisabledBefore', () => {
    it('should return false by default', () => {
      expect(allDaysDisabledBefore(newDate(), 'month')).to.be.false
    })

    it('should return true if min date is in the same unit', () => {
      const day = newDate('2016-03-19')
      const minDate = newDate('2016-03-01')
      expect(allDaysDisabledBefore(day, 'month', { minDate })).to.be.true
    })

    it('should return false if min date is in the previous unit', () => {
      const day = newDate('2016-03-19')
      const minDate = newDate('2016-02-29')
      expect(allDaysDisabledBefore(day, 'month', { minDate })).to.be.false
    })

    it('should return true if previous unit is before include dates', () => {
      const day = newDate('2016-03-19')
      const includeDates = [newDate('2016-03-01')]
      expect(allDaysDisabledBefore(day, 'month', { includeDates })).to.be.true
    })
  })

  describe('allDaysDisabledAfter', () => {
    it('should return false by default', () => {
      expect(allDaysDisabledAfter(newDate(), 'month')).to.be.false
    })

    it('should return true if max date is in the same unit', () => {
      const day = newDate('2016-03-19')
      const maxDate = newDate('2016-03-31')
      expect(allDaysDisabledAfter(day, 'month', { maxDate })).to.be.true
    })

    it('should return false if max date is in the next unit', () => {
      const day = newDate('2016-03-19')
      const maxDate = newDate('2016-04-01')
      expect(allDaysDisabledAfter(day, 'month', { maxDate })).to.be.false
    })

    it('should return true if next unit is after include dates', () => {
      const day = newDate('2016-03-19')
      const includeDates = [newDate('2016-03-01')]
      expect(allDaysDisabledAfter(day, 'month', { includeDates })).to.be.true
    })
  })

  describe('getEffectiveMinDate', () => {
    it('should return null by default', () => {
      expect(getEffectiveMinDate({})).to.not.exist
    })

    it('should return the min date', () => {
      const minDate = newDate('2016-03-30')
      assert(equals(getEffectiveMinDate({ minDate }), minDate))
    })

    it('should return the minimum include date', () => {
      const date1 = newDate('2016-03-30')
      const date2 = newDate('2016-04-01')
      const includeDates = [date1, date2]
      assert(equals(getEffectiveMinDate({ includeDates }), date1))
    })

    it('should return the minimum include date satisfying the min date', () => {
      const minDate = newDate('2016-03-31')
      const date1 = newDate('2016-03-30')
      const date2 = newDate('2016-04-01')
      const includeDates = [date1, date2]
      assert(equals(getEffectiveMinDate({ minDate, includeDates }), date2))
    })
  })

  describe('getEffectiveMaxDate', () => {
    it('should return null by default', () => {
      expect(getEffectiveMaxDate({})).to.not.exist
    })

    it('should return the max date', () => {
      const maxDate = newDate('2016-03-30')
      assert(equals(getEffectiveMaxDate({ maxDate }), maxDate))
    })

    it('should return the maximum include date', () => {
      const date1 = newDate('2016-03-30')
      const date2 = newDate('2016-04-01')
      const includeDates = [date1, date2]
      assert(equals(getEffectiveMaxDate({ includeDates }), date2))
    })

    it('should return the maximum include date satisfying the max date', () => {
      const maxDate = newDate('2016-03-31')
      const date1 = newDate('2016-03-30')
      const date2 = newDate('2016-04-01')
      const includeDates = [date1, date2]
      assert(equals(getEffectiveMaxDate({ maxDate, includeDates }), date1))
    })
  })
})
