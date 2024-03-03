import React, { useState } from "react";
import DatePicker from "../src/index.jsx";
import { fireEvent, render } from "@testing-library/react";

const DatePickerWithState = (props) => {
  const [selected, setSelected] = useState(null);
  return (
    <DatePicker
      open
      selected={selected}
      onChange={(date) => {
        setSelected(date);
      }}
      showTimeSelect
      {...props}
    />
  );
};

describe("Datepicker minTime", () => {
  it("should select time 12:00 AM when no minTime constraint is set.", () => {
    const { getByText, container } = render(<DatePickerWithState />);

    const day = container.getElementsByClassName("react-datepicker__day")[0];

    fireEvent.click(day);

    const selectedTime = getByText("12:00 AM");

    expect(selectedTime.getAttribute("aria-selected")).toBe("true");
  });

  it("should select the minimum allowable time upon choosing a day.", () => {
    const minTime = new Date("2023-03-10 13:00");
    const maxTime = new Date("2023-03-10 18:00");

    const { container, getByText } = render(
      <DatePickerWithState minTime={minTime} maxTime={maxTime} />,
    );

    const day = container.getElementsByClassName("react-datepicker__day")[0];

    fireEvent.click(day);

    const selectedTime = getByText("1:00 PM");

    expect(selectedTime.getAttribute("aria-selected")).toBe("true");
  });
});
