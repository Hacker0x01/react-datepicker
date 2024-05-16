import { findDOMNode } from "react-dom";

declare module "react-onclickoutside" {
  interface WrapperInstance<P, C> {
    componentNode: ReturnType<typeof findDOMNode>;
  }
}
