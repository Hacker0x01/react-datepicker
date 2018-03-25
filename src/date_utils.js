import { DateTime } from "luxon";

const dayOfWeekCodes = {
  1: "mon",
  2: "tue",
  3: "wed",
  4: "thu",
  5: "fri",
  6: "sat",
  7: "sun"
};

// These functions are not exported so
// that we avoid magic strings like 'days'
function set(date, unit, to) {
  return date.set({ [unit]: to });
}

function add(date, amount, unit) {
  return date.plus({ [unit]: amount });
}

function subtract(date, amount, unit) {
  return date.minus({ [unit]: amount });
}

function get(date, unit) {
  return date[unit];
}

function getStartOf(date, unit) {
  return date.startOf(unit);
}

function getEndOf(date, unit) {
  return date.endOf(unit);
}

function getDiff(date1, date2, unit) {
  return date1.diff(date2, unit)[unit];
}

function isSame(date1, date2, unit) {
  return date1.hasSame(date2, unit);
}

function leftPad(number, digits) {
  // TODO browser support?
  return number.toLocaleString({}, { minimumIntegerDigits: digits });
}

export function offsetMinutesToZone(utcOffsetMinutes) {
  // Mimick moment.js behavior
  // Interpret values between -12 and 12 as hours and convert to minutes
  if (Math.abs(utcOffsetMinutes) <= 12) {
    utcOffsetMinutes *= 60;
  }
  // Clip to +/- 12 hours
  utcOffsetMinutes = Math.max(-12 * 60, Math.min(utcOffsetMinutes, 12 * 60));
  const negative = utcOffsetMinutes < 0;
  const roundingFn = negative ? Math.ceil : Math.floor;
  const hours = leftPad(Math.abs(roundingFn(utcOffsetMinutes / 60)), 2);
  const minutes = leftPad(Math.abs(utcOffsetMinutes % 60), 2);
  return `UTC${negative ? "-" : "+"}${hours}:${minutes}`;
}

// ** Date Constructors **

export function newDate(point, options = {}) {
  if (typeof point === "string") {
    return DateTime.fromISO(point, options);
  }
  if (typeof point === "number") {
    return DateTime.fromMillis(point, options);
  }
  if (typeof point === "undefined") {
    point = {};
  }
  return DateTime.fromObject(point);
}

export function newDateWithOffset(utcOffset) {
  return newDate({ zone: offsetMinutesToZone(utcOffset) });
}

export function now(maybeFixedUtcOffset) {
  if (maybeFixedUtcOffset == null) {
    return newDate();
  }
  return newDateWithOffset(maybeFixedUtcOffset);
}

export function cloneDate(date) {
  return date;
}

export function isDate(value) {
  return value instanceof DateTime;
}

export function parseDate(value, format, locale = getDefaultLocale()) {
  if (isDate(value)) {
    return value;
  }
  return DateTime.fromFormat(value, format, {
    locale
  });
}

// Like parseDate(), but deals with multiple formats
export function safeParseDate(value, { dateFormat, locale }) {
  if (!Array.isArray(dateFormat)) {
    dateFormat = [dateFormat];
  }
  for (const format of dateFormat) {
    const date = parseDate(value, format, locale);
    if (date.isValid) {
      return date;
    }
  }
  return null;
}

// ** Date "Reflection" **

export function isValid(date) {
  if (typeof date === "undefined") {
    return false;
  }
  return date.isValid; // TODO a bit easy to game
}

// ** Date Formatting **

export function formatDate(date, format) {
  return date.toFormat(format);
}

export function safeFormatDate(date, { dateFormat, locale }) {
  return (
    (date &&
      formatDate(
        localizeDate(date, locale),
        Array.isArray(dateFormat) ? dateFormat[0] : dateFormat
      )) ||
    ""
  );
}

export function isLocal(date) {
  return date.zone.type === "local";
}

// ** Date Setters **

export function setTime(date, { hour, minute, second }) {
  return date.set({ hour, minute, second });
}

export function setMonth(date, month) {
  return set(date, "month", month);
}

export function setYear(date, year) {
  return set(date, "year", year);
}

export function setUTCOffset(date, offset) {
  return date.setZone(offsetMinutesToZone(offset));
}

// ** Date Getters **

export function getValue(date) {
  return +date;
}

export function getSecond(date) {
  return get(date, "second");
}

export function getMinute(date) {
  return get(date, "minute");
}

export function getHour(date) {
  return get(date, "hour");
}

// Returns day of week
export function getWeekDay(date) {
  return get(date, "weekday");
}

export function getWeek(date) {
  return get(date, "week");
}

export function getMonth(date) {
  return get(date, "month");
}

export function getYear(date) {
  return get(date, "year");
}

// Returns day of month
export function getDay(date) {
  return get(date, "day");
}

export function getUTCOffset() {
  return newDate().zone.offset;
}

export function getDayOfWeekCode(day) {
  return dayOfWeekCodes[getWeekDay(day)];
}

// *** Start of ***

export function getStartOfDay(date) {
  return getStartOf(date, "day");
}

export function getStartOfWeek(date) {
  return getStartOf(date, "week");
}
export function getStartOfMonth(date) {
  return getStartOf(date, "month");
}

// *** End of ***

export function getEndOfWeek(date) {
  return getEndOf(date, "week");
}

export function getEndOfMonth(date) {
  return getEndOf(date, "month");
}

// ** Date Math **

// *** Addition ***

export function addMinutes(date, amount) {
  return add(date, amount, "minutes");
}

export function addDays(date, amount) {
  return add(date, amount, "days");
}

export function addWeeks(date, amount) {
  return add(date, amount, "weeks");
}

export function addMonths(date, amount) {
  return add(date, amount, "months");
}

export function addYears(date, amount) {
  return add(date, amount, "years");
}

// *** Subtraction ***
export function subtractDays(date, amount) {
  return subtract(date, amount, "days");
}

export function subtractWeeks(date, amount) {
  return subtract(date, amount, "weeks");
}

export function subtractMonths(date, amount) {
  return subtract(date, amount, "months");
}

export function subtractYears(date, amount) {
  return subtract(date, amount, "years");
}

// ** Date Comparison **

export function isBefore(date1, date2, unit) {
  const startOfDate1 = unit !== undefined ? getStartOf(date1, unit) : date1;
  const startOfDate2 = unit !== undefined ? getStartOf(date2, unit) : date2;
  return startOfDate1 < startOfDate2;
}

export function isAfter(date1, date2, unit) {
  const startOfDate1 = unit !== undefined ? getStartOf(date1, unit) : date1;
  const startOfDate2 = unit !== undefined ? getStartOf(date2, unit) : date2;
  return startOfDate1 > startOfDate2;
}

export function equals(date1, date2) {
  return +date1 === +date2;
}

export function isSameYear(date1, date2) {
  if (date1 && date2) {
    return isSame(date1, date2, "year");
  } else {
    return !date1 && !date2;
  }
}

export function isSameMonth(date1, date2) {
  if (date1 && date2) {
    return isSame(date1, date2, "month");
  } else {
    return !date1 && !date2;
  }
}

export function isSameDay(date1, date2) {
  if (date1 && date2) {
    return isSame(date1, date2, "day");
  } else {
    return !date1 && !date2;
  }
}

export function isSameUtcOffset(date1, date2) {
  if (date1 && date2) {
    // Note: This returns false for fixed-offset and IANA TZs that
    // may have the same UTC offset and this instant.
    return date1.zoneName === date2.zoneName;
  } else {
    return !date1 && !date2;
  }
}

export function isDayInRange(day, startDate, endDate) {
  const before = subtract(getStartOf(startDate, "day"), 1, "second");
  const after = add(getStartOf(endDate, "day"), 1, "second");
  return isBetween(getStartOf(day, "day"), before, after);
}

export function minimum(dates) {
  return dates.reduce((min, date) => (date < min ? date : min), dates[0]);
}

export function maximum(dates) {
  return dates.reduce((max, date) => (date > max ? date : max), dates[0]);
}

export function isSameOrAfter(date1, date2, unit) {
  const startOfDate1 = unit !== undefined ? getStartOf(date1, unit) : date1;
  const startOfDate2 = unit !== undefined ? getStartOf(date2, unit) : date2;
  return startOfDate1 >= startOfDate2;
}

export function isSameOrBefore(date1, date2, unit) {
  const startOfDate1 = unit !== undefined ? getStartOf(date1, unit) : date1;
  const startOfDate2 = unit !== undefined ? getStartOf(date2, unit) : date2;
  return startOfDate1 <= startOfDate2;
}

export function isBetween(date, min, max) {
  return isSameOrAfter(date, min) && isSameOrBefore(date, max);
}

// *** Diffing ***

export function getDaysDiff(date1, date2) {
  return getDiff(date1, date2, "days");
}

// ** Date Localization **

export function getDefaultLocale() {
  // TODO auto-detect somehow?
  return "en-US";
}

export function getLocale(date) {
  return date.locale;
}

export function localizeDate(date, locale) {
  return date.setLocale(locale || getDefaultLocale());
}

export function getWeekdayMinInLocale(locale, date) {
  return get(localizeDate(date, locale), "weekdayShort");
}

export function getMonthInLocale(locale, date, format) {
  return formatDate(localizeDate(date, locale), format || "MMMM");
}

export function getMonthShortInLocale(locale, date) {
  return formatDate(localizeDate(date, locale), "MMM");
}

// ** Utils for some components **

export function isDayDisabled(
  day,
  { minDate, maxDate, excludeDates, includeDates, filterDate } = {}
) {
  return (
    (minDate && isBefore(day, minDate, "day")) ||
    (maxDate && isAfter(day, maxDate, "day")) ||
    (excludeDates &&
      excludeDates.some(excludeDate => isSameDay(day, excludeDate))) ||
    (includeDates &&
      !includeDates.some(includeDate => isSameDay(day, includeDate))) ||
    (filterDate && !filterDate(day)) ||
    false
  );
}

export function isTimeDisabled(time, disabledTimes) {
  return !!disabledTimes.find(
    disabledTime =>
      getHour(disabledTime) === getHour(time) &&
      getMinute(disabledTime) === getMinute(time)
  );
}

export function isTimeInDisabledRange(time, { minTime, maxTime }) {
  if (!minTime || !maxTime) {
    throw new Error("Both minTime and maxTime props required");
  }

  const base = setTime(newDate(), {
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const baseTime = setTime(base, {
    hours: get(time, "hour"),
    minutes: get(time, "minute")
  });
  const min = setTime(minTime, {
    hours: get(minTime, "hour"),
    minutes: get(minTime, "minute")
  });
  const max = setTime(maxTime, {
    hours: get(maxTime, "hour"),
    minutes: get(maxTime, "minute")
  });

  return !(isSameOrAfter(baseTime, min) && isSameOrBefore(baseTime, max));
}

export function allDaysDisabledBefore(
  day,
  unit,
  { minDate, includeDates } = {}
) {
  const dateBefore = subtract(day, 1, unit);
  return (
    (minDate && isBefore(dateBefore, minDate, unit)) ||
    (includeDates &&
      includeDates.every(includeDate =>
        isBefore(dateBefore, includeDate, unit)
      )) ||
    false
  );
}

export function allDaysDisabledAfter(
  day,
  unit,
  { maxDate, includeDates } = {}
) {
  const dateAfter = add(day, 1, unit);
  return (
    (maxDate && isAfter(dateAfter, maxDate, unit)) ||
    (includeDates &&
      includeDates.every(includeDate =>
        isAfter(dateAfter, includeDate, unit)
      )) ||
    false
  );
}

export function getEffectiveMinDate({ minDate, includeDates }) {
  if (includeDates && minDate) {
    return minimum(
      includeDates.filter(includeDate =>
        isSameOrBefore(minDate, includeDate, "day")
      )
    );
  } else if (includeDates) {
    return minimum(includeDates);
  } else {
    return minDate;
  }
}

export function getEffectiveMaxDate({ maxDate, includeDates }) {
  if (includeDates && maxDate) {
    return maximum(
      includeDates.filter(includeDate =>
        isSameOrAfter(maxDate, includeDate, "day")
      )
    );
  } else if (includeDates) {
    return maximum(includeDates);
  } else {
    return maxDate;
  }
}

export function getHighLightDaysMap(
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
      const arrOfMoments = obj[className];
      if (typeof className === "string" && Array.isArray(arrOfMoments)) {
        for (let k = 0, len = arrOfMoments.length; k < len; k++) {
          const key = formatDate(arrOfMoments[k], "MM.dd.yyyy");
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
