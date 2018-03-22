import React from "react";
import DatePicker from "react-datepicker";
import { DateTime } from "luxon";

export default class ExcludeTimes extends React.Component {
  state = {
    startDate: DateTime.local().set({
      hours: 16,
      minutes: 30
    })
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
            {"  selected={this.state.startDate}"}
            <br />
            {"  onChange={this.handleChange}"}
            <br />
            <strong>
              {"  showTimeSelect"}
              <br />
              {
                "  excludeTimes={[DateTime.local().hours(17).minutes(0), DateTime.local().hours(18).minutes(30), DateTime.local().hours(19).minutes(30)], DateTime.local().hours(17).minutes(30)}"
              }
            </strong>
            <br />
            <strong>{'  dateFormat="LLL"'}</strong>
            <br />
            {"/>"}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            showTimeSelect
            excludeTimes={[
              DateTime.local().set({
                hours: 17,
                minutes: 0
              }),
              DateTime.local().set({
                hours: 18,
                minutes: 30
              }),
              DateTime.local().set({
                hours: 19,
                minutes: 30
              }),
              DateTime.local().set({
                hours: 17,
                minutes: 30
              })
            ]}
            dateFormat="LLL"
          />
        </div>
      </div>
    );
  }
}
