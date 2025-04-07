import { render } from "@testing-library/react";
import React from "react";

import { newDate, setTime } from "../date_utils";
import { setupMockResizeObserver } from "./test_utils";
import DatePicker from "../index";

describe("DatePicker", () => {
  beforeAll(() => {
    setupMockResizeObserver();
  });

  it("should only display times between minTime and maxTime", () => {
    const now = newDate();
    const { container } = render(
      <DatePicker
        showTimeSelect
        selected={now}
        onChange={() => null}
        minTime={setTime(now, { hour: 17, minute: 0 })}
        maxTime={setTime(now, { hour: 18, minute: 0 })}
        open
      />,
    );
    const times = container.querySelector(
      "li.react-datepicker__time-list-item",
    );
    expect(times).not.toBeNull();
  });
});
