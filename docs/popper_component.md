`popper_component` (component)
==============================


| name  | type  | default value  | description  |
|---|---|---|---|
|`className`|`string`|||
|`enableTabLoop`|`bool`|||
|`hidePopper`|`bool`|`true`||
|`popperComponent`|`element`|||
|`popperContainer`|`func`|||
|`popperModifiers`|`arrayOf[object Object]`|`[
  {
    name: "flip",
    options: {
      allowedAutoPlacements: ["top", "bottom"],
      rootBoundary: "viewport",
    },
  },
  {
    name: "preventOverflow",
    options: {
      rootBoundary: "viewport",
    },
  },
]`||
|`popperOnKeyDown`|`func`|||
|`popperPlacement`|`enumpopperPlacementPositions`|`"bottom-start"`||
|`popperProps`|`object`|||
|`portalId`|`string`|||
|`targetComponent`|`element`|||
|`wrapperClassName`|`string`|||