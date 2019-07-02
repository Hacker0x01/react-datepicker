import React from "react";
import DatePicker from "react-datepicker";

export default class OnInputErrorCallback extends React.Component {
  state = {
    date: null
  };

  handleChange = date => {
    this.setState({
      date
    });
  };

  render() {
    return (
      <div className="row">
        <pre className="column example__code">
          <br />
          <code className="jsx">
            {`
<DatePicker
  selected={this.state.date}
  onChange={this.handleChange}
  onInputError={(error)=>console.log(error)}
/>
`}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.date}
            onChange={this.handleChange}
            onInputError={error => console.log(error)}
          />
        </div>
      </div>
    );
  }
}
