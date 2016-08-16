import React from 'react'
import YearDropdown from '../src/year_dropdown.jsx'
import YearDropdownOptions from '../src/year_dropdown_options.jsx'
import { mount } from 'enzyme'

describe('YearDropdown', () => {
  var yearDropdown,
    handleChangeResult
  var mockHandleChange = function (changeInput) {
    handleChangeResult = changeInput
  }

  beforeEach(function () {
    yearDropdown = mount(
      <YearDropdown year={2015} onChange={mockHandleChange}/>
    )
    handleChangeResult = null
  })

  it('shows the selected year in the initial view', () => {
    expect(yearDropdown.text()).to.contain('2015')
  })

  it('starts with the year options list hidden', () => {
    var optionsView = yearDropdown.find(YearDropdownOptions)
    expect(optionsView).to.have.length(0)
  })

  it('opens a list when read view is clicked', () => {
    yearDropdown.find('.react-datepicker__year-read-view').simulate('click')
    var optionsView = yearDropdown.find(YearDropdownOptions)
    expect(optionsView).to.exist
  })

  it('closes the dropdown when a year is clicked', () => {
    yearDropdown.find('.react-datepicker__year-read-view').simulate('click')
    yearDropdown.find('.react-datepicker__year-option').at(1).simulate('click')
    expect(yearDropdown.find(YearDropdownOptions)).to.have.length(0)
  })

  it('does not call the supplied onChange function when the same year is clicked', () => {
    yearDropdown.find('.react-datepicker__year-read-view').simulate('click')
    yearDropdown.find('.react-datepicker__year-option').at(1).simulate('click')
    expect(handleChangeResult).to.not.exist
  })

  it('calls the supplied onChange function when a different year is clicked', () => {
    yearDropdown.find('.react-datepicker__year-read-view').simulate('click')
    yearDropdown.find('.react-datepicker__year-option').at(2).simulate('click')
    expect(handleChangeResult).to.equal(2014)
  })
})
