import React from "react";
import { mount } from "enzyme";
import { setTime, newDate } from "../src/date_utils";
import DatePicker from "../src/index.jsx";

describe("DatePicker", () => {
  it("should disable times specified in excludeTimes props", () => {
    var now = newDate();
    var datePicker = mount(
      <DatePicker
        open
        showTimeSelect
        excludeTimes={[
          setTime(now, { hour: 17, minute: 0 }),
          setTime(now, { hour: 18, minute: 30 }),
          setTime(now, { hour: 19, minute: 30 }),
          setTime(now, { hour: 17, minute: 30 }),
        ]}
      />,
    );
    expect(
      datePicker.find(".react-datepicker__time-list-item--disabled"),
    ).toHaveLength(4);
  });
});
