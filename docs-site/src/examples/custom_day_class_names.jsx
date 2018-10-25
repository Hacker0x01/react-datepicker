import React from "react";
import DatePicker from "react-datepicker";
import getDate from "date-fns/getDate";

export default class CustomDayClassNames extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
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
  dayClassName={date => getDate(date) < Math.random() * 31 ? 'random' : undefined} />
/>
`}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            dayClassName={date =>
              getDate(date) < Math.random() * 31 ? "random" : undefined
            }
          />
        </div>
      </div>
    );
  }
}
