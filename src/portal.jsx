import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

export default class Portal extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    portalId: PropTypes.string,
    portalHost: PropTypes.instanceOf(ShadowRoot),
  };

  constructor(props) {
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
    this.portalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
