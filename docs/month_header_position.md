# monthHeaderPosition

## Description

The `monthHeaderPosition` prop allows you to control where the month header (e.g., "December 2025") is displayed in the calendar. By default, it appears in the standard header section above the day names. You can reposition the header to appear between the day names and calendar days ("middle") or at the bottom of the calendar ("bottom").

## Type

```typescript
monthHeaderPosition?: "top" | "middle" | "bottom";
```

## Values

- `"top"` (or undefined) - Month header appears in the standard position at the top of the calendar (default)
- `"middle"` - Month header appears between day names and calendar days
- `"bottom"` - Month header appears at the bottom of the calendar

## Usage

```tsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";

// Example 1: Header in the middle (between day names and days)
const MiddlePositionExample = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return <DatePicker selected={selectedDate} onChange={setSelectedDate} monthHeaderPosition="middle" />;
};

// Example 2: Header at the bottom
const BottomPositionExample = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return <DatePicker selected={selectedDate} onChange={setSelectedDate} monthHeaderPosition="bottom" />;
};

// Example 3: Default position (top)
const DefaultPositionExample = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return <DatePicker selected={selectedDate} onChange={setSelectedDate} monthHeaderPosition="top" />;
};
```

## Notes

- When `monthHeaderPosition` is set to `"middle"` or `"bottom"`, the month header (including navigation buttons and dropdowns) is removed from the default header section
- Works with multiple months (`monthsShown` prop) - each month's header will be positioned accordingly
- Navigation buttons are included and properly positioned in all three position options
