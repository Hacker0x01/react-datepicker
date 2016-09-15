import React from 'react'
import moment from 'moment'
import range from 'lodash/range'

var MonthDropdown = React.createClass({
  displayName: 'MonthDropdown',

  propTypes: {
    dropdownMode: React.PropTypes.oneOf(['scroll', 'select']).isRequired,
    locale: React.PropTypes.string,
    month: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  getInitialState () {
    return {
      dropdownVisible: false
    }
  },

  renderSelectOptions () {
    const localeData = moment.localeData(this.props.locale)
    return range(0, 12).map((M, i) => (
      <option key={i} value={i}>{localeData.months(moment({M}))}</option>
    ))
  },

  renderSelectMode () {
    return (
      <select value={this.props.month} className="react-datepicker__month-select" onChange={e => this.onChange(e.target.value)}>
        {this.renderSelectOptions()}
      </select>
    )
  },

  onChange (month) {
    if (month !== this.props.month) {
      this.props.onChange(month)
    }
  },

  render () {
    let renderedDropdown
    switch (this.props.dropdownMode) {
      // TODO: implement scroll mode
      // case 'scroll':
      //   renderedDropdown = this.renderScrollMode()
      //   break
      case 'select':
        renderedDropdown = this.renderSelectMode()
        break
    }

    return (
      <div
          className={`react-datepicker__month-dropdown-container react-datepicker__month-dropdown-container--${this.props.dropdownMode}`}>
        {renderedDropdown}
      </div>
    )
  }
})

module.exports = MonthDropdown
