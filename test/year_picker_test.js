import React from "react";
import { mount, shallow } from "enzyme";
import DatePicker from "../src/index.jsx";
import Year from "../src/year";
import TestUtils from "react-dom/test-utils";
import ReactDOM from "react-dom";
import InputTimeComponent from "../src/inputTime";
import * as utils from "../src/date_utils";

describe("YearPicker", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should show year picker component when showYearPicker prop is present", () => {
    const datePicker = mount(<DatePicker showYearPicker />);
    const component = datePicker.find(Year);
    expect(component).to.exist;
  });

  it("should change the year when clicked on any option in the picker", () => {
    const onYearChangeSpy = sinon.spy();
    const yearComponent = mount(
      <Year onDayClick={onYearChangeSpy} date={new Date("2020-05-05")} />
    );
    const firstYearDiv = yearComponent
      .find(".react-datepicker__year-container-text")
      .at(1);
    firstYearDiv.simulate("click");
    expect(onYearChangeSpy.called).to.be.true;
  });

  it("should has selected class when element of array equal of choosen year", () => {
    const date = new Date("2015-06-01");
    const yearComponent = mount(<Year date={date} />);
    const year = yearComponent
      .find(".react-datepicker__year-container-text--selected")
      .at(0)
      .text();
    expect(year).to.equal(utils.getYear(date).toString());
  });
});
