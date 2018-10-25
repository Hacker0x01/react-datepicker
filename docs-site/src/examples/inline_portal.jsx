import React from "react";
import DatePicker from "react-datepicker";
import format from "date-fns/format";

export default class InlinePortalVersion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      isOpen: false
    };
  }

  handleChange = date => {
    this.setState({ startDate: date });
    this.toggleCalendar();
  };

  toggleCalendar = e => {
    e && e.preventDefault();
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div className="row">
        <pre className="column example__code">
          <code className="jsx">
            {`
handleChange (date) {
  this.setState({startDate: date})
  this.toggleCalendar()
}

toggleCalendar (e) {
  e && e.preventDefault()
  this.setState({isOpen: !this.state.isOpen})
}

<div>
    <button
        className="example-custom-input"
        onClick={this.toggleCalendar}>
        {format(this.state.startDate, "dd-MM-yyyy")}
    </button>
    {
        this.state.isOpen && (
            <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                withPortal
                inline />
        )
    }
</div>
`}
          </code>
        </pre>
        <div className="column">
          <button
            className="example-custom-input"
            onClick={this.toggleCalendar}
          >
            {format(this.state.startDate, "dd-MM-yyyy")}
          </button>
          {this.state.isOpen && (
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
              withPortal
              inline
            />
          )}
        </div>
      </div>
    );
  }
}
