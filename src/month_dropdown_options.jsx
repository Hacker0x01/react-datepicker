import React from 'react'

var MonthDropdownOptions = React.createClass({
  displayName: 'MonthDropdownOptions',

  propTypes: {
    onCancel: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    month: React.PropTypes.number.isRequired,
    monthNames: React.PropTypes.arrayOf(React.PropTypes.string.isRequired).isRequired
  },

  renderOptions () {
    var selectedMonth = this.props.month
    var options = this.props.monthNames.map((month, i) =>
      <div className="react-datepicker__month-option"
          key={month}
          ref={month}
          onClick={this.onChange.bind(this, i)}>
        {selectedMonth === i ? <span className="react-datepicker__month-option--selected">✓</span> : ''}
        {month}
      </div>
    )

    return options
  },

  onChange (month) {
    this.props.onChange(month)
  },

  handleClickOutside () {
    this.props.onCancel()
  },

  render () {
    return (
      <div className="react-datepicker__month-dropdown">
        {this.renderOptions()}
      </div>
    )
  }
})

module.exports = MonthDropdownOptions
