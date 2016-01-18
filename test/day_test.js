import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import moment from "moment";
import Day from "../src/day";

function renderDay(day, props = {}) {
  const dayNode = TestUtils.renderIntoDocument(
    <Day day={day} {...props} />
  );
  return ReactDOM.findDOMNode(dayNode);
}

describe("Day", () => {
  describe("rendering", () => {
    it("should render the specified day", () => {
      const dayDOM = renderDay(moment());
      expect(dayDOM.className).to.contain("datepicker__day");
      expect(dayDOM.textContent).to.equal(moment().date() + "");
    });
  });

  describe("selected", () => {
    const className = "datepicker__day--selected";

    it("should apply the selected class if selected", () => {
      const day = moment();
      const dayDOM = renderDay(day, { selected: day });
      expect(dayDOM.className).to.contain(className);
    });

    it("should not apply the selected class if not selected", () => {
      const day = moment();
      const selected = day.clone().add(1, "day");
      const dayDOM = renderDay(day, { selected });
      expect(dayDOM.className).to.not.contain(className);
    });
  });

  describe("in range", () => {
    const className = "datepicker__day--in-range";

    it("should apply the in-range class if in range", () => {
      const day = moment();
      const startDate = day.clone().subtract(1, "day");
      const endDate = day.clone().add(1, "day");
      const dayDOM = renderDay(day, { startDate, endDate });
      expect(dayDOM.className).to.contain(className);
    });

    it("should not apply the in-range class if not in range", () => {
      const day = moment();
      const startDate = day.clone().add(1, "day");
      const endDate = day.clone().add(2, "days");
      const dayDOM = renderDay(day, { startDate, endDate });
      expect(dayDOM.className).to.not.contain(className);
    });

    it("should apply the in-range class if equal to start date", () => {
      const day = moment();
      const startDate = day.clone();
      const endDate = day.clone().add(1, "day");
      const dayDOM = renderDay(day, { startDate, endDate });
      expect(dayDOM.className).to.contain(className);
    });

    it("should apply the in-range class if equal to end date", () => {
      const day = moment();
      const startDate = day.clone().subtract(1, "day");
      const endDate = day.clone();
      const dayDOM = renderDay(day, { startDate, endDate });
      expect(dayDOM.className).to.contain(className);
    });

    it("should not apply the in-range class if start date missing", () => {
      const day = moment();
      const startDate = day.clone().subtract(1, "day");
      const dayDOM = renderDay(day, { startDate });
      expect(dayDOM.className).to.not.contain(className);
    });

    it("should not apply the in-range class if end date missing", () => {
      const day = moment();
      const endDate = day.clone().add(1, "day");
      const dayDOM = renderDay(day, { endDate });
      expect(dayDOM.className).to.not.contain(className);
    });
  });

  describe("today", () => {
    const className = "datepicker__day--today";

    it("should apply the today class if today", () => {
      const dayDOM = renderDay(moment());
      expect(dayDOM.className).to.contain(className);
    });

    it("should not apply the today class if not today", () => {
      const dayDOM = renderDay(moment().add(1, "day"));
      expect(dayDOM.className).to.not.contain(className);
    });
  });

  describe("weekend", () => {
    const className = "datepicker__day--weekend";

    it("should apply the weekend class if Saturday", () => {
      const dayDOM = renderDay(moment("2015-12-19"));
      expect(dayDOM.className).to.contain(className);
    });

    it("should apply the weekend class if Sunday", () => {
      const dayDOM = renderDay(moment("2015-12-20"));
      expect(dayDOM.className).to.contain(className);
    });

    it("should not apply the today class if not the weekend", () => {
      const dayDOM = renderDay(moment("2015-12-21"));
      expect(dayDOM.className).to.not.contain(className);
    });
  });

  describe("outside month", () => {
    const className = "datepicker__day--outside-month";

    it("should not apply the outside-month class if in same month", () => {
      const day = moment();
      const dayDOM = renderDay(day, { month: day.month() });
      expect(dayDOM.className).to.not.contain(className);
    });

    it("should apply the outside-month class if not in same month", () => {
      const day = moment();
      const dayDOM = renderDay(day, { month: day.month() + 1 });
      expect(dayDOM.className).to.contain(className);
    });
  });

  describe("disabled", () => {
    const className = "datepicker__day--disabled";

    it("should be enabled by default", () => {
      const dayDOM = renderDay(moment());
      expect(dayDOM.className).to.not.contain(className);
    });

    it("should be enabled if on the min date", () => {
      const day = moment();
      const dayDOM = renderDay(day, { minDate: day });
      expect(dayDOM.className).to.not.contain(className);
    });

    it("should be disabled if before the min date", () => {
      const day = moment();
      const minDate = day.clone().add(1, "day");
      const dayDOM = renderDay(day, { minDate });
      expect(dayDOM.className).to.contain(className);
    });

    it("should be enabled if on the max date", () => {
      const day = moment();
      const dayDOM = renderDay(day, { maxDate: day });
      expect(dayDOM.className).to.not.contain(className);
    });

    it("should be disabled if after the max date", () => {
      const day = moment();
      const maxDate = day.clone().subtract(1, "day");
      const dayDOM = renderDay(day, { maxDate });
      expect(dayDOM.className).to.contain(className);
    });

    it("should be disabled if in excluded dates", () => {
      const day = moment();
      const dayDOM = renderDay(day, { excludeDates: [day] });
      expect(dayDOM.className).to.contain(className);
    });

    it("should be enabled if in included dates", () => {
      const day = moment();
      const dayDOM = renderDay(day, { includeDates: [day] });
      expect(dayDOM.className).to.not.contain(className);
    });

    it("should be disabled if not in included dates", () => {
      const day = moment();
      const includeDates = [day.clone().add(1, "day")];
      const dayDOM = renderDay(day, { includeDates });
      expect(dayDOM.className).to.contain(className);
    });

    it("should be enabled if date filter returns true", () => {
      const day = moment();
      const filterDate = d => d.isSame(day);
      const dayDOM = renderDay(day, { filterDate });
      expect(dayDOM.className).to.not.contain(className);
    });

    it("should be disabled if date filter returns false", () => {
      const day = moment();
      const filterDate = d => !d.isSame(day);
      const dayDOM = renderDay(day, { filterDate });
      expect(dayDOM.className).to.contain(className);
    });

    it("should not allow date filter to modify input date", () => {
      const day = moment();
      const dayClone = day.clone();
      const filterDate = d => {
        d.add(1, "day"); // jscs:disable momentImmutability
        return true;
      };
      const dayDOM = renderDay(day, { filterDate });
      expect(day.isSame(dayClone)).to.be.true;
    });
  });

  describe("click", () => {
    var onClickCalled;

    function onClick() {
      onClickCalled = true;
    }

    beforeEach(() => {
      onClickCalled = false;
    });

    it("should call onClick if day is enabled", () => {
      const day = moment();
      const dayNode = TestUtils.renderIntoDocument(
        <Day day={day} onClick={onClick} />
      );
      const dayDOM = TestUtils.findRenderedDOMComponentWithClass(dayNode, "datepicker__day");
      TestUtils.Simulate.click(dayDOM);
      expect(onClickCalled).to.be.true;
    });

    it("should not call onClick if day is disabled", () => {
      const day = moment();
      const dayNode = TestUtils.renderIntoDocument(
        <Day day={day} excludeDates={[day]} onClick={onClick} />
      );
      const dayDOM = TestUtils.findRenderedDOMComponentWithClass(dayNode, "datepicker__day");
      TestUtils.Simulate.click(dayDOM);
      expect(onClickCalled).to.be.false;
    });
  });
});
