import moment from 'moment'

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

export function parseDate (value, { dateFormat, locale }) {
  const m = moment(value, dateFormat, locale || moment.locale(), true)
  return m.isValid() ? m : null
}

export function safeDateFormat (date, { dateFormat, locale }) {
  return date && date.clone()
    .locale(locale || moment.locale())
    .format(Array.isArray(dateFormat) ? dateFormat[0] : dateFormat) || ''
}

const dayOfWeekCodes = {
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat',
  7: 'sun'
}

export function getDayOfWeekCode (day) {
  return dayOfWeekCodes[day.isoWeekday()]
}

// my stuff

// These functions are not exported so
// that we avoid magic strings like 'days'
function set (date, thing, to) {
  return date.set(thing, to)
}

function add (date, amount, thing) {
  return date.add(amount, thing)
}

function subtract (date, amount, thing) {
  return date.subtract(amount, thing)
}

function get (date, thing) {
  return date.get(thing)
}

export function getUTCOffset () {
  return moment().utcOffset()
}

export function newDate (point) {
  return moment(point)
}

export function newDateWithOffset (utcOffset) {
  return moment().utc().utcOffset(utcOffset)
}

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

export function getHour (date) {
  return get(date, 'hour')
}

export function getMinute (date) {
  return get(date, 'minute')
}

export function getSecond (date) {
  return get(date, 'second')
}

export function getDay (date) {
  return get(date, 'day')
}

export function getMonth (date) {
  return get(date, 'month')
}

export function getYear (date) {
  return get(date, 'year')
}

export function getDate (date) {
  return get(date, 'date')
}

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

export function subtractMonths (date, amount) {
  return subtract(date, amount, 'months')
}

export function isMoment (date) {
  return moment.isMoment(date)
}

export function isDate (date) {
  return moment.isDate(date)
}

export function localizeDate (date, locale) {
  return date.clone().locale(locale || moment.locale())
}

function getStartOf (date, thing) {
  return date.startOf(thing)
}

export function getStartOfWeek (date) {
  return getStartOf(date, 'week')
}
export function getStartOfDay (date) {
  return getStartOf(date, 'day')
}
export function getStartOfMonth (date) {
  return getStartOf(date, 'month')
}

export function getStartOfDate (date) {
  return getStartOf(date, 'date')
}

export function cloneDate (date) {
  return date.clone()
}

export function formatDate (date, format) {
  return date.format(format)
}

export function isBefore (date1, date2) {
  return date1.isBefore(date2)
}

export function isAfter (date1, date2) {
  return date1.isAfter(date2)
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

function isSame (date1, date2, thing) {
  return date1.isSame(date2, thing)
}

export function isSameMonth (date1, date2) {
  return isSame(date1, date2, 'month')
}

export function getWeek (date) {
  return get(date, 'week')
}
