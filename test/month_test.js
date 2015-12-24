import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import moment from "moment";
import Month from "../src/month";
import Day from "../src/day";
import range from "lodash/utility/range";

describe("Month", () => {
  it("should have the month CSS class", () => {
    const month = TestUtils.renderIntoDocument(<Month day={moment()} />);
    expect(ReactDOM.findDOMNode(month).className).to.equal("datepicker__month");
  });

  it("should render all days of the month", () => {
    const monthStart = moment("2015-12-01");
    const month = TestUtils.renderIntoDocument(<Month day={monthStart} />);

    const days = TestUtils.scryRenderedComponentsWithType(month, Day);
    range(0, monthStart.daysInMonth()).forEach(offset => {
      const expectedDay = monthStart.clone().add(offset, "days");
      const foundDay = days.find(day => day.props.day.isSame(expectedDay, "day"));
      expect(foundDay).to.exist;
    });
  });

  it("should call the provided onDayClick function", () => {
    let dayClicked = null;

    function onDayClick(day) {
      dayClicked = day;
    }

    const monthStart = moment("2015-12-01");
    const month = TestUtils.renderIntoDocument(
      <Month day={monthStart} onDayClick={onDayClick} />
    );
    const day = TestUtils.scryRenderedComponentsWithType(month, Day)[0];
    TestUtils.Simulate.click(ReactDOM.findDOMNode(day));
    assert(day.props.day.isSame(dayClicked, "day"));
  });
});
