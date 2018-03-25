import React from "react";
import DatePicker from "react-datepicker";
import { DateTime } from "luxon";

export default class highlightDatesRanges extends React.Component {
  constructor(props) {
    super(props);
    this.highlightWithRanges = [
      {
        "react-datepicker__day--highlighted-custom-1": [
          DateTime.local().minus({ days: 4 }),
          DateTime.local().minus({ days: 3 }),
          DateTime.local().minus({ days: 2 }),
          DateTime.local().minus({ days: 1 })
        ]
      },
      {
        "react-datepicker__day--highlighted-custom-2": [
          DateTime.local().plus({ days: 1 }),
          DateTime.local().plus({ days: 2 }),
          DateTime.local().plus({ days: 3 }),
          DateTime.local().plus({ days: 4 })
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
            {"      DateTime.local().minus({days: 4}),"}
            <br />
            {"      DateTime.local().minus({days: 3}),"}
            <br />
            {"      DateTime.local().minus({days: 2}),"}
            <br />
            {"      DateTime.local().minus({days: 1}) ]"}
            <br />
            {"    },"}
            <br />
            {'    { "react-datepicker__day--highlighted-custom-2": ['}
            <br />
            {"      DateTime.local().plus({days: 1}),"}
            <br />
            {"      DateTime.local().plus({days: 2}),"}
            <br />
            {"      DateTime.local().plus({days: 3}),"}
            <br />
            {"      DateTime.local().plus({days: 4}) ]"}
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
