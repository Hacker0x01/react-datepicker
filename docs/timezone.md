# Timezone Handling Guide

This guide explains how react-datepicker handles timezones and provides solutions for common timezone-related scenarios.

## Using the `timeZone` Prop (Issue #1787)

React-datepicker now supports a `timeZone` prop that allows you to display and handle dates in a specific timezone, regardless of the user's local timezone. This feature requires the optional `date-fns-tz` peer dependency.

### Installation

To use the `timeZone` prop, you need to install `date-fns-tz`:

```bash
npm install date-fns-tz
# or
yarn add date-fns-tz
```

### Basic Usage

```jsx
import DatePicker from "react-datepicker";

function MyComponent() {
  const [startDate, setStartDate] = useState(new Date());

  return <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} timeZone="America/New_York" />;
}
```

### How It Works

When you provide a `timeZone` prop:

1. **Display**: Dates are displayed in the specified timezone. For example, if you select January 15th at noon UTC and the timezone is "America/New_York", the datepicker will display the date as it appears in New York time.

2. **Selection**: When a user selects a date, the `onChange` callback receives a Date object that represents the selected moment in UTC. The internal conversion ensures that the date selected visually in the specified timezone is correctly converted.

3. **Current Time**: The "today" indicator and default selections use the current time in the specified timezone.

### Supported Timezone Formats

The `timeZone` prop accepts IANA timezone identifiers:

- `"UTC"` - Coordinated Universal Time
- `"America/New_York"` - Eastern Time (US)
- `"America/Los_Angeles"` - Pacific Time (US)
- `"Europe/London"` - British Time
- `"Europe/Paris"` - Central European Time
- `"Asia/Tokyo"` - Japan Standard Time
- `"Australia/Sydney"` - Australian Eastern Time

For a complete list, see the [IANA Time Zone Database](https://www.iana.org/time-zones).

### Examples

#### Date and Time Picker in a Specific Timezone

```jsx
import DatePicker from "react-datepicker";

function TimezoneDateTimePicker() {
  const [date, setDate] = useState(new Date());

  return <DatePicker selected={date} onChange={setDate} showTimeSelect timeZone="Europe/London" dateFormat="MMMM d, yyyy h:mm aa" />;
}
```

#### Date Range in UTC

```jsx
import DatePicker from "react-datepicker";

function UTCDateRange() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return <DatePicker selected={startDate} onChange={onChange} startDate={startDate} endDate={endDate} selectsRange timeZone="UTC" />;
}
```

#### Inline Calendar with Timezone

```jsx
import DatePicker from "react-datepicker";

function TokyoCalendar() {
  const [date, setDate] = useState(new Date());

  return <DatePicker selected={date} onChange={setDate} inline timeZone="Asia/Tokyo" />;
}
```

### Important Notes

- **Optional Dependency**: The `timeZone` prop requires `date-fns-tz` to be installed. If it's not installed and you use the `timeZone` prop, a warning will be logged in development mode and the datepicker will fall back to local timezone behavior.

- **UTC Storage**: Even when using a timezone, the Date objects passed to `onChange` represent moments in time (internally stored as UTC). The timezone only affects how dates are displayed and interpreted during selection.

- **Consistency**: When using the `timeZone` prop, ensure all date-related props (like `minDate`, `maxDate`, `excludeDates`, etc.) are provided in a consistent manner.

---

## The "Date is One Day Off" Problem (Issue #1018)

One of the most commonly reported issues is that the selected date appears to be "one day off" when converted to a string or sent to a server. This is **not a bug** in react-datepicker—it's the expected behavior of JavaScript Date objects.

### Why This Happens

When you select a date in the datepicker (e.g., September 10th), the component returns a JavaScript `Date` object representing **midnight local time** on that day:

```js
// User in UTC-3 timezone selects September 10th
// The Date object represents: Sep 10, 2017 00:00:00 (local time)
```

However, when you call `toISOString()` on this Date object, JavaScript converts it to UTC:

```js
const selectedDate = /* Sep 10, 2017 00:00:00 local time (UTC-3) */;
console.log(selectedDate.toISOString());
// Output: "2017-09-09T21:00:00.000Z" ← Appears to be September 9th!
```

The date looks "wrong" because midnight in UTC-3 is 9:00 PM the previous day in UTC.

### Solutions

#### Solution 1: Use Local Date String (Recommended for date-only fields)

If you only care about the date (not the time), extract just the date portion:

```jsx
const handleChange = (date) => {
  // Get the date in YYYY-MM-DD format based on local time
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dateString = `${year}-${month}-${day}`; // "2017-09-10"

  sendToServer(dateString);
};

<DatePicker selected={date} onChange={handleChange} />;
```

#### Solution 2: Adjust for Timezone Offset

If you need an ISO string that represents the local date at midnight UTC:

```jsx
const handleChange = (date) => {
  // Adjust for timezone offset to get the "intended" UTC date
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  const isoString = offsetDate.toISOString(); // "2017-09-10T00:00:00.000Z"

  sendToServer(isoString);
};
```

#### Solution 3: Use date-fns format function

```jsx
import { format } from "date-fns";

const handleChange = (date) => {
  // Format the date in local time
  const dateString = format(date, "yyyy-MM-dd"); // "2017-09-10"
  sendToServer(dateString);
};
```

#### Solution 4: Use toLocaleDateString()

```jsx
const handleChange = (date) => {
  // Get localized date string
  const dateString = date.toLocaleDateString("en-CA"); // "2017-09-10" (YYYY-MM-DD format)
  sendToServer(dateString);
};
```

### Important Notes

- **This is not a react-datepicker bug**: The datepicker correctly returns the date you selected in your local timezone
- **The visual display is correct**: The datepicker shows the correct date; the "issue" only appears when converting to UTC
- **Choose the right solution for your use case**: If you're storing dates without times (like birthdays), use Solution 1 or 3. If you need precise timestamps, be aware of timezone implications.

---

## How react-datepicker Handles Dates

React-datepicker uses native JavaScript `Date` objects and the [date-fns](https://date-fns.org/) library for date manipulation. This means:

1. **All dates are stored as JavaScript Date objects** - These represent a specific moment in time (internally stored as milliseconds since Unix epoch in UTC).

2. **Display is based on the user's local timezone** - When a Date object is displayed, JavaScript automatically converts it to the user's local timezone.

3. **No built-in timezone conversion** - The datepicker does not include built-in timezone conversion utilities. If you need timezone support, you'll need to handle conversions in your application code.

## Common Questions and Solutions

### 1. Why do dates appear differently across timezones?

JavaScript Date objects represent an absolute moment in time. When displayed, they're converted to the user's local timezone. For example, `2025-01-15T00:00:00Z` (midnight UTC) will display as:

- `Jan 14, 2025 7:00 PM` in New York (UTC-5)
- `Jan 15, 2025 9:00 AM` in Tokyo (UTC+9)

**Solution**: If you want dates to display consistently regardless of timezone, consider:

- Storing and transmitting dates as date-only strings (e.g., `"2025-01-15"`) without time components
- Creating dates at noon local time to avoid day boundary issues: `new Date(2025, 0, 15, 12, 0, 0)`

### 2. How do I work with UTC dates?

If your backend stores dates in UTC and you want to display them as UTC:

```jsx
// Convert UTC string to local Date for display
const utcDateString = "2025-01-15T10:30:00Z";
const date = new Date(utcDateString);

// When sending back to server, convert to UTC ISO string
const handleChange = (date) => {
  const utcString = date.toISOString(); // Always returns UTC
  sendToServer(utcString);
};

<DatePicker selected={date} onChange={handleChange} />;
```

### 3. How do I display dates in a specific timezone?

For displaying dates in a specific timezone (not the user's local timezone), you can use libraries like [date-fns-tz](https://github.com/marnusw/date-fns-tz):

```jsx
import { formatInTimeZone, toZonedTime } from "date-fns-tz";

// Display a date in a specific timezone
const timeZone = "America/New_York";
const utcDate = new Date(); // Current time in UTC

// Convert to the target timezone for display
const zonedDate = toZonedTime(utcDate, timeZone);

// Format with timezone
const formatted = formatInTimeZone(utcDate, timeZone, "yyyy-MM-dd HH:mm:ss zzz");
```

### 4. Why does the selected date change when I submit a form?

This typically happens because:

- The date is created in local time but sent to the server as UTC
- The server interprets the UTC date differently

**Solution**: Be explicit about how you serialize dates:

```jsx
const handleChange = (date) => {
  // Option 1: Send as ISO string (includes timezone info)
  const isoString = date.toISOString(); // "2025-01-15T05:00:00.000Z"

  // Option 2: Send as date-only string (no timezone ambiguity)
  const dateOnly = date.toISOString().split("T")[0]; // "2025-01-15"

  // Option 3: Send as Unix timestamp
  const timestamp = date.getTime(); // 1736920800000
};
```

### 5. How do I create a date without timezone issues?

For date-only scenarios (no time component), create dates at noon to avoid day boundary issues:

```jsx
// Instead of this (can shift days at timezone boundaries):
const date = new Date("2025-01-15"); // Parsed as UTC midnight

// Do this (noon local time is safe from day shifts):
const createLocalDate = (year, month, day) => {
  return new Date(year, month - 1, day, 12, 0, 0);
};

// Or parse a date string as local time:
const parseLocalDate = (dateString) => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day, 12, 0, 0);
};
```

### 6. How do I handle date ranges across timezones?

When working with date ranges, ensure both start and end dates are handled consistently:

```jsx
const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);

// Normalize dates to start/end of day in local time
const normalizeStartDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const normalizeEndDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

<DatePicker
  selectsRange
  startDate={startDate}
  endDate={endDate}
  onChange={(dates) => {
    const [start, end] = dates;
    setStartDate(normalizeStartDate(start));
    setEndDate(normalizeEndDate(end));
  }}
/>;
```

## Best Practices

1. **Be consistent**: Choose one approach for handling timezones across your application and stick with it.

2. **Store dates in UTC**: When persisting dates, store them in UTC format (ISO 8601 strings or Unix timestamps).

3. **Convert on the boundaries**: Handle timezone conversion at the edges of your application (when receiving from or sending to APIs).

4. **Use date-fns-tz for complex timezone needs**: If you need to display dates in specific timezones, use a dedicated library like date-fns-tz.

5. **Test across timezones**: Test your application with different system timezones to catch timezone-related bugs.

6. **Document your date format**: Make sure your team knows what format dates are stored and transmitted in.

## Additional Resources

- [date-fns Documentation](https://date-fns.org/docs/Getting-Started)
- [date-fns-tz for timezone support](https://github.com/marnusw/date-fns-tz)
- [MDN Date Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [Understanding JavaScript Date and Timezones](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format)
