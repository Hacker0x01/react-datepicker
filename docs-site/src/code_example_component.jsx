import React from 'react'

export default React.createClass({
  displayName: 'CodeExampleComponent',

  propTypes: {
    id: React.propTypes.string,
    title: React.propTypes.string,
    children: React.propTypes.element
  },

  render () {
    return <div key={this.props.id} id={`example-${this.props.id}`} className="example">
      <h2 className="example__heading">{this.props.title}</h2>
      {this.props.children}
    </div>
  }
})
