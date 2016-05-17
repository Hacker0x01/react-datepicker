import React from 'react'
import TestUtils from 'react-addons-test-utils'
import moment from 'moment'
import Calendar from '../src/calendar'
import YearDropdown from '../src/year_dropdown'

describe('Calendar', function () {
  var dateFormat = 'MMMM YYYY'

  function getCalendar (extraProps) { // eslint-disable-line react/display-name
    return <Calendar
        dateFormat={dateFormat}
        onSelect={() => {}}
        onClickOutside={() => {}}
        hideCalendar={() => {}}
        {...extraProps} />
  }

  it('should start with the current date in view if no date range', function () {
    var now = moment()
    var calendar = TestUtils.renderIntoDocument(getCalendar())
    assert(calendar.state.date.isSame(now, 'day'))
  })

  it('should start with the selected date in view if provided', function () {
    var selected = moment().add(1, 'year')
    var calendar = TestUtils.renderIntoDocument(getCalendar({ selected }))
    assert(calendar.state.date.isSame(selected, 'day'))
  })

  it('should start with the current date in view if in date range', function () {
    var now = moment()
    var minDate = now.clone().subtract(1, 'year')
    var maxDate = now.clone().add(1, 'year')
    var calendar = TestUtils.renderIntoDocument(getCalendar({ minDate, maxDate }))
    assert(calendar.state.date.isSame(now, 'day'))
  })

  it('should start with the min date in view if after the current date', function () {
    var minDate = moment().add(1, 'year')
    var calendar = TestUtils.renderIntoDocument(getCalendar({ minDate }))
    assert(calendar.state.date.isSame(minDate, 'day'))
  })

  it('should start with the min include date in view if after the current date', function () {
    var minDate = moment().add(1, 'year')
    var calendar = TestUtils.renderIntoDocument(getCalendar({ includeDates: [minDate] }))
    assert(calendar.state.date.isSame(minDate, 'day'))
  })

  it('should start with the max date in view if before the current date', function () {
    var maxDate = moment().subtract(1, 'year')
    var calendar = TestUtils.renderIntoDocument(getCalendar({ maxDate }))
    assert(calendar.state.date.isSame(maxDate, 'day'))
  })

  it('should start with the max include date in view if before the current date', function () {
    var maxDate = moment().subtract(1, 'year')
    var calendar = TestUtils.renderIntoDocument(getCalendar({ includeDates: [maxDate] }))
    assert(calendar.state.date.isSame(maxDate, 'day'))
  })

  it('should start with the open to date in view if given and no selected/min/max dates given', function () {
    var openToDate = moment('09/28/1993')
    var calendar = TestUtils.renderIntoDocument(getCalendar({ openToDate }))
    assert(calendar.state.date.isSame(openToDate, 'day'))
  })

  it('should not show the year dropdown menu by default', function () {
    var calendar = TestUtils.renderIntoDocument(getCalendar())
    var yearReadView = TestUtils.scryRenderedComponentsWithType(calendar, YearDropdown)
    expect(yearReadView).to.be.empty
  })

  it('should show the year dropdown menu if toggled on', function () {
    var calendar = TestUtils.renderIntoDocument(getCalendar({ showYearDropdown: true }))
    var yearReadView = TestUtils.findRenderedComponentWithType(calendar, YearDropdown)
    expect(yearReadView).to.exist
  })

  it('should not show the today button by default', function () {
    var calendar = TestUtils.renderIntoDocument(getCalendar())
    var todayButton = TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'react-datepicker__today-button')
    expect(todayButton.length).to.equal(0)
  })

  it('should show the today button if toggled on', function () {
    var calendar = TestUtils.renderIntoDocument(getCalendar({ todayButton: 'Vandaag' }))
    var todayButton = TestUtils.findRenderedDOMComponentWithClass(calendar, 'react-datepicker__today-button')
    expect(todayButton).to.exist
    expect(todayButton.textContent).to.equal('Vandaag')
  })

  describe('localization', function () {
    function testLocale (calendar, selected, locale) {
      var localized = selected.clone().locale(locale)

      var calendarText = TestUtils.findRenderedDOMComponentWithClass(calendar, 'react-datepicker__current-month')
      expect(calendarText.textContent).to.equal(localized.format(dateFormat))

      var firstDateOfWeek = localized.clone().startOf('week')
      var firstWeekDayMin = firstDateOfWeek.localeData().weekdaysMin(firstDateOfWeek)
      var firstHeader = TestUtils.scryRenderedDOMComponentsWithClass(calendar, 'react-datepicker__day-name')[0]
      expect(firstHeader.textContent).to.equal(firstWeekDayMin)
    }

    it('should use the globally-defined locale by default', function () {
      var selected = moment()
      var calendar = TestUtils.renderIntoDocument(getCalendar({ selected }))
      testLocale(calendar, selected, moment.locale())
    })

    it('should use the locale specified as a prop', function () {
      var locale = 'fr'
      var selected = moment().locale(locale)
      var calendar = TestUtils.renderIntoDocument(getCalendar({ selected, locale }))
      testLocale(calendar, selected, locale)
    })

    it('should override the locale of the date with the globally-defined locale', function () {
      var selected = moment().locale('fr')
      var calendar = TestUtils.renderIntoDocument(getCalendar({ selected }))
      testLocale(calendar, selected, moment.locale())
    })

    it('should override the locale of the date with the locale prop', function () {
      var locale = 'fr'
      var selected = moment()
      var calendar = TestUtils.renderIntoDocument(getCalendar({ selected, locale }))
      testLocale(calendar, selected, locale)
    })
  })
})
