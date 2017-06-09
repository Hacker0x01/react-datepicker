### General `datepicker` component props.

| name  | type  | default value  | description  |
|---|---|---|---|
| `dropdownMode` (required)  | `enum('scroll'|'select')`  |  `'scroll'` |   |
| `onChange` (required)  |`func`   |`function() {}`   |   |
| `autoComplete`  | `string`  |   |   |
| `autoFocus` | `bool`  |   |   |
| `calendarClassName`  | `string`  |   |   |
| `children`  | `node`  |   |   |
| `className`  | `string`  |   |   |
| `customInput`  |`element`   |   |   |
| `dateFormat`  | `union(string|array)`  | `'L'`  |   |
|`dateFormatCalendar`   | `string`  | `'MMMM YYYY'`  |   |
| `disabled`  | `bool`  | `false`  |   |
|`disabledKeyboardNavigation`   | `bool`  | `false`  |   |
| `endDate`  |`object`   |   |   |
|`excludeDates`   | `array`  |   |   |
| `filterDate`  |`func`   |   |   |
| `fixedHeight`  |`bool`   |   |   |
| `forceShowMonthNavigation`  | `bool`  |   |   |
|`highlightDates`   | `array`  |   |   |
| `id`  | `string`  |   |   |
| `includeDates`  |`array`   |   |   |
|`inline`   |`bool`   |   |   |
|`isClearable`   |`bool`   |   |   |
| `locale`  |`string`   |   |   |
|`maxDate`   |`object`   |   |   |
| `minDate`  | `object`  |   |   |
|`monthsShown`   | `number`  | `1`  |   |
| `name`  | `string`  |   |   |
| `onBlur`  |`func`   |`function() {}`   |   |
|`onChangeRaw`   | `func`  |   |   |
| `onClickOutside`  |`func`   |  `function() {}` |   |
|`onFocus`   | `func`  | `function() {}`  |   |
| `onMonthChange`  |`func`   |`function() {}`   |   |
|`onSelect`   |`func`   |`function() {}`   |   |
| `openToDate`  |`object`   |   |   |
| `peekNextMonth`  | `bool`  |   |   |
|`placeholderText`   | `string`  |   |   |
| `popoverAttachment`  |`string`   | `'top left'`  |   |
|`popoverTargetAttachment`   |`string`   |`'bottom left'`   |   |
| `popoverTargetOffset`   | `string`  |`'10px 0'`   |   |
|`readOnly`   |`bool`   | `false`  |   |
| `renderCalendarTo`  | any |   |   |
|`required`   |`bool`   | `false`  |   |
| `scrollableYearDropdown`  | `bool`  |   |   |
|`selected`   | `object`  |   |   |
|`selectsEnd`   | `bool`  |   |   |
| `selectsStart`  |`bool`   |   |   |
| `showMonthDropdown`  | `bool`  |   |   |
| `showWeekNumbers`  |`bool`   |   |   |
|`showYearDropdown`   |`bool`   |   |   |
|`startDate`   |`object`   |   |   |
|`tabIndex`   |`number`   |   |   |
| `tetherConstraints`  |`array`   | `[{ to: 'window', attachment: 'together'}]`  |   |
| `title`  |`string`   |   |   |
| `todayButton`  | `string`  |   |   |
|`utcOffset`   | `number`  |`moment().utcOffset()`   |   |
|`value`   |  `string`  |   |   |
|`withPortal`   | `bool`  |`false`   |   |
