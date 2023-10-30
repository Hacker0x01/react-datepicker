import React from "react";
import { mount } from "enzyme";
import CalendarIcon from "../src/calendar_icon";
import { IconParkSolidApplication } from "./helper_components/calendar_icon";

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

describe("CalendarIcon", () => {
  it("renders a custom SVG icon when provided", () => {
    const wrapper = mount(
      // eslint-disable-line enzyme-deprecation/no-mount
      <CalendarIcon showIcon icon={<IconParkSolidApplication />} />,
    );
    expect(
      wrapper.find('[data-testid="icon-park-solid-application"]'),
    ).toHaveLength(1);
  });

  it("renders a FontAwesome icon when provided", () => {
    const wrapper = mount(<CalendarIcon showIcon icon="fa-example-icon" />); // eslint-disable-line enzyme-deprecation/no-mount
    expect(wrapper.find("i.fa-example-icon")).toHaveLength(1);
  });

  it("does not render an icon when none is provided", () => {
    const wrapper = mount(<CalendarIcon showIcon />); // eslint-disable-line enzyme-deprecation/no-mount
    expect(wrapper.find("svg.react-datepicker__calendar-icon")).toHaveLength(1);
  });
});
