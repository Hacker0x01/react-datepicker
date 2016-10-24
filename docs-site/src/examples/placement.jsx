import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

export default React.createClass({
  displayName: 'Placement',

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
              {'onChange={this.handleChange}'}<br />
              {'popoverAttachment="bottom center"'}<br />
              {'popoverTargetAttachment="top center"'}<br />
              {'popoverTargetOffset="0px 0px" />'}
        </code>
      </pre>
      <div className="column">
        <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            popoverAttachment="bottom center"
            popoverTargetAttachment="top center"
            popoverTargetOffset="0px 0px" />
      </div>
    </div>
  }
})
