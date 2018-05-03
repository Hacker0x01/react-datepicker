import React from "react";
import PropTypes from "prop-types";

function generateMonths(year, minDate, maxDate) {
  var list = [];
  for (var i = 0; i < 12; i++) {
    let isInRange = true;

    if (minDate) {
      isInRange =
        minDate.year() < year ||
        (minDate.year() === year && minDate.month() <= i);
    }

    if (maxDate && isInRange) {
      isInRange =
        maxDate.year() > year ||
        (maxDate.year() === year && maxDate.month() >= i);
    }

    if (isInRange) {
      list.push(i);
    }
  }

  return list;
}

export default class MonthDropdownOptions extends React.Component {
  static propTypes = {
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    monthNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      monthsList: generateMonths(
        this.props.year,
        this.props.minDate,
        this.props.maxDate
      )
    };
  }

  renderOptions = () => {
    return this.state.monthsList.map(i => (
      <div
        className={
          this.props.month === i
            ? "react-datepicker__month-option --selected_month"
            : "react-datepicker__month-option"
        }
        key={i}
        ref={i}
        onClick={this.onChange.bind(this, i)}
      >
        {this.props.month === i ? (
          <span className="react-datepicker__month-option--selected">✓</span>
        ) : (
          ""
        )}
        {this.props.monthNames[i]}
      </div>
    ));
  };

  onChange = month => this.props.onChange(month);

  handleClickOutside = () => this.props.onCancel();

  render() {
    return (
      <div className="react-datepicker__month-dropdown">
        {this.renderOptions()}
      </div>
    );
  }
}
