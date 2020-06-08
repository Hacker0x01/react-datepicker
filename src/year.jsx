import React from "react";
import PropTypes from "prop-types";
import { getYear } from "./date_utils";
import * as utils from "./date_utils";
import classnames from "classnames";

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
    const yearsList = [];
    const { date } = this.props;
    const endPeriod = Math.ceil(getYear(date) / 12) * 12;
    const startPeriod = endPeriod - 11;
    for (let y = startPeriod; y <= endPeriod; y++) {
      yearsList.push(
        <div
          onClick={ev => {
            this.onYearClick(ev, y);
          }}
          className={classnames("react-datepicker__year", {
            "react-datepicker__year--selected": y === getYear(date)
          })}
          key={y}
        >
          {y}
        </div>
      );
    }
    return <div className="react-datepicker__year-wrapper">{yearsList}</div>;
  }
}
