import React from "react";
import { mount } from "enzyme";
import { setTime, newDate } from "../src/date_utils";
import DatePicker from "../src/index.jsx";

describe("DatePicker", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should disable times specified in excludeTimes props", () => {
    var now = newDate();
    var datePicker = mount(
      <DatePicker
        showTimeSelect
        excludeTimes={[
          setTime(now, { hours: 17, minutes: 0 }),
          setTime(now, { hours: 18, minutes: 30 }),
          setTime(now, { hours: 19, minutes: 30 }),
          setTime(now, { hours: 17, minutes: 30 })
        ]}
      />
    );
    expect(datePicker.find(".react-datepicker__time-list-item--disabled")).to
      .exist;
  });
});
