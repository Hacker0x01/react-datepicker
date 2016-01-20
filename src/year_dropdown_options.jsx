import React from "react";

function generateYears(year) {
  var list = [];
  for (var i = 0; i < 5; i++) {
    list.push(year - i);
  }
  return list;
}

var YearDropdownOptions = React.createClass({
  mixins: [require("react-onclickoutside")],

  propTypes: {
    year: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      yearsList: generateYears(this.props.year)
    };
  },

  render() {
    return (
      <div className="datepicker__year-dropdown">
        {this.renderOptions()}
      </div>
    );
  },

  renderOptions() {
    var selectedYear = this.props.year;
    var options = this.state.yearsList.map(year =>
      <div className="datepicker__year-option"
        key={year}
        onClick={this.onChange.bind(this, year)}>
        { selectedYear === year ? <span className="datepicker__year-option--selected">✓</span> : "" }
        { year }
      </div>
    );

    options.unshift(
      <div className="datepicker__year-option"
        ref={"upcoming"}
        key={"upcoming"}
        onClick={this.incrementYears}>
        <a className="datepicker__navigation datepicker__navigation--years datepicker__navigation--years-upcoming"></a>
      </div>
    );
    options.push(
      <div className="datepicker__year-option"
        ref={"previous"}
        key={"previous"}
        onClick={this.decrementYears}>
        <a className="datepicker__navigation datepicker__navigation--years datepicker__navigation--years-previous"></a>
      </div>
    );
    return options;
  },

  onChange(year) {
    this.props.onChange(year);
  },

  handleClickOutside() {
    this.props.onCancel();
  },

  shiftYears(amount) {
    var years = this.state.yearsList.map(function(year) {
      return year + amount;
    });

    this.setState({
      yearsList: years
    });
  },

  incrementYears() {
    return this.shiftYears(4);
  },

  decrementYears() {
    return this.shiftYears(-4);
  }
});

module.exports = YearDropdownOptions;
