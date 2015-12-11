var React = require('react');
var ReactDOM = require('react-dom');
var ExampleComponents = require('./example_components.jsx');
var HeroExample = require('./hero_example.jsx');

ReactDOM.render(<ExampleComponents/>, document.getElementById('datepicker-region'));
ReactDOM.render(<HeroExample />, document.getElementById('js-hero-example'));
