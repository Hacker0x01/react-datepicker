import React from "react";
import DatePicker from "react-datepicker";
import isAfter from "date-fns/isAfter";

export default class RangeMonthPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date("2014/02/08"),
      endDate: new Date("2014/04/08")
    };
  }

  handleChange = ({ startDate, endDate }) => {
    startDate = startDate || this.state.startDate;
    endDate = endDate || this.state.endDate;

    if (isAfter(startDate, endDate)) {
      endDate = startDate;
    }

    this.setState({ startDate, endDate });
  };

  handleChangeStart = startDate => this.handleChange({ startDate });

  handleChangeEnd = endDate => this.handleChange({ endDate });

  render() {
    return (
      <div className="row">
        <pre className="column example__code">
          <code className="jsx">
            {`
<DatePicker
    selected={this.state.startDate}
    selectsStart
    startDate={this.state.startDate}
    endDate={this.state.endDate}
    dateFormat="MM/yyyy"
    showMonthYearPicker
    onChange={this.handleChangeStart}
/>

<DatePicker
    selected={this.state.endDate}
    selectsEnd
    startDate={this.state.startDate}
    endDate={this.state.endDate}
    dateFormat="MM/yyyy"
    showMonthYearPicker
    onChange={this.handleChangeEnd}
/>
`}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            selectsStart
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            onChange={this.handleChangeStart}
          />
          <DatePicker
            selected={this.state.endDate}
            selectsEnd
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            onChange={this.handleChangeEnd}
          />
        </div>
      </div>
    );
  }
}
