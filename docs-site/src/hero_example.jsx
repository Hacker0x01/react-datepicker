import React from "react";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";

export default class HeroExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: dayjs()
    };
  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  render() {
    return (
      <DatePicker
        autoFocus
        selected={this.state.startDate}
        onChange={this.handleChange}
      />
    );
  }
}
