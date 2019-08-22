import React from "react";
import PropTypes from "prop-types";

class CustomInput extends React.Component {
  onChange = e => {
    var args = [e, e.target.value];
    if (this.props.onChangeArgs) {
      args = this.props.onChangeArgs(e);
    }
    this.props.onChange.apply(this, args);
  };

  render() {
    let { ...props } = this.props;
    delete props.onChangeArgs;
    return <input {...props} onChange={this.onChange} />;
  }
}

CustomInput.propTypes = {
  onChange: PropTypes.func,
  onChangeArgs: PropTypes.func
};

export default CustomInput;
