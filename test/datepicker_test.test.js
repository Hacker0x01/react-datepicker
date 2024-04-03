import React from "react";
import { enUS, enGB } from "date-fns/locale";
import { render, act, waitFor, fireEvent } from "@testing-library/react";
import DatePicker, { registerLocale } from "../src/index.jsx";
import TestWrapper from "./test_wrapper.jsx";
import CustomInput from "./helper_components/custom_input.jsx";
import * as utils from "../src/date_utils.js";
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
  const days = Array.from(
    datePicker.querySelectorAll(".react-datepicker__day"),
  );
  return days.find(
    (d) =>
      d.getAttribute("aria-label") ===
      `Choose ${utils.formatDate(targetDate, "PPPP")}`,
  );
}

function goToLastMonth(datePicker) {
  const lastMonthButton = datePicker.querySelector(
    ".react-datepicker__navigation-icon--previous",
  );
  fireEvent.click(lastMonthButton);
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

    let instance;
    render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        portalId="test-portal"
        portalHost={shadow}
      />,
      {
        container: appHost,
      },
    );

    fireEvent.click(instance.input);
    expect(instance.calendar).toBeDefined();
    expect(shadow.getElementById("test-portal")).toBeDefined();
  });

  it("should not set open state when it is disabled and gets clicked", () => {
    const { container } = render(<DatePicker disabled />);

    fireEvent.click(container.querySelector("input"));

    expect(container.querySelector(".react-datepicker")).toBeNull();
  });

  it("should close the popper and return focus to the date input on Escape.", async () => {
    // https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html
    // Date Picker Dialog | Escape | Closes the dialog and returns focus to the Choose Date button.
    const div = document.createElement("div");
    document.body.appendChild(div);
    let instance;
    render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
      />,
      {
        container: div,
      },
    );

    // user focuses the input field, the calendar opens
    fireEvent.focus(instance.input);

    // user may tab or arrow down to the current day (or some other element in the popper)
    const today = div.querySelector(".react-datepicker__day--today");
    act(() => {
      today.focus();
    });

    // user hits Escape
    fireEvent.keyDown(today, getKey("Escape"));

    expect(instance.calendar).toBeFalsy();

    await waitFor(() => {
      expect(instance.state.preventFocus).toBe(false);
      expect(document.activeElement).toBe(div.querySelector("input"));
    });
  });

  it("should close the popper and return focus to the date input on Enter.", async () => {
    // https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html
    // Date Picker Dialog | Date Grid | Enter | Closes the dialog and returns focus to the Choose Date button.
    const div = document.createElement("div");
    document.body.appendChild(div);
    let instance;
    render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
      />,
      {
        container: div,
      },
    );

    // user focuses the input field, the calendar opens
    fireEvent.focus(instance.input);

    // user may tab or arrow down to the current day (or some other element in the popper)
    const today = div.querySelector(".react-datepicker__day--today");
    act(() => {
      today.focus();
    });

    // user hits Enter
    fireEvent.keyDown(today, getKey("Enter"));

    expect(instance.calendar).toBeFalsy();

    await waitFor(() => {
      expect(instance.state.preventFocus).toBe(false);
      expect(document.activeElement).toBe(div.querySelector("input"));
    });
  });

  it("should not close the popper and keep focus on selected date if showTimeSelect is enabled.", async () => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    let instance;
    render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        showTimeSelect
      />,
      {
        container: div,
      },
    );

    // user focuses the input field, the calendar opens
    fireEvent.focus(instance.input);

    // user may tab or arrow down to the current day (or some other element in the popper)
    const today = div.querySelector(".react-datepicker__day--today");
    act(() => {
      today.focus();
    });

    // user hits Enter
    fireEvent.keyDown(today, getKey("Enter"));

    expect(instance.calendar).toBeTruthy();

    await waitFor(() => {
      expect(document.activeElement).toBe(today);
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
    render(<DatePicker shouldCloseOnSelect={false} />, {
      container: div,
    });

    // user focuses the input field, the calendar opens
    const dateInput = div.querySelector("input");
    fireEvent.focus(dateInput);

    // user may tab or arrow down to the current day (or some other element in the popper)
    const today = div.querySelector(".react-datepicker__day--today");
    act(() => {
      today.focus();
    });

    // user hits Enter
    fireEvent.keyDown(today, getKey("Enter"));
    expect(document.activeElement).toBe(today);
  });

  it("should set open to true if showTimeInput is true", () => {
    let instance;
    render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        shouldCloseOnSelect={false}
        showTimeInput
      />,
    );
    const handleTimeChange = instance.handleTimeChange;
    act(() => {
      handleTimeChange("13:00");
    });
    expect(instance.state.open).toBe(true);
  });

  it("should not hide the calendar when selecting a day in the calendar with Enter press, and shouldCloseOnSelect prop is false", () => {
    const data = getOnInputKeyDownStuff({ shouldCloseOnSelect: false });

    fireEvent.keyDown(data.dateInput, getKey("ArrowUp"));
    fireEvent.keyDown(data.dateInput, getKey("Enter"));
    expect(data.instance.state.open).toBe(true);
  });

  it("should update the preSelection state when a day is selected with Enter press", () => {
    const data = getOnInputKeyDownStuff({ shouldCloseOnSelect: false });

    fireEvent.keyDown(data.dateInput, getKey("ArrowDown"));
    fireEvent.keyDown(getSelectedDayNode(data.instance), getKey("ArrowDown"));
    fireEvent.keyDown(getSelectedDayNode(data.instance), getKey("ArrowDown"));
    fireEvent.keyDown(getSelectedDayNode(data.instance), getKey("Enter"));

    data.copyM = utils.addWeeks(data.copyM, 2);
    expect(
      utils.formatDate(data.instance.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });

  it("should update the preSelection state when a day is selected with mouse click", () => {
    const data = getOnInputKeyDownStuff({
      shouldCloseOnSelect: false,
    });

    fireEvent.keyDown(data.dateInput, getKey("ArrowDown")); // put focus on current day
    const today = getSelectedDayNode(data.instance); // store current day node
    const dayToClick = today.nextElementSibling || today.previousElementSibling; // choose next or previous day
    fireEvent.click(dayToClick); // will update the preSelection
    data.copyM = today.nextElementSibling
      ? utils.addDays(data.copyM, 1)
      : utils.subDays(data.copyM, 1); // update copyM to expected date

    expect(
      utils.formatDate(data.instance.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });

  it("should update the preSelection state when Today button is clicked after selecting a different day for inline mode", () => {
    let instance;
    render(
      <DatePicker
        todayButton="Today"
        selected={utils.newDate()}
        inline
        onChange={(d) => {
          // eslint-disable-next-line
          const date = d;
        }}
        ref={(node) => {
          instance = node;
        }}
      />,
    );

    const today = getSelectedDayNode(instance);
    const anyOtherDay =
      today.nextElementSibling || today.previousElementSibling;
    fireEvent.click(anyOtherDay); // will update the preSelection to next or previous day

    const todayBtn = instance.calendar.componentNode.querySelector(
      ".react-datepicker__today-button",
    );
    fireEvent.click(todayBtn); // will update the preSelection

    expect(utils.formatDate(instance.state.preSelection, "yyyy-MM-dd")).toBe(
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

  it("should hide the calendar and keep focus on input when pressing escape in the date input", async () => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    let instance;
    render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
      />,
      {
        container: div,
      },
    );

    // user focuses the input field, the calendar opens
    fireEvent.focus(instance.input);

    fireEvent.keyDown(instance.input, getKey("Escape"));

    expect(instance.calendar).toBeFalsy();

    await waitFor(() => {
      expect(document.activeElement).toBe(instance.input);
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
    let instance;
    const { container } = render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        selected={utils.newDate("2015-12-15")}
        isClearable
      />,
    );
    const clearButton = container.querySelector(
      ".react-datepicker__close-icon",
    );
    fireEvent.click(clearButton);
    expect(instance.state.inputValue).toBeNull();
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

  it("should return focus to input when clear button is used", async () => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const { container } = render(
      <DatePicker selected={utils.newDate("2015-12-15")} isClearable />,
      {
        container: div,
      },
    );

    const clearButton = container.querySelector(
      ".react-datepicker__close-icon",
    );
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(document.activeElement).toBe(div.querySelector("input"));
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

  it("should mount and unmount properly", () => {
    class TestComponent extends React.Component {
      constructor(props) {
        super(props);
        this.state = { mounted: true };
      }

      render() {
        return this.state.mounted ? <DatePicker /> : null;
      }
    }
    let instance;
    const { rerender } = render(
      <TestComponent
        ref={(node) => {
          instance = node;
        }}
      />,
    );
    act(() => {
      instance.state.mounted = false;
    });
    rerender(
      <TestComponent
        ref={(node) => {
          instance = node;
        }}
      />,
    );
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
    let instance;
    render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        withPortal
        portalId="portal-id-dom-test"
      />,
    );
    fireEvent.focus(instance.input);

    expect(
      document.body.querySelector(".react-datepicker__portal"),
    ).not.toBeNull();
    expect(instance.calendar).toBeDefined();

    const header = instance.calendar.componentNode.querySelector(
      ".react-datepicker__current-month",
    );

    fireEvent.click(header);
    fireEvent.keyDown(header, getKey("Escape"));

    expect(instance.calendar).toBeFalsy();
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
    let instance;

    const { container, rerender } = render(
      <DatePicker
        selected={m}
        onChange={callback}
        onInputError={onInputErrorCallback}
        dateFormat={testFormat}
        {...opts}
        ref={(node) => {
          instance = node;
        }}
      />,
    );
    const dateInput = instance.input;
    const dateCalendar = instance.calendar;
    fireEvent.focus(dateInput);
    return {
      m,
      copyM,
      testFormat,
      exactishFormat,
      callback,
      onInputErrorCallback,
      datePicker: container.firstChild,
      dateInput,
      dateCalendar,
      rerender,
      instance,
    };
  }
  it("should handle onDayKeyDown ArrowLeft", () => {
    const data = getOnInputKeyDownStuff();
    fireEvent.keyDown(data.dateInput, getKey("ArrowDown"));
    fireEvent.keyDown(getSelectedDayNode(data.instance), getKey("ArrowLeft"));

    data.copyM = utils.subDays(data.copyM, 1);
    expect(
      utils.formatDate(data.instance.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should handle onDayKeyDown ArrowRight", () => {
    const data = getOnInputKeyDownStuff();
    fireEvent.keyDown(data.dateInput, getKey("ArrowDown"));
    fireEvent.keyDown(getSelectedDayNode(data.instance), getKey("ArrowRight"));
    data.copyM = utils.addDays(data.copyM, 1);
    expect(
      utils.formatDate(data.instance.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should handle onDayKeyDown ArrowUp", () => {
    const data = getOnInputKeyDownStuff();
    fireEvent.keyDown(data.dateInput, getKey("ArrowDown"));
    fireEvent.keyDown(getSelectedDayNode(data.instance), getKey("ArrowUp"));
    data.copyM = utils.subWeeks(data.copyM, 1);
    expect(
      utils.formatDate(data.instance.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should handle onDayKeyDown ArrowDown", () => {
    const data = getOnInputKeyDownStuff();
    fireEvent.keyDown(data.dateInput, getKey("ArrowDown"));
    fireEvent.keyDown(getSelectedDayNode(data.instance), getKey("ArrowDown"));
    data.copyM = utils.addWeeks(data.copyM, 1);
    expect(
      utils.formatDate(data.instance.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should handle onDayKeyDown PageUp", () => {
    const data = getOnInputKeyDownStuff();
    fireEvent.keyDown(data.dateInput, getKey("ArrowDown"));
    fireEvent.keyDown(getSelectedDayNode(data.instance), getKey("PageUp"));
    data.copyM = utils.subMonths(data.copyM, 1);
    expect(
      utils.formatDate(data.instance.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should handle onDayKeyDown Shift+PageUp", () => {
    const data = getOnInputKeyDownStuff();

    fireEvent.keyDown(data.dateInput, getKey("ArrowDown"));
    fireEvent.keyDown(
      getSelectedDayNode(data.instance),
      getKey("PageUp", true),
    );

    data.copyM = utils.subYears(data.copyM, 1);

    expect(
      utils.formatDate(data.instance.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should handle onDayKeyDown PageDown", () => {
    const data = getOnInputKeyDownStuff();
    fireEvent.keyDown(data.dateInput, getKey("ArrowDown"));
    fireEvent.keyDown(getSelectedDayNode(data.instance), getKey("PageDown"));
    data.copyM = utils.addMonths(data.copyM, 1);
    expect(
      utils.formatDate(data.instance.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should handle onDayKeyDown Shift+PageDown", () => {
    const data = getOnInputKeyDownStuff();

    fireEvent.keyDown(data.dateInput, getKey("ArrowDown"));
    fireEvent.keyDown(
      getSelectedDayNode(data.instance),
      getKey("PageDown", true),
    );

    data.copyM = utils.addYears(data.copyM, 1);

    expect(
      utils.formatDate(data.instance.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should handle onDayKeyDown End", () => {
    const data = getOnInputKeyDownStuff();
    fireEvent.keyDown(data.dateInput, getKey("ArrowDown"));
    fireEvent.keyDown(getSelectedDayNode(data.instance), getKey("End"));
    data.copyM = utils.getEndOfWeek(data.copyM);
    expect(
      utils.formatDate(data.instance.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should handle onDayKeyDown Home", () => {
    const data = getOnInputKeyDownStuff();
    fireEvent.keyDown(data.dateInput, getKey("ArrowDown"));
    fireEvent.keyDown(getSelectedDayNode(data.instance), getKey("Home"));
    data.copyM = utils.getStartOfWeek(data.copyM);
    expect(
      utils.formatDate(data.instance.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should call onMonthChange when keyboard navigation moves preSelection to different month", () => {
    const onMonthChangeSpy = jest.fn();
    const opts = { onMonthChange: onMonthChangeSpy };
    const data = getOnInputKeyDownStuff(opts);
    fireEvent.keyDown(data.dateInput, getKey("ArrowDown"));
    fireEvent.keyDown(getSelectedDayNode(data.instance), getKey("PageDown"));

    expect(onMonthChangeSpy).toHaveBeenCalledTimes(1);
  });
  it("should call onSelect only once when keyboard navigation moves selection to different month", () => {
    const onSelectSpy = jest.fn();
    const opts = { onSelect: onSelectSpy, adjustDateOnChange: true };
    const data = getOnInputKeyDownStuff(opts);
    fireEvent.keyDown(data.dateInput, getKey("ArrowDown"));
    fireEvent.keyDown(getSelectedDayNode(data.instance), getKey("PageDown"));
    expect(onSelectSpy).toHaveBeenCalledTimes(1);
  });
  it("should not preSelect date if not between minDate and maxDate", () => {
    const data = getOnInputKeyDownStuff({
      minDate: utils.subDays(utils.newDate(), 1),
      maxDate: utils.addDays(utils.newDate(), 1),
    });
    fireEvent.keyDown(data.dateInput, getKey("ArrowDown"));
    expect(
      utils.formatDate(data.instance.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should not preSelect date if before minDate", () => {
    const data = getOnInputKeyDownStuff({
      minDate: utils.subDays(utils.newDate(), 1),
    });
    fireEvent.keyDown(data.dateInput, getKey("ArrowUp"));
    expect(
      utils.formatDate(data.instance.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should not preSelect date if after maxDate", () => {
    const data = getOnInputKeyDownStuff({
      maxDate: utils.addDays(utils.newDate(), 1),
    });
    fireEvent.keyDown(data.dateInput, getKey("ArrowDown"));
    expect(
      utils.formatDate(data.instance.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });

  it("should be possible to preSelect minDate (no maxDate set)", () => {
    const data = getOnInputKeyDownStuff({
      minDate: utils.newDate(),
    });
    fireEvent.keyDown(data.dateInput, getKey("ArrowDown"));
    fireEvent.keyDown(getSelectedDayNode(data.instance), getKey("ArrowRight"));
    fireEvent.keyDown(getSelectedDayNode(data.instance), getKey("ArrowLeft"));
    expect(
      utils.formatDate(data.instance.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.instance.props.minDate, data.testFormat));
  });

  it("should be possible to preSelect minDate (maxDate set)", () => {
    const data = getOnInputKeyDownStuff({
      minDate: utils.newDate(),
      maxDate: utils.addDays(utils.newDate(), 20),
    });
    fireEvent.keyDown(data.dateInput, getKey("ArrowDown"));
    fireEvent.keyDown(getSelectedDayNode(data.instance), getKey("ArrowRight"));
    fireEvent.keyDown(getSelectedDayNode(data.instance), getKey("ArrowLeft"));
    expect(
      utils.formatDate(data.instance.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.instance.props.minDate, data.testFormat));
  });

  it("should be possible to preSelect maxDate (no minDate set)", () => {
    const data = getOnInputKeyDownStuff({
      maxDate: utils.addDays(utils.newDate(), 1),
    });
    fireEvent.keyDown(data.dateInput, getKey("ArrowDown"));
    fireEvent.keyDown(getSelectedDayNode(data.instance), getKey("ArrowRight"));
    expect(
      utils.formatDate(data.instance.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.instance.props.maxDate, data.testFormat));
  });

  it("should be possible to preSelect maxDate (minDate set)", () => {
    const data = getOnInputKeyDownStuff({
      minDate: utils.subDays(utils.newDate(), 20),
      maxDate: utils.addDays(utils.newDate(), 1),
    });
    fireEvent.keyDown(data.dateInput, getKey("ArrowDown"));
    fireEvent.keyDown(getSelectedDayNode(data.instance), getKey("ArrowRight"));
    expect(
      utils.formatDate(data.instance.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.instance.props.maxDate, data.testFormat));
  });

  it("should not clear the preSelect date when a pressed key is not a navigation key", () => {
    const data = getOnInputKeyDownStuff();
    fireEvent.keyDown(data.dateInput, getKey("x"));
    expect(data.instance.state.preSelection.valueOf()).toBe(
      data.copyM.valueOf(),
    );
  });

  describe("when update the datepicker input text while props.minDate is set", () => {
    const getCalendar = () => {
      return render(
        <DatePicker
          selected={new Date("1993-07-02")}
          minDate={new Date("1800/01/01")}
          open
        />,
      );
    };

    it("should auto update calendar when the updated date text is after props.minDate", () => {
      const { container } = getCalendar();
      const input = container.querySelector("input");

      fireEvent.change(input, {
        target: {
          value: "1801/01/01",
        },
      });

      expect(container.querySelector("input").value).toBe("1801/01/01");
      expect(
        container.querySelector(".react-datepicker__current-month").innerHTML,
      ).toBe("January 1801");
    });

    it("should not auto update calendar when the updated date text is before props.minDate", () => {
      const { container } = getCalendar();
      const input = container.querySelector("input");

      fireEvent.change(input, {
        target: {
          value: "1799/01/01",
        },
      });

      expect(
        container.querySelector(".react-datepicker__current-month").innerHTML,
      ).toBe("July 1993");
    });
  });

  it("should not manual select date if before minDate", () => {
    const minDate = utils.subDays(utils.newDate(), 1);
    const data = getOnInputKeyDownStuff({
      minDate: minDate,
    });
    fireEvent.change(data.dateInput, {
      target: {
        value: utils.formatDate(utils.subDays(minDate, 1), data.testFormat),
      },
    });
    fireEvent.keyDown(data.dateInput, getKey("Enter"));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should not manual select date if after maxDate", () => {
    const maxDate = utils.addDays(utils.newDate(), 1);
    const data = getOnInputKeyDownStuff({
      maxDate: maxDate,
    });
    fireEvent.change(data.dateInput, {
      target: {
        value: utils.formatDate(utils.addDays(maxDate, 1), data.testFormat),
      },
    });
    fireEvent.keyDown(data.dateInput, getKey("Enter"));
    expect(data.callback).not.toHaveBeenCalled();
  });
  describe("onInputKeyDown Enter", () => {
    it("should update the selected date", () => {
      const data = getOnInputKeyDownStuff();
      fireEvent.keyDown(data.dateInput, getKey("ArrowDown")); // puts focus on the calendar day
      fireEvent.keyDown(getSelectedDayNode(data.instance), getKey("ArrowLeft"));
      fireEvent.keyDown(getSelectedDayNode(data.instance), getKey("Enter"));

      data.copyM = utils.subDays(data.copyM, 1);
      expect(data.callback).toHaveBeenCalled();
      const result = data.callback.mock.calls[0][0];
      expect(utils.formatDate(result, data.testFormat)).toBe(
        utils.formatDate(data.copyM, data.testFormat),
      );
    });
    it("should update the selected date on manual input", () => {
      const data = getOnInputKeyDownStuff();
      fireEvent.change(data.dateInput, {
        target: { value: "02/02/2017" },
      });
      fireEvent.keyDown(data.dateInput, getKey("Enter"));
      data.copyM = utils.newDate("2017-02-02");
      expect(
        utils.formatDate(data.callback.mock.calls[0][0], data.testFormat),
      ).toBe(utils.formatDate(data.copyM, data.testFormat));
    });
    it("should not select excludeDates", () => {
      const data = getOnInputKeyDownStuff({
        excludeDates: [utils.subDays(utils.newDate(), 1)],
      });
      fireEvent.keyDown(data.dateInput, getKey("ArrowLeft"));
      fireEvent.keyDown(data.dateInput, getKey("Enter"));
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
        fireEvent.keyDown(data.dateInput, getKey("ArrowLeft"));
        fireEvent.keyDown(data.dateInput, getKey("Enter"));
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
        fireEvent.keyDown(data.dateInput, getKey("Enter"));
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
        fireEvent.keyDown(data.dateInput, getKey("ArrowRight"));
        fireEvent.keyDown(data.dateInput, getKey("Enter"));
        expect(data.callback).not.toHaveBeenCalled();
      });
    });
    it("should not select dates excluded from filterDate", () => {
      const data = getOnInputKeyDownStuff({
        filterDate: (date) =>
          utils.getDay(date) !==
          utils.getDay(utils.subDays(utils.newDate(), 1)),
      });
      fireEvent.keyDown(data.dateInput, getKey("ArrowLeft"));
      fireEvent.keyDown(data.dateInput, getKey("Enter"));
      expect(data.callback).not.toHaveBeenCalled();
    });
  });
  describe("onInputKeyDown Escape", () => {
    it("should not update the selected date if the date input manually it has something wrong", () => {
      const data = getOnInputKeyDownStuff();
      const preSelection = data.instance.state.preSelection;
      fireEvent.keyDown(data.dateInput, getKey("Backspace"));
      fireEvent.keyDown(data.dateInput, getKey("Escape"));
      expect(data.callback).not.toHaveBeenCalled(); // confirms that handleChange occurred
      expect(preSelection).toBe(data.instance.state.preSelection); // confirms the preSelection is still the same
    });
  });
  it("should reset the keyboard selection when closed", () => {
    const data = getOnInputKeyDownStuff();
    fireEvent.keyDown(data.dateInput, getKey("ArrowLeft"));
    act(() => {
      data.instance.setOpen(false);
    });
    expect(
      utils.formatDate(data.instance.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should retain the keyboard selection when already open", () => {
    const data = getOnInputKeyDownStuff();
    fireEvent.keyDown(data.dateInput, getKey("ArrowDown"));
    fireEvent.keyDown(getSelectedDayNode(data.instance), getKey("ArrowLeft"));
    data.copyM = utils.subDays(data.copyM, 1);
    expect(
      utils.formatDate(data.instance.state.preSelection, data.testFormat),
    ).toBe(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should open the calendar when the down arrow key is pressed", () => {
    const data = getOnInputKeyDownStuff();
    act(() => {
      data.instance.setOpen(false);
    });
    expect(data.instance.state.open).toBe(false);
    fireEvent.keyDown(data.dateInput, getKey("ArrowDown"));
    expect(data.instance.state.open).toBe(true);
  });
  it("should not open the calendar when the left arrow key is pressed", () => {
    const data = getOnInputKeyDownStuff();
    act(() => {
      data.instance.setOpen(false);
    });
    expect(data.instance.state.open).toBe(false);
    fireEvent.keyDown(data.dateInput, getKey("ArrowLeft"));
    expect(data.instance.state.open).toBe(false);
  });
  it("should default to the current day on Enter", () => {
    const data = getOnInputKeyDownStuff({ selected: null });
    fireEvent.keyDown(data.dateInput, getKey("Enter"));
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
    let instance;
    render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
      />,
      {
        container: div,
      },
    );
    act(() => {
      instance.setFocus();
    });
    expect(div.querySelector("input")).toBe(document.activeElement);
  });
  it("should clear preventFocus timeout id when component is unmounted", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    let instance;
    const { unmount } = render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        inline
      />,
      {
        container: div,
      },
    );
    const clearPreventFocusTimeoutMock = jest.fn();
    instance.clearPreventFocusTimeout = clearPreventFocusTimeoutMock;
    unmount();
    expect(clearPreventFocusTimeoutMock).toHaveBeenCalledTimes(1);
  });

  function getOnInputKeyDownDisabledKeyboardNavigationStuff() {
    const m = utils.newDate();
    const copyM = utils.newDate(m);
    const testFormat = "yyyy-MM-dd";
    const callback = jest.fn();
    let instance;
    const { container, rerender } = render(
      <DatePicker
        selected={m}
        onChange={callback}
        disabledKeyboardNavigation
        ref={(node) => {
          instance = node;
        }}
      />,
    );
    const dateInput = instance.input;
    fireEvent.focus(dateInput);
    return {
      m,
      copyM,
      testFormat,
      callback,
      datePicker: container.firstChild,
      dateInput,
      rerender,
      instance,
    };
  }
  it("should not handle onInputKeyDown ArrowLeft", () => {
    const data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    fireEvent.keyDown(data.dateInput, getKey("ArrowLeft"));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should not handle onInputKeyDown ArrowRight", () => {
    const data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    fireEvent.keyDown(data.dateInput, getKey("ArrowRight"));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should not handle onInputKeyDown ArrowUp", () => {
    const data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    fireEvent.keyDown(data.dateInput, getKey("ArrowUp"));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should not handle onInputKeyDown ArrowDown", () => {
    const data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    fireEvent.keyDown(data.dateInput, getKey("ArrowDown"));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should not handle onInputKeyDown PageUp", () => {
    const data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    fireEvent.keyDown(data.dateInput, getKey("PageUp"));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should not handle onInputKeyDown PageDown", () => {
    const data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    fireEvent.keyDown(data.dateInput, getKey("PageDown"));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should not handle onInputKeyDown Home", () => {
    const data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    fireEvent.keyDown(data.dateInput, getKey("Home"));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should not handle onInputKeyDown End", () => {
    const data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    fireEvent.keyDown(data.dateInput, getKey("End"));
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
  it("should correctly clear date with empty input string (selectsRange)", () => {
    let instance;
    const onChangeSpy = jest.fn();

    render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        selectsRange
        startDate={utils.newDate("2016-11-22")}
        endDate={null}
        onChange={onChangeSpy}
        isClearable
      />,
    );
    fireEvent.change(instance.input, {
      target: {
        value: "",
      },
    });

    expect(onChangeSpy.mock.calls.at(-1)[0]).toStrictEqual([null, null]);
  });
  it("should correctly update the input when the value prop changes", () => {
    let instance;
    const { rerender } = render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
      />,
    );
    expect(instance.input.value).toBe("");
    rerender(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        value="foo"
      />,
    );
    expect(instance.input.value).toBe("foo");
  });
  it("should preserve user input as they are typing", () => {
    let instance;
    let selected = undefined;

    const onChange = (date) => {
      selected = date;
    };
    const { rerender } = render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        dateFormat={["yyyy-MM-dd", "MM/dd/yyyy", "MM/dd/yy"]}
        onChange={onChange}
      />,
    );

    expect(instance.input.value).toBe("");

    const str = "12/30/1982";
    fireEvent.focus(instance.input);
    str.split("").forEach((c, i) => {
      fireEvent.change(instance.input, {
        target: { value: instance.input.value + c },
      });
      rerender(
        <DatePicker
          ref={(node) => {
            instance = node;
          }}
          dateFormat={["yyyy-MM-dd", "MM/dd/yyyy", "MM/dd/yy"]}
          onChange={onChange}
          selected={selected}
        />,
      );
      expect(instance.input.value).toBe(str.substring(0, i + 1));
    });
    expect(utils.formatDate(selected, "yyyy-MM-dd")).toBe("1982-12-30");
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
    let instance;
    render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        selected={utils.newDate()}
        withPortal
      />,
    );
    const openSpy = jest.spyOn(instance, "setOpen");
    act(() => {
      instance.handleCalendarClickOutside({ preventDefault: jest.fn() });
    });
    expect(openSpy).toHaveBeenCalledWith(false);
  });
  it("should default to the currently selected date", () => {
    let instance;
    render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        selected={utils.newDate("1988-12-30")}
      />,
    );
    expect(utils.formatDate(instance.state.preSelection, "yyyy-MM-dd")).toBe(
      "1988-12-30",
    );
  });
  it("should default to the start date when selecting an end date", () => {
    let instance;
    render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        startDate={utils.newDate("1988-11-30")}
        selectsEnd
      />,
    );
    expect(utils.formatDate(instance.state.preSelection, "yyyy-MM-dd")).toBe(
      "1988-11-30",
    );
  });
  it("should default to the end date when selecting a start date", () => {
    let instance;
    render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        endDate={utils.newDate("1988-12-31")}
        selectsStart
      />,
    );
    expect(utils.formatDate(instance.state.preSelection, "yyyy-MM-dd")).toBe(
      "1988-12-31",
    );
  });
  it("should default to a date <= maxDate", () => {
    let instance;
    render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        maxDate={utils.newDate("1982-01-01")}
      />,
    );
    expect(utils.formatDate(instance.state.preSelection, "yyyy-MM-dd")).toBe(
      "1982-01-01",
    );
  });
  it("should default to a date >= minDate", () => {
    let instance;
    render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        minDate={utils.newDate("2063-04-05")}
      />,
    );
    expect(utils.formatDate(instance.state.preSelection, "yyyy-MM-dd")).toBe(
      "2063-04-05",
    );
  });
  it("should default to the openToDate if there is one", () => {
    let instance;
    render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        openToDate={utils.newDate("2020-01-23")}
      />,
    );
    expect(utils.formatDate(instance.state.preSelection, "yyyy-MM-dd")).toBe(
      "2020-01-23",
    );
  });
  it("should otherwise default to the current date", () => {
    let instance;
    render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
      />,
    );
    expect(utils.formatDate(instance.state.preSelection, "yyyy-MM-dd")).toBe(
      utils.formatDate(utils.newDate(), "yyyy-MM-dd"),
    );
  });
  it("should support an initial null `selected` value in inline mode", () => {
    const { rerender } = render(<DatePicker inline selected={null} />);

    expect(() =>
      rerender(<DatePicker inline selected={utils.newDate()} />),
    ).not.toThrow();
  });
  it("should switch month in inline mode immediately", () => {
    let instance;
    const selected = utils.newDate();
    const future = utils.addDays(utils.newDate(), 100);
    const { rerender } = render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        inline
        selected={selected}
      />,
    );
    expect(utils.formatDate(instance.state.preSelection, "yyyy-MM-dd")).toBe(
      utils.formatDate(selected, "yyyy-MM-dd"),
    );
    rerender(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        inline
        selected={future}
      />,
    );
    expect(utils.formatDate(instance.state.preSelection, "yyyy-MM-dd")).toBe(
      utils.formatDate(future, "yyyy-MM-dd"),
    );
  });
  it("should switch month in inline mode immediately, when year is updated", () => {
    let instance;
    const selected = utils.newDate();
    const future = utils.addYears(utils.newDate(), 1);
    const { rerender } = render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        inline
        selected={selected}
      />,
    );
    expect(utils.formatDate(instance.state.preSelection, "yyyy-MM-dd")).toBe(
      utils.formatDate(selected, "yyyy-MM-dd"),
    );
    rerender(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        inline
        selected={future}
      />,
    );
    expect(utils.formatDate(instance.state.preSelection, "yyyy-MM-dd")).toBe(
      utils.formatDate(future, "yyyy-MM-dd"),
    );
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
    let instance;
    render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        selected={utils.newDate("2015-12-15")}
      />,
    );
    act(() => {
      instance.clear();
    });

    expect(instance.state.inputValue).toBeNull();
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
    let instance;
    const { rerender } = render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        monthsShown={2}
        inline
      />,
    );
    act(() => {
      instance.state.monthSelectedIn = 1;
    });
    expect(instance.state.monthSelectedIn).toEqual(1);

    rerender(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        monthsShown={1}
        inline
        monthSelectedIn={1}
      />,
    );

    expect(instance.state.monthSelectedIn).toEqual(0);
  });

  it("should disable non-jumping if prop focusSelectedMonth is true", () => {
    let instance;
    const { container } = render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        inline
        monthsShown={2}
        focusSelectedMonth
      />,
    );
    const dayButtonInline = container.querySelectorAll(
      ".react-datepicker__day",
    )[40];
    fireEvent.click(dayButtonInline);
    expect(instance.state.monthSelectedIn).toEqual(undefined);
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

      let selectedDay = findSelectedDay(container, selectedPrevious);
      // Ensure that we're dealing with a date at the beginning of the month
      if (!selectedDay) {
        // If it's the beginning of the month & if the selectedPrevious is not being displayed, navigate to the previous month and reselect the selectedPrevious
        goToLastMonth(container);
        selectedDay = findSelectedDay(container, selectedPrevious);
      }

      fireEvent.click(selectedDay);
      expect(utils.formatDate(startDate, "yyyy-MM-dd")).toBe(
        utils.formatDate(selectedPrevious, "yyyy-MM-dd"),
      );
      expect(endDate).toBeNull();
    });

    it("should swap dates of range when endDate set before startDate", () => {
      const selected = utils.newDate("2024-04-03");
      const selectedPrevious = utils.subDays(selected, 3);
      let [startDate, endDate] = [selected, null];
      const onChange = (dates = []) => {
        [startDate, endDate] = dates;
      };
      const { container } = render(
        <DatePicker
          swapRange
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />,
      );

      let selectedDay = findSelectedDay(container, selectedPrevious);
      // Ensure that we're dealing with a date at the beginning of the month
      if (!selectedDay) {
        // If it's the beginning of the month & if the selectedPrevious is not being displayed, navigate to the previous month and reselect the selectedPrevious
        goToLastMonth(container);
        selectedDay = findSelectedDay(container, selectedPrevious);
      }

      fireEvent.click(selectedDay);
      expect(utils.formatDate(startDate, "yyyy-MM-dd")).toBe(
        utils.formatDate(selectedPrevious, "yyyy-MM-dd"),
      );
      expect(utils.formatDate(endDate, "yyyy-MM-dd")).toBe(
        utils.formatDate(selected, "yyyy-MM-dd"),
      );
    });
  });

  describe("selectsRange without inline", () => {
    it("should have preSelection set to startDate upon opening", () => {
      const startDate = new Date("2021-04-20 00:00:00");
      const endDate = null;
      let instance;
      render(
        <DatePicker
          ref={(node) => {
            instance = node;
          }}
          selectsRange
          startDate={startDate}
          endDate={endDate}
        />,
      );
      // Click to open
      fireEvent.click(instance.input);
      expect(instance.state.preSelection).toBe(startDate);
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
      let instance;
      render(
        <DatePicker
          selectsRange
          startDate={null}
          endDate={null}
          onChange={onChangeSpy}
          isClearable
          ref={(node) => {
            instance = node;
          }}
        />,
      );

      act(() => {
        instance.clear();
      });

      expect(onChangeSpy).toHaveBeenCalled();
      expect(Array.isArray(onChangeSpy.mock.calls[0][0])).toBe(true);
      expect(onChangeSpy.mock.calls[0][0][0]).toBeNull();
      expect(onChangeSpy.mock.calls[0][0][1]).toBeNull();
    });

    it("should call the onChange even when the startDate and the endDate is same in the range (case when we programmatically set the startDate, but set the same endDate through UI)", () => {
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

      const calendar = container.querySelector(".react-datepicker");
      expect(calendar).toBeTruthy();

      // Select the same date as the start date
      const startDatePrefixedWithZeros = formatDayWithZeros(
        startDate.getDate(),
      );
      const endDateElement = container.querySelector(
        `.react-datepicker__day--${startDatePrefixedWithZeros}`,
      );
      fireEvent.click(endDateElement);

      expect(onChangeSpy).toHaveBeenCalled();
    });

    it("should hide the calendar even when the startDate and the endDate is same in the range", () => {
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

      calendar = container.querySelector(".react-datepicker");
      expect(calendar).toBeFalsy();

      expect(onCalendarCloseSpy).toHaveBeenCalled();
    });
  });

  describe("duplicate dates when multiple months", () => {
    const selected = utils.newDate("2023-05-15");

    it("should find duplicates at end on all months except last month", () => {
      // twoMonths
      const { container, rerender } = render(
        <DatePicker monthsShown={2} selected={selected} />,
      );
      fireEvent.click(container.querySelector("input"));
      const months = container.querySelectorAll(".react-datepicker__month");
      expect(months).toHaveLength(2);
      // 2023-05 monthShowsDuplicateDaysEnd:true
      // 2023-06-03
      expect(
        Array.from(months[0].querySelectorAll(".react-datepicker__day")).at(-1)
          .textContent,
      ).toBe("");
      // 2023-06 monthShowsDuplicateDaysEnd: false
      // 2023-07-01
      expect(
        Array.from(months[1].querySelectorAll(".react-datepicker__day")).at(-1)
          .textContent,
      ).toBe("1");

      // moreThanTwoMonths
      rerender(<DatePicker monthsShown={4} selected={selected} />);
      fireEvent.click(container.querySelector("input"));
      const monthsMore = container.querySelectorAll(".react-datepicker__month");
      expect(monthsMore).toHaveLength(4);
      // 2023-05 monthShowsDuplicateDaysEnd:true
      // 2023-06-03
      expect(
        Array.from(monthsMore[0].querySelectorAll(".react-datepicker__day")).at(
          -1,
        ).textContent,
      ).toBe("");
      // 2023-06 monthShowsDuplicateDaysEnd:true
      // 2023-07-01
      expect(
        Array.from(monthsMore[1].querySelectorAll(".react-datepicker__day")).at(
          -1,
        ).textContent,
      ).toBe("");
      // 2023-07 monthShowsDuplicateDaysEnd:true
      // 2023-08-05
      expect(
        Array.from(monthsMore[2].querySelectorAll(".react-datepicker__day")).at(
          -1,
        ).textContent,
      ).toBe("");
      // 2023-08 monthShowsDuplicateDaysEnd:false
      // 2023-09-02
      expect(
        Array.from(monthsMore[3].querySelectorAll(".react-datepicker__day")).at(
          -1,
        ).textContent,
      ).toBe("2");
    });

    it("should find duplicates at start on all months except first month", () => {
      // twoMonths
      const { container, rerender } = render(
        <DatePicker monthsShown={2} selected={selected} />,
      );
      fireEvent.click(container.querySelector("input"));
      const months = container.querySelectorAll(".react-datepicker__month");
      expect(months).toHaveLength(2);

      // 2023-05 monthShowsDuplicateDaysStart:false
      // 2023-04-30
      expect(
        months[0].querySelector(".react-datepicker__day").textContent,
      ).toBe("30");
      // 2023-06 monthShowsDuplicateDaysStart:true
      // 2023-05-28
      expect(
        months[1].querySelector(".react-datepicker__day").textContent,
      ).toBe("");

      // moreThanTwoMonths
      rerender(<DatePicker monthsShown={4} selected={selected} />);
      fireEvent.click(container.querySelector("input"));
      const monthsMore = container.querySelectorAll(".react-datepicker__month");
      expect(monthsMore).toHaveLength(4);
      // 2023-05 monthShowsDuplicateDaysStart:false
      // 2023-04-30
      expect(
        monthsMore[0].querySelector(".react-datepicker__day").textContent,
      ).toBe("30");
      // 2023-06 monthShowsDuplicateDaysStart:true
      // 2023-05-28
      expect(
        monthsMore[1].querySelector(".react-datepicker__day").textContent,
      ).toBe("");
      // 2023-07 monthShowsDuplicateDaysStart:true
      // 2023-06-25
      expect(
        monthsMore[2].querySelector(".react-datepicker__day").textContent,
      ).toBe("");
      // 2023-08 monthShowsDuplicateDaysStart:true
      // 2023-08-30
      expect(
        monthsMore[3].querySelector(".react-datepicker__day").textContent,
      ).toBe("");
    });

    it("should not find duplicates when single month displayed", () => {
      const { container } = render(<DatePicker selected={selected} />);
      fireEvent.click(container.querySelector("input"));
      const months = container.querySelectorAll(".react-datepicker__month");
      expect(months).toHaveLength(1);

      // 2023-05 monthShowsDuplicateDaysEnd:false
      // 2023-06-03
      expect(
        Array.from(months[0].querySelectorAll(".react-datepicker__day")).at(-1)
          .textContent,
      ).toBe("3");
      // 2023-05 monthShowsDuplicateDaysStart:false
      // 2023-04-30
      expect(
        months[0].querySelector(".react-datepicker__day").textContent,
      ).toBe("30");
    });
  });

  describe("multiple MonthYearPicker", () => {
    const selected = utils.newDate("2023-05-15");

    it("should contain a different year all headers.", () => {
      let instance;
      // 2 Years
      const { rerender } = render(
        <DatePicker
          ref={(node) => {
            instance = node;
          }}
          monthsShown={2}
          selected={selected}
          showMonthYearPicker
        />,
      );
      fireEvent.click(instance.input);
      const headers = instance.calendar.componentNode.querySelectorAll(
        ".react-datepicker__header",
      );
      expect(headers).toHaveLength(2);
      expect(headers[0].textContent).toBe("2023");
      expect(headers[1].textContent).toBe("2024");

      // 4 Years
      rerender(
        <DatePicker
          ref={(node) => {
            instance = node;
          }}
          monthsShown={4}
          selected={selected}
          showMonthYearPicker
        />,
      );
      fireEvent.click(instance.input);
      const headersMore = instance.calendar.componentNode.querySelectorAll(
        ".react-datepicker__header",
      );
      expect(headersMore).toHaveLength(4);
      expect(headersMore[0].textContent).toBe("2023");
      expect(headersMore[1].textContent).toBe("2024");
      expect(headersMore[2].textContent).toBe("2025");
      expect(headersMore[3].textContent).toBe("2026");
    });
  });

  describe("multiple QuarterYearPicker", () => {
    const selected = utils.newDate("2023-05-15");

    it("should contain a different year all headers.", () => {
      let instance;
      // 2 Years
      const { rerender } = render(
        <DatePicker
          ref={(node) => {
            instance = node;
          }}
          monthsShown={2}
          selected={selected}
          showQuarterYearPicker
        />,
      );
      fireEvent.click(instance.input);
      const headers = instance.calendar.componentNode.querySelectorAll(
        ".react-datepicker__header",
      );
      expect(headers).toHaveLength(2);
      expect(headers[0].textContent).toBe("2023");
      expect(headers[1].textContent).toBe("2024");

      // 4 Years
      rerender(
        <DatePicker
          ref={(node) => {
            instance = node;
          }}
          monthsShown={4}
          selected={selected}
          showQuarterYearPicker
        />,
      );
      fireEvent.click(instance.input);
      const headersMore = instance.calendar.componentNode.querySelectorAll(
        ".react-datepicker__header",
      );
      expect(headersMore).toHaveLength(4);
      expect(headersMore[0].textContent).toBe("2023");
      expect(headersMore[1].textContent).toBe("2024");
      expect(headersMore[2].textContent).toBe("2025");
      expect(headersMore[3].textContent).toBe("2026");
    });
  });

  describe("shouldFocusDayInline state", () => {
    const dateFormat = "yyyy-MM-dd";

    it("should not be updated when navigating with ArrowRight key without changing displayed month", () => {
      let instance;
      render(
        <DatePicker
          selected={utils.newDate("2020-11-15")}
          dateFormat={dateFormat}
          inline
          ref={(node) => {
            instance = node;
          }}
        />,
      );
      fireEvent.keyDown(getSelectedDayNode(instance), getKey("ArrowRight"));
      expect(instance.state.shouldFocusDayInline).toBe(false);
    });

    it("should be set to true when changing displayed month with ArrowRight key", () => {
      let instance;
      render(
        <DatePicker
          selected={utils.newDate("2020-11-30")}
          dateFormat={dateFormat}
          inline
          ref={(node) => {
            instance = node;
          }}
        />,
      );
      fireEvent.keyDown(getSelectedDayNode(instance), getKey("ArrowRight"));
      expect(instance.state.shouldFocusDayInline).toBe(true);
    });

    it("should be set to true when changing displayed month with PageDown key", () => {
      let instance;
      render(
        <DatePicker
          selected={utils.newDate("2020-11-15")}
          dateFormat={dateFormat}
          inline
          ref={(node) => {
            instance = node;
          }}
        />,
      );
      fireEvent.keyDown(getSelectedDayNode(instance), getKey("PageDown"));
      expect(instance.state.shouldFocusDayInline).toBe(true);
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
      let instance;
      const { container } = render(
        <DatePicker
          ref={(node) => {
            instance = node;
          }}
          showDateSelect
          selected={utils.newDate()}
        />,
      );

      fireEvent.focus(instance.input);
      fireEvent.keyDown(instance.input, getKey("Enter"));

      const ariaLiveMessage = container.querySelector(
        ".react-datepicker__aria-live",
      ).textContent;

      expect(ariaLiveMessage).toBe(
        `Selected date: ${utils.safeDateFormat(instance.props.selected, {
          dateFormat: "PPPP",
          locale: instance.props.locale,
        })}`,
      );
    });

    it("should have correct format if datepicker contains time", () => {
      let instance;
      const { container } = render(
        <DatePicker
          ref={(node) => {
            instance = node;
          }}
          showTimeInput
          showDateSelect
          selected={utils.newDate()}
        />,
      );

      fireEvent.focus(instance.input);
      fireEvent.keyDown(instance.input, getKey("Enter"));

      const ariaLiveMessage = container.querySelector(
        ".react-datepicker__aria-live",
      ).textContent;

      expect(ariaLiveMessage).toBe(
        `Selected date: ${utils.safeDateFormat(instance.props.selected, {
          dateFormat: "PPPPp",
          locale: instance.props.locale,
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
    const { container, rerender } = render(
      <DatePicker selected={utils.newDate("2021-04-15")} showIcon />,
    );
    let showIconClass = container
      .querySelector(".react-datepicker__input-container")
      .getAttribute("class");
    expect(showIconClass).toBe(
      "react-datepicker__input-container react-datepicker__view-calendar-icon",
    );

    rerender(<DatePicker selected={utils.newDate("2021-04-15")} showIcon />);
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
