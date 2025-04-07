import { fireEvent, render } from "@testing-library/react";
import React, { useState } from "react";

import DatePicker from "../index";

import { safeQuerySelector, setupMockResizeObserver } from "./test_utils";

import type { DatePickerProps } from "../index";

// see https://github.com/microsoft/TypeScript/issues/31501
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OmitUnion<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

const DatePickerWithState = (
  props: Partial<
    Pick<DatePickerProps, "open" | "selected" | "showTimeSelect" | "dateFormat">
  > &
    OmitUnion<
      DatePickerProps,
      | "open"
      | "selected"
      | "onChange"
      | "showTimeSelect"
      | "dateFormat"
      | "selectsRange"
      | "selectsMultiple"
      | "onSelect"
    >,
) => {
  const [selected, setSelected] = useState<Date | null>(null);
  return (
    <DatePicker
      open
      selected={selected}
      onChange={(date: Date | null) => {
        setSelected(date);
      }}
      showTimeSelect
      dateFormat="MM/dd/yyyy HH:mm"
      onSelect={() => {}}
      {...props}
    />
  );
};

describe("Datepicker minTime", () => {
  beforeAll(() => {
    setupMockResizeObserver();
  });

  it("should select time 12:00 AM when no minTime constraint is set.", () => {
    const { getByText, container } = render(<DatePickerWithState />);

    const day = container.getElementsByClassName("react-datepicker__day")[0]!;

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

    const day = container.getElementsByClassName("react-datepicker__day")[0]!;

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
    const input = safeQuerySelector<HTMLInputElement>(container, "input");
    fireEvent.change(input, { target: { value: "03/10/2023 16:00" } });
    fireEvent.focusOut(input);

    expect(input.value).toEqual("03/10/2023 16:00");
  });
});
