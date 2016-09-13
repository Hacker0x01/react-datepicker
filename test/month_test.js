import React from 'react'
import moment from 'moment'
import Month from '../src/month'
import Day from '../src/day'
import range from 'lodash/range'
import { mount, shallow } from 'enzyme'

describe('Month', () => {
  function assertDateRangeInclusive (month, start, end) {
    const dayCount = end.diff(start, 'days') + 1
    const days = month.find(Day)
    expect(days).to.have.length(dayCount)
    range(0, dayCount).forEach(offset => {
      const day = days.get(offset)
      const expectedDay = start.clone().add(offset, 'days')
      assert(
        day.props.day.isSame(expectedDay, 'day'),
        `Day ${(offset % 7) + 1} ` +
        `of week ${(Math.floor(offset / 7) + 1)} ` +
        `should be "${expectedDay.format('YYYY-MM-DD')}" ` +
        `but it is "${day.props.day.format('YYYY-MM-DD')}"`
      )
    })
  }

  it('should have the month CSS class', () => {
    const month = shallow(<Month day={moment()} />)
    expect(month.hasClass('react-datepicker__month')).to.equal(true)
  })

  it('should render all days of the month and some days in neighboring months', () => {
    const monthStart = moment('2015-12-01')

    assertDateRangeInclusive(
      mount(<Month day={monthStart}/>),
      monthStart.clone().startOf('week'),
      monthStart.clone().endOf('month').endOf('week')
    )
  })

  it('should render all days of the month and peek into the next month', () => {
    const monthStart = moment('2015-12-01')

    assertDateRangeInclusive(
      mount(<Month day={monthStart} peekNextMonth/>),
      monthStart.clone().startOf('week'),
      monthStart.clone().add(1, 'month').add(1, 'week').endOf('week')
    )
  })

  it('should render a calendar of fixed height', () => {
    const monthStart = moment('2016-11-01')
    const calendarStart = monthStart.clone().startOf('week')

    assertDateRangeInclusive(
      mount(<Month day={monthStart} fixedHeight/>),
      calendarStart,
      calendarStart.clone().add(5, 'weeks').endOf('week')
    )
  })

  it('should render a calendar of fixed height with peeking', () => {
    const monthStart = moment('2016-11-01')
    const calendarStart = monthStart.clone().startOf('week')

    assertDateRangeInclusive(
      mount(<Month day={monthStart} fixedHeight peekNextMonth/>),
      calendarStart,
      calendarStart.clone().add(6, 'weeks').endOf('week')
    )
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
