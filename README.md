# React Date Picker
[![Bower version](https://badge.fury.io/bo/react-date-picker.svg)](http://badge.fury.io/bo/react-date-picker)
[![Build Status](https://travis-ci.org/Hacker0x01/react-datepicker.svg?branch=master)](https://travis-ci.org/Hacker0x01/react-datepicker)
[![devDependency Status](https://david-dm.org/Hacker0x01/react-datepicker/dev-status.svg)](https://david-dm.org/Hacker0x01/react-datepicker#info=devDependencies)
[![Downloads](http://img.shields.io/npm/dm/react-datepicker.svg)](https://npmjs.org/package/react-datepicker)

A simple and reusable datepicker component for React ([Demo](https://hacker0x01.github.io/react-datepicker/))

![](https://cloud.githubusercontent.com/assets/1412392/5339491/c40de124-7ee1-11e4-9f07-9276e2545f27.png)

## Configuration

- Change date format by passing a different date format in the props: `dateFormat: "YYYY/MM/DD"`
- Add placeholder text: `placeholderText: 'Click to select a date'` (Defaults to the selected date when no placeholder text is added)
- Give users a predefined date range: `minDate: moment()` & `maxDate: moment().add(5, 'days')` (this gives users the ability to select a date between today and 5 days in the future)
- Exclude a set of dates from those that are selectable: `excludeDates: [ moment(), moment('2015-01-01') ]` (prevent users from selecting today or Jan 1st, 2015)
- Set custom moment.js instance (could have defined custom locale settings): `moment: require('./foo/moment')`
- Set custom locale settings for locale: `locale: "cs"`
- Set date format for calendar: `dateFormatCalendar: "YYYY/MM/DD"`
- Set custom weekdays (for locale days): `weekdays: ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So']`
- Set custom calendar week start day: `weekStart: '0'` would start the week on Sunday

## Installation

Installing is really simple and can be done in multiple ways:

- Install with Bower: `bower install react-date-picker`
- Install with npm: `npm install react-datepicker --save`
- Install with Bundler: `bundle install rails-assets-react-date-picker`

## Local Development

- Install Bower `npm install -g bower`
- Install Bower Packages `bower install`
- Install packages `npm install`
- Run `grunt watch` in order to watch for local changes and run tests/build the code.
- Start a static webserver `python -m SimpleHTTPServer`
- And visit `localhost:8000/example` to see the example.

You can also test server side rendering:

- `$ node example/node-rendering.js`

You should see the HTML returned.

To run tests, simply run `npm test`.

## License

Copyright (c) 2014 HackerOne Inc. and individual contributors. Licensed under MIT license, see [LICENSE](LICENSE) for the full license.
