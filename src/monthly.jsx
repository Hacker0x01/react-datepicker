import React from "react";
import PropTypes from "prop-types";
import MonthlyButtons from "./monthly_buttons";
import onClickOutside from "react-onclickoutside";
import * as utils from "./date_utils";

const WrappedMonthlyButtons = onClickOutside(MonthlyButtons);

export default class Monthly extends React.Component {
  static propTypes = {
    locale: PropTypes.string,
    dateFormat: PropTypes.string.isRequired,
    month: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    useShortMonth: PropTypes.bool,
    // availableMonths: PropTypes.array,
  };

  state = {
    buttonWrapperVisible: false
  };

  renderSelectMode = monthNames => (
    <div
      value={this.props.month}
      className="react-datepicker__month-list"
      onChange={e => this.onChange(e.target.value)}>
      {this.renderMonthButtons(monthNames)}
    </div>
  );

  renderMonthButtons = monthNames => (
    <WrappedMonthlyButtons
      month={this.props.month}
      monthNames={monthNames}
      onChange={this.onChange}
      onCancel={this.toggleButtonWrapper
      }/>
  );

  onChange= month => {
    console.log('m', month)
    if (month !== this.props.month) {
      this.props.onChange(month);
    }
  };

  toggleButtonWrapper = () =>
    this.setState({
      buttonWrapperVisible: !this.state.buttonWrapperVisible
    });

  render () {
    const localeData = utils.getLocaleDataForLocale(this.props.locale)
    const monthNames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
      this.props.useShortMonth
        ? (M) => utils.getMonthShortInLocale(localeData, utils.newDate({M}))
        : (M) => utils.getMonthInLocale(localeData, utils.newDate({M}), this.props.dateFormat)
    );

    return (
      <div className={'react-datepicker__monthly-container'}>
        {this.renderSelectMode(monthNames)}
      </div>
    );
  }
}
