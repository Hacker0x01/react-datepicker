# `index` (component)

| name                         | type                           | default value      | description |
| ---------------------------- | ------------------------------ | ------------------ | ----------- |
| `adjustDateOnChange`         | `bool`                         |                    |             |
| `allowSameDay`               | `bool`                         | `false`            |             |
| `ariaLabelClose`             | `string`                       |                    |             |
| `ariaLabelledBy`             | `string`                       |                    |             |
| `autoComplete`               | `string`                       |                    |             |
| `autoFocus`                  | `bool`                         |                    |             |
| `calendarClassName`          | `string`                       |                    |             |
| `calendarContainer`          | `func`                         |                    |             |
| `children`                   | `node`                         |                    |             |
| `chooseDayAriaLabelPrefix`   | `string`                       |                    |             |
| `className`                  | `string`                       |                    |             |
| `clearButtonTitle`           | `string`                       |                    |             |
| `customInput`                | `element`                      |                    |             |
| `customInputRef`             | `string`                       |                    |             |
| `customTimeInput`            | `element`                      | `null`             |             |
| `dateFormat`                 | `union(string\|array)`         | `"MM/dd/yyyy"`     |             |
| `dateFormatCalendar`         | `string`                       | `"LLLL yyyy"`      |             |
| `dayClassName`               | `func`                         |                    |             |
| `weekDayClassName`           | `func`                         |                    |             |
| `disabled`                   | `bool`                         | `false`            |             |
| `disabledDayAriaLabelPrefix` | `string`                       |                    |             |
| `disabledKeyboardNavigation` | `bool`                         | `false`            |             |
| `dropdownMode`               | `enum("scroll"\|"select")`     | `"scroll"`         |             |
| `enableTabLoop`              | `bool`                         | `true`             |             |
| `endDate`                    | `instanceOfDate`               |                    |             |
| `excludeDates`               | `array`                        |                    |             |
| `excludeScrollbar`           | `bool`                         | `true`             |             |
| `excludeTimes`               | `array`                        |                    |             |
| `filterDate`                 | `func`                         |                    |             |
| `fixedHeight`                | `bool`                         |                    |             |
| `forceShowMonthNavigation`   | `bool`                         |                    |             |
| `formatWeekDay`              | `func`                         |                    |             |
| `formatWeekNumber`           | `func`                         |                    |             |
| `highlightDates`             | `array`                        |                    |             |
| `id`                         | `string`                       |                    |             |
| `includeDates`               | `array`                        |                    |             |
| `includeTimes`               | `array`                        |                    |             |
| `injectTimes`                | `array`                        |                    |             |
| `inline`                     | `bool`                         |                    |             |
| `inlineFocusSelectedMonth`   | `bool`                         | `false`            |             |
| `isClearable`                | `bool`                         |                    |             |
| `locale`                     | `union(string\|shape)`         |                    |             |
| `maxDate`                    | `instanceOfDate`               |                    |             |
| `maxTime`                    | `instanceOfDate`               |                    |             |
| `minDate`                    | `instanceOfDate`               |                    |             |
| `minTime`                    | `instanceOfDate`               |                    |             |
| `monthClassName`             | `func`                         |                    |             |
| `monthsShown`                | `number`                       | `1`                |             |
| `name`                       | `string`                       |                    |             |
| `nextMonthButtonLabel`       | `string`                       | `"Next Month"`     |             |
| `nextYearButtonLabel`        | `string`                       | `"Next Year"`      |             |
| `onBlur`                     | `func`                         | `function() {}`    |             |
| `onCalendarClose`            | `func`                         | `function() {}`    |             |
| `onCalendarOpen`             | `func`                         | `function() {}`    |             |
| `onChange`                   | `func`                         | `function() {}`    |             |
| `onChangeRaw`                | `func`                         |                    |             |
| `onClickOutside`             | `func`                         | `function() {}`    |             |
| `onDayMouseEnter`            | `func`                         |                    |             |
| `onFocus`                    | `func`                         | `function() {}`    |             |
| `onInputClick`               | `func`                         | `function() {}`    |             |
| `onInputError`               | `func`                         | `function() {}`    |             |
| `onKeyDown`                  | `func`                         | `function() {}`    |             |
| `onMonthChange`              | `func`                         | `function() {}`    |             |
| `onMonthMouseLeave`          | `func`                         |                    |             |
| `onSelect`                   | `func`                         | `function() {}`    |             |
| `onWeekSelect`               | `func`                         |                    |             |
| `onYearChange`               | `func`                         | `function() {}`    |             |
| `open`                       | `bool`                         |                    |             |
| `openToDate`                 | `instanceOfDate`               |                    |             |
| `peekNextMonth`              | `bool`                         |                    |             |
| `placeholderText`            | `string`                       |                    |             |
| `popperClassName`            | `string`                       |                    |             |
| `popperContainer`            | `func`                         |                    |             |
| `popperModifiers`            | `object`                       |                    |             |
| `popperPlacement`            | `enumpopperPlacementPositions` |                    |             |
| `popperProps`                | `object`                       |                    |             |
| `preventOpenOnFocus`         | `bool`                         | `false`            |             |
| `previousMonthButtonLabel`   | `string`                       | `"Previous Month"` |             |
| `previousYearButtonLabel`    | `string`                       | `"Previous Year"`  |             |
| `readOnly`                   | `bool`                         | `false`            |             |
| `renderCustomHeader`         | `func`                         |                    |             |
| `renderDayContents`          | `func`                         | `function(date) {  |

return date;
}`|| |`required`|`bool`||| |`scrollableMonthYearDropdown`|`bool`||| |`scrollableYearDropdown`|`bool`||| |`selected`|`instanceOfDate`||| |`selectsEnd`|`bool`||| |`selectsStart`|`bool`||| |`shouldCloseOnSelect`|`bool`|`true`|| |`showDisabledMonthNavigation`|`bool`||| |`showMonthDropdown`|`bool`||| |`showMonthYearDropdown`|`bool`||| |`showMonthYearPicker`|`bool`|`false`|| |`showPopperArrow`|`bool`|`true`|| |`showPreviousMonths`|`bool`|`false`|| |`showQuarterYearPicker`|`bool`|`false`|| |`showTimeInput`|`bool`|`false`|| |`showTimeSelect`|`bool`|`false`|| |`showTimeSelectOnly`|`bool`||| |`showWeekNumbers`|`bool`||| |`showYearDropdown`|`bool`||| |`startDate`|`instanceOfDate`||| |`startOpen`|`bool`||| |`strictParsing`|`bool`|`false`|| |`tabIndex`|`number`||| |`timeCaption`|`string`|`"Time"`|| |`timeClassName`|`func`||| |`timeFormat`|`string`||| |`timeInputLabel`|`string`|`"Time"`|| |`timeIntervals`|`number`|`30`|| |`title`|`string`||| |`todayButton`|`node`||| |`useShortMonthInDropdown`|`bool`||| |`useWeekdaysShort`|`bool`||| |`value`|`string`||| |`weekAriaLabelPrefix`|`string`||| |`weekLabel`|`string`||| |`withPortal`|`bool`|`false`|| |`wrapperClassName`|`string`||| |`yearDropdownItemNumber`|`number`|||
