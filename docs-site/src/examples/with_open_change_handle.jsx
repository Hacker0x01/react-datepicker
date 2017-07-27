import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

export default class WithOpenChangeHandle extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment(),
      isOpen: false
    }
  }

  handleChange = (date) => {
    this.setState({
      startDate: date
    })
  }

  handleOpenChange = (open) => {
    this.setState({
      isOpen: open
    })
  }

  render () {
    return <div className="row">
      <pre className="column example__code">
        <code className="jsx">{`
<DatePicker
    selected={this.state.startDate}
    onChange={this.handleChange}
    onOpenChange={this.handleOpenChange}
/>
`}
        </code>
      </pre>
      <div className="column">
        <DatePicker
            ref={(el) => { this.datePicker = el }}
            selected={this.state.startDate}
            onChange={this.handleChange}
            onOpenChange={this.handleOpenChange} />
        Status: {this.state.isOpen.toString()}
      </div>
    </div>
  }
}
