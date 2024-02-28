import React from "react";
import DatePicker from "../src";
import { render } from "@testing-library/react";

describe("Multiple Dates Selected", function () {
  function getDatePicker(extraProps) {
    return render(
      <DatePicker
        selectsMultiple
        onChange={() => {}}
        shouldCloseOnSelect={false}
        disabledKeyboardNavigation
        {...extraProps}
      />,
    );
  }

  it("should handle text format for no selected date", () => {
    const datePicker = getDatePicker({
      selectsMultiple: true,
      selectedDates: [],
    });

    expect(datePicker.getByRole("textbox").value).toBe("");
  });

  it("should handle text format for one selected date", () => {
    const datePicker = getDatePicker({
      selectsMultiple: true,
      selectedDates: [new Date("2024/01/01")],
    });

    expect(datePicker.getByRole("textbox").value).toBe("01/01/2024");
  });

  it("should handle text format for two selected dates", () => {
    const datePicker = getDatePicker({
      selectsMultiple: true,
      selectedDates: [new Date("2024/01/01"), new Date("2024/01/15")],
    });

    expect(datePicker.getByRole("textbox").value).toBe(
      "01/01/2024, 01/15/2024",
    );
  });

  it("should handle text format for more than two selected dates", () => {
    const datePicker = getDatePicker({
      selectsMultiple: true,
      selectedDates: [
        new Date("2024/01/01"),
        new Date("2024/01/15"),
        new Date("2024/03/15"),
      ],
    });

    expect(datePicker.getByRole("textbox").value).toBe("01/01/2024 (+2)");
  });
});
