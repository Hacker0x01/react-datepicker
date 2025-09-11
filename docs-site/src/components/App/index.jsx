import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import ExampleComponents from "../Examples";
import { initializeTsxTransformer } from "../tsxTransformer";
import logo from "./logo.png";
import ribbon from "./ribbon.png";

const Example = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [isScrolled, setIsScrolled] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY < 400);
    document.addEventListener("scroll", handleScroll);

    initializeTsxTransformer();

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <DatePicker
      open={isOpen && isScrolled}
      selected={startDate}
      onChange={(date) => {
        setStartDate(date);
        setIsOpen(false);
      }}
      onInputClick={() => setIsOpen(true)}
    />
  );
};

const Root = () => (
  <div>
    <div className="hero">
      <div className="hero__content">
        <h1 className="hero__title">React Datepicker</h1>
        <div className="hero__crafted-by">
          <a href="https://hackerone.com" className="hero__crafted-by-link">
            Crafted by{" "}
            <img
              src={logo}
              className="hero__image"
              alt="HackerOne"
              title="HackerOne"
            />
          </a>
        </div>
        <div className="hero__example">
          <Example />
        </div>
      </div>
    </div>
    <div className="wrapper">
      <h1>React Datepicker</h1>
      <p className="badges">
        <a href="https://npmjs.org/package/react-datepicker">
          <img
            src="https://badge.fury.io/js/react-datepicker.svg"
            alt="NPM package version badge"
            className="badge"
          />
        </a>
        <a href="https://github.com/Hacker0x01/react-datepicker/actions/workflows/test.yml">
          <img
            src="https://github.com/Hacker0x01/react-datepicker/actions/workflows/test.yml/badge.svg"
            alt="Test suite status badge"
            className="badge"
          />
        </a>
        <a href="https://codecov.io/gh/Hacker0x01/react-datepicker">
          <img
            src="https://codecov.io/gh/Hacker0x01/react-datepicker/branch/main/graph/badge.svg"
            alt="codecov"
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
      <p>
        Below are examples which also can be edited directly via the editor on
        the left side and will be rendered on the right.
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

export default Root;
