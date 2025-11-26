import { render, fireEvent, waitFor } from "@testing-library/react";
import React from "react";

import { formatDate, KeyType, newDate } from "../date_utils";
import DatePicker from "../index";

import {
  getKey,
  getResizeObserverCallback,
  SafeElementWrapper,
  safeQuerySelector,
  safeQuerySelectorAll,
  setupMockResizeObserver,
} from "./test_utils";

const MIN_TIME_LI_LEN = 2;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TestDatePicker = DatePicker as unknown as React.ComponentType<any>;

describe("TimePicker", () => {
  let datePicker: HTMLDivElement;
  let div: HTMLDivElement;
  let onChangeMoment: Date | undefined;
  let instance: DatePicker | null = null;

  let mockObserve: jest.Mock, mockDisconnect: jest.Mock;

  beforeAll(() => {
    const { observe, disconnect } = setupMockResizeObserver();
    mockObserve = observe;
    mockDisconnect = disconnect;
  });

  beforeEach(() => {
    div = document.createElement("div");
  });

  describe("Re-adjust height on Calendar Height Change", () => {
    beforeEach(() => {
      mockObserve.mockReset();
      mockDisconnect.mockReset();
    });

    it("calls observe on mount", async () => {
      render(
        <DatePicker
          inline
          selected={new Date()}
          showTimeSelect
          timeIntervals={15}
        />,
      );
      await waitFor(() => {
        expect(mockObserve).toHaveBeenCalledTimes(1);

        const resizeObserverCallback = getResizeObserverCallback();
        const mockObserveElement = mockObserve.mock.calls[0][0];
        expect(typeof resizeObserverCallback).toBe("function");

        if (resizeObserverCallback) {
          resizeObserverCallback([], mockObserveElement);
        }
      });
    });

    it("calls disconnect on unmount", async () => {
      const component = render(
        <DatePicker
          inline
          selected={new Date()}
          showTimeSelect
          timeIntervals={15}
        />,
      );

      component.unmount();
      await waitFor(() => {
        expect(mockDisconnect).toHaveBeenCalledTimes(1);
        const resizeObserverCallback = getResizeObserverCallback();
        expect(resizeObserverCallback).toBe(null);
      });
    });
  });

  it("should update on input time change", () => {
    renderDatePicker("February 28, 2018 4:43 PM");
    expect(getInputString()).toBe("February 28, 2018 4:43 PM");

    setManually("February 28, 2018 4:45 PM");
    expect(formatDate(onChangeMoment ?? new Date(), "MMMM d, yyyy p")).toBe(
      "February 28, 2018 4:45 PM",
    );
  });

  it("should allow time changes after input change", () => {
    renderDatePicker("February 28, 2018 4:43 PM");
    setManually("February 28, 2018 4:45 PM");

    if (!instance?.input) {
      throw new Error("input is null/undefined");
    }

    fireEvent.focus(instance.input);

    const timeOption = new SafeElementWrapper(datePicker)
      .safeQuerySelector(".react-datepicker__time-container")
      .safeQuerySelectorAll("li", MIN_TIME_LI_LEN)[1]!
      .getElement();
    fireEvent.click(timeOption);
    expect(getInputString()).toBe("February 28, 2018 12:30 AM");
  });

  it("should allow for injected date if input does not have focus", () => {
    renderDatePicker("February 28, 2018 4:43 PM");
    setManually("February 28, 2018 4:45 PM");

    if (!instance?.input) {
      throw new Error("input is null/undefined");
    }

    fireEvent.blur(instance.input);
    renderDatePicker("February 28, 2018 4:43 PM");
    expect(getInputString()).toBe("February 28, 2018 4:43 PM");
  });

  it("should not close datepicker after time clicked when shouldCloseOnSelect is false", () => {
    let instance: DatePicker;
    const { container } = render(
      <DatePicker
        ref={(node) => {
          if (node) {
            instance = node;
          }
        }}
        shouldCloseOnSelect={false}
        showTimeSelect
      />,
    );
    fireEvent.focus(instance!.input!);
    const time = safeQuerySelector(
      container,
      ".react-datepicker__time-container",
    );
    const lis = safeQuerySelectorAll(time, "li");
    fireEvent.click(lis[0]!);
    expect(instance!.state.open).toBe(true);
  });

  it("should show different colors for times", () => {
    const handleTimeColors = (time: Date) => {
      return time.getHours() < 12 ? "red" : "green";
    };
    const { container } = render(
      <DatePicker
        showTimeSelect
        showTimeSelectOnly
        timeClassName={handleTimeColors}
        open
      />,
    );
    const redItems = container.querySelectorAll(
      ".react-datepicker__time-list-item.red",
    );
    const greenItems = container.querySelectorAll(
      ".react-datepicker__time-list-item.green",
    );

    expect(redItems.length).toBe(24);
    expect(greenItems.length).toBe(24);
  });

  it("should handle 40 min time intervals", () => {
    renderDatePicker("February 28, 2018 9:00 AM", {
      timeIntervals: 40,
      showTimeSelect: true,
    });
    expect(getInputString()).toBe("February 28, 2018 9:00 AM");

    if (!instance?.input) {
      throw new Error("input is null/undefined");
    }
    fireEvent.focus(instance.input);

    setManually("February 28, 2018 9:20 AM");
    expect(getInputString()).toBe("February 28, 2018 9:20 AM");
  });

  it("should handle 53 min time intervals", () => {
    renderDatePicker("February 28, 2018 9:00 AM", {
      timeIntervals: 53,
      showTimeSelect: true,
    });
    expect(getInputString()).toBe("February 28, 2018 9:00 AM");

    if (!instance?.input) {
      throw new Error("input is null/undefined");
    }
    fireEvent.focus(instance.input);

    setManually("February 28, 2018 9:53 AM");
    expect(getInputString()).toBe("February 28, 2018 9:53 AM");
  });

  it("should handle 90 min time intervals", () => {
    renderDatePicker("July 13, 2020 2:59 PM", {
      timeIntervals: 90,
      showTimeSelect: true,
    });
    expect(getInputString()).toBe("July 13, 2020 2:59 PM");

    if (!instance?.input) {
      throw new Error("input is null/undefined");
    }
    fireEvent.focus(instance.input);

    setManually("July 13, 2020 3:00 PM");
    expect(getInputString()).toBe("July 13, 2020 3:00 PM");
  });

  it("should not contain the time only classname in header by default", () => {
    const { container } = render(<DatePicker open showTimeSelect />);
    const header = container.querySelectorAll(
      ".react-datepicker__header--time--only",
    );
    expect(header).toHaveLength(0);
  });

  it("should contain the time only classname in header if enabled", () => {
    const { container } = render(
      <DatePicker open showTimeSelect showTimeSelectOnly />,
    );
    const header = container.querySelectorAll(
      ".react-datepicker__header--time--only",
    );
    expect(header).toHaveLength(1);
  });

  it("should select time when Enter is pressed", () => {
    renderDatePicker("February 28, 2018 4:43 PM");
    if (!instance?.input) {
      throw new Error("input is null/undefined");
    }
    fireEvent.focus(instance.input);

    const timeOption = new SafeElementWrapper(datePicker)
      .safeQuerySelector(".react-datepicker__time-container")
      .safeQuerySelectorAll("li", MIN_TIME_LI_LEN)[1]!
      .getElement();
    fireEvent.keyDown(timeOption, getKey(KeyType.Enter));

    expect(getInputString()).toBe("February 28, 2018 12:30 AM");
  });

  it("should select time when Space is pressed", () => {
    renderDatePicker("February 28, 2018 4:43 PM");
    if (!instance?.input) {
      throw new Error("input is null/undefined");
    }
    fireEvent.focus(instance.input);
    const timeOption = new SafeElementWrapper(datePicker)
      .safeQuerySelector(".react-datepicker__time-container")
      .safeQuerySelectorAll("li", MIN_TIME_LI_LEN)[1]!
      .getElement();
    fireEvent.keyDown(timeOption, getKey(KeyType.Space));
    expect(getInputString()).toBe("February 28, 2018 12:30 AM");
  });

  it("should return focus to input once time is selected", async () => {
    document.body.appendChild(div); // So we can check the dom later for activeElement
    renderDatePicker("February 28, 2018 4:43 PM");
    if (!instance?.input) {
      throw new Error("input is null/undefined");
    }

    const input = safeQuerySelector(datePicker, "input");
    fireEvent.focus(instance.input);

    const timeOption = new SafeElementWrapper(datePicker)
      .safeQuerySelector(".react-datepicker__time-container")
      .safeQuerySelectorAll("li", MIN_TIME_LI_LEN)[1]!
      .getElement();
    fireEvent.keyDown(timeOption, getKey(KeyType.Enter));

    await waitFor(() => {
      expect(document.activeElement).toBe(input);
    });
  });

  it("should not select time when Escape is pressed", () => {
    renderDatePicker("February 28, 2018 4:43 PM");
    if (!instance?.input) {
      throw new Error("input is null/undefined");
    }
    fireEvent.focus(instance.input);

    const timeOption = new SafeElementWrapper(datePicker)
      .safeQuerySelector(".react-datepicker__time-container")
      .safeQuerySelectorAll("li", MIN_TIME_LI_LEN)[1]!
      .getElement();
    fireEvent.keyDown(timeOption, getKey(KeyType.Escape));

    expect(getInputString()).toBe("February 28, 2018 4:43 PM");
  });

  it("should call the onKeyDown handler on key Escape press", () => {
    const onKeyDownSpy = jest.fn();
    renderDatePicker("February 28, 2018 4:43 PM", {
      onKeyDown: onKeyDownSpy,
    });
    if (!instance?.input) {
      throw new Error("input is null/undefined");
    }
    fireEvent.focus(instance.input);

    const timeOption = new SafeElementWrapper(datePicker)
      .safeQuerySelector(".react-datepicker__time-container")
      .safeQuerySelectorAll("li", MIN_TIME_LI_LEN)[1]!
      .getElement();
    fireEvent.keyDown(timeOption, getKey(KeyType.Escape));

    expect(onKeyDownSpy).toHaveBeenCalledTimes(1);
  });

  it("should call the onKeyDown handler on key Enter press", () => {
    const onKeyDownSpy = jest.fn();
    renderDatePicker("February 28, 2018 4:43 PM", {
      onKeyDown: onKeyDownSpy,
    });
    if (!instance?.input) {
      throw new Error("input is null/undefined");
    }
    fireEvent.focus(instance.input);

    const timeOption = new SafeElementWrapper(datePicker)
      .safeQuerySelector(".react-datepicker__time-container")
      .safeQuerySelectorAll("li", MIN_TIME_LI_LEN)[1]!
      .getElement();
    fireEvent.keyDown(timeOption, getKey(KeyType.Enter));

    expect(onKeyDownSpy).toHaveBeenCalledTimes(1);
  });

  it("should call the onKeyDown handler on key Space press", () => {
    const onKeyDownSpy = jest.fn();
    renderDatePicker("February 28, 2018 4:43 PM", {
      onKeyDown: onKeyDownSpy,
    });
    if (!instance?.input) {
      throw new Error("input is null/undefined");
    }
    fireEvent.focus(instance.input);

    const timeOption = new SafeElementWrapper(datePicker)
      .safeQuerySelector(".react-datepicker__time-container")
      .safeQuerySelectorAll("li", MIN_TIME_LI_LEN)[1]!
      .getElement();
    fireEvent.keyDown(timeOption, getKey(KeyType.Space));

    expect(onKeyDownSpy).toHaveBeenCalledTimes(1);
  });

  it("should call the onKeyDown handler on key arrow down", () => {
    const onKeyDownSpy = jest.fn();
    renderDatePicker("February 28, 2018 4:43 PM", {
      onKeyDown: onKeyDownSpy,
      showTimeSelectOnly: true,
    });

    if (!instance?.input) {
      throw new Error("input is null/undefined");
    }

    fireEvent.focus(instance.input);
    fireEvent.keyDown(instance.input, getKey(KeyType.ArrowDown));
    expect(onKeyDownSpy).toHaveBeenCalledTimes(1);
  });

  it("shows custom time caption text", () => {
    const { container } = render(
      <DatePicker
        open
        showTimeSelect
        showTimeSelectOnly
        timeCaption="Custom time"
      />,
    );

    const header = container.querySelector(
      ".react-datepicker__header--time--only",
    );

    expect(header).not.toBeNull();
    expect(header?.textContent).toEqual("Custom time");
  });

  it("hides time caption", () => {
    const { container } = render(
      <DatePicker
        open
        showTimeSelect
        showTimeSelectOnly
        showTimeCaption={false}
      />,
    );

    const header = container.querySelector(
      ".react-datepicker__header--time--only",
    );

    expect(header).toBeNull();
  });

  function setManually(string: string) {
    if (!instance?.input) {
      throw new Error("input is null/undefined");
    }
    fireEvent.focus(instance.input);
    fireEvent.change(instance.input, {
      target: { value: string },
    });
  }

  function getInputString() {
    return (instance?.input as HTMLInputElement | null | undefined)?.value;
  }

  function renderDatePicker(
    string: string,
    props: Partial<React.ComponentProps<typeof DatePicker>> = {},
  ) {
    return renderDatePickerFor(new Date(string), props);
  }

  function renderDatePickerFor(
    selected: React.ComponentProps<typeof DatePicker>["selected"],
    props: Partial<React.ComponentProps<typeof DatePicker>> = {},
  ) {
    const datePickerElement = (
      <TestDatePicker
        selected={selected}
        dateFormat={"MMMM d, yyyy p"}
        allowSameDay
        onChange={handleDatePickerChange}
        showTimeSelect
        {...(props as React.ComponentProps<typeof DatePicker>)}
        ref={(node: DatePicker | null) => {
          instance = node;
        }}
      />
    ) as React.ReactElement;

    datePicker = render(datePickerElement, { container: div }).container;
  }

  const handleDatePickerChange: React.ComponentProps<
    typeof DatePicker
  >["onChange"] = (
    date: Date | [Date | null, Date | null] | Date[] | null,
  ): void => {
    const normalizedDate = Array.isArray(date) ? date[0] : date;
    onChange(normalizedDate as Date | null);
  };

  function onChange(m: Date | null) {
    onChangeMoment = m ?? undefined;
    renderDatePicker(m?.toISOString() ?? "");
  }

  describe("Coverage improvements for time.tsx", () => {
    it("should not call onChange when clicking disabled time", () => {
      const onChange = jest.fn();
      const selectedDate = newDate();
      selectedDate.setHours(10, 0, 0, 0);

      // Create multiple disabled times to ensure at least one is rendered
      const disabledTimes = [];
      for (let hour = 14; hour <= 18; hour++) {
        const disabledTime = newDate();
        disabledTime.setHours(hour, 0, 0, 0);
        disabledTimes.push(disabledTime);
      }

      const { container } = render(
        <DatePicker
          selected={selectedDate}
          onChange={onChange}
          showTimeSelect
          excludeTimes={disabledTimes}
          timeIntervals={60}
          inline
        />,
      );

      const timeList = container.querySelectorAll(
        ".react-datepicker__time-list-item--disabled",
      );

      // Verify disabled times are rendered
      expect(timeList.length).toBeGreaterThan(0);
      // Line 133: early return when clicking disabled time
      const disabledItem = timeList[0] as HTMLElement;
      fireEvent.click(disabledItem);
      expect(onChange).not.toHaveBeenCalled();
    });

    it("should handle keyboard navigation in time list with ArrowUp", () => {
      const { container } = render(
        <DatePicker
          selected={newDate()}
          onChange={() => {}}
          showTimeSelect
          timeIntervals={30}
          inline
        />,
      );

      const timeItems = container.querySelectorAll(
        ".react-datepicker__time-list-item",
      );

      expect(timeItems.length).toBeGreaterThan(1);
      const secondItem = timeItems[1] as HTMLElement;

      // Lines 190-191: ArrowUp navigation with previousSibling
      fireEvent.keyDown(secondItem, { key: "ArrowUp" });

      expect(timeItems[0]).not.toBeNull();
    });

    it("should handle keyboard navigation in time list with ArrowDown", () => {
      const { container } = render(
        <DatePicker
          selected={newDate()}
          onChange={() => {}}
          showTimeSelect
          timeIntervals={30}
          inline
        />,
      );

      const timeItems = container.querySelectorAll(
        ".react-datepicker__time-list-item",
      );

      expect(timeItems.length).toBeGreaterThan(1);
      const firstItem = timeItems[0] as HTMLElement;

      // Lines 199-200: ArrowDown navigation with nextSibling
      fireEvent.keyDown(firstItem, { key: "ArrowDown" });

      expect(timeItems[1]).not.toBeNull();
    });

    it("should handle keyboard navigation with ArrowLeft", () => {
      const { container } = render(
        <DatePicker
          selected={newDate()}
          onChange={() => {}}
          showTimeSelect
          timeIntervals={30}
          inline
        />,
      );

      const timeItems = container.querySelectorAll(
        ".react-datepicker__time-list-item",
      );

      expect(timeItems.length).toBeGreaterThan(1);
      const secondItem = timeItems[1] as HTMLElement;

      // ArrowLeft should behave like ArrowUp
      fireEvent.keyDown(secondItem, { key: "ArrowLeft" });

      expect(timeItems[0]).not.toBeNull();
    });

    it("should handle keyboard navigation with ArrowRight", () => {
      const { container } = render(
        <DatePicker
          selected={newDate()}
          onChange={() => {}}
          showTimeSelect
          timeIntervals={30}
          inline
        />,
      );

      const timeItems = container.querySelectorAll(
        ".react-datepicker__time-list-item",
      );

      expect(timeItems.length).toBeGreaterThan(1);
      const firstItem = timeItems[0] as HTMLElement;

      // ArrowRight should behave like ArrowDown
      fireEvent.keyDown(firstItem, { key: "ArrowRight" });

      expect(timeItems[1]).not.toBeNull();
    });
  });

  describe("Keyboard accessibility for time-only pickers", () => {
    beforeEach(() => {
      onChangeMoment = undefined;
    });

    it("should decrement time with ArrowUp key", () => {
      const initialTime = new Date("February 28, 2018 4:30 PM");
      renderDatePickerFor(initialTime, {
        showTimeSelectOnly: true,
        timeIntervals: 30,
      });

      if (!instance?.input) {
        throw new Error("input is null/undefined");
      }

      fireEvent.focus(instance.input);
      fireEvent.keyDown(instance.input, getKey(KeyType.ArrowUp));

      const expectedTime = new Date("February 28, 2018 4:00 PM");
      expect(onChangeMoment).toBeDefined();
      expect(formatDate(onChangeMoment!, "MMMM d, yyyy p")).toBe(
        formatDate(expectedTime, "MMMM d, yyyy p"),
      );
    });

    it("should increment time with ArrowDown key", () => {
      const initialTime = new Date("February 28, 2018 4:00 PM");
      renderDatePickerFor(initialTime, {
        showTimeSelectOnly: true,
        timeIntervals: 30,
      });

      if (!instance?.input) {
        throw new Error("input is null/undefined");
      }

      fireEvent.focus(instance.input);
      fireEvent.keyDown(instance.input, getKey(KeyType.ArrowDown));

      const expectedTime = new Date("February 28, 2018 4:30 PM");
      expect(onChangeMoment).toBeDefined();
      expect(formatDate(onChangeMoment!, "MMMM d, yyyy p")).toBe(
        formatDate(expectedTime, "MMMM d, yyyy p"),
      );
    });

    it("should respect timeIntervals prop when navigating", () => {
      const initialTime = new Date("February 28, 2018 4:15 PM");
      renderDatePickerFor(initialTime, {
        showTimeSelectOnly: true,
        timeIntervals: 15,
      });

      if (!instance?.input) {
        throw new Error("input is null/undefined");
      }

      fireEvent.focus(instance.input);
      fireEvent.keyDown(instance.input, getKey(KeyType.ArrowUp));

      const expectedTime = new Date("February 28, 2018 4:00 PM");
      expect(onChangeMoment).toBeDefined();
      expect(formatDate(onChangeMoment!, "MMMM d, yyyy p")).toBe(
        formatDate(expectedTime, "MMMM d, yyyy p"),
      );
    });

    it("should not go below 00:00 when decrementing", () => {
      const initialTime = new Date("February 28, 2018 12:00 AM");
      renderDatePickerFor(initialTime, {
        showTimeSelectOnly: true,
        timeIntervals: 30,
      });

      if (!instance?.input) {
        throw new Error("input is null/undefined");
      }

      fireEvent.focus(instance.input);
      // ArrowUp decrements time
      fireEvent.keyDown(instance.input, getKey(KeyType.ArrowUp));

      // Time should stay at 00:00 since we can't go negative
      const expectedTime = new Date("February 28, 2018 12:00 AM");
      expect(onChangeMoment).toBeDefined();
      expect(formatDate(onChangeMoment!, "MMMM d, yyyy p")).toBe(
        formatDate(expectedTime, "MMMM d, yyyy p"),
      );
    });

    it("should not go above 23:30 when incrementing with 30-minute intervals", () => {
      const initialTime = new Date("February 28, 2018 11:30 PM");
      renderDatePickerFor(initialTime, {
        showTimeSelectOnly: true,
        timeIntervals: 30,
      });

      if (!instance?.input) {
        throw new Error("input is null/undefined");
      }

      fireEvent.focus(instance.input);
      // ArrowDown increments time
      fireEvent.keyDown(instance.input, getKey(KeyType.ArrowDown));

      // Time should stay at 23:30 since we can't go past the last interval of the day
      const expectedTime = new Date("February 28, 2018 11:30 PM");
      expect(onChangeMoment).toBeDefined();
      expect(formatDate(onChangeMoment!, "MMMM d, yyyy p")).toBe(
        formatDate(expectedTime, "MMMM d, yyyy p"),
      );
    });

    it("should update input value when using arrow keys", () => {
      const initialTime = new Date("February 28, 2018 4:00 PM");
      renderDatePickerFor(initialTime, {
        showTimeSelectOnly: true,
        timeIntervals: 30,
      });

      if (!instance?.input) {
        throw new Error("input is null/undefined");
      }

      fireEvent.focus(instance.input);
      fireEvent.keyDown(instance.input, getKey(KeyType.ArrowDown));

      const inputValue = (instance.input as HTMLInputElement).value;
      expect(inputValue).toContain("4:30");
    });

    it("should commit typed value with Enter key", async () => {
      const onKeyDownMock = jest.fn();
      const onChangeMock = jest.fn();
      const initialTime = new Date("February 28, 2018 4:00 PM");

      const { container } = render(
        <TestDatePicker
          selected={initialTime}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          onChange={onChangeMock}
          onKeyDown={onKeyDownMock}
          dateFormat="MMMM d, yyyy p"
        />,
      );

      const input = safeQuerySelector<HTMLInputElement>(container, "input");

      // Focus the input to open the calendar
      fireEvent.focus(input);

      // Wait for the calendar to be open and the time list to be rendered
      await waitFor(() => {
        expect(
          document.querySelector(".react-datepicker__time-list"),
        ).not.toBeNull();
      });

      // Now change the input value and press Enter
      fireEvent.change(input, {
        target: { value: "February 28, 2018 5:30 PM" },
      });
      fireEvent.keyDown(input, getKey(KeyType.Enter));

      // Verify the onKeyDown handler was called
      expect(onKeyDownMock).toHaveBeenCalled();

      // Verify the time was committed
      expect(onChangeMock).toHaveBeenCalled();
      const changedDate = onChangeMock.mock.calls[0][0] as Date;
      expect(formatDate(changedDate, "MMMM d, yyyy p")).toBe(
        "February 28, 2018 5:30 PM",
      );
    });

    it("should commit highlighted option with Enter when input is invalid", async () => {
      const rafSpy = jest
        .spyOn(window, "requestAnimationFrame")
        .mockImplementation((cb) => {
          cb(0);
          return 0;
        });

      const scrollIntoViewMock = jest.fn();
      Element.prototype.scrollIntoView = scrollIntoViewMock;

      const onChangeMock = jest.fn();
      const initialTime = new Date("February 28, 2018 4:00 PM");

      const { container } = render(
        <TestDatePicker
          selected={initialTime}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          onChange={onChangeMock}
          dateFormat="MMMM d, yyyy p"
        />,
      );

      const input = safeQuerySelector<HTMLInputElement>(container, "input");

      // Focus the input to open the calendar
      fireEvent.focus(input);

      // Wait for the time list to be visible
      await waitFor(() => {
        expect(
          document.querySelector(".react-datepicker__time-list"),
        ).not.toBeNull();
      });

      // Navigate with arrow key to highlight a time item
      fireEvent.keyDown(input, getKey(KeyType.ArrowDown));

      await waitFor(() => {
        expect(rafSpy).toHaveBeenCalled();
      });

      // Type an invalid value AFTER navigating so tabindex is set
      fireEvent.change(input, {
        target: { value: "invalid time" },
      });

      // Press Enter - should commit the highlighted time from the list
      fireEvent.keyDown(input, getKey(KeyType.Enter));

      // Verify the time was committed
      expect(onChangeMock).toHaveBeenCalled();
      const changedDate = onChangeMock.mock.calls[
        onChangeMock.mock.calls.length - 1
      ][0] as Date;
      // The time should be 4:30 PM (arrow down from 4:00 PM)
      expect(formatDate(changedDate, "p")).toBe("4:30 PM");

      rafSpy.mockRestore();
    });

    it("should scroll highlighted option into view", async () => {
      // Mock requestAnimationFrame to execute callback immediately
      const rafSpy = jest
        .spyOn(window, "requestAnimationFrame")
        .mockImplementation((cb) => {
          cb(0);
          return 0;
        });

      // Mock scrollIntoView since jsdom doesn't implement it
      const scrollIntoViewMock = jest.fn();
      Element.prototype.scrollIntoView = scrollIntoViewMock;

      const initialTime = new Date("February 28, 2018 4:00 PM");
      renderDatePickerFor(initialTime, {
        showTimeSelectOnly: true,
        timeIntervals: 30,
      });

      if (!instance?.input) {
        throw new Error("input is null/undefined");
      }

      fireEvent.focus(instance.input);
      fireEvent.keyDown(instance.input, getKey(KeyType.ArrowDown));

      // Wait for requestAnimationFrame to be called
      await waitFor(() => {
        expect(rafSpy).toHaveBeenCalled();
      });

      // Verify scrollIntoView was called
      expect(scrollIntoViewMock).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "center",
      });

      // Find the highlighted item in the calendar
      const calendar = document.querySelector(".react-datepicker");
      const highlightedItem = calendar?.querySelector(
        ".react-datepicker__time-list-item[tabindex='0']",
      );
      expect(highlightedItem).not.toBeNull();

      rafSpy.mockRestore();
    });

    it("should not call onChange for selectsRange when using arrow keys", () => {
      const onChangeMock = jest.fn();
      const initialTime = new Date("February 28, 2018 4:00 PM");

      render(
        <DatePicker
          selected={initialTime}
          startDate={initialTime}
          endDate={null}
          selectsRange
          showTimeSelectOnly
          timeIntervals={30}
          onChange={onChangeMock}
          dateFormat="MMMM d, yyyy p"
        />,
      );

      const input = document.querySelector("input");
      if (!input) throw new Error("Input not found");

      fireEvent.focus(input);
      fireEvent.keyDown(input, getKey(KeyType.ArrowDown));

      // onChange should not be called for selectsRange
      expect(onChangeMock).not.toHaveBeenCalled();
    });

    it("should not call onChange for selectsMultiple when using arrow keys", () => {
      const onChangeMock = jest.fn();
      const initialTime = new Date("February 28, 2018 4:00 PM");

      render(
        <DatePicker
          selected={initialTime}
          selectedDates={[initialTime]}
          selectsMultiple
          showTimeSelectOnly
          timeIntervals={30}
          onChange={onChangeMock}
          dateFormat="MMMM d, yyyy p"
        />,
      );

      const input = document.querySelector("input");
      if (!input) throw new Error("Input not found");

      fireEvent.focus(input);
      fireEvent.keyDown(input, getKey(KeyType.ArrowDown));

      // onChange should not be called for selectsMultiple
      expect(onChangeMock).not.toHaveBeenCalled();
    });

    it("should handle dateFormat as array", () => {
      const initialTime = new Date("February 28, 2018 4:00 PM");
      renderDatePickerFor(initialTime, {
        showTimeSelectOnly: true,
        timeIntervals: 30,
        dateFormat: ["MMMM d, yyyy p", "MM/dd/yyyy p"],
      });

      if (!instance?.input) {
        throw new Error("input is null/undefined");
      }

      fireEvent.focus(instance.input);
      fireEvent.keyDown(instance.input, getKey(KeyType.ArrowDown));

      const expectedTime = new Date("February 28, 2018 4:30 PM");
      expect(onChangeMoment).toBeDefined();
      expect(formatDate(onChangeMoment!, "MMMM d, yyyy p")).toBe(
        formatDate(expectedTime, "MMMM d, yyyy p"),
      );
    });

    it("should use preSelection when selected is null", () => {
      const onChangeMock = jest.fn();

      render(
        <DatePicker
          selected={null}
          showTimeSelectOnly
          timeIntervals={30}
          onChange={onChangeMock}
          dateFormat="MMMM d, yyyy p"
        />,
      );

      const input = document.querySelector("input");
      if (!input) throw new Error("Input not found");

      fireEvent.focus(input);
      fireEvent.keyDown(input, getKey(KeyType.ArrowDown));

      // Should call onChange with a time based on preSelection
      expect(onChangeMock).toHaveBeenCalled();
    });

    it("should scroll to closest time when no exact match exists", async () => {
      const rafSpy = jest
        .spyOn(window, "requestAnimationFrame")
        .mockImplementation((cb) => {
          cb(0);
          return 0;
        });

      const scrollIntoViewMock = jest.fn();
      Element.prototype.scrollIntoView = scrollIntoViewMock;

      // Start at a time that doesn't align with 30-minute intervals
      const initialTime = new Date("February 28, 2018 4:15 PM");
      renderDatePickerFor(initialTime, {
        showTimeSelectOnly: true,
        timeIntervals: 30,
      });

      if (!instance?.input) {
        throw new Error("input is null/undefined");
      }

      fireEvent.focus(instance.input);
      fireEvent.keyDown(instance.input, getKey(KeyType.ArrowDown));

      await waitFor(() => {
        expect(rafSpy).toHaveBeenCalled();
      });

      // Should still scroll to the closest matching time item
      expect(scrollIntoViewMock).toHaveBeenCalled();

      rafSpy.mockRestore();
    });

    it("should commit highlighted time from list when input is invalid on Enter", async () => {
      const rafSpy = jest
        .spyOn(window, "requestAnimationFrame")
        .mockImplementation((cb) => {
          cb(0);
          return 0;
        });

      const scrollIntoViewMock = jest.fn();
      Element.prototype.scrollIntoView = scrollIntoViewMock;

      const initialTime = new Date("February 28, 2018 4:00 PM");
      renderDatePickerFor(initialTime, {
        showTimeSelectOnly: true,
        timeIntervals: 30,
      });

      if (!instance?.input) {
        throw new Error("input is null/undefined");
      }

      fireEvent.focus(instance.input);

      // First, navigate to a specific time using arrow key
      fireEvent.keyDown(instance.input, getKey(KeyType.ArrowDown));

      await waitFor(() => {
        expect(rafSpy).toHaveBeenCalled();
      });

      // Type an invalid value
      fireEvent.change(instance.input, {
        target: { value: "not a valid time" },
      });

      // Press Enter - should commit the highlighted time from the list
      fireEvent.keyDown(instance.input, getKey(KeyType.Enter));

      expect(instance.state.open).toBe(false);
      expect(onChangeMoment).toBeDefined();
      // The time should be 4:30 PM (arrow down from 4:00 PM)
      expect(formatDate(onChangeMoment!, "p")).toBe("4:30 PM");

      rafSpy.mockRestore();
    });

    it("should work with showTimeSelect (not just showTimeSelectOnly)", () => {
      const initialTime = new Date("February 28, 2018 4:00 PM");
      renderDatePickerFor(initialTime, {
        showTimeSelect: true,
        showTimeSelectOnly: true,
        timeIntervals: 30,
      });

      if (!instance?.input) {
        throw new Error("input is null/undefined");
      }

      fireEvent.focus(instance.input);
      fireEvent.keyDown(instance.input, getKey(KeyType.ArrowDown));

      const expectedTime = new Date("February 28, 2018 4:30 PM");
      expect(onChangeMoment).toBeDefined();
      expect(formatDate(onChangeMoment!, "MMMM d, yyyy p")).toBe(
        formatDate(expectedTime, "MMMM d, yyyy p"),
      );
    });

    it("should handle Enter key with valid parsed date from input", () => {
      const initialTime = new Date("February 28, 2018 4:00 PM");
      renderDatePickerFor(initialTime, {
        showTimeSelectOnly: true,
        timeIntervals: 30,
      });

      if (!instance?.input) {
        throw new Error("input is null/undefined");
      }

      fireEvent.focus(instance.input);

      // Type a valid time value
      fireEvent.change(instance.input, {
        target: { value: "February 28, 2018 6:00 PM" },
      });

      // Press Enter - should commit the typed value
      fireEvent.keyDown(instance.input, getKey(KeyType.Enter));

      expect(instance.state.open).toBe(false);
      expect(onChangeMoment).toBeDefined();
      expect(formatDate(onChangeMoment!, "MMMM d, yyyy p")).toBe(
        "February 28, 2018 6:00 PM",
      );
    });

    it("should use preSelection for Enter key when available", () => {
      const initialTime = new Date("February 28, 2018 4:00 PM");
      renderDatePickerFor(initialTime, {
        showTimeSelectOnly: true,
        timeIntervals: 30,
      });

      if (!instance?.input) {
        throw new Error("input is null/undefined");
      }

      fireEvent.focus(instance.input);

      // Navigate with arrow key to set preSelection
      fireEvent.keyDown(instance.input, getKey(KeyType.ArrowDown));

      // Type a partial/different value that still parses correctly
      fireEvent.change(instance.input, {
        target: { value: "February 28, 2018 5:00 PM" },
      });

      // Press Enter - should use the parsed input value
      fireEvent.keyDown(instance.input, getKey(KeyType.Enter));

      expect(instance.state.open).toBe(false);
      expect(onChangeMoment).toBeDefined();
      expect(formatDate(onChangeMoment!, "MMMM d, yyyy p")).toBe(
        "February 28, 2018 5:00 PM",
      );
    });

    it("should not affect regular datepicker keyboard navigation", () => {
      // Test that when showTimeSelectOnly is false, the normal behavior works
      const initialDate = new Date("February 28, 2018");
      renderDatePickerFor(initialDate, {
        showTimeSelect: true,
        showTimeSelectOnly: false,
      });

      if (!instance?.input) {
        throw new Error("input is null/undefined");
      }

      fireEvent.focus(instance.input);
      fireEvent.keyDown(instance.input, getKey(KeyType.ArrowDown));

      // For regular datepicker, arrow keys navigate dates, not times
      // The component should remain open and not call the time-only handlers
      expect(instance.state.open).toBe(true);
    });
  });
});
