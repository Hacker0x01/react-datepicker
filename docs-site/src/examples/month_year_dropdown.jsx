import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

export default class MonthYearDropdown extends React.Component {
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
  dateFormatCalendar={"MMM YYYY"}
  minDate={moment().subtract(6, "month")}
  maxDate={moment().add(6, "month")}
  showMonthYearDropdown
/>
`}
        </code>
      </pre>
      <div className="column">
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          dateFormatCalendar={"MMM YYYY"}
          minDate={moment().subtract(6, "month")}
          maxDate={moment().add(6, "month")}
          showMonthYearDropdown
        />
      </div>
    </div>
  }
}
