import { IExampleConfig } from "../../types";

import Default from "../../examples/js/default?raw";
import NoAnchorArrow from "../../examples/js/noAnchorArrow?raw";
import ShowTime from "../../examples/js/showTime?raw";
import ShowTimeOnly from "../../examples/js/showTimeOnly?raw";
import HideTimeCaption from "../../examples/js/hideTimeCaption?raw";
import ExcludeTimes from "../../examples/js/excludeTimes?raw";
import IncludeTimes from "../../examples/js/includeTimes?raw";
import InjectTimes from "../../examples/js/injectTimes?raw";
import FilterTimes from "../../examples/js/filterTimes?raw";
import ExcludeTimePeriod from "../../examples/js/excludeTimePeriod?raw";
import CustomDateFormat from "../../examples/js/customDateFormat?raw";
import CustomClassName from "../../examples/js/customClassName?raw";
import CustomCalendarClassName from "../../examples/js/customCalendarClassName?raw";
import CustomDayClassName from "../../examples/js/customDayClassName?raw";
import CustomTimeClassName from "../../examples/js/customTimeClassName?raw";
import Today from "../../examples/js/today?raw";
import PlaceholderText from "../../examples/js/placeholderText?raw";
import SpecificDateRange from "../../examples/js/specificDateRange?raw";
import MinDate from "../../examples/js/minDate?raw";
import MaxDate from "../../examples/js/maxDate?raw";
import DateRangeWithShowDisabledNavigation from "../../examples/js/dateRangeWithShowDisabledNavigation?raw";
import Locale from "../../examples/js/locale?raw";
import LocaleWithTime from "../../examples/js/localeWithTime?raw";
import LocaleWithoutGlobalVariable from "../../examples/js/localeWithoutGlobalVariable?raw";
import ExcludeDates from "../../examples/js/excludeDates?raw";
import ExcludedWithMessage from "../../examples/js/excludeDatesWithMessage?raw";
import ExcludeDateIntervals from "../../examples/js/excludeDateIntervals?raw";
import ExcludeDatesMonthPicker from "../../examples/js/excludeDatesMonthPicker?raw";
import ExcludeDatesRangeMonthPicker from "../../examples/js/excludeDatesRangeMonthPicker?raw";
import HighlightDates from "../../examples/js/highlightDates?raw";
import HolidayDates from "../../examples/js/holidayDates?raw";
import HighlightDatesRanges from "../../examples/js/highlightDatesRanges?raw";
import IncludeDates from "../../examples/js/includeDates?raw";
import IncludeDateIntervals from "../../examples/js/includeDateIntervals?raw";
import IncludeDatesMonthPicker from "../../examples/js/includeDatesMonthPicker?raw";
import FilterDates from "../../examples/js/filterDates?raw";
import DateRange from "../../examples/js/dateRange?raw";
import DateRangeInputWithClearButton from "../../examples/js/dateRangeInputWithClearButton?raw";
import DateRangeWithPortal from "../../examples/js/dateRangeWithPortal?raw";
import Disabled from "../../examples/js/disabled?raw";
import DisabledKeyboardNavigation from "../../examples/js/disabledKeyboardNavigation?raw";
import ReadOnly from "../../examples/js/readOnly?raw";
import ClearInput from "../../examples/js/clearInput?raw";
import OnBlurCallbacks from "../../examples/js/onBlurCallbacks?raw";
import ConfigureFloatingUI from "../../examples/js/configureFloatingUI?raw";
import Portal from "../../examples/js/portal?raw";
import PortalById from "../../examples/js/portalById?raw";
import WithPortalById from "../../examples/js/withPortalById?raw";
import TabIndex from "../../examples/js/tabIndex?raw";
import YearDropdown from "../../examples/js/yearDropdown?raw";
import YearItemNumber from "../../examples/js/yearItemNumber?raw";
import MonthDropdown from "../../examples/js/monthDropdown?raw";
import MonthDropdownShort from "../../examples/js/monthDropdownShort?raw";
import MonthYearDropdown from "../../examples/js/monthYearDropdown?raw";
import YearSelectDropdown from "../../examples/js/yearSelectDropdown?raw";
import Inline from "../../examples/js/inline?raw";
import InlineVisible from "../../examples/js/inlineVisible?raw";
import OpenToDate from "../../examples/js/openToDate?raw";
import FixedCalendar from "../../examples/js/fixedCalendar?raw";
import WeekNumbers from "../../examples/js/weekNumbers?raw";
import CustomInput from "../../examples/js/customInput?raw";
import MultiMonth from "../../examples/js/multiMonth?raw";
import MultiMonthPrevious from "../../examples/js/multiMonthPrevious?raw";
import MultiMonthDropdown from "../../examples/js/multiMonthDropdown?raw";
import MultiMonthInline from "../../examples/js/multiMonthInline?raw";
import Children from "../../examples/js/children?raw";
import CalendarContainer from "../../examples/js/calendarContainer?raw";
import RawChange from "../../examples/js/rawChange?raw";
import DontCloseOnSelect from "../../examples/js/dontCloseOnSelect?raw";
import RenderCustomHeader from "../../examples/js/renderCustomHeader?raw";
import RenderCustomHeaderTwoMonths from "../../examples/js/renderCustomHeaderTwoMonths?raw";
import RenderCustomDay from "../../examples/js/renderCustomDay?raw";
import RenderCustomMonth from "../../examples/js/renderCustomMonth?raw";
import RenderCustomQuarter from "../../examples/js/renderCustomQuarter?raw";
import RenderCustomYear from "../../examples/js/renderCustomYear?raw";
import TimeInput from "../../examples/js/timeInput?raw";
import StrictParsing from "../../examples/js/strictParsing?raw";
import MonthPicker from "../../examples/js/monthPicker?raw";
import WeekPicker from "../../examples/js/weekPicker?raw";
import ExcludeWeeks from "../../examples/js/excludeWeeks?raw";
import monthPickerFullName from "../../examples/js/monthPickerFullName?raw";
import monthPickerTwoColumns from "../../examples/js/monthPickerTwoColumns?raw";
import monthPickerFourColumns from "../../examples/js/monthPickerFourColumns?raw";
import RangeMonthPicker from "../../examples/js/rangeMonthPicker?raw";
import RangeMonthPickerSelectsRange from "../../examples/js/rangeMonthPickerSelectsRange?raw";
import QuarterPicker from "../../examples/js/quarterPicker?raw";
import RangeQuarterPicker from "../../examples/js/rangeQuarterPicker?raw";
import RangeQuarterPickerSelectsRange from "../../examples/js/rangeQuarterPickerSelectsRange?raw";
import YearPicker from "../../examples/js/yearPicker?raw";
import RangeYearPicker from "../../examples/js/rangeYearPicker?raw";
import RangeYearPickerSelectsRange from "../../examples/js/rangeYearPickerSelectsRange?raw";
import OnCalendarChangeStateCallbacks from "../../examples/js/onCalendarOpenStateCallbacks?raw";
import CustomTimeInput from "../../examples/js/customTimeInput?raw";
import CloseOnScroll from "../../examples/js/closeOnScroll?raw";
import CloseOnScrollCallback from "../../examples/js/closeOnScrollCallback?raw";
import SelectsRange from "../../examples/js/selectsRange?raw";
import selectsRangeWithDisabledDates from "../../examples/js/selectsRangeWithDisabledDates?raw";
import CalendarStartDay from "../../examples/js/calendarStartDay?raw";
import ExternalForm from "../../examples/js/externalForm?raw";
import CalendarIcon from "../../examples/js/calendarIcon?raw";
import SelectsMultiple from "../../examples/js/selectsMultiple?raw";
import SelectsMultipleMonths from "../../examples/js/selectsMultipleMonths?raw";
import CalendarIconExternal from "../../examples/js/calendarIconExternal?raw";
import CalendarIconSvgIcon from "../../examples/js/calendarIconSvgIcon?raw";
import ToggleCalendarOnIconClick from "../../examples/js/toggleCalendarOnIconClick?raw";
import RangeSwapRange from "../../examples/js/rangeSwapRange?raw";

// TS Examples
import {
  defaultTS,
  calendarContainerTS,
  calendarIconTS,
  calendarIconSvgIconTS,
  calendarIconExternalTS,
  calendarStartDayTS,
  onCalendarOpenStateCallbacksTS,
  toggleCalendarOnIconClickTS,
  childrenTS,
  clearInputTS,
  closeOnScrollTS,
  closeOnScrollCallbackTS,
  configureFloatingUIS,
  customInputTS,
  renderCustomHeaderTS,
  renderCustomHeaderTwoMonthsTS,
  renderCustomDayTS,
  renderCustomMonthTS,
  renderCustomQuarterTS,
  renderCustomYearTS,
  customCalendarClassNameTS,
  customClassNameTS,
  customDayClassNameTS,
  customDateFormatTS,
  customTimeClassNameTS,
  customTimeInputTS,
  dateRangeTS,
  selectsRangeTS,
  selectsRangeWithDisabledDatesTS,
  dateRangeWithShowDisabledNavigationTS,
  dateRangeInputWithClearButtonTS,
  dateRangeWithPortalTS,
  disabledTS,
  disabledKeyboardNavigationTS,
  weekNumbersTS,
  dontCloseOnSelectTS,
  excludeDatesTS,
  excludeDatesWithMessageTS,
  excludeDateIntervalsTS,
  excludeDatesMonthPickerTS,
  excludeDatesRangeMonthPickerTS,
  excludeTimesTS,
  filterDatesTS,
  filterTimesTS,
  fixedCalendarTS,
  rawChangeTS,
  highlightDatesTS,
  highlightDatesRangesTS,
  holidayDatesTS,
  includeDatesTS,
  includeDateIntervalsTS,
  includeDatesMonthPickerTS,
  includeTimesTS,
  injectTimesTS,
  inlineTS,
  inlineVisibleTS,
  timeInputTS,
  localeTS,
  localeWithTimeTS,
  localeWithoutGlobalVariableTS,
  maxDateTS,
  minDateTS,
  monthPickerTS,
  monthPickerFullNameTS,
  monthPickerTwoColumnsTS,
  monthPickerFourColumnsTS,
  monthDropdownTS,
  monthDropdownShortTS,
  monthYearDropdownTS,
  multiMonthTS,
  multiMonthDropdownTS,
  multiMonthInlineTS,
  noAnchorArrowTS,
  onBlurCallbacksTS,
  openToDateTS,
  placeholderTextTS,
  portalTS,
  portalByIdTS,
  withPortalByIdTS,
  quarterPickerTS,
  rangeMonthPickerTS,
  rangeMonthPickerSelectsRangeTS,
  rangeQuarterPickerTS,
  rangeQuarterPickerSelectsRangeTS,
  rangeSwapRangeTS,
  readOnlyTS,
  showTimeTS,
  showTimeOnlyTS,
  hideTimeCaptionTS,
  multiMonthPreviousTS,
  specificDateRangeTS,
  excludeTimePeriodTS,
  selectsMultipleTS,
  selectsMultipleMonthsTS,
  strictParsingTS,
  tabIndexTS,
  todayTS,
  yearPickerTS,
  rangeYearPickerTS,
  rangeYearPickerSelectsRangeTS,
  yearDropdownTS,
  yearSelectDropdownTS,
  yearItemNumberTS,
  weekPickerTS,
  excludeWeeksTS,
  externalFormTS,
} from "../../examples/ts";

export const EXAMPLE_CONFIG: IExampleConfig[] = [
  {
    title: "Default",
    component: Default,
    componentTS: defaultTS,
  },
  {
    title: "Calendar Icon",
    component: CalendarIcon,
    componentTS: calendarIconTS,
  },
  {
    title: "Calendar Icon using React Svg Component",
    component: CalendarIconSvgIcon,
    componentTS: calendarIconSvgIconTS,
  },
  {
    title: "Calendar Icon using External Lib",
    component: CalendarIconExternal,
    componentTS: calendarIconExternalTS,
  },
  {
    title: "Toggle Calendar open status on click of the calendar icon",
    component: ToggleCalendarOnIconClick,
    componentTS: toggleCalendarOnIconClickTS,
  },
  {
    title: "Calendar container",
    component: CalendarContainer,
    componentTS: calendarContainerTS,
  },
  {
    title: "Calendar open state callbacks",
    component: OnCalendarChangeStateCallbacks,
    componentTS: onCalendarOpenStateCallbacksTS,
  },
  {
    title: "Children",
    component: Children,
    componentTS: childrenTS,
  },
  {
    title: "Clear datepicker input",
    component: ClearInput,
    componentTS: clearInputTS,
  },
  {
    title: "Close on scroll",
    component: CloseOnScroll,
    componentTS: closeOnScrollTS,
  },
  {
    title: "Close on scroll callback",
    component: CloseOnScrollCallback,
    componentTS: closeOnScrollCallbackTS,
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
    componentTS: configureFloatingUIS,
  },
  {
    title: "Custom input",
    component: CustomInput,
    componentTS: customInputTS,
  },
  {
    title: "Custom header",
    component: RenderCustomHeader,
    componentTS: renderCustomHeaderTS,
  },
  {
    title: "Custom header with two months displayed",
    component: RenderCustomHeaderTwoMonths,
    componentTS: renderCustomHeaderTwoMonthsTS,
  },
  {
    title: "Custom Day",
    component: RenderCustomDay,
    componentTS: renderCustomDayTS,
  },
  {
    title: "Custom Month",
    component: RenderCustomMonth,
    componentTS: renderCustomMonthTS,
  },
  {
    title: "Custom Quarter",
    component: RenderCustomQuarter,
    componentTS: renderCustomQuarterTS,
  },
  {
    title: "Custom Year",
    component: RenderCustomYear,
    componentTS: renderCustomYearTS,
  },
  {
    title: "Custom calendar class name",
    component: CustomCalendarClassName,
    componentTS: customCalendarClassNameTS,
  },
  {
    title: "Custom class name",
    component: CustomClassName,
    componentTS: customClassNameTS,
  },
  {
    title: "Custom day class name",
    component: CustomDayClassName,
    componentTS: customDayClassNameTS,
  },
  {
    title: "Custom date format",
    component: CustomDateFormat,
    componentTS: customDateFormatTS,
  },
  {
    title: "Custom time class name",
    component: CustomTimeClassName,
    componentTS: customTimeClassNameTS,
  },
  {
    title: "Custom time input",
    component: CustomTimeInput,
    componentTS: customTimeInputTS,
  },
  {
    title: "Date Range",
    component: DateRange,
    componentTS: dateRangeTS,
  },
  {
    title: "Date range for one datepicker",
    component: SelectsRange,
    componentTS: selectsRangeTS,
  },
  {
    title: "Date range for one datepicker with disabled dates highlighted",
    component: selectsRangeWithDisabledDates,
    componentTS: selectsRangeWithDisabledDatesTS,
  },
  {
    title: "Date Range with disabled navigation shown",
    component: DateRangeWithShowDisabledNavigation,
    componentTS: dateRangeWithShowDisabledNavigationTS,
  },
  {
    title: "Date Range using input with clear button",
    component: DateRangeInputWithClearButton,
    componentTS: dateRangeInputWithClearButtonTS,
  },
  {
    title: "Date Range with Portal",
    component: DateRangeWithPortal,
    componentTS: dateRangeWithPortalTS,
  },
  {
    title: "Disable datepicker",
    component: Disabled,
    componentTS: disabledTS,
  },
  {
    title: "Disable keyboard navigation",
    component: DisabledKeyboardNavigation,
    componentTS: disabledKeyboardNavigationTS,
  },
  {
    title: "Display Week Numbers",
    component: WeekNumbers,
    componentTS: weekNumbersTS,
  },
  {
    title: "Don't hide calendar on date selection",
    component: DontCloseOnSelect,
    componentTS: dontCloseOnSelectTS,
  },
  {
    title: "Exclude dates",
    component: ExcludeDates,
    componentTS: excludeDatesTS,
  },
  {
    title: "Exclude dates with message",
    component: ExcludedWithMessage,
    componentTS: excludeDatesWithMessageTS,
  },
  {
    title: "Exclude date intervals",
    component: ExcludeDateIntervals,
    componentTS: excludeDateIntervalsTS,
  },
  {
    title: "Exclude Months in Month Picker",
    component: ExcludeDatesMonthPicker,
    componentTS: excludeDatesMonthPickerTS,
  },
  {
    title: "Exclude Months in Range Month Picker",
    component: ExcludeDatesRangeMonthPicker,
    componentTS: excludeDatesRangeMonthPickerTS,
  },
  {
    title: "Exclude Times",
    component: ExcludeTimes,
    componentTS: excludeTimesTS,
  },
  {
    title: "Filter dates",
    component: FilterDates,
    componentTS: filterDatesTS,
  },
  {
    title: "Filter times",
    component: FilterTimes,
    componentTS: filterTimesTS,
  },
  {
    title: "Fixed height of Calendar",
    component: FixedCalendar,
    componentTS: fixedCalendarTS,
  },
  {
    title: "Get raw input value on change",
    component: RawChange,
    componentTS: rawChangeTS,
  },
  {
    title: "Highlight dates",
    component: HighlightDates,
    componentTS: highlightDatesTS,
  },
  {
    title: "Highlight dates with custom class names and ranges",
    component: HighlightDatesRanges,
    componentTS: highlightDatesRangesTS,
  },
  {
    title: "Holiday dates",
    component: HolidayDates,
    componentTS: holidayDatesTS,
  },
  {
    title: "Include dates",
    component: IncludeDates,
    componentTS: includeDatesTS,
  },
  {
    title: "Include date intervals",
    component: IncludeDateIntervals,
    componentTS: includeDateIntervalsTS,
  },
  {
    title: "Include Months in Month Picker",
    component: IncludeDatesMonthPicker,
    componentTS: includeDatesMonthPickerTS,
  },
  {
    title: "Include Times",
    component: IncludeTimes,
    componentTS: includeTimesTS,
  },
  {
    title: "Inject Specific Times",
    component: InjectTimes,
    componentTS: injectTimesTS,
  },
  {
    title: "Inline version",
    component: Inline,
    componentTS: inlineTS,
  },
  {
    title: "Button to show Inline version",
    component: InlineVisible,
    componentTS: inlineVisibleTS,
  },
  {
    title: "Input time",
    component: TimeInput,
    componentTS: timeInputTS,
  },
  {
    title: "Locale",
    component: Locale,
    componentTS: localeTS,
  },
  {
    title: "Locale with time",
    component: LocaleWithTime,
    componentTS: localeWithTimeTS,
  },
  {
    title: "Locale without global variables",
    component: LocaleWithoutGlobalVariable,
    componentTS: localeWithoutGlobalVariableTS,
  },
  {
    title: "Min date",
    component: MinDate,
    componentTS: minDateTS,
  },
  {
    title: "Max date",
    component: MaxDate,
    componentTS: maxDateTS,
  },
  {
    title: "Month Picker",
    component: MonthPicker,
    componentTS: monthPickerTS,
  },
  {
    title: "Month Picker with Full Name",
    component: monthPickerFullName,
    componentTS: monthPickerFullNameTS,
  },
  {
    title: "Month Picker Two Columns Layout",
    component: monthPickerTwoColumns,
    componentTS: monthPickerTwoColumnsTS,
  },
  {
    title: "Month Picker Four Columns Layout",
    component: monthPickerFourColumns,
    componentTS: monthPickerFourColumnsTS,
  },
  {
    title: "Month dropdown",
    component: MonthDropdown,
    componentTS: monthDropdownTS,
  },
  {
    title: "Month dropdown short month",
    component: MonthDropdownShort,
    componentTS: monthDropdownShortTS,
  },
  {
    title: "MonthYear dropdown",
    component: MonthYearDropdown,
    componentTS: monthYearDropdownTS,
  },
  {
    title: "Multiple months",
    component: MultiMonth,
    componentTS: multiMonthTS,
  },
  {
    title: "Multiple months with year dropdown",
    component: MultiMonthDropdown,
    componentTS: multiMonthDropdownTS,
  },
  {
    title: "Multiple months inline",
    component: MultiMonthInline,
    componentTS: multiMonthInlineTS,
  },
  {
    title: "No Anchor Arrow",
    component: NoAnchorArrow,
    componentTS: noAnchorArrowTS,
  },
  {
    title: "onBlur callbacks in console",
    component: OnBlurCallbacks,
    componentTS: onBlurCallbacksTS,
  },
  {
    title: "Open to date",
    component: OpenToDate,
    componentTS: openToDateTS,
  },
  {
    title: "Placeholder text",
    component: PlaceholderText,
    componentTS: placeholderTextTS,
  },
  {
    title: "Portal version",
    component: Portal,
    componentTS: portalTS,
  },
  {
    title: "Portal by id",
    description:
      "If the provided portalId cannot be found in the dom, one will be created by default with that id.",
    component: PortalById,
    componentTS: portalByIdTS,
  },
  {
    title: "Portal version with portal by id",
    description:
      "If the provided portalId cannot be found in the dom, one will be created by default with that id.",
    component: WithPortalById,
    componentTS: withPortalByIdTS,
  },
  {
    title: "Quarter Picker",
    component: QuarterPicker,
    componentTS: quarterPickerTS,
  },
  {
    title: "Range Month Picker",
    component: RangeMonthPicker,
    componentTS: rangeMonthPickerTS,
  },
  {
    title: "Range Month Picker for one month picker",
    component: RangeMonthPickerSelectsRange,
    componentTS: rangeMonthPickerSelectsRangeTS,
  },
  {
    title: "Range Quarter Picker",
    component: RangeQuarterPicker,
    componentTS: rangeQuarterPickerTS,
  },
  {
    title: "Range Quarter Picker for one quarter picker",
    component: RangeQuarterPickerSelectsRange,
    componentTS: rangeQuarterPickerSelectsRangeTS,
  },
  {
    title: "Range Swap Range",
    description:
      "Swap the start and end date if the end date is before the start date in a pick sequence.",
    component: RangeSwapRange,
    componentTS: rangeSwapRangeTS,
  },
  {
    title: "Read only datepicker",
    component: ReadOnly,
    componentTS: readOnlyTS,
  },
  {
    title: "Select Time",
    component: ShowTime,
    componentTS: showTimeTS,
  },
  {
    title: "Select Time Only",
    component: ShowTimeOnly,
    componentTS: showTimeOnlyTS,
  },
  {
    title: "Hide Time Caption",
    component: HideTimeCaption,
    componentTS: hideTimeCaptionTS,
  },
  {
    title: "Show previous months",
    component: MultiMonthPrevious,
    componentTS: multiMonthPreviousTS,
  },
  {
    title: "Specific date range",
    component: SpecificDateRange,
    componentTS: specificDateRangeTS,
  },
  {
    title: "Specific Time Range",
    component: ExcludeTimePeriod,
    componentTS: excludeTimePeriodTS,
  },
  {
    title: "Select multiple dates",
    component: SelectsMultiple,
    componentTS: selectsMultipleTS,
  },
  {
    title: "Select multiple months",
    component: SelectsMultipleMonths,
    componentTS: selectsMultipleMonthsTS,
  },
  {
    title: "Strict parsing",
    description:
      "Enables strict format validation for manual date input. When this flag is activated, the component will only accept values that exactly match the specified date format (`dateFormat`).",
    component: StrictParsing,
    componentTS: strictParsingTS,
  },
  {
    title: "TabIndex",
    component: TabIndex,
    componentTS: tabIndexTS,
  },
  {
    title: "Today button",
    component: Today,
    componentTS: todayTS,
  },
  {
    title: "Year Picker",
    component: YearPicker,
    componentTS: yearPickerTS,
  },
  {
    title: "Range Year Picker",
    component: RangeYearPicker,
    componentTS: rangeYearPickerTS,
  },
  {
    title: "Range Year Picker for one datepicker",
    component: RangeYearPickerSelectsRange,
    componentTS: rangeYearPickerSelectsRangeTS,
  },
  {
    title: "Year dropdown",
    component: YearDropdown,
    componentTS: yearDropdownTS,
  },
  {
    title: "Year select dropdown",
    component: YearSelectDropdown,
    componentTS: yearSelectDropdownTS,
  },
  {
    title: "Year item number",
    component: YearItemNumber,
    componentTS: yearItemNumberTS,
  },
  {
    title: "Calendar Start day",
    component: CalendarStartDay,
    componentTS: calendarStartDayTS,
  },
  {
    title: "Week Picker",
    component: WeekPicker,
    componentTS: weekPickerTS,
  },
  {
    title: "Exclude Weeks",
    component: ExcludeWeeks,
    componentTS: excludeWeeksTS,
  },
  {
    title: "External Form",
    component: ExternalForm,
    componentTS: externalFormTS,
  },
];
