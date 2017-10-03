import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { mount, ReactWrapper } from 'enzyme'
import defer from 'lodash/defer'
import DatePicker from '../src/datepicker.jsx'
import Day from '../src/day'
import PopperComponent from '../src/popper_component.jsx'
import TimezoneDatePicker from './timezone_date_picker.jsx'
import * as utils from '../src/date_utils'

function getKey (key) {
  switch (key) {
    case 'Backspace': return { key, code: 8, which: 8 }
    case 'Tab': return { key, code: 9, which: 9 }
    case 'Enter': return { key, code: 13, which: 13 }
    case 'Escape': return { key, code: 27, which: 27 }
    case 'PageUp': return { key, keyCode: 33, which: 33 }
    case 'PageDown': return { key, keyCode: 34, which: 34 }
    case 'End': return { key, keyCode: 35, which: 35 }
    case 'Home': return { key, keyCode: 36, which: 36 }
    case 'ArrowLeft': return { key, code: 37, which: 37 }
    case 'ArrowUp': return { key, code: 38, which: 38 }
    case 'ArrowRight': return { key, code: 39, which: 39 }
    case 'ArrowDown': return { key, code: 40, which: 40 }
  }
  throw new Error('Unknown key :' + key)
}

describe('DatePicker', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should show the calendar when focusing on the date input', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    )
    var dateInput = datePicker.input
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput))
    expect(datePicker.calendar).to.exist
  })

  it('should show the calendar when clicking on the date input', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    )
    var dateInput = datePicker.input
    TestUtils.Simulate.click(ReactDOM.findDOMNode(dateInput))
    expect(datePicker.calendar).to.exist
  })

  it('should not set open state when it is disabled and gets clicked', function () {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker disabled/>
    )
    var dateInput = datePicker.input
    TestUtils.Simulate.click(ReactDOM.findDOMNode(dateInput))
    expect(datePicker.state.open).to.be.false
  })

  it('should keep the calendar shown when blurring the date input', (done) => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    )
    var dateInput = datePicker.input
    var focusSpy = sandbox.spy(dateInput, 'focus')
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput))
    TestUtils.Simulate.blur(ReactDOM.findDOMNode(dateInput))

    defer(() => {
      expect(datePicker.calendar).to.exist
      assert(focusSpy.calledOnce, 'should refocus the date input')
      done()
    })
  })

  it('should not re-focus the date input when focusing the year dropdown', (done) => {
    const onBlurSpy = sandbox.spy()
    const datePicker = mount(
      <DatePicker
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          onBlur={onBlurSpy}/>
    )
    const dateInput = datePicker.instance().input
    const dateInputWrapper = new ReactWrapper(dateInput, dateInput)
    const focusSpy = sandbox.spy(dateInput, 'focus')

    dateInputWrapper.simulate('focus')
    const calendar = datePicker.instance().calendar
    const calendarWrapper = new ReactWrapper(calendar, calendar)
    const yearSelect = calendarWrapper.find('.react-datepicker__year-select')
    dateInputWrapper.simulate('blur')
    yearSelect.simulate('focus')

    defer(() => {
      assert(focusSpy.called === false, 'should not refocus the date input')
      assert(onBlurSpy.called === false, 'should not call DatePicker onBlur')
      done()
    })
  })

  it('should keep the calendar shown when clicking the calendar', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    )
    var dateInput = datePicker.input
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput))
    TestUtils.Simulate.click(ReactDOM.findDOMNode(datePicker.calendar))
    expect(datePicker.calendar).to.exist
  })

  it('should not set open state when it is disabled and gets clicked', function () {
    var datePicker = TestUtils.renderIntoDocument(
        <DatePicker disabled/>
    )
    var dateInput = datePicker.input
    TestUtils.Simulate.click(ReactDOM.findDOMNode(dateInput))
    expect(datePicker.state.open).to.be.false
  })

  it('should hide the calendar when clicking a day on the calendar', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    )
    var dateInput = datePicker.input
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput))
    var day = TestUtils.scryRenderedComponentsWithType(datePicker.calendar, Day)[0]
    TestUtils.Simulate.click(ReactDOM.findDOMNode(day))
    expect(datePicker.calendar).to.not.exist
  })

  it('should not hide the calendar when clicking a day on the calendar and shouldCloseOnSelect prop is false', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker shouldCloseOnSelect={false}/>
    )
    var dateInput = datePicker.input
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput))
    var day = TestUtils.scryRenderedComponentsWithType(datePicker.calendar, Day)[0]
    TestUtils.Simulate.click(ReactDOM.findDOMNode(day))
    expect(datePicker.state.open).to.be.true
  })

  it('should not hide the calendar when selecting a day in the calendar with Enter press, and shouldCloseOnSelect prop is false', () => {
    var data = getOnInputKeyDownStuff({shouldCloseOnSelect: false})
    var dateInput = data.datePicker.input

    TestUtils.Simulate.keyDown(data.nodeInput, getKey('ArrowUp'))
    TestUtils.Simulate.keyDown(ReactDOM.findDOMNode(dateInput), getKey('Enter'))
    expect(data.datePicker.state.open).to.be.true
  })

  it('should update the preSelection state when a day is selected with Enter press', () => {
    var data = getOnInputKeyDownStuff({shouldCloseOnSelect: false})
    var dateInput = data.datePicker.input
    TestUtils.Simulate.keyDown(data.nodeInput, getKey('ArrowDown'))
    TestUtils.Simulate.keyDown(ReactDOM.findDOMNode(dateInput), getKey('Enter'))
    TestUtils.Simulate.keyDown(data.nodeInput, getKey('ArrowDown'))
    utils.addWeeks(data.copyM, 2)
    expect(utils.formatDate(data.datePicker.state.preSelection, data.testFormat)).to.equal(utils.formatDate(data.copyM, data.testFormat))
  })

  it('should update the preSelection state when a day is selected with mouse click', () => {
    // Note: We need monthsShown=2 so that today can still be clicked when
    // ArrowLeft selects the previous month. (On the 1st 2 days of the month.)
    var data = getOnInputKeyDownStuff({shouldCloseOnSelect: false, monthsShown: 2})

    TestUtils.Simulate.keyDown(data.nodeInput, getKey('ArrowLeft'))
    TestUtils.Simulate.keyDown(data.nodeInput, getKey('ArrowLeft'))

    var day = TestUtils.findRenderedDOMComponentWithClass(data.datePicker.calendar, 'react-datepicker__day--today')
    TestUtils.Simulate.click(ReactDOM.findDOMNode(day))

    TestUtils.Simulate.keyDown(data.nodeInput, getKey('ArrowDown'))
    utils.addWeeks(data.copyM, 1)
    expect(utils.formatDate(data.datePicker.state.preSelection, data.testFormat)).to.equal(utils.formatDate(data.copyM, data.testFormat))
  })

  it('should hide the calendar when pressing enter in the date input', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    )
    var dateInput = datePicker.input
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput))
    TestUtils.Simulate.keyDown(ReactDOM.findDOMNode(dateInput), getKey('Enter'))
    expect(datePicker.calendar).to.not.exist
  })

  it('should hide the calendar when the pressing escape in the date input', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    )
    var dateInput = datePicker.input
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput))
    TestUtils.Simulate.keyDown(ReactDOM.findDOMNode(dateInput), getKey('Escape'))
    expect(datePicker.calendar).to.not.exist
  })

  it('should hide the calendar when tabbing from the date input', () => {
    var onBlurSpy = sandbox.spy()
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker onBlur={onBlurSpy} />
    )
    var dateInput = datePicker.input
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput))
    TestUtils.Simulate.keyDown(ReactDOM.findDOMNode(dateInput), getKey('Tab'))
    TestUtils.Simulate.blur(ReactDOM.findDOMNode(dateInput))
    expect(datePicker.calendar).to.not.exist
    assert(onBlurSpy.calledOnce, 'should call onBlur')
  })

  it('should not apply the react-datepicker-ignore-onclickoutside class to the date input when closed', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    )
    var dateInput = datePicker.input
    expect(ReactDOM.findDOMNode(dateInput).className).to.not.contain('react-datepicker-ignore-onclickoutside')
  })

  it('should apply the react-datepicker-ignore-onclickoutside class to date input when open', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    )
    var dateInput = datePicker.input
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput))
    expect(ReactDOM.findDOMNode(dateInput).className).to.contain('react-datepicker-ignore-onclickoutside')
  })

  it('should allow clearing the date when isClearable is true', () => {
    var cleared = false
    function handleChange (d) {
      if (d === null) {
        cleared = true
      }
    }
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker
          selected={utils.newDate('2015-12-15')}
          isClearable
          onChange={handleChange} />
    )
    var clearButton = TestUtils.findRenderedDOMComponentWithClass(datePicker, 'react-datepicker__close-icon')
    TestUtils.Simulate.click(clearButton)
    expect(cleared).to.be.true
  })

  it('should save time from the selected date', () => {
    const selected = utils.newDate('2015-12-20 10:11:12')
    let date

    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker
          inline
          selected={selected}
          onChange={(d) => { date = d }} />
    )
    var dayButton = TestUtils.scryRenderedDOMComponentsWithClass(datePicker, 'react-datepicker__day')[0]
    TestUtils.Simulate.click(dayButton)

    expect(utils.getHour(date)).to.equal(10)
    expect(utils.getMinute(date)).to.equal(11)
    expect(utils.getSecond(date)).to.equal(12)
  })

  it('should mount and unmount properly', done => {
    class TestComponent extends React.Component {
      constructor (props) {
        super(props)
        this.state = { mounted: true }
      }

      render () {
        return this.state.mounted ? <DatePicker /> : null
      }
    }
    var element = TestUtils.renderIntoDocument(<TestComponent />)
    element.setState({ mounted: false }, done)
  })

  it('should render calendar inside PopperComponent when inline prop is not set', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    )

    expect(function () { TestUtils.findRenderedComponentWithType(datePicker, PopperComponent) }).to.not.throw()
  })

  it('should render calendar directly without PopperComponent when inline prop is set', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker inline />
    )

    expect(function () { TestUtils.findRenderedComponentWithType(datePicker, PopperComponent) }).to.throw()
    expect(datePicker.calendar).to.exist
  })

  it('should ignore disable prop when inline prop is set', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker inline disabled />
    )

    expect(datePicker.calendar).to.exist
  })

  it('should render Calendar in portal when withPortal is set and input has focus', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker withPortal />
    )
    var dateInput = datePicker.input
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput))

    expect(function () { TestUtils.findRenderedDOMComponentWithClass(datePicker, 'react-datepicker__portal') }).to.not.throw()
    expect(datePicker.calendar).to.exist
  })

  it('should not render Calendar when withPortal is set and no focus is given to input', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker withPortal />
    )

    expect(function () { TestUtils.findRenderedDOMComponentWithClass(datePicker, 'react-datepicker__portal') }).to.throw()
    expect(datePicker.calendar).not.to.exist
  })

  function getOnInputKeyDownStuff (opts) {
    opts = opts || {}
    var m = utils.newDate()
    var copyM = utils.cloneDate(m)
    var testFormat = 'YYYY-MM-DD'
    var callback = sandbox.spy()
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker selected={m}
          onChange={callback}
          inline={opts.inline}
          excludeDates={opts.excludeDates}
          filterDate={opts.filterDate}
          minDate={opts.minDate}
          maxDate={opts.maxDate}
          monthsShown={opts.monthsShown}
          shouldCloseOnSelect={opts.shouldCloseOnSelect}/>
    )
    var dateInput = datePicker.input
    var nodeInput = ReactDOM.findDOMNode(dateInput)
    TestUtils.Simulate.focus(nodeInput)
    return {
      m, copyM, testFormat, callback, datePicker, dateInput, nodeInput
    }
  }
  it('should handle onInputKeyDown ArrowLeft', () => {
    var data = getOnInputKeyDownStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, getKey('ArrowLeft'))
    utils.subtractDays(data.copyM, 1)
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat)
    ).to.equal(utils.formatDate(data.copyM, data.testFormat))
  })
  it('should handle onInputKeyDown ArrowRight', () => {
    var data = getOnInputKeyDownStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, getKey('ArrowRight'))
    utils.addDays(data.copyM, 1)
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat)
    ).to.equal(utils.formatDate(data.copyM, data.testFormat))
  })
  it('should handle onInputKeyDown ArrowUp', () => {
    var data = getOnInputKeyDownStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, getKey('ArrowUp'))
    utils.subtractWeeks(data.copyM, 1)
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat)
    ).to.equal(utils.formatDate(data.copyM, data.testFormat))
  })
  it('should handle onInputKeyDown ArrowDown', () => {
    var data = getOnInputKeyDownStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, getKey('ArrowDown'))
    utils.addWeeks(data.copyM, 1)
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat)
    ).to.equal(utils.formatDate(data.copyM, data.testFormat))
  })
  it('should handle onInputKeyDown PageUp', () => {
    var data = getOnInputKeyDownStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, getKey('PageUp'))
    utils.subtractMonths(data.copyM, 1)
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat)
    ).to.equal(utils.formatDate(data.copyM, data.testFormat))
  })
  it('should handle onInputKeyDown PageDown', () => {
    var data = getOnInputKeyDownStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, getKey('PageDown'))
    utils.addMonths(data.copyM, 1)
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat)
    ).to.equal(utils.formatDate(data.copyM, data.testFormat))
  })
  it('should handle onInputKeyDown End', () => {
    var data = getOnInputKeyDownStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, getKey('End'))
    utils.addYears(data.copyM, 1)
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat)
    ).to.equal(utils.formatDate(data.copyM, data.testFormat))
  })
  it('should handle onInputKeyDown Home', () => {
    var data = getOnInputKeyDownStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, getKey('Home'))
    utils.subtractYears(data.copyM, 1)
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat)
    ).to.equal(utils.formatDate(data.copyM, data.testFormat))
  })
  it('should not preSelect date if not between minDate and maxDate', () => {
    var data = getOnInputKeyDownStuff({
      minDate: utils.subtractDays(utils.newDate(), 1),
      maxDate: utils.addDays(utils.newDate(), 1)
    })
    TestUtils.Simulate.keyDown(data.nodeInput, getKey('ArrowDown'))
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat)
    ).to.equal(utils.formatDate(data.copyM, data.testFormat))
  })
  describe('onInputKeyDown Enter', () => {
    it('should update the selected date', () => {
      var data = getOnInputKeyDownStuff()
      TestUtils.Simulate.keyDown(data.nodeInput, getKey('ArrowLeft'))
      TestUtils.Simulate.keyDown(data.nodeInput, getKey('Enter'))
      utils.subtractDays(data.copyM, 1)
      expect(data.callback.calledOnce).to.be.true
      var result = data.callback.args[0][0]
      expect(
        utils.formatDate(result, data.testFormat)
      ).to.equal(utils.formatDate(data.copyM, data.testFormat))
    })
    it('should update the selected date on manual input', () => {
      var data = getOnInputKeyDownStuff()
      TestUtils.Simulate.change(data.nodeInput, {target: {value: '02/02/2017'}})
      TestUtils.Simulate.keyDown(data.nodeInput, getKey('Enter'))
      data.copyM = utils.newDate('02/02/2017')
      expect(
        utils.formatDate(data.callback.args[0][0], data.testFormat)
      ).to.equal(utils.formatDate(data.copyM, data.testFormat))
    })
    it('should not update the selected date if the date input manually it has something wrong', () => {
      var data = getOnInputKeyDownStuff()
      TestUtils.Simulate.keyDown(data.nodeInput, getKey('ArrowDown'))
      TestUtils.Simulate.keyDown(data.nodeInput, getKey('Backspace'))
      TestUtils.Simulate.keyDown(data.nodeInput, getKey('Enter'))
      expect(data.callback.calledOnce).to.be.false
    })
    it('should not select excludeDates', () => {
      var data = getOnInputKeyDownStuff({
        excludeDates: [
          utils.subtractDays(utils.newDate(), 1)
        ]
      })
      TestUtils.Simulate.keyDown(data.nodeInput, getKey('ArrowLeft'))
      TestUtils.Simulate.keyDown(data.nodeInput, getKey('Enter'))
      expect(data.callback.calledOnce).to.be.false
    })
    it('should not select dates excluded from filterDate', () => {
      var data = getOnInputKeyDownStuff({
        filterDate: date => utils.getDay(date) !== utils.getDay(utils.subtractDays(utils.newDate(), 1))
      })
      TestUtils.Simulate.keyDown(data.nodeInput, getKey('ArrowLeft'))
      TestUtils.Simulate.keyDown(data.nodeInput, getKey('Enter'))
      expect(data.callback.calledOnce).to.be.false
    })
  })
  it('should reset the keyboard selection when closed', () => {
    var data = getOnInputKeyDownStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, getKey('ArrowLeft'))
    data.datePicker.setOpen(false)
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat)
    ).to.equal(utils.formatDate(data.copyM, data.testFormat))
  })
  it('should retain the keyboard selection when already open', () => {
    var data = getOnInputKeyDownStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, getKey('ArrowLeft'))
    data.datePicker.setOpen(true)
    utils.subtractDays(data.copyM, 1)
    expect(
      utils.formatDate(data.datePicker.state.preSelection, data.testFormat)
    ).to.equal(utils.formatDate(data.copyM, data.testFormat))
  })
  it('should open the calendar when an arrow key is pressed', () => {
    var data = getOnInputKeyDownStuff()
    data.datePicker.setOpen(false)
    expect(data.datePicker.state.open).to.be.false
    TestUtils.Simulate.keyDown(data.nodeInput, getKey('ArrowLeft'))
    expect(data.datePicker.state.open).to.be.true
  })
  it('should autofocus the input given the autoFocus prop', () => {
    var div = document.createElement('div')
    document.body.appendChild(div)
    ReactDOM.render(<DatePicker autoFocus />, div)
    expect(div.querySelector('input')).to.equal(document.activeElement)
  })
  it('should autofocus the input when calling the setFocus method', () => {
    var div = document.createElement('div')
    document.body.appendChild(div)
    var datePicker = ReactDOM.render(<DatePicker />, div)
    datePicker.setFocus()
    expect(div.querySelector('input')).to.equal(document.activeElement)
  })
  it('should clear preventFocus timeout id when component is unmounted', () => {
    var div = document.createElement('div')
    document.body.appendChild(div)
    var datePicker = ReactDOM.render(<DatePicker inline />, div)
    datePicker.clearPreventFocusTimeout = sinon.spy()
    ReactDOM.unmountComponentAtNode(div)
    assert(datePicker.clearPreventFocusTimeout.calledOnce, 'should call clearPreventFocusTimeout')
  })

  function getOnInputKeyDownDisabledKeyboardNavigationStuff () {
    var m = utils.newDate()
    var copyM = utils.cloneDate(m)
    var testFormat = 'YYYY-MM-DD'
    var callback = sandbox.spy()
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker selected={m} onChange={callback} disabledKeyboardNavigation/>
    )
    var dateInput = datePicker.input
    var nodeInput = ReactDOM.findDOMNode(dateInput)
    TestUtils.Simulate.focus(nodeInput)
    return {
      m, copyM, testFormat, callback, datePicker, dateInput, nodeInput
    }
  }
  it('should not handle onInputKeyDown ArrowLeft', () => {
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, getKey('ArrowLeft'))
    expect(data.callback.called).to.be.false
  })
  it('should not handle onInputKeyDown ArrowRight', () => {
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, getKey('ArrowRight'))
    expect(data.callback.called).to.be.false
  })
  it('should not handle onInputKeyDown ArrowUp', () => {
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, getKey('ArrowUp'))
    expect(data.callback.called).to.be.false
  })
  it('should not handle onInputKeyDown ArrowDown', () => {
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, getKey('ArrowDown'))
    expect(data.callback.called).to.be.false
  })
  it('should not handle onInputKeyDown PageUp', () => {
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, getKey('PageUp'))
    expect(data.callback.called).to.be.false
  })
  it('should not handle onInputKeyDown PageDown', () => {
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, getKey('PageDown'))
    expect(data.callback.called).to.be.false
  })
  it('should not handle onInputKeyDown Home', () => {
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, getKey('Home'))
    expect(data.callback.called).to.be.false
  })
  it('should not handle onInputKeyDown End', () => {
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, getKey('End'))
    expect(data.callback.called).to.be.false
  })

  it('should correctly clear date with empty input string', () => {
    var cleared = false
    function handleChange (d) {
      // Internally DateInput calls it's onChange prop with null
      // when the input value is an empty string
      if (d === null) {
        cleared = true
      }
    }
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker
          selected={utils.newDate('2016-11-22')}
          onChange={handleChange} />
    )
    var input = ReactDOM.findDOMNode(datePicker.input)
    input.value = ''
    TestUtils.Simulate.change(input)
    expect(cleared).to.be.true
  })
  it('should correctly update the date input when utcOffset is all that changes on the selected date', () => {
    var date = utils.setUTCOffset(utils.newDate('2016-11-22T00:00:00Z'), -6)
    var tmzDatePicker = mount(<TimezoneDatePicker />)
    tmzDatePicker.setState({startDate: date, utcOffset: -6})

    expect(tmzDatePicker.find('input').prop('value')).to.equal('2016-11-21 18:00')

    tmzDatePicker.setState({utcOffset: 6, startDate: utils.setUTCOffset(utils.cloneDate(date), 6)})

    expect(tmzDatePicker.find('input').prop('value')).to.equal('2016-11-22 06:00')
  })
  it('should correctly update the input when the value prop changes', () => {
    const datePicker = mount(<DatePicker />)
    expect(datePicker.find('input').prop('value')).to.equal('')
    datePicker.setProps({value: 'foo'})
    expect(datePicker.find('input').prop('value')).to.equal('foo')
  })
  it('should preserve user input as they are typing', () => {
    const onChange = date => datePicker.setProps({selected: date})
    const datePicker = mount(
      <DatePicker dateFormat={['YYYY-MM-DD', 'MM/DD/YYYY', 'MM/DD/YY']} onChange={onChange}/>
    )
    const input = datePicker.find('input')
    expect(input.prop('value')).to.equal('')

    const str = '12/30/1982'
    str.split('').forEach((c, i) => {
      input.simulate('change', {target: { value: input.prop('value') + c }})
      expect(input.prop('value')).to.equal(str.substring(0, i + 1))
    })
    expect(utils.formatDate(datePicker.prop('selected'), 'YYYY-MM-DD')).to.equal('1982-12-30')
  })
  it('should invoke provided onChangeRaw function on manual input change', () => {
    const inputValue = 'test'
    const onChangeRawSpy = sandbox.spy()
    const datePicker = TestUtils.renderIntoDocument(
        <DatePicker selected={utils.newDate()} onChange={sandbox.spy()} onChangeRaw={onChangeRawSpy}/>
    )
    expect(onChangeRawSpy.called).to.be.false
    const input = ReactDOM.findDOMNode(datePicker.input)
    input.value = inputValue
    TestUtils.Simulate.change(input)
    expect(onChangeRawSpy.calledOnce).to.be.true
    expect(onChangeRawSpy.args[0][0].target.value).to.equal(inputValue)
  })
  it('should allow onChangeRaw to prevent a change', () => {
    const onChangeRaw = e => e.target.value > '2' && e.preventDefault()
    const datePicker = mount(
      <DatePicker onChangeRaw={onChangeRaw} />
    )
    const input = datePicker.find('input')
    expect(input.prop('value')).to.equal('')
    input.simulate('change', {target: { value: '3' }})
    expect(input.prop('value')).to.equal('')
    input.simulate('change', {target: { value: '1' }})
    expect(input.prop('value')).to.equal('1')
  })

  it('should handle a click outside of the calendar', () => {
    const datePicker = mount(
        <DatePicker selected={utils.newDate()} withPortal/>
    ).instance()
    const openSpy = sandbox.spy(datePicker, 'setOpen')
    datePicker.handleCalendarClickOutside(sandbox.stub({preventDefault: () => {}}))
    expect(openSpy.calledOnce).to.be.true
    expect(openSpy.calledWithExactly(false)).to.be.true
  })
  it('should default to the currently selected date', () => {
    const datePicker = mount(
      <DatePicker selected={utils.newDate('1988-12-30')} />
    )
    expect(utils.formatDate(datePicker.state('preSelection'), 'YYYY-MM-DD')).to.equal('1988-12-30')
  })
  it('should default to the start date when selecting an end date', () => {
    const datePicker = mount(
      <DatePicker startDate={utils.newDate('1988-11-30')} selectsEnd />
    )
    expect(utils.formatDate(datePicker.state('preSelection'), 'YYYY-MM-DD')).to.equal('1988-11-30')
  })
  it('should default to the end date when selecting a start date', () => {
    const datePicker = mount(
      <DatePicker endDate={utils.newDate('1988-12-31')} selectsStart />
    )
    expect(utils.formatDate(datePicker.state('preSelection'), 'YYYY-MM-DD')).to.equal('1988-12-31')
  })
  it('should default to a date <= maxDate', () => {
    const datePicker = mount(
      <DatePicker maxDate={utils.newDate('1982-01-01')} />
    )
    expect(utils.formatDate(datePicker.state('preSelection'), 'YYYY-MM-DD')).to.equal('1982-01-01')
  })
  it('should default to a date >= minDate', () => {
    const datePicker = mount(
      <DatePicker minDate={utils.newDate('2063-04-05')} />
    )
    expect(utils.formatDate(datePicker.state('preSelection'), 'YYYY-MM-DD')).to.equal('2063-04-05')
  })
  it('should default to the openToDate if there is one', () => {
    const datePicker = mount(
      <DatePicker openToDate={utils.newDate('2020-01-23')} />
    )
    expect(utils.formatDate(datePicker.state('preSelection'), 'YYYY-MM-DD')).to.equal('2020-01-23')
  })
  it('should otherwise default to the current date', () => {
    const datePicker = mount(
      <DatePicker/>
    )
    expect(utils.formatDate(datePicker.state('preSelection'), 'YYYY-MM-DD')).to.equal(utils.formatDate(utils.newDate(), 'YYYY-MM-DD'))
  })
  it('should support an initial null `selected` value in inline mode', () => {
    const datePicker = mount(<DatePicker inline selected={null} />)

    expect(() => datePicker.setProps({ selected: utils.newDate() })).to.not.throw()
  })
  it('should switch month in inline mode immediately', () => {
    const selected = utils.newDate()
    const future = utils.addDays(utils.newDate(), 100)
    const datePicker = mount(
      <DatePicker inline selected={selected}/>
    )
    expect(utils.formatDate(datePicker.state('preSelection'), 'YYYY-MM-DD')).to.equal(utils.formatDate(selected, 'YYYY-MM-DD'))
    datePicker.setProps({ selected: future })
    expect(utils.formatDate(datePicker.state('preSelection'), 'YYYY-MM-DD')).to.equal(utils.formatDate(future, 'YYYY-MM-DD'))
  })
})
