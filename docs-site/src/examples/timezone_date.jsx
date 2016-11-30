import React from 'react'
import DatePicker from 'react-datepicker'

export default React.createClass({
  displayName: 'Default',

  getInitialState () {
    return {
      startDate: null
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
              {'utcOffset=1320'}<br />
              {'todayButton="Today"'}<br />
              {'onChange={this.handleChange} />'}
        </code>
      </pre>
      <div className="column">
        <DatePicker
            utcOffset={1320}
            dateFormat="DD-MMM HH:mm"
            todayButton="Today in Farawayland"
            selected={this.state.startDate}
            onChange={this.handleChange} />
      </div>
    </div>
  }
})
