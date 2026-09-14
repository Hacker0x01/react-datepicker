import { render } from "@testing-library/react";
import React, { useState, act } from "react";

import DatePicker from "../index";

function Fixture() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <div>
      <DatePicker id="start" selected={date} onChange={setDate} />
      <button id="outside">outside</button>
    </div>
  );
}

const openCalendars = () => document.querySelectorAll(".react-datepicker");

describe("DatePicker resetInputValue", () => {
  it("stays closed when an outside mousedown and the input blur land in the same task", () => {
    render(<Fixture />);
    const input = document.querySelector<HTMLInputElement>("#start")!;
    const outside = document.querySelector<HTMLButtonElement>("#outside")!;

    act(() => {
      input.focus();
      input.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
    });
    expect(openCalendars()).toHaveLength(1);

    // A browser dispatches the outside mousedown and the resulting input blur
    // in a single task. React has not committed setOpen(false) by the time the
    // blur handler runs, so resetInputValue must not write back a snapshot of
    // this.state: that snapshot still says open, and the calendar reopens.
    act(() => {
      outside.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
      input.dispatchEvent(new FocusEvent("focusout", { bubbles: true }));
    });

    expect(openCalendars()).toHaveLength(0);
  });
});
