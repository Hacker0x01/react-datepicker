import React from 'react'

export default React.createClass({
  displayName: 'CodeExampleComponent',

  propTypes: {
    children: React.PropTypes.element,
    id: React.PropTypes.number,
    title: React.PropTypes.string
  },

  render () {
    return <div key={this.props.id} id={`example-${this.props.id}`} className="example">
      <h2 className="example__heading">{this.props.title}</h2>
      {this.props.children}
    </div>
  }
})
