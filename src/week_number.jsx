import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { isSameDay } from "./date_utils";

export default class WeekNumber extends React.Component {
  static get defaultProps() {
    return {
      ariaLabelPrefix: "week ",
    };
  }

  static propTypes = {
    weekNumber: PropTypes.number.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    onClick: PropTypes.func,
    ariaLabelPrefix: PropTypes.string,
    selected: PropTypes.instanceOf(Date),
    preSelection: PropTypes.instanceOf(Date),
    showWeekPicker: PropTypes.bool,
    showWeekNumber: PropTypes.bool,
    disabledKeyboardNavigation: PropTypes.bool,
    inline: PropTypes.bool,
    shouldFocusDayInline: PropTypes.bool,
    handleOnKeyDown: PropTypes.func,
    containerRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]),
  };

  componentDidMount() {
    this.handleFocusWeekNumber();
  }

  componentDidUpdate(prevProps) {
    this.handleFocusWeekNumber(prevProps);
  }

  weekNumberEl = React.createRef();

  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  handleOnKeyDown = (event) => {
    const eventKey = event.key;
    if (eventKey === " ") {
      event.preventDefault();
      event.key = "Enter";
    }

    this.props.handleOnKeyDown(event);
  };

  isKeyboardSelected = () =>
    !this.props.disabledKeyboardNavigation &&
    !isSameDay(this.props.date, this.props.selected) &&
    isSameDay(this.props.date, this.props.preSelection);

  getTabIndex = () =>
    this.props.showWeekPicker &&
    this.props.showWeekNumber &&
    (this.isKeyboardSelected() ||
      (isSameDay(this.props.date, this.props.selected) &&
        isSameDay(this.props.preSelection, this.props.selected)))
      ? 0
      : -1;

  // various cases when we need to apply focus to the preselected week-number
  // focus the week-number on mount/update so that keyboard navigation works while cycling through months with up or down keys (not for prev and next month buttons)
  // prevent focus for these activeElement cases so we don't pull focus from the input as the calendar opens
  handleFocusWeekNumber = (prevProps = {}) => {
    let shouldFocusWeekNumber = false;
    // only do this while the input isn't focused
    // otherwise, typing/backspacing the date manually may steal focus away from the input
    if (
      this.getTabIndex() === 0 &&
      !prevProps.isInputFocused &&
      isSameDay(this.props.date, this.props.preSelection)
    ) {
      // there is currently no activeElement and not inline
      if (!document.activeElement || document.activeElement === document.body) {
        shouldFocusWeekNumber = true;
      }
      // inline version:
      // do not focus on initial render to prevent autoFocus issue
      // focus after month has changed via keyboard
      if (this.props.inline && !this.props.shouldFocusDayInline) {
        shouldFocusWeekNumber = false;
      }
      // the activeElement is in the container, and it is another instance of WeekNumber
      if (
        this.props.containerRef &&
        this.props.containerRef.current &&
        this.props.containerRef.current.contains(document.activeElement) &&
        document.activeElement &&
        document.activeElement.classList.contains(
          "react-datepicker__week-number",
        )
      ) {
        shouldFocusWeekNumber = true;
      }
    }

    shouldFocusWeekNumber &&
      this.weekNumberEl.current &&
      this.weekNumberEl.current.focus({ preventScroll: true });
  };

  render() {
    const { weekNumber, ariaLabelPrefix = "week ", onClick } = this.props;

    const weekNumberClasses = {
      "react-datepicker__week-number": true,
      "react-datepicker__week-number--clickable": !!onClick,
      "react-datepicker__week-number--selected": isSameDay(
        this.props.date,
        this.props.selected,
      ),
      "react-datepicker__week-number--keyboard-selected":
        this.isKeyboardSelected(),
    };
    return (
      <div
        ref={this.weekNumberEl}
        className={classnames(weekNumberClasses)}
        aria-label={`${ariaLabelPrefix} ${this.props.weekNumber}`}
        onClick={this.handleClick}
        onKeyDown={this.handleOnKeyDown}
        tabIndex={this.getTabIndex()}
      >
        {weekNumber}
      </div>
    );
  }
}
