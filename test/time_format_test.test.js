import React from "react";
import { mount } from "enzyme";
import TimeComponent from "../src/time";
import * as utils from "../src/date_utils";
import ptBR from "date-fns/locale/pt-BR";
import { waitFor } from "@testing-library/react";

describe("TimeComponent", () => {
  utils.registerLocale("pt-BR", ptBR);

  beforeEach(() => {
    // sandbox = sinon.createSandbox();
    // // mock global time to June 14, 1990 13:28:12, so test results will be constant
    // sandbox.useFakeTimers({
    //   now: new Date("1990-06-14 13:28").valueOf(),
    //   toFake: ["Date"],
    // });
    jest.useFakeTimers().setSystemTime(new Date("1990-06-14 13:28"));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Format", () => {
    let spy;
    beforeEach(() => {
      spy = jest.spyOn(TimeComponent, "calcCenterPosition");
    });

    it("should forward the time format provided in timeFormat props", () => {
      var timeComponent = mount(<TimeComponent format="HH:mm" />); // eslint-disable-line enzyme-deprecation/no-mount

      var timeListItem = timeComponent.find(
        ".react-datepicker__time-list-item",
      );
      expect(timeListItem.at(0).text()).toBe("00:00");
    });

    it("should format the time based on the default locale (en-US)", async () => {
      mount(<TimeComponent format="p" />); // eslint-disable-line enzyme-deprecation/no-mount
      await waitFor(() => {
        expect(spy.mock.calls[0][1].innerHTML).toBe("1:00 PM");
      });
    });

    it("should format the time based on the pt-BR locale", async () => {
      mount(<TimeComponent format="p" locale="pt-BR" />); // eslint-disable-line enzyme-deprecation/no-mount
      await waitFor(() => {
        expect(spy.mock.calls[0][1].innerHTML).toBe("13:00");
      });
    });
  });

  describe("Initial position", () => {
    let spy;
    beforeEach(() => {
      spy = jest.spyOn(TimeComponent, "calcCenterPosition");
    });

    it("should call calcCenterPosition once", async () => {
      mount(<TimeComponent format="HH:mm" />); // eslint-disable-line enzyme-deprecation/no-mount
      await waitFor(() => {
        expect(spy).toHaveBeenCalled();
      });
    });

    it("should call calcCenterPosition with centerLi ref, closest to the current time", async () => {
      mount(<TimeComponent format="HH:mm" />); // eslint-disable-line enzyme-deprecation/no-mount
      await waitFor(() => {
        expect(spy.mock.calls[0][1].innerHTML).toBe("13:00");
      });
    });

    it("with five minute time interval, should call calcCenterPosition with centerLi ref, closest to the current time", async () => {
      mount(<TimeComponent format="HH:mm" intervals={5} />); // eslint-disable-line enzyme-deprecation/no-mount
      await waitFor(() => {
        expect(spy.mock.calls[0][1].innerHTML).toBe("13:25");
      });
    });

    it("should call calcCenterPosition with centerLi ref, closest to the selected time", async () => {
      mount(
        // eslint-disable-line enzyme-deprecation/no-mount
        <TimeComponent
          format="HH:mm"
          selected={new Date("1990-06-14 08:11")}
          openToDate={new Date("1990-06-14 09:11")}
        />,
      );
      await waitFor(() => {
        expect(spy.mock.calls[0][1].innerHTML).toBe("08:00");
      });
    });

    it("should call calcCenterPosition with centerLi ref, which is selected", async () => {
      mount(
        // eslint-disable-line enzyme-deprecation/no-mount
        <TimeComponent
          format="HH:mm"
          selected={new Date("1990-06-14 08:00")}
          openToDate={new Date("1990-06-14 09:00")}
        />,
      );
      await waitFor(() => {
        expect(
          spy.mock.calls[0][1].classList.contains(
            "react-datepicker__time-list-item--selected",
          ),
        ).toBe(true);
      });
    });

    it("should add the aria-selected property to the selected item", () => {
      var timeComponent = mount(
        // eslint-disable-line enzyme-deprecation/no-mount
        <TimeComponent
          format="HH:mm"
          selected={new Date("1990-06-14 08:00")}
          openToDate={new Date("1990-06-14 09:00")}
        />,
      );

      var timeListItem = timeComponent.find(
        ".react-datepicker__time-list-item--selected",
      );
      expect(timeListItem.at(0).prop("aria-selected")).toBe("true");
    });

    it("should enable keyboard focus on the selected item", () => {
      var timeComponent = mount(
        // eslint-disable-line enzyme-deprecation/no-mount
        <TimeComponent
          format="HH:mm"
          selected={new Date("1990-06-14 08:00")}
          openToDate={new Date("1990-06-14 09:00")}
        />,
      );

      var timeListItem = timeComponent.find(
        ".react-datepicker__time-list-item--selected",
      );
      expect(timeListItem.at(0).prop("tabIndex")).toBe(0);
    });

    it("should not add the aria-selected property to a regular item", () => {
      var timeComponent = mount(
        // eslint-disable-line enzyme-deprecation/no-mount
        <TimeComponent
          format="HH:mm"
          selected={new Date("1990-06-14 08:00")}
          openToDate={new Date("1990-06-14 09:00")}
        />,
      );

      var timeListItem = timeComponent.find(
        ".react-datepicker__time-list-item",
      );
      expect(timeListItem.at(0).prop("aria-selected")).toBeUndefined();
    });

    it("should disable keyboard focus on a regular item", () => {
      var timeComponent = mount(
        // eslint-disable-line enzyme-deprecation/no-mount
        <TimeComponent
          format="HH:mm"
          selected={new Date("1990-06-14 08:00")}
          openToDate={new Date("1990-06-14 09:00")}
        />,
      );

      var timeListItem = timeComponent.find(
        ".react-datepicker__time-list-item",
      );
      expect(timeListItem.at(0).prop("tabIndex")).toBe(-1);
    });

    it("when no selected time, should focus the time closest to the opened time", () => {
      var timeComponent = mount(
        // eslint-disable-line enzyme-deprecation/no-mount
        <TimeComponent
          format="HH:mm"
          openToDate={new Date("1990-06-14 09:11")}
        />,
      );

      var timeListItem = timeComponent.find(
        ".react-datepicker__time-list-item",
      );
      expect(
        timeListItem
          .findWhere((node) => node.type() && node.text() === "09:00")
          .prop("tabIndex"),
      ).toBe(0);
    });

    it("when no selected time, should call calcCenterPosition with centerLi ref, closest to the opened time", async () => {
      mount(
        // eslint-disable-line enzyme-deprecation/no-mount
        <TimeComponent
          format="HH:mm"
          openToDate={new Date("1990-06-14 09:11")}
        />,
      );
      await waitFor(() => {
        expect(spy.mock.calls[0][1].innerHTML).toBe("09:00");
      });
    });

    it("when no selected time, should call calcCenterPosition with centerLi ref, and no time should be selected", async () => {
      mount(
        // eslint-disable-line enzyme-deprecation/no-mount
        <TimeComponent
          format="HH:mm"
          openToDate={new Date("1990-06-14 09:00")}
        />,
      );
      await waitFor(() => {
        expect(
          spy.mock.calls[0][1].classList.contains(
            "react-datepicker__time-list-item--selected",
          ),
        ).toBe(false);
      });
    });

    it("should calculate scroll for the first item of 4 (even) items list", () => {
      expect(
        TimeComponent.calcCenterPosition(200, {
          offsetTop: 0,
          clientHeight: 50,
        }),
      ).toBe(-75);
    });

    it("should calculate scroll for the last item of 4 (even) items list", () => {
      expect(
        TimeComponent.calcCenterPosition(200, {
          offsetTop: 150,
          clientHeight: 50,
        }),
      ).toBe(75);
    });

    it("should calculate scroll for the first item of 3 (odd) items list", () => {
      expect(
        TimeComponent.calcCenterPosition(90, {
          offsetTop: 0,
          clientHeight: 30,
        }),
      ).toBe(-30);
    });

    it("should calculate scroll for the last item of 3 (odd) items list", () => {
      expect(
        TimeComponent.calcCenterPosition(90, {
          offsetTop: 60,
          clientHeight: 30,
        }),
      ).toBe(30);
    });
  });
});
