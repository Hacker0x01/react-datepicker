import { render, fireEvent } from "@testing-library/react";
import { es } from "date-fns/locale";
import React from "react";

import {
  getDayOfWeekCode,
  newDate,
  getDate,
  addDays,
  subDays,
  getMonth,
  getHighLightDaysMap,
  getHolidaysMap,
  registerLocale,
} from "../date_utils";
import Day from "../day";

import { safeQuerySelector } from "./test_utils";

function renderDay(day: Date, props = {}) {
  return render(
    <Day day={day} month={0} handleOnKeyDown={() => {}} {...props} />,
  ).container;
}

describe("Day", () => {
  describe("rendering", () => {
    it("should render the specified day", () => {
      const day = newDate();
      const container = renderDay(day);
      expect(container.querySelector(".react-datepicker__day")).not.toBeNull();
      expect(container.textContent).toBe(getDate(day) + "");
    });

    it("should apply the day of week class", () => {
      let day = newDate();
      for (let i = 0; i < 7; i++) {
        const className = "react-datepicker__day--" + getDayOfWeekCode(day);
        const container = renderDay(day);
        expect(
          container
            .querySelector(".react-datepicker__day")
            ?.classList.contains(className),
        ).toBe(true);
        day = addDays(day, 1);
      }
    });

    it("should render custom day contents", () => {
      const day = newDate();
      function renderDayContents(_day: Date, date: Date) {
        const tooltipText = `Tooltip for date: ${date}`;
        return <span title={tooltipText}>{getDate(date)}</span>;
      }
      const container = renderDay(day, { renderDayContents });
      expect(container.querySelector("span")).not.toBeNull();
    });
  });

  describe("interactions", () => {
    it("should not trigger onMouseEnter when the day is disabled", () => {
      const onMouseEnter = jest.fn();
      const day = newDate();
      const container = renderDay(day, {
        disabled: true,
        onMouseEnter,
      });

      const node = safeQuerySelector(container, ".react-datepicker__day");
      fireEvent.mouseEnter(node);

      expect(onMouseEnter).not.toHaveBeenCalled();
    });

    it("should convert space key presses to enter events", () => {
      const onKeyDown = jest.fn();
      const container = renderDay(newDate(), { handleOnKeyDown: onKeyDown });
      const node = safeQuerySelector(container, ".react-datepicker__day");

      fireEvent.keyDown(node, { key: " " });

      expect(onKeyDown).toHaveBeenCalled();
      expect(onKeyDown.mock.calls[0][0].key).toBe("Enter");
    });
  });

  describe("holidays and titles", () => {
    it("should append holiday class names when provided", () => {
      const day = new Date("2024-01-01T00:00:00");
      const holidays = getHolidaysMap([{ date: day, holidayName: "New Year" }]);
      const container = renderDay(day, { holidays });

      const node = safeQuerySelector(container, ".react-datepicker__day");
      expect(node.className).toContain("react-datepicker__day--holidays");
    });

    it("should include exclude date messages in the title overlay", () => {
      const day = new Date("2024-02-05T00:00:00");
      const container = renderDay(day, {
        excludeDates: [{ date: day, message: "Blocked day" }],
      });

      const node = safeQuerySelector(container, ".react-datepicker__day");
      expect(node.getAttribute("title")).toContain("Blocked day");
    });
  });

  describe("selected", () => {
    const className = "react-datepicker__day--selected";
    let day: Date;

    beforeEach(() => {
      day = newDate();
    });

    describe("if selected", () => {
      let container: HTMLElement;
      beforeEach(() => {
        container = renderDay(day, { selected: day });
      });

      it("should apply the selected class", () => {
        expect(
          container
            .querySelector(".react-datepicker__day")
            ?.classList.contains(className),
        ).toBe(true);
      });

      it('should set aria-selected attribute to "true"', () => {
        expect(
          container
            .querySelector(".react-datepicker__day")
            ?.getAttribute("aria-selected"),
        ).toBe("true");
      });

      it('should set aria-selected attribute to "true" if previous and after days selected', () => {
        const day = newDate();
        const startDate = subDays(day, 1);
        const endDate = addDays(day, 1);
        const container = renderDay(day, { startDate, endDate });
        expect(
          container
            .querySelector(".react-datepicker__day")
            ?.getAttribute("aria-selected"),
        ).toBe("true");
      });

      it("should apply the selected class for selectedDates", () => {
        const container = renderDay(day, {
          selectsMultiple: true,
          selectedDates: [day],
        });
        expect(
          container
            .querySelector(".react-datepicker__day")
            ?.classList.contains(className),
        ).toBe(true);
      });
    });

    describe("if not selected", () => {
      let container: HTMLElement;
      beforeEach(() => {
        const selected = addDays(day, 1);
        container = renderDay(day, { selected });
      });

      it("should not apply the selected class", () => {
        expect(
          container
            .querySelector(".react-datepicker__day")
            ?.classList.contains(className),
        ).toBe(false);
      });

      it('should set aria-selected attribute to "false"', () => {
        expect(
          container
            .querySelector(".react-datepicker__day")
            ?.getAttribute("aria-selected"),
        ).toBe("false");
      });
    });
  });

  describe("keyboard-selected", () => {
    const className = "react-datepicker__day--keyboard-selected";

    it("should apply the keyboard-selected class when pre-selected and another day is selected", () => {
      const day = newDate();
      const selected = addDays(day, 1);
      const container = renderDay(day, { selected, preSelection: day });
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(true);
    });

    it("should apply the keyboard-selected class when pre-selected and another days is multi-selected", () => {
      const day = newDate();
      const selected = addDays(day, 1);
      const container = renderDay(day, {
        selectedDates: [selected],
        selectsMultiple: true,
        preSelection: day,
      });
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(true);
    });

    it("should not apply the key-selected class when pre-selected is a part of disabled dates", () => {
      const day = newDate();
      const container = renderDay(day, {
        excludeDates: [day],
        preSelection: day,
      });
      const dayNode = container.querySelector(".react-datepicker__day")!;

      expect(dayNode.classList.contains(className)).toBe(false);
    });

    it("should not apply the keyboard-selected class when selected", () => {
      const day = newDate();
      const container = renderDay(day, { selected: day, preSelection: day });
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(false);
    });

    it("should not apply the keyboard-selected class when selected a multi-selected day", () => {
      const day = newDate();
      const container = renderDay(day, {
        selectedDates: [day],
        selectsMultiple: true,
        preSelection: day,
      });
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(false);
    });

    it("should not apply the keyboard-selected class when another day is pre-selected", () => {
      const day = newDate();
      const selected = addDays(day, 1);
      const preSelection = addDays(day, 2);
      const container = renderDay(day, { selected, preSelection });
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(false);
    });

    it("should apply the keyboard-selected class if in inline mode", () => {
      const day = newDate();
      const selected = addDays(day, 1);
      const container = renderDay(day, {
        selected,
        preSelection: day,
        inline: true,
      });
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(true);
    });
  });

  describe("highlighted", () => {
    const className = "react-datepicker__day--highlighted";

    it("should apply the highlighted class if in highlighted array", () => {
      const day = newDate();
      const highlightDay1 = newDate(day);
      const highlightDay2 = addDays(day, 1);
      const highlightDates = [highlightDay1, highlightDay2];
      const highlightDatesMap = getHighLightDaysMap(highlightDates);
      const container = renderDay(day, { highlightDates: highlightDatesMap });
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(true);
    });

    it("should not apply the highlighted class if not in highlighted array", () => {
      const day = newDate();
      const highlightDay1 = subDays(day, 1);
      const highlightDay2 = addDays(day, 1);
      const highlightDates = [highlightDay1, highlightDay2];
      const highlightDatesMap = getHighLightDaysMap(highlightDates);
      const container = renderDay(day, { highlightDates: highlightDatesMap });
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(false);
    });

    describe("prop is an array of objects with class name as a key and array of moments as a value", () => {
      it("should apply the highlighted class if in highlighted", () => {
        const day = newDate();
        const highlightDay1 = {
          testClassName: [addDays(day, 1), newDate(day)],
        };
        const highlightDay2 = addDays(day, 2);
        const highlightDay3 = addDays(day, 3);
        const highlightDates = [highlightDay1, highlightDay2, highlightDay3];
        const highlightDatesMap = getHighLightDaysMap(highlightDates);
        const container = renderDay(day, {
          highlightDates: highlightDatesMap,
        });
        expect(
          container
            .querySelector(".react-datepicker__day")
            ?.classList.contains("testClassName"),
        ).toBe(true);
      });

      it("should not apply the highlighted class if not in highlighted array", () => {
        const day = newDate();
        const highlightDay1 = {
          testClassName: [addDays(day, 1), addDays(day, 2)],
        };
        const highlightDay2 = addDays(day, 3);
        const highlightDay3 = addDays(day, 4);
        const highlightDates = [highlightDay1, highlightDay2, highlightDay3];
        const highlightDatesMap = getHighLightDaysMap(highlightDates);
        const container = renderDay(day, {
          highlightDates: highlightDatesMap,
        });
        expect(
          container
            .querySelector(".react-datepicker__day")
            ?.classList.contains("testClassName"),
        ).toBe(false);
      });

      it("should apply the highlighted classes even if the same day in highlighted array", () => {
        const day = newDate();
        const highlightDay1 = { fooClassName: [newDate(day)] };
        const highlightDay2 = { barClassName: [newDate(day)] };
        const highlightDay3 = newDate(day);
        const highlightDates = [highlightDay1, highlightDay2, highlightDay3];
        const highlightDatesMap = getHighLightDaysMap(highlightDates);
        const container = renderDay(day, {
          highlightDates: highlightDatesMap,
        });
        expect(
          container
            .querySelector(".react-datepicker__day")
            ?.classList.contains("fooClassName"),
        ).toBe(true);
        expect(
          container
            .querySelector(".react-datepicker__day")
            ?.classList.contains("barClassName"),
        ).toBe(true);
        expect(
          container
            .querySelector(".react-datepicker__day")
            ?.classList.contains(className),
        ).toBe(true);
      });
    });
  });

  describe("holidays", () => {
    const className = "react-datepicker__day--holidays";

    it("should apply the holidays class if in holidays array", () => {
      const day = newDate();
      const holidaysDates = [
        { date: new Date(), holidayName: "India's Independence Day" },
        { date: new Date(2023, 11, 25), holidayName: "Christmas" },
      ];
      const holidaysDatesMap = getHolidaysMap(holidaysDates);
      const container = renderDay(day, { holidays: holidaysDatesMap });
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(true);
    });

    it("should not apply the holiday class if not in holidays array", () => {
      const day = new Date(2023, 7, 14);
      const holidaysDates = [
        {
          date: new Date(2023, 7, 15),
          holidayName: "India's Independence Day",
        },
        {
          date: new Date(2023, 11, 25),
          holidayName: "Christmas",
        },
      ];
      const holidaysDatesMap = getHolidaysMap(holidaysDates);
      const container = renderDay(day, { holidays: holidaysDatesMap });
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(false);
    });
  });

  describe("custom day className", () => {
    const className = "customClassName";

    it("should apply className returned from passed dayClassName prop function", () => {
      const day = newDate();
      const dayClassNameFunc = () => className;
      const container = renderDay(day, { dayClassName: dayClassNameFunc });
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(true);
    });

    it("should pass rendered days date to dayClassName func", () => {
      const day = newDate();
      const dayClassNameFunc = (date: Date) => {
        expect(date).toBe(day);
        return className;
      };
      const container = renderDay(day, { dayClassName: dayClassNameFunc });
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(true);
    });

    it("should not add any additional className when passed dayClassName prop function returns undefined", () => {
      const day = newDate();
      const dayClassNameFunc = () => undefined;
      const container = renderDay(day, { dayClassName: dayClassNameFunc });
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(false);
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains("undefined"),
      ).toBe(false);
    });

    it("should not add any additional className when dayClassName prop is not passed", () => {
      const day = newDate();
      const container = renderDay(day);
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(false);
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains("undefined"),
      ).toBe(false);
    });
  });

  describe("in range", () => {
    const className = "react-datepicker__day--in-range";

    it("should apply the in-range class if in range", () => {
      const day = newDate();
      const startDate = subDays(day, 1);
      const endDate = addDays(day, 1);
      const container = renderDay(day, { startDate, endDate });
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(true);
    });

    it("should not apply the in-range class if not in range", () => {
      const day = newDate();
      const startDate = addDays(day, 1);
      const endDate = addDays(day, 2);
      const container = renderDay(day, { startDate, endDate });
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(false);
    });

    it("should apply the in-range class if equal to start date", () => {
      const day = newDate();
      const startDate = newDate(day);
      const endDate = addDays(day, 1);
      const container = renderDay(day, { startDate, endDate });
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(true);
    });

    it("should apply the in-range class if equal to end date", () => {
      const day = newDate();
      const startDate = subDays(day, 1);
      const endDate = newDate(day);
      const container = renderDay(day, { startDate, endDate });
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(true);
    });

    it("should not apply the in-range class if start date missing", () => {
      const day = newDate();
      const startDate = subDays(day, 1);
      const container = renderDay(day, { startDate });
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(false);
    });

    it("should not apply the in-range class if end date missing", () => {
      const day = newDate();
      const endDate = addDays(day, 1);
      const container = renderDay(day, { endDate });
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(false);
    });
  });

  describe("in selecting range", () => {
    const rangeDayClassName = "react-datepicker__day--in-selecting-range";
    const rangeDayStartClassName =
      "react-datepicker__day--selecting-range-start";
    const rangeDayEndClassName = "react-datepicker__day--selecting-range-end";

    function createDateRange(
      beforeDays: number,
      afterDays: number,
      day = newDate(),
    ) {
      return {
        startDate: subDays(day, beforeDays),
        endDate: addDays(day, afterDays),
        day,
      };
    }

    describe("for a start date picker", () => {
      it("should highlight for dates before the end date", () => {
        const { startDate, endDate } = createDateRange(-1, 1);

        // All these should highlight: today, yesterday (startDate), the day before
        for (let daysFromEnd = 1; daysFromEnd <= 3; daysFromEnd++) {
          const selectingDate = subDays(endDate, daysFromEnd);
          const container = renderDay(selectingDate, {
            startDate,
            endDate,
            selectingDate,
            selectsStart: true,
          });
          expect(
            container
              .querySelector(".react-datepicker__day")
              ?.classList.contains(rangeDayClassName),
          ).toBe(true);
        }
      });

      it("should have a class if it is a start or end date", () => {
        const endDate = newDate();
        const midRangeDate = subDays(endDate, 1);
        const selectingDate = subDays(endDate, 2);

        const containertartDay = renderDay(selectingDate, {
          endDate,
          selectingDate,
          selectsStart: true,
        });
        expect(
          containertartDay
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayStartClassName),
        ).toBe(true);

        const containerMidRangeDay = renderDay(midRangeDate, {
          endDate,
          selectingDate,
          selectsStart: true,
        });
        expect(
          containerMidRangeDay
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayStartClassName),
        ).toBe(false);
        expect(
          containerMidRangeDay
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayStartClassName),
        ).toBe(false);

        const containerEndDay = renderDay(endDate, {
          endDate,
          selectingDate,
          selectsStart: true,
        });
        expect(
          containerEndDay
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayEndClassName),
        ).toBe(true);
      });

      it("should not highlight for days after the end date", () => {
        const { day, startDate, endDate } = createDateRange(-1, 1);
        const selectingDate = addDays(endDate, 1);
        const container = renderDay(day, {
          startDate,
          endDate,
          selectingDate,
          selectsStart: true,
        });
        expect(
          container
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayClassName),
        ).toBe(false);
      });

      it("should not highlight if there is no end date selected", () => {
        const startDate = newDate();
        const selectingDate = subDays(startDate, 1);
        const container = renderDay(selectingDate, {
          startDate,
          selectingDate,
          selectsStart: true,
        });
        expect(
          container
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayClassName),
        ).toBe(false);
      });

      it("should not highlight for disabled dates when selectsDisabledDaysInRange is false (default)", () => {
        const endDate = newDate();
        const selectingDate = subDays(endDate, 1);
        const container = renderDay(selectingDate, {
          selectingDate,
          endDate,
          selectsStart: true,
          excludeDates: [selectingDate],
        });
        expect(
          container
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayClassName),
        ).toBe(false);
      });

      it("should highlight for disabled dates when selectsDisabledDaysInRange is true", () => {
        const endDate = newDate();
        const selectingDate = subDays(endDate, 1);
        const container = renderDay(selectingDate, {
          selectingDate,
          endDate,
          selectsStart: true,
          excludeDates: [selectingDate],
          selectsDisabledDaysInRange: true,
        });
        expect(
          container
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayClassName),
        ).toBe(true);
      });

      it("should not highlight for disabled dates within interval when selectsDisabledDaysInRange is false (default)", () => {
        const endDate = newDate();
        const selectingDate = subDays(endDate, 1);
        const container = renderDay(selectingDate, {
          selectingDate,
          endDate,
          selectsStart: true,
          excludeDateIntervals: [
            { start: subDays(selectingDate, 1), end: endDate },
          ],
        });
        expect(
          container
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayClassName),
        ).toBe(false);
      });

      it("should highlight for disabled dates within interval when selectsDisabledDaysInRange is true", () => {
        const endDate = newDate();
        const selectingDate = subDays(endDate, 1);
        const container = renderDay(selectingDate, {
          selectingDate,
          endDate,
          selectsStart: true,
          excludeDateIntervals: [
            { start: subDays(selectingDate, 1), end: endDate },
          ],
          selectsDisabledDaysInRange: true,
        });
        expect(
          container
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayClassName),
        ).toBe(true);
      });
    });

    describe("for an end date picker", () => {
      it("should highlight all dates after the start date (if the endDate is not selected yet)", () => {
        const { startDate } = createDateRange(-1, 1);

        for (let daysFromStart = 1; daysFromStart <= 3; daysFromStart++) {
          const day = addDays(startDate, daysFromStart);
          const container = renderDay(day, {
            startDate,
            selectingDate: day,
            selectsEnd: true,
          });
          expect(
            container
              .querySelector(".react-datepicker__day")
              ?.classList.contains(rangeDayClassName),
          ).toBe(true);
        }
      });

      it("should have a class if it is a start or end date", () => {
        const startDate = newDate();
        const midRangeDate = addDays(startDate, 1);
        const selectingDate = addDays(startDate, 2);

        const containerStartDay = renderDay(startDate, {
          startDate,
          selectingDate,
          selectsEnd: true,
        });
        expect(
          containerStartDay
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayStartClassName),
        ).toBe(true);

        const containerMidRangeDay = renderDay(midRangeDate, {
          startDate,
          selectingDate,
          selectsEnd: true,
        });
        expect(
          containerMidRangeDay
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayStartClassName),
        ).toBe(false);
        expect(
          containerMidRangeDay
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayEndClassName),
        ).toBe(false);

        const containerEndDay = renderDay(selectingDate, {
          startDate,
          selectingDate,
          selectsEnd: true,
        });
        expect(
          containerEndDay
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayEndClassName),
        ).toBe(true);
      });

      it("should not highlight for days before the start date", () => {
        const startDate = newDate();
        const selectingDate = subDays(startDate, 1);
        const container = renderDay(selectingDate, {
          startDate,
          selectingDate,
          selectsEnd: true,
        });
        expect(
          container
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayClassName),
        ).toBe(false);
      });

      it("should not highlight if there is no start date selected", () => {
        const { day, endDate } = createDateRange(-1, 1);
        const selectingDate = addDays(endDate, 1);
        const container = renderDay(day, {
          endDate,
          selectingDate,
          selectsEnd: true,
        });
        expect(
          container
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayClassName),
        ).toBe(false);
      });

      it("should not highlight for disabled dates when selectsDisabledDaysInRange is false (default)", () => {
        const startDate = newDate();
        const selectingDate = addDays(startDate, 1);
        const container = renderDay(selectingDate, {
          startDate,
          selectingDate,
          selectsEnd: true,
          excludeDates: [selectingDate],
        });
        expect(
          container
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayClassName),
        ).toBe(false);
      });

      it("should highlight for disabled dates when selectsDisabledDaysInRange is true", () => {
        const startDate = newDate();
        const selectingDate = addDays(startDate, 1);
        const container = renderDay(selectingDate, {
          startDate,
          selectingDate,
          selectsEnd: true,
          excludeDates: [selectingDate],
          selectsDisabledDaysInRange: true,
        });
        expect(
          container
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayClassName),
        ).toBe(true);
      });

      it("should not highlight for disabled dates within interval when selectsDisabledDaysInRange is false (default)", () => {
        const startDate = newDate();
        const selectingDate = addDays(startDate, 1);
        const container = renderDay(selectingDate, {
          startDate,
          selectingDate,
          selectsEnd: true,
          excludeDateIntervals: [
            { start: startDate, end: addDays(selectingDate, 1) },
          ],
        });
        expect(
          container
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayClassName),
        ).toBe(false);
      });

      it("should highlight for disabled dates within interval when selectsDisabledDaysInRange is true", () => {
        const startDate = newDate();
        const selectingDate = addDays(startDate, 1);
        const container = renderDay(selectingDate, {
          startDate,
          selectingDate,
          selectsEnd: true,
          excludeDateIntervals: [
            { start: startDate, end: addDays(selectingDate, 1) },
          ],
          selectsDisabledDaysInRange: true,
        });
        expect(
          container
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayClassName),
        ).toBe(true);
      });
    });

    describe("for a date picker with selectsRange prop", () => {
      it("should have a class if it is a start or end date", () => {
        const startDate = newDate();
        const midRangeDate = addDays(startDate, 1);
        const endDate = addDays(startDate, 2);

        const containerStartDay = renderDay(startDate, {
          startDate,
          selectingDate: endDate,
          selectsRange: true,
        });
        expect(
          containerStartDay
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayStartClassName),
        ).toBe(true);

        const containerMidRangeDay = renderDay(midRangeDate, {
          startDate,
          selectingDate: endDate,
          selectsRange: true,
        });
        expect(
          containerMidRangeDay
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayStartClassName),
        ).toBe(false);
        expect(
          containerMidRangeDay
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayEndClassName),
        ).toBe(false);

        const containerEndDay = renderDay(endDate, {
          startDate,
          selectingDate: endDate,
          selectsRange: true,
        });
        expect(
          containerEndDay
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayEndClassName),
        ).toBe(true);
      });
    });

    describe("for a date picker with selectsRange and swapRange prop", () => {
      it("should select range from startDate to selectingDate if selectingDate is after startDate", () => {
        const startDate = newDate();
        const dayInRange = addDays(startDate, 1);
        const selectingDate = addDays(startDate, 2);

        const containerStartDay = renderDay(dayInRange, {
          startDate,
          selectingDate,
          selectsRange: true,
          swapRange: true,
        });
        expect(
          containerStartDay
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayClassName),
        ).toBe(true);
      });

      it("should select range from selectingDate to startDate if selectingDate is before startDate", () => {
        const startDate = newDate();
        const dayInRange = subDays(startDate, 1);
        const selectingDate = subDays(startDate, 2);

        const containerStartDay = renderDay(dayInRange, {
          startDate,
          selectingDate,
          selectsRange: true,
          swapRange: true,
        });
        expect(
          containerStartDay
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayClassName),
        ).toBe(true);
      });

      it("should select as range if selectingDate is equal to startDate", () => {
        const startDate = newDate();
        const selectingDate = startDate;

        const containerStartDay = renderDay(startDate, {
          startDate,
          selectingDate,
          selectsRange: true,
          swapRange: true,
        });
        expect(
          containerStartDay
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayClassName),
        ).toBe(true);
      });

      it("should set selectingDate as the start of range and startDate as the end of range if selectingDate is before startDate", () => {
        const startDate = newDate();
        const selectingDate = subDays(startDate, 1);

        const containerStartDay = renderDay(selectingDate, {
          startDate,
          selectingDate,
          selectsRange: true,
          swapRange: true,
        });
        expect(
          containerStartDay
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayStartClassName),
        ).toBe(true);

        const containerEndDay = renderDay(startDate, {
          startDate,
          selectingDate,
          selectsRange: true,
          swapRange: true,
        });

        expect(
          containerEndDay
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayEndClassName),
        ).toBe(true);
      });

      it("should set selectingDate as the end of range and startDate as the start of range if selectingDate is after startDate", () => {
        const startDate = newDate();
        const selectingDate = addDays(startDate, 1);

        const containerStartDay = renderDay(startDate, {
          startDate,
          selectingDate,
          selectsRange: true,
          swapRange: true,
        });
        expect(
          containerStartDay
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayStartClassName),
        ).toBe(true);

        const containerEndDay = renderDay(selectingDate, {
          startDate,
          selectingDate,
          selectsRange: true,
          swapRange: true,
        });

        expect(
          containerEndDay
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayEndClassName),
        ).toBe(true);
      });

      it("should set startDate as the end and start range if selectionDate equal startDate", () => {
        const startDate = newDate();
        const selectingDate = startDate;

        const containerStartDay = renderDay(startDate, {
          startDate,
          selectingDate,
          selectsRange: true,
          swapRange: true,
        });
        expect(
          containerStartDay
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayStartClassName),
        ).toBe(true);

        const containerEndDay = renderDay(selectingDate, {
          startDate,
          selectingDate,
          selectsRange: true,
          swapRange: true,
        });

        expect(
          containerEndDay
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayEndClassName),
        ).toBe(true);
      });
    });
  });

  describe("today", () => {
    const className = "react-datepicker__day--today";

    it("should apply the today class if today", () => {
      const container = renderDay(newDate());
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(true);
    });

    it("should not apply the today class if not today", () => {
      const container = renderDay(addDays(newDate(), 1));
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(false);
    });

    it("should apply the aria-current date attribute if today", () => {
      const container = renderDay(newDate());
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.getAttribute("aria-current"),
      ).toBe("date");
    });

    it("should not apply the aria-current date attribute if not today", () => {
      const container = renderDay(addDays(newDate(), 1));
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.getAttribute("aria-current"),
      ).toBeNull();
    });
  });

  describe("weekend", () => {
    const className = "react-datepicker__day--weekend";

    it("should apply the weekend class if Saturday", () => {
      const container = renderDay(newDate("2015-12-19"));
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(true);
    });

    it("should apply the weekend class if Sunday", () => {
      const container = renderDay(newDate("2015-12-20"));
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(true);
    });

    it("should not apply the today class if not the weekend", () => {
      const container = renderDay(newDate("2015-12-21"));
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(false);
    });
  });

  describe("outside month", () => {
    const className = "react-datepicker__day--outside-month";

    it("should not apply the outside-month class if in same month", () => {
      const day = newDate();
      const container = renderDay(day, { month: getMonth(day) });
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(false);
    });

    it("should apply the outside-month class if not in same month", () => {
      const day1 = newDate("2020-12-02");
      const day2 = newDate("2021-01-02");
      const day3 = newDate("2021-04-02");
      const day4 = newDate("2021-04-02");
      const container1 = renderDay(day1, { month: 0 });
      const container2 = renderDay(day2, { month: 11 });
      const container3 = renderDay(day3, { month: 4 });
      const container4 = renderDay(day4, { month: 2 });
      expect(
        container1
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(true);
      expect(
        container2
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(true);
      expect(
        container3
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(true);
      expect(
        container4
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(true);
    });

    it("should hide days outside month at end when duplicates", () => {
      const day = newDate("2021-03-17");
      const { container } = render(
        <Day
          day={day}
          month={getMonth(day) - 1}
          handleOnKeyDown={() => {}}
          monthShowsDuplicateDaysEnd
        />,
      );
      expect(container.textContent).toHaveLength(0);
    });

    it("should show days outside month at end when not duplicates", () => {
      const day = newDate("2020-03-17");
      const { container } = render(
        <Day day={day} month={getMonth(day) - 1} handleOnKeyDown={() => {}} />,
      );
      expect(container.textContent).toBe(day.getDate().toString());
    });

    it("should hide days outside month at start when duplicates", () => {
      const day = newDate("2020-10-05");
      const { container } = render(
        <Day
          day={day}
          month={getMonth(day) + 1}
          handleOnKeyDown={() => {}}
          monthShowsDuplicateDaysStart
        />,
      );
      expect(container.textContent).toHaveLength(0);
    });

    it("should show days outside month at start when not duplicates", () => {
      const day = newDate("2020-10-05");
      const { container } = render(
        <Day day={day} month={getMonth(day) + 1} handleOnKeyDown={() => {}} />,
      );
      expect(container.textContent).toBe(day.getDate().toString());
    });

    it("should show days in month when duplicates at start/end", () => {
      const day = newDate("2020-11-15");
      const { container } = render(
        <Day
          day={day}
          month={getMonth(day)}
          handleOnKeyDown={() => {}}
          monthShowsDuplicateDaysStart
          monthShowsDuplicateDaysEnd
        />,
      );
      expect(container.textContent).toBe(day.getDate().toString());
    });
  });

  describe("disabled", () => {
    const className = "react-datepicker__day--disabled";

    it("should be enabled if date is enabled", () => {
      const container = renderDay(newDate());
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(false);
    });

    it("should be disabled if date is disabled", () => {
      const day = newDate();
      const container = renderDay(day, { excludeDates: [day] });
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(true);
    });

    it("should be disabled if date is within excluded interval", () => {
      const day = newDate();
      const container = renderDay(day, {
        excludeDateIntervals: [
          { start: subDays(day, 1), end: addDays(day, 1) },
        ],
      });
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(className),
      ).toBe(true);
    });

    it("should have aria-disabled attribute with true value if date is disabled", () => {
      const day = newDate();
      const container = renderDay(day, { excludeDates: [day] });
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.getAttribute("aria-disabled"),
      ).toBe("true");
    });

    it("should have aria-disabled attribute with true value if date is within excluded interval", () => {
      const day = newDate();
      const container = renderDay(day, {
        excludeDateIntervals: [
          { start: subDays(day, 1), end: addDays(day, 1) },
        ],
      });
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.getAttribute("aria-disabled"),
      ).toBe("true");
    });

    it("should have aria-disabled attribute with false value if date is not disabled", () => {
      const container = renderDay(newDate());
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.getAttribute("aria-disabled"),
      ).toBe("false");
    });
  });

  describe("aria-label", () => {
    const ariaLabelPrefixWhenEnabled =
      "A prefix in my native language describing that the date can be selected";
    const ariaLabelPrefixWhenDisabled =
      "A prefix in my native language describing that the date can not be selected";

    it("should have the correct provided prefix if date is not disabled", () => {
      const container = renderDay(newDate(), {
        ariaLabelPrefixWhenEnabled: ariaLabelPrefixWhenEnabled,
      });
      expect(
        container.innerHTML.indexOf(
          `aria-label="${ariaLabelPrefixWhenEnabled}`,
        ),
      ).not.toBe(-1);
    });

    it("should have the correct provided prefix if date is disabled", () => {
      const day = newDate();
      const container = renderDay(day, {
        ariaLabelPrefixWhenDisabled: ariaLabelPrefixWhenDisabled,
        excludeDates: [day],
      });
      expect(
        container.innerHTML.indexOf(
          `aria-label="${ariaLabelPrefixWhenDisabled}`,
        ),
      ).not.toBe(-1);
    });

    it("should have the correct provided prefix if date is within excluded interval", () => {
      const day = newDate();
      const container = renderDay(day, {
        ariaLabelPrefixWhenDisabled: ariaLabelPrefixWhenDisabled,
        excludeDateIntervals: [
          { start: subDays(day, 1), end: addDays(day, 1) },
        ],
      });
      expect(
        container.innerHTML.indexOf(
          `aria-label="${ariaLabelPrefixWhenDisabled}`,
        ),
      ).not.toBe(-1);
    });

    it("should display date in English is locale is not provided", () => {
      const day = newDate("2021-05-26");
      const container = renderDay(day);
      expect(container.innerHTML.indexOf("Wednesday, May 26th, 2021")).not.toBe(
        -1,
      );
    });

    it("should display date in Spanish if Spanish locale is provided", () => {
      registerLocale("es", es);
      const day = newDate("2021-05-26");
      const container = renderDay(day, {
        locale: "es",
      });
      expect(
        container.innerHTML.indexOf("miércoles, 26 de mayo de 2021"),
      ).not.toBe(-1);
    });
  });

  describe("click", () => {
    let onClickCalled: boolean;

    function onClick() {
      onClickCalled = true;
    }

    beforeEach(() => {
      onClickCalled = false;
    });

    it("should call onClick if day is enabled", () => {
      const day = newDate();
      const { container } = render(
        <Day
          day={day}
          month={0}
          handleOnKeyDown={() => {}}
          onClick={onClick}
        />,
      );

      const dayElement = safeQuerySelector(container, ".react-datepicker__day");
      fireEvent.click(dayElement);
      expect(onClickCalled).toBe(true);
    });

    it("should not call onClick if day is disabled", () => {
      const day = newDate();
      const { container } = render(
        <Day
          day={day}
          month={0}
          excludeDates={[day]}
          handleOnKeyDown={() => {}}
          onClick={onClick}
        />,
      );

      const dayElement = safeQuerySelector(container, ".react-datepicker__day");
      fireEvent.click(dayElement);
      expect(onClickCalled).toBe(false);
    });

    it("should not call onClick if day is within excluded interval", () => {
      const day = newDate();
      const { container } = render(
        <Day
          day={day}
          month={0}
          handleOnKeyDown={() => {}}
          excludeDateIntervals={[
            { start: subDays(day, 1), end: addDays(day, 1) },
          ]}
          onClick={onClick}
        />,
      );

      const dayElement = safeQuerySelector(container, ".react-datepicker__day");
      fireEvent.click(dayElement);
      expect(onClickCalled).toBe(false);
    });
  });

  describe("mouse enter", () => {
    it("should call onMouseEnter if day is hovered", () => {
      const onMouseEnterSpy = jest.fn();

      const day = newDate();

      const { container } = render(
        <Day
          day={day}
          month={0}
          handleOnKeyDown={() => {}}
          onMouseEnter={onMouseEnterSpy}
        />,
      );

      const dayElement = safeQuerySelector(container, ".react-datepicker__day");
      fireEvent.mouseEnter(dayElement);
      expect(onMouseEnterSpy).toHaveBeenCalled();
    });

    it("should call onPointerEnter if day is hovered", () => {
      const onMouseEnterSpy = jest.fn();

      const day = newDate();

      const { container } = render(
        <Day
          day={day}
          month={0}
          handleOnKeyDown={() => {}}
          onMouseEnter={onMouseEnterSpy}
          usePointerEvent
        />,
      );

      const dayElement = safeQuerySelector(container, ".react-datepicker__day");
      fireEvent.pointerEnter(dayElement);
      expect(onMouseEnterSpy).toHaveBeenCalled();
    });
  });

  describe("for a start date picker with selectsRange prop", () => {
    const rangeDayClassName = "react-datepicker__day--in-selecting-range";
    const rangeSetDayClassName = "react-datepicker__day--in-range";
    const rangeDayStartClassName = "react-datepicker__day--range-start";
    const rangeDayEndClassName = "react-datepicker__day--range-end";

    function createDateRange(
      beforeDays: number,
      afterDays: number,
      day = newDate(),
    ) {
      return {
        startDate: subDays(day, beforeDays),
        endDate: addDays(day, afterDays),
        day,
      };
    }

    it("should highlight for dates before the selecting date", () => {
      const { startDate } = createDateRange(-1, 1);

      // All these should highlight: today, yesterday (startDate), the day before
      for (let daysAfterStart = 1; daysAfterStart <= 3; daysAfterStart++) {
        const selectingDate = addDays(startDate, daysAfterStart);
        const container = renderDay(selectingDate, {
          startDate,
          selectingDate,
          selectsRange: true,
        });
        expect(
          container
            .querySelector(".react-datepicker__day")
            ?.classList.contains(rangeDayClassName),
        ).toBe(true);
      }
    });

    it("should not highlight for days before the start date", () => {
      const startDate = newDate();
      const selectingDate = subDays(startDate, 1);
      const container = renderDay(selectingDate, {
        startDate,
        selectingDate,
        selectsRange: true,
      });
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(rangeDayClassName),
      ).toBe(false);
    });

    it("should have a class if it is a start or end date", () => {
      const startDate = newDate();
      const midRangeDate = addDays(startDate, 1);
      const endDate = addDays(startDate, 2);

      const containerStartDay = renderDay(startDate, {
        startDate,
        endDate,
        selectsRange: true,
      });
      expect(
        containerStartDay
          .querySelector(".react-datepicker__day")
          ?.classList.contains(rangeDayStartClassName),
      ).toBe(true);

      const containerMidRangeDay = renderDay(midRangeDate, {
        startDate,
        endDate,
        selectsRange: true,
      });
      expect(
        containerMidRangeDay
          .querySelector(".react-datepicker__day")
          ?.classList.contains(rangeDayStartClassName),
      ).toBe(false);
      expect(
        containerMidRangeDay
          .querySelector(".react-datepicker__day")
          ?.classList.contains(rangeSetDayClassName),
      ).toBe(true);
      expect(
        containerMidRangeDay
          .querySelector(".react-datepicker__day")
          ?.classList.contains(rangeDayEndClassName),
      ).toBe(false);

      const containerEndDay = renderDay(endDate, {
        startDate,
        endDate,
        selectsRange: true,
      });
      expect(
        containerEndDay
          .querySelector(".react-datepicker__day")
          ?.classList.contains(rangeDayEndClassName),
      ).toBe(true);
    });

    it("should not highlight for days after the end date", () => {
      const { day, startDate, endDate } = createDateRange(-1, 1);
      const selectingDate = addDays(endDate, 1);
      const container = renderDay(day, {
        startDate,
        endDate,
        selectingDate,
        selectsRange: true,
      });
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(rangeDayClassName),
      ).toBe(false);
    });

    it("should not highlight if there is no end date selected", () => {
      const startDate = newDate();
      const selectingDate = subDays(startDate, 1);
      const container = renderDay(selectingDate, {
        startDate,
        selectingDate,
        selectsRange: true,
      });
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(rangeDayClassName),
      ).toBe(false);
    });

    it("should not highlight for disabled (excluded) dates", () => {
      const endDate = newDate();
      const selectingDate = subDays(endDate, 1);
      const container = renderDay(selectingDate, {
        selectingDate,
        endDate,
        selectsRange: true,
        excludeDates: [selectingDate],
      });
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(rangeDayClassName),
      ).toBe(false);
    });

    it("should not highlight for disabled (within excluded interval) dates", () => {
      const endDate = newDate();
      const selectingDate = subDays(endDate, 1);
      const container = renderDay(selectingDate, {
        selectingDate,
        endDate,
        selectsRange: true,
        excludeDateIntervals: [{ start: selectingDate, end: endDate }],
      });
      expect(
        container
          .querySelector(".react-datepicker__day")
          ?.classList.contains(rangeDayClassName),
      ).toBe(false);
    });
  });

  describe("focus", () => {
    afterEach(function () {
      jest.resetAllMocks();
    });

    it("should apply focus to the preselected day", async () => {
      const day = newDate();
      let instance: Day | null = null;
      render(
        <Day
          ref={(node) => {
            instance = node;
          }}
          day={day}
          month={0}
          handleOnKeyDown={() => {}}
          preSelection={day}
        />,
      );

      const focusSpy = jest
        .spyOn(instance!.dayEl.current!, "focus")
        .mockImplementation();
      Object.defineProperty(document, "activeElement", {
        value: undefined,
        writable: false,
      });

      instance!.componentDidMount();
      expect(focusSpy).toHaveBeenCalledTimes(1);
    });

    it("should not apply focus to the preselected day if inline", () => {
      const day = newDate();
      let instance: Day | null;
      render(
        <Day
          ref={(node) => {
            instance = node;
          }}
          day={day}
          month={0}
          handleOnKeyDown={() => {}}
          preSelection={day}
          inline
        />,
      );

      const focusSpy = jest.spyOn(instance!.dayEl.current!, "focus");
      Object.defineProperty(document, "activeElement", {
        value: undefined,
        writable: false,
      });

      instance!.componentDidMount();
      expect(focusSpy).not.toHaveBeenCalledTimes(1);
    });
  });

  describe("title", () => {
    it("should have the correct title if date is from holiday list", () => {
      const day = new Date(2023, 11, 25);
      const holidays = new Map([
        [
          "08.15.2023",
          {
            className: "react-datepicker__day--holidays",
            holidayNames: ["India's Independence Day"],
          },
        ],
        [
          "12.25.2023",
          {
            className: "react-datepicker__day--holidays",
            holidayNames: ["Christmas"],
          },
        ],
      ]);

      const container = renderDay(day, {
        holidays: holidays,
      });
      expect(container.innerHTML.indexOf('title="Christmas"')).not.toBe(-1);
    });

    it("uses both the holiday names for a given date as the title", () => {
      const day = new Date(2023, 7, 15);
      const holidays = new Map([
        [
          "08.15.2023",
          {
            className: "react-datepicker__day--holidays",
            holidayNames: ["Holiday 1", "Holiday 2"],
          },
        ],
        [
          "12.25.2023",
          {
            className: "react-datepicker__day--holidays",
            holidayNames: ["Christmas"],
          },
        ],
      ]);

      const container = renderDay(day, {
        holidays: holidays,
      });
      expect(
        container.innerHTML.indexOf('title="Holiday 1, Holiday 2"'),
      ).not.toBe(-1);
    });

    it("should have the title as empty string if date is not from holiday list", () => {
      const day = new Date(2023, 7, 14);
      const holidays = new Map([
        [
          "08.15.2023",
          {
            className: "react-datepicker__day--holidays",
            holidayNames: ["India's Independence Day"],
          },
        ],
        [
          "12.25.2023",
          {
            className: "react-datepicker__day--holidays",
            holidayNames: ["Christmas"],
          },
        ],
      ]);

      const container = renderDay(day, {
        holidays: holidays,
      });
      expect(container.innerHTML.indexOf('title=""')).not.toBe(-1);
    });
  });
});
