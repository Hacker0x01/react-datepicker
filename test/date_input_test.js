import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import DatePicker from "../src/datepicker.jsx";
import DateInput from "../src/date_input.jsx";

describe("DateInput", function() {
  it("triggers an event handler when the Enter key is pressed", function(done) {
    var dateMock = { format: function() {} };
    var handlerCalled = false;

    var dateInput = TestUtils.renderIntoDocument(
      <DateInput date={dateMock} handleEnter={done} />
    );

    TestUtils.Simulate.keyDown(ReactDOM.findDOMNode(dateInput), { key: "Enter" });
  });

  it("adds disabled attribute to input field when disabled is passed as prop", function() {
    var dateInput = TestUtils.renderIntoDocument(
      <DateInput disabled={true} />
    );

    expect(dateInput.disabled).to.not.equal(null);
  });

  it("uses a custom className if provided", function() {
    var dateInput = TestUtils.renderIntoDocument(
      <DateInput className="datepicker__custom-input" />
    );

    expect(ReactDOM.findDOMNode(dateInput).className).to.equal("ignore-react-onclickoutside datepicker__custom-input");
  });

  it("has a tabIndex if provided", function() {
    var dateInput = TestUtils.renderIntoDocument(
      <DateInput tabIndex={1} />
    );

    expect(ReactDOM.findDOMNode(dateInput).tabIndex).to.equal(1);
  });

  it("toggles the calendar on and off when clicked", function(done) {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    );
    var dateInput = datePicker.refs.input;
    TestUtils.Simulate.click(ReactDOM.findDOMNode(dateInput));
    setTimeout(() => {
      expect(datePicker.refs.calendar).to.exist;
      TestUtils.Simulate.click(ReactDOM.findDOMNode(dateInput));
    }, 300);
    setTimeout(() => {
      expect(datePicker.refs.calendar).to.not.exist;
      done();
    }, 300);
  });
});
