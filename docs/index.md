# `index` (component)

General datepicker component.

| name                          | type                           | default value   | description |
| ----------------------------- | ------------------------------ | --------------- | ----------- |
| `adjustDateOnChange`          | `bool`                         |                 |             |
| `allowSameDay`                | `bool`                         | `false`         |             |
| `autoComplete`                | `string`                       |                 |             |
| `autoFocus`                   | `bool`                         |                 |             |
| `calendarClassName`           | `string`                       |                 |             |
| `children`                    | `node`                         |                 |             |
| `className`                   | `string`                       |                 |             |
| `customInput`                 | `element`                      |                 |             |
| `customInputRef`              | `string`                       |                 |             |
| `dateFormat`                  | `union(string\|array)`         | `"L"`           |             |
| `dateFormatCalendar`          | `string`                       | `"MMMM YYYY"`   |             |
| `dayClassName`                | `func`                         |                 |             |
| `disabled`                    | `bool`                         | `false`         |             |
| `disabledKeyboardNavigation`  | `bool`                         | `false`         |             |
| `dropdownMode` (required)     | `enum("scroll"\|"select")`     | `"scroll"`      |             |
| `endDate`                     | `object`                       |                 |             |
| `excludeDates`                | `array`                        |                 |             |
| `excludeTimes`                | `array`                        |                 |             |
| `filterDate`                  | `func`                         |                 |             |
| `fixedHeight`                 | `bool`                         |                 |             |
| `forceShowMonthNavigation`    | `bool`                         |                 |             |
| `formatWeekNumber`            | `func`                         |                 |             |
| `highlightDates`              | `array`                        |                 |             |
| `id`                          | `string`                       |                 |             |
| `includeDates`                | `array`                        |                 |             |
| `includeTimes`                | `array`                        |                 |             |
| `inline`                      | `bool`                         |                 |             |
| `isClearable`                 | `bool`                         |                 |             |
| `locale`                      | `string`                       |                 |             |
| `maxDate`                     | `object`                       |                 |             |
| `maxTime`                     | `object`                       |                 |             |
| `minDate`                     | `object`                       |                 |             |
| `minTime`                     | `object`                       |                 |             |
| `monthsShown`                 | `number`                       | `1`             |             |
| `name`                        | `string`                       |                 |             |
| `onBlur`                      | `func`                         | `function() {}` |             |
| `onChange` (required)         | `func`                         | `function() {}` |             |
| `onChangeRaw`                 | `func`                         |                 |             |
| `onClickOutside`              | `func`                         | `function() {}` |             |
| `onFocus`                     | `func`                         | `function() {}` |             |
| `onKeyDown`                   | `func`                         | `function() {}` |             |
| `onMonthChange`               | `func`                         | `function() {}` |             |
| `onSelect`                    | `func`                         | `function() {}` |             |
| `onWeekSelect`                | `func`                         |                 |             |
| `onYearChange`                | `func`                         | `function() {}` |             |
| `openToDate`                  | `object`                       |                 |             |
| `peekNextMonth`               | `bool`                         |                 |             |
| `placeholderText`             | `string`                       |                 |             |
| `popperClassName`             | `string`                       |                 |             |
| `popperContainer`             | `func`                         |                 |             |
| `popperModifiers`             | `object`                       |                 |             |
| `popperPlacement`             | `enumpopperPlacementPositions` |                 |             |
| `preventOpenOnFocus`          | `bool`                         | `false`         |             |
| `readOnly`                    | `bool`                         |                 |             |
| `required`                    | `bool`                         |                 |             |
| `scrollableMonthYearDropdown` | `bool`                         |                 |             |
| `scrollableYearDropdown`      | `bool`                         |                 |             |
| `selected`                    | `object`                       |                 |             |
| `selectsEnd`                  | `bool`                         |                 |             |
| `selectsStart`                | `bool`                         |                 |             |
| `shouldCloseOnSelect`         | `bool`                         | `true`          |             |
| `showDisabledMonthNavigation` | `bool`                         |                 |             |
| `showMonthDropdown`           | `bool`                         |                 |             |
| `showMonthYearDropdown`       | `bool`                         |                 |             |
| `showTimeSelect`              | `bool`                         | `false`         |             |
| `showWeekNumbers`             | `bool`                         |                 |             |
| `showYearDropdown`            | `bool`                         |                 |             |
| `startDate`                   | `object`                       |                 |             |
| `startOpen`                   | `bool`                         |                 |             |
| `tabIndex`                    | `number`                       |                 |             |
| `timeFormat`                  | `string`                       |                 |             |
| `timeIntervals`               | `number`                       | `30`            |             |
| `title`                       | `string`                       |                 |             |
| `todayButton`                 | `string`                       |                 |             |
| `useShortMonthInDropdown`     | `bool`                         |                 |             |
| `useWeekdaysShort`            | `bool`                         |                 |             |
| `utcOffset`                   | `number`                       |                 |             |
| `value`                       | `string`                       |                 |             |
| `weekLabel`                   | `string`                       |                 |             |
| `withPortal`                  | `bool`                         | `false`         |             |
| `yearDropdownItemNumber`      | `number`                       |                 |             |
