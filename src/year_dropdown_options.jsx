import React from 'react'
import classNames from 'classnames'

function generateYears (year, noOfYear) {
  var list = []
  for (var i = 0; i < noOfYear; i++) {
    list.push(year - i)
  }
  return list
}

var YearDropdownOptions = React.createClass({
  displayName: 'YearDropdownOptions',

  propTypes: {
    onCancel: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    scrollableYearDropdown: React.PropTypes.bool,
    year: React.PropTypes.number.isRequired
  },

  mixins: [require('react-onclickoutside')],

  getInitialState () {
    return {
      yearsList: this.props.scrollableYearDropdown ? generateYears(this.props.year, 50) : generateYears(this.props.year, 5)
    }
  },

  renderOptions () {
    var selectedYear = this.props.year
    var options = this.state.yearsList.map(year =>
      <div className="react-datepicker__year-option"
          key={year}
          ref={year}
          onClick={this.onChange.bind(this, year)}>
        {selectedYear === year ? <span className="react-datepicker__year-option--selected">✓</span> : ''}
        {year}
      </div>
    )

    options.unshift(
      <div className="react-datepicker__year-option"
          ref={"upcoming"}
          key={"upcoming"}
          onClick={this.incrementYears}>
        <a className="react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming"></a>
      </div>
    )
    options.push(
      <div className="react-datepicker__year-option"
          ref={"previous"}
          key={"previous"}
          onClick={this.decrementYears}>
        <a className="react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous"></a>
      </div>
    )
    return options
  },

  onChange (year) {
    this.props.onChange(year)
  },

  handleClickOutside () {
    this.props.onCancel()
  },

  shiftYears (amount) {
    var years = this.state.yearsList.map(function (year) {
      return year + amount
    })

    this.setState({
      yearsList: years
    })
  },

  incrementYears () {
    return this.shiftYears(1)
  },

  decrementYears () {
    return this.shiftYears(-1)
  },

  render () {
    let dropdownClass = classNames({
      'react-datepicker__year-dropdown': true,
      'react-datepicker__year-dropdown--scrollable': this.props.scrollableYearDropdown
    })

    return (
      <div className={dropdownClass}>
        {this.renderOptions()}
      </div>
    )
  }
})

module.exports = YearDropdownOptions
