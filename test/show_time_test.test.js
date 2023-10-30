import React from "react";
import { mount } from "enzyme";
import DatePicker from "../src/index.jsx";
import TimeComponent from "../src/time.jsx";

describe("DatePicker", () => {
  it("should show time component when showTimeSelect prop is present", () => {
    var datePicker = mount(<DatePicker showTimeSelect />); // eslint-disable-line enzyme-deprecation/no-mount
    var timeComponent = datePicker.find(TimeComponent);
    expect(timeComponent).not.toBeNull();
  });

  it("should have custom time caption", () => {
    const timeComponent = mount(<TimeComponent timeCaption="Custom time" />); // eslint-disable-line enzyme-deprecation/no-mount

    const caption = timeComponent.find(".react-datepicker-time__header");
    expect(caption.text()).toEqual("Custom time");
  });

  describe("Time Select Only", () => {
    let datePicker;
    beforeEach(() => {
      datePicker = mount(
        // eslint-disable-line enzyme-deprecation/no-mount
        <DatePicker showTimeSelect showTimeSelectOnly todayButton="Today" />,
      );
      datePicker.find("input").simulate("click");
    });

    it("should not show month container when showTimeSelectOnly prop is present", () => {
      var elem = datePicker.find(".react-datepicker__month-container");
      expect(elem).toHaveLength(0);
    });

    it("should not show previous month button when showTimeSelectOnly prop is present", () => {
      var elem = datePicker.find(".react-datepicker__navigation--previous");
      expect(elem).toHaveLength(0);
    });

    it("should not show next month button when showTimeSelectOnly prop is present", () => {
      var elem = datePicker.find(".react-datepicker__navigation--next");
      expect(elem).toHaveLength(0);
    });

    it("should not show today button when showTimeSelectOnly prop is present", () => {
      var elem = datePicker.find(".react-datepicker__today-button");
      expect(elem).toHaveLength(0);
    });
  });
});
