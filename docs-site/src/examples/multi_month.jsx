import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

export default React.createClass({
  displayName: 'MultiMonth',

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
          {'<DatePicker'}<br />
              {'selected={this.state.startDate}'}<br />
              {'onChange={this.handleChange}'}<br/>
              {'months={2} />'}
        </code>
      </pre>
      <div className="column">
        <DatePicker
            months={2}
            onChange={this.handleChange}
            selected={this.state.startDate} />
      </div>
    </div>
  }
})
