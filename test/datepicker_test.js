import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import DatePicker from "../src/datepicker.jsx";
import Day from "../src/day";
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

  it("should show the calendar when clicking on the date input", () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    );
    var dateInput = datePicker.refs.input;
    TestUtils.Simulate.click(ReactDOM.findDOMNode(dateInput));
    expect(datePicker.refs.calendar).to.exist;
  });

  it("should keep the calendar shown when blurring the date input", () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    );
    var dateInput = datePicker.refs.input;
    var focusSpy = sinon.spy(dateInput, "focus");
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    TestUtils.Simulate.blur(ReactDOM.findDOMNode(dateInput));
    expect(datePicker.refs.calendar).to.exist;
    assert(focusSpy.calledOnce, "should refocus the date input");
  });

  it("should keep the calendar shown when clicking the calendar", () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    );
    var dateInput = datePicker.refs.input;
    var focusSpy = sinon.spy(dateInput, "focus");
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    TestUtils.Simulate.click(ReactDOM.findDOMNode(datePicker.refs.calendar));
    expect(datePicker.refs.calendar).to.exist;
  });

  it("should hide the calendar when clicking a day on the calendar", () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    );
    var dateInput = datePicker.refs.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    var day = TestUtils.scryRenderedComponentsWithType(datePicker.refs.calendar, Day)[0];
    TestUtils.Simulate.click(ReactDOM.findDOMNode(day));
    expect(datePicker.refs.calendar).to.not.exist;
  });

  it("should hide the calendar when the date input signals done", () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    );
    var dateInput = datePicker.refs.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    TestUtils.Simulate.keyDown(ReactDOM.findDOMNode(dateInput), { key: "Enter" });
    expect(datePicker.refs.calendar).to.not.exist;
  });

  it("should hide the calendar when tabbing from the date input", () => {
    var onBlurSpy = sinon.spy();
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker onBlur={onBlurSpy} />
    );
    var dateInput = datePicker.refs.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    TestUtils.Simulate.keyDown(ReactDOM.findDOMNode(dateInput), { key: "Tab" });
    TestUtils.Simulate.blur(ReactDOM.findDOMNode(dateInput));
    expect(datePicker.refs.calendar).to.not.exist;
    assert(onBlurSpy.calledOnce, "should call onBlur");
  });

  it("should allow clearing the date when isClearable is true", () => {
    var cleared = false;
    function handleChange(d) {
      if (d === null) {
        cleared = true;
      }
    }
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        selected={moment("2015-12-15")}
        isClearable={true}
        onChange={handleChange} />
    );
    var clearButton = TestUtils.findRenderedDOMComponentWithClass(datePicker, "close-icon");
    TestUtils.Simulate.click(clearButton);
    expect(cleared).to.be.true;
  });
});
