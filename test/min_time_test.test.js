import React, { useState } from "react";
import DatePicker from "../src/index.jsx";
import { mount } from "enzyme";
import Day from "../src/day.jsx";

const DatePickerWithState = (props) => {
  const [selected, setSelected] = useState(null);
  return (
    <DatePicker
      open
      selected={selected}
      onChange={(date) => {
        setSelected(date);
      }}
      showTimeSelect
      {...props}
    />
  );
};

describe("Datepicker minTime", () => {
  it("should select time 12:00 AM when no minTime constraint is set.", () => {
    const datepicker = mount(<DatePickerWithState />);
    const day = datepicker.find(Day).first();

    day.simulate("click");

    const selectedTime = datepicker.find(
      ".react-datepicker__time-list-item--selected",
    );

    expect(selectedTime.text()).toBe("12:00 AM");
  });

  it("should select the minimum allowable time upon choosing a day.", () => {
    const minTime = new Date("2023-03-10 13:00");
    const maxTime = new Date("2023-03-10 18:00");

    const datepicker = mount(
      <DatePickerWithState minTime={minTime} maxTime={maxTime} />,
    );
    const day = datepicker.find(Day).first();

    day.simulate("click");

    const selectedTime = datepicker.find(
      ".react-datepicker__time-list-item--selected",
    );

    expect(selectedTime.text()).toBe("1:00 PM");
  });
});
