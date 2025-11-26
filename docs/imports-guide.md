# Common Imports Guide

When using examples from the react-datepicker documentation, you may need to import additional utilities and types. This guide provides a comprehensive reference for common imports.

## Basic Setup

Every react-datepicker implementation requires these basic imports:

```tsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
```

For CSS Modules:

```tsx
import "react-datepicker/dist/react-datepicker-cssmodules.css";
// or
import "react-datepicker/dist/react-datepicker.module.css";
```

## Date Manipulation (date-fns)

React-datepicker uses `date-fns` internally. When working with dates in your examples, you'll often need these functions:

### Common date-fns Functions

```tsx
import { getYear, getMonth, addDays, subDays, addMonths, subMonths, addYears, subYears, setHours, setMinutes, setSeconds, startOfDay, endOfDay, isAfter, isBefore, isEqual, format, parse } from "date-fns";
```

### Usage Examples

**Custom Header with Year/Month Dropdowns:**

```tsx
import { getYear, getMonth } from "date-fns";

const year = getYear(new Date());
const month = getMonth(new Date()); // Returns 0-11
```

**Date Ranges and Highlighting:**

```tsx
import { addDays, subDays } from "date-fns";

const tomorrow = addDays(new Date(), 1);
const yesterday = subDays(new Date(), 1);
```

**Time Manipulation:**

```tsx
import { setHours, setMinutes } from "date-fns";

const nineAM = setHours(setMinutes(new Date(), 0), 9);
```

## Utility Functions

### Range Function

Many examples use a `range()` function to generate arrays of numbers (e.g., for year dropdowns).

**Option 1: Install lodash**

```bash
npm install lodash
# or
yarn add lodash
```

```tsx
import range from "lodash/range";

const years = range(1990, 2030, 1); // [1990, 1991, ..., 2029]
```

**Option 2: Implement your own**

```tsx
const range = (start: number, end: number, step: number = 1): number[] => {
  return Array.from({ length: (end - start) / step }, (_, i) => start + i * step);
};

const years = range(1990, 2030, 1); // [1990, 1991, ..., 2029]
```

## TypeScript Types

React-datepicker exports several useful TypeScript types:

```tsx
import type { ReactDatePickerCustomHeaderProps, ReactDatePickerProps } from "react-datepicker";
```

### Custom Header Props

When creating a custom header, use the `ReactDatePickerCustomHeaderProps` type:

```tsx
import type { ReactDatePickerCustomHeaderProps } from "react-datepicker";

const CustomHeader = ({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }: ReactDatePickerCustomHeaderProps) => {
  // Your custom header implementation
};
```

## Localization

To use a locale other than English:

```tsx
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import { fr } from "date-fns/locale/fr";
import { de } from "date-fns/locale/de";

registerLocale("es", es);
registerLocale("fr", fr);
registerLocale("de", de);

// Use in component
<DatePicker locale="es" selected={date} onChange={setDate} />;

// Or set globally
setDefaultLocale("es");
```

## Custom Components

### Calendar Container

```tsx
import { CalendarContainer } from "react-datepicker";
import type { CalendarContainerProps } from "react-datepicker";

const MyContainer = ({ className, children }: CalendarContainerProps) => {
  return (
    <div style={{ background: "#f0f0f0" }}>
      <CalendarContainer className={className}>
        <div>Custom header</div>
        {children}
      </CalendarContainer>
    </div>
  );
};

<DatePicker calendarContainer={MyContainer} />;
```

## Complete Example

Here's a complete example with all necessary imports for a custom header with year/month dropdowns:

```tsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { getYear, getMonth } from "date-fns";
import range from "lodash/range";
import type { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const CustomHeader = ({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }: ReactDatePickerCustomHeaderProps) => (
  <div style={{ margin: 10, display: "flex", justifyContent: "center" }}>
    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
      {"<"}
    </button>
    <select value={getYear(date)} onChange={({ target: { value } }) => changeYear(Number(value))}>
      {range(1990, getYear(new Date()) + 1, 1).map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    <select value={MONTHS[getMonth(date)]} onChange={({ target: { value } }) => changeMonth(MONTHS.indexOf(value))}>
      {MONTHS.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
      {">"}
    </button>
  </div>
);

const App = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return <DatePicker renderCustomHeader={CustomHeader} selected={selectedDate} onChange={(date) => setSelectedDate(date)} />;
};

export default App;
```

## Quick Reference

| Feature            | Import                                                                     |
| ------------------ | -------------------------------------------------------------------------- |
| Basic DatePicker   | `import DatePicker from "react-datepicker"`                                |
| Styles             | `import "react-datepicker/dist/react-datepicker.css"`                      |
| Date manipulation  | `import { getYear, addDays, ... } from "date-fns"`                         |
| Locales            | `import { es } from "date-fns/locale/es"`                                  |
| Register locale    | `import { registerLocale } from "react-datepicker"`                        |
| TypeScript types   | `import type { ReactDatePickerCustomHeaderProps } from "react-datepicker"` |
| Calendar container | `import { CalendarContainer } from "react-datepicker"`                     |
| Range utility      | `import range from "lodash/range"` or implement your own                   |

## Need Help?

- Full API documentation: [docs/datepicker.md](./datepicker.md)
- Live examples: [https://reactdatepicker.com](https://reactdatepicker.com)
- All examples on the website include commented import statements
- GitHub issues: [https://github.com/Hacker0x01/react-datepicker/issues](https://github.com/Hacker0x01/react-datepicker/issues)
