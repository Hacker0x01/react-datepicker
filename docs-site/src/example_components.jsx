import React from 'react'
import hljs from 'highlight.js'
import Default from './examples/default'
import CodeExampleComponent from './code_example_component'

import CustomDateFormat from './examples/custom_date_format'
import CustomClassName from './examples/custom_class_name'
import PlaceholderText from './examples/placeholder_text'
import SpecificDateRange from './examples/specific_date_range'
import Locale from './examples/locale'
import ExcludeDates from './examples/exclude_dates'
import IncludeDates from './examples/include_dates'
import FilterDates from './examples/filter_dates'
import Disabled from './examples/disabled'
import ClearInput from './examples/clear_input'
import OnBlurCallbacks from './examples/on_blur_callbacks'
import Placement from './examples/placement'
import DateRange from './examples/date_range'
import TabIndex from './examples/tab_index'
import YearDropdown from './examples/year_dropdown'
import Today from './examples/today'
import Inline from './examples/inline'
import OpenToDate from './examples/open_to_date'

import 'react-datepicker/dist/react-datepicker.css'
import './style.scss'

export default React.createClass({
  displayName: 'exampleComponents',

  componentDidMount () {
    hljs.initHighlightingOnLoad()
  },

  examples: [
    {
      title: 'Default',
      component: <Default />
    },
    {
      title: 'Custom date format',
      component: <CustomDateFormat />
    },
    {
      title: 'Custom class name',
      component: <CustomClassName />
    },
    {
      title: 'Today button',
      component: <Today />
    },
    {
      title: 'Placeholder text',
      component: <PlaceholderText />
    },
    {
      title: 'Specific date range',
      component: <SpecificDateRange />
    },
    {
      title: 'Locale',
      component: <Locale />
    },
    {
      title: 'Exclude dates',
      component: <ExcludeDates />
    },
    {
      title: 'Include dates',
      component: <IncludeDates />
    },
    {
      title: 'Filter dates',
      component: <FilterDates />
    },
    {
      title: 'Date Range',
      component: <DateRange />
    },
    {
      title: 'Disable datepicker',
      component: <Disabled />
    },
    {
      title: 'Clear datepicker input',
      component: <ClearInput />
    },
    {
      title: 'onBlur callbacks in console',
      component: <OnBlurCallbacks />
    },
    {
      title: 'Configure Popover Placement',
      component: <Placement />
    },
    {
      title: 'TabIndex',
      component: <TabIndex />
    },
    {
      title: 'Year dropdown',
      component: <YearDropdown />
    },
    {
      title: 'Inline version',
      component: <Inline />
    },
    {
      title: 'Open to date',
      component: <OpenToDate />
    }
  ],

  renderExamples () {
    return this.examples.map((example, index) =>
      <CodeExampleComponent key={`example-${index}`} id={index} title={example.title}>
        {example.component}
      </CodeExampleComponent>
    )
  },

  renderLeftColumn () {
    return this.examples.map((example, index) =>
      <li className="examples__navigation-item" key={`link-${index}`}>
        <a href={`#example-${index}`}>
          {example.title}
        </a>
      </li>
    )
  },

  render () {
    return <div>
      <h1>Examples</h1>
      <ul className="examples__navigation">
        {this.renderLeftColumn()}
      </ul>
      <div className="examples">
        {this.renderExamples()}
      </div>
    </div>
  }
})
