import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

export default class SpecificDateRange extends React.Component {
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
<strong>{'  minDate={moment()}'}</strong><br />
<strong>{'  maxDate={moment().add(5, "days")}'}</strong><br />
        {'  placeholderText="Select a date between today and 5 days in the future"'}<br />
        {'/>'}
        </code>
      </pre>
      <div className="column">
        <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            minDate={moment()}
            maxDate={moment().add(5, 'days')}
            placeholderText="Select a date between today and 5 days in the future" />
      </div>
    </div>
  }
}
