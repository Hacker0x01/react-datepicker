import React from "react";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";

export default class ExcludeTimePeriod extends React.Component {
  state = {
    startDate: dayjs()
      .set("hour", 17)
      .set("minute", 30)
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
              {"  minTime={dayjs().set('hour', 17).set('minute', 0)}"}
              <br />
              {"  maxTime={dayjs().set('hour', 20).set('minute', 30)}"}
              <br />
              {'  dateFormat="MMMM DD, YYYY"'}
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
            minTime={dayjs()
              .set("hour", 17)
              .set("minute", 0)}
            maxTime={dayjs()
              .set("hour", 20)
              .set("minute", 30)}
            dateFormat="MMMM DD, YYYY h:mm A"
          />
        </div>
      </div>
    );
  }
}
