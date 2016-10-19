import React from 'react'
import Calendar from '../src/calendar'
import { shallow } from 'enzyme'

describe('Multi month calendar', function () {
  var dateFormat = 'MMMM YYYY'

  function getCalendar (extraProps) {
    return shallow(
            <Calendar
                dateFormat={dateFormat}
                onSelect={() => {}}
                onClickOutside={() => {}}
                hideCalendar={() => {}}
                dropdownMode="scroll"
                {...extraProps}/>
      )
  }

  it('should render multiple months if the months property is present', () => {
    var calendar = getCalendar({months: 2})
    var months = calendar.find('.react-datepicker__month-container')
    expect(months).to.have.length(2)
  })
})

