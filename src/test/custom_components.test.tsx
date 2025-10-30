import { render, fireEvent } from "@testing-library/react";
import React from "react";

import CustomInput from "./helper_components/custom_input";
import CustomTimeInput from "./helper_components/custom_time_input";

describe("CustomInput", () => {
  it("should call onChange when input value changes", () => {
    const onChange = jest.fn();
    const { container } = render(<CustomInput onChange={onChange} />);

    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test value" } });

    // Line 22: onChange is called
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(expect.any(Object), "test value");
  });

  it("should handle onChange without onChangeArgs", () => {
    const onChange = jest.fn();
    const { container } = render(<CustomInput onChange={onChange} />);

    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "hello" } });

    expect(onChange).toHaveBeenCalledWith(expect.any(Object), "hello");
  });

  it("should use onChangeArgs when provided", () => {
    const onChange = jest.fn();
    const onChangeArgs = (
      event: React.ChangeEvent<HTMLInputElement>,
    ): [React.ChangeEvent<HTMLInputElement>, string] => {
      return [event, `modified: ${event.target.value}`];
    };

    const { container } = render(
      <CustomInput onChange={onChange} onChangeArgs={onChangeArgs} />,
    );

    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test" } });

    // Lines 19-20: onChangeArgs is used
    expect(onChange).toHaveBeenCalledWith(expect.any(Object), "modified: test");
  });

  it("should not throw when onChange is not provided", () => {
    const { container } = render(<CustomInput />);

    const input = container.querySelector("input") as HTMLInputElement;

    expect(() =>
      fireEvent.change(input, { target: { value: "test" } }),
    ).not.toThrow();
  });

  it("should render input element", () => {
    const { container } = render(<CustomInput />);

    const input = container.querySelector("input");
    expect(input).not.toBeNull();
  });
});

describe("CustomTimeInput", () => {
  it("should call onChange when time input value changes", () => {
    const onChange = jest.fn();
    const { container } = render(<CustomTimeInput onChange={onChange} />);

    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "12:30" } });

    // Line 20: onChange is called
    expect(onChange).toHaveBeenCalled();
  });

  it("should not throw when onChange is not provided", () => {
    const { container } = render(<CustomTimeInput />);

    const input = container.querySelector("input") as HTMLInputElement;

    expect(() =>
      fireEvent.change(input, { target: { value: "10:00" } }),
    ).not.toThrow();
  });

  it("should render input element", () => {
    const { container } = render(<CustomTimeInput />);

    const input = container.querySelector("input");
    expect(input).not.toBeNull();
  });
});
