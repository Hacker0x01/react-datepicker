import React from "react";
import { mount } from "enzyme";
import { getHours } from "../src/date_utils";
import TimeComponent from "../src/time";

describe("TimeComponent", () => {
  it("should disable times matched by filterTime prop", () => {
    const timeComponent = mount(
      <TimeComponent filterTime={(time) => getHours(time) !== 17} />,
    );

    expect(
      timeComponent.find(".react-datepicker__time-list-item--disabled"),
    ).toHaveLength(2);
  });
});
