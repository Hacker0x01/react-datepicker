import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import YearDropdownOptions from '../src/year_dropdown_options.jsx'

describe('YearDropdownOptions', () => {
  var yearDropdown,
    handleChangeResult
  var mockHandleChange = function (changeInput) {
    handleChangeResult = changeInput
  }

  beforeEach(() => {
    yearDropdown = TestUtils.renderIntoDocument(
      <YearDropdownOptions
          year={2015}
          onChange={mockHandleChange}
          onCancel={() => {}} />
    )
  })

  it('shows the available years in the initial view', () => {
    var yearDropdownDOM = ReactDOM.findDOMNode(yearDropdown)
    var yearDropdownNode = TestUtils.scryRenderedDOMComponentsWithTag(yearDropdown, 'div')
    expect(yearDropdownNode.length).to.equal(8)
    expect(yearDropdownDOM.textContent).to.contain('2015')
    expect(yearDropdownDOM.textContent).to.contain('2014')
    expect(yearDropdownDOM.textContent).to.contain('2013')
    expect(yearDropdownDOM.textContent).to.contain('2012')
    expect(yearDropdownDOM.textContent).to.contain('2011')
  })

  it("increments the available years when the 'upcoming years' button is clicked", () => {
    TestUtils.Simulate.click(yearDropdown.refs.upcoming)
    var yearDropdownDOM = ReactDOM.findDOMNode(yearDropdown)
    expect(yearDropdownDOM.textContent).to.contain('2016')
    expect(yearDropdownDOM.textContent).to.contain('2015')
    expect(yearDropdownDOM.textContent).to.contain('2014')
    expect(yearDropdownDOM.textContent).to.contain('2013')
    expect(yearDropdownDOM.textContent).to.contain('2012')
    expect(yearDropdownDOM.textContent).to.not.contain('2011')
  })

  it("decrements the available years when the 'previous years' button is clicked", () => {
    TestUtils.Simulate.click(yearDropdown.refs.previous)
    var yearDropdownDOM = ReactDOM.findDOMNode(yearDropdown)
    expect(yearDropdownDOM.textContent).to.not.contain('2015')
    expect(yearDropdownDOM.textContent).to.contain('2014')
    expect(yearDropdownDOM.textContent).to.contain('2013')
    expect(yearDropdownDOM.textContent).to.contain('2012')
    expect(yearDropdownDOM.textContent).to.contain('2011')
    expect(yearDropdownDOM.textContent).to.contain('2010')
  })

  it('calls the supplied onChange function when a year is clicked', () => {
    var yearDropdownNode = TestUtils.scryRenderedDOMComponentsWithTag(yearDropdown, 'div')
    TestUtils.Simulate.click(yearDropdownNode[2])
    expect(handleChangeResult).to.equal(2015)
  })
})
