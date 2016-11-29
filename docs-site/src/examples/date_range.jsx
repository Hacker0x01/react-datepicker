var React = require('react')
var DatePicker = require('react-datepicker')
var moment = require('moment')

var DateRange = React.createClass({
  displayName: 'DateRange',

  getInitialState: function () {
    return {
      startDate: moment('2014-02-08'),
      endDate: moment('2014-02-10')
    }
  },

  handleChange: function ({ startDate, endDate }) {
    startDate = startDate || this.state.startDate
    endDate = endDate || this.state.endDate

    if (startDate.isAfter(endDate)) {
      var temp = startDate
      startDate = endDate
      endDate = temp
    }

    this.setState({ startDate, endDate })
  },

  handleChangeStart: function (startDate) {
    this.handleChange({ startDate })
  },

  handleChangeEnd: function (endDate) {
    this.handleChange({ endDate })
  },

  render: function () {
    return <div className="row">
      <pre className="column example__code">
        <code className="jsx">
          {'<DatePicker'}<br />
              {'selected={this.state.startDate}'}<br />
              {'selectsStart'}
              {'startDate={this.state.startDate}'}<br />
              {'endDate={this.state.endDate}'}<br />
              {'onChange={this.handleChangeStart} />'}<br />
          {'<DatePicker'}<br />
              {'selected={this.state.endDate}'}<br />
              {'selectsEnd'}
              {'startDate={this.state.startDate}'}<br />
              {'endDate={this.state.endDate}'}<br />
              {'onChange={this.handleChangeEnd} />'}<br />
        </code>
      </pre>
      <div className="column">
        <DatePicker
            selected={this.state.startDate}
            selectsStart
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeStart} />
        <DatePicker
            selected={this.state.endDate}
            selectsEnd
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeEnd} />
      </div>
    </div>
  }
})

module.exports = DateRange
