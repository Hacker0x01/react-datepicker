import React from 'react'
import TestUtils from 'react-addons-test-utils'
import range from 'lodash/range'
import MonthDropdown from '../src/month_dropdown.jsx'

describe('MonthDropdown', () => {
  var monthDropdown
  var handleChangeResult
  var mockHandleChange = function (changeInput) {
    handleChangeResult = changeInput
  }

  function getMonthDropdown (overrideProps) {
    return TestUtils.renderIntoDocument(
      <MonthDropdown
          dropdownMode="scroll"
          month={11}
          onChange={mockHandleChange}
          {...overrideProps} />
    )
  }

  beforeEach(function () {
    handleChangeResult = null
  })

  xdescribe('scroll mode', () => {
    // TODO
  })

  describe('select mode', () => {
    it('renders a select', () => {
      monthDropdown = getMonthDropdown({dropdownMode: 'select'})
      var select = TestUtils.findRenderedDOMComponentWithClass(monthDropdown, 'react-datepicker__month-select')
      expect(select).to.exist
      expect(select.value).to.eq('11')
      var options = TestUtils.scryRenderedDOMComponentsWithTag(monthDropdown, 'option')
      expect(options.map(o => o.value)).to.eql(range(0, 12).map(n => `${n}`))
    })

    it('renders month options with default locale', () => {
      monthDropdown = getMonthDropdown({dropdownMode: 'select'})
      var options = TestUtils.scryRenderedDOMComponentsWithTag(monthDropdown, 'option')
      expect(options.map(o => o.textContent)).to.eql([
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ])
    })

    it('renders month options with specified locale', () => {
      monthDropdown = getMonthDropdown({dropdownMode: 'select', locale: 'zh-cn'})
      var options = TestUtils.scryRenderedDOMComponentsWithTag(monthDropdown, 'option')
      expect(options.map(o => o.textContent)).to.eql([
        '一月', '二月', '三月', '四月', '五月', '六月',
        '七月', '八月', '九月', '十月', '十一月', '十二月'
      ])
    })

    it('does not call the supplied onChange function when the same month is clicked', () => {
      monthDropdown = getMonthDropdown({dropdownMode: 'select', month: 11})
      var select = TestUtils.findRenderedDOMComponentWithClass(monthDropdown, 'react-datepicker__month-select')
      TestUtils.Simulate.change(select, {target: {value: 11}})
      expect(handleChangeResult).to.not.exist
    })

    it('calls the supplied onChange function when a different month is clicked', () => {
      monthDropdown = getMonthDropdown({dropdownMode: 'select', month: 11})
      var select = TestUtils.findRenderedDOMComponentWithClass(monthDropdown, 'react-datepicker__month-select')
      TestUtils.Simulate.change(select, {target: {value: 9}})
      expect(handleChangeResult).to.equal(9)
    })
  })
})
