import React from 'react'
import moment from 'moment'
import Day from '../src/day'
import { shallow } from 'enzyme'

function renderDay (day, props = {}) {
  return shallow(
    <Day day={day} {...props} />
  )
}

describe('Day', () => {
  describe('rendering', () => {
    it('should render the specified day', () => {
      const shallowDay = renderDay(moment())
      expect(shallowDay.hasClass('react-datepicker__day')).to.equal(true)
      expect(shallowDay.text()).to.equal(moment().date() + '')
    })
  })

  describe('selected', () => {
    const className = 'react-datepicker__day--selected'

    it('should apply the selected class if selected', () => {
      const day = moment()
      const shallowDay = renderDay(day, { selected: day })
      expect(shallowDay.hasClass(className)).to.equal(true)
    })

    it('should not apply the selected class if not selected', () => {
      const day = moment()
      const selected = day.clone().add(1, 'day')
      const shallowDay = renderDay(day, { selected })
      expect(shallowDay.hasClass(className)).to.equal(false)
    })
  })

  describe('highlighted', () => {
    const className = 'react-datepicker__day--highlighted'

    it('should apply the highlighted class if in highlighted array', () => {
      const day = moment()
      const highlightDay1 = day.clone()
      const highlightDay2 = day.clone().add(1, 'day')
      const highlightDates = [highlightDay1, highlightDay2]
      const shallowDay = renderDay(day, { highlightDates })
      expect(shallowDay.hasClass(className)).to.equal(true)
    })

    it('should not apply the highlighted class if not in highlighted array', () => {
      const day = moment()
      const highlightDay1 = day.clone().subtract(1, 'day')
      const highlightDay2 = day.clone().add(1, 'day')
      const highlightDates = [highlightDay1, highlightDay2]
      const shallowDay = renderDay(day, { highlightDates })
      expect(shallowDay.hasClass(className)).to.equal(false)
    })
  })

  describe('in range', () => {
    const className = 'react-datepicker__day--in-range'

    it('should apply the in-range class if in range', () => {
      const day = moment()
      const startDate = day.clone().subtract(1, 'day')
      const endDate = day.clone().add(1, 'day')
      const shallowDay = renderDay(day, { startDate, endDate })
      expect(shallowDay.hasClass(className)).to.equal(true)
    })

    it('should not apply the in-range class if not in range', () => {
      const day = moment()
      const startDate = day.clone().add(1, 'day')
      const endDate = day.clone().add(2, 'days')
      const shallowDay = renderDay(day, { startDate, endDate })
      expect(shallowDay.hasClass(className)).to.equal(false)
    })

    it('should apply the in-range class if equal to start date', () => {
      const day = moment()
      const startDate = day.clone()
      const endDate = day.clone().add(1, 'day')
      const shallowDay = renderDay(day, { startDate, endDate })
      expect(shallowDay.hasClass(className)).to.equal(true)
    })

    it('should apply the in-range class if equal to end date', () => {
      const day = moment()
      const startDate = day.clone().subtract(1, 'day')
      const endDate = day.clone()
      const shallowDay = renderDay(day, { startDate, endDate })
      expect(shallowDay.hasClass(className)).to.equal(true)
    })

    it('should not apply the in-range class if start date missing', () => {
      const day = moment()
      const startDate = day.clone().subtract(1, 'day')
      const shallowDay = renderDay(day, { startDate })
      expect(shallowDay.hasClass(className)).to.equal(false)
    })

    it('should not apply the in-range class if end date missing', () => {
      const day = moment()
      const endDate = day.clone().add(1, 'day')
      const shallowDay = renderDay(day, { endDate })
      expect(shallowDay.hasClass(className)).to.equal(false)
    })
  })

  describe('today', () => {
    const className = 'react-datepicker__day--today'

    it('should apply the today class if today', () => {
      const shallowDay = renderDay(moment())
      expect(shallowDay.hasClass(className)).to.equal(true)
    })

    it('should not apply the today class if not today', () => {
      const shallowDay = renderDay(moment().add(1, 'day'))
      expect(shallowDay.hasClass(className)).to.equal(false)
    })

    it('should apply the today class if custom utcOffset is provided', () => {
      const shallowDay = renderDay(moment.utc().utcOffset(720))
      expect(shallowDay.hasClass(className)).to.equal(true)
    })
  })

  describe('weekend', () => {
    const className = 'react-datepicker__day--weekend'

    it('should apply the weekend class if Saturday', () => {
      const shallowDay = renderDay(moment('2015-12-19'))
      expect(shallowDay.hasClass(className)).to.equal(true)
    })

    it('should apply the weekend class if Sunday', () => {
      const shallowDay = renderDay(moment('2015-12-20'))
      expect(shallowDay.hasClass(className)).to.equal(true)
    })

    it('should not apply the today class if not the weekend', () => {
      const shallowDay = renderDay(moment('2015-12-21'))
      expect(shallowDay.hasClass(className)).to.equal(false)
    })
  })

  describe('outside month', () => {
    const className = 'react-datepicker__day--outside-month'

    it('should not apply the outside-month class if in same month', () => {
      const day = moment()
      const shallowDay = renderDay(day, { month: day.month() })
      expect(shallowDay.hasClass(className)).to.equal(false)
    })

    it('should apply the outside-month class if not in same month', () => {
      const day = moment()
      const shallowDay = renderDay(day, { month: day.month() + 1 })
      expect(shallowDay.hasClass(className)).to.equal(true)
    })
  })

  describe('disabled', () => {
    const className = 'react-datepicker__day--disabled'

    it('should be enabled if date is enabled', () => {
      const shallowDay = renderDay(moment())
      expect(shallowDay.hasClass(className)).to.equal(false)
    })

    it('should be disabled if date is disabled', () => {
      const day = moment()
      const shallowDay = renderDay(day, { excludeDates: [day] })
      expect(shallowDay.hasClass(className)).to.equal(true)
    })
  })

  describe('click', () => {
    var onClickCalled

    function onClick () {
      onClickCalled = true
    }

    beforeEach(() => {
      onClickCalled = false
    })

    it('should call onClick if day is enabled', () => {
      const day = moment()
      const dayNode = shallow(
        <Day day={day} onClick={onClick} />
      )
      dayNode.find('.react-datepicker__day').simulate('click')
      expect(onClickCalled).to.be.true
    })

    it('should not call onClick if day is disabled', () => {
      const day = moment()
      const dayNode = shallow(
        <Day day={day} excludeDates={[day]} onClick={onClick} />
      )
      dayNode.find('.react-datepicker__day').simulate('click')
      expect(onClickCalled).to.be.false
    })
  })
})
