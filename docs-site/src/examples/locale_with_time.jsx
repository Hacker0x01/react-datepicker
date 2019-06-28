import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";

registerLocale("pt-BR", ptBR);

export default class LocaleWithTime extends React.Component {
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
            {"import DatePicker, { registerLocale } from 'react-datepicker';"}
            <br />
            {"import ptBR from 'date-fns/locale/pt-BR';"}
            <br />
            {"registerLocale('pt-BR', ptBR);"}
            <br />
            <br />
            {"<DatePicker"}
            <br />
            {"  selected={this.state.startDate}"}
            <br />
            {"  onChange={this.handleChange}"}
            <br />
            <strong>{'  locale="pt-BR"'}</strong>
            <br />
            <strong>{"  showTimeSelect"}</strong>
            <br />
            <strong>{'  timeFormat="p"'}</strong>
            <br />
            <strong>{"  timeIntervals={15}"}</strong>
            <br />
            <strong>{'  dateFormat="Pp"'}</strong>
            <br />
            {"/>"}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            locale="pt-BR"
            showTimeSelect
            timeFormat="p"
            timeIntervals={15}
            dateFormat="Pp"
          />
        </div>
      </div>
    );
  }
}
