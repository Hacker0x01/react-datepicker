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

    const injectedItems = timeComponent.find(
      ".react-datepicker__time-list-item--injected"
    );
    expect(injectedItems).to.have.length(3);
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

    const injectedItems = timeComponent.find(
      ".react-datepicker__time-list-item--injected"
    );
    expect(injectedItems).to.have.length(0);
  });

  it("should allow multiple injected times per interval", () => {
    const today = utils.getStartOfDay(utils.newDate());
    const timeComponent = mount(
      <TimeComponent
        timeIntervals={60}
        injectTimes={[
          utils.addMinutes(cloneDate(today), 1),
          utils.addMinutes(cloneDate(today), 2),
          utils.addMinutes(cloneDate(today), 3)
        ]}
      />
    );

    const injectedItems = timeComponent.find(
      ".react-datepicker__time-list-item--injected"
    );
    expect(injectedItems).to.have.length(3);
  });

  it("should sort injected times automatically", () => {
    const today = utils.getStartOfDay(utils.newDate());
    const timeComponent = mount(
      <TimeComponent
        timeIntervals={60}
        injectTimes={[
          utils.addMinutes(cloneDate(today), 3),
          utils.addMinutes(cloneDate(today), 1),
          utils.addMinutes(cloneDate(today), 2)
        ]}
      />
    );

    const injectedItems = timeComponent.find(
      ".react-datepicker__time-list-item--injected"
    );
    expect(injectedItems.map(node => node.text())).eql([
      "12:01 AM",
      "12:02 AM",
      "12:03 AM"
    ]);
  });
});
