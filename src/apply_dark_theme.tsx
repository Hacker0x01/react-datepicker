export const applyDarkTheme = (isDarkTheme: boolean) => {
  const root = document.documentElement;

  const variables = {
    "--datepicker__container-background-color": isDarkTheme ? "#000000" : "#ffffff",
    "--datepicker__header-background-color": isDarkTheme ? "#333" : "#f0f0f0",
    "--datepicker__text-color": isDarkTheme ? "#ffffff" : "#000",
    "--datepicker__header-color": isDarkTheme ? "#ffffff" : "#000",
    "--datepicker__hover-text-color": "#000",
    "--datepicker__background-color": isDarkTheme ? "#000000" : "#f0f0f0",
    "--datepicker__time-container-background-color": isDarkTheme ? "#7e7b7b" : "#f0f0f0",
    "--datepicker__today-button-background-color": isDarkTheme ? "#333" : "#f0f0f0",
    "--datepicker__today-button-text-color": isDarkTheme ? "#ffffff" : "#000",
    "--datepicker-time-icon-filter": isDarkTheme ? "invert(1)" : "none"
  };

  Object.entries(variables).forEach(([key, value]) =>
    root.style.setProperty(key, value)
  );
};