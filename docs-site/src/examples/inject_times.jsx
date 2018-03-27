import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

export default class InjectTimes extends React.Component {
  state = {
    startDate: moment()
      .hours(16)
      .minutes(30)
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
      moment().hours(0).minutes(1),
      moment().hours(12).minutes(5),
      moment().hours(23).minutes(59)
    ]}
    dateFormat="LLL"
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
              moment()
                .hours(0)
                .minutes(1),
              moment()
                .hours(12)
                .minutes(5),
              moment()
                .hours(23)
                .minutes(59)
            ]}
            dateFormat="LLL"
          />
        </div>
      </div>
    );
  }
}
