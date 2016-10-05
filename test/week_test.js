import React from 'react'
import moment from 'moment'
import Week from '../src/week'
import WeekNumber from '../src/week_number'
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

    const weekNumber = week.find(WeekNumber)
    expect(weekNumber.length).to.equal(0)
  })

  it('should render the week number', () => {
    const weekStart = moment('2015-12-20').startOf('week')
    const week = shallow(<Week showWeekNumber day={weekStart} />)

    const days = week.find(Day)
    expect(days.length).to.equal(7)
    days.forEach((day, offset) => {
      const expectedDay = weekStart.clone().add(offset, 'days')
      assert(day.prop('day').isSame(expectedDay, 'day'))
    })

    const weekNumber = week.find(WeekNumber)
    expect(weekNumber.length).to.equal(1)
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

  it('should call the provided onDayMouseEnter function', () => {
    let dayMouseEntered = null

    function onDayMouseEnter (day) {
      dayMouseEntered = day
    }

    const weekStart = moment()
    const week = shallow(<Week day={weekStart} onDayMouseEnter={onDayMouseEnter} />)
    const day = week.find(Day).first()
    day.simulate('mouseenter')
    assert(day.prop('day').isSame(dayMouseEntered, 'day'))
  })
})
