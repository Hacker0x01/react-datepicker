import React from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'

export default React.createClass({
  displayName: 'Disable Date Auto Correction',

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
              <strong>{'disableDateAutoCorrection'}<br /></strong>
              {'selected={this.state.startDate}'}<br />
              {'onChange={this.handleChange} />'}
        </code>
      </pre>
      <div className="column">
        <DatePicker
            disableDateAutoCorrection
            selected={this.state.startDate}
            onChange={this.handleChange} />
      </div>
    </div>
  }
})
