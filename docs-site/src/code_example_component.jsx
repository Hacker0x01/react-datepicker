import React, { useState } from "react";
import PropTypes from "prop-types";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import DatePicker, { registerLocale } from "react-datepicker";
import * as DateFNS from "date-fns/esm";
import fi from "date-fns/locale/fi";
import ptBR from "date-fns/locale/pt-BR";
import slugify from "slugify";

export default class CodeExampleComponent extends React.Component {
  static propTypes = {
    example: PropTypes.object.isRequired
  };
  componentDidMount() {
    registerLocale("fi", fi);
    registerLocale("pt-BR", ptBR);
  }

  render() {
    const { title, component } = this.props.example;
    return (
      <div
        id={`example-${slugify(title, { lower: true })}`}
        className="example"
      >
        <h2 className="example__heading">{title}</h2>
        <div className="row">
          <LiveProvider
            code={component}
            scope={{
              useState,
              DatePicker,
              ...DateFNS,
              fi
            }}
          >
            <pre className="column example__code">
              <LiveEditor />
            </pre>
            <div className="column">
              <LiveError />
              <LivePreview />
            </div>
          </LiveProvider>
        </div>
      </div>
    );
  }
}
