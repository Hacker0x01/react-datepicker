import React from "react";
import { mount } from "enzyme";
import DatePicker from "../src/index.jsx";
import TimeComponent from "../src/time";

describe("DatePicker", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should show time component when showTimeSelect prop is present", () => {
    var datePicker = mount(<DatePicker showTimeSelect />);
    var timeComponent = datePicker.find(TimeComponent);
    expect(timeComponent).to.exist;
  });

  it("should have custom time caption", () => {
    const timeComponent = mount(<TimeComponent timeCaption="Custom time" />);

    const caption = timeComponent.find(".react-datepicker-time__header");
    expect(caption.text()).to.equal("Custom time");
  });
});
