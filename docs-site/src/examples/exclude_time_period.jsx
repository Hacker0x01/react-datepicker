import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

export default class ExcludeTimePeriod extends React.Component {
  state = {
    startDate: moment().hours(17).minutes(30)
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
        <strong>{'  showTimeSelect'}<br />
        {'  minTime={moment().hours(17).minutes(0)}'}<br />
        {'  maxTime={moment().hours(20).minutes(30)}'}<br />
        {'  dateFormat="LLL"'}</strong><br />
        {'/>'}
        </code>
      </pre>
      <div className="column">
        <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            showTimeSelect
            minTime={moment().hours(17).minutes(0)}
            maxTime={moment().hours(20).minutes(30)}
            dateFormat="LLL" />
      </div>
    </div>
  }
}
