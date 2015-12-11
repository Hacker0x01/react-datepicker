import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
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

    expect(ReactDOM.findDOMNode(dateInput).className).to.equal("datepicker__custom-input");
  });
});
