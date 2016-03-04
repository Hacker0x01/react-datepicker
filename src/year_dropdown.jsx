import React from 'react'
import YearDropdownOptions from './year_dropdown_options.jsx'

var YearDropdown = React.createClass({
  displayName: 'YearDropdown',

  propTypes: {
    year: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  getInitialState () {
    return {
      dropdownVisible: false
    }
  },

  renderReadView () {
    return (
      <div className="datepicker__year-read-view" onClick={this.toggleDropdown}>
        <span className="datepicker__year-read-view--selected-year">{this.props.year}</span>
        <span className="datepicker__year-read-view--down-arrow"></span>
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
