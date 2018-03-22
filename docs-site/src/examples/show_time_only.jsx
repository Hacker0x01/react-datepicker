import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

export default class ShowTimeOnly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment()
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
    onChange={this.handleChange}`}
            <br />
            <strong>{`    showTimeSelect
    showTimeSelectOnly
    timeIntervals={15}
    dateFormat="LT"
    timeCaption="Time"
/>
`}</strong>
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="LT"/>
        </div>
      </div>
    );
  }
}
