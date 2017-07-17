import React from 'react'
import DatePicker from 'react-datepicker'

export default class FixedCalendar extends React.Component {
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
              {'fixedHeight'}<br />
              {'selected={this.state.startDate}'}<br />
              {'onChange={this.handleChange} />'}
        </code>
      </pre>
      <div className="column">
        <DatePicker
            fixedHeight
            selected={this.state.startDate}
            onChange={this.handleChange} />
      </div>
    </div>
  }
}
