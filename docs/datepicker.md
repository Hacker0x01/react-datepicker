`datepicker` (component)
========================

General datepicker component.

Props
-----

### `autoComplete`

type: `string`


### `autoFocus`

type: `bool`


### `calendarClassName`

type: `string`


### `children`

type: `node`


### `className`

type: `string`


### `customInput`

type: `element`


### `dateFormat`

type: `union(string|array)`
defaultValue: `'L'`


### `dateFormatCalendar`

type: `string`
defaultValue: `'MMMM YYYY'`


### `disabled`

type: `bool`
defaultValue: `false`


### `disabledKeyboardNavigation`

type: `bool`
defaultValue: `false`


### `dropdownMode` (required)

type: `enum('scroll'|'select')`
defaultValue: `'scroll'`


### `endDate`

type: `object`


### `excludeDates`

type: `array`


### `filterDate`

type: `func`


### `fixedHeight`

type: `bool`


### `forceShowMonthNavigation`

type: `bool`


### `highlightDates`

type: `array`


### `id`

type: `string`


### `includeDates`

type: `array`


### `inline`

type: `bool`


### `isClearable`

type: `bool`


### `locale`

type: `string`


### `maxDate`

type: `object`


### `minDate`

type: `object`


### `monthsShown`

type: `number`
defaultValue: `1`


### `name`

type: `string`


### `onBlur`

type: `func`
defaultValue: `function() {}`


### `onChange` (required)

type: `func`
defaultValue: `function() {}`


### `onChangeRaw`

type: `func`


### `onClickOutside`

type: `func`
defaultValue: `function() {}`


### `onFocus`

type: `func`
defaultValue: `function() {}`


### `onMonthChange`

type: `func`
defaultValue: `function() {}`


### `onSelect`

type: `func`
defaultValue: `function() {}`


### `openToDate`

type: `object`


### `peekNextMonth`

type: `bool`


### `placeholderText`

type: `string`


### `popoverAttachment`

type: `string`
defaultValue: `'top left'`


### `popoverTargetAttachment`

type: `string`
defaultValue: `'bottom left'`


### `popoverTargetOffset`

type: `string`
defaultValue: `'10px 0'`


### `readOnly`

type: `bool`


### `renderCalendarTo`

type: `any`


### `required`

type: `bool`


### `scrollableYearDropdown`

type: `bool`


### `selected`

type: `object`


### `selectsEnd`

type: `bool`


### `selectsStart`

type: `bool`


### `showMonthDropdown`

type: `bool`


### `showWeekNumbers`

type: `bool`


### `showYearDropdown`

type: `bool`


### `startDate`

type: `object`


### `tabIndex`

type: `number`


### `tetherConstraints`

type: `array`
defaultValue: `[
  {
    to: 'window',
    attachment: 'together'
  }
]`


### `title`

type: `string`


### `todayButton`

type: `string`


### `utcOffset`

type: `number`
defaultValue: `moment().utcOffset()`


### `value`

type: `string`


### `withPortal`

type: `bool`
defaultValue: `false`

