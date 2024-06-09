const babelTargetList = [
  "helper_components/custom_input\\.tsx",
  "calendar_test\\.test\\.tsx",
  "datepicker_test\\.test\\.tsx",
];

const tsTargetList = [
  "helper_components/calendar_icon\\.tsx",
  // "helper_components/custom_input\\.tsx",
  "helper_components/custom_time_input\\.tsx",
  "helper_components/test_wrapper\\.tsx",
  "calendar_icon\\.test\\.tsx",
  // "calendar_test\\.test\\.tsx",
  "date_utils_test\\.test\\.ts",
  // "datepicker_test\\.test\\.tsx",
  "day_test\\.test\\.tsx",
  "exclude_dates\\.test\\.tsx",
  "exclude_time_period_test\\.test\\.tsx",
  "exclude_times_test\\.test\\.tsx",
  "filter_times_test\\.test\\.tsx",
  "include_times_test\\.test\\.tsx",
  "index\\.ts",
  "inject_times_test\\.test\\.tsx",
  "min_time_test\\.test\\.tsx",
  "month_dropdown_test\\.test\\.tsx",
  "month_test\\.test\\.tsx",
  "month_year_dropdown_test\\.test\\.tsx",
  "multi_month_test\\.test\\.tsx",
  "multiple_selected_dates\\.test\\.tsx",
  "run_axe\\.tsx",
  "show_time_test\\.test\\.tsx",
  "test_utils\\.ts",
  "time_format_test\\.test\\.tsx",
  "time_input_test\\.test\\.tsx",
  "timepicker_test\\.test\\.tsx",
  "week_number_test\\.test\\.tsx",
  "week_picker_test\\.test\\.tsx",
  "week_test\\.test\\.tsx",
  "year_dropdown_options_test\\.test\\.tsx",
  "year_dropdown_test\\.test\\.tsx",
  "year_picker_test\\.test\\.tsx",
];

module.exports = {
  roots: ["./src/test"],
  setupFilesAfterEnv: ["<rootDir>/src/test/index.ts"],
  testEnvironment: "jest-environment-jsdom",
  collectCoverage: true,
  coverageReporters: ["json", "lcov", "text", "clover"],
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
  ],
  transformIgnorePatterns: ["/node_modules/(?!date-fns)"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
    ...babelTargetList.reduce((prev, item) => {
      return {
        ...prev,
        // [`^<rootDir>/src/test/${item}$`]: "babel-jest",
        [`^.+/src/test/${item}$`]: "babel-jest",
        // [`^<rootDir>/${item}$`]: "babel-jest",
        // [`^.+/${item}$`]: "babel-jest",
      };
    }, {}),
    ...tsTargetList.reduce((prev, item) => {
      return {
        ...prev,
        // [`^<rootDir>/src/test/${item}$`]: "ts-jest",
        [`^.+/src/test/${item}$`]: "ts-jest",
        // [`^<rootDir>/${item}$`]: "ts-jest",
        // [`^.+/${item}$`]: "ts-jest",
      };
    }, {}),
    "^.+/src/(?!test/).*\\.(ts|tsx)$": "ts-jest",
    // TODO: use it after the migration
    // "^.+\\.ts?$": "ts-jest",
    "node_modules/(?!date-fns/.*)": "ts-jest",
  },
};
