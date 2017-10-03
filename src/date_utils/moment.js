import moment from 'moment'

const dayOfWeekCodes = {
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat',
  7: 'sun'
}

// These functions are not exported so
// that we avoid magic strings like 'days'
function set (date, unit, to) {
  return date.set(unit, to)
}

function add (date, amount, unit) {
  return date.add(amount, unit)
}

function subtract (date, amount, unit) {
  return date.subtract(amount, unit)
}

function get (date, unit) {
  return date.get(unit)
}

function getStartOf (date, unit) {
  return date.startOf(unit)
}

function getEndOf (date, unit) {
  return date.endOf(unit)
}

function getDiff (date1, date2, unit) {
  return date1.diff(date2, unit)
}

function isSame (date1, date2, unit) {
  return date1.isSame(date2, unit)
}

// ** Date Constructors **

export function newDate (point) {
  return moment(point)
}

export function newDateWithOffset (utcOffset) {
  return moment().utc().utcOffset(utcOffset)
}

export function cloneDate (date) {
  return date.clone()
}

export function parseDate (value, { dateFormat, locale }) {
  const m = moment(value, dateFormat, locale || moment.locale(), true)
  return m.isValid() ? m : null
}

// ** Date "Reflection" **

export function isMoment (date) {
  return moment.isMoment(date)
}

export function isDate (date) {
  return moment.isDate(date)
}

// ** Date Formatting **

export function formatDate (date, format) {
  return date.format(format)
}

export function safeDateFormat (date, { dateFormat, locale }) {
  return date && date.clone()
    .locale(locale || moment.locale())
    .format(Array.isArray(dateFormat) ? dateFormat[0] : dateFormat) || ''
}

// ** Date Setters **

export function setTime (date, {hour, minute, second}) {
  date.set({hour, minute, second})
  return date
}

export function setMonth (date, month) {
  return set(date, 'month', month)
}

export function setYear (date, year) {
  return set(date, 'year', year)
}

export function setUTCOffset (date, offset) {
  return date.utcOffset(offset)
}

// ** Date Getters **

export function getSecond (date) {
  return get(date, 'second')
}

export function getMinute (date) {
  return get(date, 'minute')
}

export function getHour (date) {
  return get(date, 'hour')
}

// Returns day of week
export function getDay (date) {
  return get(date, 'day')
}

export function getWeek (date) {
  return get(date, 'week')
}

export function getMonth (date) {
  return get(date, 'month')
}

export function getYear (date) {
  return get(date, 'year')
}

// Returns day of month
export function getDate (date) {
  return get(date, 'date')
}

export function getUTCOffset () {
  return moment().utcOffset()
}

export function getDayOfWeekCode (day) {
  return dayOfWeekCodes[day.isoWeekday()]
}

// *** Start of ***

export function getStartOfDay (date) {
  return getStartOf(date, 'day')
}

export function getStartOfWeek (date) {
  return getStartOf(date, 'week')
}
export function getStartOfMonth (date) {
  return getStartOf(date, 'month')
}

export function getStartOfDate (date) {
  return getStartOf(date, 'date')
}

// *** End of ***

export function getEndOfWeek (date) {
  return getEndOf(date, 'week')
}

export function getEndOfMonth (date) {
  return getEndOf(date, 'month')
}

// ** Date Math **

// *** Addition ***

export function addMinutes (date, amount) {
  return add(date, amount, 'minutes')
}

export function addDays (date, amount) {
  return add(date, amount, 'days')
}

export function addWeeks (date, amount) {
  return add(date, amount, 'weeks')
}

export function addMonths (date, amount) {
  return add(date, amount, 'months')
}

export function addYears (date, amount) {
  return add(date, amount, 'years')
}

// *** Subtraction ***
export function subtractDays (date, amount) {
  return subtract(date, amount, 'days')
}

export function subtractWeeks (date, amount) {
  return subtract(date, amount, 'weeks')
}

export function subtractMonths (date, amount) {
  return subtract(date, amount, 'months')
}

export function subtractYears (date, amount) {
  return subtract(date, amount, 'years')
}

// ** Date Comparison **

export function isBefore (date1, date2) {
  return date1.isBefore(date2)
}

export function isAfter (date1, date2) {
  return date1.isAfter(date2)
}

export function equals (date1, date2) {
  return date1.isSame(date2)
}

export function isSameMonth (date1, date2) {
  return isSame(date1, date2, 'month')
}

export function isSameDay (moment1, moment2) {
  if (moment1 && moment2) {
    return moment1.isSame(moment2, 'day')
  } else {
    return !moment1 && !moment2
  }
}

export function isSameUtcOffset (moment1, moment2) {
  if (moment1 && moment2) {
    return moment1.utcOffset() === moment2.utcOffset()
  } else {
    return !moment1 && !moment2
  }
}

export function isDayInRange (day, startDate, endDate) {
  const before = startDate.clone().startOf('day').subtract(1, 'seconds')
  const after = endDate.clone().startOf('day').add(1, 'seconds')
  return day.clone().startOf('day').isBetween(before, after)
}

// *** Diffing ***

export function getDaysDiff (date1, date2) {
  return getDiff(date1, date2, 'days')
}

// ** Date Localization **

export function localizeDate (date, locale) {
  return date.clone().locale(locale || moment.locale())
}

export function getDefaultLocale () {
  return moment.locale()
}

export function getDefaultLocaleData () {
  return moment.localeData()
}

export function registerLocale (localeName, localeData) {
  moment.defineLocale(localeName, localeData)
}

export function getLocaleData (date) {
  return date.localeData()
}

export function getLocaleDataForLocale (locale) {
  return moment.localeData(locale)
}

export function getWeekdayMinInLocale (locale, date) {
  return locale.weekdaysMin(date)
}

export function getWeekdayShortInLocale (locale, date) {
  return locale.weekdaysShort(date)
}

// TODO what is this format exactly?
export function getMonthInLocale (locale, date, format) {
  return locale.months(date, format)
}

// ** Utils for some components **

export function isDayDisabled (day, { minDate, maxDate, excludeDates, includeDates, filterDate } = {}) {
  return (minDate && day.isBefore(minDate, 'day')) ||
    (maxDate && day.isAfter(maxDate, 'day')) ||
    (excludeDates && excludeDates.some(excludeDate => isSameDay(day, excludeDate))) ||
    (includeDates && !includeDates.some(includeDate => isSameDay(day, includeDate))) ||
    (filterDate && !filterDate(day.clone())) ||
    false
}

export function isTimeDisabled (time, disabledTimes) {
  const l = disabledTimes.length
  for (let i = 0; i < l; i++) {
    if (disabledTimes[i].get('hours') === time.get('hours') && disabledTimes[i].get('minutes') === time.get('minutes')) {
      return true
    }
  }

  return false
}

export function isTimeInDisabledRange (time, { minTime, maxTime }) {
  if (!minTime || !maxTime) {
    throw new Error('Both minTime and maxTime props required')
  }

  const base = moment().hours(0).minutes(0).seconds(0)
  const baseTime = base.clone().hours(time.get('hours')).minutes(time.get('minutes'))
  const min = base.clone().hours(minTime.get('hours')).minutes(minTime.get('minutes'))
  const max = base.clone().hours(maxTime.get('hours')).minutes(maxTime.get('minutes'))

  return !(baseTime.isSameOrAfter(min) && baseTime.isSameOrBefore(max))
}

export function allDaysDisabledBefore (day, unit, { minDate, includeDates } = {}) {
  const dateBefore = day.clone().subtract(1, unit)
  return (minDate && dateBefore.isBefore(minDate, unit)) ||
    (includeDates && includeDates.every(includeDate => dateBefore.isBefore(includeDate, unit))) ||
    false
}

export function allDaysDisabledAfter (day, unit, { maxDate, includeDates } = {}) {
  const dateAfter = day.clone().add(1, unit)
  return (maxDate && dateAfter.isAfter(maxDate, unit)) ||
    (includeDates && includeDates.every(includeDate => dateAfter.isAfter(includeDate, unit))) ||
    false
}

export function getEffectiveMinDate ({ minDate, includeDates }) {
  if (includeDates && minDate) {
    return moment.min(includeDates.filter(includeDate => minDate.isSameOrBefore(includeDate, 'day')))
  } else if (includeDates) {
    return moment.min(includeDates)
  } else {
    return minDate
  }
}

export function getEffectiveMaxDate ({ maxDate, includeDates }) {
  if (includeDates && maxDate) {
    return moment.max(includeDates.filter(includeDate => maxDate.isSameOrAfter(includeDate, 'day')))
  } else if (includeDates) {
    return moment.max(includeDates)
  } else {
    return maxDate
  }
}
