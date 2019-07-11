import React from "react";
import DatePicker from "react-datepicker";
import getDate from "date-fns/getDate";

export default class CustomTimeClassNames extends React.Component {
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

  handleColor = time => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  render() {
    return (
      <div className="row">
        <pre className="column example__code">
          <code className="jsx">
            {`
              <DatePicker
                showTimeSelect
                selected={this.state.startDate}
                onChange={this.handleChange}
                timeClassName={ time => time.getHours() > 12 ? 'text-success' : 'text-error' }
              />
            `}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            showTimeSelect
            selected={this.state.startDate}
            onChange={this.handleChange}
            timeClassName={this.handleColor}
          />
        </div>
      </div>
    );
  }
}
