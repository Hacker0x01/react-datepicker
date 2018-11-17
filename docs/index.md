# `index` (component)

General datepicker component.

| name                          | type                           | default value      | description |
| ----------------------------- | ------------------------------ | ------------------ | ----------- |
| `adjustDateOnChange`          | `bool`                         |                    |             |
| `allowSameDay`                | `bool`                         | `false`            |             |
| `autoComplete`                | `string`                       |                    |             |
| `autoFocus`                   | `bool`                         |                    |             |
| `calendarClassName`           | `string`                       |                    |             |
| `calendarContainer`           | `func`                         |                    |             |
| `children`                    | `node`                         |                    |             |
| `className`                   | `string`                       |                    |             |
| `clearButtonTitle`            | `string`                       |                    |             |
| `customInput`                 | `element`                      |                    |             |
| `customInputRef`              | `string`                       |                    |             |
| `dateFormat`                  | `union(string\|array)`         | `"L"`              |             |
| `dateFormatCalendar`          | `string`                       | `"MMMM YYYY"`      |             |
| `dayClassName`                | `func`                         |                    |             |
| `disabled`                    | `bool`                         | `false`            |             |
| `disabledKeyboardNavigation`  | `bool`                         | `false`            |             |
| `dropdownMode`                | `enum("scroll"\|"select")`     | `"scroll"`         |             |
| `endDate`                     | `instanceOf(Date)`             |                    |             |
| `excludeDates`                | `array`                        |                    |             |
| `excludeTimes`                | `array`                        |                    |             |
| `filterDate`                  | `func`                         |                    |             |
| `fixedHeight`                 | `bool`                         |                    |             |
| `forceShowMonthNavigation`    | `bool`                         |                    |             |
| `formatWeekDay`               | `func`                         |                    |             |
| `formatWeekNumber`            | `func`                         |                    |             |
| `highlightDates`              | `array`                        |                    |             |
| `id`                          | `string`                       |                    |             |
| `includeDates`                | `array`                        |                    |             |
| `includeTimes`                | `array`                        |                    |             |
| `injectTimes`                 | `array`                        |                    |             |
| `inline`                      | `bool`                         |                    |             |
| `isClearable`                 | `bool`                         |                    |             |
| `locale`                      | `string`                       |                    |             |
| `maxDate`                     | `instanceOf(Date)`             |                    |             |
| `maxTime`                     | `instanceOf(Date)`             |                    |             |
| `minDate`                     | `instanceOf(Date)`             |                    |             |
| `minTime`                     | `instanceOf(Date)`             |                    |             |
| `monthsShown`                 | `number`                       | `1`                |             |
| `name`                        | `string`                       |                    |             |
| `nextMonthButtonLabel`        | `string`                       | `"Next month"`     |             |
| `onBlur`                      | `func`                         | `function() {}`    |             |
| `onChange`                    | `func`                         | `function() {}`    |             |
| `onChangeRaw`                 | `func`                         |                    |             |
| `onClickOutside`              | `func`                         | `function() {}`    |             |
| `onFocus`                     | `func`                         | `function() {}`    |             |
| `onInputClick`                | `func`                         | `function() {}`    |             |
| `onKeyDown`                   | `func`                         | `function() {}`    |             |
| `onMonthChange`               | `func`                         | `function() {}`    |             |
| `onSelect`                    | `func`                         | `function() {}`    |             |
| `onWeekSelect`                | `func`                         |                    |             |
| `onYearChange`                | `func`                         | `function() {}`    |             |
| `open`                        | `bool`                         |                    |             |
| `openToDate`                  | `instanceOf(Date)`             |                    |             |
| `peekNextMonth`               | `bool`                         |                    |             |
| `placeholderText`             | `string`                       |                    |             |
| `popperClassName`             | `string`                       |                    |             |
| `popperContainer`             | `func`                         |                    |             |
| `popperModifiers`             | `object`                       |                    |             |
| `popperPlacement`             | `enumpopperPlacementPositions` |                    |             |
| `preventOpenOnFocus`          | `bool`                         | `false`            |             |
| `previousMonthButtonLabel`    | `string`                       | `"Previous Month"` |             |
| `readOnly`                    | `bool`                         | `false`            |             |
| `renderCustomHeader`          | `func`                         |                    |             |
| `required`                    | `bool`                         |                    |             |
| `scrollableMonthYearDropdown` | `bool`                         |                    |             |
| `scrollableYearDropdown`      | `bool`                         |                    |             |
| `selected`                    | `instanceOf(Date)`             |                    |             |
| `selectsEnd`                  | `bool`                         |                    |             |
| `selectsStart`                | `bool`                         |                    |             |
| `shouldCloseOnSelect`         | `bool`                         | `true`             |             |
| `showDisabledMonthNavigation` | `bool`                         |                    |             |
| `showMonthDropdown`           | `bool`                         |                    |             |
| `showMonthYearDropdown`       | `bool`                         |                    |             |
| `showTimeSelect`              | `bool`                         | `false`            |             |
| `showTimeSelectOnly`          | `bool`                         |                    |             |
| `showWeekNumbers`             | `bool`                         |                    |             |
| `showYearDropdown`            | `bool`                         |                    |             |
| `startDate`                   | `instanceOf(Date)`             |                    |             |
| `startOpen`                   | `bool`                         |                    |             |
| `tabIndex`                    | `number`                       |                    |             |
| `timeCaption`                 | `string`                       | `"Time"`           |             |
| `timeFormat`                  | `string`                       |                    |             |
| `timeIntervals`               | `number`                       | `30`               |             |
| `title`                       | `string`                       |                    |             |
| `todayButton`                 | `node`                         |                    |             |
| `useShortMonthInDropdown`     | `bool`                         |                    |             |
| `useWeekdaysShort`            | `bool`                         |                    |             |
| `utcOffset`                   | `union(number\|string)`        |                    |             |
| `value`                       | `string`                       |                    |             |
| `weekLabel`                   | `string`                       |                    |             |
| `withPortal`                  | `bool`                         | `false`            |             |
| `yearDropdownItemNumber`      | `number`                       |                    |             |
