import React from "react";
import DatePicker from "react-datepicker";

export default class ReadOnly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null
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
            {"  selected={this.state.startDate}"}
            <br />
            {"  onChange={this.handleChange}"}
            <br />
            <strong>{"  readOnly={true}"}</strong>
            <br />
            {'  placeholderText="This is readOnly"'} />
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            placeholderText="This is readOnly"
            readOnly
          />
        </div>
      </div>
    );
  }
}
