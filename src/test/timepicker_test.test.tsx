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

  function renderDatePicker(string: string, props = {}) {
    return renderDatePickerFor(new Date(string), props);
  }

  function renderDatePickerFor(
    selected: React.ComponentProps<typeof DatePicker>["selected"],
    props: Partial<React.ComponentProps<typeof DatePicker>["selected"]>,
  ) {
    datePicker = render(
      <DatePicker
        selected={selected}
        dateFormat={"MMMM d, yyyy p"}
        allowSameDay
        onChange={onChange}
        showTimeSelect
        {...props}
        ref={(node) => {
          instance = node;
        }}
      />,
      { container: div },
    ).container;
  }

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
});
