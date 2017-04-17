import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

export default class includeDates extends React.Component {
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
              {'selected={this.state.startDate}'}<br />
              {'onChange={this.handleChange}'}<br />
              <strong>{'includeDates={[moment(), moment().add(1, "days")]}'}</strong><br />
              {'placeholderText="This only includes today and tomorrow" />'}
        </code>
      </pre>
      <div className="column">
        <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            includeDates={[moment(), moment().add(1, 'days')]}
            placeholderText="This only includes today and tomorrow" />
      </div>
    </div>
  }
}
