import React from "react";
import DatePicker from "../src/index.jsx";
import moment from "moment";
import TestUtils from "react-dom/test-utils";
import ReactDOM from "react-dom";
import Time from "../src/time";

describe("TimePicker", () => {
  let datePicker;

  it("should update on input time change", () => {
    let onChangeMoment = null;
    const onChange = m => {
      onChangeMoment = m;
    };
    makeDatePicker(onChange);
    expect(getInputString()).to.equal("February 28, 2018 4:43 PM");
    setManually("February 28, 2018 4:45 PM");
    expect(onChangeMoment.format("LLL")).to.equal("February 28, 2018 4:45 PM");
  });

  it("should allow time changes after input change", () => {
    makeDatePicker();
    setManually("February 28, 2018 4:45 PM");
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(datePicker.input));
    const time = TestUtils.findRenderedComponentWithType(datePicker, Time);
    const lis = TestUtils.scryRenderedDOMComponentsWithTag(time, "li");
    TestUtils.Simulate.click(lis[0]);
    expect(getInputString()).to.equal("February 28, 2018 12:00 AM");
  });

  function setManually(string) {
    TestUtils.Simulate.change(datePicker.input, { target: { value: string } });
  }

  function getInputString() {
    return ReactDOM.findDOMNode(datePicker.input).value;
  }

  function makeDatePicker(onChange) {
    datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        selected={moment("February 28, 2018 4:43 PM", "LLL", true)}
        dateFormat={"LLL"}
        allowSameDay
        onChange={onChange}
        showTimeSelect
      />
    );
  }
});
