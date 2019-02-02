# `index` (component)

| name                         | type                           | default value      | description |
| ---------------------------- | ------------------------------ | ------------------ | ----------- |
| `adjustDateOnChange`         | `bool`                         |                    |             |
| `allowSameDay`               | `bool`                         | `false`            |             |
| `autoComplete`               | `string`                       |                    |             |
| `autoFocus`                  | `bool`                         |                    |             |
| `calendarClassName`          | `string`                       |                    |             |
| `calendarContainer`          | `func`                         |                    |             |
| `children`                   | `node`                         |                    |             |
| `className`                  | `string`                       |                    |             |
| `clearButtonTitle`           | `string`                       |                    |             |
| `customInput`                | `element`                      |                    |             |
| `customInputRef`             | `string`                       |                    |             |
| `dateFormat`                 | `union(string\|array)`         | `"MM/dd/yyyy"`     |             |
| `dateFormatCalendar`         | `string`                       | `"LLLL yyyy"`      |             |
| `dayClassName`               | `func`                         |                    |             |
| `disabled`                   | `bool`                         | `false`            |             |
| `disabledKeyboardNavigation` | `bool`                         | `false`            |             |
| `dropdownMode`               | `enum("scroll"\|"select")`     | `"scroll"`         |             |
| `endDate`                    | `instanceOfDate`               |                    |             |
| `excludeDates`               | `array`                        |                    |             |
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
| `locale`                     | `string`                       |                    |             |
| `maxDate`                    | `instanceOfDate`               |                    |             |
| `maxTime`                    | `instanceOfDate`               |                    |             |
| `minDate`                    | `instanceOfDate`               |                    |             |
| `minTime`                    | `instanceOfDate`               |                    |             |
| `monthsShown`                | `number`                       | `1`                |             |
| `name`                       | `string`                       |                    |             |
| `nextMonthButtonLabel`       | `string`                       | `"Next month"`     |             |
| `onBlur`                     | `func`                         | `function() {}`    |             |
| `onChange`                   | `func`                         | `function() {}`    |             |
| `onChangeRaw`                | `func`                         |                    |             |
| `onClickOutside`             | `func`                         | `function() {}`    |             |
| `onFocus`                    | `func`                         | `function() {}`    |             |
| `onInputClick`               | `func`                         | `function() {}`    |             |
| `onInputError`               | `func`                         | `function() {}`    |             |
| `onKeyDown`                  | `func`                         | `function() {}`    |             |
| `onMonthChange`              | `func`                         | `function() {}`    |             |
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
| `readOnly`                   | `bool`                         | `false`            |             |
| `renderCustomHeader`         | `func`                         |                    |             |
| `renderDayContents`          | `func`                         | `function(date) {  |

return date;
}`|| |`required`|`bool`||| |`scrollableMonthYearDropdown`|`bool`||| |`scrollableYearDropdown`|`bool`||| |`selected`|`instanceOfDate`||| |`selectsEnd`|`bool`||| |`selectsStart`|`bool`||| |`shouldCloseOnSelect`|`bool`|`true`|| |`showDisabledMonthNavigation`|`bool`||| |`showMonthDropdown`|`bool`||| |`showMonthYearDropdown`|`bool`||| |`showTimeSelect`|`bool`|`false`|| |`showTimeSelectOnly`|`bool`||| |`showWeekNumbers`|`bool`||| |`showYearDropdown`|`bool`||| |`startDate`|`instanceOfDate`||| |`startOpen`|`bool`||| |`tabIndex`|`number`||| |`timeCaption`|`string`|`"Time"`|| |`timeFormat`|`string`||| |`timeIntervals`|`number`|`30`|| |`title`|`string`||| |`todayButton`|`node`||| |`useShortMonthInDropdown`|`bool`||| |`useWeekdaysShort`|`bool`||| |`value`|`string`||| |`weekLabel`|`string`||| |`withPortal`|`bool`|`false`|| |`yearDropdownItemNumber`|`number`|||
