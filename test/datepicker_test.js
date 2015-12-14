import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import DatePicker from "../src/datepicker.jsx";

describe("DatePicker", () => {
  it("should show the calendar when focusing on the date input", () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    );
    var dateInput = datePicker.refs.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    expect(datePicker.refs.calendar).to.exist;
  });

  it("should hide the calendar when blurring the date input", done => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    );
    var dateInput = datePicker.refs.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    TestUtils.Simulate.blur(ReactDOM.findDOMNode(dateInput));
    setTimeout(() => {
      expect(datePicker.refs.calendar).to.not.exist;
      done();
    }, 300);
  });
});
