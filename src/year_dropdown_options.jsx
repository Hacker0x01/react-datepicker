import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

function generateYears (year, noOfYear) {
  var list = []
  for (var i = 0; i < (2 * noOfYear); i++) {
    list.push(year + noOfYear - i)
  }
  return list
}

export default class YearDropdownOptions extends React.Component {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    scrollableYearDropdown: PropTypes.bool,
    year: PropTypes.number.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      yearsList: this.props.scrollableYearDropdown ? generateYears(this.props.year, 10) : generateYears(this.props.year, 5)
    }
  }

  renderOptions = () => {
    var selectedYear = this.props.year
    var options = this.state.yearsList.map(year =>
      <div aria-selected={selectedYear === year}
          className="react-datepicker__year-option"
          key={year}
          onClick={this.onChange.bind(this, year)}
          ref={year}
          role="option">
        {selectedYear === year ? <span className="react-datepicker__year-option--selected">✓</span> : ''}
        {year}
      </div>
    )

    options.unshift(
      <div aria-selected="false"
          className="react-datepicker__year-option"
          ref={'upcoming'}
          key={'upcoming'}
          onClick={this.incrementYears}
          role="option">
        <a className="react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming" />
      </div>
    )
    options.push(
      <div aria-selected="false"
          className="react-datepicker__year-option"
          ref={'previous'}
          key={'previous'}
          onClick={this.decrementYears}
          role="option">
        <a className="react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous" />
      </div>
    )
    return options
  }

  onChange = (year) => {
    this.props.onChange(year)
  }

  handleClickOutside = () => {
    this.props.onCancel()
  }

  shiftYears = (amount) => {
    var years = this.state.yearsList.map(function (year) {
      return year + amount
    })

    this.setState({
      yearsList: years
    })
  }

  incrementYears = () => {
    return this.shiftYears(1)
  }

  decrementYears = () => {
    return this.shiftYears(-1)
  }

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
}
