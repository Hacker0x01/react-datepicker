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
import MonthHeaderPosition from "../../examples/ts/monthHeaderPosition?raw";
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
import Timezone from "../../examples/ts/timezone?raw";

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
    title: "Calendar Icon Using React SVG Component",
    component: CalendarIconSvgIcon,
  },
  {
    title: "Calendar Icon Using External Library",
    component: CalendarIconExternal,
  },
  {
    title: "Toggle Calendar on Icon Click",
    component: ToggleCalendarOnIconClick,
  },
  {
    title: "Calendar Container",
    component: CalendarContainer,
  },
  {
    title: "Calendar Open/Close Callbacks",
    component: OnCalendarChangeStateCallbacks,
  },
  {
    title: "Render Children in Datepicker",
    component: Children,
  },
  {
    title: "Clearable Datepicker Input",
    component: ClearInput,
  },
  {
    title: "Close on Scroll",
    component: CloseOnScroll,
  },
  {
    title: "Close on Scroll Callback",
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
    title: "Custom Input",
    component: CustomInput,
  },
  {
    title: "Custom Input with Popper Positioning",
    component: PopperTargetRef,
    description:
      "Use popperTargetRef to position the calendar relative to a specific element within your custom input, rather than the wrapper div.",
  },
  {
    title: "Custom Header",
    component: RenderCustomHeader,
  },
  {
    title: "Custom Header with Two Months Displayed",
    component: RenderCustomHeaderTwoMonths,
  },
  {
    title: "Custom Day Names",
    component: RenderCustomDayName,
  },
  {
    title: "Month Header Position",
    component: MonthHeaderPosition,
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
    title: "Custom Calendar Class Name",
    component: CustomCalendarClassName,
  },
  {
    title: "Custom Class Name",
    component: CustomClassName,
  },
  {
    title: "Custom Day Class Name",
    component: CustomDayClassName,
  },
  {
    title: "Custom Date Format",
    component: CustomDateFormat,
  },
  {
    title: "Custom Time Class Name",
    component: CustomTimeClassName,
  },
  {
    title: "Custom Time Input",
    component: CustomTimeInput,
  },
  {
    title: "Date Range",
    component: DateRange,
  },
  {
    title: "Date Range in a Single Datepicker",
    component: SelectsRange,
  },
  {
    title: "Date Range in a Single Datepicker with Disabled Dates",
    component: SelectsRangeWithDisabledDates,
  },
  {
    title: "Date Range with Disabled Navigation Shown",
    component: DateRangeWithShowDisabledNavigation,
  },
  {
    title: "Clearable Range Input",
    component: DateRangeInputWithClearButton,
  },
  {
    title: "Date Range with Portal",
    component: DateRangeWithPortal,
  },
  {
    title: "Disable Datepicker",
    component: Disabled,
  },
  {
    title: "Disable Keyboard Navigation",
    component: DisabledKeyboardNavigation,
  },
  {
    title: "Display Week Numbers",
    component: WeekNumbers,
  },
  {
    title: "Don't Hide Calendar on Date Selection",
    component: DontCloseOnSelect,
  },
  {
    title: "Exclude Dates",
    component: ExcludeDates,
  },
  {
    title: "Exclude Dates with Message",
    component: ExcludedWithMessage,
  },
  {
    title: "Exclude Date Intervals",
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
    title: "Filter Dates",
    component: FilterDates,
  },
  {
    title: "Filter Times",
    component: FilterTimes,
  },
  {
    title: "Fixed Height of Calendar",
    component: FixedCalendar,
  },
  {
    title: "Read Raw Input Value on Change",
    component: RawChange,
  },
  {
    title: "Highlight Dates",
    component: HighlightDates,
  },
  {
    title: "Highlight Dates with Custom Class Names and Ranges",
    component: HighlightDatesRanges,
  },
  {
    title: "Holiday Dates",
    component: HolidayDates,
  },
  {
    title: "Include Dates",
    component: IncludeDates,
  },
  {
    title: "Include Date Intervals",
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
    title: "Inline Version",
    component: Inline,
  },
  {
    title: "Inline Version Disabled",
    component: InlineDisabled,
  },
  {
    title: "Button to Toggle Inline Datepicker Visibility",
    component: InlineVisible,
  },
  {
    title: "Input Time",
    component: TimeInput,
  },
  {
    title: "Locale",
    component: Locale,
  },
  {
    title: "Locale with Time",
    component: LocaleWithTime,
  },
  {
    title: "Locale without Global Variables",
    component: LocaleWithoutGlobalVariable,
  },
  {
    title: "Min Date",
    component: MinDate,
  },
  {
    title: "Max Date",
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
    title: "Month Dropdown",
    component: MonthDropdown,
  },
  {
    title: "Month Dropdown (Short Names)",
    component: MonthDropdownShort,
  },
  {
    title: "Month/Year Dropdown",
    component: MonthYearDropdown,
  },
  {
    title: "Multiple Months",
    component: MultiMonth,
  },
  {
    title: "Multiple Months with Year Dropdown",
    component: MultiMonthDropdown,
  },
  {
    title: "Multiple Months Inline",
    component: MultiMonthInline,
  },
  {
    title: "No Anchor Arrow",
    component: NoAnchorArrow,
  },
  {
    title: "onBlur Callbacks in Console",
    component: OnBlurCallbacks,
  },
  {
    title: "Open to Date",
    component: OpenToDate,
  },
  {
    title: "Placeholder Text",
    component: PlaceholderText,
  },
  {
    title: "Portal Version",
    component: Portal,
  },
  {
    title: "Portal by ID",
    description:
      "If the provided portalId cannot be found in the dom, one will be created by default with that id.",
    component: PortalById,
  },
  {
    title: "Portal Version with Portal by ID",
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
    title: "Range Month Picker in a Single Month Picker",
    component: RangeMonthPickerSelectsRange,
  },
  {
    title: "Range Quarter Picker",
    component: RangeQuarterPicker,
  },
  {
    title: "Range Quarter Picker in a Single Quarter Picker",
    component: RangeQuarterPickerSelectsRange,
  },
  {
    title: "Auto-Swap Date Range",
    description:
      "Automatically swap the start and end date if the end date is before the start date in a pick sequence.",
    component: RangeSwapRange,
  },
  {
    title: "Read-Only Datepicker",
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
    title: "Show Previous Months",
    component: MultiMonthPrevious,
  },
  {
    title: "Specific Date Range",
    component: SpecificDateRange,
  },
  {
    title: "Specific Time Range",
    component: ExcludeTimePeriod,
  },
  {
    title: "Select Multiple Dates",
    component: SelectsMultiple,
  },
  {
    title: "Select Multiple Dates with Custom Format",
    component: SelectsMultipleFormat,
  },
  {
    title: "Select Multiple Months",
    component: SelectsMultipleMonths,
  },
  {
    title: "Strict Parsing",
    description:
      "Enables strict format validation for manual date input. When this flag is activated, the component will only accept values that exactly match the specified date format (`dateFormat`).",
    component: StrictParsing,
  },
  {
    title: "TabIndex",
    component: TabIndex,
  },
  {
    title: "Today Button",
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
    title: "Range Year Picker in a Single Year Picker",
    component: RangeYearPickerSelectsRange,
  },
  {
    title: "Year Dropdown",
    component: YearDropdown,
  },
  {
    title: "Year Select Dropdown",
    component: YearSelectDropdown,
  },
  {
    title: "Year List Item Count",
    component: YearItemNumber,
  },
  {
    title: "Calendar Start Day",
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
  {
    title: "Timezone",
    description:
      "Display and handle dates in a specific timezone using the timeZone prop. Requires date-fns-tz as a peer dependency.",
    component: Timezone,
  },
];
