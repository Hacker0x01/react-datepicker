import React, { useState } from "react";
import PropTypes from "prop-types";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import DatePicker from "react-datepicker";
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";
import getDate from "date-fns/getDate";

export default class CodeExampleComponent extends React.Component {
  static propTypes = {
    example: PropTypes.object.isRequired,
    id: PropTypes.number
  };

  render() {
    const { title, component } = this.props.example;
    return (
      <div
        key={this.props.id}
        id={`example-${this.props.id}`}
        className="example"
      >
        <h2 className="example__heading">{title}</h2>
        <div className="row">
          <LiveProvider
            code={component}
            scope={{
              useState,
              DatePicker,
              setHours,
              setMinutes,
              getDate
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
