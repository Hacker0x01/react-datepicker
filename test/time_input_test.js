import React from "react";
import { mount } from "enzyme";
import DatePicker from "../src/index.jsx";
import InputTimeComponent from "../src/inputTime";

describe("DatePicker", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should show time component when showTimeSelect prop is present", () => {
    const datePicker = mount(<DatePicker showTimeInput />);
    const component = datePicker.find(InputTimeComponent);
    expect(component).to.exist;
  });

  it("should have custom time caption", () => {
    const timeComponent = mount(
      <InputTimeComponent timeInputLabel="Custom time" />
    );
    const caption = timeComponent.find(".react-datepicker-time__caption");
    expect(caption.text()).to.equal("Custom time");
  });
});
