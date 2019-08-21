import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import fi from "date-fns/locale/fi";

export default class LocaleWithoutGlobalVariable extends React.Component {
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
            {
              "// Note: Make sure to npm install the right version of date-fns as"
            }
            <br />
            {
              "// specified in packaged.json. The default one may not be compatiable"
            }
            <br />
            {"// npm install --save date-fns@version"}
            <br />
            {"import DatePicker from 'react-datepicker';"}
            <br />
            {"import fi from 'date-fns/locale/fi';"}
            <br />
            <br />
            {"<DatePicker"}
            <br />
            {"  selected={this.state.startDate}"}
            <br />
            {"  onChange={this.handleChange}"}
            <br />
            <strong>{"  locale={fi}"}</strong>
            <br />
            {"/>"}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            locale={fi}
          />
        </div>
      </div>
    );
  }
}
