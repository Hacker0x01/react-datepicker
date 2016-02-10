# React Date Picker
[![npm version](https://badge.fury.io/js/react-datepicker.svg)](https://badge.fury.io/js/react-datepicker)
[![Build Status](https://travis-ci.org/Hacker0x01/react-datepicker.svg?branch=master)](https://travis-ci.org/Hacker0x01/react-datepicker)
[![Dependency Status](https://david-dm.org/Hacker0x01/react-datepicker.svg)](https://david-dm.org/Hacker0x01/react-datepicker)
[![codecov.io](https://codecov.io/github/Hacker0x01/react-datepicker/coverage.svg?branch=master)](https://codecov.io/github/Hacker0x01/react-datepicker?branch=master)
[![Downloads](http://img.shields.io/npm/dm/react-datepicker.svg)](https://npmjs.org/package/react-datepicker)

A simple and reusable Datepicker component for React ([Demo](https://hacker0x01.github.io/react-datepicker/))

![](https://cloud.githubusercontent.com/assets/1412392/5339491/c40de124-7ee1-11e4-9f07-9276e2545f27.png)

## Installation

The package can be installed via NPM:

```
npm install react-datepicker --save
```

You’ll need to install React and Moment.js separately since those dependencies aren’t included in the package. Below is a simple example on how to use the Datepicker in a React view. You will also need to require the css file from this package (or provide your own). The example below shows how to include the css from this package if your build system supports requiring css files (webpack is one that does).

```js
var React = require('react');
var DatePicker = require('react-datepicker');
var moment = require('moment');

require('react-datepicker/dist/react-datepicker.css');

var Example = React.createClass({
  displayName: 'Example',

  getInitialState: function() {
    return {
      startDate: moment()
    };
  },

  handleChange: function(date) {
    this.setState({
      startDate: date
    });
  },

  render: function() {
    return <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange} />;
  }
});
```

## Configuration

The default Datepicker can be initialised by:

```js
<DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange} />
```

This included the Datepicker with its default functionality. To use more functionality you can pass extra props to the Datepicker to enable them.

- Change date format by passing a different date format in the props: `dateFormat: “YYYY/MM/DD”`
- Add placeholder text: `placeholderText: 'Click to select a date'` (Defaults to the selected date when no placeholder text is added)
- Give users a predefined date range: `minDate: moment()` & `maxDate: moment().add(5, 'days')` (this gives users the ability to select a date between today and 5 days in the future)
- Exclude a set of dates from those that are selectable: `excludeDates: [ moment(), moment('2015-01-01') ]` (prevent users from selecting today or Jan 1st, 2015)
- Include a set of dates from those that are selectable: `includeDates: [ moment(), moment(‘2015-01-01’) ]` (allow users selecting only today or Jan 1st, 2015)
- Set custom moment.js instance (could have defined custom locale settings): `moment: require('./foo/moment')`
- Set custom locale settings for locale: `locale: 'cs'`
- Set date format for calendar: `dateFormatCalendar: 'YYYY/MM/DD'`
- Set custom weekdays (for locale days): `weekdays: ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So']`
- Set custom calendar week start day: `weekStart: '0'` would start the week on Sunday

More information about the different ways to customise available at https://hacker0x01.github.io/react-datepicker.

## Compatibility

We're always trying to stay compatible with the latest version of React. We can't support all older versions of React, since React is still < 1.0 and introducing breaking changes every release.

Latest compatible versions:
- React 0.14 or newer: All above React-datepicker v0.13.0
- React 0.13: React-datepicker v0.13.0
- pre React 0.13: React-datepicker v0.6.2

## Local Development

The `master` branch contains the latest version of the Datepicker component. To start your example app, you can run `npm start`. This starts a simple webserver on http://localhost:8080. The server will automatically compile your changes, run tests and execute linters. To help you develop the component we’ve set up some tests that covers the basic functionality (can be found in  `/tests`). Even though we’re big fans of testing, this only covers a small piece of the component. We highly recommend you add tests when you’re adding new functionality.

### The examples
The examples are hosted within the docs folder and are ran in the simple add that loads the Datepicker. To extend the examples with a new example, you can simply duplicate one of the existing examples and change the unique properties of your example.

## License

Copyright (c) 2015 HackerOne Inc. and individual contributors. Licensed under MIT license, see [LICENSE](LICENSE) for the full license.
