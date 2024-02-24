import React from "react";
import DatePicker from "../src";
import TestUtils from "react-dom/test-utils";

describe("Multiple Dates Selected", function () {
  function getDatePicker(extraProps) {
    return TestUtils.renderIntoDocument(
      <DatePicker
        selectsMultiple
        onChange={() => {}}
        shouldCloseOnSelect={false}
        disabledKeyboardNavigation
        {...extraProps}
      />,
    );
  }

  it("should handle text format for two selected dates", () => {
    const datePicker = getDatePicker({
      selectsMultiple: true,
      selectedDates: [new Date("2024/01/01"), new Date("2024/01/15")],
    });

    expect(datePicker.input.value).toBe("01/01/2024, 01/15/2024");
  });

  
  it("should handle text format for more than two selected dates", () => {
    const datePicker = getDatePicker({
      selectsMultiple: true,
      selectedDates: [new Date("2024/01/01"), new Date("2024/01/15"), new Date("2024/03/15"), ],
    });

    expect(datePicker.getByRole('textbox').value).toBe("01/01/2024 (+2)");
  });
});
