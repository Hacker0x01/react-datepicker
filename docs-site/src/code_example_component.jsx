import React from 'react'
import PropTypes from 'prop-types'

export default class CodeExampleComponent extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    id: PropTypes.number,
    title: PropTypes.string
  }

  render () {
    return <div key={this.props.id} id={`example-${this.props.id}`} className="example">
      <h2 className="example__heading">{this.props.title}</h2>
      {this.props.children}
    </div>
  }
}
