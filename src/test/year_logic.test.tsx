import type React from "react";
import { act } from "react";

import Year from "../year";
import { newDate } from "../date_utils";

type YearComponentProps = React.ComponentProps<typeof Year>;

const buildYearProps = (
  override: Partial<YearComponentProps> = {},
): YearComponentProps =>
  ({
    date: newDate("2024-01-01"),
    yearItemNumber: 12,
    onDayClick: jest.fn(),
    onYearMouseEnter: jest.fn(),
    onYearMouseLeave: jest.fn(),
    preSelection: newDate("2024-01-01"),
    setPreSelection: jest.fn(),
    ...override,
  }) as YearComponentProps;

describe("Year logic helpers", () => {
  it("focuses the requested ref after pagination updates", () => {
    const props = buildYearProps();
    const instance = new Year(props);
    const focusSpy = jest.fn();
    instance.YEAR_REFS[0]!.current = {
      focus: focusSpy,
    } as unknown as HTMLDivElement;

    const rafSpy = jest
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((callback: FrameRequestCallback) => {
        callback(0);
        return 0;
      });

    act(() => {
      instance.updateFocusOnPaginate(0);
    });

    expect(focusSpy).toHaveBeenCalled();
    rafSpy.mockRestore();
  });

  it("skips onYearClick when no base date is provided", () => {
    const instance = new Year(buildYearProps({ date: undefined }));
    const handleYearClickSpy = jest.spyOn(instance, "handleYearClick");

    instance.onYearClick(
      {} as React.MouseEvent<HTMLDivElement>,
      newDate("2024-01-01").getFullYear(),
    );

    expect(handleYearClickSpy).not.toHaveBeenCalled();
  });

  it("exposes an isSameDay helper", () => {
    const instance = new Year(buildYearProps());
    const day = newDate("2024-03-01");

    expect(instance.isSameDay(day, newDate("2024-03-01"))).toBe(true);
  });
});
