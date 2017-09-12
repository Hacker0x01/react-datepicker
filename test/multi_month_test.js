import React from 'react'
import Calendar from '../src/calendar'
import Month from '../src/month'
import YearDropdown from '../src/year_dropdown'
import { shallow } from 'enzyme'
import moment from 'moment'

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
    var calendar = getCalendar({monthsShown: 2})
    var months = calendar.find(Month)
    expect(months).to.have.length(2)
  })

  it('should render dropdown only on first month', () => {
    var calendar = getCalendar({monthsShown: 2, showYearDropdown: true})
    var datepickers = calendar.find(YearDropdown)
    expect(datepickers).to.have.length(1)
  })

  it('should render previous months', () => {
    var calendar = getCalendar({monthsShown: 2, showPreviousMonths: true})
    var monthDate = calendar.find(Month).first().prop('day')
    var previousMonth = moment().subtract(1, 'M')
    expect(previousMonth.isSame(monthDate, 'D')).to.be.true
  })
})

