import React from "react";
import { mount } from "enzyme";
import DatePicker from "../src/index.jsx";
import Day from "../src/day";
import WeekNumber from "../src/week_number";
import TestUtils from "react-dom/test-utils";
import ReactDOM from "react-dom";
import * as utils from "../src/date_utils";
import Calendar from "../src/calendar";

describe("WeekPicker", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should change the week when clicked on any option in the picker", () => {
    const onChangeSpy = sinon.spy();
    const weekPicker = TestUtils.renderIntoDocument(
      <DatePicker onChange={onChangeSpy} showWeekPicker />,
    );
    expect(onChangeSpy.called).to.be.false;
    const input = ReactDOM.findDOMNode(weekPicker.input);
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(input));
    const day = TestUtils.scryRenderedComponentsWithType(
      weekPicker.calendar,
      Day,
    )[0];
    TestUtils.Simulate.click(ReactDOM.findDOMNode(day));
    expect(onChangeSpy.calledOnce).to.be.true;
  });

  it("should change the week when clicked on any week number in the picker", () => {
    const onChangeSpy = sinon.spy();
    const weekPicker = TestUtils.renderIntoDocument(
      <DatePicker onChange={onChangeSpy} showWeekPicker showWeekNumbers />,
    );
    expect(onChangeSpy.called).to.be.false;
    const input = ReactDOM.findDOMNode(weekPicker.input);
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(input));
    const weekNumber = TestUtils.scryRenderedComponentsWithType(
      weekPicker.calendar,
      WeekNumber,
    )[0];
    TestUtils.Simulate.click(ReactDOM.findDOMNode(weekNumber));
    expect(onChangeSpy.calledOnce).to.be.true;
  });
});
