import React from "react";
import DatePicker from "react-datepicker";
import addMonths from "date-fns/addMonths";

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
  minDate={new Date()}
  maxDate={addMonths(new Date(), 5)}
  showDisabledMonthNavigation />
</div>

`}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            minDate={new Date()}
            maxDate={addMonths(new Date(), 5)}
            showDisabledMonthNavigation
          />
        </div>
      </div>
    );
  }
}
