import React from "react";
import TestUtils from "react-addons-test-utils";
import moment from "moment";
import DateUtil from "../src/util/date";
import Calendar from "../src/calendar";
import YearDropdown from "../src/year_dropdown";

describe("Calendar", function() {
  function getCalendar(extraProps) {
    return <Calendar
      weekdays={["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]}
      locale="en"
      moment={moment}
      dateFormat="MMMM"
      onSelect={() => {}}
      handleClick={() => {}}
      hideCalendar={() => {}}
      {...extraProps} />;
  }

  it("should start with the current date in view if no date range", function() {
    var now = new DateUtil(moment());
    var calendar = TestUtils.renderIntoDocument(getCalendar());
    assert(calendar.state.date.sameDay(now));
  });

  it("should start with the current date in view if in date range", function() {
    var now = new DateUtil(moment());
    var minDate = moment().subtract(1, "year");
    var maxDate = moment().add(1, "year");
    var calendar = TestUtils.renderIntoDocument(getCalendar({ minDate, maxDate }));
    assert(calendar.state.date.sameDay(now));
  });

  it("should start with the min date in view if after the current date", function() {
    var minDate = moment().add(1, "year");
    var calendar = TestUtils.renderIntoDocument(getCalendar({ minDate }));
    assert(calendar.state.date.sameDay(new DateUtil(minDate)));
  });

  it("should start with the max date in view if before the current date", function() {
    var maxDate = moment().subtract(1, "year");
    var calendar = TestUtils.renderIntoDocument(getCalendar({ maxDate }));
    assert(calendar.state.date.sameDay(new DateUtil(maxDate)));
  });

  it("should show the year dropdown menu by default", function() {
    var calendar = TestUtils.renderIntoDocument(getCalendar());
    var yearReadView = TestUtils.findRenderedComponentWithType(calendar, YearDropdown);
    expect(yearReadView).to.exist;
  });

  it("should not show the year dropdown menu if toggled off", function() {
    var calendar = TestUtils.renderIntoDocument(getCalendar({ showYearDropdown: false }));
    var yearReadView = TestUtils.scryRenderedComponentsWithType(calendar, YearDropdown);
    expect(yearReadView).to.be.empty;
  });
});
