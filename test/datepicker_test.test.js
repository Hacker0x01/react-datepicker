import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";
import { enUS, enGB } from "date-fns/locale";
import { mount } from "enzyme";
import defer from "lodash/defer";
import DatePicker, { registerLocale } from "../src/index.jsx";
import Day from "../src/day.jsx";
import WeekNumber from "../src/week_number.jsx";
import TestWrapper from "./test_wrapper.jsx";
import PopperComponent from "../src/popper_component.jsx";
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

  TestUtils.Simulate.click(ReactDOM.findDOMNode(lastMonthButton));
}

describe("DatePicker", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should show the calendar when focusing on the date input", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker />);
    var dateInput = datePicker.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    expect(datePicker.calendar).toBeDefined();
  });

  it("should allow the user to supply a wrapper component for the popper", () => {
    var datePicker = mount(<DatePicker popperContainer={TestWrapper} />);

    const dateInput = datePicker.instance().input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));

    expect(datePicker.find(".test-wrapper").length).toBe(1);
    expect(datePicker.instance().calendar).toBeDefined();
  });

  it("should allow the user to pass a wrapper component for the calendar", () => {
    var datePicker = mount(<DatePicker calendarContainer={TestWrapper} />);

    let dateInput = datePicker.instance().input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));

    datePicker.update();
    expect(datePicker.find(".test-wrapper").length).toBe(1);
    expect(datePicker.instance().calendar).toBeDefined();
  });

  it("should pass a custom class to the popper container", () => {
    var datePicker = mount(<DatePicker popperClassName="some-class-name" />);
    var dateInput = datePicker.instance().input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));

    datePicker.update();
    const popper = datePicker.find(".react-datepicker-popper");
    expect(popper.length).toBe(1);
    expect(popper.hasClass("some-class-name")).toBe(true);
  });

  it("should show the calendar when clicking on the date input", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker />);
    var dateInput = datePicker.input;
    TestUtils.Simulate.click(ReactDOM.findDOMNode(dateInput));
    expect(datePicker.calendar).toBeDefined();
  });

  it("should render the calendar in the portalHost prop when provided", () => {
    var root = document.createElement("div");
    var shadow = root.attachShadow({ mode: "closed" });
    var appHost = document.createElement("div");
    shadow.appendChild(appHost);
    var datePicker = ReactDOM.render(
      <DatePicker portalId="test-portal" portalHost={shadow} />,
      appHost,
    );
    var dateInput = datePicker.input;
    TestUtils.Simulate.click(ReactDOM.findDOMNode(dateInput));
    expect(datePicker.calendar).toBeDefined();
    expect(shadow.getElementById("test-portal")).toBeDefined();
  });

  it("should not set open state when it is disabled and gets clicked", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker disabled />);
    var dateInput = datePicker.input;
    TestUtils.Simulate.click(ReactDOM.findDOMNode(dateInput));
    expect(datePicker.state.open).toBe(false);
  });

  it("should close the popper and return focus to the date input.", (done) => {
    // https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html
    // Date Picker Dialog | Escape | Closes the dialog and returns focus to the Choose Date button.
    var div = document.createElement("div");
    document.body.appendChild(div);
    var datePicker = ReactDOM.render(<DatePicker />, div);

    // user focuses the input field, the calendar opens
    var dateInput = div.querySelector("input");
    TestUtils.Simulate.focus(dateInput);

    // user may tab or arrow down to the current day (or some other element in the popper)
    var today = div.querySelector(".react-datepicker__day--today");
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

  it("should not re-focus the date input when focusing the year dropdown", () => {
    const onBlurSpy = jest.fn();
    const datePicker = mount(
      <DatePicker
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        onBlur={onBlurSpy}
      />,
    );
    const dateInput = datePicker.instance().input;
    const dateInputWrapper = datePicker.find("input");
    const focusSpy = jest.spyOn(dateInput, "focus");

    dateInputWrapper.simulate("focus");
    const calendarWrapper = datePicker.find("Calendar");
    const yearSelect = calendarWrapper.find(".react-datepicker__year-select");
    dateInputWrapper.simulate("blur");
    yearSelect.simulate("focus");

    expect(focusSpy).not.toBeCalled();
    expect(onBlurSpy).not.toBeCalled();
  });

  it("should fire onYearChange when the year is selected", () => {
    const onYearChangeSpy = jest.fn();
    const datePicker = mount(
      <DatePicker
        showYearDropdown
        dropdownMode="select"
        onYearChange={onYearChangeSpy}
      />,
    );
    const dateInputWrapper = datePicker.find("input");

    dateInputWrapper.simulate("click");
    const calendarWrapper = datePicker.find("Calendar");
    const yearSelect = calendarWrapper.find(".react-datepicker__year-select");
    yearSelect.simulate("change");

    expect(onYearChangeSpy).toHaveBeenCalled();
  });

  it("should keep the calendar shown when clicking the calendar", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker />);
    var dateInput = datePicker.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    TestUtils.Simulate.click(ReactDOM.findDOMNode(datePicker.calendar));
    expect(datePicker.calendar).toBeDefined();
  });

  it("should not set open state when it is disabled and gets clicked", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker disabled />);
    var dateInput = datePicker.input;
    TestUtils.Simulate.click(ReactDOM.findDOMNode(dateInput));
    expect(datePicker.state.open).toBe(false);
  });

  it("should not set open state when it is readOnly and gets clicked", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker readOnly />);
    var dateInput = datePicker.input;
    TestUtils.Simulate.click(ReactDOM.findDOMNode(dateInput));
    expect(datePicker.state.open).toBe(false);
  });

  it("should hide the calendar when clicking a day on the calendar", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker />);
    var dateInput = datePicker.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    var day = TestUtils.scryRenderedComponentsWithType(
      datePicker.calendar,
      Day,
    )[0];
    TestUtils.Simulate.click(ReactDOM.findDOMNode(day));
    expect(datePicker.calendar).toBeFalsy();
  });

  it("should not hide the calendar when clicking a day on the calendar and shouldCloseOnSelect prop is false", () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker shouldCloseOnSelect={false} />,
    );
    var dateInput = datePicker.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    var day = TestUtils.scryRenderedComponentsWithType(
      datePicker.calendar,
      Day,
    )[0];
    TestUtils.Simulate.click(ReactDOM.findDOMNode(day));
    expect(datePicker.state.open).toBe(true);
  });

  it("should set open to true if showTimeInput is true", () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker shouldCloseOnSelect={false} showTimeInput />,
    );
    var handleTimeChange = datePicker.handleTimeChange;
    handleTimeChange("13:00");
    expect(datePicker.state.open).toBe(true);
  });

  it("should not hide the calendar when selecting a day in the calendar with Enter press, and shouldCloseOnSelect prop is false", () => {
    var data = getOnInputKeyDownStuff({ shouldCloseOnSelect: false });
    var dateInput = data.datePicker.input;

    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowUp"));
    TestUtils.Simulate.keyDown(
      ReactDOM.findDOMNode(dateInput),
      getKey("Enter"),
    );
    expect(data.datePicker.state.open).toBe(true);
  });

  it("should update the preSelection state when a day is selected with Enter press", () => {
    var data = getOnInputKeyDownStuff({ shouldCloseOnSelect: false });

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
    var data = getOnInputKeyDownStuff({
      shouldCloseOnSelect: false,
    });

    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown")); // put focus on current day
    var today = getSelectedDayNode(data.datePicker); // store current day node
    var dayToClick = today.nextElementSibling || today.previousElementSibling; // choose next or previous day
    TestUtils.Simulate.click(dayToClick); // will update the preSelection
    data.copyM = today.nextElementSibling
      ? utils.addDays(data.copyM, 1)
      : utils.subDays(data.copyM, 1); // update copyM to expected date

    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });

  it("should update the preSelection state when Today button is clicked after selecting a different day for inline mode", () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        todayButton="Today"
        selected={utils.newDate()}
        inline
        onChange={(d) => {
          // eslint-disable-next-line
          var date = d;
        }}
      />,
    );

    var today = getSelectedDayNode(datePicker);
    var anyOtherDay = today.nextElementSibling || today.previousElementSibling;
    TestUtils.Simulate.click(anyOtherDay); // will update the preSelection to next or previous day

    var todayBtn = datePicker.calendar.componentNode.querySelector(
      ".react-datepicker__today-button",
    );
    TestUtils.Simulate.click(todayBtn); // will update the preSelection

    expect(utils.formatDate(datePicker.state.preSelection, "yyyy-MM-dd")).toBe(
      utils.formatDate(utils.newDate(), "yyyy-MM-dd"),
    );
  });

  it("should hide the calendar when pressing enter in the date input", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker />);
    var dateInput = datePicker.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    TestUtils.Simulate.keyDown(
      ReactDOM.findDOMNode(dateInput),
      getKey("Enter"),
    );
    expect(datePicker.calendar).toBeFalsy();
  });

  it("should hide the calendar when the pressing escape in the date input", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker />);
    var dateInput = datePicker.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    TestUtils.Simulate.keyDown(
      ReactDOM.findDOMNode(dateInput),
      getKey("Escape"),
    );
    expect(datePicker.calendar).toBeFalsy();
  });

  it("should hide the calendar when the pressing Shift + Tab in the date input", () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker onBlur={onBlurSpy} />,
    );
    var dateInput = datePicker.input;
    const onBlurSpy = jest.spyOn(dateInput, "blur");
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    TestUtils.Simulate.keyDown(
      ReactDOM.findDOMNode(dateInput),
      getKey("Tab", true),
    );

    expect(datePicker.calendar).toBeNull();
    expect(onBlurSpy).toHaveBeenCalled();
  });

  it("should not apply the react-datepicker-ignore-onclickoutside class to the date input when closed", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker />);
    var dateInput = datePicker.input;
    expect(ReactDOM.findDOMNode(dateInput).className).not.toContain(
      "react-datepicker-ignore-onclickoutside",
    );
  });

  it("should apply the react-datepicker-ignore-onclickoutside class to date input when open", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker />);
    var dateInput = datePicker.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    expect(ReactDOM.findDOMNode(dateInput).className).toContain(
      "react-datepicker-ignore-onclickoutside",
    );
  });

  it("should set the type attribute on the clear button to button", () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker selected={utils.newDate("2015-12-15")} isClearable />,
    );
    var clearButton = TestUtils.findRenderedDOMComponentWithClass(
      datePicker,
      "react-datepicker__close-icon",
    );
    expect(clearButton.type).toBe("button");
  });

  it("should allow clearing the date when isClearable is true", () => {
    var cleared = false;
    function handleChange(d) {
      if (d === null) {
        cleared = true;
      }
    }
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        selected={utils.newDate("2015-12-15")}
        isClearable
        onChange={handleChange}
      />,
    );
    var clearButton = TestUtils.findRenderedDOMComponentWithClass(
      datePicker,
      "react-datepicker__close-icon",
    );
    TestUtils.Simulate.click(clearButton);
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

  it("should set the title attribute on the clear button if clearButtonTitle is supplied", () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        selected={utils.newDate("2018-03-19")}
        isClearable
        clearButtonTitle="clear button"
      />,
    );
    const clearButtonText = TestUtils.findRenderedDOMComponentWithClass(
      datePicker,
      "react-datepicker__close-icon",
    ).getAttribute("title");
    expect(clearButtonText).toBe("clear button");
  });

  it("should customize the className attribute on the clear button if clearButtonClassName is supplied", () => {
    let datePicker = TestUtils.renderIntoDocument(
      <DatePicker selected={utils.newDate("2021-04-15")} isClearable />,
    );
    let clearButtonClass = TestUtils.findRenderedDOMComponentWithClass(
      datePicker,
      "react-datepicker__close-icon",
    ).getAttribute("class");
    expect(clearButtonClass).toBe("react-datepicker__close-icon");

    datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        selected={utils.newDate("2021-04-15")}
        isClearable
        clearButtonClassName="customized-close-icon"
      />,
    );
    clearButtonClass = TestUtils.findRenderedDOMComponentWithClass(
      datePicker,
      "react-datepicker__close-icon",
    ).getAttribute("class");
    expect(clearButtonClass).toBe(
      "react-datepicker__close-icon customized-close-icon",
    );
  });

  it("should save time from the selected date during day change", () => {
    const selected = utils.newDate("2015-12-20 10:11:12");
    let date;

    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        inline
        selected={selected}
        onChange={(d) => {
          date = d;
        }}
      />,
    );
    var dayButton = TestUtils.scryRenderedDOMComponentsWithClass(
      datePicker,
      "react-datepicker__day",
    )[0];
    TestUtils.Simulate.click(dayButton);

    expect(utils.getHours(date)).toBe(10);
    expect(utils.getMinutes(date)).toBe(11);
    expect(utils.getSeconds(date)).toBe(12);
  });

  it("should save time from the selected date during date change", () => {
    const selected = utils.newDate("2015-12-20 10:11:12");
    let date;

    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        selected={selected}
        onChange={(d) => {
          date = d;
        }}
      />,
    );

    var input = ReactDOM.findDOMNode(datePicker.input);
    input.value = utils.newDate("2014-01-02");
    TestUtils.Simulate.change(input);

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
    var datePicker = TestUtils.renderIntoDocument(<DatePicker />);

    expect(function () {
      TestUtils.findRenderedComponentWithType(datePicker, PopperComponent);
    }).not.toThrow();
  });

  it("should render calendar directly without PopperComponent when inline prop is set", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker inline />);

    expect(function () {
      TestUtils.findRenderedComponentWithType(datePicker, PopperComponent);
    }).toThrow();
    expect(datePicker.calendar).toBeDefined();
  });

  it("should ignore disable prop when inline prop is set", () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker inline disabled />,
    );

    expect(datePicker.calendar).toBeDefined();
  });

  it("should ignore withPortal prop when inline prop is set", () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker inline withPortal />,
    );

    expect(function () {
      TestUtils.findRenderedDOMComponentWithClass(
        datePicker,
        "react-datepicker__portal",
      );
    }).toThrow();
  });

  it("should render Calendar in portal when withPortal is set and input has focus", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker withPortal />);
    var dateInput = datePicker.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));

    expect(function () {
      TestUtils.findRenderedDOMComponentWithClass(
        datePicker,
        "react-datepicker__portal",
      );
    }).not.toThrow();
    expect(datePicker.calendar).toBeDefined();
  });

  it("should render Calendar in portal when withPortal is set and should close on Escape key when focus is on header", () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker withPortal portalId="portal-id-dom-test" />,
    );
    var dateInput = datePicker.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));

    expect(function () {
      TestUtils.findRenderedDOMComponentWithClass(
        datePicker,
        "react-datepicker__portal",
      );
    }).not.toThrow();
    expect(datePicker.calendar).toBeDefined();

    var header = TestUtils.scryRenderedDOMComponentsWithClass(
      datePicker,
      "react-datepicker__current-month",
    )[0];

    TestUtils.Simulate.click(ReactDOM.findDOMNode(header));

    TestUtils.Simulate.keyDown(ReactDOM.findDOMNode(header), getKey("Escape"));

    expect(datePicker.calendar).toBeFalsy();
  });

  it("should not render Calendar when withPortal is set and no focus is given to input", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker withPortal />);

    expect(function () {
      TestUtils.findRenderedDOMComponentWithClass(
        datePicker,
        "react-datepicker__portal",
      );
    }).toThrow();
    expect(datePicker.calendar).toBeFalsy();
  });

  it("should render Calendar in a ReactDOM portal when withPortal is set and portalId is set", () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker withPortal portalId="portal-id-dom-test" />,
    );
    var dateInput = datePicker.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));

    expect(document.getElementById("portal-id-dom-test")).toBeDefined();
  });

  function getOnInputKeyDownStuff(opts) {
    opts = opts || {};
    var m = utils.newDate();
    var copyM = utils.newDate(m);
    var testFormat = "yyyy-MM-dd";
    var exactishFormat = "yyyy-MM-dd hh: zzzz";
    var callback = jest.fn();
    var onInputErrorCallback = jest.fn();

    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        selected={m}
        onChange={callback}
        onInputError={onInputErrorCallback}
        dateFormat={testFormat}
        {...opts}
      />,
    );
    var dateInput = datePicker.input;
    var nodeInput = ReactDOM.findDOMNode(dateInput);
    var dateCalendar = datePicker.calendar;
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
    var data = getOnInputKeyDownStuff();
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
    var data = getOnInputKeyDownStuff();
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
    var data = getOnInputKeyDownStuff();
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
    var data = getOnInputKeyDownStuff();
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
    var data = getOnInputKeyDownStuff();
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
  it("should handle onDayKeyDown PageDown", () => {
    var data = getOnInputKeyDownStuff();
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
  it("should handle onDayKeyDown End", () => {
    var data = getOnInputKeyDownStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    TestUtils.Simulate.keyDown(
      getSelectedDayNode(data.datePicker),
      getKey("End"),
    );
    data.copyM = utils.addYears(data.copyM, 1);
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should handle onDayKeyDown Home", () => {
    var data = getOnInputKeyDownStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    TestUtils.Simulate.keyDown(
      getSelectedDayNode(data.datePicker),
      getKey("Home"),
    );
    data.copyM = utils.subYears(data.copyM, 1);
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should call onMonthchange when keyboard navigation moves preSelection to different month", () => {
    var onMonthChangeSpy = jest.fn();
    var opts = { onMonthChange: onMonthChangeSpy };
    var data = getOnInputKeyDownStuff(opts);
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    TestUtils.Simulate.keyDown(
      getSelectedDayNode(data.datePicker),
      getKey("PageDown"),
    );

    expect(onMonthChangeSpy).toHaveBeenCalledTimes(1);
  });
  it("should call onSelect only once when keyboard navigation moves selection to different month", () => {
    var onSelectSpy = jest.fn();
    var opts = { onSelect: onSelectSpy, adjustDateOnChange: true };
    var data = getOnInputKeyDownStuff(opts);
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    TestUtils.Simulate.keyDown(
      getSelectedDayNode(data.datePicker),
      getKey("PageDown"),
    );
    expect(onSelectSpy).toHaveBeenCalledTimes(1);
  });
  it("should not preSelect date if not between minDate and maxDate", () => {
    var data = getOnInputKeyDownStuff({
      minDate: utils.subDays(utils.newDate(), 1),
      maxDate: utils.addDays(utils.newDate(), 1),
    });
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should not preSelect date if before minDate", () => {
    var data = getOnInputKeyDownStuff({
      minDate: utils.subDays(utils.newDate(), 1),
    });
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowUp"));
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should not preSelect date if after maxDate", () => {
    var data = getOnInputKeyDownStuff({
      maxDate: utils.addDays(utils.newDate(), 1),
    });
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });

  it("should be possible to preSelect minDate (no maxDate set)", () => {
    var data = getOnInputKeyDownStuff({
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
    var data = getOnInputKeyDownStuff({
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
    var data = getOnInputKeyDownStuff({
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
    var data = getOnInputKeyDownStuff({
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
    var data = getOnInputKeyDownStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("x"));
    expect(data.datePicker.state.preSelection.valueOf()).toBe(
      data.copyM.valueOf(),
    );
  });

  describe("when update the datepicker input text while props.minDate is set", () => {
    let datePicker;
    beforeEach(() => {
      datePicker = TestUtils.renderIntoDocument(
        <DatePicker
          selected={new Date("1993-07-02")}
          minDate={new Date("1800/01/01")}
          open
        />,
      );
    });

    it("should auto update calendar when the updated date text is after props.minDate", () => {
      TestUtils.Simulate.change(datePicker.input, {
        target: {
          value: "1801/01/01",
        },
      });

      expect(datePicker.input.value).toBe("1801/01/01");
      expect(
        datePicker.calendar.componentNode.querySelector(
          ".react-datepicker__current-month",
        ).innerHTML,
      ).toBe("January 1801");
    });

    it("should not auto update calendar when the updated date text is before props.minDate", () => {
      TestUtils.Simulate.change(datePicker.input, {
        target: {
          value: "1799/01/01",
        },
      });

      expect(
        datePicker.calendar.componentNode.querySelector(
          ".react-datepicker__current-month",
        ).innerHTML,
      ).toBe("July 1993");
    });
  });

  it("should not manual select date if before minDate", () => {
    var minDate = utils.subDays(utils.newDate(), 1);
    var data = getOnInputKeyDownStuff({
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
    var maxDate = utils.addDays(utils.newDate(), 1);
    var data = getOnInputKeyDownStuff({
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
      var data = getOnInputKeyDownStuff();
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
      var result = data.callback.mock.calls[0][0];
      expect(utils.formatDate(result, data.testFormat)).toBe(
        utils.formatDate(data.copyM, data.testFormat),
      );
    });
    it("should update the selected date on manual input", () => {
      var data = getOnInputKeyDownStuff();
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
      var data = getOnInputKeyDownStuff({
        excludeDates: [utils.subDays(utils.newDate(), 1)],
      });
      TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowLeft"));
      TestUtils.Simulate.keyDown(data.nodeInput, getKey("Enter"));
      expect(data.callback).not.toHaveBeenCalled();
    });
    describe("with excludeDateIntervals", () => {
      it("should not select the start date of the interval", () => {
        var data = getOnInputKeyDownStuff({
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
        var data = getOnInputKeyDownStuff({
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
        var data = getOnInputKeyDownStuff({
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
      var data = getOnInputKeyDownStuff({
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
      var data = getOnInputKeyDownStuff();
      var preSelection = data.datePicker.state.preSelection;
      TestUtils.Simulate.keyDown(data.nodeInput, getKey("Backspace"));
      TestUtils.Simulate.keyDown(data.nodeInput, getKey("Escape"));
      expect(data.callback).not.toHaveBeenCalled(); // confirms that handleChange occurred
      expect(preSelection).toBe(data.datePicker.state.preSelection); // confirms the preSelection is still the same
    });
  });
  it("should reset the keyboard selection when closed", () => {
    var data = getOnInputKeyDownStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowLeft"));
    data.datePicker.setOpen(false);
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should retain the keyboard selection when already open", () => {
    var data = getOnInputKeyDownStuff();
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
    var data = getOnInputKeyDownStuff();
    data.datePicker.setOpen(false);
    expect(data.datePicker.state.open).toBe(false);
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    expect(data.datePicker.state.open).toBe(true);
  });
  it("should not open the calendar when the left arrow key is pressed", () => {
    var data = getOnInputKeyDownStuff();
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

  it("should autofocus the input given the autoFocus prop", () => {
    var div = document.createElement("div");
    document.body.appendChild(div);
    ReactDOM.render(<DatePicker autoFocus />, div);
    expect(div.querySelector("input")).toBe(document.activeElement);
  });
  it("should autofocus the input when calling the setFocus method", () => {
    var div = document.createElement("div");
    document.body.appendChild(div);
    var datePicker = ReactDOM.render(<DatePicker />, div);
    datePicker.setFocus();
    expect(div.querySelector("input")).toBe(document.activeElement);
  });
  it("should clear preventFocus timeout id when component is unmounted", () => {
    var div = document.createElement("div");
    document.body.appendChild(div);
    var datePicker = ReactDOM.render(<DatePicker inline />, div);
    datePicker.clearPreventFocusTimeout = jest.fn();
    ReactDOM.unmountComponentAtNode(div);
    expect(datePicker.clearPreventFocusTimeout).toHaveBeenCalledTimes(1);
  });

  function getOnInputKeyDownDisabledKeyboardNavigationStuff() {
    var m = utils.newDate();
    var copyM = utils.newDate(m);
    var testFormat = "yyyy-MM-dd";
    var callback = jest.fn();
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        selected={m}
        onChange={callback}
        disabledKeyboardNavigation
      />,
    );
    var dateInput = datePicker.input;
    var nodeInput = ReactDOM.findDOMNode(dateInput);
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
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowLeft"));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should not handle onInputKeyDown ArrowRight", () => {
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowRight"));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should not handle onInputKeyDown ArrowUp", () => {
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowUp"));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should not handle onInputKeyDown ArrowDown", () => {
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should not handle onInputKeyDown PageUp", () => {
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("PageUp"));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should not handle onInputKeyDown PageDown", () => {
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("PageDown"));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should not handle onInputKeyDown Home", () => {
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("Home"));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should not handle onInputKeyDown End", () => {
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("End"));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should correctly clear date with empty input string", () => {
    var cleared = false;
    function handleChange(d) {
      // Internally DateInput calls it's onChange prop with null
      // when the input value is an empty string
      if (d === null) {
        cleared = true;
      }
    }
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        selected={utils.newDate("2016-11-22")}
        onChange={handleChange}
      />,
    );
    var input = ReactDOM.findDOMNode(datePicker.input);
    input.value = "";
    TestUtils.Simulate.change(input);
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
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        selected={utils.newDate()}
        onChange={jest.fn()}
        onChangeRaw={onChangeRawSpy}
        onSelect={onSelectSpy}
      />,
    );
    expect(onChangeRawSpy).not.toHaveBeenCalled();
    expect(onSelectSpy).not.toHaveBeenCalled();
    const input = ReactDOM.findDOMNode(datePicker.input);
    input.value = inputValue;
    TestUtils.Simulate.change(input);
    expect(onChangeRawSpy).toHaveBeenCalledTimes(1);
    expect(onChangeRawSpy.mock.calls[0][0].target.value).toBe(inputValue);
    expect(onSelectSpy).not.toHaveBeenCalled();
  });
  it("should invoke provided onChangeRaw and onSelect functions when clicking a day on the calendar", () => {
    const onChangeRawSpy = jest.fn();
    const onSelectSpy = jest.fn();
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        selected={utils.newDate()}
        onChange={jest.fn()}
        onChangeRaw={onChangeRawSpy}
        onSelect={onSelectSpy}
      />,
    );
    expect(onChangeRawSpy).not.toHaveBeenCalled();
    expect(onSelectSpy).not.toHaveBeenCalled();
    const input = ReactDOM.findDOMNode(datePicker.input);
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(input));
    const day = TestUtils.scryRenderedComponentsWithType(
      datePicker.calendar,
      Day,
    )[0];
    TestUtils.Simulate.click(ReactDOM.findDOMNode(day));
    expect(onChangeRawSpy).toHaveBeenCalledTimes(1);
    expect(onSelectSpy).toHaveBeenCalledTimes(1);
  });
  it("should allow onChangeRaw to prevent a change", () => {
    const onChangeRaw = (e) => e.target.value > "2" && e.preventDefault();
    const datePicker = mount(<DatePicker onChangeRaw={onChangeRaw} />);
    expect(datePicker.find("input").prop("value")).toBe("");
    datePicker.find("input").simulate("change", { target: { value: "3" } });
    datePicker.update();
    expect(datePicker.find("input").prop("value")).toBe("");
    datePicker.find("input").simulate("change", { target: { value: "1" } });
    datePicker.update();
    expect(datePicker.find("input").prop("value")).toBe("1");
  });
  it("should call onChangeRaw with all arguments", () => {
    const inputValue = "test";
    const onChangeRawSpy = jest.fn();
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        selected={utils.newDate()}
        onChange={jest.fn()}
        customInput={<CustomInput />}
        onChangeRaw={onChangeRawSpy}
      />,
    );
    expect(onChangeRawSpy).not.toHaveBeenCalled();
    const input = ReactDOM.findDOMNode(datePicker.input);
    input.value = inputValue;
    TestUtils.Simulate.change(input);
    expect(onChangeRawSpy).toHaveBeenCalledTimes(1);
    expect(onChangeRawSpy.mock.calls[0][0].target.value).toBe(inputValue);
    expect(onChangeRawSpy.mock.calls[0][1]).toBe("test");
  });
  it("should handle the lack of an 'event' object as the first argument to handleChange analogously to 'preventDefault' being called", () => {
    const inputValue = "test";
    const onChangeRawSpy = jest.fn();
    let customInput = <CustomInput onChangeArgs={(e) => [e.target.value]} />;
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        selected={utils.newDate()}
        onChange={jest.fn()}
        customInput={customInput}
        onChangeRaw={onChangeRawSpy}
      />,
    );
    expect(onChangeRawSpy).not.toHaveBeenCalled();
    const input = ReactDOM.findDOMNode(datePicker.input);
    input.value = inputValue;
    TestUtils.Simulate.change(input);
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
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker preventOpenOnFocus />,
    );
    const dateInput = datePicker.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    expect(datePicker.state.open).toBe(false);
  });
  it("should not set open state onInputKeyDown when preventOpenOnFocus prop is set", () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker preventOpenOnFocus />,
    );
    const dateInput = datePicker.input;
    TestUtils.Simulate.keyDown(
      ReactDOM.findDOMNode(dateInput),
      getKey("ArrowLeft"),
    );
    expect(datePicker.state.open).toBe(false);
  });
  it("should clear the input when clear() member function is called", () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker selected={utils.newDate("2015-12-15")} />,
    );
    datePicker.clear();
    expect(datePicker.state.inputValue).toBeNull();
  });
  it("should not open when open is false and input is focused", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker open={false} />);
    var dateInput = datePicker.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    expect(datePicker.calendar).toBeFalsy();
  });
  it("should open when open is true", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker open />);
    expect(datePicker.calendar).toBeDefined();
  });
  it("should fire onInputClick when input is clicked", () => {
    const onInputClickSpy = jest.fn();
    mount(<DatePicker onInputClick={onInputClickSpy} />)
      .find("input")
      .simulate("click");
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
    var datePickerInline = TestUtils.renderIntoDocument(
      <DatePicker inline monthsShown={2} focusSelectedMonth />,
    );
    var dayButtonInline = TestUtils.scryRenderedDOMComponentsWithClass(
      datePickerInline,
      "react-datepicker__day",
    )[40];
    TestUtils.Simulate.click(dayButtonInline);
    expect(datePickerInline.state.monthSelectedIn).toEqual(undefined);
  });

  it("should show the popper arrow when showPopperArrow is true", () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker showPopperArrow />,
    );
    const dateInput = datePicker.input;
    TestUtils.Simulate.click(ReactDOM.findDOMNode(dateInput));

    const arrow = TestUtils.scryRenderedDOMComponentsWithClass(
      datePicker.calendar,
      "react-datepicker__triangle",
    );

    expect(Object.keys(arrow)).not.toHaveLength(0);
  });

  it("should not show the popper arrow when showPopperArrow is false", () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker showPopperArrow={false} />,
    );
    const dateInput = datePicker.input;
    TestUtils.Simulate.click(ReactDOM.findDOMNode(dateInput));

    const arrow = TestUtils.scryRenderedDOMComponentsWithClass(
      datePicker.calendar,
      "react-datepicker__triangle",
    );

    expect(Object.keys(arrow)).toHaveLength(0);
  });

  it("should pass chooseDayAriaLabelPrefix prop to the correct child component", () => {
    const chooseDayAriaLabelPrefix = "My choose-day-prefix";
    const datePicker = mount(
      <DatePicker inline chooseDayAriaLabelPrefix={chooseDayAriaLabelPrefix} />,
    );
    expect(
      datePicker.find(Day).first().prop("ariaLabelPrefixWhenEnabled"),
    ).toBe(chooseDayAriaLabelPrefix);
  });

  it("should pass disabledDayAriaLabelPrefix prop to the correct child component", () => {
    const disabledDayAriaLabelPrefix = "My disabled-day-prefix";
    const datePicker = mount(
      <DatePicker
        inline
        disabledDayAriaLabelPrefix={disabledDayAriaLabelPrefix}
      />,
    );
    expect(
      datePicker.find(Day).first().prop("ariaLabelPrefixWhenDisabled"),
    ).toBe(disabledDayAriaLabelPrefix);
  });

  it("should pass weekAriaLabelPrefix prop to the correct child component", () => {
    const weekAriaLabelPrefix = "My week-prefix";
    const datePicker = mount(
      <DatePicker
        inline
        showWeekNumbers
        weekAriaLabelPrefix={weekAriaLabelPrefix}
      />,
    );
    expect(datePicker.find(WeekNumber).first().prop("ariaLabelPrefix")).toBe(
      weekAriaLabelPrefix,
    );
  });

  it("should pass monthAriaLabelPrefix prop to the correct child component", () => {
    const monthAriaLabelPrefix = "My month-prefix";
    const datePicker = mount(
      <DatePicker
        inline
        showWeekNumbers
        monthAriaLabelPrefix={monthAriaLabelPrefix}
      />,
    );
    expect(datePicker.find(Month).first().prop("ariaLabelPrefix")).toBe(
      monthAriaLabelPrefix,
    );
  });

  it("should close the calendar after scrolling", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker closeOnScroll />);
    var dateInput = datePicker.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    expect(datePicker.state.open).toBe(true);
    datePicker.onScroll({ target: document });
    expect(datePicker.state.open).toBe(false);
  });

  it("should not close the calendar after scrolling", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker closeOnScroll />);
    var dateInput = datePicker.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    datePicker.onScroll({ target: "something" });
    expect(datePicker.state.open).toBe(true);
  });

  it("should close the calendar after scrolling", () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker closeOnScroll={() => true} />,
    );
    var dateInput = datePicker.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    expect(datePicker.state.open).toBe(true);
    datePicker.onScroll();
    expect(datePicker.state.open).toBe(false);
  });

  it("should not close the calendar after scrolling", () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker closeOnScroll={() => false} />,
    );
    var dateInput = datePicker.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    datePicker.onScroll();
    expect(datePicker.state.open).toBe(true);
  });

  describe("selectsRange with inline", () => {
    it("should change dates of range when dates are empty", () => {
      const selected = utils.newDate();
      let startDate, endDate;
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

      const days = TestUtils.scryRenderedComponentsWithType(datePicker, Day);
      const selectedDay = days.find(
        (d) =>
          utils.formatDate(d.props.day, "yyyy-MM-dd") ===
          utils.formatDate(selected, "yyyy-MM-dd"),
      );
      TestUtils.Simulate.click(ReactDOM.findDOMNode(selectedDay));
      expect(utils.formatDate(startDate, "yyyy-MM-dd")).toBe(
        utils.formatDate(selected, "yyyy-MM-dd"),
      );
      expect(endDate).toBeNull();
    });

    it("should change dates of range set endDate when startDate is set", () => {
      let startDate = utils.newDate();
      const nextDay = utils.addDays(startDate, 1);
      let endDate = null;
      const onChange = (dates = []) => {
        [startDate, endDate] = dates;
      };
      const datePicker = TestUtils.renderIntoDocument(
        <DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />,
      );
      const days = TestUtils.scryRenderedComponentsWithType(datePicker, Day);
      const selectedDay = days.find(
        (d) =>
          utils.formatDate(d.props.day, "yyyy-MM-dd") ===
          utils.formatDate(nextDay, "yyyy-MM-dd"),
      );
      TestUtils.Simulate.click(ReactDOM.findDOMNode(selectedDay));
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
      let datePicker = TestUtils.renderIntoDocument(
        <DatePicker
          selected={selected}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />,
      );

      let days = TestUtils.scryRenderedComponentsWithType(datePicker, Day);
      let selectedDay = days.find(
        (d) =>
          utils.formatDate(d.props.day, "yyyy-MM-dd") ===
          utils.formatDate(selected, "yyyy-MM-dd"),
      );
      TestUtils.Simulate.click(ReactDOM.findDOMNode(selectedDay));
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

      TestUtils.Simulate.click(ReactDOM.findDOMNode(selectedDay));
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
      TestUtils.Simulate.click(ReactDOM.findDOMNode(dateInput));
      expect(datePicker.state.preSelection).toBe(startDate);
    });

    it("should remain open after clicking day when startDate is null", () => {
      const startDate = null;
      const endDate = null;
      const datePicker = TestUtils.renderIntoDocument(
        <DatePicker selectsRange startDate={startDate} endDate={endDate} />,
      );
      const dateInput = datePicker.input;
      // Click to open
      TestUtils.Simulate.click(ReactDOM.findDOMNode(dateInput));
      const days = TestUtils.scryRenderedComponentsWithType(datePicker, Day);
      // Click the first Day
      TestUtils.Simulate.click(ReactDOM.findDOMNode(days[0]));
      expect(datePicker.state.open).toBe(true);
    });

    it("should be closed after clicking day when startDate has a value (endDate is being selected)", () => {
      const startDate = new Date("2021-01-01 00:00:00");
      const endDate = null;
      const datePicker = TestUtils.renderIntoDocument(
        <DatePicker selectsRange startDate={startDate} endDate={endDate} />,
      );
      datePicker.setOpen(true);

      const days = TestUtils.scryRenderedComponentsWithType(datePicker, Day);
      const day = ReactDOM.findDOMNode(days[Math.floor(days.length / 2)]);
      TestUtils.Simulate.click(day);
      expect(datePicker.state.open).toBe(false);
    });

    it("has clear button rendered when isClearable is true and startDate has value", () => {
      const startDate = new Date("2021-01-01 00:00:00");
      const endDate = new Date("2021-01-21 00:00:00");

      const datePicker = TestUtils.renderIntoDocument(
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          isClearable
        />,
      );

      const clearButton = TestUtils.findRenderedDOMComponentWithClass(
        datePicker,
        "react-datepicker__close-icon",
      );
      expect(clearButton).toBeDefined();
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

    it("should be set to true when changing displayed month with End key", () => {
      const datePickerInline = TestUtils.renderIntoDocument(
        <DatePicker
          selected={utils.newDate("2020-11-15")}
          dateFormat={dateFormat}
          inline
        />,
      );
      TestUtils.Simulate.keyDown(
        getSelectedDayNode(datePickerInline),
        getKey("End"),
      );
      expect(datePickerInline.state.shouldFocusDayInline).toBe(true);
    });
  });

  it("should show the correct start of week for GB locale", () => {
    registerLocale("en-GB", enGB);

    const datePicker = mount(<DatePicker locale="en-GB" />);
    const dateInput = datePicker.instance().input;
    const dateInputWrapper = datePicker.find("input");
    jest.spyOn(dateInput, "focus");

    dateInputWrapper.simulate("focus");

    const firstDay = datePicker
      .find(".react-datepicker__day-names")
      .childAt(0)
      .text();
    expect(firstDay).toBe("Mo");
  });

  it("should show the correct start of week for US locale", () => {
    registerLocale("en-US", enUS);

    const datePicker = mount(<DatePicker locale="en-US" />);
    const dateInput = datePicker.instance().input;
    const dateInputWrapper = datePicker.find("input");
    jest.spyOn(dateInput, "focus");

    dateInputWrapper.simulate("focus");

    const firstDay = datePicker
      .find(".react-datepicker__day-names")
      .childAt(0)
      .text();
    expect(firstDay).toBe("Su");
  });

  describe("when update the datepicker input text while props.showTimeSelectOnly is set and dateFormat has only time related format", () => {
    const format = "h:mm aa";

    it("should keep selected date in state except new time", () => {
      const selected = utils.newDate("2022-02-24 10:00:00");
      let date;

      const datePicker = TestUtils.renderIntoDocument(
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

      const input = ReactDOM.findDOMNode(datePicker.input);
      input.value = "8:22 AM";
      TestUtils.Simulate.change(input);

      expect(utils.isSameDay(date, selected)).toBe(true);
      expect(utils.getHours(date)).toBe(8);
      expect(utils.getMinutes(date)).toBe(22);
    });
  });

  it("should selected month when specified minDate same month", () => {
    const selected = utils.newDate("2023-01-09");
    let date = null;
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        selected={selected}
        onChange={(d) => (date = d)}
        dateFormat="MM/yyyy"
        minDate={utils.newDate("2022-12-31")}
        showMonthYearPicker
      />,
    );

    TestUtils.Simulate.change(datePicker.input, {
      target: {
        value: "11/2022",
      },
    });
    expect(date).toBeNull();

    TestUtils.Simulate.change(datePicker.input, {
      target: {
        value: "12/2022",
      },
    });
    expect(date.toString()).toBe(utils.newDate("2022-12-01").toString());
  });

  it("should selected year when specified minDate same year", () => {
    const selected = utils.newDate("2023-01-09");
    let date = null;
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        selected={selected}
        onChange={(d) => (date = d)}
        dateFormat="yyyy"
        minDate={utils.newDate("2022-12-31")}
        showYearPicker
      />,
    );

    TestUtils.Simulate.change(datePicker.input, {
      target: {
        value: "2021",
      },
    });
    expect(date).toBeNull();

    TestUtils.Simulate.change(datePicker.input, {
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

      TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
      TestUtils.Simulate.keyDown(
        ReactDOM.findDOMNode(dateInput),
        getKey("Enter"),
      );

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

      TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
      TestUtils.Simulate.keyDown(
        ReactDOM.findDOMNode(dateInput),
        getKey("Enter"),
      );

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
    let datePicker = TestUtils.renderIntoDocument(
      <DatePicker selected={utils.newDate("2021-04-15")} />,
    );
    let showIconClass = TestUtils.findRenderedDOMComponentWithClass(
      datePicker,
      "react-datepicker__input-container",
    ).getAttribute("class");
    expect(showIconClass).toBe("react-datepicker__input-container");
  });

  it("should display the Calendar icon if showIcon is set to true", () => {
    let datePicker = TestUtils.renderIntoDocument(
      <DatePicker selected={utils.newDate("2021-04-15")} showIcon />,
    );
    let showIconClass = TestUtils.findRenderedDOMComponentWithClass(
      datePicker,
      "react-datepicker__input-container",
    ).getAttribute("class");
    expect(showIconClass).toBe(
      "react-datepicker__input-container react-datepicker__view-calendar-icon",
    );

    datePicker = TestUtils.renderIntoDocument(
      <DatePicker selected={utils.newDate("2021-04-15")} showIcon />,
    );
    showIconClass = TestUtils.findRenderedDOMComponentWithClass(
      datePicker,
      "react-datepicker__calendar-icon",
    ).getAttribute("class");
    expect(showIconClass).toBe("react-datepicker__calendar-icon");
  });

  describe("Year picker", () => {
    it("should call onYearMouseEnter and onYearMouseEnter", () => {
      const onYearMouseEnterSpy = jest.fn();
      const onYearMouseLeaveSpy = jest.fn();
      const datePicker = mount(
        <DatePicker
          selected={new Date(2023, 0, 1)}
          showYearPicker
          onYearMouseEnter={onYearMouseEnterSpy}
          onYearMouseLeave={onYearMouseLeaveSpy}
        />,
      );

      const dateInputWrapper = datePicker.find("input");
      dateInputWrapper.simulate("click");
      const calendarWrapper = datePicker.find("Calendar");
      const selectedYear = calendarWrapper.find(
        ".react-datepicker__year-text--selected",
      );

      selectedYear.simulate("mouseenter");
      selectedYear.simulate("mouseleave");

      expect(onYearMouseEnterSpy).toHaveBeenCalled();
      expect(onYearMouseLeaveSpy).toHaveBeenCalled();
    });
  });
});
