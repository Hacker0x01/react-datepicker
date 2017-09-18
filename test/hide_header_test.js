import React from 'react'
import { mount } from 'enzyme'
import Calendar from '../src/calendar.jsx'

describe.only('Calendar', () => {
  function getCalendar (extraProps) {
    return mount(
      <Calendar
          dateFormat="MMMM YYYY"
          {...extraProps}/>
    )
  }

  it('should show header by default', () => {
    var calendar = getCalendar({})
    expect(calendar.find('.react-datepicker__current-month').length).to.equal(1)
    expect(calendar.find('.react-datepicker__navigation').length).to.equal(2)
  })

  it('should show header specified in hideHeader props', () => {
    var calendar = getCalendar({
      hideHeader: false
    })
    expect(calendar.find('.react-datepicker__current-month').length).to.equal(1)
    expect(calendar.find('.react-datepicker__navigation').length).to.equal(2)
  })

  it('should hide header specified in hideHeader props', () => {
    var calendar = getCalendar({
      hideHeader: true
    })
    expect(calendar.find('.react-datepicker__current-month').length).to.equal(0)
    expect(calendar.find('.react-datepicker__navigation').length).to.equal(0)
  })
})
