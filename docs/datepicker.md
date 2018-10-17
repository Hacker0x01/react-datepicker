# `datepicker` (component)

General datepicker component.

| name                         | type                           | default value   | description                                |
| ---------------------------- | ------------------------------ | --------------- | ------------------------------------------ |
| `allowSameDay`               | `bool`                         | `false`         |                                            |
| `autoComplete`               | `string`                       |                 |                                            |
| `autoFocus`                  | `bool`                         |                 |                                            |
| `calendarClassName`          | `string`                       |                 |                                            |
| `children`                   | `node`                         |                 |                                            |
| `className`                  | `string`                       |                 |                                            |
| `clearButtonTitle`           | `string`                       |                 |                                            |
| `customInput`                | `element`                      |                 |                                            |
| `customInputRef`             | `string`                       | `'ref'`         | The property used to pass the ref callback |
| `dateFormat`                 | `union(string\|array)`         | `'L'`           |                                            |
| `dateFormatCalendar`         | `string`                       | `'MMMM YYYY'`   |                                            |
| `dayClassName`               | `func`                         |                 |                                            |
| `disabled`                   | `bool`                         | `false`         |                                            |
| `disabledKeyboardNavigation` | `bool`                         | `false`         |                                            |
| `dropdownMode` (required)    | `enum('scroll'\|'select')`     | `'scroll'`      |                                            |
| `endDate`                    | `object`                       |                 |                                            |
| `excludeDates`               | `array`                        |                 |                                            |
| `excludeTimes`               | `array`                        |                 |                                            |
| `filterDate`                 | `func`                         |                 |                                            |
| `fixedHeight`                | `bool`                         |                 |                                            |
| `forceShowMonthNavigation`   | `bool`                         |                 |                                            |
| `formatWeekNumber`           | `func`                         |                 |                                            |
| `highlightDates`             | `array`                        |                 |                                            |
| `id`                         | `string`                       |                 |                                            |
| `includeDates`               | `array`                        |                 |                                            |
| `includeTimes`               | `array`                        |                 |                                            |
| `injectTimes`                | `array`                        |                 |                                            |
| `inline`                     | `bool`                         |                 |                                            |
| `isClearable`                | `bool`                         |                 |                                            |
| `locale`                     | `string`                       |                 |                                            |
| `maxDate`                    | `object`                       |                 |                                            |
| `maxTime`                    | `object`                       |                 |                                            |
| `minDate`                    | `object`                       |                 |                                            |
| `minTime`                    | `object`                       |                 |                                            |
| `monthsShown`                | `number`                       | `1`             |                                            |
| `name`                       | `string`                       |                 |                                            |
| `onBlur`                     | `func`                         | `function() {}` |                                            |
| `onChange` (required)        | `func`                         | `function() {}` |                                            |
| `onChangeRaw`                | `func`                         |                 |                                            |
| `onClickOutside`             | `func`                         | `function() {}` |                                            |
| `onFocus`                    | `func`                         | `function() {}` |                                            |
| `onKeyDown`                  | `func`                         | `function() {}` |                                            |
| `onMonthChange`              | `func`                         | `function() {}` |                                            |
| `onYearChange`               | `func`                         | `function() {}` |                                            |
| `onSelect`                   | `func`                         | `function() {}` |                                            |
| `onWeekSelect`               | `func`                         |                 |                                            |
| `openToDate`                 | `object`                       |                 |                                            |
| `peekNextMonth`              | `bool`                         |                 |                                            |
| `placeholderText`            | `string`                       |                 |                                            |
| `popperClassName`            | `string`                       |                 |                                            |
| `popperContainer`            | `func`                         |                 |                                            |
| `popperModifiers`            | `object`                       |                 |                                            |
| `popperPlacement`            | `enumpopperPlacementPositions` |                 |                                            |
| `readOnly`                   | `bool`                         |                 |                                            |
| `required`                   | `bool`                         |                 |                                            |
| `scrollableYearDropdown`     | `bool`                         |                 |                                            |
| `selected`                   | `object`                       |                 |                                            |
| `selectsEnd`                 | `bool`                         |                 |                                            |
| `selectsStart`               | `bool`                         |                 |                                            |
| `shouldCloseOnSelect`        | `bool`                         | `true`          |                                            |
| `showMonthDropdown`          | `bool`                         |                 |                                            |
| `showTimeSelect`             | `bool`                         | `false`         |                                            |
| `showWeekNumbers`            | `bool`                         |                 |                                            |
| `showYearDropdown`           | `bool`                         |                 |                                            |
| `startDate`                  | `object`                       |                 |                                            |
| `startOpen`                  | `bool`                         |                 |                                            |
| `tabIndex`                   | `number`                       |                 |                                            |
| `timeFormat`                 | `string`                       |                 |                                            |
| `timeIntervals`              | `number`                       | `30`            |                                            |
| `title`                      | `string`                       |                 |                                            |
| `todayButton`                | `node`                         |                 |                                            |
| `useWeekdaysShort`           | `bool`                         |                 |                                            |
| `utcOffset`                  | `union(number\|string)`        |                 |                                            |
| `value`                      | `string`                       |                 |                                            |
| `weekLabel`                  | `string`                       |                 |                                            |
| `withPortal`                 | `bool`                         | `false`         |                                            |
| `yearDropdownItemNumber`     | `number`                       |                 |                                            |
