import React from "react";
import DatePicker from "react-datepicker";

export default class ShowTimeOnly extends React.Component {
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
    onChange={this.handleChange}`}
            <br />
            <strong>{`    showTimeSelect
    showTimeSelectOnly
    timeIntervals={15}
    dateFormat="h:mm aa"
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
            dateFormat="h:mm aa"
          />
        </div>
      </div>
    );
  }
}
