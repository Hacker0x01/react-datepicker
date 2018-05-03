import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

export default class Weekly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment()
    };
  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  render() {
    return (
      <div className="row">
        <pre className="column example__code">
          <code className="jsx">
            {`
<DatePicker
    selected={this.state.startDate}
    onChange={this.handleChange}
    dateFormatCalendar="MMMM"
    peekNextMonth
    showWeekly
    weeklyType
    weeklyDays={[
      '03.21.2018',
      '03.22.2018',
    ]}}
    minYear={'2014'}
    maxYear={'2018'}
    dateFormat="DD MMMM YYYY"
/>
`}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            dateFormatCalendar="MMMM"
            peekNextMonth
            showWeekly 
            weeklyType
            weeklyDays={[
              '03.21.2018',
              '03.22.2018',
            ]}
            minYear={'2014'}
            maxYear={'2018'}
            dateFormat="DD MMMM YYYY"
          />
        </div>
      </div>
    );
  }
}
