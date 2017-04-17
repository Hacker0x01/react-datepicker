import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

export default class RawChanges extends React.Component {
  state = {
    startDate: null
  }

  handleChange = (date) => {
    this.setState({
      startDate: date
    })
  }

  handleChangeRaw = (value) => {
    if (value === 'tomorrow') {
      this.handleChange(moment().add(1, 'day'))
    }
  }

  render () {
    return <div className="row">
      <pre className="column example__code">
        <code className="jsx">{`
handleChangeRaw(value) {
  if(value === "tomorrow") {
    const tomorrow = moment().add(1, "day")
    this.handleChange(tomorrow)
  }
}
<DatePicker
    selected={this.state.startDate}
    onChange={this.handleChange}
    placeholderText="Enter tomorrow"
    onChangeRaw={(event) =>
      this.handleChangeRaw(event.target.value)}
/>
`}
        </code>
      </pre>
      <div className="column">
        <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            placeholderText='Enter "tomorrow"'
            onChangeRaw={(event) => this.handleChangeRaw(event.target.value)}/>
      </div>
    </div>
  }
}
