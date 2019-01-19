import React from "react";
import DatePicker from "react-datepicker";
import addMonths from "date-fns/addMonths";
import subMonths from "date-fns/subMonths";

export default class MonthYearDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
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
  dateFormatCalendar={"MMM yyyy"}
  minDate={subMonths(new Date(), 6)}
  maxDate={addMonths(new Date(), 6)}
  showMonthYearDropdown
/>
`}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            dateFormatCalendar={"MMM yyyy"}
            minDate={subMonths(new Date(), 6)}
            maxDate={addMonths(new Date(), 6)}
            showMonthYearDropdown
          />
        </div>
      </div>
    );
  }
}
