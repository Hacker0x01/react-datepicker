import { render, act, waitFor, fireEvent } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { enUS, enGB } from "date-fns/locale";
import React, { useState } from "react";
import { OUTSIDE_CLICK_IGNORE_CLASS } from "../calendar";

import {
  KeyType,
  addDays,
  addMonths,
  addWeeks,
  addYears,
  formatDate,
  getDay,
  getEndOfWeek,
  getHours,
  getMinutes,
  getSeconds,
  getStartOfWeek,
  isSameDay,
  newDate,
  safeDateFormat,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from "../date_utils";
import DatePicker, { registerLocale } from "../index";

import CustomInput from "./helper_components/custom_input";
import ShadowRoot from "./helper_components/shadow_root";
import TestWrapper from "./helper_components/test_wrapper";
import {
  getKey,
  safeQuerySelector,
  setupMockResizeObserver,
} from "./test_utils";

function getSelectedDayNode(container: HTMLElement) {
  return (
    container.querySelector('.react-datepicker__day[tabindex="0"]') ?? undefined
  );
}

function findSelectedDay(container: HTMLElement, targetDate: Date) {
  const days = Array.from<HTMLElement>(
    container.querySelectorAll(".react-datepicker__day"),
  );
  return days.find(
    (d) =>
      d.getAttribute("aria-label") ===
      `Choose ${formatDate(targetDate, "PPPP")}`,
  );
}

function goToLastMonth(container: HTMLElement) {
  const lastMonthButton = container.querySelector(
    ".react-datepicker__navigation-icon--previous",
  );
  expect(lastMonthButton).toBeTruthy();
  fireEvent.click(lastMonthButton!);
}

function goToNextMonth(container: HTMLElement) {
  const nextMonthButton = safeQuerySelector(
    container,
    ".react-datepicker__navigation-icon--next",
  );
  fireEvent.click(nextMonthButton!);
}

function formatDayWithZeros(day: number) {
  const dayString = day.toString();

  if (dayString.length === 1) {
    return `00${dayString}`;
  }
  if (dayString.length === 2) {
    return `0${dayString}`;
  }
  return dayString;
}

const hideDocument = (calendarInput: HTMLElement) => {
  jest.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
  fireEvent(document, new Event("visibilitychange"));
  // Blur, To simulate the browser auto-blur the input before document hide
  fireEvent.blur(calendarInput);
};

const showDocument = (calendarInput: HTMLElement) => {
  jest.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
  fireEvent(document, new Event("visibilitychange"));
  // Focus, To simulate the browser auto-refocus of the input
  fireEvent.focus(calendarInput);
};

describe("DatePicker", () => {
  beforeEach(() => {
    setupMockResizeObserver();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should retain the calendar open status when the document visibility change", () => {
    const { container } = render(<DatePicker />);
    const input = safeQuerySelector(container, "input");

    if (!input) {
      throw new Error("Input element not found");
    }

    fireEvent.click(input);
    expect(container.querySelector(".react-datepicker")).toBeTruthy();

    hideDocument(input);
    showDocument(input);

    expect(container.querySelector(".react-datepicker")).toBeTruthy();
  });

  it("should retain the calendar close status when the document visibility change", () => {
    const { container } = render(<DatePicker />);
    const input = safeQuerySelector(container, "input");
    fireEvent.click(input);
    expect(container.querySelector(".react-datepicker")).toBeTruthy();

    fireEvent.keyDown(input, getKey(KeyType.Escape));
    expect(container.querySelector(".react-datepicker")).toBeFalsy();

    hideDocument(input);
    showDocument(input);

    expect(container.querySelector(".react-datepicker")).toBeFalsy();
  });

  it("should be executed props.onFocus on input focus when the document visibility changes", () => {
    const onFocusSpy = jest.fn();

    const { container } = render(<DatePicker onFocus={onFocusSpy} />);

    const input = safeQuerySelector<HTMLInputElement>(container, "input");

    fireEvent.focus(input);
    expect(onFocusSpy).toHaveBeenCalled();

    expect(container.querySelector(".react-datepicker")).toBeTruthy();
    fireEvent.keyDown(input, getKey(KeyType.Escape));
    fireEvent.blur(input);
    expect(container.querySelector(".react-datepicker")).toBeFalsy();

    hideDocument(input);
    showDocument(input);

    expect(onFocusSpy).toHaveBeenCalled();
    expect(container.querySelector(".react-datepicker")).toBeFalsy();

    fireEvent.click(input);
    expect(onFocusSpy).toHaveBeenCalled();
    expect(container.querySelector(".react-datepicker")).toBeTruthy();
  });

  it("should show the calendar when focusing on the date input", () => {
    const { container } = render(<DatePicker />);

    const input = safeQuerySelector<HTMLInputElement>(container, "input");
    fireEvent.focus(input);
    expect(container.querySelector(".react-datepicker")).not.toBeNull();
  });

  it("should allow the user to supply a wrapper component for the popper", () => {
    const { container } = render(<DatePicker popperContainer={TestWrapper} />);

    const input = safeQuerySelector<HTMLInputElement>(container, "input");
    fireEvent.focus(input);

    expect(container.querySelectorAll(".test-wrapper").length).toBe(1);
    expect(container.querySelector(".react-datepicker")).not.toBeNull();
  });

  it("should allow the user to pass a wrapper component for the calendar", () => {
    const { container } = render(
      <DatePicker calendarContainer={TestWrapper} />,
    );

    const input = safeQuerySelector<HTMLInputElement>(container, "input");
    fireEvent.focus(input);

    expect(container.querySelectorAll(".test-wrapper").length).toBe(1);
    expect(container.querySelector(".react-datepicker")).not.toBeNull();
  });

  it("should pass a custom class to the popper container", () => {
    const { container } = render(
      <DatePicker popperClassName="some-class-name" />,
    );

    const input = safeQuerySelector<HTMLInputElement>(container, "input");
    fireEvent.focus(input);

    const popper = container.querySelectorAll(".react-datepicker-popper");
    expect(popper.length).toBe(1);
    expect(popper[0]?.classList.contains("some-class-name")).toBe(true);
  });

  it("should show the calendar when clicking on the date input", () => {
    const { container } = render(<DatePicker />);

    const input = safeQuerySelector<HTMLInputElement>(container, "input");
    fireEvent.click(input);

    expect(container.querySelector(".react-datepicker")).not.toBeNull();
  });

  it("should render the calendar in the portalHost prop when provided", () => {
    const root = document.createElement("div");
    const shadow = root.attachShadow({ mode: "closed" });
    const appHost = document.createElement("div");
    shadow.appendChild(appHost);

    let instance: DatePicker | null = null;
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

    expect(instance).toBeTruthy();
    expect(instance!.input).toBeTruthy();
    fireEvent.click(instance!.input!);
    expect(instance!.calendar).toBeDefined();
    expect(shadow.getElementById("test-portal")).toBeDefined();
  });

  it("calendar should stay open when clicked within shadow dom and closed when clicked outside", async () => {
    let instance: DatePicker | null = null;
    render(
      <ShadowRoot>
        <DatePicker
          ref={(node) => {
            instance = node;
          }}
        />
      </ShadowRoot>,
    );

    expect(instance).toBeTruthy();
    expect(instance!.input).toBeTruthy();

    await userEvent.click(instance!.input!);
    expect(instance!.isCalendarOpen()).toBe(true);
    expect(instance!.calendar).toBeTruthy();
    expect(instance!.calendar!.containerRef.current).toBeTruthy();

    await userEvent.click(instance!.calendar!.containerRef.current!);
    expect(instance!.isCalendarOpen()).toBe(true);

    await userEvent.click(document.body);
    expect(instance!.isCalendarOpen()).toBe(false);
  });

  it("should not set open state when it is disabled and gets clicked", () => {
    const { container } = render(<DatePicker disabled />);

    const input = safeQuerySelector<HTMLInputElement>(container, "input");
    fireEvent.click(input);

    expect(container.querySelector(".react-datepicker")).toBeNull();
  });

  it("should close the popper and return focus to the date input on Escape.", async () => {
    // https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html
    // Date Picker Dialog | Escape | Closes the dialog and returns focus to the Choose Date button.
    const div = document.createElement("div");
    document.body.appendChild(div);
    let instance: DatePicker | null = null;
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
    expect(instance).toBeTruthy();
    expect(instance!.input).toBeTruthy();
    fireEvent.click(instance!.input!);

    // user may tab or arrow down to the current day (or some other element in the popper)
    const today = safeQuerySelector(div, ".react-datepicker__day--today");
    act(() => {
      today?.focus();
    });

    // user hits Escape
    fireEvent.keyDown(today, getKey(KeyType.Escape));

    expect(instance!.calendar).toBeFalsy();

    await waitFor(() => {
      expect(instance!.state.preventFocus).toBe(false);
      expect(document.activeElement).toBe(div.querySelector("input"));
    });
  });

  it("should close the popper and return focus to the date input on Enter.", async () => {
    // https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html
    // Date Picker Dialog | Date Grid | Enter | Closes the dialog and returns focus to the Choose Date button.
    const div = document.createElement("div");
    document.body.appendChild(div);
    let instance: DatePicker | null = null;
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
    expect(instance).toBeTruthy();
    expect(instance!.input).toBeTruthy();
    fireEvent.focus(instance!.input!);

    // user may tab or arrow down to the current day (or some other element in the popper)
    const today = safeQuerySelector(div, ".react-datepicker__day--today");
    act(() => {
      today?.focus();
    });

    // user hits Enter
    fireEvent.keyDown(today, getKey(KeyType.Enter));

    expect(instance!.calendar).toBeFalsy();

    await waitFor(() => {
      expect(instance!.state.preventFocus).toBe(false);
      expect(document.activeElement).toBe(div.querySelector("input"));
    });
  });

  it("should not close the popper and keep focus on selected date if showTimeSelect is enabled.", async () => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    let instance: DatePicker | null = null;
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
    expect(instance).toBeTruthy();
    expect(instance!.input).toBeTruthy();
    fireEvent.focus(instance!.input!);

    // user may tab or arrow down to the current day (or some other element in the popper)
    const today = safeQuerySelector(div, ".react-datepicker__day--today");
    act(() => {
      today.focus();
    });

    // user hits Enter
    fireEvent.keyDown(today, getKey(KeyType.Enter));

    expect(instance!.calendar).toBeTruthy();

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
    const input = safeQuerySelector(container, "input");
    const focusSpy = jest.spyOn(input, "focus");

    fireEvent.focus(input);

    const yearSelect = safeQuerySelector(
      container,
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
    const input = safeQuerySelector(container, "input");
    fireEvent.click(input);

    const yearSelect = safeQuerySelector(
      container,
      ".react-datepicker__year-select",
    );
    fireEvent.change(yearSelect, {
      target: {
        value: Array.from(yearSelect.querySelectorAll("option")).at(-2)?.value,
      },
    });
    expect(onYearChangeSpy).toHaveBeenCalled();
  });

  it("should keep the calendar shown when clicking the calendar", () => {
    const { container } = render(<DatePicker />);
    const input = safeQuerySelector(container, "input");
    fireEvent.focus(input);
    fireEvent.click(input);
    expect(container.querySelector(".react-datepicker")).not.toBeNull();
  });

  it("should not set open state when it is disabled and gets clicked.", () => {
    const { container } = render(<DatePicker disabled />);
    const input = safeQuerySelector(container, "input");
    fireEvent.click(input);
    expect(container.querySelector(".react-datepicker")).toBeNull();
  });

  it("should not set open state when it is readOnly and gets clicked", () => {
    const { container } = render(<DatePicker readOnly />);
    const input = safeQuerySelector<HTMLInputElement>(container, "input");
    fireEvent.click(input);
    expect(container.querySelector(".react-datepicker")).toBeNull();
  });

  it("should hide the calendar when clicking a day on the calendar", () => {
    const { container } = render(<DatePicker />);
    const input = safeQuerySelector<HTMLInputElement>(container, "input");
    fireEvent.focus(input);
    const day = safeQuerySelector(container, ".react-datepicker__day");
    fireEvent.click(day);
    expect(container.querySelector(".react-datepicker")).toBeNull();
  });

  it("should not hide the calendar when clicking a day on the calendar and shouldCloseOnSelect prop is false", () => {
    const { container } = render(<DatePicker shouldCloseOnSelect={false} />);
    const input = safeQuerySelector<HTMLInputElement>(container, "input");
    fireEvent.focus(input);
    const day = safeQuerySelector(container, ".react-datepicker__day");
    fireEvent.click(day);
    expect(container.querySelector(".react-datepicker")).not.toBeNull();
  });

  it("should keep focus within calendar when clicking a day on the calendar and shouldCloseOnSelect prop is false", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    render(<DatePicker shouldCloseOnSelect={false} />, {
      container: div,
    });

    // user focuses the input field, the calendar opens
    const dateInput = safeQuerySelector(div, "input");
    fireEvent.focus(dateInput);

    // user may tab or arrow down to the current day (or some other element in the popper)

    const today = safeQuerySelector(div, ".react-datepicker__day--today");
    act(() => {
      today?.focus();
    });

    // user hits Enter
    fireEvent.keyDown(today, getKey(KeyType.Enter));
    expect(document.activeElement).toBe(today);
  });

  it("should set open to true if showTimeInput is true", () => {
    let instance: DatePicker | null = null;
    render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        shouldCloseOnSelect={false}
        showTimeInput
      />,
    );
    expect(instance).toBeTruthy();
    const handleTimeChange = instance!.handleTimeChange;
    act(() => {
      handleTimeChange(newDate());
    });
    expect(instance!.state.open).toBe(true);
  });

  it("should not hide the calendar when selecting a day in the calendar with Enter press, and shouldCloseOnSelect prop is false", () => {
    const data = getOnInputKeyDownStuff({ shouldCloseOnSelect: false });

    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowUp));
    fireEvent.keyDown(data.dateInput, getKey(KeyType.Enter));
    expect(data.instance.state.open).toBe(true);
  });

  it("should update the preSelection state when a day is selected with Enter press", () => {
    const data = getOnInputKeyDownStuff({
      shouldCloseOnSelect: false,
      selected: "2024-06-06",
    });

    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowDown));
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowDown));
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.Enter));

    data.copyM = addWeeks(data.copyM, 2);
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(data.copyM, data.testFormat),
    );
  });

  it("should update the preSelection state when a day is selected with mouse click", () => {
    const data = getOnInputKeyDownStuff({
      shouldCloseOnSelect: false,
    });

    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown)); // put focus on current day
    const today = getSelectedDayNode(data.container); // store current day node
    const dayToClick =
      today?.nextElementSibling || today?.previousElementSibling; // choose next or previous day
    const copyM = today?.nextElementSibling
      ? addDays(data.copyM, 1)
      : subDays(data.copyM, 1); // update copyM to expected date
    expect(dayToClick).toBeTruthy();
    fireEvent.click(dayToClick!); // will update the preSelection
    data.copyM = copyM;

    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(data.copyM, data.testFormat),
    );
  });

  it("should update the preSelection state when Today button is clicked after selecting a different day for inline mode", () => {
    let instance: DatePicker | null = null;
    const { container } = render(
      <DatePicker
        todayButton="Today"
        selected={newDate()}
        inline
        onChange={() => {}}
        ref={(node) => {
          instance = node;
        }}
      />,
    );

    expect(instance).toBeTruthy();
    const today = getSelectedDayNode(container!);
    const anyOtherDay =
      today?.nextElementSibling || today?.previousElementSibling;
    expect(anyOtherDay).toBeTruthy();
    fireEvent.click(anyOtherDay!); // will update the preSelection to next or previous day

    const todayBtn = instance!.calendar?.containerRef.current?.querySelector(
      ".react-datepicker__today-button",
    );
    expect(anyOtherDay).toBeTruthy();
    fireEvent.click(todayBtn!); // will update the preSelection

    expect(instance!.state.preSelection).toBeTruthy();
    expect(formatDate(instance!.state.preSelection!, "yyyy-MM-dd")).toBe(
      formatDate(newDate(), "yyyy-MM-dd"),
    );
  });

  it("should hide the calendar when pressing enter in the date input", () => {
    const { container } = render(<DatePicker />);
    const input = safeQuerySelector(container, "input");
    fireEvent.focus(input);
    fireEvent.keyDown(input, getKey(KeyType.Enter));
    expect(container.querySelector(".react-datepicker")).toBeNull();
  });

  it("should hide the calendar when the pressing escape in the date input", () => {
    const { container } = render(<DatePicker />);
    const input = safeQuerySelector(container, "input");
    fireEvent.focus(input);
    fireEvent.keyDown(input, getKey(KeyType.Escape));
    expect(container.querySelector(".react-datepicker")).toBeNull();
  });

  it("should hide the calendar and keep focus on input when pressing escape in the date input", async () => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    let instance: DatePicker | null = null;
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
    expect(instance).toBeTruthy();
    expect(instance!.input).toBeTruthy();
    fireEvent.focus(instance!.input!);

    fireEvent.keyDown(instance!.input!, getKey(KeyType.Escape));

    expect(instance!.calendar).toBeFalsy();

    await waitFor(() => {
      expect(document.activeElement).toBe(instance!.input);
    });
  });

  it("should auto-close the datepicker and lose focus when Tab key is pressed when the date input is focused", async () => {
    const { container } = render(<DatePicker />);
    const input = safeQuerySelector(container, "input");
    fireEvent.focus(input);

    let reactCalendar = container.querySelector("div.react-datepicker");
    expect(reactCalendar).not.toBeNull();

    fireEvent.keyDown(input, getKey(KeyType.Tab));

    reactCalendar = container.querySelector("div.react-datepicker");
    expect(reactCalendar).toBeNull();
    await waitFor(() => {
      expect(document.activeElement).not.toBe(input);
    });
  });

  it("should hide the calendar when the pressing Shift + Tab in the date input", async () => {
    // eslint-disable-next-line prefer-const
    let onBlurSpy: ReturnType<typeof jest.spyOn>;
    const onBlur: React.FocusEventHandler<HTMLElement> = (
      event: React.FocusEvent<HTMLElement>,
    ): void => {
      onBlurSpy(event);
    };
    const { container } = render(<DatePicker onBlur={onBlur} />);
    const input = safeQuerySelector<HTMLInputElement>(container, "input");
    onBlurSpy = jest.spyOn(input, "blur");
    fireEvent.focus(input);
    fireEvent.keyDown(input, getKey(KeyType.Tab, true));
    expect(container.querySelector(".react-datepicker")).toBeNull();
    await waitFor(() => {
      expect(onBlurSpy).toHaveBeenCalled();
    });
  });

  it("should not apply the default outsideClickIgnoreClass class to the date input when closed", () => {
    const { container } = render(<DatePicker />);
    const input = safeQuerySelector(container, "input");
    expect(input?.classList.contains(OUTSIDE_CLICK_IGNORE_CLASS)).toBe(false);
  });

  it("should apply the default outsideClickIgnoreClass class to date input when open", () => {
    const { container } = render(<DatePicker />);
    const input = safeQuerySelector<HTMLInputElement>(container, "input");
    fireEvent.focus(input);
    expect(input?.classList.contains(OUTSIDE_CLICK_IGNORE_CLASS)).toBe(true);
  });

  it("should apply the outsideClickIgnoreClass class to date input when open", () => {
    const outsideClickIgnoreClass = "ignore-onclickoutside";
    const { container } = render(
      <DatePicker outsideClickIgnoreClass={outsideClickIgnoreClass} />,
    );
    const input = safeQuerySelector<HTMLInputElement>(container, "input");
    fireEvent.focus(input);
    expect(input?.classList.contains(outsideClickIgnoreClass)).toBe(true);
  });

  it("should apply the default outsideClickIgnoreClass when prop is undefined", () => {
    const { container } = render(
      <DatePicker outsideClickIgnoreClass={undefined} />,
    );
    const input = safeQuerySelector<HTMLInputElement>(container, "input");
    fireEvent.focus(input);
    expect(input?.classList.contains(OUTSIDE_CLICK_IGNORE_CLASS)).toBe(true);
  });

  it("should apply the default outsideClickIgnoreClass when prop is falsy", () => {
    const { container } = render(
      <DatePicker outsideClickIgnoreClass={undefined} />,
    );
    const input = safeQuerySelector<HTMLInputElement>(container, "input");
    fireEvent.focus(input);
    expect(input?.classList.contains(OUTSIDE_CLICK_IGNORE_CLASS)).toBe(true);
  });

  it("should toggle the open status of calendar on click of the icon when toggleCalendarOnIconClick is set to true", () => {
    const { container } = render(
      <DatePicker
        selected={newDate("2023-12-17")}
        showIcon
        toggleCalendarOnIconClick
      />,
    );

    const calendarIcon = safeQuerySelector(
      container,
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
        selected={newDate("2023-12-17")}
        showIcon
        toggleCalendarOnIconClick={false}
      />,
    );

    const calendarIcon = safeQuerySelector(
      container,
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
      <DatePicker selected={newDate("2023-12-17")} showIcon />,
    );

    const calendarIcon = container.querySelector(
      ".react-datepicker__calendar-icon",
    );
    expect(
      calendarIcon?.classList.contains(
        "react-datepicker-ignore-onclickoutside",
      ),
    ).toBe(false);
  });

  it("should apply the react-datepicker-ignore-onclickoutside class to calendar icon when open", () => {
    const { container } = render(
      <DatePicker
        selected={newDate("2023-12-17")}
        showIcon
        toggleCalendarOnIconClick
      />,
    );

    let calendarIcon = safeQuerySelector(
      container,
      "svg.react-datepicker__calendar-icon",
    );
    fireEvent.click(calendarIcon);

    calendarIcon = safeQuerySelector(
      container,
      "svg.react-datepicker__calendar-icon",
    );

    expect(
      calendarIcon?.classList.contains(
        "react-datepicker-ignore-onclickoutside",
      ),
    ).toBe(true);
  });

  it("should apply the calendarIconClassName to calendar icon", () => {
    const customClassName = "customClassName";
    const { container } = render(
      <DatePicker
        selected={newDate("2023-12-17")}
        showIcon
        calendarIconClassName={customClassName}
        toggleCalendarOnIconClick
      />,
    );

    const calendarIcon = container.querySelector(
      "svg.react-datepicker__calendar-icon",
    );

    expect(calendarIcon?.classList.contains(customClassName)).toBe(true);
  });

  it("should not apply the calendarIconClassname to calendar icon with calendarIconClassName", () => {
    const customClassName = "customClassName";
    const customClassname = "customClassname";
    const { container } = render(
      <DatePicker
        selected={newDate("2023-12-17")}
        showIcon
        calendarIconClassName={customClassName}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        calendarIconClassname={customClassname}
        toggleCalendarOnIconClick
      />,
    );

    const calendarIcon = container.querySelector(
      "svg.react-datepicker__calendar-icon",
    );

    expect(calendarIcon?.classList.contains(customClassName)).toBe(true);
    expect(calendarIcon?.classList.contains(customClassname)).toBe(false);
  });

  it("should apply the calendarIconClassname to calendar icon without calendarIconClassName", () => {
    const customClassname = "customClassName";
    const { container } = render(
      <DatePicker
        selected={newDate("2023-12-17")}
        showIcon
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        calendarIconClassname={customClassname}
        toggleCalendarOnIconClick
      />,
    );

    const calendarIcon = container.querySelector(
      "svg.react-datepicker__calendar-icon",
    );

    expect(calendarIcon?.classList.contains(customClassname)).toBe(true);
  });

  it("should set the type attribute on the clear button to button", () => {
    const { container } = render(
      <DatePicker selected={newDate("2015-12-15")} isClearable />,
    );
    const clearButton = container.querySelector<HTMLButtonElement>(
      ".react-datepicker__close-icon",
    );
    expect(clearButton?.type).toBe("button");
  });

  it("should allow clearing the date when isClearable is true", () => {
    let cleared = false;
    function handleChange(d: Date | null) {
      if (d === null) {
        cleared = true;
      }
    }
    const { container } = render(
      <DatePicker
        selected={newDate("2015-12-15")}
        isClearable
        onChange={handleChange}
      />,
    );

    const clearButton = safeQuerySelector(
      container,
      ".react-datepicker__close-icon",
    );
    fireEvent.click(clearButton);
    expect(cleared).toBe(true);
  });

  it("should clear input value in the local state", () => {
    let instance: DatePicker | null = null;
    const { container } = render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        selected={newDate("2015-12-15")}
        isClearable
      />,
    );
    expect(instance).toBeTruthy();

    const clearButton = safeQuerySelector(
      container,
      ".react-datepicker__close-icon",
    );
    fireEvent.click(clearButton);
    expect(instance!.state.inputValue).toBeNull();
  });

  it("should disable the clear button when the component is disabled", () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <DatePicker
        ariaLabelClose="clear"
        disabled
        selected={newDate("2023-11-25")}
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
      <DatePicker selected={newDate("2015-12-15")} isClearable />,
      {
        container: div,
      },
    );

    const clearButton = safeQuerySelector(
      container,
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
        selected={newDate("2018-03-19")}
        isClearable
        clearButtonTitle="clear button"
      />,
    );
    const clearButton = container.querySelector(
      ".react-datepicker__close-icon",
    );
    expect(clearButton?.getAttribute("title")).toBe("clear button");
  });

  it("should customize the className attribute on the clear button if clearButtonClassName is supplied", () => {
    const className = "customized-close-icon";
    const { container } = render(
      <DatePicker
        selected={newDate("2021-04-15")}
        isClearable
        clearButtonClassName={className}
      />,
    );
    expect(
      container
        .querySelector(".react-datepicker__close-icon")
        ?.classList.contains(className),
    ).toBeTruthy();
  });

  it("should save time from the selected date during day change", () => {
    const selected = newDate("2015-12-20 10:11:12");
    let date: Date | null = null;

    const { container } = render(
      <DatePicker
        inline
        selected={selected}
        onChange={(d) => {
          date = d;
        }}
      />,
    );

    const dayButton = safeQuerySelector(container, ".react-datepicker__day");
    fireEvent.click(dayButton);

    expect(date).toBeTruthy();
    expect(getHours(date!)).toBe(10);
    expect(getMinutes(date!)).toBe(11);
    expect(getSeconds(date!)).toBe(12);
  });

  it("should save time from the selected date during date change", () => {
    const selected = newDate("2015-12-20 10:11:12");
    let date: Date | null = null;

    const { container } = render(
      <DatePicker
        selected={selected}
        onChange={(d) => {
          date = d;
        }}
      />,
    );
    const input = safeQuerySelector<HTMLInputElement>(container, "input");
    fireEvent.change(input, {
      target: {
        value: "01/02/2014",
      },
    });

    expect(date).toBeTruthy();
    expect(getHours(date!)).toBe(10);
    expect(getMinutes(date!)).toBe(11);
    expect(getSeconds(date!)).toBe(12);
  });

  it("should mount and unmount properly", () => {
    type State = {
      mounted: boolean;
    };
    class TestComponent extends React.Component<object, State> {
      constructor(props: object) {
        super(props);
        this.state = { mounted: true };
      }

      render() {
        return this.state.mounted ? <DatePicker /> : null;
      }
    }
    let instance: TestComponent | null = null;
    const { rerender } = render(
      <TestComponent
        ref={(node) => {
          instance = node;
        }}
      />,
    );
    expect(instance).toBeTruthy();
    act(() => {
      (instance!.state as unknown as { mounted: boolean }).mounted = false;
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

    const input = safeQuerySelector<HTMLInputElement>(container, "input");
    fireEvent.focus(input);

    expect(
      document.body.querySelector(".react-datepicker__portal"),
    ).not.toBeNull();
    expect(container.querySelector(".react-datepicker")).not.toBeNull();
  });

  it("should render Calendar in portal when withPortal is set and should close on Escape key when focus is on header", () => {
    let instance: DatePicker | null = null;
    render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        withPortal
        portalId="portal-id-dom-test"
      />,
    );
    expect(instance).toBeTruthy();
    expect(instance!.input).toBeTruthy();
    fireEvent.focus(instance!.input!);

    expect(
      document.body.querySelector(".react-datepicker__portal"),
    ).not.toBeNull();
    expect(instance!.calendar).toBeDefined();

    const header = instance!.calendar?.containerRef.current?.querySelector(
      ".react-datepicker__current-month",
    );

    expect(header).toBeTruthy();
    fireEvent.click(header!);
    fireEvent.keyDown(header!, getKey(KeyType.Escape));

    expect(instance!.calendar).toBeFalsy();
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

    const input = safeQuerySelector<HTMLInputElement>(container, "input");
    fireEvent.focus(input);

    expect(document.body.querySelector("#portal-id-dom-test")).not.toBeNull();
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getOnInputKeyDownStuff(opts: { [key: string]: any } = {}) {
    const m = newDate(opts.selected);
    const copyM = newDate(m);
    const testFormat = "yyyy-MM-dd";
    const exactishFormat = "yyyy-MM-dd hh: zzzz";
    const callback = jest.fn();
    const onInputErrorCallback = jest.fn();
    let instance: DatePicker | null = null;

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
    expect(instance).toBeTruthy();
    expect(instance!.input).toBeTruthy();
    const dateInput = instance!.input!;
    const dateCalendar = instance!.calendar;
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
      instance: instance!,
      container,
    };
  }
  it("should handle onDayKeyDown ArrowLeft", () => {
    const data = getOnInputKeyDownStuff();
    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowLeft));
    data.copyM = subDays(data.copyM, 1);
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(data.copyM, data.testFormat),
    );
  });
  it("should handle onDayKeyDown ArrowRight", () => {
    const data = getOnInputKeyDownStuff();
    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowRight));
    data.copyM = addDays(data.copyM, 1);
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(data.copyM, data.testFormat),
    );
  });
  it("should handle onDayKeyDown ArrowUp", () => {
    const data = getOnInputKeyDownStuff();
    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowUp));
    data.copyM = subWeeks(data.copyM, 1);
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(data.copyM, data.testFormat),
    );
  });
  it("should handle onDayKeyDown ArrowDown", () => {
    const data = getOnInputKeyDownStuff();
    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowDown));
    data.copyM = addWeeks(data.copyM, 1);
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(data.copyM, data.testFormat),
    );
  });
  it("should handle onDayKeyDown PageUp", () => {
    const data = getOnInputKeyDownStuff();
    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.PageUp));
    data.copyM = subMonths(data.copyM, 1);
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(data.copyM, data.testFormat),
    );
  });
  it("should handle onDayKeyDown Shift+PageUp", () => {
    const data = getOnInputKeyDownStuff();

    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.PageUp, true));

    data.copyM = subYears(data.copyM, 1);

    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(data.copyM, data.testFormat),
    );
  });
  it("should handle onDayKeyDown PageDown", () => {
    const data = getOnInputKeyDownStuff();
    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.PageDown));
    data.copyM = addMonths(data.copyM, 1);
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(data.copyM, data.testFormat),
    );
  });
  it("should handle onDayKeyDown Shift+PageDown", () => {
    const data = getOnInputKeyDownStuff();

    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.PageDown, true));

    data.copyM = addYears(data.copyM, 1);

    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(data.copyM, data.testFormat),
    );
  });
  it("should handle onDayKeyDown End", () => {
    const data = getOnInputKeyDownStuff();
    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.End));
    data.copyM = getEndOfWeek(data.copyM);
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(data.copyM, data.testFormat),
    );
  });
  it("should handle onDayKeyDown Home", () => {
    const data = getOnInputKeyDownStuff();
    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.Home));
    data.copyM = getStartOfWeek(data.copyM);
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(data.copyM, data.testFormat),
    );
  });

  it("should handle onDayKeyDown when the minDate is null", () => {
    const data = getOnInputKeyDownStuff({ minDate: null });
    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowLeft));

    data.copyM = subDays(data.copyM, 1);
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(data.copyM, data.testFormat),
    );
  });

  it("should handle onDayKeyDown when the maxDate is null", () => {
    const data = getOnInputKeyDownStuff({ minDate: null });
    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowRight));

    data.copyM = addDays(data.copyM, 1);
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(data.copyM, data.testFormat),
    );
  });

  it("should handle onDayKeyDown when both the minDate and the maxDate is null", () => {
    const data = getOnInputKeyDownStuff({ minDate: null });
    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));

    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowLeft));
    data.copyM = subDays(data.copyM, 1);
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(data.copyM, data.testFormat),
    );
    (selectedDayNode as HTMLElement).focus();
    fireEvent.keyDown(
      document.activeElement || document.body,
      getKey(KeyType.ArrowRight),
    );
    data.copyM = addDays(data.copyM, 1);
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(data.copyM, data.testFormat),
    );
  });

  // excluded stuff
  it("should skip over excluded date when ArrowRight is pressed", () => {
    const date = new Date("2024-05-01");
    const data = getOnInputKeyDownStuff({
      excludeDates: [new Date("2024-05-02")],
      selected: date,
      preSelection: date,
    });

    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowRight));
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(new Date("2024-05-03"), data.testFormat),
    );
  });

  it("should skip over excluded date when ArrowLeft is pressed", () => {
    const date = new Date("2024-05-01");
    const data = getOnInputKeyDownStuff({
      excludeDates: [new Date("2024-04-30")],
      selected: date,
      preSelection: date,
    });

    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowLeft));
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(new Date("2024-04-29"), data.testFormat),
    );
  });

  it("should skip over excluded date when ArrowUp is pressed", () => {
    const date = new Date("2024-05-22");
    const data = getOnInputKeyDownStuff({
      excludeDates: [new Date("2024-05-15")],
      selected: date,
      preSelection: date,
    });

    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowUp));
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(new Date("2024-05-08"), data.testFormat),
    );
  });

  it("should skip over excluded date when ArrowDown is pressed", () => {
    const date = new Date("2024-05-08");
    const data = getOnInputKeyDownStuff({
      excludeDates: [new Date("2024-05-15")],
      selected: date,
      preSelection: date,
    });

    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowDown));
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(new Date("2024-05-22"), data.testFormat),
    );
  });

  it("using keyboard, should not navigate to dates before minDate with ArrowLeft", () => {
    const date = new Date("2024-05-01");
    const data = getOnInputKeyDownStuff({
      minDate: date,
      selected: date,
      preSelection: date,
    });

    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowLeft));
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(date, data.testFormat),
    );
  });

  it("using keyboard, should not navigate to dates after maxDate with ArrowRight", () => {
    const date = new Date("2024-05-01");
    const data = getOnInputKeyDownStuff({
      maxDate: date,
      selected: date,
      preSelection: date,
    });

    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowRight));
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(date, data.testFormat),
    );
  });

  it("using keyboard, should not navigate to dates before minDate with PageUp and Home", () => {
    const date = new Date("2024-05-01");
    const data = getOnInputKeyDownStuff({
      minDate: date,
      selected: date,
      preSelection: date,
    });

    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.PageUp));
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(date, data.testFormat),
    );
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.Home));
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(date, data.testFormat),
    );
  });

  it("using keyboard, with PageUp pressed, should navigate to the date after the excluded date", () => {
    const date = new Date("2024-05-01");
    const data = getOnInputKeyDownStuff({
      excludeDates: [new Date("2024-04-01")],
      selected: date,
      preSelection: date,
    });

    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.PageUp));
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(new Date("2024-04-02"), data.testFormat),
    );
  });

  it("using keyboard, with Home pressed, should navigate to the date after the excluded date", () => {
    const date = new Date("2024-05-11");
    const data = getOnInputKeyDownStuff({
      excludeDates: [new Date("2024-05-05")],
      selected: date,
      preSelection: date,
    });

    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.Home));
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(new Date("2024-05-06"), data.testFormat),
    );
  });

  it("using keyboard, should not navigate to dates after maxDate with PageDown and End", () => {
    const date = new Date("2024-05-01");
    const data = getOnInputKeyDownStuff({
      maxDate: date,
      selected: date,
      preSelection: date,
    });

    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.PageDown));
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(date, data.testFormat),
    );
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.End));
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(date, data.testFormat),
    );
  });

  it("using keyboard, with PageDown pressed, should navigate to the date before the excluded date", () => {
    const date = new Date("2024-05-01");
    const data = getOnInputKeyDownStuff({
      excludeDates: [new Date("2024-06-01")],
      selected: date,
      preSelection: date,
    });

    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.PageDown));
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(new Date("2024-05-31"), data.testFormat),
    );
  });

  it("using keyboard, with End pressed, should navigate to the date before the excluded date", () => {
    const date = new Date("2024-05-05");
    const data = getOnInputKeyDownStuff({
      excludeDates: [new Date("2024-05-11")],
      selected: date,
      preSelection: date,
    });

    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.End));
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(new Date("2024-05-10"), data.testFormat),
    );
  });

  it("using keyboard, should not navigate to excluded date when excluded date and minDate are the same (edge case)", () => {
    const date = new Date("2024-05-03");
    const data = getOnInputKeyDownStuff({
      minDate: new Date("2024-05-02"),
      excludeDates: [new Date("2024-05-02")],
      selected: date,
      preSelection: date,
    });

    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.PageUp));
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(date, data.testFormat),
    );
  });

  it("using keyboard, should not navigate to excluded date when excluded date and maxDate are the same (edge case)", () => {
    const date = new Date("2024-05-03");
    const data = getOnInputKeyDownStuff({
      maxDate: new Date("2024-05-04"),
      excludeDates: [new Date("2024-05-04")],
      selected: date,
      preSelection: date,
    });

    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.PageDown));
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(date, data.testFormat),
    );
  });

  it("using keyboard, should not navigate to any date when there are no dates enabled (edge case)", () => {
    const date = new Date("2024-05-03");
    const data = getOnInputKeyDownStuff({
      minDate: date,
      maxDate: date,
      excludeDates: [date],
      selected: date,
      preSelection: date,
    });

    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.PageDown));
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(date, data.testFormat),
    );
  });

  it("should call onMonthChange when keyboard navigation moves preSelection to different month", () => {
    const onMonthChangeSpy = jest.fn();
    const opts = { onMonthChange: onMonthChangeSpy };
    const data = getOnInputKeyDownStuff(opts);
    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.PageDown));

    expect(onMonthChangeSpy).toHaveBeenCalledTimes(1);
  });
  it("should call onSelect only once when keyboard navigation moves selection to different month", () => {
    const onSelectSpy = jest.fn();
    const opts = { onSelect: onSelectSpy, adjustDateOnChange: true };
    const data = getOnInputKeyDownStuff(opts);
    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.PageDown));
    expect(onSelectSpy).toHaveBeenCalledTimes(1);
  });
  it("should not preSelect date if not between minDate and maxDate", () => {
    const data = getOnInputKeyDownStuff({
      minDate: subDays(newDate(), 1),
      maxDate: addDays(newDate(), 1),
    });
    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(data.copyM, data.testFormat),
    );
  });
  it("should not preSelect date if before minDate", () => {
    const data = getOnInputKeyDownStuff({
      minDate: subDays(newDate(), 1),
    });
    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowUp));
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(data.copyM, data.testFormat),
    );
  });
  it("should not preSelect date if after maxDate", () => {
    const data = getOnInputKeyDownStuff({
      maxDate: addDays(newDate(), 1),
    });
    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(data.copyM, data.testFormat),
    );
  });

  it("should be possible to preSelect minDate (no maxDate set)", () => {
    const minDate = new Date("2024-10-02");
    const selected = minDate;

    const data = getOnInputKeyDownStuff({
      selected,
      minDate,
    });
    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowRight));
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowLeft));
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(data.instance.props.minDate).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(data.instance.props.minDate!, data.testFormat),
    );
  });

  it("should be possible to preSelect minDate (maxDate set)", () => {
    const minDate = new Date("2024-10-02");
    const maxDate = addDays(minDate, 20);
    const selected = minDate;

    const data = getOnInputKeyDownStuff({
      selected,
      minDate,
      maxDate,
    });
    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowRight));
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowLeft));
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(data.instance.props.minDate).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(data.instance.props.minDate!, data.testFormat),
    );
  });

  it("should be possible to preSelect maxDate (no minDate set)", () => {
    const data = getOnInputKeyDownStuff({
      maxDate: addDays(newDate(), 1),
    });
    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowRight));
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(data.instance.props.maxDate).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(data.instance.props.maxDate!, data.testFormat),
    );
  });

  it("should be possible to preSelect maxDate (minDate set)", () => {
    const data = getOnInputKeyDownStuff({
      minDate: subDays(newDate(), 20),
      maxDate: addDays(newDate(), 1),
    });
    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowRight));
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(data.instance.props.maxDate).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(data.instance.props.maxDate!, data.testFormat),
    );
  });

  it("should not clear the preSelect date when a pressed key is not a navigation key", () => {
    const data = getOnInputKeyDownStuff();
    fireEvent.keyDown(data.dateInput, getKey(KeyType.X));
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(data.instance.state.preSelection!.valueOf()).toBe(
      data.copyM.valueOf(),
    );
  });

  describe("when update the datepicker input text while props.minDate is set", () => {
    const getCalendar = () => {
      return render(
        <DatePicker
          selected={new Date("1993-07-02")}
          minDate={new Date("1800-01-01")}
          open
        />,
      );
    };

    it("should auto update calendar when the updated date text is after props.minDate", () => {
      const { container } = getCalendar();
      const input = safeQuerySelector<HTMLInputElement>(container, "input");
      fireEvent.change(input, {
        target: {
          value: "01/01/1801",
        },
      });

      expect(container.querySelector("input")?.value).toBe("01/01/1801");
      expect(
        container.querySelector(".react-datepicker__current-month")?.innerHTML,
      ).toBe("January 1801");
    });

    it("should not auto update calendar when the updated date text is before props.minDate", () => {
      const { container } = getCalendar();
      const input = safeQuerySelector<HTMLInputElement>(container, "input");

      fireEvent.change(input, {
        target: {
          value: "1799/01/01",
        },
      });

      expect(
        container.querySelector(".react-datepicker__current-month")?.innerHTML,
      ).toBe("July 1993");
    });
  });

  it("should not manual select date if before minDate", () => {
    const minDate = subDays(newDate(), 1);
    const data = getOnInputKeyDownStuff({
      minDate: minDate,
    });
    fireEvent.change(data.dateInput, {
      target: {
        value: formatDate(subDays(minDate, 1), data.testFormat),
      },
    });
    fireEvent.keyDown(data.dateInput, getKey(KeyType.Enter));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should not manual select date if after maxDate", () => {
    const maxDate = addDays(newDate(), 1);
    const data = getOnInputKeyDownStuff({
      maxDate: maxDate,
    });
    fireEvent.change(data.dateInput, {
      target: {
        value: formatDate(addDays(maxDate, 1), data.testFormat),
      },
    });
    fireEvent.keyDown(data.dateInput, getKey(KeyType.Enter));
    expect(data.callback).not.toHaveBeenCalled();
  });
  describe("onInputKeyDown Enter", () => {
    it("should update the selected date", () => {
      const data = getOnInputKeyDownStuff();
      fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown)); // puts focus on the calendar day
      const selectedDayNode = getSelectedDayNode(data.container);
      expect(selectedDayNode).toBeTruthy();
      fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowLeft));
      expect(selectedDayNode).toBeTruthy();
      (selectedDayNode as HTMLElement).focus();
      fireEvent.keyDown(
        document.activeElement || document.body,
        getKey(KeyType.Enter),
      );

      data.copyM = subDays(data.copyM, 1);
      expect(data.callback).toHaveBeenCalled();
      const result = data.callback.mock.calls[0][0];
      expect(formatDate(result, data.testFormat)).toBe(
        formatDate(data.copyM, data.testFormat),
      );
    });
    it("should update the selected date when spacebar is pressed", () => {
      const data = getOnInputKeyDownStuff();
      fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown)); // puts focus on the calendar day
      const selectedDayNode = getSelectedDayNode(data.container);
      expect(selectedDayNode).toBeTruthy();
      fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowLeft));
      expect(selectedDayNode).toBeTruthy();
      (selectedDayNode as HTMLElement).focus();
      fireEvent.keyDown(
        document.activeElement || document.body,
        getKey(KeyType.Space),
      );

      data.copyM = subDays(data.copyM, 1);
      expect(data.callback).toHaveBeenCalled();
      const result = data.callback.mock.calls[0][0];
      expect(formatDate(result, data.testFormat)).toBe(
        formatDate(data.copyM, data.testFormat),
      );
    });
    it("should update the selected date on manual input", () => {
      const data = getOnInputKeyDownStuff();
      fireEvent.change(data.dateInput, {
        target: { value: "2017-02-02" },
      });
      fireEvent.keyDown(data.dateInput, getKey(KeyType.Enter));
      data.copyM = newDate("2017-02-02");
      expect(formatDate(data.callback.mock.calls[0][0], data.testFormat)).toBe(
        formatDate(data.copyM, data.testFormat),
      );
    });
    it("should not select excludeDates", () => {
      const data = getOnInputKeyDownStuff({
        excludeDates: [subDays(newDate(), 1)],
      });
      fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowLeft));
      fireEvent.keyDown(data.dateInput, getKey(KeyType.Enter));
      expect(data.callback).not.toHaveBeenCalled();
    });
    describe("with excludeDateIntervals", () => {
      it("should not select the start date of the interval", () => {
        const data = getOnInputKeyDownStuff({
          excludeDateIntervals: [
            {
              start: subDays(newDate(), 1),
              end: addDays(newDate(), 1),
            },
          ],
        });
        fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowLeft));
        fireEvent.keyDown(data.dateInput, getKey(KeyType.Enter));
        expect(data.callback).not.toHaveBeenCalled();
      });
      it("should not select a dates within the interval", () => {
        const data = getOnInputKeyDownStuff({
          excludeDateIntervals: [
            {
              start: subDays(newDate(), 1),
              end: addDays(newDate(), 1),
            },
          ],
        });
        fireEvent.keyDown(data.dateInput, getKey(KeyType.Enter));
        expect(data.callback).not.toHaveBeenCalled();
      });
      it("should not select the end date of the interval", () => {
        const data = getOnInputKeyDownStuff({
          excludeDateIntervals: [
            {
              start: subDays(newDate(), 1),
              end: addDays(newDate(), 1),
            },
          ],
        });
        fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowRight));
        fireEvent.keyDown(data.dateInput, getKey(KeyType.Enter));
        expect(data.callback).not.toHaveBeenCalled();
      });
    });
    it("should not select dates excluded from filterDate", () => {
      const data = getOnInputKeyDownStuff({
        filterDate: (date: Date) =>
          getDay(date) !== getDay(subDays(newDate(), 1)),
      });
      fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowLeft));
      fireEvent.keyDown(data.dateInput, getKey(KeyType.Enter));
      expect(data.callback).not.toHaveBeenCalled();
    });
  });
  describe("onInputKeyDown Escape", () => {
    it("should not update the selected date if the date input manually it has something wrong", () => {
      const data = getOnInputKeyDownStuff();
      const preSelection = data.instance.state.preSelection;
      fireEvent.keyDown(data.dateInput, getKey(KeyType.Backspace));
      fireEvent.keyDown(data.dateInput, getKey(KeyType.Escape));
      expect(data.callback).not.toHaveBeenCalled(); // confirms that handleChange occurred
      expect(preSelection).toBe(data.instance.state.preSelection); // confirms the preSelection is still the same
    });
  });
  it("should reset the keyboard selection when closed", () => {
    const data = getOnInputKeyDownStuff();
    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowLeft));
    act(() => {
      data.instance.setOpen(false);
    });
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(data.copyM, data.testFormat),
    );
  });
  it("should retain the keyboard selection when already open", () => {
    const data = getOnInputKeyDownStuff();
    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    const selectedDayNode = getSelectedDayNode(data.container);
    expect(selectedDayNode).toBeTruthy();
    fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowLeft));
    data.copyM = subDays(data.copyM, 1);
    expect(data.instance.state.preSelection).toBeTruthy();
    expect(formatDate(data.instance.state.preSelection!, data.testFormat)).toBe(
      formatDate(data.copyM, data.testFormat),
    );
  });
  it("should open the calendar when the down arrow key is pressed", () => {
    const data = getOnInputKeyDownStuff();
    act(() => {
      data.instance.setOpen(false);
    });
    expect(data.instance.state.open).toBe(false);
    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    expect(data.instance.state.open).toBe(true);
  });
  it("should focus first month when the down arrow key is pressed", async () => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    render(<DatePicker showMonthYearPicker />, {
      container: div,
    });

    // user focuses the input field, the calendar opens
    const dateInput = safeQuerySelector(div, "input");
    fireEvent.focus(dateInput);
    fireEvent.keyDown(dateInput, getKey(KeyType.ArrowDown));

    await waitFor(() => {
      const selectedMonth = div.querySelector(
        '.react-datepicker__month-text[tabindex="0"]',
      );
      expect(document.activeElement).toBe(selectedMonth);
    });
  });
  it("should not open the calendar when the left arrow key is pressed", () => {
    const data = getOnInputKeyDownStuff();
    act(() => {
      data.instance.setOpen(false);
    });
    expect(data.instance.state.open).toBe(false);
    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowLeft));
    expect(data.instance.state.open).toBe(false);
  });
  it("should default to the current day on Enter", () => {
    const data = getOnInputKeyDownStuff({ selected: null });
    fireEvent.keyDown(data.dateInput, getKey(KeyType.Enter));
    expect(data.callback).toHaveBeenCalledTimes(1);
    const selected = data.callback.mock.calls[0][0];
    expect(formatDate(selected, data.exactishFormat)).toBe(
      formatDate(data.copyM, data.exactishFormat),
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
  it("should autoFocus the input when calling the setFocus method", async () => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    let instance: DatePicker | null = null;
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
    expect(instance).toBeTruthy();
    act(() => {
      instance!.setFocus();
    });
    await waitFor(() => {
      expect(div.querySelector("input")).toBe(document.activeElement);
    });
  });
  it("should clear preventFocus timeout id when component is unmounted", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    let instance: DatePicker | null = null;
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
    expect(instance).toBeTruthy();
    const clearPreventFocusTimeoutMock = jest.fn();
    instance!.clearPreventFocusTimeout = clearPreventFocusTimeoutMock;
    unmount();
    expect(clearPreventFocusTimeoutMock).toHaveBeenCalledTimes(1);
  });

  function getOnInputKeyDownDisabledKeyboardNavigationStuff() {
    const m = newDate();
    const copyM = newDate(m);
    const testFormat = "yyyy-MM-dd";
    const callback = jest.fn();
    let instance: DatePicker | null = null;
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
    expect(instance).toBeTruthy();
    expect(instance!.input).toBeTruthy();
    const dateInput = instance!.input!;
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
    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowLeft));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should not handle onInputKeyDown ArrowRight", () => {
    const data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowRight));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should not handle onInputKeyDown ArrowUp", () => {
    const data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowUp));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should not handle onInputKeyDown ArrowDown", () => {
    const data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should not handle onInputKeyDown PageUp", () => {
    const data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    fireEvent.keyDown(data.dateInput, getKey(KeyType.PageUp));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should not handle onInputKeyDown PageDown", () => {
    const data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    fireEvent.keyDown(data.dateInput, getKey(KeyType.PageDown));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should not handle onInputKeyDown Home", () => {
    const data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    fireEvent.keyDown(data.dateInput, getKey(KeyType.Home));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should not handle onInputKeyDown End", () => {
    const data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    fireEvent.keyDown(data.dateInput, getKey(KeyType.End));
    expect(data.callback).not.toHaveBeenCalled();
  });
  it("should correctly clear date with empty input string", () => {
    let cleared = false;
    function handleChange(d: Date | null) {
      // Internally DateInput calls it's onChange prop with null
      // when the input value is an empty string
      if (d === null) {
        cleared = true;
      }
    }
    const { container } = render(
      <DatePicker selected={newDate("2016-11-22")} onChange={handleChange} />,
    );
    const input = safeQuerySelector(container, "input");
    fireEvent.change(input, {
      target: {
        value: "",
      },
    });
    expect(cleared).toBe(true);
  });
  it("should correctly clear date with empty input string (selectsRange)", () => {
    let instance: DatePicker | null = null;
    const onChangeSpy = jest.fn();

    render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        selectsRange
        startDate={newDate("2016-11-22")}
        endDate={undefined}
        onChange={onChangeSpy}
        isClearable
      />,
    );
    expect(instance).toBeTruthy();
    expect(instance!.input).toBeTruthy();
    fireEvent.change(instance!.input!, {
      target: {
        value: "",
      },
    });

    expect(onChangeSpy.mock.calls.at(-1)[0]).toStrictEqual([null, null]);
  });
  it("should correctly update the input when the value prop changes", () => {
    let instance: DatePicker | null = null;
    const { rerender } = render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
      />,
    );
    expect(instance).toBeTruthy();
    expect(instance!.input).toBeTruthy();
    expect((instance!.input! as HTMLInputElement).value).toBe("");
    rerender(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        value="foo"
      />,
    );
    expect((instance!.input! as HTMLInputElement).value).toBe("foo");
  });
  it("should preserve user input as they are typing", () => {
    let instance: DatePicker | null = null;
    let selected: Date | null = null;

    const onChange = (date: Date | null) => {
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

    expect(instance).toBeTruthy();
    expect(instance!.input).toBeTruthy();
    expect((instance!.input! as HTMLInputElement).value).toBe("");

    const str = "12/30/1982";
    fireEvent.focus(instance!.input!);
    str.split("").forEach((c, i) => {
      fireEvent.change(instance!.input!, {
        target: { value: (instance!.input! as HTMLInputElement).value + c },
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
      expect((instance!.input! as HTMLInputElement).value).toBe(
        str.substring(0, i + 1),
      );
    });
    expect(selected).not.toBeNull();
    expect(formatDate(selected as unknown as Date, "yyyy-MM-dd")).toBe(
      "1982-12-30",
    );
  });
  it("should invoke provided onChangeRaw function and should not invoke provided onSelect function on manual input change", () => {
    const inputValue = "test";
    const onChangeRawSpy = jest.fn();
    const onSelectSpy = jest.fn();
    const { container } = render(
      <DatePicker
        selected={newDate()}
        onChange={jest.fn()}
        onChangeRaw={onChangeRawSpy}
        onSelect={onSelectSpy}
      />,
    );
    expect(onChangeRawSpy).not.toHaveBeenCalled();
    expect(onSelectSpy).not.toHaveBeenCalled();
    const input = safeQuerySelector(container, "input");
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
        selected={newDate()}
        onChange={jest.fn()}
        onChangeRaw={onChangeRawSpy}
        onSelect={onSelectSpy}
      />,
    );
    expect(onChangeRawSpy).not.toHaveBeenCalled();
    expect(onSelectSpy).not.toHaveBeenCalled();
    const input = safeQuerySelector(container, "input");
    fireEvent.focus(input);
    const day = safeQuerySelector(container, ".react-datepicker__day");
    fireEvent.click(day);
    expect(onChangeRawSpy).toHaveBeenCalledTimes(1);
    expect(onSelectSpy).toHaveBeenCalledTimes(1);
  });
  it("should allow onChangeRaw to prevent a change", () => {
    const onChangeRaw = (
      event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    ) =>
      event &&
      (event.target as unknown as HTMLInputElement).value > "2" &&
      event.preventDefault();
    const { container } = render(<DatePicker onChangeRaw={onChangeRaw} />);
    const input = safeQuerySelector<HTMLInputElement>(container, "input");
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
        selected={newDate()}
        onChange={jest.fn()}
        customInput={<CustomInput />}
        onChangeRaw={onChangeRawSpy}
      />,
    );
    expect(onChangeRawSpy).not.toHaveBeenCalled();
    const input = safeQuerySelector(container, "input");
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
    const customInput = (
      <CustomInput onChangeArgs={(event) => [event, event.target.value]} />
    );
    const { container } = render(
      <DatePicker
        selected={newDate()}
        onChange={jest.fn()}
        customInput={customInput}
        onChangeRaw={onChangeRawSpy}
      />,
    );
    expect(onChangeRawSpy).not.toHaveBeenCalled();
    const input = safeQuerySelector(container, "input");
    fireEvent.change(input, {
      target: {
        value: inputValue,
      },
    });
    expect(onChangeRawSpy).toHaveBeenCalled();
    expect(onChangeRawSpy.mock.calls[0][1]).toBe("test");
  });
  it("should handle a click outside of the calendar", () => {
    let instance: DatePicker | null = null;
    render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        selected={newDate()}
        withPortal
      />,
    );
    expect(instance).toBeTruthy();
    const openSpy = jest.spyOn(instance!, "setOpen");
    act(() => {
      instance!.handleCalendarClickOutside({
        preventDefault: jest.fn(),
      } as unknown as MouseEvent);
    });
    expect(openSpy).toHaveBeenCalledWith(false);
  });

  it("should close date picker on outside click", () => {
    const onClickOutsideSpy = jest.fn();
    const { container } = render(
      <div>
        <span className="testText">test text</span>
        <DatePicker onClickOutside={onClickOutsideSpy} />
      </div>,
    );
    expect(container.querySelector(".react-datepicker")).toBeNull();

    const input = safeQuerySelector(container, "input");
    fireEvent.focus(input);

    expect(container.querySelector(".react-datepicker")).not.toBeNull();

    const testText = safeQuerySelector(container, ".testText");
    fireEvent.mouseDown(testText);

    expect(container.querySelector(".react-datepicker")).toBeNull();
    expect(onClickOutsideSpy).toHaveBeenCalledTimes(1);
  });

  it("should not close date picker on input click", () => {
    const onClickOutsideSpy = jest.fn();
    const { container } = render(
      <DatePicker onClickOutside={onClickOutsideSpy} />,
    );
    expect(container.querySelector(".react-datepicker")).toBeNull();
    const input = safeQuerySelector(container, "input");
    fireEvent.focus(input);
    expect(container.querySelector(".react-datepicker")).not.toBeNull();

    fireEvent.mouseDown(input);
    expect(container.querySelector(".react-datepicker")).not.toBeNull();
    expect(onClickOutsideSpy).not.toHaveBeenCalled();
  });

  it("should default to the currently selected date", () => {
    let instance: DatePicker | null = null;
    render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        selected={newDate("1988-12-30")}
      />,
    );
    expect(instance).toBeTruthy();
    expect(instance!.state.preSelection).toBeTruthy();
    expect(formatDate(instance!.state.preSelection!, "yyyy-MM-dd")).toBe(
      "1988-12-30",
    );
  });
  it("should default to the start date when selecting an end date", () => {
    let instance: DatePicker | null = null;
    render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        startDate={newDate("1988-11-30")}
        selectsEnd
      />,
    );
    expect(instance).toBeTruthy();
    expect(instance!.state.preSelection).toBeTruthy();
    expect(formatDate(instance!.state.preSelection!, "yyyy-MM-dd")).toBe(
      "1988-11-30",
    );
  });
  it("should default to the end date when selecting a start date", () => {
    let instance: DatePicker | null = null;
    render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        endDate={newDate("1988-12-31")}
        selectsStart
      />,
    );
    expect(instance).toBeTruthy();
    expect(instance!.state.preSelection).toBeTruthy();
    expect(formatDate(instance!.state.preSelection!, "yyyy-MM-dd")).toBe(
      "1988-12-31",
    );
  });
  it("should default to a date <= maxDate", () => {
    let instance: DatePicker | null = null;
    render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        maxDate={newDate("1982-01-01")}
      />,
    );
    expect(instance).toBeTruthy();
    expect(instance!.state.preSelection).toBeTruthy();
    expect(formatDate(instance!.state.preSelection!, "yyyy-MM-dd")).toBe(
      "1982-01-01",
    );
  });
  it("should default to a date >= minDate", () => {
    let instance: DatePicker | null = null;
    render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        minDate={newDate("2063-04-05")}
      />,
    );
    expect(instance).toBeTruthy();
    expect(instance!.state.preSelection).toBeTruthy();
    expect(formatDate(instance!.state.preSelection!, "yyyy-MM-dd")).toBe(
      "2063-04-05",
    );
  });
  it("should default to the openToDate if there is one", () => {
    let instance: DatePicker | null = null;
    render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        openToDate={newDate("2020-01-23")}
      />,
    );
    expect(instance).toBeTruthy();
    expect(instance!.state.preSelection).toBeTruthy();
    expect(formatDate(instance!.state.preSelection!, "yyyy-MM-dd")).toBe(
      "2020-01-23",
    );
  });
  it("should otherwise default to the current date", () => {
    let instance: DatePicker | null = null;
    render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
      />,
    );
    expect(instance).toBeTruthy();
    expect(instance!.state.preSelection).toBeTruthy();
    expect(formatDate(instance!.state.preSelection!, "yyyy-MM-dd")).toBe(
      formatDate(newDate(), "yyyy-MM-dd"),
    );
  });
  it("should support an initial null `selected` value in inline mode", () => {
    const { rerender } = render(<DatePicker inline selected={null} />);

    expect(() =>
      rerender(<DatePicker inline selected={newDate()} />),
    ).not.toThrow();
  });
  it("should switch month in inline mode immediately", () => {
    let instance: DatePicker | null = null;
    const selected = newDate();
    const future = addDays(newDate(), 100);
    const { rerender } = render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        inline
        selected={selected}
      />,
    );
    expect(instance).toBeTruthy();
    expect(instance!.state.preSelection).toBeTruthy();
    expect(formatDate(instance!.state.preSelection!, "yyyy-MM-dd")).toBe(
      formatDate(selected, "yyyy-MM-dd"),
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
    expect(instance).toBeTruthy();
    expect(instance!.state.preSelection).toBeTruthy();
    expect(formatDate(instance!.state.preSelection!, "yyyy-MM-dd")).toBe(
      formatDate(future, "yyyy-MM-dd"),
    );
  });
  it("should switch month in inline mode immediately, when year is updated", () => {
    let instance: DatePicker | null = null;
    const selected = newDate();
    const future = addYears(newDate(), 1);
    const { rerender } = render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        inline
        selected={selected}
      />,
    );
    expect(instance).toBeTruthy();
    expect(instance!.state.preSelection).toBeTruthy();
    expect(formatDate(instance!.state.preSelection!, "yyyy-MM-dd")).toBe(
      formatDate(selected, "yyyy-MM-dd"),
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
    expect(instance).toBeTruthy();
    expect(instance!.state.preSelection).toBeTruthy();
    expect(formatDate(instance!.state.preSelection!, "yyyy-MM-dd")).toBe(
      formatDate(future, "yyyy-MM-dd"),
    );
  });
  it("should not set open state when focusing on the date input and the preventOpenOnFocus prop is set", () => {
    const { container } = render(<DatePicker preventOpenOnFocus />);
    const input = safeQuerySelector(container, "input");
    fireEvent.focus(input);
    expect(container.querySelector(".react-datepicker")).toBeNull();
  });
  it("should not set open state onInputKeyDown when preventOpenOnFocus prop is set", () => {
    const { container } = render(<DatePicker preventOpenOnFocus />);

    const input = safeQuerySelector(container, "input");
    fireEvent.keyDown(input, getKey(KeyType.ArrowLeft));

    expect(container.querySelector(".react-datepicker")).toBeNull();
  });
  it("should clear the input when clear() member function is called", () => {
    let instance: DatePicker | null = null;
    render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        selected={newDate("2015-12-15")}
      />,
    );
    expect(instance).toBeTruthy();
    act(() => {
      instance!.clear();
    });

    expect(instance!.state.inputValue).toBeNull();
  });
  it("should not open when open is false and input is focused", () => {
    const { container } = render(<DatePicker open={false} />);
    const input = safeQuerySelector(container, "input");
    fireEvent.focus(input);
    expect(container.querySelector(".react-datepicker")).toBeNull();
  });
  it("should open when open is true", () => {
    const { container } = render(<DatePicker open />);
    expect(container.querySelector(".react-datepicker")).not.toBeNull();
  });
  it("should fire onInputClick when input is clicked", () => {
    const onInputClickSpy = jest.fn();
    const { container } = render(<DatePicker onInputClick={onInputClickSpy} />);
    const input = safeQuerySelector(container, "input");
    fireEvent.click(input);
    expect(onInputClickSpy).toHaveBeenCalledTimes(1);
  });

  it("should set monthSelectedIn to 0 if monthsShown prop changes", () => {
    let instance: DatePicker | null = null;
    const { rerender } = render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        monthsShown={2}
        inline
      />,
    );
    expect(instance).toBeTruthy();
    act(() => {
      (
        instance!.state as unknown as { monthSelectedIn: number }
      ).monthSelectedIn = 1;
    });
    expect(instance!.state.monthSelectedIn).toEqual(1);

    rerender(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        monthsShown={1}
        inline
      />,
    );

    expect(instance!.state.monthSelectedIn).toEqual(0);
  });

  it("should disable non-jumping if prop focusSelectedMonth is true", () => {
    let instance: DatePicker | null = null;
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
    expect(dayButtonInline).toBeTruthy();
    fireEvent.click(dayButtonInline!);
    expect(instance).toBeTruthy();
    expect(instance!.state.monthSelectedIn).toEqual(undefined);
  });

  it("should show the popper arrow when showPopperArrow is true", () => {
    const { container } = render(<DatePicker showPopperArrow />);
    const input = safeQuerySelector(container, "input");
    fireEvent.click(input);

    const arrow = container.querySelector(".react-datepicker__triangle");

    expect(arrow).not.toBeNull();
  });

  it("should not show the popper arrow when showPopperArrow is false", () => {
    const { container } = render(<DatePicker showPopperArrow={false} />);
    const input = safeQuerySelector(container, "input");
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
        ?.getAttribute("aria-label"),
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
        ?.getAttribute("aria-label"),
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
        ?.getAttribute("aria-label"),
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
        ?.getAttribute("aria-label"),
    ).toContain(monthAriaLabelPrefix);
  });

  it("should close the calendar after scrolling", () => {
    const { container } = render(<DatePicker closeOnScroll />);
    const input = safeQuerySelector(container, "input");
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
    const input = safeQuerySelector(container, "input");
    fireEvent.focus(input);
    fireEvent.scroll(div);

    expect(container.querySelector(".react-datepicker")).not.toBeNull();
  });

  it("should close the calendar after scrolling.", () => {
    const { container } = render(<DatePicker closeOnScroll={() => true} />);
    const input = safeQuerySelector(container, "input");
    fireEvent.focus(input);
    expect(container.querySelector(".react-datepicker")).not.toBeNull();
    fireEvent.scroll(document);
    expect(container.querySelector(".react-datepicker")).toBeNull();
  });

  it("should not close the calendar after scrolling.", () => {
    const { container } = render(<DatePicker closeOnScroll={() => false} />);
    const input = safeQuerySelector(container, "input");
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
      const input = safeQuerySelector(container, "input");
      fireEvent.focus(input);

      const days = container.querySelectorAll(".react-datepicker__day");

      expect(days[5]).toBeTruthy();
      // Might seem odd, but the first couple of days of the calendar is in january, so days[5] is february 2nd
      fireEvent.click(days[5]!);
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

      const input = safeQuerySelector(container, "input");
      fireEvent.focus(input);

      const days = container.querySelectorAll(".react-datepicker__day");

      expect(days[5]).toBeTruthy();
      // Might seem odd, but the first couple of days of the calendar is in january, so days[5] is february 2nd
      fireEvent.click(days[5]!);
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

      const input = safeQuerySelector(container, "input");
      fireEvent.focus(input);

      const days = container.querySelectorAll(".react-datepicker__day");

      expect(days[5]).toBeTruthy();
      // Might seem odd, but the first couple of days of the calendar is in january, so days[5] is february 2nd
      fireEvent.click(days[5]!);
      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith(
        [previouslyAddedDate, testDate],
        expect.anything(),
      );
    });
  });

  describe("selectsRange with inline", () => {
    it("should change dates of range when dates are empty", () => {
      const selected = newDate();
      let startDate, endDate;
      const onChange = (dates: [Date | null, Date | null]) => {
        startDate = dates[0] ?? undefined;
        endDate = dates[1] ?? undefined;
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

      const selectedDay = safeQuerySelector(
        container,
        ".react-datepicker__day--selected",
      );
      fireEvent.click(selectedDay);
      expect(startDate).toBeTruthy();
      expect(formatDate(startDate!, "yyyy-MM-dd")).toBe(
        formatDate(selected, "yyyy-MM-dd"),
      );
      expect(endDate).toBeUndefined();
    });

    it("should change dates of range set endDate when startDate is set", () => {
      let startDate: Date | undefined = newDate("2024-03-08");
      const nextDay = addDays(startDate, 1);
      let endDate: Date | undefined = undefined;
      const onChange = (dates: [Date | null, Date | null]) => {
        startDate = dates[0] ?? undefined;
        endDate = dates[1] ?? undefined;
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

      const day = safeQuerySelector(
        container,
        ".react-datepicker__day--selected + .react-datepicker__day",
      );
      fireEvent.click(day);
      expect(formatDate(startDate, "yyyy-MM-dd")).toBe(
        formatDate(startDate, "yyyy-MM-dd"),
      );
      expect(endDate).not.toBeUndefined();
      expect(formatDate(endDate as unknown as Date, "yyyy-MM-dd")).toBe(
        formatDate(nextDay, "yyyy-MM-dd"),
      );
    });

    it("should change dates of range set endDate null when range is filled", () => {
      const selected = newDate();
      let [startDate, endDate]: [Date | undefined, Date | undefined] = [
        selected,
        selected,
      ];
      const onChange = (dates: [Date | null, Date | null]) => {
        startDate = dates[0] ?? undefined;
        endDate = dates[1] ?? undefined;
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

      const day = safeQuerySelector(
        container,
        ".react-datepicker__day--selected",
      );
      fireEvent.click(day);
      expect(formatDate(startDate, "yyyy-MM-dd")).toBe(
        formatDate(selected, "yyyy-MM-dd"),
      );
      expect(endDate).toBeUndefined();
    });

    it("should change dates of range change startDate when endDate set before startDate", () => {
      const selected = newDate();
      const selectedPrevious = subDays(newDate(), 3);
      let [startDate, endDate]: [Date | undefined, Date | undefined] = [
        selected,
        undefined,
      ];
      const onChange = (dates: [Date | null, Date | null]) => {
        startDate = dates[0] ?? undefined;
        endDate = dates[1] ?? undefined;
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

      fireEvent.click(selectedDay ?? new HTMLElement());
      expect(formatDate(startDate, "yyyy-MM-dd")).toBe(
        formatDate(selectedPrevious, "yyyy-MM-dd"),
      );
      expect(endDate).toBeUndefined();
    });

    it("should swap dates of range when endDate set before startDate", () => {
      const selected = newDate("2024-04-03");
      const selectedPrevious = subDays(selected, 3);
      let [startDate, endDate]: [Date | undefined, Date | undefined] = [
        selected,
        undefined,
      ];
      const onChange = (dates: [Date | null, Date | null]) => {
        startDate = dates[0] ?? undefined;
        endDate = dates[1] ?? undefined;
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

      fireEvent.click(selectedDay ?? new HTMLElement());
      expect(formatDate(startDate, "yyyy-MM-dd")).toBe(
        formatDate(selectedPrevious, "yyyy-MM-dd"),
      );
      expect(endDate).not.toBeUndefined();
      expect(formatDate(endDate as unknown as Date, "yyyy-MM-dd")).toBe(
        formatDate(selected, "yyyy-MM-dd"),
      );
    });
  });

  describe("is-selecting-range", () => {
    const IN_RANGE_DAY_CLASS_NAME = "react-datepicker__day--in-selecting-range";

    it("should apply '--in-selecting-range' class to the days till the preselected keyboard date on navigating to the next month without selecting endDate in the endDatePicker", () => {
      const preselectedDay = 5;
      const startDate = new Date(`2025/02/${preselectedDay}`);

      const { container } = render(
        <DatePicker
          inline
          selectsEnd
          startDate={startDate}
          minDate={startDate}
        />,
      );

      goToNextMonth(container);

      for (let i = 1; i <= preselectedDay; i++) {
        const inSelectionRangeDay = safeQuerySelector(
          container,
          `.react-datepicker__day--00${i}`,
        );
        expect(
          inSelectionRangeDay.classList.contains(IN_RANGE_DAY_CLASS_NAME),
        ).toBe(true);
      }
    });
  });

  describe("selectsRange without inline", () => {
    it("should have preSelection set to startDate upon opening", () => {
      const startDate = new Date("2021-04-20 00:00:00");
      const endDate = undefined;
      let instance: DatePicker | null = null;
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
      expect(instance).toBeTruthy();
      expect(instance!.input).toBeTruthy();
      // Click to open
      fireEvent.click(instance!.input!);
      expect(instance!.state.preSelection).toBe(startDate);
    });

    it("should remain open after clicking day when startDate is null", () => {
      const startDate = undefined;
      const endDate = undefined;
      const { container } = render(
        <DatePicker selectsRange startDate={startDate} endDate={endDate} />,
      );

      const input = safeQuerySelector(container, "input");
      fireEvent.click(input);

      const datePickerDay = safeQuerySelector(
        container,
        ".react-datepicker__day",
      );
      fireEvent.click(datePickerDay);

      expect(container.querySelector(".react-datepicker")).not.toBeNull();
    });

    it("should be closed after clicking day when startDate has a value (endDate is being selected)", () => {
      const startDate = new Date("2021-01-01 00:00:00");
      const endDate = undefined;
      const { container } = render(
        <DatePicker selectsRange startDate={startDate} endDate={endDate} />,
      );

      const input = safeQuerySelector(container, "input");
      fireEvent.click(input);

      const days = container.querySelectorAll(".react-datepicker__day");
      const day = days[Math.floor(days.length / 2)];
      expect(day).toBeTruthy();
      fireEvent.click(day!);
      expect(container.querySelector(".react-datepicker")).toBeNull();
    });

    it("should be closed after clicking day when startDate has a value (endDate is being selected) and swapRange prop was passed", () => {
      const startDate = new Date("2021-01-01 00:00:00");
      const endDate = undefined;
      const { container } = render(
        <DatePicker
          swapRange
          selectsRange
          startDate={startDate}
          endDate={endDate}
        />,
      );

      const input = safeQuerySelector(container, "input");
      fireEvent.click(input);

      const days = container.querySelectorAll(".react-datepicker__day");
      const day = days[Math.floor(days.length / 2)];
      expect(day).toBeTruthy();
      fireEvent.click(day!);
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
      let instance: DatePicker | null = null;
      render(
        <DatePicker
          selectsRange
          startDate={undefined}
          endDate={undefined}
          onChange={onChangeSpy}
          isClearable
          ref={(node) => {
            instance = node;
          }}
        />,
      );

      expect(instance).toBeTruthy();
      act(() => {
        instance!.clear();
      });

      expect(onChangeSpy).toHaveBeenCalled();
      expect(Array.isArray(onChangeSpy.mock.calls[0][0])).toBe(true);
      expect(onChangeSpy.mock.calls[0][0][0]).toBeNull();
      expect(onChangeSpy.mock.calls[0][0][1]).toBeNull();
    });

    it("should call the onChange even when the startDate and the endDate is same in the range (case when we programmatically set the startDate, but set the same endDate through UI)", () => {
      const startDate = new Date();
      const endDate = undefined;

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

      const input = safeQuerySelector(container, "input");
      expect(input).toBeTruthy();
      fireEvent.click(input);

      const calendar = container.querySelector(".react-datepicker");
      expect(calendar).toBeTruthy();

      // Select the same date as the start date
      const startDatePrefixedWithZeros = formatDayWithZeros(
        startDate.getDate(),
      );
      const endDateElement = safeQuerySelector(
        container,
        `.react-datepicker__day--${startDatePrefixedWithZeros}`,
      );
      fireEvent.click(endDateElement);

      expect(onChangeSpy).toHaveBeenCalled();
    });

    it("should hide the calendar even when the startDate and the endDate is same in the range", () => {
      let startDate: Date | null = new Date("2021-01-21 00:00:00");
      let endDate: Date | null = null;

      const onCalendarCloseSpy = jest.fn();

      const onChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        startDate = start;
        endDate = end;
      };

      const { container } = render(
        <DatePicker
          startDate={startDate ?? undefined}
          endDate={endDate ?? undefined}
          onChange={onChange}
          onCalendarClose={onCalendarCloseSpy}
          shouldCloseOnSelect
          selectsRange
        />,
      );

      const input = safeQuerySelector(container, "input");
      expect(input).toBeTruthy();
      fireEvent.click(input!);

      let calendar = container.querySelector(".react-datepicker");
      expect(calendar).toBeTruthy();

      // Select the same date as the start date
      const startDatePrefixedWithZeros = formatDayWithZeros(
        startDate.getDate(),
      );

      const endDateElement = safeQuerySelector(
        container,
        `.react-datepicker__day--${startDatePrefixedWithZeros}`,
      );
      fireEvent.click(endDateElement);

      calendar = container.querySelector(".react-datepicker");
      expect(calendar).toBeFalsy();

      expect(onCalendarCloseSpy).toHaveBeenCalled();
    });

    it("should select start date and end date if user inputs the range manually in the input box", () => {
      const onChangeSpy = jest.fn();
      let instance: DatePicker | null = null;
      const { container } = render(
        <DatePicker
          selectsRange
          startDate={undefined}
          endDate={undefined}
          onChange={onChangeSpy}
          excludeDates={[newDate("2024-01-01")]}
          ref={(node) => {
            instance = node;
          }}
        />,
      );

      expect(instance).toBeTruthy();
      const input = safeQuerySelector<HTMLInputElement>(container, "input");
      fireEvent.change(input, {
        target: {
          value: "03/04/2024 - 05/06/2024",
        },
      });

      // cover `if (startDateNew && isDayDisabled(startDateNew, this.props))` block
      fireEvent.change(input, {
        target: {
          value: "01/01/2024-05/06/2024",
        },
      });

      // cover `if (endDateNew && isDayDisabled(endDateNew, this.props))` block
      fireEvent.change(input, {
        target: {
          value: "03/04/2023-01/01/2024",
        },
      });

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(Array.isArray(onChangeSpy.mock.calls[0][0])).toBe(true);
      expect(onChangeSpy.mock.calls[0][0][0]).toBeTruthy();
      expect(onChangeSpy.mock.calls[0][0][1]).toBeTruthy();
      expect(formatDate(onChangeSpy.mock.calls[0][0][0], "MM/dd/yyyy")).toBe(
        "03/04/2024",
      );
      expect(formatDate(onChangeSpy.mock.calls[0][0][1], "MM/dd/yyyy")).toBe(
        "05/06/2024",
      );
    });

    it("should parses date range with dashes correctly", () => {
      const onChangeSpy = jest.fn();
      const dateFormat = "yyyy-MM-dd";

      const { container } = render(
        <DatePicker
          selectsRange
          startDate={undefined}
          endDate={undefined}
          onChange={onChangeSpy}
          dateFormat={dateFormat}
        />,
      );

      const input = safeQuerySelector<HTMLInputElement>(container, "input");
      fireEvent.change(input, {
        target: {
          value: "2024-03-04 - 2024-05-06",
        },
      });
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(Array.isArray(onChangeSpy.mock.calls[0][0])).toBe(true);
      const [startDate, endDate] = onChangeSpy.mock.calls[0][0];
      expect(startDate).toBeTruthy();
      expect(endDate).toBeTruthy();
      expect(formatDate(startDate, dateFormat)).toBe("2024-03-04");
      expect(formatDate(endDate, dateFormat)).toBe("2024-05-06");
    });

    it("should not fire onChange a second time if user edits text box without the parsing result changing", () => {
      const onChangeSpy = jest.fn();
      let instance: DatePicker | null = null;
      const { container } = render(
        <DatePicker
          selectsRange
          startDate={newDate("2024-03-04")}
          endDate={newDate("2024-05-06")}
          onChange={onChangeSpy}
          ref={(node) => {
            instance = node;
          }}
        />,
      );

      expect(instance).toBeTruthy();
      const input = safeQuerySelector<HTMLInputElement>(container, "input");

      // cover `if (!startChanged && !endChanged)` block
      fireEvent.change(input, {
        target: {
          value: "03/04/2024-05/06/2024",
        },
      });

      expect(onChangeSpy).not.toHaveBeenCalled();
    });

    it("should render custom separator when `rangeSeparator` is provided", () => {
      const onChangeSpy = jest.fn();
      const { container } = render(
        <DatePicker
          selectsRange
          rangeSeparator=" to "
          startDate={newDate("2025-01-01")}
          endDate={newDate("2025-01-03")}
          onChange={onChangeSpy}
          dateFormat="yyyy/MM/dd"
        />,
      );

      const input = safeQuerySelector<HTMLInputElement>(container, "input");
      expect(input.value).toBe("2025/01/01 to 2025/01/03");
    });
  });

  describe("duplicate dates when multiple months", () => {
    const selected = newDate("2023-05-15");

    it("should find duplicates at end on all months except last month", () => {
      // twoMonths
      const { container, rerender } = render(
        <DatePicker monthsShown={2} selected={selected} />,
      );
      const input = safeQuerySelector(container, "input");
      fireEvent.click(input);
      const months = container.querySelectorAll(".react-datepicker__month");
      expect(months).toHaveLength(2);
      // 2023-05 monthShowsDuplicateDaysEnd:true
      // 2023-06-03
      expect(
        Array.from(
          months[0]?.querySelectorAll(".react-datepicker__day") ?? [],
        ).at(-1)?.textContent,
      ).toBe("");
      // 2023-06 monthShowsDuplicateDaysEnd: false
      // 2023-07-01
      expect(
        Array.from(
          months[1]?.querySelectorAll(".react-datepicker__day") ?? [],
        ).at(-1)?.textContent,
      ).toBe("1");

      // moreThanTwoMonths
      rerender(<DatePicker monthsShown={4} selected={selected} />);
      fireEvent.click(input);
      const monthsMore = container.querySelectorAll(".react-datepicker__month");
      expect(monthsMore).toHaveLength(4);
      // 2023-05 monthShowsDuplicateDaysEnd:true
      // 2023-06-03
      expect(
        Array.from(
          monthsMore[0]?.querySelectorAll(".react-datepicker__day") ?? [],
        ).at(-1)?.textContent,
      ).toBe("");
      // 2023-06 monthShowsDuplicateDaysEnd:true
      // 2023-07-01
      expect(
        Array.from(
          monthsMore[1]?.querySelectorAll(".react-datepicker__day") ?? [],
        ).at(-1)?.textContent,
      ).toBe("");
      // 2023-07 monthShowsDuplicateDaysEnd:true
      // 2023-08-05
      expect(
        Array.from(
          monthsMore[2]?.querySelectorAll(".react-datepicker__day") ?? [],
        ).at(-1)?.textContent,
      ).toBe("");
      // 2023-08 monthShowsDuplicateDaysEnd:false
      // 2023-09-02
      expect(
        Array.from(
          monthsMore[3]?.querySelectorAll(".react-datepicker__day") ?? [],
        ).at(-1)?.textContent,
      ).toBe("2");
    });

    it("should find duplicates at start on all months except first month", () => {
      // twoMonths
      const { container, rerender } = render(
        <DatePicker monthsShown={2} selected={selected} />,
      );
      const input = safeQuerySelector(container, "input");
      fireEvent.click(input);
      const months = container.querySelectorAll(".react-datepicker__month");
      expect(months).toHaveLength(2);

      // 2023-05 monthShowsDuplicateDaysStart:false
      // 2023-04-30
      expect(
        months[0]?.querySelector(".react-datepicker__day")?.textContent,
      ).toBe("30");
      // 2023-06 monthShowsDuplicateDaysStart:true
      // 2023-05-28
      expect(
        months[1]?.querySelector(".react-datepicker__day")?.textContent,
      ).toBe("");

      // moreThanTwoMonths
      rerender(<DatePicker monthsShown={4} selected={selected} />);
      fireEvent.click(input);
      const monthsMore = container.querySelectorAll(".react-datepicker__month");
      expect(monthsMore).toHaveLength(4);
      // 2023-05 monthShowsDuplicateDaysStart:false
      // 2023-04-30
      expect(
        monthsMore[0]?.querySelector(".react-datepicker__day")?.textContent,
      ).toBe("30");
      // 2023-06 monthShowsDuplicateDaysStart:true
      // 2023-05-28
      expect(
        monthsMore[1]?.querySelector(".react-datepicker__day")?.textContent,
      ).toBe("");
      // 2023-07 monthShowsDuplicateDaysStart:true
      // 2023-06-25
      expect(
        monthsMore[2]?.querySelector(".react-datepicker__day")?.textContent,
      ).toBe("");
      // 2023-08 monthShowsDuplicateDaysStart:true
      // 2023-08-30
      expect(
        monthsMore[3]?.querySelector(".react-datepicker__day")?.textContent,
      ).toBe("");
    });

    it("should not find duplicates when single month displayed", () => {
      const { container } = render(<DatePicker selected={selected} />);
      const input = safeQuerySelector(container, "input");
      fireEvent.click(input);
      const months = container.querySelectorAll(".react-datepicker__month");
      expect(months).toHaveLength(1);

      // 2023-05 monthShowsDuplicateDaysEnd:false
      // 2023-06-03
      expect(
        Array.from(
          months[0]?.querySelectorAll(".react-datepicker__day") ?? [],
        ).at(-1)?.textContent,
      ).toBe("3");
      // 2023-05 monthShowsDuplicateDaysStart:false
      // 2023-04-30
      expect(
        months[0]?.querySelector(".react-datepicker__day")?.textContent,
      ).toBe("30");
    });
  });

  describe("multiple MonthYearPicker", () => {
    const selected = newDate("2023-05-15");

    it("should contain a different year all headers.", () => {
      let instance: DatePicker | null = null;
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
      expect(instance).toBeTruthy();
      expect(instance!.input).toBeTruthy();
      fireEvent.click(instance!.input!);
      const headers =
        instance!.calendar?.containerRef.current?.querySelectorAll(
          ".react-datepicker__header",
        ) ?? [];
      expect(headers).toHaveLength(2);
      expect(headers[0]!.textContent).toBe("2023");
      expect(headers[1]!.textContent).toBe("2024");

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
      expect(instance!.input).toBeTruthy();
      fireEvent.click(instance!.input!);
      const headersMore =
        instance!.calendar?.containerRef.current?.querySelectorAll(
          ".react-datepicker__header",
        ) ?? [];
      expect(headersMore).toHaveLength(4);
      expect(headersMore[0]!.textContent).toBe("2023");
      expect(headersMore[1]!.textContent).toBe("2024");
      expect(headersMore[2]!.textContent).toBe("2025");
      expect(headersMore[3]!.textContent).toBe("2026");
    });
  });

  describe("multiple QuarterYearPicker", () => {
    const selected = newDate("2023-05-15");

    it("should contain a different year all headers.", () => {
      let instance: DatePicker | null = null;
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
      expect(instance).toBeTruthy();
      expect(instance!.input).toBeTruthy();
      fireEvent.click(instance!.input!);
      const headers =
        instance!.calendar?.containerRef.current?.querySelectorAll(
          ".react-datepicker__header",
        ) ?? [];
      expect(headers).toHaveLength(2);
      expect(headers[0]!.textContent).toBe("2023");
      expect(headers[1]!.textContent).toBe("2024");

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
      expect(instance!.input).toBeTruthy();
      fireEvent.click(instance!.input!);
      const headersMore =
        instance!.calendar?.containerRef.current?.querySelectorAll(
          ".react-datepicker__header",
        ) ?? [];
      expect(headersMore).toHaveLength(4);
      expect(headersMore[0]!.textContent).toBe("2023");
      expect(headersMore[1]!.textContent).toBe("2024");
      expect(headersMore[2]!.textContent).toBe("2025");
      expect(headersMore[3]!.textContent).toBe("2026");
    });
  });

  describe("shouldFocusDayInline state", () => {
    const dateFormat = "yyyy-MM-dd";

    it("should not be updated when navigating with ArrowRight key without changing displayed month", () => {
      let instance: DatePicker | null = null;
      const { container } = render(
        <DatePicker
          selected={newDate("2020-11-15")}
          dateFormat={dateFormat}
          inline
          ref={(node) => {
            instance = node;
          }}
        />,
      );
      const selectedDayNode = getSelectedDayNode(container);
      expect(selectedDayNode).toBeTruthy();
      fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowRight));
      expect(instance).toBeTruthy();
      expect(instance!.state.shouldFocusDayInline).toBe(false);
    });

    it("should be set to true when changing displayed month with ArrowRight key", () => {
      let instance;
      const { container } = render(
        <DatePicker
          selected={newDate("2020-11-30")}
          dateFormat={dateFormat}
          inline
          ref={(node) => {
            instance = node;
          }}
        />,
      );
      const selectedDayNode = getSelectedDayNode(container);
      expect(selectedDayNode).toBeTruthy();
      fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowRight));
      expect(instance).toBeTruthy();
      expect(instance!.state.shouldFocusDayInline).toBe(true);
    });

    it("should be set to true when changing displayed month with PageDown key", () => {
      let instance;
      const { container } = render(
        <DatePicker
          selected={newDate("2020-11-15")}
          dateFormat={dateFormat}
          inline
          ref={(node) => {
            instance = node;
          }}
        />,
      );
      const selectedDayNode = getSelectedDayNode(container);
      expect(selectedDayNode).toBeTruthy();
      fireEvent.keyDown(selectedDayNode!, getKey(KeyType.PageDown));
      expect(instance).toBeTruthy();
      expect(instance!.state.shouldFocusDayInline).toBe(true);
    });
  });

  describe("Calendar Header Accessibility", () => {
    it("renders day names with react-datepicker__sr-only full weekday and visible short name", () => {
      const { container } = render(<DatePicker />);
      const input = safeQuerySelector(container, "input");
      fireEvent.focus(input);

      const headers = container.querySelectorAll(
        '.react-datepicker__day-names > [role="columnheader"]',
      );
      expect(headers.length).toBe(7);

      headers.forEach((header) => {
        // Should have a visually hidden span with the full weekday name
        const srOnly = header.querySelector(".react-datepicker__sr-only");
        expect(srOnly).toBeTruthy();
        expect(srOnly?.textContent?.length).toBeGreaterThan(2);

        // Should have a visible short name
        const visible = header.querySelector('span[aria-hidden="true"]');
        expect(visible).toBeTruthy();
        expect(visible?.textContent?.length).toBeLessThanOrEqual(3);
      });
    });

    it("renders week number column header with react-datepicker__sr-only label and visible #", () => {
      const { container } = render(<DatePicker showWeekNumbers />);
      const input = safeQuerySelector(container, "input");
      fireEvent.focus(input);

      const headers = container.querySelectorAll(
        '.react-datepicker__day-names > [role="columnheader"]',
      );
      expect(headers.length).toBe(8);

      const weekNumberHeader = headers[0] as Element;
      const srOnly = weekNumberHeader.querySelector(
        ".react-datepicker__sr-only",
      );
      expect(srOnly).toBeTruthy();
      expect(srOnly?.textContent?.trim()?.toLowerCase()).toEqual("week number");

      // Should have a visible short name
      const visible = weekNumberHeader.querySelector(
        'span[aria-hidden="true"]',
      );
      expect(visible).toBeTruthy();
      expect(visible?.textContent?.trim()?.toLowerCase()).toEqual("#");
    });
  });

  it("should show the correct start of week for GB locale", () => {
    registerLocale("en-GB", enGB);

    const { container } = render(<DatePicker locale="en-GB" />);
    const input = safeQuerySelector(container, "input");
    jest.spyOn(input, "focus");
    fireEvent.focus(input);

    const firstDay = container.querySelector(
      ".react-datepicker__day-names > div[role='columnheader'] > span[aria-hidden='true']",
    );
    expect(firstDay?.textContent).toBe("Mo");
  });

  it("should show the correct start of week for US locale", () => {
    registerLocale("en-US", enUS);

    const { container } = render(<DatePicker locale="en-US" />);
    const input = safeQuerySelector(container, "input");
    jest.spyOn(input, "focus");
    fireEvent.focus(input);

    const firstDay = container.querySelector(
      ".react-datepicker__day-names > div[role='columnheader'] > span[aria-hidden='true']",
    );
    expect(firstDay?.textContent).toBe("Su");
  });

  describe("when update the datepicker input text while props.showTimeSelectOnly is set and dateFormat has only time related format", () => {
    const format = "h:mm aa";

    it("should keep selected date in state except new time", () => {
      const selected = newDate("2022-02-24 10:00:00");
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

      const input = safeQuerySelector(container, "input");
      fireEvent.change(input, {
        target: {
          value: "8:22 AM",
        },
      });

      expect(date).toBeTruthy();
      expect(isSameDay(date, selected)).toBe(true);
      expect(getHours(date!)).toBe(8);
      expect(getMinutes(date!)).toBe(22);
    });
  });

  it("clears the selected date on empty date input", () => {
    let date: Date | string | null = "2023-10-23 10:00:00";
    const selected: Date = newDate(date);

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

    const input = safeQuerySelector(
      datepicker,
      ".react-datepicker__input-container > input",
    );
    fireEvent.change(input, { target: { value: "" } });

    expect(date).toBe(null);
  });

  it("clears the selected date on empty date input with showTimeSelectOnly", () => {
    const format = "h:mm aa";

    let date: Date | string | null = "2022-02-24 10:00:00";
    const selected = newDate(date);

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

    const input = safeQuerySelector(
      datepicker,
      ".react-datepicker__input-container > input",
    );
    fireEvent.change(input, { target: { value: "" } });

    expect(date).toBe(null);
  });

  it("should selected month when specified minDate same month", () => {
    const selected = newDate("2023-01-09");
    let date: Date | null = null;
    const { container } = render(
      <DatePicker
        selected={selected}
        onChange={(d) => (date = d)}
        dateFormat="MM/yyyy"
        minDate={newDate("2022-12-31")}
        showMonthYearPicker
      />,
    );

    const input = safeQuerySelector(container, "input");
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
    expect(`${date}`).toBe(`${newDate("2022-12-01")}`);
  });

  it("should selected year when specified minDate same year", () => {
    const selected = newDate("2023-01-09");
    let date: Date | null = null;
    const { container } = render(
      <DatePicker
        selected={selected}
        onChange={(d) => (date = d)}
        dateFormat="yyyy"
        minDate={newDate("2022-12-31")}
        showYearPicker
      />,
    );

    const input = safeQuerySelector(container, "input");
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
    expect(`${date}`).toBe(`${newDate("2022-01-01")}`);
  });

  describe("should render aria live region after date selection", () => {
    it("should have correct format if datepicker does not contain time", () => {
      let instance: DatePicker | null = null;
      const { container } = render(
        <DatePicker
          ref={(node) => {
            instance = node;
          }}
          showDateSelect
          selected={newDate()}
        />,
      );

      expect(instance).toBeTruthy();
      expect(instance!.input).toBeTruthy();
      fireEvent.focus(instance!.input!);
      fireEvent.keyDown(instance!.input!, getKey(KeyType.Enter));

      const ariaLiveMessage = container.querySelector(
        ".react-datepicker__aria-live",
      )?.textContent;

      expect(ariaLiveMessage).toBe(
        `Selected date: ${safeDateFormat(instance!.props.selected, {
          dateFormat: "PPPP",
          locale: instance!.props.locale,
        })}`,
      );
    });

    it("should have correct format if datepicker contains time", () => {
      let instance: DatePicker | null = null;
      const { container } = render(
        <DatePicker
          ref={(node) => {
            instance = node;
          }}
          showTimeInput
          showDateSelect
          selected={newDate()}
        />,
      );

      expect(instance).toBeTruthy();
      expect(instance!.input).toBeTruthy();
      fireEvent.focus(instance!.input!);
      fireEvent.keyDown(instance!.input!, getKey(KeyType.Enter));

      const ariaLiveMessage = container.querySelector(
        ".react-datepicker__aria-live",
      )?.textContent;

      expect(ariaLiveMessage).toBe(
        `Selected date: ${safeDateFormat(instance!.props.selected, {
          dateFormat: "PPPPp",
          locale: instance!.props.locale,
        })}`,
      );
    });
  });

  it("should not customize the className attribute if showIcon is set to false", () => {
    const { container } = render(
      <DatePicker selected={newDate("2021-04-15")} />,
    );
    const showIconClass = container
      .querySelector(".react-datepicker__input-container")
      ?.getAttribute("class");
    expect(showIconClass).toBe("react-datepicker__input-container");
  });

  it("should display the Calendar icon if showIcon is set to true", () => {
    const { container, rerender } = render(
      <DatePicker selected={newDate("2021-04-15")} showIcon />,
    );
    let showIconClass = container
      .querySelector(".react-datepicker__input-container")
      ?.getAttribute("class");
    expect(showIconClass).toBe(
      "react-datepicker__input-container react-datepicker__view-calendar-icon",
    );

    rerender(<DatePicker selected={newDate("2021-04-15")} showIcon />);
    showIconClass = container
      .querySelector(".react-datepicker__calendar-icon")
      ?.getAttribute("class");
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

      const dateInput = safeQuerySelector(container, "input");
      fireEvent.focus(dateInput);
      const selectedYear = safeQuerySelector(
        container,
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

      const dateInput = safeQuerySelector(container, "input");
      fireEvent.focus(dateInput);
      const selectedYear = safeQuerySelector(
        container,
        ".react-datepicker__year-text--selected",
      );

      fireEvent.pointerEnter(selectedYear);
      fireEvent.pointerLeave(selectedYear);

      expect(onYearMouseEnterSpy).toHaveBeenCalled();
      expect(onYearMouseLeaveSpy).toHaveBeenCalled();
    });
  });

  describe("Week picker", () => {
    describe("Keyboard navigation", () => {
      it("should select the week when pressing Enter", () => {
        const date = new Date("2021-02-08");
        let selected: Date | null = date;
        const onChange = (d: Date | null) => {
          selected = d;
        };
        const data = getOnInputKeyDownStuff({
          showWeekPicker: true,
          selected: date,
          preSelection: date,
          onChange,
        });

        fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown)); // open
        const selectedDayNode = getSelectedDayNode(data.container);
        expect(selectedDayNode).toBeTruthy();
        fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowDown)); // navigate to week
        fireEvent.keyDown(selectedDayNode!, getKey(KeyType.Enter));
        expect(formatDate(selected, data.testFormat)).toBe(
          formatDate(new Date("2021-02-15"), data.testFormat),
        );
      });
      it("should select the week when pressing Space", () => {
        const date = new Date("2021-02-08");
        let selected: Date | null = date;
        const onChange = (d: Date | null) => {
          selected = d;
        };
        const data = getOnInputKeyDownStuff({
          showWeekPicker: true,
          selected: date,
          preSelection: date,
          onChange,
        });

        fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown)); // open
        const selectedDayNode = getSelectedDayNode(data.container);
        expect(selectedDayNode).toBeTruthy();
        fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowDown)); // navigate to week
        fireEvent.keyDown(selectedDayNode!, getKey(KeyType.Space));
        expect(formatDate(selected, data.testFormat)).toBe(
          formatDate(new Date("2021-02-15"), data.testFormat),
        );
      });
      it("should navigate to the previous week when pressing ArrowUp", () => {
        const date = new Date("2021-02-08");
        const data = getOnInputKeyDownStuff({
          showWeekPicker: true,
          selected: date,
          preSelection: date,
        });

        fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
        const selectedDayNode = getSelectedDayNode(data.container);
        expect(selectedDayNode).toBeTruthy();
        fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowUp));
        expect(data.instance.state.preSelection).toBeTruthy();
        expect(
          formatDate(data.instance.state.preSelection!, data.testFormat),
        ).toBe(formatDate(new Date("2021-02-01"), data.testFormat));
      });
      it("should navigate to the previous week when pressing ArrowLeft", () => {
        const date = new Date("2021-02-08");
        const data = getOnInputKeyDownStuff({
          showWeekPicker: true,
          selected: date,
          preSelection: date,
        });

        fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
        const selectedDayNode = getSelectedDayNode(data.container);
        expect(selectedDayNode).toBeTruthy();
        fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowLeft));
        expect(data.instance.state.preSelection).toBeTruthy();
        expect(
          formatDate(data.instance.state.preSelection!, data.testFormat),
        ).toBe(formatDate(new Date("2021-02-01"), data.testFormat));
      });
      it("should navigate to the next week when pressing ArrowDown", () => {
        const date = new Date("2021-02-08");
        const data = getOnInputKeyDownStuff({
          showWeekPicker: true,
          selected: date,
          preSelection: date,
        });

        fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
        const selectedDayNode = getSelectedDayNode(data.container);
        expect(selectedDayNode).toBeTruthy();
        fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowDown));
        expect(data.instance.state.preSelection).toBeTruthy();
        expect(
          formatDate(data.instance.state.preSelection!, data.testFormat),
        ).toBe(formatDate(new Date("2021-02-15"), data.testFormat));
      });
      it("should navigate to the next week when pressing ArrowRight", () => {
        const date = new Date("2021-02-08");
        const data = getOnInputKeyDownStuff({
          showWeekPicker: true,
          selected: date,
          preSelection: date,
        });

        fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
        const selectedDayNode = getSelectedDayNode(data.container);
        expect(selectedDayNode).toBeTruthy();
        fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowRight));
        expect(data.instance.state.preSelection).toBeTruthy();
        expect(
          formatDate(data.instance.state.preSelection!, data.testFormat),
        ).toBe(formatDate(new Date("2021-02-15"), data.testFormat));
      });
      it("should skip excluded week when pressing ArrowUp", () => {
        const date = new Date("2021-02-08");
        const data = getOnInputKeyDownStuff({
          showWeekPicker: true,
          selected: date,
          preSelection: date,
          excludeDateIntervals: [
            { start: new Date("2021-02-01"), end: new Date("2021-02-07") },
          ],
        });

        fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
        const selectedDayNode = getSelectedDayNode(data.container);
        expect(selectedDayNode).toBeTruthy();
        fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowUp));
        expect(data.instance.state.preSelection).toBeTruthy();
        expect(
          formatDate(data.instance.state.preSelection!, data.testFormat),
        ).toBe(formatDate(new Date("2021-01-25"), data.testFormat));
      });
      it("should skip excluded week when pressing ArrowLeft", () => {
        const date = new Date("2021-02-08");
        const data = getOnInputKeyDownStuff({
          showWeekPicker: true,
          selected: date,
          preSelection: date,
          excludeDateIntervals: [
            { start: new Date("2021-02-01"), end: new Date("2021-02-07") },
          ],
        });

        fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
        const selectedDayNode = getSelectedDayNode(data.container);
        expect(selectedDayNode).toBeTruthy();
        fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowLeft));
        expect(data.instance.state.preSelection).toBeTruthy();
        expect(
          formatDate(data.instance.state.preSelection!, data.testFormat),
        ).toBe(formatDate(new Date("2021-01-25"), data.testFormat));
      });
      it("should skip excluded week when pressing ArrowDown", () => {
        const date = new Date("2021-02-08");
        const data = getOnInputKeyDownStuff({
          showWeekPicker: true,
          selected: date,
          preSelection: date,
          excludeDateIntervals: [
            { start: new Date("2021-02-15"), end: new Date("2021-02-21") },
          ],
        });

        fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
        const selectedDayNode = getSelectedDayNode(data.container);
        expect(selectedDayNode).toBeTruthy();
        fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowDown));
        expect(data.instance.state.preSelection).toBeTruthy();
        expect(
          formatDate(data.instance.state.preSelection!, data.testFormat),
        ).toBe(formatDate(new Date("2021-02-22"), data.testFormat));
      });
      it("should skip excluded week when pressing ArrowRight", () => {
        const date = new Date("2021-02-08");
        const data = getOnInputKeyDownStuff({
          showWeekPicker: true,
          selected: date,
          preSelection: date,
          excludeDateIntervals: [
            { start: new Date("2021-02-15"), end: new Date("2021-02-21") },
          ],
        });

        fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
        const selectedDayNode = getSelectedDayNode(data.container);
        expect(selectedDayNode).toBeTruthy();
        fireEvent.keyDown(selectedDayNode!, getKey(KeyType.ArrowRight));
        expect(data.instance.state.preSelection).toBeTruthy();
        expect(
          formatDate(data.instance.state.preSelection!, data.testFormat),
        ).toBe(formatDate(new Date("2021-02-22"), data.testFormat));
      });
      it("should move to the next available week after pressing PageUp to a disabled date", () => {
        const date = new Date("2021-02-08");
        const data = getOnInputKeyDownStuff({
          showWeekPicker: true,
          selected: date,
          preSelection: date,
          excludeDateIntervals: [
            { start: new Date("2021-01-04"), end: new Date("2021-01-10") },
          ],
        });

        fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
        const selectedDayNode = getSelectedDayNode(data.container);
        expect(selectedDayNode).toBeTruthy();
        fireEvent.keyDown(selectedDayNode!, getKey(KeyType.PageUp));
        expect(data.instance.state.preSelection).toBeTruthy();
        expect(
          formatDate(data.instance.state.preSelection!, data.testFormat),
        ).toBe(formatDate(new Date("2021-01-15"), data.testFormat));
      });
      it("should move to the previous available week after pressing PageDown to a disabled date", () => {
        const date = new Date("2021-02-08");
        const data = getOnInputKeyDownStuff({
          showWeekPicker: true,
          selected: date,
          preSelection: date,
          excludeDateIntervals: [
            { start: new Date("2021-03-08"), end: new Date("2021-03-14") },
          ],
        });

        fireEvent.keyDown(data.dateInput, getKey(KeyType.ArrowDown));
        const selectedDayNode = getSelectedDayNode(data.container);
        expect(selectedDayNode).toBeTruthy();
        fireEvent.keyDown(selectedDayNode!, getKey(KeyType.PageDown));
        expect(data.instance.state.preSelection).toBeTruthy();
        expect(
          formatDate(data.instance.state.preSelection!, data.testFormat),
        ).toBe(formatDate(new Date("2021-03-01"), data.testFormat));
      });
    });
  });

  describe("input reset", () => {
    const renderDatePickerInput = (open: boolean | null = null) => {
      const WrapperComponent = ({ open }: { open: boolean | null }) => {
        const [date, setDate] = useState<Date | null>(new Date());
        return (
          <DatePicker
            {...(open !== null && { open })}
            selected={date}
            onChange={setDate}
          />
        );
      };

      return render(<WrapperComponent open={open} />);
    };

    it("should reset the date input element with the previously entered value element on blur even when the calendar open is false", () => {
      const { container } = renderDatePickerInput(false);
      const input = safeQuerySelector(container, "input") as HTMLInputElement;

      if (!input) {
        throw new Error("Input element not found");
      }

      fireEvent.click(input);
      const DATE_VALUE = "02/22/2025";
      fireEvent.change(input, {
        target: {
          value: DATE_VALUE,
        },
      });
      fireEvent.blur(input);
      expect(input.value).toBe(DATE_VALUE);

      fireEvent.click(input);
      const INVALID_DATE_VALUE = "2025-02-45";
      fireEvent.change(input, {
        target: {
          value: INVALID_DATE_VALUE,
        },
      });
      fireEvent.blur(input);
      expect(input.value).toBe(DATE_VALUE);
    });

    it("should reset the date input element with the previously entered value on blur even when the calendar is not open", () => {
      const { container } = renderDatePickerInput();
      const input = safeQuerySelector(container, "input") as HTMLInputElement;

      fireEvent.click(input);

      const VALID_DATE_VALUE = "06/23/2025";
      fireEvent.change(input, {
        target: {
          value: VALID_DATE_VALUE,
        },
      });
      fireEvent.blur(input);
      expect(input.value).toBe(VALID_DATE_VALUE);

      fireEvent.click(input);
      fireEvent.keyDown(input, getKey(KeyType.Escape));
      // Make sure the calendar is hidden
      expect(container.querySelector(".react-datepicker")).toBeFalsy();

      const INVALID_DATE_VALUE = "2025-02-45";
      fireEvent.change(input, {
        target: {
          value: INVALID_DATE_VALUE,
        },
      });
      fireEvent.blur(input);
      expect(input.value).toBe(VALID_DATE_VALUE);
    });
  });

  describe("Close on ESC Key", () => {
    it("should close DatePicker on ESC key press", () => {
      const { container } = render(<DatePicker />);
      const input = safeQuerySelector(container, "input");

      fireEvent.click(input);
      const calendar = safeQuerySelector(container, ".react-datepicker");

      fireEvent.keyDown(calendar, getKey(KeyType.Escape));

      const calendarAfterEsc = container.querySelector(".react-datepicker");
      expect(calendarAfterEsc).toBeFalsy();
    });

    it("should close DatePicker on ESC key press - even when the focus is at Calendar header buttons", () => {
      const { container } = render(<DatePicker />);
      const input = safeQuerySelector(container, "input");

      fireEvent.click(input);
      const calendar = safeQuerySelector(container, ".react-datepicker");
      const nextMontButton = safeQuerySelector(
        calendar,
        "button.react-datepicker__navigation--next",
      );

      fireEvent.click(nextMontButton);
      fireEvent.click(nextMontButton);

      fireEvent.keyDown(nextMontButton, getKey(KeyType.Escape));

      const calendarAfterEsc = container.querySelector(".react-datepicker");
      expect(calendarAfterEsc).toBeFalsy();
    });
  });

  describe("dateFormat", () => {
    it("should use the default dateFormat if dateFormat prop is not provided", () => {
      const { container } = render(
        <DatePicker selected={new Date("2025-07-17")} showDateSelect />,
      );
      const input = safeQuerySelector(container, "input") as HTMLInputElement;
      expect(input?.value).toBe("07/17/2025");
    });
  });

  describe("Date Range - Handle null start date", () => {
    it("should display the endDate when the startDate is not available", () => {
      const endDateLabel = "2025-11-22";
      const { container } = render(
        <DatePicker
          selectsRange
          startDate={null}
          endDate={newDate(endDateLabel)}
          dateFormat="yyyy-MM-dd"
          onChange={() => {}}
          isClearable
        />,
      );
      const input = safeQuerySelector<HTMLInputElement>(container, "input");
      expect(input.value).toBe(` - ${endDateLabel}`);
    });

    it("should clear the input when the startDate alone is cleared while the endDate is still available", () => {
      const startDateLabel = "2025-11-17";
      const endDateLabel = "2025-11-22";
      const onChangeSpy = jest.fn();

      const { container } = render(
        <DatePicker
          selectsRange
          startDate={newDate(startDateLabel)}
          endDate={newDate(endDateLabel)}
          dateFormat="yyyy-MM-dd"
          onChange={onChangeSpy}
          isClearable
        />,
      );
      const input = safeQuerySelector<HTMLInputElement>(container, "input");
      expect(input.value).toBe(`${startDateLabel} - ${endDateLabel}`);

      fireEvent.change(input, { target: { value: ` - ${endDateLabel}` } });
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy).toHaveBeenCalledWith([null, null], expect.anything());
    });

    it("should clear the endDate and set the startDate when the endDate is alone available and the newly selected startDate is greater than the endDate", () => {
      const endDateLabel = "2025-11-20";
      const onChangeSpy = jest.fn();
      const { container } = render(
        <DatePicker
          selectsRange
          startDate={null}
          selected={newDate(endDateLabel)}
          endDate={newDate(endDateLabel)}
          dateFormat="yyyy-MM-dd"
          onChange={onChangeSpy}
          isClearable
        />,
      );
      const input = safeQuerySelector<HTMLInputElement>(container, "input");
      fireEvent.focus(input);

      expect(container.querySelector(".react-datepicker")).toBeTruthy();
      const newStartDateEl = safeQuerySelector(
        container,
        ".react-datepicker__day--021",
      );
      fireEvent.click(newStartDateEl);

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      const changedDateRange = onChangeSpy.mock.calls[0][0];
      const [changedStartDate, changedEndDate] = changedDateRange;

      expect(changedEndDate).toBe(null);
      expect(changedStartDate.toISOString()).toBe(
        newDate("2025-11-21").toISOString(),
      );
    });

    it("should set the startDate when the endDate is alone available and the newly selected startDate is less than the endDate", () => {
      const endDateLabel = "2025-11-20";
      const onChangeSpy = jest.fn();
      const { container } = render(
        <DatePicker
          selectsRange
          startDate={null}
          selected={newDate(endDateLabel)}
          endDate={newDate(endDateLabel)}
          dateFormat="yyyy-MM-dd"
          onChange={onChangeSpy}
          isClearable
        />,
      );
      const input = safeQuerySelector<HTMLInputElement>(container, "input");
      fireEvent.focus(input);

      expect(container.querySelector(".react-datepicker")).toBeTruthy();
      const newStartDateEl = safeQuerySelector(
        container,
        ".react-datepicker__day--019",
      );
      fireEvent.click(newStartDateEl);

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      const changedDateRange = onChangeSpy.mock.calls[0][0];
      const [changedStartDate, changedEndDate] = changedDateRange;

      expect(changedEndDate.toISOString()).toBe(
        newDate(endDateLabel).toISOString(),
      );
      expect(changedStartDate.toISOString()).toBe(
        newDate("2025-11-19").toISOString(),
      );
    });
  });

  describe("Refocus Input", () => {
    it("should refocus the date input when a date is selected", async () => {
      const selectedDate = newDate("2025-11-01");
      const onChangeSpy = jest.fn();
      const { container } = render(
        <DatePicker
          selected={selectedDate}
          dateFormat="yyyy-MM-dd"
          onChange={onChangeSpy}
        />,
      );

      const input = safeQuerySelector<HTMLInputElement>(container, "input");
      fireEvent.focus(input);

      expect(container.querySelector(".react-datepicker")).toBeTruthy();

      const newSelectedDateEl = safeQuerySelector(
        container,
        ".react-datepicker__day--002",
      );
      fireEvent.click(newSelectedDateEl);

      await waitFor(() => {
        expect(document.activeElement).not.toBe(newSelectedDateEl);
        expect(document.activeElement).toBe(input);
      });
    });

    describe("Date Range", () => {
      it("should not refocus the input when the endDate is not selected in the Date Range", async () => {
        const selectedDate = newDate("2025-11-01");
        let startDate, endDate;
        const onChangeSpy = jest.fn((dates) => {
          [startDate, endDate] = dates;
        });

        const { container } = render(
          <DatePicker
            selectsRange
            selected={selectedDate}
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy-MM-dd"
            onChange={onChangeSpy}
          />,
        );
        const input = safeQuerySelector<HTMLInputElement>(container, "input");
        fireEvent.focus(input);

        expect(container.querySelector(".react-datepicker")).toBeTruthy();
        const newStartDateEl = safeQuerySelector(
          container,
          ".react-datepicker__day--002",
        );
        fireEvent.click(newStartDateEl);

        expect(onChangeSpy).toHaveBeenCalledTimes(1);

        await waitFor(() => {
          expect(document.activeElement).not.toBe(input);
          expect(document.activeElement).toBe(newStartDateEl);
        });
      });

      it("should refocus the input when the endDate is selected in the Date Range (if the end date is after the start date)", async () => {
        const selectedDate = newDate("2025-11-01");
        let startDate = selectedDate,
          endDate;
        const onChangeSpy = jest.fn((dates) => {
          [startDate, endDate] = dates;
        });

        const { container } = render(
          <DatePicker
            selectsRange
            selected={selectedDate}
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy-MM-dd"
            onChange={onChangeSpy}
          />,
        );
        const input = safeQuerySelector<HTMLInputElement>(container, "input");
        fireEvent.focus(input);

        expect(container.querySelector(".react-datepicker")).toBeTruthy();
        const endDateEl = safeQuerySelector(
          container,
          ".react-datepicker__day--005",
        );
        fireEvent.click(endDateEl);

        expect(onChangeSpy).toHaveBeenCalledTimes(1);

        await waitFor(() => {
          expect(document.activeElement).toBe(input);
        });
      });

      it("should not refocus the input when the selected endDate is before the startDate", async () => {
        const selectedDate = newDate("2025-11-05");
        let startDate = selectedDate,
          endDate;
        const onChangeSpy = jest.fn((dates) => {
          [startDate, endDate] = dates;
        });

        const { container } = render(
          <DatePicker
            selectsRange
            selected={selectedDate}
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy-MM-dd"
            onChange={onChangeSpy}
          />,
        );
        const input = safeQuerySelector<HTMLInputElement>(container, "input");
        fireEvent.focus(input);

        expect(container.querySelector(".react-datepicker")).toBeTruthy();
        const endDateEl = safeQuerySelector(
          container,
          ".react-datepicker__day--002",
        );
        fireEvent.click(endDateEl);

        expect(onChangeSpy).toHaveBeenCalledTimes(1);

        await waitFor(() => {
          expect(document.activeElement).not.toBe(input);
          expect(document.activeElement).toBe(endDateEl);
        });
      });

      it('should refocus the input when the selected endDate is before the startDate when the "swapRange" prop is set', async () => {
        const selectedDate = newDate("2025-11-05");
        let startDate = selectedDate,
          endDate;
        const onChangeSpy = jest.fn((dates) => {
          [startDate, endDate] = dates;
        });

        const { container } = render(
          <DatePicker
            selectsRange
            swapRange
            selected={selectedDate}
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy-MM-dd"
            onChange={onChangeSpy}
          />,
        );
        const input = safeQuerySelector<HTMLInputElement>(container, "input");
        fireEvent.focus(input);

        expect(container.querySelector(".react-datepicker")).toBeTruthy();
        const endDateEl = safeQuerySelector(
          container,
          ".react-datepicker__day--002",
        );
        fireEvent.click(endDateEl);

        expect(onChangeSpy).toHaveBeenCalledTimes(1);

        await waitFor(() => {
          expect(document.activeElement).not.toBe(endDateEl);
          expect(document.activeElement).toBe(input);
        });
      });
    });
  });
});
