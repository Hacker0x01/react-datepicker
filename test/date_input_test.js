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

  it("demonstrates that it is impossible to retype date without 'isTypeable' flag", function(done) {
    var DatePickerWrapper = React.createClass({
      getInitialState() {
        return {
          startDate: moment()
        };
      },

      handleChange(date) {
        this.setState({
          startDate: date
        });
      },

      render() {
        return <DatePicker selected={this.state.startDate} onChange={this.handleChange} ref={"datePicker"} />;
      }
    });

    var datepicker = TestUtils.renderIntoDocument(
      <DatePickerWrapper />
    );

    var dateInput = datepicker.refs.datePicker.refs.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));

    setTimeout(() => {
      TestUtils.Simulate.change(ReactDOM.findDOMNode(dateInput), { target: { value: "2015-12-08" } });
      expect(dateInput.state.maybeDate).to.be.equal("2015-12-08");
      TestUtils.Simulate.change(ReactDOM.findDOMNode(dateInput), { target: { value: "2015-12-0" } });
      expect(dateInput.state.maybeDate).to.be.equal(null);
      done();
    }, 300);
  });

  it("types custom date", function(done) {
    var DatePickerWrapper = React.createClass({
      getInitialState() {
        return {
          startDate: moment()
        };
      },

      handleChange(date) {
        this.setState({
          startDate: date
        });
      },

      render() {
        return <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
              isTypeable={true}
              ref={"datePicker"} />;
      }
    });

    var datepicker = TestUtils.renderIntoDocument(
      <DatePickerWrapper />
    );

    var dateInput = datepicker.refs.datePicker.refs.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));

    setTimeout(() => {
      TestUtils.Simulate.change(ReactDOM.findDOMNode(dateInput), { target: { value: "2015-12-08" } });
      expect(dateInput.state.maybeDate).to.be.equal("2015-12-08");
      TestUtils.Simulate.change(ReactDOM.findDOMNode(dateInput), { target: { value: "2015-12-0" } });
      expect(dateInput.state.maybeDate).to.be.equal("2015-12-0");
      done();
    }, 300);
  });
});
