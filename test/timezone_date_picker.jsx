import React from 'react'
import DatePicker from '../src/datepicker.jsx'
import * as utils from '../src/date_utils'

class TimezoneDatePicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = { startDate: null, utcOffset: -4 }
  }

  handleChange (date) {
    this.setState({ startDate: date })
  }

  render () {
    var selected = this.state.startDate &&
                   utils.setUTCOffset(utils.cloneDate(this.state.startDate), this.state.utcOffset)

    return <DatePicker
        utcOffset={this.state.utcOffset}
        dateFormat="YYYY-MM-DD HH:mm"
        selected={selected}
        onChange={this.handleChange} />
  }
}

export default TimezoneDatePicker
