import React from "react";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";

export default class IncludeTimes extends React.Component {
  state = {
    startDate: dayjs()
      .set("hour", 16)
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
              {
                "  includeTimes={[dayjs().set('hour', 17).set('minute', 0), dayjs().set('hour', 18).set('minute', 30), dayjs().set('hour', 19).set('minute', 30)], dayjs().set('hour', 17).set('minute', 30)}"
              }
            </strong>
            <br />
            <strong>{'  dateFormat="MMMM DD, YYYY h:mm A"'}</strong>
            <br />
            {"/>"}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            showTimeSelect
            includeTimes={[
              dayjs()
                .set("hour", 17)
                .set("minute", 0),
              dayjs()
                .set("hour", 18)
                .set("minute", 30),
              dayjs()
                .set("hour", 19)
                .set("minute", 30),
              dayjs()
                .set("hour", 17)
                .set("minute", 30)
            ]}
            dateFormat="MMMM DD, YYYY h:mm A"
          />
        </div>
      </div>
    );
  }
}
