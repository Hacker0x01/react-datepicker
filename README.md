# React Date Picker

[![npm version](https://badge.fury.io/js/react-datepicker.svg)](https://badge.fury.io/js/react-datepicker)
[![Build Status](https://travis-ci.org/Hacker0x01/react-datepicker.svg?branch=master)](https://travis-ci.org/Hacker0x01/react-datepicker)
[![Dependency Status](https://david-dm.org/Hacker0x01/react-datepicker.svg)](https://david-dm.org/Hacker0x01/react-datepicker)
[![codecov](https://codecov.io/gh/Hacker0x01/react-datepicker/branch/master/graph/badge.svg)](https://codecov.io/gh/Hacker0x01/react-datepicker)
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
import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
    />;
  }
}
```

## Configuration

The most basic use of the DatePicker can be described with:

```js
<DatePicker selected={this.state.date} onChange={this.handleChange} />
```

You can use `onSelect` event handler which fires each time some calendar date has been selected

```js
<DatePicker selected={this.state.date}
  onSelect={this.handleSelect //when day is clicked}
  onChange={this.handleChange //only when value has changed}
/>
```

`onClickOutside` handler may be useful to close datepicker in `inline` mode

See [here](https://github.com/Hacker0x01/react-datepicker/blob/master/docs/datepicker.md) for a full list of props that may be passed to the component. Examples are given on the [main website](https://hacker0x01.github.io/react-datepicker).

### Localization

The date picker relies on [moment.js internationalization](http://momentjs.com/docs/#/i18n/) to localize its display components. By default, the date picker will use the locale globally set in moment, which is English. Locales can be changed in the following ways:

- **Globally** by calling `moment.locale(lang)`
- **Picker-specific** by providing the `locale` prop

Locales can be further configured in moment with various [customization options](http://momentjs.com/docs/#/customization/).

_As of version 0.23, the `weekdays` and `weekStart` DatePicker props have been removed. Instead, they can be configured with the `weekdaysMin` and `week.dow` moment locale customization options._

## Compatibility

### React

We're always trying to stay compatible with the latest version of React. We can't support all older versions of React, since React is still < 1.0 and introducing breaking changes every release.

Latest compatible versions:
- React 15.5 or newer: All above React-datepicker v.0.40.0
- React 15.4.1: needs React-datepicker v0.40.0, newer won't work (due to react-onclickoutside dependencies)
- React 0.14 or newer: All above React-datepicker v0.13.0
- React 0.13: React-datepicker v0.13.0
- pre React 0.13: React-datepicker v0.6.2

### Browser Support

The date picker is compatible with the latest versions of Chrome, Firefox, and IE10+.

Unfortunately it is difficult to support legacy browsers while maintaining our ability to develop new features in the future.  For IE9 support, it is known that the [classlist polyfill](https://www.npmjs.com/package/classlist-polyfill) is needed, but this may change or break at any point in the future.

## Local Development

The `master` branch contains the latest version of the Datepicker component. To start your example app, you can run `yarn start`. This starts a simple webserver on http://localhost:8080.

You can run `yarn test` to execute the test suite and linters. To help you develop the component we’ve set up some tests that covers the basic functionality (can be found in  `/tests`). Even though we’re big fans of testing, this only covers a small piece of the component. We highly recommend you add tests when you’re adding new functionality.

### The examples
The examples are hosted within the docs folder and are ran in the simple add that loads the Datepicker. To extend the examples with a new example, you can simply duplicate one of the existing examples and change the unique properties of your example.

## Accessibility

### Keyboard support

* *Left*: Move to the previous day.
* *Right*: Move to the next day.
* *Up*: Move to the previous week.
* *Down*: Move to the next week.
* *PgUp*: Move to the previous month.
* *PgDn*: Move to the next month.
* *Home*: Move to the previous year.
* *End*: Move to the next year.
* *Enter/Esc/Tab*: close the calendar. (Enter & Esc calls preventDefautl)

## License

Copyright (c) 2016 HackerOne Inc. and individual contributors. Licensed under MIT license, see [LICENSE](LICENSE) for the full license.
