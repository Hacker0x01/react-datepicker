import React from "react";
import { mount } from "enzyme";

import PopperComponent from "../src/popper_component.jsx";

describe("PopperComponent", () => {
  it("should render child inside PopperComponent and provide scheduleUpdate prop", () => {
    const ChildComponent = () => <div />;

    const wrapper = mount(
      <PopperComponent
        hidePopper={false}
        popperComponent={<ChildComponent testProperty="testValue" />}
      />
    );

    const childNode = wrapper.find(ChildComponent);

    expect(childNode.length).to.equal(1);
    expect(childNode.prop("testProperty")).to.equal("testValue");
    expect(typeof childNode.prop("scheduleUpdate")).to.equal("function");
  });
});
