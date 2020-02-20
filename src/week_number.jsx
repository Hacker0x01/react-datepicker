// @flow
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class WeekNumber extends React.Component<{
  weekNumber: number,
  onClick?: Function,
  ariaLabelPrefix?: string
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
    const { weekNumber, ariaLabelPrefix = "week ", onClick } = this.props;
    const weekNumberClasses = {
      "react-datepicker__week-number": true,
      "react-datepicker__week-number--clickable": !!onClick
    };
    return (
      <div
        className={classnames(weekNumberClasses)}
        aria-label={`${ariaLabelPrefix} ${this.props.weekNumber}`}
        onClick={this.handleClick}
      >
        {weekNumber}
      </div>
    );
  }
}
