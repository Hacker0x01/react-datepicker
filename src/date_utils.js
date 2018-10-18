import {
  parse,
  isDate,
  isValid,
  format,
  addMinutes,
  addHours,
  addDays,
  addWeeks,
  addMonths,
  addYears,
  subMinutes,
  subHours,
  subDays,
  subWeeks,
  subMonths,
  subYears,
  getSeconds,
  getMinutes,
  getHours,
  getDay,
  getDate,
  getMonth,
  getYear,
  setSeconds,
  setMinutes,
  setHours,
  setMonth,
  setYear,
  min,
  max,
  isSameDay as issameday,
  isSameMonth as issamemonth,
  isSameYear as issameyear,
  differenceInCalendarDays,
  differenceInCalendarWeeks,
  differenceInCalendarMonths,
  setDayOfYear,
  startOfToday,
  startOfDay,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  isEqual,
  isSameWeek,
  isAfter as isafter,
  isBefore as isbefore,
  isWithinRange
} from "date-fns";

// ** Date Constructors **

export function newDate(point) {
  const d = point ? parse(point) : new Date();
  return isValid(d) ? d : null;
}

export function parseDate(value, { locale = "en" }) {
  // date-fns does not support locale parsing right now
  const d = parse(value, { locale: locale });
  return d.isValid() ? d : null;
}

// ** UTC Constructors **

export function createDateAsUTC(date) {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  );
}

export function convertDateToUTC(date) {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
}

export function now(maybeFixedUtcOffset) {
  return maybeFixedUtcOffset
    ? newDateWithOffset(maybeFixedUtcOffset)
    : newDate();
}

export function newDateWithOffset(utcOffset) {
  const d = new Date();
  const utc = d.getTime() + d.getTimezoneOffset() * 60000;
  return new Date(utc + 3600000 * utcOffset);
}

// ** Date "Reflection" **

export { isDate, isValid };

// ** Date Formatting **

export function formatDate(date, format, locale = "en") {
  return format(date, format, { locale: locale });
}

export function safeDateFormat(date, { dateFormat, locale = "en" }) {
  return (
    (date &&
      format(date, Array.isArray(dateFormat) ? dateFormat[0] : dateFormat, {
        locale: locale
      })) ||
    ""
  );
}

// ** Date Setters **

export function setTime(date, { hour = 0, minute = 0, second = 0 }) {
  return setHours(setMinutes(setSeconds(date, second), minute), hour);
}

export { setMonth, setYear };

export function setUTCOffset(date, offset) {
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  return new Date(utc + 3600000 * offset);
}

// ** Date Getters **

// getDay Returns day of week, getDate returns day of month
export { getSeconds, getMinutes, getHours, getMonth, getYear, getDay, getDate };

export function getWeek(date) {
  let firstDayOfYear = setDayOfYear(date, 1);
  if (!isSameYear(endOfWeek(date), date)) {
    return 1;
  }
  return differenceInCalendarWeeks(date, firstDayOfYear) + 1;
}

export function getUTCOffset(date) {
  var sign = date.getTimezoneOffset() > 0 ? "-" : "+";
  var offset = Math.abs(date.getTimezoneOffset());
  var hours = Math.floor(offset / 60);
  var minutes = offset % 60;
  return `${sign}${hours
    .toString()
    .padStart(2, 0)}:${minutes.toString().padStart(2, 0)}`;
}

// should this take locale?
export function getDayOfWeekCode(day) {
  return day.format("ddd");
}

// *** Start of ***

export function getStartOfDay(date) {
  return startOfDay(date);
}

export function getStartOfWeek(date) {
  return startOfWeek(date);
}

export function getStartOfMonth(date) {
  return startOfMonth(date);
}

export function getStartOfToday() {
  return startOfToday();
}

// *** End of ***

export function getEndOfWeek(date) {
  return endOfWeek(date);
}

export function getEndOfMonth(date) {
  return endOfMonth(date);
}

// ** Date Math **

// *** Addition ***

export { addMinutes, addDays, addWeeks, addMonths, addYears };

// *** Subtraction ***

export { subMinutes, subHours, subDays, subWeeks, subMonths, subYears };

// ** Date Comparison **

export function isBefore(date1, date2) {
  return isbefore(date1, date2);
}

export function isAfter(date1, date2) {
  return isafter(date1, date2);
}

export function equals(date1, date2) {
  return isEqual(date1, date2);
}

export function isSameYear(date1, date2) {
  if (date1 && date2) {
    return issameyear(date1, date2);
  } else {
    return !date1 && !date2;
  }
}

export function isSameMonth(date1, date2) {
  if (date1 && date2) {
    return issamemonth(date1, date2);
  } else {
    return !date1 && !date2;
  }
}

export function isSameDay(date1, date2) {
  if (date1 && date2) {
    return issameday(date1, date2);
  } else {
    return !date1 && !date2;
  }
}

export function isSameUtcOffset(date1, date2) {
  if (date1 && date2) {
    return getUTCOffset(date1) === getUTCOffset(date2);
  } else {
    return !date1 && !date2;
  }
}

export function isDayInRange(day, startDate, endDate) {
  return isWithinRange(day, startDate, endDate);
}

// *** Diffing ***

export function getDaysDiff(date1, date2) {
  return differenceInCalendarDays(date1, date2);
}

// ** Date Localization **

// TODO: what does this output?
export function localizeDate(date, locale = "en") {
  return dayjs(date).locale(locale);
}

export function getFormattedWeekdayInLocale(date, locale = "en", formatFunc) {
  return formatFunc(formatDate(date, "dddd", { locale: locale }));
}

export function getWeekdayMinInLocale(date, locale = "en") {
  return formatDate(date, "dd", { locale: locale });
}

export function getWeekdayShortInLocale(date, locale = "en") {
  return formatDate(date, "ddd", { locale: locale });
}

export function getMonthInLocale(month, locale = "en") {
  return formatDate(date, "MMMM", { locale: locale });
}

export function getMonthShortInLocale(month, locale = "en") {
  return formatDate(date, "MMM", { locale: locale });
}

// ** Utils for some components **

export function isDayDisabled(
  day,
  { minDate, maxDate, excludeDates, includeDates, filterDate } = {}
) {
  return (
    isOutOfBounds(day, { minDate, maxDate }) ||
    (excludeDates &&
      excludeDates.some(excludeDate => isSameDay(day, excludeDate))) ||
    (includeDates &&
      !includeDates.some(includeDate => isSameDay(day, includeDate))) ||
    (filterDate && !filterDate(parse(day))) ||
    false
  );
}

export function isOutOfBounds(day, { minDate, maxDate } = {}) {
  return (
    (minDate && differenceInCalendarDays(day, minDate) < 0) ||
    (maxDate && differenceInCalendarDays(day, maxDate) > 0)
  );
}

export function isTimeDisabled(time, disabledTimes) {
  const l = disabledTimes.length;
  for (let i = 0; i < l; i++) {
    if (
      getHours(disabledTimes[i]) === getHours(time) &&
      getMinutes(disabledTimes[i]) === getMinutes(time)
    ) {
      return true;
    }
  }

  return false;
}

export function isTimeInDisabledRange(time, { minTime, maxTime }) {
  if (!minTime || !maxTime) {
    throw new Error("Both minTime and maxTime props required");
  }

  const base = newDate();
  const baseTime = setHours(setMinutes(base, getMinutes(time)), getHours(time));
  const min = setHours(
    setMinutes(base, getMinutes(minTime)),
    getHours(minTime)
  );
  const max = setHours(
    setMinutes(base, getMinutes(maxTime)),
    getHours(maxTime)
  );
  return isWithinRange(baseTime, min, max);
}

export function monthDisabledBefore(day, { minDate, includeDates } = {}) {
  const previousMonth = subMonths(day, 1);
  return (
    (minDate && differenceInCalendarMonths(minDate, previousMonth) > 0) ||
    (includeDates &&
      includeDates.every(
        includeDate =>
          differenceInCalendarMonths(includeDate, previousMonth) > 0
      )) ||
    false
  );
}

export function monthDisabledAfter(day, { maxDate, includeDates } = {}) {
  const nextMonth = addMonths(day, 1);
  return (
    (maxDate && differenceInCalendarMonths(nextMonth, maxDate) > 0) ||
    (includeDates &&
      includeDates.every(
        includeDate => differenceInCalendarMonths(nextMonth, includeDate) > 0
      )) ||
    false
  );
}

export function getEffectiveMinDate({ minDate, includeDates }) {
  if (includeDates && minDate) {
    let minDates = includeDates.filter(
      includeDate => differenceInCalendarDays(includeDate, minDate) >= 0
    );
    return min(...minDates);
  } else if (includeDates) {
    return min(...includeDates);
  } else {
    return minDate;
  }
}

export function getEffectiveMaxDate({ maxDate, includeDates }) {
  if (includeDates && maxDate) {
    let maxDates = includeDates.filter(
      includeDate => differenceInCalendarDays(includeDate, maxDate) <= 0
    );
    return max(...maxDates);
  } else if (includeDates) {
    return max(...includeDates);
  } else {
    return maxDate;
  }
}

export function getHightLightDaysMap(
  highlightDates = [],
  defaultClassName = "react-datepicker__day--highlighted"
) {
  const dateClasses = new Map();
  for (let i = 0, len = highlightDates.length; i < len; i++) {
    const obj = highlightDates[i];
    if (isDayjs(obj)) {
      const key = formatDate(obj, "MM.DD.YYYY");
      const classNamesArr = dateClasses.get(key) || [];
      if (!classNamesArr.includes(defaultClassName)) {
        classNamesArr.push(defaultClassName);
        dateClasses.set(key, classNamesArr);
      }
    } else if (typeof obj === "object") {
      const keys = Object.keys(obj);
      const className = keys[0];
      const arrOfDayjs = obj[keys[0]];
      if (typeof className === "string" && arrOfDayjs.constructor === Array) {
        for (let k = 0, len = arrOfDayjs.length; k < len; k++) {
          const key = formatDate(arrOfDayjs[k], "MM.DD.YYYY");
          const classNamesArr = dateClasses.get(key) || [];
          if (!classNamesArr.includes(className)) {
            classNamesArr.push(className);
            dateClasses.set(key, classNamesArr);
          }
        }
      }
    }
  }

  return dateClasses;
}

export function timesToInjectAfter(
  startOfDay,
  currentTime,
  currentMultiplier,
  intervals,
  injectedTimes
) {
  const l = injectedTimes.length;
  const times = [];
  for (let i = 0; i < l; i++) {
    const injectedTime = addMinutes(
      addHours(startOfDay, getHours(injectedTimes[i])),
      getMinutes(injectedTimes[i])
    );
    const nextTime = addMinutes(
      startOfDay,
      (currentMultiplier + 1) * intervals
    );

    if (injectedTime.isBetween(currentTime, nextTime)) {
      times.push(injectedTimes[i]);
    }
  }

  return times;
}
