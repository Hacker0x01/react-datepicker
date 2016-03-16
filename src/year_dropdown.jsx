import React from 'react'
import YearDropdownOptions from './year_dropdown_options'

var YearDropdown = React.createClass({
  displayName: 'YearDropdown',

  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    year: React.PropTypes.number.isRequired
  },

  getInitialState () {
    return {
      dropdownVisible: false
    }
  },

  renderReadView () {
    return (
      <div className="react-datepicker__year-read-view" onClick={this.toggleDropdown}>
        <span className="react-datepicker__year-read-view--selected-year">{this.props.year}</span>
        <span className="react-datepicker__year-read-view--down-arrow"></span>
      </div>
    )
  },

  renderDropdown () {
    return (
      <YearDropdownOptions
          ref="options"
          year={this.props.year}
          onChange={this.onChange}
          onCancel={this.toggleDropdown} />
    )
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
    return (
      <div>
        {this.state.dropdownVisible ? this.renderDropdown() : this.renderReadView()}
      </div>
    )
  }
})

module.exports = YearDropdown
