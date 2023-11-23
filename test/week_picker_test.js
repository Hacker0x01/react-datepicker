import React from "react";
import DatePicker from "../src/index.jsx";
import Day from "../src/day";
import WeekNumber from "../src/week_number";

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
    TestUtils.Simulate.focus(weekPicker.inputRef.current);
    const day = TestUtils.scryRenderedComponentsWithType(
      weekPicker.calendar,
      Day,
    )[0];
    TestUtils.Simulate.click(day.ref);
    expect(onChangeSpy.calledOnce).to.be.true;
  });

  it("should change the week when clicked on any week number in the picker", () => {
    const onChangeSpy = sinon.spy();
    const weekPicker = TestUtils.renderIntoDocument(
      <DatePicker onChange={onChangeSpy} showWeekPicker showWeekNumbers />,
    );
    expect(onChangeSpy.called).to.be.false;
    TestUtils.Simulate.focus(weekPicker.inputRef.current);
    const weekNumber = TestUtils.scryRenderedComponentsWithType(
      weekPicker.calendar,
      WeekNumber,
    )[0];
    TestUtils.Simulate.click(weekNumber.ref);
    expect(onChangeSpy.calledOnce).to.be.true;
  });
});
