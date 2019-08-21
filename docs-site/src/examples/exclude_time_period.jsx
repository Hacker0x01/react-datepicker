import React from "react";
import DatePicker from "react-datepicker";
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";

export default class ExcludeTimePeriod extends React.Component {
  state = {
    startDate: setHours(setMinutes(new Date(), 30), 17)
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
              {"  minTime={setHours(setMinutes(new Date(), 0), 17)}"}
              <br />
              {"  maxTime={setHours(setMinutes(new Date(), 30), 20)}"}
              <br />
              {'  dateFormat="MMMM d, yyyy"'}
            </strong>
            <br />
            {"/>"}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            showTimeSelect
            minTime={setHours(setMinutes(new Date(), 0), 17)}
            maxTime={setHours(setMinutes(new Date(), 30), 20)}
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>
      </div>
    );
  }
}
