import React from 'react'
import moment from 'moment'

import DatePicker from 'react-datepicker'

export default class TimeZoneDate extends React.Component {
  state = {
    startDate: null,
    utcOffset: -4
  }

  timezoneNames = [
    { name: 'GMT+10', value: 10 },
    { name: 'GMT+8', value: 8 },
    { name: 'GMT+4', value: 4 },
    { name: 'GMT+1', value: 1 },
    { name: 'GMT', value: 0 },
    { name: 'GMT-3', value: -3 },
    { name: 'GMT-4', value: -4 },
    { name: 'GMT-8', value: -8 },
    { name: 'GMT-10', value: -10 }
  ]

  handleChange = (date) => {
    this.setState({
      startDate: date
    })
  }

  handleTmzChange = (event) => {
    this.setState({
      utcOffset: parseInt(event.target.value, 10)
    })
  }

  getOffsetLabel = (tmz) => {
    const obj = this.timezoneNames.find(({ value }) => value === tmz)
    return (obj && obj.name) || ''
  }

  render () {
    const selected = this.state.startDate &&
                   this.state.startDate.clone().utcOffset(this.state.utcOffset)
    const utcText = this.getOffsetLabel(this.state.utcOffset)
    const todayTxt = `Today in ${utcText}`

    return <div className="row">
      <pre className="column example__code">
        <code className="jsx">{`
<DatePicker
    utcOffset=-4
    dateFormat="DD-MMM HH:mm"
    todayButton="Today in Puerto Rico"
    onChange={this.handleChange}
/>
`}
        </code>
      </pre>
      <div className="column">
        <DatePicker
            utcOffset={this.state.utcOffset}
            dateFormat="DD-MMM YYYY HH:mm"
            todayButton={todayTxt}
            selected={selected}
            minDate={moment('2016-11-05T00:00:00+00:00').utcOffset(this.state.utcOffset)}
            maxDate={moment('2016-12-04T00:00:00-04:00').utcOffset(this.state.utcOffset)}
            onChange={this.handleChange} />
        <br/>
        <label className="example__timezone-label">
          Timezone Offset:
          <select className="example__timezone-selector" value={this.state.utcOffset} onChange={this.handleTmzChange}>
            <option value="10">GMT+10:00</option>
            <option value="8">GMT+08:00</option>
            <option value="4">GMT+04:00</option>
            <option value="1">GMT+01:00</option>
            <option value="0">GMT</option>
            <option value="-3">GMT-03:00</option>
            <option value="-4">GMT-04:00</option>
            <option value="-8">GMT-08:00</option>
            <option value="-10">GMT-10:00</option>
          </select>
        </label>
      </div>
    </div>
  }
}
