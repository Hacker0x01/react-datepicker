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

  it('should render all days of the month', () => {
    const monthStart = moment('2015-12-01')
    const month = mount(<Month day={monthStart} />)

    const days = month.find(Day)
    range(0, monthStart.daysInMonth()).forEach(offset => {
      const expectedDay = monthStart.clone().add(offset, 'days')
      const foundDay = days.filterWhere(day =>
        day.prop('day').isSame(expectedDay, 'day')
      )
      expect(foundDay).to.have.length(1)
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
})
