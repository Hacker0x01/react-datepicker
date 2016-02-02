import React from "react";
import TetherElement from "react-tether";

var Popover = React.createClass({
  displayName: "Popover",

  propTypes: {
    target: React.PropTypes.object.isRequired,
    attachment: React.PropTypes.string,
    targetAttachment: React.PropTypes.string,
    targetOffset: React.PropTypes.string,
    constraints: React.PropTypes.array
  },

  getDefaultProps() {
    return {
      attachment: "top left",
      constraints: [
        {
          to: "window",
          attachment: "together"
        }
      ],
      targetAttachment: "bottom left",
      targetOffset: "10px 0"
    };
  },

  render() {
    return (
      <TetherElement
        target={this.props.target}
        options={{
          classPrefix: "datepicker__tether",
          attachment: this.props.attachment,
          targetAttachment: this.props.targetAttachment,
          targetOffset: this.props.targetOffset,
          constraints: this.props.constraints
        }}>
        {this.props.children}
      </TetherElement>
    );
  }
});

module.exports = Popover;
