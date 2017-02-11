import React from 'react'
import YearDropdownOptions from '../src/year_dropdown_options.jsx'
import { mount, shallow } from 'enzyme'

describe('YearDropdownOptions', () => {
  let yearDropdown,
    handleChangeResult
  const mockHandleChange = function (changeInput) {
    handleChangeResult = changeInput
  }
  let sandbox, onCancelSpy

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    onCancelSpy = sandbox.spy()
    yearDropdown = mount(
      <YearDropdownOptions
          year={2015}
          onChange={mockHandleChange}
          onCancel={onCancelSpy} />
    )
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('shows the available years in the initial view', () => {
    const yearDropdownNode = yearDropdown.find('div')
    const textContents = yearDropdownNode
      .find('.react-datepicker__year-option')
      .map(node => node.text())

    expect(textContents).to.have.members([
      '', '2020', '2019', '2018', '2017', '2016', '✓2015', '2014', '2013', '2012', '2011', ''
    ])
  })

  it('generate 10 years if prop scrollableYearDropdown is false', () => {
    const yearsListLength = yearDropdown.state().yearsList.length
    expect(yearsListLength).to.equal(10)
  })

  it("increments the available years when the 'upcoming years' button is clicked", () => {
    yearDropdown.ref('upcoming').simulate('click')

    const textContents = yearDropdown
      .find('.react-datepicker__year-option')
      .map(node => node.text())

    expect(textContents).to.have.members([
      '', '2021', '2020', '2019', '2018', '2017', '2016', '✓2015', '2014', '2013', '2012', ''
    ])
  })

  it("decrements the available years when the 'previous years' button is clicked", () => {
    yearDropdown.ref('previous').simulate('click')

    const textContents = yearDropdown
      .find('.react-datepicker__year-option')
      .map(node => node.text())

    expect(textContents).to.have.members([
      '2019', '2018', '2017', '2016', '✓2015', '2014', '2013', '2012', '2011', '2010', ''
    ])
  })

  it('calls the supplied onChange function when a year is clicked', () => {
    yearDropdown.ref('2015').simulate('click')
    expect(handleChangeResult).to.equal(2015)
  })

  it('calls the supplied onCancel function on handleClickOutside', () => {
    const instance = yearDropdown.instance()
    instance.handleClickOutside()
    expect(onCancelSpy.calledOnce).to.be.true
  })
})

describe('YearDropdownOptions with scrollable dropwdown', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should generate 10 years if prop scrollableYearDropdown is true', () => {
    const onCancelSpy = sandbox.spy()
    const onChangeSpy = sandbox.spy()
    const yearDropdown = shallow(
        <YearDropdownOptions onCancel={onCancelSpy} onChange={onChangeSpy} scrollableYearDropdown year={2015}/>
    )
    expect(yearDropdown.state().yearsList.length).to.equal(20)
  })
})
