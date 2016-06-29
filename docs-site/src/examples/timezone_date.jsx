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
          {"<DatePicker"}<br />
              {"timeZone='Pacific/Auckland'"}<br />
              {"todayButton='Today'"}<br />
              {"onChange={this.handleChange} />"}
        </code>
      </pre>
      <div className="column">
        <DatePicker
            timeZone="Pacific/Auckland"
            dateFormat="DD-MMM HH:mm z"
            todayButton="Today in Auckland"
            selected={this.state.startDate}
            onChange={this.handleChange} />
      </div>
    </div>
  }
})
