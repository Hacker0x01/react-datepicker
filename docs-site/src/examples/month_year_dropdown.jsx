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
  minDate={DateTime.local().minus({ month: 6 })}
  maxDate={DateTime.local().plus({ month: 6 })}
  { MonthYearDropdown: 6 }/>
`}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            dateFormatCalendar={"MMM YYYY"}
            minDate={DateTime.local().minus({ month: 6 })}
            maxDate={DateTime.local().plus({ month: 6 })}
            showMonthYearDropdown
          />
        </div>
      </div>
    );
  }
}
