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

  it("should fire only custom icon onClick when CalendarIcon onClick is not provided", () => {
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
      />,
    );

    const icon = safeQuerySelector(
      container,
      "svg.react-datepicker__calendar-icon",
    );
    fireEvent.click(icon);

    // Lines 55-57: custom icon onClick is called
    expect(onClickCustomIcon).toHaveBeenCalledTimes(1);
  });

  it("should fire only CalendarIcon onClick when custom icon onClick is not provided", () => {
    const { container } = render(
      <CalendarIcon
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 48 48"
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

    // Lines 59-61: CalendarIcon onClick is called
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("should handle custom icon without onClick prop", () => {
    const { container } = render(
      <CalendarIcon
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 48 48"
          />
        }
      />,
    );

    const icon = safeQuerySelector(
      container,
      "svg.react-datepicker__calendar-icon",
    );

    // Should not throw when clicking without any onClick handlers
    expect(() => fireEvent.click(icon)).not.toThrow();
  });

  it("should apply className to custom icon", () => {
    const { container } = render(
      <CalendarIcon
        icon={<IconParkSolidApplication />}
        className="custom-class"
      />,
    );

    const icon = container.querySelector(".custom-class");
    expect(icon).not.toBeNull();
  });

  it("should apply className to string icon", () => {
    const { container } = render(
      <CalendarIcon icon="fa-calendar" className="custom-class" />,
    );

    const icon = container.querySelector("i.custom-class");
    expect(icon).not.toBeNull();
  });

  it("should apply className to default SVG icon", () => {
    const { container } = render(<CalendarIcon className="custom-class" />);

    const icon = container.querySelector("svg.custom-class");
    expect(icon).not.toBeNull();
  });
});
