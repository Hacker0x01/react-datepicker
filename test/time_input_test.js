import React from "react";
import { mount, shallow } from "enzyme";
import DatePicker from "../src/index.jsx";
import InputTimeComponent from "../src/inputTime";
import PropTypes from "prop-types";

describe("timeInput", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
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

  it("should trigger onChange event", () => {
    const timeComponent = shallow(
      <InputTimeComponent onChange={console.log} />
    );
    const input = timeComponent.find("input");
    input.simulate("change", { target: { value: "13:00" } });
    expect(timeComponent.state("time")).to.equal("13:00");
  });

  it("should trigger onChange event and set the value as last valid timeString if empty string is passed as time input value", () => {
    const timeComponent = shallow(
      <InputTimeComponent timeString="13:00" onChange={console.log} />
    );
    const input = timeComponent.find("input");
    input.simulate("change", { target: { value: "" } });
    expect(timeComponent.state("time")).to.equal("13:00");
  });

  it("should trigger onChange event on a custom time input without using the last valid timeString", () => {
    const CustomTimeInputComponent = ({ onChange, value }) => (
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ border: "solid 1px pink" }}
      />
    );

    CustomTimeInputComponent.propTypes = {
      onChange: PropTypes.func,
      value: PropTypes.string
    };

    const timeComponent = shallow(
      <InputTimeComponent
        timeString="13:00"
        onChange={console.log}
        customTimeInput={<CustomTimeInputComponent />}
      />
    );

    const input = timeComponent.find("CustomTimeInputComponent");
    input.simulate("change", "14:00");
    expect(timeComponent.state("time")).to.equal("14:00");
  });
});
