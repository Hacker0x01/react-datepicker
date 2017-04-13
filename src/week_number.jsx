import React from 'react'
import PropTypes from 'prop-types'

export default class WeekNumber extends React.Component {
  static propTypes = {
    weekNumber: PropTypes.number.isRequired
  }

  render () {
    return (
      <div
          className="react-datepicker__week-number"
          aria-label={`week-${this.props.weekNumber}`}>
        {this.props.weekNumber}
      </div>
    )
  }
}
