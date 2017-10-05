import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

export default class OpenByDefault extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment()
    }
  }

  handleChange = (date) => {
    this.setState({
      startDate: date
    })
  }

  render () {
    return <div className="row">
      <pre className="column example__code">
        <code className="jsx">{`
          <DatePicker
            autoFocus
            selected={this.state.startDate}
            onChange={this.handleChange}
          />
          `}
        </code>
      </pre>
      <div className="column">
        <DatePicker
            autoFocus
            selected={this.state.startDate}
            onChange={this.handleChange} />
      </div>
    </div>
  }
}
