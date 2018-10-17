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
  min,
  max,
  isSameDay as issameday,
  isSameMonth as issamemonth,
  isSameYear as issameyear,
  differenceInCalendarWeeks,
  setDayOfYear,
  startOfToday,
  startOfDay,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  isSameWeek,
  isAfter as isafter,
  isBefore as isbefore
} from "date-fns";

// These functions are not exported so
// that we avoid magic strings like 'days'
// function set(date, unit, to) {
//   return date.set(unit, to);
// }
//
// function add(date, amount, unit) {
//   return date.add(amount, unit);
// }
//
// function subtract(date, amount, unit) {
//   return date.subtract(amount, unit);
// }
//
// function get(date, unit) {
//   switch (unit) {
//     case "year":
//       return date.year();
//     case "month":
//       return date.month();
//     case "day":
//       return date.day();
//     case "hour":
//       return date.hour();
//     case "minute":
//       return date.minute();
//     case "second":
//       return date.second();
//     case "millisecond":
//       return date.millisecond();
//     default:
//       return date;
//   }
// }

// function getStartOf(date, unit) {
//   return date.startOf(unit);
// }
//
// function getEndOf(date, unit) {
//   return date.endOf(unit);
// }
//
// function getDiff(date1, date2, unit) {
//   return date1.diff(date2, unit);
// }

// ** Date Constructors **

export function newDate(point) {
  const d = point ? parse(point) : new Date();
  return isValid(d) ? d : null;
}

export function cloneDate(date) {
  return parse(date);
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

export function formatDate(date, format) {
  return format(date, format);
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
  return date
    .set("hour", hour)
    .set("minute", minute)
    .set("second", second);
}

export function setMonth(date, month) {
  return set(date, "month", month);
}

export function setYear(date, year) {
  return set(date, "year", year);
}

export function setUTCOffset(date, offset) {
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  return new Date(utc + 3600000 * offset);
}

// ** Date Getters **

export function getSecond(date) {
  return date.second();
}

export function getMinute(date) {
  return date.minute();
}

export function getHour(date) {
  return date.hour();
}

// Returns day of week
export function getDay(date) {
  return date.day();
}

export function getWeek(date) {
  let firstDayOfYear = dayjs(setDayOfYear(date, 1));
  if (!isSameYear(endOfWeek(date.utc()), date.utc())) {
    return 1;
  }
  return differenceInCalendarWeeks(date.utc(), firstDayOfYear.utc()) + 1;
}

export function getMonth(date) {
  return date.month();
}

export function getYear(date) {
  return date.year();
}

// Returns day of month
export function getDate(date) {
  return date.date();
}

export function getUTCOffset() {
  return dayjs().utcOffset();
}

export function getDayOfWeekCode(day) {
  return dayjs(day).format("ddd");
}

// *** Start of ***

export function getStartOfDay(date) {
  return dayjs(startOfDay(date));
}

export function getStartOfWeek(date) {
  return dayjs(startOfWeek(date));
}

export function getStartOfMonth(date) {
  return dayjs(startOfMonth(date));
}

export function getStartOfToday() {
  return dayjs(startOfToday());
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
  return date1.isSame(date2);
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
    return date1.utcOffset() === date2.utcOffset();
  } else {
    return !date1 && !date2;
  }
}

export function isDayInRange(day, startDate, endDate) {
  const before = startDate
    .clone()
    .startOf("day")
    .subtract(1, "seconds");
  const after = endDate
    .clone()
    .startOf("day")
    .add(1, "seconds");
  return day
    .clone()
    .startOf("day")
    .isBetween(before, after);
}

// *** Diffing ***

export function getDaysDiff(date1, date2) {
  return getDiff(date1, date2, "days");
}

// ** Date Localization **

export function localizeDate(date, locale = "en") {
  return dayjs(date).locale(locale);
}

export function getFormattedWeekdayInLocale(date, locale = "en", formatFunc) {
  return formatFunc(
    dayjs(date)
      .locale(locale)
      .format("dddd")
  );
}

export function getWeekdayMinInLocale(date, locale = "en") {
  return dayjs(date)
    .locale(locale)
    .format("dd");
}

export function getWeekdayShortInLocale(date, locale = "en") {
  return dayjs(date)
    .locale(locale)
    .format("ddd");
}

export function getMonthInLocale(month, locale = "en") {
  return dayjs()
    .set("month", month)
    .locale(locale)
    .format("MMMM");
}

export function getMonthShortInLocale(month, locale = "en") {
  return dayjs()
    .set("month", month)
    .locale(locale)
    .format("MMM");
}

// ** Utils for some components **

export function isDayDisabled(
  day,
  { minDate, maxDate, excludeDates, includeDates, filterDate } = {}
) {
  return (
    (minDate && day.isBefore(minDate, "day")) ||
    (maxDate && day.isAfter(maxDate, "day")) ||
    (excludeDates &&
      excludeDates.some(excludeDate => isSameDay(day, excludeDate))) ||
    (includeDates &&
      !includeDates.some(includeDate => isSameDay(day, includeDate))) ||
    (filterDate && !filterDate(day.clone())) ||
    false
  );
}

export function isTimeDisabled(time, disabledTimes) {
  const l = disabledTimes.length;
  for (let i = 0; i < l; i++) {
    if (
      disabledTimes[i].hour() === time.hour() &&
      disabledTimes[i].minute() === time.minute()
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

  const base = dayjs()
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0);
  const baseTime = base.set("hour", time.hour()).set("minute", time.minute());
  const min = base.set("hour", minTime.hour()).set("minute", minTime.minute());
  const max = base.set("hour", maxTime.hour()).set("minute", maxTime.minute());
  return !(baseTime.diff(min) >= 0 && baseTime.diff(max) <= 0);
}

export function monthDisabledBefore(day, { minDate, includeDates } = {}) {
  const dateBefore = day.subtract(1, "month");
  return (
    (minDate &&
      dateBefore.isBefore(minDate) &&
      dateBefore.month() !== minDate.month()) ||
    (includeDates &&
      includeDates.every(
        includeDate =>
          dateBefore.isBefore(includeDate) &&
          dateBefore.month() !== includeDate.month()
      )) ||
    false
  );
}

export function monthDisabledAfter(day, { maxDate, includeDates } = {}) {
  const dateAfter = day.add(1, "month");
  return (
    (maxDate &&
      dateAfter.isAfter(maxDate) &&
      dateAfter.month() !== maxDate.month()) ||
    (includeDates &&
      includeDates.every(
        includeDate =>
          dateAfter.isAfter(includeDate) &&
          dateAfter.month() !== includeDate.month()
      )) ||
    false
  );
}

export function getEffectiveMinDate({ minDate, includeDates }) {
  if (includeDates && minDate) {
    let minDates = includeDates.filter(
      includeDate => minDate.diff(includeDate, "days") <= 0
    );
    return dayjs(min(...minDates));
  } else if (includeDates) {
    return dayjs(min(...includeDates));
  } else {
    return minDate;
  }
}

export function getEffectiveMaxDate({ maxDate, includeDates }) {
  if (includeDates && maxDate) {
    let maxDates = includeDates.filter(
      includeDate => maxDate.diff(includeDate, "days") >= 0
    );
    return dayjs(max(...maxDates));
  } else if (includeDates) {
    return dayjs(max(...includeDates));
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
      const key = obj.format("MM.DD.YYYY");
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
          const key = arrOfDayjs[k].format("MM.DD.YYYY");
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
      addHours(cloneDate(startOfDay), getHour(injectedTimes[i])),
      getMinute(injectedTimes[i])
    );
    const nextTime = addMinutes(
      cloneDate(startOfDay),
      (currentMultiplier + 1) * intervals
    );

    if (injectedTime.isBetween(currentTime, nextTime)) {
      times.push(injectedTimes[i]);
    }
  }

  return times;
}
