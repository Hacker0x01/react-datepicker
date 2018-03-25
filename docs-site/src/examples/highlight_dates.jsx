import React from "react";
import DatePicker from "react-datepicker";
import { DateTime } from "luxon";

export default class highlightDates extends React.Component {
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
                "highlightDates={[DateTime.local().minus({ days: 7 }), DateTime.local().plus({ days: 7 })]}"
              }
            </strong>
            <br />
            {
              'placeholderText="This highlights a week ago and a week from today" />'
            }
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            highlightDates={[
              DateTime.local().minus({ days: 7 }),
              DateTime.local().plus({ days: 7 })
            ]}
            placeholderText="This highlights a week ago and a week from today"
          />
        </div>
      </div>
    );
  }
}
