import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment-timezone'

export default React.createClass({
  displayName: 'TimePicker',

  getInitialState () {
    return {
      selected: moment.tz(moment.tz.guess()),
      dateOnly: true
    }
  },

  handleChange (date, isDateOnly) {
    this.setState({
      selected: date,
      dateOnly: isDateOnly
    })
  },

  render () {
    return <div className="row">
      <pre className="column example__code">
        <code className="jsx">
          {"<DatePicker"}<br />
              <strong>{"dateFormat=\"MMM D, YYYY [at] k:mm a z\""}</strong><br />
              <strong>{"timezone=\"America/Los_Angeles\""}</strong><br />
              {"selected={this.state.startDate}"}<br />
              {"onChange={this.handleChange} />"}<br />
              {"timePickerButton={true} />"}
        </code>
      </pre>
      <div className="column">
        <DatePicker
            dateFormat="YYYY-MM-DD [at] hh:mm a z"
            dateOnlyFormat="YYYY-MM-DD z"
            timezone={moment.tz.guess()}
            selected={this.state.selected}
            onChange={this.handleChange}
            dateOnly={this.state.dateOnly}
            isClearable={true}
            timePickerButton={true} />
      </div>
    </div>
  }
})
