import React from "react";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";

export default class InjectTimes extends React.Component {
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
            {`
<DatePicker
    selected={this.state.startDate}
    onChange={this.handleChange}`}
            <br />
            <strong>{`    showTimeSelect
    timeFormat="HH:mm"
    injectTimes={[
      dayjs().set('hour', 0).set('minute', 1),
      dayjs().set('hour', 12).set('minute', 5),
      dayjs().set('hour', 23).set('minute', 59)
    ]}
    dateFormat="MMMM DD, YYYY h:mm A"
/>
`}</strong>
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            showTimeSelect
            timeFormat="HH:mm"
            injectTimes={[
              dayjs()
                .set("hour", 0)
                .set("minute", 1),
              dayjs()
                .set("hour", 12)
                .set("minute", 5),
              dayjs()
                .set("hour", 23)
                .set("minute", 59)
            ]}
            dateFormat="MMMM DD, YYYY h:mm A"
          />
        </div>
      </div>
    );
  }
}
