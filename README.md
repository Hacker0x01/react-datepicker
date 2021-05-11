# React Date Picker

[![npm version](https://badge.fury.io/js/react-datepicker.svg)](https://badge.fury.io/js/react-datepicker)
[![Test suite](https://github.com/Hacker0x01/react-datepicker/actions/workflows/test.yml/badge.svg)](https://github.com/Hacker0x01/react-datepicker/actions/workflows/test.yml)
[![Dependency Status](https://david-dm.org/Hacker0x01/react-datepicker.svg)](https://david-dm.org/Hacker0x01/react-datepicker)
[![codecov](https://codecov.io/gh/Hacker0x01/react-datepicker/branch/master/graph/badge.svg)](https://codecov.io/gh/Hacker0x01/react-datepicker)
[![Downloads](https://img.shields.io/npm/dm/react-datepicker.svg)](https://npmjs.org/package/react-datepicker)
[![Code Quality: Javascript](https://img.shields.io/lgtm/grade/javascript/g/Hacker0x01/react-datepicker.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Hacker0x01/react-datepicker/context:javascript)
[![Total Alerts](https://img.shields.io/lgtm/alerts/g/Hacker0x01/react-datepicker.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Hacker0x01/react-datepicker/alerts)

A simple and reusable Datepicker component for React ([Demo](https://reactdatepicker.com/))

![](https://cloud.githubusercontent.com/assets/1412392/5339491/c40de124-7ee1-11e4-9f07-9276e2545f27.png)

## Installation

The package can be installed via [npm](https://github.com/npm/cli):

```
npm install react-datepicker --save
```

Or via [yarn](https://github.com/yarnpkg/yarn):

```
yarn add react-datepicker
```

You’ll need to install React and PropTypes separately since those dependencies aren’t included in the package. If you need to use a locale other than the default en-US, you'll also need to import that into your project from date-fns (see Localization section below). Below is a simple example of how to use the Datepicker in a React view. You will also need to require the CSS file from this package (or provide your own). The example below shows how to include the CSS from this package if your build system supports requiring CSS files (Webpack is one that does).

```js
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const Example = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
  );
};
```

## Configuration

The most basic use of the DatePicker can be described with:

```js
<DatePicker selected={startdate} onChange={(date) => setStartDate(date)} />
```

You can use `onSelect` event handler which fires each time some calendar date has been selected

```js
<DatePicker
  selected={date}
  onSelect={handleDateSelect} //when day is clicked
  onChange={handleDateChange} //only when value has changed
/>
```

`onClickOutside` handler may be useful to close datepicker in `inline` mode

See [here](https://github.com/Hacker0x01/react-datepicker/blob/master/docs/datepicker.md) for a full list of props that may be passed to the component. Examples are given on the [main website](https://hacker0x01.github.io/react-datepicker).

### Time picker

You can also include a time picker by adding the showTimeSelect prop

```js
<DatePicker
  selected={date}
  onChange={handleDateChange}
  showTimeSelect
  dateFormat="Pp"
/>
```

Times will be displayed at 30-minute intervals by default (default configurable via timeIntervals prop)

More examples of how to use the time picker are given on the [main website](https://hacker0x01.github.io/react-datepicker)

### Localization

The date picker relies on [date-fns internationalization](https://date-fns.org/v2.0.0-alpha.18/docs/I18n) to localize its display components. By default, the date picker will use the locale globally set, which is English. Provided are 3 helper methods to set the locale:

- **registerLocale** (string, object): loads an imported locale object from date-fns
- **setDefaultLocale** (string): sets a registered locale as the default for all datepicker instances
- **getDefaultLocale**: returns a string showing the currently set default locale

```js
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)

<DatePicker
  locale="es"
/>
```

Locales can be changed in the following way:

- **Globally** - `setDefaultLocale('es');`

## Compatibility

### React

We're always trying to stay compatible with the latest version of React. We can't support all older versions of React.

Latest compatible versions:

- React 16 or newer: React-datepicker v2.9.4 and newer
- React 15.5: React-datepicker v2.9.3
- React 15.4.1: needs React-datepicker v0.40.0, newer won't work (due to react-onclickoutside dependencies)
- React 0.14 or newer: All above React-datepicker v0.13.0
- React 0.13: React-datepicker v0.13.0
- pre React 0.13: React-datepicker v0.6.2

### Moment.js

Up until version 1.8.0, this package was using Moment.js. Starting v2.0.0, we switched to using `date-fns`, which uses native Date objects, to reduce the size of the package. If you're switching from 1.8.0 to 2.0.0 or higher, please see the updated example above of check out the [examples site](https://reactdatepicker.com) for up to date examples.

### Browser Support

The date picker is compatible with the latest versions of Chrome, Firefox, and IE10+.

Unfortunately, it is difficult to support legacy browsers while maintaining our ability to develop new features in the future. For IE9 support, it is known that the [classlist polyfill](https://www.npmjs.com/package/classlist-polyfill) is needed, but this may change or break at any point in the future.

## Local Development

The `master` branch contains the latest version of the Datepicker component.

To begin local development:

1. `yarn install`
2. `yarn build-dev`
3. `yarn start`

The last step starts documentation app as a simple webserver on http://localhost:3000.

You can run `yarn test` to execute the test suite and linters. To help you develop the component we’ve set up some tests that cover the basic functionality (can be found in `/tests`). Even though we’re big fans of testing, this only covers a small piece of the component. We highly recommend you add tests when you’re adding new functionality.

### The examples

The examples are hosted within the docs folder and are ran in the simple app that loads the Datepicker. To extend the examples with a new example, you can simply duplicate one of the existing examples and change the unique properties of your example.

## Accessibility

### Keyboard support

- _Left_: Move to the previous day.
- _Right_: Move to the next day.
- _Up_: Move to the previous week.
- _Down_: Move to the next week.
- _PgUp_: Move to the previous month.
- _PgDn_: Move to the next month.
- _Home_: Move to the previous year.
- _End_: Move to the next year.
- _Enter/Esc/Tab_: close the calendar. (Enter & Esc calls preventDefault)

#### For month picker

- _Left_: Move to the previous month.
- _Right_: Move to the next month.
- _Enter_: Select date and close the calendar

## License

Copyright (c) 2014-2021 HackerOne Inc. and individual contributors. Licensed under MIT license, see [LICENSE](LICENSE) for the full license.
