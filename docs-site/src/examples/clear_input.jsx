import React from "react";
import DatePicker from "react-datepicker";

export default class ClearInput extends React.Component {
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
          <code className="jsx">{`
<DatePicker
  selected={this.state.startDate}
  onChange={this.handleChange }
  isClearable={true}
  placeholderText="I have been cleared!"
/>
`}</code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            isClearable
            placeholderText="I have been cleared!"
          />
        </div>
      </div>
    );
  }
}
