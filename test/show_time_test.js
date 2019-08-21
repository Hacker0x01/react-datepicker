import React from "react";
import { mount } from "enzyme";
import DatePicker from "../src/index.jsx";
import TimeComponent from "../src/time";

describe("DatePicker", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
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

  describe("Time Select Only", () => {
    var datePicker = mount(
      <DatePicker showTimeSelect showTimeSelectOnly todayButton="Today" />
    );

    it("should not show month container when showTimeSelectOnly prop is present", () => {
      var elem = datePicker.find(".react-datepicker__month-container");
      expect(elem).to.have.length(0);
    });

    it("should not show previous month button when showTimeSelectOnly prop is present", () => {
      var elem = datePicker.find(".react-datepicker__navigation--previous");
      expect(elem).to.have.length(0);
    });

    it("should not show next month button when showTimeSelectOnly prop is present", () => {
      var elem = datePicker.find(".react-datepicker__navigation--next");
      expect(elem).to.have.length(0);
    });

    it("should not show today button when showTimeSelectOnly prop is present", () => {
      var elem = datePicker.find(".react-datepicker__today-button");
      expect(elem).to.have.length(0);
    });
  });
});
