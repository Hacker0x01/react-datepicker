import React from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'

export default React.createClass({
  displayName: 'Allow Invalid Dates',

  getInitialState () {
    return {
      startDate: moment()
    }
  },

  handleChange (date) {
    this.setState({
      startDate: date
    })
  },

  render () {
    return <div className="row">
      <pre className="column example__code">
        <code className="jsx">
          {'<DatePicker'}<br />
              <strong>{'allowInvalidDates'}<br /></strong>
              {'selected={this.state.startDate}'}<br />
              {'onChange={this.handleChange} />'}
        </code>
      </pre>
      <div className="column">
        <DatePicker
            allowInvalidDates
            selected={this.state.startDate}
            onChange={this.handleChange} />
      </div>
    </div>
  }
})
