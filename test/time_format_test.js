import React from 'react'
import { mount } from 'enzyme'
import TimeComponent from '../src/time'

describe('TimeComponent', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should forward the time format provided in timeFormat props', () => {
    var timeComponent = mount(
      <TimeComponent format="HH:mm" />
    )

    var timeListItem = timeComponent.find('.react-datepicker__time-list-item')
    expect(timeListItem.at(0).text()).to.eq('00:00')
  })
})
