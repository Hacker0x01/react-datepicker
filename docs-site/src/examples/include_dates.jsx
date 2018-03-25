import React from "react";
import DatePicker from "react-datepicker";
import { DateTime } from "luxon";

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
              {
                "includeDates={[DateTime.local(), DateTime.local().plus({ days: 1 })]}"
              }
            </strong>
            <br />
            {'placeholderText="This only includes today and tomorrow" />'}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            includeDates={[
              DateTime.local(),
              DateTime.local().plus({ days: 1 })
            ]}
            placeholderText="This only includes today and tomorrow"
          />
        </div>
      </div>
    );
  }
}
