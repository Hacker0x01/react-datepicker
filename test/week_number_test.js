import React from 'react'
import WeekNumber from '../src/week_number'
import { shallow } from 'enzyme'

function renderWeekNumber (weekNumber, props = {}) {
  return shallow(
    <WeekNumber weekNumber={weekNumber} {...props} />
)
}

describe('WeekNumber', () => {
  describe('rendering', () => {
    it('should render the specified Week Number', () => {
      const weekNumber = 1
      const shallowWeekNumber = renderWeekNumber(weekNumber)
      expect(shallowWeekNumber.hasClass('react-datepicker__week-number')).to.equal(true)
      expect(shallowWeekNumber.text()).to.equal(weekNumber + '')
    })
  })
})
