import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

export default class MultiMonthDrp extends React.Component {
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
    selected={this.state.startDate}
    onChange={this.handleChange}
    showYearDropdown
    monthsShown={2}
/>
`}
        </code>
      </pre>
      <div className="column">
        <DatePicker
            monthsShown={2}
            onChange={this.handleChange}
            showYearDropdown
            selected={this.state.startDate} />
      </div>
    </div>
  }
}
