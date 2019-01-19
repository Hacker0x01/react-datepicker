import React from "react";
import DatePicker from "../src/index.jsx";
import TestUtils from "react-dom/test-utils";
import ReactDOM from "react-dom";
import Time from "../src/time";
import { newDate, formatDate } from "../src/date_utils";

describe("TimePicker", () => {
  let datePicker;
  let div;
  let onChangeMoment;

  beforeEach(() => {
    div = document.createElement("div");
  });

  it("should update on input time change", () => {
    renderDatePicker("February 28, 2018 4:43 PM");
    expect(getInputString()).to.equal("February 28, 2018 4:43 PM");

    setManually("February 28, 2018 4:45 PM");
    expect(formatDate(onChangeMoment, "MMMM d, yyyy p")).to.equal(
      "February 28, 2018 4:45 PM"
    );
  });

  it("should allow time changes after input change", () => {
    renderDatePicker("February 28, 2018 4:43 PM");
    setManually("February 28, 2018 4:45 PM");
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(datePicker.input));
    const time = TestUtils.findRenderedComponentWithType(datePicker, Time);
    const lis = TestUtils.scryRenderedDOMComponentsWithTag(time, "li");
    TestUtils.Simulate.click(lis[1]);
    expect(getInputString()).to.equal("February 28, 2018 12:30 AM");
  });

  it("should allow for injected date if input does not have focus", () => {
    renderDatePicker("February 28, 2018 4:43 PM");
    setManually("February 28, 2018 4:45 PM");
    TestUtils.Simulate.blur(datePicker.input);
    renderDatePicker("February 28, 2018 4:43 PM");
    expect(getInputString()).to.equal("February 28, 2018 4:43 PM");
  });

  it("should not close datepicker after time clicked when shouldCloseOnSelect is false", () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker shouldCloseOnSelect={false} showTimeSelect />
    );
    var dateInput = datePicker.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    const time = TestUtils.findRenderedComponentWithType(datePicker, Time);
    const lis = TestUtils.scryRenderedDOMComponentsWithTag(time, "li");
    TestUtils.Simulate.click(lis[0]);
    expect(datePicker.state.open).to.be.true;
  });

  function setManually(string) {
    TestUtils.Simulate.focus(datePicker.input);
    TestUtils.Simulate.change(datePicker.input, { target: { value: string } });
  }

  function getInputString() {
    return ReactDOM.findDOMNode(datePicker.input).value;
  }

  function renderDatePicker(string) {
    return renderDatePickerFor(new Date(string));
  }

  function renderDatePickerFor(selected) {
    datePicker = ReactDOM.render(
      <DatePicker
        selected={selected}
        dateFormat={"MMMM d, yyyy p"}
        allowSameDay
        onChange={onChange}
        showTimeSelect
      />,
      div
    );
  }

  function onChange(m) {
    onChangeMoment = newDate(m);
    renderDatePicker(m);
  }
});
