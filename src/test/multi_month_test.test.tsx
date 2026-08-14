import { render } from "@testing-library/react";
import React from "react";

import Calendar from "../calendar";
import { formatDate, newDate, subMonths } from "../date_utils";

type CalendarProps = React.ComponentProps<typeof Calendar>;

describe("Multi month calendar", function () {
  const dateFormat = "LLLL yyyy";

  function getCalendar(
    extraProps: Partial<
      Pick<
        CalendarProps,
        "dateFormat" | "onSelect" | "onClickOutside" | "dropdownMode"
      >
    > &
      Omit<
        CalendarProps,
        | "dateFormat"
        | "onSelect"
        | "onClickOutside"
        | "dropdownMode"
        | "showMonthYearDropdown"
      >,
  ) {
    return render(
      <Calendar
        dateFormat={dateFormat}
        onSelect={() => {}}
        onClickOutside={() => {}}
        dropdownMode="scroll"
        {...extraProps}
      />,
    ).container;
  }

  it("should render multiple months if the months property is present", () => {
    const calendar = getCalendar({ monthsShown: 2 });
    const months = calendar.querySelectorAll(".react-datepicker__month");
    expect(months).toHaveLength(2);
  });

  it("should render an independent dropdown on every month (see #6320)", () => {
    const calendar = getCalendar({ monthsShown: 2, showYearDropdown: true });
    const datepickers = calendar.querySelectorAll(
      ".react-datepicker__year-dropdown-container",
    );
    // Every month renders the same real dropdown, rather than one being
    // reserved with a hardcoded/measured height, since native form controls
    // render at different heights across browsers/operating systems (#6320).
    expect(datepickers).toHaveLength(2);
  });

  it("should render the same header dropdown markup on every month, so header heights stay consistent (#6320)", () => {
    const calendar = getCalendar({ monthsShown: 3, showYearDropdown: true });
    const headerDropdowns = calendar.querySelectorAll(
      ".react-datepicker__header__dropdown",
    );
    expect(headerDropdowns).toHaveLength(3);

    // Every month's header dropdown wrapper renders the same
    // year-dropdown-container control, so their layout boxes match exactly
    // without reserving space via a hardcoded or measured height.
    headerDropdowns.forEach((headerDropdown) => {
      expect(
        headerDropdown.querySelectorAll(
          ".react-datepicker__year-dropdown-container",
        ),
      ).toHaveLength(1);
    });
  });

  it("should render previous months", () => {
    const calendar = getCalendar({ monthsShown: 2, showPreviousMonths: true });
    const monthDate = calendar.querySelector(
      ".react-datepicker__current-month",
    )?.textContent;
    const previousMonth = subMonths(newDate(), 1);
    expect(monthDate).toBe(formatDate(previousMonth, "LLLL yyyy"));
  });
});
