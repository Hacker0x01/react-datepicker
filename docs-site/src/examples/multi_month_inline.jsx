import React from "react";
import DatePicker from "react-datepicker";

export default class MultiMonthInline extends React.Component {
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
    inline
    onChange={this.handleChange}
    monthsShown={2}
/>
`}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            monthsShown={2}
            inline
            onChange={this.handleChange}
            selected={this.state.startDate}
          />
        </div>
      </div>
    );
  }
}
