import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import moment from 'moment'
import Week from '../src/week'
import Day from '../src/day'

describe('Week', () => {
  it('should have the week CSS class', () => {
    const week = TestUtils.renderIntoDocument(<Week day={moment()} />)
    expect(ReactDOM.findDOMNode(week).className).to.equal('react-datepicker__week')
  })

  it('should render the days of the week', () => {
    const weekStart = moment('2015-12-20').startOf('week')
    const week = TestUtils.renderIntoDocument(<Week day={weekStart} />)

    const days = TestUtils.scryRenderedComponentsWithType(week, Day)
    expect(days.length).to.equal(7)
    days.forEach((day, offset) => {
      const expectedDay = weekStart.clone().add(offset, 'days')
      assert(day.props.day.isSame(expectedDay, 'day'))
    })
  })

  it('should call the provided onDayClick function', () => {
    let dayClicked = null

    function onDayClick (day) {
      dayClicked = day
    }

    const weekStart = moment('2015-12-20')
    const week = TestUtils.renderIntoDocument(
      <Week day={weekStart} onDayClick={onDayClick} />
    )
    const day = TestUtils.scryRenderedComponentsWithType(week, Day)[0]
    TestUtils.Simulate.click(ReactDOM.findDOMNode(day))
    assert(day.props.day.isSame(dayClicked, 'day'))
  })
})
