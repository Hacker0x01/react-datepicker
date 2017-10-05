import React from 'react'
import Enzyme, { mount } from 'enzyme'
import DatePicker from '../src/datepicker.jsx'
import Adapter from 'enzyme-adapter-react-16'
import { setTime, cloneDate, newDate } from '../src/date_utils'

Enzyme.configure({ adapter: new Adapter() })

function cloneDateWithTime (date, time) {
  return setTime(cloneDate(date), time)
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
    var now = newDate()
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
