import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

export default React.createClass({
  displayName: 'Placement',

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
          &nbsp; &nbsp; {"selected={this.state.startDate}"}<br />
          &nbsp; &nbsp; {"onChange={this.handleChange}"}<br />
          &nbsp; &nbsp; {"popoverAttachment='bottom center'"}<br />
          &nbsp; &nbsp; {"popoverTargetAttachment='top center'"}<br />
          &nbsp; &nbsp; {"popoverTargetOffset='0px 0px' />"}
        </code>
      </pre>
      <div className="column">
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          popoverAttachment='bottom center'
          popoverTargetAttachment='top center'
          popoverTargetOffset='0px 0px' />
      </div>
    </div>
  }
});
