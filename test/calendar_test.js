import React from "react";
import TestUtils from "react-addons-test-utils";
import moment from "moment";
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
      onClickOutside={() => {}}
      hideCalendar={() => {}}
      {...extraProps} />;
  }

  it("should start with the current date in view if no date range", function() {
    var now = moment();
    var calendar = TestUtils.renderIntoDocument(getCalendar());
    assert(calendar.state.date.isSame(now, "day"));
  });

  it("should start with the selected date in view if provided", function() {
    var selected = moment().add(1, "year");
    var calendar = TestUtils.renderIntoDocument(getCalendar({ selected }));
    assert(calendar.state.date.isSame(selected, "day"));
  });

  it("should start with the current date in view if in date range", function() {
    var now = moment();
    var minDate = now.clone().subtract(1, "year");
    var maxDate = now.clone().add(1, "year");
    var calendar = TestUtils.renderIntoDocument(getCalendar({ minDate, maxDate }));
    assert(calendar.state.date.isSame(now, "day"));
  });

  it("should start with the min date in view if after the current date", function() {
    var minDate = moment().add(1, "year");
    var calendar = TestUtils.renderIntoDocument(getCalendar({ minDate }));
    assert(calendar.state.date.isSame(minDate, "day"));
  });

  it("should start with the max date in view if before the current date", function() {
    var maxDate = moment().subtract(1, "year");
    var calendar = TestUtils.renderIntoDocument(getCalendar({ maxDate }));
    assert(calendar.state.date.isSame(maxDate, "day"));
  });

  it("should not show the year dropdown menu by default", function() {
    var calendar = TestUtils.renderIntoDocument(getCalendar());
    var yearReadView = TestUtils.scryRenderedComponentsWithType(calendar, YearDropdown);
    expect(yearReadView).to.be.empty;
  });

  it("should show the year dropdown menu if toggled on", function() {
    var calendar = TestUtils.renderIntoDocument(getCalendar({ showYearDropdown: true }));
    var yearReadView = TestUtils.findRenderedComponentWithType(calendar, YearDropdown);
    expect(yearReadView).to.exist;
  });
});
