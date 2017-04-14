import React from 'react'
import YearDropdownOptions from '../src/year_dropdown_options.jsx'
import {mount, shallow} from 'enzyme'
import moment from 'moment'

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
                onCancel={onCancelSpy}/>
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

  it('should show upcoming and previous links and generate 10 years if prop scrollableYearDropdown is true', () => {
    const onCancelSpy = sandbox.spy()
    const onChangeSpy = sandbox.spy()
    const yearDropdown = shallow(
            <YearDropdownOptions onCancel={onCancelSpy} onChange={onChangeSpy} scrollableYearDropdown year={2015}/>
        )
    expect(yearDropdown.state().yearsList.length).to.equal(20)
    expect(yearDropdown.find('.react-datepicker__navigation--years-upcoming').length).to.equal(1)
    expect(yearDropdown.find('.react-datepicker__navigation--years-previous').length).to.equal(1)
  })

  it('should only generate years between min and max date, if provided', () => {
    const onCancelSpy = sandbox.spy()
    const onChangeSpy = sandbox.spy()
    const minDate = moment()
    const maxDate = moment().add(1, 'y')
    const yearDropdown = shallow(
            <YearDropdownOptions onCancel={onCancelSpy} onChange={onChangeSpy} scrollableYearDropdown year={2015}
                minDate={minDate} maxDate={maxDate}/>
        )
    expect(yearDropdown.state().yearsList.length).to.equal(2)
    expect(yearDropdown.state().yearsList).to.contain(minDate.year())
    expect(yearDropdown.state().yearsList).to.contain(maxDate.year())
  })

  it('should hide arrows to add years, if not between min and max date, if provided', () => {
    const onCancelSpy = sandbox.spy()
    const onChangeSpy = sandbox.spy()
    const minDate = moment()
    const maxDate = moment().add(1, 'y')
    const yearDropdown = mount(
            <YearDropdownOptions onCancel={onCancelSpy} onChange={onChangeSpy} scrollableYearDropdown year={2015}
                minDate={minDate} maxDate={maxDate}/>
        )
    expect(yearDropdown.find('.react-datepicker__navigation--years-upcoming').length).to.equal(0)
    expect(yearDropdown.find('.react-datepicker__navigation--years-previous').length).to.equal(0)
  })

  it('should show arrows to add years, if actual years list contains years between min and max date, if provided', () => {
    const onCancelSpy = sandbox.spy()
    const onChangeSpy = sandbox.spy()
    const minDate = moment().subtract(10, 'y')
    const maxDate = moment().add(11, 'y')
    const yearDropdown = mount(
            <YearDropdownOptions onCancel={onCancelSpy} onChange={onChangeSpy} scrollableYearDropdown year={moment().year()}
                minDate={minDate} maxDate={maxDate}/>
        )
    expect(yearDropdown.find('.react-datepicker__navigation--years-previous').length).to.equal(1)
    expect(yearDropdown.find('.react-datepicker__navigation--years-upcoming').length).to.equal(1)
    let textContents = yearDropdown
          .find('.react-datepicker__year-option')
          .map(node => node.text())
    expect(textContents.find(year => year === minDate.year())).to.be.undefined
    expect(textContents.find(year => year === maxDate.year())).to.be.undefined
    yearDropdown.ref('previous').simulate('click')
    textContents = yearDropdown
          .find('.react-datepicker__year-option')
          .map(node => node.text())
    expect(textContents.find(year => year === minDate.year())).to.be.defined
    expect(textContents.find(year => year === maxDate.year())).to.be.undefined
    expect(yearDropdown.find('.react-datepicker__navigation--years-previous').length).to.equal(0)
    yearDropdown.ref('upcoming').simulate('click')
    textContents = yearDropdown
          .find('.react-datepicker__year-option')
          .map(node => node.text())
    expect(textContents.find(year => year === minDate.year())).to.be.defined
    expect(textContents.find(year => year === maxDate.year())).to.be.defined
  })
})
