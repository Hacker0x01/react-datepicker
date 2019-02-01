import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";

registerLocale("en-GB", enGB);

export default class CustomStartDate extends React.Component {
  state = {
    startDate: null
  };

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
            {"// Note: Make sure to npm install the right version of date-fns as"}
            <br />
            {"// specified in packaged.json. The default one may not be compatiable"}
            <br />
            {"// npm install --save date-fns@version"}
            <br />
            {"import enGB from 'date-fns/locale/en-GB';"}
            <br />
            {"registerLocale('en-GB', enGB);"}
            <br />
            <br />
            {"<DatePicker"}
            <br />
            {"  selected={this.state.startDate}"}
            <br />
            {"  onChange={this.handleChange}"}
            <br />
            <strong>{'  locale="en-GB"'}</strong>
            <br />
            {'  placeholderText="Weeks start on Monday" />'}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            locale="en-GB"
            placeholderText="Weeks start on Monday"
          />
        </div>
      </div>
    );
  }
}
