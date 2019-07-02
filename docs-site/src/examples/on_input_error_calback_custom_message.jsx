import React from "react";
import DatePicker from "react-datepicker";

export default class OnInputErrorCallbackCustomMessage extends React.Component {
  state = {
    dateA: null
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
  errors={{
    dateInvalid: 'Custom invalid error',
    dateOutOfBounds: 'Custom out of bounds error'
  }}
   maxDate={new Date()}
/>
`}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.date}
            onChange={this.handleChange}
            onInputError={error => console.log(error)}
            errors={{
              dateInvalid: "Custom invalid error",
              dateOutOfBounds: "Custom out of bounds error"
            }}
            maxDate={new Date()}
          />
        </div>
      </div>
    );
  }
}
