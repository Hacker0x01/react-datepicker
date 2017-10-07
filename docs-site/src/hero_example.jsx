import React from 'react'
import DatePicker from 'react-datepicker'
// import fns from 'date-fns'
import en from 'date-fns/locale/de'

export default class HeroExample extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: new Date()
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
        locale={en}
        useWeekdaysShort
        selected={this.state.startDate}
        onChange={this.handleChange} />
  }
}
