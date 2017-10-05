import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

export default class ExcludeTimes extends React.Component {
  state = {
    startDate: moment().hours(16).minutes(30)
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
        {'  excludeTimes={[moment().hours(17).minutes(0), moment().hours(18).minutes(30), moment().hours(19).minutes(30)], moment().hours(17).minutes(30)}'}</strong><br />
        <strong>{'  dateFormat="LLL"'}</strong><br />
        {'/>'}
        </code>
      </pre>
      <div className="column">
        <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            showTimeSelect
            excludeTimes={[moment().hours(17).minutes(0), moment().hours(18).minutes(30), moment().hours(19).minutes(30), moment().hours(17).minutes(30)]}
            dateFormat="LLL" />
      </div>
    </div>
  }
}
