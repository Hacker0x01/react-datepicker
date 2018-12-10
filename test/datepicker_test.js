import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";
import { mount } from "enzyme";
import defer from "lodash/defer";
import DatePicker from "../src/index.jsx";
import Day from "../src/day";
import TestWrapper from "./test_wrapper.jsx";
import PopperComponent from "../src/popper_component.jsx";
import CustomInput from "./helper_components/custom_input.jsx";
import * as utils from "../src/date_utils";

function getKey(key) {
  switch (key) {
    case "Backspace":
      return { key, code: 8, which: 8 };
    case "Tab":
      return { key, code: 9, which: 9 };
    case "Enter":
      return { key, code: 13, which: 13 };
    case "Escape":
      return { key, code: 27, which: 27 };
    case "PageUp":
      return { key, keyCode: 33, which: 33 };
    case "PageDown":
      return { key, keyCode: 34, which: 34 };
    case "End":
      return { key, keyCode: 35, which: 35 };
    case "Home":
      return { key, keyCode: 36, which: 36 };
    case "ArrowLeft":
      return { key, code: 37, which: 37 };
    case "ArrowUp":
      return { key, code: 38, which: 38 };
    case "ArrowRight":
      return { key, code: 39, which: 39 };
    case "ArrowDown":
      return { key, code: 40, which: 40 };
    case "x":
      return { key, code: 88, which: 88 };
  }
  throw new Error("Unknown key :" + key);
}

describe("DatePicker", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should show the calendar when focusing on the date input", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker />);
    var dateInput = datePicker.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    expect(datePicker.calendar).to.exist;
  });

  it("should allow the user to supply a wrapper component for the popper", () => {
    var datePicker = mount(<DatePicker popperContainer={TestWrapper} />);

    const dateInput = datePicker.instance().input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));

    expect(datePicker.find(".test-wrapper").length).to.equal(1);
    expect(datePicker.instance().calendar).to.exist;
  });

  it("should allow the user to pass a wrapper component for the calendar", () => {
    var datePicker = mount(<DatePicker calendarContainer={TestWrapper} />);

    let dateInput = datePicker.instance().input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));

    datePicker.update();
    expect(datePicker.find(".test-wrapper").length).to.equal(1);
    expect(datePicker.instance().calendar).to.exist;
  });

  it("should pass a custom class to the popper container", () => {
    var datePicker = mount(<DatePicker popperClassName="some-class-name" />);
    var dateInput = datePicker.instance().input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));

    datePicker.update();
    const popper = datePicker.find(".react-datepicker-popper");
    expect(popper.length).to.equal(1);
    expect(popper.hasClass("some-class-name")).to.equal(true);
  });

  it("should show the calendar when clicking on the date input", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker />);
    var dateInput = datePicker.input;
    TestUtils.Simulate.click(ReactDOM.findDOMNode(dateInput));
    expect(datePicker.calendar).to.exist;
  });

  it("should not set open state when it is disabled and gets clicked", function() {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker disabled />);
    var dateInput = datePicker.input;
    TestUtils.Simulate.click(ReactDOM.findDOMNode(dateInput));
    expect(datePicker.state.open).to.be.false;
  });

  it("should keep the calendar shown when blurring the date input", done => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker />);
    var dateInput = datePicker.input;
    var focusSpy = sandbox.spy(dateInput, "focus");
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    TestUtils.Simulate.blur(ReactDOM.findDOMNode(dateInput));

    defer(() => {
      expect(datePicker.calendar).to.exist;
      assert(focusSpy.calledOnce, "should refocus the date input");
      done();
    });
  });

  it("should not re-focus the date input when focusing the year dropdown", done => {
    const onBlurSpy = sandbox.spy();
    const datePicker = mount(
      <DatePicker
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        onBlur={onBlurSpy}
      />
    );
    const dateInput = datePicker.instance().input;
    const dateInputWrapper = datePicker.find("input");
    const focusSpy = sandbox.spy(dateInput, "focus");

    dateInputWrapper.simulate("focus");
    const calendarWrapper = datePicker.find("Calendar");
    const yearSelect = calendarWrapper.find(".react-datepicker__year-select");
    dateInputWrapper.simulate("blur");
    yearSelect.simulate("focus");

    defer(() => {
      assert(focusSpy.called === false, "should not refocus the date input");
      assert(onBlurSpy.called === false, "should not call DatePicker onBlur");
      done();
    });
  });

  it("should fire onYearChange when the year is selected", done => {
    const onYearChangeSpy = sinon.spy();
    const datePicker = mount(
      <DatePicker
        showYearDropdown
        dropdownMode="select"
        onYearChange={onYearChangeSpy}
      />
    );
    const dateInputWrapper = datePicker.find("input");

    dateInputWrapper.simulate("click");
    const calendarWrapper = datePicker.find("Calendar");
    const yearSelect = calendarWrapper.find(".react-datepicker__year-select");
    yearSelect.simulate("change");

    defer(() => {
      assert(onYearChangeSpy.called === true, "onYearChange should be called");
      done();
    });
  });

  it("should keep the calendar shown when clicking the calendar", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker />);
    var dateInput = datePicker.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    TestUtils.Simulate.click(ReactDOM.findDOMNode(datePicker.calendar));
    expect(datePicker.calendar).to.exist;
  });

  it("should not set open state when it is disabled and gets clicked", function() {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker disabled />);
    var dateInput = datePicker.input;
    TestUtils.Simulate.click(ReactDOM.findDOMNode(dateInput));
    expect(datePicker.state.open).to.be.false;
  });

  it("should not set open state when it is readOnly and gets clicked", function() {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker readOnly />);
    var dateInput = datePicker.input;
    TestUtils.Simulate.click(ReactDOM.findDOMNode(dateInput));
    expect(datePicker.state.open).to.be.false;
  });

  it("should hide the calendar when clicking a day on the calendar", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker />);
    var dateInput = datePicker.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    var day = TestUtils.scryRenderedComponentsWithType(
      datePicker.calendar,
      Day
    )[0];
    TestUtils.Simulate.click(ReactDOM.findDOMNode(day));
    expect(datePicker.calendar).to.not.exist;
  });

  it("should not hide the calendar when clicking a day on the calendar and shouldCloseOnSelect prop is false", () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker shouldCloseOnSelect={false} />
    );
    var dateInput = datePicker.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    var day = TestUtils.scryRenderedComponentsWithType(
      datePicker.calendar,
      Day
    )[0];
    TestUtils.Simulate.click(ReactDOM.findDOMNode(day));
    expect(datePicker.state.open).to.be.true;
  });

  it("should not hide the calendar when selecting a day in the calendar with Enter press, and shouldCloseOnSelect prop is false", () => {
    var data = getOnInputKeyDownStuff({ shouldCloseOnSelect: false });
    var dateInput = data.datePicker.input;

    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowUp"));
    TestUtils.Simulate.keyDown(
      ReactDOM.findDOMNode(dateInput),
      getKey("Enter")
    );
    expect(data.datePicker.state.open).to.be.true;
  });

  it("should update the preSelection state when a day is selected with Enter press", () => {
    var data = getOnInputKeyDownStuff({ shouldCloseOnSelect: false });
    var dateInput = data.datePicker.input;

    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    TestUtils.Simulate.keyDown(
      ReactDOM.findDOMNode(dateInput),
      getKey("Enter")
    );
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));

    data.copyM = utils.addWeeks(data.copyM, 2);
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat)
    ).to.equal(utils.formatDate(data.copyM, data.testFormat));
  });

  it("should update the preSelection state when a day is selected with mouse click", () => {
    // Note: We need monthsShown=2 so that today can still be clicked when
    // ArrowLeft selects the previous month. (On the 1st 2 days of the month.)
    // On the last week of the month, when the next month includes the current
    // week, we need monthsShown=1 to prevent today from appearing twice.
    const dayOfMonth = utils.getDate(utils.newDate());
    var data = getOnInputKeyDownStuff({
      shouldCloseOnSelect: false,
      monthsShown: dayOfMonth < 15 ? 2 : 1
    });

    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowLeft"));
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowLeft"));

    var day = TestUtils.scryRenderedDOMComponentsWithClass(
      data.datePicker.calendar,
      "react-datepicker__day--today"
    )[0];
    TestUtils.Simulate.click(ReactDOM.findDOMNode(day));

    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    data.copyM = utils.addWeeks(data.copyM, 1);
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat)
    ).to.equal(utils.formatDate(data.copyM, data.testFormat));
  });

  it("should hide the calendar when pressing enter in the date input", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker />);
    var dateInput = datePicker.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    TestUtils.Simulate.keyDown(
      ReactDOM.findDOMNode(dateInput),
      getKey("Enter")
    );
    expect(datePicker.calendar).to.not.exist;
  });

  it("should hide the calendar when the pressing escape in the date input", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker />);
    var dateInput = datePicker.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    TestUtils.Simulate.keyDown(
      ReactDOM.findDOMNode(dateInput),
      getKey("Escape")
    );
    expect(datePicker.calendar).to.not.exist;
  });

  it("should hide the calendar when tabbing from the date input", () => {
    var onBlurSpy = sandbox.spy();
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker onBlur={onBlurSpy} />
    );
    var dateInput = datePicker.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    TestUtils.Simulate.keyDown(ReactDOM.findDOMNode(dateInput), getKey("Tab"));
    TestUtils.Simulate.blur(ReactDOM.findDOMNode(dateInput));
    expect(datePicker.calendar).to.not.exist;
    assert(onBlurSpy.calledOnce, "should call onBlur");
  });

  it("should not apply the react-datepicker-ignore-onclickoutside class to the date input when closed", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker />);
    var dateInput = datePicker.input;
    expect(ReactDOM.findDOMNode(dateInput).className).to.not.contain(
      "react-datepicker-ignore-onclickoutside"
    );
  });

  it("should apply the react-datepicker-ignore-onclickoutside class to date input when open", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker />);
    var dateInput = datePicker.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    expect(ReactDOM.findDOMNode(dateInput).className).to.contain(
      "react-datepicker-ignore-onclickoutside"
    );
  });

  it("should set the type attribute on the clear button to button", () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker selected={utils.newDate("2015-12-15")} isClearable />
    );
    var clearButton = TestUtils.findRenderedDOMComponentWithClass(
      datePicker,
      "react-datepicker__close-icon"
    );
    expect(clearButton.type).to.equal("button");
  });

  it("should allow clearing the date when isClearable is true", () => {
    var cleared = false;
    function handleChange(d) {
      if (d === null) {
        cleared = true;
      }
    }
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        selected={utils.newDate("2015-12-15")}
        isClearable
        onChange={handleChange}
      />
    );
    var clearButton = TestUtils.findRenderedDOMComponentWithClass(
      datePicker,
      "react-datepicker__close-icon"
    );
    TestUtils.Simulate.click(clearButton);
    expect(cleared).to.be.true;
  });

  it("should clear input value in the local state", () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker selected={utils.newDate("2015-12-15")} isClearable />
    );
    var clearButton = TestUtils.findRenderedDOMComponentWithClass(
      datePicker,
      "react-datepicker__close-icon"
    );
    TestUtils.Simulate.click(clearButton);
    expect(datePicker.state.inputValue).to.be.null;
  });

  it("should set the title attribute on the clear button if clearButtonTitle is supplied", () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        selected={utils.newDate("2018-03-19")}
        isClearable
        clearButtonTitle="clear button"
      />
    );
    const clearButtonText = TestUtils.findRenderedDOMComponentWithClass(
      datePicker,
      "react-datepicker__close-icon"
    ).getAttribute("title");
    expect(clearButtonText).to.equal("clear button");
  });

  it("should save time from the selected date", () => {
    const selected = utils.newDate("2015-12-20 10:11:12");
    let date;

    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        inline
        selected={selected}
        onChange={d => {
          date = d;
        }}
      />
    );
    var dayButton = TestUtils.scryRenderedDOMComponentsWithClass(
      datePicker,
      "react-datepicker__day"
    )[0];
    TestUtils.Simulate.click(dayButton);

    expect(utils.getHours(date)).to.equal(10);
    expect(utils.getMinutes(date)).to.equal(11);
    expect(utils.getSeconds(date)).to.equal(12);
  });

  it("should mount and unmount properly", done => {
    class TestComponent extends React.Component {
      constructor(props) {
        super(props);
        this.state = { mounted: true };
      }

      render() {
        return this.state.mounted ? <DatePicker /> : null;
      }
    }
    var element = TestUtils.renderIntoDocument(<TestComponent />);
    element.setState({ mounted: false }, done);
  });

  it("should render calendar inside PopperComponent when inline prop is not set", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker />);

    expect(function() {
      TestUtils.findRenderedComponentWithType(datePicker, PopperComponent);
    }).to.not.throw();
  });

  it("should render calendar directly without PopperComponent when inline prop is set", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker inline />);

    expect(function() {
      TestUtils.findRenderedComponentWithType(datePicker, PopperComponent);
    }).to.throw();
    expect(datePicker.calendar).to.exist;
  });

  it("should ignore disable prop when inline prop is set", () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker inline disabled />
    );

    expect(datePicker.calendar).to.exist;
  });

  it("should render Calendar in portal when withPortal is set and input has focus", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker withPortal />);
    var dateInput = datePicker.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));

    expect(function() {
      TestUtils.findRenderedDOMComponentWithClass(
        datePicker,
        "react-datepicker__portal"
      );
    }).to.not.throw();
    expect(datePicker.calendar).to.exist;
  });

  it("should not render Calendar when withPortal is set and no focus is given to input", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker withPortal />);

    expect(function() {
      TestUtils.findRenderedDOMComponentWithClass(
        datePicker,
        "react-datepicker__portal"
      );
    }).to.throw();
    expect(datePicker.calendar).not.to.exist;
  });

  function getOnInputKeyDownStuff(opts) {
    opts = opts || {};
    var m = utils.newDate();
    var copyM = utils.newDate(m);
    var testFormat = "yyyy-MM-dd";
    var exactishFormat = "yyyy-MM-dd hh: zzzz";
    var callback = sandbox.spy();
    var onInputErrorCallback = sandbox.spy();

    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        selected={m}
        onChange={callback}
        onInputError={onInputErrorCallback}
        {...opts}
      />
    );
    var dateInput = datePicker.input;
    var nodeInput = ReactDOM.findDOMNode(dateInput);
    TestUtils.Simulate.focus(nodeInput);
    return {
      m,
      copyM,
      testFormat,
      exactishFormat,
      callback,
      onInputErrorCallback,
      datePicker,
      dateInput,
      nodeInput
    };
  }
  it("should handle onInputKeyDown ArrowLeft", () => {
    var data = getOnInputKeyDownStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowLeft"));
    data.copyM = utils.subDays(data.copyM, 1);
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat)
    ).to.equal(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should handle onInputKeyDown ArrowRight", () => {
    var data = getOnInputKeyDownStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowRight"));
    data.copyM = utils.addDays(data.copyM, 1);
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat)
    ).to.equal(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should handle onInputKeyDown ArrowUp", () => {
    var data = getOnInputKeyDownStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowUp"));
    data.copyM = utils.subWeeks(data.copyM, 1);
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat)
    ).to.equal(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should handle onInputKeyDown ArrowDown", () => {
    var data = getOnInputKeyDownStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    data.copyM = utils.addWeeks(data.copyM, 1);
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat)
    ).to.equal(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should handle onInputKeyDown PageUp", () => {
    var data = getOnInputKeyDownStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("PageUp"));
    data.copyM = utils.subMonths(data.copyM, 1);
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat)
    ).to.equal(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should handle onInputKeyDown PageDown", () => {
    var data = getOnInputKeyDownStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("PageDown"));
    data.copyM = utils.addMonths(data.copyM, 1);
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat)
    ).to.equal(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should handle onInputKeyDown End", () => {
    var data = getOnInputKeyDownStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("End"));
    data.copyM = utils.addYears(data.copyM, 1);
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat)
    ).to.equal(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should handle onInputKeyDown Home", () => {
    var data = getOnInputKeyDownStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("Home"));
    data.copyM = utils.subYears(data.copyM, 1);
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat)
    ).to.equal(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should not preSelect date if not between minDate and maxDate", () => {
    var data = getOnInputKeyDownStuff({
      minDate: utils.subDays(utils.newDate(), 1),
      maxDate: utils.addDays(utils.newDate(), 1)
    });
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat)
    ).to.equal(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should not clear the preSelect date when a pressed key is not a navigation key", () => {
    var data = getOnInputKeyDownStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("x"));
    expect(data.datePicker.state.preSelection.valueOf()).to.equal(
      data.copyM.valueOf()
    );
  });
  describe("onInputKeyDown Enter", () => {
    it("should update the selected date", () => {
      var data = getOnInputKeyDownStuff();
      TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowLeft"));
      TestUtils.Simulate.keyDown(data.nodeInput, getKey("Enter"));
      data.copyM = utils.subDays(data.copyM, 1);
      expect(data.callback.calledOnce).to.be.true;
      var result = data.callback.args[0][0];
      expect(utils.formatDate(result, data.testFormat)).to.equal(
        utils.formatDate(data.copyM, data.testFormat)
      );
    });
    it("should update the selected date on manual input", () => {
      var data = getOnInputKeyDownStuff();
      TestUtils.Simulate.change(data.nodeInput, {
        target: { value: "02/02/2017" }
      });
      TestUtils.Simulate.keyDown(data.nodeInput, getKey("Enter"));
      data.copyM = utils.newDate("2017-02-02");
      expect(
        utils.formatDate(data.callback.args[0][0], data.testFormat)
      ).to.equal(utils.formatDate(data.copyM, data.testFormat));
    });
    it("should not update the selected date if the manual date input is invalid", () => {
      var data = getOnInputKeyDownStuff();
      TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
      TestUtils.Simulate.keyDown(data.nodeInput, getKey("Backspace"));
      TestUtils.Simulate.change(data.nodeInput, {
        target: { value: data.nodeInput.value.slice(0, -1) }
      });
      TestUtils.Simulate.keyDown(data.nodeInput, getKey("Enter"));
      expect(data.callback.calledOnce).to.be.false;
      expect(data.onInputErrorCallback.calledOnce).to.be.true;
    });
    it("should not select excludeDates", () => {
      var data = getOnInputKeyDownStuff({
        excludeDates: [utils.subDays(utils.newDate(), 1)]
      });
      TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowLeft"));
      TestUtils.Simulate.keyDown(data.nodeInput, getKey("Enter"));
      expect(data.callback.calledOnce).to.be.false;
    });
    it("should not select dates excluded from filterDate", () => {
      var data = getOnInputKeyDownStuff({
        filterDate: date =>
          utils.getDay(date) !== utils.getDay(utils.subDays(utils.newDate(), 1))
      });
      TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowLeft"));
      TestUtils.Simulate.keyDown(data.nodeInput, getKey("Enter"));
      expect(data.callback.calledOnce).to.be.false;
    });
  });
  describe("onInputKeyDown Escape", () => {
    it("should not update the selected date if the date input manually it has something wrong", () => {
      var data = getOnInputKeyDownStuff();
      TestUtils.Simulate.keyDown(data.nodeInput, {
        key: "ArrowDown",
        keyCode: 40,
        which: 40
      });
      TestUtils.Simulate.keyDown(data.nodeInput, {
        key: "Backspace",
        keyCode: 8,
        which: 8
      });
      TestUtils.Simulate.keyDown(data.nodeInput, {
        key: "Escape",
        keyCode: 27,
        which: 27
      });
      expect(data.callback.calledOnce).to.be.false;
      expect(data.onInputErrorCallback.calledOnce).to.be.true;
    });
  });
  it("should reset the keyboard selection when closed", () => {
    var data = getOnInputKeyDownStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowLeft"));
    data.datePicker.setOpen(false);
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat)
    ).to.equal(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should retain the keyboard selection when already open", () => {
    var data = getOnInputKeyDownStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowLeft"));
    data.datePicker.setOpen(true);
    data.copyM = utils.subDays(data.copyM, 1);
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat)
    ).to.equal(utils.formatDate(data.copyM, data.testFormat));
  });
  it("should open the calendar when the down arrow key is pressed", () => {
    var data = getOnInputKeyDownStuff();
    data.datePicker.setOpen(false);
    expect(data.datePicker.state.open).to.be.false;
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    expect(data.datePicker.state.open).to.be.true;
  });
  it("should not open the calendar when the left arrow key is pressed", () => {
    var data = getOnInputKeyDownStuff();
    data.datePicker.setOpen(false);
    expect(data.datePicker.state.open).to.be.false;
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowLeft"));
    expect(data.datePicker.state.open).to.be.false;
  });
  it("should default to the current day on Enter", () => {
    const data = getOnInputKeyDownStuff({ selected: null });
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("Enter"));
    expect(data.callback.calledOnce).to.be.true;
    const selected = data.callback.getCall(0).args[0];
    expect(utils.formatDate(selected, data.exactishFormat)).to.equal(
      utils.formatDate(data.copyM, data.exactishFormat)
    );
  });

  it("should autofocus the input given the autoFocus prop", () => {
    var div = document.createElement("div");
    document.body.appendChild(div);
    ReactDOM.render(<DatePicker autoFocus />, div);
    expect(div.querySelector("input")).to.equal(document.activeElement);
  });
  it("should autofocus the input when calling the setFocus method", () => {
    var div = document.createElement("div");
    document.body.appendChild(div);
    var datePicker = ReactDOM.render(<DatePicker />, div);
    datePicker.setFocus();
    expect(div.querySelector("input")).to.equal(document.activeElement);
  });
  it("should clear preventFocus timeout id when component is unmounted", () => {
    var div = document.createElement("div");
    document.body.appendChild(div);
    var datePicker = ReactDOM.render(<DatePicker inline />, div);
    datePicker.clearPreventFocusTimeout = sinon.spy();
    ReactDOM.unmountComponentAtNode(div);
    assert(
      datePicker.clearPreventFocusTimeout.calledOnce,
      "should call clearPreventFocusTimeout"
    );
  });

  function getOnInputKeyDownDisabledKeyboardNavigationStuff() {
    var m = utils.newDate();
    var copyM = utils.newDate(m);
    var testFormat = "yyyy-MM-dd";
    var callback = sandbox.spy();
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker selected={m} onChange={callback} disabledKeyboardNavigation />
    );
    var dateInput = datePicker.input;
    var nodeInput = ReactDOM.findDOMNode(dateInput);
    TestUtils.Simulate.focus(nodeInput);
    return {
      m,
      copyM,
      testFormat,
      callback,
      datePicker,
      dateInput,
      nodeInput
    };
  }
  it("should not handle onInputKeyDown ArrowLeft", () => {
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowLeft"));
    expect(data.callback.called).to.be.false;
  });
  it("should not handle onInputKeyDown ArrowRight", () => {
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowRight"));
    expect(data.callback.called).to.be.false;
  });
  it("should not handle onInputKeyDown ArrowUp", () => {
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowUp"));
    expect(data.callback.called).to.be.false;
  });
  it("should not handle onInputKeyDown ArrowDown", () => {
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("ArrowDown"));
    expect(data.callback.called).to.be.false;
  });
  it("should not handle onInputKeyDown PageUp", () => {
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("PageUp"));
    expect(data.callback.called).to.be.false;
  });
  it("should not handle onInputKeyDown PageDown", () => {
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("PageDown"));
    expect(data.callback.called).to.be.false;
  });
  it("should not handle onInputKeyDown Home", () => {
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("Home"));
    expect(data.callback.called).to.be.false;
  });
  it("should not handle onInputKeyDown End", () => {
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff();
    TestUtils.Simulate.keyDown(data.nodeInput, getKey("End"));
    expect(data.callback.called).to.be.false;
  });
  it("should correctly clear date with empty input string", () => {
    var cleared = false;
    function handleChange(d) {
      // Internally DateInput calls it's onChange prop with null
      // when the input value is an empty string
      if (d === null) {
        cleared = true;
      }
    }
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        selected={utils.newDate("2016-11-22")}
        onChange={handleChange}
      />
    );
    var input = ReactDOM.findDOMNode(datePicker.input);
    input.value = "";
    TestUtils.Simulate.change(input);
    expect(cleared).to.be.true;
  });
  it("should correctly update the input when the value prop changes", () => {
    const datePicker = mount(<DatePicker />);
    expect(datePicker.find("input").prop("value")).to.equal("");
    datePicker.setProps({ value: "foo" });
    expect(datePicker.find("input").prop("value")).to.equal("foo");
  });
  it("should preserve user input as they are typing", () => {
    const onChange = date => datePicker.setProps({ selected: date });
    const datePicker = mount(
      <DatePicker
        dateFormat={["yyyy-MM-dd", "MM/dd/yyyy", "MM/dd/yy"]}
        onChange={onChange}
      />
    );
    expect(datePicker.find("input").prop("value")).to.equal("");

    const str = "12/30/1982";
    datePicker.find("input").simulate("focus");
    str.split("").forEach((c, i) => {
      datePicker.find("input").simulate("change", {
        target: { value: datePicker.find("input").prop("value") + c }
      });
      datePicker.update();
      expect(datePicker.find("input").prop("value")).to.equal(
        str.substring(0, i + 1)
      );
    });
    expect(
      utils.formatDate(datePicker.prop("selected"), "yyyy-MM-dd")
    ).to.equal("1982-12-30");
  });
  it("should invoke provided onChangeRaw function on manual input change", () => {
    const inputValue = "test";
    const onChangeRawSpy = sandbox.spy();
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        selected={utils.newDate()}
        onChange={sandbox.spy()}
        onChangeRaw={onChangeRawSpy}
      />
    );
    expect(onChangeRawSpy.called).to.be.false;
    const input = ReactDOM.findDOMNode(datePicker.input);
    input.value = inputValue;
    TestUtils.Simulate.change(input);
    expect(onChangeRawSpy.calledOnce).to.be.true;
    expect(onChangeRawSpy.args[0][0].target.value).to.equal(inputValue);
  });
  it("should allow onChangeRaw to prevent a change", () => {
    const onChangeRaw = e => e.target.value > "2" && e.preventDefault();
    const datePicker = mount(<DatePicker onChangeRaw={onChangeRaw} />);
    expect(datePicker.find("input").prop("value")).to.equal("");
    datePicker.find("input").simulate("change", { target: { value: "3" } });
    datePicker.update();
    expect(datePicker.find("input").prop("value")).to.equal("");
    datePicker.find("input").simulate("change", { target: { value: "1" } });
    datePicker.update();
    expect(datePicker.find("input").prop("value")).to.equal("1");
  });
  it("should call onChangeRaw with all arguments", () => {
    const inputValue = "test";
    const onChangeRawSpy = sandbox.spy();
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        selected={utils.newDate()}
        onChange={sandbox.spy()}
        customInput={<CustomInput />}
        onChangeRaw={onChangeRawSpy}
      />
    );
    expect(onChangeRawSpy.called).to.be.false;
    const input = ReactDOM.findDOMNode(datePicker.input);
    input.value = inputValue;
    TestUtils.Simulate.change(input);
    expect(onChangeRawSpy.calledOnce).to.be.true;
    expect(onChangeRawSpy.args[0][0].target.value).to.equal(inputValue);
    expect(onChangeRawSpy.args[0][1]).to.equal("test");
  });
  it("should handle the lack of an 'event' object as the first argument to handleChange analogously to 'preventDefault' being called", () => {
    const inputValue = "test";
    const onChangeRawSpy = sandbox.spy();
    let customInput = <CustomInput onChangeArgs={e => [e.target.value]} />;
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker
        selected={utils.newDate()}
        onChange={sandbox.spy()}
        customInput={customInput}
        onChangeRaw={onChangeRawSpy}
      />
    );
    expect(onChangeRawSpy.called).to.be.false;
    const input = ReactDOM.findDOMNode(datePicker.input);
    input.value = inputValue;
    TestUtils.Simulate.change(input);
    expect(onChangeRawSpy.calledOnce).to.be.true;
    expect(onChangeRawSpy.args[0][0]).to.equal("test");
  });
  it("should handle a click outside of the calendar", () => {
    const datePicker = mount(
      <DatePicker selected={utils.newDate()} withPortal />
    ).instance();
    const openSpy = sandbox.spy(datePicker, "setOpen");
    datePicker.handleCalendarClickOutside(
      sandbox.stub({ preventDefault: () => {} })
    );
    expect(openSpy.calledOnce).to.be.true;
    expect(openSpy.calledWithExactly(false)).to.be.true;
  });
  it("should default to the currently selected date", () => {
    const datePicker = mount(
      <DatePicker selected={utils.newDate("1988-12-30")} />
    );
    expect(
      utils.formatDate(datePicker.state("preSelection"), "yyyy-MM-dd")
    ).to.equal("1988-12-30");
  });
  it("should default to the start date when selecting an end date", () => {
    const datePicker = mount(
      <DatePicker startDate={utils.newDate("1988-11-30")} selectsEnd />
    );
    expect(
      utils.formatDate(datePicker.state("preSelection"), "yyyy-MM-dd")
    ).to.equal("1988-11-30");
  });
  it("should default to the end date when selecting a start date", () => {
    const datePicker = mount(
      <DatePicker endDate={utils.newDate("1988-12-31")} selectsStart />
    );
    expect(
      utils.formatDate(datePicker.state("preSelection"), "yyyy-MM-dd")
    ).to.equal("1988-12-31");
  });
  it("should default to a date <= maxDate", () => {
    const datePicker = mount(
      <DatePicker maxDate={utils.newDate("1982-01-01")} />
    );
    expect(
      utils.formatDate(datePicker.state("preSelection"), "yyyy-MM-dd")
    ).to.equal("1982-01-01");
  });
  it("should default to a date >= minDate", () => {
    const datePicker = mount(
      <DatePicker minDate={utils.newDate("2063-04-05")} />
    );
    expect(
      utils.formatDate(datePicker.state("preSelection"), "yyyy-MM-dd")
    ).to.equal("2063-04-05");
  });
  it("should default to the openToDate if there is one", () => {
    const datePicker = mount(
      <DatePicker openToDate={utils.newDate("2020-01-23")} />
    );
    expect(
      utils.formatDate(datePicker.state("preSelection"), "yyyy-MM-dd")
    ).to.equal("2020-01-23");
  });
  it("should otherwise default to the current date", () => {
    const datePicker = mount(<DatePicker />);
    expect(
      utils.formatDate(datePicker.state("preSelection"), "yyyy-MM-dd")
    ).to.equal(utils.formatDate(utils.newDate(), "yyyy-MM-dd"));
  });
  it("should support an initial null `selected` value in inline mode", () => {
    const datePicker = mount(<DatePicker inline selected={null} />);

    expect(() =>
      datePicker.setProps({ selected: utils.newDate() })
    ).to.not.throw();
  });
  it("should switch month in inline mode immediately", () => {
    const selected = utils.newDate();
    const future = utils.addDays(utils.newDate(), 100);
    const datePicker = mount(<DatePicker inline selected={selected} />);
    expect(
      utils.formatDate(datePicker.state("preSelection"), "yyyy-MM-dd")
    ).to.equal(utils.formatDate(selected, "yyyy-MM-dd"));
    datePicker.setProps({ selected: future });
    expect(
      utils.formatDate(datePicker.state("preSelection"), "yyyy-MM-dd")
    ).to.equal(utils.formatDate(future, "yyyy-MM-dd"));
  });
  it("should switch month in inline mode immediately, when year is updated", () => {
    const selected = utils.newDate();
    const future = utils.addYears(utils.newDate(), 1);
    const datePicker = mount(<DatePicker inline selected={selected} />);
    expect(
      utils.formatDate(datePicker.state("preSelection"), "yyyy-MM-dd")
    ).to.equal(utils.formatDate(selected, "yyyy-MM-dd"));
    datePicker.setProps({ selected: future });
    expect(
      utils.formatDate(datePicker.state("preSelection"), "yyyy-MM-dd")
    ).to.equal(utils.formatDate(future, "yyyy-MM-dd"));
  });

  it("should not switch months in inline mode when a day is clicked", () => {
    const selected = utils.newDate();
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker inline selected={selected} monthsShown={2} />
    );
    expect(
      utils.formatDate(datePicker.state.preSelection, "yyyy-MM-dd")
    ).to.equal(utils.formatDate(selected, "yyyy-MM-dd"));

    let days = TestUtils.scryRenderedComponentsWithType(datePicker, Day);
    let nextMonthDay = days.find(
      d => d.props.month !== utils.getMonth(selected)
    );
    TestUtils.Simulate.click(ReactDOM.findDOMNode(nextMonthDay));
    expect(
      utils.formatDate(datePicker.state.preSelection, "yyyy-MM-dd")
    ).to.equal(utils.formatDate(selected, "yyyy-MM-dd"));
  });

  it("should not set open state when focusing on the date input and the preventOpenOnFocus prop is set", () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker preventOpenOnFocus />
    );
    const dateInput = datePicker.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    expect(datePicker.state.open).to.be.false;
  });
  it("should not set open state onInputKeyDown when preventOpenOnFocus prop is set", () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker preventOpenOnFocus />
    );
    const dateInput = datePicker.input;
    TestUtils.Simulate.keyDown(
      ReactDOM.findDOMNode(dateInput),
      getKey("ArrowLeft")
    );
    expect(datePicker.state.open).to.be.false;
  });
  it("should clear the input when clear() member function is called", () => {
    const datePicker = TestUtils.renderIntoDocument(
      <DatePicker selected={utils.newDate("2015-12-15")} />
    );
    datePicker.clear();
    expect(datePicker.state.inputValue).to.be.null;
  });
  it("should not open when open is false and input is focused", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker open={false} />);
    var dateInput = datePicker.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    expect(datePicker.calendar).to.not.exist;
  });
  it("should open when open is true", () => {
    var datePicker = TestUtils.renderIntoDocument(<DatePicker open />);
    expect(datePicker.calendar).to.exist;
  });
  it("should fire onInputClick when input is clicked", () => {
    const onInputClickSpy = sinon.spy();
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker onInputClick={onInputClickSpy} />
    );
    var dateInput = datePicker.input;
    TestUtils.Simulate.click(ReactDOM.findDOMNode(dateInput));
    defer(() => {
      assert(onInputClickSpy.calledOnce, "should fire onInputClick");
      done();
    });
  });

  it("should set monthSelectedIn to 0 if monthsShown prop changes", () => {
    const datePicker = mount(<DatePicker monthsShown={2} inline />);
    datePicker.setState({ monthSelectedIn: 1 }, () => {
      assert.equal(datePicker.state("monthSelectedIn"), 1);
      datePicker.setProps({ monthsShown: 1 }, () => {
        assert.equal(datePicker.props().monthsShown, 1);
        setTimeout(() => {
          // Give setState in componentDidUpdate time to run
          assert.equal(datePicker.state("monthSelectedIn"), 0);
        }, 100);
      });
    });
  });

  it("should save monthSelectedIn only if calendar is inline", () => {
    var datePickerInline = TestUtils.renderIntoDocument(
      <DatePicker inline monthsShown={2} />
    );
    var dayButtonInline = TestUtils.scryRenderedDOMComponentsWithClass(
      datePickerInline,
      "react-datepicker__day"
    )[45];
    TestUtils.Simulate.click(dayButtonInline);
    assert.equal(datePickerInline.state.monthSelectedIn, 1);

    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker monthsShown={2} />
    );
    var dateInput = datePicker.input;
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput));
    var day = TestUtils.scryRenderedComponentsWithType(
      datePicker.calendar,
      Day
    )[40];
    TestUtils.Simulate.click(ReactDOM.findDOMNode(day));
    assert.equal(datePicker.state.monthSelectedIn, undefined);
  });

  it("should disable non-jumping if prop inlineFocusSelectedMonth is true", () => {
    var datePickerInline = TestUtils.renderIntoDocument(
      <DatePicker inline monthsShown={2} inlineFocusSelectedMonth />
    );
    var dayButtonInline = TestUtils.scryRenderedDOMComponentsWithClass(
      datePickerInline,
      "react-datepicker__day"
    )[40];
    TestUtils.Simulate.click(dayButtonInline);
    assert.equal(datePickerInline.state.monthSelectedIn, undefined);
  });
});
