import React from "react";
import DatePicker from "react-datepicker";

export default class CustomDateFormat extends React.Component {
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
            {"<DatePicker"}
            <br />
            <strong>{'dateFormat="yyyy/MM/dd"'}</strong>
            <br />
            {"selected={this.state.startDate}"}
            <br />
            {"onChange={this.handleChange} />"}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            dateFormat="yyyy/MM/dd"
            selected={this.state.startDate}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
