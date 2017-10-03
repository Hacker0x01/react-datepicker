import React from 'react'
import Month from '../src/month'
import Day from '../src/day'
import range from 'lodash/range'
import { mount, shallow } from 'enzyme'
import * as utils from '../src/date_utils'

describe('Month', () => {
  function assertDateRangeInclusive (month, start, end) {
    const dayCount = utils.getDaysDiff(end, start) + 1
    const days = month.find(Day)
    expect(days).to.have.length(dayCount)
    range(0, dayCount).forEach(offset => {
      const day = days.get(offset)
      const expectedDay = utils.addDays(utils.cloneDate(start), offset)
      assert(
        utils.isSameDay(day.props.day, expectedDay),
        `Day ${(offset % 7) + 1} ` +
        `of week ${(Math.floor(offset / 7) + 1)} ` +
        `should be "${utils.formatDate(expectedDay, 'YYYY-MM-DD')}" ` +
        `but it is "${utils.formatDate(day.props.day, 'YYYY-MM-DD')}"`
      )
    })
  }

  it('should have the month CSS class', () => {
    const month = shallow(<Month day={utils.newDate()} />)
    expect(month.hasClass('react-datepicker__month')).to.equal(true)
  })

  it('should render all days of the month and some days in neighboring months', () => {
    const monthStart = utils.newDate('2015-12-01')

    assertDateRangeInclusive(
      mount(<Month day={monthStart}/>),
      utils.getStartOfWeek(utils.cloneDate(monthStart)),
      utils.getEndOfWeek(utils.getEndOfMonth(utils.cloneDate(monthStart)))
    )
  })

  it('should render all days of the month and peek into the next month', () => {
    const monthStart = utils.newDate('2015-12-01')

    assertDateRangeInclusive(
      mount(<Month day={monthStart} peekNextMonth/>),
      utils.getStartOfWeek(utils.cloneDate(monthStart)),
      utils.getEndOfWeek(utils.addWeeks(utils.addMonths(utils.cloneDate(monthStart), 1), 1))
    )
  })

  it('should render a calendar of fixed height', () => {
    const monthStart = utils.newDate('2016-11-01')
    const calendarStart = utils.getStartOfWeek(utils.cloneDate(monthStart))

    assertDateRangeInclusive(
      mount(<Month day={monthStart} fixedHeight/>),
      calendarStart,
      utils.getEndOfWeek(utils.addWeeks(utils.cloneDate(calendarStart), 5))
    )
  })

  it('should render a calendar of fixed height with peeking', () => {
    const monthStart = utils.newDate('2016-11-01')
    const calendarStart = utils.getStartOfWeek(utils.cloneDate(monthStart))

    assertDateRangeInclusive(
      mount(<Month day={monthStart} fixedHeight peekNextMonth/>),
      calendarStart,
      utils.getEndOfWeek(utils.addWeeks(utils.cloneDate(calendarStart), 6))
    )
  })

  it('should call the provided onDayClick function', () => {
    let dayClicked = null

    function onDayClick (day) {
      dayClicked = day
    }

    const monthStart = utils.newDate('2015-12-01')
    const month = mount(
      <Month day={monthStart} onDayClick={onDayClick} />
    )
    const day = month.find(Day).at(0)

    day.simulate('click')
    assert(utils.isSameDay(day.prop('day'), dayClicked))
  })

  it('should call the provided onMouseLeave function', () => {
    let mouseLeaveCalled = false

    function onMouseLeave () {
      mouseLeaveCalled = true
    }

    const month = shallow(<Month day={utils.newDate()} onMouseLeave={onMouseLeave} />)
    month.simulate('mouseleave')
    expect(mouseLeaveCalled).to.be.true
  })

  it('should call the provided onDayMouseEnter function', () => {
    let dayMouseEntered = null

    function onDayMouseEnter (day) {
      dayMouseEntered = day
    }

    const month = mount(<Month day={utils.newDate()} onDayMouseEnter={onDayMouseEnter} />)
    const day = month.find(Day).first()
    day.simulate('mouseenter')
    assert(utils.isSameDay(day.prop('day'), dayMouseEntered))
  })
})
