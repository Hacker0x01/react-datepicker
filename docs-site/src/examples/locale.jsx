import React from 'react'
import DatePicker from 'react-datepicker'

export default React.createClass({
  displayName: 'CustomStartDate',

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
              {'selected={this.state.startDate}'}<br />
              {'onChange={this.handleChange}'}<br />
              <strong>{'locale="en-gb"'}</strong><br />
              {'placeholderText="Weeks start on Monday" />'}
        </code>
      </pre>
      <div className="column">
        <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            locale="en-gb"
            placeholderText="Weeks start on Monday" />
      </div>
    </div>
  }
})
