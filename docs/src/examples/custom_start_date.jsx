import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

export default React.createClass({
  displayName: 'CustomStartDate',

  getInitialState() {
    return {
      startDate: null,
    };
  },

  handleChange(date) {
    this.setState({
      startDate: date
    });
  },

  render() {
    return <div className="row">
      <pre className="column example__code">
        <code className="jsx">
          {"<DatePicker"}<br />
          &nbsp; &nbsp; {"selected={this.state.startDate}"}<br />
          &nbsp; &nbsp; {"onChange={this.handleChange}"}<br />
          <strong>&nbsp; &nbsp; {"weekStart='0'"}</strong><br />
          &nbsp; &nbsp; {"placeholderText='I start on Sunday!' />"}
        </code>
      </pre>
      <div className="column">
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          weekStart="0"
          placeholderText="I start on Sunday!" />
      </div>
    </div>
  }
});
