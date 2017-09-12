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
