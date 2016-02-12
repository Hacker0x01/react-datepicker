import React from "react";
import { Router, Route, IndexRoute, Link, browserHistory } from "react-router";
import ExampleComponents from "./example_components.jsx";
import HeroExample from "./hero_example.jsx";
import ApiDocs from "./api_docs.jsx";

const App = React.createClass({
  render() {
    return (
      <div>
        <div className="hero">
          <div className="hero__content">
            <h1 className="hero__title">
              ReactJS Datepicker
            </h1>
            <div className="hero__crafted-by">
              <a href="https://hackerone.com" className="hero__crafted-by-link">
                Crafted by <img src="images/logo.png" className="hero__image" alt="HackerOne" title="HackerOne" />
              </a>
            </div>
            <div className="hero__example">
              <HeroExample />
            </div>
          </div>
        </div>
        <div>
          <ul>
            <li><Link to="/">Readme</Link></li>
            <li><Link to="/examples">Examples</Link></li>
            <li><Link to="/docs">API Docs</Link></li>
          </ul>
        </div>

        <div className="wrapper">
          {this.props.children}
        </div>

        <a href="https://github.com/Hacker0x01/react-datepicker/">
          <img className="github-ribbon" src="images/ribbon.png" alt="Fork me on GitHub" />
        </a>
      </div>
    );
  }
});

const ReadMe = React.createClass({
  render() {
    return (
      <div>
        <h1>ReactJS Datepicker</h1>
        <p>
          <a href="https://npmjs.org/package/react-datepicker">
            <img src="https://badge.fury.io/js/react-datepicker.svg" className="badge" />
          </a>
          <a href="https://travis-ci.org/Hacker0x01/react-datepicker">
            <img src="https://travis-ci.org/Hacker0x01/react-datepicker.svg?branch=master" className="badge" />
          </a>
          <a href="https://david-dm.org/Hacker0x01/react-datepicker">
            <img src="https://david-dm.org/Hacker0x01/react-datepicker.svg" className="badge" />
          </a>
          <a href={"https://npmjs.org/package/react-datepicker" +
            "?__hstc=72727564.ca821b01b5b29b1831f0936a681f0483.1428679773810.1435582678273.1438354735499.5" +
            "&__hssc=72727564.1.1438354735499" +
            "&__hsfp=2497064007"}>
            <img src="https://img.shields.io/npm/dm/react-datepicker.svg" className="badge" />
          </a>
        </p>
        <p>A simple and reusable datepicker component for React.</p>

        <h2>Installation</h2>
        <p>The package can be installed via NPM:</p>
        <p><code>npm install react-datepicker --save</code></p>
      </div>
    );
  }
});

const Examples = React.createClass({
  render() {
    return (
      <ExampleComponents />
    );
  }
});

const Docs = React.createClass({
  render() {
    return (
      <ApiDocs />
    );
  }
});

export default React.createClass({
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={ReadMe} />
          <Route path="examples" component={Examples} />
          <Route path="docs" component={Docs} />
        </Route>
      </Router>
    );
  }
});
