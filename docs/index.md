# `index` (component)

| name                         | type                           | default value      | description |
| ---------------------------- | ------------------------------ | ------------------ | ----------- |
| `adjustDateOnChange`         | `bool`                         |                    |             |
| `allowSameDay`               | `bool`                         | `false`            |             |
| `ariaDescribedBy`            | `string`                       |                    |             |
| `ariaInvalid`                | `string`                       |                    |             |
| `ariaLabelClose`             | `string`                       |                    |             |
| `ariaLabelledBy`             | `string`                       |                    |             |
| `ariaRequired`               | `string`                       |                    |             |
| `autoComplete`               | `string`                       |                    |             |
| `autoFocus`                  | `bool`                         |                    |             |
| `calendarClassName`          | `string`                       |                    |             |
| `calendarContainer`          | `func`                         |                    |             |
| `children`                   | `node`                         |                    |             |
| `chooseDayAriaLabelPrefix`   | `string`                       |                    |             |
| `className`                  | `string`                       |                    |             |
| `clearButtonClassName`       | `string`                       |                    |             |
| `clearButtonTitle`           | `string`                       |                    |             |
| `closeOnScroll`              | `union(bool\|func)`            |                    |             |
| `customInput`                | `element`                      |                    |             |
| `customInputRef`             | `string`                       |                    |             |
| `customTimeInput`            | `element`                      | `null`             |             |
| `dateFormat`                 | `union(string\|array)`         | `"MM/dd/yyyy"`     |             |
| `dateFormatCalendar`         | `string`                       | `"LLLL yyyy"`      |             |
| `dayClassName`               | `func`                         |                    |             |
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
| `filterTime`                 | `func`                         |                    |             |
| `fixedHeight`                | `bool`                         |                    |             |
| `focusSelectedMonth`         | `bool`                         | `false`            |             |
| `forceShowMonthNavigation`   | `bool`                         |                    |             |
| `formatWeekDay`              | `func`                         |                    |             |
| `formatWeekNumber`           | `func`                         |                    |             |
| `highlightDates`             | `array`                        |                    |             |
| `id`                         | `string`                       |                    |             |
| `includeDates`               | `array`                        |                    |             |
| `includeTimes`               | `array`                        |                    |             |
| `injectTimes`                | `array`                        |                    |             |
| `inline`                     | `bool`                         |                    |             |
| `isClearable`                | `bool`                         |                    |             |
| `locale`                     | `union(string\|shape)`         |                    |             |
| `maxDate`                    | `instanceOfDate`               |                    |             |
| `maxTime`                    | `instanceOfDate`               |                    |             |
| `minDate`                    | `instanceOfDate`               |                    |             |
| `minTime`                    | `instanceOfDate`               |                    |             |
| `monthClassName`             | `func`                         |                    |             |
| `monthsShown`                | `number`                       | `1`                |             |
| `name`                       | `string`                       |                    |             |
| `nextMonthButtonLabel`       | `union(string\|node)`          | `"Next Month"`     |             |
| `nextYearButtonLabel`        | `string`                       | `"Next Year"`      |             |
| `onBlur`                     | `func`                         | `() {}`            |             |
| `onCalendarClose`            | `func`                         | `() {}`            |             |
| `onCalendarOpen`             | `func`                         | `() {}`            |             |
| `onChange`                   | `func`                         | `() {}`            |             |
| `onChangeRaw`                | `func`                         |                    |             |
| `onClickOutside`             | `func`                         | `() {}`            |             |
| `onDayMouseEnter`            | `func`                         |                    |             |
| `onFocus`                    | `func`                         | `() {}`            |             |
| `onInputClick`               | `func`                         | `() {}`            |             |
| `onInputError`               | `func`                         | `() {}`            |             |
| `onKeyDown`                  | `func`                         | `() {}`            |             |
| `onMonthChange`              | `func`                         | `() {}`            |             |
| `onMonthMouseLeave`          | `func`                         |                    |             |
| `onSelect`                   | `func`                         | `() {}`            |             |
| `onWeekSelect`               | `func`                         |                    |             |
| `onYearChange`               | `func`                         | `() {}`            |             |
| `open`                       | `bool`                         |                    |             |
| `openToDate`                 | `instanceOfDate`               |                    |             |
| `peekNextMonth`              | `bool`                         |                    |             |
| `placeholderText`            | `string`                       |                    |             |
| `popperClassName`            | `string`                       |                    |             |
| `popperContainer`            | `func`                         |                    |             |
| `popperModifiers`            | `object`                       |                    |             |
| `popperPlacement`            | `enumpopperPlacementPositions` |                    |             |
| `popperProps`                | `object`                       |                    |             |
| `portalId`                   | `string`                       |                    |             |
| `preventOpenOnFocus`         | `bool`                         | `false`            |             |
| `previousMonthButtonLabel`   | `union(string\|node)`          | `"Previous Month"` |             |
| `previousYearButtonLabel`    | `string`                       | `"Previous Year"`  |             |
| `readOnly`                   | `bool`                         | `false`            |             |
| `renderCustomHeader`         | `func`                         |                    |             |
| `renderDayContents`          | `func`                         | `(date) {          |

return date;
}`|| |`required`|`bool`||| |`scrollableMonthYearDropdown`|`bool`||| |`scrollableYearDropdown`|`bool`||| |`selected`|`instanceOfDate`||| |`selectsEnd`|`bool`||| |`selectsRange`|`bool`||| |`selectsStart`|`bool`||| |`shouldCloseOnSelect`|`bool`|`true`|| |`showDisabledMonthNavigation`|`bool`||| |`showFourColumnMonthYearPicker`|`bool`|`false`|| |`showFullMonthYearPicker`|`bool`|`false`|| |`showMonthDropdown`|`bool`||| |`showMonthYearDropdown`|`bool`||| |`showMonthYearPicker`|`bool`|`false`|| |`showPopperArrow`|`bool`|`true`|| |`showPreviousMonths`|`bool`|`false`|| |`showQuarterYearPicker`|`bool`|`false`|| |`showTimeInput`|`bool`|`false`|| |`showTimeSelect`|`bool`|`false`|| |`showTimeSelectOnly`|`bool`||| |`showTwoColumnMonthYearPicker`|`bool`|`false`|| |`showWeekNumbers`|`bool`||| |`showYearDropdown`|`bool`||| |`showYearPicker`|`bool`|`false`|| |`startDate`|`instanceOfDate`||| |`startOpen`|`bool`||| |`strictParsing`|`bool`|`false`|| |`tabIndex`|`number`||| |`timeCaption`|`string`|`"Time"`|| |`timeClassName`|`func`||| |`timeFormat`|`string`||| |`timeInputLabel`|`string`|`"Time"`|| |`timeIntervals`|`number`|`30`|| |`title`|`string`||| |`todayButton`|`node`||| |`useShortMonthInDropdown`|`bool`||| |`useWeekdaysShort`|`bool`||| |`value`|`string`||| |`weekAriaLabelPrefix`|`string`||| |`weekDayClassName`|`func`||| |`weekLabel`|`string`||| |`withPortal`|`bool`|`false`|| |`wrapperClassName`|`string`||| |`yearDropdownItemNumber`|`number`||| |`yearItemNumber`|`number`|`DEFAULT_YEAR_ITEM_NUMBER`||
