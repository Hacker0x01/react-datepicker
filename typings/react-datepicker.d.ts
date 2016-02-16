// Type definitions for react-datepicker
// Project: https://github.com/Hacker0x01/react-datepicker
// Definitions by: Andrey Balokha <https://github.com/andrewBalekha>

interface DatePicker {
  className?: string;
  dateFormat?: string;
  selected?: Object;
  weekdays?: string[];
  locale?: string;
  dateFormatCalendar?: string;
  disabled?: boolean;
  id?: string;
  popoverAttachment?: string;
  popoverTargetAttachment?: string;
  popoverTargetOffset?: string;
  tetherConstraints?: Object[];
  weekStart?: string;
  showYearDropdown?: boolean;
  onChange(date: Object);
  onBlur?();
  onFocus?();
  tabIndex?: number;
  filterDate?();
  todayButton?: string;
  placeholderText?: string;
}

declare module "react-datepicker" {
  let DatePicker: __React.ClassicComponentClass<DatePicker>;
  export = DatePicker;
}
