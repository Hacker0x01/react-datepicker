import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

export default React.createClass({
  displayName: 'Default',

  getInitialState () {
    return {
      startDate: null
    }
  },

  handleChange (date) {
    this.setState({
      startDate: date
    })
  },

  handleChangeRaw (value) {
    if (value === 'tomorrow') {
      this.handleChange(moment().add(1, 'day'))
    }
  },

  render () {
    return <div className="row">
      <pre className="column example__code">
        <code className="jsx">
          {'handleChangeRaw(value) {'}<br />
          {'  if(value === "tomorrow") {'}<br />
          {'    const tomorrow = moment().add(1, "day")'}<br />
          {'    this.handleChange(tomorrow)'}<br />
          {'  }'}<br />
          {'}'}<br />
          {'<DatePicker'}<br />
          {'    selected={this.state.startDate}'}<br />
          {'    onChange={this.handleChange}'}<br />
          {'    placeholderText="Enter tomorrow"'}<br />
          {'    onChangeRaw={(event) => '}<br />
          {'    this.handleChangeRaw(event.target.value)'}<br />
          {'/>'}
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
})
