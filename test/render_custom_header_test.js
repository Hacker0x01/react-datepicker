import React from "react";
import Calendar from "../src/calendar";

import { shallow } from "enzyme";

describe("Calendar", function() {
  function getCalendar(extraProps) {
    return shallow(
      <Calendar onSelect={() => {}} onClickOutside={() => {}} {...extraProps} />
    );
  }

  it("should render custom header", function() {
    const calendar = getCalendar({ renderCustomHeader: () => {} });

    const header = calendar.find(".react-datepicker__header--custom");
    expect(header).to.have.length(1);
  });

  it("should call render custom header function and returns parameters", function() {
    const renderCustomHeader = sinon.spy();

    getCalendar({ renderCustomHeader });

    const match = {
      changeMonth: sinon.match.func,
      changeYear: sinon.match.func,
      date: sinon.match.object,
      decreaseMonth: sinon.match.func,
      increaseMonth: sinon.match.func,
      nextMonthButtonDisabled: sinon.match.bool,
      prevMonthButtonDisabled: sinon.match.bool
    };

    expect(renderCustomHeader.calledWithMatch(match)).to.be.true;
  });
});
