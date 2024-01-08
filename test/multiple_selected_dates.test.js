import React from "react";
import DatePicker from "../src";
import { mount } from "enzyme";
import TestUtils from "react-dom/test-utils";

function getSelectedDaysNode(datePicker) {
  return datePicker.calendar.componentNode.querySelectorAll(
    '.react-datepicker__day[tabindex="0"]',
  );
}

function findSelectedDays(datePicker, targetDate) {
  const days = TestUtils.scryRenderedComponentsWithType(datePicker, Day);
  return days.filter(
    (d) =>
      utils.formatDate(d.props.day, "yyyy-MM-dd") ===
      utils.formatDate(targetDate, "yyyy-MM-dd"),
  );
}

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

  it("should handle text format for multiple selections", () => {
    const datePicker = getDatePicker({
      selectsMultiple: true,
      selectedDates: [new Date("2024/01/01"), new Date("2024/01/15")],
    });

    expect(datePicker.input.value).toBe("01/01/2024, 01/15/2024");
  });

  it("should have multiple highlighted days", () => {
    const datePicker = getDatePicker({
      selectedDates: [new Date("2024/01/01"), new Date("2024/01/15")],
    });
  });
});
