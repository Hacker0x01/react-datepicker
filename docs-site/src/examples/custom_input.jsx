import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";

/* eslint-disable react/no-multi-comp */
class ExampleCustomInput extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    value: PropTypes.string
  };

  render() {
    return (
      <button className="example-custom-input" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

export default class CustomInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  render() {
    return (
      <div className="row">
        <pre className="column example__code">
          <code className="jsx">
            {`
class ExampleCustomInput extends React.Component {

  render () {
    return (
      <button
        className="example-custom-input"
        onClick={this.props.onClick}>
        {this.props.value}
      </button>
    )
  }
}

ExampleCustomInput.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string
};

...

<DatePicker
  customInput={<ExampleCustomInput />}
  selected={this.state.startDate}
  onChange={this.handleChange} />
`}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            customInput={<ExampleCustomInput />}
            selected={this.state.startDate}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
