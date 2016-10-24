import React from 'react'

var WeekNumber = React.createClass({
  displayName: 'WeekNumber',

  propTypes: {
    weekNumber: React.PropTypes.number.isRequired
  },

  render () {
    return (
      <div
          className="react-datepicker__week-number"
          aria-label={`week-${this.props.weekNumber}`}>
        {this.props.weekNumber}
      </div>
    )
  }
})

module.exports = WeekNumber
