import type { findDOMNode } from "react-dom";

declare module "react-onclickoutside" {
  // eslint-disable-next-line unused-imports/no-unused-vars
  interface WrapperInstance<P, C> {
    componentNode: ReturnType<typeof findDOMNode>;
  }
}
