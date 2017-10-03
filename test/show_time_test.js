import React from 'react'
// import ReactDOM from 'react-dom'
// import TestUtils from 'react-addons-test-utils'
import { mount } from 'enzyme'
import DatePicker from '../src/datepicker.jsx'
import TimeComponent from '../src/time'

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
