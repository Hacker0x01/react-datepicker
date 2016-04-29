import React from 'react'
import moment from 'moment'
import Month from '../src/month'
import Day from '../src/day'
import range from 'lodash/range'
import { mount, shallow } from 'enzyme'

describe('Month', () => {
  it('should have the month CSS class', () => {
    const month = shallow(<Month day={moment()} />)
    expect(month.hasClass('react-datepicker__month')).to.equal(true)
  })

  it('should render all days of the month and some days in neighboring months', () => {
    const monthStart = moment('2015-12-01')
    const firstWeekStart = monthStart.clone().startOf('week')
    const lastWeekEnd = monthStart.clone().endOf('month').endOf('week')
    const dayCount = lastWeekEnd.diff(firstWeekStart, 'days') + 1

    const month = mount(<Month day={monthStart}/>)
    const days = month.find(Day)
    expect(days).to.have.length(dayCount)
    range(0, dayCount).forEach(offset => {
      const day = days.get(offset)
      const expectedDay = firstWeekStart.clone().add(offset, 'days')
      expect(day.props.day.isSame(expectedDay, 'day')).to.be.true
    })
  })

  it('should render all days of the month and peek into the next month', () => {
    const monthStart = moment('2015-12-01')
    const firstWeekStart = monthStart.clone().startOf('week')
    const lastWeekEnd = monthStart.clone().add(1, 'month').add(1, 'week').endOf('week')
    const dayCount = lastWeekEnd.diff(firstWeekStart, 'days') + 1

    const month = mount(<Month day={monthStart} peekNextMonth/>)
    const days = month.find(Day)
    expect(days).to.have.length(dayCount)
    range(0, dayCount).forEach(offset => {
      const day = days.get(offset)
      const expectedDay = firstWeekStart.clone().add(offset, 'days')
      expect(day.props.day.isSame(expectedDay, 'day')).to.be.true
    })
  })

  it('should call the provided onDayClick function', () => {
    let dayClicked = null

    function onDayClick (day) {
      dayClicked = day
    }

    const monthStart = moment('2015-12-01')
    const month = mount(
      <Month day={monthStart} onDayClick={onDayClick} />
    )
    const day = month.find(Day).at(0)

    day.simulate('click')
    assert(day.prop('day').isSame(dayClicked, 'day'))
  })

  it('should call the provided onMouseLeave function', () => {
    let mouseLeaveCalled = false

    function onMouseLeave () {
      mouseLeaveCalled = true
    }

    const month = shallow(<Month day={moment()} onMouseLeave={onMouseLeave} />)
    month.simulate('mouseleave')
    expect(mouseLeaveCalled).to.be.true
  })

  it('should call the provided onDayMouseEnter function', () => {
    let dayMouseEntered = null

    function onDayMouseEnter (day) {
      dayMouseEntered = day
    }

    const month = mount(<Month day={moment()} onDayMouseEnter={onDayMouseEnter} />)
    const day = month.find(Day).first()
    day.simulate('mouseenter')
    assert(day.prop('day').isSame(dayMouseEntered, 'day'))
  })
})
