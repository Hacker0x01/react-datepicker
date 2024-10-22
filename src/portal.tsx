import { Component } from "react";
import ReactDOM from "react-dom";

import type React from "react";

interface PortalProps {
  children: React.ReactNode;
  portalId: string;
  portalHost?: ShadowRoot;
}

/**
 * `Portal` is a React component that allows you to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 *
 * @class
 * @param {PortalProps} props - The properties that define the `Portal` component.
 * @property {React.ReactNode} props.children - The children to be rendered into the `Portal`.
 * @property {string} props.portalId - The id of the DOM node into which the `Portal` will render.
 * @property {ShadowRoot} [props.portalHost] - The DOM node to host the `Portal`.
 */
class Portal extends Component<PortalProps> {
  constructor(props: PortalProps) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    this.portalRoot = (this.props.portalHost || document).getElementById(
      this.props.portalId,
    );
    if (!this.portalRoot) {
      this.portalRoot = document.createElement("div");
      this.portalRoot.setAttribute("id", this.props.portalId);
      (this.props.portalHost || document.body).appendChild(this.portalRoot);
    }
    this.portalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    if (this.portalRoot) {
      this.portalRoot.removeChild(this.el);
    }
  }

  private el: HTMLDivElement;
  private portalRoot: HTMLElement | null = null;

  render(): React.ReactPortal {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default Portal;
