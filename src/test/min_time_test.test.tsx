import { fireEvent, render } from "@testing-library/react";
import React, { useState } from "react";

import DatePicker from "../index";

const DatePickerWithState = (props) => {
  const [selected, setSelected] = useState<Date | null>(null);
  return (
    <DatePicker
      open
      selected={selected}
      onChange={(date) => {
        setSelected(date);
      }}
      showTimeSelect
      dateFormat="MM/dd/yyyy HH:mm"
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

  it("should select time from input instead of minimum allowable time when time is typed in", () => {
    const minTime = new Date("2023-03-10 13:00");
    const maxTime = new Date("2023-03-10 18:00");

    const { container } = render(
      <DatePickerWithState minTime={minTime} maxTime={maxTime} />,
    );
    const input = container.querySelector("input") ?? new HTMLInputElement();
    fireEvent.change(input, { target: { value: "2023-03-10 16:00" } });
    fireEvent.focusOut(input);

    expect(input.value).toEqual("03/10/2023 16:00");
  });
});
