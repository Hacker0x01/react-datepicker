import { render, fireEvent } from "@testing-library/react";
import React from "react";

import CalendarIcon from "../calendar_icon";

import { IconParkSolidApplication } from "./helper_components/calendar_icon";
import { safeQuerySelector } from "./test_utils";

describe("CalendarIcon", () => {
  let onClickMock: jest.Mock;
  beforeEach(() => {
    onClickMock = jest.fn();
  });
  afterEach(() => {
    onClickMock.mockClear();
  });

  it("renders a custom SVG icon when provided", () => {
    const { container } = render(
      <CalendarIcon icon={<IconParkSolidApplication />} />,
    );
    expect(
      container.querySelectorAll('[data-testid="icon-park-solid-application"]'),
    ).toHaveLength(1);
  });

  it("renders a FontAwesome icon when provided", () => {
    const { container } = render(<CalendarIcon icon="fa-example-icon" />);
    expect(container.querySelectorAll("i.fa-example-icon")).toHaveLength(1);
  });

  it("renders a default SVG icon when no icon is provided", () => {
    const { container } = render(<CalendarIcon />);
    expect(
      container.querySelectorAll("svg.react-datepicker__calendar-icon"),
    ).toHaveLength(1);
  });

  it("should fire onClick event when the icon is clicked", () => {
    const { container } = render(<CalendarIcon onClick={onClickMock} />);

    const icon = safeQuerySelector(
      container,
      "svg.react-datepicker__calendar-icon",
    );
    fireEvent.click(icon);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("should fire onClick event on the click of font-awesome icon when provided", () => {
    const { container } = render(
      <CalendarIcon icon="fa-example-icon" onClick={onClickMock} />,
    );

    const icon = safeQuerySelector(container, "i.fa-example-icon");
    fireEvent.click(icon);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("should fire onClick event on the click of custom icon component when provided", () => {
    const onClickCustomIcon = jest.fn();

    const { container } = render(
      <CalendarIcon
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 48 48"
            onClick={onClickCustomIcon}
          />
        }
        onClick={onClickMock}
      />,
    );

    const icon = safeQuerySelector(
      container,
      "svg.react-datepicker__calendar-icon",
    );
    fireEvent.click(icon);

    expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(onClickCustomIcon).toHaveBeenCalledTimes(1);
  });
});
