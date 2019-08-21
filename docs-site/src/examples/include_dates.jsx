import React from "react";
import DatePicker from "react-datepicker";
import addDays from "date-fns/addDays";

export default class includeDates extends React.Component {
  state = {
    startDate: null
  };

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  render() {
    return (
      <div className="row">
        <pre className="column example__code">
          <code className="jsx">
            {"<DatePicker"}
            <br />
            {"selected={this.state.startDate}"}
            <br />
            {"onChange={this.handleChange}"}
            <br />
            <strong>
              {"includeDates={[new Date(), addDays(new Date(), 1)]}"}
            </strong>
            <br />
            {'placeholderText="This only includes today and tomorrow" />'}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            includeDates={[new Date(), addDays(new Date(), 1)]}
            placeholderText="This only includes today and tomorrow"
          />
        </div>
      </div>
    );
  }
}
