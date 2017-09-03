import React from 'react'
import moment from 'moment'
import { mount } from 'enzyme'
import DatePicker from '../src/datepicker.jsx'

describe('DatePicker', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should disable times specified in excludeTimes props', () => {
    var datePicker = mount(
      <DatePicker
          showTimeSelect
          excludeTimes={[moment().hours(17).minutes(0), moment().hours(18).minutes(30), moment().hours(19).minutes(30), moment().hours(17).minutes(30)]} />
    )
    expect(datePicker.find('.react-datepicker__time-list-item--disabled')).to.exist
  })
})
