import React, { Component } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      startDate: new Date()
    };
  }

  render() {
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange.bind(this)}
      />
    );
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
}

export default App;
