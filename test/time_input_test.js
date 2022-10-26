import React from "react";
import defer from "lodash/defer";
import { mount, shallow } from "enzyme";
import DatePicker from "../src/index.jsx";
import InputTimeComponent from "../src/inputTime";
import CustomTimeInput from "./helper_components/custom_time_input";
import { newDate } from "../src/date_utils.js";

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

  xit("should trigger onChange event", () => {
    const timeComponent = shallow(
      <InputTimeComponent onChange={console.log} />
    );
    const input = timeComponent.find("input");
    input.simulate("change", { target: { value: "13:00" } });
    expect(timeComponent.state("time")).to.equal("13:00");
  });

  it("should trigger onChange event (with seconds)", () => {
    const onChangeSecondsSpy = sandbox.spy();
    const timeComponent = shallow(
      <InputTimeComponent
        timeString="12:00:00"
        timeInputSeconds
        onChange={onChangeSecondsSpy}
      />
    );
    const input = timeComponent.find("input");
    input.simulate("change", { target: { value: "13:00:01" } });
    assert(
      onChangeSecondsSpy.called === true,
      "should call InputTimeComponent onChange"
    );
  });

  it("should send updated time in onChange event (with seconds)", () => {
    const onChangeSecondsSpy = sandbox.spy();
    const timeComponent = mount(
      <InputTimeComponent
        timeString="12:00:00"
        timeInputSeconds
        onChange={onChangeSecondsSpy}
      />
    );
    let input = timeComponent.find("input");
    input.simulate("change", { target: { value: "13:00:01" } });
    // The onChange inside InputTimeComponent creates a Date() object and returns it.
    // We want to pull out the hours:minutes:seconds out of that date object to see if it matches.
    const newDate = onChangeSecondsSpy.getCall(0).args[0];
    const dateCompare =
      newDate.getHours().toString().padStart(2, "0") +
      ":" +
      newDate.getMinutes().toString().padStart(2, "0") +
      ":" +
      newDate.getSeconds().toString().padStart(2, "0");
    expect(dateCompare).to.equal("13:00:01");
  });

  it("should trigger onChange event and set the value as last valid timeString if empty string is passed as time input value", () => {
    const timeComponent = shallow(
      <InputTimeComponent timeString="13:00" onChange={console.log} />
    );
    const input = timeComponent.find("input");
    input.simulate("change", { target: { value: "" } });
    expect(timeComponent.state("time")).to.equal("13:00");
  });

  xit("should trigger onChange event on a custom time input without using the last valid timeString", () => {
    const timeComponent = shallow(
      <InputTimeComponent
        timeString="13:00"
        onChange={console.log}
        customTimeInput={<CustomTimeInput />}
      />
    );

    const input = timeComponent.find("CustomTimeInput");
    input.simulate("change", "14:00");
    expect(timeComponent.state("time")).to.equal("14:00");
  });

  it("should pass pure Date to custom time input", (done) => {
    const onTimeChangeSpy = sandbox.spy();
    const timeComponent = mount(
      <InputTimeComponent
        date={new Date()}
        timeString="13:00"
        onChange={console.log}
        customTimeInput={<CustomTimeInput onTimeChange={onTimeChangeSpy} />}
      />
    );

    const input = timeComponent.find("CustomTimeInput");
    input.simulate("change", "14:00");

    defer(() => {
      assert(
        onTimeChangeSpy.called === true,
        "should call CustomTimeInput onChange"
      );
      assert(
        Object.prototype.toString.call(onTimeChangeSpy.args[0][0]) ===
          "[object Date]",
        "should pass pure date to CustomTimeInput onChange"
      );
      done();
    });
  });

  xit("should update input value if time is updated from outside", (done) => {
    const timeComponent = mount(
      <InputTimeComponent
        date={new Date()}
        timeString="13:00"
        onChange={console.log}
      />
    );

    expect(timeComponent.find("input").props.value).to.equal("13:00");

    timeComponent.setProps({ timeString: "14:00" });
    expect(timeComponent.find("input").props.value).to.equal("14:00");
  });
});
