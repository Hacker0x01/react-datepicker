import React from "react";
import DatePicker from "react-datepicker";
import { DateTime } from "luxon";

export default class highlightDatesRanges extends React.Component {
  constructor(props) {
    super(props);
    this.highlightWithRanges = [
      {
        "react-datepicker__day--highlighted-custom-1": [
          DateTime.local().minus(4, "days"),
          DateTime.local().minus(3, "days"),
          DateTime.local().minus(2, "days"),
          DateTime.local().minus(1, "days")
        ]
      },
      {
        "react-datepicker__day--highlighted-custom-2": [
          DateTime.local().plus(1, "days"),
          DateTime.local().plus(2, "days"),
          DateTime.local().plus(3, "days"),
          DateTime.local().plus(4, "days")
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
            {'      DateTime.local().minus(4, "days"),'}
            <br />
            {'      DateTime.local().minus(3, "days"),'}
            <br />
            {'      DateTime.local().minus(2, "days"),'}
            <br />
            {'      DateTime.local().minus(1, "days") ]'}
            <br />
            {"    },"}
            <br />
            {'    { "react-datepicker__day--highlighted-custom-2": ['}
            <br />
            {'      DateTime.local().plus(1, "days"),'}
            <br />
            {'      DateTime.local().plus(2, "days"),'}
            <br />
            {'      DateTime.local().plus(3, "days"),'}
            <br />
            {'      DateTime.local().plus(4, "days") ]'}
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
