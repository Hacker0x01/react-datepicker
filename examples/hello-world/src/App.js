import React, { Component } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class App extends Component {
  state = {
    startDate: new Date(),
  };

  handleChange = (startDate) => {
    this.setState({
      startDate,
    });
  };

  render() {
    const { startDate } = this.state;
    return <DatePicker selected={startDate} onChange={this.handleChange} />;
  }
}

export default App;
