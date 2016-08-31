import React from 'react'
import moment from 'moment'
import Week from '../src/week'
import Day from '../src/day'
import { shallow } from 'enzyme'

describe('Week', () => {
  it('should have the week CSS class', () => {
    const week = shallow(<Week day={moment()} />)
    expect(week.hasClass('react-datepicker__week')).to.equal(true)
  })

  it('should render the days of the week', () => {
    const weekStart = moment('2015-12-20').startOf('week')
    const week = shallow(<Week day={weekStart} />)

    const days = week.find(Day)
    expect(days.length).to.equal(7)
    days.forEach((day, offset) => {
      const expectedDay = weekStart.clone().add(offset, 'days')
      assert(day.prop('day').isSame(expectedDay, 'day'))
    })
  })

  it('should call the provided onDayClick function', () => {
    let dayClicked = null

    function onDayClick (day) {
      dayClicked = day
    }

    const weekStart = moment('2015-12-20')
    const week = shallow(
      <Week day={weekStart} onDayClick={onDayClick} />
    )
    const day = week.find(Day).at(0)
    day.simulate('click')
    assert(day.prop('day').isSame(dayClicked, 'day'))
  })
})
