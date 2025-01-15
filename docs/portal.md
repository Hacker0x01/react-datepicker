# `portal` (component)

`Portal` is a React component that allows you to render children into a DOM node
that exists outside the DOM hierarchy of the parent component.

@class
@param {PortalProps} props - The properties that define the `Portal` component.
@property {React.ReactNode} props.children - The children to be rendered into the `Portal`.
@property {string} props.portalId - The id of the DOM node into which the `Portal` will render.
@property {ShadowRoot} [props.portalHost] - The DOM node to host the `Portal`.

| name                  | type | default value | description |
| --------------------- | ---- | ------------- | ----------- |
| `children` (required) |      |               |             |
| `portalHost`          |      |               |             |
| `portalId` (required) |      |               |             |
