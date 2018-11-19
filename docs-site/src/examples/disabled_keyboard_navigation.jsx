import React from "react";
import DatePicker from "react-datepicker";

export default class DisabledKeyboardNavigation extends React.Component {
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
            {"<DatePicker"}
            <br />
            {"selected={this.state.startDate}"}
            <br />
            {"onChange={this.handleChange}"}
            <br />
            <strong>{"disabledKeyboardNavigation"}</strong>
            <br />
            {'placeholderText="This has disabled keyboard navigation" />'}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            disabledKeyboardNavigation
            placeholderText="This has disabled keyboard navigation"
          />
        </div>
      </div>
    );
  }
}
