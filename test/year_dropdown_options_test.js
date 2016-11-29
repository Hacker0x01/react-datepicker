import React from 'react'
import YearDropdownOptions from '../src/year_dropdown_options.jsx'
import { mount } from 'enzyme'

describe('YearDropdownOptions', () => {
  var yearDropdown,
    handleChangeResult
  var mockHandleChange = function (changeInput) {
    handleChangeResult = changeInput
  }

  beforeEach(() => {
    yearDropdown = mount(
      <YearDropdownOptions
          year={2015}
          onChange={mockHandleChange}
          onCancel={() => {}} />
    )
  })

  it('shows the available years in the initial view', () => {
    var yearDropdownNode = yearDropdown.find('div')
    var textContents = yearDropdownNode
      .find('.react-datepicker__year-option')
      .map(node => node.text())

    expect(textContents).to.have.members([
      '', '✓2015', '2014', '2013', '2012', '2011', ''
    ])
  })

  it("increments the available years when the 'upcoming years' button is clicked", () => {
    yearDropdown.ref('upcoming').simulate('click')

    var textContents = yearDropdown
      .find('.react-datepicker__year-option')
      .map(node => node.text())

    expect(textContents).to.have.members([
      '', '2016', '✓2015', '2014', '2013', '2012', ''
    ])
  })

  it("decrements the available years when the 'previous years' button is clicked", () => {
    yearDropdown.ref('previous').simulate('click')

    var textContents = yearDropdown
      .find('.react-datepicker__year-option')
      .map(node => node.text())

    expect(textContents).to.have.members([
      '', '2014', '2013', '2012', '2011', '2010', ''
    ])
  })

  it('calls the supplied onChange function when a year is clicked', () => {
    yearDropdown.ref('2015').simulate('click')
    expect(handleChangeResult).to.equal(2015)
  })
})
