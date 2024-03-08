import React from "react";
import ReactDOM from "react-dom";
import { findDOMNode } from "react-dom";
import TestUtils from "react-dom/test-utils";
import { enUS, enGB } from "date-fns/locale";
import { mount } from "enzyme";
import { render, act, waitFor, fireEvent } from "@testing-library/react";
import defer from "lodash/defer";
import DatePicker, { registerLocale } from "../src/index.jsx";
import Day from "../src/day.jsx";
import TestWrapper from "./test_wrapper.jsx";
import CustomInput from "./helper_components/custom_input.jsx";
import * as utils from "../src/date_utils.js";
import Month from "../src/month.jsx";

import { getKey } from "./test_utils.js";

function getSelectedDayNode(datePicker) {
  return (
    datePicker.calendar &&
    datePicker.calendar.componentNode.querySelector(
      '.react-datepicker__day[tabindex="0"]',
    )
  );
}

function findSelectedDay(datePicker, targetDate) {
  const days = TestUtils.scryRenderedComponentsWithType(datePicker, Day);
  return days.find(
    (d) =>
      utils.formatDate(d.props.day, "yyyy-MM-dd") ===
      utils.formatDate(targetDate, "yyyy-MM-dd"),
  );
}

function goToLastMonth(datePicker) {
  const lastMonthButton = TestUtils.scryRenderedDOMComponentsWithClass(
    datePicker,
    "react-datepicker__navigation-icon--previous",
  )[0];

  TestUtils.Simulate.click(findDOMNode(lastMonthButton));
}

function formatDayWithZeros(day) {
  const dayString = day.toString();

  if (dayString.length === 1) {
    return `00${dayString}`;
  }
  if (dayString.length === 2) {
    return `0${dayString}`;
  }
  return dayString;
}

describe("DatePicker", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should show the calendar when focusing on the date input", () => {
    const { container } = render(<DatePicker />);
    fireEvent.focus(container.querySelector("input"));
    expect(container.querySelector(".react-datepicker")).not.toBeNull();
  });

  it("should allow the user to supply a wrapper component for the popper", () => {
    const { container } = render(<DatePicker popperContainer={TestWrapper} />);

    fireEvent.focus(container.querySelector("input"));

    expect(container.querySelectorAll(".test-wrapper").length).toBe(1);
    expect(container.querySelector(".react-datepicker")).not.toBeNull();
  });

  it("should allow the user to pass a wrapper component for the calendar", () => {
    const { container } = render(
      <DatePicker calendarContainer={TestWrapper} />,
    );

    fireEvent.focus(container.querySelector("input"));

    expect(container.querySelectorAll(".test-wrapper").length).toBe(1);
    expect(container.querySelector(".react-datepicker")).not.toBeNull();
  });

  it("should pass a custom class to the popper container", () => {
    const { container } = render(
      <DatePicker popperClassName="some-class-name" />,
    );

    fireEvent.focus(container.querySelector("input"));

    const popper = container.querySelectorAll(".react-datepicker-popper");
    expect(popper.length).toBe(1);
    expect(popper[0].classList.contains("some-class-name")).toBe(true);
  });

  it("should show the calendar when clicking on the date input", () => {
    const { container } = render(<DatePicker />);

    fireEvent.click(container.querySelector("input"));

    expect(container.querySelector(".react-datepicker")).not.toBeNull();
  });

  it("should render the calendar in the portalHost prop when provided", () => {
    const root = document.createElement("div");
    const shadow = root.attachShadow({ mode: "closed" });
    const appHost = document.createElement("div");
    shadow.appendChild(appHost);

    const datePicker = ReactDOM.render(
      <DatePicker portalId="test-portal" portalHost={shadow} />,
      appHost,
    );

    const dateInput = datePicker.input;
    TestUtils.Simulate.click(findDOMNode(dateInput));
    expect(datePicker.calendar).toBeDefined();
    expect(shadow.getElementById("test-portal")).toBeDefined();
  });

  it("should not set open state when it is disabled and gets clicked", () => {
    const { container } = render(<DatePicker disabled />);

    fireEvent.click(container.querySelector("input"));

    expect(container.querySelector(".react-datepicker")).toBeNull();
  });

  it("should close the popper and return focus to the date input on Escape.", (done) => {
    // https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html
    // Date Picker Dialog | Escape | Closes the dialog and returns focus to the Choose Date button.
    const div = document.createElement("div");
    document.body.appendChild(div);
    const datePicker = ReactDOM.render(<DatePicker />, div);

    // user focuses the input field, the calendar opens
    const dateInput = div.querySelector("input");
    TestUtils.Simulate.focus(dateInput);

    // user may tab or arrow down to the current day (or some other element in the popper)
    const today = div.querySelector(".react-datepicker__day--today");
    today.focus();

    // user hits Escape
    TestUtils.Simulate.keyDown(today, getKey("Escape"));

    defer(() => {
      expect(datePicker.calendar).toBeFalsy();
      expect(datePicker.state.preventFocus).toBe(false);
      expect(document.activeElement).toBe(div.querySelector("input"));
      done();
    });
  });

  it("should close the popper and return focus to the date input on Enter.", (done) => {
    // https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html
    // Date Picker Dialog | Date Grid | Enter | Closes the dialog and returns focus to the Choose Date button.
    const div = document.createElement("div");
    document.body.appendChild(div);
    const datePicker = ReactDOM.render(<DatePicker />, div);

    // user focuses the input field, the calendar opens
    const dateInput = div.querySelector("input");
    TestUtils.Simulate.focus(dateInput);

    // user may tab or arrow down to the current day (or some other element in the popper)
    const today = div.querySelector(".react-datepicker__day--today");
    today.focus();

    // user hits Enter
    TestUtils.Simulate.keyDown(today, getKey("Enter"));
    defer(() => {
      expect(datePicker.calendar).toBeFalsy();
      expect(datePicker.state.preventFocus).toBe(false);
      expect(document.activeElement).toBe(div.querySelector("input"));
      done();
    });
  });

  it("should not close the popper and keep focus on selected date if showTimeSelect is enabled.", (done) => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const datePicker = ReactDOM.render(<DatePicker showTimeSelect />, div);

    // user focuses the input field, the calendar opens
    const dateInput = div.querySelector("input");
    TestUtils.Simulate.focus(dateInput);

    // user may tab or arrow down to the current day (or some other element in the popper)
    const today = div.querySelector(".react-datepicker__day--today");
    today.focus();

    // user hits Enter
    TestUtils.Simulate.keyDown(today, getKey("Enter"));
    defer(() => {
      expect(datePicker.calendar).toBeTruthy();
      expect(document.activeElement).toBe(today);
      done();
    });
  });

  it("should not re-focus the date input when focusing the year dropdown", () => {
    const onBlurSpy = jest.fn();
    const { container } = render(
      <DatePicker
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        onBlur={onBlurSpy}
      />,
    );
    const input = container.querySelector("input");
    const focusSpy = jest.spyOn(input, "focus");

    fireEvent.focus(input);

    const yearSelect = container.querySelector(
      ".react-datepicker__year-select",
    );
    fireEvent.blur(input);
    fireEvent.focus(yearSelect);

    expect(focusSpy).not.toHaveBeenCalled();
    expect(onBlurSpy).not.toHaveBeenCalled();
  });

  it("should fire onYearChange when the year is selected", () => {
    const onYearChangeSpy = jest.fn();
    const { container } = render(
      <DatePicker
        showYearDropdown
        dropdownMode="select"
        onYearChange={onYearChangeSpy}
      />,
    );
    const input = container.querySelector("input");
    fireEvent.click(input);

    const yearSelect = container.querySelector(
      ".react-datepicker__year-select",
    );
    fireEvent.change(yearSelect);
    expect(onYearChangeSpy).toHaveBeenCalled();
  });

  it("should keep the calendar shown when clicking the calendar", () => {
    const { container } = render(<DatePicker />);
    const input = container.querySelector("input");
    fireEvent.focus(input);
    fireEvent.click(input);
    expect(container.querySelector(".react-datepicker")).not.toBeNull();
  });

  it("should not set open state when it is disabled and gets clicked", () => {
    const { container } = render(<DatePicker disabled />);
    fireEvent.click(container.querySelector("input"));
    expect(container.querySelector(".react-datepicker")).toBeNull();
  });

  it("should not set open state when it is readOnly and gets clicked", () => {
    const { container } = render(<DatePicker readOnly />);
    fireEvent.click(container.querySelector("input"));
    expect(container.querySelector(".react-datepicker")).toBeNull();
  });

  it("should hide the calendar when clicking a day on the calendar", () => {
    const { container } = render(<DatePicker />);
    fireEvent.focus(container.querySelector("input"));
    fireEvent.click(container.querySelector(".react-datepicker__day"));
    expect(container.querySelector(".react-datepicker")).toBeNull();
  });

  it("should not hide the calendar when clicking a day on the calendar and shouldCloseOnSelect prop is false", () => {
    const { container } = render(<DatePicker shouldCloseOnSelect={false} />);
    fireEvent.focus(container.querySelector("input"));
    fireEvent.click(container.querySelector(".react-datepicker__day"));
    expect(container.querySelector(".react-datepicker")).not.toBeNull();
  });

  it("should keep focus within calendar when clicking a day on the calendar and shouldCloseOnSelect prop is false", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    ReactDOM.render(<DatePicker shouldCloseOnSelect={false} />, div);

    // user focuses the input field, the calendar opens
    const dateInput = div.querySelector("input");
    TestUtils.Simulate.focus(dateInput);

    // user may tab or arrow down to the current day (or some other element in the popper)
    const today = div.querySelector(".react-datepicker__day--today");
    today.focus();

    // user hits Enter
    TestUtils.Simulate.keyDown(today, getKey("Enter"));
    expect(document.activeElement).toBe(today);
  });

  it("should set open to true if showTimeInput is true", () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker shouldCloseOnSelect={false} showTimeInput />,
    );
    const handleTimeChange = datePicker.handleTimeChange;
    handleTimeChange("13:00");
    expect(datePicker.state.open).toBe(true);
  });

  it("should not hide the calendar when selecting a day in the calendar with Enter press, and shouldCloseOnSelect prop is false", () => {
    const data = getOnInputKeyDownStuff({ shouldCloseOnSelect: false });
    const dateInput = data.datePicker.input;

    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowUp"));
    TestUtils.Simulate.keyDown(findDOMNode(dateInput), getKey("Enter"));
    expect(data.datePicker.state.open).toBe(true);
  });

  it("should update the preSelection state when a day is selected with Enter press", () => {
    const data = getOnInputKeyDownStuff({ shouldCloseOnSelect: false });

    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    TestUtils.Simulate.keyDown(
      getSelectedDayNode(data.datePicker),
      getKey("ArrowDown"),
    );
    TestUtils.Simulate.keyDown(
      getSelectedDayNode(data.datePicker),
      getKey("ArrowDown"),
    );
    TestUtils.Simulate.keyDown(
      getSelectedDayNode(data.datePicker),
      getKey("Enter"),
    );

    data.copyM = utils.addWeeks(data.copyM, 2);
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });

  xit("should update the preSelection state when a day is selected with mouse click", () => {
    const data = getOnInputKeyDownStuff({
      shouldCloseOnSelect: false,
    });

    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown")); // put focus on current day
    const today = getSelectedDayNode(data.datePicker); // store current day node
    const dayToClick = today.nextElementSibling || today.previousElementSibling; // choose next or previous day
    TestUtils.Simulate.click(dayToClick); // will update the preSelection
    data.copyM = today.nextElementSibling
      ? utils.addDays(data.copyM, 1)
      : utils.subDays(data.copyM, 1); // update copyM to expected date

    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });

  it("should update the preSelection state when Today button is clicked after selecting a different day for inline mode", () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        todayButton="Today"
        selected={utils.newDate()}
        inline
        onChange={(d) => {
          // eslint-disable-next-line
          const date = d;
        }}
      />,
    );

    const today = getSelectedDayNode(datePicker);
    const anyOtherDay =
      today.nextElementSibling || today.previousElementSibling;
    TestUtils.Simulate.click(anyOtherDay); // will update the preSelection to next or previous day

    const todayBtn = datePicker.calendar.componentNode.querySelector(
      ".react-datepicker__today-button",
    );
    TestUtils.Simulate.click(todayBtn); // will update the preSelection

    expect(utils.formatDate(datePicker.state.preSelection, "yyyy-MM-dd")).toBe(
      utils.formatDate(utils.newDate(), "yyyy-MM-dd"),
    );
  });

  it("should hide the calendar when pressing enter in the date input", () => {
    const { container } = render(<DatePicker />);
    const input = container.querySelector("input");
    fireEvent.focus(input);
    fireEvent.keyDown(input, getKey("Enter"));
    expect(container.querySelector(".react-datepicker")).toBeNull();
  });

  it("should hide the calendar when the pressing escape in the date input", () => {
    const { container } = render(<DatePicker />);
    const input = container.querySelector("input");
    fireEvent.focus(input);
    fireEvent.keyDown(input, getKey("Escape"));
    expect(container.querySelector(".react-datepicker")).toBeNull();
  });

  it("should hide the calendar and keep focus on input when pressing escape in the date input", (done) => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const datePicker = ReactDOM.render(<DatePicker />, div);

    // user focuses the input field, the calendar opens
    const dateInput = div.querySelector("input");
    TestUtils.Simulate.focus(dateInput);

    TestUtils.Simulate.keyDown(dateInput, getKey("Escape"));
    defer(() => {
      expect(datePicker.calendar).toBeFalsy();
      expect(document.activeElement).toBe(dateInput);
      done();
    });
  });

  it("should hide the calendar when the pressing Shift + Tab in the date input", () => {
    const { container } = render(<DatePicker onBlur={onBlurSpy} />);
    const input = container.querySelector("input");
    const onBlurSpy = jest.spyOn(input, "blur");
    fireEvent.focus(input);
    fireEvent.keyDown(input, getKey("Tab", true));
    expect(container.querySelector(".react-datepicker")).toBeNull();
    expect(onBlurSpy).toHaveBeenCalled();
  });

  it("should not apply the react-datepicker-ignore-onclickoutside class to the date input when closed", () => {
    const { container } = render(<DatePicker />);
    const input = container.querySelector("input");
    expect(
      input.classList.contains("react-datepicker-ignore-onclickoutside"),
    ).toBeFalsy();
  });

  it("should apply the react-datepicker-ignore-onclickoutside class to date input when open", () => {
    const { container } = render(<DatePicker />);
    const input = container.querySelector("input");
    fireEvent.focus(input);
    expect(
      input.classList.contains("react-datepicker-ignore-onclickoutside"),
    ).toBeTruthy();
  });

  it("should toggle the open status of calendar on click of the icon when toggleCalendarOnIconClick is set to true", () => {
    const { container } = render(
      <DatePicker
        selected={utils.newDate("2023-12-17")}
        showIcon
        toggleCalendarOnIconClick
      />,
    );

    const calendarIcon = container.querySelector(
      "svg.react-datepicker__calendar-icon",
    );
    fireEvent.click(calendarIcon);

    const reactCalendar = container.querySelector(
      "div.react-datepicker-popper .react-datepicker",
    );

    expect(reactCalendar).not.toBeNull();
  });

  it("should not toggle the open status of calendar on click of the icon if toggleCalendarOnIconClick is set to false", () => {
    const { container } = render(
      <DatePicker
        selected={utils.newDate("2023-12-17")}
        showIcon
        toggleCalendarOnIconClick={false}
      />,
    );

    const calendarIcon = container.querySelector(
      "svg.react-datepicker__calendar-icon",
    );
    fireEvent.click(calendarIcon);

    const reactCalendar = container.querySelector(
      "div.react-datepicker-popper .react-datepicker",
    );

    expect(reactCalendar).toBeNull();
  });

  it("should not apply the react-datepicker-ignore-onclickoutside class to calendar icon when closed", () => {
    const { container } = render(
      <DatePicker selected={utils.newDate("2023-12-17")} showIcon />,
    );

    const calendarIcon = container.querySelector(
      ".react-datepicker__calendar-icon",
    );
    expect(
      calendarIcon.classList.contains("react-datepicker-ignore-onclickoutside"),
    ).toBe(false);
  });

  it("should apply the react-datepicker-ignore-onclickoutside class to calendar icon when open", () => {
    const { container } = render(
      <DatePicker
        selected={utils.newDate("2023-12-17")}
        showIcon
        toggleCalendarOnIconClick
      />,
    );

    let calendarIcon = container.querySelector(
      "svg.react-datepicker__calendar-icon",
    );
    fireEvent.click(calendarIcon);

    calendarIcon = container.querySelector(
      "svg.react-datepicker__calendar-icon",
    );

    expect(
      calendarIcon.classList.contains("react-datepicker-ignore-onclickoutside"),
    ).toBe(true);
  });

  it("should set the type attribute on the clear button to button", () => {
    const { container } = render(
      <DatePicker selected={utils.newDate("2015-12-15")} isClearable />,
    );
    const clearButton = container.querySelector(
      ".react-datepicker__close-icon",
    );
    expect(clearButton.type).toBe("button");
  });

  it("should allow clearing the date when isClearable is true", () => {
    let cleared = false;
    function handleChange(d) {
      if (d === null) {
        cleared = true;
      }
    }
    const { container } = render(
      <DatePicker
        selected={utils.newDate("2015-12-15")}
        isClearable
        onChange={handleChange}
      />,
    );
    const clearButton = container.querySelector(
      ".react-datepicker__close-icon",
    );
    fireEvent.click(clearButton);
    expect(cleared).toBe(true);
  });

  it("should clear input value in the local state", () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker selected={utils.newDate("2015-12-15")} isClearable />,
    );
    var clearButton = TestUtils.findRenderedDOMComponentWithClass(
      datePicker,
      "react-datepicker__close-icon",
    );
    TestUtils.Simulate.click(clearButton);
    expect(datePicker.state.inputValue).toBeNull();
  });

  it("should disable the clear button when the component is disabled", () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <DatePicker
        ariaLabelClose="clear"
        disabled
        selected={utils.newDate("2023-11-25")}
        isClearable
        onChange={onChange}
      />,
    );
    const clearButton = getByLabelText("clear");
    expect(clearButton).toHaveProperty("disabled", true);
    fireEvent.click(clearButton);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("should return focus to input when clear button is used", (done) => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const datePicker = ReactDOM.render(
      <DatePicker selected={utils.newDate("2015-12-15")} isClearable />,
      div,
    );

    const clearButton = TestUtils.findRenderedDOMComponentWithClass(
      datePicker,
      "react-datepicker__close-icon",
    );
    TestUtils.Simulate.click(clearButton);

    defer(() => {
      expect(document.activeElement).toBe(div.querySelector("input"));
      done();
    });
  });

  it("should set the title attribute on the clear button if clearButtonTitle is supplied", () => {
    const { container } = render(
      <DatePicker
        selected={utils.newDate("2018-03-19")}
        isClearable
        clearButtonTitle="clear button"
      />,
    );
    const clearButton = container.querySelector(
      ".react-datepicker__close-icon",
    );
    expect(clearButton.getAttribute("title")).toBe("clear button");
  });

  it("should customize the className attribute on the clear button if clearButtonClassName is supplied", () => {
    const className = "customized-close-icon";
    const { container } = render(
      <DatePicker
        selected={utils.newDate("2021-04-15")}
        isClearable
        clearButtonClassName={className}
      />,
    );
    expect(
      container
        .querySelector(".react-datepicker__close-icon")
        .classList.contains(className),
    ).toBeTruthy();
  });

  it("should save time from the selected date during day change", () => {
    const selected = utils.newDate("2015-12-20 10:11:12");
    let date;

    const { container } = render(
      <DatePicker
        inline
        selected={selected}
        onChange={(d) => {
          date = d;
        }}
      />,
    );
    const dayButton = container.querySelector(".react-datepicker__day");
    fireEvent.click(dayButton);

    expect(utils.getHours(date)).toBe(10);
    expect(utils.getMinutes(date)).toBe(11);
    expect(utils.getSeconds(date)).toBe(12);
  });

  it("should save time from the selected date during date change", () => {
    const selected = utils.newDate("2015-12-20 10:11:12");
    let date;

    const { container } = render(
      <DatePicker
        selected={selected}
        onChange={(d) => {
          date = d;
        }}
      />,
    );
    const input = container.querySelector("input");
    fireEvent.change(input, {
      target: {
        value: utils.newDate("2014-01-02"),
      },
    });

    expect(utils.getHours(date)).toBe(10);
    expect(utils.getMinutes(date)).toBe(11);
    expect(utils.getSeconds(date)).toBe(12);
  });

  it("should mount and unmount properly", (done) => {
    class TestComponent extends React.Component {
      constructor(props) {
        super(props);
        this.state = { mounted: true };
      }

      render() {
        return this.state.mounted ? <DatePicker /> : null;
      }
    }
    var element = TestUtils.renderIntoDocument(<TestComponent />);
    element.setState({ mounted: false }, done);
  });

  it("should render calendar inside PopperComponent when inline prop is not set", () => {
    const { container } = render(<DatePicker />);

    expect(container.querySelector(".react-datepicker-wrapper")).not.toBeNull();
  });

  it("should render calendar directly without PopperComponent when inline prop is set", () => {
    const { container } = render(<DatePicker inline />);

    expect(container.querySelector(".react-datepicker-wrapper")).toBeNull();
    expect(container.querySelector(".react-datepicker")).not.toBeNull();
  });

  it("should ignore disable prop when inline prop is set", () => {
    const { container } = render(<DatePicker inline disabled />);

    expect(container.querySelector(".react-datepicker")).not.toBeNull();
  });

  it("should ignore withPortal prop when inline prop is set", () => {
    const { container } = render(<DatePicker inline withPortal />);

    expect(container.querySelector(".react-datepicker__portal")).toBeNull();
  });

  it("should render Calendar in portal when withPortal is set and input has focus", () => {
    const { container } = render(<DatePicker withPortal />);

    fireEvent.focus(container.querySelector("input"));

    expect(
      document.body.querySelector(".react-datepicker__portal"),
    ).not.toBeNull();
    expect(container.querySelector(".react-datepicker")).not.toBeNull();
  });

  it("should render Calendar in portal when withPortal is set and should close on Escape key when focus is on header", () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker withPortal portalId="portal-id-dom-test" />,
    );
    const dateInput = datePicker.input;
    TestUtils.Simulate.focus(findDOMNode(dateInput));

    expect(function () {
      TestUtils.findRenderedDOMComponentWithClass(
        datePicker,
        "react-datepicker__portal",
      );
    }).not.toThrow();
    expect(datePicker.calendar).toBeDefined();

    const header = TestUtils.scryRenderedDOMComponentsWithClass(
      datePicker,
      "react-datepicker__current-month",
    )[0];

    const node = findDOMNode(header);

    TestUtils.Simulate.click(node);

    TestUtils.Simulate.keyDown(node, getKey("Escape"));

    expect(datePicker.calendar).toBeFalsy();
  });

  it("should not render Calendar when withPortal is set and no focus is given to input", () => {
    const { container } = render(<DatePicker withPortal />);

    expect(document.body.querySelector(".react-datepicker__portal")).toBeNull();
    expect(container.querySelector(".react-datepicker")).toBeNull();
  });

  it("should render Calendar in a ReactDOM portal when withPortal is set and portalId is set", () => {
    const { container } = render(
      <DatePicker withPortal portalId="portal-id-dom-test" />,
    );

    fireEvent.focus(container.querySelector("input"));

    expect(document.body.querySelector("#portal-id-dom-test")).not.toBeNull();
  });

  function getOnInputKeyDownStuff(opts) {
    opts = opts || {};
    const m = utils.newDate();
    const copyM = utils.newDate(m);
    const testFormat = "yyyy-MM-dd";
    const exactishFormat = "yyyy-MM-dd hh: zzzz";
    const callback = jest.fn();
    const onInputErrorCallback = jest.fn();

    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        selected={m}
        onChange={callback}
        onInputError={onInputErrorCallback}
        dateFormat={testFormat}
        {...opts}
      />,
    );
    const dateInput = datePicker.input;
    const node = findDOMNode(dateInput);
    const nodeInput = node;
    const dateCalendar = datePicker.calendar;
    TestUtils.Simulate.focus(nodeInput);
    return {
      m,
      copyM,
      testFormat,
      exactishFormat,
      callback,
      onInputErrorCallback,
      datePicker,
      dateInput,
      nodeInput,
      dateCalendar,
    };
  }
  it("should handle onDayKeyDown ArrowLeft", () => {
    const data = getOnInputKeyDownStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    TestUtils.Simulate.keyDown(
      getSelectedDayNode(data.datePicker),
      getKey("ArrowLeft"),
    );
    data.copyM = utils.subDays(data.copyM, 1);
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should handle onDayKeyDown ArrowRight", () => {
    const data = getOnInputKeyDownStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    TestUtils.Simulate.keyDown(
      getSelectedDayNode(data.datePicker),
      getKey("ArrowRight"),
    );
    data.copyM = utils.addDays(data.copyM, 1);
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should handle onDayKeyDown ArrowUp", () => {
    const data = getOnInputKeyDownStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    TestUtils.Simulate.keyDown(
      getSelectedDayNode(data.datePicker),
      getKey("ArrowUp"),
    );
    data.copyM = utils.subWeeks(data.copyM, 1);
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should handle onDayKeyDown ArrowDown", () => {
    const data = getOnInputKeyDownStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    TestUtils.Simulate.keyDown(
      getSelectedDayNode(data.datePicker),
      getKey("ArrowDown"),
    );
    data.copyM = utils.addWeeks(data.copyM, 1);
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should handle onDayKeyDown PageUp", () => {
    const data = getOnInputKeyDownStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    TestUtils.Simulate.keyDown(
      getSelectedDayNode(data.datePicker),
      getKey("PageUp"),
    );
    data.copyM = utils.subMonths(data.copyM, 1);
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should handle onDayKeyDown Shift+PageUp", () => {
    const data = getOnInputKeyDownStuff();

    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    TestUtils.Simulate.keyDown(
      getSelectedDayNode(data.datePicker),
      getKey("PageUp", true),
    );

    data.copyM = utils.subYears(data.copyM, 1);

    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should handle onDayKeyDown PageDown", () => {
    const data = getOnInputKeyDownStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    TestUtils.Simulate.keyDown(
      getSelectedDayNode(data.datePicker),
      getKey("PageDown"),
    );
    data.copyM = utils.addMonths(data.copyM, 1);
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should handle onDayKeyDown Shift+PageDown", () => {
    const data = getOnInputKeyDownStuff();

    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    TestUtils.Simulate.keyDown(
      getSelectedDayNode(data.datePicker),
      getKey("PageDown", true),
    );

    data.copyM = utils.addYears(data.copyM, 1);

    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should handle onDayKeyDown End", () => {
    const data = getOnInputKeyDownStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    TestUtils.Simulate.keyDown(
      getSelectedDayNode(data.datePicker),
      getKey("End"),
    );
    data.copyM = utils.getEndOfWeek(data.copyM);
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should handle onDayKeyDown Home", () => {
    const data = getOnInputKeyDownStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    TestUtils.Simulate.keyDown(
      getSelectedDayNode(data.datePicker),
      getKey("Home"),
    );
    data.copyM = utils.getStartOfWeek(data.copyM);
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should call onMonthChange when keyboard navigation moves preSelection to different month", () => {
    const onMonthChangeSpy = jest.fn();
    const opts = { onMonthChange: onMonthChangeSpy };
    const data = getOnInputKeyDownStuff(opts);
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    TestUtils.Simulate.keyDown(
      getSelectedDayNode(data.datePicker),
      getKey("PageDown"),
    );

    expect(onMonthChangeSpy).toHaveBeenCalledTimes(1);
  });
  it("should call onSelect only once when keyboard navigation moves selection to different month", () => {
    const onSelectSpy = jest.fn();
    const opts = { onSelect: onSelectSpy, adjustDateOnChange: true };
    const data = getOnInputKeyDownStuff(opts);
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    TestUtils.Simulate.keyDown(
      getSelectedDayNode(data.datePicker),
      getKey("PageDown"),
    );
    expect(onSelectSpy).toHaveBeenCalledTimes(1);
  });
  it("should not preSelect date if not between minDate and maxDate", () => {
    const data = getOnInputKeyDownStuff({
      minDate: utils.subDays(utils.newDate(), 1),
      maxDate: utils.addDays(utils.newDate(), 1),
    });
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should not preSelect date if before minDate", () => {
    const data = getOnInputKeyDownStuff({
      minDate: utils.subDays(utils.newDate(), 1),
    });
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowUp"));
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should not preSelect date if after maxDate", () => {
    const data = getOnInputKeyDownStuff({
      maxDate: utils.addDays(utils.newDate(), 1),
    });
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });

  it("should be possible to preSelect minDate (no maxDate set)", () => {
    const data = getOnInputKeyDownStuff({
      minDate: utils.newDate(),
    });
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    TestUtils.Simulate.keyDown(
      getSelectedDayNode(data.datePicker),
      getKey("ArrowRight"),
    );
    TestUtils.Simulate.keyDown(
      getSelectedDayNode(data.datePicker),
      getKey("ArrowLeft"),
    );
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.datePicker.props.minDate, data.testFormat));
  });

  it("should be possible to preSelect minDate (maxDate set)", () => {
    const data = getOnInputKeyDownStuff({
      minDate: utils.newDate(),
      maxDate: utils.addDays(utils.newDate(), 20),
    });
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    TestUtils.Simulate.keyDown(
      getSelectedDayNode(data.datePicker),
      getKey("ArrowRight"),
    );
    TestUtils.Simulate.keyDown(
      getSelectedDayNode(data.datePicker),
      getKey("ArrowLeft"),
    );
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.datePicker.props.minDate, data.testFormat));
  });

  it("should be possible to preSelect maxDate (no minDate set)", () => {
    const data = getOnInputKeyDownStuff({
      maxDate: utils.addDays(utils.newDate(), 1),
    });
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    TestUtils.Simulate.keyDown(
      getSelectedDayNode(data.datePicker),
      getKey("ArrowRight"),
    );
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.datePicker.props.maxDate, data.testFormat));
  });

  it("should be possible to preSelect maxDate (minDate set)", () => {
    const data = getOnInputKeyDownStuff({
      minDate: utils.subDays(utils.newDate(), 20),
      maxDate: utils.addDays(utils.newDate(), 1),
    });
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    TestUtils.Simulate.keyDown(
      getSelectedDayNode(data.datePicker),
      getKey("ArrowRight"),
    );
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.datePicker.props.maxDate, data.testFormat));
  });

  it("should not clear the preSelect date when a pressed key is not a navigation key", () => {
    const data = getOnInputKeyDownStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("x"));
    expect(data.datePicker.state.preSelection.valueOf()).toBe(
      data.copyM.valueOf(),
    );
  });

  describe("when update the datepicker input text while props.minDate is set", () => {
    let datePicker;
    beforeEach(() => {
      datePicker = render(
        <DatePicker
          selected={new Date("1993-07-02")}
          minDate={new Date("1800/01/01")}
          open
        />,
      ).container;
    });

    it("should auto update calendar when the updated date text is after props.minDate", () => {
      const input = datePicker.querySelector("input");

      fireEvent.change(input, {
        target: {
          value: "1801/01/01",
        },
      });

      expect(datePicker.querySelector("input").value).toBe("1801/01/01");
      expect(
        datePicker.querySelector(".react-datepicker__current-month").innerHTML,
      ).toBe("January 1801");
    });

    it("should not auto update calendar when the updated date text is before props.minDate", () => {
      const input = datePicker.querySelector("input");

      fireEvent.change(input, {
        target: {
          value: "1799/01/01",
        },
      });

      expect(
        datePicker.querySelector(".react-datepicker__current-month").innerHTML,
      ).toBe("July 1993");
    });
  });

  it("should not manual select date if before minDate", () => {
    const minDate = utils.subDays(utils.newDate(), 1);
    const data = getOnInputKeyDownStuff({
      minDate: minDate,
    });
    TestUtils.Simulate.change(data.nodeInput, {
      target: {
        value: utils.formatDate(utils.subDays(minDate, 1), data.testFormat),
      },
    });
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("Enter"));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should not manual select date if after maxDate", () => {
    const maxDate = utils.addDays(utils.newDate(), 1);
    const data = getOnInputKeyDownStuff({
      maxDate: maxDate,
    });
    TestUtils.Simulate.change(data.nodeInput, {
      target: {
        value: utils.formatDate(utils.addDays(maxDate, 1), data.testFormat),
      },
    });
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("Enter"));
    expect(data.callback).not.toHaveBeenCalled();
  });
  describe("onInputKeyDown Enter", () => {
    it("should update the selected date", () => {
      const data = getOnInputKeyDownStuff();
      TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown")); // puts focus on the calendar day
      TestUtils.Simulate.keyDown(
        getSelectedDayNode(data.datePicker),
        getKey("ArrowLeft"),
      );
      TestUtils.Simulate.keyDown(
        getSelectedDayNode(data.datePicker),
        getKey("Enter"),
      );

      data.copyM = utils.subDays(data.copyM, 1);
      expect(data.callback).toHaveBeenCalled();
      const result = data.callback.mock.calls[0][0];
      expect(utils.formatDate(result, data.testFormat)).toBe(
        utils.formatDate(data.copyM, data.testFormat),
      );
    });
    it("should update the selected date on manual input", () => {
      const data = getOnInputKeyDownStuff();
      TestUtils.Simulate.change(data.nodeInput, {
        target: { value: "02/02/2017" },
      });
      TestUtils.Simulate.keyDown(data.nodeInput, getKey("Enter"));
      data.copyM = utils.newDate("2017-02-02");
      expect(
        utils.formatDate(data.callback.mock.calls[0][0], data.testFormat),
      ).toBe(utils.formatDate(data.copyM, data.testFormat));
    });
    it("should not select excludeDates", () => {
      const data = getOnInputKeyDownStuff({
        excludeDates: [utils.subDays(utils.newDate(), 1)],
      });
      TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowLeft"));
      TestUtils.Simulate.keyDown(data.nodeInput, getKey("Enter"));
      expect(data.callback).not.toHaveBeenCalled();
    });
    describe("with excludeDateIntervals", () => {
      it("should not select the start date of the interval", () => {
        const data = getOnInputKeyDownStuff({
          excludeDateIntervals: [
            {
              start: utils.subDays(utils.newDate(), 1),
              end: utils.addDays(utils.newDate(), 1),
            },
          ],
        });
        TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowLeft"));
        TestUtils.Simulate.keyDown(data.nodeInput, getKey("Enter"));
        expect(data.callback).not.toHaveBeenCalled();
      });
      it("should not select a dates within the interval", () => {
        const data = getOnInputKeyDownStuff({
          excludeDateIntervals: [
            {
              start: utils.subDays(utils.newDate(), 1),
              end: utils.addDays(utils.newDate(), 1),
            },
          ],
        });
        TestUtils.Simulate.keyDown(data.nodeInput, getKey("Enter"));
        expect(data.callback).not.toHaveBeenCalled();
      });
      it("should not select the end date of the interval", () => {
        const data = getOnInputKeyDownStuff({
          excludeDateIntervals: [
            {
              start: utils.subDays(utils.newDate(), 1),
              end: utils.addDays(utils.newDate(), 1),
            },
          ],
        });
        TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowRight"));
        TestUtils.Simulate.keyDown(data.nodeInput, getKey("Enter"));
        expect(data.callback).not.toHaveBeenCalled();
      });
    });
    it("should not select dates excluded from filterDate", () => {
      const data = getOnInputKeyDownStuff({
        filterDate: (date) =>
          utils.getDay(date) !==
          utils.getDay(utils.subDays(utils.newDate(), 1)),
      });
      TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowLeft"));
      TestUtils.Simulate.keyDown(data.nodeInput, getKey("Enter"));
      expect(data.callback).not.toHaveBeenCalled();
    });
  });
  describe("onInputKeyDown Escape", () => {
    it("should not update the selected date if the date input manually it has something wrong", () => {
      const data = getOnInputKeyDownStuff();
      const preSelection = data.datePicker.state.preSelection;
      TestUtils.Simulate.keyDown(data.nodeInput, getKey("Backspace"));
      TestUtils.Simulate.keyDown(data.nodeInput, getKey("Escape"));
      expect(data.callback).not.toHaveBeenCalled(); // confirms that handleChange occurred
      expect(preSelection).toBe(data.datePicker.state.preSelection); // confirms the preSelection is still the same
    });
  });
  it("should reset the keyboard selection when closed", () => {
    const data = getOnInputKeyDownStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowLeft"));
    data.datePicker.setOpen(false);
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should retain the keyboard selection when already open", () => {
    const data = getOnInputKeyDownStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    TestUtils.Simulate.keyDown(
      getSelectedDayNode(data.datePicker),
      getKey("ArrowLeft"),
    );
    data.copyM = utils.subDays(data.copyM, 1);
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should open the calendar when the down arrow key is pressed", () => {
    const data = getOnInputKeyDownStuff();
    data.datePicker.setOpen(false);
    expect(data.datePicker.state.open).toBe(false);
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    expect(data.datePicker.state.open).toBe(true);
  });
  it("should not open the calendar when the left arrow key is pressed", () => {
    const data = getOnInputKeyDownStuff();
    data.datePicker.setOpen(false);
    expect(data.datePicker.state.open).toBe(false);
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowLeft"));
    expect(data.datePicker.state.open).toBe(false);
  });
  it("should default to the current day on Enter", () => {
    const data = getOnInputKeyDownStuff({ selected: null });
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("Enter"));
    expect(data.callback).toHaveBeenCalledTimes(1);
    const selected = data.callback.mock.calls[0][0];
    expect(utils.formatDate(selected, data.exactishFormat)).toBe(
      utils.formatDate(data.copyM, data.exactishFormat),
    );
  });

  it("should autoFocus the input given the autoFocus prop", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    render(<DatePicker autoFocus />, {
      container: div,
    });
    expect(div.querySelector("input")).toBe(document.activeElement);
  });
  it("should autoFocus the input when calling the setFocus method", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const datePicker = ReactDOM.render(<DatePicker />, div);
    datePicker.setFocus();
    expect(div.querySelector("input")).toBe(document.activeElement);
  });
  it("should clear preventFocus timeout id when component is unmounted", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const datePicker = ReactDOM.render(<DatePicker inline />, div);
    datePicker.clearPreventFocusTimeout = jest.fn();
    ReactDOM.unmountComponentAtNode(div);
    expect(datePicker.clearPreventFocusTimeout).toHaveBeenCalledTimes(1);
  });

  function getOnInputKeyDownDisabledKeyboardNavigationStuff() {
    const m = utils.newDate();
    const copyM = utils.newDate(m);
    const testFormat = "yyyy-MM-dd";
    const callback = jest.fn();
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        selected={m}
        onChange={callback}
        disabledKeyboardNavigation
      />,
    );
    const dateInput = datePicker.input;
    const node = findDOMNode(dateInput);
    const nodeInput = node;
    TestUtils.Simulate.focus(nodeInput);
    return {
      m,
      copyM,
      testFormat,
      callback,
      datePicker,
      dateInput,
      nodeInput,
    };
  }
  it("should not handle onInputKeyDown ArrowLeft", () => {
    const data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowLeft"));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should not handle onInputKeyDown ArrowRight", () => {
    const data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowRight"));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should not handle onInputKeyDown ArrowUp", () => {
    const data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowUp"));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should not handle onInputKeyDown ArrowDown", () => {
    const data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should not handle onInputKeyDown PageUp", () => {
    const data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("PageUp"));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should not handle onInputKeyDown PageDown", () => {
    const data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("PageDown"));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should not handle onInputKeyDown Home", () => {
    const data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("Home"));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should not handle onInputKeyDown End", () => {
    const data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("End"));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should correctly clear date with empty input string", () => {
    let cleared = false;
    function handleChange(d) {
      // Internally DateInput calls it's onChange prop with null
      // when the input value is an empty string
      if (d === null) {
        cleared = true;
      }
    }
    const { container } = render(
      <DatePicker
        selected={utils.newDate("2016-11-22")}
        onChange={handleChange}
      />,
    );
    const input = container.querySelector("input");
    fireEvent.change(input, {
      target: {
        value: "",
      },
    });
    expect(cleared).toBe(true);
  });
  it("should correctly update the input when the value prop changes", () => {
    const datePicker = mount(<DatePicker />);
    expect(datePicker.find("input").prop("value")).toBe("");
    datePicker.setProps({ value: "foo" });
    expect(datePicker.find("input").prop("value")).toBe("foo");
  });
  it("should preserve user input as they are typing", () => {
    const onChange = (date) => datePicker.setProps({ selected: date });
    const datePicker = mount(
      <DatePicker
        dateFormat={["yyyy-MM-dd", "MM/dd/yyyy", "MM/dd/yy"]}
        onChange={onChange}
      />,
    );
    expect(datePicker.find("input").prop("value")).toBe("");

    const str = "12/30/1982";
    datePicker.find("input").simulate("focus");
    str.split("").forEach((c, i) => {
      datePicker.find("input").simulate("change", {
        target: { value: datePicker.find("input").prop("value") + c },
      });
      datePicker.update();
      expect(datePicker.find("input").prop("value")).toBe(
        str.substring(0, i + 1),
      );
    });
    expect(utils.formatDate(datePicker.prop("selected"), "yyyy-MM-dd")).toBe(
      "1982-12-30",
    );
  });
  it("should invoke provided onChangeRaw function and should not invoke provided onSelect function on manual input change", () => {
    const inputValue = "test";
    const onChangeRawSpy = jest.fn();
    const onSelectSpy = jest.fn();
    const { container } = render(
      <DatePicker
        selected={utils.newDate()}
        onChange={jest.fn()}
        onChangeRaw={onChangeRawSpy}
        onSelect={onSelectSpy}
      />,
    );
    expect(onChangeRawSpy).not.toHaveBeenCalled();
    expect(onSelectSpy).not.toHaveBeenCalled();
    const input = container.querySelector("input");
    fireEvent.change(input, {
      target: {
        value: inputValue,
      },
    });
    expect(onChangeRawSpy).toHaveBeenCalledTimes(1);
    expect(onChangeRawSpy.mock.calls[0][0].target.value).toBe(inputValue);
    expect(onSelectSpy).not.toHaveBeenCalled();
  });
  it("should invoke provided onChangeRaw and onSelect functions when clicking a day on the calendar", () => {
    const onChangeRawSpy = jest.fn();
    const onSelectSpy = jest.fn();
    const { container } = render(
      <DatePicker
        selected={utils.newDate()}
        onChange={jest.fn()}
        onChangeRaw={onChangeRawSpy}
        onSelect={onSelectSpy}
      />,
    );
    expect(onChangeRawSpy).not.toHaveBeenCalled();
    expect(onSelectSpy).not.toHaveBeenCalled();
    const input = container.querySelector("input");
    fireEvent.focus(input);
    const day = container.querySelector(".react-datepicker__day");
    fireEvent.click(day);
    expect(onChangeRawSpy).toHaveBeenCalledTimes(1);
    expect(onSelectSpy).toHaveBeenCalledTimes(1);
  });
  it("should allow onChangeRaw to prevent a change", () => {
    const onChangeRaw = (e) => e.target.value > "2" && e.preventDefault();
    const { container } = render(<DatePicker onChangeRaw={onChangeRaw} />);
    const input = container.querySelector("input");
    expect(input.value).toBe("");
    fireEvent.change(input, {
      target: {
        value: "3",
      },
    });
    expect(input.value).toBe("");
    fireEvent.change(input, {
      target: {
        value: "1",
      },
    });
    expect(input.value).toBe("1");
  });
  it("should call onChangeRaw with all arguments", () => {
    const inputValue = "test";
    const onChangeRawSpy = jest.fn();
    const { container } = render(
      <DatePicker
        selected={utils.newDate()}
        onChange={jest.fn()}
        customInput={<CustomInput />}
        onChangeRaw={onChangeRawSpy}
      />,
    );
    expect(onChangeRawSpy).not.toHaveBeenCalled();
    const input = container.querySelector("input");
    fireEvent.change(input, {
      target: {
        value: inputValue,
      },
    });
    expect(onChangeRawSpy).toHaveBeenCalledTimes(1);
    expect(onChangeRawSpy.mock.calls[0][0].target.value).toBe(inputValue);
    expect(onChangeRawSpy.mock.calls[0][1]).toBe("test");
  });
  it("should handle the lack of an 'event' object as the first argument to handleChange analogously to 'preventDefault' being called", () => {
    const inputValue = "test";
    const onChangeRawSpy = jest.fn();
    const customInput = <CustomInput onChangeArgs={(e) => [e.target.value]} />;
    const { container } = render(
      <DatePicker
        selected={utils.newDate()}
        onChange={jest.fn()}
        customInput={customInput}
        onChangeRaw={onChangeRawSpy}
      />,
    );
    expect(onChangeRawSpy).not.toHaveBeenCalled();
    const input = container.querySelector("input");
    fireEvent.change(input, {
      target: {
        value: inputValue,
      },
    });
    expect(onChangeRawSpy).toHaveBeenCalled();
    expect(onChangeRawSpy.mock.calls[0][0]).toBe("test");
  });
  it("should handle a click outside of the calendar", () => {
    const datePicker = mount(
      <DatePicker selected={utils.newDate()} withPortal />,
    ).instance();
    const openSpy = jest.spyOn(datePicker, "setOpen");
    datePicker.handleCalendarClickOutside({ preventDefault: jest.fn() });
    expect(openSpy).toHaveBeenCalledWith(false);
  });
  it("should default to the currently selected date", () => {
    const datePicker = mount(
      <DatePicker selected={utils.newDate("1988-12-30")} />,
    );
    expect(
      utils.formatDate(datePicker.state("preSelection"), "yyyy-MM-dd"),
    ).toBe("1988-12-30");
  });
  it("should default to the start date when selecting an end date", () => {
    const datePicker = mount(
      <DatePicker startDate={utils.newDate("1988-11-30")} selectsEnd />,
    );
    expect(
      utils.formatDate(datePicker.state("preSelection"), "yyyy-MM-dd"),
    ).toBe("1988-11-30");
  });
  it("should default to the end date when selecting a start date", () => {
    const datePicker = mount(
      <DatePicker endDate={utils.newDate("1988-12-31")} selectsStart />,
    );
    expect(
      utils.formatDate(datePicker.state("preSelection"), "yyyy-MM-dd"),
    ).toBe("1988-12-31");
  });
  it("should default to a date <= maxDate", () => {
    const datePicker = mount(
      <DatePicker maxDate={utils.newDate("1982-01-01")} />,
    );
    expect(
      utils.formatDate(datePicker.state("preSelection"), "yyyy-MM-dd"),
    ).toBe("1982-01-01");
  });
  it("should default to a date >= minDate", () => {
    const datePicker = mount(
      <DatePicker minDate={utils.newDate("2063-04-05")} />,
    );
    expect(
      utils.formatDate(datePicker.state("preSelection"), "yyyy-MM-dd"),
    ).toBe("2063-04-05");
  });
  it("should default to the openToDate if there is one", () => {
    const datePicker = mount(
      <DatePicker openToDate={utils.newDate("2020-01-23")} />,
    );
    expect(
      utils.formatDate(datePicker.state("preSelection"), "yyyy-MM-dd"),
    ).toBe("2020-01-23");
  });
  it("should otherwise default to the current date", () => {
    const datePicker = mount(<DatePicker />);
    expect(
      utils.formatDate(datePicker.state("preSelection"), "yyyy-MM-dd"),
    ).toBe(utils.formatDate(utils.newDate(), "yyyy-MM-dd"));
  });
  it("should support an initial null `selected` value in inline mode", () => {
    const datePicker = mount(<DatePicker inline selected={null} />);

    expect(() =>
      datePicker.setProps({ selected: utils.newDate() }),
    ).not.toThrow();
  });
  it("should switch month in inline mode immediately", () => {
    const selected = utils.newDate();
    const future = utils.addDays(utils.newDate(), 100);
    const datePicker = mount(<DatePicker inline selected={selected} />);
    expect(
      utils.formatDate(datePicker.state("preSelection"), "yyyy-MM-dd"),
    ).toBe(utils.formatDate(selected, "yyyy-MM-dd"));
    datePicker.setProps({ selected: future });
    expect(
      utils.formatDate(datePicker.state("preSelection"), "yyyy-MM-dd"),
    ).toBe(utils.formatDate(future, "yyyy-MM-dd"));
  });
  it("should switch month in inline mode immediately, when year is updated", () => {
    const selected = utils.newDate();
    const future = utils.addYears(utils.newDate(), 1);
    const datePicker = mount(<DatePicker inline selected={selected} />);
    expect(
      utils.formatDate(datePicker.state("preSelection"), "yyyy-MM-dd"),
    ).toBe(utils.formatDate(selected, "yyyy-MM-dd"));
    datePicker.setProps({ selected: future });
    expect(
      utils.formatDate(datePicker.state("preSelection"), "yyyy-MM-dd"),
    ).toBe(utils.formatDate(future, "yyyy-MM-dd"));
  });
  it("should not set open state when focusing on the date input and the preventOpenOnFocus prop is set", () => {
    const { container } = render(<DatePicker preventOpenOnFocus />);
    fireEvent.focus(container.querySelector("input"));
    expect(container.querySelector(".react-datepicker")).toBeNull();
  });
  it("should not set open state onInputKeyDown when preventOpenOnFocus prop is set", () => {
    const { container } = render(<DatePicker preventOpenOnFocus />);
    fireEvent.keyDown(container.querySelector("input"), getKey("ArrowLeft"));
    expect(container.querySelector(".react-datepicker")).toBeNull();
  });
  it("should clear the input when clear() member function is called", () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker selected={utils.newDate("2015-12-15")} />,
    );
    datePicker.clear();
    expect(datePicker.state.inputValue).toBeNull();
  });
  it("should not open when open is false and input is focused", () => {
    const { container } = render(<DatePicker open={false} />);
    fireEvent.focus(container.querySelector("input"));
    expect(container.querySelector(".react-datepicker")).toBeNull();
  });
  it("should open when open is true", () => {
    const { container } = render(<DatePicker open />);
    expect(container.querySelector(".react-datepicker")).not.toBeNull();
  });
  it("should fire onInputClick when input is clicked", () => {
    const onInputClickSpy = jest.fn();
    const { container } = render(<DatePicker onInputClick={onInputClickSpy} />);
    fireEvent.click(container.querySelector("input"));
    expect(onInputClickSpy).toHaveBeenCalledTimes(1);
  });

  it("should set monthSelectedIn to 0 if monthsShown prop changes", () => {
    const datePicker = mount(<DatePicker monthsShown={2} inline />);
    datePicker.setState({ monthSelectedIn: 1 }, () => {
      expect(datePicker.state("monthSelectedIn")).toEqual(1);
      datePicker.setProps({ monthsShown: 1 }, () => {
        expect(datePicker.props().monthsShown).toEqual(1);
        setTimeout(() => {
          // Give setState in componentDidUpdate time to run
          expect(datePicker.state("monthSelectedIn")).toEqual(0);
        }, 100);
      });
    });
  });

  it("should disable non-jumping if prop focusSelectedMonth is true", () => {
    const datePickerInline = TestUtils.renderIntoDocument(
      <DatePicker inline monthsShown={2} focusSelectedMonth />,
    );
    const dayButtonInline = TestUtils.scryRenderedDOMComponentsWithClass(
      datePickerInline,
      "react-datepicker__day",
    )[40];
    TestUtils.Simulate.click(dayButtonInline);
    expect(datePickerInline.state.monthSelectedIn).toEqual(undefined);
  });

  it("should show the popper arrow when showPopperArrow is true", () => {
    const { container } = render(<DatePicker showPopperArrow />);
    const input = container.querySelector("input");
    fireEvent.click(input);

    const arrow = container.querySelector(".react-datepicker__triangle");

    expect(arrow).not.toBeNull();
  });

  it("should not show the popper arrow when showPopperArrow is false", () => {
    const { container } = render(<DatePicker showPopperArrow={false} />);
    const input = container.querySelector("input");
    fireEvent.click(input);

    const arrows = container.querySelectorAll(".react-datepicker__triangle");

    expect(arrows).toHaveLength(0);
  });

  it("should pass chooseDayAriaLabelPrefix prop to the correct child component", () => {
    const chooseDayAriaLabelPrefix = "My choose-day-prefix";
    const { container } = render(
      <DatePicker inline chooseDayAriaLabelPrefix={chooseDayAriaLabelPrefix} />,
    );
    expect(
      container
        .querySelector(".react-datepicker__day")
        .getAttribute("aria-label"),
    ).toContain(chooseDayAriaLabelPrefix);
  });

  it("should pass disabledDayAriaLabelPrefix prop to the correct child component", () => {
    const disabledDayAriaLabelPrefix = "My disabled-day-prefix";
    const day = new Date();
    const { container } = render(
      <DatePicker
        inline
        selected={day}
        excludeDates={[day]}
        disabledDayAriaLabelPrefix={disabledDayAriaLabelPrefix}
      />,
    );
    expect(
      container
        .querySelector(".react-datepicker__day--today")
        .getAttribute("aria-label"),
    ).toContain(disabledDayAriaLabelPrefix);
  });

  it("should pass weekAriaLabelPrefix prop to the correct child component", () => {
    const weekAriaLabelPrefix = "My week-prefix";
    const { container } = render(
      <DatePicker
        inline
        showWeekNumbers
        weekAriaLabelPrefix={weekAriaLabelPrefix}
      />,
    );
    expect(
      container
        .querySelector(".react-datepicker__week-number")
        .getAttribute("aria-label"),
    ).toContain(weekAriaLabelPrefix);
  });

  it("should pass monthAriaLabelPrefix prop to the correct child component", () => {
    const monthAriaLabelPrefix = "My month-prefix";
    const { container } = render(
      <DatePicker
        inline
        showWeekNumbers
        monthAriaLabelPrefix={monthAriaLabelPrefix}
      />,
    );
    expect(
      container
        .querySelector(".react-datepicker__month")
        .getAttribute("aria-label"),
    ).toContain(monthAriaLabelPrefix);
  });

  it("should close the calendar after scrolling", () => {
    const { container } = render(<DatePicker closeOnScroll />);
    const input = container.querySelector("input");
    fireEvent.focus(input);
    expect(container.querySelector(".react-datepicker")).not.toBeNull();
    fireEvent.scroll(document);
    expect(container.querySelector(".react-datepicker")).toBeNull();
  });

  it("should not close the calendar after scrolling", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const { container } = render(<DatePicker closeOnScroll />, {
      container: div,
    });
    const input = container.querySelector("input");
    fireEvent.focus(input);
    fireEvent.scroll(div);

    expect(container.querySelector(".react-datepicker")).not.toBeNull();
  });

  it("should close the calendar after scrolling", () => {
    const { container } = render(<DatePicker closeOnScroll={() => true} />);
    const input = container.querySelector("input");
    fireEvent.focus(input);
    expect(container.querySelector(".react-datepicker")).not.toBeNull();
    fireEvent.scroll(document);
    expect(container.querySelector(".react-datepicker")).toBeNull();
  });

  it("should not close the calendar after scrolling", () => {
    const { container } = render(<DatePicker closeOnScroll={() => false} />);
    const input = container.querySelector("input");
    fireEvent.focus(input);
    fireEvent.scroll(document);
    expect(container.querySelector(".react-datepicker")).not.toBeNull();
  });

  describe("multiSelecting non-consecutive dates", () => {
    const testDate = new Date("2024-02-02 00:00:00");

    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(testDate);
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it("should return array of dates to onChange callback when day is selected in multiSelect mode", () => {
      const onChange = jest.fn();

      const { container } = render(
        <DatePicker
          shouldCloseOnSelect={false}
          selectsMultiple
          onChange={onChange}
        />,
      );
      fireEvent.focus(container.querySelector("input"));

      const days = container.querySelectorAll(".react-datepicker__day");

      // Might seem odd, but the first couple of days of the calendar is in january, so days[5] is february 2nd
      fireEvent.click(days[5]);
      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith([testDate], expect.anything());
    });

    it("should remove previously selected date from array if date is selected again", () => {
      const onChange = jest.fn();
      const anotherDate = new Date("2024-01-01");
      const { container } = render(
        <DatePicker
          shouldCloseOnSelect={false}
          selectsMultiple
          selectedDates={[anotherDate, testDate]}
          onChange={onChange}
        />,
      );
      fireEvent.focus(container.querySelector("input"));
      const days = container.querySelectorAll(".react-datepicker__day");

      // Might seem odd, but the first couple of days of the calendar is in january, so days[5] is february 2nd
      fireEvent.click(days[5]);
      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith([anotherDate], expect.anything());
    });

    it("should add newly selected date to array of selected dates", () => {
      const onChange = jest.fn();
      const previouslyAddedDate = new Date("2024-01-01");

      const { container } = render(
        <DatePicker
          shouldCloseOnSelect={false}
          selectsMultiple
          selectedDates={[previouslyAddedDate]}
          onChange={onChange}
        />,
      );
      fireEvent.focus(container.querySelector("input"));
      const days = container.querySelectorAll(".react-datepicker__day");

      // Might seem odd, but the first couple of days of the calendar is in january, so days[5] is february 2nd
      fireEvent.click(days[5]);
      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith(
        [previouslyAddedDate, testDate],
        expect.anything(),
      );
    });
  });

  describe("selectsRange with inline", () => {
    it("should change dates of range when dates are empty", () => {
      const selected = utils.newDate();
      let startDate, endDate;
      const onChange = (dates = []) => {
        [startDate, endDate] = dates;
      };
      const { container } = render(
        <DatePicker
          selected={selected}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />,
      );

      const day = container.querySelector(".react-datepicker__day--selected");
      fireEvent.click(day);
      expect(utils.formatDate(startDate, "yyyy-MM-dd")).toBe(
        utils.formatDate(selected, "yyyy-MM-dd"),
      );
      expect(endDate).toBeNull();
    });

    it("should change dates of range set endDate when startDate is set", () => {
      let startDate = utils.newDate("2024-03-08");
      const nextDay = utils.addDays(startDate, 1);
      let endDate = null;
      const onChange = (dates = []) => {
        [startDate, endDate] = dates;
      };
      const { container } = render(
        <DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />,
      );

      const day = container.querySelector(
        ".react-datepicker__day--selected + .react-datepicker__day",
      );
      fireEvent.click(day);
      expect(utils.formatDate(startDate, "yyyy-MM-dd")).toBe(
        utils.formatDate(startDate, "yyyy-MM-dd"),
      );
      expect(utils.formatDate(endDate, "yyyy-MM-dd")).toBe(
        utils.formatDate(nextDay, "yyyy-MM-dd"),
      );
    });

    it("should change dates of range set endDate null when range is filled", () => {
      const selected = utils.newDate();
      let [startDate, endDate] = [selected, selected];
      const onChange = (dates = []) => {
        [startDate, endDate] = dates;
      };
      const { container } = render(
        <DatePicker
          selected={selected}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />,
      );

      const day = container.querySelector(".react-datepicker__day--selected");
      fireEvent.click(day);
      expect(utils.formatDate(startDate, "yyyy-MM-dd")).toBe(
        utils.formatDate(selected, "yyyy-MM-dd"),
      );
      expect(endDate).toBeNull();
    });

    it("should change dates of range change startDate when endDate set before startDate", () => {
      const selected = utils.newDate();
      const selectedPrevious = utils.subDays(utils.newDate(), 3);
      let [startDate, endDate] = [selected, null];
      const onChange = (dates = []) => {
        [startDate, endDate] = dates;
      };

      const datePicker = TestUtils.renderIntoDocument(
        <DatePicker
          selected={selected}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />,
      );

      let selectedDay = findSelectedDay(datePicker, selectedPrevious);
      // Ensure that we're dealing with a date at the beginning of the month
      if (!selectedDay) {
        // If it's the beginning of the month & if the selectedPrevious is not being displayed, navigate to the previous month and reselect the selectedPrevious
        goToLastMonth(datePicker);
        selectedDay = findSelectedDay(datePicker, selectedPrevious);
      }

      TestUtils.Simulate.click(findDOMNode(selectedDay));
      expect(utils.formatDate(startDate, "yyyy-MM-dd")).toBe(
        utils.formatDate(selectedPrevious, "yyyy-MM-dd"),
      );
      expect(endDate).toBeNull();
    });
  });

  describe("selectsRange without inline", () => {
    it("should have preSelection set to startDate upon opening", () => {
      const startDate = new Date("2021-04-20 00:00:00");
      const endDate = null;
      const datePicker = TestUtils.renderIntoDocument(
        <DatePicker selectsRange startDate={startDate} endDate={endDate} />,
      );
      const dateInput = datePicker.input;
      // Click to open
      TestUtils.Simulate.click(findDOMNode(dateInput));
      expect(datePicker.state.preSelection).toBe(startDate);
    });

    it("should remain open after clicking day when startDate is null", () => {
      const startDate = null;
      const endDate = null;
      const { container } = render(
        <DatePicker selectsRange startDate={startDate} endDate={endDate} />,
      );
      fireEvent.click(container.querySelector("input"));
      fireEvent.click(container.querySelector(".react-datepicker__day"));

      expect(container.querySelector(".react-datepicker")).not.toBeNull();
    });

    it("should be closed after clicking day when startDate has a value (endDate is being selected)", () => {
      const startDate = new Date("2021-01-01 00:00:00");
      const endDate = null;
      const { container } = render(
        <DatePicker selectsRange startDate={startDate} endDate={endDate} />,
      );
      fireEvent.click(container.querySelector("input"));

      const days = container.querySelectorAll(".react-datepicker__day");
      const day = days[Math.floor(days.length / 2)];
      fireEvent.click(day);
      expect(container.querySelector(".react-datepicker")).toBeNull();
    });

    it("has clear button rendered when isClearable is true and startDate has value", () => {
      const startDate = new Date("2021-01-01 00:00:00");
      const endDate = new Date("2021-01-21 00:00:00");

      const { container } = render(
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          isClearable
        />,
      );

      const clearButton = container.querySelector(
        ".react-datepicker__close-icon",
      );
      expect(clearButton).not.toBeNull();
    });

    it("clearing calls onChange with [null, null] in first argument making it consistent with the onChange behaviour for selecting days for selectsRange", () => {
      const onChangeSpy = jest.fn();
      const datePicker = TestUtils.renderIntoDocument(
        <DatePicker
          selectsRange
          startDate={null}
          endDate={null}
          onChange={onChangeSpy}
          isClearable
        />,
      );

      datePicker.clear();

      expect(onChangeSpy).toHaveBeenCalled();
      expect(Array.isArray(onChangeSpy.mock.calls[0][0])).toBe(true);
      expect(onChangeSpy.mock.calls[0][0][0]).toBeNull();
      expect(onChangeSpy.mock.calls[0][0][1]).toBeNull();
    });

    it("should call the onChange even when the startDate and the endDate is same in the range (case when we programmatically set the startDate, but set the same endDate through UI)", async () => {
      let startDate = new Date();
      let endDate = null;

      const onChangeSpy = jest.fn();

      const { container } = render(
        <DatePicker
          startDate={startDate}
          endDate={endDate}
          onChange={onChangeSpy}
          shouldCloseOnSelect
          selectsRange
        />,
      );

      const input = container.querySelector("input");
      expect(input).toBeTruthy();
      fireEvent.click(input);

      let calendar = container.querySelector(".react-datepicker");
      expect(calendar).toBeTruthy();

      // Select the same date as the start date
      const startDatePrefixedWithZeros = formatDayWithZeros(
        startDate.getDate(),
      );
      const endDateElement = container.querySelector(
        `.react-datepicker__day--${startDatePrefixedWithZeros}`,
      );
      fireEvent.click(endDateElement);

      await act(async () => {
        await waitFor(() => {
          expect(onChangeSpy).toHaveBeenCalled();
        });
      });
    });

    it("should hide the calendar even when the startDate and the endDate is same in the range", async () => {
      let startDate = new Date("2021-01-21 00:00:00");
      let endDate = null;

      const onCalendarCloseSpy = jest.fn();

      const onChange = (dates) => {
        const [start, end] = dates;
        startDate = start;
        endDate = end;
      };

      const { container } = render(
        <DatePicker
          startDate={startDate}
          endDate={endDate}
          onChange={onChange}
          onCalendarClose={onCalendarCloseSpy}
          shouldCloseOnSelect
          selectsRange
        />,
      );

      const input = container.querySelector("input");
      expect(input).toBeTruthy();
      fireEvent.click(input);

      let calendar = container.querySelector(".react-datepicker");
      expect(calendar).toBeTruthy();

      // Select the same date as the start date
      const startDatePrefixedWithZeros = formatDayWithZeros(
        startDate.getDate(),
      );
      const endDateElement = container.querySelector(
        `.react-datepicker__day--${startDatePrefixedWithZeros}`,
      );
      fireEvent.click(endDateElement);

      await act(async () => {
        await waitFor(() => {
          calendar = container.querySelector(".react-datepicker");
          expect(calendar).toBeFalsy();

          expect(onCalendarCloseSpy).toHaveBeenCalled();
        });
      });
    });
  });

  describe("duplicate dates when multiple months", () => {
    it("should find duplicates at end on all months except last month", () => {
      const twoMonths = mount(<DatePicker monthsShown={2} />);
      twoMonths.find("input").simulate("click");
      const months = twoMonths.find(Month);
      expect(months).toHaveLength(2);
      expect(months.first().props().monthShowsDuplicateDaysEnd).toBe(true);
      expect(months.last().props().monthShowsDuplicateDaysEnd).toBe(false);

      const moreThanTwoMonths = mount(<DatePicker monthsShown={4} />);
      moreThanTwoMonths.find("input").simulate("click");
      const monthsMore = moreThanTwoMonths.find(Month);
      expect(monthsMore).toHaveLength(4);
      expect(monthsMore.first().props().monthShowsDuplicateDaysEnd).toBe(true);
      expect(monthsMore.get(1).props.monthShowsDuplicateDaysEnd).toBe(true);
      expect(monthsMore.get(2).props.monthShowsDuplicateDaysEnd).toBe(true);
      expect(monthsMore.last().props().monthShowsDuplicateDaysEnd).toBe(false);
    });

    it("should find duplicates at start on all months except first month", () => {
      const twoMonths = mount(<DatePicker monthsShown={2} />);
      twoMonths.find("input").simulate("click");
      const months = twoMonths.find(Month);
      expect(months).toHaveLength(2);
      expect(months.first().props().monthShowsDuplicateDaysStart).toBe(false);
      expect(months.last().props().monthShowsDuplicateDaysStart).toBe(true);

      const moreThanTwoMonths = mount(<DatePicker monthsShown={4} />);
      moreThanTwoMonths.find("input").simulate("click");
      const monthsMore = moreThanTwoMonths.find(Month);
      expect(monthsMore).toHaveLength(4);
      expect(monthsMore.first().props().monthShowsDuplicateDaysStart).toBe(
        false,
      );
      expect(monthsMore.get(1).props.monthShowsDuplicateDaysStart).toBe(true);
      expect(monthsMore.get(2).props.monthShowsDuplicateDaysStart).toBe(true);
      expect(monthsMore.last().props().monthShowsDuplicateDaysStart).toBe(true);
    });

    it("should not find duplicates when single month displayed", () => {
      const datepicker = mount(<DatePicker />);
      datepicker.find("input").simulate("click");
      const months = datepicker.find(Month);
      expect(months).toHaveLength(1);
      expect(months.first().props().monthShowsDuplicateDaysStart).toBe(false);
      expect(months.first().props().monthShowsDuplicateDaysEnd).toBe(false);
    });
  });

  describe("shouldFocusDayInline state", () => {
    const dateFormat = "yyyy-MM-dd";

    it("should not be updated when navigating with ArrowRight key without changing displayed month", () => {
      const datePickerInline = TestUtils.renderIntoDocument(
        <DatePicker
          selected={utils.newDate("2020-11-15")}
          dateFormat={dateFormat}
          inline
        />,
      );
      TestUtils.Simulate.keyDown(
        getSelectedDayNode(datePickerInline),
        getKey("ArrowRight"),
      );
      expect(datePickerInline.state.shouldFocusDayInline).toBe(false);
    });

    it("should be set to true when changing displayed month with ArrowRight key", () => {
      const datePickerInline = TestUtils.renderIntoDocument(
        <DatePicker
          selected={utils.newDate("2020-11-30")}
          dateFormat={dateFormat}
          inline
        />,
      );
      TestUtils.Simulate.keyDown(
        getSelectedDayNode(datePickerInline),
        getKey("ArrowRight"),
      );
      expect(datePickerInline.state.shouldFocusDayInline).toBe(true);
    });

    it("should be set to true when changing displayed month with PageDown key", () => {
      const datePickerInline = TestUtils.renderIntoDocument(
        <DatePicker
          selected={utils.newDate("2020-11-15")}
          dateFormat={dateFormat}
          inline
        />,
      );
      TestUtils.Simulate.keyDown(
        getSelectedDayNode(datePickerInline),
        getKey("PageDown"),
      );
      expect(datePickerInline.state.shouldFocusDayInline).toBe(true);
    });
  });

  it("should show the correct start of week for GB locale", () => {
    registerLocale("en-GB", enGB);

    const { container } = render(<DatePicker locale="en-GB" />);
    const input = container.querySelector("input");
    jest.spyOn(input, "focus");
    fireEvent.focus(input);

    const firstDay = container.querySelector(".react-datepicker__day-names")
      .childNodes[0].textContent;
    expect(firstDay).toBe("Mo");
  });

  it("should show the correct start of week for US locale", () => {
    registerLocale("en-US", enUS);

    const { container } = render(<DatePicker locale="en-US" />);
    const input = container.querySelector("input");
    jest.spyOn(input, "focus");
    fireEvent.focus(input);

    const firstDay = container.querySelector(".react-datepicker__day-names")
      .childNodes[0].textContent;
    expect(firstDay).toBe("Su");
  });

  describe("when update the datepicker input text while props.showTimeSelectOnly is set and dateFormat has only time related format", () => {
    const format = "h:mm aa";

    it("should keep selected date in state except new time", () => {
      const selected = utils.newDate("2022-02-24 10:00:00");
      let date;

      const { container } = render(
        <DatePicker
          selected={selected}
          onChange={(d) => {
            date = d;
          }}
          showTimeSelect
          showTimeSelectOnly
          dateFormat={format}
          timeFormat={format}
        />,
      );

      const input = container.querySelector("input");
      fireEvent.change(input, {
        target: {
          value: "8:22 AM",
        },
      });

      expect(utils.isSameDay(date, selected)).toBe(true);
      expect(utils.getHours(date)).toBe(8);
      expect(utils.getMinutes(date)).toBe(22);
    });
  });

  it("clears the selected date on empty date input", () => {
    let date = "2023-10-23 10:00:00";
    const selected = utils.newDate(date);

    const { container: datepicker } = render(
      <DatePicker
        selected={selected}
        onChange={(d) => {
          date = d;
        }}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
      />,
    );

    const input = datepicker.querySelector(
      ".react-datepicker__input-container > input",
    );
    fireEvent.change(input, { target: { value: "" } });

    expect(date).toBe(null);
  });

  it("clears the selected date on empty date input with showTimeSelectOnly", () => {
    const format = "h:mm aa";

    let date = "2022-02-24 10:00:00";
    const selected = utils.newDate(date);

    const { container: datepicker } = render(
      <DatePicker
        selected={selected}
        onChange={(d) => {
          date = d;
        }}
        showTimeSelectOnly
        dateFormat={format}
        timeFormat={format}
      />,
    );

    const input = datepicker.querySelector(
      ".react-datepicker__input-container > input",
    );
    fireEvent.change(input, { target: { value: "" } });

    expect(date).toBe(null);
  });

  it("should selected month when specified minDate same month", () => {
    const selected = utils.newDate("2023-01-09");
    let date = null;
    const { container } = render(
      <DatePicker
        selected={selected}
        onChange={(d) => (date = d)}
        dateFormat="MM/yyyy"
        minDate={utils.newDate("2022-12-31")}
        showMonthYearPicker
      />,
    );

    const input = container.querySelector("input");
    fireEvent.change(input, {
      target: {
        value: "11/2022",
      },
    });
    expect(date).toBeNull();

    fireEvent.change(input, {
      target: {
        value: "12/2022",
      },
    });
    expect(date.toString()).toBe(utils.newDate("2022-12-01").toString());
  });

  it("should selected year when specified minDate same year", () => {
    const selected = utils.newDate("2023-01-09");
    let date = null;
    const { container } = render(
      <DatePicker
        selected={selected}
        onChange={(d) => (date = d)}
        dateFormat="yyyy"
        minDate={utils.newDate("2022-12-31")}
        showYearPicker
      />,
    );

    const input = container.querySelector("input");
    fireEvent.change(input, {
      target: {
        value: "2021",
      },
    });
    expect(date).toBeNull();

    fireEvent.change(input, {
      target: {
        value: "2022",
      },
    });
    expect(date.toString()).toBe(utils.newDate("2022-01-01").toString());
  });

  describe("should render aria live region after date selection", () => {
    it("should have correct format if datepicker does not contain time", () => {
      const datePicker = TestUtils.renderIntoDocument(
        <DatePicker showDateSelect selected={utils.newDate()} />,
      );
      const dateInput = datePicker.input;

      TestUtils.Simulate.focus(findDOMNode(dateInput));
      TestUtils.Simulate.keyDown(findDOMNode(dateInput), getKey("Enter"));

      const ariaLiveMessage = TestUtils.findRenderedDOMComponentWithClass(
        datePicker,
        "react-datepicker__aria-live",
      ).textContent;

      expect(ariaLiveMessage).toBe(
        `Selected date: ${utils.safeDateFormat(datePicker.props.selected, {
          dateFormat: "PPPP",
          locale: datePicker.props.locale,
        })}`,
      );
    });

    it("should have correct format if datepicker contains time", () => {
      const datePicker = TestUtils.renderIntoDocument(
        <DatePicker showTimeInput showDateSelect selected={utils.newDate()} />,
      );
      const dateInput = datePicker.input;

      TestUtils.Simulate.focus(findDOMNode(dateInput));
      TestUtils.Simulate.keyDown(findDOMNode(dateInput), getKey("Enter"));

      const ariaLiveMessage = TestUtils.findRenderedDOMComponentWithClass(
        datePicker,
        "react-datepicker__aria-live",
      ).textContent;

      expect(ariaLiveMessage).toBe(
        `Selected date: ${utils.safeDateFormat(datePicker.props.selected, {
          dateFormat: "PPPPp",
          locale: datePicker.props.locale,
        })}`,
      );
    });
  });

  it("should not customize the className attribute if showIcon is set to false", () => {
    const { container } = render(
      <DatePicker selected={utils.newDate("2021-04-15")} />,
    );
    const showIconClass = container
      .querySelector(".react-datepicker__input-container")
      .getAttribute("class");
    expect(showIconClass).toBe("react-datepicker__input-container");
  });

  it("should display the Calendar icon if showIcon is set to true", () => {
    let { container } = render(
      <DatePicker selected={utils.newDate("2021-04-15")} showIcon />,
    );
    let showIconClass = container
      .querySelector(".react-datepicker__input-container")
      .getAttribute("class");
    expect(showIconClass).toBe(
      "react-datepicker__input-container react-datepicker__view-calendar-icon",
    );

    container = render(
      <DatePicker selected={utils.newDate("2021-04-15")} showIcon />,
    ).container;
    showIconClass = container
      .querySelector(".react-datepicker__calendar-icon")
      .getAttribute("class");
    expect(showIconClass).toContain("react-datepicker__calendar-icon");
  });

  describe("Year picker", () => {
    it("should call onYearMouseEnter and onYearMouseEnter (Mouse Event)", () => {
      const onYearMouseEnterSpy = jest.fn();
      const onYearMouseLeaveSpy = jest.fn();
      const { container } = render(
        <DatePicker
          selected={new Date(2023, 0, 1)}
          showYearPicker
          onYearMouseEnter={onYearMouseEnterSpy}
          onYearMouseLeave={onYearMouseLeaveSpy}
        />,
      );

      const dateInput = container.querySelector("input");
      fireEvent.focus(dateInput);
      const selectedYear = container.querySelector(
        ".react-datepicker__year-text--selected",
      );

      fireEvent.mouseEnter(selectedYear);
      fireEvent.mouseLeave(selectedYear);

      expect(onYearMouseEnterSpy).toHaveBeenCalled();
      expect(onYearMouseLeaveSpy).toHaveBeenCalled();
    });

    it("should call onYearMouseEnter and onYearMouseEnter (Pointer Event)", () => {
      const onYearMouseEnterSpy = jest.fn();
      const onYearMouseLeaveSpy = jest.fn();
      const { container } = render(
        <DatePicker
          selected={new Date(2023, 0, 1)}
          showYearPicker
          onYearMouseEnter={onYearMouseEnterSpy}
          onYearMouseLeave={onYearMouseLeaveSpy}
          usePointerEvent
        />,
      );

      const dateInput = container.querySelector("input");
      fireEvent.focus(dateInput);
      const selectedYear = container.querySelector(
        ".react-datepicker__year-text--selected",
      );

      fireEvent.pointerEnter(selectedYear);
      fireEvent.pointerLeave(selectedYear);

      expect(onYearMouseEnterSpy).toHaveBeenCalled();
      expect(onYearMouseLeaveSpy).toHaveBeenCalled();
    });
  });
});
