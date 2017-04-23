import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

export default class HeroExample extends React.Component {
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
    return <DatePicker
        autoFocus
        selected={this.state.startDate}
        onChange={this.handleChange}
        showTimeSelect
        timeIntervals={30}
        excludeTimes={[moment().hours(17).minutes(0), moment().hours(22).minutes(30), moment().hours(19).minutes(30)]} />
  }
}
