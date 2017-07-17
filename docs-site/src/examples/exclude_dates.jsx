import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

export default class ExcludeDates extends React.Component {
  state = {
    startDate: null
  }

  handleChange = (date) => {
    this.setState({
      startDate: date
    })
  }

  render () {
    return <div className="row">
      <pre className="column example__code">
        <code className="jsx">
        {'<DatePicker'}<br />
        {'  selected={this.state.startDate}'}<br />
        {'  onChange={this.handleChange}'}<br />
<strong>{'  excludeDates={[moment(), moment().subtract(1, "days")]}'}</strong><br />
        {'  placeholderText="Select a date other than today or yesterday" />'}
        </code>
      </pre>
      <div className="column">
        <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            excludeDates={[moment(), moment().subtract(1, 'days')]}
            placeholderText="Select a date other than today or yesterday" />
      </div>
    </div>
  }
}
