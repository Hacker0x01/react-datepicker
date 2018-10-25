import React from "react";
import DatePicker from "react-datepicker";
import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";

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
                "highlightDates={[subDays(new Date(), 7), addDays(new Date(), 7)]}"
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
            highlightDates={[subDays(new Date(), 7), addDays(new Date(), 7)]}
            placeholderText="This highlights a week ago and a week from today"
          />
        </div>
      </div>
    );
  }
}
