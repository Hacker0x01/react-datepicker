import { IExampleConfig } from "../../types";

// Examples
import Default from "../../examples/ts/default?raw";
import CalendarContainer from "../../examples/ts/calendarContainer?raw";
import CalendarIcon from "../../examples/ts/calendarIcon?raw";
import CalendarIconSvgIcon from "../../examples/ts/calendarIconSvgIcon?raw";
import CalendarIconExternal from "../../examples/ts/calendarIconExternal?raw";
import CalendarStartDay from "../../examples/ts/calendarStartDay?raw";
import OnCalendarChangeStateCallbacks from "../../examples/ts/onCalendarOpenStateCallbacks?raw";
import ToggleCalendarOnIconClick from "../../examples/ts/toggleCalendarOnIconClick?raw";
import Children from "../../examples/ts/children?raw";
import ClearInput from "../../examples/ts/clearInput?raw";
import CloseOnScroll from "../../examples/ts/closeOnScroll?raw";
import CloseOnScrollCallback from "../../examples/ts/closeOnScrollCallback?raw";
import ConfigureFloatingUI from "../../examples/ts/configureFloatingUI?raw";
import CustomInput from "../../examples/ts/customInput?raw";
import PopperTargetRef from "../../examples/ts/popperTargetRef?raw";
import RenderCustomHeader from "../../examples/ts/renderCustomHeader?raw";
import RenderCustomHeaderTwoMonths from "../../examples/ts/renderCustomHeaderTwoMonths?raw";
import RenderCustomDayName from "../../examples/ts/renderCustomDayName?raw";
import RenderCustomDay from "../../examples/ts/renderCustomDay?raw";
import RenderCustomMonth from "../../examples/ts/renderCustomMonth?raw";
import RenderCustomQuarter from "../../examples/ts/renderCustomQuarter?raw";
import RenderCustomYear from "../../examples/ts/renderCustomYear?raw";
import CustomCalendarClassName from "../../examples/ts/customCalendarClassName?raw";
import CustomClassName from "../../examples/ts/customClassName?raw";
import CustomDayClassName from "../../examples/ts/customDayClassName?raw";
import CustomDateFormat from "../../examples/ts/customDateFormat?raw";
import CustomTimeClassName from "../../examples/ts/customTimeClassName?raw";
import CustomTimeInput from "../../examples/ts/customTimeInput?raw";
import DateRange from "../../examples/ts/dateRange?raw";
import SelectsRange from "../../examples/ts/selectsRange?raw";
import SelectsRangeWithDisabledDates from "../../examples/ts/selectsRangeWithDisabledDates?raw";
import DateRangeWithShowDisabledNavigation from "../../examples/ts/dateRangeWithShowDisabledNavigation?raw";
import DateRangeInputWithClearButton from "../../examples/ts/dateRangeInputWithClearButton?raw";
import DateRangeWithPortal from "../../examples/ts/dateRangeWithPortal?raw";
import Disabled from "../../examples/ts/disabled?raw";
import DisabledKeyboardNavigation from "../../examples/ts/disabledKeyboardNavigation?raw";
import WeekNumbers from "../../examples/ts/weekNumbers?raw";
import DontCloseOnSelect from "../../examples/ts/dontCloseOnSelect?raw";
import ExcludeDates from "../../examples/ts/excludeDates?raw";
import ExcludedWithMessage from "../../examples/ts/excludeDatesWithMessage?raw";
import ExcludeDateIntervals from "../../examples/ts/excludeDateIntervals?raw";
import ExcludeDatesMonthPicker from "../../examples/ts/excludeDatesMonthPicker?raw";
import ExcludeDatesRangeMonthPicker from "../../examples/ts/excludeDatesRangeMonthPicker?raw";
import ExcludeTimes from "../../examples/ts/excludeTimes?raw";
import FilterDates from "../../examples/ts/filterDates?raw";
import FilterTimes from "../../examples/ts/filterTimes?raw";
import FixedCalendar from "../../examples/ts/fixedCalendar?raw";
import RawChange from "../../examples/ts/rawChange?raw";
import HighlightDates from "../../examples/ts/highlightDates?raw";
import HighlightDatesRanges from "../../examples/ts/highlightDatesRanges?raw";
import HolidayDates from "../../examples/ts/holidayDates?raw";
import IncludeDates from "../../examples/ts/includeDates?raw";
import IncludeDateIntervals from "../../examples/ts/includeDateIntervals?raw";
import IncludeDatesMonthPicker from "../../examples/ts/includeDatesMonthPicker?raw";
import IncludeTimes from "../../examples/ts/includeTimes?raw";
import InjectTimes from "../../examples/ts/injectTimes?raw";
import Inline from "../../examples/ts/inline?raw";
import InlineDisabled from "../../examples/ts/disabledInline?raw";
import InlineVisible from "../../examples/ts/inlineVisible?raw";
import TimeInput from "../../examples/ts/timeInput?raw";
import Locale from "../../examples/ts/locale?raw";
import LocaleWithTime from "../../examples/ts/localeWithTime?raw";
import LocaleWithoutGlobalVariable from "../../examples/ts/localeWithoutGlobalVariable?raw";
import MinDate from "../../examples/ts/minDate?raw";
import MaxDate from "../../examples/ts/maxDate?raw";
import MonthPicker from "../../examples/ts/monthPicker?raw";
import MonthPickerFullName from "../../examples/ts/monthPickerFullName?raw";
import MonthPickerTwoColumns from "../../examples/ts/monthPickerTwoColumns?raw";
import MonthPickerFourColumns from "../../examples/ts/monthPickerFourColumns?raw";
import MonthDropdown from "../../examples/ts/monthDropdown?raw";
import MonthDropdownShort from "../../examples/ts/monthDropdownShort?raw";
import MonthYearDropdown from "../../examples/ts/monthYearDropdown?raw";
import MultiMonth from "../../examples/ts/multiMonth?raw";
import MultiMonthDropdown from "../../examples/ts/multiMonthDropdown?raw";
import MultiMonthInline from "../../examples/ts/multiMonthInline?raw";
import NoAnchorArrow from "../../examples/ts/noAnchorArrow?raw";
import OnBlurCallbacks from "../../examples/ts/onBlurCallbacks?raw";
import OpenToDate from "../../examples/ts/openToDate?raw";
import PlaceholderText from "../../examples/ts/placeholderText?raw";
import Portal from "../../examples/ts/portal?raw";
import PortalById from "../../examples/ts/portalById?raw";
import WithPortalById from "../../examples/ts/withPortalById?raw";
import QuarterPicker from "../../examples/ts/quarterPicker?raw";
import RangeMonthPicker from "../../examples/ts/rangeMonthPicker?raw";
import RangeMonthPickerSelectsRange from "../../examples/ts/rangeMonthPickerSelectsRange?raw";
import RangeQuarterPicker from "../../examples/ts/rangeQuarterPicker?raw";
import RangeQuarterPickerSelectsRange from "../../examples/ts/rangeQuarterPickerSelectsRange?raw";
import RangeSwapRange from "../../examples/ts/rangeSwapRange?raw";
import ReadOnly from "../../examples/ts/readOnly?raw";
import ShowTime from "../../examples/ts/showTime?raw";
import ShowTimeOnly from "../../examples/ts/showTimeOnly?raw";
import HideTimeCaption from "../../examples/ts/hideTimeCaption?raw";
import MultiMonthPrevious from "../../examples/ts/multiMonthPrevious?raw";
import SpecificDateRange from "../../examples/ts/specificDateRange?raw";
import ExcludeTimePeriod from "../../examples/ts/excludeTimePeriod?raw";
import SelectsMultiple from "../../examples/ts/selectsMultiple?raw";
import SelectsMultipleMonths from "../../examples/ts/selectsMultipleMonths?raw";
import SelectsMultipleFormat from "../../examples/ts/selectsMultipleFormat?raw";
import StrictParsing from "../../examples/ts/strictParsing?raw";
import TabIndex from "../../examples/ts/tabIndex?raw";
import Today from "../../examples/ts/today?raw";
import YearPicker from "../../examples/ts/yearPicker?raw";
import RangeYearPicker from "../../examples/ts/rangeYearPicker?raw";
import RangeYearPickerSelectsRange from "../../examples/ts/rangeYearPickerSelectsRange?raw";
import YearDropdown from "../../examples/ts/yearDropdown?raw";
import YearSelectDropdown from "../../examples/ts/yearSelectDropdown?raw";
import YearItemNumber from "../../examples/ts/yearItemNumber?raw";
import WeekPicker from "../../examples/ts/weekPicker?raw";
import ExcludeWeeks from "../../examples/ts/excludeWeeks?raw";
import ExternalForm from "../../examples/ts/externalForm?raw";

export const EXAMPLE_CONFIG: IExampleConfig[] = [
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
    title: "Custom input with popper positioning",
    component: PopperTargetRef,
    description:
      "Use popperTargetRef to position the calendar relative to a specific element within your custom input, rather than the wrapper div.",
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
    title: "Custom Day Names",
    component: RenderCustomDayName,
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
    component: SelectsRangeWithDisabledDates,
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
    title: "Inline version disabled",
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
    component: MonthPickerFullName,
  },
  {
    title: "Month Picker Two Columns Layout",
    component: MonthPickerTwoColumns,
  },
  {
    title: "Month Picker Four Columns Layout",
    component: MonthPickerFourColumns,
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
    component: RangeSwapRange,
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
    title: "Select multiple dates with custom format",
    component: SelectsMultipleFormat,
  },
  {
    title: "Select multiple months",
    component: SelectsMultipleMonths,
  },
  {
    title: "Strict parsing",
    description:
      "Enables strict format validation for manual date input. When this flag is activated, the component will only accept values that exactly match the specified date format (`dateFormat`).",
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
