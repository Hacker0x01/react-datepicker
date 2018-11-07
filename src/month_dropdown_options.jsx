import React from "react";
import PropTypes from "prop-types";
import FocusTrap from "focus-trap-react";
import classnames from "classnames";
import { ScreenReaderOnly } from "./screen_reader_only";

export default class MonthDropdownOptions extends React.Component {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    month: PropTypes.number.isRequired,
    monthNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    accessibleMode: PropTypes.bool
  };

  constructor(...args) {
    super(...args);

    this.state = {
      preSelection: this.props.month,
      readInstructions: false
    };
  }

  renderOptions = () => {
    return this.props.monthNames.map((month, i) => (
      <div
        className={classnames("react-datepicker__month-option", {
          "--selected_month": this.props.month === i,
          "react-datepicker__month-option--preselected":
            this.props.accessibleMode && this.state.preSelection === i
        })}
        key={month}
        ref={month}
        onClick={this.onChange.bind(this, i)}
      >
        {this.props.month === i ? (
          <span className="react-datepicker__month-option--selected">✓</span>
        ) : (
          ""
        )}
        {month}
      </div>
    ));
  };

  onFocus = () => {
    if (this.props.accessibleMode) {
      this.setState({ readInstructions: true });
    }
  };

  onChange = month => this.props.onChange(month);

  handleClickOutside = () => this.props.onCancel();

  onInputKeyDown = event => {
    const eventKey = event.key;
    let selectionChange = 0;
    switch (eventKey) {
      case "ArrowUp":
        event.preventDefault();
        event.stopPropagation();
        selectionChange = -1;
        break;
      case "ArrowDown":
        event.preventDefault();
        event.stopPropagation();
        selectionChange = 1;
        break;
      case "Escape":
        event.preventDefault();
        event.stopPropagation();
        this.props.onCancel();
        break;
      case " ":
      case "Enter":
        event.preventDefault();
        event.stopPropagation();
        this.props.onChange(this.state.preSelection);
        break;
    }
    if (selectionChange) {
      this.setState(({ preSelection }) => {
        let nextSelection = preSelection + selectionChange;
        if (nextSelection < 0) nextSelection = 11;
        if (nextSelection === 12) nextSelection = 0;
        return { preSelection: nextSelection };
      });
    }
  };

  render() {
    let screenReaderInstructions;
    if (this.state.readInstructions) {
      screenReaderInstructions = (
        <p aria-live>
          You are focused on a month selector menu. Use the up and down arrows
          to select a year, then hit enter to confirm your selection.
          {this.props.monthNames[this.state.preSelection]} is the currently
          focused month.
        </p>
      );
    }

    return this.props.accessibleMode ? (
      <FocusTrap>
        <div
          className="react-datepicker__month-dropdown"
          tabIndex="0"
          onKeyDown={this.onInputKeyDown}
          onFocus={this.onFocus}
        >
          <ScreenReaderOnly>
            <span>{screenReaderInstructions}</span>
          </ScreenReaderOnly>
          {this.renderOptions()}
        </div>
      </FocusTrap>
    ) : (
      <div className="react-datepicker__month-dropdown">
        {this.renderOptions()}
      </div>
    );
  }
}
