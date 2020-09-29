import React from "react";
import { mount } from "enzyme";
import { getHours } from "../src/date_utils";
import DatePicker from "../src/index.jsx";
import TimeComponent from "../src/time";

describe("TimeComponent", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should disable times matched by filterTime prop", () => {
    const timeComponent = mount(
      <TimeComponent
        filterTime={time => getHours(time) !== 17}
      />
    );

    expect(timeComponent.find(".react-datepicker__time-list-item--disabled"))
      .to.have.length(2);
  });
});
