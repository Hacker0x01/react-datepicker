// @flow
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class WeekNumber extends React.Component<{
  weekNumber: number,
  onClick?: Function
}> {
  static propTypes = {
    weekNumber: PropTypes.number.isRequired,
    onClick: PropTypes.func
  };

  handleClick = (event: any) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  render() {
    const weekNumberClasses = {
      "react-datepicker__week-number": true,
      "react-datepicker__week-number--clickable": !!this.props.onClick
    };
    return (
      <div
        className={classnames(weekNumberClasses)}
        aria-label={`week-${this.props.weekNumber}`}
        onClick={this.handleClick}
      >
        {this.props.weekNumber}
      </div>
    );
  }
}
