import React from "react";
import Day from "../src/day";
import { shallow } from "enzyme";
import {
  getDayOfWeekCode,
  newDate,
  getDate,
  addDays,
  subDays,
  getMonth,
  newDateWithOffset,
  getHightLightDaysMap
} from "../src/date_utils";

function renderDay(day, props = {}) {
  return shallow(<Day day={day} {...props} />);
}

describe("Day", () => {
  describe("rendering", () => {
    it("should render the specified day", () => {
      const day = newDate();
      const shallowDay = renderDay(day);
      expect(shallowDay.hasClass("react-datepicker__day")).to.equal(true);
      expect(shallowDay.text()).to.equal(getDate(day) + "");
    });

    it("should apply the day of week class", () => {
      let day = newDate();
      for (var i = 0; i < 7; i++) {
        const className = "react-datepicker__day--" + getDayOfWeekCode(day);
        const shallowDay = renderDay(day);
        expect(shallowDay.hasClass(className)).to.equal(true);
        day = addDays(day, 1);
      }
    });

    it("should render custom day contents", () => {
      const day = newDate();
      function renderDayContents(day) {
        return <span>{day}</span>;
      }
      const shallowDay = renderDay(day, { renderDayContents });
      expect(shallowDay.find("span"));
    });
  });

  describe("selected", () => {
    const className = "react-datepicker__day--selected";

    it("should apply the selected class if selected", () => {
      const day = newDate();
      const shallowDay = renderDay(day, { selected: day });
      expect(shallowDay.hasClass(className)).to.equal(true);
    });

    it("should not apply the selected class if not selected", () => {
      const day = newDate();
      const selected = addDays(day, 1);
      const shallowDay = renderDay(day, { selected });
      expect(shallowDay.hasClass(className)).to.equal(false);
    });
  });

  describe("keyboard-selected", () => {
    const className = "react-datepicker__day--keyboard-selected";

    it("should apply the keyboard-selected class when pre-selected and another day is selected", () => {
      const day = newDate();
      const selected = addDays(day, 1);
      const shallowDay = renderDay(day, { selected, preSelection: day });
      expect(shallowDay.hasClass(className)).to.equal(true);
    });

    it("should not apply the keyboard-selected class when selected", () => {
      const day = newDate();
      const shallowDay = renderDay(day, { selected: day, preSelection: day });
      expect(shallowDay.hasClass(className)).to.equal(false);
    });

    it("should not apply the keyboard-selected class when another day is pre-selected", () => {
      const day = newDate();
      const selected = addDays(day, 1);
      const preSelection = addDays(day, 2);
      const shallowDay = renderDay(day, { selected, preSelection });
      expect(shallowDay.hasClass(className)).to.equal(false);
    });

    it("should not apply the keyboard-selected class if in inline mode", () => {
      const day = newDate();
      const selected = addDays(day, 1);
      const shallowDay = renderDay(day, {
        selected,
        preSelection: day,
        inline: true
      });
      expect(shallowDay.hasClass(className)).to.equal(false);
    });
  });

  describe("highlighted", () => {
    const className = "react-datepicker__day--highlighted";

    it("should apply the highlighted class if in highlighted array", () => {
      const day = newDate();
      const highlightDay1 = newDate(day);
      const highlightDay2 = addDays(day, 1);
      const highlightDates = [highlightDay1, highlightDay2];
      const highlightDatesMap = getHightLightDaysMap(highlightDates);
      const shallowDay = renderDay(day, { highlightDates: highlightDatesMap });
      expect(shallowDay.hasClass(className)).to.equal(true);
    });

    it("should not apply the highlighted class if not in highlighted array", () => {
      const day = newDate();
      const highlightDay1 = subDays(day, 1);
      const highlightDay2 = addDays(day, 1);
      const highlightDates = [highlightDay1, highlightDay2];
      const highlightDatesMap = getHightLightDaysMap(highlightDates);
      const shallowDay = renderDay(day, { highlightDates: highlightDatesMap });
      expect(shallowDay.hasClass(className)).to.equal(false);
    });

    describe("prop is an array of objects with class name as a key and array of moments as a value", () => {
      it("should apply the highlighted class if in highlighted", () => {
        const day = newDate();
        const highlightDay1 = {
          testClassName: [addDays(day, 1), newDate(day)]
        };
        const highlightDay2 = addDays(day, 2);
        const highlightDay3 = addDays(day, 3);
        const highlightDates = [highlightDay1, highlightDay2, highlightDay3];
        const highlightDatesMap = getHightLightDaysMap(highlightDates);
        const shallowDay = renderDay(day, {
          highlightDates: highlightDatesMap
        });
        expect(shallowDay.hasClass("testClassName")).to.equal(true);
      });

      it("should not apply the highlighted class if not in highlighted array", () => {
        const day = newDate();
        const highlightDay1 = {
          testClassName: [addDays(day, 1), addDays(day, 2)]
        };
        const highlightDay2 = addDays(day, 3);
        const highlightDay3 = addDays(day, 4);
        const highlightDates = [highlightDay1, highlightDay2, highlightDay3];
        const highlightDatesMap = getHightLightDaysMap(highlightDates);
        const shallowDay = renderDay(day, {
          highlightDates: highlightDatesMap
        });
        expect(shallowDay.hasClass("testClassName")).to.equal(false);
      });

      it("should apply the highlighted classes even if the same day in highlighted array", () => {
        const day = newDate();
        const highlightDay1 = { fooClassName: [newDate(day)] };
        const highlightDay2 = { barClassName: [newDate(day)] };
        const highlightDay3 = newDate(day);
        const highlightDates = [highlightDay1, highlightDay2, highlightDay3];
        const highlightDatesMap = getHightLightDaysMap(highlightDates);
        const shallowDay = renderDay(day, {
          highlightDates: highlightDatesMap
        });
        expect(shallowDay.hasClass("fooClassName")).to.equal(true);
        expect(shallowDay.hasClass("barClassName")).to.equal(true);
        expect(shallowDay.hasClass(className)).to.equal(true);
      });
    });
  });

  describe("custom day className", () => {
    const className = "customClassName";

    it("should apply className returned from passed dayClassName prop function", () => {
      const day = newDate();
      const dayClassNameFunc = date => className;
      const shallowDay = renderDay(day, { dayClassName: dayClassNameFunc });
      expect(shallowDay.hasClass(className)).to.equal(true);
    });

    it("should pass rendered days date to dayClassName func", () => {
      const day = newDate();
      const dayClassNameFunc = date => {
        expect(date).to.equal(day);
        return className;
      };
      const shallowDay = renderDay(day, { dayClassName: dayClassNameFunc });
      expect(shallowDay.hasClass(className)).to.equal(true);
    });

    it("should not add any additional className when passed dayClassName prop function returns undefined", () => {
      const day = newDate();
      const dayClassNameFunc = date => undefined;
      const shallowDay = renderDay(day, { dayClassName: dayClassNameFunc });
      expect(shallowDay.hasClass(className)).to.equal(false);
      expect(shallowDay.hasClass("undefined")).to.equal(false);
    });

    it("should not add any additional className when dayClassName prop is not passed", () => {
      const day = newDate();
      const shallowDay = renderDay(day);
      expect(shallowDay.hasClass(className)).to.equal(false);
      expect(shallowDay.hasClass("undefined")).to.equal(false);
    });
  });

  describe("in range", () => {
    const className = "react-datepicker__day--in-range";

    it("should apply the in-range class if in range", () => {
      const day = newDate();
      const startDate = subDays(day, 1);
      const endDate = addDays(day, 1);
      const shallowDay = renderDay(day, { startDate, endDate });
      expect(shallowDay.hasClass(className)).to.equal(true);
    });

    it("should not apply the in-range class if not in range", () => {
      const day = newDate();
      const startDate = addDays(day, 1);
      const endDate = addDays(day, 2);
      const shallowDay = renderDay(day, { startDate, endDate });
      expect(shallowDay.hasClass(className)).to.equal(false);
    });

    it("should apply the in-range class if equal to start date", () => {
      const day = newDate();
      const startDate = newDate(day);
      const endDate = addDays(day, 1);
      const shallowDay = renderDay(day, { startDate, endDate });
      expect(shallowDay.hasClass(className)).to.equal(true);
    });

    it("should apply the in-range class if equal to end date", () => {
      const day = newDate();
      const startDate = subDays(day, 1);
      const endDate = newDate(day);
      const shallowDay = renderDay(day, { startDate, endDate });
      expect(shallowDay.hasClass(className)).to.equal(true);
    });

    it("should not apply the in-range class if start date missing", () => {
      const day = newDate();
      const startDate = subDays(day, 1);
      const shallowDay = renderDay(day, { startDate });
      expect(shallowDay.hasClass(className)).to.equal(false);
    });

    it("should not apply the in-range class if end date missing", () => {
      const day = newDate();
      const endDate = addDays(day, 1);
      const shallowDay = renderDay(day, { endDate });
      expect(shallowDay.hasClass(className)).to.equal(false);
    });
  });

  describe("in selecting range", () => {
    const rangeDayClassName = "react-datepicker__day--in-selecting-range";
    const rangeDayStartClassName =
      "react-datepicker__day--selecting-range-start";
    const rangeDayEndClassName = "react-datepicker__day--selecting-range-end";

    function createDateRange(beforeDays, afterDays, day = newDate()) {
      return {
        startDate: subDays(day, beforeDays),
        endDate: addDays(day, afterDays),
        day
      };
    }

    describe("for a start date picker", () => {
      it("should highlight for dates before the end date", () => {
        const { startDate, endDate } = createDateRange(-1, 1);

        // All these should highlight: today, yesterday (startDate), the day before
        for (let daysFromEnd = 1; daysFromEnd <= 3; daysFromEnd++) {
          const selectingDate = subDays(endDate, daysFromEnd);
          const shallowDay = renderDay(selectingDate, {
            startDate,
            endDate,
            selectingDate,
            selectsStart: true
          });
          expect(shallowDay.hasClass(rangeDayClassName)).to.be.true;
        }
      });

      it("should have a class if it is a start or end date", () => {
        const endDate = newDate();
        const midRangeDate = subDays(endDate, 1);
        const selectingDate = subDays(endDate, 2);

        const shallowStartDay = renderDay(selectingDate, {
          endDate,
          selectingDate,
          selectsStart: true
        });
        expect(shallowStartDay.hasClass(rangeDayStartClassName)).to.be.true;

        const shallowMidRangeDay = renderDay(midRangeDate, {
          endDate,
          selectingDate,
          selectsStart: true
        });
        expect(shallowMidRangeDay.hasClass(rangeDayStartClassName)).to.be.false;
        expect(shallowMidRangeDay.hasClass(rangeDayEndClassName)).to.be.false;

        const shallowEndDay = renderDay(endDate, {
          endDate,
          selectingDate,
          selectsStart: true
        });
        expect(shallowEndDay.hasClass(rangeDayEndClassName)).to.be.true;
      });

      it("should not highlight for days after the end date", () => {
        const { day, startDate, endDate } = createDateRange(-1, 1);
        const selectingDate = addDays(endDate, 1);
        const shallowDay = renderDay(day, {
          startDate,
          endDate,
          selectingDate,
          selectsStart: true
        });
        expect(shallowDay.hasClass(rangeDayClassName)).to.be.false;
      });

      it("should not highlight if there is no end date selected", () => {
        const startDate = newDate();
        const selectingDate = subDays(startDate, 1);
        const shallowDay = renderDay(selectingDate, {
          startDate,
          selectingDate,
          selectsStart: true
        });
        expect(shallowDay.hasClass(rangeDayClassName)).to.be.false;
      });

      it("should not highlight for disabled dates", () => {
        const endDate = newDate();
        const selectingDate = subDays(endDate, 1);
        const shallowDay = renderDay(selectingDate, {
          selectingDate,
          endDate,
          selectsStart: true,
          excludeDates: [selectingDate]
        });
        expect(shallowDay.hasClass(rangeDayClassName)).to.be.false;
      });
    });

    describe("for an end date picker", () => {
      it("should highlight for dates after the start date", () => {
        const { startDate, endDate } = createDateRange(-1, 1);

        // All these should highlight: today, tomorrow (endDate), the day after
        for (let daysFromStart = 1; daysFromStart <= 3; daysFromStart++) {
          const day = addDays(startDate, daysFromStart);
          const shallowDay = renderDay(day, {
            startDate,
            endDate,
            selectingDate: day,
            selectsEnd: true
          });
          expect(shallowDay.hasClass(rangeDayClassName)).to.be.true;
        }
      });

      it("should have a class if it is a start or end date", () => {
        const startDate = newDate();
        const midRangeDate = addDays(startDate, 1);
        const selectingDate = addDays(startDate, 2);

        const shallowStartDay = renderDay(startDate, {
          startDate,
          selectingDate,
          selectsEnd: true
        });
        expect(shallowStartDay.hasClass(rangeDayStartClassName)).to.be.true;

        const shallowMidRangeDay = renderDay(midRangeDate, {
          startDate,
          selectingDate,
          selectsEnd: true
        });
        expect(shallowMidRangeDay.hasClass(rangeDayStartClassName)).to.be.false;
        expect(shallowMidRangeDay.hasClass(rangeDayEndClassName)).to.be.false;

        const shallowEndDay = renderDay(selectingDate, {
          startDate,
          selectingDate,
          selectsEnd: true
        });
        expect(shallowEndDay.hasClass(rangeDayEndClassName)).to.be.true;
      });

      it("should not highlight for days before the start date", () => {
        const startDate = newDate();
        const selectingDate = subDays(startDate, 1);
        const shallowDay = renderDay(selectingDate, {
          startDate,
          selectingDate,
          selectsEnd: true
        });
        expect(shallowDay.hasClass(rangeDayClassName)).to.be.false;
      });

      it("should not highlight if there is no start date selected", () => {
        const { day, endDate } = createDateRange(-1, 1);
        const selectingDate = addDays(endDate, 1);
        const shallowDay = renderDay(day, {
          endDate,
          selectingDate,
          selectsEnd: true
        });
        expect(shallowDay.hasClass(rangeDayClassName)).to.be.false;
      });

      it("should not highlight for disabled dates", () => {
        const startDate = newDate();
        const selectingDate = addDays(startDate, 1);
        const shallowDay = renderDay(selectingDate, {
          startDate,
          selectingDate,
          selectsEnd: true,
          excludeDates: [selectingDate]
        });
        expect(shallowDay.hasClass(rangeDayClassName)).to.be.false;
      });
    });
  });

  describe("today", () => {
    const className = "react-datepicker__day--today";

    it("should apply the today class if today", () => {
      const shallowDay = renderDay(newDate());
      expect(shallowDay.hasClass(className)).to.equal(true);
    });

    it("should not apply the today class if not today", () => {
      const shallowDay = renderDay(addDays(newDate(), 1));
      expect(shallowDay.hasClass(className)).to.equal(false);
    });
  });

  describe("weekend", () => {
    const className = "react-datepicker__day--weekend";

    it("should apply the weekend class if Saturday", () => {
      const shallowDay = renderDay(newDate("2015-12-19"));
      expect(shallowDay.hasClass(className)).to.equal(true);
    });

    it("should apply the weekend class if Sunday", () => {
      const shallowDay = renderDay(newDate("2015-12-20"));
      expect(shallowDay.hasClass(className)).to.equal(true);
    });

    it("should not apply the today class if not the weekend", () => {
      const shallowDay = renderDay(newDate("2015-12-21"));
      expect(shallowDay.hasClass(className)).to.equal(false);
    });
  });

  describe("outside month", () => {
    const className = "react-datepicker__day--outside-month";

    it("should not apply the outside-month class if in same month", () => {
      const day = newDate();
      const shallowDay = renderDay(day, { month: getMonth(day) });
      expect(shallowDay.hasClass(className)).to.equal(false);
    });

    it("should apply the outside-month class if not in same month", () => {
      const day = newDate();
      const shallowDay = renderDay(day, { month: getMonth(day) + 1 });
      expect(shallowDay.hasClass(className)).to.equal(true);
    });
  });

  describe("disabled", () => {
    const className = "react-datepicker__day--disabled";

    it("should be enabled if date is enabled", () => {
      const shallowDay = renderDay(newDate());
      expect(shallowDay.hasClass(className)).to.equal(false);
    });

    it("should be disabled if date is disabled", () => {
      const day = newDate();
      const shallowDay = renderDay(day, { excludeDates: [day] });
      expect(shallowDay.hasClass(className)).to.equal(true);
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
      const day = newDate();
      const dayNode = shallow(<Day day={day} onClick={onClick} />);
      dayNode.find(".react-datepicker__day").simulate("click");
      expect(onClickCalled).to.be.true;
    });

    it("should not call onClick if day is disabled", () => {
      const day = newDate();
      const dayNode = shallow(
        <Day day={day} excludeDates={[day]} onClick={onClick} />
      );
      dayNode.find(".react-datepicker__day").simulate("click");
      expect(onClickCalled).to.be.false;
    });
  });

  describe("mouse enter", () => {
    var onMouseEnterCalled;

    function onMouseEnter() {
      onMouseEnterCalled = true;
    }

    beforeEach(() => {
      onMouseEnterCalled = false;
    });

    it("should call onMouseEnter if day is hovered", () => {
      const shallowDay = renderDay(newDate(), { onMouseEnter });
      shallowDay.find(".react-datepicker__day").simulate("mouseenter");
      expect(onMouseEnterCalled).to.be.true;
    });
  });
});
