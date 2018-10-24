import React from "react";
import DatePicker from "react-datepicker";

export default class OpenToDate extends React.Component {
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
    openToDate={new Date("1993/09/28")}
    selected={this.state.startDate}
    onChange={this.handleChange}
/>
`}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            openToDate={new Date("1993/09/28")}
            selected={this.state.startDate}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
