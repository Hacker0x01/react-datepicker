import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

export default class OneHundredPercentWidth extends React.Component {
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
// container is 100%
<div className="myDatePickerContainer">
  <DatePicker
    selected={this.state.startDate}
    onChange={this.handleChange}
    shouldCloseOnSelect={false}/>
</div>

// in css files
.myDatePickerContainer .react-datepicker-manager,
.myDatePickerContainer .react-datepicker-wrapper,
.myDatePickerContainer .react-datepicker__input-container,
.myDatePickerContainer .react-datepicker__input-container input {
  width: 100%;
}

`}
          </code>
        </pre>
        <div className="column myDatePickerContainer">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            shouldCloseOnSelect={false}
          />
        </div>
      </div>
    );
  }
}
