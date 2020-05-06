import React from "react";
import PropTypes from "prop-types";
import { getYear } from "./date_utils";
import * as utils from "./date_utils";

export default class Year extends React.Component {
  static propTypes = {
    date: PropTypes.string,
    onDayClick: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  handleYearClick = (day, event) => {
    if (this.props.onDayClick) {
      this.props.onDayClick(day, event);
    }
  };

  onYearClick = (e, y) => {
    this.handleYearClick(
      utils.getStartOfYear(utils.setYear(this.props.date, y)),
      e
    );
  };

  render() {
    const yearsToShow = 11;
    const yearsList = [];
    const { date } = this.props;
    for (
      let y = getYear(date) - yearsToShow, i = 0;
      y <= getYear(date);
      y++, i++
    ) {
      yearsList.push(
        <div
          onClick={ev => {
            this.onYearClick(ev, y);
          }}
          className="react-datepicker__year-container-text"
          key={y}
        >
          {y}
        </div>
      );
    }
    return <div className="react-datepicker__year-container">{yearsList}</div>;
  }
}
