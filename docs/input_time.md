# `input_time` (component)

`InputTime` is a React component that manages time input.

@component
@example
<InputTime timeString="12:00" />

@param props - The properties that define the `InputTime` component.
@param props.onChange - Function that is called when the date changes.
@param props.date - The initial date value.
@param props.timeString - The initial time string value.
@param props.timeInputLabel - The label for the time input.
@param props.customTimeInput - An optional custom time input element.

@returns The `InputTime` component.

| name              | type | default value | description |
| ----------------- | ---- | ------------- | ----------- |
| `customTimeInput` |      |               |             |
| `date`            |      |               |             |
| `onChange`        |      |               |             |
| `timeInputLabel`  |      |               |             |
| `timeString`      |      |               |             |
