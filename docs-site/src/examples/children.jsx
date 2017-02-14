import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

export default React.createClass({
  displayName: 'Children',

  getInitialState () {
    return {
      startDate: moment()
    }
  },

  handleChange (date) {
    this.setState({
      startDate: date
    })
  },

  render () {
    return <div className="row">
      <pre className="column">
        <code className="jsx">{`
<DatePicker
    selected={this.state.startDate}
    onChange={this.handleChange}>
  <div style={{color: 'red'}}>
    Don't forget to check the weather!
  </div>
</DatePicker>
`}
        </code>
      </pre>
      <div className="column">
        <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}>
          <div style={{color: 'red'}}>
            Don't forget to check the weather!
          </div>
        </DatePicker>
      </div>
    </div>
  }
})
