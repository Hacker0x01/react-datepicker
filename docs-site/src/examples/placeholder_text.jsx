import React from 'react'
import DatePicker from 'react-datepicker'

export default function PlaceholderText () {
  return <div className="row">
    <pre className="column example__code">
      <code className="jsx">
        {'<DatePicker placeholderText="Click to select a date" />'}
      </code>
    </pre>
    <div className="column">
      <DatePicker placeholderText="Click to select a date" />
    </div>
  </div>
}
