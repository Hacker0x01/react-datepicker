import React, { Component } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: React.ReactNode;
  portalId: string;
  portalHost?: ShadowRoot;
}

class Portal extends Component<PortalProps> {
  private el: HTMLDivElement;
  private portalRoot!: HTMLElement | null;

  constructor(props: PortalProps) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    this.portalRoot = (this.props.portalHost || document).getElementById(
      this.props.portalId
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

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default Portal;
