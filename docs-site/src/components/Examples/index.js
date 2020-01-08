import React from "react";
import hljs from "highlight.js/lib/highlight";
import hljsJavaScriptLanguage from "highlight.js/lib/languages/javascript";
import slugify from "slugify";
import CodeExampleComponent from "../Example";

import Default from "../../examples/default";
import NoAnchorArrow from "../../examples/noAnchorArrow";
import ShowTime from "../../examples/showTime";
import ShowTimeOnly from "../../examples/showTimeOnly";
import ExcludeTimes from "../../examples/excludeTimes";
import IncludeTimes from "../../examples/includeTimes";
import InjectTimes from "../../examples/injectTimes";
import ExcludeTimePeriod from "../../examples/excludeTimePeriod";
import CustomDateFormat from "../../examples/customDateFormat";
import CustomClassName from "../../examples/customClassName";
import CustomCalendarClassName from "../../examples/customCalendarClassName";
import CustomDayClassName from "../../examples/customDayClassName";
import CustomTimeClassName from "../../examples/customTimeClassName";
import Today from "../../examples/today";
import PlaceholderText from "../../examples/placeholderText";
import SpecificDateRange from "../../examples/specificDateRange";
import MinDate from "../../examples/minDate";
import MaxDate from "../../examples/maxDate";
import DateRangeWithShowDisabledNavigation from "../../examples/dateRangeWithShowDisabledNavigation";
import Locale from "../../examples/locale";
import LocaleWithTime from "../../examples/localeWithTime";
import LocaleWithoutGlobalVariable from "../../examples/localeWithoutGlobalVariable";
import ExcludeDates from "../../examples/excludeDates";
import HighlightDates from "../../examples/highlightDates";
import HighlightDatesRanges from "../../examples/highlightDatesRanges";
import IncludeDates from "../../examples/includeDates";
import FilterDates from "../../examples/filterDates";
import DateRange from "../../examples/dateRange";
import Disabled from "../../examples/disabled";
import DisabledKeyboardNavigation from "../../examples/disabledKeyboardNavigation";
import ReadOnly from "../../examples/readOnly";
import ClearInput from "../../examples/clearInput";
import OnBlurCallbacks from "../../examples/onBlurCallbacks";
import ConfigurePopper from "../../examples/configurePopper";
import Portal from "../../examples/portal";
import TabIndex from "../../examples/tabIndex";
import YearDropdown from "../../examples/yearDropdown";
import MonthDropdown from "../../examples/monthDropdown";
import MonthDropdownShort from "../../examples/monthDropdownShort";
import MonthYearDropdown from "../../examples/monthYearDropdown";
import YearSelectDropdown from "../../examples/yearSelectDropdown";
import Inline from "../../examples/inline";
import OpenToDate from "../../examples/openToDate";
import FixedCalendar from "../../examples/fixedCalendar";
import WeekNumbers from "../../examples/weekNumbers";
import CustomInput from "../../examples/customInput";
import MultiMonth from "../../examples/multiMonth";
import MultiMonthPrevious from "../../examples/multiMonthPrevious";
import MultiMonthDropdown from "../../examples/multiMonthDropdown";
import MultiMonthInline from "../../examples/multiMonthInline";
import Children from "../../examples/children";
import CalendarContainer from "../../examples/calendarContainer";
import RawChange from "../../examples/rawChange";
import DontCloseOnSelect from "../../examples/dontCloseOnSelect";
import RenderCustomHeader from "../../examples/renderCustomHeader";
import RenderCustomDay from "../../examples/renderCustomDay";
import TimeInput from "../../examples/timeInput";
import StrictParsing from "../../examples/strictParsing";
import MonthPicker from "../../examples/monthPicker";
import RangeMonthPicker from "../../examples/rangeMonthPicker";
import QuarterPicker from "../../examples/quarterPicker";
import RangeQuarterPicker from "../../examples/rangeQuarterPicker";
import OnCalendarChangeStateCallbacks from "../../examples/onCalendarOpenStateCallbacks";

import "./style.scss";
import "react-datepicker/dist/react-datepicker.css";

export default class exampleComponents extends React.Component {
  componentDidMount() {
    hljs.initHighlightingOnLoad();
    hljs.registerLanguage("javascript", hljsJavaScriptLanguage);
  }

  examples = [
    {
      title: "Default",
      component: Default
    },
    {
      title: "No Anchor Arrow",
      component: NoAnchorArrow
    },
    {
      title: "Select Time",
      component: ShowTime
    },
    {
      title: "Select Time Only",
      component: ShowTimeOnly
    },
    {
      title: "Exclude Times",
      component: ExcludeTimes
    },
    {
      title: "Include Times",
      component: IncludeTimes
    },
    {
      title: "Inject Specific Times",
      component: InjectTimes
    },
    {
      title: "Specific Time Range",
      component: ExcludeTimePeriod
    },
    {
      title: "Custom date format",
      component: CustomDateFormat
    },
    {
      title: "Custom class name",
      component: CustomClassName
    },
    {
      title: "Custom calendar class name",
      component: CustomCalendarClassName
    },
    {
      title: "Custom day class name",
      component: CustomDayClassName
    },
    {
      title: "Custom time class name",
      component: CustomTimeClassName
    },
    {
      title: "Today button",
      component: Today
    },
    {
      title: "Placeholder text",
      component: PlaceholderText
    },
    {
      title: "Specific date range",
      component: SpecificDateRange
    },
    {
      title: "Min date",
      component: MinDate
    },
    {
      title: "Max date",
      component: MaxDate
    },
    {
      title: "Date Range with disabled navigation shown",
      component: DateRangeWithShowDisabledNavigation
    },
    {
      title: "Locale",
      component: Locale
    },
    {
      title: "Locale with time",
      component: LocaleWithTime
    },
    {
      title: "Locale without global variables",
      component: LocaleWithoutGlobalVariable
    },
    {
      title: "Exclude dates",
      component: ExcludeDates
    },
    {
      title: "Highlight dates",
      component: HighlightDates
    },
    {
      title: "Highlight dates with custom class names and ranges",
      component: HighlightDatesRanges
    },
    {
      title: "Include dates",
      component: IncludeDates
    },
    {
      title: "Filter dates",
      component: FilterDates
    },
    {
      title: "Date Range",
      component: DateRange
    },
    {
      title: "Disable datepicker",
      component: Disabled
    },
    {
      title: "Disable keyboard navigation",
      component: DisabledKeyboardNavigation
    },
    {
      title: "Read only datepicker",
      component: ReadOnly
    },
    {
      title: "Clear datepicker input",
      component: ClearInput
    },
    {
      title: "onBlur callbacks in console",
      component: OnBlurCallbacks
    },
    {
      title: "Configure Popper Properties",
      component: ConfigurePopper
    },
    {
      title: "Portal version",
      component: Portal
    },
    {
      title: "Inline portal version",
      component: Inline
    },
    {
      title: "TabIndex",
      component: TabIndex
    },
    {
      title: "Year dropdown",
      component: YearDropdown
    },
    {
      title: "Month dropdown",
      component: MonthDropdown
    },
    {
      title: "Month dropdown short month",
      component: MonthDropdownShort
    },
    {
      title: "MonthYear dropdown",
      component: MonthYearDropdown
    },
    {
      title: "Year select dropdown",
      component: YearSelectDropdown
    },
    {
      title: "Inline version",
      component: Inline
    },
    {
      title: "Open to date",
      component: OpenToDate
    },
    {
      title: "Fixed height of Calendar",
      component: FixedCalendar
    },
    {
      title: "Display Week Numbers",
      component: WeekNumbers
    },
    {
      title: "Custom input",
      component: CustomInput
    },
    {
      title: "Multiple months",
      component: MultiMonth
    },
    {
      title: "Show previous months",
      component: MultiMonthPrevious
    },
    {
      title: "Multiple months with year dropdown",
      component: MultiMonthDropdown
    },
    {
      title: "Multiple months inline",
      component: MultiMonthInline
    },
    {
      title: "Children",
      component: Children
    },
    {
      title: "Calendar container",
      component: CalendarContainer
    },
    {
      title: "Get raw input value on change",
      component: RawChange
    },
    {
      title: "Don't hide calendar on date selection",
      component: DontCloseOnSelect
    },
    {
      title: "Custom header",
      component: RenderCustomHeader
    },
    {
      title: "Custom Day",
      component: RenderCustomDay
    },
    {
      title: "Input time",
      component: TimeInput
    },
    {
      title: "Strict parsing",
      component: StrictParsing
    },
    {
      title: "Month Picker",
      component: MonthPicker
    },
    {
      title: "Range Month Picker",
      component: RangeMonthPicker
    },
    {
      title: "Quarter Picker",
      component: QuarterPicker
    },
    {
      title: "Range Quarter Picker",
      component: RangeQuarterPicker
    },
    {
      title: "Calendar open state callbacks",
      component: OnCalendarChangeStateCallbacks
    }
  ];

  render() {
    return (
      <>
        <h1>Examples</h1>
        <ul className="examples__navigation">
          {this.examples.map((example, index) => (
            <li className="examples__navigation-item" key={`link-${index}`}>
              <a href={`#example-${slugify(example.title, { lower: true })}`}>
                {example.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="examples">
          {this.examples.map((example, index) => (
            <CodeExampleComponent key={index} example={example} />
          ))}
        </div>
      </>
    );
  }
}
