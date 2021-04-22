# `datepicker` (component)

General datepicker component.

| name                         | type                           | default value   | description                                |
| ---------------------------- | ------------------------------ | --------------- | ------------------------------------------ |
| `allowSameDay`               | `bool`                         | `false`         |                                            |
| `ariaDescribedBy`            | `string`                       | `null`          |                                            |
| `ariaInvalid`                | `string`                       | `null`          |                                            |
| `ariaLabelledBy`             | `string`                       | `null`          |                                            |
| `ariaRequired`               | `string`                       | `null`          |                                            |
| `autoComplete`               | `string`                       |                 |                                            |
| `autoFocus`                  | `bool`                         |                 |                                            |
| `calendarClassName`          | `string`                       |                 |                                            |
| `children`                   | `node`                         |                 |                                            |
| `className`                  | `string`                       |                 |                                            |
| `clearButtonTitle`           | `string`                       |                 |                                            |
| `clearButtonClassName`       | `string`                       |                 | Customize the clear button                 |
| `customInput`                | `element`                      |                 |                                            |
| `customInputRef`             | `string`                       | `'ref'`         | The property used to pass the ref callback |
| `dateFormat`                 | `union(string\|array)`         | `'MM/dd/yyyy'`  |                                            |
| `dateFormatCalendar`         | `string`                       | `'LLLL yyyy'`   |                                            |
| `dayClassName`               | `func`                         |                 |                                            |
| `weekDayClassName`           | `func`                         |                 |                                            |
| `disabled`                   | `bool`                         | `false`         |                                            |
| `disabledKeyboardNavigation` | `bool`                         | `false`         |                                            |
| `dropdownMode` (required)    | `enum('scroll'\|'select')`     | `'scroll'`      |                                            |
| `endDate`                    | `instanceOf(Date)`             |                 |                                            |
| `excludeDates`               | `array`                        |                 |                                            |
| `excludeTimes`               | `array`                        |                 |                                            |
| `excludeScrollbar`           | `array`                        |                 |                                            |
| `filterDate`                 | `func`                         |                 |                                            |
| `filterTime`                 | `func`                         |                 |                                            |
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
| `maxDate`                    | `instanceOf(Date)`             |                 |                                            |
| `maxTime`                    | `instanceOf(Date)`             |                 |                                            |
| `minDate`                    | `instanceOf(Date)`             |                 |                                            |
| `minTime`                    | `instanceOf(Date)`             |                 |                                            |
| `monthsShown`                | `number`                       | `1`             |                                            |
| `name`                       | `string`                       |                 |                                            |
| `onBlur`                     | `func`                         | `function() {}` |                                            |
| `onCalendarClose`            | `func`                         |                 |                                            |
| `onCalendarOpen`             | `func`                         |                 |                                            |
| `onChange` (required)        | `func`                         | `function() {}` |                                            |
| `onChangeRaw`                | `func`                         |                 |                                            |
| `onClickOutside`             | `func`                         | `function() {}` |                                            |
| `onFocus`                    | `func`                         | `function() {}` |                                            |
| `onKeyDown`                  | `func`                         | `function() {}` |                                            |
| `onMonthChange`              | `func`                         | `function() {}` |                                            |
| `onSelect`                   | `func`                         | `function() {}` |                                            |
| `onWeekSelect`               | `func`                         |                 |                                            |
| `onYearChange`               | `func`                         | `function() {}` |                                            |
| `openToDate`                 | `instanceOf(Date)`             |                 |                                            |
| `peekNextMonth`              | `bool`                         |                 |                                            |
| `placeholderText`            | `string`                       |                 |                                            |
| `popperClassName`            | `string`                       |                 |                                            |
| `popperContainer`            | `func`                         |                 |                                            |
| `popperModifiers`            | `object`                       |                 |                                            |
| `popperPlacement`            | `enumpopperPlacementPositions` |                 |                                            |
| `preventOpenOnFocus`         | `bool`                         | false           | When this is true, the datepicker will not automatically open when the date field is focussed |
| `readOnly`                   | `bool`                         |                 |                                            |
| `required`                   | `bool`                         |                 |                                            |
| `scrollableYearDropdown`     | `bool`                         |                 |                                            |
| `selected`                   | `instanceOf(Date)`             |                 |                                            |
| `selectsEnd`                 | `bool`                         |                 |                                            |
| `selectsStart`               | `bool`                         |                 |                                            |
| `shouldCloseOnSelect`        | `bool`                         | `true`          |                                            |
| `showMonthDropdown`          | `bool`                         |                 |                                            |
| `showTimeSelect`             | `bool`                         | `false`         |                                            |
| `showWeekNumbers`            | `bool`                         |                 |                                            |
| `showYearDropdown`           | `bool`                         |                 |                                            |
| `startDate`                  | `instanceOf(Date)`             |                 |                                            |
| `startOpen`                  | `bool`                         |                 |                                            |
| `tabIndex`                   | `number`                       |                 |                                            |
| `timeClassName`              | `func`                         |                 |                                            |
| `timeFormat`                 | `string`                       |                 |                                            |
| `timeIntervals`              | `number`                       | `30`            |                                            |
| `title`                      | `string`                       |                 |                                            |
| `todayButton`                | `node`                         |                 |                                            |
| `useWeekdaysShort`           | `bool`                         |                 |                                            |
| `utcOffset`                  | `union(number\|string)`        |                 |                                            |
| `value`                      | `string`                       |                 |                                            |
| `weekLabel`                  | `string`                       |                 |                                            |
| `withPortal`                 | `bool`                         | `false`         |                                            |
| `wrapperClassName`           | `string`                       |                 
|                                            |
| `yearItemNumber`             | `number`                       | `12`            |                                            |
| `yearDropdownItemNumber`     | `number`                       |                 |                                            |
