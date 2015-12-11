import React from 'react';
import ExampleComponents from './example_components.jsx';
import HeroExample from './hero_example.jsx';

export default React.createClass({
  render() {
    return (
      <div>
        <div className="hero">
          <div className="hero__content">
            <h1 className="hero__title">
              ReactJS Datepicker
            </h1>
            <div className="hero__crafted-by">
              Crafted by <img src="images/logo.png" className="hero__image" alt="HackerOne" title="HackerOne" />
            </div>
            <div className="hero__example">
              <HeroExample />
            </div>
          </div>
        </div>
        <div className="wrapper">
          <h1>ReactJS Datepicker</h1>
          <p>
            <a href="http://badge.fury.io/bo/react-date-picker">
              <img src="https://badge.fury.io/bo/react-date-picker.svg" className="badge" />
            </a>
            <a href="https://travis-ci.org/Hacker0x01/react-datepicker">
              <img src="https://travis-ci.org/Hacker0x01/react-datepicker.svg?branch=master" className="badge" />
            </a>
            <a href="https://david-dm.org/Hacker0x01/react-datepicker#info=devDependencies">
              <img src="https://david-dm.org/Hacker0x01/react-datepicker/dev-status.svg" className="badge" />
            </a>
            <a href="https://npmjs.org/package/react-datepicker?__hstc=72727564.ca821b01b5b29b1831f0936a681f0483.1428679773810.1435582678273.1438354735499.5&__hssc=72727564.1.1438354735499&__hsfp=2497064007">
              <img src="https://img.shields.io/npm/dm/react-datepicker.svg" className="badge" />
            </a>
          </p>
          <p>A simple and reusable datepicker component for React.</p>
          <h2>Configuration</h2>
          <ul>
            <li>Change date format by passing a different date format in the props: <code>dateFormat: "YYYY/MM/DD"</code></li>
            <li>Add placeholder text: placeholderText: 'Click to select a date' (Defaults to the selected date when no placeholder text is added)</li>
            <li>Give users a predefined date range: <code>minDate: moment() &amp; maxDate: moment().add(5, 'days')</code> (this gives users the ability to select a date between today and 5 days in the future)</li>
            <li>Exclude a set of dates from those that are selectable: <code>excludeDates: [ moment(), moment('2015-01-01') ]</code> (prevent users from selecting today or Jan 1st, 2015)</li>
            <li>Set custom moment.js instance (could have defined custom locale settings): <code>moment: require('./foo/moment')</code></li>
            <li>Set custom locale settings for locale: <code>locale: "cs"</code></li>
            <li>Set date format for callendar: <code>dateFormatCalendar: "YYYY/MM/DD"</code></li>
            <li>Set custom weekdays (for locale days): <code>weekdays: ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So']</code></li>
          </ul>
          <h2>Installation</h2>
          <p>Installing is really simple and can be done in multiple ways:</p>
          <ul>
            <li>Install with Bower: <code>bower install react-date-picker</code></li>
            <li>Install with npm: <code>npm install react-datepicker --save</code></li>
            <li>Install with Bundler: <code>bundle install rails-assets-react-date-picker</code></li>
          </ul>
          <h2>License</h2>
          <p>
            Copyright (c) 2015 HackerOne Inc. and individual contributors. Licensed under MIT license, see LICENSE for the full license.
          </p>
        </div>
        <div className="wrapper">
          <ExampleComponents />
        </div>
      </div>
    );
  }
});
