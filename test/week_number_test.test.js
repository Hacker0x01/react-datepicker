import React from "react";
import WeekNumber from "../src/week_number";
import { shallow } from "enzyme";
import * as utils from "../src/date_utils";

function renderWeekNumber(weekNumber, props = {}) {
  return shallow(<WeekNumber weekNumber={weekNumber} {...props} />);
}

describe("WeekNumber", () => {
  let shallowWeekNumber, instance;

  describe("Rendering", () => {
    it("should render the specified Week Number", () => {
      const weekNumber = 1;
      shallowWeekNumber = renderWeekNumber(weekNumber);
      expect(shallowWeekNumber.hasClass("react-datepicker__week-number")).toBe(
        true,
      );
      expect(shallowWeekNumber.text()).toBe(weekNumber + "");
    });

    it("should handle onClick function", () => {
      const onClickMock = jest.fn();
      const shallowWeekNumber = shallow(
        <WeekNumber weekNumber={1} onClick={onClickMock} />,
      );
      shallowWeekNumber.instance().handleClick({});
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it("should have an aria-label containing the provided prefix", () => {
      const ariaLabelPrefix = "A prefix in my native language";
      shallowWeekNumber = shallow(
        <WeekNumber day={1} ariaLabelPrefix={ariaLabelPrefix} />,
      );
      expect(
        shallowWeekNumber.html().indexOf(`aria-label="${ariaLabelPrefix}`),
      ).not.toBe(-1);
    });
  });

  describe("Component Lifecycle", () => {
    const handleFocusWeekNumberMock = jest.fn();

    beforeEach(() => {
      shallowWeekNumber = shallow(<WeekNumber />);
      instance = shallowWeekNumber.instance();
      instance.handleFocusWeekNumber = handleFocusWeekNumberMock;
    });

    afterEach(() => {
      handleFocusWeekNumberMock.mockClear();
    });

    it("should call handleFocusWeeknumber on mount", () => {
      instance.componentDidMount();
      expect(handleFocusWeekNumberMock).toHaveBeenCalledTimes(1);
    });

    it("should call handleFocusWeekNumber with prevProps on update", () => {
      const prevProps = { someProp: "someValue" };
      instance.componentDidUpdate(prevProps);
      expect(handleFocusWeekNumberMock).toHaveBeenCalledWith(prevProps);
    });
  });

  describe("Event Handling", () => {
    it("should call onClick prop when handleClick is triggered", () => {
      const onClickMock = jest.fn();
      const eventMock = { target: {} };
      const shallowWeekNumber = shallow(<WeekNumber onClick={onClickMock} />);
      shallowWeekNumber.simulate("click", eventMock);
      expect(onClickMock).toHaveBeenCalledWith(eventMock);
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
    beforeEach(() => {
      shallowWeekNumber = shallow(<WeekNumber />);
      instance = shallowWeekNumber.instance();
    });

    describe("getTabIndex", () => {
      it("should return 0 if showWeekPicker and showWeekNumber are true and the day is selected", () => {
        const shallowWeekNumber = shallow(
          <WeekNumber showWeekPicker showWeekNumber selected={new Date()} />,
        );
        const instance = shallowWeekNumber.instance();
        instance.isKeyboardSelected = jest.fn(() => true);
        instance.isSameDay = jest.fn(() => true);
        const props = { ...instance.props, preSelection: new Date() };
        instance.props = props;
        expect(instance.getTabIndex()).toBe(0),
          expect(instance.isSameDay()).toBe(true);
      });

      it("should return 0 if showWeekPicker and showWeekNumber are true and the day is the preSelection", () => {
        const shallowWeekNumber = shallow(
          <WeekNumber showWeekPicker showWeekNumber selected={new Date()} />,
        );
        const instance = shallowWeekNumber.instance();
        instance.isKeyboardSelected = jest.fn(() => true);
        instance.isSameDay = jest.fn(() => true);
        const props = { ...instance.props, preSelection: new Date() };
        instance.props = props;
        expect(instance.getTabIndex()).toBe(0);
      });

      it("should return -1 if showWeekPicker is false", () => {
        const shallowWeekNumber = shallow(
          <WeekNumber showWeekNumber selected={new Date()} />,
        );
        const instance = shallowWeekNumber.instance();
        expect(instance.getTabIndex()).toBe(-1);
      });

      it("should return -1 if showWeekNumber is false", () => {
        const shallowWeekNumber = shallow(
          <WeekNumber showWeekPicker selected={new Date()} />,
        );
        const instance = shallowWeekNumber.instance();
        expect(instance.getTabIndex()).toBe(-1);
      });

      it("should return -1 if the day is not selected or the preSelection", () => {
        const shallowWeekNumber = shallow(
          <WeekNumber showWeekPicker showWeekNumber selected={new Date()} />,
        );
        const instance = shallowWeekNumber.instance();
        instance.isKeyboardSelected = jest.fn(() => false);
        instance.isSameDay = jest.fn(() => false);
        const props = { ...instance.props, preSelection: new Date() };
        instance.props = props;
        expect(instance.getTabIndex()).toBe(-1);
      });
    });

    describe("weekNumberClasses should return the correct classes", () => {
      it("should have the class 'react-datepicker__week-number'", () => {
        const weekNumber = 1;
        const shallowWeekNumber = shallow(
          <WeekNumber weekNumber={weekNumber} />,
        );
        expect(
          shallowWeekNumber.hasClass("react-datepicker__week-number"),
        ).toBe(true);
      });

      it("should have the class 'react-datepicker__week-number--clickable' if onClick is defined", () => {
        const shallowWeekNumber = shallow(<WeekNumber onClick={() => {}} />);
        expect(
          shallowWeekNumber.hasClass(
            "react-datepicker__week-number--clickable",
          ),
        ).toBe(true);
      });

      it("should have the class 'react-datepicker__week-number--selected' if selected is current week and preselected is also current week", () => {
        const currentWeekNumber = utils.newDate("2023-10-22T13:09:53+02:00");
        const shallowWeekNumber = shallow(
          <WeekNumber
            date={currentWeekNumber}
            selected={currentWeekNumber}
            preSelection={currentWeekNumber}
          />,
        );
        expect(
          shallowWeekNumber.hasClass("react-datepicker__week-number--selected"),
        ).toBe(true);
      });

      it("should have the class 'react-datepicker__week-number--selected' if selected is current week and preselected is not current week", () => {
        const currentWeekNumber = utils.newDate("2023-10-22T13:09:53+02:00");
        const preSelection = utils.addWeeks(currentWeekNumber, 1);
        const shallowWeekNumber = shallow(
          <WeekNumber
            date={currentWeekNumber}
            selected={currentWeekNumber}
            preSelection={preSelection}
          />,
        );
        expect(
          shallowWeekNumber.hasClass("react-datepicker__week-number--selected"),
        ).toBe(true);
      });

      it("should have the class 'react-datepicker__week-number--selected' if selected is not current week and preselected is current week", () => {
        const currentWeekNumber = utils.newDate("2023-10-22T13:09:53+02:00");
        const selected = utils.addWeeks(currentWeekNumber, 1);
        const shallowWeekNumber = shallow(
          <WeekNumber
            date={currentWeekNumber}
            selected={selected}
            preSelection={currentWeekNumber}
          />,
        );
        expect(
          shallowWeekNumber.hasClass("react-datepicker__week-number--selected"),
        ).toBe(false);
        expect(
          shallowWeekNumber.hasClass(
            "react-datepicker__week-number--keyboard-selected",
          ),
        ).toBe(true);
      });

      it("should have the class 'react-datepicker__week-number--selected' if selected is not current week and preselected is not current week", () => {
        const currentWeekNumber = utils.newDate("2023-10-22T13:09:53+02:00");
        const selected = utils.addWeeks(currentWeekNumber, 1);
        const preSelection = utils.addWeeks(currentWeekNumber, 2);
        const shallowWeekNumber = shallow(
          <WeekNumber
            date={currentWeekNumber}
            selected={selected}
            preSelection={preSelection}
          />,
        );
        expect(
          shallowWeekNumber.hasClass("react-datepicker__week-number--selected"),
        ).toBe(false);
        expect(
          shallowWeekNumber.hasClass(
            "react-datepicker__week-number--keyboard-selected",
          ),
        ).toBe(false);
      });
    });
  });

  describe("handleFocusWeekNumber", () => {
    let weekNumberEl, instance, shallowWeekNumber;

    const createComponentWithProps = (props = {}) => {
      shallowWeekNumber = shallow(<WeekNumber {...props} />);
      instance = shallowWeekNumber.instance();
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
