import propTypes from "prop-types";
import React, { forwardRef, useEffect, useState } from "react";
import MaskedInput from "react-maskedinput";

const CustomInput = forwardRef(
  ({ onChange, inputRef, value, onClick }, ref) => {
    const [state, setState] = useState({
      value,
    });

    useEffect(() => {
      setState({
        value,
      });
    }, []);

    return (
      <div>
        {/** inputRef to input */}
        <MaskedInput
          mask="11.11.1111"
          type="tel"
          value={state.value}
          ref={inputRef}
          placeholder="dd.mm.YYYY"
          onChange={onChange}
        />
        {/** ref to button */}
        <button ref={ref} onClick={onClick} type="submit">
          click
        </button>
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

CustomInput.propTypes = {
  value: propTypes.string,
  onChange: propTypes.func,
  onClick: propTypes.func,
  inputRef: propTypes.object,
};

export default CustomInput;
