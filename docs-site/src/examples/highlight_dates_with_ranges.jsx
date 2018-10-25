import React from "react";
import DatePicker from "react-datepicker";
import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";

export default class highlightDatesRanges extends React.Component {
  constructor(props) {
    super(props);
    this.highlightWithRanges = [
      {
        "react-datepicker__day--highlighted-custom-1": [
          subDays(new Date(), 4),
          subDays(new Date(), 3),
          subDays(new Date(), 2),
          subDays(new Date(), 1)
        ]
      },
      {
        "react-datepicker__day--highlighted-custom-2": [
          addDays(new Date(), 1),
          addDays(new Date(), 2),
          addDays(new Date(), 3),
          addDays(new Date(), 4)
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
            {"      subDays(new Date(), 4),"}
            <br />
            {"      subDays(new Date(), 3),"}
            <br />
            {"      subDays(new Date(), 2),"}
            <br />
            {"      subDays(new Date(), 1) ]"}
            <br />
            {"    },"}
            <br />
            {'    { "react-datepicker__day--highlighted-custom-2": ['}
            <br />
            {"      addDays(new Date(), 1),"}
            <br />
            {"      addDays(new Date(), 2),"}
            <br />
            {"      addDays(new Date(), 3),"}
            <br />
            {"      addDays(new Date(), 4) ]"}
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
