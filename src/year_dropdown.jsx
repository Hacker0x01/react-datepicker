import React from 'react'
import YearDropdownOptions from './year_dropdown_options'
import onClickOutside from 'react-onclickoutside'

var WrappedYearDropdownOptions = onClickOutside(YearDropdownOptions)

var YearDropdown = React.createClass({
  displayName: 'YearDropdown',

  propTypes: {
    dropdownMode: React.PropTypes.oneOf(['scroll', 'select']).isRequired,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onChange: React.PropTypes.func.isRequired,
    scrollableYearDropdown: React.PropTypes.bool,
    year: React.PropTypes.number.isRequired
  },

  getInitialState () {
    return {
      dropdownVisible: false
    }
  },

  renderSelectOptions () {
    const minYear = this.props.minDate ? this.props.minDate.year() : 1900
    const maxYear = this.props.maxDate ? this.props.maxDate.year() : 2100

    const options = []
    for (let i = minYear; i <= maxYear; i++) {
      options.push(<option key={i} value={i}>{i}</option>)
    }
    return options
  },

  onSelectChange (e) {
    this.onChange(e.target.value)
  },

  renderSelectMode () {
    return (
      <select
          value={this.props.year}
          className="react-datepicker__year-select"
          onChange={this.onSelectChange}>
        {this.renderSelectOptions()}
      </select>
    )
  },

  renderReadView () {
    return (
      <div className="react-datepicker__year-read-view" onClick={this.toggleDropdown}>
        <span className="react-datepicker__year-read-view--selected-year">{this.props.year}</span>
        <span className="react-datepicker__year-read-view--down-arrow" />
      </div>
    )
  },

  renderDropdown () {
    return (
      <WrappedYearDropdownOptions
          ref="options"
          year={this.props.year}
          onChange={this.onChange}
          onCancel={this.toggleDropdown}
          scrollableYearDropdown={this.props.scrollableYearDropdown} />
    )
  },

  renderScrollMode () {
    return this.state.dropdownVisible ? this.renderDropdown() : this.renderReadView()
  },

  onChange (year) {
    this.toggleDropdown()
    if (year === this.props.year) return
    this.props.onChange(year)
  },

  toggleDropdown () {
    this.setState({
      dropdownVisible: !this.state.dropdownVisible
    })
  },

  render () {
    let renderedDropdown
    switch (this.props.dropdownMode) {
      case 'scroll':
        renderedDropdown = this.renderScrollMode()
        break
      case 'select':
        renderedDropdown = this.renderSelectMode()
        break
    }

    return (
      <div
          className={`react-datepicker__year-dropdown-container react-datepicker__year-dropdown-container--${this.props.dropdownMode}`}>
        {renderedDropdown}
      </div>
    )
  }
})

module.exports = YearDropdown
