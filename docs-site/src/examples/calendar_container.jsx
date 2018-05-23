import React from "react";
import DatePicker, {
  CalendarContainer as OriginalContainer
} from "react-datepicker";
import PropTypes from "prop-types";
import moment from "moment";

export default class CalendarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment()
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
            {`\
<DatePicker
  selected={this.state.startDate}
  onChange={this.handleChange}
  calendarContainer={MyContainer}
/>

function MyContainer({ className, children }) {
    return (
      <div style={{ padding: '16px', background: '#216ba5', color: '#fff' }}>
        <CalendarContainer className={className}>
          <div style={{ background: '#f0f0f0' }}>What is your favorite day?</div>
          <div style={{ position: 'relative' }}>
            {children}
          </div>
        </CalendarContainer>
      </div>
    );
  }
  `}
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            calendarContainer={MyContainer}
          />
        </div>
      </div>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
function MyContainer({ className, children }) {
  return (
    <div style={{ padding: "16px", background: "#216ba5", color: "#fff" }}>
      <OriginalContainer className={className}>
        <div style={{ background: "#f0f0f0" }}>What is your favorite day?</div>
        <div style={{ position: "relative" }}>{children}</div>
      </OriginalContainer>
    </div>
  );
}

MyContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};
