import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

export default React.createClass({
  displayName: 'Events',

  getInitialState () {
    return {
      startDate: moment(),
      clicked: null,
      hovered: null
    }
  },

  handleChange (date) {
    this.setState({ startDate: date })
  },

  handleDayClick (date) {
    this.setState({ clicked: date })
  },

  handleDayHover (date) {
    this.setState({ hovered: date })
  },

  render () {
    return <div className="row">
      <pre className="column example__code">
        <code className="jsx">
          {"<DatePicker"}<br />
              {"selected={this.state.startDate}"}<br />
              {"onDayClick={this.handleDayClick}"}<br />
              {"onDayHover={this.handleDayHover}"}<br />
              {"onChange={this.handleChange} />"}
        </code>
      </pre>
      <div className="column">
        <DatePicker
            selected={this.state.startDate}
            onDayClick={this.handleDayClick}
            onDayHover={this.handleDayHover}
            onChange={this.handleChange} />

        <div className="example__text">
          <p>Last click : {this.state.clicked && this.state.clicked.format('L')}</p>
          <p>Last hover : {this.state.hovered && this.state.hovered.format('L')}</p>
        </div>
      </div>
    </div>
  }
})
