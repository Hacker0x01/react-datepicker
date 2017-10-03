import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

export default class SetOpen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      startDate: moment(),
      isCalendarOpened: false
    }
  }

  handleChange = (date) => {
    this.setState({
      startDate: date
    })
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    this.setState({
      isCalendarOpened: value
    })
  }

  openCalendar = (open) => {
    this.setState({
      isCalendarOpened: open
    })
  }

  render () {
    return <div className="row">
      <pre className="column example__code">
        <code className="jsx">{`
class ExampleSetOpen extends React.Component {
  ...
  handleInputChange = (event) => {
    this.setState({
      isCalendarOpened: event.target.value
    })
  }
  openCalendar = (open) => {
    this.setState({
      isCalendarOpened: open
    })
  }
  ...
}
  <DatePicker
      isOpen={this.state.isCalendarOpened}
      setOpen={this.openCalendar} />
  <input
      type="checkbox"
      onChange={this.handleInputChange}
      checked={this.state.isCalendarOpened} />
  <label>check to open calendar</label>

          `}
        </code>
      </pre>
      <div className="row">
        <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            isOpen={this.state.isCalendarOpened}
            setOpen={this.openCalendar} />
        <input
            type="checkbox"
            onChange={this.handleInputChange}
            checked={this.state.isCalendarOpened} />
        <label>check to open calendar</label>
      </div>
    </div>
  }

}
