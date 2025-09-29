import React from "react";
import hljs from "highlight.js/lib/core";
import hljsJavaScriptLanguage from "highlight.js/lib/languages/javascript";
import slugify from "slugify";
import CodeExampleComponent from "../Example/index.jsx";

import Default from "../../examples/default?raw";
import NoAnchorArrow from "../../examples/noAnchorArrow?raw";
import ShowTime from "../../examples/showTime?raw";
import ShowTimeOnly from "../../examples/showTimeOnly?raw";
import HideTimeCaption from "../../examples/hideTimeCaption?raw";
import ExcludeTimes from "../../examples/excludeTimes?raw";
import IncludeTimes from "../../examples/includeTimes?raw";
import InjectTimes from "../../examples/injectTimes?raw";
import FilterTimes from "../../examples/filterTimes?raw";
import ExcludeTimePeriod from "../../examples/excludeTimePeriod?raw";
import CustomDateFormat from "../../examples/customDateFormat?raw";
import CustomClassName from "../../examples/customClassName?raw";
import CustomCalendarClassName from "../../examples/customCalendarClassName?raw";
import CustomDayClassName from "../../examples/customDayClassName?raw";
import CustomWeekClassName from "../../examples/customWeekClassName?raw";
import CustomTimeClassName from "../../examples/customTimeClassName?raw";
import Today from "../../examples/today?raw";
import PlaceholderText from "../../examples/placeholderText?raw";
import SpecificDateRange from "../../examples/specificDateRange?raw";
import MinDate from "../../examples/minDate?raw";
import MaxDate from "../../examples/maxDate?raw";
import DateRangeWithShowDisabledNavigation from "../../examples/dateRangeWithShowDisabledNavigation?raw";
import Locale from "../../examples/locale?raw";
import LocaleWithTime from "../../examples/localeWithTime?raw";
import LocaleWithoutGlobalVariable from "../../examples/localeWithoutGlobalVariable?raw";
import ExcludeDates from "../../examples/excludeDates?raw";
import ExcludedWithMessage from "../../examples/excludeDatesWithMessage?raw";
import ExcludeDateIntervals from "../../examples/excludeDateIntervals?raw";
import ExcludeDatesMonthPicker from "../../examples/excludeDatesMonthPicker?raw";
import ExcludeDatesRangeMonthPicker from "../../examples/excludeDatesRangeMonthPicker?raw";
import HighlightDates from "../../examples/highlightDates?raw";
import HolidayDates from "../../examples/holidayDates?raw";
import HighlightDatesRanges from "../../examples/highlightDatesRanges?raw";
import IncludeDates from "../../examples/includeDates?raw";
import IncludeDateIntervals from "../../examples/includeDateIntervals?raw";
import IncludeDatesMonthPicker from "../../examples/includeDatesMonthPicker?raw";
import FilterDates from "../../examples/filterDates?raw";
import DateRange from "../../examples/dateRange?raw";
import DateRangeInputWithClearButton from "../../examples/dateRangeInputWithClearButton?raw";
import DateRangeWithPortal from "../../examples/dateRangeWithPortal?raw";
import Disabled from "../../examples/disabled?raw";
import DisabledKeyboardNavigation from "../../examples/disabledKeyboardNavigation?raw";
import ReadOnly from "../../examples/readOnly?raw";
import ClearInput from "../../examples/clearInput?raw";
import OnBlurCallbacks from "../../examples/onBlurCallbacks?raw";
import ConfigureFloatingUI from "../../examples/configureFloatingUI?raw";
import Portal from "../../examples/portal?raw";
import PortalById from "../../examples/portalById?raw";
import WithPortalById from "../../examples/withPortalById?raw";
import TabIndex from "../../examples/tabIndex?raw";
import YearDropdown from "../../examples/yearDropdown?raw";
import YearItemNumber from "../../examples/yearItemNumber?raw";
import MonthDropdown from "../../examples/monthDropdown?raw";
import MonthDropdownShort from "../../examples/monthDropdownShort?raw";
import MonthYearDropdown from "../../examples/monthYearDropdown?raw";
import YearSelectDropdown from "../../examples/yearSelectDropdown?raw";
import Inline from "../../examples/inline?raw";
import InlineDisabled from "../../examples/disabledInline?raw";
import InlineVisible from "../../examples/inlineVisible?raw";
import OpenToDate from "../../examples/openToDate?raw";
import FixedCalendar from "../../examples/fixedCalendar?raw";
import WeekNumbers from "../../examples/weekNumbers?raw";
import CustomInput from "../../examples/customInput?raw";
import MultiMonth from "../../examples/multiMonth?raw";
import MultiMonthPrevious from "../../examples/multiMonthPrevious?raw";
import MultiMonthDropdown from "../../examples/multiMonthDropdown?raw";
import MultiMonthInline from "../../examples/multiMonthInline?raw";
import Children from "../../examples/children?raw";
import CalendarContainer from "../../examples/calendarContainer?raw";
import RawChange from "../../examples/rawChange?raw";
import DontCloseOnSelect from "../../examples/dontCloseOnSelect?raw";
import RenderCustomHeader from "../../examples/renderCustomHeader?raw";
import RenderCustomHeaderTwoMonths from "../../examples/renderCustomHeaderTwoMonths?raw";
import RenderCustomDay from "../../examples/renderCustomDay?raw";
import RenderCustomMonth from "../../examples/renderCustomMonth?raw";
import RenderCustomQuarter from "../../examples/renderCustomQuarter?raw";
import RenderCustomYear from "../../examples/renderCustomYear?raw";
import TimeInput from "../../examples/timeInput?raw";
import StrictParsing from "../../examples/strictParsing?raw";
import MonthPicker from "../../examples/monthPicker?raw";
import WeekPicker from "../../examples/weekPicker?raw";
import ExcludeWeeks from "../../examples/excludeWeeks?raw";
import monthPickerFullName from "../../examples/monthPickerFullName?raw";
import monthPickerTwoColumns from "../../examples/monthPickerTwoColumns?raw";
import monthPickerFourColumns from "../../examples/monthPickerFourColumns?raw";
import RangeMonthPicker from "../../examples/rangeMonthPicker?raw";
import RangeMonthPickerSelectsRange from "../../examples/rangeMonthPickerSelectsRange?raw";
import QuarterPicker from "../../examples/quarterPicker?raw";
import RangeQuarterPicker from "../../examples/rangeQuarterPicker?raw";
import RangeQuarterPickerSelectsRange from "../../examples/rangeQuarterPickerSelectsRange?raw";
import YearPicker from "../../examples/yearPicker?raw";
import RangeYearPicker from "../../examples/rangeYearPicker?raw";
import RangeYearPickerSelectsRange from "../../examples/rangeYearPickerSelectsRange?raw";
import OnCalendarChangeStateCallbacks from "../../examples/onCalendarOpenStateCallbacks?raw";
import CustomTimeInput from "../../examples/customTimeInput?raw";
import CloseOnScroll from "../../examples/closeOnScroll?raw";
import CloseOnScrollCallback from "../../examples/closeOnScrollCallback?raw";
import SelectsRange from "../../examples/selectsRange?raw";
import SelectsRangeWithCustomSeparator from "../../examples/customRangeSeparator?raw";
import selectsRangeWithDisabledDates from "../../examples/selectsRangeWithDisabledDates?raw";
import CalendarStartDay from "../../examples/calendarStartDay?raw";
import ExternalForm from "../../examples/externalForm?raw";
import CalendarIcon from "../../examples/calendarIcon?raw";
import SelectsMultiple from "../../examples/selectsMultiple?raw";
import SelectsMultipleMonths from "../../examples/selectsMultipleMonths?raw";
import CalendarIconExternal from "../../examples/calendarIconExternal?raw";
import CalendarIconSvgIcon from "../../examples/calendarIconSvgIcon?raw";
import ToggleCalendarOnIconClick from "../../examples/toggleCalendarOnIconClick?raw";
import SwapRange from "../../examples/rangeSwapRange?raw";

import "./style.scss";
import "react-datepicker/dist/react-datepicker.css";

export default class exampleComponents extends React.Component {
  componentDidMount() {
    hljs.registerLanguage("javascript", hljsJavaScriptLanguage);
    hljs.highlightAll();
  }

  examples = [
    {
      title: "Default",
      component: Default,
    },
    {
      title: "Calendar Icon",
      component: CalendarIcon,
    },
    {
      title: "Calendar Icon using React Svg Component",
      component: CalendarIconSvgIcon,
    },
    {
      title: "Calendar Icon using External Lib",
      component: CalendarIconExternal,
    },
    {
      title: "Toggle Calendar open status on click of the calendar icon",
      component: ToggleCalendarOnIconClick,
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
      title: "Configure Floating UI Properties",
      component: ConfigureFloatingUI,
      description: (
        <div>
          Full docs for the underlying library that manages the overlay used can
          be found at{" "}
          <a
            href="https://floating-ui.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            floating-ui.com
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
      title: "Custom week class name",
      component: CustomWeekClassName,
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
      title: "Date range for one datepicker with custom range separator",
      component: SelectsRangeWithCustomSeparator,
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
      title: "Exclude dates with message",
      component: ExcludedWithMessage,
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
      title: "Exclude Months in Range Month Picker",
      component: ExcludeDatesRangeMonthPicker,
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
      title: "Holiday dates",
      component: HolidayDates,
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
      title: "Disabled Inline version",
      component: InlineDisabled,
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
      title: "Range Swap Range",
      description:
        "Swap the start and end date if the end date is before the start date in a pick sequence.",
      component: SwapRange,
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
      title: "Hide Time Caption",
      component: HideTimeCaption,
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
      title: "Select multiple dates",
      component: SelectsMultiple,
    },
    {
      title: "Select multiple months",
      component: SelectsMultipleMonths,
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
      title: "Week Picker",
      component: WeekPicker,
    },
    {
      title: "Exclude Weeks",
      component: ExcludeWeeks,
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
