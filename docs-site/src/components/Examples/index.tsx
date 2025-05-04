import React from "react";
import hljs from "highlight.js/lib/core";
import hljsJavaScriptLanguage from "highlight.js/lib/languages/javascript";
import slugify from "slugify";
import CodeExampleComponent from "../Example/index.jsx";

import "./style.scss";
import "react-datepicker/dist/react-datepicker.css";
import { EXAMPLE_CONFIG } from './config.js';

export default class exampleComponents extends React.Component {
  componentDidMount() {
    hljs.registerLanguage("javascript", hljsJavaScriptLanguage);
    hljs.highlightAll();
  }

  handleAnchorClick = (e: React.MouseEvent, id: string): void => {
    e.preventDefault();
    window.history.replaceState(null, document.title, `#${id}`);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  render() {
    return (
      <>
        <h1>Examples</h1>
        <ul className="examples__navigation">
          {EXAMPLE_CONFIG.map((example) => (
            <li
              className="examples__navigation-item"
              key={`link-${example.title}`}
            >
              <a
                href={`#example-${slugify(example.title, { lower: true })}`}
                onClick={(e) =>
                  this.handleAnchorClick(
                    e,
                    `example-${slugify(example.title, { lower: true })}`,
                  )
                }
              >
                {example.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="examples">
          {EXAMPLE_CONFIG.map((example) => (
            <CodeExampleComponent key={example.title} example={example} />
          ))}
        </div>
      </>
    );
  }
}
