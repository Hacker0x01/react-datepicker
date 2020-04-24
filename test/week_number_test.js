import React from "react";
import WeekNumber from "../src/week_number";
import { shallow } from "enzyme";
import sinon from "sinon";

function renderWeekNumber(weekNumber, props = {}) {
  return shallow(<WeekNumber weekNumber={weekNumber} {...props} />);
}

describe("WeekNumber", () => {
  let shallowWeekNumber;
  describe("rendering", () => {
    it("should render the specified Week Number", () => {
      const weekNumber = 1;
      shallowWeekNumber = renderWeekNumber(weekNumber);
      expect(
        shallowWeekNumber.hasClass("react-datepicker__week-number")
      ).to.equal(true);
      expect(shallowWeekNumber.text()).to.equal(weekNumber + "");
    });

    it("should call the onClick function if it is defined", () => {
      const onClick = sinon.spy();
      shallowWeekNumber = shallow(
        <WeekNumber weekNumber={1} onClick={onClick} />
      );
      shallowWeekNumber.instance().handleClick({});
      expect(onClick).to.have.property("callCount", 1);
    });

    it("should have an aria-label containing the provided prefix", () => {
      const ariaLabelPrefix = "A prefix in my native language";
      const shallowWeekNumber = shallow(
        <WeekNumber day={1} ariaLabelPrefix={ariaLabelPrefix} />
      );
      expect(shallowWeekNumber.html().indexOf(`aria-label="${ariaLabelPrefix}`)).not.equal(-1);
    });
  });
});
