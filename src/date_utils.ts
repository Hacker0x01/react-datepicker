import {
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addQuarters,
  addSeconds,
  addWeeks,
  addYears,
  isEqual as dfIsEqual,
  isSameDay as dfIsSameDay,
  isSameMonth as dfIsSameMonth,
  isSameQuarter as dfIsSameQuarter,
  isSameYear as dfIsSameYear,
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInCalendarQuarters,
  differenceInCalendarYears,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  getDate,
  getDay,
  getHours,
  getISOWeek,
  getMinutes,
  getMonth,
  getQuarter,
  getSeconds,
  getTime,
  getYear,
  isAfter,
  isBefore,
  isDate,
  isValid as isValidDate,
  isWithinInterval,
  max,
  min,
  parse,
  parseISO,
  set,
  setHours,
  setMinutes,
  setMonth,
  setQuarter,
  setSeconds,
  setYear,
  startOfDay,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subQuarters,
  subWeeks,
  subYears,
  toDate,
} from "date-fns";

import type { Locale as DateFnsLocale, Day } from "date-fns";

export type DateNumberType = Day;
interface LocaleObj
  extends Pick<
    DateFnsLocale,
    "options" | "formatLong" | "localize" | "match"
  > {}

export type Locale = string | LocaleObj;

export enum KeyType {
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
  PageUp = "PageUp",
  PageDown = "PageDown",
  Home = "Home",
  End = "End",
  Enter = "Enter",
  Space = " ",
  Tab = "Tab",
  Escape = "Escape",
  Backspace = "Backspace",
  X = "x",
}

function getLocaleScope() {
  // Use this cast to avoid messing with users globalThis (like window) and the rest of keys in the globalThis object we don't care about
  const scope = (typeof window !== "undefined"
    ? window
    : globalThis) as unknown as {
    __localeId__?: string;
    __localeData__: Record<string, LocaleObj>;
  };

  return scope;
}

export const DEFAULT_YEAR_ITEM_NUMBER = 12;

// ** Date Constructors **

export function newDate(value?: string | Date | number | null): Date {
  if (value == null) {
    return new Date();
  }

  const d = typeof value === "string" ? parseISO(value) : toDate(value);
  return isValid(d) ? d : new Date();
}

/**
 * Parses a date.
 *
 * @param value - The string representing the Date in a parsable form, e.g., ISO 1861
 * @param dateFormat - The date format.
 * @param locale - The locale.
 * @param strictParsing - The strict parsing flag.
 * @param refDate - The base date to be passed to date-fns parse() function.
 * @returns - The parsed date or null.
 */
export function parseDate(
  value: string,
  dateFormat: string | string[],
  locale: Locale | undefined,
  strictParsing: boolean,
  refDate: Date = newDate(),
): Date | null {
  const localeObject =
    getLocaleObject(locale) || getLocaleObject(getDefaultLocale());

  const formats = Array.isArray(dateFormat) ? dateFormat : [dateFormat];

  for (const format of formats) {
    const parsedDate = parse(value, format, refDate, {
      locale: localeObject,
      useAdditionalWeekYearTokens: true,
      useAdditionalDayOfYearTokens: true,
    });
    if (
      isValid(parsedDate) &&
      (!strictParsing || value === formatDate(parsedDate, format, locale))
    ) {
      return parsedDate;
    }
  }
  return null;
}

// ** Date "Reflection" **

export { isDate, set };

/**
 * Checks if a given date is valid and not before the minimum date.
 * @param date - The date to be checked.
 * @param minDate - The minimum date allowed. If not provided, defaults to "1/1/1800".
 * @returns A boolean value indicating whether the date is valid and not before the minimum date.
 */
export function isValid(date: Date, minDate?: Date): boolean {
  /* the fallback date is essential to not break test case
   * `should auto update calendar when the updated date text is after props.minDate`
   * and backward compatibility respectfully
   */
  return isValidDate(date) && !isBefore(date, minDate ?? new Date("1/1/1800"));
}

// ** Date Formatting **

/**
 * Formats a date.
 *
 * @param date - The date.
 * @param formatStr - The format string.
 * @param locale - The locale.
 * @returns - The formatted date.
 */
export function formatDate(
  date: Date,
  formatStr: string,
  locale?: Locale,
): string {
  if (locale === "en") {
    return format(date, formatStr, {
      useAdditionalWeekYearTokens: true,
      useAdditionalDayOfYearTokens: true,
    });
  }
  let localeObj = locale ? getLocaleObject(locale) : undefined;
  if (locale && !localeObj) {
    console.warn(
      `A locale object was not found for the provided string ["${locale}"].`,
    );
  }
  localeObj = localeObj || getLocaleObject(getDefaultLocale());
  return format(date, formatStr, {
    locale: localeObj,
    useAdditionalWeekYearTokens: true,
    useAdditionalDayOfYearTokens: true,
  });
}

/**
 * Safely formats a date.
 *
 * @param date - The date.
 * @param options - An object containing the dateFormat and locale.
 * @returns - The formatted date or an empty string.
 */
export function safeDateFormat(
  date: Date | null | undefined,
  { dateFormat, locale }: { dateFormat: string | string[]; locale?: Locale },
): string {
  const formatStr = (
    Array.isArray(dateFormat) && dateFormat.length > 0
      ? dateFormat[0]
      : dateFormat
  ) as string; // Cast to string because it's impossible to get `string | string[] | undefined` here and typescript doesn't know that
  return (date && formatDate(date, formatStr, locale)) || "";
}

/**
 * Used as a delimiter to separate two dates when formatting a date range
 */
export const DATE_RANGE_SEPARATOR = " - ";

/**
 * Safely formats a date range.
 *
 * @param startDate - The start date.
 * @param endDate - The end date.
 * @param props - The props.
 * @returns - The formatted date range or an empty string.
 */
export function safeDateRangeFormat(
  startDate: Date | null | undefined,
  endDate: Date | null | undefined,
  props: {
    dateFormat: string | string[];
    locale?: Locale;
    rangeSeparator?: string;
  },
): string {
  if (!startDate && !endDate) {
    return "";
  }

  const formattedStartDate = startDate ? safeDateFormat(startDate, props) : "";
  const formattedEndDate = endDate ? safeDateFormat(endDate, props) : "";
  const dateRangeSeparator = props.rangeSeparator || DATE_RANGE_SEPARATOR;

  return `${formattedStartDate}${dateRangeSeparator}${formattedEndDate}`;
}

/**
 * Safely formats multiple dates.
 *
 * @param dates - The dates.
 * @param props - The props.
 * @returns - The formatted dates or an empty string.
 */
export function safeMultipleDatesFormat(
  dates: Date[],
  props: { dateFormat: string | string[]; locale?: Locale },
): string {
  if (!dates?.length) {
    return "";
  }

  const formattedFirstDate = dates[0] ? safeDateFormat(dates[0], props) : "";
  if (dates.length === 1) {
    return formattedFirstDate;
  }

  if (dates.length === 2 && dates[1]) {
    const formattedSecondDate = safeDateFormat(dates[1], props);
    return `${formattedFirstDate}, ${formattedSecondDate}`;
  }

  const extraDatesCount = dates.length - 1;
  return `${formattedFirstDate} (+${extraDatesCount})`;
}
// ** Date Setters **

/**
 * Sets the time for a given date.
 *
 * @param date - The date.
 * @param time - An object containing the hour, minute, and second.
 * @returns - The date with the time set.
 */
export function setTime(
  date: Date,
  { hour = 0, minute = 0, second = 0 },
): Date {
  return setHours(setMinutes(setSeconds(date, second), minute), hour);
}

export { setHours, setMinutes, setMonth, setQuarter, setYear };

// ** Date Getters **

// getDay Returns day of week, getDate returns day of month
export {
  getDate,
  getDay,
  getHours,
  getMinutes,
  getMonth,
  getQuarter,
  getSeconds,
  getTime,
  getYear,
};

/**
 * Gets the week of the year for a given date.
 *
 * @param date - The date.
 * @returns - The week of the year.
 */
export function getWeek(date: Date): number {
  return getISOWeek(date);
}

/**
 * Gets the day of the week code for a given day.
 *
 * @param day - The day.
 * @param locale - The locale.
 * @returns - The day of the week code.
 */
export function getDayOfWeekCode(day: Date, locale?: Locale): string {
  return formatDate(day, "ddd", locale);
}

// *** Start of ***

/**
 * Gets the start of the day for a given date.
 *
 * @param date - The date.
 * @returns - The start of the day.
 */
export function getStartOfDay(date: Date): Date {
  return startOfDay(date);
}

/**
 * Gets the start of the week for a given date.
 *
 * @param date - The date.
 * @param locale - The locale.
 * @param calendarStartDay - The day the calendar starts on.
 * @returns - The start of the week.
 */
export function getStartOfWeek(
  date: Date,
  locale?: Locale,
  calendarStartDay?: Day,
): Date {
  const localeObj = locale
    ? getLocaleObject(locale)
    : getLocaleObject(getDefaultLocale());
  return startOfWeek(date, {
    locale: localeObj,
    weekStartsOn: calendarStartDay,
  });
}

/**
 * Gets the start of the month for a given date.
 *
 * @param date - The date.
 * @returns - The start of the month.
 */
export function getStartOfMonth(date: Date): Date {
  return startOfMonth(date);
}

/**
 * Gets the start of the year for a given date.
 *
 * @param date - The date.
 * @returns - The start of the year.
 */
export function getStartOfYear(date: Date): Date {
  return startOfYear(date);
}

/**
 * Gets the start of the quarter for a given date.
 *
 * @param date - The date.
 * @returns - The start of the quarter.
 */
export function getStartOfQuarter(date: Date): Date {
  return startOfQuarter(date);
}

/**
 * Gets the start of today.
 *
 * @returns - The start of today.
 */
export function getStartOfToday(): Date {
  return startOfDay(newDate());
}

// *** End of ***
/**
 * Gets the end of the day for a given date.
 *
 * @param date - The date.
 * @returns - The end of the day.
 */
export function getEndOfDay(date: Date): Date {
  return endOfDay(date);
}

/**
 * Gets the end of the week for a given date.
 *
 * @param date - The date.
 * @returns - The end of the week.
 */
export function getEndOfWeek(date: Date): Date {
  return endOfWeek(date);
}

/**
 * Gets the end of the month for a given date.
 *
 * @param date - The date.
 * @returns - The end of the month.
 */
export function getEndOfMonth(date: Date): Date {
  return endOfMonth(date);
}

// ** Date Math **

// *** Addition ***

export {
  addDays,
  addMinutes,
  addMonths,
  addQuarters,
  addSeconds,
  addWeeks,
  addYears,
};

// *** Subtraction ***

export { addHours, subDays, subMonths, subQuarters, subWeeks, subYears };

// ** Date Comparison **

export { isAfter, isBefore };

/**
 * Checks if two dates are in the same year.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns - True if the dates are in the same year, false otherwise.
 */
export function isSameYear(date1: Date | null, date2: Date | null): boolean {
  if (date1 && date2) {
    return dfIsSameYear(date1, date2);
  } else {
    return !date1 && !date2;
  }
}

/**
 * Checks if two dates are in the same month.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns - True if the dates are in the same month, false otherwise.
 */
export function isSameMonth(date1: Date | null, date2?: Date | null): boolean {
  if (date1 && date2) {
    return dfIsSameMonth(date1, date2);
  } else {
    return !date1 && !date2;
  }
}

/**
 * Checks if two dates are in the same quarter.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns - True if the dates are in the same quarter, false otherwise.
 */
export function isSameQuarter(date1: Date | null, date2: Date | null): boolean {
  if (date1 && date2) {
    return dfIsSameQuarter(date1, date2);
  } else {
    return !date1 && !date2;
  }
}

/**
 * Checks if two dates are on the same day.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns - True if the dates are on the same day, false otherwise.
 */
export function isSameDay(date1?: Date | null, date2?: Date | null): boolean {
  if (date1 && date2) {
    return dfIsSameDay(date1, date2);
  } else {
    return !date1 && !date2;
  }
}

/**
 * Checks if two dates are equal.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns - True if the dates are equal, false otherwise.
 */
export function isEqual(
  date1: Date | null | undefined,
  date2: Date | null | undefined,
): boolean {
  if (date1 && date2) {
    return dfIsEqual(date1, date2);
  } else {
    return !date1 && !date2;
  }
}

/**
 * Checks if a day is within a date range.
 *
 * @param day - The day to check.
 * @param startDate - The start date of the range.
 * @param endDate - The end date of the range.
 * @returns - True if the day is within the range, false otherwise.
 */
export function isDayInRange(
  day: Date,
  startDate: Date,
  endDate: Date,
): boolean {
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

/**
 * Gets the difference in days between two dates.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns - The difference in days.
 */
export function getDaysDiff(date1: Date, date2: Date): number {
  return differenceInCalendarDays(date1, date2);
}

// ** Date Localization **

/**
 * Registers a locale.
 *
 * @param localeName - The name of the locale.
 * @param localeData - The data of the locale.
 */

export function registerLocale(
  localeName: string,
  localeData: LocaleObj,
): void {
  const scope = getLocaleScope();

  if (!scope.__localeData__) {
    scope.__localeData__ = {};
  }
  scope.__localeData__[localeName] = localeData;
}

/**
 * Sets the default locale.
 *
 * @param localeName - The name of the locale.
 */
export function setDefaultLocale(localeName?: string): void {
  const scope = getLocaleScope();

  scope.__localeId__ = localeName;
}

/**
 * Gets the default locale.
 *
 * @returns - The default locale.
 */
export function getDefaultLocale(): string | undefined {
  const scope = getLocaleScope();

  return scope.__localeId__;
}

/**
 * Gets the locale object.
 *
 * @param localeSpec - The locale specification.
 * @returns - The locale object.
 */
export function getLocaleObject(localeSpec?: Locale): LocaleObj | undefined {
  if (typeof localeSpec === "string") {
    // Treat it as a locale name registered by registerLocale
    const scope = getLocaleScope();
    // Null was replaced with undefined to avoid type coercion
    return scope.__localeData__ ? scope.__localeData__[localeSpec] : undefined;
  } else {
    // Treat it as a raw date-fns locale object
    return localeSpec;
  }
}

/**
 * Formats the weekday in a given locale.
 *
 * @param date - The date to format.
 * @param formatFunc - The formatting function.
 * @param locale - The locale to use for formatting.
 * @returns - The formatted weekday.
 */
export function getFormattedWeekdayInLocale(
  date: Date,
  formatFunc: (date: string) => string,
  locale?: Locale,
): string {
  return formatFunc(formatDate(date, "EEEE", locale));
}

/**
 * Gets the minimum weekday in a given locale.
 *
 * @param date - The date to format.
 * @param locale - The locale to use for formatting.
 * @returns - The minimum weekday.
 */
export function getWeekdayMinInLocale(date: Date, locale?: Locale): string {
  return formatDate(date, "EEEEEE", locale);
}

/**
 * Gets the short weekday in a given locale.
 *
 * @param date - The date to format.
 * @param locale - The locale to use for formatting.
 * @returns - The short weekday.
 */
export function getWeekdayShortInLocale(date: Date, locale?: Locale): string {
  return formatDate(date, "EEE", locale);
}

/**
 * Gets the month in a given locale.
 *
 * @param month - The month to format.
 * @param locale - The locale to use for formatting.
 * @returns - The month.
 */
export function getMonthInLocale(month: number, locale?: Locale): string {
  return formatDate(setMonth(newDate(), month), "LLLL", locale);
}

/**
 * Gets the short month in a given locale.
 *
 * @param month - The month to format.
 * @param locale - The locale to use for formatting.
 * @returns - The short month.
 */
export function getMonthShortInLocale(month: number, locale?: Locale): string {
  return formatDate(setMonth(newDate(), month), "LLL", locale);
}

/**
 * Gets the short quarter in a given locale.
 *
 * @param quarter - The quarter to format.
 * @param locale - The locale to use for formatting.
 * @returns - The short quarter.
 */
export function getQuarterShortInLocale(
  quarter: number,
  locale?: Locale,
): string {
  return formatDate(setQuarter(newDate(), quarter), "QQQ", locale);
}

// ** Utils for some components **

export interface DateFilterOptions {
  minDate?: Date;
  maxDate?: Date;
  excludeDates?: { date: Date; message?: string }[] | Date[];
  excludeDateIntervals?: { start: Date; end: Date }[];
  includeDates?: Date[];
  includeDateIntervals?: { start: Date; end: Date }[];
  filterDate?: (date: Date) => boolean;
  yearItemNumber?: number;
}

export type DateFilterOptionsWithDisabled = DateFilterOptions & {
  disabled?: boolean;
};

/**
 * Checks if a day is disabled.
 *
 * @param day - The day to check.
 * @param options - The options to consider when checking.
 * @returns - Returns true if the day is disabled, false otherwise.
 */
export function isDayDisabled(
  day: Date,
  {
    minDate,
    maxDate,
    excludeDates,
    excludeDateIntervals,
    includeDates,
    includeDateIntervals,
    filterDate,
    disabled,
  }: DateFilterOptionsWithDisabled = {},
): boolean {
  if (disabled) {
    return true;
  }

  return (
    isOutOfBounds(day, { minDate, maxDate }) ||
    (excludeDates &&
      excludeDates.some((excludeDate) => {
        if (excludeDate instanceof Date) {
          return isSameDay(day, excludeDate);
        } else {
          return isSameDay(day, excludeDate.date);
        }
      })) ||
    (excludeDateIntervals &&
      excludeDateIntervals.some(({ start, end }) =>
        isWithinInterval(day, { start, end }),
      )) ||
    (includeDates &&
      !includeDates.some((includeDate) => isSameDay(day, includeDate))) ||
    (includeDateIntervals &&
      !includeDateIntervals.some(({ start, end }) =>
        isWithinInterval(day, { start, end }),
      )) ||
    (filterDate && !filterDate(newDate(day))) ||
    false
  );
}

/**
 * Checks if a day is excluded.
 *
 * @param day - The day to check.
 * @param options - The options to consider when checking.
 * @returns - Returns true if the day is excluded, false otherwise.
 */
export function isDayExcluded(
  day: Date,
  {
    excludeDates,
    excludeDateIntervals,
  }: Pick<DateFilterOptions, "excludeDates" | "excludeDateIntervals"> = {},
): boolean {
  if (excludeDateIntervals && excludeDateIntervals.length > 0) {
    return excludeDateIntervals.some(({ start, end }) =>
      isWithinInterval(day, { start, end }),
    );
  }
  return (
    (excludeDates &&
      excludeDates.some((excludeDate) => {
        if (excludeDate instanceof Date) {
          return isSameDay(day, excludeDate);
        } else {
          return isSameDay(day, excludeDate.date ?? new Date());
        }
      })) ||
    false
  );
}

export function isMonthDisabled(
  month: Date,
  {
    minDate,
    maxDate,
    excludeDates,
    includeDates,
    filterDate,
  }: Pick<
    DateFilterOptions,
    "minDate" | "maxDate" | "excludeDates" | "includeDates" | "filterDate"
  > = {},
): boolean {
  return (
    isOutOfBounds(month, {
      minDate: minDate ? startOfMonth(minDate) : undefined,
      maxDate: maxDate ? endOfMonth(maxDate) : undefined,
    }) ||
    excludeDates?.some((excludeDate) =>
      isSameMonth(
        month,
        excludeDate instanceof Date ? excludeDate : excludeDate.date,
      ),
    ) ||
    (includeDates &&
      !includeDates.some((includeDate) => isSameMonth(month, includeDate))) ||
    (filterDate && !filterDate(newDate(month))) ||
    false
  );
}

export function isMonthInRange(
  startDate: Date,
  endDate: Date,
  m: number,
  day: Date,
): boolean {
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
  return false;
}

/**
 * To check if a date's month and year are disabled/excluded
 * @param date Date to check
 * @returns {boolean} true if month and year are disabled/excluded, false otherwise
 */
export function isMonthYearDisabled(
  date: Date,
  {
    minDate,
    maxDate,
    excludeDates,
    includeDates,
  }: Pick<
    DateFilterOptions,
    "minDate" | "maxDate" | "excludeDates" | "includeDates"
  > = {},
): boolean {
  return (
    isOutOfBounds(date, { minDate, maxDate }) ||
    (excludeDates &&
      excludeDates.some((excludedDate) =>
        isSameMonth(
          excludedDate instanceof Date ? excludedDate : excludedDate.date,
          date,
        ),
      )) ||
    (includeDates &&
      !includeDates.some((includedDate) => isSameMonth(includedDate, date))) ||
    false
  );
}

export function isQuarterDisabled(
  quarter: Date,
  {
    minDate,
    maxDate,
    excludeDates,
    includeDates,
    filterDate,
    disabled,
  }: Pick<
    DateFilterOptionsWithDisabled,
    | "minDate"
    | "maxDate"
    | "excludeDates"
    | "includeDates"
    | "filterDate"
    | "disabled"
  > = {},
): boolean {
  if (disabled) {
    return true;
  }

  return (
    isOutOfBounds(quarter, { minDate, maxDate }) ||
    excludeDates?.some((excludeDate) =>
      isSameQuarter(
        quarter,
        excludeDate instanceof Date ? excludeDate : excludeDate.date,
      ),
    ) ||
    (includeDates &&
      !includeDates.some((includeDate) =>
        isSameQuarter(quarter, includeDate),
      )) ||
    (filterDate && !filterDate(newDate(quarter))) ||
    false
  );
}

export function isYearInRange(
  year: number,
  start?: Date | null,
  end?: Date | null,
): boolean {
  if (!start || !end) return false;
  if (!isValidDate(start) || !isValidDate(end)) return false;
  const startYear = getYear(start);
  const endYear = getYear(end);

  return startYear <= year && endYear >= year;
}

export function isYearDisabled(
  year: number,
  {
    minDate,
    maxDate,
    excludeDates,
    includeDates,
    filterDate,
    disabled,
  }: Pick<
    DateFilterOptionsWithDisabled,
    | "minDate"
    | "maxDate"
    | "excludeDates"
    | "includeDates"
    | "filterDate"
    | "disabled"
  > = {},
): boolean {
  if (disabled) {
    return true;
  }

  const date = new Date(year, 0, 1);
  return (
    isOutOfBounds(date, {
      minDate: minDate ? startOfYear(minDate) : undefined,
      maxDate: maxDate ? endOfYear(maxDate) : undefined,
    }) ||
    excludeDates?.some((excludeDate) =>
      isSameYear(
        date,
        excludeDate instanceof Date ? excludeDate : excludeDate.date,
      ),
    ) ||
    (includeDates &&
      !includeDates.some((includeDate) => isSameYear(date, includeDate))) ||
    (filterDate && !filterDate(newDate(date))) ||
    false
  );
}

export function isQuarterInRange(
  startDate: Date,
  endDate: Date,
  q: number,
  day: Date,
): boolean {
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
  return false;
}

export function isOutOfBounds(
  day: Date,
  { minDate, maxDate }: Pick<DateFilterOptions, "minDate" | "maxDate"> = {},
): boolean {
  return (
    ((minDate && differenceInCalendarDays(day, minDate) < 0) ||
      (maxDate && differenceInCalendarDays(day, maxDate) > 0)) ??
    false
  );
}

export function isTimeInList(time: Date, times: Date[]): boolean {
  return times.some(
    (listTime) =>
      getHours(listTime) === getHours(time) &&
      getMinutes(listTime) === getMinutes(time) &&
      getSeconds(listTime) === getSeconds(time),
  );
}

export interface TimeFilterOptions {
  minTime?: Date;
  maxTime?: Date;
  excludeTimes?: Date[];
  includeTimes?: Date[];
  filterTime?: (time: Date) => boolean;
}

export function isTimeDisabled(
  time: Date,
  {
    excludeTimes,
    includeTimes,
    filterTime,
  }: Pick<
    TimeFilterOptions,
    "excludeTimes" | "includeTimes" | "filterTime"
  > = {},
): boolean {
  return (
    (excludeTimes && isTimeInList(time, excludeTimes)) ||
    (includeTimes && !isTimeInList(time, includeTimes)) ||
    (filterTime && !filterTime(time)) ||
    false
  );
}

export function isTimeInDisabledRange(
  time: Date,
  { minTime, maxTime }: Pick<TimeFilterOptions, "minTime" | "maxTime">,
): boolean {
  if (!minTime || !maxTime) {
    throw new Error("Both minTime and maxTime props required");
  }
  let baseTime = newDate();
  baseTime = setHours(baseTime, getHours(time));
  baseTime = setMinutes(baseTime, getMinutes(time));
  baseTime = setSeconds(baseTime, getSeconds(time));

  let min = newDate();
  min = setHours(min, getHours(minTime));
  min = setMinutes(min, getMinutes(minTime));
  min = setSeconds(min, getSeconds(minTime));

  let max = newDate();
  max = setHours(max, getHours(maxTime));
  max = setMinutes(max, getMinutes(maxTime));
  max = setSeconds(max, getSeconds(maxTime));

  let valid;
  try {
    valid = !isWithinInterval(baseTime, { start: min, end: max });
  } catch (err) {
    valid = false;
  }
  return valid;
}

export function monthDisabledBefore(
  day: Date,
  {
    minDate,
    includeDates,
  }: Pick<DateFilterOptions, "minDate" | "includeDates"> = {},
): boolean {
  const previousMonth = subMonths(day, 1);
  return (
    (minDate && differenceInCalendarMonths(minDate, previousMonth) > 0) ||
    (includeDates &&
      includeDates.every(
        (includeDate) =>
          differenceInCalendarMonths(includeDate, previousMonth) > 0,
      )) ||
    false
  );
}

export function monthDisabledAfter(
  day: Date,
  {
    maxDate,
    includeDates,
  }: Pick<DateFilterOptions, "maxDate" | "includeDates"> = {},
): boolean {
  const nextMonth = addMonths(day, 1);
  return (
    (maxDate && differenceInCalendarMonths(nextMonth, maxDate) > 0) ||
    (includeDates &&
      includeDates.every(
        (includeDate) => differenceInCalendarMonths(nextMonth, includeDate) > 0,
      )) ||
    false
  );
}

export function quarterDisabledBefore(
  date: Date,
  {
    minDate,
    includeDates,
  }: Pick<DateFilterOptions, "minDate" | "includeDates"> = {},
): boolean {
  const firstDateOfYear = startOfYear(date);
  const previousQuarter = subQuarters(firstDateOfYear, 1);

  return (
    (minDate && differenceInCalendarQuarters(minDate, previousQuarter) > 0) ||
    (includeDates &&
      includeDates.every(
        (includeDate) =>
          differenceInCalendarQuarters(includeDate, previousQuarter) > 0,
      )) ||
    false
  );
}

export function quarterDisabledAfter(
  date: Date,
  {
    maxDate,
    includeDates,
  }: Pick<DateFilterOptions, "maxDate" | "includeDates"> = {},
): boolean {
  const lastDateOfYear = endOfYear(date);
  const nextQuarter = addQuarters(lastDateOfYear, 1);

  return (
    (maxDate && differenceInCalendarQuarters(nextQuarter, maxDate) > 0) ||
    (includeDates &&
      includeDates.every(
        (includeDate) =>
          differenceInCalendarQuarters(nextQuarter, includeDate) > 0,
      )) ||
    false
  );
}

export function yearDisabledBefore(
  day: Date,
  {
    minDate,
    includeDates,
  }: Pick<DateFilterOptions, "minDate" | "includeDates"> = {},
): boolean {
  const previousYear = subYears(day, 1);
  return (
    (minDate && differenceInCalendarYears(minDate, previousYear) > 0) ||
    (includeDates &&
      includeDates.every(
        (includeDate) =>
          differenceInCalendarYears(includeDate, previousYear) > 0,
      )) ||
    false
  );
}

export function yearsDisabledBefore(
  day: Date,
  {
    minDate,
    yearItemNumber = DEFAULT_YEAR_ITEM_NUMBER,
  }: Pick<DateFilterOptions, "minDate" | "yearItemNumber"> = {},
): boolean {
  const previousYear = getStartOfYear(subYears(day, yearItemNumber));
  const { endPeriod } = getYearsPeriod(previousYear, yearItemNumber);
  const minDateYear = minDate && getYear(minDate);
  return (minDateYear && minDateYear > endPeriod) || false;
}

export function yearDisabledAfter(
  day: Date,
  {
    maxDate,
    includeDates,
  }: Pick<DateFilterOptions, "maxDate" | "includeDates"> = {},
): boolean {
  const nextYear = addYears(day, 1);
  return (
    (maxDate && differenceInCalendarYears(nextYear, maxDate) > 0) ||
    (includeDates &&
      includeDates.every(
        (includeDate) => differenceInCalendarYears(nextYear, includeDate) > 0,
      )) ||
    false
  );
}

export function yearsDisabledAfter(
  day: Date,
  {
    maxDate,
    yearItemNumber = DEFAULT_YEAR_ITEM_NUMBER,
  }: Pick<DateFilterOptions, "maxDate" | "yearItemNumber"> = {},
): boolean {
  const nextYear = addYears(day, yearItemNumber);
  const { startPeriod } = getYearsPeriod(nextYear, yearItemNumber);
  const maxDateYear = maxDate && getYear(maxDate);
  return (maxDateYear && maxDateYear < startPeriod) || false;
}

export function getEffectiveMinDate({
  minDate,
  includeDates,
}: Pick<DateFilterOptions, "minDate" | "includeDates">): Date | undefined {
  if (includeDates && minDate) {
    const minDates = includeDates.filter(
      (includeDate) => differenceInCalendarDays(includeDate, minDate) >= 0,
    );
    return min(minDates);
  } else if (includeDates) {
    return min(includeDates);
  } else {
    return minDate;
  }
}

export function getEffectiveMaxDate({
  maxDate,
  includeDates,
}: Pick<DateFilterOptions, "maxDate" | "includeDates">): Date | undefined {
  if (includeDates && maxDate) {
    const maxDates = includeDates.filter(
      (includeDate) => differenceInCalendarDays(includeDate, maxDate) <= 0,
    );
    return max(maxDates);
  } else if (includeDates) {
    return max(includeDates);
  } else {
    return maxDate;
  }
}

export interface HighlightDate {
  [className: string]: Date[];
}

/**
 * Get a map of highlighted dates with their corresponding classes.
 * @param highlightDates The dates to highlight.
 * @param defaultClassName The default class to use for highlighting.
 * @returns A map with dates as keys and arrays of class names as values.
 */
export function getHighLightDaysMap(
  highlightDates: (Date | HighlightDate)[] = [],
  defaultClassName: string = "react-datepicker__day--highlighted",
): Map<string, string[]> {
  const dateClasses = new Map<string, string[]>();
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
      const className = keys[0] ?? "";
      const arrOfDates = obj[className];
      if (typeof className === "string" && Array.isArray(arrOfDates)) {
        for (let k = 0, len = arrOfDates.length; k < len; k++) {
          const dateK = arrOfDates[k];
          if (dateK) {
            const key = formatDate(dateK, "MM.dd.yyyy");
            const classNamesArr = dateClasses.get(key) || [];
            if (!classNamesArr.includes(className)) {
              classNamesArr.push(className);
              dateClasses.set(key, classNamesArr);
            }
          }
        }
      }
    }
  }
  return dateClasses;
}

/**
 * Compare the two arrays
 * @param array1 The first array to compare.
 * @param array2 The second array to compare.
 * @returns true, if the passed arrays are equal, false otherwise.
 */
export function arraysAreEqual<T>(array1: T[], array2: T[]): boolean {
  if (array1.length !== array2.length) {
    return false;
  }

  return array1.every((value, index) => value === array2[index]);
}

export interface HolidayItem {
  date: Date;
  holidayName: string;
}

interface ClassNamesObj {
  className: string;
  holidayNames: string[];
}

export type HolidaysMap = Map<string, ClassNamesObj>;

/**
 * Assign the custom class to each date
 * @param holidayDates array of object containing date and name of the holiday
 * @param defaultClassName className to be added.
 * @returns Map containing date as key and array of className and holiday name as value
 */
export function getHolidaysMap(
  holidayDates: HolidayItem[] = [],
  defaultClassName: string = "react-datepicker__day--holidays",
): HolidaysMap {
  const dateClasses = new Map<string, ClassNamesObj>();
  holidayDates.forEach((holiday) => {
    const { date: dateObj, holidayName } = holiday;
    if (!isDate(dateObj)) {
      return;
    }

    const key = formatDate(dateObj, "MM.dd.yyyy");
    const classNamesObj = dateClasses.get(key) || {
      className: "",
      holidayNames: [],
    };
    if (
      "className" in classNamesObj &&
      classNamesObj["className"] === defaultClassName &&
      arraysAreEqual(classNamesObj["holidayNames"], [holidayName])
    ) {
      return;
    }

    classNamesObj["className"] = defaultClassName;
    const holidayNameArr = classNamesObj["holidayNames"];
    classNamesObj["holidayNames"] = holidayNameArr
      ? [...holidayNameArr, holidayName]
      : [holidayName];
    dateClasses.set(key, classNamesObj);
  });
  return dateClasses;
}

/**
 * Determines the times to inject after a given start of day, current time, and multiplier.
 * @param startOfDay The start of the day.
 * @param currentTime The current time.
 * @param currentMultiplier The current multiplier.
 * @param intervals The intervals.
 * @param injectedTimes The times to potentially inject.
 * @returns An array of times to inject.
 */
export function timesToInjectAfter(
  startOfDay: Date,
  currentTime: Date,
  currentMultiplier: number,
  intervals: number,
  injectedTimes: Date[],
): Date[] {
  const l = injectedTimes.length;
  const times: Date[] = [];
  for (let i = 0; i < l; i++) {
    let injectedTime = startOfDay;
    const injectedTimeValue = injectedTimes[i];
    if (injectedTimeValue) {
      injectedTime = addHours(injectedTime, getHours(injectedTimeValue));
      injectedTime = addMinutes(injectedTime, getMinutes(injectedTimeValue));
      injectedTime = addSeconds(injectedTime, getSeconds(injectedTimeValue));
    }

    const nextTime = addMinutes(
      startOfDay,
      (currentMultiplier + 1) * intervals,
    );

    if (
      isAfter(injectedTime, currentTime) &&
      isBefore(injectedTime, nextTime) &&
      injectedTimeValue != undefined
    ) {
      times.push(injectedTimeValue);
    }
  }

  return times;
}

/**
 * Adds a leading zero to a number if it's less than 10.
 * @param i The number to add a leading zero to.
 * @returns The number as a string, with a leading zero if it was less than 10.
 */
export function addZero(i: number): string {
  return i < 10 ? `0${i}` : `${i}`;
}

/**
 * Gets the start and end years for a period.
 * @param date The date to get the period for.
 * @param yearItemNumber The number of years in the period. Defaults to DEFAULT_YEAR_ITEM_NUMBER.
 * @returns An object with the start and end years for the period.
 */
export function getYearsPeriod(
  date: Date,
  yearItemNumber: number = DEFAULT_YEAR_ITEM_NUMBER,
): { startPeriod: number; endPeriod: number } {
  const endPeriod = Math.ceil(getYear(date) / yearItemNumber) * yearItemNumber;
  const startPeriod = endPeriod - (yearItemNumber - 1);
  return { startPeriod, endPeriod };
}

/**
 * Gets the number of hours in a day.
 * @param d The date to get the number of hours for.
 * @returns The number of hours in the day.
 */
export function getHoursInDay(d: Date): number {
  const startOfDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const startOfTheNextDay = new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate(),
    24,
  );

  return Math.round((+startOfTheNextDay - +startOfDay) / 3_600_000);
}

/**
 * Returns the start of the minute for the given date
 *
 * NOTE: this function is a DST and timezone-safe analog of `date-fns/startOfMinute`
 * do not make changes unless you know what you're doing
 *
 * See comments on https://github.com/Hacker0x01/react-datepicker/pull/4244
 * for more details
 *
 * @param d date
 * @returns start of the minute
 */
export function startOfMinute(d: Date): Date {
  const seconds = d.getSeconds();
  const milliseconds = d.getMilliseconds();

  return toDate(d.getTime() - seconds * 1000 - milliseconds);
}

/**
 * Returns whether the given dates are in the same minute
 *
 * This function is a DST and timezone-safe analog of `date-fns/isSameMinute`
 *
 * @param d1
 * @param d2
 * @returns
 */
export function isSameMinute(d1: Date, d2: Date): boolean {
  return startOfMinute(d1).getTime() === startOfMinute(d2).getTime();
}

/**
 * Returns a new datetime object representing the input date with midnight time
 * @param date The date to get the midnight time for
 * @returns A new datetime object representing the input date with midnight time
 */
export function getMidnightDate(date: Date): Date {
  if (!isDate(date)) {
    throw new Error("Invalid date");
  }

  const dateWithoutTime = new Date(date);
  dateWithoutTime.setHours(0, 0, 0, 0);
  return dateWithoutTime;
}

/**
 * Is the first date before the second one?
 * @param date The date that should be before the other one to return true
 * @param dateToCompare The date to compare with
 * @returns The first date is before the second date
 *
 * Note:
 *  This function considers the mid-night of the given dates for comparison.
 *  It evaluates whether date is before dateToCompare based on their mid-night timestamps.
 */
export function isDateBefore(date: Date, dateToCompare: Date): boolean {
  if (!isDate(date) || !isDate(dateToCompare)) {
    throw new Error("Invalid date received");
  }

  const midnightDate = getMidnightDate(date);
  const midnightDateToCompare = getMidnightDate(dateToCompare);

  return isBefore(midnightDate, midnightDateToCompare);
}

/**
 * Checks if the space key was pressed down.
 *
 * @param event - The keyboard event.
 * @returns - Returns true if the space key was pressed down, false otherwise.
 */
export function isSpaceKeyDown(
  event: React.KeyboardEvent<HTMLDivElement>,
): boolean {
  return event.key === KeyType.Space;
}
