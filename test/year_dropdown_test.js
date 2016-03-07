import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import YearDropdown from '../src/year_dropdown.jsx'
import YearDropdownOptions from '../src/year_dropdown_options.jsx'

describe('YearDropdown', () => {
  var yearDropdown,
    handleChangeResult
  var mockHandleChange = function (changeInput) {
    handleChangeResult = changeInput
  }

  beforeEach(function () {
    yearDropdown = TestUtils.renderIntoDocument(
      <YearDropdown year={2015} onChange={mockHandleChange}/>
    )
    handleChangeResult = null
  })

  it('shows the selected year in the initial view', () => {
    var yearDropdownDOM = ReactDOM.findDOMNode(yearDropdown)
    expect(yearDropdownDOM.textContent).to.contain('2015')
  })

  it('starts with the year options list hidden', () => {
    var optionsView = TestUtils.scryRenderedComponentsWithType(yearDropdown, YearDropdownOptions)
    expect(optionsView).to.be.empty
  })

  it('opens a list when read view is clicked', () => {
    var readView = TestUtils.findRenderedDOMComponentWithClass(yearDropdown, 'datepicker__year-read-view')
    TestUtils.Simulate.click(readView)
    var optionsView = TestUtils.findRenderedComponentWithType(yearDropdown, YearDropdownOptions)
    expect(optionsView).to.exist
  })

  it('closes the dropdown when a year is clicked', () => {
    var readView = TestUtils.findRenderedDOMComponentWithClass(yearDropdown, 'datepicker__year-read-view')
    TestUtils.Simulate.click(readView)
    var optionsView = TestUtils.findRenderedComponentWithType(yearDropdown, YearDropdownOptions)
    var optionNodes = TestUtils.scryRenderedDOMComponentsWithTag(optionsView, 'div')
    TestUtils.Simulate.click(optionNodes[2])
    var optionsViewAfterClick = TestUtils.scryRenderedComponentsWithType(yearDropdown, YearDropdownOptions)
    expect(optionsViewAfterClick).to.be.empty
  })

  it('does not call the supplied onChange function when the same year is clicked', () => {
    var readView = TestUtils.findRenderedDOMComponentWithClass(yearDropdown, 'datepicker__year-read-view')
    TestUtils.Simulate.click(readView)
    var optionsView = TestUtils.findRenderedComponentWithType(yearDropdown, YearDropdownOptions)
    var optionNodes = TestUtils.scryRenderedDOMComponentsWithTag(optionsView, 'div')
    TestUtils.Simulate.click(optionNodes[2])
    expect(handleChangeResult).to.not.exist
  })

  it('calls the supplied onChange function when a different year is clicked', () => {
    var readView = TestUtils.findRenderedDOMComponentWithClass(yearDropdown, 'datepicker__year-read-view')
    TestUtils.Simulate.click(readView)
    var optionsView = TestUtils.findRenderedComponentWithType(yearDropdown, YearDropdownOptions)
    var optionNodes = TestUtils.scryRenderedDOMComponentsWithTag(optionsView, 'div')
    TestUtils.Simulate.click(optionNodes[3])
    expect(handleChangeResult).to.equal(2014)
  })
})
