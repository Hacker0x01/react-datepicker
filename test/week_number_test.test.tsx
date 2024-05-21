import { render, fireEvent } from "@testing-library/react";
import React from "react";

import * as utils from "../src/date_utils";
import WeekNumber from "../src/week_number";

function renderWeekNumber(weekNumber, props = {}) {
  return render(
    <WeekNumber weekNumber={weekNumber} date={new Date()} {...props} />,
  ).container;
}

describe("WeekNumber", () => {
  let weekNumber, instance;

  describe("Rendering", () => {
    it("should render the specified Week Number", () => {
      weekNumber = renderWeekNumber(1);
      expect(
        weekNumber.querySelector(".react-datepicker__week-number"),
      ).not.toBeNull();
      expect(weekNumber.textContent).toBe(1 + "");
    });

    it("should handle onClick function", () => {
      const onClickMock = jest.fn();
      const { container } = render(
        <WeekNumber weekNumber={1} date={new Date()} onClick={onClickMock} />,
      );
      const weekNumber = container.querySelector(
        ".react-datepicker__week-number",
      );
      expect(weekNumber).not.toBeNull();
      fireEvent.click(weekNumber ?? new HTMLDivElement());
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it("should have an aria-label containing the provided prefix", () => {
      const ariaLabelPrefix = "A prefix in my native language";
      weekNumber = render(
        <WeekNumber
          weekNumber={1}
          date={new Date()}
          ariaLabelPrefix={ariaLabelPrefix}
        />,
      ).container;
      expect(
        weekNumber.innerHTML.indexOf(`aria-label="${ariaLabelPrefix}`),
      ).not.toBe(-1);
    });
  });

  describe("Component Lifecycle", () => {
    let handleFocusWeekNumberSpy;

    beforeEach(() => {
      weekNumber = render(
        <WeekNumber
          ref={(node) => {
            instance = node;
          }}
          weekNumber={1}
          date={new Date()}
        />,
      );
      handleFocusWeekNumberSpy = jest.spyOn(instance, "handleFocusWeekNumber");
    });

    it("should call handleFocusWeeknumber on mount", () => {
      instance.componentDidMount();
      expect(handleFocusWeekNumberSpy).toHaveBeenCalledTimes(1);
    });

    it("should call handleFocusWeekNumber with prevProps on update", () => {
      const prevProps = { someProp: "someValue" };
      instance.componentDidUpdate(prevProps);
      expect(handleFocusWeekNumberSpy).toHaveBeenCalledWith(prevProps);
    });
  });

  describe("Event Handling", () => {
    it("should call onClick prop when handleClick is triggered", () => {
      const onClickMock = jest.fn();
      const { container } = render(
        <WeekNumber weekNumber={1} date={new Date()} onClick={onClickMock} />,
      );
      const weekNumber = container.querySelector(
        ".react-datepicker__week-number",
      );
      expect(weekNumber).not.toBeNull();
      fireEvent.click(weekNumber ?? new HTMLDivElement());
      expect(onClickMock).toHaveBeenCalled();
    });

    describe("handleOnKeyDown", () => {
      const handleOnKeyDownMock = jest.fn((event) => {
        if (event.key === " ") {
          event.preventDefault();
          event.key = "Enter";
        }
      });

      it("should change space key to Enter", () => {
        const eventSpace = {
          key: " ",
          preventDefault: jest.fn(),
        };
        handleOnKeyDownMock(eventSpace);
        expect(eventSpace.preventDefault).toHaveBeenCalled();
        expect(eventSpace.key).toBe("Enter");
      });

      it("should not change any other key", () => {
        const eventA = {
          key: "a",
        };
        handleOnKeyDownMock(eventA);
        expect(eventA.key).toBe("a");
      });
    });
  });

  describe("Utility Functions", () => {
    describe("getTabIndex", () => {
      it("should return 0 if showWeekPicker and showWeekNumber are true and the day is selected", () => {
        const currentWeekNumber = new Date();
        const selected = currentWeekNumber;
        const preSelection = currentWeekNumber;
        const { container } = render(
          <WeekNumber
            weekNumber={1}
            showWeekPicker
            showWeekNumber
            date={currentWeekNumber}
            selected={selected}
            preSelection={preSelection}
          />,
        );
        const weekNumber = container.querySelector(
          ".react-datepicker__week-number",
        ) as HTMLDivElement;
        expect(weekNumber).not.toBeNull();

        expect(
          weekNumber?.classList.contains(
            "react-datepicker__week-number--keyboard-selected",
          ),
        ).toBe(false);
        expect(weekNumber?.tabIndex).toBe(0);
      });

      it("should return 0 if showWeekPicker and showWeekNumber are true and the day is the preSelection", () => {
        const currentWeekNumber = new Date();
        const selected = utils.addWeeks(currentWeekNumber, 1);
        const preSelection = currentWeekNumber;
        const { container } = render(
          <WeekNumber
            weekNumber={1}
            showWeekPicker
            showWeekNumber
            date={currentWeekNumber}
            selected={selected}
            preSelection={preSelection}
          />,
        );
        const weekNumber = container.querySelector(
          ".react-datepicker__week-number",
        ) as HTMLDivElement;
        expect(weekNumber).not.toBeNull();
        expect(
          weekNumber?.classList.contains(
            "react-datepicker__week-number--keyboard-selected",
          ),
        ).toBe(true);
        expect(weekNumber.tabIndex).toBe(0);
      });

      it("should return -1 if showWeekPicker is false", () => {
        const { container } = render(
          <WeekNumber
            weekNumber={1}
            date={new Date()}
            showWeekNumber
            selected={new Date()}
          />,
        );
        const weekNumber = container.querySelector(
          ".react-datepicker__week-number",
        ) as HTMLDivElement;
        expect(weekNumber.tabIndex).toBe(-1);
      });

      it("should return -1 if showWeekNumber is false", () => {
        const { container } = render(
          <WeekNumber
            weekNumber={1}
            date={new Date()}
            showWeekPicker
            selected={new Date()}
          />,
        );
        const weekNumber = container.querySelector(
          ".react-datepicker__week-number",
        ) as HTMLDivElement;
        expect(weekNumber.tabIndex).toBe(-1);
      });

      it("should return -1 if the day is not selected or the preSelection", () => {
        const currentWeekNumber = new Date();
        const selected = utils.addWeeks(currentWeekNumber, 1);
        const preSelection = utils.addWeeks(currentWeekNumber, 2);
        const { container } = render(
          <WeekNumber
            weekNumber={1}
            showWeekPicker
            showWeekNumber
            date={currentWeekNumber}
            selected={selected}
            preSelection={preSelection}
          />,
        );
        const weekNumber = container.querySelector(
          ".react-datepicker__week-number",
        ) as HTMLDivElement;
        expect(
          weekNumber?.classList.contains(
            "react-datepicker__week-number--keyboard-selected",
          ),
        ).toBe(false);
        expect(weekNumber.tabIndex).toBe(-1);
      });
    });

    describe("weekNumberClasses should return the correct classes", () => {
      it("should have the class 'react-datepicker__week-number'", () => {
        const { container } = render(
          <WeekNumber weekNumber={1} date={new Date()} />,
        );
        expect(
          container.querySelector(".react-datepicker__week-number"),
        ).not.toBeNull();
      });

      it("should have the class 'react-datepicker__week-number--clickable' if onClick is defined", () => {
        const { container } = render(
          <WeekNumber weekNumber={1} date={new Date()} onClick={() => {}} />,
        );
        const weekNumber = container.querySelector(
          ".react-datepicker__week-number",
        );
        expect(
          weekNumber?.classList.contains(
            "react-datepicker__week-number--clickable",
          ),
        ).toBe(true);
      });

      it("should have the class 'react-datepicker__week-number--selected' if selected is current week and preselected is also current week and has the onClick Props", () => {
        const currentWeekNumber = utils.newDate("2023-10-22T13:09:53+02:00");
        const { container } = render(
          <WeekNumber
            weekNumber={1}
            date={currentWeekNumber}
            selected={currentWeekNumber}
            preSelection={currentWeekNumber}
            onClick={() => {}}
          />,
        );
        const weekNumber = container.querySelector(
          ".react-datepicker__week-number",
        );
        expect(
          weekNumber?.classList.contains(
            "react-datepicker__week-number--selected",
          ),
        ).toBe(true);
      });

      it("should not have the class 'react-datepicker__week-number--selected' if selected is current week and preselected is also current week and doesn't have the onClick Props", () => {
        const currentWeekNumber = utils.newDate("2023-10-22T13:09:53+02:00");
        const { container } = render(
          <WeekNumber
            weekNumber={1}
            date={currentWeekNumber}
            selected={currentWeekNumber}
            preSelection={currentWeekNumber}
          />,
        );
        const weekNumber = container.querySelector(
          ".react-datepicker__week-number",
        );
        expect(
          weekNumber?.classList.contains(
            "react-datepicker__week-number--selected",
          ),
        ).toBe(false);
      });

      it("should have the class 'react-datepicker__week-number--selected' if selected is current week and preselected is not current week and has the onClick Props", () => {
        const currentWeekNumber = utils.newDate("2023-10-22T13:09:53+02:00");
        const preSelection = utils.addWeeks(currentWeekNumber, 1);
        const { container } = render(
          <WeekNumber
            weekNumber={1}
            date={currentWeekNumber}
            selected={currentWeekNumber}
            preSelection={preSelection}
            onClick={() => {}}
          />,
        );
        const weekNumber = container.querySelector(
          ".react-datepicker__week-number",
        );
        expect(
          weekNumber?.classList.contains(
            "react-datepicker__week-number--selected",
          ),
        ).toBe(true);
      });

      it("should not have the class 'react-datepicker__week-number--selected' if selected is current week and preselected is not current week and doesn't have onClick Props", () => {
        const currentWeekNumber = utils.newDate("2023-10-22T13:09:53+02:00");
        const preSelection = utils.addWeeks(currentWeekNumber, 1);
        const { container } = render(
          <WeekNumber
            weekNumber={1}
            date={currentWeekNumber}
            selected={currentWeekNumber}
            preSelection={preSelection}
          />,
        );
        const weekNumber = container.querySelector(
          ".react-datepicker__week-number",
        );
        expect(
          weekNumber?.classList.contains(
            "react-datepicker__week-number--selected",
          ),
        ).toBe(false);
      });

      it("should have the class 'react-datepicker__week-number--selected' if selected is not current week and preselected is current week", () => {
        const currentWeekNumber = utils.newDate("2023-10-22T13:09:53+02:00");
        const selected = utils.addWeeks(currentWeekNumber, 1);
        const { container } = render(
          <WeekNumber
            weekNumber={1}
            date={currentWeekNumber}
            selected={selected}
            preSelection={currentWeekNumber}
          />,
        );
        const weekNumber = container.querySelector(
          ".react-datepicker__week-number",
        );
        expect(
          weekNumber?.classList.contains(
            "react-datepicker__week-number--selected",
          ),
        ).toBe(false);
        expect(
          weekNumber?.classList.contains(
            "react-datepicker__week-number--keyboard-selected",
          ),
        ).toBe(true);
      });

      it("should have the class 'react-datepicker__week-number--selected' if selected is not current week and preselected is not current week", () => {
        const currentWeekNumber = utils.newDate("2023-10-22T13:09:53+02:00");
        const selected = utils.addWeeks(currentWeekNumber, 1);
        const preSelection = utils.addWeeks(currentWeekNumber, 2);
        const { container } = render(
          <WeekNumber
            weekNumber={1}
            date={currentWeekNumber}
            selected={selected}
            preSelection={preSelection}
          />,
        );
        const weekNumber = container.querySelector(
          ".react-datepicker__week-number",
        );
        expect(
          weekNumber?.classList.contains(
            "react-datepicker__week-number--selected",
          ),
        ).toBe(false);
        expect(
          weekNumber?.classList.contains(
            "react-datepicker__week-number--keyboard-selected",
          ),
        ).toBe(false);
      });
    });
  });

  describe("handleFocusWeekNumber", () => {
    let weekNumberEl, instance;

    const createComponentWithProps = (props = {}) => {
      const currentWeekNumber = new Date();
      const selected = currentWeekNumber;
      const preSelection = currentWeekNumber;
      render(
        <WeekNumber
          ref={(node) => {
            instance = node;
          }}
          weekNumber={1}
          date={currentWeekNumber}
          selected={selected}
          preSelection={preSelection}
          {...props}
        />,
      );
      instance.weekNumberEl = weekNumberEl;
      instance.getTabIndex = jest.fn(() => 0);
      instance.isSameDay = jest.fn(() => true);
    };

    beforeEach(() => {
      weekNumberEl = { current: { focus: jest.fn() } };
      createComponentWithProps();
    });

    const setActiveElement = (element) => {
      Object.defineProperty(document, "activeElement", {
        value: element,
        writable: false,
        configurable: true,
      });
    };

    it("should focus if conditions are met", () => {
      setActiveElement(document.body);
      instance.handleFocusWeekNumber();
      expect(weekNumberEl.current.focus).toHaveBeenCalled();
    });

    it("should not focus if input is focused", () => {
      const inputElement = document.createElement("input");
      setActiveElement(inputElement);
      instance.handleFocusWeekNumber({ isInputFocused: true });
      expect(weekNumberEl.current.focus).not.toHaveBeenCalled();
    });

    it("should not focus if inline prop set and shouldFocusDayInline is false", () => {
      createComponentWithProps({ inline: true, shouldFocusDayInline: false });
      instance.handleFocusWeekNumber();
      expect(weekNumberEl.current.focus).not.toHaveBeenCalled();
    });

    it("should focus if active element is another instance of WeekNumber", () => {
      const activeElement = document.createElement("div");
      activeElement.classList.add("react-datepicker__week-number");
      setActiveElement(activeElement);
      const containerRef = { current: document.createElement("div") };
      createComponentWithProps({ containerRef });
      containerRef.current.appendChild(activeElement);
      instance.handleFocusWeekNumber();
      expect(weekNumberEl.current.focus).toHaveBeenCalled();
    });
  });
});
