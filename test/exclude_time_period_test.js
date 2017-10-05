import React from 'react'
import * as utils from '../src/date_utils'
// import ReactDOM from 'react-dom'
// import TestUtils from 'react-addons-test-utils'
import { mount } from 'enzyme'
import DatePicker from '../src/datepicker.jsx'
// import Time from '../src/time.jsx'

describe('DatePicker', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should only display times between minTime and maxTime', () => {
    var now = utils.newDate()
    var datePicker = mount(
      <DatePicker
          showTimeSelect
          selected={now}
          onChange={() => null}
          minTime={utils.setTime(utils.cloneDate(now), { hours: 17, minutes: 0 })}
          maxTime={utils.setTime(utils.cloneDate(now), { hours: 18, minutes: 0 })} />
    )
    var times = datePicker.find('li.react-datepicker__time-list-item')
    expect(times).to.exist
  })
})
