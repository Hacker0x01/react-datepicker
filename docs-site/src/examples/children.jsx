import React from "react";
import DatePicker from "react-datepicker";

export default class Children extends React.Component {
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
>
  <div style={{color: 'red'}}>
    Don't forget to check the weather!
  </div>
</DatePicker>
`}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
          >
            <div style={{ color: "red" }}>
              Don't forget to check the weather!
            </div>
          </DatePicker>
        </div>
      </div>
    );
  }
}
