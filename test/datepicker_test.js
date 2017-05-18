import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { mount } from 'enzyme'
import defer from 'lodash/defer'
import DatePicker from '../src/datepicker.jsx'
import Day from '../src/day'
import TetherComponent from '../src/tether_component.jsx'
import TimezoneDatePicker from './timezone_date_picker.jsx'
import moment from 'moment'

describe('DatePicker', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  xit('should show the calendar when focusing on the date input', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    )
    var dateInput = datePicker.refs.input
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput))
    expect(datePicker.refs.calendar).to.exist
  })

  xit('should show the calendar when clicking on the date input', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    )
    var dateInput = datePicker.refs.input
    TestUtils.Simulate.click(ReactDOM.findDOMNode(dateInput))
    expect(datePicker.refs.calendar).to.exist
  })

  it('should not set open state when it is disabled and gets clicked', function () {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker disabled/>
    )
    var dateInput = datePicker.refs.input
    TestUtils.Simulate.click(ReactDOM.findDOMNode(dateInput))
    expect(datePicker.state.open).to.be.false
  })

  xit('should render the calendar into a specified node', () => {
    var node = document.createElement('div')
    document.body.appendChild(node)
    var datePicker = TestUtils.renderIntoDocument(
        <DatePicker renderCalendarTo={node} />
    )
    var dateInput = datePicker.refs.input
    TestUtils.Simulate.click(ReactDOM.findDOMNode(dateInput))
    expect(datePicker.refs.calendar).to.exist
    var calendarNode = ReactDOM.findDOMNode(datePicker.refs.calendar)
    expect(node.contains(calendarNode)).to.be.true
    document.body.removeChild(node)
  })

  xit('should keep the calendar shown when blurring the date input', (done) => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    )
    var dateInput = datePicker.refs.input
    var focusSpy = sandbox.spy(dateInput, 'focus')
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput))
    TestUtils.Simulate.blur(ReactDOM.findDOMNode(dateInput))

    defer(() => {
      expect(datePicker.refs.calendar).to.exist
      assert(focusSpy.calledOnce, 'should refocus the date input')
      done()
    })
  })

  xit('should not re-focus the date input when focusing the year dropdown', (done) => {
    const onBlurSpy = sandbox.spy()
    const datePicker = mount(
      <DatePicker
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          onBlur={onBlurSpy}/>
    )
    const dateInput = datePicker.ref('input')
    const focusSpy = sandbox.spy(dateInput.get(0), 'focus')

    dateInput.simulate('focus')
    const yearSelect = datePicker.ref('calendar').find('.react-datepicker__year-select')
    dateInput.simulate('blur')
    yearSelect.simulate('focus')

    defer(() => {
      assert(focusSpy.called === false, 'should not refocus the date input')
      assert(onBlurSpy.called === false, 'should not call DatePicker onBlur')
      done()
    })
  })

  xit('should keep the calendar shown when clicking the calendar', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    )
    var dateInput = datePicker.refs.input
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput))
    TestUtils.Simulate.click(ReactDOM.findDOMNode(datePicker.refs.calendar))
    expect(datePicker.refs.calendar).to.exist
  })

  it('should not set open state when it is disabled and gets clicked', function () {
    var datePicker = TestUtils.renderIntoDocument(
        <DatePicker disabled/>
    )
    var dateInput = datePicker.refs.input
    TestUtils.Simulate.click(ReactDOM.findDOMNode(dateInput))
    expect(datePicker.state.open).to.be.false
  })

  xit('should hide the calendar when clicking a day on the calendar', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    )
    var dateInput = datePicker.refs.input
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput))
    var day = TestUtils.scryRenderedComponentsWithType(datePicker.refs.calendar, Day)[0]
    TestUtils.Simulate.click(ReactDOM.findDOMNode(day))
    expect(datePicker.refs.calendar).to.not.exist
  })

  xit('should hide the calendar when the pressing enter in the date input', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    )
    var dateInput = datePicker.refs.input
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput))
    TestUtils.Simulate.keyDown(ReactDOM.findDOMNode(dateInput), { key: 'Enter' })
    expect(datePicker.refs.calendar).to.not.exist
  })

  xit('should hide the calendar when the pressing escape in the date input', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    )
    var dateInput = datePicker.refs.input
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput))
    TestUtils.Simulate.keyDown(ReactDOM.findDOMNode(dateInput), { key: 'Escape' })
    expect(datePicker.refs.calendar).to.not.exist
  })

  xit('should hide the calendar when tabbing from the date input', () => {
    var onBlurSpy = sandbox.spy()
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker onBlur={onBlurSpy} />
    )
    var dateInput = datePicker.refs.input
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput))
    TestUtils.Simulate.keyDown(ReactDOM.findDOMNode(dateInput), { key: 'Tab' })
    TestUtils.Simulate.blur(ReactDOM.findDOMNode(dateInput))
    expect(datePicker.refs.calendar).to.not.exist
    assert(onBlurSpy.calledOnce, 'should call onBlur')
  })

  it('should not apply the react-datepicker-ignore-onclickoutside class to the date input when closed', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    )
    var dateInput = datePicker.refs.input
    expect(ReactDOM.findDOMNode(dateInput).className).to.not.contain('react-datepicker-ignore-onclickoutside')
  })

  xit('should apply the react-datepicker-ignore-onclickoutside class to date input when open', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    )
    var dateInput = datePicker.refs.input
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
          selected={moment('2015-12-15')}
          isClearable
          onChange={handleChange} />
    )
    var clearButton = TestUtils.findRenderedDOMComponentWithClass(datePicker, 'react-datepicker__close-icon')
    TestUtils.Simulate.click(clearButton)
    expect(cleared).to.be.true
  })

  it('should save time from the selected date', () => {
    const selected = moment('2015-12-20 10:11:12')
    let date

    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker
          inline
          selected={selected}
          onChange={(d) => { date = d }} />
    )
    var dayButton = TestUtils.scryRenderedDOMComponentsWithClass(datePicker, 'react-datepicker__day')[0]
    TestUtils.Simulate.click(dayButton)

    expect(date.hours()).to.equal(10)
    expect(date.minutes()).to.equal(11)
    expect(date.seconds()).to.equal(12)
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

  it('should render calendar inside TetherComponent when inline prop is not set', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    )

    expect(function () { TestUtils.findRenderedComponentWithType(datePicker, TetherComponent) }).to.not.throw()
  })

  xit('should render calendar directly without TetherComponent when inline prop is set', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker inline />
    )

    expect(function () { TestUtils.findRenderedComponentWithType(datePicker, TetherComponent) }).to.throw()
    expect(datePicker.refs.calendar).to.exist
  })

  xit('should ignore disable prop when inline prop is set', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker inline disabled />
    )

    expect(datePicker.refs.calendar).to.exist
  })

  xit('should render Calendar in portal when withPortal is set and input has focus', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker withPortal />
    )
    var dateInput = datePicker.refs.input
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput))

    expect(function () { TestUtils.findRenderedDOMComponentWithClass(datePicker, 'react-datepicker__portal') }).to.not.throw()
    expect(datePicker.refs.calendar).to.exist
  })

  it('should not render Calendar when withPortal is set and no focus is given to input', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker withPortal />
    )

    expect(function () { TestUtils.findRenderedDOMComponentWithClass(datePicker, 'react-datepicker__portal') }).to.throw()
    expect(datePicker.refs.calendar).not.to.exist
  })

  function getOnInputKeyDownStuff (opts) {
    opts = opts || {}
    var m = moment()
    var copyM = moment(m)
    var testFormat = 'YYYY-MM-DD'
    var callback = sandbox.spy()
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker selected={m}
          onChange={callback}
          inline={opts.inline}
          excludeDates={opts.excludeDates}
          filterDate={opts.filterDate}
          minDate={opts.minDate}
          maxDate={opts.maxDate}/>
    )
    var dateInput = datePicker.refs.input
    var nodeInput = ReactDOM.findDOMNode(dateInput)
    TestUtils.Simulate.focus(nodeInput)
    return {
      m, copyM, testFormat, callback, datePicker, dateInput, nodeInput
    }
  }
  it('should handle onInputKeyDown ArrowLeft', () => {
    var data = getOnInputKeyDownStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, {key: 'ArrowLeft', keyCode: 37, which: 37})
    data.copyM.subtract(1, 'days')
    expect(data.datePicker.state.preSelection.format(data.testFormat)).to.equal(data.copyM.format(data.testFormat))
  })
  it('should handle onInputKeyDown ArrowRight', () => {
    var data = getOnInputKeyDownStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, {key: 'ArrowRight', keyCode: 39, which: 39})
    data.copyM.add(1, 'days')
    expect(data.datePicker.state.preSelection.format(data.testFormat)).to.equal(data.copyM.format(data.testFormat))
  })
  it('should handle onInputKeyDown ArrowUp', () => {
    var data = getOnInputKeyDownStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, {key: 'ArrowUp', keyCode: 38, which: 38})
    data.copyM.subtract(1, 'weeks')
    expect(data.datePicker.state.preSelection.format(data.testFormat)).to.equal(data.copyM.format(data.testFormat))
  })
  it('should handle onInputKeyDown ArrowDown', () => {
    var data = getOnInputKeyDownStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, {key: 'ArrowDown', keyCode: 40, which: 40})
    data.copyM.add(1, 'weeks')
    expect(data.datePicker.state.preSelection.format(data.testFormat)).to.equal(data.copyM.format(data.testFormat))
  })
  it('should handle onInputKeyDown PageUp', () => {
    var data = getOnInputKeyDownStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, {key: 'PageUp', keyCode: 33, which: 33})
    data.copyM.subtract(1, 'months')
    expect(data.datePicker.state.preSelection.format(data.testFormat)).to.equal(data.copyM.format(data.testFormat))
  })
  it('should handle onInputKeyDown PageDown', () => {
    var data = getOnInputKeyDownStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, {key: 'PageDown', keyCode: 34, which: 34})
    data.copyM.add(1, 'months')
    expect(data.datePicker.state.preSelection.format(data.testFormat)).to.equal(data.copyM.format(data.testFormat))
  })
  it('should handle onInputKeyDown End', () => {
    var data = getOnInputKeyDownStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, {key: 'End', keyCode: 35, which: 35})
    data.copyM.add(1, 'years')
    expect(data.datePicker.state.preSelection.format(data.testFormat)).to.equal(data.copyM.format(data.testFormat))
  })
  it('should handle onInputKeyDown Home', () => {
    var data = getOnInputKeyDownStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, {key: 'Home', keyCode: 36, which: 36})
    data.copyM.subtract(1, 'years')
    expect(data.datePicker.state.preSelection.format(data.testFormat)).to.equal(data.copyM.format(data.testFormat))
  })
  it('should not preSelect date if not between minDate and maxDate', () => {
    var data = getOnInputKeyDownStuff({minDate: moment().subtract(1, 'day'), maxDate: moment().add(1, 'day')})
    TestUtils.Simulate.keyDown(data.nodeInput, {key: 'ArrowDown', keyCode: 40, which: 40})
    expect(data.datePicker.state.preSelection.format(data.testFormat)).to.equal(moment().format(data.testFormat))
  })
  describe('onInputKeyDown Enter', () => {
    it('should update the selected date', () => {
      var data = getOnInputKeyDownStuff()
      TestUtils.Simulate.keyDown(data.nodeInput, {key: 'ArrowLeft', keyCode: 37, which: 37})
      TestUtils.Simulate.keyDown(data.nodeInput, {key: 'Enter', keyCode: 13, which: 13})
      data.copyM.subtract(1, 'days')
      expect(data.callback.calledOnce).to.be.true
      var result = data.callback.args[0][0]
      expect(result.format(data.testFormat)).to.equal(data.copyM.format(data.testFormat))
    })
    it('should update the selected date on manual input', () => {
      var data = getOnInputKeyDownStuff()
      TestUtils.Simulate.change(data.nodeInput, {target: {value: '02/02/2017'}})
      TestUtils.Simulate.keyDown(data.nodeInput, {key: 'Enter', keyCode: 13, which: 13})
      data.copyM = moment('02/02/2017')
      expect(data.callback.args[0][0].format(data.testFormat)).to.equal(data.copyM.format(data.testFormat))
    })
    it('should not select excludeDates', () => {
      var data = getOnInputKeyDownStuff({ excludeDates: [moment().subtract(1, 'days')] })
      TestUtils.Simulate.keyDown(data.nodeInput, {key: 'ArrowLeft', keyCode: 37, which: 37})
      TestUtils.Simulate.keyDown(data.nodeInput, {key: 'Enter', keyCode: 13, which: 13})
      expect(data.callback.calledOnce).to.be.false
    })
    it('should not select dates excluded from filterDate', () => {
      var data = getOnInputKeyDownStuff({ filterDate: date => date.day() !== moment().subtract(1, 'days').day() })
      TestUtils.Simulate.keyDown(data.nodeInput, {key: 'ArrowLeft', keyCode: 37, which: 37})
      TestUtils.Simulate.keyDown(data.nodeInput, {key: 'Enter', keyCode: 13, which: 13})
      expect(data.callback.calledOnce).to.be.false
    })
  })
  it('should reset the keyboard selection when closed', () => {
    var data = getOnInputKeyDownStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, {key: 'ArrowLeft', keyCode: 37, which: 37})
    data.datePicker.setOpen(false)
    expect(data.datePicker.state.preSelection.format(data.testFormat)).to.equal(data.copyM.format(data.testFormat))
  })
  it('should retain the keyboard selection when already open', () => {
    var data = getOnInputKeyDownStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, {key: 'ArrowLeft', keyCode: 37, which: 37})
    data.datePicker.setOpen(true)
    data.copyM.subtract(1, 'days')
    expect(data.datePicker.state.preSelection.format(data.testFormat)).to.equal(data.copyM.format(data.testFormat))
  })
  it('should open the calendar when an arrow key is pressed', () => {
    var data = getOnInputKeyDownStuff()
    data.datePicker.setOpen(false)
    expect(data.datePicker.state.open).to.be.false
    TestUtils.Simulate.keyDown(data.nodeInput, {key: 'ArrowLeft', keyCode: 37, which: 37})
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
  xit('should clear preventFocus timeout id when component is unmounted', () => {
    var div = document.createElement('div')
    document.body.appendChild(div)
    var datePicker = ReactDOM.render(<DatePicker inline />, div)
    datePicker.clearPreventFocusTimeout = sinon.spy()
    ReactDOM.unmountComponentAtNode(div)
    assert(datePicker.clearPreventFocusTimeout.calledOnce, 'should call clearPreventFocusTimeout')
  })

  function getOnInputKeyDownDisabledKeyboardNavigationStuff () {
    var m = moment()
    var copyM = moment(m)
    var testFormat = 'YYYY-MM-DD'
    var callback = sandbox.spy()
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker selected={m} onChange={callback} disabledKeyboardNavigation/>
    )
    var dateInput = datePicker.refs.input
    var nodeInput = ReactDOM.findDOMNode(dateInput)
    TestUtils.Simulate.focus(nodeInput)
    return {
      m, copyM, testFormat, callback, datePicker, dateInput, nodeInput
    }
  }
  it('should not handle onInputKeyDown ArrowLeft', () => {
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, {key: 'ArrowLeft', keyCode: 37, which: 37})
    expect(data.callback.called).to.be.false
  })
  it('should not handle onInputKeyDown ArrowRight', () => {
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, {key: 'ArrowRight', keyCode: 39, which: 39})
    expect(data.callback.called).to.be.false
  })
  it('should not handle onInputKeyDown ArrowUp', () => {
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, {key: 'ArrowUp', keyCode: 38, which: 38})
    expect(data.callback.called).to.be.false
  })
  it('should not handle onInputKeyDown ArrowDown', () => {
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, {key: 'ArrowDown', keyCode: 40, which: 40})
    expect(data.callback.called).to.be.false
  })
  it('should not handle onInputKeyDown PageUp', () => {
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, {key: 'PageUp', keyCode: 33, which: 33})
    expect(data.callback.called).to.be.false
  })
  it('should not handle onInputKeyDown PageDown', () => {
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, {key: 'PageDown', keyCode: 34, which: 34})
    expect(data.callback.called).to.be.false
  })
  it('should not handle onInputKeyDown Home', () => {
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, {key: 'Home', keyCode: 36, which: 36})
    expect(data.callback.called).to.be.false
  })
  it('should not handle onInputKeyDown End', () => {
    var data = getOnInputKeyDownDisabledKeyboardNavigationStuff()
    TestUtils.Simulate.keyDown(data.nodeInput, {key: 'End', keyCode: 35, which: 35})
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
          selected={moment('2016-11-22')}
          onChange={handleChange} />
    )
    var input = ReactDOM.findDOMNode(datePicker.refs.input)
    input.value = ''
    TestUtils.Simulate.change(input)
    expect(cleared).to.be.true
  })
  it('should correctly update the date input when utcOffset is all that changes on the selected date', () => {
    var date = moment('2016-11-22T00:00:00Z').utcOffset(-6)
    var tmzDatePicker = mount(<TimezoneDatePicker />)
    tmzDatePicker.setState({startDate: date, utcOffset: -6})

    expect(tmzDatePicker.find('input').prop('value')).to.equal('2016-11-21 18:00')

    tmzDatePicker.setState({utcOffset: 6, startDate: date.clone().utcOffset(6)})

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
    expect(datePicker.prop('selected').format('YYYY-MM-DD')).to.equal('1982-12-30')
  })
  it('should invoke provided onChangeRaw function on manual input change', () => {
    const inputValue = 'test'
    const onChangeRawSpy = sandbox.spy()
    const datePicker = TestUtils.renderIntoDocument(
        <DatePicker selected={moment()} onChange={sandbox.spy()} onChangeRaw={onChangeRawSpy}/>
    )
    expect(onChangeRawSpy.called).to.be.false
    const input = ReactDOM.findDOMNode(datePicker.refs.input)
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
        <DatePicker selected={moment()} withPortal/>
    ).instance()
    const openSpy = sandbox.spy(datePicker, 'setOpen')
    datePicker.handleCalendarClickOutside(sandbox.stub({preventDefault: () => {}}))
    expect(openSpy.calledOnce).to.be.true
    expect(openSpy.calledWithExactly(false)).to.be.true
  })
  it('should default to the currently selected date', () => {
    const datePicker = mount(
      <DatePicker selected={moment('1988-12-30')} />
    )
    expect(datePicker.state('preSelection').format('YYYY-MM-DD')).to.equal('1988-12-30')
  })
  it('should default to the start date when selecting an end date', () => {
    const datePicker = mount(
      <DatePicker startDate={moment('1988-11-30')} selectsEnd />
    )
    expect(datePicker.state('preSelection').format('YYYY-MM-DD')).to.equal('1988-11-30')
  })
  it('should default to the end date when selecting a start date', () => {
    const datePicker = mount(
      <DatePicker endDate={moment('1988-12-31')} selectsStart />
    )
    expect(datePicker.state('preSelection').format('YYYY-MM-DD')).to.equal('1988-12-31')
  })
  it('should default to a date <= maxDate', () => {
    const datePicker = mount(
      <DatePicker maxDate={moment('1982-01-01')} />
    )
    expect(datePicker.state('preSelection').format('YYYY-MM-DD')).to.equal('1982-01-01')
  })
  it('should default to a date >= minDate', () => {
    const datePicker = mount(
      <DatePicker minDate={moment('2063-04-05')} />
    )
    expect(datePicker.state('preSelection').format('YYYY-MM-DD')).to.equal('2063-04-05')
  })
  it('should default to the openToDate if there is one', () => {
    const datePicker = mount(
      <DatePicker openToDate={moment('2020-01-23')} />
    )
    expect(datePicker.state('preSelection').format('YYYY-MM-DD')).to.equal('2020-01-23')
  })
  it('should otherwise default to the current date', () => {
    const datePicker = mount(
      <DatePicker/>
    )
    expect(datePicker.state('preSelection').format('YYYY-MM-DD')).to.equal(moment().format('YYYY-MM-DD'))
  })
})
