import { render } from "@testing-library/react";
import React from "react";

import DatePicker from "../";

import type { DatePickerProps } from "../index";

// see https://github.com/microsoft/TypeScript/issues/31501
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OmitUnion<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

describe("Multiple Dates Selected", function () {
  function getDatePicker(
    extraProps: Partial<
      Pick<
        DatePickerProps,
        | "selectsMultiple"
        | "shouldCloseOnSelect"
        | "disabledKeyboardNavigation"
        | "onSelect"
      >
    > &
      OmitUnion<
        DatePickerProps,
        | "selectsMultiple"
        | "onChange"
        | "shouldCloseOnSelect"
        | "disabledKeyboardNavigation"
        | "onSelect"
        | "selectsRange"
      >,
  ) {
    return render(
      <DatePicker
        selectsMultiple
        onChange={() => {}}
        shouldCloseOnSelect={false}
        disabledKeyboardNavigation
        onSelect={() => {}}
        {...extraProps}
      />,
    );
  }

  it("should handle text format for no selected date", () => {
    const { container: datePicker } = getDatePicker({
      selectsMultiple: true,
      selectedDates: [],
    });

    const input = datePicker.querySelector("input");

    expect(input).not.toBeNull();
    expect(input?.value).toBe("");
  });

  it("should handle text format for one selected date", () => {
    const { container: datePicker } = getDatePicker({
      selectsMultiple: true,
      selectedDates: [new Date("2024/01/01")],
    });

    const input = datePicker.querySelector("input");

    expect(input).not.toBeNull();
    expect(input?.value).toBe("01/01/2024");
  });

  it("should handle text format for two selected dates", () => {
    const { container: datePicker } = getDatePicker({
      selectsMultiple: true,
      selectedDates: [new Date("2024/01/01"), new Date("2024/01/15")],
    });

    const input = datePicker.querySelector("input");

    expect(input).not.toBeNull();
    expect(input?.value).toBe("01/01/2024, 01/15/2024");
  });

  it("should handle text format for more than two selected dates", () => {
    const { container: datePicker } = getDatePicker({
      selectsMultiple: true,
      selectedDates: [
        new Date("2024/01/01"),
        new Date("2024/01/15"),
        new Date("2024/03/15"),
      ],
    });

    const input = datePicker.querySelector("input");

    expect(input).not.toBeNull();
    expect(input?.value).toBe("01/01/2024 (+2)");
  });
});
