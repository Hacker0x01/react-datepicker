import React from "react";
import { render } from "@testing-library/react";
import * as utils from "../src/date_utils";
import DatePicker from "../src/index";

describe("DatePicker", () => {
  it("should only display times between minTime and maxTime", () => {
    const now = utils.newDate();
    const { container } = render(
      <DatePicker
        showTimeSelect
        selected={now}
        onChange={() => null}
        minTime={utils.setTime(now, { hours: 17, minutes: 0 })}
        maxTime={utils.setTime(now, { hours: 18, minutes: 0 })}
        open
      />,
    );
    const times = container.querySelector(
      "li.react-datepicker__time-list-item",
    );
    expect(times).not.toBeNull();
  });
});
