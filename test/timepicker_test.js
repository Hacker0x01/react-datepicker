import React from "react";
import DatePicker from "../src/index.jsx";
import moment from "moment";
import TestUtils from "react-dom/test-utils";
import ReactDOM from "react-dom";
import Time from "../src/time";

describe("TimePicker", () => {
  let datePicker;
  let div;
  let format;

  beforeEach(() => {
    div = document.createElement("div");
    format = "LLL";
  });

  it("should update on input time change", () => {
    renderDatePicker("February 28, 2018 4:43 PM");
    expect(getInputString()).to.equal("February 28, 2018 4:43 PM");
    setManually("February 28, 2018 4:45 PM");
    expect(datePicker.props.selected.format("LLL")).to.equal(
      "February 28, 2018 4:45 PM"
    );
  });

  it("should be able to handle time zones", () => {
    format = "LLL Z";
    const selected = moment.parseZone(
      "February 28, 2018 5:00 PM -01:00",
      format,
      true
    );
    expect(selected.isValid()).to.be.true;
    renderDatePickerFor(selected);
    expect(getInputString()).to.equal("February 28, 2018 5:00 PM -01:00");
    setManually("February 28, 2018 5:02 PM -01:00");
    expect(getInputString()).to.equal("February 28, 2018 5:02 PM -01:00");
  });

  it("should parse input and apply same offset as selected", () => {
    const selected = moment
      .parseZone("February 28, 2018 5:00 PM", format, true)
      .utcOffset(120, true);
    renderDatePickerFor(selected);
    expect(getInputString()).to.equal("February 28, 2018 5:00 PM");
    setManually("February 28, 2018 5:00 PM");
    expect(datePicker.props.selected.utcOffset()).to.equal(120);
  });

  it("should allow time changes after input change", () => {
    renderDatePicker("February 28, 2018 4:43 PM");
    setManually("February 28, 2018 4:45 PM");
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(datePicker.input));
    const time = TestUtils.findRenderedComponentWithType(datePicker, Time);
    const lis = TestUtils.scryRenderedDOMComponentsWithTag(time, "li");
    TestUtils.Simulate.click(lis[0]);
    expect(getInputString()).to.equal("February 28, 2018 12:00 AM");
  });

  it("should allow for injected moment on rerender", () => {
    renderDatePicker("February 28, 2018 4:43 PM");
    setManually("February 28, 2018 4:45 PM");
    renderDatePicker("February 28, 2018 4:43 PM");
    expect(getInputString()).to.equal("February 28, 2018 4:43 PM");
  });

  function setManually(string) {
    TestUtils.Simulate.change(datePicker.input, { target: { value: string } });
  }

  function getInputString() {
    return ReactDOM.findDOMNode(datePicker.input).value;
  }

  function renderDatePicker(string) {
    return renderDatePickerFor(moment(string, "LLL", true));
  }

  function renderDatePickerFor(selected) {
    datePicker = ReactDOM.render(
      <DatePicker
        selected={selected}
        dateFormat={format}
        allowSameDay
        onChange={onChange}
        showTimeSelect
      />,
      div
    );
  }

  function onChange(m) {
    renderDatePicker(m);
  }
});
