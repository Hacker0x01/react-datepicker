import React, { useState, useRef, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomInput from "./CustomInput";

/**
 * cd ../../ && yarn dev:start
 */

function App() {
  const inputRef = useRef(null);

  const [date, setDate] = useState("");
  const [selected, setSelected] = useState(null);
  const [value, setValue] = useState("");

  const onChange = async (e) => {
    const selectionStart = inputRef.current?.input.selectionStart || 0;
    setDate(e.target.value);
    // added inputRef emit focus
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.input.setSelectionRange(
          selectionStart,
          selectionStart
        );
      }
    }, 0);
  };

  const changeDateHandler = (e) => {
    setSelected(e);
  };

  return (
    <div className="App">
      <DatePicker
        customInput={
          <CustomInput
            onClick={changeDateHandler}
            inputRef={inputRef}
            onChange={onChange}
            value={value}
          />
        }
        onChange={changeDateHandler}
        selected={selected}
        required
        locale="ru"
        value={date}
        showYearDropdown
        showMonthDropdown
        scrollableYearDropdown
      />
    </div>
  );
}
App.displayName = "App";

export default App;
