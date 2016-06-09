import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

export default React.createClass({
  displayName: 'Default',

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
      <pre className="column example__code">
        <code className="jsx">
          {"<DatePicker"}<br />
              {"todaysDate={moment().add(-1, 'days')}"}<br />
              {"todayButton='Today'"}<br />
              {"selected={this.state.startDate}"}<br />
              {"onChange={this.handleChange} />"}
        </code>
      </pre>
      <div className="column">
        <DatePicker
            todaysDate={moment().add(-1, 'days')}
            todayButton="Today"
            selected={this.state.startDate}
            onChange={this.handleChange} />
      </div>
    </div>
  }
})
