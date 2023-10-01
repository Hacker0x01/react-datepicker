import React from "react";
import { mount, shallow } from "enzyme";
import DatePicker from "../src/index.jsx";
import InputTimeComponent from "../src/inputTime.jsx";
import CustomTimeInput from "./helper_components/custom_time_input.jsx";

describe("timeInput", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should show time component when showTimeSelect prop is present", () => {
    const datePicker = mount(<DatePicker showTimeInput />);
    const component = datePicker.find(InputTimeComponent);
    expect(component).not.toBeNull();
  });

  it("should have custom time caption", () => {
    const timeComponent = mount(
      <InputTimeComponent timeInputLabel="Custom time" />,
    );
    const caption = timeComponent.find(".react-datepicker-time__caption");
    expect(caption.text()).toEqual("Custom time");
  });

  xit("should trigger onChange event", () => {
    const timeComponent = shallow(<InputTimeComponent />);
    const input = timeComponent.find("input");
    input.simulate("change", { target: { value: "13:00" } });
    expect(timeComponent.state("time")).toEqual("13:00");
  });

  it("should trigger onChange event and set the value as last valid timeString if empty string is passed as time input value", () => {
    const timeComponent = shallow(
      <InputTimeComponent timeString="13:00" onChange={() => {}} />,
    );
    const input = timeComponent.find("input");
    input.simulate("change", { target: { value: "" } });
    expect(timeComponent.state("time")).toEqual("13:00");
  });

  xit("should trigger onChange event on a custom time input without using the last valid timeString", () => {
    const timeComponent = mount(
      <InputTimeComponent
        timeString="13:00"
        customTimeInput={<CustomTimeInput />}
      />,
    );

    const input = timeComponent.find("CustomTimeInput");
    input.simulate("change", "14:00");
    expect(timeComponent.state("time")).toEqual("14:00");
  });

  xit("should pass pure Date to custom time input", () => {
    const onTimeChangeSpy = jest.fn();
    const timeComponent = mount(
      <InputTimeComponent
        date={new Date()}
        timeString="13:00"
        customTimeInput={<CustomTimeInput onTimeChange={onTimeChangeSpy} />}
      />,
    );

    const input = timeComponent.find(CustomTimeInput);
    input.simulate("change", "14:00");

    expect(onTimeChangeSpy).toHaveBeenCalledWith(
      new Date(new Date().setHours(14, 0, 0, 0)),
    );
  });

  it("should trigger onChange event with the specified date prop if available", () => {
    const mockOnChange = jest.fn();
    const mockDate = new Date("2023-09-30");

    const timeComponent = shallow(
      <InputTimeComponent date={mockDate} onChange={mockOnChange} />,
    );

    const newTime = "13:00";
    const input = timeComponent.find("input");
    input.simulate("change", { target: { value: newTime } });

    const expectedDate = new Date(mockDate);
    const [expectedHours, expectedMinutes] = newTime.split(":");
    expectedDate.setHours(expectedHours);
    expectedDate.setMinutes(expectedMinutes);

    expect(mockOnChange).toHaveBeenCalledWith(expectedDate);
  });

  it("should trigger onChange event with the default date when date prop is missing", () => {
    const mockOnChange = jest.fn();
    const mockCurrentDate = new Date("2023-09-30");
    const dateSpy = jest
      .spyOn(global, "Date")
      .mockImplementation(() => mockCurrentDate);

    const timeComponent = shallow(
      <InputTimeComponent onChange={mockOnChange} />,
    );

    const newTime = "13:00";
    const input = timeComponent.find("input");
    input.simulate("change", { target: { value: newTime } });

    const expectedDate = new Date(mockCurrentDate);
    const [expectedHours, expectedMinutes] = newTime.split(":");
    expectedDate.setHours(expectedHours);
    expectedDate.setMinutes(expectedMinutes);

    expect(mockOnChange).toHaveBeenCalledWith(expectedDate);

    dateSpy.mockRestore();
  });
});
