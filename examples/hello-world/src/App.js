import React, { Component } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class App extends Component {
  state = {
    selectedDate: new Date(),
  };

  render() {
    const { selectedDate } = this.state;
    return <DatePicker selected={selectedDate} onChange={this.handleChange} />;
  }

  handleChange = (selectedDate) => {
    this.setState({
      selectedDate,
    });
  };
}

export default App;
