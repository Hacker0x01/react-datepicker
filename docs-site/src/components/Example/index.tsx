import React, { forwardRef, useState } from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import DatePicker, {
  registerLocale,
  CalendarContainer,
} from "react-datepicker";
import * as DateFNS from "date-fns";
import { fi } from "date-fns/locale/fi";
import { ptBR } from "date-fns/locale/pt-BR";
import { enGB } from "date-fns/locale/en-GB";
import slugify from "slugify";
import range from "lodash/range";
import { themes } from "prism-react-renderer";
import editIcon from "./edit-regular.svg";
import { IExampleConfig } from "../../types";

type TState = {
  activeTab: "js" | "ts";
};

type TProps = {
  example: IExampleConfig;
};

export default class CodeExampleComponent extends React.Component<
  TProps,
  TState
> {
  state: TState = {
    activeTab: "js",
  };

  componentDidMount() {
    registerLocale("fi", fi);
    registerLocale("pt-BR", ptBR);
    registerLocale("en-GB", enGB);
  }

  handleTabChange = (tab: TState["activeTab"]) => {
    this.setState({ activeTab: tab });
  };

  render() {
    const { title, description, component, componentTS } = this.props.example;
    const { activeTab } = this.state;

    const jsCode = component.trim();
    const tsCode = componentTS?.trim();

    const code = activeTab === "js" ? jsCode : tsCode;
    const isTS = activeTab === "ts";

    return (
      <div
        id={`example-${slugify(title, { lower: true })}`}
        className="example"
      >
        <h2 className="example__heading">{title}</h2>
        {description && <p>{description}</p>}
        <div className="example__tabs">
          <button
            className={`example__tab ${activeTab === "js" ? "active" : ""}`}
            onClick={() => this.handleTabChange("js")}
          >
            JavaScript
          </button>
          {tsCode && (
            <button
              className={`example__tab ${activeTab === "ts" ? "active" : ""}`}
              onClick={() => this.handleTabChange("ts")}
            >
              TypeScript
            </button>
          )}
        </div>
        <div className="row">
          <LiveProvider
            code={code}
            scope={{
              // NB any globals added here should also be referenced in ../../examples/.eslintrc
              useState,
              DatePicker,
              CalendarContainer,
              ...DateFNS,
              range,
              fi,
              forwardRef,
            }}
            theme={themes.github}
            noInline={isTS}
            language={isTS ? "tsx" : "jsx"}
          >
            <pre className="example__code">
              <img
                src={editIcon}
                className="example__code__edit_icon"
                alt="edit icon"
                title="Edit the code directly on the left side and and see the output on the right"
              />
              <LiveEditor />
            </pre>
            <div className="example__preview">
              <LiveError />
              <LivePreview />
            </div>
          </LiveProvider>
        </div>
      </div>
    );
  }
}
