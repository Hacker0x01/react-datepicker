import React from "react";
import DatePicker from "react-datepicker";
import format from "date-fns/format";
import isValid from "date-fns/isValid";

export default class Disabled extends React.Component {
  state = {
    startDate: null
  };

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  handleOnBlur = event => {
    const date = new Date(event.target.value);
    if (isValid(date)) {
      console.log("date: %s", format(date, "dd/MM/yyyy"));
    } else {
      console.log("value: %s", date);
    }
  };

  render() {
    return (
      <div className="row">
        <pre className="column example__code">
          <code className="js">
            {`
handleOnBlur: function (event) {
    const date = new Date(event.target.value);
    if (isValid(date)) {
      console.log("date: %s", format(date, "dd/MM/yyyy"));
    } else {
      console.log("value: %s", date);
    }
};'}
`}
          </code>
          <br />
          <code className="jsx">
            {"<DatePicker"}
            <br />
            {'key="example9"'}
            <br />
            {"selected={this.state.startDate}"}
            <br />
            {"onChange={this.handleChange}"}
            <br />
            <strong>{"onBlur={this.handleOnBlur}"}</strong>
            <br />
            {'placeholderText="View blur callbacks in console" />'}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            key="example9"
            selected={this.state.startDate}
            onChange={this.handleChange}
            onBlur={this.handleOnBlur}
            placeholderText="View blur callbacks in console"
          />
        </div>
      </div>
    );
  }
}
