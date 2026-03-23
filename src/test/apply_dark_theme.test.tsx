import { applyDarkTheme } from "../apply_dark_theme";

describe("applyDarkTheme", () => {
  let setPropertySpy: jest.SpyInstance;

  beforeEach(() => {
    setPropertySpy = jest.spyOn(
      document.documentElement.style,
      "setProperty"
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Dark Theme", () => {
    it("should apply all dark theme CSS variables", () => {
      applyDarkTheme(true);

      expect(setPropertySpy).toHaveBeenCalledWith(
        "--datepicker__container-background-color",
        "#000000"
      );

      expect(setPropertySpy).toHaveBeenCalledWith(
        "--datepicker__header-background-color",
        "#333"
      );

      expect(setPropertySpy).toHaveBeenCalledWith(
        "--datepicker__text-color",
        "#ffffff"
      );

      expect(setPropertySpy).toHaveBeenCalledWith(
        "--datepicker__header-color",
        "#ffffff"
      );

      expect(setPropertySpy).toHaveBeenCalledWith(
        "--datepicker__hover-text-color",
        "#000"
      );

      expect(setPropertySpy).toHaveBeenCalledWith(
        "--datepicker__background-color",
        "#000000"
      );

      expect(setPropertySpy).toHaveBeenCalledWith(
        "--datepicker__time-container-background-color",
        "#7e7b7b"
      );

      expect(setPropertySpy).toHaveBeenCalledWith(
        "--datepicker__today-button-background-color",
        "#333"
      );

      expect(setPropertySpy).toHaveBeenCalledWith(
        "--datepicker__today-button-text-color",
        "#ffffff"
      );

      expect(setPropertySpy).toHaveBeenCalledWith(
        "--datepicker-time-icon-filter",
        "invert(1)"
      );
    });
  });

  describe("Light Theme", () => {
    it("should apply all light theme CSS variables", () => {
      applyDarkTheme(false);

      expect(setPropertySpy).toHaveBeenCalledWith(
        "--datepicker__container-background-color",
        "#ffffff"
      );

      expect(setPropertySpy).toHaveBeenCalledWith(
        "--datepicker__header-background-color",
        "#f0f0f0"
      );

      expect(setPropertySpy).toHaveBeenCalledWith(
        "--datepicker__text-color",
        "#000"
      );

      expect(setPropertySpy).toHaveBeenCalledWith(
        "--datepicker__header-color",
        "#000"
      );

      expect(setPropertySpy).toHaveBeenCalledWith(
        "--datepicker__hover-text-color",
        "#000"
      );

      expect(setPropertySpy).toHaveBeenCalledWith(
        "--datepicker__background-color",
        "#f0f0f0"
      );

      expect(setPropertySpy).toHaveBeenCalledWith(
        "--datepicker__time-container-background-color",
        "#f0f0f0"
      );

      expect(setPropertySpy).toHaveBeenCalledWith(
        "--datepicker__today-button-background-color",
        "#f0f0f0"
      );

      expect(setPropertySpy).toHaveBeenCalledWith(
        "--datepicker__today-button-text-color",
        "#000"
      );

      expect(setPropertySpy).toHaveBeenCalledWith(
        "--datepicker-time-icon-filter",
        "none"
      );
    });
  });

  describe("Edge Cases", () => {
    it("should call setProperty exactly 10 times", () => {
      applyDarkTheme(true);

      expect(setPropertySpy).toHaveBeenCalledTimes(10);
    });

    it("should not throw when executed", () => {
      expect(() => applyDarkTheme(true)).not.toThrow();
      expect(() => applyDarkTheme(false)).not.toThrow();
    });

    it("should handle unexpected runtime values gracefully", () => {
      applyDarkTheme(undefined as unknown as boolean);

      expect(setPropertySpy).toHaveBeenCalled();
    });
  });
});