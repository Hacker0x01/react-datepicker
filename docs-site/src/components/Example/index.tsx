import React, { forwardRef, useState } from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import DatePicker, {
  registerLocale,
  CalendarContainer,
} from "react-datepicker";
import { toast } from "../App/Toast";
import { transformTsx } from "../tsxTransformer";
import * as DateFNS from "date-fns";
import { fi } from "date-fns/locale/fi";
import { ptBR } from "date-fns/locale/pt-BR";
import { enGB } from "date-fns/locale/en-GB";
import copy from "copy-to-clipboard";
import { debounce } from "lodash";
import slugify from "slugify";
import range from "lodash/range";
import { themes } from "prism-react-renderer";
import copyIcon from "./copy.svg";
import editIcon from "./edit-regular.svg";
import { IExampleConfig } from "../../types";

type TState = {
  activeTab: "js" | "ts";
  isTranspiling: boolean;
  tsxCode: string;
  jsxCode: string;
};

type TProps = {
  example: IExampleConfig;
};

export default class CodeExampleComponent extends React.Component<
  TProps,
  TState
> {
  state: TState = {
    activeTab: "ts",
    isTranspiling: false,
    tsxCode: "",
    jsxCode: "",
  };

  tsCodeRef = React.createRef<string>();
  lastTranspiledTsCodeRef = React.createRef<string>();

  constructor(props: TProps) {
    super(props);

    const { component } = props.example;
    this.state = {
      activeTab: "ts",
      isTranspiling: false,
      tsxCode: component.trim(),
      jsxCode: "",
    };
  }

  componentDidMount() {
    registerLocale("fi", fi);
    registerLocale("pt-BR", ptBR);
    registerLocale("en-GB", enGB);
  }

  transpileTsCode = async () => {
    const tsCode = this.state.tsxCode;

    let stateUpdates = {
      jsxCode: "",
      isTranspiling: true,
    };

    try {
      const transpiledCode = await transformTsx(tsCode);

      this.lastTranspiledTsCodeRef.current = tsCode;
      stateUpdates = {
        jsxCode: transpiledCode,
        isTranspiling: false,
      };
    } catch (err) {
      stateUpdates = {
        jsxCode: "// Transpilation failed! Error: " + (err as Error).message,
        isTranspiling: false,
      };

      toast.show("Transpilation failed!", "error");
    }

    this.setState((state) => ({
      ...state,
      ...stateUpdates,
    }));
  };

  handleCodeChange = debounce((code: string) => {
    const { activeTab } = this.state;
    const codeProp = activeTab === "ts" ? "tsxCode" : "jsxCode";

    this.setState((state) => ({
      ...state,
      [codeProp]: code,
    }));
  }, 500);

  handleTabChange = async (tab: TState["activeTab"]) => {
    const { tsxCode } = this.state;
    this.setState((state) => ({
      ...state,
      activeTab: tab,
    }));

    if (tab === "js" && tsxCode !== this.lastTranspiledTsCodeRef.current) {
      await this.transpileTsCode();
    }
  };

  handleCopy = (code: string) => {
    if (code.trim().length) {
      copy(code);
      toast.show("Copied to clipboard", "success");
    } else {
      toast.show("No code to copy", "error");
    }
  };

  render() {
    const { title, description } = this.props.example;
    const { activeTab, isTranspiling, jsxCode, tsxCode } = this.state;

    const code = activeTab === "js" ? jsxCode : tsxCode;
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
            className={`example__tab ${activeTab === "ts" ? "active" : ""}`}
            onClick={() => this.handleTabChange("ts")}
          >
            TypeScript
          </button>
          <button
            className={`example__tab ${activeTab === "js" ? "active" : ""}`}
            onClick={() => this.handleTabChange("js")}
          >
            JavaScript
          </button>
        </div>
        <div className="row">
          {activeTab === "js" && isTranspiling ? (
            <pre className="example__code example__transpiling">
              Transpiling...
            </pre>
          ) : (
            <LiveProvider
              code={code}
              scope={{
                // NB any globals added here should also be referenced in ../../examples/.eslintrc
                useState,
                DatePicker,
                CalendarContainer,
                DateFNS,
                range,
                fi,
                forwardRef,
              }}
              theme={themes.github}
              noInline
              language={isTS ? "tsx" : "jsx"}
            >
              <pre className="example__code">
                <div className="example__actions">
                  <button
                    className="example__actions__button"
                    onClick={() => this.handleCopy(code)}
                  >
                    <img
                      src={copyIcon}
                      className="example__actions__copy_icon"
                      alt="copy icon"
                      title="Copy snippet"
                    />
                  </button>
                  <img
                    src={editIcon}
                    className="example__actions__edit_icon"
                    alt="edit icon"
                    title="Edit the code directly on the left side and and see the output on the right"
                  />
                </div>
                <LiveEditor onChange={this.handleCodeChange} />
              </pre>
              <div className="example__preview">
                <LiveError />
                <LivePreview />
              </div>
            </LiveProvider>
          )}
        </div>
      </div>
    );
  }
}
