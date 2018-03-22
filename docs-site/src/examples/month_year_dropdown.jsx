import React from "react";
import DatePicker from "react-datepicker";
import { DateTime } from "luxon";

export default class MonthYearDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: DateTime.local()
    };
  }

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
            {`
<DatePicker
  selected={this.state.startDate}
  onChange={this.handleChange}
  dateFormatCalendar={"MMM YYYY"}
  minDate={DateTime.local().minus(6, "month")}
  maxDate={DateTime.local().plus(6, "month")}
  showMonthYearDropdown
/>
`}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            dateFormatCalendar={"MMM YYYY"}
            minDate={DateTime.local().minus(6, "month")}
            maxDate={DateTime.local().plus(6, "month")}
            showMonthYearDropdown
          />
        </div>
      </div>
    );
  }
}
