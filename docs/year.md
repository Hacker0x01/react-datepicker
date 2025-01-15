# `year` (component)

`Year` is a component that represents a year in a date picker.

@class
@param {YearProps} props - The properties that define the `Year` component.
@property {VoidFunction} [props.clearSelectingDate] - Function to clear the selected date.
@property {Date} [props.date] - The currently selected date.
@property {boolean} [props.disabledKeyboardNavigation] - If true, keyboard navigation is disabled.
@property {Date} [props.endDate] - The end date in a range selection.
@property {(date: Date) => void} props.onDayClick - Function to handle day click events.
@property {Date} props.preSelection - The date that is currently in focus.
@property {(date: Date) => void} props.setPreSelection - Function to set the pre-selected date.
@property {{ [key: string]: any }} props.selected - The selected date(s).
@property {boolean} props.inline - If true, the date picker is displayed inline.
@property {Date} props.maxDate - The maximum selectable date.
@property {Date} props.minDate - The minimum selectable date.
@property {boolean} props.usePointerEvent - If true, pointer events are used instead of mouse events.
@property {(date: Date) => void} props.onYearMouseEnter - Function to handle mouse enter events on a year.
@property {(date: Date) => void} props.onYearMouseLeave - Function to handle mouse leave events on a year.

| name                          | type | default value | description |
| ----------------------------- | ---- | ------------- | ----------- |
| `clearSelectingDate`          |      |               |             |
| `date`                        |      |               |             |
| `disabledKeyboardNavigation`  |      |               |             |
| `endDate`                     |      |               |             |
| `handleOnKeyDown`             |      |               |             |
| `inline`                      |      |               |             |
| `onDayClick`                  |      |               |             |
| `onYearMouseEnter` (required) |      |               |             |
| `onYearMouseLeave` (required) |      |               |             |
| `preSelection`                |      |               |             |
| `renderYearContent`           |      |               |             |
| `selected`                    |      |               |             |
| `selectingDate`               |      |               |             |
| `selectsEnd`                  |      |               |             |
| `selectsRange`                |      |               |             |
| `selectsStart`                |      |               |             |
| `setPreSelection`             |      |               |             |
| `startDate`                   |      |               |             |
| `usePointerEvent`             |      |               |             |
| `yearClassName`               |      |               |             |
| `yearItemNumber`              |      |               |             |
