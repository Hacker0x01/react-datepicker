import { render, fireEvent, waitFor } from "@testing-library/react";
import React from "react";

import { formatDate, KeyType } from "../date_utils";
import DatePicker from "../index";

import { getKey, safeQuerySelector, safeQuerySelectorAll } from "./test_utils";

const MIN_TIME_LI_LEN = 2;

describe("TimePicker", () => {
  let datePicker: HTMLDivElement;
  let div: HTMLDivElement;
  let onChangeMoment: Date | undefined;
  let instance: DatePicker | null = null;

  beforeEach(() => {
    div = document.createElement("div");
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

    const time = safeQuerySelector(
      datePicker,
      ".react-datepicker__time-container",
    );
    const lis = safeQuerySelectorAll(time, "li", MIN_TIME_LI_LEN);
    fireEvent.click(lis[1]!);
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
    const time = safeQuerySelector(
      datePicker,
      ".react-datepicker__time-container",
    );
    const lis = safeQuerySelectorAll(time, "li", MIN_TIME_LI_LEN);
    fireEvent.keyDown(lis[1]!, getKey(KeyType.Enter));
    expect(getInputString()).toBe("February 28, 2018 12:30 AM");
  });

  it("should select time when Space is pressed", () => {
    renderDatePicker("February 28, 2018 4:43 PM");
    if (!instance?.input) {
      throw new Error("input is null/undefined");
    }
    fireEvent.focus(instance.input);
    const time = safeQuerySelector(
      datePicker,
      ".react-datepicker__time-container",
    );
    const lis = safeQuerySelectorAll(time, "li", MIN_TIME_LI_LEN);
    fireEvent.keyDown(lis[1]!, getKey(KeyType.Space));
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
    const time = safeQuerySelector(
      datePicker,
      ".react-datepicker__time-container",
    );
    const lis = safeQuerySelectorAll(time, "li", MIN_TIME_LI_LEN);
    fireEvent.keyDown(lis[1]!, getKey(KeyType.Enter));

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
    const time = safeQuerySelector(
      datePicker,
      ".react-datepicker__time-container",
    );
    const lis = safeQuerySelectorAll(time, "li", MIN_TIME_LI_LEN);
    fireEvent.keyDown(lis[1]!, getKey(KeyType.Escape));
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
    const time = safeQuerySelector(
      datePicker,
      ".react-datepicker__time-container",
    );
    const lis = safeQuerySelectorAll(time, "li", MIN_TIME_LI_LEN);
    fireEvent.keyDown(lis[1]!, getKey(KeyType.Escape));
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
    const time = safeQuerySelector(
      datePicker,
      ".react-datepicker__time-container",
    );
    const lis = safeQuerySelectorAll(time, "li", MIN_TIME_LI_LEN);
    fireEvent.keyDown(lis[1]!, getKey(KeyType.Enter));
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
    const time = safeQuerySelector(
      datePicker,
      ".react-datepicker__time-container",
    );
    const lis = safeQuerySelectorAll(time, "li", MIN_TIME_LI_LEN);
    fireEvent.keyDown(lis[1]!, getKey(KeyType.Space));
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
});
