import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import DatePicker from "../src/datepicker.jsx";
import moment from "moment";

describe("DatePicker", () => {
  it("should show the calendar when focusing on the date input", done => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    );
    var dateInput = datePicker.refs.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    setTimeout(() => {
      expect(datePicker.refs.calendar).to.exist;
      done();
    }, 200);
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

  it("should not hide the calendar if multiple clicks are made in a short interval", done => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    );
    var dateInput = datePicker.refs.input;
    TestUtils.Simulate.click(ReactDOM.findDOMNode(dateInput));

    setTimeout(() => {
      var calendar = datePicker.refs.calendar;
      TestUtils.Simulate.blur(ReactDOM.findDOMNode(dateInput));

      setTimeout(() => {
        TestUtils.Simulate.click(ReactDOM.findDOMNode(calendar));
        TestUtils.Simulate.click(ReactDOM.findDOMNode(calendar));
      }, 0);

      TestUtils.Simulate.blur(ReactDOM.findDOMNode(dateInput));
    }, 0);

    setTimeout(() => {
      expect(datePicker.refs.calendar).to.exist;
      done();
    }, 300);
  });
});
