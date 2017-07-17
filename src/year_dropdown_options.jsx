import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

function generateYears (year, noOfYear) {
  var list = []
  for (var i = 0; i < (2 * noOfYear + 1); i++) {
    list.push(year + noOfYear - i)
  }
  return list
}

export default class YearDropdownOptions extends React.Component {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    scrollableYearDropdown: PropTypes.bool,
    year: PropTypes.number.isRequired,
    yearDropdownItemNumber: PropTypes.number
  }

  constructor (props) {
    super(props)
    const { yearDropdownItemNumber, scrollableYearDropdown } = props
    const noOfYear = yearDropdownItemNumber || (scrollableYearDropdown ? 10 : 5)

    this.state = {
      yearsList: generateYears(this.props.year, noOfYear)
    }
  }

  renderOptions = () => {
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
          ref={'upcoming'}
          key={'upcoming'}
          onClick={this.incrementYears}>
        <a className="react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming" />
      </div>
    )
    options.push(
      <div className="react-datepicker__year-option"
          ref={'previous'}
          key={'previous'}
          onClick={this.decrementYears}>
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
