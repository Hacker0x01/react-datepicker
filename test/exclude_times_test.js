import React from "react";
import { mount } from "enzyme";
import { setTime, cloneDate, newDate } from "../src/date_utils";
import DatePicker from "../src/index.jsx";

function cloneDateWithTime(date, time) {
  return setTime(cloneDate(date), time);
}

describe("DatePicker", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
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
          cloneDateWithTime(now, { hours: 17, minutes: 0 }),
          cloneDateWithTime(now, { hours: 18, minutes: 30 }),
          cloneDateWithTime(now, { hours: 19, minutes: 30 }),
          cloneDateWithTime(now, { hours: 17, minutes: 30 })
        ]}
      />
    );
    expect(datePicker.find(".react-datepicker__time-list-item--disabled")).to
      .exist;
  });
});
