import React from 'react'
import Enzyme, { mount } from 'enzyme'
import DatePicker from '../src/datepicker.jsx'
import TimeComponent from '../src/time'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('DatePicker', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should show time component when showTimeSelect prop is present', () => {
    var datePicker = mount(
      <DatePicker showTimeSelect />
    )
    var timeComponent = datePicker.find(TimeComponent)
    expect(timeComponent).to.exist
  })
})
