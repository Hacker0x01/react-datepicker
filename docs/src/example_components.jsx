import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import hljs from "highlight.js";

import Default from "./examples/default";
import CustomDateFormat from "./examples/custom_date_format";
import CustomClassName from "./examples/custom_class_name";
import PlaceholderText from "./examples/placeholder_text";
import SpecificDateRange from "./examples/specific_date_range";
import CustomStartDate from "./examples/custom_start_date";
import ExcludeDates from "./examples/exclude_dates";
import IncludeDates from "./examples/include_dates";
import Disabled from "./examples/disabled";
import ClearInput from "./examples/clear_input";
import OnBlurCallbacks from "./examples/on_blur_callbacks";
import Weekdays from "./examples/weekdays";
import Placement from "./examples/placement";
import DateRange from "./examples/date_range";
import TabIndex from "./examples/tab_index";
import HideYearDropdown from "./examples/hide_year_dropdown";

import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";

const CodeExampleComponent = React.createClass({
  displayName: "CodeExampleComponent",

  render() {
    return <div key={this.props.id} id={`example-${this.props.id}`} className="example">
      <h2 className="example__heading">{this.props.title}</h2>
      {this.props.children}
    </div>;
  }
});

export default React.createClass({
  displayName: "exampleComponents",

  examples: [
    {
      title: "Default",
      component: <Default />
    },
    {
      title: "Custom date format",
      component: <CustomDateFormat />
    },
    {
      title: "Custom class name",
      component: <CustomClassName />
    },
    {
      title: "Placeholder text",
      component: <PlaceholderText />
    },
    {
      title: "Specific date range",
      component: <SpecificDateRange />
    },
    {
      title: "Custom week start day",
      component: <CustomStartDate />
    },
    {
      title: "Exclude dates",
      component: <ExcludeDates />
    },
    {
      title: "Include dates",
      component: <IncludeDates />
    },
    {
      title: "Date Range",
      component: <DateRange />
    },
    {
      title: "Disable datepicker",
      component: <Disabled />
    },
    {
      title: "Clear datepicker input",
      component: <ClearInput />
    },
    {
      title: "onBlur callbacks in console",
      component: <OnBlurCallbacks />
    },
    {
      title: "Custom weekdays",
      component: <Weekdays />
    },
    {
      title: "Configure Popover Placement",
      component: <Placement />
    },
    {
      title: "TabIndex",
      component: <TabIndex />
    },
    {
      title: "Hide year dropdown",
      component: <HideYearDropdown />
    }
  ],

  componentDidMount() {
    hljs.initHighlightingOnLoad();
  },

  renderExamples() {
    return this.examples.map((example, index) =>
      <CodeExampleComponent key={`example-${index}`} id={index} title={example.title}>
        {example.component}
      </CodeExampleComponent>
    );
  },

  renderLeftColumn() {
    return this.examples.map((example, index) =>
      <li className="examples__navigation-item" key={`link-${index}`}>
        <a href={`#example-${index}`}>
          {example.title}
        </a>
      </li>
    );
  },

  render() {
    return <div>
      <h1>Examples</h1>
      <ul className="examples__navigation">
        {this.renderLeftColumn()}
      </ul>
      <div className="examples">
        {this.renderExamples()}
      </div>
    </div>;
  }
});
