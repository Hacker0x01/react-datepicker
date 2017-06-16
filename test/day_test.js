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

  describe('keyboard-selected', () => {
    const className = 'react-datepicker__day--keyboard-selected'

    it('should apply the keyboard-selected class when pre-selected and another day is selected', () => {
      const day = moment()
      const selected = day.clone().add(1, 'day')
      const shallowDay = renderDay(day, { selected, preSelection: day })
      expect(shallowDay.hasClass(className)).to.equal(true)
    })

    it('should not apply the keyboard-selected class when selected', () => {
      const day = moment()
      const shallowDay = renderDay(day, { selected: day, preSelection: day })
      expect(shallowDay.hasClass(className)).to.equal(false)
    })

    it('should not apply the keyboard-selected class when another day is pre-selected', () => {
      const day = moment()
      const selected = day.clone().add(1, 'day')
      const preSelection = day.clone().add(2, 'day')
      const shallowDay = renderDay(day, { selected, preSelection })
      expect(shallowDay.hasClass(className)).to.equal(false)
    })

    it('should not apply the keyboard-selected class if in inline mode', () => {
      const day = moment()
      const selected = day.clone().add(1, 'day')
      const shallowDay = renderDay(day, { selected, preSelection: day, inline: true })
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

    describe('highlighted prop is an array of objects with class name as a key and array of moments as a value', () => {
      it('should apply the highlighted class if in highlighted', () => {
        const day = moment()
        const highlightDay1 = {'testClassName': [day.clone().add(1, 'day'), day.clone()]}
        const highlightDay2 = day.clone().add(2, 'day')
        const highlightDay3 = day.clone().add(3, 'day')
        const highlightDates = [highlightDay1, highlightDay2, highlightDay3]
        const shallowDay = renderDay(day, { highlightDates })
        expect(shallowDay.hasClass('testClassName')).to.equal(true)
      })

      it('should not apply the highlighted class if not in highlighted array', () => {
        const day = moment()
        const highlightDay1 = {'testClassName': [day.clone().add(1, 'day'), day.clone().add(2, 'day')]}
        const highlightDay2 = day.clone().add(3, 'day')
        const highlightDay3 = day.clone().add(4, 'day')
        const highlightDates = [highlightDay1, highlightDay2, highlightDay3]
        const shallowDay = renderDay(day, { highlightDates })
        expect(shallowDay.hasClass('testClassName')).to.equal(false)
      })
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

  describe('in selecting range', () => {
    const rangeDayClassName = 'react-datepicker__day--in-selecting-range'
    const rangeDayStartClassName = 'react-datepicker__day--selecting-range-start'
    const rangeDayEndClassName = 'react-datepicker__day--selecting-range-end'

    function createDateRange (beforeDays, afterDays, day = moment()) {
      return {
        startDate: day.clone().subtract(beforeDays, 'days'),
        endDate: day.clone().add(afterDays, 'days'),
        day
      }
    }

    describe('for a start date picker', () => {
      it('should highlight for dates before the end date', () => {
        const { startDate, endDate } = createDateRange(-1, 1)

        // All these should highlight: today, yesterday (startDate), the day before
        for (let daysFromEnd = 1; daysFromEnd <= 3; daysFromEnd++) {
          const selectingDate = endDate.clone().subtract(daysFromEnd, 'days')
          const shallowDay = renderDay(selectingDate, { startDate, endDate, selectingDate, selectsStart: true })
          expect(shallowDay.hasClass(rangeDayClassName)).to.be.true
        }
      })

      it('should have a class if it is a start or end date', () => {
        const endDate = moment()
        const midRangeDate = endDate.clone().subtract(1, 'days')
        const selectingDate = endDate.clone().subtract(2, 'days')

        const shallowStartDay = renderDay(selectingDate, { endDate, selectingDate, selectsStart: true })
        expect(shallowStartDay.hasClass(rangeDayStartClassName)).to.be.true

        const shallowMidRangeDay = renderDay(midRangeDate, { endDate, selectingDate, selectsStart: true })
        expect(shallowMidRangeDay.hasClass(rangeDayStartClassName)).to.be.false
        expect(shallowMidRangeDay.hasClass(rangeDayEndClassName)).to.be.false

        const shallowEndDay = renderDay(endDate, { endDate, selectingDate, selectsStart: true })
        expect(shallowEndDay.hasClass(rangeDayEndClassName)).to.be.true
      })

      it('should not highlight for days after the end date', () => {
        const { day, startDate, endDate } = createDateRange(-1, 1)
        const selectingDate = endDate.clone().add(1, 'days')
        const shallowDay = renderDay(day, { startDate, endDate, selectingDate, selectsStart: true })
        expect(shallowDay.hasClass(rangeDayClassName)).to.be.false
      })

      it('should not highlight if there is no end date selected', () => {
        const startDate = moment()
        const selectingDate = startDate.clone().subtract(1, 'days')
        const shallowDay = renderDay(selectingDate, { startDate, selectingDate, selectsStart: true })
        expect(shallowDay.hasClass(rangeDayClassName)).to.be.false
      })

      it('should not highlight for disabled dates', () => {
        const endDate = moment()
        const selectingDate = endDate.clone().subtract(1, 'days')
        const shallowDay = renderDay(selectingDate, { selectingDate, endDate, selectsStart: true, excludeDates: [selectingDate] })
        expect(shallowDay.hasClass(rangeDayClassName)).to.be.false
      })
    })

    describe('for an end date picker', () => {
      it('should highlight for dates after the start date', () => {
        const { startDate, endDate } = createDateRange(-1, 1)

        // All these should highlight: today, tomorrow (endDate), the day after
        for (let daysFromStart = 1; daysFromStart <= 3; daysFromStart++) {
          const day = startDate.clone().add(daysFromStart, 'days')
          const shallowDay = renderDay(day, { startDate, endDate, selectingDate: day, selectsEnd: true })
          expect(shallowDay.hasClass(rangeDayClassName)).to.be.true
        }
      })

      it('should have a class if it is a start or end date', () => {
        const startDate = moment()
        const midRangeDate = startDate.clone().add(1, 'days')
        const selectingDate = startDate.clone().add(2, 'days')

        const shallowStartDay = renderDay(startDate, { startDate, selectingDate, selectsEnd: true })
        expect(shallowStartDay.hasClass(rangeDayStartClassName)).to.be.true

        const shallowMidRangeDay = renderDay(midRangeDate, { startDate, selectingDate, selectsEnd: true })
        expect(shallowMidRangeDay.hasClass(rangeDayStartClassName)).to.be.false
        expect(shallowMidRangeDay.hasClass(rangeDayEndClassName)).to.be.false

        const shallowEndDay = renderDay(selectingDate, { startDate, selectingDate, selectsEnd: true })
        expect(shallowEndDay.hasClass(rangeDayEndClassName)).to.be.true
      })

      it('should not highlight for days before the start date', () => {
        const startDate = moment()
        const selectingDate = startDate.clone().subtract(1, 'days')
        const shallowDay = renderDay(selectingDate, { startDate, selectingDate, selectsEnd: true })
        expect(shallowDay.hasClass(rangeDayClassName)).to.be.false
      })

      it('should not highlight if there is no start date selected', () => {
        const { day, endDate } = createDateRange(-1, 1)
        const selectingDate = endDate.clone().add(1, 'day')
        const shallowDay = renderDay(day, { endDate, selectingDate, selectsEnd: true })
        expect(shallowDay.hasClass(rangeDayClassName)).to.be.false
      })

      it('should not highlight for disabled dates', () => {
        const startDate = moment()
        const selectingDate = startDate.clone().add(1, 'days')
        const shallowDay = renderDay(selectingDate, { startDate, selectingDate, selectsEnd: true, excludeDates: [selectingDate] })
        expect(shallowDay.hasClass(rangeDayClassName)).to.be.false
      })
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

  describe('mouse enter', () => {
    var onMouseEnterCalled

    function onMouseEnter () {
      onMouseEnterCalled = true
    }

    beforeEach(() => {
      onMouseEnterCalled = false
    })

    it('should call onMouseEnter if day is hovered', () => {
      const shallowDay = renderDay(moment(), { onMouseEnter })
      shallowDay.find('.react-datepicker__day').simulate('mouseenter')
      expect(onMouseEnterCalled).to.be.true
    })
  })
})
