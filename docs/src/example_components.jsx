var React = require('react');
var DatePicker = require('react-datepicker');
var moment = require('moment');
var hljs = require('highlight.js');

var Default = require('./examples/default');
var CustomDateFormat = require('./examples/custom_date_format');
var CustomClassName = require('./examples/custom_class_name');
var PlaceholderText = require('./examples/placeholder_text');
var SpecificDateRange = require('./examples/specific_date_range');
var CustomStartDate = require('./examples/custom_start_date');
var ExcludeDates = require('./examples/exclude_dates');
var Disabled = require('./examples/disabled');
var ClearInput = require('./examples/clear_input');
var OnBlurCallbacks = require('./examples/on_blur_callbacks');
var Weekdays = require('./examples/weekdays');
var Placement = require('./examples/placement');

require('react-datepicker/dist/react-datepicker.css');
require('./style.scss');

var CodeExampleComponent = React.createClass({
  displayName: 'CodeExampleComponent',

  render: function() {
    var exampleID = "example-" + this.props.id

    return <div key={this.props.id} id={exampleID} className="example">
      <h2 className="example__heading">{this.props.title}</h2>
      {this.props.children}
    </div>
  },
}),

exampleComponents = React.createClass({
  displayName: 'exampleComponents',

  examples: [
    {
      title: 'Default',
      component: <Default />,
    },
    {
      title: 'Custom date format',
      component: <CustomDateFormat />,
    },
    {
      title: 'Custom class name',
      component: <CustomClassName />,
    },
    {
      title: 'Placeholder text',
      component: <PlaceholderText />,
    },
    {
      title: 'Specific date range',
      component: <SpecificDateRange />,
    },
    {
      title: 'Custom start date',
      component: <CustomStartDate />,
    },
    {
      title: 'Exclude dates',
      component: <ExcludeDates />,
    },
    {
      title: 'Disable datepicker',
      component: <Disabled />,
    },
    {
      title: 'Clear datepicker input',
      component: <ClearInput />,
    },
    {
      title: 'onBlur callbacks in console',
      component: <OnBlurCallbacks />,
    },
    {
      title: 'Custom weekdays',
      component: <Weekdays />,
    },
    {
      title: 'Configure Popover Placement',
      component: <Placement />,
    },
  ],

  componentDidMount: function() {
    hljs.initHighlightingOnLoad();
  },

  renderExamples: function() {
    return this.examples.map(function(example, index) {
      return <CodeExampleComponent key={"example-" + index} id={index} title={example.title}>
        {example.component}
      </CodeExampleComponent>
    });
  },

  renderLeftColumn: function() {
    return this.examples.map(function(example, index) {
      var exampleID = "#example-" + index

      return <li className="examples__navigation-item" key={"link-" + index}>
        <a href={exampleID}>
          {example.title}
        </a>
      </li>
    });
  },

  render: function() {
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

module.exports = exampleComponents;
