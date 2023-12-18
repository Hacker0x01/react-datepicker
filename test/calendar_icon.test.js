import React from "react";
import { mount } from "enzyme";
import { render, fireEvent } from "@testing-library/react";
import CalendarIcon from "../src/calendar_icon";
import { IconParkSolidApplication } from "./helper_components/calendar_icon";

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

describe("CalendarIcon", () => {
  let onClickMock;
  beforeEach(() => {
    onClickMock = jest.fn();
  });
  afterEach(() => {
    onClickMock.mockClear();
  });

  it("renders a custom SVG icon when provided", () => {
    const wrapper = mount(
      <CalendarIcon showIcon icon={<IconParkSolidApplication />} />,
    );
    expect(
      wrapper.find('[data-testid="icon-park-solid-application"]'),
    ).toHaveLength(1);
  });

  it("renders a FontAwesome icon when provided", () => {
    const wrapper = mount(<CalendarIcon showIcon icon="fa-example-icon" />);
    expect(wrapper.find("i.fa-example-icon")).toHaveLength(1);
  });

  it("does not render an icon when none is provided", () => {
    const wrapper = mount(<CalendarIcon showIcon />);
    expect(wrapper.find("svg.react-datepicker__calendar-icon")).toHaveLength(1);
  });

  it("should fire onClick event when the icon is clicked", () => {
    const { container } = render(
      <CalendarIcon showIcon onClick={onClickMock} />,
    );

    const icon = container.querySelector("svg.react-datepicker__calendar-icon");
    fireEvent.click(icon);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("should fire onClick event on the click of font-awesome icon when provided", () => {
    const { container } = render(
      <CalendarIcon showIcon icon="fa-example-icon" onClick={onClickMock} />,
    );

    const icon = container.querySelector("i.fa-example-icon");
    fireEvent.click(icon);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
