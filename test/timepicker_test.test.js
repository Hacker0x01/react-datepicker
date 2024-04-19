import React from "react";
import DatePicker from "../src/index.jsx";
import { newDate, formatDate } from "../src/date_utils.ts";
import { getKey } from "./test_utils.js";
import { render, fireEvent, waitFor } from "@testing-library/react";

describe("TimePicker", () => {
  let datePicker;
  let div;
  let onChangeMoment;
  let instance;

  beforeEach(() => {
    div = document.createElement("div");
  });

  it("should update on input time change", () => {
    renderDatePicker("February 28, 2018 4:43 PM");
    expect(getInputString()).toBe("February 28, 2018 4:43 PM");

    setManually("February 28, 2018 4:45 PM");
    expect(formatDate(onChangeMoment, "MMMM d, yyyy p")).toBe(
      "February 28, 2018 4:45 PM",
    );
  });

  it("should allow time changes after input change", () => {
    renderDatePicker("February 28, 2018 4:43 PM");
    setManually("February 28, 2018 4:45 PM");
    fireEvent.focus(instance.input);

    const time = datePicker.querySelector(".react-datepicker__time-container");
    const lis = time.querySelectorAll("li");
    fireEvent.click(lis[1]);
    expect(getInputString()).toBe("February 28, 2018 12:30 AM");
  });

  it("should allow for injected date if input does not have focus", () => {
    renderDatePicker("February 28, 2018 4:43 PM");
    setManually("February 28, 2018 4:45 PM");
    fireEvent.blur(instance.input);
    renderDatePicker("February 28, 2018 4:43 PM");
    expect(getInputString()).toBe("February 28, 2018 4:43 PM");
  });

  it("should not close datepicker after time clicked when shouldCloseOnSelect is false", () => {
    let instance;
    const { container } = render(
      <DatePicker
        ref={(node) => {
          instance = node;
        }}
        shouldCloseOnSelect={false}
        showTimeSelect
      />,
    );
    fireEvent.focus(instance.input);
    const time = container.querySelector(".react-datepicker__time-container");
    const lis = time.querySelectorAll("li");
    fireEvent.click(lis[0]);
    expect(instance.state.open).toBe(true);
  });

  it("should show different colors for times", () => {
    const handleTimeColors = (time) => {
      return time.getHours() < 12 ? "red" : "green";
    };
    const { container } = render(
      <DatePicker
        showTimeSelect
        showTimeSelectOnly
        timeClassName={handleTimeColors}
        open
        focus
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
    fireEvent.focus(instance.input);
    const time = datePicker.querySelector(".react-datepicker__time-container");
    const lis = time.querySelectorAll("li");
    fireEvent.keyDown(lis[1], getKey("Enter"));
    expect(getInputString()).toBe("February 28, 2018 12:30 AM");
  });

  it("should select time when Space is pressed", () => {
    renderDatePicker("February 28, 2018 4:43 PM");
    fireEvent.focus(instance.input);
    const time = datePicker.querySelector(".react-datepicker__time-container");
    const lis = time.querySelectorAll("li");
    fireEvent.keyDown(lis[1], getKey(" "));
    expect(getInputString()).toBe("February 28, 2018 12:30 AM");
  });

  it("should return focus to input once time is selected", async () => {
    document.body.appendChild(div); // So we can check the dom later for activeElement
    renderDatePicker("February 28, 2018 4:43 PM");
    const input = datePicker.querySelector("input");
    fireEvent.focus(instance.input);
    const time = datePicker.querySelector(".react-datepicker__time-container");
    const lis = time.querySelectorAll("li");
    fireEvent.keyDown(lis[1], getKey("Enter"));

    await waitFor(() => {
      expect(document.activeElement).toBe(input);
    });
  });

  it("should not select time when Escape is pressed", () => {
    renderDatePicker("February 28, 2018 4:43 PM");
    fireEvent.focus(instance.input);
    const time = datePicker.querySelector(".react-datepicker__time-container");
    const lis = time.querySelectorAll("li");
    fireEvent.keyDown(lis[1], getKey("Escape"));
    expect(getInputString()).toBe("February 28, 2018 4:43 PM");
  });

  it("should call the onKeyDown handler on key Escape press", () => {
    const onKeyDownSpy = jest.fn();
    renderDatePicker("February 28, 2018 4:43 PM", {
      onKeyDown: onKeyDownSpy,
    });
    fireEvent.focus(instance.input);
    const time = datePicker.querySelector(".react-datepicker__time-container");
    const lis = time.querySelectorAll("li");
    fireEvent.keyDown(lis[1], getKey("Escape"));
    expect(onKeyDownSpy).toHaveBeenCalledTimes(1);
  });

  it("should call the onKeyDown handler on key Enter press", () => {
    const onKeyDownSpy = jest.fn();
    renderDatePicker("February 28, 2018 4:43 PM", {
      onKeyDown: onKeyDownSpy,
    });
    fireEvent.focus(instance.input);
    const time = datePicker.querySelector(".react-datepicker__time-container");
    const lis = time.querySelectorAll("li");
    fireEvent.keyDown(lis[1], getKey("Enter"));
    expect(onKeyDownSpy).toHaveBeenCalledTimes(1);
  });

  it("should call the onKeyDown handler on key Space press", () => {
    const onKeyDownSpy = jest.fn();
    renderDatePicker("February 28, 2018 4:43 PM", {
      onKeyDown: onKeyDownSpy,
    });
    fireEvent.focus(instance.input);
    const time = datePicker.querySelector(".react-datepicker__time-container");
    const lis = time.querySelectorAll("li");
    fireEvent.keyDown(lis[1], getKey(" "));
    expect(onKeyDownSpy).toHaveBeenCalledTimes(1);
  });

  function setManually(string) {
    fireEvent.focus(instance.input);
    fireEvent.change(instance.input, { target: { value: string } });
  }

  function getInputString() {
    return instance.input.value;
  }

  function renderDatePicker(string, props) {
    return renderDatePickerFor(new Date(string), props);
  }

  function renderDatePickerFor(selected, props) {
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
      div,
    ).container;
  }

  function onChange(m) {
    onChangeMoment = newDate(m);
    renderDatePicker(m);
  }
});
