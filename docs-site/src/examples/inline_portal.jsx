import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

export default React.createClass({
  displayName: 'Inline portal version',

  getInitialState () {
    return {
      startDate: moment(),
      isOpen: false
    }
  },

  handleChange (date) {
    this.setState({startDate: date})
    this.toggleCalendar()
  },

  toggleCalendar (e) {
    e && e.preventDefault()
    this.setState({isOpen: !this.state.isOpen})
  },

  render () {
    return <div className="row">
      <pre className="column example__code">
        <code className="jsx">
          {'handleChange (date) {'}<br />
          {'  this.setState({startDate: date})'}<br />
          {'  this.toggleCalendar()'}<br />
          {'},'}<br />
          <br />
          {'toggleCalendar (e) {'}<br />
          {'  e && e.preventDefault()'}<br />
          {'  this.setState({isOpen: !this.state.isOpen})'}<br />
          {'},'}<br />
          <br />
          {'<div>'}<br />
          {'    <button'}<br />
          {'        className="example-custom-input"'}<br />
          {'        onClick={this.toggleCalendar}>'}<br />
          {'        {this.state.startDate.format("DD-MM-YYYY")}'}<br />
          {'    </button>'}<br />
          {'    {'}<br />
          {'        this.state.isOpen && ('}<br />
          {'            <DatePicker'}<br />
          {'                selected={this.state.startDate}'}<br />
          {'                onChange={this.handleChange}'}<br />
          {'                withPortal'}<br />
          {'                inline />'}<br />
          {'        )'}<br />
          {'    }'}<br />
          {'</div>'}
        </code>
      </pre>
      <div className="column">
        <button className="example-custom-input" onClick={this.toggleCalendar}>
          {this.state.startDate.format('DD-MM-YYYY')}
        </button>
        {
            this.state.isOpen && (
              <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleChange}
                  withPortal
                  inline />
            )
        }
      </div>
    </div>
  }
})
