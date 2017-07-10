import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

export default class highlightDatesRanges extends React.Component {
  constructor (props) {
    super(props)
    this.highlightWithRanges = [
      { 'react-datepicker__day--highlighted-custom-1': [
        moment().subtract(4, 'days'),
        moment().subtract(3, 'days'),
        moment().subtract(2, 'days'),
        moment().subtract(1, 'days') ]
      },
      { 'react-datepicker__day--highlighted-custom-2': [
        moment().add(1, 'days'),
        moment().add(2, 'days'),
        moment().add(3, 'days'),
        moment().add(4, 'days') ]
      }
    ]
  }

  state = {
    startDate: null
  }

  handleChange = (date) => {
    this.setState({
      startDate: date
    })
  }

  render () {
    return <div className="row">
      <pre className="column example__code">
        <code>
          { 'constructor (props) {' }<br />
          { '  super(props)' }<br />
          { '  this.highlightWithRanges = [' }<br />
          { '    { "react-datepicker__day--highlighted-custom-1": [' }<br />
          { '      moment().subtract(4, "days"),' }<br />
          { '      moment().subtract(3, "days"),' }<br />
          { '      moment().subtract(2, "days"),' }<br />
          { '      moment().subtract(1, "days") ]' }<br />
          { '    },' }<br />
          { '    { "react-datepicker__day--highlighted-custom-2": [' }<br />
          { '      moment().add(1, "days"),' }<br />
          { '      moment().add(2, "days"),' }<br />
          { '      moment().add(3, "days"),' }<br />
          { '      moment().add(4, "days") ]' }<br />
          { '    }' }<br />
          { '  ]' }<br />
          { '}' }<br />
        </code>
        <code className="jsx">
          {'<DatePicker'}<br />
              {'selected={this.state.startDate}'}<br />
              {'onChange={this.handleChange}'}<br />
              <strong>{'highlightDates={this.highlightWithRanges}'}</strong><br />
              {'placeholderText="This highlight two ranges with custom classes" />'}
        </code>
      </pre>
      <div className="column">
        <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            highlightDates={this.highlightWithRanges}
            placeholderText="This highlight two ranges with custom classes" />
      </div>
    </div>
  }
}

