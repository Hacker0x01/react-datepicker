import React from 'react'
import { mount } from 'enzyme'
import DatePicker from '../src/datepicker.jsx'
import * as utils from '../src/date_utils'

function cloneDateWithTime (date, time) {
  return utils.setTime(utils.cloneDate(date), time)
}

describe('DatePicker', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should disable times specified in excludeTimes props', () => {
    var now = utils.newDate()
    var datePicker = mount(
      <DatePicker
          showTimeSelect
          excludeTimes={[
            cloneDateWithTime(now, { hours: 17, minutes: 0 }),
            cloneDateWithTime(now, { hours: 18, minutes: 30 }),
            cloneDateWithTime(now, { hours: 19, minutes: 30 }),
            cloneDateWithTime(now, { hours: 17, minutes: 30 })
          ]} />
    )
    expect(datePicker.find('.react-datepicker__time-list-item--disabled')).to.exist
  })
})
