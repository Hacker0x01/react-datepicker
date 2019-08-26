import React, { useState } from "react";
import ExampleComponents from "../Examples";
import ribbon from "./ribbon.png";
import logo from "./logo.png";
import DatePicker from "react-datepicker";

const Root = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
      <div className="hero">
        <div className="hero__content">
          <h1 className="hero__title">ReactJS Datepicker</h1>
          <div className="hero__crafted-by">
            <a href="https://hackerone.com" className="hero__crafted-by-link">
              Crafted by{" "}
              <img
                src={logo}
                ungiu
                className="hero__image"
                alt="HackerOne"
                title="HackerOne"
              />
            </a>
          </div>
          <div className="hero__example">
            <DatePicker
              autoFocus
              selected={startDate}
              onChange={date => setStartDate(date)}
            />
          </div>
        </div>
      </div>
      <div className="wrapper">
        <h1>ReactJS Datepicker</h1>
        <p className="badges">
          <a href="https://npmjs.org/package/react-datepicker">
            <img
              src="https://badge.fury.io/js/react-datepicker.svg"
              alt="NPM package version badge"
              className="badge"
            />
          </a>
          <a href="https://travis-ci.org/Hacker0x01/react-datepicker">
            <img
              src="https://travis-ci.org/Hacker0x01/react-datepicker.svg?branch=master"
              alt="Travis CI status badge"
              className="badge"
            />
          </a>
          <a href="https://david-dm.org/Hacker0x01/react-datepicker">
            <img
              src="https://david-dm.org/Hacker0x01/react-datepicker.svg"
              alt="Dependency status badge"
              className="badge"
            />
          </a>
          <a href={"https://npmjs.org/package/react-datepicker"}>
            <img
              src="https://img.shields.io/npm/dm/react-datepicker.svg"
              alt="Download count badge"
              className="badge"
            />
          </a>
        </p>
        <p>A simple and reusable datepicker component for React.</p>

        <h2>Installation</h2>
        <p>The package can be installed via NPM:</p>
        <p>
          <code>npm install react-datepicker --save</code>
        </p>
        <p>Or by using Yarn:</p>
        <p>
          <code>yarn add react-datepicker</code>
        </p>
      </div>
      <div className="wrapper">
        <ExampleComponents />
      </div>

      <a href="https://github.com/Hacker0x01/react-datepicker/">
        <img className="github-ribbon" src={ribbon} alt="Fork me on GitHub" />
      </a>
    </div>
  );
};

export default Root;
