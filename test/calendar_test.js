import React from 'react'
import moment from 'moment'
import Calendar from '../src/calendar'
import Month from '../src/month'
import Day from '../src/day'
import YearDropdown from '../src/year_dropdown'
import MonthDropdown from '../src/month_dropdown'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

describe('Calendar', function () {
  const dateFormat = 'MMMM YYYY'

  function getCalendar (extraProps) {
    return shallow(
      <Calendar
          dateFormat={dateFormat}
          onSelect={() => {}}
          onClickOutside={() => {}}
          hideCalendar={() => {}}
          dropdownMode="scroll"
          {...extraProps}/>
    )
  }

  it('should start with the current date in view if no date range', function () {
    const now = moment()
    const calendar = getCalendar()
    assert(calendar.state().date.isSame(now, 'day'))
  })

  it('should start with the today date with specified time zone', function () {
    const utcOffset = 12
    const calendar = getCalendar({utcOffset})
    assert(calendar.state().date.isSame(moment.utc().utcOffset(utcOffset), 'day'))
  })

  it('should start with the selected date in view if provided', function () {
    const selected = moment().add(1, 'year')
    const calendar = getCalendar({selected})
    assert(calendar.state().date.isSame(selected, 'day'))
  })

  it('should start with the pre-selected date in view if provided', function () {
    const preSelected = moment().add(2, 'year')
    const selected = moment().add(1, 'year')
    const calendar = getCalendar({ preSelected, selected })
    assert(calendar.state().date.isSame(selected, 'day'))
  })

  it('should start with the current date in view if in date range', function () {
    const now = moment()
    const minDate = now.clone().subtract(1, 'year')
    const maxDate = now.clone().add(1, 'year')
    const calendar = getCalendar({ minDate, maxDate })
    assert(calendar.state().date.isSame(now, 'day'))
  })

  it('should start with the min date in view if after the current date', function () {
    const minDate = moment().add(1, 'year')
    const calendar = getCalendar({ minDate })
    assert(calendar.state().date.isSame(minDate, 'day'))
  })

  it('should start with the min include date in view if after the current date', function () {
    const minDate = moment().add(1, 'year')
    const calendar = getCalendar({ includeDates: [minDate] })
    assert(calendar.state().date.isSame(minDate, 'day'))
  })

  it('should start with the max date in view if before the current date', function () {
    const maxDate = moment().subtract(1, 'year')
    const calendar = getCalendar({ maxDate })
    assert(calendar.state().date.isSame(maxDate, 'day'))
  })

  it('should start with the max include date in view if before the current date', function () {
    const maxDate = moment().subtract(1, 'year')
    const calendar = getCalendar({ includeDates: [maxDate] })
    assert(calendar.state().date.isSame(maxDate, 'day'))
  })

  it('should start with the open to date in view if given and no selected/min/max dates given', function () {
    const openToDate = moment('09/28/1993', 'MM/DD/YYYY')
    const calendar = getCalendar({ openToDate })
    assert(calendar.state().date.isSame(openToDate, 'day'))
  })

  it('should start with the open to date in view if given and after a min date', function () {
    const openToDate = moment('09/28/1993', 'MM/DD/YYYY')
    const minDate = moment('01/01/1993', 'MM/DD/YYYY')
    const calendar = getCalendar({ openToDate, minDate })
    assert(calendar.state().date.isSame(openToDate, 'day'))
  })

  it('should start with the open to date in view if given and before a max date', function () {
    const openToDate = moment('09/28/1993', 'MM/DD/YYYY')
    const maxDate = moment('12/31/1993', 'MM/DD/YYYY')
    const calendar = getCalendar({ openToDate, maxDate })
    assert(calendar.state().date.isSame(openToDate, 'day'))
  })

  it('should start with the open to date in view if given and in range of the min/max dates', function () {
    const openToDate = moment('09/28/1993', 'MM/DD/YYYY')
    const minDate = moment('01/01/1993', 'MM/DD/YYYY')
    const maxDate = moment('12/31/1993', 'MM/DD/YYYY')
    const calendar = getCalendar({ openToDate, minDate, maxDate })
    assert(calendar.state().date.isSame(openToDate, 'day'))
  })

  it('should open on openToDate date rather than selected date when both are specified', function () {
    var openToDate = moment('09/28/1993', 'MM/DD/YYYY')
    var selected = moment('09/28/1995', 'MM/DD/YYYY')
    var calendar = getCalendar({ openToDate, selected })
    assert(calendar.state().date.isSame(openToDate, 'day'))
  })

  it('should trigger date change when openToDate prop is set after calcInitialState()', () => {
    const openToDate = moment('09/28/1993', 'MM/DD/YYYY')
    const oneMonthFromOpenToDate = moment('10/28/1993', 'MM/DD/YYYY')
    const calendar = getCalendar({ openToDate })

    assert(calendar.state().date.isSame(openToDate, 'day'))
    calendar.setProps({ openToDate: oneMonthFromOpenToDate })
    assert(calendar.state().date.isSame(oneMonthFromOpenToDate))
  })

  it('should not show the year dropdown menu by default', function () {
    const calendar = getCalendar()
    const yearReadView = calendar.find(YearDropdown)
    expect(yearReadView).to.have.length(0)
  })

  it('should show the year dropdown menu if toggled on', function () {
    const calendar = getCalendar({ showYearDropdown: true })
    const yearReadView = calendar.find(YearDropdown)
    expect(yearReadView).to.have.length(1)
  })

  it('should show month navigation if toggled on', function () {
    const calendar = getCalendar({ includeDates: [moment()], forceShowMonthNavigation: true })
    const nextNavigationButton = calendar.find('.react-datepicker__navigation--next')
    expect(nextNavigationButton).to.have.length(1)
  })

  it('should not show the month dropdown menu by default', function () {
    const calendar = getCalendar()
    const monthReadView = calendar.find(MonthDropdown)
    expect(monthReadView).to.have.length(0)
  })

  it('should show the month dropdown menu if toggled on', function () {
    const calendar = getCalendar({ showMonthDropdown: true })
    const monthReadView = calendar.find(MonthDropdown)
    expect(monthReadView).to.have.length(1)
  })

  it('should not show the today button by default', function () {
    const calendar = getCalendar()
    const todayButton = calendar.find('.react-datepicker__today-button')
    expect(todayButton).to.have.length(0)
  })

  it('should show the today button if toggled on', function () {
    const calendar = getCalendar({ todayButton: 'Vandaag' })
    const todayButton = calendar.find('.react-datepicker__today-button')
    expect(todayButton).to.have.length(1)
    expect(todayButton.text()).to.equal('Vandaag')
  })

  it('should set the date when pressing todayButton', () => {
    const calendar = getCalendar({ todayButton: 'Vandaag' })
    const todayButton = calendar.find('.react-datepicker__today-button')
    todayButton.simulate('click')
    expect(calendar.state().date.isSame(moment(), 'day'))
  })

  it('should set custom today date when pressing todayButton', () => {
    const todayInAuckland = moment.utc().utcOffset(12)
    const calendar = getCalendar({ todayButton: 'Vandaag', utcOffset: 12 })
    const todayButton = calendar.find('.react-datepicker__today-button')
    todayButton.simulate('click')
    expect(calendar.state().date.isSame(todayInAuckland, 'day'))
  })

  it('should track the currently hovered day', () => {
    const calendar = mount(
      <Calendar
          dateFormat={dateFormat}
          dropdownMode="scroll"
          onClickOutside={() => {}}
          onSelect={() => {}}/>
    )
    const day = calendar.find(Day).first()
    const month = calendar.find(Month).first()
    day.simulate('mouseenter')
    expect(month.prop('selectingDate')).to.exist
    expect(month.prop('selectingDate').isSame(day.prop('day'), 'day')).to.be.true
  })

  it('should clear the hovered day when the mouse leaves', () => {
    const calendar = mount(
      <Calendar
          dateFormat={dateFormat}
          dropdownMode="scroll"
          onClickOutside={() => {}}
          onSelect={() => {}}/>
    )
    calendar.setState({ selectingDate: moment() })
    const month = calendar.find(Month).first()
    expect(month.prop('selectingDate')).to.exist
    month.simulate('mouseleave')
    expect(month.prop('selectingDate')).not.to.exist
  })

  describe('onMonthChange', () => {
    let onMonthChangeSpy = sinon.spy()
    let calendar

    beforeEach(() => {
      onMonthChangeSpy = sinon.spy()
      calendar = mount(
        <Calendar
            dateFormat={dateFormat}
            onSelect={() => {}}
            onClickOutside={() => {}}
            hideCalendar={() => {}}
            dropdownMode="select"
            showYearDropdown
            showMonthDropdown
            forceShowMonthNavigation
            onMonthChange={onMonthChangeSpy}/>
      )
    })

    it('calls onMonthChange prop when previous month button clicked', () => {
      const select = calendar.find('.react-datepicker__navigation--previous')
      select.simulate('click')

      assert(onMonthChangeSpy.called === true, 'onMonthChange should be called')
    })

    it('calls onMonthChange prop when next month button clicked', () => {
      const select = calendar.find('.react-datepicker__navigation--next')
      select.simulate('click')

      assert(onMonthChangeSpy.called === true, 'onMonthChange should be called')
    })

    it('calls onMonthChange prop when month changed from month dropdown', () => {
      const select = calendar.find(MonthDropdown).find('select')
      select.simulate('change')

      assert(onMonthChangeSpy.called === true, 'onMonthChange should be called')
    })
  })

  describe('onDropdownFocus', () => {
    let onDropdownFocusSpy = sinon.spy()
    let calendar

    beforeEach(() => {
      onDropdownFocusSpy = sinon.spy()
      calendar = mount(
        <Calendar
            dateFormat={dateFormat}
            onSelect={() => {}}
            onClickOutside={() => {}}
            hideCalendar={() => {}}
            dropdownMode="select"
            showYearDropdown
            showMonthDropdown
            onDropdownFocus={onDropdownFocusSpy}/>
      )
    })

    it('calls onDropdownFocus prop when year select is focused', () => {
      const select = calendar.find('.react-datepicker__year-select')
      select.simulate('focus')

      assert(onDropdownFocusSpy.called === true, 'onDropdownFocus should be called')
    })

    it('calls onDropdownFocus prop when month select is focused', () => {
      const select = calendar.find('.react-datepicker__month-select')
      select.simulate('focus')

      assert(onDropdownFocusSpy.called === true, 'onDropdownFocus should to be called')
    })

    it('does not call onDropdownFocus prop when the dropdown container div is focused', () => {
      const select = calendar.find('.react-datepicker__header__dropdown')
      select.simulate('focus')

      assert(onDropdownFocusSpy.called === false, 'onDropdownFocus should not to be called')
    })
  })

  describe('localization', function () {
    function testLocale (calendar, selected, locale) {
      const localized = selected.clone().locale(locale)

      const calendarText = calendar.find('.react-datepicker__current-month')
      expect(calendarText.text()).to.equal(localized.format(dateFormat))

      const firstDateOfWeek = localized.clone().startOf('week')
      const firstWeekDayMin = firstDateOfWeek.localeData().weekdaysMin(firstDateOfWeek)
      const firstHeader = calendar.find('.react-datepicker__day-name').at(0)
      expect(firstHeader.text()).to.equal(firstWeekDayMin)
    }

    it('should use the globally-defined locale by default', function () {
      const selected = moment()
      const calendar = getCalendar({ selected })
      testLocale(calendar, selected, moment.locale())
    })

    it('should use the locale specified as a prop', function () {
      const locale = 'fr'
      const selected = moment().locale(locale)
      const calendar = getCalendar({ selected, locale })
      testLocale(calendar, selected, locale)
    })

    it('should override the locale of the date with the globally-defined locale', function () {
      const selected = moment().locale('fr')
      const calendar = getCalendar({ selected })
      testLocale(calendar, selected, moment.locale())
    })

    it('should override the locale of the date with the locale prop', function () {
      const locale = 'fr'
      const selected = moment()
      const calendar = getCalendar({ selected, locale })
      testLocale(calendar, selected, locale)
    })
  })
})
