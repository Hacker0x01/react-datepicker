# `time` (component)

| name                 | type                   | default value | description |
| -------------------- | ---------------------- | ------------- | ----------- |
| `excludeTimes`       | `array`                |               |             |
| `filterTime`         | `func`                 |               |             |
| `format`             | `string`               |               |             |
| `includeTimes`       | `array`                |               |             |
| `injectTimes`        | `array`                |               |             |
| `intervals`          | `number`               | `30`          |             |
| `locale`             | `union(string\|shape)` |               |             |
| `maxTime`            | `instanceOfDate`       |               |             |
| `minTime`            | `instanceOfDate`       |               |             |
| `monthRef`           | `object`               |               |             |
| `onChange`           | `func`                 |               |             |
| `onTimeChange`       |                        | `() => {}`    |             |
| `openToDate`         | `instanceOfDate`       |               |             |
| `selected`           | `instanceOfDate`       |               |             |
| `showTimeSelectOnly` | `bool`                 |               |             |
| `timeCaption`        | `string`               | `"Time"`      |             |
| `timeClassName`      | `func`                 |               |             |
| `todayButton`        | `node`                 | `null`        |             |
