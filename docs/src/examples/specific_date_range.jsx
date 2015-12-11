import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

export default React.createClass({
  displayName: 'SpecificDateRange',

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
          <strong>&nbsp; &nbsp; {"minDate={moment()}"}</strong><br />
          <strong>&nbsp; &nbsp; {"maxDate={moment().add(5, 'days')}"}</strong><br />
          &nbsp; &nbsp; {"placeholderText=\"Select a date between today and 5 days in the future\" />"}
        </code>
      </pre>
      <div className="column">
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          minDate={moment()}
          maxDate={moment().add(5, 'days')}
          placeholderText="Select a date between today and 5 days in the future" />
      </div>
    </div>
  }
});
