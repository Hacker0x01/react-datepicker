import React from "react";
import DatePicker from "../src/index.jsx";
import * as utils from "../src/date_utils";
import TestUtils from "react-dom/test-utils";
import ReactDOM from "react-dom";
import Time from "../src/time";

const DATE_FORMAT = "MMMM dd, yyyy h:mm a";

describe("TimePicker", () => {
  let datePicker;
  let div;
  let onChangeDate;

  beforeEach(() => {
    div = document.createElement("div");
  });

  it("should update on input time change", () => {
    renderDatePicker("February 28, 2018 4:43 PM");
    expect(getInputString()).to.equal("February 28, 2018 4:43 PM");
    setManually("February 28, 2018 4:45 PM");
    expect(utils.formatDate(onChangeDate, DATE_FORMAT)).to.equal(
      "February 28, 2018 4:45 PM"
    );
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

  it("should allow for injected moment if input does not have focus", () => {
    renderDatePicker("February 28, 2018 4:43 PM");
    setManually("February 28, 2018 4:45 PM");
    TestUtils.Simulate.blur(datePicker.input);
    renderDatePicker("February 28, 2018 4:43 PM");
    expect(getInputString()).to.equal("February 28, 2018 4:43 PM");
  });

  function setManually(string) {
    TestUtils.Simulate.focus(datePicker.input);
    TestUtils.Simulate.change(datePicker.input, { target: { value: string } });
  }

  function getInputString() {
    return ReactDOM.findDOMNode(datePicker.input).value;
  }

  function renderDatePicker(string) {
    return renderDatePickerFor(utils.parseDate(string, DATE_FORMAT));
  }

  function renderDatePickerFor(selected) {
    datePicker = ReactDOM.render(
      <DatePicker
        selected={selected}
        dateFormat={DATE_FORMAT}
        allowSameDay
        onChange={onChange}
        showTimeSelect
      />,
      div
    );
  }

  function onChange(m) {
    onChangeDate = m;
    renderDatePicker(m);
  }
});
