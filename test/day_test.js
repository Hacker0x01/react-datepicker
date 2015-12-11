import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import moment from "moment";
import DateUtil from "../src/util/date";
import Day from "../src/day.jsx";

describe("Day", function() {
  it("should apply the in-range class if in range", function() {
    var day = new DateUtil(moment());
    var dayComponent = TestUtils.renderIntoDocument(
      <Day
        day={day}
        selected={day}
        inRange={true} />
    );

    expect(ReactDOM.findDOMNode(dayComponent).className).to.contain("datepicker__day--in-range");
  });

  it("should not apply the in-range class if not in range", function() {
    var day = new DateUtil(moment());
    var dayComponent = TestUtils.renderIntoDocument(
      <Day
        day={day}
        selected={day}
        inRange={false} />
    );

    expect(ReactDOM.findDOMNode(dayComponent).className).to.not.contain("datepicker__day--in-range");
  });
});
