import React from "react";
import { mount } from "enzyme";
import TimeComponent from "../src/time";
import * as utils from "../src/date_utils";
import ptBR from "date-fns/locale/pt-BR";

describe("TimeComponent", () => {
  utils.registerLocale("pt-BR", ptBR);

  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    // mock global time to June 14, 1990 13:28:12, so test results will be constant
    sandbox.useFakeTimers({
      now: new Date("1990-06-14 13:28").valueOf(),
      toFake: ["Date"]
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("Format", () => {
    let spy;
    beforeEach(() => {
      spy = sandbox.spy(TimeComponent, "calcCenterPosition");
    });

    it("should forward the time format provided in timeFormat props", () => {
      var timeComponent = mount(<TimeComponent format="HH:mm" />);

      var timeListItem = timeComponent.find(
        ".react-datepicker__time-list-item"
      );
      expect(timeListItem.at(0).text()).to.eq("00:00");
    });

    it("should format the time based on the default locale (en-US)", () => {
      mount(<TimeComponent format="p" />);
      expect(spy.args[0][1].innerHTML).to.eq("1:00 PM");
    });

    it("should format the time based on the pt-BR locale", () => {
      mount(<TimeComponent format="p" locale="pt-BR" />);
      expect(spy.args[0][1].innerHTML).to.eq("13:00");
    });
  });

  describe("Initial position", () => {
    let spy;
    beforeEach(() => {
      spy = sandbox.spy(TimeComponent, "calcCenterPosition");
    });

    it("should call calcCenterPosition once", () => {
      mount(<TimeComponent format="HH:mm" />);
      expect(spy.calledOnce).to.eq(true);
    });

    it("should call calcCenterPosition with centerLi ref, closest to the current time", () => {
      mount(<TimeComponent format="HH:mm" />);
      expect(spy.args[0][1].innerHTML).to.eq("13:00");
    });

    it("with five minute time interval, should call calcCenterPosition with centerLi ref, closest to the current time", () => {
      mount(<TimeComponent format="HH:mm" intervals={5} />);
      expect(spy.args[0][1].innerHTML).to.eq("13:25");
    });

    it("should call calcCenterPosition with centerLi ref, closest to the selected time", () => {
      mount(
        <TimeComponent
          format="HH:mm"
          selected={new Date("1990-06-14 08:11")}
          openToDate={new Date("1990-06-14 09:11")}
        />
      );
      expect(spy.args[0][1].innerHTML).to.eq("08:00");
    });

    it("should call calcCenterPosition with centerLi ref, which is selected", () => {
      mount(
        <TimeComponent
          format="HH:mm"
          selected={new Date("1990-06-14 08:00")}
          openToDate={new Date("1990-06-14 09:00")}
        />
      );
      expect(
        spy.args[0][1].classList.contains(
          "react-datepicker__time-list-item--selected"
        )
      ).to.be.true;
    });

    it("when no selected time, should call calcCenterPosition with centerLi ref, closest to the opened time", () => {
      mount(
        <TimeComponent
          format="HH:mm"
          openToDate={new Date("1990-06-14 09:11")}
        />
      );
      expect(spy.args[0][1].innerHTML).to.eq("09:00");
    });

    it("when no selected time, should call calcCenterPosition with centerLi ref, and no time should be selected", () => {
      mount(
        <TimeComponent
          format="HH:mm"
          openToDate={new Date("1990-06-14 09:00")}
        />
      );
      expect(
        spy.args[0][1].classList.contains(
          "react-datepicker__time-list-item--selected"
        )
      ).to.be.false;
    });

    it("should calculate scroll for the first item of 4 (even) items list", () => {
      expect(
        TimeComponent.calcCenterPosition(200, {
          offsetTop: 0,
          clientHeight: 50
        })
      ).to.be.eq(-75);
    });

    it("should calculate scroll for the last item of 4 (even) items list", () => {
      expect(
        TimeComponent.calcCenterPosition(200, {
          offsetTop: 150,
          clientHeight: 50
        })
      ).to.be.eq(75);
    });

    it("should calculate scroll for the first item of 3 (odd) items list", () => {
      expect(
        TimeComponent.calcCenterPosition(90, { offsetTop: 0, clientHeight: 30 })
      ).to.be.eq(-30);
    });

    it("should calculate scroll for the last item of 3 (odd) items list", () => {
      expect(
        TimeComponent.calcCenterPosition(90, {
          offsetTop: 60,
          clientHeight: 30
        })
      ).to.be.eq(30);
    });
  });
});
