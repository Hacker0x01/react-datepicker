import type React from "react";
import Month from "../month";
import { KeyType, newDate } from "../date_utils";

type MonthComponentProps = React.ComponentProps<typeof Month>;

const buildProps = (
  override: Partial<MonthComponentProps> = {},
): MonthComponentProps =>
  ({
    day: newDate("2024-01-01"),
    onDayClick: jest.fn(),
    onDayMouseEnter: jest.fn(),
    onMouseLeave: jest.fn(),
    setPreSelection: jest.fn(),
    preSelection: newDate("2024-01-01"),
    showFourColumnMonthYearPicker: false,
    showTwoColumnMonthYearPicker: false,
    disabledKeyboardNavigation: false,
    ...override,
  }) as MonthComponentProps;

describe("Month logic helpers", () => {
  it("short-circuits keyboard navigation when there is no preSelection", () => {
    const props = buildProps({ preSelection: undefined });
    const instance = new Month(props);
    const getVerticalOffsetSpy = jest.spyOn(instance, "getVerticalOffset");

    instance.handleKeyboardNavigation(
      {
        preventDefault: jest.fn(),
      } as unknown as React.KeyboardEvent<HTMLDivElement>,
      KeyType.ArrowRight,
      1,
    );

    expect(getVerticalOffsetSpy).not.toHaveBeenCalled();
    expect(props.setPreSelection).not.toHaveBeenCalled();
  });

  it("prevents quarter navigation when the destination date is disabled", () => {
    const props = buildProps();
    const instance = new Month(props);
    jest.spyOn(instance, "isDisabled").mockReturnValue(true);
    jest.spyOn(instance, "isExcluded").mockReturnValue(false);

    instance.handleQuarterNavigation(2, newDate("2024-04-01"));

    expect(props.setPreSelection).not.toHaveBeenCalled();
  });

  it("does not handle quarter arrow keys without a preSelection value", () => {
    const props = buildProps({ preSelection: undefined });
    const instance = new Month(props);
    const navigationSpy = jest.spyOn(instance, "handleQuarterNavigation");

    instance.onQuarterKeyDown(
      {
        key: KeyType.ArrowRight,
        preventDefault: jest.fn(),
      } as unknown as React.KeyboardEvent<HTMLDivElement>,
      2,
    );

    instance.onQuarterKeyDown(
      {
        key: KeyType.ArrowLeft,
        preventDefault: jest.fn(),
      } as unknown as React.KeyboardEvent<HTMLDivElement>,
      2,
    );

    expect(navigationSpy).not.toHaveBeenCalled();
  });
});
