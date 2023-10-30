import React from "react";
import WeekNumber from "../src/week_number";
import { shallow } from "enzyme";

function renderWeekNumber(weekNumber, props = {}) {
  return shallow(<WeekNumber weekNumber={weekNumber} {...props} />); // eslint-disable-line enzyme-deprecation/no-shallow
}

describe("WeekNumber", () => {
  let shallowWeekNumber;
  describe("rendering", () => {
    it("should render the specified Week Number", () => {
      const weekNumber = 1;
      shallowWeekNumber = renderWeekNumber(weekNumber);
      expect(shallowWeekNumber.hasClass("react-datepicker__week-number")).toBe(
        true,
      );
      expect(shallowWeekNumber.text()).toBe(weekNumber + "");
    });

    it("should call the onClick function if it is defined", () => {
      const onClick = jest.fn();
      shallowWeekNumber = shallow(
        // eslint-disable-line enzyme-deprecation/no-shallow
        <WeekNumber weekNumber={1} onClick={onClick} />,
      );
      shallowWeekNumber.instance().handleClick({});
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("should have an aria-label containing the provided prefix", () => {
      const ariaLabelPrefix = "A prefix in my native language";
      const shallowWeekNumber = shallow(
        // eslint-disable-line enzyme-deprecation/no-shallow
        <WeekNumber day={1} ariaLabelPrefix={ariaLabelPrefix} />,
      );
      expect(
        shallowWeekNumber.html().indexOf(`aria-label="${ariaLabelPrefix}`),
      ).not.toBe(-1);
    });
  });
});
