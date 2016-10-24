import React from 'react'
import DatePicker from 'react-datepicker'

export default React.createClass({
  displayName: 'Disabled',

  getInitialState () {
    return {
      startDate: null
    }
  },

  handleChange: function (date) {
    this.setState({
      startDate: date
    })
  },

  handleOnBlur: function (date) {
    if (date === null) {
      console.log('selected date: %s', date)
    } else {
      console.log('selected date: %s', date.format('DD/MM/YYYY'))
    }
  },

  render () {
    return <div className="row">
      <pre className="column example__code">
        <code className="js">
          {'handleOnBlur: function (date) {'}<br />
              {'if (date === null) {'}<br />
                  {'console.log("selected date: %s", date);'}<br />
              {'}'}<br />
              {'else {'}<br />
                  {'console.log("selected date: %s", date.format("DD/MM/YYYY"));'}<br />
              {'}'}<br />
          {'};'}
        </code>
        <br />
        <code className="jsx">
          {'<DatePicker'}<br />
              {'key="example9"'}<br />
              {'selected={this.state.startDate}'}<br />
              {'onChange={this.handleChange}'}<br />
              <strong>{'onBlur={this.handleOnBlur}'}</strong><br />
              {'placeholderText="View blur callbacks in console" />'}
        </code>
      </pre>
      <div className="column">
        <DatePicker
            key="example9"
            selected={this.state.startDate}
            onChange={this.handleChange}
            onBlur={this.handleOnBlur}
            placeholderText="View blur callbacks in console" />
      </div>
    </div>
  }
})
