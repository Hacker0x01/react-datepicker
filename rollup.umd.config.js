import config from "./rollup.config.js";
import { uglify } from "rollup-plugin-uglify";

const umdConfig = {
  ...config,
  output: {
    ...config.output,
    format: "umd",
    name: "DatePicker",
    globals: {
      react: "React",
      "prop-types": "PropTypes",
      "react-onclickoutside": "onClickOutside",
      "react-popper": "ReactPopper",
      classnames: "classNames"
    }
  }
};

if (process.env.NODE_ENV === "production") {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true
      },
      warnings: false
    })
  );
}

export default umdConfig;
