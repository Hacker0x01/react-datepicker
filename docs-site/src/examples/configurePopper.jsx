import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

export default class ConfigurePopper extends React.Component {
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
    popperPlacement="top-end"
    popperModifiers={{
      offset: {
        enabled: true,
        offset: '5px, 10px'
      },
      preventOverflow: {
        enabled: true,
        escapeWithReference: false, // force popper to stay in viewport (even when input is scrolled out of view)
        boundariesElement: 'viewport'
      }
    }}
/>
`}
        </code>
      </pre>
      <div className="column">
        <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            popperPlacement="top-end"
            popperModifiers={{
              offset: {
                enabled: true,
                offset: '5px, 10px'
              },
              preventOverflow: {
                enabled: true,
                escapeWithReference: false,
                boundariesElement: 'viewport'
              }
            }}/>
      </div>
    </div>
  }
}
