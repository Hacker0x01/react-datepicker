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
  isSameDay as dfIsSameDay,
  isSameMonth as dfIsSameMonth,
  isSameYear as dfIsSameYear,
  isAfter,
  isBefore,
  isWithinRange
} from "date-fns";

// ** Date Constructors **

export function newDate(value) {
  const d = value ? parse(value) : new Date();
  return isValid(d) && isAfter(d, new Date("1/1/1000")) ? d : null;
}

export function parseDate(value) {
  return value ? newDate(value) : null;
}

// ** Date "Reflection" **

export { isDate, isValid };

// ** Date Formatting **

export function formatDate(date, formatStr, locale) {
  if (locale === "en") {
    return format(date, formatStr);
  }

  let localeObj;
  // if locale is an actual locale object use that
  // otherwise look for a registered locale match
  if (typeof locale === "object") {
    localeObj = locale;
  } else if (window.__localeData__ && window.__localeData__[locale]) {
    localeObj = window.__localeData__[locale];
  }

  if (locale && !localeObj) {
    console.warn(`The provided locale ["${locale}"] was not found.`);
  }

  if (
    !localeObj &&
    window.__localeData__ &&
    window.__localeData__[window.__localeId__]
  ) {
    localeObj = window.__localeData__[window.__localeId__];
  }

  return format(date, formatStr, { locale: localeObj ? localeObj : null });
}

export function safeDateFormat(date, { dateFormat, locale }) {
  return (
    (date &&
      formatDate(date, Array.isArray(dateFormat) ? dateFormat[0] : dateFormat, {
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

export function getDayOfWeekCode(day, locale) {
  return formatDate(day, "ddd", (locale: locale));
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

export { isBefore, isAfter, isEqual };

export function isSameYear(date1, date2) {
  if (date1 && date2) {
    return dfIsSameYear(date1, date2);
  } else {
    return !date1 && !date2;
  }
}

export function isSameMonth(date1, date2) {
  if (date1 && date2) {
    return dfIsSameMonth(date1, date2);
  } else {
    return !date1 && !date2;
  }
}

export function isSameDay(date1, date2) {
  if (date1 && date2) {
    return dfIsSameDay(date1, date2);
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

export function registerLocale(localeName, localeData) {
  if (!window.__localeData__) {
    window.__localeData__ = {};
  }
  window.__localeData__[localeName] = localeData;
}

export function setDefaultLocale(localeName) {
  window.__localeId__ = localeName;
}

export function getDefaultLocale() {
  return window.__localeId__;
}

export function getFormattedWeekdayInLocale(date, formatFunc, locale) {
  return formatFunc(formatDate(date, "dddd", { locale: locale }));
}

export function getWeekdayMinInLocale(date, locale) {
  return formatDate(date, "dd", { locale: locale });
}

export function getWeekdayShortInLocale(date, locale) {
  return formatDate(date, "ddd", { locale: locale });
}

export function getMonthInLocale(month, locale) {
  return formatDate(setMonth(new Date(), month), "MMMM", locale);
}

export function getMonthShortInLocale(month, locale) {
  return formatDate(setMonth(new Date(), month), "MMM", locale);
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
    if (isDate(obj)) {
      const key = formatDate(obj, "MM.DD.YYYY");
      const classNamesArr = dateClasses.get(key) || [];
      if (!classNamesArr.includes(defaultClassName)) {
        classNamesArr.push(defaultClassName);
        dateClasses.set(key, classNamesArr);
      }
    } else if (typeof obj === "object") {
      const keys = Object.keys(obj);
      const className = keys[0];
      const arrOfDates = obj[keys[0]];
      if (typeof className === "string" && arrOfDates.constructor === Array) {
        for (let k = 0, len = arrOfDates.length; k < len; k++) {
          const key = formatDate(arrOfDates[k], "MM.DD.YYYY");
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

    if (
      isAfter(injectedTime, currentTime) &&
      isBefore(injectedTime, nextTime)
    ) {
      times.push(injectedTimes[i]);
    }
  }

  return times;
}
