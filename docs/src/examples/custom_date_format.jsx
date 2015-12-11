import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

export default React.createClass({
  displayName: 'CustomDateFormat',

  getInitialState() {
    return {
      startDate: moment(),
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
        <strong>&nbsp; &nbsp; {"dateFormat=\"YYYY/MM/DD\""}</strong><br />
          &nbsp; &nbsp; {"selected={this.state.startDate}"}<br />
          &nbsp; &nbsp; {"onChange={this.handleChange} />"}
        </code>
      </pre>
      <div className="column">
        <DatePicker
          dateFormat="YYYY/MM/DD"
          selected={this.state.startDate}
          onChange={this.handleChange} />
      </div>
    </div>
  }
});
