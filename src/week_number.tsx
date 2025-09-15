import { clsx } from "clsx";
import React, { Component, createRef } from "react";

import { KeyType, isSameDay } from "./date_utils";

interface WeekNumberProps {
  weekNumber: number;
  date: Date;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  ariaLabelPrefix?: string;
  selected?: Date | null;
  preSelection?: Date | null;
  showWeekPicker?: boolean;
  showWeekNumber?: boolean;
  disabledKeyboardNavigation?: boolean;
  inline?: boolean;
  shouldFocusDayInline?: boolean;
  handleOnKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  isInputFocused?: boolean;
  isWeekDisabled?: boolean;
}

export default class WeekNumber extends Component<WeekNumberProps> {
  static get defaultProps() {
    return {
      ariaLabelPrefix: "week ",
    };
  }

  componentDidMount(): void {
    this.handleFocusWeekNumber();
  }

  componentDidUpdate(prevProps: WeekNumberProps): void {
    this.handleFocusWeekNumber(prevProps);
  }

  weekNumberEl = createRef<HTMLDivElement>();

  handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    const eventKey = event.key;
    if (eventKey === KeyType.Space) {
      event.preventDefault();
      event.key = KeyType.Enter;
    }

    this.props.handleOnKeyDown?.(event);
  };

  isKeyboardSelected = (): boolean =>
    !this.props.disabledKeyboardNavigation &&
    !isSameDay(this.props.date, this.props.selected) &&
    isSameDay(this.props.date, this.props.preSelection);

  getTabIndex = (): number =>
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
  handleFocusWeekNumber = (prevProps?: Partial<WeekNumberProps>): void => {
    let shouldFocusWeekNumber = false;
    // only do this while the input isn't focused
    // otherwise, typing/backspacing the date manually may steal focus away from the input
    if (
      this.getTabIndex() === 0 &&
      !prevProps?.isInputFocused &&
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

  render(): React.ReactElement {
    const {
      weekNumber,
      isWeekDisabled,
      ariaLabelPrefix = WeekNumber.defaultProps.ariaLabelPrefix,
      onClick,
    } = this.props;

    const weekNumberClasses = {
      "react-datepicker__week-number": true,
      "react-datepicker__week-number--clickable": !!onClick && !isWeekDisabled,
      "react-datepicker__week-number--selected":
        !!onClick && isSameDay(this.props.date, this.props.selected),
    };
    return (
      <div
        ref={this.weekNumberEl}
        className={clsx(weekNumberClasses)}
        aria-label={`${ariaLabelPrefix} ${this.props.weekNumber}`}
        onClick={this.handleClick}
        onKeyDown={this.handleOnKeyDown}
        tabIndex={this.getTabIndex()}
        role="gridcell"
      >
        {weekNumber}
      </div>
    );
  }
}
