import React from "react";
import DatePicker from "react-datepicker";
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";

export default class InjectTimes extends React.Component {
  state = {
    startDate: setHours(setMinutes(new Date(), 30), 16)
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
      setHours(setMinutes(new Date(), 1), 0),
      setHours(setMinutes(new Date(), 5), 12),
      setHours(setMinutes(new Date(), 59), 23)
    ]}
    dateFormat="MMMM d, yyyy h:mm aa"
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
              setHours(setMinutes(new Date(), 1), 0),
              setHours(setMinutes(new Date(), 5), 12),
              setHours(setMinutes(new Date(), 59), 23)
            ]}
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>
      </div>
    );
  }
}
