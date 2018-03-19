import React from "react";
import PropTypes from "prop-types";
import MonthDropdownOptions from "./month_dropdown_options";
import onClickOutside from "react-onclickoutside";
import * as utils from "./date_utils";

const WrappedMonthDropdownOptions = onClickOutside(MonthDropdownOptions);

export default class MonthDropdown extends React.Component {
  static propTypes = {
    dropdownMode: PropTypes.oneOf(["scroll", "select"]).isRequired,
    locale: PropTypes.string,
    dateFormat: PropTypes.string.isRequired,
    month: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    useShortMonthInDropdown: PropTypes.bool
  };

  state = {
    dropdownVisible: false
  };

  renderSelectOptions = monthNames =>
    monthNames.map((M, i) => (
      <option key={i} value={i}>
        {M}
      </option>
    ));

  renderSelectMode = monthNames => (
    <select
      value={this.props.month}
      className="react-datepicker__month-select"
      onChange={e => this.onChange(e.target.value)}
    >
      {this.renderSelectOptions(monthNames)}
    </select>
  );

  renderReadView = (visible, monthNames) => (
    <div
      key="read"
      style={{ visibility: visible ? "visible" : "hidden" }}
      className="react-datepicker__month-read-view"
      onClick={this.toggleDropdown}
    >
      <span className="react-datepicker__month-read-view--down-arrow" />
      <span className="react-datepicker__month-read-view--selected-month">
        {monthNames[this.props.month]}
      </span>
    </div>
  );

  renderDropdown = monthNames => (
    <WrappedMonthDropdownOptions
      key="dropdown"
      ref="options"
      month={this.props.month}
      monthNames={monthNames}
      onChange={this.onChange}
      onCancel={this.toggleDropdown}
    />
  );

  renderScrollMode = monthNames => {
    const { dropdownVisible } = this.state;
    let result = [this.renderReadView(!dropdownVisible, monthNames)];
    if (dropdownVisible) {
      result.unshift(this.renderDropdown(monthNames));
    }
    return result;
  };

  onChange = month => {
    this.toggleDropdown();
    if (month !== this.props.month) {
      this.props.onChange(month);
    }
  };

  toggleDropdown = () =>
    this.setState({
      dropdownVisible: !this.state.dropdownVisible
    });

  render() {
    const localeData = utils.getLocaleDataForLocale(this.props.locale);
    const monthNames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
      this.props.useShortMonthInDropdown
        ? M => utils.getMonthShortInLocale(localeData, utils.newDate({ M }))
        : M =>
            utils.getMonthInLocale(
              localeData,
              utils.newDate({ M }),
              this.props.dateFormat
            )
    );

    let renderedDropdown;
    switch (this.props.dropdownMode) {
      case "scroll":
        renderedDropdown = this.renderScrollMode(monthNames);
        break;
      case "select":
        renderedDropdown = this.renderSelectMode(monthNames);
        break;
    }

    return (
      <div
        className={`react-datepicker__month-dropdown-container react-datepicker__month-dropdown-container--${
          this.props.dropdownMode
        }`}
      >
        {renderedDropdown}
      </div>
    );
  }
}
