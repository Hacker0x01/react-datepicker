import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import DatePicker from "../src/datepicker.jsx";
import moment from "moment";

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

  it("should allow clearing the date when isClearable is true", () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker isClearable={true} selected={moment("2015-12-15")} />
    );
    var clearButton = TestUtils.findRenderedDOMComponentWithClass(datePicker, "close-icon");
    TestUtils.Simulate.click(clearButton);
    var dateInput = datePicker.refs.input;
    expect(ReactDOM.findDOMNode(dateInput).value).to.equal("");
  });
});
