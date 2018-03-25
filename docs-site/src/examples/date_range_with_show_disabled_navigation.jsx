import React from "react";
import DatePicker from "react-datepicker";
import { DateTime } from "luxon";

export default class DateRangeWithShowDisabledNavigation extends React.Component {
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
            {`
<DatePicker
  selected={this.state.startDate}
  onChange={this.handleChange}
  minDate={DateTime.local()}
  maxDate={DateTime.local().plus({months: 5})}
  showDisabledMonthNavigation />
</div>

`}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            minDate={DateTime.local()}
            maxDate={DateTime.local().plus({ months: 5 })}
            showDisabledMonthNavigation
          />
        </div>
      </div>
    );
  }
}
