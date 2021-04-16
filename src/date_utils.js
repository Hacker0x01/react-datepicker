import isDate from "date-fns/isDate";
import isValidDate from "date-fns/isValid";
import format from "date-fns/format";
import addMinutes from "date-fns/addMinutes";
import addHours from "date-fns/addHours";
import addDays from "date-fns/addDays";
import addWeeks from "date-fns/addWeeks";
import addMonths from "date-fns/addMonths";
import addYears from "date-fns/addYears";
import subMinutes from "date-fns/subMinutes";
import subHours from "date-fns/subHours";
import subDays from "date-fns/subDays";
import subWeeks from "date-fns/subWeeks";
import subMonths from "date-fns/subMonths";
import subYears from "date-fns/subYears";
import getSeconds from "date-fns/getSeconds";
import getMinutes from "date-fns/getMinutes";
import getHours from "date-fns/getHours";
import getDay from "date-fns/getDay";
import getDate from "date-fns/getDate";
import getISOWeek from "date-fns/getISOWeek";
import getMonth from "date-fns/getMonth";
import getQuarter from "date-fns/getQuarter";
import getYear from "date-fns/getYear";
import getTime from "date-fns/getTime";
import setSeconds from "date-fns/setSeconds";
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";
import setMonth from "date-fns/setMonth";
import setQuarter from "date-fns/setQuarter";
import setYear from "date-fns/setYear";
import min from "date-fns/min";
import max from "date-fns/max";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import differenceInCalendarMonths from "date-fns/differenceInCalendarMonths";
import differenceInCalendarWeeks from "date-fns/differenceInCalendarWeeks";
import differenceInCalendarYears from "date-fns/differenceInCalendarYears";
import startOfDay from "date-fns/startOfDay";
import startOfWeek from "date-fns/startOfWeek";
import startOfMonth from "date-fns/startOfMonth";
import startOfQuarter from "date-fns/startOfQuarter";
import startOfYear from "date-fns/startOfYear";
import endOfDay from "date-fns/endOfDay";
import endOfWeek from "date-fns/endOfWeek";
import endOfMonth from "date-fns/endOfMonth";
import dfIsEqual from "date-fns/isEqual";
import dfIsSameDay from "date-fns/isSameDay";
import dfIsSameMonth from "date-fns/isSameMonth";
import dfIsSameYear from "date-fns/isSameYear";
import dfIsSameQuarter from "date-fns/isSameQuarter";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import isWithinInterval from "date-fns/isWithinInterval";
import toDate from "date-fns/toDate";
import parse from "date-fns/parse";
import parseISO from "date-fns/parseISO";
import longFormatters from "date-fns/esm/_lib/format/longFormatters";

export const DEFAULT_YEAR_ITEM_NUMBER = 12;

// This RegExp catches symbols escaped by quotes, and also
// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;

// ** Date Constructors **

export function newDate(value) {
  const d = value
    ? typeof value === "string" || value instanceof String
      ? parseISO(value)
      : toDate(value)
    : new Date();
  return isValid(d) ? d : null;
}

export function parseDate(value, dateFormat, locale, strictParsing) {
  let parsedDate = null;
  let localeObject =
    getLocaleObject(locale) || getLocaleObject(getDefaultLocale());
  let strictParsingValueMatch = true;
  if (Array.isArray(dateFormat)) {
    dateFormat.forEach((df) => {
      let tryParseDate = parse(value, df, new Date(), { locale: localeObject });
      if (strictParsing) {
        strictParsingValueMatch =
          isValid(tryParseDate) &&
          value === format(tryParseDate, df, { awareOfUnicodeTokens: true });
      }
      if (isValid(tryParseDate) && strictParsingValueMatch) {
        parsedDate = tryParseDate;
      }
    });
    return parsedDate;
  }

  parsedDate = parse(value, dateFormat, new Date(), { locale: localeObject });

  if (strictParsing) {
    strictParsingValueMatch =
      isValid(parsedDate) &&
      value === format(parsedDate, dateFormat, { awareOfUnicodeTokens: true });
  } else if (!isValid(parsedDate)) {
    dateFormat = dateFormat
      .match(longFormattingTokensRegExp)
      .map(function (substring) {
        var firstCharacter = substring[0];
        if (firstCharacter === "p" || firstCharacter === "P") {
          var longFormatter = longFormatters[firstCharacter];
          return localeObject
            ? longFormatter(substring, localeObject.formatLong)
            : firstCharacter;
        }
        return substring;
      })
      .join("");

    if (value.length > 0) {
      parsedDate = parse(value, dateFormat.slice(0, value.length), new Date());
    }

    if (!isValid(parsedDate)) {
      parsedDate = new Date(value);
    }
  }

  return isValid(parsedDate) && strictParsingValueMatch ? parsedDate : null;
}

// ** Date "Reflection" **

export { isDate };

export function isValid(date) {
  return isValidDate(date) && isAfter(date, new Date("1/1/1000"));
}

// ** Date Formatting **

export function formatDate(date, formatStr, locale) {
  if (locale === "en") {
    return format(date, formatStr, { awareOfUnicodeTokens: true });
  }
  let localeObj = getLocaleObject(locale);
  if (locale && !localeObj) {
    console.warn(
      `A locale object was not found for the provided string ["${locale}"].`
    );
  }
  if (
    !localeObj &&
    !!getDefaultLocale() &&
    !!getLocaleObject(getDefaultLocale())
  ) {
    localeObj = getLocaleObject(getDefaultLocale());
  }
  return format(date, formatStr, {
    locale: localeObj ? localeObj : null,
    awareOfUnicodeTokens: true,
  });
}

export function safeDateFormat(date, { dateFormat, locale }) {
  return (
    (date &&
      formatDate(
        date,
        Array.isArray(dateFormat) ? dateFormat[0] : dateFormat,
        (locale: locale)
      )) ||
    ""
  );
}

export function safeDateRangeFormat(startDate, endDate, props) {
  if (!startDate) {
    return "";
  }

  const formattedStartDate = safeDateFormat(startDate, props);
  const formattedEndDate = endDate ? safeDateFormat(endDate, props) : "";

  return `${formattedStartDate} - ${formattedEndDate}`;
}

// ** Date Setters **

export function setTime(date, { hour = 0, minute = 0, second = 0 }) {
  return setHours(setMinutes(setSeconds(date, second), minute), hour);
}

export { setMinutes, setHours, setMonth, setQuarter, setYear };

// ** Date Getters **

// getDay Returns day of week, getDate returns day of month
export {
  getSeconds,
  getMinutes,
  getHours,
  getMonth,
  getQuarter,
  getYear,
  getDay,
  getDate,
  getTime,
};

export function getWeek(date, locale) {
  let localeObj =
    (locale && getLocaleObject(locale)) ||
    (getDefaultLocale() && getLocaleObject(getDefaultLocale()));
  return getISOWeek(date, localeObj ? { locale: localeObj } : null);
}

export function getDayOfWeekCode(day, locale) {
  return formatDate(day, "ddd", (locale: locale));
}

// *** Start of ***

export function getStartOfDay(date) {
  return startOfDay(date);
}

export function getStartOfWeek(date, locale) {
  let localeObj = locale
    ? getLocaleObject(locale)
    : getLocaleObject(getDefaultLocale());
  return startOfWeek(date, { locale: localeObj });
}

export function getStartOfMonth(date) {
  return startOfMonth(date);
}

export function getStartOfYear(date) {
  return startOfYear(date);
}

export function getStartOfQuarter(date) {
  return startOfQuarter(date);
}

export function getStartOfToday() {
  return startOfDay(newDate());
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

export {
  addHours,
  subMinutes,
  subHours,
  subDays,
  subWeeks,
  subMonths,
  subYears,
};

// ** Date Comparison **

export { isBefore, isAfter };

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

export function isSameQuarter(date1, date2) {
  if (date1 && date2) {
    return dfIsSameQuarter(date1, date2);
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

export function isEqual(date1, date2) {
  if (date1 && date2) {
    return dfIsEqual(date1, date2);
  } else {
    return !date1 && !date2;
  }
}

export function isDayInRange(day, startDate, endDate) {
  let valid;
  const start = startOfDay(startDate);
  const end = endOfDay(endDate);

  try {
    valid = isWithinInterval(day, { start, end });
  } catch (err) {
    valid = false;
  }
  return valid;
}

// *** Diffing ***

export function getDaysDiff(date1, date2) {
  return differenceInCalendarDays(date1, date2);
}

// ** Date Localization **

export function registerLocale(localeName, localeData) {
  const scope = typeof window !== "undefined" ? window : global;

  if (!scope.__localeData__) {
    scope.__localeData__ = {};
  }
  scope.__localeData__[localeName] = localeData;
}

export function setDefaultLocale(localeName) {
  const scope = typeof window !== "undefined" ? window : global;

  scope.__localeId__ = localeName;
}

export function getDefaultLocale() {
  const scope = typeof window !== "undefined" ? window : global;

  return scope.__localeId__;
}

export function getLocaleObject(localeSpec) {
  if (typeof localeSpec === "string") {
    // Treat it as a locale name registered by registerLocale
    const scope = typeof window !== "undefined" ? window : global;
    return scope.__localeData__ ? scope.__localeData__[localeSpec] : null;
  } else {
    // Treat it as a raw date-fns locale object
    return localeSpec;
  }
}

export function getFormattedWeekdayInLocale(date, formatFunc, locale) {
  return formatFunc(formatDate(date, "EEEE", locale));
}

export function getWeekdayMinInLocale(date, locale) {
  return formatDate(date, "EEEEEE", locale);
}

export function getWeekdayShortInLocale(date, locale) {
  return formatDate(date, "EEE", locale);
}

export function getMonthInLocale(month, locale) {
  return formatDate(setMonth(newDate(), month), "LLLL", locale);
}

export function getMonthShortInLocale(month, locale) {
  return formatDate(setMonth(newDate(), month), "LLL", locale);
}

export function getQuarterShortInLocale(quarter, locale) {
  return formatDate(setQuarter(newDate(), quarter), "QQQ", locale);
}

// ** Utils for some components **

export function isDayDisabled(
  day,
  { minDate, maxDate, excludeDates, includeDates, filterDate } = {}
) {
  return (
    isOutOfBounds(day, { minDate, maxDate }) ||
    (excludeDates &&
      excludeDates.some((excludeDate) => isSameDay(day, excludeDate))) ||
    (includeDates &&
      !includeDates.some((includeDate) => isSameDay(day, includeDate))) ||
    (filterDate && !filterDate(newDate(day))) ||
    false
  );
}

export function isDayExcluded(day, { excludeDates } = {}) {
  return (
    (excludeDates &&
      excludeDates.some((excludeDate) => isSameDay(day, excludeDate))) ||
    false
  );
}

export function isMonthDisabled(
  month,
  { minDate, maxDate, excludeDates, includeDates, filterDate } = {}
) {
  return (
    isOutOfBounds(month, { minDate, maxDate }) ||
    (excludeDates &&
      excludeDates.some((excludeDate) => isSameMonth(month, excludeDate))) ||
    (includeDates &&
      !includeDates.some((includeDate) => isSameMonth(month, includeDate))) ||
    (filterDate && !filterDate(newDate(month))) ||
    false
  );
}

export function isMonthinRange(startDate, endDate, m, day) {
  const startDateYear = getYear(startDate);
  const startDateMonth = getMonth(startDate);
  const endDateYear = getYear(endDate);
  const endDateMonth = getMonth(endDate);
  const dayYear = getYear(day);
  if (startDateYear === endDateYear && startDateYear === dayYear) {
    return startDateMonth <= m && m <= endDateMonth;
  } else if (startDateYear < endDateYear) {
    return (
      (dayYear === startDateYear && startDateMonth <= m) ||
      (dayYear === endDateYear && endDateMonth >= m) ||
      (dayYear < endDateYear && dayYear > startDateYear)
    );
  }
}

export function isQuarterDisabled(
  quarter,
  { minDate, maxDate, excludeDates, includeDates, filterDate } = {}
) {
  return (
    isOutOfBounds(quarter, { minDate, maxDate }) ||
    (excludeDates &&
      excludeDates.some((excludeDate) =>
        isSameQuarter(quarter, excludeDate)
      )) ||
    (includeDates &&
      !includeDates.some((includeDate) =>
        isSameQuarter(quarter, includeDate)
      )) ||
    (filterDate && !filterDate(newDate(quarter))) ||
    false
  );
}

export function isYearDisabled(year, { minDate, maxDate } = {}) {
  const date = new Date(year, 0, 1);
  return isOutOfBounds(date, { minDate, maxDate }) || false;
}

export function isQuarterInRange(startDate, endDate, q, day) {
  const startDateYear = getYear(startDate);
  const startDateQuarter = getQuarter(startDate);
  const endDateYear = getYear(endDate);
  const endDateQuarter = getQuarter(endDate);
  const dayYear = getYear(day);
  if (startDateYear === endDateYear && startDateYear === dayYear) {
    return startDateQuarter <= q && q <= endDateQuarter;
  } else if (startDateYear < endDateYear) {
    return (
      (dayYear === startDateYear && startDateQuarter <= q) ||
      (dayYear === endDateYear && endDateQuarter >= q) ||
      (dayYear < endDateYear && dayYear > startDateYear)
    );
  }
}

export function isOutOfBounds(day, { minDate, maxDate } = {}) {
  return (
    (minDate && differenceInCalendarDays(day, minDate) < 0) ||
    (maxDate && differenceInCalendarDays(day, maxDate) > 0)
  );
}

export function isTimeInList(time, times) {
  return times.some(
    (listTime) =>
      getHours(listTime) === getHours(time) &&
      getMinutes(listTime) === getMinutes(time)
  );
}

export function isTimeDisabled(
  time,
  { excludeTimes, includeTimes, filterTime } = {}
) {
  return (
    (excludeTimes && isTimeInList(time, excludeTimes)) ||
    (includeTimes && !isTimeInList(time, includeTimes)) ||
    (filterTime && !filterTime(time)) ||
    false
  );
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

  let valid;
  try {
    valid = !isWithinInterval(baseTime, { start: min, end: max });
  } catch (err) {
    valid = false;
  }
  return valid;
}

export function monthDisabledBefore(day, { minDate, includeDates } = {}) {
  const previousMonth = subMonths(day, 1);
  return (
    (minDate && differenceInCalendarMonths(minDate, previousMonth) > 0) ||
    (includeDates &&
      includeDates.every(
        (includeDate) =>
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
        (includeDate) => differenceInCalendarMonths(nextMonth, includeDate) > 0
      )) ||
    false
  );
}

export function yearDisabledBefore(day, { minDate, includeDates } = {}) {
  const previousYear = subYears(day, 1);
  return (
    (minDate && differenceInCalendarYears(minDate, previousYear) > 0) ||
    (includeDates &&
      includeDates.every(
        (includeDate) =>
          differenceInCalendarYears(includeDate, previousYear) > 0
      )) ||
    false
  );
}

export function yearsDisabledBefore(
  day,
  { minDate, yearItemNumber = DEFAULT_YEAR_ITEM_NUMBER } = {}
) {
  const previousYear = getStartOfYear(subYears(day, yearItemNumber));
  const { endPeriod } = getYearsPeriod(previousYear, yearItemNumber);
  const minDateYear = minDate && getYear(minDate);
  return (minDateYear && minDateYear > endPeriod) || false;
}

export function yearDisabledAfter(day, { maxDate, includeDates } = {}) {
  const nextYear = addYears(day, 1);
  return (
    (maxDate && differenceInCalendarYears(nextYear, maxDate) > 0) ||
    (includeDates &&
      includeDates.every(
        (includeDate) => differenceInCalendarYears(nextYear, includeDate) > 0
      )) ||
    false
  );
}

export function yearsDisabledAfter(
  day,
  { maxDate, yearItemNumber = DEFAULT_YEAR_ITEM_NUMBER } = {}
) {
  const nextYear = addYears(day, yearItemNumber);
  const { startPeriod } = getYearsPeriod(nextYear, yearItemNumber);
  const maxDateYear = maxDate && getYear(maxDate);
  return (maxDateYear && maxDateYear < startPeriod) || false;
}

export function getEffectiveMinDate({ minDate, includeDates }) {
  if (includeDates && minDate) {
    let minDates = includeDates.filter(
      (includeDate) => differenceInCalendarDays(includeDate, minDate) >= 0
    );
    return min(minDates);
  } else if (includeDates) {
    return min(includeDates);
  } else {
    return minDate;
  }
}

export function getEffectiveMaxDate({ maxDate, includeDates }) {
  if (includeDates && maxDate) {
    let maxDates = includeDates.filter(
      (includeDate) => differenceInCalendarDays(includeDate, maxDate) <= 0
    );
    return max(maxDates);
  } else if (includeDates) {
    return max(includeDates);
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
      const key = formatDate(obj, "MM.dd.yyyy");
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
          const key = formatDate(arrOfDates[k], "MM.dd.yyyy");
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

export function addZero(i) {
  return i < 10 ? `0${i}` : `${i}`;
}

export function getYearsPeriod(
  date,
  yearItemNumber = DEFAULT_YEAR_ITEM_NUMBER
) {
  const endPeriod = Math.ceil(getYear(date) / yearItemNumber) * yearItemNumber;
  const startPeriod = endPeriod - (yearItemNumber - 1);
  return { startPeriod, endPeriod };
}
