import React from "react";
import hljs from "highlight.js";
import Default from "./examples/default";
import CodeExampleComponent from "./code_example_component";

import CustomDateFormat from "./examples/custom_date_format";
import CustomClassName from "./examples/custom_class_name";
import CustomCalendarClassName from "./examples/custom_calendar_class_name";
import CustomDayClassNames from "./examples/custom_day_class_names";
import PlaceholderText from "./examples/placeholder_text";
import SpecificDateRange from "./examples/specific_date_range";
import Locale from "./examples/locale";
import ExcludeDates from "./examples/exclude_dates";
import HighlightDates from "./examples/highlight_dates";
import HighlightDatesRanges from "./examples/highlight_dates_with_ranges";
import IncludeDates from "./examples/include_dates";
import FilterDates from "./examples/filter_dates";
import Disabled from "./examples/disabled";
import DisabledKeyboardNavigation from "./examples/disabled_keyboard_navigation";
import ClearInput from "./examples/clear_input";
import OnBlurCallbacks from "./examples/on_blur_callbacks";
import ConfigurePopper from "./examples/configurePopper";
import DateRange from "./examples/date_range";
import DateRangeWithShowDisabledNavigation from "./examples/date_range_with_show_disabled_navigation";
import TabIndex from "./examples/tab_index";
import YearDropdown from "./examples/year_dropdown";
import MonthDropdown from "./examples/month_dropdown";
import MonthYearDropdown from "./examples/month_year_dropdown";
import MonthDropdownShort from "./examples/month_dropdown_short";
import YearSelectDropdown from "./examples/year_select_dropdown";
import Today from "./examples/today";
import Inline from "./examples/inline";
import OpenToDate from "./examples/open_to_date";
import FixedCalendar from "./examples/fixed_calendar";
import WeekNumbers from "./examples/week_numbers";
import CustomInput from "./examples/custom_input";
import MultiMonth from "./examples/multi_month";
import MultiMonthDrp from "./examples/multi_month_drp";
import MultiMonthInline from "./examples/multi_month_inline";
import Children from "./examples/children";
import CalendarContainer from "./examples/calendar_container";
import Portal from "./examples/portal";
import InlinePortal from "./examples/inline_portal";
import RawChange from "./examples/raw_change";
import ReadOnly from "./examples/read_only";
import ShowTime from "./examples/show_time";
import ShowTimeOnly from "./examples/show_time_only";
import ExcludeTimes from "./examples/exclude_times";
import ExcludeTimePeriod from "./examples/exclude_time_period";
import IncludeTimes from "./examples/include_times";
import InjectTimes from "./examples/inject_times";
import DontCloseOnSelect from "./examples/dont_close_onSelect";
import RenderCustomHeader from "./examples/render_custom_header";

import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";

export default class exampleComponents extends React.Component {
  componentDidMount() {
    hljs.initHighlightingOnLoad();
  }

  examples = [
    {
      title: "Default",
      component: <Default />
    },
    {
      title: "Select Time",
      component: <ShowTime />
    },
    {
      title: "Select Time Only",
      component: <ShowTimeOnly />
    },
    {
      title: "Exclude Times",
      component: <ExcludeTimes />
    },
    {
      title: "Include Times",
      component: <IncludeTimes />
    },
    {
      title: "Inject Specific Times",
      component: <InjectTimes />
    },
    {
      title: "Specific Time Range",
      component: <ExcludeTimePeriod />
    },
    {
      title: "Custom date format",
      component: <CustomDateFormat />
    },
    {
      title: "Custom class name",
      component: <CustomClassName />
    },
    {
      title: "Custom calendar class name",
      component: <CustomCalendarClassName />
    },
    {
      title: "Custom day class names",
      component: <CustomDayClassNames />
    },
    {
      title: "Today button",
      component: <Today />
    },
    {
      title: "Placeholder text",
      component: <PlaceholderText />
    },
    {
      title: "Specific date range",
      component: <SpecificDateRange />
    },
    {
      title: "Date Range with disabled navigation shown",
      component: <DateRangeWithShowDisabledNavigation />
    },
    {
      title: "Locale",
      component: <Locale />
    },
    {
      title: "Exclude dates",
      component: <ExcludeDates />
    },
    {
      title: "Highlight dates",
      component: <HighlightDates />
    },
    {
      title: "Highlight dates with custom class names and ranges",
      component: <HighlightDatesRanges />
    },
    {
      title: "Include dates",
      component: <IncludeDates />
    },
    {
      title: "Filter dates",
      component: <FilterDates />
    },
    {
      title: "Date Range",
      component: <DateRange />
    },
    {
      title: "Disable datepicker",
      component: <Disabled />
    },
    {
      title: "Disable keyboard navigation",
      component: <DisabledKeyboardNavigation />
    },
    {
      title: "Read only datepicker",
      component: <ReadOnly />
    },
    {
      title: "Clear datepicker input",
      component: <ClearInput />
    },
    {
      title: "onBlur callbacks in console",
      component: <OnBlurCallbacks />
    },
    {
      title: "Configure Popper Properties",
      component: <ConfigurePopper />
    },
    {
      title: "Portal version",
      component: <Portal />
    },
    {
      title: "Inline portal version",
      component: <InlinePortal />
    },
    {
      title: "TabIndex",
      component: <TabIndex />
    },
    {
      title: "Year dropdown",
      component: <YearDropdown />
    },
    {
      title: "Month dropdown",
      component: <MonthDropdown />
    },
    {
      title: "Month dropdown short month",
      component: <MonthDropdownShort />
    },
    {
      title: "MonthYear dropdown",
      component: <MonthYearDropdown />
    },
    {
      title: "Year select dropdown",
      component: <YearSelectDropdown />
    },
    {
      title: "Inline version",
      component: <Inline />
    },
    {
      title: "Open to date",
      component: <OpenToDate />
    },
    {
      title: "Fixed height of Calendar",
      component: <FixedCalendar />
    },
    {
      title: "Display Week Numbers",
      component: <WeekNumbers />
    },
    {
      title: "Custom input",
      component: <CustomInput />
    },
    {
      title: "Multiple months",
      component: <MultiMonth />
    },
    {
      title: "Multiple months with year dropdown",
      component: <MultiMonthDrp />
    },
    {
      title: "Multiple months inline",
      component: <MultiMonthInline />
    },
    {
      title: "Children",
      component: <Children />
    },
    {
      title: "Calendar container",
      component: <CalendarContainer />
    },
    {
      title: "Get raw input value on change",
      component: <RawChange />
    },
    {
      title: "Don't hide calendar on date selection",
      component: <DontCloseOnSelect />
    },
    {
      title: "Custom header",
      component: <RenderCustomHeader />
    }
  ];

  renderExamples = () =>
    this.examples.map((example, index) => (
      <CodeExampleComponent
        key={`example-${index}`}
        id={index}
        title={example.title}
      >
        {example.component}
      </CodeExampleComponent>
    ));

  renderLeftColumn = () =>
    this.examples.map((example, index) => (
      <li className="examples__navigation-item" key={`link-${index}`}>
        <a href={`#example-${index}`}>{example.title}</a>
      </li>
    ));

  render() {
    return (
      <div>
        <h1>Examples</h1>
        <ul className="examples__navigation">{this.renderLeftColumn()}</ul>
        <div className="examples">{this.renderExamples()}</div>
      </div>
    );
  }
}
