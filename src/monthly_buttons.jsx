import React from "react";
import PropTypes from "prop-types";

export default class MonthlyButtons extends React.Component {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    month: PropTypes.number.isRequired,
    monthNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  };

  renderButtons = () => {
    return this.props.monthNames.map((month, i) => (
      <div className={this.props.month === i ? 'react-datepicker__month-button --selected_month' : 'react-datepicker__month-button'}
        key={month}
        ref={month}
        onClick={this.onChange.bind(this, i)}>
        {month}
      </div>
    ));
  };

  onChange = month => this.props.onChange(month);

  handleClickOutside = () => this.props.onCancel();

  render() {
    return (
      <div className="react-datepicker__month-buttons">
        {this.renderButtons()}
      </div>
    );
  }
}
