# `tab_loop` (component)

`TabLoop` is a React component that manages tabbing behavior for its children.

TabLoop prevents the user from tabbing outside of the popper
It creates a tabindex loop so that "Tab" on the last element will focus the first element
and "Shift Tab" on the first element will focus the last element

@component
@example
<TabLoop enableTabLoop={true}>
<ChildComponent />
</TabLoop>

@param props - The properties that define the `TabLoop` component.
@param props.children - The child components.
@param props.enableTabLoop - Whether to enable the tab loop.

@returns The `TabLoop` component.

| name            | type | default value | description |
| --------------- | ---- | ------------- | ----------- |
| `enableTabLoop` |      | `true`        |             |
