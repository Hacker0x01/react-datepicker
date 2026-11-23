import React, { useState } from "react";
import { fireEvent, render } from "@testing-library/react";

import DatePicker from "../index";

function ControlledRange({ open }: { open: boolean }) {
  const [range, setRange] = useState<[Date | null, Date | null]>([
    new Date(2026, 0, 10),
    new Date(2026, 0, 12),
  ]);
  return (
    <>
      <button
        onClick={() => setRange([new Date(2026, 3, 10), new Date(2026, 3, 12)])}
      >
        Set April range
      </button>
      <DatePicker
        open={open}
        selectsRange
        monthsShown={2}
        startDate={range[0]}
        endDate={range[1]}
        onChange={setRange}
      />
    </>
  );
}

it.each([false, true])(
  "anchors a reopened controlled range at its start month (external change: %s)",
  (externalChange) => {
    const { container, rerender, getByText } = render(<ControlledRange open />);
    const months = () =>
      Array.from(
        container.querySelectorAll(".react-datepicker__current-month"),
        (node) => node.textContent,
      );
    const selectSecondMonthDay = (day: number) => {
      const panel = container.querySelectorAll(
        ".react-datepicker__month-container",
      )[1]!;
      const target = Array.from(
        panel.querySelectorAll(
          ".react-datepicker__day:not(.react-datepicker__day--outside-month)",
        ),
      ).find((node) => node.textContent === String(day));
      expect(target).toBeDefined();
      fireEvent.click(target!);
    };
    expect(months()).toEqual(["January 2026", "February 2026"]);
    selectSecondMonthDay(10);
    // Completing the range must not move the second panel during selection.
    expect(months()).toEqual(["January 2026", "February 2026"]);
    selectSecondMonthDay(15);
    expect(months()).toEqual(["January 2026", "February 2026"]);
    rerender(<ControlledRange open={false} />);
    expect(container.querySelector(".react-datepicker")).toBeNull();
    if (externalChange) fireEvent.click(getByText("Set April range"));
    rerender(<ControlledRange open />);
    expect(months()).toEqual(
      externalChange
        ? ["April 2026", "May 2026"]
        : ["February 2026", "March 2026"],
    );
    expect(container.querySelector("input")?.value).toBe(
      externalChange ? "04/10/2026 - 04/12/2026" : "02/10/2026 - 02/15/2026",
    );
  },
);

it("restores the range start after navigating a controlled calendar without selecting", () => {
  const { container, rerender, getByRole } = render(<ControlledRange open />);
  const months = () =>
    Array.from(
      container.querySelectorAll(".react-datepicker__current-month"),
      (node) => node.textContent,
    );
  fireEvent.click(getByRole("button", { name: "Next Month" }));
  expect(months()).toEqual(["February 2026", "March 2026"]);
  rerender(<ControlledRange open={false} />);
  rerender(<ControlledRange open />);
  expect(months()).toEqual(["January 2026", "February 2026"]);
  expect(container.querySelector("input")?.value).toBe(
    "01/10/2026 - 01/12/2026",
  );
});
