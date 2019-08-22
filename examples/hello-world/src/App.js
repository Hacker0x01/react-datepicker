import React, { Component } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class App extends Component {
  state = {
    startDate: new Date()
  };

  render() {
    const { startDate } = this.state;
    return <DatePicker selected={startDate} onChange={this.handleChange} />;
  }

  handleChange = startDate => {
    this.setState({
      startDate
    });
  };
}

export default App;
