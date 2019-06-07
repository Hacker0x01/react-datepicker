import React from "react";
import DatePicker from "react-datepicker";

export default class Default extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null
    };
  }

  handleChange = date => {
    this.setState({
      startDate: date,
      isClearable: true
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
/>
`}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            dateFormat="dd/MM/yyyy h:mm:ss aa"
            placeholderText="DD/MM/YYYY HH : MM : AM"
            DateTimePickerTitle="DATE AND TIME"
            DateTimePickerRequired="Required"
          />
        </div>
      </div>
    );
  }
}
