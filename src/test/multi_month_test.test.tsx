import { render } from "@testing-library/react";
import React from "react";

import Calendar from "../calendar";
import * as utils from "../date_utils";

describe("Multi month calendar", function () {
  const dateFormat = "LLLL yyyy";

  function getCalendar(extraProps) {
    return render(
      <Calendar
        dateFormat={dateFormat}
        onSelect={() => {}}
        onClickOutside={() => {}}
        hideCalendar={() => {}}
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

  it("should render dropdown only on first month", () => {
    const calendar = getCalendar({ monthsShown: 2, showYearDropdown: true });
    const datepickers = calendar.querySelectorAll(
      ".react-datepicker__year-dropdown-container",
    );
    expect(datepickers).toHaveLength(1);
  });

  it("should render previous months", () => {
    const calendar = getCalendar({ monthsShown: 2, showPreviousMonths: true });
    const monthDate = calendar.querySelector(
      ".react-datepicker__current-month",
    )?.textContent;
    const previousMonth = utils.subMonths(utils.newDate(), 1);
    expect(monthDate).toBe(utils.formatDate(previousMonth, "LLLL yyyy"));
  });
});
