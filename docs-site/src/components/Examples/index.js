import React from "react";
import hljs from "highlight.js/lib/core";
import hljsJavaScriptLanguage from "highlight.js/lib/languages/javascript";
import slugify from "slugify";
import CodeExampleComponent from "../Example";

import Default from "../../examples/default";
import HolidayCalender from "../../examples/holidayCalendar";
import NoAnchorArrow from "../../examples/noAnchorArrow";
import ShowTime from "../../examples/showTime";
import ShowTimeOnly from "../../examples/showTimeOnly";
import ExcludeTimes from "../../examples/excludeTimes";
import IncludeTimes from "../../examples/includeTimes";
import InjectTimes from "../../examples/injectTimes";
import FilterTimes from "../../examples/filterTimes";
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
import ExcludeDateIntervals from "../../examples/excludeDateIntervals";
import ExcludeDatesMonthPicker from "../../examples/excludeDatesMonthPicker";
import HighlightDates from "../../examples/highlightDates";
import HighlightDatesRanges from "../../examples/highlightDatesRanges";
import IncludeDates from "../../examples/includeDates";
import IncludeDateIntervals from "../../examples/includeDateIntervals";
import IncludeDatesMonthPicker from "../../examples/includeDatesMonthPicker";
import FilterDates from "../../examples/filterDates";
import DateRange from "../../examples/dateRange";
import DateRangeInputWithClearButton from "../../examples/dateRangeInputWithClearButton";
import DateRangeWithPortal from "../../examples/dateRangeWithPortal";
import Disabled from "../../examples/disabled";
import DisabledKeyboardNavigation from "../../examples/disabledKeyboardNavigation";
import ReadOnly from "../../examples/readOnly";
import ClearInput from "../../examples/clearInput";
import OnBlurCallbacks from "../../examples/onBlurCallbacks";
import ConfigurePopper from "../../examples/configurePopper";
import Portal from "../../examples/portal";
import PortalById from "../../examples/portalById";
import WithPortalById from "../../examples/withPortalById";
import TabIndex from "../../examples/tabIndex";
import YearDropdown from "../../examples/yearDropdown";
import YearItemNumber from "../../examples/yearItemNumber";
import MonthDropdown from "../../examples/monthDropdown";
import MonthDropdownShort from "../../examples/monthDropdownShort";
import MonthYearDropdown from "../../examples/monthYearDropdown";
import YearSelectDropdown from "../../examples/yearSelectDropdown";
import Inline from "../../examples/inline";
import InlineVisible from "../../examples/inlineVisible";
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
import RenderCustomHeaderTwoMonths from "../../examples/renderCustomHeaderTwoMonths";
import RenderCustomDay from "../../examples/renderCustomDay";
import RenderCustomMonth from "../../examples/renderCustomMonth";
import RenderCustomQuarter from "../../examples/renderCustomQuarter";
import RenderCustomYear from "../../examples/renderCustomYear";
import TimeInput from "../../examples/timeInput";
import StrictParsing from "../../examples/strictParsing";
import MonthPicker from "../../examples/monthPicker";
import monthPickerFullName from "../../examples/monthPickerFullName";
import monthPickerTwoColumns from "../../examples/monthPickerTwoColumns";
import monthPickerFourColumns from "../../examples/monthPickerFourColumns";
import RangeMonthPicker from "../../examples/rangeMonthPicker";
import RangeMonthPickerSelectsRange from "../../examples/rangeMonthPickerSelectsRange";
import QuarterPicker from "../../examples/quarterPicker";
import RangeQuarterPicker from "../../examples/rangeQuarterPicker";
import RangeQuarterPickerSelectsRange from "../../examples/rangeQuarterPickerSelectsRange";
import YearPicker from "../../examples/yearPicker";
import RangeYearPicker from "../../examples/rangeYearPicker";
import RangeYearPickerSelectsRange from "../../examples/rangeYearPickerSelectsRange";
import OnCalendarChangeStateCallbacks from "../../examples/onCalendarOpenStateCallbacks";
import CustomTimeInput from "../../examples/customTimeInput";
import CloseOnScroll from "../../examples/closeOnScroll";
import CloseOnScrollCallback from "../../examples/closeOnScrollCallback";
import SelectsRange from "../../examples/selectsRange";
import selectsRangeWithDisabledDates from "../../examples/selectsRangeWithDisabledDates";
import CalendarStartDay from "../../examples/calendarStartDay";
import ExternalForm from "../../examples/externalForm";
import CalendarIcon from "../../examples/calendarIcon";

import "./style.scss";
import "react-datepicker/dist/react-datepicker.css";

export default class exampleComponents extends React.Component {
  componentDidMount() {
    hljs.initHighlightingOnLoad();
    hljs.registerLanguage("javascript", hljsJavaScriptLanguage);
  }

  examples = [
    {
      title: "Holiday Calendar",
      component: HolidayCalender,
    },
    {
      title: "Default",
      component: Default,
    },
    {
      title: "Calendar Icon",
      component: CalendarIcon,
    },
    {
      title: "Calendar container",
      component: CalendarContainer,
    },
    {
      title: "Calendar open state callbacks",
      component: OnCalendarChangeStateCallbacks,
    },
    {
      title: "Children",
      component: Children,
    },
    {
      title: "Clear datepicker input",
      component: ClearInput,
    },
    {
      title: "Close on scroll",
      component: CloseOnScroll,
    },
    {
      title: "Close on scroll callback",
      component: CloseOnScrollCallback,
    },
    {
      title: "Configure Popper Properties",
      component: ConfigurePopper,
      description: (
        <div>
          Full docs for the popper can be found at{" "}
          <a
            href="https://popper.js.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            popper.js.org
          </a>
        </div>
      ),
    },
    {
      title: "Custom input",
      component: CustomInput,
    },
    {
      title: "Custom header",
      component: RenderCustomHeader,
    },
    {
      title: "Custom header with two months displayed",
      component: RenderCustomHeaderTwoMonths,
    },
    {
      title: "Custom Day",
      component: RenderCustomDay,
    },
    {
      title: "Custom Month",
      component: RenderCustomMonth,
    },
    {
      title: "Custom Quarter",
      component: RenderCustomQuarter,
    },
    {
      title: "Custom Year",
      component: RenderCustomYear,
    },
    {
      title: "Custom calendar class name",
      component: CustomCalendarClassName,
    },
    {
      title: "Custom class name",
      component: CustomClassName,
    },
    {
      title: "Custom day class name",
      component: CustomDayClassName,
    },
    {
      title: "Custom date format",
      component: CustomDateFormat,
    },
    {
      title: "Custom time class name",
      component: CustomTimeClassName,
    },
    {
      title: "Custom time input",
      component: CustomTimeInput,
    },
    {
      title: "Date Range",
      component: DateRange,
    },
    {
      title: "Date range for one datepicker",
      component: SelectsRange,
    },
    {
      title: "Date range for one datepicker with disabled dates highlighted",
      component: selectsRangeWithDisabledDates,
    },
    {
      title: "Date Range with disabled navigation shown",
      component: DateRangeWithShowDisabledNavigation,
    },
    {
      title: "Date Range using input with clear button",
      component: DateRangeInputWithClearButton,
    },
    {
      title: "Date Range with Portal",
      component: DateRangeWithPortal,
    },
    {
      title: "Disable datepicker",
      component: Disabled,
    },
    {
      title: "Disable keyboard navigation",
      component: DisabledKeyboardNavigation,
    },
    {
      title: "Display Week Numbers",
      component: WeekNumbers,
    },
    {
      title: "Don't hide calendar on date selection",
      component: DontCloseOnSelect,
    },
    {
      title: "Exclude dates",
      component: ExcludeDates,
    },
    {
      title: "Exclude date intervals",
      component: ExcludeDateIntervals,
    },
    {
      title: "Exclude Months in Month Picker",
      component: ExcludeDatesMonthPicker,
    },
    {
      title: "Exclude Times",
      component: ExcludeTimes,
    },
    {
      title: "Filter dates",
      component: FilterDates,
    },
    {
      title: "Filter times",
      component: FilterTimes,
    },
    {
      title: "Fixed height of Calendar",
      component: FixedCalendar,
    },
    {
      title: "Get raw input value on change",
      component: RawChange,
    },
    {
      title: "Highlight dates",
      component: HighlightDates,
    },
    {
      title: "Highlight dates with custom class names and ranges",
      component: HighlightDatesRanges,
    },
    {
      title: "Include dates",
      component: IncludeDates,
    },
    {
      title: "Include date intervals",
      component: IncludeDateIntervals,
    },
    {
      title: "Include Months in Month Picker",
      component: IncludeDatesMonthPicker,
    },
    {
      title: "Include Times",
      component: IncludeTimes,
    },
    {
      title: "Inject Specific Times",
      component: InjectTimes,
    },
    {
      title: "Inline version",
      component: Inline,
    },
    {
      title: "Button to show Inline version",
      component: InlineVisible,
    },
    {
      title: "Input time",
      component: TimeInput,
    },
    {
      title: "Locale",
      component: Locale,
    },
    {
      title: "Locale with time",
      component: LocaleWithTime,
    },
    {
      title: "Locale without global variables",
      component: LocaleWithoutGlobalVariable,
    },
    {
      title: "Min date",
      component: MinDate,
    },
    {
      title: "Max date",
      component: MaxDate,
    },
    {
      title: "Month Picker",
      component: MonthPicker,
    },
    {
      title: "Month Picker with Full Name",
      component: monthPickerFullName,
    },
    {
      title: "Month Picker Two Columns Layout",
      component: monthPickerTwoColumns,
    },
    {
      title: "Month Picker Four Columns Layout",
      component: monthPickerFourColumns,
    },
    {
      title: "Month dropdown",
      component: MonthDropdown,
    },
    {
      title: "Month dropdown short month",
      component: MonthDropdownShort,
    },
    {
      title: "MonthYear dropdown",
      component: MonthYearDropdown,
    },
    {
      title: "Multiple months",
      component: MultiMonth,
    },
    {
      title: "Multiple months with year dropdown",
      component: MultiMonthDropdown,
    },
    {
      title: "Multiple months inline",
      component: MultiMonthInline,
    },
    {
      title: "No Anchor Arrow",
      component: NoAnchorArrow,
    },
    {
      title: "onBlur callbacks in console",
      component: OnBlurCallbacks,
    },
    {
      title: "Open to date",
      component: OpenToDate,
    },
    {
      title: "Placeholder text",
      component: PlaceholderText,
    },
    {
      title: "Portal version",
      component: Portal,
    },
    {
      title: "Portal by id",
      description:
        "If the provided portalId cannot be found in the dom, one will be created by default with that id.",
      component: PortalById,
    },
    {
      title: "Portal version with portal by id",
      description:
        "If the provided portalId cannot be found in the dom, one will be created by default with that id.",
      component: WithPortalById,
    },
    {
      title: "Quarter Picker",
      component: QuarterPicker,
    },
    {
      title: "Range Month Picker",
      component: RangeMonthPicker,
    },
    {
      title: "Range Month Picker for one month picker",
      component: RangeMonthPickerSelectsRange,
    },
    {
      title: "Range Quarter Picker",
      component: RangeQuarterPicker,
    },
    {
      title: "Range Quarter Picker for one quarter picker",
      component: RangeQuarterPickerSelectsRange,
    },
    {
      title: "Read only datepicker",
      component: ReadOnly,
    },
    {
      title: "Select Time",
      component: ShowTime,
    },
    {
      title: "Select Time Only",
      component: ShowTimeOnly,
    },
    {
      title: "Show previous months",
      component: MultiMonthPrevious,
    },
    {
      title: "Specific date range",
      component: SpecificDateRange,
    },
    {
      title: "Specific Time Range",
      component: ExcludeTimePeriod,
    },
    {
      title: "Strict parsing",
      component: StrictParsing,
    },
    {
      title: "TabIndex",
      component: TabIndex,
    },
    {
      title: "Today button",
      component: Today,
    },
    {
      title: "Year Picker",
      component: YearPicker,
    },
    {
      title: "Range Year Picker",
      component: RangeYearPicker,
    },
    {
      title: "Range Year Picker for one datepicker",
      component: RangeYearPickerSelectsRange,
    },
    {
      title: "Year dropdown",
      component: YearDropdown,
    },
    {
      title: "Year select dropdown",
      component: YearSelectDropdown,
    },
    {
      title: "Year item number",
      component: YearItemNumber,
    },
    {
      title: "Calendar Start day",
      component: CalendarStartDay,
    },
    {
      title: "External Form",
      component: ExternalForm,
    },
  ];

  handleAnchorClick = (e, id) => {
    e.preventDefault();
    window.history.replaceState(null, document.title, `#${id}`);
    document
      .getElementById(id)
      .scrollIntoView({ behavior: "smooth", block: "start" });
  };

  render() {
    return (
      <>
        <h1>Examples</h1>
        <ul className="examples__navigation">
          {this.examples.map((example) => (
            <li
              className="examples__navigation-item"
              key={`link-${example.title}`}
            >
              <a
                href={`#example-${slugify(example.title, { lower: true })}`}
                onClick={(e) =>
                  this.handleAnchorClick(
                    e,
                    `example-${slugify(example.title, { lower: true })}`,
                  )
                }
              >
                {example.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="examples">
          {this.examples.map((example) => (
            <CodeExampleComponent key={example.title} example={example} />
          ))}
        </div>
      </>
    );
  }
}
