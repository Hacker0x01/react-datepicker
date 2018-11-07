import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import FocusTrap from "focus-trap-react";
import { ScreenReaderOnly } from "./screen_reader_only";

function generateYears(year, noOfYear, minDate, maxDate) {
  var list = [];
  for (var i = 0; i < 2 * noOfYear + 1; i++) {
    const newYear = year + noOfYear - i;
    let isInRange = true;

    if (minDate) {
      isInRange = minDate.year() <= newYear;
    }

    if (maxDate && isInRange) {
      isInRange = maxDate.year() >= newYear;
    }

    if (isInRange) {
      list.push(newYear);
    }
  }

  return list;
}

export default class YearDropdownOptions extends React.Component {
  static propTypes = {
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    scrollableYearDropdown: PropTypes.bool,
    year: PropTypes.number.isRequired,
    yearDropdownItemNumber: PropTypes.number,
    accessibleMode: PropTypes.bool
  };

  constructor(props) {
    super(props);
    const { yearDropdownItemNumber, scrollableYearDropdown } = props;
    const noOfYear =
      yearDropdownItemNumber || (scrollableYearDropdown ? 10 : 5);

    this.state = {
      yearsList: generateYears(
        this.props.year,
        noOfYear,
        this.props.minDate,
        this.props.maxDate
      ),
      preSelection: this.props.year,
      readInstructions: false
    };
  }

  componentDidMount() {
    if (this.preSelectionDiv) {
      this.preSelectionDiv.scrollIntoView({
        behavior: "instant",
        block: "nearest",
        inline: "nearest"
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.preSelectionDiv &&
      prevState.preSelection !== this.state.preSelection
    ) {
      this.preSelectionDiv.scrollIntoView({
        behavior: "instant",
        block: "nearest",
        inline: "nearest"
      });
    }
  }

  renderOptions = () => {
    var selectedYear = this.props.year;
    var options = this.state.yearsList.map(year => (
      <div
        className={classNames("react-datepicker__year-option", {
          "react-datepicker__year-option--selected_year": selectedYear === year,
          "react-datepicker__year-option--preselected":
            this.props.accessibleMode && this.state.preSelection === year
        })}
        key={year}
        ref={div => {
          if (this.props.accessibleMode && this.state.preSelection === year) {
            this.preSelectionDiv = div;
          }
        }}
        onClick={this.onChange.bind(this, year)}
      >
        {selectedYear === year ? (
          <span className="react-datepicker__year-option--selected">✓</span>
        ) : (
          ""
        )}
        {year}
      </div>
    ));

    const minYear = this.props.minDate ? this.props.minDate.year() : null;
    const maxYear = this.props.maxDate ? this.props.maxDate.year() : null;

    if (!maxYear || !this.state.yearsList.find(year => year === maxYear)) {
      options.unshift(
        <div
          className="react-datepicker__year-option"
          ref={"upcoming"}
          key={"upcoming"}
          onClick={this.incrementYears}
        >
          <a className="react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming" />
        </div>
      );
    }

    if (!minYear || !this.state.yearsList.find(year => year === minYear)) {
      options.push(
        <div
          className="react-datepicker__year-option"
          ref={"previous"}
          key={"previous"}
          onClick={this.decrementYears}
        >
          <a className="react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous" />
        </div>
      );
    }

    return options;
  };

  onFocus = () => {
    if (this.props.accessibleMode) {
      this.setState({ readInstructions: true });
    }
  };

  onChange = year => {
    this.props.onChange(year);
  };

  handleClickOutside = () => {
    this.props.onCancel();
  };

  shiftYears = amount => {
    var years = this.state.yearsList.map(function(year) {
      return year + amount;
    });

    this.setState({
      yearsList: years
    });
  };

  incrementYears = () => {
    return this.shiftYears(1);
  };

  decrementYears = () => {
    return this.shiftYears(-1);
  };

  onInputKeyDown = event => {
    const eventKey = event.key;
    let selectionChange = 0;
    switch (eventKey) {
      case "ArrowUp":
        event.preventDefault();
        event.stopPropagation();
        selectionChange = 1;
        break;
      case "ArrowDown":
        event.preventDefault();
        event.stopPropagation();
        selectionChange = -1;
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
        const maxYear = this.state.yearsList[0];
        const minYear = this.state.yearsList[this.state.yearsList.length - 1];
        let nextSelection = preSelection + selectionChange;
        if (nextSelection < minYear) nextSelection = maxYear;
        if (nextSelection > maxYear) nextSelection = minYear;
        return { preSelection: nextSelection };
      });
    }
  };

  render() {
    let dropdownClass = classNames({
      "react-datepicker__year-dropdown": true,
      "react-datepicker__year-dropdown--scrollable": this.props
        .scrollableYearDropdown
    });

    let screenReaderInstructions;
    if (this.state.readInstructions) {
      screenReaderInstructions = (
        <p aria-live>
          You are focused on a year selector menu. Use the up and down arrows to
          select a year, then hit enter to confirm your selection.
          {this.state.preSelection} is the currently focused year.
        </p>
      );
    }

    return this.props.accessibleMode ? (
      <FocusTrap>
        <div
          className={dropdownClass}
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
      <div className={dropdownClass}>{this.renderOptions()}</div>
    );
  }
}
