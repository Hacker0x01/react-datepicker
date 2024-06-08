import { render, waitFor } from "@testing-library/react";
import { ptBR } from "date-fns/locale/pt-BR";
import React from "react";

import { registerLocale } from "../date_utils";
import TimeComponent from "../time";

describe("TimeComponent", () => {
  registerLocale("pt-BR", ptBR);

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
    let spy: jest.SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(TimeComponent, "calcCenterPosition");
    });

    it("should forward the time format provided in timeFormat props", () => {
      const { container } = render(<TimeComponent format="HH:mm" />);

      const timeListItem = container.querySelector(
        ".react-datepicker__time-list-item",
      );
      expect(timeListItem?.textContent).toBe("00:00");
    });

    it("should format the time based on the default locale (en-US)", async () => {
      render(<TimeComponent format="p" />);
      await waitFor(() => {
        expect(spy.mock.calls[0][1].innerHTML).toBe("1:00 PM");
      });
    });

    it("should format the time based on the pt-BR locale", async () => {
      render(<TimeComponent format="p" locale="pt-BR" />);
      await waitFor(() => {
        expect(spy.mock.calls[0][1].innerHTML).toBe("13:00");
      });
    });
  });

  describe("Initial position", () => {
    let spy: jest.SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(TimeComponent, "calcCenterPosition");
    });

    it("should call calcCenterPosition once", async () => {
      render(<TimeComponent format="HH:mm" />);
      await waitFor(() => {
        expect(spy).toHaveBeenCalled();
      });
    });

    it("should call calcCenterPosition with centerLi ref, closest to the current time", async () => {
      render(<TimeComponent format="HH:mm" />);
      await waitFor(() => {
        expect(spy.mock.calls[0][1].innerHTML).toBe("13:00");
      });
    });

    it("with five minute time interval, should call calcCenterPosition with centerLi ref, closest to the current time", async () => {
      render(<TimeComponent format="HH:mm" intervals={5} />);
      await waitFor(() => {
        expect(spy.mock.calls[0][1].innerHTML).toBe("13:25");
      });
    });

    it("should call calcCenterPosition with centerLi ref, closest to the selected time", async () => {
      render(
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
      render(
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
      const { container } = render(
        <TimeComponent
          format="HH:mm"
          selected={new Date("1990-06-14 08:00")}
          openToDate={new Date("1990-06-14 09:00")}
        />,
      );

      const timeListItem = container.querySelector(
        ".react-datepicker__time-list-item--selected",
      );
      expect(timeListItem?.getAttribute("aria-selected")).toBe("true");
    });

    it("should enable keyboard focus on the selected item", () => {
      const { container } = render(
        <TimeComponent
          format="HH:mm"
          selected={new Date("1990-06-14 08:00")}
          openToDate={new Date("1990-06-14 09:00")}
        />,
      );

      const timeListItem = container.querySelector<HTMLElement>(
        ".react-datepicker__time-list-item--selected",
      );
      expect(timeListItem?.tabIndex).toBe(0);
    });

    it("should not add the aria-selected property to a regular item", () => {
      const { container } = render(
        <TimeComponent
          format="HH:mm"
          selected={new Date("1990-06-14 08:00")}
          openToDate={new Date("1990-06-14 09:00")}
        />,
      );

      const timeListItem = container.querySelector<HTMLElement>(
        ".react-datepicker__time-list-item",
      );
      expect(timeListItem?.getAttribute("aria-selected")).toBeNull();
    });

    it("should disable keyboard focus on a regular item", () => {
      const { container } = render(
        <TimeComponent
          format="HH:mm"
          selected={new Date("1990-06-14 08:00")}
          openToDate={new Date("1990-06-14 09:00")}
        />,
      );

      const timeListItem = container.querySelector<HTMLElement>(
        ".react-datepicker__time-list-item",
      );
      expect(timeListItem?.tabIndex).toBe(-1);
    });

    it("when no selected time, should focus the time closest to the opened time", () => {
      const { container } = render(
        <TimeComponent
          format="HH:mm"
          openToDate={new Date("1990-06-14 09:11")}
        />,
      );

      const timeListItem = container.querySelectorAll<HTMLElement>(
        ".react-datepicker__time-list-item",
      );
      expect(
        Array.from(timeListItem ?? []).find(
          (node) => node.tagName && node.textContent === "09:00",
        )?.tabIndex,
      ).toBe(0);
    });

    it("when no selected time, should call calcCenterPosition with centerLi ref, closest to the opened time", async () => {
      render(
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
      render(
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
        } as HTMLLIElement),
      ).toBe(-75);
    });

    it("should calculate scroll for the last item of 4 (even) items list", () => {
      expect(
        TimeComponent.calcCenterPosition(200, {
          offsetTop: 150,
          clientHeight: 50,
        } as HTMLLIElement),
      ).toBe(75);
    });

    it("should calculate scroll for the first item of 3 (odd) items list", () => {
      expect(
        TimeComponent.calcCenterPosition(90, {
          offsetTop: 0,
          clientHeight: 30,
        } as HTMLLIElement),
      ).toBe(-30);
    });

    it("should calculate scroll for the last item of 3 (odd) items list", () => {
      expect(
        TimeComponent.calcCenterPosition(90, {
          offsetTop: 60,
          clientHeight: 30,
        } as HTMLLIElement),
      ).toBe(30);
    });
  });
});
