import React from 'react'
import WeekNumber from '../src/week_number'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

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
