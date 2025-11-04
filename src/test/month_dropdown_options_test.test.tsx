import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MonthDropdownOptions from "../month_dropdown_options";

// Mock ClickOutsideWrapper
jest.mock("../click_outside_wrapper", () => ({
  ClickOutsideWrapper: ({
    children,
    onClickOutside,
    className,
  }: {
    children: React.ReactNode;
    onClickOutside: () => void;
    className?: string;
  }) => (
    <div
      data-testid="click-outside-wrapper"
      className={className}
      onClick={(e) => {
        if ((e.target as HTMLElement).getAttribute("data-outside")) {
          onClickOutside();
        }
      }}
    >
      {children}
    </div>
  ),
}));

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

describe("MonthDropdownOptions", () => {
  const defaultProps = {
    onCancel: jest.fn(),
    onChange: jest.fn(),
    month: 0,
    monthNames,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render all month options", () => {
    const { getByText } = render(<MonthDropdownOptions {...defaultProps} />);

    monthNames.forEach((monthName) => {
      expect(getByText(monthName)).toBeTruthy();
    });
  });

  it("should mark selected month with checkmark", () => {
    const { container } = render(
      <MonthDropdownOptions {...defaultProps} month={3} />,
    );

    const selectedOption = container.querySelector(
      ".react-datepicker__month-option--selected_month",
    );
    expect(selectedOption?.textContent).toContain("✓");
    expect(selectedOption?.textContent).toContain("April");
  });

  it("should call onChange when month is clicked", () => {
    const handleChange = jest.fn();
    const { getByText } = render(
      <MonthDropdownOptions {...defaultProps} onChange={handleChange} />,
    );

    fireEvent.click(getByText("June"));

    expect(handleChange).toHaveBeenCalledWith(5);
  });

  it("should call onChange with correct index", () => {
    const handleChange = jest.fn();
    const { getByText } = render(
      <MonthDropdownOptions {...defaultProps} onChange={handleChange} />,
    );

    fireEvent.click(getByText("December"));

    expect(handleChange).toHaveBeenCalledWith(11);
  });

  it("should call onCancel when Escape key is pressed", () => {
    const handleCancel = jest.fn();
    const { container } = render(
      <MonthDropdownOptions {...defaultProps} onCancel={handleCancel} />,
    );

    const monthOption = container.querySelector(
      ".react-datepicker__month-option",
    );
    fireEvent.keyDown(monthOption!, { key: "Escape" });

    expect(handleCancel).toHaveBeenCalled();
  });

  it("should call onChange when Enter key is pressed", () => {
    const handleChange = jest.fn();
    const { container } = render(
      <MonthDropdownOptions {...defaultProps} onChange={handleChange} />,
    );

    const monthOptions = container.querySelectorAll(
      ".react-datepicker__month-option",
    );
    fireEvent.keyDown(monthOptions[5], { key: "Enter" });

    expect(handleChange).toHaveBeenCalledWith(5);
  });

  it("should focus next month on ArrowDown", () => {
    const { container } = render(
      <MonthDropdownOptions {...defaultProps} month={3} />,
    );

    const aprilOption = container.querySelectorAll(
      ".react-datepicker__month-option",
    )[3] as HTMLElement;

    fireEvent.keyDown(aprilOption, { key: "ArrowDown" });

    const mayOption = container.querySelectorAll(
      ".react-datepicker__month-option",
    )[4] as HTMLElement;

    expect(document.activeElement).toBe(mayOption);
  });

  it("should focus previous month on ArrowUp", () => {
    const { container } = render(
      <MonthDropdownOptions {...defaultProps} month={5} />,
    );

    const juneOption = container.querySelectorAll(
      ".react-datepicker__month-option",
    )[5] as HTMLElement;

    fireEvent.keyDown(juneOption, { key: "ArrowUp" });

    const mayOption = container.querySelectorAll(
      ".react-datepicker__month-option",
    )[4] as HTMLElement;

    expect(document.activeElement).toBe(mayOption);
  });

  it("should wrap around to December when pressing ArrowUp on January", () => {
    const { container } = render(
      <MonthDropdownOptions {...defaultProps} month={0} />,
    );

    const januaryOption = container.querySelectorAll(
      ".react-datepicker__month-option",
    )[0] as HTMLElement;

    fireEvent.keyDown(januaryOption, { key: "ArrowUp" });

    const decemberOption = container.querySelectorAll(
      ".react-datepicker__month-option",
    )[11] as HTMLElement;

    expect(document.activeElement).toBe(decemberOption);
  });

  it("should wrap around to January when pressing ArrowDown on December", () => {
    const { container } = render(
      <MonthDropdownOptions {...defaultProps} month={11} />,
    );

    const decemberOption = container.querySelectorAll(
      ".react-datepicker__month-option",
    )[11] as HTMLElement;

    fireEvent.keyDown(decemberOption, { key: "ArrowDown" });

    const januaryOption = container.querySelectorAll(
      ".react-datepicker__month-option",
    )[0] as HTMLElement;

    expect(document.activeElement).toBe(januaryOption);
  });

  it("should set aria-selected on selected month", () => {
    const { container } = render(
      <MonthDropdownOptions {...defaultProps} month={6} />,
    );

    const selectedOption = container.querySelector(
      '[aria-selected="true"]',
    ) as HTMLElement;
    expect(selectedOption.textContent).toContain("July");
  });

  it("should not set aria-selected on non-selected months", () => {
    const { container } = render(
      <MonthDropdownOptions {...defaultProps} month={6} />,
    );

    const monthOptions = container.querySelectorAll(
      ".react-datepicker__month-option",
    );
    const nonSelectedOptions = Array.from(monthOptions).filter(
      (_, index) => index !== 6,
    );

    nonSelectedOptions.forEach((option) => {
      expect(option.getAttribute("aria-selected")).toBeNull();
    });
  });

  it("should have role='button' on month options", () => {
    const { container } = render(<MonthDropdownOptions {...defaultProps} />);

    const monthOptions = container.querySelectorAll(
      ".react-datepicker__month-option",
    );

    monthOptions.forEach((option) => {
      expect(option.getAttribute("role")).toBe("button");
    });
  });

  it("should have tabIndex=0 on month options", () => {
    const { container } = render(<MonthDropdownOptions {...defaultProps} />);

    const monthOptions = container.querySelectorAll(
      ".react-datepicker__month-option",
    );

    monthOptions.forEach((option) => {
      expect(option.getAttribute("tabIndex")).toBe("0");
    });
  });

  it("should auto-focus selected month on mount", () => {
    const { container } = render(
      <MonthDropdownOptions {...defaultProps} month={8} />,
    );

    const septemberOption = container.querySelectorAll(
      ".react-datepicker__month-option",
    )[8] as HTMLElement;

    // The selected month should be focused
    expect(document.activeElement).toBe(septemberOption);
  });

  it("should render with correct class names", () => {
    const { container } = render(<MonthDropdownOptions {...defaultProps} />);

    expect(
      container.querySelector(".react-datepicker__month-dropdown"),
    ).toBeTruthy();
  });

  it("should apply selected class to selected month", () => {
    const { container } = render(
      <MonthDropdownOptions {...defaultProps} month={2} />,
    );

    const selectedOption = container.querySelector(
      ".react-datepicker__month-option--selected_month",
    );
    expect(selectedOption).toBeTruthy();
  });

  it("should not apply selected class to non-selected months", () => {
    const { container } = render(
      <MonthDropdownOptions {...defaultProps} month={2} />,
    );

    const monthOptions = container.querySelectorAll(
      ".react-datepicker__month-option",
    );
    const nonSelectedOptions = Array.from(monthOptions).filter(
      (option) =>
        !option.classList.contains(
          "react-datepicker__month-option--selected_month",
        ),
    );

    expect(nonSelectedOptions.length).toBe(11);
  });

  it("should prevent default on Enter key", () => {
    const { container } = render(<MonthDropdownOptions {...defaultProps} />);

    const monthOption = container.querySelector(
      ".react-datepicker__month-option",
    );
    const event = new KeyboardEvent("keydown", {
      key: "Enter",
      bubbles: true,
      cancelable: true,
    });
    const preventDefaultSpy = jest.spyOn(event, "preventDefault");

    monthOption?.dispatchEvent(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it("should prevent default on Escape key", () => {
    const { container } = render(<MonthDropdownOptions {...defaultProps} />);

    const monthOption = container.querySelector(
      ".react-datepicker__month-option",
    );
    const event = new KeyboardEvent("keydown", {
      key: "Escape",
      bubbles: true,
      cancelable: true,
    });
    const preventDefaultSpy = jest.spyOn(event, "preventDefault");

    monthOption?.dispatchEvent(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it("should prevent default on ArrowUp key", () => {
    const { container } = render(<MonthDropdownOptions {...defaultProps} />);

    const monthOption = container.querySelector(
      ".react-datepicker__month-option",
    );
    const event = new KeyboardEvent("keydown", {
      key: "ArrowUp",
      bubbles: true,
      cancelable: true,
    });
    const preventDefaultSpy = jest.spyOn(event, "preventDefault");

    monthOption?.dispatchEvent(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it("should prevent default on ArrowDown key", () => {
    const { container } = render(<MonthDropdownOptions {...defaultProps} />);

    const monthOption = container.querySelector(
      ".react-datepicker__month-option",
    );
    const event = new KeyboardEvent("keydown", {
      key: "ArrowDown",
      bubbles: true,
      cancelable: true,
    });
    const preventDefaultSpy = jest.spyOn(event, "preventDefault");

    monthOption?.dispatchEvent(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
