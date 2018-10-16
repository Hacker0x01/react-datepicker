import React from "react";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";

export default class highlightDatesRanges extends React.Component {
  constructor(props) {
    super(props);
    this.highlightWithRanges = [
      {
        "react-datepicker__day--highlighted-custom-1": [
          dayjs().subtract(4, "days"),
          dayjs().subtract(3, "days"),
          dayjs().subtract(2, "days"),
          dayjs().subtract(1, "days")
        ]
      },
      {
        "react-datepicker__day--highlighted-custom-2": [
          dayjs().add(1, "days"),
          dayjs().add(2, "days"),
          dayjs().add(3, "days"),
          dayjs().add(4, "days")
        ]
      }
    ];
  }

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
          <code>
            {"constructor (props) {"}
            <br />
            {"  super(props)"}
            <br />
            {"  this.highlightWithRanges = ["}
            <br />
            {'    { "react-datepicker__day--highlighted-custom-1": ['}
            <br />
            {'      dayjs().subtract(4, "days"),'}
            <br />
            {'      dayjs().subtract(3, "days"),'}
            <br />
            {'      dayjs().subtract(2, "days"),'}
            <br />
            {'      dayjs().subtract(1, "days") ]'}
            <br />
            {"    },"}
            <br />
            {'    { "react-datepicker__day--highlighted-custom-2": ['}
            <br />
            {'      dayjs().add(1, "days"),'}
            <br />
            {'      dayjs().add(2, "days"),'}
            <br />
            {'      dayjs().add(3, "days"),'}
            <br />
            {'      dayjs().add(4, "days") ]'}
            <br />
            {"    }"}
            <br />
            {"  ]"}
            <br />
            {"}"}
            <br />
          </code>
          <code className="jsx">
            {"<DatePicker"}
            <br />
            {"selected={this.state.startDate}"}
            <br />
            {"onChange={this.handleChange}"}
            <br />
            <strong>{"highlightDates={this.highlightWithRanges}"}</strong>
            <br />
            {
              'placeholderText="This highlight two ranges with custom classes" />'
            }
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            highlightDates={this.highlightWithRanges}
            placeholderText="This highlight two ranges with custom classes"
          />
        </div>
      </div>
    );
  }
}
