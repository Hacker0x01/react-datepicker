import enLocale from 'date-fns/locale/en'
import frLocale from 'date-fns/locale/fr'
import deLocale from 'date-fns/locale/de'

import _parse from 'date-fns/parse'
import _format from 'date-fns/format'
import _isAfter from 'date-fns/is_after'
import _isBefore from 'date-fns/is_before'
import _isDate from 'date-fns/is_date'
import _isEqual from 'date-fns/is_equal'

import _min from 'date-fns/min'
import _max from 'date-fns/max'

import _isSameDay from 'date-fns/is_same_day'
import _isSameMonth from 'date-fns/is_same_month'

import _getSecond from 'date-fns/get_seconds'
import _getMinute from 'date-fns/get_minutes'
import _getHour from 'date-fns/get_hours'
import _getDay from 'date-fns/get_day'
import _getISODay from 'date-fns/get_iso_day'
import _getDate from 'date-fns/get_date'
import _getMonth from 'date-fns/get_month'
import _getWeek from 'date-fns/get_iso_week'
import _getYear from 'date-fns/get_year'

import _getStartOfDay from 'date-fns/start_of_day'
import _getStartOfWeek from 'date-fns/start_of_week'
import _getStartOfMonth from 'date-fns/start_of_month'

import _getEndOfWeek from 'date-fns/end_of_week'
import _getEndOfMonth from 'date-fns/end_of_month'

import _setSecond from 'date-fns/set_seconds'
import _setMinute from 'date-fns/set_minutes'
import _setHour from 'date-fns/set_hours'
// import _setDay from 'date-fns/set_day'
// import _setDate from 'date-fns/set_date'
// import _setWeek from 'date-fns/set_weeks'
import _setMonth from 'date-fns/set_month'
import _setYear from 'date-fns/set_year'

// import _addSecond from 'date-fns/add_seconds'
import _addMinute from 'date-fns/add_minutes'
// import _addHour from 'date-fns/add_hours'
import _addDay from 'date-fns/add_days'
// import _addDate from 'date-fns/add_date'
import _addMonth from 'date-fns/add_months'
import _addWeek from 'date-fns/add_weeks'
import _addYear from 'date-fns/add_years'

import _subSecond from 'date-fns/sub_seconds'
import _subMinute from 'date-fns/sub_minutes'
// import _subHour from 'date-fns/sub_hours'
import _subDay from 'date-fns/sub_days'
// import _subDate from 'date-fns/sub_date'
import _subMonth from 'date-fns/sub_months'
import _subWeek from 'date-fns/sub_weeks'
import _subYear from 'date-fns/sub_years'

import _differenceInDays from 'date-fns/difference_in_days'

const LOCALE = {
  en: enLocale,
  fr: frLocale,
  de: deLocale
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

// ** Date Constructors **

export function newDate (point) {
  if (arguments.length === 0) {
    return new Date()
  }
  return parseDate(point)
}

function normalizeOffset (offset) {
  // TODO I *think* that's what moment does?
  if (Math.abs(offset) <= 12) {
    offset *= 60
  }
  return offset
}

export function newDateWithOffset (utcOffset) {
  return setUTCOffset(newDate(), utcOffset)
}

export function cloneDate (date) {
  // TODO should this be a noop since all date-fns return new Dates anyhow?
  return _parse(date)
}

function parseMoment ({ M }) {
  return getStartOfMonth(setMonth(newDate(), M))
}

export function parseDate (value, _) {
  if (value && !(value instanceof Date) && typeof value === 'object') {
    return parseMoment(value)
  }
  // TODO date-fns doesn't have support for parsing formats, so we ignore it
  const d = _parse(value)
  return isNaN(d.valueOf()) ? null : d
}

// ** Date "Reflection" **

export function isMoment (date) {
  // Since we can't require moment to call .isMoment(),
  // we have to do an approximation
  return date && typeof date === 'object' && date._isAMomentObject === true
}

export function isDate (date) {
  return _isDate(date)
}

// ** Date Formatting **

export function formatDate (date, format, locale = getDefaultLocale()) {
  return _format(date, format, {locale: normalizeLocale(locale)})
}

export function safeDateFormat (date, { dateFormat, locale }) {
  if (!date) {
    return ''
  }

  if (!Array.isArray(dateFormat)) {
    dateFormat = [dateFormat]
  }

  return formatDate(date, dateFormat[0], locale)
}

// ** Date Setters **

export function setTime (date, {hour, minute, second}) {
  let newDate = date
  if (typeof hour !== 'undefined') {
    newDate = _setHour(newDate, hour)
  }
  if (typeof minute !== 'undefined') {
    newDate = _setMinute(newDate, minute)
  }
  if (typeof second !== 'undefined') {
    newDate = _setSecond(newDate, second)
  }
  return newDate
}

export function setMonth (date, month) {
  return _setMonth(date, month)
}

export function setYear (date, year) {
  return _setYear(date, year)
}

// Returns current TZ offset to UTC in minutes
export function getUTCOffset (date = new Date()) {
  if (typeof date.__utcOffset__ !== 'undefined') {
    return date.__utcOffset__
  }
  return date.getTimezoneOffset() * -1
}

function getDateAsUTC (date) {
  const actualOffset = getUTCOffset(date)
  const fn = actualOffset > 0 ? _subMinute : addMinutes
  const clone = fn(date, actualOffset)
  return clone
}

export function setUTCOffset (date, offset) {
  // TODO since JS' Date is not capable of representing
  // time zones other than the host's, it's not really
  // obvious what to do here
  offset = normalizeOffset(offset)
  const fn = offset > 0 ? _subMinute : addMinutes
  const utc = fn(getDateAsUTC(date), offset)
  Object.defineProperty(utc, '__utcOffset__', { value: offset })
  return utc
}

// ** Date Getters **

export function getSecond (date) {
  return _getSecond(date)
}

export function getMinute (date) {
  return _getMinute(date)
}

export function getHour (date) {
  return _getHour(date)
}

// Returns day of week
export function getDay (date) {
  return _getDay(date)
}

export function getWeek (date) {
  return _getWeek(date)
}

export function getMonth (date) {
  return _getMonth(date)
}

export function getYear (date) {
  return _getYear(date)
}

// Returns day of month
export function getDate (date) {
  return _getDate(date)
}

export function getDayOfWeekCode (day) {
  return dayOfWeekCodes[_getISODay(day)]
}

// *** Start of ***

export function getStartOfDay (date) {
  return _getStartOfDay(date)
}

export function getStartOfWeek (date) {
  return _getStartOfWeek(date)
}
export function getStartOfMonth (date) {
  return _getStartOfMonth(date)
}

export function getStartOfDate (date) {
  return _getStartOfDay(date)
}

// *** End of ***

export function getEndOfWeek (date) {
  return _getEndOfWeek(date)
}

export function getEndOfMonth (date) {
  return _getEndOfMonth(date)
}

// ** Date Math **

// *** Addition ***

export function addMinutes (date, amount) {
  return _addMinute(date, amount)
}

export function addDays (date, amount) {
  return _addDay(date, amount)
}

export function addWeeks (date, amount) {
  return _addWeek(date, amount)
}

export function addMonths (date, amount) {
  return _addMonth(date, amount)
}

export function addYears (date, amount) {
  return _addYear(date, amount)
}

// *** Subtraction ***

export function subtractSeconds (date, amount) {
  return _subSecond(date, amount)
}

export function subtractDays (date, amount) {
  return _subDay(date, amount)
}

export function subtractWeeks (date, amount) {
  return _subWeek(date, amount)
}

export function subtractMonths (date, amount) {
  return _subMonth(date, amount)
}

export function subtractYears (date, amount) {
  return _subYear(date, amount)
}

// ** Date Comparison **

export function isBefore (date1, date2) {
  return _isBefore(date1, date2)
}

function isBeforeDay (date1, date2) {
  return isBefore(getStartOfDay(date1), getStartOfDay(date2))
}

function isBeforeMonth (date1, date2) {
  return isBefore(getStartOfMonth(date1), getStartOfMonth(date2))
}

export function isSameOrBefore (date1, date2) {
  return equals(date1, date2) || isBefore(date1, date2)
}

function isSameOrBeforeDay (date1, date2) {
  const d1 = getStartOfDay(date1)
  const d2 = getStartOfDay(date2)
  return equals(d1, d2) || isBefore(d1, d2)
}

export function isAfter (date1, date2) {
  return _isAfter(date1, date2)
}

function isAfterMonth (date1, date2) {
  return isAfter(getStartOfMonth(date1), getStartOfMonth(date2))
}

function isAfterDay (date1, date2) {
  return isAfter(getStartOfDay(date1), getStartOfDay(date2))
}

export function isSameOrAfter (date1, date2) {
  return _isEqual(date1, date2) || isAfter(date1, date2)
}

function isSameOrAfterDay (date1, date2) {
  const d1 = getStartOfDay(date1)
  const d2 = getStartOfDay(date2)
  return equals(d1, d2) || isAfter(d1, d2)
}

export function equals (date1, date2) {
  return _isEqual(date1, date2)
}

export function isSameMonth (date1, date2) {
  return _isSameMonth(date1, date2)
}

export function isSameDay (date1, date2) {
  if (date1 && date2) {
    return _isSameDay(date1, date2)
  } else {
    return !date1 && !date2
  }
}

export function isSameUtcOffset (date1, date2) {
  if (date1 && date2) {
    return getUTCOffset(date1) === getUTCOffset(date2)
  } else {
    return !date1 && !date2
  }
}

export function isDayInRange (day, startDate, endDate) {
  return isSameOrAfter(day, startDate) && isSameOrBefore(day, endDate)
}

// *** Diffing ***

export function getDaysDiff (date1, date2) {
  return _differenceInDays(date1, date2)
}

// ** Date Localization **

export function localizeDate (date, locale) {
  // TODO noop since JS Dates don't carry localization info
  return cloneDate(date)
}

export function getDefaultLocale () {
  // TODO that's probably bad
  return 'en'
}

export function getDefaultLocaleData () {
  return LOCALE.en
}

export function registerLocale (localeName, localeData) {
  LOCALE[localeName] = localeData
}

export function getLocaleData (date) {
  // TODO no idea how to keep this
  return LOCALE.en
}

export function getLocaleDataForLocale (locale) {
  return normalizeLocale(locale)
}

function normalizeLocale (locale) {
  return typeof locale === 'string' ? (LOCALE[locale] || getDefaultLocaleData()) : locale
}

export function getWeekdayMinInLocale (locale, date) {
  return _format(date, 'dd', { locale: normalizeLocale(locale) })
}

export function getWeekdayShortInLocale (locale, date) {
  return _format(date, 'ddd', { locale: normalizeLocale(locale) })
}

export function getMonthInLocale (locale, date) {
  return _format(date, 'MMMM', { locale: normalizeLocale(locale) })
}

// ** Utils for some components **

export function isDayDisabled (day, { minDate, maxDate, excludeDates, includeDates, filterDate } = {}) {
  return (minDate && isBeforeDay(day, minDate)) ||
    (maxDate && isAfterDay(day, maxDate)) ||
    (excludeDates && excludeDates.some(excludeDate => isSameDay(day, excludeDate))) ||
    (includeDates && !includeDates.some(includeDate => isSameDay(day, includeDate))) ||
    (filterDate && !filterDate(cloneDate(day))) ||
    false
}

export function isTimeDisabled (time, disabledTimes) {
  const l = disabledTimes.length
  for (let i = 0; i < l; i++) {
    if (getHour(disabledTimes[i]) === getHour(time) && getMinute(disabledTimes[i]) === getMinute(time)) {
      return true
    }
  }

  return false
}

export function isTimeInDisabledRange (time, { minTime, maxTime }) {
  if (!minTime || !maxTime) {
    throw new Error('Both minTime and maxTime props required')
  }
  const base = setTime(newDate(), { hours: 0, minutes: 0, seconds: 0 })
  const baseTime = setTime(base, { hours: getHour(time), minutes: getMinute(time) })

  const min = setTime(base, { hours: getHour(minTime), minutes: getMinute(minTime) })
  const max = setTime(base, { hours: getHour(maxTime), minutes: getMinute(maxTime) })

  return !(isSameOrAfter(baseTime, min) && isSameOrBefore(baseTime, max))
}

export function allDaysDisabledBeforeMonth (day, { minDate, includeDates } = {}) {
  const dateBefore = _subMonth(day, 1)
  return (minDate && isBeforeMonth(dateBefore, minDate)) ||
    (includeDates && includeDates.every(includeDate => isBeforeMonth(dateBefore, includeDate))) ||
    false
}

export function allDaysDisabledAfterMonth (day, { maxDate, includeDates } = {}) {
  const dateAfter = _addMonth(day, 1)
  return (maxDate && isAfterMonth(dateAfter, maxDate)) ||
    (includeDates && includeDates.every(includeDate => isAfterMonth(dateAfter, includeDate))) ||
    false
}

export function getEffectiveMinDate ({ minDate, includeDates }) {
  if (includeDates && minDate) {
    return _min.apply(null, includeDates.filter(includeDate => isSameOrBeforeDay(minDate, includeDate)))
  } else if (includeDates) {
    return _min.apply(null, includeDates)
  } else {
    return minDate
  }
}

export function getEffectiveMaxDate ({ maxDate, includeDates }) {
  if (includeDates && maxDate) {
    return _max.apply(null, includeDates.filter(includeDate => isSameOrAfterDay(maxDate, includeDate)))
  } else if (includeDates) {
    return _max.apply(null, includeDates)
  } else {
    return maxDate
  }
}
