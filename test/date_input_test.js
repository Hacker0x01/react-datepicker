import React from "react";
import moment from "moment";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import DatePicker from "../src/datepicker.jsx";
import DateInput from "../src/date_input.jsx";

describe("DateInput", function() {
  it("hides calendar when the Enter key is pressed", function() {
    var date = moment();
    var handlerCalled = false;
    function hideCalendar() {
      handlerCalled = true;
    }

    var dateInput = TestUtils.renderIntoDocument(
      <DateInput date={date} hideCalendar={hideCalendar} />
    );

    TestUtils.Simulate.keyDown(ReactDOM.findDOMNode(dateInput), { key: "Enter" });
    expect(handlerCalled).to.be.true;
  });

  it("hides calendar when the Escape key is pressed", function() {
    var date = moment();
    var handlerCalled = false;
    function hideCalendar() {
      handlerCalled = true;
    }

    var dateInput = TestUtils.renderIntoDocument(
      <DateInput date={date} hideCalendar={hideCalendar} />
    );

    TestUtils.Simulate.keyDown(ReactDOM.findDOMNode(dateInput), { key: "Escape" });
    expect(handlerCalled).to.be.true;
  });

  it("adds disabled attribute to input field when disabled is passed as prop", function() {
    var dateInput = TestUtils.renderIntoDocument(
      <DateInput disabled={true} />
    );

    expect(dateInput.disabled).to.not.equal(null);
  });

  it("uses a custom className if provided", function() {
    const className = "custom-class-name";
    var dateInput = TestUtils.renderIntoDocument(
      <DateInput className={className} />
    );

    expect(ReactDOM.findDOMNode(dateInput).className).to.contain(className);
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

  it("should call setSelected when changing from null to valid date", function() {
    var date = moment();
    var dateFormat = "YYYY-MM-DD";
    var callback = sinon.spy();
    var dateInput = TestUtils.renderIntoDocument(
      <DateInput date={null} dateFormat={dateFormat} setSelected={callback} />
    );
    var inputNode = dateInput.refs.input;
    inputNode.value = date.format(dateFormat);
    TestUtils.Simulate.change(inputNode);
    assert(callback.calledOnce, "must be called once");
    assert(date.isSame(callback.getCall(0).args[0], "day"), "must be called with correct date");
  });

  it("should call setSelected when changing from valid date to another", function() {
    var dateFrom = moment();
    var dateTo = dateFrom.clone().add(1, "day");
    var dateFormat = "YYYY-MM-DD";
    var callback = sinon.spy();
    var dateInput = TestUtils.renderIntoDocument(
      <DateInput date={dateFrom} dateFormat={dateFormat} setSelected={callback} />
    );
    var inputNode = dateInput.refs.input;
    inputNode.value = dateTo.format(dateFormat);
    TestUtils.Simulate.change(inputNode);
    assert(callback.calledOnce, "must be called once");
    assert(dateTo.isSame(callback.getCall(0).args[0], "day"), "must be called with correct date");
  });

  it("should call setSelected when changing from valid date to empty", function() {
    var callback = sinon.spy();
    var dateInput = TestUtils.renderIntoDocument(
      <DateInput date={moment()} setSelected={callback} />
    );
    var inputNode = dateInput.refs.input;
    inputNode.value = "";
    TestUtils.Simulate.change(inputNode);
    assert(callback.withArgs(null).calledOnce, "must be called once with null");
  });

  it("should not call setSelected when changing from valid date to invalid", function() {
    var callback = sinon.spy();
    var dateInput = TestUtils.renderIntoDocument(
      <DateInput date={moment()} setSelected={callback} />
    );
    var inputNode = dateInput.refs.input;
    inputNode.value = "invalid";
    TestUtils.Simulate.change(inputNode);
    assert(!callback.called, "must not be called");
  });

  it("should call setSelected when changing from invalid date to valid", function() {
    var dateFrom = moment();
    var dateTo = dateFrom.clone().add(1, "day");
    var dateFormat = "YYYY-MM-DD";
    var callback = sinon.spy();
    var dateInput = TestUtils.renderIntoDocument(
      <DateInput date={dateFrom} dateFormat={dateFormat} setSelected={callback} />
    );
    var inputNode = dateInput.refs.input;
    inputNode.value = "invalid";
    TestUtils.Simulate.change(inputNode);
    inputNode.value = dateTo.format(dateFormat);
    TestUtils.Simulate.change(inputNode);
    assert(callback.calledOnce, "must be called once");
    assert(dateTo.isSame(callback.getCall(0).args[0], "day"), "must be called with correct date");
  });
});
