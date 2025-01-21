import { render, fireEvent } from "@testing-library/react";
import React from "react";

import { KeyType, addWeeks, newDate } from "../date_utils";
import WeekNumber from "../week_number";

import { safeQuerySelector } from "./test_utils";

type WeekNumberProps = React.ComponentProps<typeof WeekNumber>;

function renderWeekNumber(
  weekNumber: number,
  props: Partial<WeekNumberProps> = {},
): HTMLElement {
  return render(
    <WeekNumber
      weekNumber={weekNumber}
      date={new Date()}
      onClick={() => {}}
      {...props}
    />,
  ).container;
}

describe("WeekNumber", () => {
  let weekNumber: HTMLElement | null, instance: WeekNumber | null;

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
      const weekNumber = safeQuerySelector<HTMLDivElement>(
        container,
        ".react-datepicker__week-number",
      );
      fireEvent.click(weekNumber);
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
    let handleFocusWeekNumberSpy: jest.SpyInstance;

    beforeEach(() => {
      weekNumber = render(
        <WeekNumber
          ref={(node) => {
            instance = node;
          }}
          weekNumber={1}
          date={new Date()}
          onClick={() => {}}
        />,
      ).container;
      if (instance) {
        handleFocusWeekNumberSpy = jest.spyOn(
          instance,
          "handleFocusWeekNumber",
        );
      }
    });

    it("should call handleFocusWeeknumber on mount", () => {
      instance?.componentDidMount();
      expect(handleFocusWeekNumberSpy).toHaveBeenCalledTimes(1);
    });

    it("should call handleFocusWeekNumber with prevProps on update", () => {
      const prevProps = {
        weekNumber: 1,
        date: new Date(),
        onClick: () => {},
      };
      instance?.componentDidUpdate(prevProps);
      expect(handleFocusWeekNumberSpy).toHaveBeenCalledWith(prevProps);
    });
  });

  describe("Event Handling", () => {
    it("should call onClick prop when handleClick is triggered", () => {
      const onClickMock = jest.fn();
      const { container } = render(
        <WeekNumber weekNumber={1} date={new Date()} onClick={onClickMock} />,
      );
      const weekNumber = safeQuerySelector<HTMLDivElement>(
        container,
        ".react-datepicker__week-number",
      );
      fireEvent.click(weekNumber);
      expect(onClickMock).toHaveBeenCalled();
    });

    describe("handleOnKeyDown", () => {
      it("should not change any other key", () => {
        const onKeyDownMock = jest.fn();

        const container = renderWeekNumber(1, {
          handleOnKeyDown: onKeyDownMock,
        });

        const weekNumberElement = container.querySelector(
          ".react-datepicker__week-number",
        )!;

        fireEvent.keyDown(weekNumberElement, {
          key: KeyType.Enter,
          preventDefault: jest.fn(),
        });

        expect(onKeyDownMock).toHaveBeenCalledTimes(1);
        expect(onKeyDownMock).toHaveBeenCalledWith(
          expect.objectContaining({
            key: KeyType.Enter,
          }),
        );
      });

      it("should change space key to Enter", () => {
        const onKeyDownMock = jest.fn();

        const container = renderWeekNumber(1, {
          handleOnKeyDown: onKeyDownMock,
        });

        const weekNumberElement = container.querySelector(
          ".react-datepicker__week-number",
        )!;

        fireEvent.keyDown(weekNumberElement, {
          key: KeyType.Space,
          preventDefault: jest.fn(),
        });

        expect(onKeyDownMock).toHaveBeenCalledTimes(1);
        expect(onKeyDownMock).toHaveBeenCalledWith(
          expect.objectContaining({
            key: KeyType.Enter,
          }),
        );
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

        expect(weekNumber?.tabIndex).toBe(0);
      });

      it("should return 0 if showWeekPicker and showWeekNumber are true and the day is the preSelection", () => {
        const currentWeekNumber = new Date();
        const selected = addWeeks(currentWeekNumber, 1);
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
        const selected = addWeeks(currentWeekNumber, 1);
        const preSelection = addWeeks(currentWeekNumber, 2);
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

      it("shouldn't have the class 'react-datepicker__week-number--clickable' if isWeekDisabled is true", () => {
        const { container } = render(
          <WeekNumber
            weekNumber={1}
            date={new Date()}
            onClick={() => {}}
            isWeekDisabled
          />,
        );
        const weekNumber = container.querySelector(
          ".react-datepicker__week-number",
        );
        expect(
          weekNumber?.classList.contains(
            "react-datepicker__week-number--clickable",
          ),
        ).toBe(false);
      });

      it("should have the class 'react-datepicker__week-number--clickable' if isWeekDisabled is false and onClick is defined", () => {
        const { container } = render(
          <WeekNumber
            weekNumber={1}
            date={new Date()}
            onClick={() => {}}
            isWeekDisabled={false}
          />,
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
        const currentWeekNumber = newDate("2023-10-22T13:09:53+02:00");
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
        const currentWeekNumber = newDate("2023-10-22T13:09:53+02:00");
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
        const currentWeekNumber = newDate("2023-10-22T13:09:53+02:00");
        const preSelection = addWeeks(currentWeekNumber, 1);
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
        const currentWeekNumber = newDate("2023-10-22T13:09:53+02:00");
        const preSelection = addWeeks(currentWeekNumber, 1);
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
        const currentWeekNumber = newDate("2023-10-22T13:09:53+02:00");
        const selected = addWeeks(currentWeekNumber, 1);
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
      });

      it("should have the class 'react-datepicker__week-number--selected' if selected is not current week and preselected is not current week", () => {
        const currentWeekNumber = newDate("2023-10-22T13:09:53+02:00");
        const selected = addWeeks(currentWeekNumber, 1);
        const preSelection = addWeeks(currentWeekNumber, 2);
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
      });
    });
  });

  describe("handleFocusWeekNumber", () => {
    let weekNumberEl: React.RefObject<HTMLDivElement>,
      instance: WeekNumber | null;

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
      if (instance) {
        instance.weekNumberEl = weekNumberEl;
        instance.getTabIndex = jest.fn(() => 0);
      }
    };

    beforeEach(() => {
      weekNumberEl = {
        current: { focus: jest.fn() },
      } as unknown as React.RefObject<HTMLDivElement>;
      createComponentWithProps();
    });

    const setActiveElement = (element: HTMLElement) => {
      Object.defineProperty(document, "activeElement", {
        value: element,
        writable: false,
        configurable: true,
      });
    };

    it("should focus if conditions are met", () => {
      setActiveElement(document.body);
      instance?.handleFocusWeekNumber();
      expect(weekNumberEl.current?.focus).toHaveBeenCalled();
    });

    it("should not focus if input is focused", () => {
      const inputElement = document.createElement("input");
      setActiveElement(inputElement);
      instance?.handleFocusWeekNumber({ isInputFocused: true });
      expect(weekNumberEl.current?.focus).not.toHaveBeenCalled();
    });

    it("should not focus if inline prop set and shouldFocusDayInline is false", () => {
      createComponentWithProps({ inline: true, shouldFocusDayInline: false });
      instance?.handleFocusWeekNumber();
      expect(weekNumberEl.current?.focus).not.toHaveBeenCalled();
    });

    it("should focus if active element is another instance of WeekNumber", () => {
      const activeElement = document.createElement("div");
      activeElement.classList.add("react-datepicker__week-number");
      setActiveElement(activeElement);
      const containerRef = { current: document.createElement("div") };
      createComponentWithProps({ containerRef });
      containerRef.current.appendChild(activeElement);
      instance?.handleFocusWeekNumber();
      expect(weekNumberEl.current?.focus).toHaveBeenCalled();
    });
  });
});
