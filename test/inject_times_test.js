import React from "react";
import { mount } from "enzyme";
import * as utils from "../src/date_utils";
import { setTime, cloneDate, newDate } from "../src/date_utils";
import TimeComponent from "../src/time";

function cloneDateWithTime(date, time) {
  return setTime(cloneDate(date), time);
}

describe("TimeComponent", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should show times specified in injectTimes props", () => {
    const today = utils.getStartOfDay(utils.newDate());
    const timeComponent = mount(
      <TimeComponent
        injectTimes={[
          utils.addMinutes(cloneDate(today), 1),
          utils.addMinutes(cloneDate(today), 725),
          utils.addMinutes(cloneDate(today), 1439)
        ]}
      />
    );

    const disabledItems = timeComponent.find(
      ".react-datepicker__time-list-item--injected"
    );
    expect(disabledItems).to.have.length(3);
  });

  it("should not affect existing time intervals", () => {
    const today = utils.getStartOfDay(utils.newDate());
    const timeComponent = mount(
      <TimeComponent
        timeIntervals={60}
        injectTimes={[
          utils.addMinutes(cloneDate(today), 0),
          utils.addMinutes(cloneDate(today), 60),
          utils.addMinutes(cloneDate(today), 1440)
        ]}
      />
    );

    const disabledItems = timeComponent.find(
      ".react-datepicker__time-list-item--injected"
    );
    expect(disabledItems).to.have.length(0);
  });
});
